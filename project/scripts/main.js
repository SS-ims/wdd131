// main.js — shared for all pages
document.addEventListener('DOMContentLoaded', () => {
  // Nav toggle for mobile (improved)
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  function ensureMobileCloseButton() {
    if (!navMenu) return;
    let closeBtn = navMenu.querySelector('.nav-close');
    if (!closeBtn) {
      closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'nav-close';
      closeBtn.setAttribute('aria-label', 'Close menu');
      closeBtn.textContent = '✕';
      // insert as first child so it appears top inside the menu
      navMenu.insertBefore(closeBtn, navMenu.firstChild);
      closeBtn.addEventListener('click', () => {
        navMenu.classList.remove('show');
        navMenu.hidden = true;
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      });
    }
  }

  function openNav() {
    if (!navMenu || !navToggle) return;
    ensureMobileCloseButton();
    navMenu.classList.add('show');
    navMenu.hidden = false;
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    // set focus to first link
    const firstLink = navMenu.querySelector('a');
    if (firstLink) firstLink.focus();
  }
  function closeNav() {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove('show');
    navMenu.hidden = true;
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.focus();
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (expanded) closeNav(); else openNav();
    });

    // keyboard toggle (Enter/Space)
    navToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navToggle.click();
      }
    });
  }

  // close menu when a nav link is clicked (mobile pattern)
  if (navMenu) {
    navMenu.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      // small delay to allow anchor jump
      setTimeout(() => {
        if (window.innerWidth <= 880) closeNav();
      }, 80);
    });
  }

  // close nav on Escape or click outside
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (navMenu && navMenu.classList.contains('show')) closeNav();
      // also close modals handled later
    }
  });

  document.addEventListener('click', (e) => {
    if (!navMenu || !navToggle) return;
    if (navMenu.classList.contains('show')) {
      const target = e.target;
      if (!navMenu.contains(target) && target !== navToggle) {
        closeNav();
      }
    }
  });

  // ensure nav state on resize
  function initNavOnResize() {
    if (!navMenu || !navToggle) return;
    if (window.innerWidth > 880) {
      // desktop: show the inline menu and clear mobile flags
      navMenu.classList.remove('show');
      navMenu.hidden = false;
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    } else {
      // mobile: hide by default
      navMenu.classList.remove('show');
      navMenu.hidden = true;
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }
  window.addEventListener('resize', initNavOnResize);
  initNavOnResize();

  // Fill year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Newsletter / contact forms (client-side only) - left unchanged but safe-guarded
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
      const email = contactForm.email ? contactForm.email.value.trim() : (contactForm.emailc ? contactForm.emailc.value.trim() : '');
      const message = contactForm.message.value.trim();
      if (!name || !email || !message) {
        contactMsg.textContent = 'Please complete all fields.';
        contactMsg.style.color = 'var(--accent-2)';
        return;
      }
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

  /* -------------------
     Squad modal logic
     ------------------- */
  const teamGrid = document.getElementById('teamGrid');
  const playerModal = document.getElementById('playerModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalPos = document.getElementById('modalPos');
  const modalBio = document.getElementById('modalBio');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');

  const players = {
    jmoyo: { name: 'J. Moyo', pos: 'Forward — #9', bio: 'Top scorer from last season. Pacey striker with strong finishing.' },
    adube: { name: 'A. Dube', pos: 'Midfielder — #8', bio: 'Creative midfielder, excels at through-balls and control.' },
    ssakala: { name: 'S. Sakala', pos: 'Goalkeeper — #1', bio: 'Commanding presence in the box with excellent reflexes.' },

    player1: { name: 'Player 1', pos: 'Position — #1', bio: 'Player 1 — bio and stats pending.' },
    player2: { name: 'Player 2', pos: 'Position — #2', bio: 'Player 2 — bio and stats pending.' },
    player3: { name: 'Player 3', pos: 'Position — #3', bio: 'Player 3 — bio and stats pending.' },
    player4: { name: 'Player 4', pos: 'Position — #4', bio: 'Player 4 — bio and stats pending.' },
    player5: { name: 'Player 5', pos: 'Position — #5', bio: 'Player 5 — bio and stats pending.' },
    player6: { name: 'Player 6', pos: 'Position — #6', bio: 'Player 6 — bio and stats pending.' },
    player7: { name: 'Player 7', pos: 'Position — #7', bio: 'Player 7 — bio and stats pending.' },
    player8: { name: 'Player 8', pos: 'Position — #8', bio: 'Player 8 — bio and stats pending.' },
    player9: { name: 'Player 9', pos: 'Position — #9', bio: 'Player 9 — bio and stats pending.' },
    player10: { name: 'Player 10', pos: 'Position — #10', bio: 'Player 10 — bio and stats pending.' },
    player11: { name: 'Player 11', pos: 'Position — #11', bio: 'Player 11 — bio and stats pending.' }
  };

  // track last focused element to return focus after closing modal
  let lastFocusEl = null;

  function openPlayerModal(card, playerId) {
    if (!playerModal) return;
    const p = players[playerId];
    if (!p) return;
    // populate fields
    modalTitle.textContent = p.name;
    modalPos.textContent = p.pos;
    modalBio.textContent = p.bio || '';
    // use the clicked card's image as modal image if present
    const img = card.querySelector('img');
    if (img && modalImg) {
      modalImg.src = img.src;
      modalImg.alt = img.alt || `${p.name} photo`;
    } else if (modalImg) {
      modalImg.src = '';
      modalImg.alt = 'Player photo';
    }

    lastFocusEl = card;
    playerModal.hidden = false;
    playerModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // focus the close button for keyboard users
    if (modalClose) modalClose.focus();
  }

  function closePlayerModal() {
    if (!playerModal) return;
    playerModal.hidden = true;
    playerModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // return focus to previously focused element
    if (lastFocusEl) lastFocusEl.focus();
  }

  if (teamGrid && playerModal) {
    // open modal when clicking a player card or pressing Enter/Space when focused
    teamGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.player-card');
      if (!card) return;
      const id = card.getAttribute('data-player');
      if (!id) return;
      openPlayerModal(card, id);
    });

    // keyboard activation
    teamGrid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.player-card');
        if (!card) return;
        e.preventDefault();
        const id = card.getAttribute('data-player');
        if (!id) return;
        openPlayerModal(card, id);
      }
    });

    // close via close button
    if (modalClose) {
      modalClose.addEventListener('click', () => closePlayerModal());
    }

    // close when clicking outside content
    playerModal.addEventListener('click', (e) => {
      // only close when clicking the backdrop (the modal element itself)
      if (e.target === playerModal) closePlayerModal();
    });

    // close on Escape (also handled at document level, but keep here)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !playerModal.hidden) closePlayerModal();
    });
  }

});
