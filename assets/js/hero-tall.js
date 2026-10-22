/* Hero HP: pas-kan lebar kata raksasa ke layar, lalu regangkan ke bawah
   dengan tinggi akhir yang sama untuk KEBAB, BURGER, dst. */
(function () {
  var mq = window.matchMedia('(max-width: 760px)');
  var WIDTH_RATIO = 0.88;   // lebar kata = 88% lebar layar
  var HEIGHT_RATIO = 0.66;  // tinggi huruf setelah diregangkan = 66% lebar layar
  var CAP = 0.74;           // tinggi huruf kapital Anton ≈ 0.74 × font-size

  function fit() {
    var giants = document.querySelectorAll('.giant');
    for (var i = 0; i < giants.length; i++) {
      var g = giants[i];
      g.style.removeProperty('--fit-size');
      g.style.removeProperty('--giant-stretch');
      if (!mq.matches) continue;
      var fs = parseFloat(getComputedStyle(g).fontSize);
      var w = 0;
      for (var j = 0; j < g.children.length; j++) w += g.children[j].offsetWidth;
      w += fs * 0.12;                         // padding kiri+kanan (.06em × 2)
      if (!w || !fs) continue;
      var size = fs * (window.innerWidth * WIDTH_RATIO) / w;
      var stretch = (window.innerWidth * HEIGHT_RATIO) / (CAP * size);
      g.style.setProperty('--fit-size', size.toFixed(2) + 'px');
      g.style.setProperty('--giant-stretch', Math.min(Math.max(stretch, 1.6), 3.2).toFixed(3));
    }
  }

  var t;
  function later() { clearTimeout(t); t = setTimeout(fit, 120); }

  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  window.addEventListener('load', fit);
  window.addEventListener('resize', later);
  window.addEventListener('orientationchange', later);
})();
