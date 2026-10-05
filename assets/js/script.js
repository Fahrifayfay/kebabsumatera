/* ===== EXTRACTED INLINE SCRIPT 1 ===== */


/* ===== EXTRACTED INLINE SCRIPT 2 ===== */
document.getElementById('loaderLogo').src=LOGO;

/* ===== EXTRACTED INLINE SCRIPT 3 ===== */

/* ======================================================================
   CONFIG — ganti nilai di bawah ini dengan data usaha yang sebenarnya
   ====================================================================== */

document.querySelectorAll('[href="__WA_LINK_GENERAL__"]').forEach(a=>{
  a.href = waLink("Halo Kebab Sumatera, saya mau pesan.");
});

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

const BYO = {
  produk: [
    {id:"kebab", label:"Kebab", base:{ayam:15000, sapi:18000, mix:20000}, img:IMG.kebab},
    {id:"burger", label:"Burger", base:{ayam:12000, sapi:13000, mix:16000}, img:IMG.burger},
    {id:"roti", label:"Roti Bakar Bandung", img:IMG.roti},
  ],
  protein: [
    {id:"ayam", label:"Ayam"},
    {id:"sapi", label:"Sapi"},
    {id:"mix", label:"Mix"},
  ],
  topping: [
    {id:"telur", label:"Telur"},
    {id:"keju", label:"Keju"},
    {id:"sosis", label:"Sosis"},
    {id:"nugget", label:"Nugget"},
    {id:"daging", label:"Daging Slice"},
  ],
  sayur: [
    {id:"lettuce", label:"Selada"},
    {id:"tomat", label:"Tomat"},
    {id:"bawang", label:"Bawang"},
  ],
  saus: [
    {id:"mayo", label:"Mayonnaise"},
    {id:"chili", label:"Saus Pedas"},
    {id:"bbq", label:"BBQ"},
  ],
};

const WHY = [
  {ico:"🥙", title:"Porsi Melimpah", desc:"Isian makanan dibuat cukup dan mengenyangkan."},
  {ico:"🥩", title:"Isian Berkualitas", desc:"Menggunakan bahan dan isian yang sesuai dengan menu."},
  {ico:"🔥", title:"Fresh & Dibuat Saat Order", desc:"Makanan disiapkan ketika ada pesanan."},
  {ico:"💰", title:"Harga Bersahabat", desc:"Beragam pilihan menu dengan harga yang terjangkau."},
];

