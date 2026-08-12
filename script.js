/* ========= Configuration ========= */
const CONFIG = {
  SESSION_PRICE: 10, // single source of truth for session price
  selectors: {
    navToggle: '#nav-toggle',
    navMenu: '#nav-menu',
    navLinks: 'a[data-nav]',
    sections: 'main section[id]',
    reveal: '.reveal',
    sessionPrice: '[data-price]',
    bookingForm: '#booking-form',
    tutorForm: '#tutor-form',
    contactForm: '#contact-form',
    faqQuestions: '.faq-question',
    faqItems: '.faq-item'
  }
};

/* ========= Utilities ========= */
function qs(sel, parent = document){ return parent.querySelector(sel); }
function qsa(sel, parent = document){ return Array.from(parent.querySelectorAll(sel)); }
function elExists(el){ return el !== null && el !== undefined; }
function setTextSafe(selector, text){ const el = qs(selector); if(el) el.textContent = text; }

/* ========= Navigation ========= */
(function Navigation(){
  const navToggle = qs(CONFIG.selectors.navToggle);
  const navMenu = qs(CONFIG.selectors.navMenu);
  const navLinks = qsa(CONFIG.selectors.navLinks);
  const sections = qsa(CONFIG.selectors.sections);

  if(!navToggle || !navMenu) {
    console.warn('Navigation: nav elements missing');
    return;
  }

  // Toggle mobile menu
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  // Close on nav link click (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Smooth scroll to the anchor target (improve keyboard behavior)
      const href = link.getAttribute('href');
      if(href && href.startsWith('#')){
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
          // close menu if open
          if(navMenu.classList.contains('open')){
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded','false');
            navToggle.setAttribute('aria-label','Open navigation');
          }
        }
      }
    });
  });

  // Highlight nav links as sections enter viewport
  if(sections.length && navLinks.length){
    const sectionMap = {};
    sections.forEach(s => sectionMap[s.id] = s);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = qsa(`a[href="#${id}"]`)[0];
        if(!link) return;
        if(entry.isIntersecting && entry.intersectionRatio >= 0.45){
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, {threshold: [0.45, 0.6]});

    sections.forEach(s => observer.observe(s));
  }
})();

/* ========= Price handling ========= */
(function Price(){
  const priceEls = qsa(CONFIG.selectors.sessionPrice);
  if(priceEls.length === 0){
    // Not fatal, but log
    console.warn('Price: no elements with data-price found');
    return;
  }
  priceEls.forEach(el => {
    el.textContent = String(CONFIG.SESSION_PRICE);
  });
})();

