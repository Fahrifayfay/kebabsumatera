/* ===== EXTRACTED INLINE SCRIPT 1 ===== */


/* ===== EXTRACTED INLINE SCRIPT 2 ===== */
document.getElementById('loaderLogo').src=LOGO;

/* ===== EXTRACTED INLINE SCRIPT 3 ===== */

/* ======================================================================
   IMAGE ASSETS (file terpisah di folder image/)
   ====================================================================== */


/* ======================================================================
   DATA — kategori hero + menu (sinkron dengan struktur yang diberikan)
   ====================================================================== */
const CATEGORIES = [
  {
    key:"kebab", name:"Kebab", num:"01",
    title:"Kebab Sumatera",
    desc:"Isian daging melimpah, sayur segar, saus pas, dibungkus kulit kebab panggang.",
    priceFrom:10000,
    img:IMG.kebab,
    glow:0,
    ingredients:[
      {src:ING.tortilla1, top:'16%', left:'16%', w:96, rot:-8, depth:1.4, delay:0},
      {src:ING.lettuce1, top:'20%', right:'13%', w:88, rot:6, depth:1.1, delay:.4},
      {src:ING.tomato1, top:'51%', left:'13%', w:82, rot:-4, depth:1.6, delay:.8},
      {src:ING.onionred, bottom:'18%', right:'15%', w:90, rot:10, depth:1.2, delay:1.2},
      {src:ING.meatchunk, top:'15%', right:'25%', w:88, rot:-10, depth:1.3, delay:.2},
    ],
  },
  {
    key:"burger", name:"Burger", num:"02",
    title:"Burger Sapi Keju",
    desc:"Patty juicy dilumuri keju leleh, segar dengan tomat, selada, dan saus andalan.",
    priceFrom:8000,
    img:IMG.burger,
    glow:1,
    ingredients:[
      /* Burger — komponen dibuat lebih rapat ke burger utama + lebih ramai */
      {src:ING.cheese1, top:'13%', right:'18%', w:104, rot:-6, depth:1.3, delay:.1},
      {src:ING.lettuce2, bottom:'16%', left:'16%', w:92, rot:8, depth:1.5, delay:.5},
      {src:ING.tomato2, top:'17%', left:'16%', w:88, rot:-8, depth:1.2, delay:.9},
      {src:ING.onionwhite, bottom:'18%', right:'22%', w:84, rot:10, depth:1.4, delay:1.3},
      {src:ING.ketchup, top:'50%', right:'13%', w:92, rot:-4, depth:1.1, delay:.3},
      {src:ING.meatchunk, bottom:'17%', right:'9%', w:88, rot:12, depth:1.5, delay:.7},

      /* tambahan komponen agar area Burger lebih hidup */
      {src:ING.cheese2, top:'23%', right:'3%', w:72, rot:18, depth:1.4, delay:.2},
      {src:ING.meatchunk, bottom:'17%', left:'4%', w:72, rot:-12, depth:1.7, delay:1},
      {src:ING.tomato1, top:'35%', left:'6%', w:70, rot:10, depth:1.6, delay:.6},
      {src:ING.onionred, bottom:'27%', right:'5%', w:66, rot:-16, depth:1.3, delay:1.4},
    ],
  },
  {
    key:"lumpia", name:"Lumpia", num:"03",
    title:"Lumpia Sapi",
    desc:"Kulit renyah digulung rapi, isi daging dan sayur dipotong segar tiap hari.",
    priceFrom:13000,
    img:IMG.lumpia,
    glow:2,
    ingredients:[
      {src:ING.lettuce1, top:'16%', left:'15%', w:88, rot:6, depth:1.3, delay:0},
      {src:ING.tomatowedge, top:'54%', right:'16%', w:68, rot:-10, depth:1.5, delay:.4},
      {src:ING.crumble, bottom:'18%', left:'13%', w:68, rot:8, depth:1.2, delay:.8},
      {src:ING.mayo, top:'15%', right:'16%', w:86, rot:-6, depth:1.4, delay:1.1},
      {src:ING.tomato1, bottom:'16%', right:'26%', w:76, rot:10, depth:1.1, delay:.2},
      {src:ING.wortel, top:'41%', right:'13%', w:92, rot:12, depth:1.6, delay:.6},
    ],
  },
  {
    key:"roti", name:"Roti Bakar Bandung", num:"04",
    title:"Roti Bakar Bandung",
    desc:"Roti panggang keju melimpah dengan lelehan cokelat manis di setiap gigitan.",
    priceFrom:20000,
    img:IMG.roti,
    glow:3,
    ingredients:[
      // Cheese garnish removed from the upper-left of the toast hero.
      {src:ING.cheese1, bottom:'17%', right:'6%', w:96, rot:8, depth:1.5, delay:.5},
      {src:ING.crumble, top:'58%', left:'4%', w:62, rot:10, depth:1.2, delay:1},
    ],
  },
];

