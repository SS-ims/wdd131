/* script.js - shared JS for all pages
   - uses template literals exclusively for building DOM output strings
   - uses localStorage
   - lazy-loads optimized SVG avatars generated at runtime
   - includes functions, arrays, objects, conditional branching, event listeners
*/

document.addEventListener('DOMContentLoaded', () => {
  initSite();
});

/* ----------------------
   Data (objects / arrays)
   ---------------------- */
const squad = [
  { id: 7, name: 'Tawanda Moyo', position: 'Forward', dob: '2001-03-16', initials: 'TM', number: 7, color: '#0b6623' },
  { id: 4, name: 'Brian Ncube', position: 'Midfield', dob: '1999-11-02', initials: 'BN', number: 4, color: '#0a8b4d' },
  { id: 1, name: 'Peter Mlambo', position: 'Goalkeeper', dob: '1996-01-08', initials: 'PM', number: 1, color: '#0e6b3a' },
  { id: 11, name: 'Samuel Dube', position: 'Defence', dob: '2002-07-21', initials: 'SD', number: 11, color: '#0f8a3c' },
  { id: 9, name: 'Kevin Sibanda', position: 'Forward', dob: '2000-05-30', initials: 'KS', number: 9, color: '#127a37' }
];

/* ----------------------
   Initialization
   ---------------------- */
function initSite(){
  renderNavCurrent();
  renderSquadIfPresent();
  loadFavoriteOnHome();
  attachContactFormHandler();
  initLazyLoading();
}

/* ----------------------
   Helpers / Utility
   ---------------------- */

/* Return age (years) from a yyyy-mm-dd string */
function calculateAge(dateString){
  const dob = new Date(dateString);
  const diff = Date.now() - dob.getTime();
  const ageDt = new Date(diff);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
}

