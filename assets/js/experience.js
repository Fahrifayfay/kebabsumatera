/* Outlet coordinates are [longitude, latitude]. Set only after confirming the pin. */
const OUTLET_COORDINATES = [98.755764, 3.591945];

(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const promo = document.querySelector('#promo .promo-layout');
  const burger = document.createElement('div');
  burger.className = 'wrap promo-layout burger-promo';
  burger.hidden = true;
  burger.innerHTML = `<div class="promo-copy"><span class="promo-kicker">PAKET KEBAB + BURGER <span>02 / B1D2</span></span><h2>BAYAR 1.<br>DAPAT <em>2!</em></h2><p class="promo-subtitle">Kebab spesial ketemu burger telur.</p><p>Satu paket, dua favorit. Pas buat dinikmati bareng atau buat kamu yang pengin keduanya.</p><ul class="promo-contents"><li><span>1 Pcs Kebab Spesial</span><b>× 1</b></li><li><span>1 Pcs Burger Telur</span><b>× 1</b></li><li><span>Pedas</span><b>× 1</b></li></ul><p class="promo-fine">Level pedas: pilih 1. Pemilihan ulang diperbolehkan.</p><a class="kbtn promo-order" href="https://wa.me/6282360422229?text=Halo%20Kebab%20Sumatera%2C%20mau%20promo%20Bayar%201%20Dapat%202%3A%201%20Kebab%20Spesial%20%2B%201%20Burger%20Telur%2C%20pedas.%20Berapa%20harga%20dan%20apakah%20masih%20tersedia%3F" target="_blank" rel="noopener">Pesan paket ini ↗</a><p class="promo-fine">Harga dan ketersediaan dikonfirmasi saat memesan.</p></div><div class="promo-art"><div class="promo-poster"><img src="image/promo-bayar-1-dapat-2 burger.jpeg" alt="Promo Bayar 1 Dapat 2: Kebab Spesial dan Burger Telur Daging" width="1071" height="824" loading="lazy"></div><span class="promo-stamp" aria-hidden="true">SATU PAKET<br><b>DUA FAVORIT</b></span></div>`;
  promo.after(burger);
  if(window.gsap && window.ScrollTrigger && !reduced){
    burger.querySelectorAll('.promo-copy > *, .promo-art').forEach(el=>gsap.fromTo(el,{y:28,opacity:0},{y:0,opacity:1,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 94%',end:'bottom top',once:true}}));
  }
  document.querySelectorAll('[data-promo]').forEach(button => button.addEventListener('click', () => {
    const showBurger = button.dataset.promo === 'burger';
    if(button.getAttribute('aria-pressed') === 'true') return;
    promo.hidden = showBurger; burger.hidden = !showBurger;
    document.querySelectorAll('[data-promo]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    const active = showBurger ? burger : promo;
    if(!reduced) active.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'none'}], {duration:550,easing:'cubic-bezier(.2,.8,.2,1)'});
    if(window.ScrollTrigger) ScrollTrigger.refresh();
  }));

  // Keep all section destinations available without crowding the desktop pill.
  const more = document.createElement('li');
  more.className = 'nav-more';
  more.innerHTML = '<details><summary>Lainnya</summary><div><a href="#menu-favorit">Menu favorit</a><a href="#kenapa">Kenapa kami</a><a href="#cara-pesan">Cara pesan</a><a href="#cta-final">Pesan online</a></div></details>';
  document.querySelector('.nav-links').append(more);
  const mobile = document.querySelector('#mobileMenu .offcanvas-body');
  ['Ulasan|review','Menu favorit|menu-favorit','Kenapa kami|kenapa','Cara pesan|cara-pesan','Pesan online|cta-final'].forEach(item => {
    const [title,id] = item.split('|'); const link = document.createElement('a');
    link.href = '#'+id; link.textContent = title; link.dataset.bsDismiss = 'offcanvas'; mobile.append(link);
  });
  document.querySelectorAll('.nav-more a,#mobileMenu a').forEach(link => link.addEventListener('click', () => {
    more.querySelector('details').open = false;
  }));
  document.querySelectorAll('.nav-more a,#mobileMenu .offcanvas-body a').forEach(link => {
    if(!link.hash || !document.querySelector(link.hash)) return;
    // Existing mobile links already have the main script's anchor handler.
    if(!link.closest('.nav-more') && !['#review','#menu-favorit','#kenapa','#cara-pesan','#cta-final'].includes(link.hash)) return;
    link.addEventListener('click',event=>{
      event.preventDefault();
      const target=document.querySelector(link.hash);
      if(typeof lenis !== 'undefined' && lenis) lenis.scrollTo(target,{offset:-90,force:true});
      else target.scrollIntoView({behavior:reduced?'instant':'smooth'});
    });
  });
  document.addEventListener('click', event => {if(!more.contains(event.target)) more.querySelector('details').open = false;});
  document.addEventListener('keydown', event => {if(event.key === 'Escape') more.querySelector('details').open = false;});

  const oldCard = document.querySelector('.outlet-card');
  const shell = document.createElement('div'); shell.className = 'outlet-map-card';
  shell.innerHTML = `<div class="map-header"><div><small>TEMUKAN KAMI</small><h3>Mampir malam ini.</h3></div><span>18.00–23.00</span></div><div class="outlet-map" id="outletMap" role="region" aria-label="Peta lokasi outlet"></div><div class="map-toolbar"><button type="button" id="mapHome">⌖ Pusatkan</button><button type="button" id="mapDimension" aria-pressed="true">3D aktif</button></div><div class="map-caption"><strong>Hutan Percut Sei Tuan</strong><p id="mapStatus" role="status">Memuat peta…</p><a href="https://www.google.com/maps/search/?api=1&query=Kebab+Sumatera+Hutan+Percut+Sei+Tuan+Jl+Ps+7+Deli+Serdang" target="_blank" rel="noopener">Petunjuk arah ↗</a></div>`;
  oldCard.replaceWith(shell);
  document.querySelectorAll('a[href*="google.com/maps/search/"]').forEach(link=>link.href='https://www.google.com/maps/dir/?api=1&destination=3.591945,98.755764');
  const status = document.getElementById('mapStatus');
  function initializeMap(){
  if(!window.maplibregl){status.textContent = 'Peta belum tersedia. Buka petunjuk arah untuk melihat lokasi.';return;}
  // Regional overview until the owner supplies the exact outlet coordinates.
  const center = OUTLET_COORDINATES || [98.75,3.65];
  let map;
  try {
    map = new maplibregl.Map({container:'outletMap',style:'https://tiles.openfreemap.org/styles/liberty',center,zoom:OUTLET_COORDINATES?16:11,pitch:55,bearing:-18,cooperativeGestures:true,attributionControl:true});
    map.addControl(new maplibregl.NavigationControl({visualizePitch:true}),'top-right');
    map.addControl(new maplibregl.FullscreenControl());
    map.on('load', () => {
      // OpenFreeMap uses the OpenMapTiles building schema for actual footprints.
      const style = map.getStyle();
      if(style.sources.openmaptiles && !style.layers.some(layer => layer.type === 'fill-extrusion')){
        const labels = style.layers.find(layer => layer.type === 'symbol' && layer.layout?.['text-field']);
        map.addLayer({id:'outlet-buildings-3d',type:'fill-extrusion',source:'openmaptiles','source-layer':'building',minzoom:14,paint:{'fill-extrusion-color':'#d9cbb0','fill-extrusion-height':['coalesce',['get','render_height'],5],'fill-extrusion-base':['coalesce',['get','render_min_height'],0],'fill-extrusion-opacity':.85}},labels?.id);
      }
      status.textContent = OUTLET_COORDINATES ? 'Jl. Ps. 7 · Klik pin untuk detail outlet.' : 'Peta area Percut Sei Tuan. Titik outlet belum dikonfirmasi.';
      if(OUTLET_COORDINATES){
        const pin = document.createElement('button');pin.type='button';pin.className='outlet-pin';pin.setAttribute('aria-label','Kebab Sumatera — detail outlet');pin.textContent='KS';
        new maplibregl.Marker({element:pin}).setLngLat(center).setPopup(new maplibregl.Popup({offset:30}).setHTML('<strong>Kebab Sumatera</strong><p>Jl. Ps. 7, Hutan Percut Sei Tuan<br>Setiap hari · 18.00–23.00 WIB</p>')).addTo(map);
      }
    });
    map.on('error', () => {status.textContent='Sebagian peta belum termuat. Petunjuk arah tetap tersedia.';});
    document.getElementById('mapHome').addEventListener('click',()=>map.flyTo({center,zoom:OUTLET_COORDINATES?16:11,bearing:-18,duration:reduced?0:1100}));
    document.getElementById('mapDimension').addEventListener('click',event=>{
      const button=event.currentTarget, enabled=button.getAttribute('aria-pressed')!=='true';
      button.setAttribute('aria-pressed',String(enabled));button.textContent=enabled?'3D aktif':'2D aktif';map.easeTo({pitch:enabled?55:0,bearing:enabled?-18:0,duration:reduced?0:750});
    });
    let resizeFrame=0;
    new ResizeObserver(()=>{
      cancelAnimationFrame(resizeFrame);
      resizeFrame=requestAnimationFrame(()=>map.resize());
    }).observe(shell);
  } catch(error){status.textContent='Peta tidak dapat dibuka di perangkat ini. Gunakan petunjuk arah.';}
  }
  if('IntersectionObserver' in window){
    const mapObserver=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){mapObserver.disconnect();initializeMap();}
    },{rootMargin:'350px'});
    mapObserver.observe(shell);
  }else initializeMap();
})();

// Preserve every looping effect, but only run it while its section is visible.
(() => {
  if(!('IntersectionObserver' in window)) return;
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    entry.target.classList.toggle('motion-offscreen',!entry.isIntersecting);
  }),{rootMargin:'100px'});
  document.querySelectorAll('.hero,.cta-section,.flavor-ribbon').forEach(section=>observer.observe(section));
  document.addEventListener('visibilitychange',()=>document.body.classList.toggle('motion-background',document.hidden));
})();