const HELP = [
  {q:"Bagaimana cara melihat daftar menu?", a:"Tekan <b>Menu</b> di bagian atas, atau tombol <b>Lihat Semua Menu</b> di bawah Menu Favorit. Di halaman menu kamu bisa mencari nama menu, memilih kategori (kebab, burger, lumpia, roti bakar), dan mengurutkan dari harga terendah atau tertinggi. Klik kartu menu untuk melihat isiannya."},
  {q:"Bagaimana cara memesan?", a:"Tekan tombol <b>Pesan</b>, lalu pilih outlet: GoFood, GrabFood, atau TikTok. Kamu akan langsung diarahkan ke menu Kebab Sumatera di aplikasi pilihanmu. Pesanan hanya lewat tiga outlet ini."},
  {q:"Bagaimana cara memakai promo?", a:"Buka bagian <b>Promo</b>, pilih paketnya (Kebab atau Burger), lalu tekan <b>Pesan Promo di TikTok</b>. Harga dan ketersediaan promo mengikuti halaman TikTok outlet."},
  {q:"Bagaimana melihat foto dan video promo?", a:"Di bagian <b>Galeri</b>, geser, tarik, atau tekan panah untuk pindah foto. Klik kartunya untuk memperbesar. Pakai tombol filter untuk memisahkan foto gerobak, kebab, dan burger. Di bawahnya ada video promo: ketuk layar untuk putar atau jeda, ketuk ikon speaker untuk menyalakan suara."},
  {q:"Di mana lokasi dan jam bukanya?", a:"Gerobak ada di Jl. Ps. 7, Hutan, Percut Sei Tuan, Deli Serdang, buka setiap hari pukul 18.00–00.00 WIB. Di bagian <b>Lokasi</b>, tekan <b>Salin Alamat</b> atau <b>Buka Rute</b> untuk langsung diarahkan lewat Google Maps."},
  {q:"Bisa pesan lewat WhatsApp?", a:"Tidak. Pesanan hanya lewat <b>GoFood</b>, <b>GrabFood</b>, atau <b>TikTok</b>. WhatsApp khusus untuk bertanya dan menghubungi admin soal menu, promo, jam buka, atau kendala pesanan. Tekan tombol hijau <b>Tanya Admin</b> (HP: di bawah tombol Pesan, desktop: kanan bawah). Pesan pembuka sudah terisi, tinggal kirim."},
  {q:"Bagaimana cara memberi rating?", a:"Di bagian <b>Ulasan</b>, ketuk bintang pada kotak <b>Kasih rating kamu</b>. Nilaimu langsung masuk ke rata-rata di halaman ini."}
];

const STEPS = [
  {title:"Pilih Menu", desc:"Pilih Kebab, Burger, Lumpia, atau Roti Bakar Bandung."},
  {title:"Lihat Detail", desc:"Buka detail menu untuk melihat isian, gambar, dan harga."},
  {title:"Pesan Online", desc:"Lanjut ke GoFood atau GrabFood untuk memesan."},
  {title:"Ambil / Diantar", desc:"Mampir ke outlet, atau tunggu pesanan diantar."},
];

const REVIEWS = [
  {stars:5, quote:"harga hemat tapi makanannya tetap dapat enak ya guys...pelayanannya juga ramah...", name:"nur_jelajahpromo", item:"25 Agu 2026", source:"TikTok"},
  {stars:5, quote:"Enak banget pokoknya mah ma disini mau itu burger atau kebab nya semua enak banget asli deh apalagi kalo makannya pas ma panas panasnya nagih si ...", name:"nenghani011", item:"10 Sep 2026", source:"TikTok"},
  {stars:5, quote:"burger nya enak manteeppp, ngantri nya rame bgttt, cpt dtg pun udah rame bgttt...", name:"annisa ritonga", item:"4 Sep 2026 · Pembelian terverifikasi", source:"TikTok"},
  {stars:5, quote:"enak kali min.... sesuai request aku yg di buat.. langganan ya min👍👍", name:"eka", item:"Dibeli pada 05 Agu 2022", source:"GoFood"},
];



/* ======================================================================
   RENDER: HERO (giant text + warna berganti per menu)
   ====================================================================== */

const THEME = [
  {word:'KEBAB',  bg:'#f5622a', ink:'#d6481a', fg:'#ffffff'},
  {word:'BURGER', bg:'#ffc63d', ink:'#e6a118', fg:'#ffffff'},
  {word:'LUMPIA', bg:'#6fa02a', ink:'#54801a', fg:'#ffffff'},
  {word:'ROTI BAKAR', bg:'#b4622f', ink:'#8e4720', fg:'#ffffff'},
];
CATEGORIES[3].ingredients = [
  {src:SPR.chocA,   top:'10%', right:'8%',  w:96,  rot:12,  depth:1.2, delay:.4},
  {src:SPR.chocB,   top:'15%', left:'12%',  w:102, rot:-14, depth:1.4, delay:.7},
  {src:SPR.cheeseB, bottom:'20%', left:'12%', w:120, rot:24, depth:1.6, delay:.8},
  {src:SPR.chocB,   bottom:'16%', right:'10%', w:110, rot:-10, depth:1.3, delay:1.2},
  {src:SPR.cheeseC, top:'42%', right:'3%',  w:104, rot:8,   depth:1.1, delay:.2},
  {src:SPR.chocC,   top:'40%', left:'3%',   w:92,  rot:-14, depth:1.4, delay:.6},
  {src:SPR.crumbY,  top:'20%', left:'26%',  w:44,  rot:0,   depth:1.8, delay:.9},
  {src:SPR.crumbC,  bottom:'24%', right:'26%', w:40, rot:0, depth:1.8, delay:.3},
];

CATEGORIES.forEach((category,index)=>{
 const sources=index===3?[SPR.chocA,SPR.cheeseB,SPR.crumbY]:[ING.lettuce2,ING.tomato2,ING.cheese2];
 sources.forEach((src,j)=>category.ingredients.push({src,bottom:(3+j%2*3)+'%',left:(31+j*17)+'%',w:56+j*8,rot:-18+j*18,depth:1.15,delay:j*.3}));
});

const hero = document.getElementById('hero');
const heroGiant = document.getElementById('heroGiant'), heroStage = document.getElementById('heroStage');
const heroTexts = document.getElementById('heroTexts'), heroDots = document.getElementById('heroDots');
const heroPrice = document.getElementById('heroPrice');
const N = 2; /* hero: kebab & burger */
const L = {giant:[], slot:[], text:[], dot:[]};

