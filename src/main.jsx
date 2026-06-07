import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const A = '/assets/';

const nav = [
  ['/', 'Home'],
  ['/ceremony', 'The Process'],
  ['/#gallery', 'Gallery'],
  ['/blog', 'Blog'],
];

const serviceAreas = ['Dallas', 'Fort Worth', 'Frisco', 'Irving', 'Southlake', 'Plano'];
const facebookUrl = 'https://www.facebook.com/profile.php?id=61572066505806';
const whatsappPlaceholderUrl = '#whatsapp-placeholder';
const formspreeEndpoint = 'https://formspree.io/f/mlgvplqj';

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
          const hash = href.includes('#') ? href.split('#')[1] : '';
          window.history.pushState({}, '', href);
          window.dispatchEvent(new PopStateEvent('popstate'));
          window.setTimeout(() => {
            if (hash) {
              document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 0);
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
          <div className="hero-actions">
            <Link href="/contact" className="button button-saffron">Check Availability</Link>
            <a href={whatsappPlaceholderUrl} className="whatsapp-button hero-whatsapp-button" aria-label="WhatsApp placeholder button">Message us on WhatsApp</a>
          </div>
        </div>
      </section>
      <TraditionSection className="reveal" />
      <ExperienceSection className="reveal home-experience" />
      <PearlSection className="reveal" />
      <PricingSection className="reveal" />
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

function ExperienceSection({ className = '', includeCeremonyExamples = false } = {}) {
  const revealSteps = className.includes('reveal');
  const stepOneBody = includeCeremonyExamples ? (
    <>Share your date, location, and the type of ceremony or gathering you are planning.<br /><br />Pearl can be included in many meaningful moments, including Griha Pravesh, pujas, house blessings, business openings, temple events, and family celebrations.</>
  ) : 'Share your date, location, and the type of ceremony or gathering you are planning.';
  const steps = [
    ['01', 'Tell us about your ceremony', stepOneBody],
    ['02', 'Prepare for Pearl’s Visit', 'We’ll confirm the timing, location, and setup before Pearl’s visit.'],
    ['03', 'A peaceful visit', "On the day of, Pearl and a handler will arrive and guide you through the whole process. It's calm, respectful, and special for the whole family."],
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

function PricingSection({ className = '' } = {}) {
  const includedItems = [
    'Pearl the Brahma cow',
    'Trained handler',
    'Includes first hour on-site',
    'Calm arrival and departure',
    'Simple preparation guidance',
  ];

  return (
    <section className={`section pricing-section ${className}`}>
      <div className="container pricing-container">
        <header className="pricing-header">
          <Eyebrow>Pricing</Eyebrow>
          <h2>Simple Pricing</h2>
          <p>Simple pricing for Pearl’s ceremony visit, with optional photo and video add-ons coming soon.</p>
        </header>

        <article className="pricing-card">
          <div className="pricing-card-head">
            <h3>Pearl Ceremony Visit</h3>
            <strong>Starting at $500</strong>
            <p>Includes Pearl, her handler, arrival coordination, and includes first hour on-site.</p>
          </div>

          <ul className="pricing-included-list">
            {includedItems.map((item) => (
              <li key={item}>
                <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="pricing-card-footer">
            <p><strong>Additional time:</strong> $250 per additional hour</p>
            <small>Travel fees may apply depending on location.</small>
          </div>

          <Link href="/contact#inquiry" className="button button-dark pricing-button">Request Availability</Link>
        </article>

        <div className="pricing-addons">
          <h3>Coming Soon: Ceremony Add-Ons</h3>
          <div className="pricing-addons-grid">
            <article>
              <h4>Professional Photography</h4>
              <p>Capture the meaningful moments with polished ceremony photos your family can keep and share.</p>
            </article>
            <article>
              <h4>Professional Videography</h4>
              <p>Preserve Pearl’s visit and your ceremony with a professionally filmed video.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function InquirySection({ className = '' } = {}) {
  const [formStatus, setFormStatus] = useState('idle');

  async function handleInquirySubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus('sending');

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('Form submission failed');
      form.reset();
      setFormStatus('sent');
    } catch (error) {
      setFormStatus('error');
    }
  }

  return (
    <section className={`section inquiry-section ${className}`} id="inquiry">
      <div className="container inquiry-card">
        <aside className="inquiry-side">
          <h2>Invite the Divine</h2>
          <p>Planning a housewarming puja, pooja, Griha Pravesh, or Gau Mata blessing? Share your ceremony date, city, and preferred time, and our team will help coordinate to meet your needs.</p>
          <div className="contact-line"><span className="material-symbols-outlined">location_on</span>Dallas-Fort Worth Area</div>
          <a href={whatsappPlaceholderUrl} className="whatsapp-button whatsapp-button-side" aria-label="WhatsApp placeholder button">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
            Message on WhatsApp
          </a>
        </aside>
        <form className="inquiry-form" onSubmit={handleInquirySubmit}>
          <div className="form-row">
            <label>Full Name<input name="name" placeholder="Name" required /></label>
            <label>Email<input name="email" type="email" placeholder="you@example.com" required /></label>
          </div>
          <div className="form-row">
            <label>Phone<input name="phone" type="tel" placeholder="Phone number" required /></label>
            <label>Location<input name="location" placeholder="City" required /></label>
          </div>
          <label>Preferred Ceremony Date<input name="preferred_date" type="date" required /></label>
          <label>Special Notes<textarea name="notes" placeholder="Feel free to add any extra info here" /></label>
          <div className="form-actions">
            <button className="button button-dark" type="submit" disabled={formStatus === 'sending'}>
              {formStatus === 'sending' ? 'Sending...' : 'Send Inquiry'}
            </button>
            <a href={whatsappPlaceholderUrl} className="whatsapp-button" aria-label="WhatsApp placeholder button">
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              WhatsApp
            </a>
          </div>
          {formStatus === 'sent' && <p className="form-status">Thank you. We received your inquiry and will follow up to confirm availability.</p>}
          {formStatus === 'error' && <p className="form-status form-status-error">Something went wrong. Please try again or use the chat button to reach us.</p>}
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
  [
    'Do you only do housewarmings?',
    <>
      No! we perform cow puja / pooja for any sacred occasion. Temple visits, community festivals, coming-of-age ceremonies, weddings, business openings, school cultural days, and wellness events. If you want to invite the energy of the sacred cow, we can make it happen. <Link href="/contact#inquiry">Contact us</Link> to plan your puja.
    </>,
  ],
  ['What is a cow blessing?', "A cow blessing is a gentle sacred-cow visit for a meaningful milestone or ceremony — a new home, wedding, family celebration, business opening, temple/community event, or any occasion where you want to welcome peace, auspicious energy, and Pearl’s calming presence."],
  ['Where do you travel in DFW?', 'We serve the entire Dallas-Fort Worth area, including Frisco, Plano, McKinney, and surrounding suburbs.'],
  ['How far in advance should I book?', 'We suggest reaching out 2-3 weeks in advance to ensure we can find a time that works for you.'],
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
      <PageHero eyebrow="Ceremony" title="A calm process for a meaningful first step." body="From timing to arrival to Pearl’s calm departure, the experience is simple, spacious, respectful, and family-first." />
      <ExperienceSection includeCeremonyExamples />
      <section className="section"><div className="container cards-grid"><InfoCard title="Before the day" text="Share your date, address, access notes, priest timing, and anything your family wants us to know." /><InfoCard title="During the visit" text="Pearl arrives calmly, the entry is protected, and the family has room to observe the blessing." /><InfoCard title="After the blessing" text="We guide Pearl out calmly and respectfully, so your family can continue the rest of the ceremony or celebration." /></div></section>
      <InquirySection />
    </>
  );
}

function Locations() {
  const cities = ['Plano', 'Frisco', 'Southlake', 'McKinney', 'Fort Worth', 'Highland Park', 'Arlington', 'Dallas', 'Irving', 'Richardson', 'Allen', 'Prosper'];
  const milestones = [
    ['temple_hindu', 'Sacred Presence', "We'll bring Pearl to your location, ready for your family's ceremony, milestone, wedding, business opening, or new-home blessing."],
    ['stars', 'Grounded Guidance', 'Texas-friendly coordination that keeps the experience simple, calm, respectful, and meaningful for everyone gathered.'],
  ];
  return (
    <>
      <section className="locations-hero">
        <div className="locations-hero-bg" />
        <div className="locations-hero-glow" />
        <div className="container locations-hero-content reveal reveal-visible">
          <div className="locations-badge"><span className="material-symbols-outlined">location_on</span>Dallas-Fort Worth</div>
          <h1>Sacred Cow Blessing in <span>DFW</span></h1>
          <p>Bringing the peaceful energy of Pearl to homes, temples, businesses, schools, weddings, and family celebrations across the Dallas-Fort Worth area.</p>
          <div className="locations-hero-actions">
            <Link href="/contact#inquiry" className="button button-saffron">Check Availability</Link>
            <Link href="/contact" className="button locations-outline-button">Contact Us</Link>
          </div>
        </div>
      </section>

      <div className="locations-divider" aria-hidden="true"><span className="material-symbols-outlined">eco</span></div>

      <section className="section locations-service-section">
        <div className="container locations-bento">
          <article className="locations-service-card locations-service-card-large">
            <div>
              <h2>Texas-friendly service areas</h2>
              <p>We bring the Gau Pravesh tradition directly to your doorstep across Dallas-Fort Worth and nearby North Texas communities.</p>
              <div className="locations-city-pills">{cities.map((city) => <span key={city}>{city}</span>)}<span>and more</span></div>
            </div>
            <span className="material-symbols-outlined locations-map-watermark" aria-hidden="true">map</span>
          </article>
          <article className="locations-service-card locations-support-card">
            <h3>Local Support</h3>
            <p>We respectfully provide a cow visit and experienced handler for families already observing Hindu house-blessing traditions such as Gau Puja, Gau Pravesh, or Griha Pravesh in the DFW area.</p>
            <span className="material-symbols-outlined" aria-hidden="true">support_agent</span>
          </article>
        </div>
      </section>

      <section className="section locations-experience-section">
        <div className="container locations-experience-grid">
          <div className="locations-pearl-frame">
            <img src={`${A}brahman-cow.jpg`} alt="Pearl the gentle Brahma cow prepared for a sacred blessing visit" />
            <div className="locations-pearl-label"><small>Our Gentle Soul</small><strong>Meet Pearl</strong></div>
          </div>
          <article className="locations-experience-copy">
            <Eyebrow>The Gau Pravesh Journey</Eyebrow>
            <h2>We'll bring Pearl to you, with care and tradition.</h2>
            <p>Our process is designed to be grounded and helpful. We understand the significance of your next milestone or celebration in Texas, and we help make Pearl's visit feel seamless, calm, and joyful for your family.</p>
            <div className="locations-feature-list">
              {milestones.map(([icon, title, text]) => (
                <div className="locations-feature" key={title}>
                  <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section locations-cta-section">
        <div className="container locations-cta-card">
          <span className="material-symbols-outlined locations-cta-watermark" aria-hidden="true">auto_awesome</span>
          <h2>Bring peace to your celebration</h2>
          <p>Our DFW team is here to help coordinate Pearl's presence for housewarmings, weddings, temple and community events, business openings, school cultural days, and other sacred occasions.</p>
          <div className="locations-contact-strip">
            <div>
              <small>Start with availability</small>
              <strong>Share your city, date, and ceremony notes.</strong>
            </div>
            <a href={whatsappPlaceholderUrl} className="whatsapp-button" aria-label="WhatsApp placeholder button">
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </section>
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
