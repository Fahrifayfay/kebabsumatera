/* Shared static outlet links. Empty config values stay visible as placeholders. */
function siteIcon(name) {
  return `<svg class="ks-icon" viewBox="0 0 16 16" aria-hidden="true"><use href="assets/icons/bootstrap.svg#icon-${name}"/></svg>`;
}
function platformMark(name) {
  return ['gofood','grabfood'].includes(name)
    ? `<img class="platform-mark" src="image/icon/${name}-reference.png" alt="" width="40" height="40" loading="lazy">`
    : siteIcon(name==='maps'?'pin':name);
}
function platformActions() {
  return [['gofood','Pesan di GoFood'],['grabfood','Pesan di GrabFood'],['tiktok','Lihat TikTok'],['maps','Kunjungi Outlet']].map(([key,label])=>`<a class="platform-action platform-${key}" data-platform="${key}">${platformMark(key)}<span>${label}</span>${siteIcon('arrow')}</a>`).join('');
}
function applySiteLinks(root=document) {
  root.querySelectorAll('[data-platform]').forEach(link=>{
    const url=SITE.links[link.dataset.platform];
    if(url && /^https:\/\//.test(url)){
      link.href=url;link.target='_blank';link.rel='noopener noreferrer';
      link.removeAttribute('aria-disabled');link.removeAttribute('title');link.querySelector('.link-pending')?.remove();
    }else{
      link.removeAttribute('href');link.setAttribute('aria-disabled','true');
      link.title='Tautan outlet akan segera tersedia';
      if(!link.querySelector('.link-pending'))link.insertAdjacentHTML('beforeend','<small class="link-pending">Segera tersedia</small>');
    }
  });
}
document.querySelectorAll('[data-platform-grid]').forEach(grid=>{
  grid.innerHTML=[['gofood','GoFood','Favoritmu, diantar ke rumah.','Pesan di GoFood'],['grabfood','GrabFood','Temukan menu di outlet kami.','Pesan di GrabFood'],['tiktok','TikTok','Promo & cerita di balik gerobak.','Lihat TikTok'],['instagram','Instagram','Ikuti kabar terbaru dari kami.','Lihat Instagram']].map(([key,name,desc,label],i)=>`<a class="social-card social-${key}" data-platform="${key}"><span class="social-top"><span class="social-logo">${platformMark(key)}</span><span class="social-index">0${i+1}</span></span><strong>${name}</strong><p>${desc}</p><span class="social-link">${label}${siteIcon('arrow')}</span></a>`).join('');
});
applySiteLinks();
const siteToast=document.createElement('div');siteToast.className='site-toast';siteToast.setAttribute('role','status');document.body.append(siteToast);
let toastTimer;
function showSiteToast(message){clearTimeout(toastTimer);siteToast.textContent=message;siteToast.classList.add('visible');toastTimer=setTimeout(()=>siteToast.classList.remove('visible'),3500);}
document.getElementById('copyAddress')?.addEventListener('click',async()=>{
  try{
    if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(SITE.address);
    else {
      const field=document.createElement('textarea');field.value=SITE.address;field.style.cssText='position:fixed;left:-9999px';document.body.append(field);field.select();
      const copied=document.execCommand('copy');field.remove();if(!copied)throw new Error('Clipboard unavailable');
    }
    showSiteToast('Alamat berhasil disalin. Sampai ketemu di outlet!');
  }catch{showSiteToast('Belum bisa menyalin otomatis. Pilih dan salin teks alamat di atas.');}
});
// Fail-safe: an unrelated script or failed image must never trap the visitor.
setTimeout(()=>{document.getElementById('loader')?.remove();document.body.classList.add('ready');},13000);
