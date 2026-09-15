import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, ArrowRight, Zap } from 'lucide-react';
import './PricingCheckoutView.css';

/* ── EXACT Apollo.io Plan Data ── */
const PLANS = [
  {
    key: 'free',
    name: 'Free',
    tagline: 'Explore the Apollo platform to find leads, manage pipeline & close deals.',
    annualPrice: 0,
    monthlyPrice: 0,
    cta: 'Get started',
    ctaVariant: 'outline',
    highlighted: false,
    popular: false,
    annualSavings: null,
    creditsLabel: '900 credits per seat per year, granted monthly',
    features: [
      { text: 'AI Assistant (5 chat limit)', highlight: false },
      { text: 'AI Research', highlight: false },
      { text: '2 Sequences', highlight: false },
      { text: 'Prospecting, Gmail & Salesforce Extensions', highlight: false },
      { text: 'Basic Filters', highlight: false },
      { text: 'Website Visitors (Identify 20 companies monthly)', highlight: false },
      { text: 'Real-time Form Enrichment (5 limit)', highlight: false },
      { text: 'Contact & Account Data', highlight: false },
      { text: 'CRM Enrichment (Limit 100 per month)', highlight: false },
      { text: 'API Access', highlight: false },
      { text: '1 Intent Topic', highlight: false },
      { text: '2 Lead Score Limit', highlight: false },
      { text: 'Lead Management', highlight: false },
      { text: '1 Meeting Event', highlight: false },
      { text: 'Call Recording (150 mins)', highlight: false },
    ],
  },
  {
    key: 'basic',
    name: 'Basic',
    tagline: 'Take prospecting, outreach & deal management to the next level.',
    annualPrice: 49,
    monthlyPrice: 59,
    cta: 'Buy now',
    ctaVariant: 'yellow',
    trialLink: 'Start 14-day trial',
    highlighted: true,
    popular: false,
    annualSavings: 192,
    creditsLabel: '30,000 credits per seat per year, granted upfront',
    features: [
      { text: 'AI Assistant', badge: 'INTRODUCTORY FREE', highlight: true },
      { text: 'AI Research & AI Lead Scoring', highlight: false },
      { text: 'Unlimited Sequences', highlight: false },
      { text: 'Prospecting, Gmail & Salesforce Extensions', highlight: false },
      { text: 'Deliverability Suite & Email Warmup', highlight: false },
      { text: 'Advanced Filters', highlight: false },
      { text: 'CRM Integrations', highlight: false },
      { text: 'Waterfall Enrichment', highlight: false },
      { text: '3 Meetings Events', highlight: false },
      { text: '6 Intent Topics & Intent Filters', highlight: false },
      { text: 'CSV, CRM & API Data Enrichment', highlight: false },
      { text: 'Domain & Mailbox Purchasing', highlight: false },
      { text: 'Website Visitors (Identify 100 companies monthly)', highlight: false },
      { text: 'Real-time Form Enrichment (10 limit)', highlight: false },
      { text: '3 Inbound Routers', highlight: false },
      { text: 'Contact & Account Data', highlight: false },
      { text: 'Automated CRM Enrichment', highlight: false },
      { text: 'API Enrichment', highlight: false },
      { text: '6 Intent Topics', highlight: false },
      { text: '2 Lead Score Limit + AI Lead Scoring, Scoring Filters & Details', highlight: false },
      { text: 'CSV Enrichment', highlight: false },
      { text: 'Job Change Enrichment', highlight: false },
      { text: 'Lead Management', highlight: false },
      { text: 'Call Recording (150 mins)', highlight: false },
      { text: 'Deal Management', highlight: false },
      { text: '2 Automated Workflows', highlight: false },
      { text: 'US Dialer (credits apply)', highlight: false },
    ],
  },
  {
    key: 'pro',
    name: 'Professional',
    tagline: 'Optimize your sales process with multi-touch outreach, AI & automation.',
    annualPrice: 79,
    monthlyPrice: 99,
    cta: 'Buy now',
    ctaVariant: 'dark',
    trialLink: 'Start 14-day trial',
    highlighted: false,
    popular: true,
    annualSavings: 240,
    creditsLabel: '48,000 credits per seat per year, granted upfront',
    features: [
      { text: 'AI Assistant', badge: 'INTRODUCTORY FREE', highlight: true },
      { text: 'AI Research & AI Lead Scoring', highlight: false },
      { text: 'Agentic Loops', highlight: false },
      { text: 'Unlimited Sequences & A/Z Testing', highlight: false },
      { text: 'Prospecting, Gmail & Salesforce Extensions', highlight: false },
      { text: 'Deliverability Suite & Email Warmup', highlight: false },
      { text: 'Advanced Filters', highlight: false },
      { text: 'CRM Integrations', highlight: false },
      { text: 'Waterfall Enrichment', highlight: false },
      { text: 'Unlimited Meeting Events', highlight: false },
      { text: '6 Intent Topics & Intent Filters', highlight: false },
      { text: 'CSV, CRM & API Data Enrichment', highlight: false },
      { text: 'Domain & Mailbox Purchasing', highlight: false },
      { text: 'Projects BETA', highlight: false },
      { text: 'Unlimited Gmail & Microsoft Mailboxes', highlight: false },
      { text: 'Automated Workflows', highlight: false },
      { text: 'Call Recordings & AI Insights (4,000 mins)', highlight: false },
      { text: 'Analytics & Pre-built Reports', highlight: false },
      { text: 'Website Visitors (Identify 100 companies monthly)', highlight: false },
      { text: 'Real-time Form Enrichment (10 limit)', highlight: false },
      { text: 'Unlimited Inbound Routers', highlight: false },
      { text: 'Contact & Account Data', highlight: false },
      { text: 'Automated CRM Enrichment', highlight: false },
      { text: 'API Enrichment', highlight: false },
      { text: '6 Intent Topics', highlight: false },
      { text: 'Unlimited Lead Score + AI Lead Scoring, Scoring Filters & Details', highlight: false },
      { text: 'CSV Enrichment', highlight: false },
      { text: 'Job Change Enrichment', highlight: false },
      { text: 'Lead Management', highlight: false },
      { text: 'Call Recording (4,000 mins)', highlight: false },
      { text: 'Deal Management', highlight: false },
      { text: 'Pre-meeting AI Insights', highlight: false },
      { text: 'AI Call Insights', highlight: false },
      { text: 'Goals Setting & Tracking', highlight: false },
      { text: 'US Dialer (credits apply)', highlight: false },
    ],
  },
  {
    key: 'org',
    name: 'Organization',
    tagline: 'Transform go-to-market with advanced tools, custom solutions & expert help.',
    annualPrice: 119,
    monthlyPrice: 149,
    cta: 'Buy now',
    ctaVariant: 'yellow',
    ctaSecondary: 'Talk to Sales',
    highlighted: false,
    popular: false,
    annualSavings: 360,
    creditsLabel: '72,000 credits per seat per year, granted upfront',
    priceSuffix: 'min 3 seats',
    features: [
      { text: 'AI Assistant', badge: 'INTRODUCTORY FREE', highlight: true },
      { text: 'AI Research & AI Lead Scoring', highlight: false },
      { text: 'Agentic Loops', highlight: false },
      { text: 'Unlimited Sequences & A/Z Testing', highlight: false },
      { text: 'Prospecting, Gmail & Salesforce Extensions', highlight: false },
      { text: 'Deliverability Suite & Email Warmup', highlight: false },
      { text: 'Advanced Filters', highlight: false },
      { text: 'CRM Integrations', highlight: false },
      { text: 'Waterfall Enrichment', highlight: false },
      { text: 'Unlimited Meeting Events', highlight: false },
      { text: '12 Intent Topics & Intent Filters', highlight: false },
      { text: 'CSV, CRM & API Data Enrichment', highlight: false },
      { text: 'Domain & Mailbox Purchasing', highlight: false },
      { text: 'Projects BETA', highlight: false },
      { text: 'Unlimited Gmail & Microsoft Mailboxes', highlight: false },
      { text: 'Automated Workflows', highlight: false },
      { text: 'Call Recordings & AI Insights (8,000 mins)', highlight: false },
      { text: 'Analytics & Pre-built Reports', highlight: false },
      { text: 'Customizable Reports & Dashboards', highlight: false },
      { text: 'Advanced Security Configurations', highlight: false },
      { text: 'Single Sign-on (SSO)', highlight: false },
      { text: 'Use your own LLM API key', highlight: false },
      { text: 'Website Visitors (Identify 100 companies monthly)', highlight: false },
      { text: 'Real-time Form Enrichment (10 limit)', highlight: false },
      { text: 'Unlimited Inbound Routers', highlight: false },
      { text: 'Contact & Account Data', highlight: false },
      { text: 'Automated CRM Enrichment', highlight: false },
      { text: 'API Enrichment', highlight: false },
      { text: '12 Intent Topics', highlight: false },
      { text: 'Unlimited Lead Score + AI Lead Scoring, Scoring Filters & Details', highlight: false },
      { text: 'CSV Enrichment', highlight: false },
      { text: 'Job Change Enrichment', highlight: false },
      { text: 'Lead Management', highlight: false },
      { text: 'Call Recording (8,000 mins)', highlight: false },
      { text: 'Deal Management', highlight: false },
      { text: 'Pre-meeting AI Insights', highlight: false },
      { text: 'AI Call Insights', highlight: false },
      { text: 'Goals Setting & Tracking', highlight: false },
      { text: 'Dedicated GTM Engineer (min. contract value required)', highlight: false },
      { text: 'US Dialer (credits apply)', highlight: false },
    ],
  },
];

