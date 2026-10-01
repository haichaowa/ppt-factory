#!/usr/bin/env node
/**
 * Reproducible Stripe homepage capture.
 * Writes only inside web-clones/clones/2026-10-01-stripe/.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { chromium } = require('/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const ROOT = path.resolve(__dirname, '..');
const ARCHIVE = path.join(ROOT, 'archive');
const SOURCE_URL = 'https://stripe.com/';
const BROWSER = '/Users/wanghaichao/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const sha256 = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const pngDimensions = file => {
  const b = fs.readFileSync(file);
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
};
const safeName = s => s.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(0, 90) || 'file';
function json(file, value) {
  fs.writeFileSync(path.join(ARCHIVE, file), JSON.stringify(value, null, 2) + '\n');
}
async function settle(page, extra = 9000) {
  await page.waitForLoadState('domcontentloaded', { timeout: 90000 });
  await page.waitForLoadState('networkidle', { timeout: 60000 }).catch(async e => {
    console.warn('networkidle timeout:', e.message);
    await sleep(15000);
  });
  await page.evaluate(async () => {
    const last = document.documentElement.scrollHeight;
    for (let y = 0; y <= last; y += Math.min(900, Math.max(300, window.innerHeight))) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 90));
    }
    window.scrollTo(0, last);
    await new Promise(r => setTimeout(r, 1200));
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 500));
  });
  await sleep(extra);
}
async function captureViewport(browser, width, filename) {
  const context = await browser.newContext({
    viewport: { width, height: width === 375 ? 812 : 900 },
    deviceScaleFactor: 1,
    isMobile: width === 375,
    hasTouch: width === 375,
    reducedMotion: 'reduce',
    locale: 'en-US',
    timezoneId: 'Asia/Shanghai'
  });
  const page = await context.newPage();
  const response = await page.goto(SOURCE_URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await settle(page, width === 375 ? 12000 : 9000);
  const state = await page.evaluate(() => ({
    url: location.href,
    title: document.title,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
    readyState: document.readyState,
    h1: document.querySelector('h1')?.innerText?.trim() || null,
    bodyBackgroundColor: getComputedStyle(document.body).backgroundColor,
    rootFontSize: getComputedStyle(document.documentElement).fontSize
  }));
  const file = path.join(ROOT, 'screenshots', filename);
  await page.screenshot({ path: file, fullPage: true, animations: 'disabled', caret: 'hide', timeout: 180000 });
  await context.close();
  return {
    requestedViewport: width,
    file: `screenshots/${filename}`,
    ...state,
    png: pngDimensions(file),
    sha256: sha256(file),
    bytes: fs.statSync(file).size,
    responseStatus: response?.status(),
    responseUrl: response?.url()
  };
}

(async () => {
  fs.mkdirSync(path.join(ARCHIVE, 'styles'), { recursive: true });
  fs.mkdirSync(path.join(ARCHIVE, 'resources'), { recursive: true });
  fs.mkdirSync(path.join(ROOT, 'screenshots'), { recursive: true });
  fs.mkdirSync(path.join(ROOT, 'sections'), { recursive: true });
  const browser = await chromium.launch({ executablePath: BROWSER, headless: true });
  const started = new Date();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1,
    reducedMotion: 'reduce', locale: 'en-US', timezoneId: 'Asia/Shanghai'
  });
  const page = await context.newPage();
  const response = await page.goto(SOURCE_URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await settle(page, 12000);
  const headers = response?.headers() || {};

  const measured = await page.evaluate(() => {
    const styleProps = ['color','background-color','background-image','font-family','font-size','font-weight','font-style','line-height','letter-spacing','text-transform','border-radius','box-shadow','padding','margin','gap','transition','transition-duration','transition-timing-function','animation','animation-duration','animation-timing-function','transform','filter','backdrop-filter','opacity','mix-blend-mode','clip-path','mask-image','border','width','height'];
    const rect = el => { const r = el.getBoundingClientRect(); return { x:+r.x.toFixed(2), y:+(r.y+scrollY).toFixed(2), width:+r.width.toFixed(2), height:+r.height.toFixed(2), top:+r.top.toFixed(2), left:+r.left.toFixed(2) }; };
    const shortSelector = el => {
      let s = el.tagName.toLowerCase();
      if (el.id) s += '#' + el.id;
      const cls = String(el.className || '').baseVal || String(el.className || '');
      if (cls) s += '.' + cls.trim().split(/\s+/).slice(0, 3).join('.');
      return s;
    };
    const pickStyle = el => { const s = getComputedStyle(el); return Object.fromEntries(styleProps.map(k => [k, s.getPropertyValue(k)])); };
    const visible = [...document.querySelectorAll('body *')].filter(el => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && ['none'].includes(getComputedStyle(el).display) === false && getComputedStyle(el).visibility !== 'hidden';
    });
    const tally = (extract) => {
      const map = new Map();
      for (const el of visible) {
        let value;
        try { value = extract(el, getComputedStyle(el)); } catch {}
        if (!value || value === 'none' || value === 'auto' || value === 'normal') continue;
        const key = Array.isArray(value) ? value.join(' | ') : String(value);
        if (!map.has(key)) map.set(key, { count: 0, examples: [] });
        const item = map.get(key);
        item.count++;
        if (item.examples.length < 4) item.examples.push(shortSelector(el));
      }
      return [...map.entries()].sort((a,b) => b[1].count-a[1].count).slice(0, 40).map(([value,v]) => ({ value, count:v.count, examples:v.examples }));
    };
    const directTop = [...document.querySelectorAll('header, section, footer')].filter(el => !el.parentElement?.closest('header, section, footer') && el.getBoundingClientRect().height > 30).map((el,i) => ({ index:i, tag:el.tagName, id:el.id, className:String(el.className), ...rect(el), text:(el.innerText||'').trim().replace(/\s+/g,' ').slice(0,260) }));
    const headings = [...document.querySelectorAll('h1,h2,h3,h4')].filter(el => el.getBoundingClientRect().height > 0).map(el => ({ tag:el.tagName, text:el.innerText.trim().replace(/\s+/g,' '), className:String(el.className), ...rect(el), styles:pickStyle(el) }));
    const typography = visible.filter(el => el.innerText?.trim()).slice(0, 500).map(el => ({ selector:shortSelector(el), text:el.innerText.trim().replace(/\s+/g,' ').slice(0,180), ...rect(el), styles:pickStyle(el) }));
    const hero = document.querySelector('section.hero-section-container');
    const heroLayers = hero ? [...hero.querySelectorAll('*')].filter(el => {
      const s = getComputedStyle(el);
      return el.getBoundingClientRect().width > 20 && el.getBoundingClientRect().height > 20 && (!!s.backgroundImage || s.transform !== 'none' || s.animation !== 'none' || s.filter !== 'none' || s.mixBlendMode !== 'normal' || s.clipPath !== 'none');
    }).map(el => ({ selector:shortSelector(el), ...rect(el), styles:pickStyle(el) })) : [];
    const root = document.documentElement;
    const variables = {};
    const collectVariables = rule => {
      if (!rule.style) return;
      for (let i = 0; i < rule.style.length; i++) {
        const name = rule.style[i];
        if (name.startsWith('--')) variables[name] = rule.style.getPropertyValue(name).trim();
      }
      if (rule.cssRules) for (const child of rule.cssRules) collectVariables(child);
    };
    for (const sheet of document.styleSheets) {
      try { for (const rule of sheet.cssRules) collectVariables(rule); } catch {}
    }
    const links = [...document.querySelectorAll('a')].slice(0, 300).map(a => ({ text:a.innerText.trim().replace(/\s+/g,' '), href:a.href, className:String(a.className), ...rect(a), styles:pickStyle(a) }));
    const buttons = [...document.querySelectorAll('button,a')].filter(el => /button|cta|link link--/.test(String(el.className))).slice(0,100).map(el => ({ selector:shortSelector(el), text:el.innerText.trim(), ...rect(el), styles:pickStyle(el) }));
    const stylesheets = [...document.styleSheets].map(s => ({ href:s.href, disabled:s.disabled, rules:(()=>{try{return s.cssRules.length}catch{return null}})() }));
    const resources = performance.getEntriesByType('resource').map(e => ({ name:e.name, initiatorType:e.initiatorType, duration:Math.round(e.duration), transferSize:e.transferSize, decodedBodySize:e.decodedBodySize }));
    return {
      document:{ url:location.href, title:document.title, readyState:document.readyState, characterSet:document.characterSet, viewport:{width:innerWidth,height:innerHeight}, scrollWidth:document.documentElement.scrollWidth, scrollHeight:document.documentElement.scrollHeight, bodyBackgroundColor:getComputedStyle(document.body).backgroundColor, htmlBackgroundColor:getComputedStyle(document.documentElement).backgroundColor, lang:document.documentElement.lang, metaThemeColor:document.querySelector('meta[name="theme-color"]')?.content || null, h1:document.querySelector('h1')?.innerText || null },
      variables, directTop, headings, typography, heroLayers, links, buttons, stylesheets, resources,
      frequencies:{
        color:tally((el,s)=>s.color),
        backgroundColor:tally((el,s)=>s.backgroundColor),
        backgroundImage:tally((el,s)=>s.backgroundImage),
        fontFamily:tally((el,s)=>s.fontFamily),
        fontSize:tally((el,s)=>s.fontSize),
        fontWeight:tally((el,s)=>s.fontWeight),
        lineHeight:tally((el,s)=>s.lineHeight),
        letterSpacing:tally((el,s)=>s.letterSpacing),
        borderRadius:tally((el,s)=>s.borderRadius),
        boxShadow:tally((el,s)=>s.boxShadow),
        padding:tally((el,s)=>s.padding),
        margin:tally((el,s)=>s.margin),
        gap:tally((el,s)=>s.gap),
        transition:tally((el,s)=>s.transition),
        transitionTimingFunction:tally((el,s)=>s.transitionTimingFunction),
        transform:tally((el,s)=>s.transform),
        filter:tally((el,s)=>s.filter),
        clipPath:tally((el,s)=>s.clipPath)
      },
      counts:{ visibleElements:visible.length, headings:headings.length, heroLayers:heroLayers.length, styleVariables:Object.keys(variables).length, stylesheets:stylesheets.length, resources:resources.length }
    };
  });

  fs.writeFileSync(path.join(ARCHIVE, 'live-dom.html'), await page.content(), 'utf8');
  json('computed-styles.json', measured);

  // Save stylesheet sources used by the rendered document.
  const cssFiles = [];
  const seen = new Set();
  for (const sheet of measured.stylesheets.filter(s => s.href)) {
    const href = sheet.href;
    if (seen.has(href)) continue;
    seen.add(href);
    const name = safeName(new URL(href).pathname.replace(/\//g, '-')) + '.css';
    try {
      const res = await context.request.get(href, { maxRedirects: 4 });
      const text = await res.text();
      const file = path.join(ARCHIVE, 'styles', name);
      fs.writeFileSync(file, text, 'utf8');
      cssFiles.push({ href, file:`archive/styles/${path.basename(file)}`, bytes:Buffer.byteLength(text), sha256:sha256(file), status:res.status() });
    } catch (e) { cssFiles.push({ href, error:e.message }); }
  }

  // Save rendered font payloads referenced by PerformanceResourceTiming.
  const fontFiles = [];
  const fonts = measured.resources.filter(r => /\.woff2?($|\?)/i.test(r.name));
  for (const resource of fonts) {
    const name = safeName(new URL(resource.name).pathname.replace(/\//g,'-')) || 'font.woff2';
    try {
      const res = await context.request.get(resource.name);
      const buf = await res.body();
      const file = path.join(ARCHIVE, 'resources', name);
      fs.writeFileSync(file, buf);
      fontFiles.push({ href:resource.name, file:`archive/resources/${path.basename(file)}`, bytes:buf.length, sha256:sha256(file) });
    } catch (e) { fontFiles.push({ href:resource.name, error:e.message }); }
  }

  // Browser-generated single-file MHTML archive after lazy resources settle.
  const cdp = await context.newCDPSession(page);
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable'); await cdp.send('Page.enable');
  const snapshot = await cdp.send('Page.captureSnapshot', { format: 'mhtml' });
  const mhtmlFile = path.join(ARCHIVE, 'stripe-home.mhtml');
  fs.writeFileSync(mhtmlFile, snapshot.data, 'utf8');

  // Three full-page viewport captures.
  const captures = [];
  captures.push(await captureViewport(browser, 1440, 'stripe-home-1440-fullpage.png'));
  captures.push(await captureViewport(browser, 1280, 'stripe-home-1280-fullpage.png'));
  captures.push(await captureViewport(browser, 375, 'stripe-home-375-fullpage.png'));

  // Five representative section captures at exactly 2x.
  const sectionContext = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, reducedMotion:'reduce', locale:'en-US', timezoneId:'Asia/Shanghai' });
  const sectionPage = await sectionContext.newPage();
  await sectionPage.goto(SOURCE_URL, { waitUntil:'domcontentloaded', timeout:90000 });
  await settle(sectionPage, 12000);
  const sectionDefs = [
    ['01-hero-diagonal-gradient', 'section.hero-section-container', 'Hero with diagonal color wash, clipped copy and GDP ticker'],
    ['02-modular-solutions-bento', 'section.hero-section-container + section', 'Bento system of payment/billing/commerce products'],
    ['03-global-commerce-stats', 'section.stats-section', 'Statistics narrative and illustration/graphic system'],
    ['04-business-sizes', 'section.business-sizes-section', 'Enterprise/startup/platform segmentation and carousel'],
    ['05-dark-developer-infrastructure', 'section.hds-mode--dark', 'Dark developer stack and integration section']
  ];
  const sections = [];
  for (const [name, selector, label] of sectionDefs) {
    const el = await sectionPage.$(selector);
    if (!el) throw new Error(`Missing section ${name}: ${selector}`);
    const source = await el.evaluate(el => {
      const r = el.getBoundingClientRect();
      return { className:String(el.className), text:(el.innerText||'').trim().replace(/\s+/g,' ').slice(0,320), box:{x:r.x,y:r.y+scrollY,width:r.width,height:r.height} };
    });
    const box = { x:Math.max(0,Math.floor(source.box.x)), y:Math.max(0,Math.floor(source.box.y)), width:Math.ceil(source.box.width), height:Math.ceil(source.box.height) };
    const file = path.join(ROOT, 'sections', `${name}.png`);
    await sectionPage.screenshot({ path:file, clip:box, fullPage:true, animations:'disabled', caret:'hide', timeout:180000 });
    sections.push({ name, selector, label, className:source.className, text:source.text, cssBox:box, png:pngDimensions(file), deviceScaleFactor:2, sha256:sha256(file), bytes:fs.statSync(file).size });
  }
  await sectionContext.close();

  const playwrightPackage = require('/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
  json('capture-manifest.json', {
    source:SOURCE_URL,
    capturedAt:started.toISOString(),
    completedAt:new Date().toISOString(),
    timezone:'Asia/Shanghai',
    method:{
      primary:'Chromium Page.captureSnapshot(format=mhtml) after full-page lazy-load pass',
      screenshots:'Playwright fullPage PNG at 1440/1280/375 with reduced motion and animations disabled',
      sections:'Playwright full-page clipping with deviceScaleFactor=2',
      measurement:'live DOM getComputedStyle, CSSOM, PerformanceResourceTiming, and element geometry'
    },
    environment:{ playwright:playwrightPackage.version, browserExecutable:BROWSER, platform:process.platform, node:process.version },
    response:{ status:response?.status(), url:response?.url(), headers },
    document:measured.document,
    mhtml:{ file:'archive/stripe-home.mhtml', bytes:fs.statSync(mhtmlFile).size, sha256:sha256(mhtmlFile) },
    screenshots:captures,
    sections,
    cssFiles,
    fontFiles,
    counts:{ stylesheets:measured.stylesheets.length, cssSources:cssFiles.length, renderedFonts:fontFiles.length, typographySamples:measured.typography.length, visibleElements:measured.counts.visibleElements, headings:measured.headings.length, heroLayers:measured.heroLayers.length, resources:measured.resources.length }
  });

  await context.close(); await browser.close();
  console.log(JSON.stringify({ ok:true, output:ROOT, document:measured.document, mhtmlBytes:fs.statSync(mhtmlFile).size, captures, sections }, null, 2));
})().catch(e => { console.error(e); process.exit(1); });
