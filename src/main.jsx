import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import siteContent from '../content/site/main.json';
import './index.css';

const A = '/assets/';
const {
  settings,
  nav,
  footer,
  home,
  tradition,
  experience,
  pearl,
  pricing,
  inquiry,
  finalCta,
  faqs,
  pages,
  locations,
  blog,
} = siteContent;

const facebookUrl = settings.facebookUrl;
const whatsappUrl = settings.whatsappUrl;
const formspreeEndpoint = settings.formspreeEndpoint;
const serviceAreas = settings.serviceAreas;

const routes = {
  '/': 'home',
  '/about': 'about',
  '/ceremony': 'ceremony',
  '/cow-visits-for-temple-events': 'templeEvents',
  '/locations': 'locations',
  '/faq': 'faq',
  '/blog': 'blog',
  '/contact': 'contact',
  '/request-availability': 'contact',
};

const SITE_URL = 'https://www.sacredcowblessing.com/';
const SITE_ORIGIN = 'https://www.sacredcowblessing.com';
const STRUCTURED_DATA_ID = 'sacred-cow-blessing-jsonld';
const pagePaths = {
  home: '/',
  about: '/about',
  ceremony: '/ceremony',
  templeEvents: '/cow-visits-for-temple-events',
  locations: '/locations',
  faq: '/faq',
  blog: '/blog',
  contact: '/contact',
};

function asset(src) {
  if (!src) return '';
  if (src.startsWith('/') || src.startsWith('http')) return src;
  return `${A}${src}`;
}

function pathKey() {
  return routes[window.location.pathname] || 'home';
}

function absoluteUrl(path) {
  return path === '/' ? SITE_URL : `${SITE_ORIGIN}${path}`;
}

function buildStructuredData(page) {
  const pageUrl = absoluteUrl(pagePaths[page] || '/');
  const serviceDescription = page === 'templeEvents'
    ? 'Pearl, a gentle Brahma cow, visits temples, community gatherings, cultural programs, weddings, business openings, and wellness events across Dallas-Fort Worth for cow blessing, cow puja, and cow pooja experiences.'
    : 'Sacred Cow Blessing brings Pearl, a gentle Brahma cow, to homes, temples, ceremonies, weddings, business openings, schools, cultural programs, and community events across Dallas-Fort Worth.';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}#business`,
        name: settings.brandName,
        url: SITE_URL,
        image: `${SITE_ORIGIN}/assets/brahman-cow.jpg`,
        description: 'Sacred Cow Blessing provides cow blessings, Gau Pravesh, cow puja, cow pooja, and Brahma cow visits with Pearl across Dallas-Fort Worth.',
        sameAs: [facebookUrl],
        areaServed: serviceAreas.map((area) => ({
          '@type': 'City',
          name: area,
        })),
        serviceType: [
          'Cow blessings',
          'Gau Pravesh',
          'Cow puja',
          'Cow pooja',
          'Brahma cow visits',
          'Temple and community events',
          'Weddings',
          'Business openings',
          'Schools and cultural programs',
          'Wellness and community events',
        ],
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}#pearl-event-visits`,
        name: 'Pearl Cow Blessing and Event Visits',
        url: absoluteUrl('/cow-visits-for-temple-events'),
        description: serviceDescription,
        provider: { '@id': `${SITE_URL}#business` },
        areaServed: serviceAreas.map((area) => ({
          '@type': 'Place',
          name: area,
        })),
        serviceType: [
          'Cow blessing',
          'Gau Pravesh',
          'Cow puja',
          'Cow pooja',
          'Brahman cow visit',
          'Temple event cow visit',
        ],
        mainEntityOfPage: pageUrl,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        name: settings.brandName,
        url: SITE_URL,
        publisher: { '@id': `${SITE_URL}#business` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${absoluteUrl('/faq')}#faq`,
        url: absoluteUrl('/faq'),
        mainEntity: faqs.items.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
      },
    ],
  };
}

