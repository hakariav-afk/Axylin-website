document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     AXILYN WEBSITE JAVASCRIPT
     ===================================================== */

  /* ---------- SESSION PRICE ---------- */

  const SESSION_PRICE = 10;

  const priceElements = document.querySelectorAll(
    '[data-price-id="session-price"]'
  );

  priceElements.forEach((element) => {
    element.textContent = `$${SESSION_PRICE}`;
  });


  /* ---------- MOBILE NAVIGATION ---------- */

  const navToggle = document.getElementById("nav-toggle");
  const navList = document.getElementById("nav-list");

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("show");

      navToggle.setAttribute("aria-expanded", String(isOpen));

      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    /* Close menu after clicking a navigation link */

    const navLinks = navList.querySelectorAll("a");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navList.classList.remove("show");

        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }


  /* ---------- FAQ ---------- */

  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;

      if (!answer) return;

      const isOpen = question.getAttribute("aria-expanded") === "true";

      /* Close all other FAQ answers */

      faqQuestions.forEach((otherQuestion) => {
        if (otherQuestion !== question) {
          otherQuestion.setAttribute("aria-expanded", "false");

          const otherAnswer = otherQuestion.nextElementSibling;

          if (otherAnswer) {
            otherAnswer.hidden = true;
          }
        }
      });

      /* Toggle selected FAQ */

      question.setAttribute("aria-expanded", String(!isOpen));

      answer.hidden = isOpen;
    });
  });


  /* ---------- SCROLL REVEAL ---------- */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    /* Older browsers */

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }


  /* ---------- ACTIVE NAVIGATION ---------- */

  const sections = document.querySelectorAll("section[id]");
  const navigationLinks = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.getAttribute("id");

          navigationLinks.forEach((link) => {
            const linkTarget = link.getAttribute("href");

            link.classList.toggle(
              "active",
              linkTarget === `#${sectionId}`
            );
          });
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }


  /* ---------- BOOKING FORM ---------- */

  const bookingForm = document.getElementById("booking-form");
  const bookingFeedback = document.getElementById("booking-feedback");

  if (bookingForm && bookingFeedback) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
      }

      bookingFeedback.textContent =
        "Your booking request has been received. We will contact you to confirm availability.";

      bookingForm.reset();
    });
  }


  /* ---------- TUTOR APPLICATION ---------- */

  const tutorForm = document.getElementById("tutor-form");
  const tutorFeedback = document.getElementById("tutor-feedback");

  if (tutorForm && tutorFeedback) {
    tutorForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!tutorForm.checkValidity()) {
        tutorForm.reportValidity();
        return;
      }

      tutorFeedback.textContent =
        "Your application has been received. Thank you for your interest in tutoring with Axilyn.";

      tutorForm.reset();
    });
  }


  /* ---------- CONTACT FORM ---------- */

  const contactForm = document.getElementById("contact-form");
  const contactFeedback = document.getElementById("contact-feedback");

  if (contactForm && contactFeedback) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      contactFeedback.textContent =
        "Your message has been received. We will get back to you soon.";

      contactForm.reset();
    });
  }


  /* ---------- SMOOTH INTERNAL LINKS ---------- */

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });


  /* ---------- SET CURRENT YEAR ---------- */

  const yearElements = document.querySelectorAll("[data-current-year]");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
});
