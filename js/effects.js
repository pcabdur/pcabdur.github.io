// Cursor follower removed per request. Keeping file for other effects.

// Section reveal observer
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
})();

// Nav active state observer
(function () {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('a.nav-link');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`a.nav-link[href="index.html#${id}"], a.nav-link[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(l => { l.classList.remove('text-[#7a1c24]'); l.classList.add('text-[#555]'); });
        if (link) { link.classList.remove('text-[#555]'); link.classList.add('text-[#7a1c24]'); }
      }
    });
  }, { threshold: 0.6 });
  sections.forEach(s => sectionObserver.observe(s));
})();

// Page transition (fade-out on navigate to internal links)
(function () {
  function isInternal(href) {
    return href && (href.startsWith('#') || href.endsWith('.html') || href.includes(window.location.host));
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http')) return; // external
    if (!isInternal(href)) return;
    if (href.startsWith('#')) return; // same page anchor
    e.preventDefault();
    document.body.classList.add('page-leave');
    setTimeout(() => { window.location.href = href; }, 150);
  });
})();

// Projects filter (if filter controls exist)
(function () {
  const filterBar = document.getElementById('projectsFilters');
  if (!filterBar) return;
  const cards = document.querySelectorAll('[data-tags]');
  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const tag = btn.getAttribute('data-filter');
    filterBar.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('bg-white/20'));
    btn.classList.add('bg-white/20');
    cards.forEach(card => {
      const tags = card.getAttribute('data-tags') || '';
      const show = tag === 'all' || tags.split(',').map(t => t.trim()).includes(tag);
      card.classList.toggle('hidden', !show);
    });
  });
})();

// Lightbox for images with [data-lightbox]
(function () {
  const images = document.querySelectorAll('[data-lightbox]');
  if (!images.length) return;
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black/80 z-50 opacity-0 pointer-events-none flex items-center justify-center transition-opacity';
  const img = document.createElement('img');
  img.className = 'max-w-[90vw] max-height-[85vh] rounded-lg shadow-2xl';
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  function open(src) {
    img.src = src;
    overlay.classList.remove('pointer-events-none');
    overlay.classList.add('opacity-100');
  }
  function close() {
    overlay.classList.remove('opacity-100');
    setTimeout(() => overlay.classList.add('pointer-events-none'), 150);
  }
  images.forEach((el) => el.addEventListener('click', () => open(el.getAttribute('data-lightbox'))));
  overlay.addEventListener('click', close);
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();


