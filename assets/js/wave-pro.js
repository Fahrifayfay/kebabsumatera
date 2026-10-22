(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const rng=s=>()=>(s=s*16807%2147483647)/2147483647;
const smooth=p=>{let d=`M${p[0][0]} ${p[0][1]}`;for(let i=0;i<p.length-1;i++){const a=p[i-1]||p[i],b=p[i],c=p[i+1],e=p[i+2]||c;d+=`C${(b[0]+(c[0]-a[0])/6).toFixed(1)} ${(b[1]+(c[1]-a[1])/6).toFixed(1)} ${(c[0]-(e[0]-b[0])/6).toFixed(1)} ${(c[1]-(e[1]-b[1])/6).toFixed(1)} ${c[0]} ${c[1]}`}return d};
function layer(seed){
  const r=rng(seed*977+13),T=900,H=900,d=document.createElement('div');d.className='wl-layer';d.setAttribute('aria-hidden','true');
  const ph=r()*6,ph2=r()*6;
  const band=(y,A,k)=>{const p=[];for(let x=-T;x<=3*T;x+=T/8){const t=x/T*Math.PI*2;p.push([x,y+Math.sin(t*k+ph)*A+Math.sin(t*2*k+ph2)*A*.18])}return smooth(p)+`L${3*T} ${H+300}L${-T} ${H+300}Z`};
  d.innerHTML=`<svg viewBox="0 0 1800 900" preserveAspectRatio="xMidYMid slice"><g class="bg a"><path class="wf a" d="${band(H*.2,48,1)}"/></g><g class="bg b"><path class="wf b" d="${band(H*.52,58,1)}"/></g><g class="bg c"><path class="wf c" d="${band(H*.8,42,1)}"/></g></svg>`;return d;
}
const hosts=[$('#hero'),...$$('.section,.cta-section')];
hosts.forEach((h,i)=>{h._s=i+1;if(i<3)h.prepend(layer(i+1))});

/* HERO */
const hero=$('#hero');
$$('.ing-wrap').forEach(e=>e.remove());
const ripple=document.createElement('div');ripple.className='hero-ripple';ripple.appendChild(layer(1));
const mkRing=()=>{const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('viewBox','0 0 100 100');s.setAttribute('class','hero-ring');s.innerHTML='<circle cx="50" cy="50" r="50"/>';return s};
const r1=mkRing(),r2=mkRing(),halo=document.createElement('div');halo.className='hero-halo';
const giant=$('#heroGiant');
[ripple,r1,r2,halo].forEach(e=>hero.insertBefore(e,giant));
const hls=[];
window.goTo=function(index){
  index=(index+N)%N;
  if(index===currentHero||heroBusy||!document.body.classList.contains('ready')||document.body.classList.contains('intro-play'))return;
  heroBusy=true;const old=currentHero,th=THEME[index];
  const fe=$('.food-slot.active .food-img'),hr=hero.getBoundingClientRect(),fr=fe?fe.getBoundingClientRect():hr;
  const cx=fr.left+fr.width/2-hr.left,cy=fr.top+fr.height/2-hr.top,R=Math.hypot(Math.max(cx,hr.width-cx),Math.max(cy,hr.height-cy))+40;
  ripple.style.background=th.bg;
  const D=1100,E='cubic-bezier(.7,0,.2,1)';
  const a=ripple.animate([{clipPath:`circle(0px at ${cx}px ${cy}px)`},{clipPath:`circle(${R}px at ${cx}px ${cy}px)`}],{duration:D,easing:E,fill:'forwards'});
  [[r1,0,1],[r2,150,.55]].forEach(([r,dl,op])=>{r.style.left=cx+'px';r.style.top=cy+'px';r.animate([{transform:'translate(-50%,-50%) scale(0)',opacity:op},{transform:`translate(-50%,-50%) scale(${R/50})`,opacity:op}],{duration:D,delay:dl,easing:E})});
  ['giant','slot','text'].forEach(k=>{const o=L[k][old];o.classList.remove('active');o.classList.add('leaving');setTimeout(()=>o.classList.remove('leaving'),700)});
  
  L.dot[old].classList.remove('active');
  setTimeout(()=>{['giant','slot','text','dot'].forEach(k=>L[k][index].classList.add('active'))},380);
  hero.style.setProperty('--ink',th.ink);setPrice(index);
  $('#heroCurrent').textContent=String(index+1).padStart(2,'0');
  currentHero=index;
  setTimeout(()=>{setTheme(index);a.cancel();heroBusy=false},D);
};

/* VELOCITY + drift wave */
// Read geometry together, then write. Idle drift only touches the wave SVG,
// not inherited CSS properties on the entire section/document every frame.
const vis=new Set(),positions=new WeakMap(),waveNodes=new WeakMap();
const motionTargets=new WeakMap(),bandTargets=new WeakMap();
const mobileMotion=matchMedia('(max-width:820px), (hover:none)');
function cacheMotionTargets(){
  hosts.forEach(h=>{
    const selector=mobileMotion.matches?'.review-card,.why-card,.order-platform':'.section-head h2,.fav-card img,.gallery-image img,.promo-poster,.tentang-art img,.review-card,.why-card,.order-platform';
    motionTargets.set(h,[...h.querySelectorAll(selector+',.vb span')]);
    bandTargets.set(h,[...h.querySelectorAll('.vb span')]);
  });
}
mobileMotion.addEventListener('change',()=>{cacheMotionTargets();geometryDirty=true;wakeWave();});
let scrollProgress=null;
let waveFrame=0,geometryDirty=true,last=scrollY,sv=0,lastVelocity='',lastProgress='';
hosts.forEach(h=>waveNodes.set(h,[...h.querySelectorAll(':scope > .wl-layer > svg')]));
function wakeWave(){if(!waveFrame&&!document.hidden)waveFrame=requestAnimationFrame(tick);}
const io=new IntersectionObserver(es=>{es.forEach(e=>e.isIntersecting?vis.add(e.target):vis.delete(e.target));geometryDirty=true;wakeWave();},{rootMargin:'120px'});
hosts.forEach(h=>io.observe(h));
const hlio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('hl-in');hlio.unobserve(e.target)}}),{threshold:.35});
$$('.section-head,.tentang-copy').forEach(e=>hlio.observe(e));
const track=$('.flavor-track');let trackAnimation=null,lastRate=1;
function tick(t){
  waveFrame=0;if(document.hidden)return;
  const y=scrollY,scrolled=y!==last,measure=geometryDirty||scrolled;
  sv+=(Math.max(-1,Math.min(1,(y-last)/55))-sv)*.1;last=y;
  if(Math.abs(sv)<.001)sv=0;
  // All layout reads precede any style writes.
  const rows=[...vis].map(h=>({h,top:measure?h.getBoundingClientRect().top:positions.get(h)||0}));
  const max=measure?document.documentElement.scrollHeight-innerHeight:0;
  if(measure){
    const progress=max>0?Math.min(1,y/max).toFixed(4):'0';
    if(progress!==lastProgress){scrollProgress=scrollProgress||$('.sp i');if(scrollProgress)scrollProgress.style.transform=`scaleX(${progress})`;lastProgress=progress;}
  }
  const velocity=reduce?'0':sv.toFixed(3);
  rows.forEach(({h,top})=>{
    // Set scroll variables only on their consumers, never on a section whose
    // hundreds of descendants would all inherit and recalculate them.
    if(measure){positions.set(h,top);(bandTargets.get(h)||[]).forEach(e=>e.style.setProperty('--bx',(top*.5).toFixed(1)));}
    if(geometryDirty||velocity!==lastVelocity)(motionTargets.get(h)||[]).forEach(e=>e.style.setProperty('--sv',velocity));
    const x=reduce?0:Math.sin(t/7000+h._s)*16-sv*35;
    (waveNodes.get(h)||[]).forEach(svg=>svg.style.transform=`translate3d(${x.toFixed(2)}px,${(top*.03).toFixed(1)}px,0)`);
  });
  lastVelocity=velocity;geometryDirty=false;
  if(track&&!reduce){
    const rate=+(1+Math.abs(sv)*5).toFixed(2);
    if(rate!==lastRate){trackAnimation=trackAnimation||track.getAnimations()[0];trackAnimation?.updatePlaybackRate(rate);lastRate=rate;}
  }
  if(sv!==0||(!reduce&&rows.some(({h})=>waveNodes.get(h)?.length)))wakeWave();
}
addEventListener('scroll',wakeWave,{passive:true});
addEventListener('resize',()=>{geometryDirty=true;wakeWave();},{passive:true});
new ResizeObserver(()=>{geometryDirty=true;wakeWave();}).observe(document.body);
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(waveFrame);waveFrame=0;}else{geometryDirty=true;last=scrollY;wakeWave();}});
wakeWave();
const rio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rio.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
function tag(){
  cacheMotionTargets();
  const FROM={'.promo-art':{x:100,y:0,rotate:6},'.tentang-art':{x:-100,y:0,rotate:-6},'.gallery-card':{y:90,scale:.9},'.fav-card':{y:80,scale:.92,rotate:-2},'.tentang-stats>div':{y:50,scale:.8},'.why-card':{y:70,scale:.92}};
  const G=['.promo-copy>:not(h2)','.promo-art','.tentang-art','.tentang-copy>:not(h2)','.tentang-stats>div','.gallery-toolbar','.gallery-card','.fav-card','.why-card','.step-item','.section-head>:not(h2)'];
  const useGS=!!(window.gsap&&window.ScrollTrigger)&&!reduce,pending=[],cnt=new WeakMap();
  const add=(el,sel)=>{if(el._rv)return;el._rv=1;
    if(useGS){const f=Object.assign({x:0,y:60,scale:.94,rotate:0},FROM[sel]||{});if(el.closest('footer'))f.y=0;el.setAttribute('data-gs','');gsap.set(el,Object.assign({opacity:0},f));pending.push(el)}
    else{el.classList.add('rv');const p=el.parentElement,n=cnt.get(p)||0;cnt.set(p,n+1);el.style.setProperty('--i',Math.min(n,7));rio.observe(el)}};
  G.forEach(s=>$$(s).forEach(el=>add(el,s)));
  $$('section:not(#hero) .wrap>*,footer .wrap>*,.footer-grid>*').forEach(el=>{
    if(el._rv||el.classList.contains('section-head')||el.matches('.vb,.wl-layer,.rv-layout,.help-layout'))return;
    if(el.closest('.rv,[data-gs],[data-reveal],[data-reveal-item],[data-reveal-group],.rv-pre')||el.querySelector('.rv,[data-gs],[data-reveal]'))return;
    add(el,'')});
  if(pending.length){const els=pending.splice(0);ScrollTrigger.batch(els,{start:'top 92%',once:true,batchMax:6,onEnter:b=>{b.forEach(e=>e.classList.add('in'));gsap.to(b,{opacity:1,x:0,y:0,scale:1,rotate:0,duration:1.15,ease:'power3.out',stagger:.13,overwrite:true,clearProps:'transform,opacity'})}})}
}
tag();[500,1500,3000,5000].forEach(t=>setTimeout(tag,t));
/* failsafe: tidak ada elemen yang tertinggal tersembunyi */
const refreshST=()=>{try{window.ScrollTrigger&&ScrollTrigger.refresh()}catch(e){}};
addEventListener('load',()=>{setTimeout(refreshST,1200);setTimeout(refreshST,3500)});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>setTimeout(refreshST,300));
setInterval(()=>{
  $$('.rv:not(.in)').forEach(e=>{const r=e.getBoundingClientRect();if(r.top<innerHeight*.95&&r.bottom>-40)e.classList.add('in')});
  if(window.gsap)$$('[data-reveal],[data-gs]').forEach(e=>{if(e.style.opacity==='0'){const r=e.getBoundingClientRect();if(r.top<innerHeight*.9&&r.bottom>0)gsap.to(e,{opacity:1,x:0,y:0,scale:1,rotate:0,duration:.9,ease:'power3.out',clearProps:'transform,opacity',overwrite:true})}});
},1100);

