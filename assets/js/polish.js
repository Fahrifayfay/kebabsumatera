(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const catalog=document.body.classList.contains('menu-page');
  const destinations=[['hero','home','Beranda'],['menu-favorit','food','Menu'],['tentang','info','Tentang'],['galeri','gallery','Galeri'],['lokasi','pin','Kontak']];
  const dock=document.createElement('nav');dock.className='mobile-dock';dock.setAttribute('aria-label','Navigasi bawah');
  dock.innerHTML=destinations.map(([id,icon,label],i)=>`<a href="${catalog?(i===1?'menu.html':'index.html#'+id):'#'+id}"${i===(catalog?1:0)?' aria-current="page"':''}>${siteIcon(icon)}<span>${label}</span></a>`).join('');
  dock.style.setProperty('--active-index',catalog?1:0);document.body.append(dock);
  if(!catalog){
    const links=[...dock.querySelectorAll('a')];
    links.forEach(link=>link.addEventListener('click',e=>{
      const target=document.querySelector(link.hash);if(!target)return;e.preventDefault();
      if(typeof lenis!=='undefined' && lenis)lenis.scrollTo(target,{offset:-45});
      else target.scrollIntoView({behavior:reduced?'instant':'smooth'});
      history.replaceState(null,'',link.hash);
    }));
    let queued=false;
    function activeSection(){queued=false;let active=0;const marker=innerHeight*.38;destinations.forEach(([id],i)=>{if(document.getElementById(id).getBoundingClientRect().top<=marker)active=i;});dock.style.setProperty('--active-index',active);links.forEach((link,i)=>{if(i===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}
    window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(activeSection);}},{passive:true});window.addEventListener('resize',activeSection);activeSection();
  }
  // Two identical path periods make the animated horizontal join seamless.
  const path='M0 40C120 70 200 0 320 28S520 74 640 36S830 8 960 40C1080 70 1160 0 1280 28S1480 74 1600 36S1790 8 1920 40V100H0Z';
  const edges=[['promo','#fff9e9'],['menu-favorit','#ee4932'],['tentang','#f5ce48'],['galeri','#fff9e9'],['bantuan','#f7e1b2'],['cara-pesan','#2d2118'],['review','#fff9e9'],['lokasi','#f5ce48']];
  edges.forEach(([id,color])=>{
    const section=document.getElementById(id);if(!section)return;section.classList.add('has-edge');
    const edge=document.createElement('div');edge.className='organic-edge';edge.setAttribute('aria-hidden','true');edge.style.setProperty('--edge-color',color);
    edge.innerHTML=`<svg class="wave-echo" viewBox="0 0 1920 100" preserveAspectRatio="none"><path d="${path}"/></svg><svg viewBox="0 0 1920 100" preserveAspectRatio="none"><path d="${path}"/></svg>`;section.append(edge);
  });
  if('IntersectionObserver' in window){
    const waves=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('motion-offscreen',!entry.isIntersecting)),{rootMargin:'100px'});
    document.querySelectorAll('.has-edge').forEach(el=>waves.observe(el));
    if(!reduced){
      const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'none'}],{duration:750,delay:Number(entry.target.dataset.revealDelay||0),easing:'cubic-bezier(.22,1,.36,1)'});reveal.unobserve(entry.target);}),{threshold:.12});
      document.querySelectorAll('.social-card,.rating-summary,.outlet-map-card,.review-intro h2').forEach((el,i)=>{el.dataset.revealDelay=String((i%4)*60);reveal.observe(el);});
    }
  }
})();
