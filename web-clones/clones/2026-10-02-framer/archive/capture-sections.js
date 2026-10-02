'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { URL: NodeURL } = require('node:url');
const { chromium } = require('/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const BROWSER = '/Users/wanghaichao/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
const URL = 'https://www.framer.com/';
const resourceDir = path.join(__dirname, 'resources');
const videoMap = new Map([
  ['2zyGmnAWVTTdkv4LY1mFKgEdhg.mp4', 'hero-design-agent.mp4'],
  ['IxrpbsCJLku5W91FcYn0gQuQY.mp4', 'community-loop-a.mp4'],
  ['d5okMiktMgbhCcGtgbr8gGqqHU.mp4', 'community-loop-b.mp4'],
  ['EGqLxawrgBiyYfcyRAdEFPRAMWo.mp4', 'community-loop-c.mp4'],
]);
(async()=>{
  const browser=await chromium.launch({executablePath:BROWSER,headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2,locale:'en-US',timezoneId:'Asia/Shanghai'});
  const page=await context.newPage();
  await page.route('**/assets/*.mp4*', async route => {
    const name=path.basename(new NodeURL(route.request().url()).pathname);
    const local=videoMap.get(name);
    if(local) return route.fulfill({path:path.join(resourceDir,local),contentType:'video/mp4'});
    return route.continue();
  });
  await page.goto(URL,{waitUntil:'domcontentloaded',timeout:90000});
  await page.waitForLoadState('networkidle',{timeout:60000}).catch(()=>{});
  await page.evaluate(async()=>{
    document.fonts?.ready?.catch?.(()=>{});
    for(const video of document.querySelectorAll('video')) {
      video.muted=true; video.playsInline=true; video.loop=true;
      await video.play().catch(()=>{});
    }
    const h=document.documentElement.scrollHeight;
    for(let y=0;y<=h;y+=620){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,70));}
    window.scrollTo(0,0);await new Promise(r=>setTimeout(r,1200));
  });
  const videoState=await page.evaluate(()=>[...document.querySelectorAll('video')].map(v=>({src:v.currentSrc||v.src,readyState:v.readyState,paused:v.paused,duration:v.duration,current:v.currentTime,width:v.getBoundingClientRect().width,height:v.getBoundingClientRect().height})));
  const specs=[
    ['01-hero-headline-cta','main > section:nth-of-type(1) > header','黑底首屏把 54px 品牌标题压到两行，右侧留白让 12px 级小 CTA 反而成为清晰入口。'],
    ['02-hero-product-video','main > section:nth-of-type(1) > div:nth-child(2)','好在这里不画抽象插画，而是用 1200px 宽的真实产品操作视频立即证明“design agent”的能力。'],
    ['03-agent-workflow','main > section:nth-of-type(2) > div:first-child','探索方案、画布代理、CMS 和代码操作连续排列，把复杂工作流拆成可逐屏阅读的产品证据。'],
    ['04-platform-interface','main > section:nth-of-type(3) > div:nth-child(2)','25px 圆角的巨幅平台面板把性能指标、CMS、SEO、分析等模块装进一个可感知的一体化工作台。'],
    ['05-community-feed','main > section:nth-of-type(6) > div:nth-child(2)','#111 面板内的社区 Feed、搜索和实时帖子让生态活力像产品界面一样可被浏览，而不是一句口号。']
  ];
  const manifest={source:URL,capturedAt:new Date().toISOString(),viewport:{width:1440,height:900},deviceScaleFactor:2,videoState,sections:[]};
  for(const [name,selector,assessment] of specs){
    const locator=page.locator(selector).first();
    await locator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    const file=path.resolve(__dirname,'..','sections',`${name}.png`);
    await locator.screenshot({path:file,animations:'disabled'});
    const box=await locator.evaluate(el=>{const r=el.getBoundingClientRect();return {x:+r.x.toFixed(3),y:+(r.y+window.scrollY).toFixed(3),width:+r.width.toFixed(3),height:+r.height.toFixed(3)};});
    const text=await locator.innerText().catch(()=>'');
    manifest.sections.push({name,selector,file:path.relative(path.resolve(__dirname,'..'),file),cssRect:box,text:text.trim().replace(/\s+/g,' ').slice(0,500),bytes:fs.statSync(file).size,assessment});
  }
  fs.writeFileSync(path.join(__dirname,'section-capture-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  await browser.close();
  console.log(JSON.stringify(manifest,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
