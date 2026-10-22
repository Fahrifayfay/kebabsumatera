/* mobile-fix.js — taruh SETELAH hero-tall.js di index.html.
   Di HP: ganti goTo() milik wave-pro.js (animasi clip-path, berat) dengan lingkaran
   yang digerakkan transform (jalan di GPU). Desktop tetap pakai versi asli. */
(function () {
  var mq = window.matchMedia('(max-width: 820px), (hover: none)');
  var original = window.goTo;
  var hero = document.getElementById('hero');
  var giantWrap = document.getElementById('heroGiant');
  if (!hero || !giantWrap || typeof original !== 'function') return;

  var disc = document.createElement('div');
  disc.className = 'hero-disc';
  hero.insertBefore(disc, giantWrap);

  window.goTo = function (index) {
    if (!mq.matches) return original(index);

    index = (index + N) % N;
    if (index === currentHero || heroBusy ||
        !document.body.classList.contains('ready') ||
        document.body.classList.contains('intro-play')) return;
    heroBusy = true;

    var old = currentHero, th = THEME[index];
    var fe = document.querySelector('.food-slot.active .food-img');
    var hr = hero.getBoundingClientRect();
    var fr = fe ? fe.getBoundingClientRect() : hr;
    var cx = fr.left + fr.width / 2 - hr.left;
    var cy = fr.top + fr.height / 2 - hr.top;
    var R = Math.hypot(Math.max(cx, hr.width - cx), Math.max(cy, hr.height - cy)) + 40;

    disc.style.width = disc.style.height = (2 * R) + 'px';
    disc.style.left = (cx - R) + 'px';
    disc.style.top = (cy - R) + 'px';
    disc.style.background = th.bg;

    var D = 750;
    var anim = disc.animate(
      [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
      { duration: D, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' }
    );

    ['giant', 'slot', 'text'].forEach(function (k) {
      var o = L[k][old];
      o.classList.remove('active');
      o.classList.add('leaving');
      setTimeout(function () { o.classList.remove('leaving'); }, 700);
    });
    L.dot[old].classList.remove('active');

    setTimeout(function () {
      ['giant', 'slot', 'text', 'dot'].forEach(function (k) { L[k][index].classList.add('active'); });
    }, 300);

    hero.style.setProperty('--ink', th.ink);
    setPrice(index);
    document.getElementById('heroCurrent').textContent = String(index + 1).padStart(2, '0');
    currentHero = index;

    setTimeout(function () {
      setTheme(index);      // warna hero = warna lingkaran, jadi tidak ada lompatan
      anim.cancel();        // lingkaran kembali scale(0) (disembunyikan)
      heroBusy = false;
    }, D);
  };
})();
