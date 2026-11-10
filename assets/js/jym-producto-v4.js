/* Ficha de producto de la copia estática de JyM.
   Fuente única: assets/data/catalogo-v4.json, extraído del catálogo copiado. */
(async () => {
 'use strict';
 const el=id=>document.getElementById(id);
 const slug=(new URLSearchParams(window.location.search).get('slug')||'').toLowerCase();
 const feedback=el('jym-product-feedback'), content=el('jym-product-content');
 const safeUrl=(str)=>{try{const u=new URL(str);return u.protocol==='https:'&&(/(^|\.)jymallgraphics\.com\.ar$/.test(u.hostname))?u.href:null;}catch{return null;}};
 const waMessage=(name)=>'Hola, estoy viendo el producto "'+name+'" en la web de JyM. ¿Está disponible? Quiero consultar compatibilidad y aprovechar el 20% OFF en mi primera compra por WhatsApp.';
 const categoryMap={'cartuchos':['Cartuchos','insumos/cartuchos/'],'toner':['Tóner','insumos/toner/'],'drum':['Drum','insumos/drum/'],'fusores':['Fusores','insumos/fusores/'],'chip':['Chips','insumos/chip/'],'cilindros-opc':['Cilindros OPC','insumos/cilindros-opc/'],'revelador':['Revelador','insumos/revelador/'],'filminas':['Filminas','insumos/filminas/'],'partes':['Partes','insumos/partes/'],'resmas':['Resmas','insumos/resmas/']};
 if(!/^[a-z0-9-]+$/.test(slug)){feedback.textContent='No se encontró una referencia válida. Volvé al catálogo para elegir un producto.';return;}
 try {
   const response=await fetch('assets/data/catalogo-v4.json',{cache:'force-cache'});
   if(!response.ok)throw new Error('Error al cargar catálogo');
   const data=await response.json();
   const products=Array.isArray(data.products)?data.products:[];
   const item=products.find(x=>x.slug===slug);
   if(!item){feedback.textContent='Este producto aún no está incluido en la copia del catálogo. Consultanos por WhatsApp o visitá el catálogo completo.';const a=document.createElement('a');a.href='https://wa.me/5491165562347?text='+encodeURIComponent('Hola, quiero consultar por el producto '+slug.replaceAll('-',' '));a.textContent='Consultar por WhatsApp ↗';a.target='_blank';a.rel='noopener noreferrer';a.style.display='block';a.style.marginTop='18px';feedback.appendChild(a);return;}
   document.title=item.name+' | JyM Allgraphics';
   el('jym-product-title').textContent=item.name;
   el('jym-product-breadcrumb-name').textContent=item.name;
   el('jym-product-price').textContent=item.price||'Precio a consultar';
   if(item.image&&item.image.startsWith('https://')){const img=el('jym-product-image');img.src=item.image;img.alt='Imagen de '+item.name;img.onerror=()=>{img.removeAttribute('src');img.alt='Imagen no disponible, consultanos';};}
   else{el('jym-product-image').alt='Imagen no disponible';}
   const cat=(item.categories||[]).find(x=>categoryMap[x]);
   const c=cat?categoryMap[cat]:['Productos','productos/'];
   el('jym-product-breadcrumb-category').href=c[1];el('jym-product-breadcrumb-category').textContent=c[0];
   el('jym-product-description').textContent='Producto: '+item.name+'. Para confirmar especificaciones, rendimiento, compatibilidad y disponibilidad, comunicate con nuestro equipo indicando el modelo de tu impresora.';
   el('jym-product-whatsapp').href='https://wa.me/5491165562347?text='+encodeURIComponent(waMessage(item.name));
   const external=safeUrl(item.originalUrl);
   if(external)el('jym-product-store').href=external;
   else el('jym-product-store').hidden=true;
   const related=products.filter(x=>x.slug!==slug&&x.categories?.includes(cat)).slice(0,4);
   const grid=el('jym-product-related-grid');
   related.forEach(x=>{
     const link=document.createElement('a');link.className='jym-pdp-related-card';
     link.href='producto.html?slug='+encodeURIComponent(x.slug);
     const image=document.createElement('img');image.loading='lazy';image.alt='';if(x.image&&x.image.startsWith('https://'))image.src=x.image;
     const title=document.createElement('strong');title.textContent=x.name;
     const price=document.createElement('span');price.textContent=x.price||'Consultar';
     link.append(image,title,price);grid.append(link);
   });
   el('jym-product-related').hidden=related.length===0;
   feedback.hidden=true;content.hidden=false;
 } catch(error) {
   feedback.textContent='No pudimos cargar esta ficha. Podés comunicarte con JyM por WhatsApp para consultar disponibilidad.';
   const a=document.createElement('a');a.href='https://wa.me/5491165562347';a.textContent='Hablar por WhatsApp ↗';a.target='_blank';a.rel='noopener noreferrer';a.style.display='block';feedback.appendChild(a);
 }
})();