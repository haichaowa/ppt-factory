#!/usr/bin/env node
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {chromium}=require(process.env.PLAYWRIGHT_PACKAGE || '/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const ROOT=path.resolve(__dirname,'..'); const MHTML='raycast-home.mhtml';
const BROWSER=process.env.PLAYWRIGHT_BROWSER || '/Users/wanghaichao/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
(async()=>{
 const browser=await chromium.launch({executablePath:BROWSER,headless:true}); const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
 await context.route('**/*',route=>route.request().url().startsWith('file://')?route.continue():route.abort());
 const page=await context.newPage(); const errors=[]; page.on('pageerror',e=>errors.push({type:'pageerror',message:e.message})); page.on('requestfailed',r=>errors.push({type:'requestfailed',url:r.url(),failure:r.failure()?.errorText}));
 const url='file://'+path.join(ROOT,'archive',MHTML); const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:90000}); await page.waitForTimeout(10000);
 const state=await page.evaluate(()=>({title:document.title,url:location.href,readyState:document.readyState,h1:document.querySelector('h1')?.textContent?.trim()||null,rootChildren:document.querySelector('#root')?.children.length||0,scrollHeight:document.documentElement.scrollHeight}));
 const shot='mhtml-browser-check.png'; const file=path.join(ROOT,'archive',shot); await page.screenshot({path:file,animations:'disabled',timeout:60000});
 const result={checkedAt:new Date().toISOString(),sourceFile:`archive/${MHTML}`,loadUrl:url,responseStatus:response?.status()??null,...state,screenshot:{file:`archive/${shot}`,bytes:fs.statSync(file).size,sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')},networkErrors:errors.slice(0,100),errorCount:errors.length,passed:state.title==='Raycast - Your shortcut to everything'&&state.h1==='Your shortcut to everything.'&&state.rootChildren>0};
 fs.writeFileSync(path.join(ROOT,'archive','mhtml-browser-check.json'),JSON.stringify(result,null,2)+'\n'); await context.close();await browser.close();console.log(JSON.stringify(result,null,2)); if(!result.passed)process.exit(2);
})().catch(e=>{console.error(e);process.exit(1)});
