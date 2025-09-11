// Cursor follower (dot + ring)
(function () {
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  function onMove(e) {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  }

  function loop() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(loop);
  }

  window.addEventListener('mousemove', onMove, { passive: true });
  requestAnimationFrame(loop);

  // Emphasize over interactive elements
  const interactive = ['A','BUTTON','INPUT','TEXTAREA','SELECT','SUMMARY'];
  window.addEventListener('mousemove', (e) => {
    const t = e.target;
    if (interactive.includes(t.tagName)) {
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.borderColor = 'rgba(110,231,183,0.9)';
    } else {
      ring.style.width = '28px';
      ring.style.height = '28px';
      ring.style.borderColor = 'rgba(255,255,255,0.6)';
    }
  }, { passive: true });
})();

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
      const link = document.querySelector(`a.nav-link[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('text-white'));
        if (link) link.classList.add('text-white');
      }
    });
  }, { threshold: 0.6 });
  sections.forEach(s => sectionObserver.observe(s));
})();


