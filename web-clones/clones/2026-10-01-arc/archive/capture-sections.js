'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const BROWSER = '/Users/wanghaichao/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
(async()=>{
  const browser=await chromium.launch({executablePath:BROWSER,headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2,reducedMotion:'reduce',locale:'en-US',timezoneId:'Asia/Shanghai'});
  const page=await context.newPage(); await page.goto('https://arc.net/',{waitUntil:'domcontentloaded',timeout:90000});
  await page.waitForLoadState('networkidle',{timeout:45000}).catch(()=>{}); await page.waitForTimeout(3000);
  await page.evaluate(async()=>{const h=document.documentElement.scrollHeight;for(let y=0;y<=h;y+=650){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,70));}window.scrollTo(0,0);await new Promise(r=>setTimeout(r,1000));});
  const specs=[
    ['01-dia-transition-banner',page.locator('main > div').nth(0),'迁移横幅：把续作宣传嵌入首屏，用产品图形和胶囊 CTA 承接升级叙事。'],
    ['02-arc-editorial-hero',page.locator('main > section').first(),'媒体引语 H1 与双平台下载构成品牌宣言，大字宽幅置入钴蓝底。'],
    ['03-browser-story-video',page.locator('section').nth(1),'大标题右置、全宽视频下沉，形成左文右动态画面的非对称分栏。'],
    ['04-spaces-product-video',page.locator('section').nth(2),'以真实操作视频解释 Spaces/Profiles，延续纵向交错的产品叙事。'],
    ['05-footer-cta',page.locator('footer > aside').first(),'钴蓝底上的 28px CTA 形成动作终点，白色下载按钮与奶油文字延续品牌色收束。']
  ];
  const manifest={source:'https://arc.net/',capturedAt:new Date().toISOString(),viewport:{width:1440,height:900},deviceScaleFactor:2,reducedMotion:'reduce',sections:[]};
  for(const [name,locator,assessment] of specs){
    await locator.scrollIntoViewIfNeeded(); await page.waitForTimeout(600);
    const file=path.resolve(__dirname,'..','sections',`${name}.png`); await locator.screenshot({path:file,animations:'disabled'});
    const box=await locator.boundingBox(); const text=await locator.innerText().catch(()=>'');
    manifest.sections.push({name,file:path.relative(path.resolve(__dirname,'..'),file),cssRect:box,text:text.trim().replace(/\s+/g,' ').slice(0,400),bytes:fs.statSync(file).size,assessment});
  }
  fs.writeFileSync(path.join(__dirname,'section-capture-manifest.json'),JSON.stringify(manifest,null,2)+'\n'); await browser.close(); console.log(JSON.stringify(manifest,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
