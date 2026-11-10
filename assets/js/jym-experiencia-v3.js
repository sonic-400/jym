/* JyM Allgraphics — carrusel de categorías sin dependencias.
   Avanza por grupos visibles, no un elemento por clic. */
(() => {
  'use strict';
  const init = () => {
    document.querySelectorAll('[data-jym-category-slider]').forEach(section => {
      const viewport = section.querySelector('[data-jym-category-viewport]');
      const prev = section.querySelector('[data-jym-prev]');
      const next = section.querySelector('[data-jym-next]');
      const first = section.querySelector('.jym-category-card');
      if (!viewport || !prev || !next || !first) return;
      const motionReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const update = () => {
        const max = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
        prev.disabled = viewport.scrollLeft <= 2;
        next.disabled = viewport.scrollLeft >= max - 2;
      };
      const move = dir => {
        const cardWidth = first.getBoundingClientRect().width || 180;
        const gap = parseFloat(getComputedStyle(viewport.querySelector('.jym-category-track')).gap) || 0;
        const count = Math.max(2, Math.floor((viewport.clientWidth + gap) / (cardWidth + gap)));
        viewport.scrollBy({ left: dir * count * (cardWidth + gap), behavior: motionReduced ? 'auto' : 'smooth' });
      };
      prev.addEventListener('click', () => move(-1));
      next.addEventListener('click', () => move(1));
      viewport.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update, { passive: true });
      update();
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();