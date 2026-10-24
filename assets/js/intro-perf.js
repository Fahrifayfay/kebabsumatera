/* =====================================================================
   intro-perf.js — HARUS dimuat tepat setelah ScrollTrigger.min.js
   Tujuan: intro tidak lag. Tampilan & animasi intro TIDAK diubah.

   Masalah: selama intro berjalan, ScrollTrigger.refresh() dipanggil
   belasan kali (wave-pro, script, menu, experience) dan tiap panggilan
   menghitung ulang layout seluruh halaman (100–300 ms di HP, bikin
   animasi intro patah-patah, terutama saat tirai mulai naik).

   Solusi: selama #loader masih ada, semua refresh digabung jadi SATU
   dan baru dijalankan setelah intro selesai (loader dibuang).
   ===================================================================== */
(function () {
  var ST = window.ScrollTrigger;
  if (!ST || typeof ST.refresh !== 'function') return;

  var orig = ST.refresh;
  var pending = false;
  var armed = false;
  var done = false;

  function introActive() {
    return !done && !!document.getElementById('loader');
  }

  var EVENTS = 'visibilitychange,DOMContentLoaded,load,resize';

  function flush() {
    if (done) return;
    done = true;
    // pulihkan refresh otomatis bawaan ScrollTrigger (load / resize)
    try { ST.config({ autoRefreshEvents: EVENTS }); } catch (e) {}
    if (!pending) return;
    pending = false;
    var run = function () { try { orig.call(ST); } catch (e) {} };
    // setelah tirai benar-benar hilang & browser punya waktu luang
    if (window.requestIdleCallback) requestIdleCallback(run, { timeout: 700 });
    else setTimeout(run, 120);
  }

  function arm() {
    if (armed) return;
    armed = true;
    var check = function () { if (!document.getElementById('loader')) { mo.disconnect(); flush(); } };
    var mo = new MutationObserver(check);
    mo.observe(document.documentElement, { childList: true, subtree: true });
    // jaring pengaman kalau loader tidak pernah dibuang
    setTimeout(function () { mo.disconnect(); flush(); }, 12000);
  }

  // ScrollTrigger juga refresh sendiri saat DOMContentLoaded/load (± 140 ms di HP).
  // Selama intro itu ditahan; dipulihkan + dijalankan sekali setelah intro selesai.
  if (document.getElementById('loader')) {
    try { ST.config({ autoRefreshEvents: 'visibilitychange' }); } catch (e) {}
    pending = true; arm();
  }

  ST.refresh = function () {
    if (introActive()) { pending = true; arm(); return; }
    return orig.apply(ST, arguments);
  };
})();
