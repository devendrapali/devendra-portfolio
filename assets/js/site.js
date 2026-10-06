/* DevendraPali — shared behaviour: scroll reveal, sticky header, mobile menu, dark mode, back to top. */
(function () {
  var root = document.querySelector('.dp-site');
  if (!root) return;
  root.classList.add('dp-js');
  var saved = localStorage.getItem('dp-theme');
  if (saved) root.dataset.theme = saved;
  var els = root.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else els.forEach(function (el) { el.classList.add('is-visible'); });
  var header = root.querySelector('.dp-header');
  var onScroll = function () { header && header.classList.toggle('is-scrolled', window.scrollY > 24); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var mobile = root.querySelector('.dp-mobile');
  root.addEventListener('click', function (e) {
    var a = e.target.closest('[data-action]');
    if (a) {
      var act = a.dataset.action;
      if (act === 'theme') { var th = root.dataset.theme === 'dark' ? 'light' : 'dark'; root.dataset.theme = th; localStorage.setItem('dp-theme', th); }
      if (act === 'menu' && mobile) { var open = mobile.classList.toggle('is-open'); a.setAttribute('aria-expanded', open); }
      if (act === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (mobile && e.target.closest('.dp-mobile a')) mobile.classList.remove('is-open');
  });
})();
