'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const BROWSER = '/Users/wanghaichao/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
const URL = 'https://www.framer.com/';
const root = path.resolve(__dirname, '..');
const styleProps = [
  'color','background-color','background-image','font-family','font-size','font-weight','line-height','letter-spacing','text-transform','padding','margin','gap','border','border-radius','box-shadow','display','grid-template-columns','flex-direction','align-items','justify-content','width','height','max-width','transform','transition','animation','animation-duration','animation-timing-function','opacity','mix-blend-mode','filter','backdrop-filter','object-fit','overflow','text-overflow','white-space'
];

function rel(file) { return path.relative(root, file); }
function byteSize(file) { return fs.statSync(file).size; }

async function settle(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 90000 });
  await page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => {});
  await page.evaluate(async () => {
    await document.fonts?.ready?.catch?.(() => {});
    const last = Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0);
    for (let y = 0; y <= last; y += 620) {
      window.scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 65));
    }
    window.scrollTo(0, 0);
    await new Promise(resolve => setTimeout(resolve, 1000));
  });
  await page.waitForTimeout(3500);
}

(async () => {
  const browser = await chromium.launch({ executablePath: BROWSER, headless: true });
  const manifest = {
    source: URL,
    capturedAt: new Date().toISOString(),
    captureIntent: 'High-fidelity local homepage archive: canonical full-page PNG, CDP MHTML, live DOM, computed styles, and resource evidence.',
    browser: 'Chromium via Playwright',
    viewports: [],
    mhtml: null,
    notes: [
      'wget is unavailable on this host, so the preferred wget mirror path could not be executed.',
      'MHTML is captured from the live rendered page and contains page resources embedded by Chromium.'
    ]
  };
  let mhtmlBytes = 0;

  for (const width of [1440, 1280, 375]) {
    const height = width === 375 ? 812 : 900;
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 1,
      isMobile: width === 375,
      hasTouch: width === 375,
      reducedMotion: 'reduce',
      locale: 'en-US',
      timezoneId: 'Asia/Shanghai',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();
    const response = await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await settle(page);

    const metrics = await page.evaluate(({ styleProps, width, height }) => {
      const round = n => Number.isFinite(n) ? +n.toFixed(2) : null;
      const rect = el => {
        const r = el.getBoundingClientRect();
        return { x: round(r.x), y: round(r.y + window.scrollY), width: round(r.width), height: round(r.height), left: round(r.left), top: round(r.top + window.scrollY), right: round(r.right), bottom: round(r.bottom + window.scrollY) };
      };
      const style = el => Object.fromEntries(styleProps.map(prop => [prop, getComputedStyle(el).getPropertyValue(prop)]));
      const visible = el => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none' && cs.opacity !== '0';
      };
      const clean = value => String(value || '').replace(/\s+/g, ' ').trim();
      const all = [...document.querySelectorAll('body *')];
      const topStructure = [...document.querySelector('main')?.children || []].filter(visible).map((el, index) => ({
        index, tag: el.tagName, id: el.id || null, className: clean(el.className), rect: rect(el),
        heading: clean(el.querySelector('h1,h2,h3')?.innerText || ''),
        text: clean(el.innerText).slice(0, 500), styles: style(el)
      }));
      const headings = [...document.querySelectorAll('h1,h2,h3,h4')].filter(visible).map(el => ({ tag: el.tagName, text: clean(el.innerText), rect: rect(el), styles: style(el) }));
      const textLeaves = [...document.querySelectorAll('h1,h2,h3,h4,p,a,button,li,figcaption,span')]
        .filter(el => visible(el) && clean(el.innerText) && ![...el.children].some(child => clean(child.innerText) === clean(el.innerText)))
        .slice(0, 220)
        .map(el => ({ tag: el.tagName, role: el.getAttribute('role'), text: clean(el.innerText).slice(0, 280), rect: rect(el), styles: style(el), href: el.href || null }));
      const actions = [...document.querySelectorAll('a,button,[role="button"]')].filter(el => visible(el) && /free|start|download|learn|pricing|enterprise|template|publish|canvas|agent/i.test(clean(el.innerText))).slice(0, 42).map(el => ({ tag: el.tagName, text: clean(el.innerText || el.getAttribute('aria-label')), rect: rect(el), styles: style(el), href: el.href || null }));
      const media = [...document.querySelectorAll('img,video,canvas,svg')].filter(visible).map((el, index) => ({
        index, tag: el.tagName, alt: clean(el.alt || el.getAttribute('aria-label')), src: el.currentSrc || el.src || null, poster: el.poster || null, rect: rect(el), styles: style(el)
      }));
      const surfaces = [...document.querySelectorAll('header,main > *,main > * > *,section,footer')].filter(visible).slice(0, 260).map((el, index) => ({ index, tag: el.tagName, id: el.id || null, className: clean(el.className).slice(0, 400), rect: rect(el), text: clean(el.innerText).slice(0, 260), styles: style(el) }));
      const frequencies = {};
      for (const prop of styleProps) {
        const counts = new Map();
        for (const el of all) {
          const value = getComputedStyle(el).getPropertyValue(prop).trim();
          if (!value || value === 'none' || value === 'normal' || value === 'auto') continue;
          counts.set(value, (counts.get(value) || 0) + 1);
        }
        frequencies[prop] = [...counts.entries()].sort((a,b) => b[1]-a[1] || a[0].localeCompare(b[0])).slice(0, 24).map(([value,count]) => ({value,count}));
      }
      const links = [...document.querySelectorAll('a[href]')].map(a => ({ text: clean(a.innerText || a.getAttribute('aria-label')), href: a.href }));
      return {
        viewport: { width, height }, document: { ...rect(document.documentElement), scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight, clientWidth: document.documentElement.clientWidth, clientHeight: document.documentElement.clientHeight, overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth },
        counts: { all: all.length, headings: headings.length, textLeaves: textLeaves.length, actions: actions.length, media: media.length, links: links.length, images: document.images.length, stylesheets: [...document.styleSheets].length },
        topStructure, headings, textLeaves, actions, media, surfaces, computedFrequencies: frequencies,
        externalLinks: [...new Set(links.map(x => { try { return new URL(x.href).origin; } catch { return null; } }).filter(Boolean))]
      };
    }, { styleProps, width, height });

    const fullFile = path.resolve(root, 'screenshots', `framer-home-${width}-fullpage.png`);
    const firstFile = path.resolve(__dirname, `viewport-${width}-firstscreen.png`);
    await page.screenshot({ path: fullFile, fullPage: true, animations: 'disabled' });
    await page.screenshot({ path: firstFile, animations: 'disabled' });
    fs.writeFileSync(path.join(__dirname, `viewport-${width}-metrics.json`), JSON.stringify(metrics, null, 2) + '\n');

    if (width === 1440) {
      const cdp = await context.newCDPSession(page);
      const snapshot = await cdp.send('Page.captureSnapshot', { format: 'mhtml' });
      fs.writeFileSync(path.join(__dirname, 'framer-home.mhtml'), snapshot.data, 'utf8');
      mhtmlBytes = Buffer.byteLength(snapshot.data);
      fs.writeFileSync(path.join(__dirname, 'live-dom.html'), await page.content(), 'utf8');
      const resources = await page.evaluate(() => performance.getEntriesByType('resource').map(entry => ({
        name: entry.name, initiatorType: entry.initiatorType, transferSize: entry.transferSize, encodedBodySize: entry.encodedBodySize, decodedBodySize: entry.decodedBodySize, duration: entry.duration
      })).sort((a,b) => b.decodedBodySize - a.decodedBodySize));
      fs.writeFileSync(path.join(__dirname, 'performance-resources.json'), JSON.stringify(resources, null, 2) + '\n');
    }

    manifest.viewports.push({
      width, height, responseStatus: response?.status(), finalURL: page.url(), title: await page.title(),
      scrollHeight: metrics.document.scrollHeight, scrollWidth: metrics.document.scrollWidth, overflowX: metrics.document.overflowX,
      counts: metrics.counts, screenshot: { path: rel(fullFile), bytes: byteSize(fullFile) }, firstScreen: { path: rel(firstFile), bytes: byteSize(firstFile) }
    });
    await context.close();
  }

  manifest.mhtml = { path: 'archive/framer-home.mhtml', bytes: mhtmlBytes };
  fs.writeFileSync(path.join(__dirname, 'capture-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  await browser.close();
  console.log(JSON.stringify({ ok: true, mhtmlBytes, viewports: manifest.viewports }, null, 2));
})().catch(error => { console.error(error); process.exit(1); });
