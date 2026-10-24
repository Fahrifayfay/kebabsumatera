/* =====================================================================
   gallery-pro.js — Galeri 3D (kartu pop-out, spring, thumbnail), lightbox,
   video promo gaya stories, dan hint WhatsApp
   ===================================================================== */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const mod = (a, n) => ((a % n) + n) % n;
  const WA_NUM = '6282360422229';
  const waLink = t => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(t)}`;
  const rp = n => 'Rp' + Number(n).toLocaleString('id-ID');

  /* ------------------------------------------------------------- DATA
     Nama, harga, dan deskripsi diambil dari FULL_MENU (catalog-data.js) bila tersedia,
     jadi otomatis ikut berubah kalau harga di menu diubah. */
  const BASE = [
    { id: 'gerobak', g: 'Outlet', name: 'Gerobak Kebab Sumatera', desc: 'Gerobak kuning di Percut Sei Tuan, buka tiap malam 18.00–00.00 WIB', info: 'Mampir ke gerobak kuning kami di Hutan, Percut Sei Tuan. Kebab, burger, dan roti bakar dibuat langsung di depanmu, buka setiap malam pukul 18.00–00.00 WIB.', full: 'image/gerobak.jpeg', photo: true, cart: true },
    { id: 'kebab-4', g: 'Kebab', name: 'Kebab Sumatera Ayam', full: 'image/kebab/kebabsumateraayam.webp' },
    { id: 'kebab-5', g: 'Kebab', name: 'Kebab Sumatera Sapi', full: 'image/kebab/kebabsumaterasapi.webp' },
    { id: 'kebab-3', g: 'Kebab', name: 'Kebab Daging Crispy', full: 'image/kebab/kebabdagingcrispy.webp' },
    { id: 'kebab-6', g: 'Kebab', name: 'Kebab Fried Chicken', full: 'image/kebab/kebabfriedchicken.webp' },
    { id: 'kebab-7', g: 'Kebab', name: 'Kebab Sumatera Spesial', full: 'image/kebab/kebabspesial.webp' },
    { id: 'kebab-9', g: 'Kebab', name: 'Kebab Spesial Sapi', full: 'image/kebab/kebabspesialsapi.webp' },
    { id: 'kebab-10', g: 'Kebab', name: 'Kebab Spesial Mix', full: 'image/kebab/kebabspesialmix.webp' },
    { id: 'burger-6', g: 'Burger', name: 'Burger Ayam Keju', full: 'image/burger/burgerayamkeju.webp' },
    { id: 'burger-7', g: 'Burger', name: 'Burger Sapi Keju', full: 'image/burger/burgersapikeju.webp' },
    { id: 'burger-4', g: 'Burger', name: 'Burger Sumatera Ayam', full: 'image/burger/burgersumateraayam.webp' },
    { id: 'burger-2', g: 'Burger', name: 'Burger Sosis', full: 'image/burger/burgersosis.webp' },
    { id: 'burger-3', g: 'Burger', name: 'Burger Ayam Crispy', full: 'image/burger/burgerayamcrispy.webp' },
    { id: 'lumpia-1', g: 'Lainnya', name: 'Lumpia Sapi', full: 'image/model/lumpia.webp' },
    { id: 'roti-0', g: 'Lainnya', name: 'Roti Bakar Bandung', full: 'image/rasaroti/coklatkeju.webp' },
  ];
  const MENU = typeof FULL_MENU !== 'undefined' ? FULL_MENU : null;
  const PHOTOS = BASE.map(b => {
    const [c, i] = b.id.split('-'), m = MENU && MENU[c] && MENU[c].items[+i];
    return Object.assign({}, b, {
      name: (m && m.name) || b.name,
      price: m ? m.price : 0,
      desc: b.desc || (m && m.desc) || '',
      card: `image/galeri/${b.id}.webp`, thumb: `image/galeri/${b.id}-t.webp`,
    });
  });
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
    const track = $('#gxTrack'), word = $('#gxWord'), thumbs = $('#gxThumbs'), fx = $('#gxFx');
    const infoNum = $('#gxNum'), infoName = $('#gxName'), infoDesc = $('#gxDesc');
    const playBtn = $('#gxPlay'), prog = $('#gxProg');
    const filterBtns = $$('[data-gallery-filter]');
    const DUR = 5200;

    const svg = d => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}</svg>`;
    const IC = {
      heart: svg('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>'),
      chat: svg('<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>'),
      send: svg('<line x1="22" y1="3" x2="9.218" y2="10.083"/><polygon points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"/>'),
      mark: svg('<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>'),
    };
    const cards = PHOTOS.map((p, i) => {
      const el = document.createElement('figure');
      el.className = 'gx-card' + (p.photo ? ' photo' : '') + (p.cart ? ' cart' : '');
      el.dataset.g = p.g;
      el.setAttribute('role', 'group'); el.setAttribute('aria-roledescription', 'slide');
      const src = i < 3 ? `src="${p.card}"` : '';
      const mediaImg = p.photo && !p.cart;
      el.innerHTML =
        `<div class="gx-face">` +
          `<div class="gx-head"><span class="gx-ava"><img src="image/icon/logo.webp" alt="" width="30" height="30" draggable="false"></span>` +
            `<span class="gx-who"><b>kebabsumatera</b><small>Hutan, Percut Sei Tuan</small></span><span class="gx-tag">${LABEL[p.g]}</span></div>` +
          `<div class="gx-media"><div class="gx-art"></div>` +
            (mediaImg ? `<img class="gx-photo" ${src} data-src="${p.card}" alt="${p.name}" decoding="async" draggable="false">` : '<span class="gx-plate"></span>') +
            `<span class="gx-num">${i + 1}/${PHOTOS.length}</span></div>` +
          `<div class="gx-dots" aria-hidden="true"><i></i><i class="a"></i><i></i></div>` +
          `<div class="gx-acts">` +
            `<button type="button" class="gx-act gx-a-like" data-act="like" aria-pressed="false" aria-label="Suka ${p.name}" tabindex="-1">${IC.heart}</button>` +
            `<button type="button" class="gx-act gx-nofn" data-act="deco" aria-hidden="true" tabindex="-1">${IC.chat}</button>` +
            `<button type="button" class="gx-act gx-nofn" data-act="deco" aria-hidden="true" tabindex="-1">${IC.send}</button>` +
            `<button type="button" class="gx-act gx-a-save" data-act="save" aria-pressed="false" aria-label="Tandai ${p.name}" tabindex="-1">${IC.mark}</button>` +
          `</div>` +
          `<div class="gx-cap"><span class="gx-likes"></span><b>${p.name}</b><small>${p.desc}</small></div>` +
          `<span class="gx-shine"></span><i class="gx-dim"></i></div>` +
        (mediaImg ? '' : `<div class="gx-fw"><img class="gx-food" ${src} data-src="${p.card}" alt="${p.name}" decoding="async" draggable="false"></div>`) +
        `<span class="gx-price">${p.price ? `<small>MULAI</small>${rp(p.price)}` : 'MAMPIR!'}</span>` +
        `<span class="gx-big" aria-hidden="true">${IC.heart}</span>`;
      if (!p.price) $('.gx-price', el).style.background = 'var(--sun)', $('.gx-price', el).style.color = 'var(--ink)';
      el._dim = $('.gx-dim', el); el._fw = $('.gx-fw', el); el._pr = $('.gx-price', el);
      el._like = $('.gx-a-like', el); el._save = $('.gx-a-save', el); el._likes = $('.gx-likes', el); el._big = $('.gx-big', el); el._btns = $$('[data-act]:not([data-act="deco"])', el);
      track.appendChild(el);
      return el;
    });
    const thumbBtns = PHOTOS.map((p, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.setAttribute('aria-label', `Lihat ${p.name}`);
      b.innerHTML = `<img src="${p.thumb}" alt="" width="56" height="56" loading="lazy" draggable="false">`;
      thumbs.appendChild(b); b.addEventListener('click', () => { const k = vis.indexOf(i); if (k >= 0) goTo(k); });
      return b;
    });

    let likes = new Set();
    try { likes = new Set(JSON.parse(localStorage.getItem('ks-gx-likes') || '[]')); } catch (_) {}
    const saveLikes = () => { try { localStorage.setItem('ks-gx-likes', JSON.stringify([...likes])); } catch (_) {} };
    let saves = new Set();
    try { saves = new Set(JSON.parse(localStorage.getItem('ks-gx-saves') || '[]')); } catch (_) {}
    const saveSaves = () => { try { localStorage.setItem('ks-gx-saves', JSON.stringify([...saves])); } catch (_) {} };
    const paint = i => {
      const p = PHOTOS[i], c = cards[i], L = likes.has(p.id), S = saves.has(p.id);
      c.classList.toggle('liked', L); c.classList.toggle('saved', S);
      c._like.setAttribute('aria-pressed', String(L)); c._save.setAttribute('aria-pressed', String(S));
      c._likes.textContent = L ? '❤ Kamu menyukai ini' : 'Ketuk 2× buat kasih ❤';
    };
    PHOTOS.forEach((_, i) => paint(i));
    const toast = document.createElement('div'); toast.className = 'gx-toast'; toast.setAttribute('role', 'status'); stage.appendChild(toast);
    let toastT = 0;
    const say = t => { toast.textContent = t; toast.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('on'), 1800); };
    let vis = PHOTOS.map((_, i) => i), cur = 0, target = 0, vel = 0, lastRound = null, filter = 'Semua', ready = false;
    let raf = 0, dragging = false, moved = false, hovering = false, inView = false, userPaused = reduce, lastFx = 0;

    const step = () => Math.max(120, (cards[0].offsetWidth || 300) * (innerWidth < 640 ? .66 : .72));

    function layout() {
      const n = vis.length, s = step();
      vis.forEach((idx, k) => {
        const el = cards[idx];
        // 1 kartu saja (filter Gerobak): tidak ada tetangga untuk "memutar", jadi kartu hanya ikut ditarik
        // sedikit (karet) lalu membal kembali ke tengah — tidak lagi melayang keluar layar.
        const d = n > 1 ? mod(k - cur + n / 2, n) - n / 2 : Math.sign(k - cur) * .42 * (1 - Math.exp(-Math.abs(k - cur) * 1.6));
        const a = Math.abs(d);
        if (a > 3.4) { el.style.visibility = 'hidden'; el.style.pointerEvents = 'none'; return; }
        el.style.visibility = ''; el.style.pointerEvents = '';
        const x = Math.sign(d) * (Math.min(a, 1) * s + Math.max(0, a - 1) * s * .6);
        el.style.transform = `translate3d(${x.toFixed(1)}px,0,${(-a * 190).toFixed(0)}px) rotateY(${(-d * 32).toFixed(1)}deg) scale(${(1 - Math.min(a, 2.4) * .075).toFixed(3)})`;
        el.style.zIndex = String(100 - Math.round(a * 10));
        el.style.opacity = String(Math.max(0, 1 - Math.max(0, a - 1.8) * .7).toFixed(2));
        el._dim.style.opacity = String(Math.min(.55, a * .3).toFixed(2));
      });
    }

    /* spring berbasis waktu: sedikit membal saat berhenti, tetap konsisten walau FPS turun */
    let lastT = 0;
    function tick(t) {
      const n = Math.min(5, Math.max(1, Math.round((t - (lastT || t - 16.7)) / 16.7))); lastT = t;
      for (let i = 0; i < n; i++) { const diff = target - cur; vel = (vel + diff * .09) * .7; cur += vel; }
      if (Math.abs(target - cur) < .0015 && Math.abs(vel) < .0015) { cur = target; vel = 0; lastT = 0; layout(); raf = 0; return; }
      layout(); raf = requestAnimationFrame(tick);
    }
    const kick = () => { if (reduce) { cur = target; layout(); return; } if (!raf) raf = requestAnimationFrame(tick); };

    function loadNear(k) {
      const n = vis.length;
      for (let o = -3; o <= 3; o++) {
        cards[vis[mod(k + o, n)]].querySelectorAll('img[data-src]').forEach(im => { if (!im.getAttribute('src')) im.src = im.dataset.src; });
      }
    }

    /* efek saat kartu tengah berganti: makanan "meloncat", cincin, dan kilau bintang */
    function burst(card) {
      if (reduce || !ready) return;
      const fw = card._fw;
      if (fw) fw.animate([
        { transform: 'translateZ(46px) scale(.62) rotate(-18deg)', opacity: .3 },
        { transform: 'translateZ(46px) scale(1.08) rotate(3deg)', opacity: 1, offset: .62 },
        { transform: 'translateZ(46px) scale(1) rotate(0)' }], { duration: 720, easing: 'cubic-bezier(.2,.9,.3,1)' });
      card._pr.animate([{ transform: 'translateZ(90px) rotate(7deg) scale(0)' }, { transform: 'translateZ(90px) rotate(-4deg) scale(1.2)', offset: .6 }, { transform: 'translateZ(90px) rotate(7deg) scale(1)' }], { duration: 600, delay: 140, easing: 'ease-out', fill: 'backwards' });
      const now = performance.now(); if (now - lastFx < 420) return; lastFx = now;
      const ring = $('.gx-ring', fx);
      ring.animate([{ transform: 'scale(.35)', opacity: .9 }, { transform: 'scale(2)', opacity: 0 }], { duration: 800, easing: 'cubic-bezier(.2,.8,.2,1)' });
      for (let i = 0; i < 9; i++) {
        const s = document.createElement('i'); s.className = 'gx-spark'; s.textContent = i % 3 ? '✦' : '✧';
        s.style.color = i % 2 ? '#fff' : '#ffe27a'; fx.appendChild(s);
        const ang = (i / 9) * Math.PI * 2 + Math.random() * .5, r = 120 + Math.random() * 90;
        s.animate([{ transform: 'translate(0,0) scale(.3) rotate(0)', opacity: 1 }, { transform: `translate(${Math.cos(ang) * r}px,${Math.sin(ang) * r * .8}px) scale(${.9 + Math.random() * .8}) rotate(${Math.random() * 200 - 100}deg)`, opacity: 0 }],
          { duration: 700 + Math.random() * 400, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => s.remove();
      }
    }

    function setActive() {
      const n = vis.length; if (!n) return;
      const k = mod(Math.round(target), n);
      if (k === lastRound) return;
      lastRound = k;
      const idx = vis[k], p = PHOTOS[idx];
      cards.forEach((c, i) => { c.classList.toggle('on', i === idx); c.setAttribute('aria-hidden', i === idx ? 'false' : 'true'); c._btns.forEach(b => { b.tabIndex = i === idx ? 0 : -1; }); });
      infoNum.textContent = `${String(k + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')} · ${LABEL[p.g]}${likes.has(p.id) ? ' · ❤ Favoritmu' : ''}`;
      infoName.textContent = p.name; infoDesc.textContent = p.info || p.desc;
      thumbBtns.forEach((b, i) => b.setAttribute('aria-current', String(i === idx)));
      const tb = thumbBtns[idx];
      if (tb) thumbs.scrollTo({ left: tb.offsetLeft - thumbs.clientWidth / 2 + tb.offsetWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
      stage.dataset.g = p.g;
      const w = filter === 'Semua' ? WORD[p.g] : WORD[filter];
      if (word.textContent !== w) { word.textContent = w; word.classList.remove('swap'); void word.offsetWidth; word.classList.add('swap'); }
      loadNear(k); burst(cards[idx]); autoReset();
    }

    function go(delta) { target = vis.length < 2 ? 0 : Math.round(target) + delta; kick(); setActive(); }
    function goTo(k) { const n = vis.length; let d = mod(k - Math.round(target), n); if (d > n / 2) d -= n; go(d); }

    function applyFilter(f, animate = true) {
      filter = f; vis = [];
      PHOTOS.forEach((p, i) => { const show = f === 'Semua' || p.g === f; cards[i].hidden = !show; thumbBtns[i].hidden = !show; if (show) vis.push(i); });
      cur = target = vel = 0; lastRound = null;
      filterBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.galleryFilter === f)));
      const solo = vis.length < 2;   // 1 kartu: panah & autoplay tidak ada gunanya
      [$('#gxPrev'), $('#gxNext')].forEach(b => { if (b) b.style.display = solo ? 'none' : ''; });
      layout(); setActive();
      if (animate && !reduce) track.animate([{ opacity: 0, transform: 'scale(.88) translateY(30px)' }, { opacity: 1, transform: 'none' }], { duration: 560, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
    filterBtns.forEach(b => {
      const f = b.dataset.galleryFilter;
      const n = f === 'Semua' ? PHOTOS.length : PHOTOS.filter(p => p.g === f).length;
      b.insertAdjacentHTML('beforeend', `<i aria-hidden="true">${n}</i>`);
      b.addEventListener('click', () => applyFilter(f));
    });

    /* ---- drag / swipe / klik ---- */
    let sx = 0, sTarget = 0, lx = 0, lt = 0, v = 0, pid = null;
    track.addEventListener('pointerdown', e => {
      if (e.button > 0) return;
      dragging = true; moved = false; sx = lx = e.clientX; lt = performance.now(); v = 0;
      sTarget = target = cur; vel = 0; pid = e.pointerId; aPause();
    });
    window.addEventListener('pointermove', e => {
      if (!dragging || e.pointerId !== pid) return;
      const dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 6) { moved = true; track.classList.add('drag'); try { track.setPointerCapture(pid); } catch (_) {} }
      if (moved) {
        const now = performance.now(), dt = Math.max(1, now - lt);
        v = .8 * v + .2 * ((e.clientX - lx) / dt); lx = e.clientX; lt = now;
        target = sTarget - dx / step(); kick();
      }
    }, { passive: true });
    const endDrag = e => {
      if (!dragging || (e && e.pointerId !== pid)) return;
      dragging = false; track.classList.remove('drag');
      if (moved) { target = vis.length < 2 ? 0 : Math.round(target - v * 280 / step()); kick(); setActive(); }
      aResume();
    };
    window.addEventListener('pointerup', endDrag); window.addEventListener('pointercancel', endDrag);
    function like(idx, e) {
      const p = PHOTOS[idx], on = !likes.has(p.id);
      on ? likes.add(p.id) : likes.delete(p.id); saveLikes();
      paint(idx);
      infoNum.textContent = infoNum.textContent.replace(' · ❤ Favoritmu', '') + (on ? ' · ❤ Favoritmu' : '');
      if (!on || reduce) return;
      cards[idx]._big.animate([
        { transform: 'translate(-50%,-50%) translateZ(120px) scale(.3) rotate(-14deg)', opacity: 0 },
        { transform: 'translate(-50%,-50%) translateZ(120px) scale(1.25) rotate(4deg)', opacity: 1, offset: .32 },
        { transform: 'translate(-50%,-50%) translateZ(120px) scale(1) rotate(0)', opacity: 1, offset: .68 },
        { transform: 'translate(-50%,-50%) translateZ(120px) scale(1.12)', opacity: 0 }], { duration: 950, easing: 'ease-out' });
      const r = stage.getBoundingClientRect(), x = e ? e.clientX - r.left : r.width / 2, y = e ? e.clientY - r.top : r.height / 2;
      for (let i = 0; i < 7; i++) {
        const h = document.createElement('i'); h.className = 'gx-heart'; h.textContent = '❤'; h.style.left = x + 'px'; h.style.top = y + 'px';
        h.style.fontSize = 18 + Math.random() * 26 + 'px'; stage.appendChild(h);
        const dx = (Math.random() - .5) * 150, dy = -(70 + Math.random() * 130), rot = (Math.random() - .5) * 60;
        h.animate([{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 1 }, { transform: `translate(calc(-50% + ${dx * .5}px),calc(-50% + ${dy * .5}px)) scale(1.25) rotate(${rot}deg)`, opacity: 1, offset: .35 }, { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.9) rotate(${rot * 1.6}deg)`, opacity: 0 }],
          { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => h.remove();
      }
    }
    function act(kind, idx, btn, e) {
      const p = PHOTOS[idx];
      if (!reduce && (kind === 'like' || kind === 'save')) btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.4)' }, { transform: 'scale(1)' }], { duration: 380, easing: 'cubic-bezier(.3,1.6,.5,1)' });
      if (kind === 'like') like(idx, e && e.detail ? e : null);
      else if (kind === 'save') {
        const on = !saves.has(p.id); on ? saves.add(p.id) : saves.delete(p.id); saveSaves(); paint(idx);
        say(on ? 'Ditandai ✓' : 'Tanda dihapus');
      }
    }
    let clickT = 0;
    track.addEventListener('click', e => {
      if (moved) { moved = false; return; }
      const c = e.target.closest('.gx-card'); if (!c) return;
      const idx = cards.indexOf(c), k = vis.indexOf(idx);
      if (k !== mod(Math.round(target), vis.length)) { goTo(k); return; }
      const ab = e.target.closest('[data-act]');
      if (ab) { if (ab.dataset.act !== 'deco') act(ab.dataset.act, idx, ab, e); return; }   // 'deco' = hiasan, tanpa fungsi
      if (clickT) { clearTimeout(clickT); clickT = 0; like(idx, e); return; }   // klik ke-2 = ❤
      clickT = setTimeout(() => { clickT = 0; openLightbox(idx); }, 260);       // klik tunggal = zoom
    });

    /* ---- parallax kursor (langsung ke elemen, tanpa CSS variable di parent) ---- */
    const floats = $$('.gx-float img'); let pRaf = 0, px = 0, py = 0, pe = null;
    const parallax = () => {
      pRaf = 0;
      word.style.translate = `calc(-50% + ${(-px * 46).toFixed(1)}px) ${(-py * 18).toFixed(1)}px`;
      floats.forEach((f, i) => { const d = 22 + i * 9; f.style.translate = `${(-px * d).toFixed(1)}px ${(-py * d).toFixed(1)}px`; });
      const c = $('.gx-card.on', track);
      if (c && pe) {
        const cr = c.getBoundingClientRect(), cx = (pe.clientX - cr.left) / cr.width - .5, cy = (pe.clientY - cr.top) / cr.height - .5;
        if (Math.abs(cx) < .9 && Math.abs(cy) < .9) {
          if (c._fw) { c._fw.style.translate = `${(cx * 22).toFixed(1)}px ${(cy * 14).toFixed(1)}px`; c._fw.style.rotate = `${(cx * 5).toFixed(1)}deg`; }
          c._pr.style.translate = `${(cx * -12).toFixed(1)}px ${(cy * -8).toFixed(1)}px`;
          c.style.setProperty('--sx', ((cx + .5) * 100).toFixed(0));
        }
      }
    };
    if (fine && !reduce) {
      stage.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse') return;
        const r = stage.getBoundingClientRect(); px = (e.clientX - r.left) / r.width - .5; py = (e.clientY - r.top) / r.height - .5; pe = e;
        if (!pRaf) pRaf = requestAnimationFrame(parallax);
      });
      stage.addEventListener('pointerleave', () => {
        px = py = 0; pe = null; parallax();
        $$('.gx-fw,.gx-price', track).forEach(el => { el.style.translate = ''; el.style.rotate = ''; });
      });
    }

    /* ---- keyboard + wheel + tombol ---- */
    stage.addEventListener('keydown', e => {
      if (e.target.closest('button,a') && e.target !== stage) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      else if (e.key === 'End') { e.preventDefault(); goTo(vis.length - 1); }
      else if ((e.key === 'l' || e.key === 'L') && e.target === stage) { e.preventDefault(); like(vis[mod(Math.round(target), vis.length)]); }
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
    const canAuto = () => vis.length > 1 && !userPaused && inView && !hovering && !dragging && !document.hidden && !$('#lightbox').classList.contains('open');
    function aRun() { clearTimeout(aT); aT = 0; if (!canAuto()) return; aStart = performance.now(); aT = setTimeout(() => { aT = 0; aRem = DUR; go(1); }, aRem); }
    function aPause() { if (aT) { clearTimeout(aT); aT = 0; aRem = Math.max(400, aRem - (performance.now() - aStart)); } stage.classList.add('paused'); }
    function aResume() { if (canAuto()) { stage.classList.remove('paused'); aRun(); } }
    function autoReset() {
      aRem = DUR; stage.classList.toggle('noauto', userPaused);
      prog.classList.remove('run'); void prog.offsetWidth; if (!userPaused) prog.classList.add('run');
      if (canAuto()) { stage.classList.remove('paused'); aRun(); }
    }
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
      if (userPaused) { aPause(); stage.classList.add('noauto'); prog.classList.remove('run'); } else { stage.classList.remove('noauto'); aRem = DUR; prog.classList.remove('run'); void prog.offsetWidth; prog.classList.add('run'); aResume(); }
    });
    if (userPaused) { playBtn.textContent = '▶'; playBtn.setAttribute('aria-label', 'Putar otomatis'); playBtn.setAttribute('aria-pressed', 'true'); }
    new IntersectionObserver(es => { inView = es[0].isIntersecting; inView ? aResume() : aPause(); }, { threshold: .35 }).observe(stage);
    new ResizeObserver(layout).observe(track);

    applyFilter('Semua', false);
    ready = true;
    [$('.gx-filters'), stage].forEach((el, i) => reveal(el, i * 120));
  }

  /* ============================================================ LIGHTBOX */
  const lb = $('#lightbox');
  let lbReturn = null, lbIdx = 0;
  function visList() { return $$('#gxTrack .gx-card').map((c, i) => c.hidden ? -1 : i).filter(i => i >= 0); }
  function showLb(idx) {
    const p = PHOTOS[idx]; lbIdx = idx;
    const img = $('#lightboxImg'); img.src = p.full; img.alt = p.name;
    $('#lightboxCaption').textContent = p.price ? `${p.name} · ${rp(p.price)}` : p.name;
    const list = visList(); $('#lightboxPosition').textContent = `${list.indexOf(idx) + 1} / ${list.length}`;
    img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
  }
  function openLightbox(idx) {
    lbReturn = document.activeElement; showLb(idx);
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.classList.add('gallery-modal-open');
    const ring = $('#cursorRing'); if (ring) { if (window.cursorRing && window.cursorRing.lift) window.cursorRing.lift(lb); else lb.append(ring); }
    $('#lightboxClose').focus();
  }
  function closeLb() {
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.classList.remove('gallery-modal-open');
    const ring = $('#cursorRing'); if (ring) { if (window.cursorRing && window.cursorRing.drop) window.cursorRing.drop(); else document.body.append(ring); }
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
