#!/usr/bin/env node
/** Open the MHTML locally with all external protocols blocked. */
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const BROWSER = '/Users/wanghaichao/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
const MHTML = 'file://' + path.resolve(__dirname, 'stripe-home.mhtml');
(async() => {
  const browser = await chromium.launch({ executablePath:BROWSER, headless:true });
  const context = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1, reducedMotion:'reduce' });
  const requests = [];
  await context.route(/^https?:\/\//i, route => { requests.push({ url:route.request().url(), resourceType:route.request().resourceType(), blocked:true }); route.abort(); });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', m => { if (['error','warning'].includes(m.type())) consoleErrors.push({ type:m.type(), text:m.text().slice(0,500) }); });
  let loadError = null;
  try { await page.goto(MHTML, { waitUntil:'domcontentloaded', timeout:90000 }); } catch(e) { loadError = e.message; }
  await page.waitForLoadState('networkidle', { timeout:15000 }).catch(() => {});
  await page.waitForTimeout(4000);
  const state = await page.evaluate(() => ({
    url:location.href, title:document.title, readyState:document.readyState,
    h1:[...document.querySelectorAll('h1')].map(x=>x.innerText.trim().replace(/\s+/g,' ')),
    headings:document.querySelectorAll('h1,h2,h3,h4').length,
    rootChildren:document.querySelector('#__next')?.children.length ?? null,
    canvasCount:document.querySelectorAll('canvas').length,
    imageCount:document.images.length,
    stylesheetCount:document.styleSheets.length,
    scrollHeight:document.documentElement.scrollHeight,
    scrollWidth:document.documentElement.scrollWidth,
    heroSection:!!document.querySelector('.hero-section-container'),
    developerDark:!!document.querySelector('section.hds-mode--dark'),
    footer:!!document.querySelector('footer.footer')
  }));
  const screenshot = path.join(__dirname, 'offline-firstscreen.png');
  await page.screenshot({ path:screenshot, clip:{x:0,y:0,width:1440,height:900}, animations:'disabled' });
  const output = { source:MHTML, loaded:!loadError, loadError, state, externalRequestsBlocked:requests, consoleErrors, screenshot:'archive/offline-firstscreen.png', screenshotBytes:fs.statSync(screenshot).size };
  fs.writeFileSync(path.join(__dirname, 'offline-browser-check.json'), JSON.stringify(output, null, 2) + '\n');
  await browser.close();
  console.log(JSON.stringify({ ok:!loadError, state, blockedExternalRequests:requests.length, consoleIssues:consoleErrors.length }, null, 2));
})().catch(e=>{ console.error(e); process.exit(1); });
