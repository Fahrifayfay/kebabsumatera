/* =====================================================================
   mobile-ui.js
   - Pop-up "Pesan lewat mana?" (modal tengah layar) + tombol Pesan kanan atas
   - Navbar bawah HP: menu "Lainnya" + label/ikon mengikuti section aktif
   ===================================================================== */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const scrollLock = on => { try { if (typeof lenis !== 'undefined' && lenis) on ? lenis.stop() : lenis.start(); } catch (e) {} };

  /* ---------------------------------------------------------------- Pop-up pesan */
  const sheet = $('#orderSheet'), bd = $('#osBd');
  let opener = null, lastFocus = null;

  const openSheet = el => {
    if (!sheet) return;
    closeMore();
    opener = el || null; lastFocus = document.activeElement;
    opener && opener.setAttribute('aria-expanded', 'true');
    sheet.classList.add('on'); bd.classList.add('on'); sheet.setAttribute('aria-hidden', 'false');
    root.classList.add('op-lock'); scrollLock(true);
    setTimeout(() => { const f = $('.os-i', sheet); f && f.focus({ preventScroll: true }); }, 80);
  };
  const closeSheet = () => {
    if (!sheet || !sheet.classList.contains('on')) return;
    sheet.classList.remove('on'); bd.classList.remove('on'); sheet.setAttribute('aria-hidden', 'true');
    root.classList.remove('op-lock'); scrollLock(false);
    if (opener) { opener.setAttribute('aria-expanded', 'false'); }
    const back = opener || lastFocus; opener = null;
    back && back.focus && back.focus({ preventScroll: true });
  };

  if (sheet) {
    bd.addEventListener('click', closeSheet);
    $$('[data-os-close]', sheet).forEach(b => b.addEventListener('click', closeSheet));
    $$('.os-i', sheet).forEach(a => a.addEventListener('click', () => setTimeout(closeSheet, 250)));
    sheet.addEventListener('keydown', e => { // fokus tetap di dalam pop-up
      if (e.key !== 'Tab') return;
      const f = $$('a[href],button', sheet).filter(x => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  // tombol pemicu: tombol atas HP, tombol navbar desktop, tombol di hero
  const chev = '<svg class="op-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  const bag = '<span class="op-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5.2 8h13.6l1.2 11.2a1.8 1.8 0 0 1-1.8 2H5.8a1.8 1.8 0 0 1-1.8-2L5.2 8z" fill="currentColor"/><path d="M8.6 10.2V7.4a3.4 3.4 0 0 1 6.8 0v2.8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path class="op-smile" d="M8.8 13.6a3.2 3.2 0 0 0 6.4 0" stroke-width="1.9" stroke-linecap="round"/><path class="op-star" d="M20 1.6l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></svg></span>';
  const bind = el => {
    if (!el || el._os) return; el._os = 1;
    el.classList.add('order-pick');
    el.setAttribute('role', 'button'); el.setAttribute('aria-haspopup', 'dialog'); el.setAttribute('aria-expanded', 'false');
    el.innerHTML = bag + '<span>Pesan Sekarang</span>' + chev;
    el.addEventListener('click', e => { e.preventDefault(); openSheet(el); });
  };
  const scan = () => { bind($('.nav-order')); $$('.hero-cta a[data-link="gofood"]').forEach(bind); };
  scan(); setTimeout(scan, 600); setTimeout(scan, 2000);

  const top = $('#orderTop');
  if (top) {
    // Shared measured height keeps the WA button below Pesan after font/viewport changes.
    let orderHeight = 0;
    new ResizeObserver(() => {
      const height = top.offsetHeight;
      if (height && height !== orderHeight) { orderHeight = height; root.style.setProperty('--mobile-order-height', height + 'px'); }
    }).observe(top);
    top.addEventListener('click', () => (sheet.classList.contains('on') ? closeSheet() : openSheet(top)));
    const show = () => top.classList.add('is-in');
    if (document.body.classList.contains('ready')) show();
    else new MutationObserver((_, ob) => { if (document.body.classList.contains('ready')) { show(); ob.disconnect(); } })
      .observe(document.body, { attributes: true, attributeFilter: ['class'] });
    setTimeout(show, 6500);
  }

  /* ---------------------------------------------------------------- Navbar bawah: "Lainnya" */
  const mm = $('#mMore'), mmBd = $('#mmBd'), btn = $('#mMoreBtn'), lab = $('#mMoreLabel');
  const useEl = btn && $('use', btn);
  const tiles = $$('a[data-mm]', mm || document);
  tiles.forEach((a, i) => a.style.setProperty('--i', i));

  function openMore() {
    if (!mm) return;
    closeSheet();
    mm.classList.add('on'); mmBd.classList.add('on'); mm.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true'); btn.classList.add('is-open');
  }
  function closeMore() {
    if (!mm || !mm.classList.contains('on')) return;
    mm.classList.remove('on'); mmBd.classList.remove('on'); mm.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false'); btn.classList.remove('is-open');
  }
  if (btn && mm) {
    const toggle = e => { e.preventDefault(); mm.classList.contains('on') ? closeMore() : openMore(); };
    btn.addEventListener('click', toggle);
    btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') toggle(e); });
    mmBd.addEventListener('click', closeMore);
    // One navigation action per tile, including Bantuan. Close the overlay before
    // scrolling so it cannot cover or intercept the destination section.
    mm.addEventListener('click', e => {
      const link = e.target.closest('a[data-mm]');
      if (!link || !link.hash) { if (link) closeMore(); return; }
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      e.preventDefault(); e.stopPropagation(); closeMore();
      requestAnimationFrame(() => {
        const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
        if (typeof lenis !== 'undefined' && lenis) lenis.scrollTo(target, { offset: -90, force: true });
        else window.scrollTo({ top: Math.max(0, scrollY + target.getBoundingClientRect().top - 90), behavior: reduce ? 'instant' : 'smooth' });
        const heading = target.querySelector('h2');
        if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
      });
    }, true);
  }

  // label + ikon "Lainnya" mengikuti section yang sedang dilihat
  const INFO = {
    galeri: ['Galeri', 'i-image'], bantuan: ['Bantuan', 'i-help'], 'cara-pesan': ['Cara', 'i-list'],
    review: ['Ulasan', 'i-star'], lokasi: ['Kontak', 'i-pin'], 'cta-final': ['Kontak', 'i-pin']
  };
  let shown = '';
  addEventListener('mnav:section', e => {
    const id = e.detail, inf = INFO[id] || ['Lainnya', 'i-grid'];
    const key = id === 'cta-final' ? 'lokasi' : id;
    tiles.forEach(a => a.classList.toggle('is-active', a.dataset.mm === key));
    if (!lab || shown === inf[0]) return;
    shown = inf[0]; lab.textContent = inf[0];
    useEl && useEl.setAttribute('href', '#' + inf[1]);
    btn.setAttribute('aria-label', INFO[id] ? 'Lainnya, sekarang di ' + inf[0] : 'Lainnya');
  });

  /* ---------------------------------------------------------------- umum */
  addEventListener('keydown', e => { if (e.key === 'Escape') { closeSheet(); closeMore(); } });
  addEventListener('resize', () => { if (innerWidth > 860) closeMore(); });
})();
