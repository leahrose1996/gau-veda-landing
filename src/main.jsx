import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const A = '/assets/';

const nav = [
  ['/', 'The Tradition'],
  ['/ceremony', 'The Process'],
  ['/locations', 'Gallery'],
  ['/blog', 'Blog'],
];

const serviceAreas = ['Dallas', 'Fort Worth', 'Frisco', 'Irving', 'Southlake', 'Plano'];
const facebookUrl = 'https://www.facebook.com/profile.php?id=61572066505806';

const routes = {
  '/': 'home',
  '/about': 'about',
  '/ceremony': 'ceremony',
  '/locations': 'locations',
  '/faq': 'faq',
  '/blog': 'blog',
  '/contact': 'contact',
  '/request-availability': 'contact',
};

function pathKey() {
  return routes[window.location.pathname] || 'home';
}

function Link({ href, children, className = '', onClick }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (href.startsWith('/')) {
          event.preventDefault();
          window.history.pushState({}, '', href);
          window.dispatchEvent(new PopStateEvent('popstate'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const current = window.location.pathname;
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand-lockup" aria-label="Sacred Cow Blessing home">
          <strong>Sacred Cow Blessing</strong>
        </Link>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label="Open menu">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
          {nav.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={(href === current || (href === '/' && current === '/about')) ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className={`nav-dropdown ${current === '/locations' ? 'active' : ''}`}>
            <Link href="/locations" className="nav-dropdown-trigger" onClick={() => setOpen(false)}>
              Areas we serve
              <span className="material-symbols-outlined" aria-hidden="true">expand_more</span>
            </Link>
            <div className="nav-dropdown-menu" aria-label="Areas we serve locations">
              {serviceAreas.map((area) => <Link href="/locations" key={area} onClick={() => setOpen(false)}>{area}</Link>)}
            </div>
          </div>
          <Link href="/contact" className="button button-dark" onClick={() => setOpen(false)}>Check Availability</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand-lockup">
            <span className="brand-seal">◌</span>
            <span>
              <strong>GAU VEDA</strong>
              <small>SACRED BLESSINGS</small>
            </span>
          </Link>
          <p>Bringing ancient traditions to the modern home with reverence and grace.</p>
        </div>
        <div className="footer-list">
          <h4>Discover</h4>
          <Link href="/">The Tradition</Link>
          <Link href="/ceremony">The Process</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className="footer-list">
          <h4>Support</h4>
          <Link href="/contact">Contact</Link>
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2024 Sacred Cow Blessing. A beautiful start for your new home.</p>
        <div className="footer-icons">
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Follow Pearl the Brahma on Facebook" className="social-icon facebook-icon">f</a>
          <span aria-hidden="true" className="material-symbols-outlined">favorite</span>
        </div>
      </div>
    </footer>
  );
}

function Eyebrow({ children }) { return <div className="eyebrow">{children}</div>; }
function SectionHeading({ eyebrow, title, centered = true }) {
  return <div className={`section-heading ${centered ? 'centered' : ''}`}><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2><span className="gold-rule" /></div>;
}

function Home() {
  return (
    <>
      <section className="hero stitch-hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <h1>Bring a Gentle Blessing to<br />Your New Home</h1>
          <p>We bring a gentle Brahma cow to your doorstep for a unique and meaningful blessing. Perfect for families starting their next chapter in Texas.</p>
          <Link href="/contact" className="button button-saffron">Check Availability</Link>
        </div>
      </section>
      <TraditionSection className="reveal" />
      <ExperienceSection className="reveal" />
      <PearlSection className="reveal" />
      <InquirySection className="reveal" />
      <FinalCta className="reveal" />
      <FaqSection compact className="reveal" />
    </>
  );
}

function TraditionSection({ className = '' } = {}) {
  return (
    <section className={`section tradition-section ${className}`} id="tradition">
      <div className="container two-col">
        <div className="tilted-card"><img src={`${A}brahman-cow.jpg`} alt="Gentle Brahma cow prepared for a sacred blessing" /></div>
        <article className="prose-block">
          <Eyebrow>Honoring Gaumata</Eyebrow>
          <h2>The Sacredness of Gau Pravesh</h2>
          <p>In many traditions, the cow is seen as a symbol of peace and motherhood. Having her step into your home first is a simple, beautiful way to bring good energy to your new space. We make it easy for families here in DFW to share in this peaceful ceremony.</p>
          <p>Our service bridges ancient heritage with contemporary homeownership, providing a seamless and respectful experience for your family's new beginning.</p>
          <div className="signature"><span /> <em>Tradition in every step</em></div>
        </article>
      </div>
    </section>
  );
}

function ExperienceSection({ className = '' } = {}) {
  const revealSteps = className.includes('reveal');
  const steps = [
    ['01', "Let us know when you're moving in", "Let us know when you're moving in and where you are in DFW. We'll help find the best time for the visit."],
    ['02', 'We handle the details', 'We handle all the setup and cleaning. You just focus on your family and the moment.'],
    ['03', 'A peaceful visit', "On the day of, we'll arrive and guide you through the whole process. It's calm, respectful, and special for the whole family."],
  ];
  return (
    <section className={`section alt-section ${className}`} id="process">
      <div className="container">
        <SectionHeading eyebrow="The Experience" title="What to Expect" />
        <div className="steps-grid">
          {steps.map(([n, title, body], index) => <article className={`step-item ${revealSteps ? `reveal delay-${(index + 1) * 100}` : ''}`} key={n}><span>{n}</span><h3>{title}</h3><i /><p>{body}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function PearlSection({ className = '' } = {}) {
  return (
    <section className={`section pearl-section ${className}`} id="gallery">
      <div className="container">
        <div className="pearl-head">
          <div><Eyebrow>Our Star</Eyebrow><h2>Meet Pearl</h2></div>
          <div className="badges"><span>Pure Brahma Breed</span><span>Gentle Cow</span></div>
        </div>
        <div className="gallery-grid">
          <img className="gallery-main" src={`${A}griha-pravesh.jpg`} alt="Griha Pravesh ceremony details" />
          <img src={`${A}rangoli-diyas.jpg`} alt="Rangoli and diya lamps prepared for blessing" />
          <img src={`${A}brahman-cow.jpg`} alt="Pearl the gentle Brahma cow" />
        </div>
        <div className="pearl-social-cta">
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="button facebook-follow-button">
            <span className="facebook-mini" aria-hidden="true">f</span>
            Follow Pearl the Brahma
          </a>
        </div>
      </div>
    </section>
  );
}

function InquirySection({ className = '' } = {}) {
  const [sent, setSent] = useState(false);
  return (
    <section className={`section inquiry-section ${className}`} id="inquiry">
      <div className="container inquiry-card">
        <aside className="inquiry-side">
          <h2>Invite the Divine</h2>
          <p>Begin the journey of a sacred home blessing. Our team will coordinate with you to find a perfect time.</p>
          <div className="contact-line"><span className="material-symbols-outlined">location_on</span>Dallas-Fort Worth Area</div>
          <div className="contact-line"><span className="material-symbols-outlined">mail</span>namaste@sacredcowblessing.com</div>
        </aside>
        <form className="inquiry-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
          <div className="form-row">
            <label>Full Name<input placeholder="Name" required /></label>
            <label>Location in DFW<input placeholder="City" required /></label>
          </div>
          <label>Preferred Ceremony Date<input type="date" required /></label>
          <label>Special Notes<textarea placeholder="Tell us about your new home..." /></label>
          <button className="button button-dark" type="submit">Send Inquiry</button>
          {sent && <p className="form-status">Thank you. We received your inquiry and will follow up to confirm availability.</p>}
        </form>
      </div>
    </section>
  );
}

function FinalCta({ className = '' } = {}) {
  return (
    <section className={`section cta-wrap ${className}`}>
      <div className="container final-cta">
        <span className="watermark material-symbols-outlined">temple_hindu</span>
        <h2>A beautiful start for your new home.</h2>
        <p>Join the hundreds of families in Texas who have started their lives in a new space with the gentle blessings of Gaumata.</p>
        <Link href="/contact" className="button button-outline">Request Availability</Link>
      </div>
    </section>
  );
}

const faqs = [
  ['What is a cow blessing?', "It's a beautiful tradition where a sacred cow is invited to step into your new home first. It's meant to bring peace and good energy to the family and the space."],
  ['How do you handle cleanup?', 'We take care of everything. We use floor protection and our team cleans up immediately, leaving your home exactly as it was, just with a new blessing.'],
  ['Where do you travel in DFW?', 'We serve the entire Dallas-Fort Worth area, including Frisco, Plano, McKinney, and surrounding suburbs.'],
  ['How far in advance should I book?', 'We suggest reaching out 2-3 weeks before your move-in date to ensure we can find a time that works for you.'],
];

function FaqSection({ compact = false, className = '' }) {
  const [open, setOpen] = useState(0);
  return (
    <section className={`section alt-section ${compact ? 'compact-faq' : ''} ${className}`}>
      <div className="container faq-container">
        <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <article className={`faq-item ${open === i ? 'open' : ''}`} key={q}>
              <button onClick={() => setOpen(open === i ? -1 : i)}>
                <h3>{q}</h3><span className="material-symbols-outlined">expand_more</span>
              </button>
              <p>{a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, body }) {
  return <section className="page-hero"><div className="container"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{body}</p></div></section>;
}

function About() {
  return (
    <>
      <PageHero eyebrow="About Sacred Cow Blessing" title="Ancient heritage, held with modern care." body="Sacred Cow Blessing exists to make Gau Pravesh feel peaceful, respectful, and beautifully coordinated for families beginning a new chapter in Texas." />
      <TraditionSection />
      <section className="section alt-section"><div className="container cards-grid"><InfoCard title="Reverence" text="Every ceremony is approached with warmth, seriousness, and respect for family tradition." /><InfoCard title="Ease" text="We handle the visit details so your household can focus on the prayerful moment." /><InfoCard title="Care" text="We plan around access, cleanup, elders, children, guests, and the feeling of the home." /></div></section>
      <FinalCta />
    </>
  );
}

function Ceremony() {
  return (
    <>
      <PageHero eyebrow="Ceremony" title="A calm process for a meaningful first step." body="From timing to arrival to cleanup, the experience follows the same quiet rhythm as the Stitch homepage: simple, spacious, respectful, and family-first." />
      <ExperienceSection />
      <section className="section"><div className="container cards-grid"><InfoCard title="Before the day" text="Share your date, address, access notes, priest timing, and anything your family wants us to know." /><InfoCard title="During the visit" text="Pearl arrives calmly, the entry is protected, and the family has room to observe the blessing." /><InfoCard title="After the blessing" text="Our team handles cleanup immediately and leaves your home ready for the rest of the ceremony." /></div></section>
      <InquirySection />
    </>
  );
}

function Locations() {
  const cities = ['Frisco', 'Plano', 'McKinney', 'Allen', 'Prosper', 'Irving', 'Richardson', 'Southlake', 'Dallas', 'Fort Worth'];
  return (
    <>
      <PageHero eyebrow="Locations / Service Area" title="Serving families across Dallas-Fort Worth." body="We confirm availability based on date, access, safety, parking, household flow, and the needs of your ceremony." />
      <section className="section"><div className="container service-area-page"><div><Eyebrow>Dallas-Fort Worth Area</Eyebrow><h2>Tell us where your new home is.</h2><p>We regularly review requests across DFW suburbs and surrounding communities. If your city is nearby, send the details and we will let you know what is realistic.</p><Link href="/contact" className="button button-dark">Request Availability</Link></div><div className="city-pills">{cities.map((city) => <span key={city}>{city}</span>)}</div></div></section>
      <FinalCta />
    </>
  );
}

function InfoCard({ title, text }) {
  return <article className="info-card"><h3>{title}</h3><p>{text}</p></article>;
}

function Blog() {
  const posts = [
    ['Rituals', '12 min read', "The Significance of Vastu Shanti: Balancing Your Home's Energy", 'Discover how the ancient practice of Vastu Shanti, combined with the sacred presence of Gaumata, transforms a physical dwelling into a spiritual sanctuary of peace.', 'brahman-cow.jpg', 'featured'],
    ['Family', '', 'Welcoming Gaumata: A Family Story', 'A DFW family shares their journey of preparing the threshold, gathering elders, and hosting a cow blessing with warmth and reverence.', 'griha-pravesh.jpg', 'secondary'],
    ['Guides', '', 'Preparing Your Home for a Blessing', 'Essential steps to create an auspicious environment for the arrival of grace, from entryway flow to family comfort.', 'rangoli-diyas.jpg', 'thirds'],
    ['Philosophy', '', 'The Five Elements & Sacred Cows', 'Understanding the elemental connection between Gaumata, the natural world, and a peaceful household.', 'brahman-cow.jpg', 'thirds'],
  ];
  return (
    <>
      <section className="blog-hero"><div className="container"><Eyebrow>Our Journal</Eyebrow><h1>Sacred Stories &amp; Vedic Wisdom</h1><p>Exploring the profound spiritual significance of Gaumata and the timeless rituals that bring peace, prosperity, and grace to the modern home.</p></div></section>
      <div className="blog-divider"><span className="material-symbols-outlined">auto_awesome</span></div>
      <section className="container blog-grid">
        {posts.map(([cat, time, title, text, img, size]) => <article className={`blog-card ${size}`} key={title}><div className="blog-image"><img src={`${A}${img}`} alt="Sacred Cow Blessing journal" /></div><div className="blog-body"><div className="post-meta"><span>{cat}</span>{time && <small>{time}</small>}</div>{size === 'featured' ? <h2>{title}</h2> : <h3>{title}</h3>}<p>{text}</p>{size === 'featured' && <b>Read full wisdom <span className="material-symbols-outlined">trending_flat</span></b>}</div></article>)}
        <aside className="archive-card"><span className="material-symbols-outlined">import_contacts</span><h3>More Wisdom Awaits</h3><p>Explore future articles on auspicious dates, family preparation, Vedic living, and ceremony etiquette.</p><Link href="/contact" className="button button-outline">Ask a Question</Link></aside>
      </section>
      <section className="newsletter-section"><div className="container newsletter-card"><Eyebrow>Stay Connected</Eyebrow><h2>Join our community for auspicious dates and traditional insights.</h2><p>Receive our monthly curation of Vedic wisdom and ceremony calendars directly in your inbox.</p><form onSubmit={(e) => e.preventDefault()}><input type="email" placeholder="Your email address" /><button className="button button-dark">Subscribe</button></form><small>We respect your peace. Unsubscribe at any time.</small></div></section>
    </>
  );
}

function Contact() { return <><PageHero eyebrow="Request Availability" title="Begin the journey of a sacred home blessing." body="Share your date, location, and notes about your new home. The form is frontend-only for now, so this preview confirms the design and flow before backend wiring." /><InquirySection /><FaqSection compact /></>; }

function App() {
  const [page, setPage] = useState(pathKey());
  React.useEffect(() => {
    const handler = () => setPage(pathKey());
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);
  React.useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll('.reveal'));
    if (!revealElements.length) return undefined;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('reveal-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [page]);
  const Page = { home: Home, about: About, ceremony: Ceremony, locations: Locations, faq: FaqSection, blog: Blog, contact: Contact }[page] || Home;
  return <><Header /><main><Page /></main><Footer /></>;
}

createRoot(document.getElementById('root')).render(<App />);