const STEPS = [
  {title:"Pilih Menu", desc:"Pilih Kebab, Burger, Lumpia, atau Roti Bakar Bandung."},
  {title:"Pilih Jumlah / Custom", desc:"Tentukan jumlah atau pakai fitur Build Your Own."},
  {title:"Pesan", desc:"Pesanan diarahkan ke WhatsApp untuk dikonfirmasi."},
  {title:"Ambil / Diantar", desc:"Pesanan siap diambil atau diproses untuk pengantaran."},
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
  {word:'KEBAB',  bg:'#e8460f', ink:'#c23a0a', fg:'#ffffff'},
  {word:'BURGER', bg:'#f7a90c', ink:'#d98d00', fg:'#ffffff'},
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
const N = CATEGORIES.length;
const L = {giant:[], slot:[], text:[], dot:[]};

CATEGORIES.forEach((cat, i)=>{
  const th = THEME[i], on = i===0 ? ' active' : '';
  const g = document.createElement('div');
  g.className = 'giant' + on; g.style.setProperty('--len', th.word.length);
  g.innerHTML = [...th.word].map((c,j)=>`<span class="ch" style="--i:${j}">${c===' '?'&nbsp;':c}</span>`).join('');
  heroGiant.appendChild(g); L.giant.push(g);

  const t = document.createElement('div');
  t.className = 'hero-text' + on;
  t.innerHTML = `<p class="ht">${cat.title}</p><p class="desc">${cat.desc}</p>
    <div class="hero-cta"><a href="menu.html" class="kbtn kbtn-primary">Lihat Menu</a><a href="#build-your-own" class="kbtn kbtn-ghost">Racik Sendiri</a></div>`;
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
    im.className = 'ing'; im.src = ing.src; im.alt = ''; im.draggable = false;
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
function setPrice(i){ const p = CATEGORIES[i].priceFrom; heroPrice.textContent = p ? formatRupiah(p) : 'Cek WA'; }
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

/* ======================================================================
   RENDER: BUILD YOUR OWN
   ====================================================================== */
/* RENDER: RACIK — choices, live illustration, receipt and order link */
const RACIK_VISUALS = {
 produk:{kebab:'image/kebab/kebabsumateraayam.webp',burger:'image/burger/burgerayamkeju.webp',roti:IMG.roti},
 protein:{ayam:'image/komponen/ayam.webp',sapi:'image/komponen/meatchunk.png'},
 topping:{keju:'image/komponen/cheese1.png',nugget:'image/komponen/nugget.webp',daging:'image/komponen/daging slice.webp',telur:'image/komponen/telur.png',sosis:'image/komponen/sosis.png'},
 sayur:{lettuce:'image/komponen/lettuce1.png',tomat:'image/komponen/tomato1.png',bawang:'image/komponen/onionred.png'},
 saus:{mayo:'image/komponen/saus-mayo.webp',chili:'image/komponen/saus-pedas.webp',bbq:'image/komponen/saus-bbq.webp'}
};
BYO.rasa=[{id:'coklat',label:'Coklat'},{id:'srikaya',label:'Srikaya'},{id:'blueberry',label:'Blueberry'},{id:'strawberry',label:'Strawberry'}];
BYO.rotiExtra=[{id:'keju',label:'Tambah keju',extra:'+Rp2.000'}];
RACIK_VISUALS.rasa=Object.fromEntries(BYO.rasa.map(r=>[r.id,`image/modelrotibiasa/${r.id}.webp`]));
RACIK_VISUALS.rotiExtra={keju:'image/komponen/cheese1.png'};
const racikFallback = id => ({telur:'🍳',sosis:'🌭'}[id] || racikIcon);
const racikMotion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
const racikIcon = '<svg class="ks-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#icon-food"/></svg>';
function renderOptions(container,list,name,type,checkedFirst){
 list.forEach((opt,i)=>{
  const card=document.createElement('div');card.className='opt-card';
  const id=name+'_'+opt.id, visual=RACIK_VISUALS[name]?.[opt.id];
  card.innerHTML=`<input type="${type}" name="${name}" id="${id}" value="${opt.id}" ${type==='radio' && i===0 && checkedFirst?'checked':''}><label for="${id}"><span class="opt-visual visual-${opt.id}" aria-hidden="true">${visual?`<img src="${visual}" alt="">`:racikFallback(opt.id)}</span><span class="opt-copy">${opt.label}${opt.extra?`<small class="extra">${opt.extra}</small>`:''}</span><span class="opt-mark" aria-hidden="true">✓</span></label>`;
  container.appendChild(card);
 });
}
renderOptions(document.getElementById('optProduk'),BYO.produk,'produk','radio',true);
renderOptions(document.getElementById('optProtein'),BYO.protein,'protein','radio',true);
BYO.topping.forEach(t=>t.extra='+Rp2.000');
renderOptions(document.getElementById('optTopping'),BYO.topping,'topping','checkbox');
document.querySelector('.racik-qty-field').insertAdjacentHTML('beforebegin','<fieldset class="bread-field" hidden><legend><span class="step">02</span><span>Manisnya pilih sendiri.<small>Semua rasa Rp20.000 per porsi.</small></span></legend><div class="opt-grid bread-options" id="optRasa"></div></fieldset><fieldset class="bread-field" hidden><legend><span class="step">03</span><span>Mau tambah keju?<small>Opsional · +Rp2.000 per porsi.</small></span></legend><div class="opt-grid" id="optRotiExtra"></div></fieldset>');
renderOptions(document.getElementById('optRasa'),BYO.rasa,'rasa','radio',true);
renderOptions(document.getElementById('optRotiExtra'),BYO.rotiExtra,'rotiExtra','checkbox');
let qty=1, spiceLevel=1, racikTotalFrame=0, racikShownTotal=0;
const spiceRange=document.getElementById('spiceRange');
const spicePanel=document.getElementById('spiceLevels');
const heatNames=['Ringan','Mulai hangat','Pedas','Makin berani','Ekstra pedas!'];
function updateHeat(animate=false){
 spiceRange.value=spiceLevel;
 spiceRange.setAttribute('aria-valuetext',spiceLevel+' kali, '+heatNames[spiceLevel-1]);
 spicePanel.style.setProperty('--heat-progress',((spiceLevel-1)*25)+'%');
 spicePanel.style.setProperty('--heat-scale',.7+spiceLevel*.16);
 spicePanel.style.setProperty('--heat-hue',38-spiceLevel*7);
 document.getElementById('heatNumber').textContent=spiceLevel+'×';
 document.getElementById('heatLabel').textContent=spiceLevel+'× · '+heatNames[spiceLevel-1];
 window.heatFire?.setLevel(spiceLevel,!spiceRange.disabled,animate);
 if(animate && racikMotion){
  const force=spiceLevel*1.5;
  ['heatChili','heatNumber'].forEach(id=>racikAnimate(document.getElementById(id),[{transform:'translateX(0) rotate(0)'},{transform:`translateX(${-force}px) rotate(-5deg)`},{transform:`translateX(${force}px) rotate(5deg)`},{transform:`translateX(${-force/2}px) rotate(-2deg)`},{transform:'translateX(0) rotate(0)'}],{duration:200+spiceLevel*65,iterations:2,easing:'ease-in-out'}));
 }
}
function shakeRacik(el){racikAnimate(el,[{transform:'translateX(0)'},{transform:'translateX(-4px) rotate(-1deg)'},{transform:'translateX(4px) rotate(1deg)'},{transform:'translateX(-3px)'},{transform:'none'}],{duration:320});}
spiceRange.addEventListener('input',()=>{if(spiceRange.disabled)return;spiceLevel=Number(spiceRange.value);updateHeat(true);updateByo({name:'spice'});});
const qtyValue=document.getElementById('qtyValue');
const byoForm=document.getElementById('byoForm');
const byoPreviewImg=document.getElementById('byoPreviewImg');
const byoSummary=document.getElementById('byoSummary');
const byoTotal=document.getElementById('byoTotal');
const byoOrderBtn=document.getElementById('byoOrderBtn');
const racikFeedback=document.getElementById('racikFeedback');
const racikIngredients=document.getElementById('racikIngredients');
// These stems match the existing PNG filenames, including "nugget" and "slice".
function burgerPreviewPath(protein,toppings){
 const main=toppings.find(id=>id!=='keju');
 const cheese=toppings.includes('keju');
 const stems={telur:'telur',sosis:'sosis',nugget:'nugget',daging:'slice'};
 const variant=main?stems[main]+'-'+(cheese?'keju':'polos'):cheese?'polos-keju':'-polos';
 return `image/burger/${protein}/${protein}${variant}.png`;
}
let burgerPreviewRequest=0,burgerPreviewSource='',burgerPreviewGhost=null;
function cancelBurgerPreview(){
 burgerPreviewRequest++;burgerPreviewSource='';
 burgerPreviewGhost?.remove();burgerPreviewGhost=null;
}
async function updateBurgerPreview(photo,alt,animated){
 if(burgerPreviewSource===photo)return;
 const request=++burgerPreviewRequest;
 burgerPreviewSource=photo;
 // Keep the current picture visible until the next PNG is fully decoded.
 const next=new Image();next.src=photo;
 try{await next.decode();}catch{
  if(request===burgerPreviewRequest)burgerPreviewSource='';
  return;
 }
 if(request!==burgerPreviewRequest)return;
 burgerPreviewGhost?.remove();burgerPreviewGhost=null;
 byoPreviewImg.getAnimations().forEach(animation=>animation.cancel());
 const changed=byoPreviewImg.getAttribute('src')!==photo;
 if(changed && animated && racikMotion && byoPreviewImg.animate){
  const ghost=byoPreviewImg.cloneNode();ghost.removeAttribute('id');ghost.alt='';ghost.setAttribute('aria-hidden','true');
  Object.assign(ghost.style,{position:'absolute',left:byoPreviewImg.offsetLeft+'px',top:byoPreviewImg.offsetTop+'px',width:byoPreviewImg.offsetWidth+'px',height:byoPreviewImg.offsetHeight+'px',pointerEvents:'none',margin:'0',zIndex:'2'});
  byoPreviewImg.after(ghost);burgerPreviewGhost=ghost;
  const fade=ghost.animate([{opacity:1,transform:'scale(1)'},{opacity:0,transform:'translateY(-6px) scale(1.025)'}],{duration:320,easing:'ease-out',fill:'forwards'});
  fade.onfinish=()=>{ghost.remove();if(burgerPreviewGhost===ghost)burgerPreviewGhost=null;};
 }
 byoPreviewImg.src=photo;byoPreviewImg.alt=alt;
 const mobile=document.getElementById('racikMobileImg');mobile.src=photo;
 if(changed && animated){
  racikAnimate(byoPreviewImg,[{opacity:0,transform:'translateY(10px) rotate(-2deg) scale(.95)'},{opacity:1,transform:'none'}],{duration:420});
  racikAnimate(mobile,[{opacity:.4,transform:'scale(.9)'},{opacity:1,transform:'none'}],{duration:320});
 }
}
function racikAnimate(el,frames,options={}){
 if(!racikMotion || !el?.animate)return;
 el.getAnimations().forEach(a=>a.cancel());
 el.animate(frames,{duration:520,easing:'cubic-bezier(.22,1,.36,1)',...options});
}
// Fly the selected visual from its option into the live recipe card.
const racikFlights=new Map();
function flyToRacik(input){
 if(!racikMotion || !input.checked)return;
 const source=input.nextElementSibling?.querySelector('.opt-visual');
 const key=input.name+'-'+input.value;
 const ingredient=racikIngredients.querySelector(`[data-key="${key}"]`);
 let target=ingredient?.querySelector('img') || ingredient || byoPreviewImg;
 const previewRect=target.getBoundingClientRect();
 if(previewRect.bottom<80 || previewRect.top>innerHeight){
  const mobile=document.getElementById('racikMobileImg');
  if(!document.body.classList.contains('racik-mobile-active'))return;
  target=mobile;
 }
 if(!source || !source.animate)return;
 racikFlights.get(key)?.cancel();
 const start=source.getBoundingClientRect(),end=target.getBoundingClientRect();
 const size=Math.max(32,Math.min(start.width,90));
 const x=start.left+start.width/2-size/2,y=start.top+start.height/2-size/2;
 const dx=end.left+end.width/2-(x+size/2),dy=end.top+end.height/2-(y+size/2);
 const flyer=document.createElement('span');
 flyer.className='racik-flying-visual';flyer.setAttribute('aria-hidden','true');
 flyer.innerHTML=source.innerHTML;
 Object.assign(flyer.style,{left:x+'px',top:y+'px',width:size+'px',height:size+'px'});
 document.body.appendChild(flyer);
 const scale=Math.max(.55,Math.min(end.width/size,1.4));
 const flight=flyer.animate([
  {transform:'translate(0,0) scale(1)',opacity:1},
  {transform:`translate(${dx*.45}px,${dy*.45-65}px) scale(1.25) rotate(-14deg)`,opacity:1,offset:.45},
  {transform:`translate(${dx}px,${dy}px) scale(${scale}) rotate(0deg)`,opacity:1,offset:.9},
  {transform:`translate(${dx}px,${dy}px) scale(${scale*.8})`,opacity:0}
 ],{duration:720,easing:'cubic-bezier(.3,.05,.25,1)'});
 racikFlights.set(key,flight);
 const cleanup=()=>{flyer.remove();if(racikFlights.get(key)===flight)racikFlights.delete(key);};
 flight.oncancel=cleanup;
 flight.onfinish=()=>{cleanup();if(input.checked && target.isConnected)racikAnimate(ingredient || target,[{transform:'scale(.85)'},{transform:'scale(1.15)',offset:.5},{transform:'scale(1)'}],{duration:260});};
}
function racikCountPrice(total,animated){
 cancelAnimationFrame(racikTotalFrame);
 if(!animated || !racikMotion){racikShownTotal=total;byoTotal.textContent=formatRupiah(total);return;}
 const from=racikShownTotal,t0=performance.now();
 // Announce only the settled amount; visual updates are not live announcements.
 byoTotal.setAttribute('aria-live','off');
 function frame(now){const t=Math.min((now-t0)/380,1);racikShownTotal=from+(total-from)*(1-Math.pow(1-t,3));byoTotal.textContent=formatRupiah(Math.round(racikShownTotal));if(t<1){racikTotalFrame=requestAnimationFrame(frame);}else{byoTotal.setAttribute('aria-live','polite');byoTotal.textContent=formatRupiah(total);}}
 racikTotalFrame=requestAnimationFrame(frame);
}
function updateByo(action){
 const produkId=byoForm.querySelector('[name="produk"]:checked').value;
 const bread=produkId==='roti';
 ['optProtein','optTopping'].forEach(id=>{
  const field=document.getElementById(id).closest('fieldset');field.hidden=bread;
  field.querySelectorAll('input,button').forEach(el=>el.disabled=bread);
 });
 byoForm.querySelectorAll('.bread-field').forEach(field=>{field.hidden=!bread;field.querySelectorAll('input').forEach(el=>el.disabled=!bread);});
 document.getElementById('spiceField').hidden=bread;
 byoForm.querySelector('.racik-qty-field .step').textContent=bread?'04':'05';
 if(action?.name==='produk'){racikFlights.forEach(flight=>flight.cancel());requestAnimationFrame(()=>{if(window.ScrollTrigger)ScrollTrigger.refresh();});}
 if(bread){spiceRange.disabled=true;window.heatFire?.setLevel(spiceLevel,false);byoOrderBtn.removeAttribute('aria-disabled');byoOrderBtn.removeAttribute('tabindex');updateBread(action);return;}
 const proteinId=byoForm.querySelector('[name="protein"]:checked').value;
 const produk=BYO.produk.find(p=>p.id===produkId);
 const protein=BYO.protein.find(p=>p.id===proteinId);
 const selected=name=>[...byoForm.querySelectorAll(`[name="${name}"]:checked`)].map(el=>el.value);
 const toppings=selected('topping');
 const valid=toppings.length>=1 && toppings.filter(id=>id!=='keju').length<=1;
 document.getElementById('toppingRule').textContent='Pilih 1 topping. Keju boleh ditambah 1 topping lain · +Rp2.000 per topping.';
 document.getElementById('toppingProgress').textContent=valid?`${toppings.length} topping dipilih. Lanjut atur level pedas ↓`:'Pilih minimal 1 topping untuk melanjutkan.';
 spiceRange.disabled=!valid;spicePanel.classList.toggle('is-locked',!valid);
 document.getElementById('heatHint').textContent=valid?'Geser untuk mengatur pedas · tanpa biaya tambahan.':'Lengkapi topping untuk membuka level pedas.';
 updateHeat();
 byoOrderBtn.setAttribute('aria-disabled',String(!valid));
 if(valid)byoOrderBtn.removeAttribute('tabindex');else byoOrderBtn.setAttribute('tabindex','-1');
 const photo=produkId==='kebab' ? (proteinId==='ayam'?'image/kebab/kebabsumateraayam.webp':proteinId==='sapi'?'image/kebab/kebabsumaterasapi.webp':IMG.kebab) : burgerPreviewPath(proteinId,toppings);
 if(produkId==='burger'){
  const toppingNames=toppings.map(id=>BYO.topping.find(item=>item.id===id).label);
  updateBurgerPreview(photo,`Burger ${protein.label}${toppingNames.length?' + '+toppingNames.join(' + '):' Polos'} — ilustrasi racikan`,!!action);
 }else{
  cancelBurgerPreview();
  if(byoPreviewImg.getAttribute('src')!==photo)byoPreviewImg.src=photo;
  document.getElementById('racikMobileImg').src=photo;
  byoPreviewImg.alt=produk.label+' '+protein.label+' — ilustrasi racikan';
 }
 document.getElementById('racikProductLabel').textContent=produk.label.toUpperCase();
 document.getElementById('racikCount').textContent=qty+' porsi';
 qtyValue.textContent=qty;
 document.getElementById('qtyMinus').disabled=qty<=1;
 document.getElementById('qtyPlus').disabled=qty>=99;
 const base=produk.base[proteinId],unit=base+toppings.length*EXTRA_TOPPING_PRICE,total=unit*qty;
 document.getElementById('racikUnitPrice').textContent=formatRupiah(unit)+' × '+qty+' porsi';
 const items=[[produk.label+' · '+protein.label,formatRupiah(base)]];
 toppings.forEach(id=>items.push([BYO.topping.find(t=>t.id===id).label,'+'+formatRupiah(EXTRA_TOPPING_PRICE)]));
 const labels=(name,values)=>values.map(id=>BYO[name].find(v=>v.id===id).label).join(', ');
 items.push([valid?'Level pedas '+spiceLevel+'×':'Lengkapi topping terlebih dulu',valid?'Gratis':'—']);
 byoSummary.innerHTML=items.map(([label,val])=>`<li><span>${label}</span><b>${val}</b></li>`).join('');
 racikCountPrice(total,!!action);
 document.getElementById('racikMobileTotal').textContent=formatRupiah(total);
 if(action && produkId!=='burger')racikAnimate(document.getElementById('racikMobileImg'),[{transform:'rotate(-10deg) scale(.85)'},{transform:'none'}]);
 const msg=[`Halo Kebab Sumatera, saya mau pesan racikan sendiri:`,`- Produk: ${produk.label}`,`- Protein: ${protein.label}`,`- Topping: ${labels('topping',toppings)}`,`- Level pedas: ${spiceLevel}×`,`- Jumlah: ${qty}`,`- Harga per porsi: ${formatRupiah(unit)}`,`- Total: ${formatRupiah(total)}`].join('\n');
 if(valid)byoOrderBtn.href=waLink(msg);else byoOrderBtn.removeAttribute('href');
 const visuals=[{group:'protein',id:proteinId},...toppings.map(id=>({group:'topping',id}))];
 // Stable keys let additions pop in without re-animating every ingredient.
 const keys=new Set(visuals.map(v=>v.group+'-'+v.id));
 [...racikIngredients.children].forEach(el=>{if(!keys.has(el.dataset.key))el.remove();});
 visuals.forEach((item,i)=>{
  const key=item.group+'-'+item.id;
  let el=racikIngredients.querySelector(`[data-key="${key}"]`);
  if(!el){
   el=document.createElement('span');el.className='racik-ingredient';el.dataset.key=key;
   const img=RACIK_VISUALS[item.group]?.[item.id];
   const label=BYO[item.group].find(v=>v.id===item.id).label;
   el.innerHTML=(img?`<img src="${img}" alt="">`:racikFallback(item.id))+`<small>${label}</small>`;
   racikIngredients.appendChild(el);
   racikAnimate(el,[{opacity:0,transform:'translateY(35px) scale(.5) rotate(-18deg)'},{opacity:1,transform:'none'}]);
  }
  el.style.setProperty('--ingredient-turn',((i%2?1:-1)*(3+i%3))+'deg');
 });
 if(action){
  let message='Racikanmu diperbarui.';
  if(action.name==='jumlah')message=qty===1?'Satu porsi, khusus buat kamu.':qty+' porsi dengan racikan yang sama. Mantap!';
  else if(action.name==='reset')message='Mulai lagi dari kebab ayam. Racik sesukamu!';
  else if(action.name==='spice')message='Level pedas '+spiceLevel+'× dipilih. '+(spiceLevel===5?'Ekstra pedas!':'Siap bikin nagih!');
  else{
   const option=BYO[action.name]?.find(o=>o.id===action.value);
   if(option)message=option.label+(action.name==='produk'||action.name==='protein'?' dipilih.':action.checked?' ditambahkan!':' dihapus dari racikan.');
  }
  racikFeedback.textContent=message;
  racikAnimate(racikFeedback,[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}]);
  const flip=action.name==='produk'||action.name==='protein';
  if(produkId!=='burger')racikAnimate(byoPreviewImg,flip?[{opacity:.25,transform:'translateY(20px) rotateY(-24deg) rotate(-7deg) scale(.87)'},{opacity:1,transform:'none'}]:[{transform:'translateY(0) scale(1)'},{transform:'translateY(-10px) scale(1.045)',offset:.45},{transform:'none'}],{duration:flip?680:460});
  racikAnimate(document.getElementById('racikCount'),[{transform:'scale(.8)'},{transform:'scale(1.12)',offset:.6},{transform:'scale(1)'}]);
 }
}
function updateBread(action){
 cancelBurgerPreview();
 const rasa=byoForm.querySelector('[name="rasa"]:checked').value;
 const cheese=byoForm.querySelector('[name="rotiExtra"]').checked;
 const label=BYO.rasa.find(r=>r.id===rasa).label;
 const base=FULL_MENU.roti.items[0].price,unit=base+(cheese?EXTRA_TOPPING_PRICE:0),total=unit*qty;
 const photo=cheese?`image/rasaroti/${rasa}keju.webp`:`image/modelrotibiasa/${rasa}.webp`;
 byoPreviewImg.src=photo;byoPreviewImg.alt=`Roti Bakar Bandung ${label}${cheese?' Keju':''}`;
 document.getElementById('racikMobileImg').src=photo;
 document.getElementById('racikProductLabel').textContent='ROTI BAKAR BANDUNG';
 document.getElementById('racikCount').textContent=qty+' porsi';qtyValue.textContent=qty;
 document.getElementById('qtyMinus').disabled=qty<=1;document.getElementById('qtyPlus').disabled=qty>=99;
 document.getElementById('racikUnitPrice').textContent=formatRupiah(unit)+' × '+qty+' porsi';
 byoSummary.innerHTML=`<li><span>Roti Bakar Bandung · ${label}</span><b>${formatRupiah(base)}</b></li><li><span>${cheese?'Tambahan keju':'Tanpa tambahan keju'}</span><b>${cheese?'+'+formatRupiah(EXTRA_TOPPING_PRICE):'—'}</b></li>`;
 racikCountPrice(total,!!action);document.getElementById('racikMobileTotal').textContent=formatRupiah(total);
 racikIngredients.innerHTML=cheese?'<span class="racik-ingredient" data-key="rotiExtra-keju"><img src="image/komponen/cheese1.png" alt=""><small>Keju</small></span>':'';
 byoOrderBtn.href=waLink(['Halo Kebab Sumatera, saya mau pesan racikan sendiri:',`- Produk: Roti Bakar Bandung`,`- Rasa: ${label}`,`- Keju: ${cheese?'Ya':'Tidak'}`,`- Jumlah: ${qty}`,`- Harga per porsi: ${formatRupiah(unit)}`,`- Total: ${formatRupiah(total)}`].join('\n'));
 racikFeedback.textContent=`Roti ${label.toLowerCase()}${cheese?' dengan keju':''}, pilihanmu!`;
 if(action){racikAnimate(byoPreviewImg,[{opacity:.4,transform:'translateY(14px) scale(.92)'},{opacity:1,transform:'none'}]);racikAnimate(racikFeedback,[{opacity:0},{opacity:1}]);}
}
byoForm.addEventListener('submit',e=>e.preventDefault());
byoForm.addEventListener('change',e=>{
 if(!e.target.matches('input') || e.target===spiceRange)return;
 if(e.target.name==='topping' && e.target.checked && e.target.value!=='keju'){
  byoForm.querySelectorAll('[name="topping"]:checked').forEach(input=>{
   if(input!==e.target && input.value!=='keju'){input.checked=false;racikFlights.get('topping-'+input.value)?.cancel();}
  });
 }
 updateByo(e.target);
 if(e.target.checked)flyToRacik(e.target);
 else racikFlights.get(e.target.name+'-'+e.target.value)?.cancel();
 shakeRacik(e.target.nextElementSibling);
});
// A repeated click on an already selected option still has tactile feedback.
byoForm.addEventListener('click',e=>{const input=e.target.closest('input[type="checkbox"],input[type="radio"]');if(input)racikAnimate(input.nextElementSibling,[{transform:'scale(.97)'},{transform:'scale(1)'}],{duration:260});});
document.getElementById('qtyPlus').addEventListener('click',()=>{if(qty<99){qty++;updateByo({name:'jumlah'});racikAnimate(qtyValue,[{transform:'translateY(8px)',opacity:.3},{transform:'none',opacity:1}]);}});
document.getElementById('qtyMinus').addEventListener('click',()=>{if(qty>1){qty--;updateByo({name:'jumlah'});racikAnimate(qtyValue,[{transform:'translateY(-8px)',opacity:.3},{transform:'none',opacity:1}]);}});
document.getElementById('racikReset').addEventListener('click',()=>{racikFlights.forEach(flight=>flight.cancel());byoForm.reset();qty=1;spiceLevel=1;updateByo({name:'reset'});});
byoOrderBtn.addEventListener('click',event=>{if(byoOrderBtn.getAttribute('aria-disabled')==='true'){event.preventDefault();document.getElementById('toppingProgress').textContent='Pilih topping dulu sebelum memesan.';}});
updateByo();

/* ======================================================================
   RENDER: GALERI
   ====================================================================== */
const GALLERY = [
  {img:'image/gerobak.jpeg',cap:'Gerobak Kebab Sumatera',group:'Outlet',desc:'Hutan Percut Sei Tuan · 18.00–23.00 WIB',photo:true},
  {img:'image/kebab/kebabsumateraayam.webp',cap:'Kebab Sumatera Ayam',group:'Kebab'},
  {img:'image/kebab/kebabsumaterasapi.webp',cap:'Kebab Sumatera Sapi',group:'Kebab'},
  {img:'image/kebab/kebabspesialayam.webp',cap:'Kebab Spesial Ayam',group:'Kebab'},
  {img:'image/kebab/kebabspesialsapi.webp',cap:'Kebab Spesial Sapi',group:'Kebab'},
  {img:IMG.kebab,cap:'Kebab Sumatera',group:'Kebab'},
  {img:'image/burger/burgerayamkeju.webp',cap:'Burger Ayam',group:'Burger'},
  {img:'image/burger/burgertelur.webp',cap:'Burger Telur Daging',group:'Burger'},
  {img:IMG.burger,cap:'Burger Sapi Keju',group:'Burger'},
  {img:IMG.lumpia,cap:'Lumpia Sapi',group:'Lainnya'},
  {img:IMG.roti,cap:'Roti Bakar Bandung',group:'Lainnya'},
];
const masonryGrid = document.getElementById('masonryGrid');
let galleryVisible=GALLERY.map((_,i)=>i),galleryIndex=0,galleryReturnFocus=null;
GALLERY.forEach((g,index)=>{
  const item = document.createElement('button');
  item.type='button';item.className='gallery-card'+(g.photo?' gallery-outlet':'');
  item.dataset.group=g.group;
  item.setAttribute('aria-label','Perbesar foto '+g.cap);
  item.innerHTML=`<span class="gallery-image"><img src="${g.img}" alt="${g.cap}" loading="lazy" decoding="async" width="640" height="480"><span class="gallery-open" aria-hidden="true">Lihat foto ↗</span></span><span class="gallery-copy"><small>${String(index+1).padStart(2,'0')} / ${g.group}</small><strong>${g.cap}</strong>${g.desc?`<span>${g.desc}</span>`:''}</span>`;
  item.addEventListener('click',()=>{galleryIndex=index;openLightbox(g.img,g.cap);});
  masonryGrid.appendChild(item);
});
document.querySelectorAll('[data-gallery-filter]').forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.galleryFilter;
  galleryVisible=[];
  [...masonryGrid.children].forEach((item,i)=>{
    item.hidden=filter!=='Semua' && item.dataset.group!==filter;
    if(!item.hidden){galleryVisible.push(i);if(!reduceMotion)item.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:280,easing:'ease-out'});}
  });
  document.querySelectorAll('[data-gallery-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  document.getElementById('galleryCount').textContent=galleryVisible.length+' foto';
  masonryGrid.scrollTo({left:0,behavior:'instant'});
  requestAnimationFrame(syncGalleryScroll);
  if(window.ScrollTrigger) ScrollTrigger.refresh();
}));
document.getElementById('galleryCount').textContent=GALLERY.length+' foto';
function syncGalleryScroll(){
  const distance=masonryGrid.scrollWidth-masonryGrid.clientWidth;
  document.getElementById('galleryProgress').style.transform=`scaleX(${distance>0?Math.min(1,.12+.88*masonryGrid.scrollLeft/distance):1})`;
  document.getElementById('galleryPrev').disabled=masonryGrid.scrollLeft<2;
  document.getElementById('galleryNext').disabled=masonryGrid.scrollLeft>=distance-2;
}
function slideGallery(direction){masonryGrid.scrollBy({left:direction*masonryGrid.clientWidth*.75,behavior:reduceMotion?'instant':'smooth'});}
document.getElementById('galleryPrev').addEventListener('click',()=>slideGallery(-1));
document.getElementById('galleryNext').addEventListener('click',()=>slideGallery(1));
let galleryScrollFrame=0;
masonryGrid.addEventListener('scroll',()=>{if(galleryScrollFrame)return;galleryScrollFrame=requestAnimationFrame(()=>{galleryScrollFrame=0;syncGalleryScroll();});},{passive:true});
masonryGrid.addEventListener('keydown',event=>{if(event.target!==masonryGrid)return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();slideGallery(event.key==='ArrowRight'?1:-1);}});
new ResizeObserver(syncGalleryScroll).observe(masonryGrid);
syncGalleryScroll();
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
function openLightbox(src, alt){
  galleryReturnFocus=document.activeElement;
  lightboxImg.src=src;lightboxImg.alt=alt;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');
  const cursor=document.getElementById('cursorRing');
  if(cursor)lightbox.append(cursor);
  document.body.classList.add('gallery-modal-open');
  document.getElementById('lightboxCaption').textContent=alt;
  document.getElementById('lightboxPosition').textContent=(galleryVisible.indexOf(galleryIndex)+1)+' / '+galleryVisible.length;
  document.getElementById('lightboxClose').focus();
}
function closeGallery(){
  lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.classList.remove('gallery-modal-open');
  const cursor=document.getElementById('cursorRing');
  if(cursor)document.body.append(cursor);
  galleryReturnFocus?.focus({preventScroll:true});
}
function moveGallery(direction){
  const index=galleryVisible.indexOf(galleryIndex);galleryIndex=galleryVisible[(index+direction+galleryVisible.length)%galleryVisible.length];
  const g=GALLERY[galleryIndex];lightboxImg.src=g.img;lightboxImg.alt=g.cap;
  document.getElementById('lightboxCaption').textContent=g.cap;
  document.getElementById('lightboxPosition').textContent=(galleryVisible.indexOf(galleryIndex)+1)+' / '+galleryVisible.length;
}
document.getElementById('lightboxClose').addEventListener('click',closeGallery);
document.getElementById('lightboxPrev').addEventListener('click',()=>moveGallery(-1));
document.getElementById('lightboxNext').addEventListener('click',()=>moveGallery(1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeGallery();});
document.addEventListener('keydown',e=>{
  if(!lightbox.classList.contains('open'))return;
  if(e.key==='Escape'){e.preventDefault();closeGallery();}
  if(e.key==='ArrowLeft'){e.preventDefault();moveGallery(-1);}
  if(e.key==='ArrowRight'){e.preventDefault();moveGallery(1);}
  if(e.key==='Tab'){
    const buttons=[...lightbox.querySelectorAll('button')],first=buttons[0],last=buttons.at(-1);
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  }
});

