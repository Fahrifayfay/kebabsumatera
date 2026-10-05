/* Shared product data for the homepage and menu page. */

const LOGO="image/icon/logo.webp";

const CONFIG = {
  whatsapp: "6282360422229", // WhatsApp outlet
};
function waLink(message){
  return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(message);
}

const IMG = {
  kebab: "image/model/kebabspesialmix.webp",
  burger: "image/model/burgersapikeju.webp",
  lumpia: "image/model/lumpia.webp",
  roti: "image/rasaroti/coklatkeju.webp",
};
const ING = {
  tortilla1: "image/komponen/tortilla1.png",
  tortilla2: "image/komponen/tortilla2.png",
  lettuce1: "image/komponen/lettuce1.png",
  lettuce2: "image/komponen/lettuce2.png",
  tomato1: "image/komponen/tomato1.png",
  tomato2: "image/komponen/tomato2.webp",
  tomatowedge: "image/komponen/tomatowedge.webp",
  onionred: "image/komponen/onionred.png",
  onionwhite: "image/komponen/onionred.png",
  cheese1: "image/komponen/cheese1.png",
  cheese2: "image/komponen/cheese2.png",
  meatchunk: "image/komponen/meatchunk.png",
  ketchup: "image/komponen/tomatowedge.webp",
  mayo: "image/komponen/mayo.webp",
  crumble: "image/komponen/crumble.png",
  wortel: "image/komponen/wortel.webp",
};

const EXTRA_TOPPING_PRICE = 2000;
const FULL_MENU = {
  kebab: { label:"🌯 Kebab", items:[
    {name:"Kebab Telur Daging", price:10000},
    {name:"Kebab Daging Slice", price:12000},
    {name:"Kebab Sosis Telur", price:13000},
    {name:"Kebab Daging Crispy", price:14000},
    {name:"Kebab Sumatera Ayam", price:15000},
    {name:"Kebab Sumatera Sapi", price:18000},
    {name:"Kebab Fried Chicken", price:18000},
    {name:"Kebab Sumatera Spesial", price:20000},
    {name:"Kebab Sumatera Spesial Ayam", price:23000},
    {name:"Kebab Sumatera Spesial Sapi", price:25000},
    {name:"Kebab Sumatera Spesial Mix", price:30000},
  ]},
  burger: { label:"🍔 Burger", items:[
    {name:"Burger Telur Daging", price:8000},
    {name:"Burger Daging Slice", price:10000},
    {name:"Burger Sosis", price:10000},
    {name:"Burger Daging Crispy", price:12000},
    {name:"Burger Sumatera Ayam", price:12000},
    {name:"Burger Sumatera Sapi", price:13000},
    {name:"Burger Ayam Keju", price:15000},
    {name:"Burger Sapi Keju", price:16000},
  ]},
  lumpia: { label:"🥟 Lumpia", items:[
    {name:"Lumpia Ayam", price:13000},
    {name:"Lumpia Sapi", price:15000},
  ]},
  roti: { label:"🍞 Roti Bakar Bandung", items:[
    {name:"Roti Bakar Bandung", price:20000},
  ]},
};


// Product photography lives with its category; hero models and ingredients stay separate.
const MENU_DETAILS = {
 kebab: [
  ['kebabtelur','Sayuran, telur','Telur · Sayuran'],
  ['kebabdagingslice','Sayuran, telur, daging slice','Daging slice · Telur'],
  ['kebabsosistelur','Sayuran, telur, sosis','Sosis · Telur'],
  ['kebabdagingcrispy','Sayuran, telur, ayam crispy','Ayam crispy · Telur'],
  ['kebabsumateraayam','Sayuran, telur, daging ayam original','Ayam · Sayuran'],
  ['kebabsumaterasapi','Sayuran, telur, daging sapi original','Sapi · Sayuran'],
  ['kebabfriedchicken','Sayuran, telur, fried chicken','Fried chicken · Telur'],
  ['kebabspesial','Sayuran, telur, keju, sosis, nugget, daging slice','Keju · Daging slice'],
  ['kebabspesialayam','Sayuran, telur, keju, sosis, nugget, daging ayam','Ayam · Keju'],
  ['kebabspesialsapi','Sayuran, telur, keju, sosis, nugget, daging sapi','Sapi · Keju'],
  ['kebabspesialmix','Sayuran, telur, keju, sosis, nugget, ayam dan sapi','Ayam + Sapi · Keju']
 ],
 burger: [
  ['burgertelur','Sayuran, telur','Telur · Sayuran'],
  ['burgerdagingslice','Sayuran, telur, daging slice','Daging slice · Telur'],
  ['burgersosis','Sayuran, telur, sosis','Sosis · Telur'],
  ['burgerayamcrispy','Sayuran, telur, ayam crispy','Ayam crispy · Telur'],
  ['burgersumateraayam','Sayuran, telur, daging ayam original','Ayam · Sayuran'],
  ['burgersumaterasapi','Sayuran, telur, daging sapi original','Sapi · Sayuran'],
  ['burgerayamkeju','Sayuran, telur, keju, daging ayam','Ayam · Keju'],
  ['burgersapikeju','Sayuran, telur, keju, daging sapi','Sapi · Keju']
 ]
};
Object.entries(FULL_MENU).forEach(([key,category])=>{
 category.label={kebab:'Kebab',burger:'Burger',lumpia:'Lumpia',roti:'Roti Bakar'}[key];
 category.items.forEach((item,index)=>{
  item.id=key+'-'+index; item.category=key; item.cat=category.label;
  const detail=MENU_DETAILS[key]?.[index];
  if(detail){item.img='image/'+key+'/'+detail[0]+'.webp';item.desc=detail[1];item.note=detail[2];}
  else if(key==='lumpia'){item.img=IMG.lumpia;item.desc='Lumpia renyah dengan isian '+(index===0?'ayam':'sapi')+'.';item.note='Renyah · Gurih';item.illustration=true;}
  else if(key==='roti'){item.img=IMG.roti;item.desc='Roti panggang dengan pilihan isian coklat, srikaya, blueberry, atau strawberry. Tersedia tambahan keju.';item.note='4 rasa · Pilihan tambahan keju';item.views=['coklat','srikaya','blueberry','strawberry'].flatMap(rasa=>[false,true].map(keju=>({label:rasa.charAt(0).toUpperCase()+rasa.slice(1)+(keju?' Keju':''),img:keju?`image/rasaroti/${rasa}keju.webp`:`image/modelrotibiasa/${rasa}.webp`,price:20000+(keju?EXTRA_TOPPING_PRICE:0)})));}
 });
});
const FAVORIT = [FULL_MENU.kebab.items[4],FULL_MENU.kebab.items[5],FULL_MENU.kebab.items[10],FULL_MENU.burger.items[0],FULL_MENU.burger.items[6],FULL_MENU.burger.items[7]];



function formatRupiah(n){
  return "Rp" + n.toLocaleString("id-ID");
}

const SPR = {"cheeseA": "image/komponen/cheese1.png", "cheeseB": "image/komponen/cheeseB.webp", "cheeseC": "image/komponen/cheeseC.webp", "chocA": "image/komponen/chocA.webp", "chocB": "image/komponen/chocB.webp", "chocC": "image/komponen/chocC.webp", "crumbY": "image/komponen/crumbY.webp", "crumbC": "image/komponen/crumbC.webp"};
