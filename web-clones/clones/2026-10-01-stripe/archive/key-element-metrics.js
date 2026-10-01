#!/usr/bin/env node
/** Focused live-DOM evidence for Stripe's hero, gradients, motion and controls. */
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const ROOT = path.resolve(__dirname, '..');
const BROWSER = '/Users/wanghaichao/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
const selectors = {
  page: 'html',
  navigation: 'header.navigation',
  hero: 'section.hero-section-container',
  heroBackground: '.hero-section__background',
  heroCanvas: '.hero-wave-animation__canvas',
  heroFallback: '.hero-wave-animation__static img',
  heroH1Background: '.hero-section__title--background',
  heroH1Foreground: '.hero-section__title--foreground',
  heroTicker: '.hero-section__eyebrow-value',
  heroPrimaryCta: '.hero-section__actions a',
  logoMarquee: '.logo-carousel__marquee',
  modularSection: '.modular-solutions-section',
  bentoGradientBorder: '.modular-solutions-bento-card__border-color-gradient',
  statsSection: '.stats-section',
  statsDaytimeGradient: '.stats-animation-gradient__gradient--daytime',
  statsSunriseGradient: '.stats-animation-gradient__gradient--sunrise',
  businessSizes: '.business-sizes-section',
  developerDark: 'section.hds-mode--dark',
  footer: 'footer.footer'
};
const properties = [
  'color','background-color','background-image','background-position','background-size','background-clip','-webkit-background-clip','-webkit-text-fill-color',
  'font-family','font-size','font-weight','line-height','letter-spacing','text-transform',
  'width','height','padding','margin','gap','border','border-radius','box-shadow','outline',
  'position','z-index','display','grid-template-columns','max-width','transform','transition','transition-duration','transition-timing-function','animation','animation-duration','animation-timing-function','opacity','filter','backdrop-filter','mix-blend-mode','clip-path','mask-image','overflow'
];
async function wait(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 90000 });
  await page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => {});
  await page.evaluate(async () => {
    const last = document.documentElement.scrollHeight;
    for (let y = 0; y <= last; y += 750) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 70)); }
    window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 800));
  });
  await page.waitForTimeout(6000);
}
(async() => {
  const browser = await chromium.launch({ executablePath:BROWSER, headless:true });
  const context = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1, locale:'en-US', timezoneId:'Asia/Shanghai', reducedMotion:'reduce' });
  const page = await context.newPage();
  const response = await page.goto('https://stripe.com/', { waitUntil:'domcontentloaded', timeout:90000 });
  await wait(page);
  const result = await page.evaluate(({ selectors, properties }) => {
    const rect = el => { const r=el.getBoundingClientRect(); return { x:+r.x.toFixed(3), y:+(r.y+scrollY).toFixed(3), width:+r.width.toFixed(3), height:+r.height.toFixed(3), top:+r.top.toFixed(3), left:+r.left.toFixed(3) }; };
    const elements = {};
    for (const [name, selector] of Object.entries(selectors)) {
      const el = document.querySelector(selector);
      if (!el) { elements[name] = { selector, missing:true }; continue; }
      const style = getComputedStyle(el);
      elements[name] = {
        selector, tagName:el.tagName.toLowerCase(), className:String(el.className), id:el.id || null, rect:rect(el),
        attributes:{ width:el.getAttribute('width'), height:el.getAttribute('height'), dataEngine:el.getAttribute('data-engine'), src:el.getAttribute('src'), srcset:el.getAttribute('srcset') ? el.getAttribute('srcset').slice(0,500) : null },
        text:(el.innerText||'').trim().replace(/\s+/g,' ').slice(0,350) || null,
        styles:Object.fromEntries(properties.map(p => [p, style.getPropertyValue(p)]))
      };
    }
    const allH1 = [...document.querySelectorAll('.hero-section__title')].map((el,i) => ({ index:i, className:String(el.className), rect:rect(el), styles:Object.fromEntries(properties.map(p => [p, getComputedStyle(el).getPropertyValue(p)])) }));
    const cssVars = {};
    const collect = rule => {
      if (!rule.style) return;
      for (let i=0; i<rule.style.length; i++) {
        const name = rule.style[i];
        if (name.startsWith('--')) cssVars[name] = rule.style.getPropertyValue(name).trim();
      }
      if (rule.cssRules) for (const child of rule.cssRules) collect(child);
    };
    for (const sheet of document.styleSheets) { try { for (const rule of sheet.cssRules) collect(rule); } catch {} }
    const resolved = {};
    const targets = [document.documentElement, document.querySelector('.hds-color-mode')].filter(Boolean);
    for (const [name, value] of Object.entries(cssVars)) {
      for (let i=0; i<targets.length; i++) {
        const resolvedValue = getComputedStyle(targets[i]).getPropertyValue(name).trim();
        if (resolvedValue) { resolved[name] = { sourceValue:value, resolved:resolvedValue, target:i === 0 ? 'html' : '.hds-color-mode' }; break; }
      }
    }
    const media = [...document.styleSheets].flatMap(sheet => { try { return [...sheet.cssRules].filter(r => r instanceof CSSMediaRule).map(r => r.conditionText) } catch { return [] } });
    return { document:{ url:location.href,title:document.title,scrollHeight:document.documentElement.scrollHeight,scrollWidth:document.documentElement.scrollWidth }, elements, heroTitleCopies:allH1, cssVariablesFound:cssVars, cssVariablesResolved:resolved, mediaConditions:[...new Set(media)] };
  }, { selectors, properties });
  result.response = { status:response?.status(), url:response?.url() };
  fs.writeFileSync(path.join(__dirname, 'key-element-metrics.json'), JSON.stringify(result, null, 2) + '\n');
  await browser.close();
  console.log(JSON.stringify({ ok:true, selectors:Object.keys(result.elements).length, cssVariablesFound:Object.keys(result.cssVariablesFound).length, cssVariablesResolved:Object.keys(result.cssVariablesResolved).length, mediaConditions:result.mediaConditions.length }, null, 2));
})().catch(e => { console.error(e); process.exit(1); });
