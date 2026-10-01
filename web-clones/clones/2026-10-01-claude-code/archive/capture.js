const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const archive = path.join(root, 'archive');
const screenshots = path.join(root, 'screenshots');
const sections = path.join(root, 'sections');
const url = 'https://claude.com/product/claude-code';
const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const allViewports = [
  { name: '1440', width: 1440, height: 960 },
  { name: '1280', width: 1280, height: 800 },
  { name: '375', width: 375, height: 812 },
];
const viewports = process.env.CAPTURE_VIEWPORTS ? allViewports.filter(v => process.env.CAPTURE_VIEWPORTS.split(',').includes(v.name)) : allViewports;

const clean = s => (s || '').replace(/\s+/g, ' ').trim();

async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const heights = [];
    for (let i = 0; i < 5; i++) {
      heights.push(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
      await new Promise(r => setTimeout(r, 180));
    }
    return heights;
  });
}

async function loadAndReveal(page) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => {});
  await page.evaluate(async () => {
    await document.fonts.ready;
    let max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    let y = 0;
    for (let step = 0; step < 90 && y < max + window.innerHeight; step++) {
      window.scrollTo(0, Math.min(y, max));
      await new Promise(r => setTimeout(r, 110));
      y += Math.round(window.innerHeight * 0.68);
      max = Math.max(max, document.body.scrollHeight, document.documentElement.scrollHeight);
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 800));
  });
  await settle(page);
}