CATEGORIES.slice(0,N).forEach((cat, i)=>{
  const th = THEME[i], on = i===0 ? ' active' : '';
  const g = document.createElement('div');
  g.className = 'giant' + on; g.style.setProperty('--len', th.word.length);
  g.innerHTML = [...th.word].map((c,j)=>`<span class="ch" style="--i:${j}">${c===' '?'&nbsp;':c}</span>`).join('');
  heroGiant.appendChild(g); L.giant.push(g);

  const t = document.createElement('div');
  t.className = 'hero-text' + on;
  t.innerHTML = `<p class="ht">${cat.title}</p><p class="desc">${cat.desc}</p>
    <div class="hero-cta"><a href="menu.html" class="kbtn kbtn-primary">Lihat Menu</a><a href="${LINKS.gofood}" data-link="gofood" target="_blank" rel="noopener" class="kbtn kbtn-ghost"><span class="btn-ico"><img src="image/icon/gofood-reference.png" alt="" width="22" height="22"></span>Pesan di GoFood</a></div>`;
  heroTexts.appendChild(t); L.text.push(t);

  const slot = document.createElement('div');
  slot.className = 'food-slot' + on;
  const imgEl = document.createElement('img');
  imgEl.className = 'food-img'; imgEl.src = cat.img; imgEl.alt = cat.title; imgEl.draggable = false;
  slot.appendChild(imgEl);
  cat.ingredients.forEach((ing, k)=>{
    const wrap = document.createElement('div');
    wrap.className = 'ing-wrap';
    Object.assign(wrap.style, {top:ing.top||'auto', left:ing.left||'auto', right:ing.right||'auto', bottom:ing.bottom||'auto', width:Math.round(ing.w*1.15)+'px'});
    wrap.dataset.depth = ing.depth; wrap.style.setProperty('--n', k);
    const im = document.createElement('img');
    im.className = 'ing'; im.loading = 'lazy'; im.decoding = 'async'; im.src = ing.src; im.alt = ''; im.draggable = false;
    im.style.setProperty('--r', ing.rot+'deg'); im.style.animationDelay = ing.delay+'s';
    wrap.appendChild(im); slot.appendChild(wrap);
  });
  heroStage.appendChild(slot); L.slot.push(slot);

  const dot = document.createElement('button');
  dot.className = 'hero-dot' + on; dot.setAttribute('aria-label', cat.name);
  dot.addEventListener('click', ()=>{ goTo(i); resetAutoplay(); });
  heroDots.appendChild(dot); L.dot.push(dot);
});

let currentHero = 0, heroBusy = false;
function setTheme(i){ const t = THEME[i]; hero.style.setProperty('--hb', t.bg); hero.style.setProperty('--ink', t.ink); hero.style.setProperty('--fg', t.fg); }
function setPrice(i){ const p = CATEGORIES[i].priceFrom; heroPrice.textContent = p ? formatRupiah(p) : 'Cek menu'; }
setTheme(0); setPrice(0);
function goTo(index){
  index = (index + N) % N;
  if(index === currentHero || heroBusy || !document.body.classList.contains('ready') || document.body.classList.contains('intro-play')) return;
  heroBusy = true;
  const old = currentHero;
  ['giant','slot','text'].forEach(k=>{ const o = L[k][old]; o.classList.remove('active'); o.classList.add('leaving'); setTimeout(()=>o.classList.remove('leaving'), 700); });
  L.dot[old].classList.remove('active');
  setTimeout(()=>{ ['giant','slot','text','dot'].forEach(k=>L[k][index].classList.add('active')); }, 60);
  setTheme(index); setPrice(index);
  document.getElementById('heroCurrent').textContent = String(index+1).padStart(2,'0');
  currentHero = index;
  setTimeout(()=>heroBusy=false, 750);
}
const next = ()=>goTo(currentHero+1), prev = ()=>goTo(currentHero-1);
document.getElementById('heroNext').addEventListener('click', ()=>{ next(); resetAutoplay(); });
document.getElementById('heroPrev').addEventListener('click', ()=>{ prev(); resetAutoplay(); });

/* wheel / trackpad horizontal scroll + touch swipe */
let heroWheelLock = false;
let heroWheelAccum = 0;

hero.addEventListener('wheel', e=>{
  if(reduceMotion || !document.body.classList.contains('ready')) return;

  /* Trackpad horizontal scroll atau Shift + mouse wheel. */
  const horizontalDelta =
    Math.abs(e.deltaX) > Math.abs(e.deltaY)
      ? e.deltaX
      : (e.shiftKey ? e.deltaY : 0);

  if(!horizontalDelta) return;

  e.preventDefault();
  heroWheelAccum += horizontalDelta;

  /* Hindari satu gesture memindahkan banyak slide. */
  if(heroWheelLock) return;
  if(Math.abs(heroWheelAccum) < 28) return;

  const direction = heroWheelAccum > 0 ? 1 : -1;
  heroWheelAccum = 0;
  heroWheelLock = true;

  direction > 0 ? next() : prev();
  resetAutoplay();

  setTimeout(()=>{ heroWheelLock = false; }, 520);
}, {passive:false});

/* swipe (mobile) + parallax mouse (desktop) */
let sx = null;
let dragStartX = null;
let draggingHero = false;

hero.addEventListener('touchstart', e=>{ sx = e.touches[0].clientX; }, {passive:true});
hero.addEventListener('touchend', e=>{
  if(sx===null) return;
  const dx = e.changedTouches[0].clientX - sx;
  sx = null;
  if(Math.abs(dx) > 55){
    dx < 0 ? next() : prev();
    resetAutoplay();
  }
});

