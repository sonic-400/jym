/* Categorías sin archivo HTML propio: vista interna honesta de la copia. */
(async()=>{
 'use strict';
 const labels={
  'rodillos-de-presion':['Rodillos de presión','rodillo de presion'],
  'rodillos-de-calor':['Rodillos de calor','rodillo de calor'],
  'cuchillas':['Cuchillas','cuchilla'],
  'cintas-rotuladoras':['Cintas rotuladoras','cinta rotuladora'],
  'tintas':['Tintas','tinta']
 };
 const slug=new URLSearchParams(location.search).get('categoria')||'';
 const label=labels[slug];
 if(!label){document.getElementById('jym-category-heading').textContent='Categoría no disponible';return;}
 const name=label[0];
 document.title=name+' | JyM Allgraphics';
 document.getElementById('jym-category-heading').textContent=name;
 document.getElementById('jym-category-crumb').textContent=name;
 document.getElementById('jym-category-wa').href='https://wa.me/5491165562347?text='+encodeURIComponent('Hola, quiero consultar productos de '+name+' y el 20% OFF de mi primera compra');
 document.getElementById('jym-category-official').href='https://www.jymallgraphics.com.ar/'+slug;
 try {
  const r=await fetch('assets/data/catalogo-v4.json');
  if(!r.ok)return;
  const d=await r.json();
  const term=label[1].toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const found=d.products.filter(x=>x.name.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'').includes(term)).slice(0,20);
  if(!found.length)return;
  const grid=document.getElementById('jym-category-grid');
  for(const item of found){
   const a=document.createElement('a');a.className='jym-pdp-related-card';a.href='producto.html?slug='+encodeURIComponent(item.slug);
   const img=document.createElement('img');img.loading='lazy';img.alt='';if(item.image?.startsWith('https://'))img.src=item.image;
   const title=document.createElement('strong');title.textContent=item.name;
   const price=document.createElement('span');price.textContent=item.price||'Consultar';
   a.append(img,title,price);grid.append(a);
  }
  document.getElementById('jym-category-results').hidden=false;
 }catch(e){/* La consulta por WhatsApp permanece disponible. */}
})();