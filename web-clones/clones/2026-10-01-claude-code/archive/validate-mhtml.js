const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch').default;
const root = path.resolve(__dirname, '..');
const archive = path.join(root, 'archive');
const url = 'https://claude.com/product/claude-code';
const mhtml = path.join(archive, 'claude-code.mhtml');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  async function shot(kind, target) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, prefersReducedMotion: true });
    const page = await context.newPage();
    const blocked=[];
    if (kind === 'offline') {
      await context.route('http://**/*', route => { blocked.push(route.request().url()); return route.abort(); });
      await context.route('https://**/*', route => { blocked.push(route.request().url()); return route.abort(); });
    }
    await page.goto(target, { waitUntil: 'load', timeout: 90000 });
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.evaluate(async () => { await document.fonts.ready; });
    await page.waitForTimeout(5000);
    const file = path.join(archive, `${kind}-firstscreen.png`);
    await page.screenshot({ path: file, clip: { x: 0, y: 0, width: 1440, height: 1000 }, animations: 'disabled' });
    const dom = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim() || '',
      h2Count: document.querySelectorAll('h2').length,
      shellPresent: !!document.querySelector('[class*=AppShell]'),
      fontChecks: {
        sans: document.fonts.check('16px anthropicSans'),
        serif: document.fonts.check('16px anthropicSerif'),
        mono: document.fonts.check('16px anthropicMono'),
      },
      bodyComputed: getComputedStyle(document.body).fontFamily,
    }));
    await context.close();
    return { file, dom, blocked };
  }
  const live = await shot('live', url);
  const offline = await shot('offline', 'file://' + encodeURIComponent(mhtml).replaceAll('%2F', '/'));
  const a = PNG.sync.read(fs.readFileSync(live.file));
  const b = PNG.sync.read(fs.readFileSync(offline.file));
  const diff = new PNG({ width: a.width, height: a.height });
  const different = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.10 });
  const diffFile = path.join(archive, 'offline-fidelity-diff.png');
  fs.writeFileSync(diffFile, PNG.sync.write(diff));
  let channelError = 0;
  for (let i=0;i<a.data.length;i+=4) channelError += Math.abs(a.data[i]-b.data[i])+Math.abs(a.data[i+1]-b.data[i+1])+Math.abs(a.data[i+2]-b.data[i+2]);
  const result = {
    method: 'Live URL and local MHTML reopened in separate Chromium contexts; viewport 1440x1000, DPR 1, prefers-reduced-motion, 5s stabilization, animations disabled for screenshots, offline network routes aborted.',
    live: live.dom,
    offline: offline.dom,
    blockedExternalRequests: offline.blocked,
    dimensions: { width: a.width, height: a.height },
    differentPixels: different,
    totalPixels: a.width * a.height,
    matchingRatio: +(1 - different/(a.width*a.height)).toFixed(6),
    meanAbsoluteChannelError: +(channelError/(a.width*a.height*3)).toFixed(6),
    pixelmatchThreshold: 0.10,
    diffPng: 'offline-fidelity-diff.png',
    livePng: 'live-firstscreen.png',
    offlinePng: 'offline-firstscreen.png',
  };
  fs.writeFileSync(path.join(archive, 'offline-fidelity.json'), JSON.stringify(result, null, 2));
  fs.writeFileSync(path.join(archive, 'mhtml-browser-check.json'), JSON.stringify({ offline: offline.dom, mhtmlBytes: fs.statSync(mhtml).size, openedWithFileUrl: true, externalRequestsBlocked: offline.blocked.length }, null, 2));
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