/* Desktop: klik-tahan lalu tarik kiri/kanan untuk mengganti slide. */
hero.addEventListener('mousedown', e=>{
  if(e.button !== 0 || reduceMotion) return;
  dragStartX = e.clientX;
  draggingHero = true;
  hero.classList.add('is-dragging');
});

window.addEventListener('mouseup', e=>{
  if(!draggingHero || dragStartX === null) return;
  const dx = e.clientX - dragStartX;
  dragStartX = null;
  draggingHero = false;
  hero.classList.remove('is-dragging');

  if(Math.abs(dx) > 70){
    dx < 0 ? next() : prev();
    resetAutoplay();
  }
});
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
hero.addEventListener('mousemove', e=>{
  if(reduceMotion || !document.body.classList.contains('ready') || document.body.classList.contains('intro-play')) return;
  const r = hero.getBoundingClientRect(), px = ((e.clientX-r.left)/r.width-.5)*2, py = ((e.clientY-r.top)/r.height-.5)*2;

  /* Makanan utama ikut bergerak halus mengikuti mouse, tetap terpusat. */
  const activeFood = document.querySelector('.food-slot.active .food-img');
  if(activeFood){
    activeFood.style.setProperty('--food-mx', `${px*10}px`);
    activeFood.style.setProperty('--food-my', `${py*7}px`);
  }

  /* Komponen mengikuti mouse dengan efek parallax yang lebih kuat. */
  document.querySelectorAll('.food-slot.active .ing-wrap').forEach(w=>{
    const d = parseFloat(w.dataset.depth)||1;
    w.style.transform = `translate(${px*-16*d}px, ${py*-16*d}px)`;
  });
});

hero.addEventListener('mouseleave', ()=>{
  document.querySelectorAll('.food-slot .food-img').forEach(img=>{
    img.style.setProperty('--food-mx', '0px');
    img.style.setProperty('--food-my', '0px');
  });
});
document.addEventListener('keydown', e=>{
  if(window.scrollY >= innerHeight*.6 || e.target.closest('input,textarea,select,button,a,[role="region"],[contenteditable="true"]')) return;
  if(e.key==='ArrowRight'){ next(); resetAutoplay(); }
  if(e.key==='ArrowLeft'){ prev(); resetAutoplay(); }
});

/* autoplay */
let autoplayTimer = null;
function resetAutoplay(){ clearInterval(autoplayTimer); if(!reduceMotion) autoplayTimer = setInterval(()=>{ if(!document.hidden && document.body.classList.contains('ready') && window.scrollY < innerHeight*.6) next(); }, 6000); }
resetAutoplay();


/* ======================================================================
   RENDER: MENU FAVORIT
   ====================================================================== */
/* Product cards, filters and detail dialog are rendered by menu.js. */

/* Galeri, lightbox & video promo: lihat assets/js/gallery-pro.js */

/* ======================================================================
   RENDER: KENAPA PILIH KAMI
   ====================================================================== */
const helpList = document.getElementById('helpList');
if(helpList){
  helpList.innerHTML = HELP.map((h,i)=>`<div class="help-item${i===0?' open':''}" style="--i:${i}">
    <h3><button type="button" class="help-q" id="helpQ${i}" aria-expanded="${i===0}" aria-controls="helpA${i}"><span class="help-n">${String(i+1).padStart(2,'0')}</span><span class="help-t">${h.q}</span><span class="help-ic" aria-hidden="true"></span></button></h3>
    <div class="help-a" id="helpA${i}" role="region" aria-labelledby="helpQ${i}"><div><p>${h.a}</p></div></div>
  </div>`).join('');
  helpList.addEventListener('click',e=>{
    const btn = e.target.closest('.help-q'); if(!btn) return;
    const item = btn.closest('.help-item'), willOpen = !item.classList.contains('open');
    helpList.querySelectorAll('.help-item.open').forEach(o=>{o.classList.remove('open');o.querySelector('.help-q').setAttribute('aria-expanded','false')});
    if(willOpen){ item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    if(window.ScrollTrigger) setTimeout(()=>ScrollTrigger.refresh(),460);
  });
}

/* ======================================================================
   RENDER: CARA PESAN
   ====================================================================== */
const stepsRow = document.getElementById('stepsRow');
STEPS.forEach((s,i)=>{
  const el = document.createElement('div');
  el.className = 'step-item';
  el.innerHTML = `<div class="step-num">${String(i+1).padStart(2,'0')}</div><h3>${s.title}</h3><p>${s.desc}</p>`;
  stepsRow.appendChild(el);
});

/* ======================================================================
   RENDER: REVIEW
   ====================================================================== */
/* Kartu ulasan dirender oleh upgrade.js (data: REVIEWS). */

/* ======================================================================
   NAVBAR + MOBILE MENU
   ====================================================================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', ()=>{
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


/* ===== EXTRACTED INLINE SCRIPT 4 ===== */

/* ======================================================================
   MOTION: Lenis (smooth scroll) + GSAP ScrollTrigger + loader
   ====================================================================== */
document.querySelectorAll('[data-logo]').forEach(i=>i.src = LOGO);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP = !!(window.gsap && window.ScrollTrigger);
let lenis = null;
// Touch already scrolls natively; avoid a second continuously ticking scroller on HP.
if(window.Lenis && !reduce && matchMedia('(hover:hover) and (pointer:fine)').matches){
  lenis = new Lenis({duration:1.25, easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)), smoothWheel:true, wheelMultiplier:.95, touchMultiplier:1.6});
  lenis.stop();
  if(hasGSAP){ lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
  else { const raf = t=>{ lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
  // Only the modal owns vertical scrolling. Reviews scroll horizontally and
  // the receipt is in normal flow, so both must keep using the page scroller.
  document.getElementById('lightbox').setAttribute('data-lenis-prevent','');
  new MutationObserver(()=>{ document.getElementById('lightbox').classList.contains('open') ? lenis.stop() : lenis.start(); }).observe(document.getElementById('lightbox'), {attributes:true, attributeFilter:['class']});
}
const off = document.getElementById('mobileMenu');
off.addEventListener('show.bs.offcanvas', ()=>lenis && lenis.stop());
off.addEventListener('hidden.bs.offcanvas', ()=>lenis && lenis.start());
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click', e=>{
  const id = a.getAttribute('href'); if(id.length < 2) return;
  const el = document.querySelector(id); if(!el) return;
  e.preventDefault();
  lenis ? lenis.scrollTo(el, {offset:-70, force:true}) : el.scrollIntoView({behavior:'smooth'});
}));

