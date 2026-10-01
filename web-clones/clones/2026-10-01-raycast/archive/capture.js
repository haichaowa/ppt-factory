#!/usr/bin/env node
/**
 * Reproducible Raycast home capture.
 * Env defaults point at the Codex-bundled Playwright runtime used for this archive.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || '/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const ROOT = path.resolve(__dirname, '..');
const URL = 'https://www.raycast.com/';
const BROWSER = process.env.PLAYWRIGHT_BROWSER || '/Users/wanghaichao/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const sha256 = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const pngDimensions = file => {
  const b = fs.readFileSync(file);
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
};

function json(file, value) {
  fs.writeFileSync(path.join(ROOT, 'archive', file), JSON.stringify(value, null, 2) + '\n');
}
async function settle(page, ms = 9000) {
  await page.waitForLoadState('domcontentloaded', { timeout: 90000 });
  await page.waitForLoadState('networkidle', { timeout: 90000 }).catch(async e => {
    console.warn('networkidle timeout:', e.message);
    await sleep(ms);
  });
  await sleep(ms);
}
async function captureViewport(browser, width, filename, options = {}) {
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
  const response = await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await settle(page, width === 375 ? 11000 : 8000);
  const state = await page.evaluate(() => ({
    url: location.href,
    title: document.title,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
    readyState: document.readyState,
    h1: document.querySelector('h1')?.textContent?.trim() || null
  }));
  const file = path.join(ROOT, 'screenshots', filename);
  await page.screenshot({ path: file, fullPage: true, animations: 'disabled', caret: 'hide', timeout: 180000 });
  await context.close();
  return { viewport: width, file: `screenshots/${filename}`, ...state, png: pngDimensions(file), sha256: sha256(file), bytes: fs.statSync(file).size, responseStatus: response?.status() };
}

(async () => {
  fs.mkdirSync(path.join(ROOT, 'archive', 'styles'), { recursive: true });
  fs.mkdirSync(path.join(ROOT, 'archive', 'resources'), { recursive: true });
  fs.mkdirSync(path.join(ROOT, 'screenshots'), { recursive: true });
  fs.mkdirSync(path.join(ROOT, 'sections'), { recursive: true });
  const browser = await chromium.launch({ executablePath: BROWSER, headless: true });
  const started = new Date();

  // Primary measurement and MHTML context.
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce', locale: 'en-US', timezoneId: 'Asia/Shanghai' });
  const page = await context.newPage();
  const response = await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await settle(page, 10000);
  const headers = response?.headers() || {};

  const measured = await page.evaluate(() => {
    const styleProps = ['color','background-color','background-image','font-family','font-size','font-weight','font-style','line-height','letter-spacing','text-transform','border-radius','box-shadow','padding','margin','gap','transition','transition-duration','transition-timing-function','animation','animation-duration','animation-timing-function','backdrop-filter','filter','border','opacity'];
    const pickStyle = (el, pseudo = null) => { const s = getComputedStyle(el, pseudo); return Object.fromEntries(styleProps.map(k => [k, s.getPropertyValue(k)])); };
    const shortSelector = el => {
      let s = el.tagName.toLowerCase();
      if (el.id) s += '#' + el.id;
      const cls = String(el.className || '').baseVal || String(el.className || '');
      if (cls) s += '.' + cls.trim().split(/\s+/).slice(0, 3).join('.');
      return s;
    };
    const rect = el => { const r = el.getBoundingClientRect(); return { x: +r.x.toFixed(2), y: +(r.y + scrollY).toFixed(2), width: +r.width.toFixed(2), height: +r.height.toFixed(2), top: +r.top.toFixed(2), left: +r.left.toFixed(2) }; };
    const visible = [...document.querySelectorAll('body *')].filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).display !== 'none'; });
    const countValues = make => {
      const counts = new Map();
      for (const el of visible) { const value = make(el); if (!value || value === 'none' || value === 'auto' || value === 'normal') continue; const key = value; counts.set(key, (counts.get(key) || 0) + 1); }
      return [...counts.entries()].map(([value, count]) => ({ value, count })).sort((a,b)=>b.count-a.count).slice(0,30);
    };
    const typography = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,button,li,span,strong,em,code,kbd')].filter(el => el.textContent?.trim()).slice(0,420).map(el => ({ selector: shortSelector(el), text: el.textContent.trim().replace(/\s+/g,' ').slice(0,180), rect: rect(el), styles: pickStyle(el) }));
    const componentSelectors = [
      ['root','body'],['navbar','#root > div:first-child'],['hero','#root > div:nth-child(2)'],['command-launcher','#root > div:nth-child(3)'],['value-grid','#root > div:nth-child(4)'],['extension-carousel','#root > div:nth-child(5)'],['ai-agent','#root > div:nth-child(6)'],['social-proof','#root > div:nth-child(7)'],['automation','#root > div:nth-child(8)'],['features','#root > div:nth-child(9)'],['community','#root > div:nth-child(10)'],['api','#root > div:nth-child(11)'],['final-cta','#root > div:nth-child(12)'],['footer','#root > div:nth-child(13)']
    ].map(([name, selector]) => ({ name, selector, element: document.querySelector(selector), text: document.querySelector(selector)?.textContent?.trim().replace(/\s+/g,' ').slice(0,220) || '' })).filter(x => x.element).map(x => ({ name:x.name, selector:x.selector, text:x.text, rect:rect(x.element), styles:pickStyle(x.element) }));
    const cssVariables = getComputedStyle(document.documentElement);
    const variables = {};
    for (let i = 0; i < cssVariables.length; i++) { const name = cssVariables[i]; if (name.startsWith('--')) variables[name] = cssVariables.getPropertyValue(name).trim(); }
    const stylesheets = [...document.styleSheets].map(s => ({ href: s.href, ownerNode: s.ownerNode?.tagName || null, rules: (() => { try { return s.cssRules.length } catch { return null } })() }));
    const resources = performance.getEntriesByType('resource').map(r => ({ name:r.name, initiatorType:r.initiatorType, duration:Math.round(r.duration), transferSize:r.transferSize, encodedBodySize:r.encodedBodySize, decodedBodySize:r.decodedBodySize }));
    return {
      document: { url:location.href, title:document.title, readyState:document.readyState, characterSet:document.characterSet, viewport:{width:innerWidth,height:innerHeight}, scrollWidth:document.documentElement.scrollWidth, scrollHeight:document.documentElement.scrollHeight },
      rootChildren: [...document.querySelector('#root').children].map((el,i)=>({ index:i, selector:shortSelector(el), className:String(el.className), text:(el.textContent||'').trim().replace(/\s+/g,' ').slice(0,350), rect:rect(el) })),
      componentSelectors, typography,
      frequencies: {
        color: countValues(el => getComputedStyle(el).color),
        backgroundColor: countValues(el => getComputedStyle(el).backgroundColor),
        backgroundImage: countValues(el => getComputedStyle(el).backgroundImage),
        fontFamily: countValues(el => getComputedStyle(el).fontFamily),
        fontSize: countValues(el => getComputedStyle(el).fontSize),
        fontWeight: countValues(el => getComputedStyle(el).fontWeight),
        lineHeight: countValues(el => getComputedStyle(el).lineHeight),
        letterSpacing: countValues(el => getComputedStyle(el).letterSpacing),
        borderRadius: countValues(el => getComputedStyle(el).borderRadius),
        boxShadow: countValues(el => getComputedStyle(el).boxShadow),
        transition: countValues(el => getComputedStyle(el).transition),
        animation: countValues(el => getComputedStyle(el).animation),
        backdropFilter: countValues(el => getComputedStyle(el).backdropFilter),
        filter: countValues(el => getComputedStyle(el).filter)
      },
      variables, stylesheets, resources
    };
  });

  const domSnapshot = await page.content();
  fs.writeFileSync(path.join(ROOT, 'archive', 'dom-snapshot.html'), domSnapshot);
  json('computed-styles.json', measured);

  // Save each same-origin stylesheet source for exact token and keyframe research.
  for (const sheet of measured.stylesheets.filter(s => s.href)) {
    const url = new globalThis.URL(sheet.href);
    const name = `${(url.hostname + url.pathname).replace(/[^a-z0-9._-]+/gi,'_').slice(-180)}`;
    try { const res = await fetch(url); const text = await res.text(); fs.writeFileSync(path.join(ROOT, 'archive','styles',name), text); } catch (e) { console.warn('stylesheet fetch failed', url.href, e.message); }
  }

  // Capture the browser-generated single-file MHTML archive after resources settle.
  const cdp = await context.newCDPSession(page);
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable'); await cdp.send('Page.enable');
  const snapshot = await cdp.send('Page.captureSnapshot', { format: 'mhtml' });
  const mhtmlFile = path.join(ROOT, 'archive', 'raycast-home.mhtml');
  fs.writeFileSync(mhtmlFile, snapshot.data, 'base64');

  // Three full-page viewport captures.
  const captures = [];
  captures.push(await captureViewport(browser, 1440, 'raycast-home-1440-fullpage.png'));
  captures.push(await captureViewport(browser, 1280, 'raycast-home-1280-fullpage.png'));
  captures.push(await captureViewport(browser, 375, 'raycast-home-375-fullpage.png'));

  // Five representative section element captures at exactly 2x.
  const sectionContext = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, reducedMotion:'reduce', locale:'en-US', timezoneId:'Asia/Shanghai' });
  const sectionPage = await sectionContext.newPage();
  await sectionPage.goto(URL, { waitUntil:'domcontentloaded', timeout:90000 }); await settle(sectionPage, 10000);
  const sectionDefs = [
    ['01-hero', 1, 'Hero and macOS product object'],
    ['02-command-launcher', 2, 'Launcher feature and command window'],
    ['03-value-grid', 3, 'Keyboard-first value proposition grid'],
    ['04-extension-carousel', 4, 'Extension ecosystem carousel'],
    ['05-ai-agent', 5, 'AI agent and chat interface']
  ];
  const sections = [];
  for (const [name, childIndex, label] of sectionDefs) {
    const el = sectionPage.locator(`#root > div:nth-child(${childIndex + 1})`).first();
    const box = await el.boundingBox();
    const file = path.join(ROOT, 'sections', `${name}.png`);
    await el.screenshot({ path:file, animations:'disabled', caret:'hide', timeout:180000 });
    const dims = pngDimensions(file);
    sections.push({ name, rootChildIndex:childIndex, label, cssBox:box, png:dims, deviceScaleFactor:2, sha256:sha256(file), bytes:fs.statSync(file).size });
  }
  await sectionContext.close();

  const playwrightPackage = require(require.resolve('playwright/package.json', { paths:[path.dirname(process.env.PLAYWRIGHT_PACKAGE || '/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')] }));
  json('capture-manifest.json', {
    source: URL,
    capturedAt: started.toISOString(),
    completedAt: new Date().toISOString(),
    timezone: 'Asia/Shanghai',
    method: {
      primary:'Chromium Page.captureSnapshot(format=mhtml)',
      screenshots:'Playwright fullPage PNG, reduced motion and CSS animations disabled',
      sections:'Playwright element screenshot with context deviceScaleFactor=2',
      measurement:'live DOM getComputedStyle and performance resource entries'
    },
    environment: { playwright: playwrightPackage.version, browserExecutable:BROWSER, platform:process.platform, node:process.version },
    response: { status: response?.status(), url: response?.url(), headers },
    document: measured.document,
    mhtml: { file:'archive/raycast-home.mhtml', bytes:fs.statSync(mhtmlFile).size, sha256:sha256(mhtmlFile) },
    screenshots: captures,
    sections,
    counts: { stylesheets:measured.stylesheets.length, resourceEntries:measured.resources.length, typographySamples:measured.typography.length, rootChildren:measured.rootChildren.length }
  });

  await context.close(); await browser.close();
  console.log(JSON.stringify({ ok:true, output:ROOT, mhtmlBytes:fs.statSync(mhtmlFile).size, captures, sections }, null, 2));
})().catch(e => { console.error(e); process.exit(1); });
