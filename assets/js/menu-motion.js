/* menu.html — animasi masuk halus: GSAP (timeline + ScrollTrigger) + Lenis (smooth scroll).
   Menggantikan animasi CSS lama di elemen intro & reveal kartu berbasis IntersectionObserver. */
(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return; // CSS lama sudah mematikan animasi untuk reduced-motion
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- LENIS: smooth scroll, tersambung ke ScrollTrigger ---------- */
  let lenis = null;
  if (window.Lenis && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true, wheelMultiplier: .95, touchMultiplier: 1.6
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    window.lenis = lenis; // menu.js memakai ini untuk lenis.stop()/start() saat dialog menu dibuka
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const id = a.getAttribute('href'); if (id.length < 2) return;
      const el = document.querySelector(id); if (!el) return;
      e.preventDefault(); lenis.scrollTo(el, { offset: -90 });
    }));
  }

  /* ---------- INTRO: header → judul → panel kontrol → tab ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const kill = els => els.forEach(el => { el.style.animation = 'none'; }); // CSS lama dimatikan, GSAP yang pegang

  const header = $('.catalog-header');
  const navItems = $$('.catalog-brand, .catalog-nav-links a');
  const eyebrow = $('.menu-page .section-head .eyebrow');
  const h1Spans = $$('.h1-line > span, .h1-line em > span');
  const lead = $('.menu-page .section-head p');
  const controls = $('.menu-controls');
  const tabs = $$('#menuTabs .menu-tab-btn');
  const results = $('.menu-results-line');
  const ribbon = $('.menu-ribbon');
  const bg = $('.menu-bg');
  kill([header, eyebrow, ...h1Spans, lead, controls, ...tabs, results].filter(Boolean));

  const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
  if (bg) intro.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'power2.out', clearProps: 'opacity' }, 0);
  if (header) intro.fromTo(header, { yPercent: -100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, clearProps: 'transform,opacity' }, 0);
  if (navItems.length) intro.fromTo(navItems, { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .07, clearProps: 'transform,opacity' }, .25);
  if (ribbon) intro.fromTo(ribbon, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut', clearProps: 'clipPath' }, .2);
  if (eyebrow) intro.fromTo(eyebrow, { scale: .6, rotation: -12, opacity: 0 }, { scale: 1, rotation: -2, opacity: 1, duration: 1, ease: 'back.out(1.6)' }, .45);
  if (h1Spans.length) intro.fromTo(h1Spans, { yPercent: 115, rotation: 4, opacity: 0 }, { yPercent: 0, rotation: 0, opacity: 1, duration: 1.15, stagger: .16, clearProps: 'transform,opacity' }, .6);
  if (lead) intro.fromTo(lead, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 1, clearProps: 'transform,opacity' }, 1.05);
  if (controls) intro.fromTo(controls, { y: 56, scale: .97, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1.1, clearProps: 'transform,opacity' }, 1.2);
  if (tabs.length) intro.fromTo(tabs, { scale: .6, y: 12, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: .8, stagger: .07, ease: 'back.out(1.7)', clearProps: 'transform,opacity' }, 1.55);
  if (results) intro.fromTo(results, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .9, clearProps: 'transform,opacity' }, 1.8);

  /* ---------- KARTU MENU: muncul bertahap saat di-scroll (dan setiap kali filter/cari) ---------- */
  const panels = $('#menuPanels');
  let triggers = [];
  const wire = () => {
    triggers.forEach(t => t.kill()); triggers = [];
    const cards = $$('.dish-card', panels).filter(c => !c.dataset.mm);
    if (!cards.length) return;
    cards.forEach(c => { c.dataset.mm = '1'; });
    gsap.set(cards, { opacity: 0, y: 64, scale: .94, rotation: -1.2 });
    const firstRun = intro.isActive() || intro.progress() < 1;
    triggers = ScrollTrigger.batch(cards, {
      start: 'top 93%', once: true, interval: .08, batchMax: 6,
      onEnter: batch => {
        const wait = firstRun && intro.isActive() ? Math.max(0, intro.duration() * .82 - intro.time()) : 0;
        gsap.to(batch, {
          opacity: 1, y: 0, scale: 1, rotation: 0,
          duration: 1, ease: 'expo.out', delay: wait,
          stagger: { each: .09, grid: 'auto', from: 'start' },
          overwrite: 'auto', clearProps: 'transform,opacity'
        });
      }
    });
    ScrollTrigger.refresh();
  };
  if (panels) {
    wire();
    new MutationObserver(() => wire()).observe(panels, { childList: true });
  }

  /* ---------- Catatan harga & footer ---------- */
  const note = $('#menuNote');
  if (note) gsap.from(note, { y: 24, opacity: 0, duration: 1, ease: 'expo.out', clearProps: 'transform,opacity',
    scrollTrigger: { trigger: note, start: 'top 96%', once: true } });
  const foot = $$('.catalog-footer .wrap > *');
  if (foot.length) gsap.from(foot, { y: 28, opacity: 0, duration: 1, stagger: .12, ease: 'expo.out', clearProps: 'transform,opacity',
    scrollTrigger: { trigger: '.catalog-footer', start: 'top 98%', once: true } });
})();
