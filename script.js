/* ===================================================================
   HARIPOORANI S  -  AWS CLOUD PORTFOLIO  -  script.js
   Interactivity: typing effect, navbar, mobile menu, scroll reveal,
   animated skill bars, active links, back-to-top, contact form.
   =================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. TYPING EFFECT ---------- */
  const roles = [
    'AWS Cloud Engineer',
    'Junior Server Administrator',
    'Linux Administrator',
    'Cloud Security Enthusiast'
  ];
  const typedEl = document.getElementById('typed');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];
    if (deleting) {
      typedEl.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeLoop, 300); }
      else setTimeout(typeLoop, 45);
    } else {
      typedEl.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) { deleting = true; setTimeout(typeLoop, 1600); }
      else setTimeout(typeLoop, 90);
    }
  }
  if (typedEl) typeLoop();


  /* ---------- 2. STICKY NAVBAR + BACK TO TOP ---------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
    if (window.scrollY > 500) backToTop.classList.add('show'); else backToTop.classList.remove('show');
    highlightActiveLink();
  });
  backToTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });


  /* ---------- 3. MOBILE HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { hamburger.classList.remove('open'); navLinks.classList.remove('open'); });
  });


  /* ---------- 4. SCROLL REVEAL ---------- */
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });


  /* ---------- 5. ANIMATED SKILL BARS ---------- */
  const barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.style.width = entry.target.getAttribute('data-width'); barObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.bar-fill').forEach(function (bar) { barObserver.observe(bar); });


  /* ---------- 6. ACTIVE MENU HIGHLIGHT ---------- */
  const sections = document.querySelectorAll('section[id]');
  function highlightActiveLink() {
    let current = '';
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }


  /* ---------- 7. CONTACT FORM (opens email app) ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      const yourEmail = 'haripoorani738@gmail.com';
      const body = 'Name: ' + name + '%0D%0AEmail: ' + email + '%0D%0A%0D%0A' + message;
      window.location.href = 'mailto:' + yourEmail + '?subject=' + encodeURIComponent(subject) + '&body=' + body;
    });
  }


  /* ---------- 8. AUTO YEAR IN FOOTER ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ---------- 9. AUTOMATIC PROFILE PHOTO ---------- */
  // If a file named "photo.jpg" exists in this folder, it is shown in the
  // About section automatically. If not, the "HS" initials stay. No editing needed.
  const avatar = document.getElementById('avatar');
  if (avatar) {
    const testImg = new Image();
    testImg.onload = function () {
      avatar.style.backgroundImage = "url('photo.jpg')";
      avatar.classList.add('has-photo');
    };
    testImg.src = 'photo.jpg';
  }

});
