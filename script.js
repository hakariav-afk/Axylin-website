/* ========= Configuration ========= */
/* Single source of truth for session price */
const SESSION_PRICE = 10;

const CONFIG = {
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
    faqItems: '.faq-item',
    heroSlider: '#hero-slider',
    heroSlides: '.hero-slide',
    sliderDots: '.slider-dots .dot'
  }
};

/* ========= Utilities ========= */
function qs(sel, parent = document){ return parent.querySelector(sel); }
function qsa(sel, parent = document){ return Array.from(parent.querySelectorAll(sel)); }

/* ========= Slider (hero carousel with autoplay) ========= */
(function Slider(){
  const container = qs(CONFIG.selectors.heroSlider);
  const slides = qsa(CONFIG.selectors.heroSlides);
  const dots = qsa(CONFIG.selectors.sliderDots);
  if(!container || slides.length === 0) return;

  // Autoplay configuration
  const AUTOPLAY_ENABLED = true;
  const AUTOPLAY_INTERVAL = 6000;
  const USER_PAUSE_AFTER_INTERACT = 20000;

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let autoplayId = null;
  let pauseTimeout = null;

  function show(index, { userInitiated = false } = {}) {
    index = Math.max(0, Math.min(index, slides.length - 1));
    slides.forEach((s, i) => {
      if (i === index) {
        s.classList.add('active');
        s.removeAttribute('aria-hidden');
      } else {
        s.classList.remove('active');
        s.setAttribute('aria-hidden', 'true');
      }
    });
    dots.forEach((d, i) => d.setAttribute('aria-selected', String(i === index)));
    current = index;
    if (userInitiated) pauseTemporary(USER_PAUSE_AFTER_INTERACT);
  }

  function next() { show((current + 1) % slides.length); }

  function startAutoplay() {
    if (!AUTOPLAY_ENABLED || reduceMotion) return;
    stopAutoplay();
    autoplayId = setInterval(() => {
      if (document.hidden) return;
      try { next(); } catch (e) { console.warn('Autoplay error', e); }
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayId) { clearInterval(autoplayId); autoplayId = null; }
  }

  function pauseTemporary(ms = USER_PAUSE_AFTER_INTERACT) {
    stopAutoplay();
    clearTimeout(pauseTimeout);
    if (!reduceMotion && AUTOPLAY_ENABLED) {
      pauseTimeout = setTimeout(() => { startAutoplay(); pauseTimeout = null; }, ms);
    }
  }

  // Dots click
  dots.forEach(d => d.addEventListener('click', (ev) => {
    const idx = Number(d.dataset.go);
    show(idx, { userInitiated: true });
    ev.stopPropagation();
  }));

  // Pause on hover/focus and resume afterwards
  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', () => { if(!pauseTimeout) startAutoplay(); });
  container.addEventListener('focusin', stopAutoplay);
  container.addEventListener('focusout', () => { if(!pauseTimeout) startAutoplay(); });

  // Pause when page/tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else if (!pauseTimeout) startAutoplay();
  });

  // Keyboard left/right when slider has focus
  container.tabIndex = -1;
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { show(current - 1, { userInitiated: true }); }
    else if (e.key === 'ArrowRight') { show(current + 1, { userInitiated: true }); }
  });

  // Expose API for external controls
  window.Slider = {
    goTo: (i) => { show(i, { userInitiated: true }); },
    next: () => next(),
    start: () => startAutoplay(),
    stop: () => stopAutoplay()
  };

  // Initialize
  show(0);
  if (!reduceMotion) startAutoplay();
})();

/* ========= Navigation ========= */
(function Navigation(){
  const navToggle = qs(CONFIG.selectors.navToggle);
  const navMenu = qs(CONFIG.selectors.navMenu);
  const navLinks = qsa(CONFIG.selectors.navLinks);
  const sections = qsa(CONFIG.selectors.sections);

  if(!navToggle || !navMenu){
    console.warn('Navigation: missing elements');
    return;
  }

  const anchorToSlide = {
    '#home': 0,
    '#why': 1,
    '#tutoring': 2,
    '#become-tutor': 3,
    '#contact': 4
  };

  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if(href && href.startsWith('#')){
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          const idx = anchorToSlide[href];
          if(typeof window.Slider !== 'undefined' && typeof idx === 'number'){
            window.Slider.goTo(idx);
          }
          target.scrollIntoView({behavior:'smooth', block:'start'});
          if(navMenu.classList.contains('open')){
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded','false');
            navToggle.setAttribute('aria-label','Open navigation');
          }
        }
      }
    });
  });

  if(sections.length && navLinks.length){
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
  if(priceEls.length === 0){ console.warn('Price: no elements with data-price found'); return; }
  priceEls.forEach(el => { el.textContent = String(SESSION_PRICE); });
})();

