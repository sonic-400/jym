/* JyM Allgraphics — navegación de la copia en GitHub Pages.
   Los enlaces del catálogo se abren dentro de la copia.
   La compra real se realiza exclusivamente en Tiendanube o por WhatsApp. */
(() => {
  'use strict';
  const scriptURL = document.currentScript?.src;
  if (!scriptURL) return;
  const root = new URL('../../', scriptURL);
  const wa = 'https://wa.me/5491165562347?text=' + encodeURIComponent('Hola, estoy visitando la web de JyM y quisiera consultar por un insumo.');
  const categoryRoutes = Object.freeze({
    cartuchos:'insumos/cartuchos/', toner:'insumos/toner/', drum:'insumos/drum/',
    fusores:'insumos/fusores/', chip:'insumos/chip/', 'cilindros-opc':'insumos/cilindros-opc/',
    revelador:'insumos/revelador/', filminas:'insumos/filminas/',
    partes:'insumos/partes/', resmas:'insumos/resmas/', insumos:'insumos/',
    productos:'productos/'
  });
  const previewOnlyCategories = new Set(['rodillos-de-presion','rodillos-de-calor','cuchillas','cintas-rotuladoras','tintas']);
  const createWhatsapp = () => {
    if(document.querySelector('.jym-wa-float')) return;
    const a=document.createElement('a');
    a.className='jym-wa-float'; a.href=wa; a.target='_blank'; a.rel='noopener noreferrer';
    a.setAttribute('aria-label','Hablar con JyM Allgraphics por WhatsApp');
    a.title='Consultar por WhatsApp';
    a.innerHTML='<span class="jym-wa-tooltip">¿Te ayudamos?</span><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.008 2.003C8.275 2.003 2.005 8.227 2 15.91a13.75 13.75 0 0 0 1.872 6.93L2 30l7.355-1.91a14.09 14.09 0 0 0 6.65 1.7h.005c7.73 0 14-6.225 14.004-13.906a13.8 13.8 0 0 0-4.097-9.84 13.92 13.92 0 0 0-9.909-4.04Zm0 25.38a11.7 11.7 0 0 1-5.96-1.625l-.43-.25-4.47 1.16 1.195-4.33-.28-.45a11.52 11.52 0 0 1-1.77-5.976c.004-6.394 5.26-11.597 11.72-11.597a11.64 11.64 0 0 1 8.285 3.392 11.47 11.47 0 0 1 3.423 8.212c-.003 6.399-5.258 11.603-11.712 11.603Zm6.43-8.69c-.35-.177-2.06-1.01-2.38-1.125-.32-.118-.55-.18-.79.177-.235.35-.91 1.125-1.115 1.36-.206.235-.41.265-.765.09-.35-.176-1.48-.542-2.82-1.73-1.044-.92-1.747-2.05-1.95-2.39-.205-.353-.02-.542.153-.715.16-.16.35-.41.528-.614.175-.206.234-.352.35-.587.117-.234.058-.44-.028-.615-.09-.177-.79-1.894-1.083-2.596-.286-.688-.576-.595-.792-.606l-.675-.012a1.3 1.3 0 0 0-.938.438c-.322.35-1.227 1.2-1.227 2.922s1.256 3.394 1.434 3.626c.176.235 2.47 3.747 5.985 5.25.84.36 1.496.575 2.006.736.842.266 1.608.228 2.218.14.674-.1 2.062-.837 2.355-1.645.295-.81.295-1.506.207-1.65-.09-.147-.325-.236-.675-.412Z"/></svg>';
    document.body.appendChild(a);
  };
  const createCategoryOffer = () => {
    if(!document.body.classList.contains('template-category'))return;
    const container=document.querySelector('.category-body');
    if(!container||document.querySelector('.jym-category-promo'))return;
    const section=document.createElement('aside');
    section.className='jym-category-promo';section.setAttribute('aria-label','Promoción de primera compra');
    const wrap=document.createElement('div');wrap.className='jym-category-promo-inner';
    const text=document.createElement('div'),heading=document.createElement('strong'),small=document.createElement('span');
    heading.textContent='20% OFF en tu primera compra por WhatsApp';
    small.textContent='¿Buscás un tóner específico? Consultanos el modelo para confirmar compatibilidad y disponibilidad.';
    text.append(heading,small);
    const button=document.createElement('a');button.textContent='Consultar por WhatsApp ↗';
    button.href='https://wa.me/5491165562347?text='+encodeURIComponent('Hola, quiero aprovechar el 20% OFF de mi primera compra y consultar un insumo.');
    button.target='_blank';button.rel='noopener noreferrer';
    wrap.append(text,button);section.append(wrap);
    container.parentNode.insertBefore(section,container);
  };
  const safeInternalRoute = (href) => {
    let u;
    try {u=new URL(href,window.location.href);}catch{return null;}
    if(u.origin===root.origin && u.pathname.startsWith(root.pathname))return null;
    if(!/^https?:$/.test(u.protocol) || !/^(www\.)?jymallgraphics\.com\.ar$/i.test(u.hostname))return null;
    const pieces=u.pathname.split('/').filter(Boolean);
    const slug=pieces.length===2&&pieces[0]==='productos'?pieces[1]:null;
    if(slug && /^[a-z0-9-]+$/i.test(slug)) {
      const target=new URL('producto.html',root);
      target.searchParams.set('slug',slug);
      return target.href;
    }
    if(!pieces.length)return root.href;
    const cat=pieces[0]==='insumos'?pieces[1]||'insumos':pieces[0];
    const path=categoryRoutes[cat];
    if(path)return new URL(path,root).href;
    if(previewOnlyCategories.has(cat)){
      const target=new URL('categoria.html',root);
      target.searchParams.set('categoria',cat);
      return target.href;
    }
    return null;
  };
  document.addEventListener('click',event=>{
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const a=event.target.closest?.('a[href]'); if(!a)return;
    if(a.closest('[data-jym-external],.jym-guide-buttons,.jym-about-help,.jym-pdp-actions'))return;
    const dest=safeInternalRoute(a.href);
    if(!dest)return;
    event.preventDefault();event.stopImmediatePropagation();
    window.location.assign(dest);
  },true);
  const init = () => { createWhatsapp(); createCategoryOffer(); };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();