/* Build a data: URI for a small SVG avatar using initials and background color */
function avatarDataURI(initials, bg){
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>
    <rect width='100%' height='100%' fill='${bg}' rx='12' ry='12'></rect>
    <text x='50%' y='54%' font-family='Segoe UI, Roboto, Arial' font-size='72' fill='#ffffff' text-anchor='middle' dominant-baseline='middle'>${initials}</text>
  </svg>`;
  const encoded = encodeURIComponent(svg);
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

/* Lazy-load images using IntersectionObserver; images carry data-initials and data-color */
function initLazyLoading(){
  const imgs = document.querySelectorAll('img[data-initials]');
  if (!imgs.length) return;

  const observer = ('IntersectionObserver' in window) ?
    new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const img = entry.target;
          const initials = img.dataset.initials || '??';
          const color = img.dataset.color || '#0b6623';
          img.src = avatarDataURI(initials, color);
          img.removeAttribute('data-initials');
          obs.unobserve(img);
        }
      });
    }, { rootMargin: "50px 0px 50px 0px" })
    : null;

  imgs.forEach(img => {
    if (observer) observer.observe(img);
    else {
      // fallback: load immediately
      const initials = img.dataset.initials || '??';
      const color = img.dataset.color || '#0b6623';
      img.src = avatarDataURI(initials, color);
    }
  });
}

/* ----------------------
   Rendering functions
   ---------------------- */

/* Use template literals for DOM output */
function renderSquadIfPresent(){
  const list = document.getElementById('squad-list');
  if(!list) return;

  // create squad cards
  const cards = squad.map(player => {
    const age = calculateAge(player.dob);
    return `
      <article class="squad-card card" role="article" aria-labelledby="player-${player.id}">
        <img class="avatar" data-initials="${player.initials}" data-color="${player.color}" alt="Avatar for ${player.name}" loading="lazy" />
        <div class="squad-meta">
          <h3 id="player-${player.id}">${player.name} <span class="small">(#${player.number})</span></h3>
          <p class="small">${player.position} • ${age} years</p>
        </div>
        <div>
          <button class="btn favorite" data-id="${player.id}" aria-pressed="false">Mark favourite</button>
        </div>
      </article>
    `;
  }).join('');

  list.innerHTML = cards;

  // attach event listeners to favourite buttons
  const favBtns = list.querySelectorAll('.favorite');
  favBtns.forEach(btn => btn.addEventListener('click', handleFavoriteClick));
}

/* ----------------------
   Favorites (localStorage)
   ---------------------- */
function handleFavoriteClick(evt){
  const id = Number(evt.currentTarget.dataset.id);
  const player = squad.find(p => p.id === id);
  if(!player) return;

  // Toggle favourite setting in localStorage
  const current = localStorage.getItem('favoritePlayer');
  if(current && Number(current) === id){
    localStorage.removeItem('favoritePlayer');
    evt.currentTarget.setAttribute('aria-pressed','false');
    showToast(`Removed ${player.name} from favourites.`);
  } else {
    localStorage.setItem('favoritePlayer', String(id));
    // update aria-pressed on all buttons
    document.querySelectorAll('.favorite').forEach(b => b.setAttribute('aria-pressed','false'));
    evt.currentTarget.setAttribute('aria-pressed','true');
    showToast(`Saved ${player.name} as your favourite.`);
  }

  // reflect immediately on any page
  loadFavoriteOnHome();
}

/* Show the favourite player on the home / sidebar */
function loadFavoriteOnHome(){
  const favId = localStorage.getItem('favoritePlayer');
  const target = document.getElementById('favorite-player');
  if(!target) return;

  if(!favId){
    target.innerHTML = `<p class="small">You have not set a favourite player yet. Visit the <a href="squad.html">Squad</a> page to set one.</p>`;
    return;
  }

  const player = squad.find(p => p.id === Number(favId));
  if(!player){
    target.innerHTML = `<p class="small">Favourite player not found.</p>`;
    return;
  }

  target.innerHTML = `
    <div class="squad-card">
      <img class="avatar" src="${avatarDataURI(player.initials, player.color)}" alt="Avatar for ${player.name}" width="64" height="64" />
      <div class="squad-meta">
        <h3>${player.name}</h3>
        <p class="small">${player.position} • #${player.number}</p>
      </div>
      <div>
        <a class="btn secondary" href="squad.html">View</a>
      </div>
    </div>
  `;
}

/* ----------------------
   Contact form handling
   ---------------------- */

function attachContactFormHandler(){
  const form = document.getElementById('contact-form');
  if(!form) return;

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    saveContact(evt.target);
  });
}

/* Validate required fields & save to localStorage (contacts array) */
function saveContact(form){
  const name = form.querySelector('[name="name"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();
  const message = form.querySelector('[name="message"]').value.trim();
  const subject = form.querySelector('[name="subject"]').value;

  // simple validation
  if(!name || !email || !message){
    showToast('Please fill in your name, email and message.', true);
    return;
  }

  const contact = {
    id: Date.now(),
    name, email, subject,
    message,
    receivedAt: new Date().toISOString()
  };

  // store array of contacts
  const existing = JSON.parse(localStorage.getItem('clubContacts') || '[]');
  existing.push(contact);
  localStorage.setItem('clubContacts', JSON.stringify(existing));

  form.reset();
  showToast('Thanks — your message has been saved locally.');
}

/* ----------------------
   Small UI helpers
   ---------------------- */

function showToast(msg, isError = false){
  // simple accessible toast element that is created and removed
  const toast = document.createElement('div');
  toast.setAttribute('role','status');
  toast.setAttribute('aria-live','polite');
  toast.style.position = 'fixed';
  toast.style.right = '1rem';
  toast.style.bottom = '1rem';
  toast.style.padding = '.6rem 1rem';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
  toast.style.background = isError ? '#7a1a1a' : 'rgba(11,102,35,0.95)';
  toast.style.color = '#fff';
  toast.style.zIndex = 9999;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(()=> toast.remove(), 3500);
}

/* ----------------------
   Helper: mark current nav link
   ---------------------- */
function renderNavCurrent(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.main-nav a');
  links.forEach(a => {
    if(a.getAttribute('href') === path) a.setAttribute('aria-current','page');
    else a.removeAttribute('aria-current');
  });
}