/* VELOCITY BAND per section */
const W={promo:'PROMO ✦ HEMAT ✦ BAYAR 1 DAPAT 2 ✦ ','menu-favorit':'KEBAB ✦ BURGER ✦ LUMPIA ✦ ROTI BAKAR ✦ '};
$$('.section,.cta-section').forEach((s,i)=>{const w=W[s.id];if(!w)return;const v=document.createElement('div');v.className='vb';v.setAttribute('aria-hidden','true');v.innerHTML='<span class="vb-a">'+w.repeat(9)+'</span><span class="vb-b">'+w.repeat(9)+'</span>';s.style.setProperty('--dir',i%2?1:-1);s.insertBefore(v,s.children[1])});
cacheMotionTargets();
/* SPLIT KATA + MARK */
function split(n,c){[...n.childNodes].forEach(k=>{if(k.nodeType===3){const f=document.createDocumentFragment();k.textContent.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(' '));return}const w=document.createElement('span');w.className='w';const x=document.createElement('span');x.className='wi';x.style.setProperty('--w',c.i++);x.textContent=t;w.appendChild(x);f.appendChild(w)});k.replaceWith(f)}else if(k.nodeType===1&&k.tagName!=='BR')split(k,c)})}
const sio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const h=e.target;sio.unobserve(h);const ws=$$('.wi',h);if(window.gsap){gsap.fromTo(ws,{y:'118%',rotate:7},{y:'0%',rotate:0,duration:1.1,ease:'power4.out',stagger:.055,onComplete:()=>{h.classList.add('in');gsap.set(ws,{clearProps:'transform'})}})}else h.classList.add('in')}),{threshold:.3});
$$('.section-head h2,.tentang-copy h2,.promo-copy h2,.cta-section h2').forEach(h=>{
  if(reduce)return;
  // script.js already owns the word reveal. Keep the same final word masks,
  // but never animate a second transform inside its moving .swi elements.
  const owned=!!h.querySelector('.swi');
  split(h,{i:0});h.classList.add('sw');
  if(owned){h.classList.add('in');return;}
  sio.observe(h);
});
const KW=/(Kebab Spesial|kebab|burger|lumpia|roti bakar|GoFood|GrabFood|TikTok|18\.00–23\.00 WIB|promo)/i;
$$('.section-head p,.tentang-copy p,.promo-desc,.cta-desc').forEach(p=>{if(p.children.length)return;p.innerHTML=p.textContent.replace(KW,'<mark class="hlm">$1</mark>')});

