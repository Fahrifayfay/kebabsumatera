/* Section bertumpuk: section menempel di dasar layar dan ditimpa section berikutnya.
   - top sticky = min(0, tinggi layar - tinggi section) agar section tinggi baru "diam" saat dasarnya terlihat
   - --cover (0..1) pada section yang sedang tertimpa dipakai untuk meredupkan
   - navigasi anchor (Lenis) memakai posisi alur asli, bukan posisi tempel */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // pasangan: [section yang menempel, section yang naik menimpanya]. Hanya Menu dan Galeri yang menimpa.
  const pairs = [['promo','menu-favorit'],['tentang','galeri']]
    .map(([a, b]) => [document.getElementById(a), document.getElementById(b)]).filter(([a, b]) => a && b);
  if (!pairs.length) return;
  const secs = pairs.flat();
  const pins = pairs.map(p => p[0]);
  const dimmers = new WeakMap();

  pairs.forEach(([pin, over], i) => {
    pin.classList.add('stack-pin'); over.classList.add('stack-over');
    pin.style.setProperty('--stack-z', String(10 + i * 2));
    over.style.setProperty('--stack-z', String(11 + i * 2));
    const dim = document.createElement('i'); dim.className = 'stack-dim'; dim.setAttribute('aria-hidden', 'true');
    pin.append(dim);
    dimmers.set(pin, dim);
  });

  const layout = () => {
    const vh = innerHeight;
    pins.forEach(s => s.style.setProperty('--stack-top', Math.min(0, vh - s.offsetHeight) + 'px'));
  };

  let raf = 0;
  const update = () => {
    raf = 0;
    const vh = innerHeight;
    pairs.forEach(([pin, over]) => {
      const p = Math.max(0, Math.min(1, 1 - over.getBoundingClientRect().top / vh));
      const v = p.toFixed(3);
      if (pin._cover !== v) { pin._cover = v; dimmers.get(pin).style.setProperty('--cover', v); }
    });
  };
  const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };

  const relayout = () => { layout(); schedule(); };
  relayout();
  addEventListener('resize', relayout, { passive: true });
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('load', () => setTimeout(relayout, 300));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  const ro = new ResizeObserver(relayout); secs.forEach(s => ro.observe(s));

  // posisi section menurut alur dokumen (sticky mengubah getBoundingClientRect saat menempel)
  const flowTop = el => {
    let y = 0;
    for (let n = el.previousElementSibling; n; n = n.previousElementSibling) {
      const pos = getComputedStyle(n).position;
      if (pos === 'fixed' || pos === 'absolute') continue;
      y += n.offsetHeight;
    }
    return y;
  };
  const patch = () => {
    if (typeof lenis === 'undefined' || !lenis || lenis._stackPatched) return !!(typeof lenis !== 'undefined' && lenis);
    const orig = lenis.scrollTo.bind(lenis);
    lenis.scrollTo = (target, opts) => {
      const sec = target instanceof Element ? secs.find(s => s === target || s.contains(target)) : null;
      if (sec && sec === target) return orig(flowTop(sec) + ((opts && opts.offset) || 0), Object.assign({}, opts, { offset: 0 }));
      return orig(target, opts);
    };
    lenis._stackPatched = true; return true;
  };
  if (!patch()) setTimeout(patch, 400);
  // Tanpa Lenis (HP / sentuh): handler anchor memakai window.scrollTo / scrollIntoView dengan posisi
  // getBoundingClientRect, yang salah untuk section yang sedang menempel. Koreksi ke posisi alur.
  let pending = null, pendingTimer = 0;
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a || a.hash.length < 2) return;
    const t = document.getElementById(a.hash.slice(1));
    if (t && secs.includes(t)) { pending = t; clearTimeout(pendingTimer); pendingTimer = setTimeout(() => { pending = null; }, 1200); }
  }, true);
  const nativeScrollTo = window.scrollTo.bind(window);
  window.scrollTo = function (a, b) {
    if (pending && a && typeof a === 'object' && typeof a.top === 'number') {
      const off = a.top - (scrollY + pending.getBoundingClientRect().top);
      a = Object.assign({}, a, { top: Math.max(0, flowTop(pending) + off) });
    }
    return nativeScrollTo(a, b);
  };
  secs.forEach(s => { s.scrollIntoView = o => nativeScrollTo({ top: flowTop(s), behavior: (o && o.behavior) || 'auto' }); });
})();