/* ========= Forms (front-end only) ========= */
(function Forms(){
  function qsLocal(sel, parent=document){ return parent.querySelector(sel); }
  function qsaLocal(sel, parent=document){ return Array.from(parent.querySelectorAll(sel)); }
  function showFieldError(field, message){
    const container = document.querySelector(`.field-error[data-for="${field.id}"]`);
    if(container) container.textContent = message || '';
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
  }
  function clearFieldErrors(form){ qsaLocal('.field-error', form).forEach(e => e.textContent = ''); qsaLocal('[aria-invalid="true"]', form).forEach(f => f.removeAttribute('aria-invalid')); }
  function isEmailValid(email){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

  /* Booking form */
  const bookingForm = qs(CONFIG.selectors.bookingForm);
  if(bookingForm){
    const status = qs('#booking-form-status');
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault(); clearFieldErrors(bookingForm);
      const name = qsLocal('#booking-name', bookingForm);
      const email = qsLocal('#booking-email', bookingForm);
      const grade = qsLocal('#booking-grade', bookingForm);
      const date = qsLocal('#booking-date', bookingForm);
      const time = qsLocal('#booking-time', bookingForm);
      let ok = true;
      if(!name.value.trim()){ showFieldError(name,'Please enter your full name'); ok=false; }
      if(!email.value.trim()){ showFieldError(email,'Please provide an email'); ok=false; } else if(!isEmailValid(email.value.trim())){ showFieldError(email,'Please enter a valid email address'); ok=false; }
      if(!grade.value){ showFieldError(grade,'Please select a grade'); ok=false; }
      if(!date.value){ showFieldError(date,'Please select a preferred date'); ok=false; }
      if(!time.value){ showFieldError(time,'Please select a preferred time'); ok=false; }
      if(!ok){ if(status) status.textContent = 'Please correct the errors above.'; return; }
      if(status) status.textContent = 'Booking request submitted. We will review your request and contact you to confirm availability.';
      bookingForm.reset();
    });
  }

  /* Tutor form */
  const tutorForm = qs(CONFIG.selectors.tutorForm);
  if(tutorForm){
    const status = qs('#tutor-form-status');
    tutorForm.addEventListener('submit', (e) => {
      e.preventDefault(); clearFieldErrors(tutorForm);
      const name = qsLocal('#tutor-name', tutorForm);
      const email = qsLocal('#tutor-email', tutorForm);
      const education = qsLocal('#tutor-education', tutorForm);
      const why = qsLocal('#tutor-why', tutorForm);
      let ok = true;
      if(!name.value.trim()){ showFieldError(name,'Please enter your full name'); ok=false; }
      if(!email.value.trim()){ showFieldError(email,'Please provide an email'); ok=false; } else if(!isEmailValid(email.value.trim())){ showFieldError(email,'Please enter a valid email address'); ok=false; }
      if(!education.value.trim()){ showFieldError(education,'Please provide your education or grade level'); ok=false; }
      if(!why.value.trim()){ showFieldError(why,'Please tell us why you want to tutor'); ok=false; }
      if(!ok){ if(status) status.textContent = 'Please correct the errors above.'; return; }
      if(status) status.textContent = 'Application submitted locally. We will review and contact you if there is a role match.';
      tutorForm.reset();
    });
  }

  /* Contact form */
  const contactForm = qs(CONFIG.selectors.contactForm);
  if(contactForm){
    const status = qs('#contact-form-status');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); clearFieldErrors(contactForm);
      const name = qsLocal('#contact-name', contactForm);
      const email = qsLocal('#contact-email', contactForm);
      const who = qsLocal('#contact-who', contactForm);
      const msg = qsLocal('#contact-message', contactForm);
      let ok = true;
      if(!name.value.trim()){ showFieldError(name,'Please enter your name'); ok=false; }
      if(!email.value.trim()){ showFieldError(email,'Please provide an email'); ok=false; } else if(!isEmailValid(email.value.trim())){ showFieldError(email,'Please enter a valid email address'); ok=false; }
      if(!who.value){ showFieldError(who,'Please select an option'); ok=false; }
      if(!msg.value.trim()){ showFieldError(msg,'Please enter a message'); ok=false; }
      if(!ok){ if(status) status.textContent = 'Please correct the errors above.'; return; }
      if(status) status.textContent = 'Message submitted locally. We will reply if necessary. This is not an automatic email response.';
      contactForm.reset();
    });
  }
})();

/* ========= FAQ accordion ========= */
(function FAQ(){
  const questions = qsa(CONFIG.selectors.faqQuestions);
  if(questions.length === 0) return;
  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      questions.forEach(b => {
        b.setAttribute('aria-expanded','false');
        const cid = b.getAttribute('aria-controls');
        const region = cid ? qs(`#${cid}`) : null;
        if(region) region.hidden = true;
      });
      if(!expanded){
        btn.setAttribute('aria-expanded','true');
        const cid = btn.getAttribute('aria-controls');
        const region = cid ? qs(`#${cid}`) : null;
        if(region) region.hidden = false;
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
      if(entry.isIntersecting){ entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    });
  }, {threshold: 0.12});
  revealEls.forEach(el => observer.observe(el));
})();

/* ========= Accessibility helpers & sanity checks ========= */
(function Accessibility(){
  const yearEl = qs('#copyright-year'); if(yearEl) yearEl.textContent = new Date().getFullYear();
  qsa('.card[tabindex]').forEach(c => { c.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') c.click && c.click(); }); });
  // Sanity: warn if nav anchors target missing ids
  qsa('a[data-nav]').forEach(a => { const href = a.getAttribute('href') || ''; if(href.startsWith('#')){ const target = document.querySelector(href); if(!target) console.warn(`Navigation link points to missing target: ${href}`); } });
})();
