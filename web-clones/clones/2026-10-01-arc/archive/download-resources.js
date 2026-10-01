'use strict';
const fs=require('node:fs'); const path=require('node:path'); const crypto=require('node:crypto');
const {chromium}=require('/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const BROWSER='/Users/wanghaichao/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
const specs=[
 ['css/home.css','https://arc.net/_next/static/css/df28c1bc1b1a6c7d.css'],
 ['fonts/marlin.woff2','https://arc.net/fonts/marlin.woff2'],
 ['fonts/MarlinSoftSQ-Medium.woff2','https://arc.net/fonts/MarlinSoftSQ-Medium.woff2'],
 ['fonts/MarlinSoftSQ-ExtraBold.woff2','https://arc.net/fonts/MarlinSoftSQ-ExtraBold.woff2'],
 ['fonts/MarlinSoftSQ-ExtraBoldItalic.woff2','https://arc.net/fonts/MarlinSoftSQ-ExtraBoldItalic.woff2'],
 ['fonts/ABCOracle-Regular.woff2','https://arc.net/fonts/ABCOracle-Regular.woff2'],
 ['fonts/ABCFavoritMono-Regular.woff2','https://arc.net/fonts/ABCFavoritMono-Regular.woff2'],
 ['fonts/ABCFavoritMono-Bold.woff2','https://arc.net/fonts/ABCFavoritMono-Bold.woff2'],
 ['fonts/inter-var-latin.woff2','https://arc.net/fonts/inter-var-latin.woff2'],
 ['fonts/exposure-var-30.woff2','https://arc.net/fonts/205TF-Exposure-[-30].woff2'],
 ['fonts/exposure-var-40.woff2','https://arc.net/fonts/205TF-Exposure-[-40].woff2'],
 ['video/ArcDiaPLG_Video-poster.jpg','https://arc.net/video/ArcDiaPLG_Video-poster.jpg'],
 ['video/ArcDiaPLG_Video.webm','https://arc.net/video/ArcDiaPLG_Video.webm'],
 ['video/zero-chrome.png','https://arc.net/zero-chrome.png'],
 ['video/zero-chrome.mp4','https://arc.net/zero-chrome.mp4'],
 ['video/space-swiping.png','https://arc.net/space-swiping.png'],
 ['video/space-swiping.mp4','https://arc.net/space-swiping.mp4'],
 ['video/theme-picker.png','https://arc.net/theme-picker.png'],
 ['video/theme-picker.mp4','https://arc.net/theme-picker.mp4'],
 ['images/browser-mmmhome-2048.png','https://arc.net/_next/image?url=%2Fbrowser-mmmhome.png&w=2048&q=100']
];
(async()=>{const browser=await chromium.launch({executablePath:BROWSER,headless:true});const context=await browser.newContext({locale:'en-US',timezoneId:'Asia/Shanghai'});const page=await context.newPage();await page.goto('https://arc.net/',{waitUntil:'domcontentloaded',timeout:90000});
 const out={source:'https://arc.net/',capturedAt:new Date().toISOString(),files:[]};
 for(const [name,url] of specs){const file=path.join(__dirname,'resources',name);fs.mkdirSync(path.dirname(file),{recursive:true});const result=await page.evaluate(async url=>{const r=await fetch(url,{credentials:'include'});const b=await r.arrayBuffer();return {status:r.status,contentType:r.headers.get('content-type'),base64:(()=>{const a=new Uint8Array(b);let s='';for(let i=0;i<a.length;i+=8192)s+=String.fromCharCode(...a.subarray(i,i+8192));return btoa(s)})()};},url);const body=Buffer.from(result.base64,'base64');fs.writeFileSync(file,body);out.files.push({name,url,status:result.status,contentType:result.contentType,bytes:body.length,sha256:crypto.createHash('sha256').update(body).digest('hex')});}
 fs.writeFileSync(path.join(__dirname,'resource-download-manifest.json'),JSON.stringify(out,null,2)+'\n');await browser.close();console.log(JSON.stringify({ok:out.files.every(x=>x.status===200),files:out.files.length,totalBytes:out.files.reduce((a,b)=>a+b.bytes,0)},null,2));})().catch(e=>{console.error(e);process.exit(1)});
