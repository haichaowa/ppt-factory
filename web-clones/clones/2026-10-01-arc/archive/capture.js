'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const BROWSER = '/Users/wanghaichao/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
const URL = 'https://arc.net/';
const root = path.resolve(__dirname, '..');
const props = ['color','background-color','background-image','font-family','font-size','font-weight','line-height','letter-spacing','padding','margin','gap','border-radius','grid-template-columns','display','width','height','transform','transition','animation-name','animation-duration','animation-timing-function','opacity','mix-blend-mode','object-fit','box-shadow'];
const cssProps = ['color','background-color','background-image','font-family','font-size','font-weight','line-height','letter-spacing','padding','margin','gap','border-radius','display','width','height','transform','transition','animation','opacity'];
function rect(el) {
  const r = el.getBoundingClientRect();
  return { x:+r.x.toFixed(2), y:+(r.y+window.scrollY).toFixed(2), width:+r.width.toFixed(2), height:+r.height.toFixed(2), left:+r.left.toFixed(2), top:+r.top.toFixed(2), right:+r.right.toFixed(2), bottom:+r.bottom.toFixed(2) };
}
async function settle(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 90000 });
  await page.waitForLoadState('networkidle', { timeout: 45000 }).catch(() => {});
  await page.evaluate(async () => {
    document.fonts?.ready?.catch?.(() => {});
    const last = Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0);
    for (let y = 0; y <= last; y += 650) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 70)); }
    window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 750));
  });
  await page.waitForTimeout(3500);
}
(async () => {
  const browser = await chromium.launch({ executablePath: BROWSER, headless: true });
  const manifest = { source: URL, capturedAt: new Date().toISOString(), browser: chromium.name(), viewports: [], mhtml: null, resources: [] };
  let mhtmlBytes = 0;
  for (const width of [1440, 1280, 375]) {
    const height = width === 375 ? 812 : 900;
    const context = await browser.newContext({ viewport:{width,height}, deviceScaleFactor:1, isMobile:width===375, hasTouch:width===375, reducedMotion:'reduce', locale:'en-US', timezoneId:'Asia/Shanghai' });
    const page = await context.newPage();
    const response = await page.goto(URL, { waitUntil:'domcontentloaded', timeout:90000 });
    await settle(page);
    const metrics = await page.evaluate(({width, height, props}) => {
      const rect = el => { const r = el.getBoundingClientRect(); return { x:+r.x.toFixed(2), y:+(r.y+window.scrollY).toFixed(2), width:+r.width.toFixed(2), height:+r.height.toFixed(2), left:+r.left.toFixed(2), top:+r.top.toFixed(2), right:+r.right.toFixed(2), bottom:+r.bottom.toFixed(2) }; };
      const style = el => Object.fromEntries(props.map(p => [p, getComputedStyle(el).getPropertyValue(p)]));
      const all = [...document.querySelectorAll('body *')];
      const visible = el => { const r = el.getBoundingClientRect(); return r.width > 2 && r.height > 2 && getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).display !== 'none'; };
      const top = [...document.querySelectorAll('header, main > *, main > * > section, footer, footer > *')].filter(visible).map((el, i) => ({ index:i, tag:el.tagName, id:el.id, className:String(el.className), rect:rect(el), text:(el.innerText || '').trim().replace(/\s+/g,' ').slice(0,500), styles:style(el) }));
      const headings = [...document.querySelectorAll('h1,h2,h3,h4')].filter(visible).map(el => ({tag:el.tagName, text:el.innerText.trim().replace(/\s+/g,' '), rect:rect(el), styles:style(el)}));
      const buttons = [...document.querySelectorAll('a,button,[role=button]')].filter(el => visible(el) && /download|try|learn/i.test(el.innerText||'')).slice(0,20).map(el => ({tag:el.tagName, role:el.getAttribute('role'), text:(el.innerText||el.getAttribute('aria-label')||'').trim().replace(/\s+/g,' '), rect:rect(el), styles:style(el), href:el.href || null}));
      const media = [...document.querySelectorAll('img,video,canvas')].filter(visible).map((el,i) => ({index:i, tag:el.tagName, alt:el.alt || el.getAttribute('aria-label') || '', src:el.currentSrc || el.src || null, poster:el.poster || null, rect:rect(el), styles:style(el)}));
      const computedFrequencies = {};
      for (const prop of props) {
        const counts = new Map();
        for (const el of all) {
          if (!visible(el)) continue;
          const value = getComputedStyle(el).getPropertyValue(prop).trim();
          if (!value || value === 'none' || value === 'auto' || value === 'normal') continue;
          counts.set(value, (counts.get(value) || 0) + 1);
        }
        computedFrequencies[prop] = [...counts.entries()].sort((a,b) => b[1]-a[1] || a[0].localeCompare(b[0])).slice(0,40).map(([value,count])=>({value,count}));
      }
      const stylesheets = [...document.styleSheets].map(s => ({href:s.href, rules:'blocked'}));
      return { url:location.href, title:document.title, viewport:{width, height}, document:{scrollWidth:document.documentElement.scrollWidth, scrollHeight:document.documentElement.scrollHeight, clientWidth:document.documentElement.clientWidth, clientHeight:document.documentElement.clientHeight, bodyScrollWidth:document.body.scrollWidth, bodyScrollHeight:document.body.scrollHeight, overflowX:document.documentElement.scrollWidth > document.documentElement.clientWidth}, topSections:top, headings, actionElements:buttons, media, computedFrequencies, stylesheets, matchMedia:{mobileMax479:matchMedia('(max-width:479px)').matches, mobileMax767:matchMedia('(max-width:767px)').matches, tabletMin768:matchMedia('(min-width:768px)').matches, desktopMin1024:matchMedia('(min-width:1024px)').matches, reducedMotion:matchMedia('(prefers-reduced-motion:reduce)').matches}, animations:[...document.getAnimations?.() || []].slice(0,100).map(a => ({type:a.constructor.name, duration:a.effect?.getComputedTiming?.().duration ?? null, delay:a.effect?.getComputedTiming?.().delay ?? null, easing:a.effect?.getComputedTiming?.().easing ?? null, targetDescription:a.effect?.target ? (a.effect.target.tagName + (a.effect.target.className ? '.'+String(a.effect.target.className).split(/\s+/).join('.') : '')) : null})) };
    }, {width, height, props});
    metrics.response = { status: response?.status(), url: response?.url(), headers: Object.entries(response?.headers() || {}).map(([name,value])=>({name,value})) };
    const fullFile = path.join(root, 'screenshots', `arc-home-${width}-fullpage.png`);
    await page.screenshot({ path: fullFile, fullPage:true, animations:'disabled' });
    const firstFile = path.join(__dirname, `viewport-${width}-firstscreen.png`);
    await page.screenshot({ path:firstFile, clip:{x:0,y:0,width,height}, animations:'disabled' });
    if (width === 1440) {
      fs.writeFileSync(path.join(__dirname, 'live-dom.html'), await page.content());
      const session = await page.context().newCDPSession(page);
      const snap = await session.send('Page.captureSnapshot', { format:'mhtml' });
      fs.writeFileSync(path.join(__dirname, 'arc-home.mhtml'), snap.data);
      mhtmlBytes = Buffer.byteLength(snap.data);
      const resourceEntries = await page.evaluate(() => performance.getEntriesByType('resource').map(r => ({name:r.name, initiatorType:r.initiatorType, transferSize:r.transferSize, encodedBodySize:r.encodedBodySize, decodedBodySize:r.decodedBodySize})));
      fs.writeFileSync(path.join(__dirname, 'performance-resources.json'), JSON.stringify(resourceEntries, null, 2) + '\n');
      manifest.resources = resourceEntries;
      // Capture all rendered font URLs from stylesheets into a rights/asset evidence file.
      const fontURLs = await page.evaluate(async () => {
        const urls = new Set();
        for (const sheet of document.styleSheets) {
          try { for (const rule of sheet.cssRules) { const s = rule.style; if (s) { for (const p of ['src','backgroundImage']) { const m = String(s[p] || '').match(/url\((['\"]?)(.*?)\1\)/g) || []; for (const x of m) { const u=x.replace(/^url\((['\"]?)/,'').replace(/(['\"]?)\)$/,''); if (/font|woff/i.test(u)) urls.add(new URL(u, location.href).href); } } } } } catch(e) {}
        }
        return [...urls];
      });
      fs.writeFileSync(path.join(__dirname, 'font-urls.json'), JSON.stringify(fontURLs, null, 2) + '\n');
      // Key elements for section extraction and future offline checks.
      const keyElements = await page.evaluate(({props}) => {
        const rect = el => { const r = el.getBoundingClientRect(); return { x:+r.x.toFixed(2), y:+(r.y+window.scrollY).toFixed(2), width:+r.width.toFixed(2), height:+r.height.toFixed(2) }; };
        const style = el => Object.fromEntries(props.map(p => [p, getComputedStyle(el).getPropertyValue(p)]));
        const q = [...document.querySelectorAll('main > *')];
        return q.map((el,i)=>({index:i,tag:el.tagName,id:el.id,className:String(el.className),rect:rect(el),text:(el.innerText||'').trim().replace(/\s+/g,' ').slice(0,700),styles:style(el)}));
      }, {props:cssProps});
      fs.writeFileSync(path.join(__dirname, 'key-element-metrics.json'), JSON.stringify(keyElements, null, 2) + '\n');
    }
    manifest.viewports.push({ width, height, responseStatus: response?.status(), finalURL: page.url(), title: await page.title(), scrollHeight: metrics.document.scrollHeight, scrollWidth: metrics.document.scrollWidth, overflowX: metrics.document.overflowX, screenshot:{path:path.relative(root,fullFile),bytes:fs.statSync(fullFile).size}, firstscreen:{path:path.relative(root,firstFile),bytes:fs.statSync(firstFile).size}, metrics });
    fs.writeFileSync(path.join(__dirname, `viewport-${width}-metrics.json`), JSON.stringify(metrics, null, 2) + '\n');
    await context.close();
  }
  // Save robots with the same Chromium context; if blocked, preserve evidence.
  const rcontext = await browser.newContext({ userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', locale:'en-US', timezoneId:'Asia/Shanghai' });
  const rpage = await rcontext.newPage();
  const robotsResponse = await rpage.goto('https://arc.net/robots.txt', { waitUntil:'domcontentloaded', timeout:60000 }).catch(e => null);
  const robotsText = robotsResponse ? await robotsResponse.text() : String(robotsResponse);
  fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsText);
  manifest.robots = { status: robotsResponse?.status() ?? 'navigation-failed', url: rpage.url(), title: await rpage.title(), contentType: robotsResponse?.headers()['content-type'] || null, bytes: Buffer.byteLength(robotsText) };
  await browser.close();
  manifest.mhtml = { path:'archive/arc-home.mhtml', bytes:mhtmlBytes };
  fs.writeFileSync(path.join(__dirname, 'capture-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(JSON.stringify({ ok:true, mhtmlBytes, viewports: manifest.viewports.map(v=>({width:v.width,status:v.responseStatus,height:v.scrollHeight,overflowX:v.overflowX,screenshot:v.screenshot.bytes})), robots: manifest.robots }, null, 2));
})().catch(e => { console.error(e); process.exit(1); });
