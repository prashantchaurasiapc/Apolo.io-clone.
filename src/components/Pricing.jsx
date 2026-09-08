import React, { useState, useRef } from 'react';
import './Pricing.css';
import FAQAccordion from './FAQAccordion';

/* ---- SVG helpers ---- */
const CheckIcon = () => (
  <svg className="feat-chk" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7l3.5 3.5 6.5-6.5" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckYes = () => (
  <div className="check-yes">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M2.5 7.5l3.5 3.5 6.5-6.5" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const CheckNo = () => <div className="check-no">—</div>;

const ChevDown = ({ open }) => (
  <svg className={`faq-chevron${open ? ' open' : ''}`} width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M4.5 7l4.5 4.5L13.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LightningIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M7.5 1.5L2.5 7.5h4l-1 4 6-7H7.5l1-3z" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0.4" strokeLinejoin="round"/>
  </svg>
);

/* ---- Plan data (exact Apollo.io content) ---- */
const plans = [
  {
    key: 'free',
    name: 'Free',
    tagline: 'Explore the Apollo platform to find leads, manage pipeline & close deals.',
    monthlyPrice: 0,
    annualPrice: 0,
    isFree: true,
    priceSub: null,
    credits: '900 credits per seat per year, granted monthly',
    ctaPrimary: { label: 'Get started', style: 'yellow' },
    ctaSecondary: null,
    trialLink: null,
    aiBadge: 'free',
    features: [
      'AI Assistant (5 chat limit)',
      'AI Research',
      '2 Sequences',
      'Prospecting, Gmail & Salesforce Extensions',
      'Basic Filters',
      'Website Visitors (Identify 20 companies monthly)',
      'Real-time Form Enrichment (5 limit)',
      'Contact & Account Data',
      'CRM Enrichment (Limit 100 per month)',
      'API Access',
      '1 Intent Topic',
      '2 Lead Score Limit',
      'Lead Management',
      '1 Meeting Event',
      'Call Recording (150 mins)',
    ],
  },
  {
    key: 'basic',
    name: 'Basic',
    tagline: 'Take prospecting, outreach & deal management to the next level.',
    monthlyPrice: 59,
    annualPrice: 49,
    isFree: false,
    priceSub: 'Per seat per month,\nbilled annually',
    credits: '30,000 credits per seat per year, granted upfront',
    ctaPrimary: { label: 'Buy now', style: 'yellow' },
    ctaSecondary: null,
    trialLink: 'Start 14-day trial',
    aiBadge: 'intro',
    features: [
      'AI Assistant INTRODUCTORY FREE',
      'AI Research & AI Lead Scoring',
      'Unlimited Sequences',
      'Prospecting, Gmail & Salesforce Extensions',
      'Deliverability Suite & Email Warmup',
      'Advanced Filters',
      'CRM Integrations',
      'Waterfall Enrichment',
      '3 Meetings Events',
      '6 Intent Topics & Intent Filters',
      'CSV, CRM & API Data Enrichment',
      'Domain & Mailbox Purchasing',
      'Website Visitors (Identify 100 companies monthly)',
      'Real-time Form Enrichment (10 limit)',
      '3 Inbound Routers',
      'Contact & Account Data',
      'Automated CRM Enrichment',
      'API Enrichment',
      '6 Intent Topics',
      '2 Lead Score Limit + AI Lead Scoring, Scoring Filters & Details',
      'CSV Enrichment',
      'Job Change Enrichment',
      'Lead Management',
      'Call Recording (150 mins)',
      'Deal Management',
      '2 Automated Workflows',
      'US Dialer (credits apply)',
    ],
  },
  {
    key: 'pro',
    name: 'Professional',
    tagline: 'Optimize your sales process with multi-touch outreach, AI & automation.',
    monthlyPrice: 99,
    annualPrice: 79,
    isFree: false,
    priceSub: 'Per seat per month,\nbilled annually',
    credits: '48,000 credits per seat per year, granted upfront',
    ctaPrimary: { label: 'Buy now', style: 'dark' },
    ctaSecondary: null,
    trialLink: 'Start 14-day trial',
    popular: true,
    aiBadge: 'intro',
    features: [
      'AI Assistant INTRODUCTORY FREE',
      'AI Research & AI Lead Scoring',
      'Agentic Loops',
      'Unlimited Sequences & A/Z Testing',
      'Prospecting, Gmail & Salesforce Extensions',
      'Deliverability Suite & Email Warmup',
      'Advanced Filters',
      'CRM Integrations',
      'Waterfall Enrichment',
      'Unlimited Meeting Events',
      '6 Intent Topics & Intent Filters',
      'CSV, CRM & API Data Enrichment',
      'Domain & Mailbox Purchasing',
      'Projects BETA',
      'Unlimited Gmail & Microsoft Mailboxes',
      'Automated Workflows',
      'Call Recordings & AI Insights (4,000 mins)',
      'Analytics & Pre-built Reports',
      'Website Visitors (Identify 100 companies monthly)',
      'Real-time Form Enrichment (10 limit)',
      'Unlimited Inbound Routers',
      'Contact & Account Data',
      'Automated CRM Enrichment',
      'API Enrichment',
      '6 Intent Topics',
      'Unlimited Lead Score + AI Lead Scoring, Scoring Filters & Details',
      'CSV Enrichment',
      'Job Change Enrichment',
      'Lead Management',
      'Call Recording (4,000 mins)',
      'Deal Management',
      'Pre-meeting AI Insights',
      'AI Call Insights',
      'Goals Setting & Tracking',
      'US Dialer (credits apply)',
    ],
  },
  {
    key: 'org',
    name: 'Organization',
    tagline: 'Transform go-to-market with advanced tools, custom solutions & expert help.',
    monthlyPrice: 149,
    annualPrice: 119,
    isFree: false,
    priceSub: 'Per seat per month, (min 3 seats)\nbilled annually',
    credits: '72,000 credits per seat per year, granted upfront',
    ctaPrimary: { label: 'Buy now', style: 'yellow' },
    ctaSecondary: 'Talk to Sales',
    trialLink: null,
    aiBadge: 'intro',
    features: [
      'AI Assistant INTRODUCTORY FREE',
      'AI Research & AI Lead Scoring',
      'Agentic Loops',
      'Unlimited Sequences & A/Z Testing',
      'Prospecting, Gmail & Salesforce Extensions',
      'Deliverability Suite & Email Warmup',
      'Advanced Filters',
      'CRM Integrations',
      'Waterfall Enrichment',
      'Unlimited Meeting Events',
      '12 Intent Topics & Intent Filters',
      'CSV, CRM & API Data Enrichment',
      'Domain & Mailbox Purchasing',
      'Projects BETA',
      'Unlimited Gmail & Microsoft Mailboxes',
      'Automated Workflows',
      'Call Recordings & AI Insights (8,000 mins)',
      'Analytics & Pre-built Reports',
      'Customizable Reports & Dashboards',
      'Advanced Security Configurations',
      'Single Sign-on (SSO)',
      'Use your own LLM API key',
      'Website Visitors (Identify 100 companies monthly)',
      'Real-time Form Enrichment (10 limit)',
      'Unlimited Inbound Routers',
      'Contact & Account Data',
      'Automated CRM Enrichment',
      'API Enrichment',
      '12 Intent Topics',
      'Unlimited Lead Score + AI Lead Scoring, Scoring Filters & Details',
      'CSV Enrichment',
      'Job Change Enrichment',
      'Lead Management',
      'Call Recording (8,000 mins)',
      'Deal Management',
      'Pre-meeting AI Insights',
      'AI Call Insights',
      'Goals Setting & Tracking',
      'Dedicated GTM Engineer (min. contract value required)',
      'US Dialer (credits apply)',
    ],
  },
];

/* ---- Compare data ---- */
// Compare accordion sections — exact Apollo.io data
const compareSections = [
  {
    key: 'outbound',
    icon: '🔵',
    iconColor: '#3b82f6',
    name: 'Outbound',
    desc: 'Find and research leads, personalize messaging, and launch campaigns in minutes powered by AI and automation.',
    defaultOpen: true,
    rows: [
      { label: 'AI Assistant', badge: 'INTRODUCTORY FREE', vals: ['5 chats (10 messages per chat)', true, true, true] },
      { label: 'Contact & Account Data', vals: [false, true, true, true] },
      { label: 'Basic Filters', hasArrow: true, vals: [false, true, true, true] },
      { label: 'Advanced Filters & Signals', hasArrow: true, vals: [false, false, true, true] },
      { label: 'Google Maps Business Search', vals: [false, true, true, true] },
      { label: 'Buying Intent', vals: ['1 Intent Topic & Intent Filters', '6 Intent Topics + Intent Filters', '6 Intent Topics + Intent Filters', '12 Intent Topics + Intent Filters'] },
      { label: 'People & Company Lookalikes', beta: true, vals: [false, true, true, true] },
      { label: 'CRM Custom Field Filter', vals: [true, true, true, false] },
      { label: 'Record Selection Limit', vals: ['25', '1,000', '2,500', '10,000'] },
      { label: 'CSV Import & Export', vals: [false, true, true, true] },
      { label: 'Waterfall Enrichment', vals: [false, true, true, true] },
      { label: 'AI Research', vals: [true, true, true, true] },
      { label: 'AI Filter', hasArrow: true, vals: [true, true, true, true] },
      { label: 'AI Scores', hasArrow: true, vals: [true, true, true, true] },
      { label: 'Agentic Loops', vals: [false, false, true, true] },
      { label: 'Projects', beta: true, vals: ['1 Project', '1 Project', 'Unlimited Projects', 'Unlimited Projects'] },
      { label: 'Sequences & A/Z Testing', vals: ['2 Sequences per team', 'Unlimited Sequences', 'Unlimited Sequences + A/Z Testing', 'Unlimited Sequences + A/Z Testing'] },
      { label: 'AI Writing', vals: ['5,000 words per month', '250,000 words per month', '800,000 words per month', '1,000,000 words per month'] },
      { label: 'Mailboxes per User', hasArrow: true, vals: ['1 mailbox per user', '1 mailbox per user', 'Unlimited Google and Microsoft mailboxes + 5 SMTP mailboxes per user', 'Unlimited Google and Microsoft mailboxes + 15 SMTP mailboxes per user'] },
      { label: 'Daily Emails Sends', vals: ['250 emails', '250 emails', 'Unlimited', 'Unlimited'] },
      { label: 'Unified Inbox', vals: [true, true, true, true] },
      { label: 'Task Execution Center', hasArrow: true, vals: [true, true, true, true] },
      { label: 'Email Deliverability Suite', hasArrow: true, vals: [true, true, true, true] },
      { label: 'Dialer', hasArrow: true, vals: [false, true, true, true] },
      { label: 'Automated Workflows', vals: ['2 Workflows per team', '5 Workflows per team', '50 Workflows per team', '500 Workflows per team'] },
      { label: 'Recommendations', beta: true, vals: [false, true, true, true] },
      { label: 'Meeting Scheduler', hasArrow: true, vals: [true, true, true, true] },
      { label: 'Call Recordings & AI Insights', hasArrow: true, vals: [true, true, true, true] },
      { label: 'Analytics & Reports', hasArrow: true, vals: [true, true, true, true] },
      { label: 'Extension', hasArrow: true, vals: [true, true, true, true] },
    ],
  },
  {
    key: 'inbound',
    icon: '🔴',
    iconColor: '#ef4444',
    name: 'Inbound',
    desc: 'Optimize inbound/lead conversion and turn website visitors into high-quality pipeline by instantly enriching, qualifying, and engaging leads.',
    defaultOpen: false,
    rows: [
      { label: 'Website Visitor Tracking', vals: ['20 companies/mo', '100 companies/mo', '100 companies/mo', '100 companies/mo'] },
      { label: 'Form Enrichment', vals: ['5 limit', '10 limit', '10 limit', '10 limit'] },
      { label: 'Inbound Routers', vals: [false, '3', 'Unlimited', 'Unlimited'] },
      { label: 'Real-time Form Enrichment', vals: ['5 limit', '10 limit', '10 limit', '10 limit'] },
      { label: 'Lead Scoring', vals: [false, true, true, true] },
    ],
  },
  {
    key: 'enrichment',
    icon: '🟡',
    iconColor: '#f59e0b',
    name: 'Data enrichment',
    desc: 'Enrich every record with Apollo Data, trusted partners, and AI Research to keep your data accurate & actionable.',
    defaultOpen: false,
    rows: [
      { label: 'CRM Enrichment', vals: ['100/month', 'Automated', 'Automated', 'Automated'] },
      { label: 'API Enrichment', vals: [false, true, true, true] },
      { label: 'CSV Enrichment', vals: [false, true, true, true] },
      { label: 'Job Change Enrichment', vals: [false, true, true, true] },
      { label: 'Waterfall Enrichment', vals: [false, true, true, true] },
    ],
  },
  {
    key: 'deal',
    icon: '🟢',
    iconColor: '#22c55e',
    name: 'Deal execution',
    desc: 'Turn meetings into opportunities and win more with intelligent, streamlined deal management.',
    defaultOpen: false,
    rows: [
      { label: 'Deal Management', vals: [false, true, true, true] },
      { label: 'Pre-meeting AI Insights', vals: [false, false, true, true] },
      { label: 'AI Call Insights', vals: [false, false, true, true] },
      { label: 'Goals Setting & Tracking', vals: [false, false, true, true] },
    ],
  },
  {
    key: 'ops',
    icon: '⚙️',
    iconColor: '#6b7280',
    name: 'Operations & Integrations',
    desc: '',
    defaultOpen: false,
    rows: [
      { label: 'CRM Integrations (HubSpot, Salesforce)', vals: [false, true, true, true] },
      { label: 'API Access', vals: [true, true, true, true] },
      { label: 'Zapier & Webhooks', vals: [false, true, true, true] },
      { label: 'SSO / SAML', vals: [false, false, false, true] },
      { label: 'Advanced Security Configurations', vals: [false, false, false, true] },
      { label: 'Use your own LLM API key', vals: [false, false, false, true] },
      { label: 'Permission Profiles', vals: [false, false, false, true] },
    ],
  },
  {
    key: 'support',
    icon: '💬',
    iconColor: '#8b5cf6',
    name: 'Services & Support',
    desc: '',
    defaultOpen: false,
    rows: [
      { label: 'Email & chat support', vals: [true, true, true, true] },
      { label: 'Priority support', vals: [false, false, true, true] },
      { label: 'Dedicated Customer Success Manager', vals: [false, false, false, true] },
      { label: 'Dedicated GTM Engineer', vals: [false, false, false, true] },
      { label: 'Onboarding & training', vals: [false, false, true, true] },
    ],
  },
  {
    key: 'api',
    icon: '🔗',
    iconColor: '#374151',
    name: 'API',
    desc: '',
    defaultOpen: false,
    rows: [
      { label: 'API Calls / minute', vals: ['10', '50', '100', '200'] },
      { label: 'Webhooks', vals: [false, true, true, true] },
      { label: 'Custom integrations', vals: [false, false, true, true] },
    ],
  },
];

const faqs = [
  { q: 'Can I change plans at any time?', a: 'Yes — you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences automatically.' },
  { q: 'What are Apollo credits?', a: 'Apollo credits are used to unlock contact data like mobile phone numbers and direct dials. Each plan includes a set number of email, mobile, and export credits per month or year. Email credits are unlimited on all plans.' },
  { q: 'Is there a free trial for paid plans?', a: 'Yes! Basic and Professional plans include a 14-day free trial. Get started with no credit card required.' },
  { q: 'What happens if I run out of credits?', a: 'You can purchase additional credit top-ups at any time without upgrading your base plan. We\'ll notify you when you\'re running low.' },
  { q: 'Do you offer discounts for annual billing?', a: 'Yes — annual billing saves you up to 24% compared to paying monthly. The discount is reflected automatically when you switch to an annual plan.' },
  { q: 'What integrations does Apollo support?', a: 'Apollo integrates with Salesforce, HubSpot, Pipedrive, Outreach, Salesloft, Gmail, Outlook, Zapier, and many more.' },
  { q: 'Is there a minimum number of seats for Organization?', a: 'Yes, the Organization plan requires a minimum of 3 users. It\'s designed for larger teams that need advanced security, admin controls, and a dedicated GTM Engineer.' },
];

const renderVal = (val) => {
  if (val === true) return <CheckYes />;
  if (val === false) return <CheckNo />;
  return <div style={{ textAlign: 'center', fontSize: 12, color: '#374151', lineHeight: 1.4, padding: '0 4px' }}>{val}</div>;
};

/* ---- Accordion section component ---- */
function CompareAccordion({ section }) {
  const [open, setOpen] = useState(section.defaultOpen);

  // Icon component — colored circle with letter
  const SectionIcon = () => (
    <div style={{
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: section.iconColor + '20',
      border: `1.5px solid ${section.iconColor}40`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: section.iconColor }} />
    </div>
  );

  return (
    <div className="acc-section">
      {/* Section header — clickable */}
      <div className="acc-header" onClick={() => setOpen(o => !o)}>
        <div className="acc-header-left">
          <SectionIcon />
          <div className="acc-header-text">
            <div className="acc-section-name">{section.name}</div>
            {section.desc && <div className="acc-section-desc">{section.desc}</div>}
          </div>
        </div>
        <svg
          className={`acc-chevron${open ? ' open' : ''}`}
          width="18" height="18" viewBox="0 0 18 18" fill="none"
        >
          <path d="M4.5 7l4.5 4.5L13.5 7" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Sliding rows */}
      <div className={`acc-body${open ? ' open' : ''}`}>
        {section.rows.map((row) => (
          <div className="compare-row" key={row.label}>
            {/* Label cell */}
            <div className="compare-row-label">
              <span style={{ borderBottom: row.hasArrow ? '1px dashed #aaa' : 'none', paddingBottom: row.hasArrow ? 1 : 0 }}>
                {row.label}
              </span>
              {row.hasArrow && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 4, opacity: 0.5 }}>
                  <path d="M2 4l3 3 3-3" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {row.beta && (
                <span style={{
                  marginLeft: 5,
                  fontSize: 9,
                  fontWeight: 700,
                  background: '#e5f542',
                  color: '#111',
                  padding: '1px 5px',
                  borderRadius: 3,
                  letterSpacing: '0.04em',
                  verticalAlign: 'middle',
                }}>BETA</span>
              )}
              {row.badge && (
                <span style={{
                  marginLeft: 5,
                  fontSize: 9,
                  fontWeight: 700,
                  background: '#e8f5e9',
                  color: '#1b5e20',
                  padding: '2px 6px',
                  borderRadius: 8,
                  letterSpacing: '0.04em',
                  verticalAlign: 'middle',
                  border: '1px solid #c8e6c9',
                }}>{row.badge}</span>
              )}
            </div>
            {/* Value cells */}
            {row.vals.map((v, vi) => (
              <div className="compare-cell" key={vi}>{renderVal(v)}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Pricing({ onBack }) {
  const [annual, setAnnual] = useState(true);
  const testimonialsRef = useRef(null);

  const scrollTestimonials = (dir) => {
    if (testimonialsRef.current) {
      testimonialsRef.current.scrollBy({ left: dir * 540, behavior: 'smooth' });
    }
  };

  return (
    <div className="pricing-page">
      {/* ==================== TOP BAR ==================== */}
      <div className="pricing-top-bar">
        <h1 className="pricing-top-heading">The all-in-one platform to<br />grow your business</h1>
        <div className="pricing-top-right">
          <p className="pricing-top-subtitle">
            Build pipeline smarter, close deals faster, and unify your tech stack with an AI-powered platform.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="billing-pill">
              <button
                className={`billing-opt${annual ? ' active' : ''}`}
                onClick={() => setAnnual(true)}
              >
                Annual billing
              </button>
              <button
                className={`billing-opt${!annual ? ' active' : ''}`}
                onClick={() => setAnnual(false)}
              >
                Monthly billing
              </button>
            </div>
          </div>
          {annual && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: '#666' }}>
              <span className="billing-save-tag">SAVE 24%</span>
              <span>vs monthly billing</span>
            </div>
          )}
        </div>
      </div>

      {/* ==================== PLAN COLUMNS ==================== */}
      <div className="pricing-plans-wrap">
        <div className="pricing-cols">
          {plans.map((plan) => (
            <div key={plan.key} className={`plan-col${plan.popular ? ' is-popular' : ''}`}>
              {plan.popular && <div className="most-popular-badge">MOST POPULAR</div>}

              {/* Name & tagline */}
              <div className="plan-col-name">{plan.name}</div>
              <div className="plan-col-tagline">{plan.tagline}</div>

              {/* Price */}
              <div className="plan-col-price">
                ${plan.isFree ? '0' : (annual ? plan.annualPrice : plan.monthlyPrice)}
              </div>
              {plan.priceSub && (
                <div className="plan-col-price-sub" style={{ whiteSpace: 'pre-line' }}>
                  {annual
                    ? plan.priceSub
                    : plan.priceSub.replace('billed annually', 'billed monthly')}
                </div>
              )}
              {plan.isFree && <div style={{ height: 28 }} />}

              {/* Credits */}
              <div className="plan-credits-row">
                <LightningIcon />
                <div className="plan-credits-text">
                  {plan.credits}
                  <a href="#credits" className="plan-credits-link">Learn more</a>
                </div>
              </div>

              {/* CTA */}
              <button className={`plan-cta-primary ${plan.ctaPrimary.style}`}>
                {plan.ctaPrimary.label}
              </button>
              {plan.ctaSecondary && (
                <button className="plan-cta-secondary">{plan.ctaSecondary}</button>
              )}
              {plan.trialLink && (
                <div className="plan-trial-link"><span>{plan.trialLink}</span></div>
              )}

              <div className="plan-divider" />

              {/* AI badge */}
              {plan.aiBadge === 'intro' && (
                <div className="ai-badge">✦ AI Assistant · INTRODUCTORY FREE</div>
              )}
              {plan.aiBadge === 'free' && (
                <div className="ai-badge-free">AI Assistant (5 chat limit)</div>
              )}

              {/* Features — skip the first one if it's the AI line (shown in badge) */}
              <ul className="plan-feat-list">
                {plan.features
                  .filter((f) => !(plan.aiBadge === 'intro' && f === 'AI Assistant INTRODUCTORY FREE')
                    && !(plan.aiBadge === 'free' && f === 'AI Assistant (5 chat limit)'))
                  .map((feat) => {
                    const isBeta = feat.includes('BETA');
                    return (
                      <li key={feat}>
                        <CheckIcon />
                        <span>
                          {isBeta ? feat.replace(' BETA', '') : feat}
                          {isBeta && (
                            <span style={{
                              display: 'inline-block',
                              marginLeft: 4,
                              fontSize: 9,
                              fontWeight: 700,
                              background: '#e5f542',
                              color: '#111',
                              padding: '1px 5px',
                              borderRadius: 3,
                              letterSpacing: '0.04em',
                              verticalAlign: 'middle',
                            }}>BETA</span>
                          )}
                        </span>
                      </li>
                    );
                  })}
              </ul>

              {/* Bottom compare link */}
              <a href="#compare" className="compare-col-link">
                Compare all plans
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2.5l-.5.5 3.5 3-3.5 3 .5.5 4-3.5L6 2.5z" fill="currentColor"/>
                  <path d="M3 2.5l-.5.5 3.5 3-3.5 3 .5.5 4-3.5L3 2.5z" fill="currentColor" opacity="0.4"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>

      <p className="pricing-disclaimer">Prices exclude any applicable taxes.</p>

      {/* ==================== REST OF PAGE ==================== */}
      <div className="pricing-rest">
        {/* ADD MORE POWER TO YOUR WORKFLOW */}
        <div className="pricing-addon-section">
          <h2 className="addon-main-heading">Add more power to your workflow</h2>
          <div className="addon-cards">

            {/* Inbound */}
            <div className="addon-card">
              <div className="addon-card-top">
                <div>
                  <div className="addon-tag">ADD · ON</div>
                  <div className="addon-card-name">Inbound</div>
                </div>
                <div className="addon-price-block">
                  <div className="addon-price">$119</div>
                  <div className="addon-price-sub">Per team, per month<br />billed annually</div>
                </div>
              </div>
              <div className="addon-divider" />
              <ul className="addon-feat-list">
                <li>
                  <span className="addon-feat-check">✓</span>
                  <div>
                    <div className="addon-feat-title">Website Visitor - Company (Global)</div>
                    <div className="addon-feat-desc">Identify up to 50,000 companies per month.</div>
                  </div>
                </li>
                <li>
                  <span className="addon-feat-check">✓</span>
                  <div>
                    <div className="addon-feat-title">Domain Tracking</div>
                    <div className="addon-feat-desc">Add up to 100 domains to capture visitor insights across all your websites.</div>
                  </div>
                </li>
                <li>
                  <span className="addon-feat-check">✓</span>
                  <div>
                    <div className="addon-feat-title">Form Enrichment</div>
                    <div className="addon-feat-desc">5,000 form contacts enriched per month (credit usage applies).</div>
                  </div>
                </li>
                <li>
                  <span className="addon-feat-check">✓</span>
                  <div>
                    <div className="addon-feat-title">Form Builder</div>
                    <div className="addon-feat-desc">Capture leads with custom forms.</div>
                  </div>
                </li>
                <li>
                  <span className="addon-feat-check">✓</span>
                  <div>
                    <div className="addon-feat-title">Website Visitor - Contact (US Only)</div>
                    <div className="addon-feat-desc">Identify up to 10,000 contacts per month.</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Advanced Dialer */}
            <div className="addon-card">
              <div className="addon-card-top">
                <div>
                  <div className="addon-tag">ADD · ON</div>
                  <div className="addon-card-name">Advanced Dialer</div>
                </div>
                <div className="addon-price-block">
                  <div className="addon-price">$119</div>
                  <div className="addon-price-sub">Per team, per month<br />billed annually</div>
                </div>
              </div>
              <div className="addon-divider" />
              <ul className="addon-feat-list">
                <li>
                  <span className="addon-feat-check">✓</span>
                  <div>
                    <div className="addon-feat-title">International dialer</div>
                    <div className="addon-feat-desc">Connect with global buyers using built-in international calling.</div>
                  </div>
                </li>
                <li>
                  <span className="addon-feat-check">✓</span>
                  <div>
                    <div className="addon-feat-title">Parallel Dialer</div>
                    <div className="addon-feat-desc">Multiply outbound volume by dialing multiple numbers at once.</div>
                  </div>
                </li>
                <li>
                  <span className="addon-feat-check">✓</span>
                  <div>
                    <div className="addon-feat-title">Power Dialer</div>
                    <div className="addon-feat-desc">Single-line dialing with auto-advance, voicemail drop, and instant call logging.</div>
                  </div>
                </li>
                <li>
                  <span className="addon-feat-check">✓</span>
                  <div>
                    <div className="addon-feat-title">Local Presence</div>
                    <div className="addon-feat-desc">Use local area codes to increase pickup rates.</div>
                  </div>
                </li>
              </ul>
            </div>

          </div>
          <p className="addon-disclaimer">
            Select your paid plan first, then add any add-on in-app. Introductory pricing — features and pricing may change.
          </p>
        </div>
      </div>

      {/* ==================== SOCIAL PROOF BAR (full-width) ==================== */}
      <div className="social-proof-bar">
        <p className="social-proof-text">Millions of sellers at over 600,000 companies beat their number with Apollo</p>
        <div className="social-proof-logos">
          {/* Autodesk */}
          <div className="logo-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: 5, verticalAlign: 'middle' }}>
              <path d="M8 1L1 14h4l1-2h4l1 2h4L8 1zm0 4l1.5 4h-3L8 5z" fill="#111"/>
            </svg>
            <span className="logo-text" style={{ fontFamily: 'Arial Black, Arial', fontWeight: 900, fontSize: 14 }}>AUTODESK</span>
          </div>
          {/* Dolby */}
          <div className="logo-item">
            <svg width="28" height="18" viewBox="0 0 28 18" fill="none" style={{ marginRight: 4, verticalAlign: 'middle' }}>
              <circle cx="6" cy="9" r="6" fill="#111"/>
              <circle cx="16" cy="9" r="6" fill="#111"/>
            </svg>
            <span className="logo-text" style={{ fontFamily: 'Arial Black, Arial', fontWeight: 900, fontSize: 14 }}>Dolby</span>
          </div>
          {/* iru */}
          <div className="logo-item">
            <span className="logo-text" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400, fontSize: 17 }}>iru</span>
          </div>
          {/* Smartling */}
          <div className="logo-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: 5, verticalAlign: 'middle' }}>
              <circle cx="10" cy="10" r="9" stroke="#111" strokeWidth="2"/>
              <path d="M5 10 Q10 4 15 10" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <circle cx="10" cy="10" r="1.5" fill="#111"/>
            </svg>
            <span className="logo-text" style={{ fontFamily: 'Arial Black, Arial', fontWeight: 900, fontSize: 13 }}>SMARTLING</span>
          </div>
          {/* Redis */}
          <div className="logo-item">
            <span className="logo-text" style={{ fontFamily: 'Georgia, Times New Roman, serif', fontWeight: 700, fontSize: 17, fontStyle: 'italic', color: '#cc2200', letterSpacing: '-0.02em' }}>Redis</span>
          </div>
          {/* Anthropic */}
          <div className="logo-item">
            <span className="logo-text" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '0.02em' }}>ANTHROPIC</span>
          </div>
        </div>
      </div>

      {/* ==================== REST OF PAGE ==================== */}
      <div className="pricing-rest">
        <div id="compare" className="pricing-compare-section">

          {/* Big heading */}
          <h2 className="compare-main-heading">Compare plans</h2>

          {/* Plan header cards row */}
          <div className="compare-header-row">
            <div className="compare-header-label-col" />
            {plans.map((plan) => (
              <div key={plan.key} className={`compare-header-plan-col${plan.popular ? ' compare-popular-col' : ''}`}>
                <div className="compare-plan-name-row">
                  <span className="compare-plan-name">{plan.name}</span>
                  {plan.popular && <span className="compare-popular-badge">MOST POPULAR</span>}
                </div>
                <div className="compare-plan-price">
                  ${plan.isFree ? '0' : (annual ? plan.annualPrice : plan.monthlyPrice)}
                </div>
                {plan.priceSub && (
                  <div className="compare-plan-price-sub" style={{ whiteSpace: 'pre-line' }}>
                    {annual ? plan.priceSub : plan.priceSub.replace('billed annually', 'billed monthly')}
                  </div>
                )}
                {plan.isFree && <div style={{ height: 30 }} />}
                <div className="compare-plan-credits">
                  <LightningIcon />
                  <span>{plan.credits}</span>
                </div>
                <button className={`compare-plan-cta ${plan.ctaPrimary.style}`}>
                  {plan.ctaPrimary.label}
                </button>
              </div>
            ))}
          </div>

          {/* Accordion sections */}
          {compareSections.map((section) => (
            <CompareAccordion
              key={section.key}
              section={section}
            />
          ))}
        </div>

        {/* AWARDS BANNER */}
        <div className="pricing-awards-banner">
          <div className="awards-left">
            <h2 className="awards-title">The most loved sales<br />platform on the planet</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <div style={{ display: 'flex', color: '#9d4edd', fontSize: '18px' }}>
                {'★★★★★'}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#555' }}>
              4.7/5 based on 9,690 reviews | GDPR Compliant
            </div>
          </div>
          <div className="awards-right">
            {[
              { t1: 'Top 100', t2: 'HIGHEST SATISFACTION\nPRODUCTS' },
              { t1: 'Top 50', t2: 'SALES\nPRODUCTS' },
              { t1: 'Top 100', t2: 'BEST SOFTWARE\nPRODUCTS' },
              { t1: 'Top 50', t2: 'SMALL BUSINESS\nPRODUCTS' },
              { t1: 'Top 100', t2: 'GLOBAL SELLERS' }
            ].map((badge, i) => (
              <div key={i} className="award-badge-box">
                <svg viewBox="0 0 72 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0H72V68L36 90L0 68V0Z" fill="white" />
                  <path d="M0 0H72V68L36 90L0 68V0Z" stroke="#e5e5e5" strokeWidth="1" />
                  <path d="M2 66L36 87L70 66V71L36 90L2 71V66Z" fill="#111" />
                  <path d="M2 61L36 82L70 61V66L36 87L2 66V61Z" fill="#ffb400" />
                  <path d="M2 56L36 77L70 56V61L36 82L2 61V56Z" fill="#ff492c" />
                </svg>
                <div style={{ position: 'absolute', top: 4, left: 4, right: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee', width: '100%', justifyContent: 'space-between', paddingBottom: 3 }}>
                    <span style={{ fontSize: 5, fontWeight: 800, color: '#333', letterSpacing: '0.02em' }}>BEST SOFTWARE</span>
                    <div style={{ background: '#ff492c', color: '#fff', fontSize: 6, fontWeight: 800, padding: '1px 3px', borderRadius: 2 }}>G2</div>
                  </div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#666', marginTop: 3 }}>2025</div>
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#111', lineHeight: 1, marginTop: 1 }}>{badge.t1}</div>
                  <div style={{ fontSize: 5, fontWeight: 700, color: '#555', textAlign: 'center', marginTop: 3, padding: '0 2px', lineHeight: 1.2, whiteSpace: 'pre-line' }}>{badge.t2}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CREDITS */}
        <div id="credits" className="pricing-credits-section">
          <div className="pricing-credits-container">
            <div className="pricing-credits-left">
              <h2 className="credits-title">
                What are<br />Apollo<br />credits?
              </h2>
              <p className="credits-desc">
                Credits give you access to emails, phone numbers, and enriched data, helping you connect with prospects and enhance your CRM.
              </p>
              <button className="credits-cta-btn">
                Need more credits?
              </button>
            </div>

            <div className="pricing-credits-coin-wrap">
              {/* 3D Coin */}
              <div style={{ position: 'relative', width: 90, height: 90 }}>
                {/* Back Edge */}
                <div style={{ position: 'absolute', top: 0, left: 16, width: 74, height: 90, background: '#111', borderRadius: '50%', transform: 'scaleX(0.8)' }}></div>
                
                {/* Side ridges (yellow) */}
                <div style={{ position: 'absolute', top: 3, left: 28, width: 60, height: 84, background: '#fcf64a', borderRadius: '50%', transform: 'scaleX(0.8)' }}></div>
                <div style={{ position: 'absolute', top: 3, left: 38, width: 60, height: 84, background: '#111', borderRadius: '50%', transform: 'scaleX(0.8)' }}></div>
                <div style={{ position: 'absolute', top: 3, left: 48, width: 60, height: 84, background: '#fcf64a', borderRadius: '50%', transform: 'scaleX(0.8)' }}></div>
                <div style={{ position: 'absolute', top: 0, left: 58, width: 74, height: 90, background: '#111', borderRadius: '50%', transform: 'scaleX(0.8)' }}></div>

                {/* Front Face */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: 74, height: 90, background: '#fcf64a', border: '2px solid #111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L13.5 9L20 12L13.5 15L12 22L10.5 15L4 12L10.5 9L12 2Z" stroke="#111" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="pricing-credits-right">
              {/* Connecting lines desktop */}
              <svg className="credits-connector-lines" fill="none">
                 <path d="M0,50% L30,50% L30,8.3% L100,8.3%" stroke="#aaa" strokeWidth="1" strokeDasharray="2 2" />
                 <path d="M0,50% L30,50% L30,25% L100,25%" stroke="#aaa" strokeWidth="1" strokeDasharray="2 2" />
                 <path d="M0,50% L30,50% L30,41.6% L100,41.6%" stroke="#aaa" strokeWidth="1" strokeDasharray="2 2" />
                 <path d="M0,50% L100,50%" stroke="#aaa" strokeWidth="1" strokeDasharray="2 2" />
                 <path d="M0,50% L30,50% L30,75% L100,75%" stroke="#aaa" strokeWidth="1" strokeDasharray="2 2" />
                 <path d="M0,50% L30,50% L30,91.6% L100,91.6%" stroke="#aaa" strokeWidth="1" strokeDasharray="2 2" />
                 {/* Dot nodes on the right */}
                 <circle cx="97" cy="8.3%" r="2" fill="#aaa" />
                 <circle cx="97" cy="25%" r="2" fill="#aaa" />
                 <circle cx="97" cy="41.6%" r="2" fill="#aaa" />
                 <circle cx="97" cy="50%" r="2" fill="#aaa" />
                 <circle cx="97" cy="75%" r="2" fill="#aaa" />
                 <circle cx="97" cy="91.6%" r="2" fill="#aaa" />
              </svg>

              <div className="credits-cards-list">
                {[
                  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>, name: 'Email', pill: '1 credit', desc: 'Access verified emails to connect with the right prospects.' },
                  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>, name: 'Phone number', pill: '8 credits', desc: 'Access verified phone numbers and directly connect with your prospects.' },
                  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9"></path></svg>, name: 'Enrich data', pill: '1-8 credits', desc: 'Enhance your contact and company profiles with enriched data for better targeting.' },
                  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>, name: 'AI research', pill: '1 credit per run', desc: 'Get insights with AI: identify prospects\' pain points, engage contacts, and refine filters.' },
                  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path><path d="M14.05 2a9 9 0 0 1 8 7.94"></path><path d="M14.05 6A5 5 0 0 1 18 10"></path></svg>, name: 'US Dialer', pill: '2 credits per minute', desc: 'Connect with prospects faster through real-time, high-quality calling.' },
                  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>, name: 'International Dialer', pill: 'Varies by region', desc: 'Reach global leads with seamless international calling.' },
                ].map((item, i) => (
                  <div key={i} className="credits-feature-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: '#555', display: 'flex' }}>{item.icon}</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>{item.name}</span>
                      <span style={{ fontSize: '10px', fontWeight: 600, background: '#e5e5e5', color: '#555', padding: '2px 8px', borderRadius: '12px', letterSpacing: '0.02em' }}>{item.pill}</span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#666', paddingLeft: 24 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="pricing-testimonials">
          <div className="pricing-testimonials-container">
            <div className="pricing-testimonials-left">
              <h2 className="testimonials-title">
                The fastest<br />growing<br />businesses<br />use Apollo
              </h2>
              <p className="testimonials-desc">
                500,000+ companies use Apollo to stay ahead of the competition.
              </p>
              <button className="testimonials-cta-btn">
                Get started for free
              </button>
            </div>
            
            <div className="pricing-testimonials-slider-wrap">
              <div ref={testimonialsRef} className="pricing-testimonials-track">
                {[
                  {
                    text: "We reduced the complexity of three tools into one. We're getting higher reply rates, open rates are doubled, meetings are up, and speed to booking a meeting is cut in half. This is the sales platform for people who want to do more with their outreach.",
                    name: "Collin Steward",
                    role: "CEO at Predictable Revenue",
                    img: "https://i.pravatar.cc/100?img=11",
                    stat: "50%",
                    statSub: "COST SAVINGS"
                  },
                  {
                    text: "We've saved 100+ hours a month by automating manual tasks for our full-time BDRs. I'm seeing rep efficiency go through the roof, allowing us to write personalized emails that resonate. The ROI we've seen has been an incredible consideration.",
                    name: "Alexander Y.",
                    role: "Founder & CEO",
                    img: "https://i.pravatar.cc/100?img=12",
                    stat: "3x",
                    statSub: "MORE MEETINGS"
                  },
                  {
                    text: "Since adopting Apollo, our outbound pipeline has grown by 150%. The combination of hyper-accurate data and automated sequencing in a single platform is unparalleled. It truly is the operating system for modern sales teams.",
                    name: "Sarah M.",
                    role: "Head of Sales, TechCo",
                    img: "https://i.pravatar.cc/100?img=9",
                    stat: "150%",
                    statSub: "PIPELINE GROWTH"
                  }
                ].map((t, i) => (
                  <div key={i} className="pricing-testimonial-card-item">
                    <div>
                      <div style={{ fontSize: '32px', fontWeight: 700, color: '#111', marginBottom: 8, lineHeight: 0.8, fontFamily: 'Georgia, serif' }}>“</div>
                      <div style={{ fontSize: '15px', color: '#222', lineHeight: 1.6, fontWeight: 400 }}>{t.text}</div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 48 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img src={t.img} alt={t.name} style={{ width: 44, height: 44, borderRadius: '4px', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>{t.name}</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>{t.role}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '46px', fontWeight: 400, color: '#111', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 4 }}>{t.stat}</div>
                        <div style={{ fontSize: '9px', fontWeight: 600, color: '#888', letterSpacing: '0.08em' }}>{t.statSub}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
                <button onClick={() => scrollTestimonials(-1)} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', background: '#fff', borderRadius: '4px', cursor: 'pointer', color: '#888' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button onClick={() => scrollTestimonials(1)} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #111', background: '#fff', borderRadius: '4px', cursor: 'pointer', color: '#111' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <FAQAccordion />
      </div>
    </div>
  );
}
