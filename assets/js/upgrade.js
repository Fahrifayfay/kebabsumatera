/* ======================================================================
   UPGRADE — tautan platform, ulasan, salin alamat, navbar HP,
   scroll reveal, dan jeda animasi wave di luar layar.
   Semua tautan dikelola di LINKS (assets/js/catalog-data.js).
   ====================================================================== */
(function(){
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const ICON = (id, cls='ks-icon') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#${id}"/></svg>`;

  /* ---------- 1. Tautan platform dari LINKS ---------- */
  function bindLinks(root=document){
    const links = root.matches?.('[data-link]') ? [root, ...$$('[data-link]', root)] : $$('[data-link]', root);
    links.forEach(a=>{
      const url = (typeof LINKS !== 'undefined' && LINKS[a.dataset.link]) || '';
      if(url){
        a.href = url;
        a.removeAttribute('aria-disabled');
        a.classList.remove('is-disabled');
        if(/^https?:/.test(url)){ a.target='_blank'; a.rel='noopener'; }
      }else{
        // Tautan belum tersedia: tombol tetap tampil tapi tidak membawa ke halaman palsu.
        a.setAttribute('href','#');
        a.setAttribute('aria-disabled','true');
        a.classList.add('is-disabled');
        a.removeAttribute('target');
      }
    });
  }
  document.addEventListener('click', e=>{
    const a = e.target.closest('a.is-disabled');
    if(a){ e.preventDefault(); e.stopImmediatePropagation(); toast('Tautan ini segera tersedia'); }
  }, true);
  bindLinks();
  // promo burger dibuat oleh experience.js; dialog menu dibuat oleh menu.js
  new MutationObserver(records=>{
    const added=new Set();
    records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)added.add(node);}));
    added.forEach(node=>{if(node.isConnected&&!added.has(node.parentElement))bindLinks(node);});
  }).observe(document.body,{childList:true,subtree:true});

  /* ---------- 2. Toast ---------- */
  let toastEl, toastTimer;
  function toast(msg, ok=false){
    if(!toastEl){
      toastEl = document.createElement('div');
      toastEl.className = 'ks-toast'; toastEl.setAttribute('role','status'); toastEl.setAttribute('aria-live','polite');
      document.body.append(toastEl);
    }
    toastEl.innerHTML = (ok ? ICON('i-check','ks-icon toast-ico') : '') + '<span></span>';
    toastEl.lastChild.textContent = msg;
    toastEl.classList.toggle('is-ok', ok);
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toastEl.classList.remove('show'), 2400);
  }

  /* ---------- 3. Salin alamat ---------- */
  const copyBtn = $('#copyAddress');
  if(copyBtn){
    const label = $('span', copyBtn);
    copyBtn.addEventListener('click', async ()=>{
      const text = (typeof OUTLET_ADDRESS !== 'undefined' && OUTLET_ADDRESS) || 'Kebab Sumatera, Jl. Ps. 7, Hutan, Percut Sei Tuan, Deli Serdang, Sumatera Utara 20371';
      let done = false;
      try{
        if(navigator.clipboard && window.isSecureContext){ await navigator.clipboard.writeText(text); done = true; }
      }catch(_){}
      if(!done){
        const ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly',''); ta.style.cssText='position:fixed;opacity:0;top:0;left:0';
        document.body.append(ta); ta.select();
        try{ done = document.execCommand('copy'); }catch(_){}
        ta.remove();
      }
      if(done){
        toast('Alamat berhasil disalin', true);
        copyBtn.classList.add('is-done'); label.textContent = 'Tersalin!';
        setTimeout(()=>{ copyBtn.classList.remove('is-done'); label.textContent = 'Salin Alamat'; }, 2200);
      }else{
        toast('Gagal menyalin. Salin alamat secara manual ya.');
      }
    });
  }

  /* ---------- 4. Ulasan: kartu + carousel ---------- */
  const track = $('#reviewTrack');
  if(track && typeof REVIEWS !== 'undefined'){
    const sourceIcon = s => s==='GoFood'
      ? '<img src="image/icon/gofood-reference.png" alt="" width="18" height="18" loading="lazy">'
      : ICON('icon-tiktok');
    track.innerHTML = REVIEWS.map((r,i)=>{
      const stars = Array.from({length:5},(_,k)=>`<span class="${k<r.stars?'on':''}" style="--i:${k}">${ICON('i-star','rv-star')}</span>`).join('');
      const initial = (r.name.trim()[0]||'K').toUpperCase();
      const verified = /terverifikasi/i.test(r.item);
      return `<article class="review-card rv-card" style="--tone:${i%4}">
        <span class="rv-quote" aria-hidden="true">${ICON('i-quote')}</span>
        <div class="rv-card-stars" role="img" aria-label="Rating ${r.stars} dari 5">${stars}</div>
        <p class="rv-text">${r.quote.replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]))}</p>
        <div class="rv-foot"><span class="rv-avatar" aria-hidden="true">${initial}</span>
          <span class="rv-who"><b>${r.name.replace(/[<>&]/g,'')}</b><small>${r.item.replace(/[<>&]/g,'')}</small></span>
          <span class="rv-src ${r.source==='GoFood'?'is-go':'is-tt'}" title="Sumber: ${r.source}">${sourceIcon(r.source)}<i>${r.source}</i></span>
        </div>${verified?`<span class="rv-verified">${ICON('i-badge-check')}Terverifikasi</span>`:''}
      </article>`;
    }).join('');

    const cards = $$('.rv-card', track);
    const dots = $('#rvDots');
    if(dots) dots.innerHTML = cards.map((_,i)=>`<span data-i="${i}"></span>`).join('');
    const step = () => (cards[0] ? cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap||getComputedStyle(track).gap||16) : 320);
    const go = dir => track.scrollBy({left: dir*step(), behavior: reduceMotion?'auto':'smooth'});
    $('#revPrev')?.addEventListener('click', ()=>go(-1));
    $('#revNext')?.addEventListener('click', ()=>go(1));
    const syncDots = ()=>{
      const i = Math.round(track.scrollLeft / Math.max(step(),1));
      $$('#rvDots span').forEach((d,k)=>d.classList.toggle('on', k===Math.min(i,cards.length-1)));
      const max = track.scrollWidth - track.clientWidth - 2;
      $('#revPrev')?.toggleAttribute('disabled', track.scrollLeft<=2);
      $('#revNext')?.toggleAttribute('disabled', track.scrollLeft>=max);
    };
    track.addEventListener('scroll', ()=>requestAnimationFrame(syncDots), {passive:true});
    window.addEventListener('resize', syncDots); syncDots();
    // Drag untuk desktop
    let down=false,sx=0,sl=0,moved=false;
    track.addEventListener('pointerdown',e=>{ if(e.pointerType!=='mouse') return; down=true;moved=false;sx=e.clientX;sl=track.scrollLeft; track.classList.add('dragging'); });
    window.addEventListener('pointermove',e=>{ if(!down) return; const dx=e.clientX-sx; if(Math.abs(dx)>4) moved=true; track.scrollLeft=sl-dx; });
    window.addEventListener('pointerup',()=>{ down=false; track.classList.remove('dragging'); });
    // Bintang menyala bergantian saat kartu terlihat
    if('IntersectionObserver' in window){
      const io = new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('is-in'); io.unobserve(en.target);} }),{threshold:.35});
      cards.forEach(c=>io.observe(c));
      const sum = $('.rv-summary');
      if(sum) io.observe(sum);
    }else{ cards.forEach(c=>c.classList.add('is-in')); $('.rv-summary')?.classList.add('is-in'); }

    /* Dinding ulasan: 2 kolom bergerak vertikal berlawanan arah, fade di atas/bawah, jeda saat di-hover.
       Isi tiap kolom digandakan (salinan aria-hidden) agar putarannya mulus tanpa lompatan. */
    const wrap = track.parentElement;
    if(wrap && cards.length){
      const wall = document.createElement('div');
      wall.className = 'rv-wall';
      wall.setAttribute('role','region'); wall.setAttribute('aria-label','Ulasan pelanggan');
      [0,1].forEach(col=>{
        const mine = cards.filter((_,i)=>i%2===col);
        const colEl = document.createElement('div'); colEl.className = 'rv-col';
        const inner = document.createElement('div'); inner.className = 'rv-col-in';
        const fill = el => { const c = el.cloneNode(true); c.classList.add('is-in'); return c; };
        // ulangi sampai kolom cukup tinggi untuk satu putaran penuh
        const reps = Math.max(1, Math.ceil(4 / Math.max(mine.length,1)));
        for(let r=0;r<reps;r++) mine.forEach(c=>inner.append(fill(c)));
        const copy = [...inner.children].map(c=>{ const d = c.cloneNode(true); d.setAttribute('aria-hidden','true'); return d; });
        inner.append(...copy);
        colEl.append(inner); wall.append(colEl);
      });
      track.classList.add('is-walled');
      track.after(wall);
    }
  }

  /* ---------- 5. Navbar HP: section aktif + pill + progress ---------- */
  const mnav = $('#mNav');
  if(mnav){
    const links = $$('a[data-spy]', mnav);
    const pill = $('.m-nav-pill', mnav);
    const bar = $('#mNavProgress');
    const groups = { hero:'hero', promo:'promo', 'menu-favorit':'menu-favorit', tentang:'tentang', galeri:'more', bantuan:'more', 'cara-pesan':'more', review:'more', lokasi:'more', 'cta-final':'more' };
    const order = Object.keys(groups).map(id=>document.getElementById(id)).filter(Boolean);
    let current = '', currentSection = '';
    const mobileNav = matchMedia('(max-width:860px)');
    function place(){
      const el = links.find(l=>l.dataset.spy===current);
      if(!el||!pill) return;
      pill.style.width = (el.offsetWidth+8)+'px';
      pill.style.transform = `translate3d(${el.offsetLeft-4}px,0,0)`;
    }
    function setActive(id){
      if(id===current) return; current = id;
      links.forEach(l=>{ const on=l.dataset.spy===id; l.classList.toggle('is-active',on); on?l.setAttribute('aria-current','true'):l.removeAttribute('aria-current'); });
      place();
    }
    let ticking=false;
    function onScroll(){
      if(ticking || !mobileNav.matches) return; ticking=true;
      requestAnimationFrame(()=>{
        ticking=false;
        const line = innerHeight*.42;
        let hit = order[0];
        for(const sEl of order){ if(sEl.getBoundingClientRect().top <= line) hit = sEl; }
        // dekat dasar halaman → Kontak
        if(innerHeight+scrollY >= document.documentElement.scrollHeight-8) hit = document.getElementById('lokasi');
        if(!hit)return;
        setActive(groups[hit.id]);
        if(hit.id!==currentSection){currentSection=hit.id;window.dispatchEvent(new CustomEvent('mnav:section',{detail:hit.id}));}
        const max = document.documentElement.scrollHeight - innerHeight;
        if(bar) bar.style.transform = `scaleX(${max>0?Math.min(scrollY/max,1):0})`;
      });
    }
    addEventListener('scroll',onScroll,{passive:true});
    addEventListener('resize',()=>{ place(); onScroll(); });
    document.fonts?.ready.then(place);
    setActive('hero'); onScroll(); setTimeout(place,300);
    // sembunyikan saat loader masih tampil
    const reveal = ()=>mnav.classList.add('is-ready');
    if(document.body.classList.contains('ready')) reveal();
    else new MutationObserver((_,ob)=>{ if(document.body.classList.contains('ready')){ reveal(); ob.disconnect(); } }).observe(document.body,{attributes:true,attributeFilter:['class']});
    setTimeout(reveal,6500);
  }

  /* ---------- 6. Scroll reveal ---------- */
  const hasGS = !!(window.gsap && window.ScrollTrigger);
  const FROM = {
    'fade-up':{y:34}, 'slide-left':{x:-48}, 'slide-right':{x:48}, 'scale':{scale:.92,y:18}
  };
  function revealInit(){
    const singles = $$('[data-reveal]');
    const groups = $$('[data-reveal-group]');
    if(reduceMotion){ return; }
    if(hasGS){
      singles.forEach(el=>{
        const f = FROM[el.dataset.reveal] || FROM['fade-up'];
        gsap.set(el,{opacity:0,...f});
      });
      ScrollTrigger.batch(singles,{
        start:'top 88%', once:true,
        onEnter:b=>gsap.to(b,{opacity:1,x:0,y:0,scale:1,duration:.9,ease:'power3.out',stagger:.1,overwrite:true,clearProps:'transform,opacity'})
      });
      groups.forEach(g=>{
        const items = $$('[data-reveal-item], :scope > .info-row, :scope > .loc-actions', g);
        if(!items.length) return;
        gsap.set(items,{opacity:0,y:30,scale:.97});
        ScrollTrigger.create({trigger:g,start:'top 86%',once:true,onEnter:()=>gsap.to(items,{opacity:1,y:0,scale:1,duration:.8,ease:'power3.out',stagger:.09,clearProps:'transform,opacity'})});
      });
    }else if('IntersectionObserver' in window){
      const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('rv-shown'); io.unobserve(e.target);} }),{threshold:.15});
      [...singles,...groups.flatMap(g=>$$('[data-reveal-item]',g))].forEach(el=>{ el.classList.add('rv-pre'); io.observe(el); });
    }
  }
  // tunggu GSAP & script utama selesai membuat DOM
  (document.readyState==='complete') ? revealInit() : addEventListener('load',revealInit);

  /* ---------- 7. Jeda wave saat di luar layar ---------- */
  if('IntersectionObserver' in window){
    const wio = new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('is-paused',!e.isIntersecting)),{rootMargin:'80px'});
    $$('.section-wave').forEach(w=>wio.observe(w));
  }
})();
