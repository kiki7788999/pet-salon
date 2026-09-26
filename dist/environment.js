(() => {
  const carousel = document.querySelector('.salon-carousel');
  const slides = [...carousel.querySelectorAll('.salon-slide')];
  const dots = [...document.querySelectorAll('.salon-dot')];
  const play = document.querySelector('.salon-play');
  const region = document.querySelector('#environment');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, timer, paused = motion.matches, hovering = false, focused = false;
  function show(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
  }
  function schedule() {
    clearInterval(timer);
    play.textContent = paused ? '播放轮播' : '暂停轮播';
    carousel.setAttribute('aria-live', paused || hovering || focused ? 'polite' : 'off');
    if (!paused && !hovering && !focused && !document.hidden) timer = setInterval(() => show(index + 1), 5000);
  }
  function select(next) { show(next); schedule(); }
  dots.forEach((dot, i) => dot.addEventListener('click', () => select(i)));
  document.querySelector('[data-salon-prev]').addEventListener('click', () => select(index - 1));
  document.querySelector('[data-salon-next]').addEventListener('click', () => select(index + 1));
  play.addEventListener('click', () => { paused = !paused; schedule(); });
  region.addEventListener('mouseenter', () => { hovering = true; schedule(); });
  region.addEventListener('mouseleave', () => { hovering = false; schedule(); });
  region.addEventListener('focusin', () => { focused = true; schedule(); });
  region.addEventListener('focusout', event => { if (!region.contains(event.relatedTarget)) { focused = false; schedule(); } });
  region.addEventListener('keydown', event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); select(index + (event.key === 'ArrowRight' ? 1 : -1)); } });
  let start;
  carousel.addEventListener('touchstart', event => { start = {x:event.touches[0].clientX,y:event.touches[0].clientY}; }, {passive:true});
  carousel.addEventListener('touchend', event => { if (!start) return; const dx = event.changedTouches[0].clientX-start.x, dy = event.changedTouches[0].clientY-start.y; if (Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)) select(index+(dx<0?1:-1)); start=null; }, {passive:true});
  carousel.addEventListener('touchcancel', () => { start=null; }, {passive:true});
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { paused = motion.matches; schedule(); });
  schedule();
})();
