/* Keep the decorative cursor in the browser's top layer while a modal is open. */
(() => {
  const ring = document.getElementById('cursorRing');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  if (!ring || !fine.matches) return;

  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    document.body.classList.add('has-cursor-ring');
    ring.classList.toggle('is-hovering', !!event.target.closest('a,button,.opt-card,label'));
    ring.style.left = event.clientX + 'px';
    ring.style.top = event.clientY + 'px';
  }, {passive: true});
  document.addEventListener('pointerdown', () => ring.classList.add('is-pressed'), {passive: true});
  document.addEventListener('pointerup', () => ring.classList.remove('is-pressed'), {passive: true});
  document.addEventListener('pointerleave', event => {
    if (event.target === document.documentElement) document.body.classList.remove('has-cursor-ring');
  }, true);
  fine.addEventListener('change', () => {
    if (!fine.matches) document.body.classList.remove('has-cursor-ring');
  });
})();