const FAQS = [
  { q: 'Can I change my plan at any time?', a: 'Yes — you can upgrade or downgrade your plan at any time. Changes take effect immediately and any billing differences will be prorated automatically.' },
  { q: 'What are Apollo credits?', a: 'Apollo credits are used to unlock contact data like mobile phone numbers and direct dials. Each plan includes a set number of email, mobile, and export credits per month or year. Email credits are unlimited on all plans.' },
  { q: 'Is there a free trial for paid plans?', a: 'Yes! Basic and Professional plans include a 14-day free trial. Get started with no credit card required.' },
  { q: 'What happens if I run out of credits?', a: "You can purchase additional credit top-ups at any time without upgrading your base plan. We'll notify you when you're running low." },
  { q: 'Do you offer discounts for annual billing?', a: 'Yes — annual billing saves you up to 24% compared to paying monthly. The discount is reflected automatically when you switch to an annual plan.' },
  { q: 'What integrations does Apollo support?', a: 'Apollo integrates with Salesforce, HubSpot, Pipedrive, Outreach, Salesloft, Gmail, Outlook, Zapier, and many more.' },
  { q: 'Is there a minimum number of seats for Organization?', a: "Yes, the Organization plan requires a minimum of 3 users. It's designed for larger teams that need advanced security, admin controls, and a dedicated GTM Engineer." },
];

