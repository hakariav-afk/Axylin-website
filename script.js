/* Axilyn interactive behaviors
   - Edit the price here (dollars) for easy updates:
       const SESSION_PRICE = 10;
   - Connect forms to a backend by replacing the fakeSubmit functions with fetch() or other API calls.
*/

const SESSION_PRICE = 10; // <-- Edit the price here (USD) to change all visible session prices

document.addEventListener('DOMContentLoaded', () => {
  // Insert year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Inject price values
  document.querySelectorAll('[data-price-id="session-price"]').forEach(el => {
    el.textContent = `$${SESSION_PRICE.toFixed(2)}`;
  });

  // Nav toggle for mobile
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
    navToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      // allow normal behavior for empty or '#' links
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav if open
        navList.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Highlight nav links while scrolling (IntersectionObserver)
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href')));
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = `#${entry.target.id}`;
      const link = document.querySelector(`.nav-link[href="${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, {root: null, rootMargin: '-35% 0px -35% 0px', threshold: 0});
  sections.forEach(s => { if (s) sectionObserver.observe(s); });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.15});
  reveals.forEach(r => revealObserver.observe(r));

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const ans = btn.nextElementSibling;
      if (!ans) return;
      if (expanded) {
        ans.hidden = true;
      } else {
        ans.hidden = false;
      }
    });
  });

  // Simple client-side form validation and fake submit handlers
  const contactForm = document.getElementById('contact-form');
  const tutorForm = document.getElementById('tutor-form');
  const bookingForm = document.getElementById('booking-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    fakeSubmit(contactForm, 'contact-feedback', 'Thanks — we will respond by email soon.');
  });

  tutorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!tutorForm.checkValidity()) {
      tutorForm.reportValidity();
      return;
    }
    fakeSubmit(tutorForm, 'tutor-feedback', 'Application received. We will review and be in touch.');
  });

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      return;
    }
    fakeSubmit(bookingForm, 'booking-feedback', 'Booking request submitted. We will confirm availability by email.');
  });

  // Basic keyboard access: close mobile nav with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navList.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

/* Fake submit handler:
   Replace with a real fetch() to a backend endpoint when ready.
   For now: show a success message and reset form.
*/
function fakeSubmit(formEl, feedbackId, message) {
  const feedback = document.getElementById(feedbackId);
  // Basic UI feedback
  feedback.textContent = 'Submitting...';
  feedback.style.color = 'var(--muted)';
  // Simulate network latency
  setTimeout(() => {
    feedback.textContent = message;
    feedback.style.color = 'var(--brand-600)';
    formEl.reset();
    // If the form has a date input, set it back to blank rather than today
    const firstInput = formEl.querySelector('input, textarea, select');
    if (firstInput) firstInput.focus();
  }, 700);
}

/* Where to integrate real services later:
   - Replace fakeSubmit with an API call:
       fetch('/api/contact', {method:'POST', body: new FormData(formEl)})
     or send to a service (Formspree, Netlify forms, or your own backend).
   - Connect booking with a scheduler API: pass date/time, email, grade, etc.
   - For authentication and payment (if added later), use a secure server-side integration.
*/