/* ---------- LOADER INTRO: logo pop, teks "KEBAB SUMATERA" dinamis, komponen makanan dilempar & melayang ---------- */
(function(){
  const line1El = document.getElementById('ltLine1');
  const line2El = document.getElementById('ltLine2');
  const fx = document.getElementById('loaderFx');
  const logoWrap = document.querySelector('.loader-logo-wrap');
  if(!line1El || !line2El || !fx) return;

  // Huruf dibuat satu-satu. .lt-letter = animasi masuk, .lt-float (di dalamnya) = animasi mengambang,
  // dipisah supaya dua animasi tidak saling menimpa dan mengambang bisa mulai sejak huruf muncul.
  const letters = [], floats = [];
  const buildWord = (word, host)=>{
    word.split('').forEach(ch=>{
      const s = document.createElement('span'); s.className = 'lt-letter';
      const f = document.createElement('span'); f.className = 'lt-float'; f.textContent = ch;
      s.appendChild(f); host.appendChild(s);
      letters.push(s); floats.push(f);
    });
  };
  buildWord('KEBAB', line1El);
  buildWord('SUMATERA', line2El);

  // Posisi = TITIK TENGAH tiap komponen (x,y dalam % layar). Layout dibedakan desktop vs HP (portrait)
  // agar komponen mengelilingi logo+judul tanpa menabrak teks & tidak terpotong tepi layar.
  const portrait = window.innerWidth < 700 || window.innerHeight > window.innerWidth * 1.1;
  const FOODS = portrait ? [
    { src: IMG.kebab,       size:122, x:22, y:12 },
    { src: IMG.burger,      size:108, x:79, y:13 },
    { src: ING.cheese1,     size:64,  x:50, y:6  },
    { src: ING.lettuce2,    size:78,  x:9,  y:32 },
    { src: ING.onionred,    size:56,  x:92, y:34 },
    { src: ING.mayo,        size:52,  x:91, y:57 },
    { src: ING.tortilla2,   size:88,  x:16, y:80 },
    { src: ING.tomatowedge, size:70,  x:84, y:80 },
    { src: ING.meatchunk,   size:64,  x:36, y:87 },
    { src: ING.tortilla1,   size:80,  x:68, y:88 },
  ] : [
    { src: IMG.kebab,       size:172, x:12, y:27 },
    { src: IMG.burger,      size:152, x:88, y:26 },
    { src: ING.cheese1,     size:88,  x:26, y:9  },
    { src: ING.mayo,        size:70,  x:74, y:9  },
    { src: ING.lettuce2,    size:104, x:6,  y:52 },
    { src: ING.onionred,    size:78,  x:94, y:50 },
    { src: ING.tortilla2,   size:120, x:16, y:73 },
    { src: ING.tortilla1,   size:112, x:84, y:73 },
    { src: ING.meatchunk,   size:94,  x:29, y:88 },
    { src: ING.tomatowedge, size:86,  x:71, y:88 },
  ];
  const fxScale = portrait ? 1 : (window.innerWidth < 1100 ? .8 : 1);

  // anchor (titik tengah, tanpa transform) > wrap (mengambang) > img (animasi masuk)
  const foodEls = [], wrapEls = [];
  FOODS.forEach(f=>{
    const anchor = document.createElement('div');
    anchor.className = 'loader-food-anchor';
    anchor.style.left = f.x + '%'; anchor.style.top = f.y + '%';
    const wrap = document.createElement('div');
    wrap.className = 'loader-food-wrap';
    wrap.style.width = Math.round(f.size * fxScale) + 'px';
    const img = document.createElement('img');
    img.src = f.src; img.alt = ''; img.className = 'loader-food';
    wrap.appendChild(img); anchor.appendChild(wrap); fx.appendChild(anchor);
    foodEls.push(img); wrapEls.push(wrap);
  });

  // Tanpa animasi (reduced motion / GSAP tidak tersedia): tampilkan langsung dalam posisi akhir
  if(reduce || !hasGSAP){
    letters.forEach(l=>{ l.style.opacity = 1; });
    foodEls.forEach(el=>{ el.style.opacity = .95; });
    if(logoWrap) logoWrap.style.opacity = 1;
    return;
  }

  gsap.set(logoWrap, {opacity:0, scale:.94, rotate:0});
  gsap.set(letters, {opacity:0});
  gsap.set(foodEls, {opacity:0});
  gsap.set('.loader-text', {opacity:0, y:10});

  const tl = gsap.timeline({delay:.1});

  // 1) Logo muncul dengan pop bouncy
  tl.to(logoWrap, {opacity:1, scale:1, rotate:0, duration:1.5, ease:'power3.out'}, 0);

  // 2) Huruf terbang dari posisi acak lalu menetap membentuk kata
  tl.fromTo(letters, {
      opacity:0,
      x:()=>gsap.utils.random(-150,150),
      y:()=>gsap.utils.random(-120,140),
      rotate:()=>gsap.utils.random(-55,55),
      scale:.4
    },{
      opacity:1, x:0, y:0, rotate:0, scale:1,
      duration:.8, ease:'back.out(1.8)',
      stagger:{each:.035, from:'random'}
    }, .28);

  // 3) Komponen makanan dilempar dari bawah layar (animasi masuk pada <img>)
  foodEls.forEach((el,i)=>{
    const cfg = FOODS[i];
    tl.fromTo(el, {
        opacity:0, y:(112-cfg.y)+'vh', x:0, rotate:gsap.utils.random(-70,70), scale:.5
      },{
        opacity:1, y:0, x:gsap.utils.random(-10,10), rotate:gsap.utils.random(-8,8), scale:1,
        duration:.85, ease:'back.out(1.5)'
      }, .55 + i*.06);
  });

  // 4) Tagline
  tl.to('.loader-text', {opacity:1, y:0, duration:.8, ease:'power2.out'}, 2.4);
  tl.timeScale(1.25);

  /* ======== MENGAMBANG — jalan SEJAK AWAL (tidak menunggu animasi masuk selesai) ========
     Berjalan di elemen terpisah (wrap / lt-float / lt-line) sehingga tidak bentrok dengan animasi masuk.
     Fase awal diacak (.progress) → tiap komponen tidak bergerak serempak, terasa organik. */
  const swing = (target, from, to, dur, phase)=>
    gsap.fromTo(target, from, Object.assign({duration:dur, ease:'sine.inOut', yoyo:true, repeat:-1}, to)).progress(phase);

  wrapEls.forEach((w,i)=>{
    const dir = i%2 ? -1 : 1, r = gsap.utils.random;
    const ay = r(30,50), ax = r(16,30), ar = r(9,16), as = r(.06,.11);
    swing(w, {y:-ay},            {y:ay},            r(1.9,2.9), r(0,1));   // naik-turun besar
    swing(w, {x:-ax*dir},        {x:ax*dir},        r(2.4,3.6), r(0,1));   // geser samping
    swing(w, {rotation:-ar*dir}, {rotation:ar*dir}, r(2.2,3.2), r(0,1));   // goyang miring
    swing(w, {scale:1-as/2},     {scale:1+as},      r(1.6,2.4), r(0,1));   // "napas"
  });

  floats.forEach((f,i)=>{
    const dir = i%2 ? -1 : 1;
    swing(f, {y:-13},           {y:13},           1.25, (i*.09)%1);        // gelombang berjalan antar huruf
    swing(f, {rotation:-6*dir}, {rotation:6*dir}, 1.8,  (i*.07)%1);
    swing(f, {scale:.96},       {scale:1.07},     1.4,  (i*.11)%1);
  });
  // tiap baris judul ikut bergoyang berlawanan arah
  swing(line1El, {x:-12, rotation:-1.4}, {x:12,  rotation:1.4},  2.6, 0);
  swing(line2El, {x:12,  rotation:1.2},  {x:-12, rotation:-1.2}, 3.0, 0);
})();

