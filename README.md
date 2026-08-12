# Axilyn — Accessible Math Tutoring (Static Website)

This repository contains a small, modern, accessible, and responsive website for Axilyn, a math tutoring business focused on middle school students (grades 6–8). The site is built with plain HTML, CSS, and JavaScript and is intentionally simple so it's easy to run and modify.

Contents
- index.html — the full single-page site (sections act as pages)
- styles.css — styling and layout
- script.js — interactivity (menu, smooth scrolling, validation, reveals)
- README.md — this file

Design goals
- Professional, modern, trustworthy, and student-friendly.
- Focus on "understanding over memorization".
- Accessible: semantic HTML, proper labels, keyboard-accessible controls, visible focus states.
- No paid frameworks or services required.

Brand color
- Primary brand color: Edina Green
- Hex: #0f6b3a
- The color is defined in `styles.css` under the `:root` selector as the `--brand` CSS variable. Edit that variable to change the site-wide primary color.

How to run locally
1. Download or clone the repository.
2. Open `index.html` in your web browser.
   - Optionally serve it with a static server (e.g., `npx http-server`, Python's `python -m http.server 8000`) to test as a site.

How the site is organized
- The site is built as a single-page app with sections:
  - Home (hero), What We Offer
  - Why Axilyn
  - Tutoring (includes booking request)
  - Become a Tutor (includes application form)
  - Contact
  - FAQ and Final CTA
- Navigation links scroll to section anchors for a smooth single-page experience.

Editing content
- Change headings, copy, or structure directly in `index.html`.
- Colors and layout variables are in `styles.css` under the `:root` selector (e.g., `--brand`).
- Session price:
  - The canonical place to change the session price is in `script.js`:
    - Edit the `SESSION_PRICE` constant near the top of `script.js`.
  - A CSS fallback variable `--session-price` exists but the JS value is authoritative for dynamic rendering.

Interactive features and where to connect backends
- Mobile hamburger menu: `script.js` toggles `.nav-list.show`.
- Smooth scrolling and navigation highlight: IntersectionObserver in `script.js`.
- Reveal animations: elements with `.reveal` are animated when scrolled into view.
- FAQ accordion: accessible buttons toggle answers.
- Forms:
  - Contact form (`#contact-form`)
  - Tutor application (`#tutor-form`)
  - Booking request (`#booking-form`)
- Current form behavior:
  - Client-side validation runs and a fake submit handler shows a confirmation message.
  - These handlers are implemented in `script.js` by `fakeSubmit()`.

Connecting a real backend
- Replace `fakeSubmit()` in `script.js` with actual fetch() calls to your backend or a form service:
  - Example:
    fetch('/api/contact', {
      method: 'POST',
      body: new FormData(formEl)
    })
- Booking & scheduling:
  - Integrate with a scheduling system (Calendly, Acuity, or your own) by posting booking requests to an API or embedding a scheduler widget in the booking area.
- Tutor applications:
  - Post application form data to your applicant tracking endpoint or send it to a configured email via server-side logic or third-party form services.

Accessibility notes
- Semantic HTML and heading order is used.
- All form fields have labels and required attributes where appropriate.
- Mobile nav is keyboard accessible; focus states are visible.
- All images/graphics include alt text or aria labels for meaning.

Deployment (GitHub Pages)
1. Create a new GitHub repository and push these files.
2. In repository settings -> Pages, choose the branch and the root folder to publish.
3. Your site will be available at the GitHub Pages URL after a short build.

Customization checklist (quick)
- Brand color: edit `--brand` in `styles.css` (currently Edina Green: `#0f6b3a`).
- Fonts: modify the Google Fonts link in `index.html` (or remove to rely on system fonts).
- Session price: edit `SESSION_PRICE` in `script.js`.
- Add real backends: replace `fakeSubmit()` with fetch() calls to your API.

Notes and constraints
- The current implementation does not process real payments or schedule appointments automatically.
- Do not claim guaranteed results or specific grade improvements anywhere on the site.

If you'd like, I can:
- Update the `--brand` value in `styles.css` to a different hex for a slightly different shade of Edina Green.
- Split this into multiple HTML pages (one per "page") instead of a single-page layout.
- Add an example serverless function (Node/AWS Lambda) to accept form submissions.
- Provide an embed snippet for a scheduler like Calendly.
- Create a small deploy script or GitHub Actions workflow for automatic deployment to GitHub Pages.

Would you like me to also update the CSS directly to a different Edina Green hex, or is #0f6b3a the exact shade you want to use?