/* REVIEW: kartu bergerak + rating interaktif */
function reviews(){
  const track=$('#reviewTrack');if(!track||!$('.rv-card',track))return setTimeout(reviews,250);
  if(track._m)return;track._m=1;
  const sum=$('.rv-summary');if(!sum||$('.rv-rate',sum))return;
  const T=['','Kurang puas','Lumayan','Oke juga','Enak banget!','Mantap, juara!'];
  const b=document.createElement('div');b.className='rv-rate';
  b.innerHTML='<p class="rv-rate-t">Kasih rating kamu</p><div class="rv-rate-stars" role="radiogroup" aria-label="Beri rating">'+[1,2,3,4,5].map(n=>`<button type="button" role="radio" aria-checked="false" aria-label="${n} bintang" data-n="${n}">★</button>`).join('')+'</div><p class="rv-rate-l" aria-live="polite">Ketuk bintang untuk menilai</p>';
  $('.rv-caption',sum).after(b);
  const bs=$$('button',b),lab=$('.rv-rate-l',b);let cur=0;try{cur=+localStorage.getItem('ks_rate')||0}catch(e){}
  const paint=n=>bs.forEach((s,i)=>s.classList.toggle('on',i<n));
  const score=()=>{if(!cur)return;const avg=(20+cur)/5,[i,d]=avg.toFixed(1).split('.');$('.rv-score strong',sum).innerHTML=`${i}<small>.${d}</small>`;$('.rv-caption',sum).innerHTML='Rata-rata dari <b>5 ulasan</b> pilihan pelanggan.'};
  const set=(n,fx)=>{cur=n;paint(n);bs.forEach((s,i)=>s.setAttribute('aria-checked',i+1===n));lab.textContent=T[n]+' · terima kasih!';score();try{localStorage.setItem('ks_rate',n)}catch(e){}
    if(fx){const t=bs[n-1];bs.slice(0,n).forEach((s,i)=>{s.classList.remove('pop');void s.offsetWidth;s.style.setProperty('--d',i*70+'ms');s.classList.add('pop')});
      const r=t.getBoundingClientRect(),p=b.getBoundingClientRect();for(let i=0;i<10;i++){const e=document.createElement('i');e.className='rv-spark';e.textContent='✦';e.style.left=r.left-p.left+r.width/2+'px';e.style.top=r.top-p.top+r.height/2+'px';b.appendChild(e);const a=i/10*6.283,d=36+Math.random()*30;e.animate([{transform:'translate(-50%,-50%) scale(.4)',opacity:1},{transform:`translate(calc(-50% + ${Math.cos(a)*d}px),calc(-50% + ${Math.sin(a)*d}px)) scale(1.1)`,opacity:0}],{duration:750,easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish=()=>e.remove()}}};
  bs.forEach((s,i)=>{s.addEventListener('mouseenter',()=>{paint(i+1);lab.textContent=T[i+1]});s.addEventListener('focus',()=>{paint(i+1);lab.textContent=T[i+1]});s.addEventListener('click',()=>set(i+1,true))});
  b.addEventListener('mouseleave',()=>{paint(cur);lab.textContent=cur?T[cur]+' · terima kasih!':'Ketuk bintang untuk menilai'});
  if(cur)set(cur,false);
}
reviews();

/* PILIHAN PESAN + FAB + PROGRESS */
{
const sp=document.createElement('div');sp.className='sp';sp.setAttribute('aria-hidden','true');sp.innerHTML='<i></i>';document.body.appendChild(sp);
const _bag='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>';
const _chev='<svg class="op-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
/* pilihan pesan: lihat assets/js/mobile-ui.js */
}

/* KURSOR: ring berubah putih di area merah/oranye/gelap */
{const ring=document.getElementById('cursorRing');
if(ring)addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const t=e.target;ring.classList.toggle('ring-light',!!(t&&t.closest&&t.closest('#hero,#tentang,#bantuan,.cta-section,.promo-section,.os-bd,.footer,.site-footer,footer,.loader')))},{passive:true})}

