:root{
  --brand: #0f6b3a; /* Edina Green */
  --brand-600: #0e6035;
  --muted: #6b6f72;
  --bg: #fbfdfb;
  --card-bg: #ffffff;
  --radius: 10px;
  --page-max: 1100px;
  --gutter: 1.25rem;
  --session-price: 10;
  --shadow: 0 6px 20px rgba(15,107,58,0.06);
  --focus-ring: 3px rgba(15,107,58,0.18);
  font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  color-scheme: light;
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  background:linear-gradient(180deg, var(--bg), #f7fbf7 60%);
  color:#0b1113;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  line-height:1.45;
  font-size:16px;
  padding-bottom:3rem;
}

/* Layout container */
.container{
  max-width:var(--page-max);
  margin:0 auto;
  padding:1.25rem;
}

/* Header */
.site-header{
  position:sticky;
  top:0;
  background:rgba(255,255,255,0.98);
  border-bottom:1px solid #e9efe9;
  z-index:40;
  backdrop-filter:saturate(120%) blur(4px);
}
.header-inner{
  display:flex;
  gap:1rem;
  align-items:center;
  justify-content:space-between;
  padding:0.6rem 0;
}

.brand{display:flex;gap:.6rem;align-items:center;text-decoration:none;color:var(--brand-600)}
.brand-mark{flex:0 0 40px;border-radius:6px}
.brand-name{font-weight:700;font-size:1.15rem;letter-spacing:0.2px}

/* Navigation */
.main-nav{display:flex;align-items:center;gap:1rem;}
.nav-list{
  list-style:none;margin:0;padding:0;display:flex;gap:1rem;align-items:center;
}
.nav-list a{color:inherit;text-decoration:none;padding:.5rem .6rem;border-radius:6px;transition:background .15s,color .15s}
.nav-list a:hover,.nav-list a:focus{background:rgba(15,107,58,0.06);outline:none}
.nav-link.active{background:var(--brand);color:white;box-shadow:var(--shadow)}

/* Hamburger: hidden on desktop */
.nav-toggle{display:none;background:none;border:0;padding:.4rem;border-radius:8px}
.nav-toggle:focus{outline:3px solid var(--brand);outline-offset:2px}
.hamburger{display:block;width:22px;height:2px;background:#222;position:relative;border-radius:2px}
.hamburger::before,.hamburger::after{content:"";position:absolute;left:0;right:0;height:2px;background:#222;border-radius:2px}
.hamburger::before{top:-7px} .hamburger::after{top:7px}

/* Hero */
.hero-section{padding:2.5rem 0}
.hero-grid{display:grid;grid-template-columns:1fr 420px;gap:2rem;align-items:center}
.hero-copy h1{margin:0 0 .6rem;font-size:clamp(1.4rem, 3.8vw, 2.2rem);line-height:1.05}
.lead{color:var(--muted);margin:.4rem 0 1rem}
.hero-ctas{display:flex;gap:.8rem;align-items:center;margin-bottom:.6rem}
.btn{display:inline-flex;align-items:center;gap:.5rem;padding:.6rem .9rem;border-radius:10px;text-decoration:none;border:1px solid transparent;cursor:pointer;font-weight:600}
.btn.primary{background:var(--brand);color:white}
.btn.ghost{background:transparent;color:var(--brand);border-color:rgba(15,107,58,0.08)}
.btn.large{padding:0.9rem 1.15rem;font-size:1.05rem}
.home-features{display:flex;gap:.6rem;padding:0;margin:1rem 0 0;list-style:none}
.pill{background:#f1f7f2;border-radius:999px;padding:.3rem .6rem;color:var(--brand-600);font-weight:600;font-size:.86rem}

/* Hero visual */
.hero-visual{display:flex;align-items:center;justify-content:center}
.math-visual{width:100%;max-width:420px;height:auto;border-radius:16px;box-shadow:var(--shadow)}

/* Sectioning */
.section{padding:2.25rem 0}
.section.alt{background:linear-gradient(180deg, rgba(240,247,241,0.6), rgba(255,255,255,0.6))}
.section-title{margin:0 0 .35rem;font-size:1.25rem}
.section-sub{margin:0 0 1rem;color:var(--muted)}

/* Cards grid */
.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:1rem}
.card{background:var(--card-bg);padding:1rem;border-radius:10px;box-shadow:var(--shadow)}
.card h3{margin-top:0}

/* three points */
.three-points{display:flex;gap:1rem;flex-wrap:wrap;margin-top:1rem}
.point{flex:1;padding:1rem;background:var(--card-bg);border-radius:10px;box-shadow:var(--shadow)}

/* goal */
.goal{margin-top:1rem;padding:1rem;background:linear-gradient(180deg, rgba(15,107,58,0.03), rgba(255,255,255,0.02));border-radius:10px}

/* Two column layout */
.two-col{display:grid;grid-template-columns:2fr 1fr;gap:1.25rem;align-items:start}
.content{padding-right:0}
.booking-card,.application-card,.contact-info{background:var(--card-bg);padding:1rem;border-radius:10px;box-shadow:var(--shadow)}

/* Pricing */
.pricing{margin-top:1rem}
.price{margin:0}
.price.large{font-size:1.4rem;font-weight:700}
.price-amount{font-family:Inter,system-ui,monospace}

/* Checklist */
.checklist{list-style:none;padding:0;margin:0 0 1rem}
.checklist li{padding:0.35rem 0;border-bottom:1px dashed #eef6ee;color:#24302a}

/* Forms */
.form{display:flex;flex-direction:column;gap:.6rem}
.form label{font-size:.95rem}
.form input[type="text"],.form input[type="email"],.form input[type="date"],.form input[type="time"],.form select,.form textarea{
  padding:.6rem .7rem;border:1px solid #e6efe6;border-radius:8px;background:white;font-size:1rem;color:inherit;
}
.form input:focus,.form select:focus,.form textarea:focus{outline: none; box-shadow: 0 0 0 var(--focus-ring); border-color:var(--brand)}
.form .muted{color:var(--muted);font-size:.9rem}
.form-feedback{margin-top:.5rem;color:var(--brand-600)}

/* Footer */
.site-footer{margin-top:2.5rem;padding:1.25rem 0;border-top:1px solid #eef6ee}
.footer-inner{display:flex;justify-content:space-between;align-items:center;gap:1rem}
.footer-links{display:flex;list-style:none;gap:1rem;margin:0;padding:0}
.footer-links a{text-decoration:none;color:var(--muted)}

/* FAQ */
.faq-list{display:grid;gap:.6rem}
.faq-question{width:100%;text-align:left;padding:.6rem;border-radius:8px;background:linear-gradient(180deg,#fff,#fbfffb);border:1px solid #eaf4ea;font-weight:600;cursor:pointer}
.faq-answer{padding:.6rem .8rem;border-left:3px solid var(--brand);background:#fbfffb;border-radius:0 8px 8px 8px;margin-top:0.4rem}

/* Reveal animation helper */
.reveal{opacity:0;transform:translateY(10px);transition:all .6s cubic-bezier(.2,.9,.2,1)}
.reveal.visible{opacity:1;transform:none}

/* Responsive */
@media (max-width:1000px){
  .hero-grid{grid-template-columns:1fr 320px}
  .cards{grid-template-columns:repeat(2,1fr)}
  .two-col{grid-template-columns:1fr}
  .booking-card{order:2}
}
@media (max-width:720px){
  .header-inner{padding:.6rem .6rem}
  .nav-list{position:fixed;top:72px;right:12px;background:white;flex-direction:column;padding:1rem;border-radius:10px;box-shadow:0 14px 44px rgba(0,0,0,0.08);display:none}
  .nav-list.show{display:flex}
  .nav-toggle{display:block}
  .hero-grid{grid-template-columns:1fr;gap:1rem}
  .cards{grid-template-columns:1fr}
  .brand-name{display:none}
  .site-footer .footer-inner{flex-direction:column;align-items:start;gap:.5rem}
}

/* focus states for keyboard nav */
a:focus,button:focus,input:focus,select:focus,textarea:focus{outline:none;box-shadow:0 0 0 var(--focus-ring)}

/* small utilities */
.small{font-size:.9rem}
.muted{color:var(--muted)}