function updateStructuredData(page) {
  let script = document.getElementById(STRUCTURED_DATA_ID);
  if (!script) {
    script = document.createElement('script');
    script.id = STRUCTURED_DATA_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(buildStructuredData(page));
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

function ExternalOrInternalLink({ item, children, ...props }) {
  const href = item.href === 'facebook' ? facebookUrl : item.href;
  if (href.startsWith('http')) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children ?? item.label}</a>;
  }
  return <Link href={href} {...props}>{children ?? item.label}</Link>;
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const current = window.location.pathname;
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand-lockup" aria-label={`${settings.brandName} home`}>
          <strong>{settings.brandName}</strong>
        </Link>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label="Open menu">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
          {nav.map(({ href, label }) => (
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
              <strong>{settings.footerBrandTitle}</strong>
              <small>{settings.footerBrandSubtitle}</small>
            </span>
          </Link>
          <p>{footer.description}</p>
        </div>
        <div className="footer-list">
          <h4>Discover</h4>
          {footer.discoverLinks.map((item) => <ExternalOrInternalLink key={item.label} item={item} />)}
        </div>
        <div className="footer-list">
          <h4>Support</h4>
          {footer.supportLinks.map((item) => <ExternalOrInternalLink key={item.label} item={item} />)}
        </div>
      </div>
      <div className="container footer-bottom">
        <p>{footer.copyright}</p>
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
          <h1>{home.hero.titleLine1}<br />{home.hero.titleLine2}</h1>
          <p>{home.hero.body}</p>
          <div className="hero-actions">
            <Link href="/contact" className="button button-saffron">{home.hero.primaryButton}</Link>
            <a href={whatsappUrl} className="whatsapp-button hero-whatsapp-button" aria-label="Message Sacred Cow Blessing on WhatsApp">{home.hero.whatsappButton}</a>
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
        <div className="tilted-card"><img src={asset(tradition.image)} alt={tradition.imageAlt} /></div>
        <article className="prose-block">
          <Eyebrow>{tradition.eyebrow}</Eyebrow>
          <h2>{tradition.title}</h2>
          {tradition.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="signature"><span /> <em>{tradition.signature}</em></div>
        </article>
      </div>
    </section>
  );
}

function ExperienceSection({ className = '', includeCeremonyExamples = false } = {}) {
  const revealSteps = className.includes('reveal');
  const steps = experience.steps.map((step, index) => {
    if (includeCeremonyExamples && index === 0) {
      return { ...step, body: `${step.body}\n\n${experience.ceremonyStepOneExtra}` };
    }
    return step;
  });
  return (
    <section className={`section alt-section ${className}`} id="process">
      <div className="container">
        <SectionHeading eyebrow={experience.eyebrow} title={experience.title} />
        <div className="steps-grid">
          {steps.map((step, index) => <article className={`step-item ${revealSteps ? `reveal delay-${(index + 1) * 100}` : ''}`} key={step.number}><span>{step.number}</span><h3>{step.title}</h3><i /><p>{step.body}</p></article>)}
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
          <div><Eyebrow>{pearl.eyebrow}</Eyebrow><h2>{pearl.title}</h2></div>
          <div className="badges">{pearl.badges.map((badge) => <span key={badge}>{badge}</span>)}</div>
        </div>
        <div className="gallery-grid">
          {pearl.images.map((image) => <img key={image.src} className={image.featured ? 'gallery-main' : ''} src={asset(image.src)} alt={image.alt} />)}
        </div>
        <div className="pearl-social-cta">
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="button facebook-follow-button">
            <span className="facebook-mini" aria-hidden="true">f</span>
            {pearl.facebookButton}
          </a>
        </div>
      </div>
    </section>
  );
}

function PricingSection({ className = '' } = {}) {
  return (
    <section className={`section pricing-section ${className}`}>
      <div className="container pricing-container">
        <header className="pricing-header">
          <Eyebrow>{pricing.eyebrow}</Eyebrow>
          <h2>{pricing.title}</h2>
          <p>{pricing.body}</p>
        </header>
        <article className="pricing-card">
          <div className="pricing-card-head">
            <h3>{pricing.cardTitle}</h3>
            <strong>{pricing.price}</strong>
            <p>{pricing.cardBody}</p>
          </div>
          <ul className="pricing-included-list">
            {pricing.includedItems.map((item) => (
              <li key={item}>
                <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="pricing-card-footer">
            <p><strong>{pricing.additionalTimeLabel}</strong> {pricing.additionalTimeText}</p>
            <small>{pricing.note}</small>
          </div>
          <Link href="/contact#inquiry" className="button button-dark pricing-button">{pricing.button}</Link>
        </article>
        <div className="pricing-addons">
          <h3>{pricing.addonsTitle}</h3>
          <div className="pricing-addons-grid">
            {pricing.addons.map((addon) => <article key={addon.title}><h4>{addon.title}</h4><p>{addon.body}</p></article>)}
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
          <h2>{inquiry.title}</h2>
          <p>{inquiry.body}</p>
          <div className="contact-line"><span className="material-symbols-outlined">location_on</span>{inquiry.locationLine}</div>
          <a href={whatsappUrl} className="whatsapp-button whatsapp-button-side" aria-label="Message Sacred Cow Blessing on WhatsApp">
            <WhatsAppIcon />
            {inquiry.whatsappButton}
          </a>
        </aside>
        <form className="inquiry-form" onSubmit={handleInquirySubmit}>
          <div className="form-row">
            <label>{inquiry.fields.name}<input name="name" placeholder={inquiry.fields.namePlaceholder} required /></label>
            <label>{inquiry.fields.email}<input name="email" type="email" placeholder={inquiry.fields.emailPlaceholder} required /></label>
          </div>
          <div className="form-row">
            <label>{inquiry.fields.phone}<input name="phone" type="tel" placeholder={inquiry.fields.phonePlaceholder} required /></label>
            <label>{inquiry.fields.location}<input name="location" placeholder={inquiry.fields.locationPlaceholder} required /></label>
          </div>
          <label>{inquiry.fields.date}<input name="preferred_date" type="date" required /></label>
          <label>{inquiry.fields.notes}<textarea name="notes" placeholder={inquiry.fields.notesPlaceholder} /></label>
          <div className="form-actions">
            <button className="button button-dark" type="submit" disabled={formStatus === 'sending'}>
              {formStatus === 'sending' ? inquiry.sendingButton : inquiry.sendButton}
            </button>
            <a href={whatsappUrl} className="whatsapp-button" aria-label="Message Sacred Cow Blessing on WhatsApp">
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>
          {formStatus === 'sent' && <p className="form-status">{inquiry.sentMessage}</p>}
          {formStatus === 'error' && <p className="form-status form-status-error">{inquiry.errorMessage}</p>}
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
        <h2>{finalCta.title}</h2>
        <p>{finalCta.body}</p>
        <Link href="/contact" className="button button-outline">{finalCta.button}</Link>
      </div>
    </section>
  );
}

function FaqSection({ compact = false, className = '' }) {
  const [open, setOpen] = useState(0);
  return (
    <section className={`section alt-section ${compact ? 'compact-faq' : ''} ${className}`}>
      <div className="container faq-container">
        <SectionHeading eyebrow={faqs.eyebrow} title={faqs.title} />
        <div className="faq-list">
          {faqs.items.map(({ question, answer }, i) => (
            <article className={`faq-item ${open === i ? 'open' : ''}`} key={question}>
              <button onClick={() => setOpen(open === i ? -1 : i)}>
                <h3>{question}</h3><span className="material-symbols-outlined">expand_more</span>
              </button>
              <p>{answer}</p>
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
      <PageHero {...pages.about.hero} />
      <TraditionSection />
      <section className="section alt-section"><div className="container cards-grid">{pages.about.cards.map((card) => <InfoCard key={card.title} {...card} />)}</div></section>
      <FinalCta />
    </>
  );
}

function Ceremony() {
  return (
    <>
      <PageHero {...pages.ceremony.hero} />
      <ExperienceSection includeCeremonyExamples />
      <section className="section"><div className="container cards-grid">{pages.ceremony.cards.map((card) => <InfoCard key={card.title} {...card} />)}</div></section>
      <InquirySection />
    </>
  );
}

function Locations() {
  return (
    <>
      <section className="locations-hero">
        <div className="locations-hero-bg" />
        <div className="locations-hero-glow" />
        <div className="container locations-hero-content reveal reveal-visible">
          <div className="locations-badge"><span className="material-symbols-outlined">location_on</span>{locations.badge}</div>
          <h1>{locations.title} <span>{locations.titleAccent}</span></h1>
          <p>{locations.body}</p>
          <div className="locations-hero-actions">
            <Link href="/contact#inquiry" className="button button-saffron">{locations.primaryButton}</Link>
            <Link href="/contact" className="button locations-outline-button">{locations.secondaryButton}</Link>
          </div>
        </div>
      </section>
      <div className="locations-divider" aria-hidden="true"><span className="material-symbols-outlined">eco</span></div>
      <section className="section locations-service-section">
        <div className="container locations-bento">
          <article className="locations-service-card locations-service-card-large">
            <div>
              <h2>{locations.serviceTitle}</h2>
              <p>{locations.serviceBody}</p>
              <div className="locations-city-pills">{locations.cities.map((city) => <span key={city}>{city}</span>)}<span>{locations.citiesSuffix}</span></div>
            </div>
            <span className="material-symbols-outlined locations-map-watermark" aria-hidden="true">map</span>
          </article>
          <article className="locations-service-card locations-support-card">
            <h3>{locations.supportTitle}</h3>
            <p>{locations.supportBody}</p>
            <span className="material-symbols-outlined" aria-hidden="true">support_agent</span>
          </article>
        </div>
      </section>
      <section className="section locations-experience-section">
        <div className="container locations-experience-grid">
          <div className="locations-pearl-frame">
            <img src={asset(locations.image)} alt={locations.imageAlt} />
            <div className="locations-pearl-label"><small>{locations.imageSmallLabel}</small><strong>{locations.imageLabel}</strong></div>
          </div>
          <article className="locations-experience-copy">
            <Eyebrow>{locations.journeyEyebrow}</Eyebrow>
            <h2>{locations.journeyTitle}</h2>
            <p>{locations.journeyBody}</p>
            <div className="locations-feature-list">
              {locations.features.map(({ icon, title, text }) => (
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
          <h2>{locations.ctaTitle}</h2>
          <p>{locations.ctaBody}</p>
          <div className="locations-contact-strip">
            <div>
              <small>{locations.ctaSmall}</small>
              <strong>{locations.ctaStrong}</strong>
            </div>
            <a href={whatsappUrl} className="whatsapp-button" aria-label="Message Sacred Cow Blessing on WhatsApp">
              <WhatsAppIcon />
              {locations.whatsappButton}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

const templeEventServices = [
  {
    icon: 'temple_hindu',
    title: 'Temple Events',
    text: "Enhance major temple milestones and annual celebrations with Pearl's calm, grounding presence.",
    featured: true,
  },
  {
    icon: 'local_florist',
    title: 'Pujas & Ceremonies',
    text: 'Respectful participation in traditional family or community-hosted ceremonies across North Texas.',
  },
  {
    icon: 'celebration',
    title: 'Festival Gatherings',
    text: 'Add a meaningful traditional touch to cultural festivals and community celebrations in DFW.',
  },
  {
    icon: 'business_center',
    title: 'Business Blessings',
    text: 'A peaceful, traditional presence for new office openings and business milestones.',
  },
  {
    icon: 'school',
    title: 'Cultural Programs',
    text: 'Educational visits for cultural programs focused on heritage, care, and the gentle nature of cattle.',
  },
  {
    icon: 'volunteer_activism',
    title: 'Fundraisers',
    text: 'A memorable presence to help draw interest and support for community nonprofits and causes.',
  },
];

const templeEventFeatures = [
  {
    title: 'Texas-Friendly Coordination',
    text: 'We help coordinate transport, arrival timing, and on-site setup so your organizers can stay focused on the event.',
  },
  {
    title: 'Gentle Disposition',
    text: 'Pearl is raised with patience and kindness and is comfortable around families, children, and elders.',
  },
  {
    title: 'Seamless Integration',
    text: 'We work alongside your temple, priest, or event team so Pearl supports the program without disrupting it.',
  },
];

function TempleEvents() {
  return (
    <>
      <section className="temple-events-hero">
        <div className="temple-events-hero-bg" />
        <div className="temple-events-hero-overlay" />
        <div className="container temple-events-hero-content reveal reveal-visible">
          <Eyebrow>Temple & Community Events</Eyebrow>
          <h1>Pearl at Your Temple & Community Events</h1>
          <p>Bring the gentle presence of our Brahma cow to sacred gatherings and community celebrations across Dallas-Fort Worth.</p>
          <div className="temple-events-actions">
            <Link href="/contact#inquiry" className="button button-saffron">Check Availability</Link>
            <a href={whatsappUrl} className="whatsapp-button" aria-label="Message Sacred Cow Blessing on WhatsApp">
              <WhatsAppIcon />
              Message via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section temple-events-services">
        <div className="container">
          <SectionHeading eyebrow="Our Services" title="Sacred Presence for Every Occasion" />
          <div className="temple-events-service-grid">
            {templeEventServices.map((service) => (
              <article className={`temple-events-service-card ${service.featured ? 'featured' : ''}`} key={service.title}>
                <span className="material-symbols-outlined" aria-hidden="true">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                {service.featured && <Link href="/contact#inquiry" className="button button-outline">Request Pearl for Your Temple Event</Link>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="temple-events-guidance">
        <div className="container temple-events-guidance-card">
          <span className="material-symbols-outlined" aria-hidden="true">spa</span>
          <h2>Your temple, priest, or event organizers lead the ceremony.</h2>
          <p>We provide Pearl, her handler, and attentive on-site animal care.</p>
          <small>Professional Handling · Welfare Focused</small>
        </div>
      </section>

      <section className="section temple-events-pearl">
        <div className="container temple-events-pearl-grid">
          <div className="temple-events-pearl-frame">
            <img src={asset('/assets/DSC07433.jpg')} alt="Pearl the gentle Brahma cow" />
          </div>
          <article className="temple-events-pearl-copy">
            <Eyebrow>Peace and Tradition</Eyebrow>
            <h2>A Spirit of Peace and Tradition</h2>
            <p>Pearl is a member of our family, raised with patience and kindness. Her calm demeanor makes her well suited for community environments where children, elders, and guests are present.</p>
            <div className="temple-events-feature-list">
              {templeEventFeatures.map((feature) => (
                <div className="temple-events-feature" key={feature.title}>
                  <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section temple-events-cta-section">
        <div className="container temple-events-cta">
          <span className="material-symbols-outlined temple-events-cta-watermark" aria-hidden="true">auto_awesome</span>
          <h2>Plan Your Occasion</h2>
          <p>Dates for popular festival seasons and weekends in North Texas fill quickly. Contact us to check Pearl's availability for your event.</p>
          <div className="temple-events-actions">
            <Link href="/contact#inquiry" className="button button-dark">Check Availability</Link>
            <Link href="/contact" className="button button-outline">Contact Us</Link>
          </div>
          <small>Serving Dallas, Fort Worth, and surrounding DFW communities.</small>
        </div>
      </section>
    </>
  );
}

function InfoCard({ title, text }) {
  return <article className="info-card"><h3>{title}</h3><p>{text}</p></article>;
}

function Blog() {
  return (
    <>
      <section className="blog-hero"><div className="container"><Eyebrow>{blog.hero.eyebrow}</Eyebrow><h1>{blog.hero.title}</h1><p>{blog.hero.body}</p></div></section>
      <div className="blog-divider"><span className="material-symbols-outlined">auto_awesome</span></div>
      <section className="container blog-grid">
        {blog.posts.map((post) => <article className={`blog-card ${post.size}`} key={post.title}><div className="blog-image"><img src={asset(post.image)} alt="Sacred Cow Blessing journal" /></div><div className="blog-body"><div className="post-meta"><span>{post.category}</span>{post.time && <small>{post.time}</small>}</div>{post.size === 'featured' ? <h2>{post.title}</h2> : <h3>{post.title}</h3>}<p>{post.text}</p>{post.size === 'featured' && <b>{blog.featuredLinkText} <span className="material-symbols-outlined">trending_flat</span></b>}</div></article>)}
        <aside className="archive-card"><span className="material-symbols-outlined">import_contacts</span><h3>{blog.archiveTitle}</h3><p>{blog.archiveBody}</p><Link href="/contact" className="button button-outline">{blog.archiveButton}</Link></aside>
      </section>
      <section className="newsletter-section"><div className="container newsletter-card"><Eyebrow>{blog.newsletterEyebrow}</Eyebrow><h2>{blog.newsletterTitle}</h2><p>{blog.newsletterBody}</p><form onSubmit={(e) => e.preventDefault()}><input type="email" placeholder={blog.newsletterPlaceholder} /><button className="button button-dark">{blog.newsletterButton}</button></form><small>{blog.newsletterSmall}</small></div></section>
    </>
  );
}

function Contact() { return <><PageHero {...pages.contact.hero} /><InquirySection /><FaqSection compact /></>; }

function App() {
  const [page, setPage] = useState(pathKey());
  React.useEffect(() => {
    const handler = () => setPage(pathKey());
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);
  React.useEffect(() => {
    updateStructuredData(page);
  }, [page]);
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
  const Page = { home: Home, about: About, ceremony: Ceremony, templeEvents: TempleEvents, locations: Locations, faq: FaqSection, blog: Blog, contact: Contact }[page] || Home;
  return <><Header /><main><Page /></main><Footer /></>;
}

createRoot(document.getElementById('root')).render(<App />);