/* ---------- LOADER (progress → outro tirai halus) ---------- */
(function(){
  const Lo = document.getElementById('loader');
  const bar = document.getElementById('loaderBar');
  const pct = document.getElementById('loaderPct');
  if(!Lo || !bar) return;

  const t0 = 0; // Count from navigation, including time spent loading scripts.
  const MIN = reduce ? 300 : 2960; // 2.96s assembly + .24s outro lead + .8s curtain = 4s total
  let loaded = document.readyState === 'complete';
  let done = false;
  let rafId = 0;
  let fallbackId = 0;
  let pageStarted = false;
  let cleaned = false;

  window.addEventListener('load', ()=>{ loaded = true; }, {once:true});

  function revealPage(){
    if(pageStarted) return;
    pageStarted = true;
    document.body.classList.add('ready');
    if(!reduce){
      document.body.classList.add('intro-play');
      setTimeout(()=>document.body.classList.remove('intro-play'), 2200);
    }
    resetAutoplay();
    lenis && lenis.start();
    if(hasGSAP) requestAnimationFrame(()=>ScrollTrigger.refresh());
  }

  function cleanup(){
    if(cleaned) return;
    cleaned = true;
    if(rafId) cancelAnimationFrame(rafId);
    if(fallbackId) clearTimeout(fallbackId);
    // Infinite float tweens otherwise keep updating detached loader elements.
    if(hasGSAP) gsap.killTweensOf([Lo, ...Lo.querySelectorAll('*')]);
    if(Lo.isConnected) Lo.remove();
    revealPage();
  }

  function finish(){
    if(done) return;
    done = true;
    clearTimeout(fallbackId);

    // Sinkronkan pergantian layer dengan awal outro agar tidak ada
    // frame kosong/jump sebelum halaman utama muncul.
    if(restartAtHero){
      window.scrollTo({top:0, left:0, behavior:'instant'});
      if(lenis) lenis.scrollTo(0, {immediate:true, force:true});
    }
    // Animasi masuk (logo, navbar, teks, komponen hero, dll) — jalan sekali setelah intro selesai.

    if(hasGSAP) requestAnimationFrame(()=>ScrollTrigger.refresh());

    // Pastikan progress penuh sebelum outro mulai.
    bar.style.transform = 'scaleX(1)'; if(pct) pct.textContent = '100%';

    const startIris = ()=>{
      Lo.classList.add('exit');
      // Reveal the hero as the curtain opens, not after a blank final frame.
      revealPage();
      const onEnd = (event)=>{
        if(event.target !== Lo || event.propertyName !== 'transform') return;
        Lo.removeEventListener('transitionend', onEnd);
        cleanup();
      };
      Lo.addEventListener('transitionend', onEnd);
      fallbackId = setTimeout(cleanup, reduce ? 0 : 800);
    };

    if(hasGSAP && !reduce){
      // Outro cinematic: komponen makanan "meledak" keluar dari tengah, logo+judul zoom & fade,
      // lalu layar menutup dengan efek iris/aperture (bukan tirai geser).
      const foods = document.querySelectorAll('.loader-food');
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      gsap.to(foods, {
        opacity:0, scale:'+=.6', duration:.45, ease:'power2.in', stagger:.02,
        x:(i, el)=>{ const r = el.getBoundingClientRect(); return (r.left + r.width/2 - cx) * .7; },
        y:(i, el)=>{ const r = el.getBoundingClientRect(); return (r.top + r.height/2 - cy) * .7; }
      });
      gsap.to('.loader-inner', {opacity:0, scale:1.12, y:-30, duration:.6, ease:'power2.inOut'});
      gsap.to('.loader-text', {opacity:0, y:-10, duration:.3, ease:'power1.in'});
      setTimeout(startIris, 240);
    } else {
      startIris();
    }
  }

  function tick(now){
    const p = Math.min((now - t0) / MIN, 1);
    const shown = loaded ? p : Math.min(p,.92);
    bar.style.transform = `scaleX(${shown})`;
    if(pct) pct.textContent = Math.round(shown*100) + '%';

    if(p >= 1){
      finish();
      return;
    }
    rafId = requestAnimationFrame(tick);
  }

  if(typeof skipIntro !== 'undefined' && skipIntro){
    // dari menu.html: tanpa layar intro, langsung tampilkan halaman (animasi masuk hero tetap jalan)
    done = true;
    const go = ()=>cleanup();
    if(loaded) go(); else { window.addEventListener('load', go, {once:true}); fallbackId = setTimeout(go, 2500); }
    return;
  }
  rafId = requestAnimationFrame(tick);
  fallbackId = setTimeout(finish, Math.max(0, MIN - (performance.now() - t0)));
})();

