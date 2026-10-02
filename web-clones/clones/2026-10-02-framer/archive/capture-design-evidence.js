'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const BROWSER = '/Users/wanghaichao/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
const URL = 'https://www.framer.com/';
const props = ['color','background-color','background-image','font-family','font-size','font-weight','line-height','letter-spacing','text-transform','padding','margin','gap','border','border-radius','box-shadow','display','grid-template-columns','flex-direction','align-items','justify-content','width','height','max-width','transform','transition','animation','opacity','mix-blend-mode','filter','backdrop-filter','object-fit','overflow'];
(async()=>{
  const browser=await chromium.launch({executablePath:BROWSER,headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,locale:'en-US',timezoneId:'Asia/Shanghai'});
  const page=await context.newPage();
  await page.goto(URL,{waitUntil:'domcontentloaded',timeout:90000});
  await page.waitForLoadState('networkidle',{timeout:60000}).catch(()=>{});
  await page.evaluate(async()=>{await document.fonts?.ready?.catch?.(()=>{});const h=document.documentElement.scrollHeight;for(let y=0;y<=h;y+=620){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,70));}window.scrollTo(0,0);await new Promise(r=>setTimeout(r,1000));});
  await page.waitForTimeout(2500);
  const evidence=await page.evaluate(({props})=>{
    const clean=v=>String(v||'').replace(/\s+/g,' ').trim();
    const rect=el=>{const r=el.getBoundingClientRect();return{x:+r.x.toFixed(2),y:+(r.y+window.scrollY).toFixed(2),width:+r.width.toFixed(2),height:+r.height.toFixed(2)}};
    const style=el=>Object.fromEntries(props.map(p=>[p,getComputedStyle(el).getPropertyValue(p)]));
    const root=getComputedStyle(document.documentElement);
    const body=getComputedStyle(document.body);
    const customProperties={};
    for(const sheet of document.styleSheets){
      let rules; try{rules=sheet.cssRules}catch{continue}
      for(const rule of rules){
        if(!(rule instanceof CSSStyleRule)||!rule.selectorText.includes(':root'))continue;
        for(let i=0;i<rule.style.length;i++){const name=rule.style[i];if(name.startsWith('--'))customProperties[name]=rule.style.getPropertyValue(name).trim()}
      }
    }
    const selectors=[
      ['body','body'],['siteHeader','header'],['heroSection','main > section:first-of-type'],['heroHeading','h1'],['heroPrimaryCta','main >> text=Get started for free'],
      ['agentsSection','main > section:nth-of-type(2)'],['platformSection','main > section:nth-of-type(3)'],['showcaseSection','main > section:nth-of-type(4)'],
      ['storiesSection','main > section:nth-of-type(5)'],['communitySection','main > section:nth-of-type(6)'],['finalCta','main >> text=Your next idea starts here'],['siteFooter','footer']
    ];
    const selections=[];
    for(const [name,selector] of selectors){
      const el=selector.startsWith('main >> ')?[...document.querySelectorAll('main h1,main h2,main h3,main p,main a,main button')].find(x=>clean(x.innerText)===selector.slice(8)):document.querySelector(selector);
      if(el)selections.push({name,selector,tag:el.tagName,text:clean(el.innerText).slice(0,300),rect:rect(el),styles:style(el)});
    }
    const textStyles=[...document.querySelectorAll('h1,h2,h3,h4,p,a,button,li')].filter(el=>{const r=el.getBoundingClientRect();return r.width>2&&r.height>2&&clean(el.innerText)}).slice(0,260).map(el=>({tag:el.tagName,text:clean(el.innerText).slice(0,240),rect:rect(el),styles:style(el)}));
    const cssRules={fontFaces:[],keyframes:[],transitionDeclarations:[],mediaConditions:[],customPropertyDeclarations:[]};
    for(const sheet of document.styleSheets){
      let rules;try{rules=sheet.cssRules}catch{continue}
      const visit=rule=>{
        if(rule instanceof CSSFontFaceRule)cssRules.fontFaces.push({family:rule.style.getPropertyValue('font-family'),src:rule.style.getPropertyValue('src'),weight:rule.style.getPropertyValue('font-weight'),style:rule.style.getPropertyValue('font-style')});
        if(rule instanceof CSSKeyframesRule)cssRules.keyframes.push({name:rule.name,cssText:rule.cssText.slice(0,5000)});
        if(rule instanceof CSSMediaRule)cssRules.mediaConditions.push(rule.conditionText);
        if(rule instanceof CSSStyleRule){
          const transition=rule.style.getPropertyValue('transition');
          if(transition&&!['all','none'].includes(transition.trim()))cssRules.transitionDeclarations.push({selector:rule.selectorText,transition});
          for(let i=0;i<rule.style.length;i++){const name=rule.style[i];if(name.startsWith('--'))cssRules.customPropertyDeclarations.push({selector:rule.selectorText,name,value:rule.style.getPropertyValue(name).trim()})}
          for(const child of rule.cssRules||[])visit(child);
        }
        for(const child of rule.cssRules||[])visit(child);
      };
      for(const rule of rules)visit(rule);
    }
    const runningAnimations=document.getAnimations({subtree:true}).map(a=>({id:a.id,animationName:a.animationName,transitionProperty:a.transitionProperty,duration:a.effect?.getTiming?.().duration||null,delay:a.effect?.getTiming?.().delay||null,easing:a.effect?.getTiming?.().easing||null,iterations:a.effect?.getTiming?.().iterations||null,playState:a.playState,cssText:a.effect?.getKeyframes ? '' : ''}));
    const videos=[...document.querySelectorAll('video')].map(v=>({src:v.currentSrc||v.src,poster:v.poster,rect:rect(v),duration:v.duration,currentTime:v.currentTime,paused:v.paused,muted:v.muted,loop:v.loop,playsInline:v.playsInline,readyState:v.readyState,controls:v.controls}));
    const fontResources=performance.getEntriesByType('resource').filter(e=>/\.(woff2?|ttf|otf)(\?|$)/i.test(e.name)||/font/i.test(e.initiatorType)).map(e=>({name:e.name,transferSize:e.transferSize,decodedBodySize:e.decodedBodySize}));
    return {capturedAt:new Date().toISOString(),viewport:{width:1440,height:900},reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,document:{title:document.title,lang:document.lang,scrollHeight:document.documentElement.scrollHeight,scrollWidth:document.documentElement.scrollWidth},rootComputed:{color:root.color,backgroundColor:root.backgroundColor,fontFamily:root.fontFamily,fontSize:root.fontSize},bodyComputed:{color:body.color,backgroundColor:body.backgroundColor,fontFamily:body.fontFamily,fontSize:body.fontSize,lineHeight:body.lineHeight,margin:body.margin},rootCustomPropertiesObserved:customProperties,selections,textStyles,cssRules,runningAnimations,videos,fontResources};
  },{props});
  fs.writeFileSync(path.join(__dirname,'design-evidence.json'),JSON.stringify(evidence,null,2)+'\n');
  await browser.close();
  const summary={root:evidence.rootComputed,body:evidence.bodyComputed,selections:evidence.selections.map(s=>({name:s.name,tag:s.tag,text:s.text,rect:s.rect,color:s.styles.color,background:s.styles['background-color'],font:s.styles['font-family'],fontSize:s.styles['font-size'],fontWeight:s.styles['font-weight'],lineHeight:s.styles['line-height'],radius:s.styles['border-radius'],padding:s.styles.padding,gap:s.styles.gap})),fontFaces:evidence.cssRules.fontFaces.length,keyframes:evidence.cssRules.keyframes.map(k=>k.name),transitionDeclarations:evidence.cssRules.transitionDeclarations.slice(0,50),runningAnimations:evidence.runningAnimations.length,videos:evidence.videos.length,fontResources:evidence.fontResources.length};
  console.log(JSON.stringify(summary,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
