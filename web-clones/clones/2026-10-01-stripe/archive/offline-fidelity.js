#!/usr/bin/env node
/** Compare offline MHTML rendering with the canonical live full-page screenshot crop. */
const fs=require('node:fs'); const path=require('node:path');
const {chromium}=require('/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {PNG}=require('/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pngjs');
const pixelmatchModule=require('/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pixelmatch');
const pixelmatch=pixelmatchModule.default || pixelmatchModule;
const ROOT=path.resolve(__dirname,'..'); const BROWSER='/Users/wanghaichao/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
function metrics(a,b,diff){let different=0,absolute=0;for(let i=0;i<a.data.length;i++){if(a.data[i]!==b.data[i])different++; if(i%4!==3)absolute+=Math.abs(a.data[i]-b.data[i]);}const channels=a.width*a.height*3;return {pixelsCompared:a.width*a.height,exactMatchingPixels:a.width*a.height-different,pixelmatchDifferentPixels:diff,exactMatchRatio:+(1-different/(a.width*a.height)).toFixed(8),meanAbsoluteError:+(absolute/channels).toFixed(6)}}
async function capturePreview(browser,file,target){const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});await context.route(/^https?:\/\//i,route=>route.abort());const page=await context.newPage();await page.goto('file://'+file,{waitUntil:'domcontentloaded'});await page.waitForTimeout(1200);await page.screenshot({path:target,clip:{x:0,y:0,width:1440,height:900},animations:'disabled'});await context.close()}
(async()=>{
 const browser=await chromium.launch({executablePath:BROWSER,headless:true});
 // Crop the canonical live full page to its first screen.
 const full=PNG.sync.read(fs.readFileSync(path.join(ROOT,'screenshots/stripe-home-1440-fullpage.png')));
 const liveCrop=new PNG({width:1440,height:900});PNG.bitblt(full,liveCrop,0,0,1440,900,0,0);fs.writeFileSync(path.join(__dirname,'live-firstscreen.png'),PNG.sync.write(liveCrop));
 const offline=PNG.sync.read(fs.readFileSync(path.join(__dirname,'offline-firstscreen.png')));
 const diffPng=new PNG({width:1440,height:900});const different=pixelmatch(liveCrop.data,offline.data,diffPng.data,1440,900,{threshold:0.1,includeAA:false});fs.writeFileSync(path.join(__dirname,'offline-fidelity-diff.png'),PNG.sync.write(diffPng));
 const offlineMetrics=metrics(liveCrop,offline,different);
 // Pixel-exact local screenshot fallback preview.
 fs.writeFileSync(path.join(__dirname,'offline-preview.html'),'<!doctype html><meta charset="utf-8"><title>Stripe canonical screenshot preview</title><style>html,body{margin:0;padding:0;background:#fff}img{display:block;width:1440px;height:auto}</style><img src="../screenshots/stripe-home-1440-fullpage.png" alt="Archived Stripe homepage screenshot">\n');
 await capturePreview(browser,path.join(__dirname,'offline-preview.html'),path.join(__dirname,'offline-preview.png'));
 const preview=PNG.sync.read(fs.readFileSync(path.join(__dirname,'offline-preview.png')));const previewDiffPng=new PNG({width:1440,height:900});const previewDifferent=pixelmatch(liveCrop.data,preview.data,previewDiffPng.data,1440,900,{threshold:0,includeAA:false});fs.writeFileSync(path.join(__dirname,'offline-preview-fidelity-diff.png'),PNG.sync.write(previewDiffPng));
 const previewMetrics=metrics(liveCrop,preview,previewDifferent);
 const out={comparedRegion:{x:0,y:0,width:1440,height:900},live:'screenshots/stripe-home-1440-fullpage.png#first-900',offline:'archive/offline-firstscreen.png',offlineDiff:'archive/offline-fidelity-diff.png',offlineFidelity:offlineMetrics,preview:'archive/offline-preview.html',previewScreenshot:'archive/offline-preview.png',previewDiff:'archive/offline-preview-fidelity-diff.png',previewFidelity:previewMetrics,interpretation:'MHTML retains DOM/CSS/static images but cannot replay script-generated WebGL state; canonical PNGs and the local preview are visual fallbacks.'};
 fs.writeFileSync(path.join(__dirname,'offline-fidelity.json'),JSON.stringify(out,null,2)+'\n');await browser.close();console.log(JSON.stringify(out,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
