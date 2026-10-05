/* One catalog powers favorites, search, product details and order links. */
(() => {
  const all = Object.values(FULL_MENU).flatMap(category => category.items);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealObserver = !reduced && 'IntersectionObserver' in window
    ? new IntersectionObserver(entries=>entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }),{threshold:.08,rootMargin:'0px 0px 60px 0px'})
    : null;
  const tabs = document.getElementById('menuTabs');
  const panels = document.getElementById('menuPanels');
  const search = document.getElementById('menuSearch');
  const sort = document.getElementById('menuSort');
  let selected = 'all', activeItem, quantity = 1, opener;
  const decorations = key => key === 'extra' ? [] : key === 'roti' ? [SPR.chocA, SPR.cheeseB] : [ING.lettuce2, ING.tomato2];
  const photo = item => item.img
    ? `<img class="dish-photo" src="${item.img}" alt="${item.name}${item.illustration?' — ilustrasi':''}" loading="lazy" decoding="async" width="420" height="320">`
    : `<span class="dish-no-photo"><svg class="ks-icon" aria-hidden="true"><use href="#icon-food"/></svg><span>${item.name}</span></span>`;
  function artwork(item) {
    return `<span class="dish-art art-${item.category}">${decorations(item.category).map((src,i)=>`<img class="dish-ingredient ingredient-${i}" src="${src}" alt="" loading="lazy" width="70" height="70">`).join('')}${photo(item)}</span>`;
  }
  function card(item, favorite=false) {
    const article = document.createElement('article');
    article.className = 'dish-card'+(favorite?' favorite-dish':'');
    article.innerHTML = `<button type="button" class="dish-inspect" aria-label="Lihat detail ${item.name}">${artwork(item)}<span class="dish-view">Lihat isian <span aria-hidden="true">↗</span></span></button><div class="dish-copy"><span class="dish-category">${item.cat}${favorite?' / Pilihan favorit':''}</span><h3><button type="button" class="dish-title">${item.name}</button></h3><p class="dish-note">${item.note}</p><div class="dish-bottom"><strong>${item.views?"Mulai ":""}${formatRupiah(item.price)}</strong><button type="button" class="dish-order" aria-label="Pilih ${item.name}">Pilih <span aria-hidden="true">+</span></button></div></div>`;
    article.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>openDetail(item,button)));
    if(revealObserver){
      article.classList.add('is-entering');
      article.style.setProperty('--reveal-delay',`${Math.min(item.category==='kebab'?Number(item.id.split('-')[1])%4:0,3)*55}ms`);
      revealObserver.observe(article);
    }
    return article;
  }
  const favorites = document.getElementById('favoritGrid');
  if(favorites){
    favorites.className = 'dish-grid favorite-grid';
    FAVORIT.forEach(item=>favorites.append(card(item,true)));
  }

  const categories = [['all','Semua',all.length],...Object.entries(FULL_MENU).map(([key,value])=>[key,value.label,value.items.length])];
  if(tabs)categories.forEach(([key,label,count])=>{
    const button = document.createElement('button');
    button.type='button'; button.className='menu-tab-btn';button.dataset.category=key;
    button.setAttribute('aria-pressed',String(key===selected));
    button.innerHTML=`${label}<span>${count}</span>`;
    button.addEventListener('click',()=>{selected=key;render();});
    tabs.append(button);
  });
  function render() {
    const query=search.value.trim().toLocaleLowerCase('id');
    const items=all.filter(item=>(selected==='all'||item.category===selected)&&[item.name,item.desc,item.cat].join(' ').toLocaleLowerCase('id').includes(query));
    if(sort.value!=='default')items.sort((a,b)=>sort.value==='low'?a.price-b.price:b.price-a.price);
    tabs.querySelectorAll('button').forEach(button=>{
      const on=button.dataset.category===selected;
      button.setAttribute('aria-pressed',String(on));button.classList.toggle('active',on);
    });
    panels.replaceChildren();
    const grid=document.createElement('div');grid.className='dish-grid';
    items.forEach(item=>grid.append(card(item)));panels.append(grid);
    document.getElementById('menuResultCount').textContent=items.length+' menu'+(selected==='all'?' untuk semua selera':' '+FULL_MENU[selected].label);
    if(!items.length){
      const empty=document.createElement('div');empty.className='menu-empty';
      empty.innerHTML='<h3>Belum ketemu yang kamu cari.</h3><p>Coba kata lain atau lihat semua menu.</p><button type="button">Tampilkan semua menu</button>';
      empty.querySelector('button').addEventListener('click',()=>{search.value='';selected='all';sort.value='default';render();search.focus();});panels.append(empty);
    }
    if(!reduced)grid.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:260,easing:'ease-out'});
    if(window.ScrollTrigger)ScrollTrigger.refresh();
  }
  if(panels){
    search.addEventListener('input',render);sort.addEventListener('change',render);
    document.getElementById('menuNote').textContent='Harga per porsi. Foto lumpia merupakan ilustrasi; pilihan isian mengikuti nama menu.';
  }

  const dialog=document.createElement('dialog');dialog.className='dish-dialog';dialog.setAttribute('aria-labelledby','dishDialogTitle');dialog.setAttribute('data-lenis-prevent','');
  dialog.innerHTML='<button type="button" class="dish-close" aria-label="Tutup detail menu">×</button><div id="dishDialogArt"></div><div class="dish-dialog-copy"><span class="dish-category" id="dishDialogCategory"></span><h2 id="dishDialogTitle"></h2><p id="dishDialogDesc"></p><div class="dish-includes" id="dishDialogIngredients"></div><div class="dish-dialog-footer"><div><small>Harga per porsi</small><strong id="dishDialogPrice"></strong></div><div class="dish-quantity"><button type="button" id="dishMinus" aria-label="Kurangi jumlah">−</button><output id="dishQuantity" aria-live="polite">1</output><button type="button" id="dishPlus" aria-label="Tambah jumlah">+</button></div></div><a class="dish-checkout" id="dishCheckout" target="_blank" rel="noopener">Pesan via WhatsApp <span id="dishTotal"></span></a><p class="dish-order-note" id="dishOrderNote"></p></div>';
  document.body.append(dialog);
  const byId=id=>document.getElementById(id);
  function updateQuantity(){
    byId('dishQuantity').textContent=quantity;byId('dishMinus').disabled=quantity<=1;byId('dishPlus').disabled=quantity>=99;
    byId('dishTotal').textContent=formatRupiah(activeItem.price*quantity);
    byId('dishCheckout').href=waLink(`Halo Kebab Sumatera, saya mau pesan ${quantity} porsi ${activeItem.name}. Harga per porsi ${formatRupiah(activeItem.price)}, total ${formatRupiah(activeItem.price*quantity)}.`);
  }
  function openDetail(item,trigger){
    activeItem=item;quantity=1;opener=trigger;
    byId('dishDialogArt').innerHTML=artwork(item);
    byId('dishDialogCategory').textContent=item.cat;
    byId('dishDialogTitle').textContent=item.name;
    byId('dishDialogDesc').textContent=item.desc;
    byId('dishDialogPrice').textContent=formatRupiah(item.price);
    byId('dishOrderNote').textContent='Pesanan dan ketersediaan dikonfirmasi lewat WhatsApp.';
    const ingredients=byId('dishDialogIngredients');ingredients.replaceChildren();
    const matching=[['Sayuran',ING.lettuce1,/sayuran|sayur/i],['Ayam','image/komponen/ayam.webp',/ayam|chicken/i],['Sapi',ING.meatchunk,/sapi/i],['Keju',ING.cheese1,/keju/i],['Daging slice','image/komponen/daging slice.webp',/daging slice/i],['Nugget','image/komponen/nugget.webp',/nugget/i]];
    matching.filter(([, ,pattern])=>pattern.test(item.desc)).forEach(([name,src])=>{
      const ingredient=document.createElement('span');ingredient.innerHTML=`<img src="${src}" alt="" width="36" height="36">${name}`;ingredients.append(ingredient);
    });
    if(item.views){
      const gallery=document.createElement('div');gallery.className='bread-view-picker';
      gallery.setAttribute('role','group');gallery.setAttribute('aria-label','Pilih isian roti bakar');
      item.views.forEach(view=>{
        const button=document.createElement('button');button.type='button';button.dataset.view=view.label;
        button.innerHTML=`<img src="${view.img}" alt="" width="80" height="60"><span>${view.label}</span>`;
        button.addEventListener('click',()=>selectView(view));gallery.append(button);
      });
      byId('dishDialogArt').append(gallery);
      function selectView(view){
        activeItem={...item,name:item.name+' · '+view.label,price:view.price};
        const photo=byId('dishDialogArt').querySelector('.dish-photo');photo.src=view.img;photo.alt=activeItem.name;
        byId('dishDialogArt').querySelector('.ingredient-0').hidden=!view.label.startsWith('Coklat');
        byId('dishDialogArt').querySelector('.ingredient-1').hidden=!view.label.includes('Keju');
        byId('dishDialogPrice').textContent=formatRupiah(view.price);
        byId('dishDialogDesc').textContent=`Isian ${view.label.toLowerCase()}. Pilih tampilan lainnya untuk mengganti isian pesananmu.`;
        ingredients.innerHTML=`<span>Rasa: ${view.label}</span>`;
        gallery.querySelectorAll('button').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.view===view.label)));
        if(!reduced)photo.animate([{opacity:.3,transform:'scale(.94)'},{opacity:1,transform:'scale(1)'}],{duration:300,easing:'ease-out'});
        updateQuantity();
      }
      selectView(item.views.find(view=>view.img===item.img)||item.views[0]);
    }
    updateQuantity();dialog.showModal();document.body.classList.add('dish-modal-open');
    const cursor=document.getElementById('cursorRing');
    if(cursor)dialog.append(cursor);
    if(typeof lenis!=='undefined'&&lenis)lenis.stop();
    dialog.querySelector('.dish-close').focus();
  }
  byId('dishMinus').addEventListener('click',()=>{quantity=Math.max(1,quantity-1);updateQuantity();});
  byId('dishPlus').addEventListener('click',()=>{quantity=Math.min(99,quantity+1);updateQuantity();});
  dialog.querySelector('.dish-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{
    document.body.classList.remove('dish-modal-open');
    const cursor=document.getElementById('cursorRing');
    if(cursor)document.body.append(cursor);
    if(typeof lenis!=='undefined'&&lenis)lenis.start();opener?.focus({preventScroll:true});
  });
  if(panels)render();
})();
