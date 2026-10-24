(function(){
  var sec=document.getElementById('dapur');
  if(!sec)return;
  if(!('IntersectionObserver' in window)){sec.classList.add('is-live');return;}
  new IntersectionObserver(function(es){
    es.forEach(function(e){sec.classList.toggle('is-live',e.isIntersecting);});
  },{threshold:.25}).observe(sec);
})();
