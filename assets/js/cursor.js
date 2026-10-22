/* Kursor dekoratif (cincin). Tetap di atas modal, selalu sinkron dengan posisi mouse,
   dan tidak pernah tersangkut dalam keadaan "ditekan". */
(() => {
  const ring = document.getElementById('cursorRing');
  if (!ring || !matchMedia('(any-pointer: fine)').matches) return;
  const HOVER = 'a,button,summary,label,[role="button"],[role="radio"],[tabindex]:not([tabindex="-1"]),.opt-card,.os-i,.gx-card,.gallery-card';
  let frame = 0, x = -100, y = -100, shown = false, pressed = false;

  // Cincin dipasang sebagai popover (top layer) supaya selalu di atas dialog/lightbox
  // TANPA dipindah ke dalam elemen yang beranimasi (itu penyebab kursor "lari" saat dialog dibuka).
  const canPopover = typeof ring.showPopover === 'function';
  const toTop = host => {
    if (canPopover) {
      try { if (ring.matches(':popover-open')) ring.hidePopover(); ring.showPopover(); } catch (_) {}
    } else if (host) host.append(ring);
  };
  const toBody = () => { if (!canPopover) document.body.append(ring); };
  if (canPopover) { ring.setAttribute('popover', 'manual'); toTop(); }
  window.cursorRing = { lift: toTop, drop: toBody };

  const hoverAt = () => {
    const el = document.elementFromPoint(x, y);
    return !!(el && el.closest(HOVER));
  };
  const paint = () => {
    frame = 0;
    // Posisi lewat properti `translate` (bukan `transform`): urutan CSS = translate → scale → transform,
    // jadi kalau posisi ditaruh di `transform`, scale (.78 saat klik, 1.2 saat hover) ikut mengecilkan/
    // membesarkan koordinatnya dan cincin "lari" menjauh dari mouse. Dengan translate, scale hanya
    // mengubah ukuran cincin di tempat. calc(... - 50%) = titik tengah cincin tepat di mouse.
    ring.style.translate = `calc(${x}px - 50%) calc(${y}px - 50%)`;
    ring.classList.toggle('is-hovering', hoverAt());
    ring.classList.toggle('is-pressed', pressed);
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
  const show = () => { if (!shown) { shown = true; document.body.classList.add('has-cursor-ring'); } };
  const hide = () => { shown = false; pressed = false; ring.classList.remove('is-pressed'); document.body.classList.remove('has-cursor-ring'); };
  const release = () => { if (pressed) { pressed = false; schedule(); } };
  const track = e => { x = e.clientX; y = e.clientY; show(); };

  document.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') { track(e); schedule(); } }, { passive: true });
  document.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') return;
    track(e); pressed = true; schedule();
  }, { passive: true, capture: true });
  // Lepas tombol di mana pun (termasuk di luar jendela / saat drag) mengembalikan cincin.
  ['pointerup', 'pointercancel', 'dragend', 'contextmenu'].forEach(t => addEventListener(t, release, { passive: true, capture: true }));
  addEventListener('blur', hide);
  document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); });
  document.documentElement.addEventListener('mouseleave', hide);
  document.documentElement.addEventListener('mouseenter', e => { track(e); schedule(); });

  // Halaman bergeser / modal membuka-menutup tanpa gerakan mouse: cek ulang elemen di bawah kursor.
  const refresh = () => { if (shown) schedule(); };
  addEventListener('scroll', refresh, { passive: true });
  addEventListener('resize', refresh, { passive: true });
  document.addEventListener('click', () => { refresh(); setTimeout(refresh, 120); setTimeout(refresh, 420); }, { passive: true, capture: true });
})();
