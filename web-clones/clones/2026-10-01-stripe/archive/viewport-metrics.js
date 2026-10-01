#!/usr/bin/env node
/** Cross-viewport geometry and computed-style evidence for the Stripe homepage. */
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const BROWSER = '/Users/wanghaichao/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
const props = ['color','background-color','background-image','font-family','font-size','font-weight','line-height','letter-spacing','padding','margin','gap','border-radius','grid-template-columns','display','width','height','transform','transition','animation','opacity'];
async function settle(page) {
  await page.waitForLoadState('domcontentloaded', { timeout:90000 });
  await page.waitForLoadState('networkidle', { timeout:60000 }).catch(()=>{});
  await page.evaluate(async () => {
    const last=document.documentElement.scrollHeight;
    for(let y=0;y<=last;y+=650){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}
    window.scrollTo(0,0);await new Promise(r=>setTimeout(r,600));
  });
  await page.waitForTimeout(5000);
}
(async()=>{
 const browser=await chromium.launch({executablePath:BROWSER,headless:true});
 const results=[]; const screenshots=[];
 for(const width of [1440,1280,375]) {
   const context=await browser.newContext({viewport:{width,height:width===375?812:900},deviceScaleFactor:1,isMobile:width===375,hasTouch:width===375,reducedMotion:'reduce',locale:'en-US',timezoneId:'Asia/Shanghai'});
   const page=await context.newPage(); const response=await page.goto('https://stripe.com/',{waitUntil:'domcontentloaded',timeout:90000}); await settle(page);
   const data=await page.evaluate(({width,props})=>{
     const rect=el=>{const r=el.getBoundingClientRect();return{x:+r.x.toFixed(2),y:+(r.y+scrollY).toFixed(2),width:+r.width.toFixed(2),height:+r.height.toFixed(2)}};
     const style=el=>Object.fromEntries(props.map(p=>[p,getComputedStyle(el).getPropertyValue(p)]));
     const q=s=>document.querySelector(s);
     const named={navigation:q('header.navigation'),hero:q('.hero-section-container'),heroCanvas:q('.hero-wave-animation__canvas'),heroFallback:q('.hero-wave-animation__static img'),heroPrimaryCta:q('.hero-section__actions a'),bento:q('.modular-solutions-section'),stats:q('.stats-section'),business:q('.business-sizes-section'),developer:[...document.querySelectorAll('section.hds-mode--dark')].at(-1),footerCta:q('.footer-cta-section'),footer:q('footer.footer')};
     const elements={};
     for(const [name,el] of Object.entries(named)) elements[name]=el?{selector:String(name),rect:rect(el),text:(el.innerText||'').trim().replace(/\s+/g,' ').slice(0,180),styles:style(el)}:{missing:true};
     const topSections=[...document.querySelectorAll('header,section,footer')].filter(el=>!el.parentElement?.closest('header,section,footer')&&el.getBoundingClientRect().height>30).map((el,i)=>({index:i,tag:el.tagName,className:String(el.className),...rect(el),text:(el.innerText||'').trim().replace(/\s+/g,' ').slice(0,120)}));
     const headings=[...document.querySelectorAll('h1,h2,h3')].map(el=>({tag:el.tagName,text:el.innerText.trim().replace(/\s+/g,' '),...rect(el),...style(el)}));
     return {viewport:{width,height:innerHeight},document:{url:location.href,title:document.title,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,overflowX:document.documentElement.scrollWidth>innerWidth},elements,topSections,headings,matchMedia:{mobileMaxWidth639:matchMedia('(max-width:639px)').matches,tabletMin640:matchMedia('(min-width:640px)').matches,desktopMin940:matchMedia('(min-width:940px)').matches,largeMin1264:matchMedia('(min-width:1264px)').matches,reducedMotion:matchMedia('(prefers-reduced-motion:reduce)').matches}};
   },{width,props});
   data.response={status:response?.status(),url:response?.url()};
   let screenshot=null;
   if(width!==1440){const file=path.join(__dirname,`viewport-${width}-firstscreen.png`);await page.screenshot({path:file,clip:{x:0,y:0,width,height:width===375?812:900},animations:'disabled'});screenshot={file:`archive/viewport-${width}-firstscreen.png`,width,height:width===375?812:900,bytes:fs.statSync(file).size};screenshots.push(screenshot);}
   results.push(data);await context.close();
 }
 const css=json=>JSON.parse(fs.readFileSync(path.join(__dirname,'css-token-evidence.json'),'utf8'));
 const media={};for(const c of css().mediaConditions)media[c.trim()]=null;
 const output={source:'https://stripe.com/',capturedAt:new Date().toISOString(),viewports:results,screenshots:screenshots,cssMediaConditionFamilies:css().mediaConditions.map(x=>x.trim())};
 fs.writeFileSync(path.join(__dirname,'responsive-metrics.json'),JSON.stringify(output,null,2)+'\n');
 await browser.close();console.log(JSON.stringify({ok:true,viewports:results.map(r=>({width:r.viewport.width,height:r.document.scrollHeight,overflowX:r.document.overflowX,topSections:r.topSections.length})),screenshots},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