/* ---------- SCROLL-TRIGGER: teks, gambar, card ---------- */
if(hasGSAP && !reduce){
  gsap.registerPlugin(ScrollTrigger);
  const split = el=>{
    el.setAttribute('aria-label', el.innerText.replace(/\s+/g,' ').trim());
    const walk = node=> Array.from(node.childNodes).forEach(child=>{
      if(child.nodeType === Node.TEXT_NODE){
        const fragment=document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(word=>{
          if(!word.trim()){fragment.appendChild(document.createTextNode(word));return;}
          const mask=document.createElement('span');mask.className='sw';mask.setAttribute('aria-hidden','true');
          const inner=document.createElement('span');inner.className='swi';inner.textContent=word;
          mask.appendChild(inner);fragment.appendChild(mask);
        });
        child.replaceWith(fragment);
      }else if(child.nodeType===Node.ELEMENT_NODE && child.tagName!=='BR'){walk(child);}
    });walk(el);return el.querySelectorAll('.swi');
  };
  document.querySelectorAll('.section-head h2,.tentang-copy h2,.cta-section h2,.promo-copy h2').forEach(h=>{
    gsap.fromTo(split(h), {yPercent:115,rotate:7,opacity:0}, {
      yPercent:0,rotate:0,opacity:1,duration:1.05,ease:'power4.out',stagger:.065,
      scrollTrigger:{trigger:h,start:'top 90%',end:'bottom top',once:true}
    });
  });
  gsap.utils.toArray('.eyebrow,.section-head p,.tentang-copy p,.tentang-stats>div,.menu-tabs,.menu-note,.review-stats>div,.review-nav,.info-row,.map-art,.cta-section .btn-row,.section-cta-row').forEach(el=>
    gsap.fromTo(el, {y:34,opacity:0}, {y:0,opacity:1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',end:'bottom top',once:true}}));
  const batch = (sel, from={})=>{
    const els = gsap.utils.toArray(sel); if(!els.length) return;
    gsap.set(els, Object.assign({opacity:0, y:64}, from));
    const to = {opacity:1, y:0, x:0, scale:1, rotate:0, duration:.9, stagger:.12, ease:'power3.out', overwrite:true};
    if(from.clipPath) to.clipPath = 'inset(0% 0% 0% 0%)';
    
    ScrollTrigger.batch(els, {start:'top 90%',end:'bottom top',once:true,onEnter:b=>gsap.to(b,to)});
  };
  batch('.promo-copy > p,.promo-pricing,.promo-order,.promo-art', {y:35});
  batch('.order-platform', {y:56, rotate:-3, scale:.94});
  batch('.footer-grid > div', {y:30});
  batch('.fav-card', {rotate:3, scale:.92});
  batch('.why-card', {y:50, scale:.94});
  batch('.step-item', {y:50});
  // Fade without moving snap targets inside the horizontal review track.
  batch('.review-card', {x:0, y:0});
  gsap.from('.step-num', {scale:0, rotate:-90, duration:.7, ease:'back.out(2)', stagger:.15, scrollTrigger:{trigger:'.steps-row', start:'top 85%',once:true}});
  gsap.from('.tentang-art img', {clipPath:'inset(100% 0% 0% 0%)', scale:1.3, duration:1.3, ease:'power4.out', scrollTrigger:{trigger:'.tentang-art', start:'top 80%',once:true}});

  // Hero layout stays anchored to its section. Only slide children animate;
  // scroll transforms must not compete with their entrance/centering transforms.
  window.addEventListener('load', ()=>ScrollTrigger.refresh());
}
/* Status outlet selalu mengikuti WIB, termasuk untuk pengunjung luar Indonesia. */
(function(){
  function updateOutletStatus(){
    const hour = Number(new Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Jakarta', hour:'2-digit', hourCycle:'h23'}).format(new Date()));
    const isOpen = hour >= 18; // buka 18.00 sampai tengah malam (00.00)
    document.querySelectorAll('[data-outlet-status]').forEach(el=>{
      el.textContent = isOpen ? '● Buka sekarang · sampai 00.00 WIB' : '● Tutup · buka pukul 18.00 WIB';
      el.classList.toggle('is-open', isOpen);
    });
  }
  updateOutletStatus();
  setInterval(updateOutletStatus, 60000);
})();

/* Inline vector icon system: no icon CDN or extra image downloads. */
(function(){
 const vector=name=>`<svg class="ks-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-${name}"/></svg>`;
 const names=['food','leaf','flame','wallet'];
 document.querySelectorAll('.why-card .ico').forEach((el,i)=>el.innerHTML=vector(names[i%names.length]));
 const navLinks=[...document.querySelectorAll('.nav-links a')];
 const sections=navLinks.filter(a=>a.getAttribute('href').startsWith('#')).map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
 if('IntersectionObserver' in window){
   const activeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
     if(!entry.isIntersecting)return;
     navLinks.forEach(a=>{const active=a.getAttribute('href')==='#'+entry.target.id;a.classList.toggle('is-current',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
   }),{rootMargin:'-15% 0px -60% 0px'});
   sections.forEach(el=>activeObserver.observe(el));
 }
 // Progressive enhancement when the animation CDN is unavailable.
 if(!hasGSAP && !reduce && 'IntersectionObserver' in window){
   const reveal=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
     if(!isIntersecting)return;
     target.animate([{opacity:0,transform:'translateY(26px)'},{opacity:1,transform:'none'}],{duration:750,easing:'cubic-bezier(.22,1,.36,1)'});
     reveal.unobserve(target);
   }),{threshold:.08});
   document.querySelectorAll('.section-head,.fav-card,.order-platform,.why-card,.footer-grid>div').forEach(el=>reveal.observe(el));
 }
})();

/* Pointer-driven 3D, scoped to inner surfaces so scroll reveals do not conflict. */
(function(){
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(hover: hover) and (pointer: fine)');
 document.querySelectorAll('[data-tilt]').forEach(card=>{
  const surface=card.querySelector('.tilt-surface');if(!surface)return;
  let frame=0,px=0,py=0;
  function reset(){cancelAnimationFrame(frame);surface.style.setProperty('--tilt-x','0deg');surface.style.setProperty('--tilt-y','0deg');}
  card.addEventListener('pointermove',e=>{
   if(motion.matches||!fine.matches||e.pointerType==='touch')return;
   const r=card.getBoundingClientRect();px=(e.clientX-r.left)/r.width-.5;py=(e.clientY-r.top)/r.height-.5;
   cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{surface.style.setProperty('--tilt-x',(-py*10)+'deg');surface.style.setProperty('--tilt-y',(px*12)+'deg');});
  },{passive:true});
  card.addEventListener('pointerleave',reset);card.addEventListener('pointercancel',reset);motion.addEventListener('change',reset);
 });
})();

