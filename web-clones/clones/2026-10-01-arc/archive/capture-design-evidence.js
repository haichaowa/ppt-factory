'use strict';
const fs=require('node:fs'); const path=require('node:path');
const {chromium}=require('/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const BROWSER='/Users/wanghaichao/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
const props=['color','background-color','background-image','font-family','font-size','font-weight','line-height','letter-spacing','text-transform','padding','margin','gap','border-radius','display','flex-direction','align-items','justify-content','grid-template-columns','width','height','transform','transition','animation','opacity','object-fit'];
async function evidence(page){
 return await page.evaluate(props=>{
  const rect=el=>{const r=el.getBoundingClientRect();return{x:+r.x.toFixed(2),y:+(r.y+scrollY).toFixed(2),width:+r.width.toFixed(2),height:+r.height.toFixed(2)}};
  const style=el=>Object.fromEntries(props.map(p=>[p,getComputedStyle(el).getPropertyValue(p)]));
  const visible=el=>{const r=el.getBoundingClientRect();return r.width>1&&r.height>1&&getComputedStyle(el).display!=='none'&&getComputedStyle(el).visibility!=='hidden'};
  const vars={};
  for(const sheet of document.styleSheets){
    try{
      for(const rule of sheet.cssRules){
        if(!rule.style) continue;
        for(let i=0;i<rule.style.length;i++){
          const n=rule.style[i];
          if(n.startsWith('--')) vars[n]=rule.style.getPropertyValue(n).trim();
        }
      }
    }catch(e){}
  }
  const fontFaces=[]; const keyframes=[]; const media=[];
  for(const sheet of document.styleSheets){try{for(const rule of sheet.cssRules){
   if(rule instanceof CSSFontFaceRule)fontFaces.push({family:rule.style.getPropertyValue('font-family'),src:rule.style.getPropertyValue('src'),weight:rule.style.getPropertyValue('font-weight'),style:rule.style.getPropertyValue('font-style')});
   if(rule instanceof CSSKeyframesRule)keyframes.push({name:rule.name,cssText:rule.cssText.slice(0,3000)});
   if(rule instanceof CSSMediaRule)media.push(rule.conditionText);
  }}catch(e){}}
  const targets=[
   ['announcementTitle',/Meet Dia/],['announcementBody',/Weekly security updates/],['announcementCTA',/Try Dia/],
   ['heroH1',/Chrome replacement/],['heroNotice',/FYI: Arc receives/],['primaryCTA',/Download Arc for Mac/],
   ['featureOneTitle',/doesn’t just meet your needs/],['featureOneBody',/Clean and calm/],
   ['featureTwoTitle',/different sides of you/],['featureThreeTitle',/perfect setup/],['privacyTitle',/comfort of privacy/],['privacyBody',/built from the ground up/],
   ['footerCTA',/Enter your new home/]
  ].map(([name,re])=>({name,elements:[...document.querySelectorAll('h1,h2,h3,h4,p,a,button,span,div')].filter(el=>visible(el)&&re.test((el.innerText||'').trim())&&![...el.children].some(c=>re.test(c.innerText||''))).slice(0,3).map(el=>({tag:el.tagName,text:(el.innerText||'').trim().replace(/\s+/g,' '),rect:rect(el),styles:style(el)}))}));
  const sections=[...document.querySelectorAll('header,main > *,main section,footer,footer > *')].filter(visible).map((el,i)=>({index:i,tag:el.tagName,id:el.id,className:String(el.className),rect:rect(el),text:(el.innerText||'').trim().replace(/\s+/g,' ').slice(0,300),styles:style(el)}));
  const textLeaves=[...document.querySelectorAll('h1,h2,h3,h4,p,a,button,span')].filter(el=>visible(el)&&!(el.innerText||'').trim()===''&&![...el.children].some(c=>(c.innerText||'').trim())).slice(0,500).map(el=>({tag:el.tagName,text:(el.innerText||'').trim().replace(/\s+/g,' ').slice(0,180),rect:rect(el),styles:style(el)}));
  return {url:location.href,title:document.title,viewport:{width:innerWidth,height:innerHeight},scrollHeight:document.documentElement.scrollHeight,overflowX:document.documentElement.scrollWidth>innerWidth,cssVariables:vars,fontFaces,keyframes:[...new Set(media)],targets,sections,textLeaves,animations:[...document.getAnimations()].map(a=>{const t=a.effect?.getComputedTiming?.();const el=a.effect?.target;return{type:a.constructor.name,playState:a.playState,cssText:a.effect?.getKeyframes?.().map(f=>`${f.cssText} ${f.easing||''}`).join(' | ').slice(0,1200)||null,duration:t?.duration??null,delay:t?.delay??null,endDelay:t?.endDelay??null,iterations:t?.iterations??null,easing:t?.easing??null,target:el?el.tagName+(el.id?`#${el.id}`:'')+(el.className?`.${String(el.className).trim().split(/\s+/).join('.')}`:''):null}})};
 },props);
}
(async()=>{
 const browser=await chromium.launch({executablePath:BROWSER,headless:true});
 const out=[];
 for(const width of [1440,375]){
  const context=await browser.newContext({viewport:{width,height:width===375?812:900},deviceScaleFactor:1,isMobile:width===375,hasTouch:width===375,locale:'en-US',timezoneId:'Asia/Shanghai'});
  const page=await context.newPage();await page.goto('https://arc.net/',{waitUntil:'domcontentloaded',timeout:90000});await page.waitForLoadState('networkidle',{timeout:45000}).catch(()=>{});await page.waitForTimeout(2500);
  // Sample animations after native autoplay starts.
  await page.evaluate(async()=>{const h=document.documentElement.scrollHeight;for(let y=0;y<=h;y+=900){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,180));}window.scrollTo(0,0);await new Promise(r=>setTimeout(r,1000));});
  const data=await evidence(page);out.push(data);await context.close();
 }
 fs.writeFileSync(path.join(__dirname,'design-evidence.json'),JSON.stringify({source:'https://arc.net/',capturedAt:new Date().toISOString(),viewports:out},null,2)+'\n');await browser.close();console.log(JSON.stringify({ok:true,viewports:out.map(v=>({width:v.viewport.width,cssVariables:Object.keys(v.cssVariables).length,fontFaces:v.fontFaces.length,keyframes:v.keyframes.length,animations:v.animations.length,textLeaves:v.textLeaves.length}))},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