/* ANIMASI BANTUAN (GSAP) */
function helpAnim(){
  const lay=$('#bantuan .help-layout');if(!lay||!window.gsap||reduce)return;
  const items=$$('.help-item',lay),ns=$$('.hn',lay),bell=$('.hn-bell',lay),head=$('.hn-head',lay),rest=[$('.hn-cta',lay),$('.hn-note',lay)].filter(Boolean);
  [...items,...ns,head,...rest].forEach(e=>e.setAttribute('data-gs',''));
  gsap.set(items,{opacity:0,x:-70,y:24,rotate:-1.6,scale:.97});
  gsap.set(head,{opacity:0,y:-20});
  gsap.set(ns,{opacity:0,y:-60,scale:.9,rotate:()=>gsap.utils.random(-3,3)});
  gsap.set(rest,{opacity:0,y:24});
  const play=()=>{
    gsap.to(items,{opacity:1,x:0,y:0,rotate:0,scale:1,duration:1.15,ease:'expo.out',stagger:.11,clearProps:'transform'});
    const tl=gsap.timeline({delay:.35});
    tl.to(head,{opacity:1,y:0,duration:.6,ease:'power3.out'})
      .fromTo(bell,{rotate:-25,scale:.6},{rotate:0,scale:1,duration:.9,ease:'elastic.out(1,.4)'},0)
      .to(ns,{opacity:1,y:0,scale:1,rotate:0,duration:.85,ease:'back.out(1.5)',stagger:.55,clearProps:'transform',onComplete:()=>{ns.forEach(n=>n.classList.add('idle'));bell.classList.add('ring')}},.3)
      .to(rest,{opacity:1,y:0,duration:.7,ease:'power3.out',stagger:.12,clearProps:'transform'},'-=.4');
  };
  if(window.ScrollTrigger)ScrollTrigger.create({trigger:lay,start:'top 80%',once:true,onEnter:play});else play();
}
helpAnim();
})();