/* Suara klik sintetis (tanpa file audio): "pop" berisi + ketukan tajam di awal. Ubah VOL untuk mengatur keras-pelannya (1 = keras, .5 = sedang, .3 = pelan). */
(function(){
 const VOL=.1;
 let audio=null,master=null,noise=null,lastPop=0;
 function init(){
  const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;
  audio=new AC();
  // kompresor: boleh keras tapi tidak pecah/clipping
  const comp=audio.createDynamicsCompressor();
  comp.threshold.value=-16;comp.knee.value=10;comp.ratio.value=8;comp.attack.value=.002;comp.release.value=.12;
  master=audio.createGain();master.gain.value=VOL;master.connect(comp);comp.connect(audio.destination);
  // butiran noise pendek untuk transient "tek"
  const len=Math.floor(audio.sampleRate*.03),buf=audio.createBuffer(1,len,audio.sampleRate),ch=buf.getChannelData(0);
  for(let i=0;i<len;i++)ch[i]=(Math.random()*2-1)*Math.pow(1-i/len,2);
  noise=buf;return true;
 }
 function tone(type,f0,f1,t,peak,dur){
  const o=audio.createOscillator(),g=audio.createGain();
  o.type=type;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+dur*.8);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+.004);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g);g.connect(master);o.start(t);o.stop(t+dur+.01);
 }
 function pop(){
  const now=performance.now();if(now-lastPop<55)return;lastPop=now;
  if(!audio&&!init())return;
  const play=()=>{
   const t=audio.currentTime;
   tone('sine',920,300,t,.42,.16);        // badan suara
   tone('triangle',1500,700,t,.14,.09);   // lapisan atas biar "renyah"
   const n=audio.createBufferSource(),hp=audio.createBiquadFilter(),g=audio.createGain();
   n.buffer=noise;hp.type='highpass';hp.frequency.value=1800;g.gain.value=.22;
   n.connect(hp);hp.connect(g);g.connect(master);n.start(t);
  };
  if(audio.state==='running')play();else audio.resume().then(play).catch(()=>{});
 }
 document.addEventListener('click',e=>{
  if(e.target.closest('button,.kbtn,.menu-tab-btn,.order-platform,.fav-add'))pop();
 },{passive:true});
})();