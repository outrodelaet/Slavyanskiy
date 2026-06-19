(function () {
  'use strict';

  // Читаем progress-bar
  const bar = document.getElementById('reading-progress');
  if (bar) {
    const updateBar = function () {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  }

  // Отображаем элементы при входе в viewport
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
      );
      revealEls.forEach(function (el) { observer.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('visible'); });
    }
  }
})();