const extractMetrics = () => {
  const cleanText = s => (s || '').replace(/\s+/g, ' ').trim();
  const box = el => {
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x + window.scrollX), y: Math.round(r.y + window.scrollY), width: Math.round(r.width), height: Math.round(r.height) };
  };
  const style = el => {
    const cs = getComputedStyle(el);
    return {
      display: cs.display, position: cs.position, overflow: cs.overflow, color: cs.color,
      backgroundColor: cs.backgroundColor, backgroundImage: cs.backgroundImage,
      borderTopColor: cs.borderTopColor, borderWidth: cs.borderWidth,
      fontFamily: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight,
      lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, textTransform: cs.textTransform,
      borderRadius: cs.borderRadius, padding: cs.padding, margin: cs.margin, gap: cs.gap,
      boxShadow: cs.boxShadow, transition: cs.transition, animation: cs.animation, opacity: cs.opacity,
      transform: cs.transform, filter: cs.filter, backdropFilter: cs.backdropFilter,
    };
  };
  const describe = el => ({ tag: el.tagName, className: String(el.className || ''), id: el.id || '', text: cleanText(el.textContent).slice(0, 500), box: box(el), style: style(el) });
  const freqInc = (map, value, el) => {
    if (!value || /^(none|normal|rgba\(0, 0, 0, 0\)|0px)$/.test(value)) return;
    const k = String(value);
    map[k] ||= { count: 0, examples: [] };
    map[k].count++;
    if (map[k].examples.length < 4) {
      const label = cleanText(el.textContent).slice(0, 70) || el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(/\s+/).slice(0, 2).join('.') : '');
      map[k].examples.push(label);
    }
  };
  const maps = Object.fromEntries(['color','backgroundColor','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','borderRadius','boxShadow','transition','animation','padding','margin','gap'].map(k => [k, {}]));
  const visible = [];
  for (const el of document.body.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) continue;
    const cs = getComputedStyle(el);
    visible.push(el);
    freqInc(maps.color, cs.color, el); freqInc(maps.backgroundColor, cs.backgroundColor, el);
    freqInc(maps.fontFamily, cs.fontFamily, el); freqInc(maps.fontSize, cs.fontSize, el);
    freqInc(maps.fontWeight, cs.fontWeight, el); freqInc(maps.lineHeight, cs.lineHeight, el);
    freqInc(maps.letterSpacing, cs.letterSpacing, el); freqInc(maps.borderRadius, cs.borderRadius, el);
    freqInc(maps.boxShadow, cs.boxShadow, el); freqInc(maps.transition, cs.transition, el);
    freqInc(maps.animation, cs.animation, el); freqInc(maps.padding, cs.padding, el);
    freqInc(maps.margin, cs.margin, el); freqInc(maps.gap, cs.gap, el);
  }
  const cssVars = {};
  const keyframes = {};
  const collectRules = (rules, media = '') => {
    for (const rule of rules) {
      if (!rule) continue;
      if (rule.cssRules) { collectRules(rule.cssRules, rule.conditionText ? `@media ${rule.conditionText}` : media); continue; }
      if (rule.style) {
        for (const name of rule.style) {
          if (name.startsWith('--')) {
            const value = rule.style.getPropertyValue(name).trim();
            if (value) cssVars[name] = { value, selector: rule.selectorText || rule.cssText.split('{')[0], media };
          }
        }
      }
      if (rule.type === CSSRule.KEYFRAMES_RULE || rule.cssText.startsWith('@keyframes')) {
        keyframes[rule.name || rule.cssText.split(/\s+/)[1]] = { cssText: rule.cssText.slice(0, 12000), media };
      }
    }
  };
  for (const sheet of document.styleSheets) {
    try { collectRules(sheet.cssRules); } catch (_) {}
  }
  const selected = {};
  const select = (name, fn) => { try { const el = fn(); if (el) selected[name] = describe(el); } catch (_) {} };
  select('documentBody', () => document.body);
  select('header', () => document.querySelector('header'));
  select('main', () => document.querySelector('main'));
  select('h1', () => document.querySelector('h1'));
  select('heroParagraph', () => document.querySelector('main h1')?.parentElement?.querySelector('p'));
  select('heroPrimaryCta', () => [...document.querySelectorAll('a,button')].find(el => /download for macos/i.test(el.textContent || '')));
  select('heroSecondaryCta', () => [...document.querySelectorAll('a,button')].find(el => /^read documentation/i.test(cleanText(el.textContent))));
  select('pricingHeading', () => [...document.querySelectorAll('h2')].find(el => /Get started with Claude Code/i.test(el.textContent || '')));
  select('pricingCard', () => [...document.querySelectorAll('h3')].find(el => /^Pro$/i.test(cleanText(el.textContent)))?.closest('[class*=card], li, article'));
  select('commandCta', () => document.querySelector('[class*=commandWrap]'));
  select('commandButton', () => document.querySelector('[class*=commandButton]'));
  select('commandText', () => document.querySelector('[class*=commandText]'));
  select('terminalColumn', () => document.querySelector('[class*="terminalColumn"]'));
  select('terminal', () => document.querySelector('[class*="terminalColumn"] [class*="terminal"]'));
  select('terminalHeader', () => document.querySelector('[class*="terminalColumn"] [class*="header"], [class*="terminalColumn"] header'));
  select('terminalPre', () => document.querySelector('[class*="terminalColumn"] pre'));
  select('terminalCode', () => document.querySelector('[class*="terminalColumn"] code'));
  select('workHeading', () => [...document.querySelectorAll('h2')].find(el => /What Claude Code can take on/i.test(el.textContent || '')));
  select('workSection', () => [...document.querySelectorAll('h2')].find(el => /What Claude Code can take on/i.test(el.textContent || ''))?.closest('section'));
  select('integrationsHeading', () => [...document.querySelectorAll('h2')].find(el => /Meets you where you code/i.test(el.textContent || '')));
  select('newsletterSection', () => [...document.querySelectorAll('h2')].find(el => /Create what/i.test(el.textContent || ''))?.closest('section'));
  select('footer', () => document.querySelector('footer'));
  const terminalDescendants = [...document.querySelectorAll('[class*="terminalColumn"] *')].slice(0, 260).map(describe);
  const headings = [...document.querySelectorAll('h1,h2,h3')].filter(el => el.getBoundingClientRect().width > 0).map(describe);
  const mainSections = [...document.querySelectorAll('main > section')].filter(el => el.getBoundingClientRect().width > 0).map(describe);
  const actions = [...document.querySelectorAll('a,button')].filter(el => el.getBoundingClientRect().width > 0 && cleanText(el.textContent)).slice(0, 240).map(describe);
  const imageStyles = [...document.querySelectorAll('img,video,canvas,picture')].filter(el => el.getBoundingClientRect().width > 0).slice(0, 180).map(el => ({ ...describe(el), src: el.currentSrc || el.src || '', alt: el.alt || '' }));
  return {
    title: document.title,
    url: location.href,
    capturedAt: new Date().toISOString(),
    viewport: { width: innerWidth, height: innerHeight, dpr: devicePixelRatio },
    document: { scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight, bodyScrollHeight: document.body.scrollHeight },
    bodyComputed: style(document.body),
    frequencies: maps,
    cssVars,
    keyframes,
    selected,
    terminalDescendants,
    headings,
    mainSections,
    actions,
    imageStyles,
    visibleElementCount: visible.length,
  };
};

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath });
  const manifests = [];
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1,
      prefersReducedMotion: true, isMobile: vp.width === 375, hasTouch: vp.width === 375,
    });
    const page = await context.newPage();
    const requests = [];
    page.on('response', res => requests.push({ url: res.url(), status: res.status(), resourceType: res.request().resourceType(), contentType: res.headers()['content-type'] || '' }));
    await loadAndReveal(page);
    const height = await page.evaluate(() => Math.max(document.documentElement.scrollHeight, document.body.scrollHeight));
    const png = path.join(screenshots, `claude-code-${vp.width}x${height}-fullpage.png`);
    await page.screenshot({ path: png, fullPage: true });
    const metrics = await page.evaluate(extractMetrics);
    fs.writeFileSync(path.join(archive, `style-metrics-${vp.width}.json`), JSON.stringify(metrics, null, 2));
    manifests.push({ viewport: vp, documentHeight: height, screenshot: path.relative(root, png), screenshotBytes: fs.statSync(png).size, requestCount: requests.length, requests });
    if (vp.name === '1440') {
      fs.writeFileSync(path.join(archive, 'dom-snapshot.html'), await page.content());
      const cdp = await context.newCDPSession(page);
      await cdp.send('Page.enable');
      const snapshot = await cdp.send('Page.captureSnapshot', { format: 'mhtml' });
      fs.writeFileSync(path.join(archive, 'claude-code.mhtml'), snapshot.data);
      fs.writeFileSync(path.join(archive, 'network-manifest.json'), JSON.stringify({ url, capturedAt: new Date().toISOString(), requests }, null, 2));
    }
    await context.close();
  }

  // Element captures at 2x DPR, after loading all lazy assets in a desktop context.
  const context = await browser.newContext({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 2, prefersReducedMotion: true });
  const page = await context.newPage();
  await loadAndReveal(page);
  await page.evaluate(() => {
    const pickHeading = (needle) => [...document.querySelectorAll('h1,h2')].find(el => (el.textContent || '').includes(needle));
    const mark = (name, el) => { if (el) el.setAttribute('data-capture-id', name); };
    mark('hero', document.querySelector('h1')?.closest('section'));
    mark('pricing', pickHeading('Get started with Claude Code')?.closest('section'));
    mark('code-workflow', pickHeading('What Claude Code can take on')?.closest('section'));
    mark('integrations', pickHeading('Meets you where you code')?.closest('section'));
    mark('newsletter', pickHeading('Create what’s exciting')?.closest('section'));
  });
  const picks = [
    { id: 'hero', file: '01-hero-shell.png', label: 'Hero + product shell' },
    { id: 'pricing', file: '02-pricing-plans.png', label: 'Plans and pricing' },
    { id: 'code-workflow', file: '03-code-workflow.png', label: 'Code workflow + terminal' },
    { id: 'integrations', file: '04-integrations.png', label: 'Terminal / IDE / web integrations' },
    { id: 'newsletter', file: '05-dark-newsletter.png', label: 'Dark developer newsletter' },
  ];
  const sectionManifest = [];
  for (const pick of picks) {
    const loc = page.locator(`[data-capture-id="${pick.id}"]`);
    await loc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const file = path.join(sections, pick.file);
    await loc.screenshot({ path: file });
    const box = await loc.boundingBox();
    sectionManifest.push({ ...pick, cssBox: box, pngDimensions: { width: Math.round(box.width * 2), height: Math.round(box.height * 2) }, bytes: fs.statSync(file).size, file: `sections/${pick.file}` });
  }
  fs.writeFileSync(path.join(archive, 'section-capture-manifest.json'), JSON.stringify({ url, dpr: 2, capturedAt: new Date().toISOString(), sections: sectionManifest }, null, 2));
  fs.writeFileSync(path.join(archive, 'capture-manifest.json'), JSON.stringify({ url, executablePath, playwrightVersion: require('playwright/package.json').version, browserVersion: browser.version(), capturedAt: new Date().toISOString(), viewports: manifests.map(({requests, ...x}) => x), sections: sectionManifest }, null, 2));
  await context.close();
  await browser.close();
  console.log(JSON.stringify({ mhtmlBytes: fs.statSync(path.join(archive, 'claude-code.mhtml')).size, viewports: manifests.map(x => ({ width: x.viewport.width, height: x.documentHeight, bytes: x.screenshotBytes })), sections: sectionManifest.map(x => ({ file: x.file, cssBox: x.cssBox, bytes: x.bytes })) }, null, 2));
})().catch(e => { console.error(e); process.exit(1); });
