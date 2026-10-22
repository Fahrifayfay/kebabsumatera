/* =====================================================================
   gallery-pro.js — Carousel 3D, Video Promo (gaya stories), lightbox, WA
   ===================================================================== */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mod = (a, n) => ((a % n) + n) % n;

  /* ------------------------------------------------------------- DATA */
  const PHOTOS = [
    { img: 'image/gerobak.jpeg', cap: 'Gerobak Kebab Sumatera', g: 'Outlet', desc: 'Hutan Percut Sei Tuan · 18.00–00.00 WIB', photo: true },
    { img: 'image/kebab/kebabsumateraayam.webp', cap: 'Kebab Sumatera Ayam', g: 'Kebab' },
    { img: 'image/kebab/kebabsumaterasapi.webp', cap: 'Kebab Sumatera Sapi', g: 'Kebab' },
    { img: 'image/kebab/kebabspesialayam.webp', cap: 'Kebab Spesial Ayam', g: 'Kebab' },
    { img: 'image/kebab/kebabspesialsapi.webp', cap: 'Kebab Spesial Sapi', g: 'Kebab' },
    { img: 'image/model/kebabspesialmix.webp', cap: 'Kebab Spesial Mix', g: 'Kebab' },
    { img: 'image/burger/burgerayamkeju.webp', cap: 'Burger Ayam Keju', g: 'Burger' },
    { img: 'image/burger/burgertelur.webp', cap: 'Burger Telur Daging', g: 'Burger' },
    { img: 'image/burger/burgersosis.webp', cap: 'Burger Sosis', g: 'Burger' },
    { img: 'image/model/burgersapikeju.webp', cap: 'Burger Sapi Keju', g: 'Burger' },
    { img: 'image/model/lumpia.webp', cap: 'Lumpia Sapi', g: 'Lainnya' },
    { img: 'image/model/roti-bakar-bandung.webp', cap: 'Roti Bakar Bandung', g: 'Lainnya' },
    { img: 'image/rasaroti/coklatkeju.webp', cap: 'Roti Bakar Coklat Keju', g: 'Lainnya' },
  ];
  const WORD = { Semua: 'KEBAB', Outlet: 'GEROBAK', Kebab: 'KEBAB', Burger: 'BURGER', Lainnya: 'CEMILAN' };
  const LABEL = { Outlet: 'Gerobak', Kebab: 'Kebab', Burger: 'Burger', Lainnya: 'Lainnya' };
  const VIDEOS = [
    { src: 'video/snaptik_7676475055118748935_v3.mp4', poster: 'video/poster/promo-1.webp', t: 'Kebab Sosis Keju' },
    { src: 'video/snaptik_7676653293124308231_v3.mp4', poster: 'video/poster/promo-2.webp', t: 'Burger Daging Crispy' },
    { src: 'video/snaptik_7677165378593656082_v3.mp4', poster: 'video/poster/promo-3.webp', t: 'Burger Telur Ayam' },
    { src: 'video/snaptik_7677856484847258887_v3.mp4', poster: 'video/poster/promo-4.webp', t: 'Burger Sapi Keju' },
    { src: 'video/snaptik_7684463314411293960_v3.mp4', poster: 'video/poster/promo-5.webp', t: 'Kebab Dibuat Segar' },
  ];

  /* ------------------------------------------------------ SCROLL REVEAL */
  const revealIO = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
  }), { threshold: .12 }) : null;
  function reveal(el, delay = 0) {
    if (!el || !revealIO || reduce) return;
    el.classList.add('gx-rv'); el.style.transitionDelay = delay + 'ms'; revealIO.observe(el);
  }

  /* ============================================================ CAROUSEL */
  const stage = $('#gxStage');
  if (stage) {
    const track = $('#gxTrack'), word = $('#gxWord'), dotsBox = $('#gxDots');
    const infoNum = $('#gxNum'), infoName = $('#gxName'), infoDesc = $('#gxDesc');
    const playBtn = $('#gxPlay'), filterBtns = $$('[data-gallery-filter]');
    const DUR = 5200;

    const cards = PHOTOS.map((p, i) => {
      const el = document.createElement('figure');
      el.className = 'gx-card' + (p.photo ? ' photo' : '');
      el.setAttribute('role', 'group'); el.setAttribute('aria-roledescription', 'slide');
      el.innerHTML = `<div class="gx-face"><span class="gx-tag">${LABEL[p.g]}</span><span class="gx-zoom" aria-hidden="true">⤢</span>` +
        `<img ${i < 3 ? `src="${p.img}"` : ''} data-src="${p.img}" alt="${p.cap}" decoding="async" draggable="false"><span class="gx-name">${p.cap}</span><span class="gx-shine"></span></div>`;
      track.appendChild(el);
      return el;
    });

    let vis = PHOTOS.map((_, i) => i), cur = 0, target = 0, active = -1, filter = 'Semua';
    let raf = 0, dragging = false, moved = false, hovering = false, inView = false, userPaused = reduce;
    let lastRound = null;

    let cachedStep = Math.max(120, (cards[0].offsetWidth || 300) * (innerWidth < 640 ? .62 : .6));
    const step = () => cachedStep;

    function layout() {
      const n = vis.length, s = step();
      vis.forEach((idx, k) => {
        const el = cards[idx];
        let d = n > 1 ? mod(k - cur + n / 2, n) - n / 2 : k - cur;
        const a = Math.abs(d);
        if (a > 3.3) { el.style.visibility = 'hidden'; el.style.pointerEvents = 'none'; return; }
        el.style.visibility = ''; el.style.pointerEvents = '';
        const x = Math.sign(d) * (Math.min(a, 1) * s + Math.max(0, a - 1) * s * .62);
        el.style.transform = `translate3d(${x}px,0,${-a * 150}px) rotateY(${-d * 24}deg) scale(${1 - Math.min(a, 2.2) * .07})`;
        el.style.zIndex = String(100 - Math.round(a * 10));
        el.style.opacity = String(Math.max(0, 1 - Math.max(0, a - 1.6) * .6));
      });
    }

    function tick() {
      const diff = target - cur;
      if (Math.abs(diff) < .002) { cur = target; layout(); raf = 0; return; }
      cur += diff * (reduce ? 1 : .13);
      layout(); raf = requestAnimationFrame(tick);
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

    function setActive() {
      const n = vis.length; if (!n) return;
      const k = mod(Math.round(target), n);
      if (k === lastRound) return;
      lastRound = k;
      const idx = vis[k], p = PHOTOS[idx];
      cards.forEach((c, i) => { c.classList.toggle('on', i === idx); c.setAttribute('aria-hidden', i === idx ? 'false' : 'true'); });
      infoNum.textContent = `${String(k + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')} · ${LABEL[p.g]}`;
      infoName.textContent = p.cap; infoDesc.textContent = p.desc || '';
      $$('button', dotsBox).forEach((b, i) => b.setAttribute('aria-current', String(i === k)));
      stage.dataset.g = p.g;
      const w = filter === 'Semua' ? WORD[p.g] : WORD[filter];
      if (word.textContent !== w) { word.textContent = w; word.classList.remove('swap'); void word.offsetWidth; word.classList.add('swap'); }
      for (let o = -3; o <= 3; o++) { const im = cards[vis[mod(k + o, n)]].querySelector('img'); if (!im.getAttribute('src')) im.src = im.dataset.src; }
      autoReset();
    }

    function go(delta) { target = Math.round(target) + delta; kick(); setActive(); }
    function goTo(k) { const n = vis.length; let d = mod(k - Math.round(target), n); if (d > n / 2) d -= n; go(d); }

    function buildDots() {
      dotsBox.innerHTML = '';
      vis.forEach((idx, k) => {
        const b = document.createElement('button');
        b.type = 'button'; b.setAttribute('aria-label', `Foto ${k + 1}: ${PHOTOS[idx].cap}`);
        b.addEventListener('click', () => goTo(k)); dotsBox.appendChild(b);
      });
    }

    function applyFilter(f, animate = true) {
      filter = f;
      vis = [];
      PHOTOS.forEach((p, i) => { const show = f === 'Semua' || p.g === f; cards[i].hidden = !show; if (show) vis.push(i); });
      cur = target = 0; lastRound = null;
      filterBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.galleryFilter === f)));
      buildDots(); layout(); setActive();
      if (animate && !reduce) track.animate([{ opacity: 0, transform: 'scale(.9) translateY(24px)' }, { opacity: 1, transform: 'none' }], { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
    filterBtns.forEach(b => {
      const f = b.dataset.galleryFilter;
      const n = f === 'Semua' ? PHOTOS.length : PHOTOS.filter(p => p.g === f).length;
      b.insertAdjacentHTML('beforeend', `<i aria-hidden="true">${n}</i>`);
      b.addEventListener('click', () => applyFilter(f));
    });

    /* ---- drag / swipe / klik ---- */
    let sx = 0, sTarget = 0, lx = 0, lt = 0, vel = 0, pid = null;
    track.addEventListener('pointerdown', e => {
      if (e.button > 0) return;
      dragging = true; moved = false; sx = lx = e.clientX; lt = performance.now(); vel = 0;
      sTarget = target = cur; pid = e.pointerId; aPause();
    });
    window.addEventListener('pointermove', e => {
      if (dragging && e.pointerId === pid) {
        const dx = e.clientX - sx;
        if (!moved && Math.abs(dx) > 6) { moved = true; track.classList.add('drag'); try { track.setPointerCapture(pid); } catch (_) {} }
        if (moved) {
          const now = performance.now(), dt = Math.max(1, now - lt);
          vel = .8 * vel + .2 * ((e.clientX - lx) / dt); lx = e.clientX; lt = now;
          target = sTarget - dx / step(); kick();
        }
      }
    }, { passive: true });
    const endDrag = e => {
      if (!dragging || (e && e.pointerId !== pid)) return;
      dragging = false; track.classList.remove('drag');
      if (moved) { target = Math.round(target - vel * 260 / step()); kick(); setActive(); }
      aResume();
    };
    window.addEventListener('pointerup', endDrag); window.addEventListener('pointercancel', endDrag);

    track.addEventListener('click', e => {
      if (moved) { moved = false; return; }
      const c = e.target.closest('.gx-card'); if (!c) return;
      const idx = cards.indexOf(c), k = vis.indexOf(idx);
      if (k === mod(Math.round(target), vis.length)) openLightbox(idx); else goTo(k);
    });

    /* ---- tilt + parallax ---- */
    stage.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse' || reduce) return;
      const r = stage.getBoundingClientRect();
      stage.style.setProperty('--wx', ((e.clientX - r.left) / r.width - .5) * -50 + 'px');
      const c = e.target.closest('.gx-card.on');
      if (c) {
        const cr = c.getBoundingClientRect(), px = (e.clientX - cr.left) / cr.width - .5, py = (e.clientY - cr.top) / cr.height - .5;
        c.style.setProperty('--tx', px * 18 + 'px'); c.style.setProperty('--ty', py * 14 + 'px');
        c.style.setProperty('--tr', px * 4 + 'deg'); c.style.setProperty('--sx', (px + .5) * 100);
      }
    });
    stage.addEventListener('pointerleave', () => {
      stage.style.setProperty('--wx', '0px');
      $$('.gx-card.on', track).forEach(c => ['--tx', '--ty', '--tr'].forEach(v => c.style.removeProperty(v)));
    });

    /* ---- keyboard + wheel + tombol ---- */
    stage.addEventListener('keydown', e => {
      if (e.target.closest('button') && e.target !== stage) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      else if (e.key === 'End') { e.preventDefault(); goTo(vis.length - 1); }
      else if (e.key === 'Enter' && e.target === stage) { e.preventDefault(); openLightbox(vis[mod(Math.round(target), vis.length)]); }
    });
    let wheelAcc = 0, wheelT = 0;
    stage.addEventListener('wheel', e => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault(); wheelAcc += e.deltaX;
      if (Math.abs(wheelAcc) > 60 && performance.now() - wheelT > 260) { go(wheelAcc > 0 ? 1 : -1); wheelAcc = 0; wheelT = performance.now(); }
    }, { passive: false });
    $('#gxPrev').addEventListener('click', () => go(-1));
    $('#gxNext').addEventListener('click', () => go(1));

    /* ---- autoplay (dengan tombol jeda) ---- */
    let aT = 0, aStart = 0, aRem = DUR;
    const canAuto = () => !userPaused && inView && !hovering && !dragging && !document.hidden && !$('#lightbox').classList.contains('open');
    function aRun() { clearTimeout(aT); aT = 0; if (!canAuto()) return; aStart = performance.now(); aT = setTimeout(() => { aT = 0; aRem = DUR; go(1); }, aRem); }
    function aPause() { if (aT) { clearTimeout(aT); aT = 0; aRem = Math.max(400, aRem - (performance.now() - aStart)); } stage.classList.add('paused'); }
    function aResume() { if (canAuto()) { stage.classList.remove('paused'); aRun(); } }
    function autoReset() { aRem = DUR; stage.classList.toggle('noauto', userPaused); if (canAuto()) { stage.classList.remove('paused'); aRun(); } }
    stage.style.setProperty('--ap', DUR + 'ms');
    stage.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { hovering = true; aPause(); } });
    stage.addEventListener('pointerleave', () => { hovering = false; aResume(); });
    stage.addEventListener('focusin', () => { hovering = true; aPause(); });
    stage.addEventListener('focusout', () => { hovering = false; aResume(); });
    document.addEventListener('visibilitychange', () => document.hidden ? aPause() : aResume());
    playBtn.addEventListener('click', () => {
      userPaused = !userPaused;
      playBtn.textContent = userPaused ? '▶' : '❚❚';
      playBtn.setAttribute('aria-label', userPaused ? 'Putar otomatis' : 'Jeda putar otomatis');
      playBtn.setAttribute('aria-pressed', String(userPaused));
      if (userPaused) { aPause(); stage.classList.add('noauto'); } else { stage.classList.remove('noauto'); aRem = DUR; aResume(); }
    });
    if (userPaused) { playBtn.textContent = '▶'; playBtn.setAttribute('aria-label', 'Putar otomatis'); playBtn.setAttribute('aria-pressed', 'true'); }
    new IntersectionObserver(es => { inView = es[0].isIntersecting; inView ? aResume() : aPause(); }, { threshold: .35 }).observe(stage);
    new ResizeObserver(() => {
      cachedStep = Math.max(120, (cards[0].offsetWidth || 300) * (innerWidth < 640 ? .62 : .6));
      layout();
    }).observe(track);

    applyFilter('Semua', false);
    [$('.gx-filters'), stage].forEach((el, i) => reveal(el, i * 120));
  }

  /* ============================================================ LIGHTBOX */
  const lb = $('#lightbox');
  let lbReturn = null, lbIdx = 0;
  function visList() { return $$('#gxTrack .gx-card').map((c, i) => c.hidden ? -1 : i).filter(i => i >= 0); }
  function showLb(idx) {
    const p = PHOTOS[idx]; lbIdx = idx;
    const img = $('#lightboxImg'); img.src = p.img; img.alt = p.cap;
    $('#lightboxCaption').textContent = p.cap;
    const list = visList(); $('#lightboxPosition').textContent = `${list.indexOf(idx) + 1} / ${list.length}`;
    img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
  }
  function openLightbox(idx) {
    lbReturn = document.activeElement; showLb(idx);
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.classList.add('gallery-modal-open');
    if (window.cursorRing) window.cursorRing.lift(lb);
    $('#lightboxClose').focus();
  }
  function closeLb() {
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.classList.remove('gallery-modal-open');
    if (window.cursorRing) window.cursorRing.drop();
    lbReturn && lbReturn.focus({ preventScroll: true });
  }
  function moveLb(d) { const l = visList(); if (!l.length) return; showLb(l[mod(l.indexOf(lbIdx) + d, l.length)]); }
  if (lb) {
    $('#lightboxClose').addEventListener('click', closeLb);
    $('#lightboxPrev').addEventListener('click', () => moveLb(-1));
    $('#lightboxNext').addEventListener('click', () => moveLb(1));
    lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') { e.preventDefault(); closeLb(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); moveLb(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); moveLb(1); }
      else if (e.key === 'Tab') {
        const b = $$('button', lb), f = b[0], l = b[b.length - 1];
        if (e.shiftKey && document.activeElement === f) { e.preventDefault(); l.focus(); }
        else if (!e.shiftKey && document.activeElement === l) { e.preventDefault(); f.focus(); }
      }
    });
    let tx = 0;
    lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) moveLb(dx < 0 ? 1 : -1); }, { passive: true });
  }

  /* ========================================================== VIDEO PROMO */
  const screen = $('#reelScreen');
  if (screen) {
    const v = $('#reelVideo'), segsBox = $('#reelSegs'), list = $('#reelList'), title = $('#reelTitle');
    const snd = $('#reelSound'), phone = $('.gx-phone');
    let cur = 0, userStopped = reduce, inView = false, rafV = 0, errs = 0;
    v.muted = true;
    v.preload = 'none';

    VIDEOS.forEach((x, i) => {
      const s = document.createElement('button'); s.type = 'button'; s.setAttribute('aria-label', `Video ${i + 1}: ${x.t}`);
      s.innerHTML = '<i></i>'; s.addEventListener('click', e => { e.stopPropagation(); load(i); }); segsBox.appendChild(s);
      const li = document.createElement('li');
      li.innerHTML = `<button type="button" class="gx-item"><img src="${x.poster}" alt="" width="52" height="68" loading="lazy"><span><b>${x.t}</b><small>Video promo · 10 detik</small></span><i>0${i + 1}</i><span class="gx-eq" aria-hidden="true"><u></u><u></u><u></u></span></button>`;
      li.firstChild.addEventListener('click', () => { userStopped = false; load(i); });
      list.appendChild(li);
    });
    const segs = $$('#reelSegs i'), items = $$('.gx-item', list);

    function paint() {
      const p = v.duration ? v.currentTime / v.duration : 0;
      segs.forEach((s, i) => { s.style.transform = `scaleX(${i < cur ? 1 : i === cur ? p : 0})`; });
      items.forEach((it, i) => it.style.setProperty('--p', i === cur ? p : 0));
      rafV = v.paused ? 0 : requestAnimationFrame(paint);
    }
    function load(i, auto = true) {
      cancelAnimationFrame(rafV); rafV = 0;
      cur = mod(i, VIDEOS.length); const x = VIDEOS[cur];
      v.preload = inView ? 'metadata' : 'none';
      v.poster = x.poster; v.src = x.src; v.load();
      title.textContent = x.t;
      items.forEach((it, k) => it.setAttribute('aria-current', String(k === cur)));
      screen.classList.remove('swap'); void screen.offsetWidth; if (!reduce) screen.classList.add('swap');
      paint();
      if (auto && inView && !userStopped) play();
    }
    function play() { const pr = v.play(); if (pr && pr.catch) pr.catch(() => { screen.classList.add('stopped'); }); }
    v.addEventListener('play', () => { screen.classList.remove('stopped'); cancelAnimationFrame(rafV); rafV = requestAnimationFrame(paint); });
    v.addEventListener('pause', () => { cancelAnimationFrame(rafV); rafV = 0; if (userStopped) screen.classList.add('stopped'); });
    v.addEventListener('ended', () => load(cur + 1));
    v.addEventListener('loadeddata', () => { errs = 0; });
    v.addEventListener('error', () => { if (v.getAttribute('src') && ++errs < VIDEOS.length) setTimeout(() => load(cur + 1, false), 800); });
    screen.addEventListener('click', e => {
      if (e.target.closest('button')) return;
      if (v.paused) { userStopped = false; play(); } else { userStopped = true; v.pause(); }
    });
    screen.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); screen.click(); } });
    snd.addEventListener('click', () => {
      v.muted = !v.muted; snd.setAttribute('aria-pressed', String(!v.muted));
      snd.setAttribute('aria-label', v.muted ? 'Nyalakan suara' : 'Matikan suara');
      $('.on', snd).style.display = v.muted ? 'none' : ''; $('.off', snd).style.display = v.muted ? '' : 'none';
    });
    $('.on', snd).style.display = 'none';

    new IntersectionObserver(es => {
      inView = es[0].isIntersecting;
      if (inView && !userStopped) play(); else if (!inView && !v.paused) v.pause();
    }, { threshold: .5 }).observe(screen);
    document.addEventListener('visibilitychange', () => { if (document.hidden && !v.paused) v.pause(); else if (inView && !userStopped) play(); });

    if (reduce) screen.classList.add('stopped');
    load(0, false);
    reveal($('.gx-reels-copy')); reveal(phone, 150);
  }

  /* ============================================================ WHATSAPP */
  const fab = $('.wa-fab');
  if (fab && !reduce) {
    let seen = false; try { seen = sessionStorage.getItem('waHint') === '1'; } catch (_) {}
    if (!seen) setTimeout(() => {
      fab.classList.add('hint'); setTimeout(() => fab.classList.remove('hint'), 4200);
      try { sessionStorage.setItem('waHint', '1'); } catch (_) {}
    }, 4500);
  }
})();
