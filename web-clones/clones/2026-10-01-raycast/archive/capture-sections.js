#!/usr/bin/env node
const fs = require('node:fs'); const path = require('node:path'); const crypto = require('node:crypto');
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || '/Users/wanghaichao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const ROOT = path.resolve(__dirname, '..'); const URL = 'https://www.raycast.com/';
const BROWSER = process.env.PLAYWRIGHT_BROWSER || '/Users/wanghaichao/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
const sleep = ms => new Promise(r => setTimeout(r, ms)); const sha = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex'); const png = f => { const b = fs.readFileSync(f); return { width:b.readUInt32BE(16), height:b.readUInt32BE(20) }; };
(async()=>{
 const browser = await chromium.launch({ executablePath:BROWSER, headless:true });
 const context = await browser.newContext({ viewport:{width:1440,height:1600}, deviceScaleFactor:2, reducedMotion:'reduce', locale:'en-US', timezoneId:'Asia/Shanghai' });
 const page = await context.newPage(); await page.goto(URL,{waitUntil:'domcontentloaded',timeout:90000}); await page.waitForLoadState('networkidle',{timeout:90000}).catch(()=>{}); await sleep(10000);
 const defs = [['01-hero',1,'Hero and macOS product object'],['02-command-launcher',2,'Launcher feature and command window'],['03-value-grid',3,'Keyboard-first value proposition grid'],['04-extension-carousel',4,'Extension ecosystem carousel'],['05-ai-agent',5,'AI agent and chat interface']];
 const children = await page.evaluate(() => [...document.querySelector('#root').children].filter(el => el instanceof HTMLElement && ['none','hidden'].includes(getComputedStyle(el).visibility) === false && getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().height > 30).map(el => { const r=el.getBoundingClientRect(); return { y:r.y+scrollY,x:r.x,width:r.width,height:r.height,className:String(el.className),text:(el.textContent||'').trim().replace(/\s+/g,' ').slice(0,180) }; }));
 const out=[];
 for (const [name,index,label] of defs) {
   const box=children[index]; if(!box) throw new Error(`Missing root child ${index}`);
   const file=path.join(ROOT,'sections',`${name}.png`); const clip={x:Math.max(0,Math.floor(box.x)),y:Math.max(0,Math.floor(box.y)),width:Math.ceil(box.width),height:Math.ceil(box.height)};
   await page.screenshot({ path:file, clip, fullPage:true, animations:'disabled', caret:'hide', timeout:180000 });
   out.push({ name,rootChildIndex:index,label,cssBox:clip,png:png(file),deviceScaleFactor:2,sha256:sha(file),bytes:fs.statSync(file).size,text:box.text });
 }
 const manifest={ source:URL,capturedAt:new Date().toISOString(),method:'Playwright page clip with context deviceScaleFactor=2, reduced motion and animations disabled',sections:out };
 fs.writeFileSync(path.join(ROOT,'archive','section-capture-manifest.json'),JSON.stringify(manifest,null,2)+'\n'); await context.close(); await browser.close(); console.log(JSON.stringify(manifest,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