function CheckIcon() {
  return (
    <svg className="pco-feat-check" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7l3.5 3.5 6.5-6.5" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7.5 1.5L2.5 7.5h4l-1 4 6-7H7.5l1-3z" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0.4" strokeLinejoin="round" />
    </svg>
  );
}

export default function PricingCheckoutView({ showToast }) {
  const [billing, setBilling] = useState('annual');
  const [selected, setSelected] = useState('basic');
  const [seats, setSeats] = useState(1);
  const [faqOpen, setFaqOpen] = useState(null);

  const cur = PLANS.find(p => p.key === selected);
  const pricePerSeat = billing === 'annual' ? cur.annualPrice : cur.monthlyPrice;
  const total = pricePerSeat * (billing === 'annual' ? 12 : 1) * seats;

  return (
    <div className="pco-page">

      {/* ── STEP BAR ── */}
      <div className="pco-stepbar">
        {['SELECT PLAN', 'ADD-ONS', 'PAYMENT', 'REVIEW'].map((s, i) => (
          <React.Fragment key={s}>
            <div className={`pco-step ${i === 0 ? 'pco-step--on' : ''}`}>
              <div className="pco-step-dot" />
              <span className="pco-step-lbl">{s}</span>
            </div>
            {i < 3 && <div className="pco-step-track" />}
          </React.Fragment>
        ))}
      </div>

      {/* ── BODY ── */}
      <div className="pco-body">

        {/* LEFT */}
        <div className="pco-left">

          <h1 className="pco-h1">Choose your plan</h1>
          <p className="pco-sub">Teams with paid plans book <strong>183% more meetings.</strong></p>

          {/* Seats row */}
          <div className="pco-seats-box">
            <span className="pco-seats-txt">How many seats do you need?</span>
            <div className="pco-stepper">
              <button className="pco-st-btn" disabled={seats <= 1} onClick={() => setSeats(s => Math.max(1, s - 1))}>−</button>
              <span className="pco-st-num">{seats}</span>
              <button className="pco-st-btn" onClick={() => setSeats(s => s + 1)}>+</button>
            </div>
          </div>

          {/* Billing toggle */}
          <div className="pco-bpill">
            <button
              className={`pco-bopt ${billing === 'annual' ? 'pco-bopt--on' : ''}`}
              onClick={() => setBilling('annual')}
            >
              Annual billing
              <span className="pco-savechip">Save up to 24%</span>
            </button>
            <button
              className={`pco-bopt pco-bopt--light ${billing === 'monthly' ? 'pco-bopt--light-on' : ''}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly billing
            </button>
          </div>

          {/* Plan Cards */}
          <div className="pco-grid">
            {PLANS.map(plan => {
              const price = billing === 'annual' ? plan.annualPrice : plan.monthlyPrice;
              const isSel = selected === plan.key;
              return (
                <div
                  key={plan.key}
                  className={[
                    'pco-card',
                    plan.highlighted ? 'pco-card--hi' : '',
                    isSel ? 'pco-card--sel' : '',
                    plan.popular ? 'pco-card--pop' : '',
                  ].join(' ')}
                  onClick={() => setSelected(plan.key)}
                >
                  {plan.popular && <div className="pco-pop-badge">MOST POPULAR</div>}

                  <div className="pco-card-name">{plan.name}</div>
                  <div className="pco-card-tag">{plan.tagline}</div>

                  {/* Price */}
                  <div className="pco-price-row">
                    <span className="pco-dollar">$</span>
                    <span className="pco-amount">{price}</span>
                  </div>
                  <div className="pco-price-sub">
                    {price > 0
                      ? `Per seat per month,\n${billing === 'annual' ? 'billed annually' : 'billed monthly'}${plan.priceSuffix ? ' (' + plan.priceSuffix + ')' : ''}`
                      : ''}
                  </div>

                  {/* Credits */}
                  <div className="pco-credits-row">
                    <LightningIcon />
                    <span className="pco-credits-txt">{plan.creditsLabel}</span>
                  </div>

                  {/* CTA */}
                  <button
                    className={`pco-cta pco-cta--${isSel ? 'sel' : plan.ctaVariant}`}
                    onClick={e => { e.stopPropagation(); setSelected(plan.key); showToast?.(`${plan.name} plan selected`); }}
                  >
                    {isSel && plan.ctaVariant !== 'outline' ? '✓ ' : ''}{plan.cta}
                  </button>

                  {plan.ctaSecondary && (
                    <button
                      className="pco-cta-secondary"
                      onClick={e => { e.stopPropagation(); showToast?.('Connecting to Sales...'); }}
                    >
                      {plan.ctaSecondary}
                    </button>
                  )}

                  {plan.trialLink && (
                    <div className="pco-trial-link">{plan.trialLink}</div>
                  )}

                  <div className="pco-card-divider" />

                  {/* Features */}
                  <ul className="pco-feat-list">
                    {plan.features.map((f, i) => (
                      <li key={i} className="pco-feat-item">
                        <CheckIcon />
                        <span>
                          {f.text}
                          {f.badge && <span className="pco-ai-badge">{f.badge}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Compare link */}
                  <a href="#pco-compare" className="pco-compare-link">
                    Compare all plans
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2.5l-.5.5 3.5 3-3.5 3 .5.5 4-3.5L6 2.5z" fill="currentColor" />
                      <path d="M3 2.5l-.5.5 3.5 3-3.5 3 .5.5 4-3.5L3 2.5z" fill="currentColor" opacity="0.4" />
                    </svg>
                  </a>
                </div>
              );
            })}
          </div>

          <p className="pco-disclaimer">Prices exclude any applicable taxes.</p>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="pco-right">
          <div className="pco-sidebar-card">
            <h3 className="pco-sidebar-title">
              Your {cur.name} {billing} plan
            </h3>

            {/* Annual radio */}
            <label
              className={`pco-radio-row ${billing === 'annual' ? 'pco-radio-row--on' : ''}`}
              onClick={() => setBilling('annual')}
            >
              <div className={`pco-radio-dot ${billing === 'annual' ? 'pco-radio-dot--on' : ''}`} />
              <div className="pco-radio-info">
                <div className="pco-radio-main">
                  Annual
                  {cur.annualSavings && billing === 'annual' && (
                    <span className="pco-savings-tag">Save ${cur.annualSavings}/year per seat</span>
                  )}
                </div>
                <div className="pco-radio-sub">${cur.annualPrice}/month per seat</div>
              </div>
            </label>

            {/* Monthly radio */}
            <label
              className={`pco-radio-row ${billing === 'monthly' ? 'pco-radio-row--on' : ''}`}
              onClick={() => setBilling('monthly')}
            >
              <div className={`pco-radio-dot ${billing === 'monthly' ? 'pco-radio-dot--on' : ''}`} />
              <div className="pco-radio-info">
                <div className="pco-radio-main">Monthly</div>
                <div className="pco-radio-sub">${cur.monthlyPrice}/month per seat</div>
              </div>
            </label>

            <div className="pco-sdiv" />

            {/* Seats + price */}
            <div className="pco-seats-summary">
              <span className="pco-ss-label">Seats</span>
              <span className="pco-ss-price">
                ${(pricePerSeat * (billing === 'annual' ? 12 : 1) * seats).toFixed(0)}/{billing === 'annual' ? 'year' : 'month'}
              </span>
            </div>
            <div className="pco-sum-stepper">
              <button className="pco-sum-st" disabled={seats <= 1} onClick={() => setSeats(s => Math.max(1, s - 1))}>−</button>
              <span className="pco-sum-num">{seats}</span>
              <button className="pco-sum-st" onClick={() => setSeats(s => s + 1)}>+</button>
            </div>

            <div className="pco-sdiv" />

            <div className="pco-billed-txt">Billed {billing === 'annual' ? 'annually' : 'monthly'}</div>

            <div className="pco-big-price">
              ${total.toFixed(2)}
              <span className="pco-big-per">/{billing === 'annual' ? 'year' : 'month'}</span>
            </div>
            <div className="pco-tax-note">Sales tax calculated at checkout</div>

            <button className="pco-proceed" onClick={() => showToast?.(`Processing payment for ${cur.name} — ${seats} seat(s)`)}>
              Proceed to payment <ArrowRight size={15} />
            </button>

            <div className="pco-trust">
              <div className="pco-trust-row">🔒 <span>14-day free trial included</span></div>
              <div className="pco-trust-row">✅ <span>No credit card charged today</span></div>
            </div>
          </div>

          <button className="pco-qbtn" onClick={() => showToast?.('Apollo Support & Help Center')}>?</button>
        </div>
      </div>

      {/* ── CREDITS SECTION ── */}
      <div className="pco-credits-section">
        <div className="pco-credits-inner">
          <div className="pco-credits-left">
            <h2 className="pco-credits-h2">
              What are <span className="pco-zap-span">⚡ credits</span>?
            </h2>
            <p className="pco-credits-desc">
              Apollo credits are how you access verified contact data — emails, mobile numbers, and exports. Each plan comes with a set number of credits per year to power your prospecting.
            </p>
            <button className="pco-credits-btn" onClick={() => showToast?.('Opening Credits Guide')}>
              Learn more about credits →
            </button>
          </div>
          <div className="pco-credits-right">
            <div className="pco-credit-card">
              <div className="pco-credit-icon">✉️</div>
              <div>
                <div className="pco-credit-name">Email credits</div>
                <div className="pco-credit-chip">Unlimited on paid plans</div>
                <div className="pco-credit-desc">Verify and reveal emails for every contact you prospect.</div>
              </div>
            </div>
            <div className="pco-credit-card">
              <div className="pco-credit-icon">📱</div>
              <div>
                <div className="pco-credit-name">Mobile credits</div>
                <div className="pco-credit-chip">Plan-based allocation</div>
                <div className="pco-credit-desc">Unlock direct dial mobile numbers for key decision-makers.</div>
              </div>
            </div>
            <div className="pco-credit-card">
              <div className="pco-credit-icon">📤</div>
              <div>
                <div className="pco-credit-name">Export credits</div>
                <div className="pco-credit-chip">Per plan limits</div>
                <div className="pco-credit-desc">Export enriched records to CSV or sync directly to your CRM.</div>
              </div>
            </div>
            <div className="pco-credit-card">
              <div className="pco-credit-icon">⚡</div>
              <div>
                <div className="pco-credit-name">Word AI credits</div>
                <div className="pco-credit-chip">250K–1M words/month</div>
                <div className="pco-credit-desc">Power AI-written emails, sequences, and research reports.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="pco-faq-section">
        <h2 className="pco-faq-h2">Frequently asked questions</h2>
        <div className="pco-faq-list">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className={`pco-faq-item ${faqOpen === i ? 'pco-faq-item--open' : ''}`}
              onClick={() => setFaqOpen(faqOpen === i ? null : i)}
            >
              <div className="pco-faq-q">
                <span>{item.q}</span>
                {faqOpen === i ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
              </div>
              {faqOpen === i && <div className="pco-faq-a">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