/* ========= Forms (front-end only) ========= */
(function Forms(){
  // Common validation helpers
  function showFieldError(field, message){
    const container = document.querySelector(`.field-error[data-for="${field.id}"]`);
    if(container) container.textContent = message || '';
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
  }
  function clearFieldErrors(form){
    qsa('.field-error', form).forEach(e => e.textContent = '');
    qsa('[aria-invalid="true"]', form).forEach(f => f.removeAttribute('aria-invalid'));
  }
  function isEmailValid(email){
    // lightweight email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* Booking form */
  const bookingForm = qs(CONFIG.selectors.bookingForm);
  if(bookingForm){
    const status = qs('#booking-form-status');
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFieldErrors(bookingForm);

      const name = qs('#booking-name', bookingForm);
      const email = qs('#booking-email', bookingForm);
      const grade = qs('#booking-grade', bookingForm);
      const date = qs('#booking-date', bookingForm);
      const time = qs('#booking-time', bookingForm);

      let ok = true;
      if(!name.value.trim()){ showFieldError(name, 'Please enter your full name'); ok=false; }
      if(!email.value.trim()){ showFieldError(email, 'Please provide an email'); ok=false; }
      else if(!isEmailValid(email.value.trim())){ showFieldError(email, 'Please enter a valid email address'); ok=false; }
      if(!grade.value){ showFieldError(grade, 'Please select a grade'); ok=false; }
      if(!date.value){ showFieldError(date, 'Please select a preferred date'); ok=false; }
      if(!time.value){ showFieldError(time, 'Please select a preferred time'); ok=false; }

      if(!ok){
        if(status) status.textContent = 'Please correct the errors above.';
        return;
      }

      // Show friendly success message but do not claim a confirmed booking.
      if(status) status.textContent = 'Booking request submitted. We will review your request and contact you to confirm availability.';
      bookingForm.reset();
    });
  }

  /* Tutor application form */
  const tutorForm = qs(CONFIG.selectors.tutorForm);
  if(tutorForm){
    const status = qs('#tutor-form-status');
    tutorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFieldErrors(tutorForm);

      const name = qs('#tutor-name', tutorForm);
      const email = qs('#tutor-email', tutorForm);
      const education = qs('#tutor-education', tutorForm);
      const why = qs('#tutor-why', tutorForm);

      let ok = true;
      if(!name.value.trim()){ showFieldError(name, 'Please enter your full name'); ok=false; }
      if(!email.value.trim()){ showFieldError(email, 'Please provide an email'); ok=false; }
      else if(!isEmailValid(email.value.trim())){ showFieldError(email, 'Please enter a valid email address'); ok=false; }
      if(!education.value.trim()){ showFieldError(education, 'Please provide your education or grade level'); ok=false; }
      if(!why.value.trim()){ showFieldError(why, 'Please tell us why you want to tutor'); ok=false; }

      if(!ok){
        if(status) status.textContent = 'Please correct the errors above.';
        return;
      }

      if(status) status.textContent = 'Application submitted locally. We will review and contact you if there is a role match.';
      tutorForm.reset();
    });
  }

  /* Contact form */
  const contactForm = qs(CONFIG.selectors.contactForm);
  if(contactForm){
    const status = qs('#contact-form-status');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFieldErrors(contactForm);

      const name = qs('#contact-name', contactForm);
      const email = qs('#contact-email', contactForm);
      const who = qs('#contact-who', contactForm);
      const msg = qs('#contact-message', contactForm);

      let ok = true;
      if(!name.value.trim()){ showFieldError(name, 'Please enter your name'); ok=false; }
      if(!email.value.trim()){ showFieldError(email, 'Please provide an email'); ok=false; }
      else if(!isEmailValid(email.value.trim())){ showFieldError(email, 'Please enter a valid email address'); ok=false; }
      if(!who.value){ showFieldError(who, 'Please select an option'); ok=false; }
      if(!msg.value.trim()){ showFieldError(msg, 'Please enter a message'); ok=false; }

      if(!ok){
        if(status) status.textContent = 'Please correct the errors above.';
        return;
      }

      if(status) status.textContent = 'Message submitted locally. We will reply if necessary. This is not an automatic email response.';
      contactForm.reset();
    });
  }
})();

/* ========= FAQ accordion ========= */
(function FAQ(){
  const questions = qsa(CONFIG.selectors.faqQuestions);
  const items = qsa(CONFIG.selectors.faqItems);
  if(questions.length === 0) return;

  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // Close all
      questions.forEach(b => {
        b.setAttribute('aria-expanded','false');
        const cid = b.getAttribute('aria-controls');
        const region = cid ? qs(`#${cid}`) : null;
        if(region) region.hidden = true;
      });

      if(!expanded){
        // Open clicked
        btn.setAttribute('aria-expanded','true');
        const cid = btn.getAttribute('aria-controls');
        const region = cid ? qs(`#${cid}`) : null;
        if(region) region.hidden = false;
        // move focus to region for assistive tech optionally
        region && region.setAttribute('tabindex','0');
      }
    });
  });
})();

/* ========= Scroll reveal (IntersectionObserver) ========= */
(function Reveal(){
  const revealEls = qsa(CONFIG.selectors.reveal);
  if(revealEls.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        // Optionally unobserve to avoid repeat animations
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  revealEls.forEach(el => observer.observe(el));
})();

/* ========= Accessibility helpers ========= */
(function Accessibility(){
  // Add visible year in footer
  const yearEl = qs('#copyright-year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Ensure focusable cards for keyboard users
  qsa('.card[tabindex]').forEach(c => {
    c.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') c.click && c.click();
    });
  });

  // Respect reduced motion already handled in CSS.
})();

/* ========= Safety: ensure selectors exist before use (sanity log) ========= */
(function Sanity(){
  // Check for elements referenced in navigation anchors
  qsa('a[data-nav]').forEach(a => {
    const href = a.getAttribute('href') || '';
    if(href.startsWith('#')){
      const target = document.querySelector(href);
      if(!target){
        console.warn(`Navigation link points to missing target: ${href}`);
      }
    }
  });
})();
