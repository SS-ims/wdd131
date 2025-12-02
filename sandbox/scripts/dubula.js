// main.js — deferred
// Place this file in scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
  // Nav toggle for mobile
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle && navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('show');
  });

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Simple newsletter form handler (no backend)
  const newsForm = document.getElementById('newsForm');
  const formMsg = document.getElementById('formMsg');

  if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsForm.email.value.trim();
      if (!email) {
        formMsg.textContent = 'Please enter a valid email.';
        formMsg.style.color = 'var(--accent-2)';
        return;
      }
      // Simulate success
      formMsg.textContent = `Thanks — ${email} has been added to the list.`;
      formMsg.style.color = 'var(--accent)';
      newsForm.reset();
    });
  }

  // Small helper: ensure images have width/height attributes for layout stability.
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    // If width/height missing, set aspect fallback (not perfect but reduces layout shift)
    if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
      img.setAttribute('width', img.naturalWidth || 800);
      img.setAttribute('height', img.naturalHeight || 600);
    }
  });

  // Example: If you want to dynamically load fixtures, you can replace the fixturesList innerHTML here.
  // const fixturesList = document.getElementById('fixturesList');
  // fixturesList.innerHTML = ... fetch or build markup ...
});
