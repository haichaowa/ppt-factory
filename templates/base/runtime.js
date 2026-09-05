/* runtime:v1 — deck 运行时核心。逐字复制，禁止修改；升级走 docs/WORKFLOW.md 手术流程。
   功能：等比缩放 / 键盘+点击翻页 / fragment 渐进 / #/页码 深链 / ?qa=1 溢出检查 */
(() => {
  'use strict';
  const stage = document.querySelector('.stage');
  const slides = Array.from(document.querySelectorAll('.slide'));
  if (!stage || !slides.length) return;
  const total = slides.length;
  let cur = 0;   // 当前页索引
  let frag = 0;  // 当前页已揭示的 fragment 数

  /* 1. 窗口等比缩放（reveal.js 模型：固定舞台，整体 scale） */
  const fit = () => {
    const s = Math.min(innerWidth / stage.offsetWidth, innerHeight / stage.offsetHeight);
    stage.style.transform = `translate(-50%, -50%) scale(${s})`;
  };

  /* 2. 渲染：切换 active 页 + 揭示 fragment（回看历史页时全部显示） */
  const fragsOf = i => slides[i].querySelectorAll('.fragment');
  const apply = () => {
    slides.forEach((el, i) => {
      el.classList.toggle('active', i === cur);
      const fs = fragsOf(i);
      const upto = i < cur ? fs.length : frag;
      fs.forEach((f, k) => f.classList.toggle('visible', k < upto));
    });
    history.replaceState(null, '', '#/' + (cur + 1));
  };
  const go = (i, allFrag = false) => {
    cur = Math.max(0, Math.min(total - 1, i));
    frag = allFrag ? fragsOf(cur).length : 0;
    apply();
  };

  /* 3. 步进：当前页 fragment 未完 → 揭示下一个；已完 → 翻页 */
  const next = () => (frag < fragsOf(cur).length) ? (frag++, apply()) : go(cur + 1);
  const prev = () => (frag > 0) ? (frag--, apply()) : go(cur - 1, true);

  /* 4. 键盘：←→/空格/PageUp·Down（翻页笔）/Home/End/F 全屏 */
  addEventListener('keydown', e => {
    if (e.target.closest('input,textarea,select')) return;
    const k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown' || k === ' ' || k === 'PageDown') { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(total - 1, true);
    else if ((k === 'f' || k === 'F') && !e.ctrlKey && !e.metaKey && !e.altKey)
      document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  });

  /* 5. 鼠标点击翻页：左侧 8% 区域后退，其余前进（a/button 不触发） */
  addEventListener('click', e => {
    if (e.target.closest('a,button')) return;
    e.clientX > innerWidth * 0.08 ? next() : prev();
  });

  /* 6. hash 深链：#/3 直达第 3 页 */
  const fromHash = () => {
    const m = location.hash.match(/^#\/(\d+)/);
    if (m) cur = Math.max(0, Math.min(total - 1, +m[1] - 1));
    frag = 0;
    apply();
  };

  /* 7. ?qa=1 溢出检查：任一页内容超出 1280×720 即描红 + 控制台告警 */
  const qa = new URLSearchParams(location.search).get('qa') === '1';
  const qaCheck = () => slides.forEach((el, i) => {
    const over = el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1;
    el.style.outline = qa && over ? '3px solid red' : '';
    if (qa && over) console.warn(`QA: 第 ${i + 1} 页溢出`);
  });

  addEventListener('resize', () => { fit(); if (qa) qaCheck(); });
  addEventListener('load', () => { if (qa) qaCheck(); });
  fromHash();
  fit();
  if (qa) qaCheck();
})();
