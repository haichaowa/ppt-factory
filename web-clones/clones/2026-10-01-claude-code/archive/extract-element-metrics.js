const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const url = 'https://claude.com/product/claude-code';
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const context = await browser.newContext({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1, prefersReducedMotion: true });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  await page.evaluate(async () => { await document.fonts.ready; });
  const data = await page.evaluate(() => {
    const clean = s => (s || '').replace(/\s+/g, ' ').trim();
    const box = el => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x + scrollX), y: Math.round(r.y + scrollY), width: Math.round(r.width), height: Math.round(r.height) }; };
    const style = el => { const c = getComputedStyle(el); return { display:c.display, color:c.color, backgroundColor:c.backgroundColor, backgroundImage:c.backgroundImage, fontFamily:c.fontFamily, fontSize:c.fontSize, fontWeight:c.fontWeight, lineHeight:c.lineHeight, letterSpacing:c.letterSpacing, borderRadius:c.borderRadius, padding:c.padding, margin:c.margin, gap:c.gap, boxShadow:c.boxShadow, border:c.border, transition:c.transition, animation:c.animation }; };
    const d = el => ({ tag:el.tagName, className:String(el.className||''), id:el.id||'', text:clean(el.textContent).slice(0,400), box:box(el), style:style(el) });
    const ancestorChain = el => { const out=[]; let n=el; for(let i=0;n&&i<8;i++,n=n.parentElement) out.push(d(n)); return out; };
    const out = { capturedAt:new Date().toISOString(), viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio} };
    const pro = [...document.querySelectorAll('h3')].find(e => clean(e.textContent)==='Pro');
    out.pricingProAncestors = pro ? ancestorChain(pro) : [];
    const max5 = [...document.querySelectorAll('h3')].find(e => clean(e.textContent)==='Max 5x');
    out.pricingMaxAncestors = max5 ? ancestorChain(max5) : [];
    out.pricingCards = [...document.querySelectorAll('main h3')].filter(e => /^(Pro|Max 5x|Max 20x)$/.test(clean(e.textContent))).map(e => {
      for (let n=e.parentElement; n; n=n.parentElement) { const c=getComputedStyle(n); if (c.backgroundColor !== 'rgba(0, 0, 0, 0)' || c.boxShadow !== 'none' || c.borderRadius !== '0px') return d(n); }
      return d(e.parentElement);
    });
    const appShell = document.querySelector('[class*=AppShell]');
    out.heroProductShell = appShell ? d(appShell) : null;
    out.heroProductShellDescendants = appShell ? [...appShell.querySelectorAll('*')].slice(0,180).map(d) : [];
    const terminal = document.querySelector('[class*=terminalColumn]');
    out.terminalAncestors = terminal ? ancestorChain(terminal.firstElementChild || terminal) : [];
    out.terminalDescendants = terminal ? [...terminal.querySelectorAll('*')].slice(0,260).map(d) : [];
    const cmd = document.querySelector('[class*=commandWrap]');
    out.commandAncestors = cmd ? ancestorChain(cmd) : [];
    out.commandDescendants = cmd ? [...cmd.querySelectorAll('*')].map(d) : [];
    return out;
  });
  fs.writeFileSync(path.join(root, 'archive', 'key-element-metrics.json'), JSON.stringify(data, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
