// main.js — shared for all pages
document.addEventListener('DOMContentLoaded', () => {
  // Nav toggle for mobile
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu && navMenu.classList.toggle('show');
    });
  }

  // Fill year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Newsletter / contact forms (client-side only)
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
      formMsg.textContent = `Thanks — ${email} has been added to the list.`;
      formMsg.style.color = 'var(--accent)';
      newsForm.reset();
    });
  }

  const contactForm = document.getElementById('contactForm');
  const contactMsg = document.getElementById('contactMsg');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email ? contactForm.email.value.trim() : contactForm.emailc.value.trim();
      const message = contactForm.message.value.trim();
      if (!name || !email || !message) {
        contactMsg.textContent = 'Please complete all fields.';
        contactMsg.style.color = 'var(--accent-2)';
        return;
      }
      // Simulated send — replace with fetch() to your backend endpoint if you have one
      contactMsg.textContent = 'Message sent — we will get back to you shortly.';
      contactMsg.style.color = 'var(--accent)';
      contactForm.reset();
    });
  }

  // Ensure images have width/height fallback to reduce layout shift
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
      // best-effort fallback
      img.setAttribute('width', img.naturalWidth || 800);
      img.setAttribute('height', img.naturalHeight || 600);
    }
  });

  // Squad page: simple modal to show player info
  const teamGrid = document.getElementById('teamGrid');
  const playerModal = document.getElementById('playerModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalPos = document.getElementById('modalPos');
  const modalBio = document.getElementById('modalBio');
  const modalClose = document.getElementById('modalClose');

  const players = {
    jmoyo: {
      name: 'J. Moyo',
      pos: 'Forward — #9',
      bio: 'Top scorer from last season. Pacey striker with strong finishing.'
    },
    adube: {
      name: 'A. Dube',
      pos: 'Midfielder — #8',
      bio: 'Creative midfielder, excels at through-balls and control.'
    },
    ssakala: {
      name: 'S. Sakala',
      pos: 'Goalkeeper — #1',
      bio: 'Commanding presence in the box with excellent reflexes.'
    }
  };

  if (teamGrid && playerModal) {
    teamGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.player-card');
      if (!card) return;
      const id = card.getAttribute('data-player');
      if (!id || !players[id]) return;
      const p = players[id];
      modalTitle.textContent = p.name;
      modalPos.textContent = p.pos;
      modalBio.textContent = p.bio;
      playerModal.hidden = false;
      playerModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    modalClose && modalClose.addEventListener('click', () => {
      playerModal.hidden = true;
      playerModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });

    // close when clicking outside content
    playerModal.addEventListener('click', (e) => {
      if (e.target === playerModal) {
        playerModal.hidden = true;
        playerModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }
});
