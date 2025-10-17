// ================================
// LodgeSync Africa JavaScript File
// ================================

// --- 1️⃣ MOBILE MENU TOGGLE ---
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('nav ul');

// When the hamburger icon is clicked
menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('show');
  menuBtn.classList.toggle('active');

  // Optional: change icon between ☰ and ✖
  if (menuBtn.classList.contains('active')) {
    menuBtn.textContent = '✖';
  } else {
    menuBtn.textContent = '☰';
  }
});

// Close the menu automatically when a link is clicked (mobile UX)
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
    menuBtn.classList.remove('active');
    menuBtn.textContent = '☰';
  });
});


// --- 2️⃣ SCROLL-TO-TOP BUTTON ---
const scrollBtn = document.createElement('button');
scrollBtn.textContent = '↑';
scrollBtn.classList.add('scroll-top');
document.body.appendChild(scrollBtn);

// Show the button when scrolled down
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});

// Scroll smoothly to top when clicked
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// --- 3️⃣ SMOOTH SCROLL FOR NAV LINKS (bonus polish) ---
const navLinks = document.querySelectorAll('a[href^="#"]');

for (let link of navLinks) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetID = this.getAttribute('href');
    const targetSection = document.querySelector(targetID);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ================================
// 4️⃣ HERO SECTION FADE-IN ON LOAD
// ================================
window.addEventListener('load', () => {
  const heroContent = document.querySelector('.hero-content');
  heroContent.classList.add('show');
});

// ================================
// 5️⃣ SCROLL ANIMATION FOR SECTIONS
// ================================
const animatedSections = document.querySelectorAll('.fade-up');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  animatedSections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add('show');
    } else {
      section.classList.remove('show');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Run once on load