/* ======================================================================
   RENDER: KENAPA PILIH KAMI
   ====================================================================== */
const whyGrid = document.getElementById('whyGrid');
WHY.forEach(w=>{
  const el = document.createElement('div');
  el.className = 'why-card';
  el.innerHTML = `<span class="ico">${w.ico}</span><h3>${w.title}</h3><p>${w.desc}</p>`;
  const wc=document.createElement('div');wc.className='col-12 col-sm-6 col-lg-3';el.style.height='100%';wc.appendChild(el);whyGrid.appendChild(wc);
});

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
const reviewTrack = document.getElementById('reviewTrack');
REVIEWS.forEach(r=>{
  const el = document.createElement('div');
  el.className = 'review-card';
  el.innerHTML = `<div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
    <p class="quote">"${r.quote}"</p>
    <div class="review-who"><b>${r.name}</b><span>${r.item}</span></div>
    <div class="review-source">${r.source==='GoFood'?'<img src="image/icon/gofood-reference.png" alt="GoFood" loading="lazy">':'<span class="tiktok-mark" aria-hidden="true">♪</span>'}<span>Dari <b>${r.source}</b></span></div>`;
  reviewTrack.appendChild(el);
});
document.getElementById('revNext').addEventListener('click', ()=>reviewTrack.scrollBy({left:320, behavior:'smooth'}));
document.getElementById('revPrev').addEventListener('click', ()=>reviewTrack.scrollBy({left:-320, behavior:'smooth'}));

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
if(window.Lenis && !reduce){
  lenis = new Lenis({duration:1.15, smoothWheel:true});
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

  gsap.set(logoWrap, {opacity:0, scale:.4, rotate:-14});
  gsap.set(letters, {opacity:0});
  gsap.set(foodEls, {opacity:0});
  gsap.set('.loader-text', {opacity:0, y:10});

  const tl = gsap.timeline({delay:.1});

  // 1) Logo muncul dengan pop bouncy
  tl.to(logoWrap, {opacity:1, scale:1, rotate:0, duration:.65, ease:'back.out(2.3)'}, 0);

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
  tl.to('.loader-text', {opacity:1, y:0, duration:.5, ease:'power2.out'}, 1.5);

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
  if(!Lo || !bar) return;

  const t0 = performance.now();
  const MIN = reduce ? 300 : 2900;
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
    bar.style.transform = 'scaleX(1)';

    const startIris = ()=>{
      Lo.classList.add('exit');
      // Reveal the hero as the curtain opens, not after a blank final frame.
      revealPage();
      const onEnd = (event)=>{
        if(event.propertyName !== 'clip-path') return;
        Lo.removeEventListener('transitionend', onEnd);
        cleanup();
      };
      Lo.addEventListener('transitionend', onEnd);
      fallbackId = setTimeout(cleanup, 1500);
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
      gsap.to('.loader-inner', {opacity:0, scale:1.14, duration:.4, ease:'power2.in'});
      gsap.to('.loader-text', {opacity:0, y:-10, duration:.3, ease:'power1.in'});
      setTimeout(startIris, 120);
    } else {
      startIris();
    }
  }

  function tick(now){
    const p = Math.min((now - t0) / MIN, 1);
    bar.style.transform = `scaleX(${loaded ? p : Math.min(p,.92)})`;

    if(p >= 1 && loaded){
      finish();
      return;
    }
    rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);
  fallbackId = setTimeout(finish, 7000);
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
  gsap.utils.toArray('.eyebrow,.section-head p,.tentang-copy p,.tentang-stats>div,.menu-tabs,.menu-note,.byo-form fieldset,.review-stats>div,.review-nav,.info-row,.map-art,.cta-section .btn-row,.section-cta-row').forEach(el=>
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
  batch('.gallery-card', {x:0,y:0});
  batch('.masonry-item', {y:40, scale:.94, clipPath:'inset(100% 0% 0% 0%)'});
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
    const isOpen = hour >= 18 && hour < 23;
    document.querySelectorAll('[data-outlet-status]').forEach(el=>{
      el.textContent = isOpen ? '● Buka sekarang · sampai 23.00 WIB' : '● Tutup · buka pukul 18.00 WIB';
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

(function(){
 const section=document.getElementById('build-your-own');
 if('IntersectionObserver' in window){
  let inSection=false,previewVisible=true;
  const sync=()=>{document.body.classList.toggle('racik-mobile-active',inSection&&!previewVisible);document.body.classList.toggle('racik-section-active',inSection);};
  new IntersectionObserver(entries=>{inSection=entries[0].isIntersecting;sync();},{rootMargin:'-100px 0px -120px 0px',threshold:0}).observe(section);
  new IntersectionObserver(entries=>{previewVisible=entries[0].isIntersecting;sync();},{threshold:0}).observe(section.querySelector('.byo-preview'));
 }
})();

/* Soft, synthesized pop feedback on intentional UI clicks; no audio file needed. */
(function(){
 let audio=null,lastPop=0;
 function pop(){
  const now=performance.now();if(now-lastPop<55)return;lastPop=now;
  const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
  audio ||= new Audio();
  const play=()=>{
   const t=audio.currentTime;
   const osc=audio.createOscillator(),gain=audio.createGain();
   osc.type='sine';osc.frequency.setValueAtTime(690,t);osc.frequency.exponentialRampToValueAtTime(390,t+.075);
   gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(.045,t+.006);gain.gain.exponentialRampToValueAtTime(.0001,t+.09);
   osc.connect(gain);gain.connect(audio.destination);osc.start(t);osc.stop(t+.095);
  };
  if(audio.state==='running')play();else audio.resume().then(play).catch(()=>{});
 }
 document.addEventListener('click',e=>{
  if(e.target.closest('button,.kbtn,.menu-tab-btn,.opt-card,.order-platform,.fav-add'))pop();
 },{passive:true});
})();
