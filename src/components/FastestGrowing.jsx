import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './FastestGrowing.css';

const CUSTOMERS = [
  {
    category: 'SALES LEADERS',
    image: '/images/customers/nicole.jpg',
    name: 'Nicole Coetzer',
    role: 'Head of Sales Development',
    company: '@ Kinsta',
    quote: 'Apollo helped us build our outbound engine from scratch. We achieved a 36% connection rate and consistently exceed quotas.',
    metric: '+36% Connection Rate',
    logo: (
      <span className="customer-logo-text kinsta-logo">
        Kinsta
      </span>
    )
  },
  {
    category: 'ACCOUNT EXECS',
    image: '/images/customers/diego.jpg',
    name: 'Diego Cobian',
    role: 'Account Executive',
    company: '@ Arbolus',
    quote: 'Using Apollo\'s verified dials and buyer intent signals, I hit 140% of my quarterly quota with zero tab-switching.',
    metric: '140% Quota Attainment',
    logo: (
      <span className="customer-logo-text arbolus-logo">
        <span className="arbolus-icon">&#9678;</span> arbolus
      </span>
    )
  },
  {
    category: 'SDRS',
    image: '/images/customers/andrew.jpg',
    name: 'Andrew Froning',
    role: 'BDR Leader',
    company: '@ Cyera',
    quote: 'Cyera scaled its BDR team at hypergrowth speed. Our rep ramp time dropped from 3 months down to just 3 weeks.',
    metric: '3 Weeks Ramp Time',
    logo: (
      <span className="customer-logo-text cyera-logo">
        <span className="cyera-icon">&#10042;</span> CYERA
      </span>
    )
  },
  {
    category: 'REV OPS',
    image: '/images/customers/mark.jpg',
    name: 'Mark Turner',
    role: 'VP of Revenue Operations',
    company: '@ Built In',
    quote: 'Consolidating our data, sequencing, and dialer into Apollo saved Built In over $120K annually with 99% data accuracy.',
    metric: 'Saved $120K / year',
    logo: (
      <span className="customer-logo-text builtin-logo">
        <span className="builtin-box">built in</span>
      </span>
    )
  }
];

export default function FastestGrowing() {
  return (
    <section className="fastest-growing-section" id="customers">
      <div className="fastest-growing-container">
        {/* ── Top Header Block: Headline + Giant 600K+ ── */}
        <div className="fastest-growing-header">
          <div className="fastest-growing-title-wrap">
            <h2 className="fastest-growing-title">
              The fastest growing<br />businesses use<br />Apollo
            </h2>
            <p className="fastest-growing-subtitle">
              Over 600,000 companies use Apollo to stay ahead of the competition.
            </p>
          </div>

          <div className="fastest-growing-stat-wrap">
            <span className="giant-stat-number">600K+</span>
          </div>
        </div>

        {/* ── 4 Customer Cards Grid with Bottom-to-Top Hover Reveal ── */}
        <div className="fastest-growing-grid">
          {CUSTOMERS.map((item, idx) => (
            <div key={idx} className="customer-persona-card">
              {/* Default Card Content */}
              <div className="customer-card-inner">
                <div className="customer-card-top">
                  <span className="customer-category-label">
                    {item.category}
                  </span>

                  <div className="customer-avatar-box">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="customer-avatar-img"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="customer-person-name">{item.name}</h3>
                  <div className="customer-person-role">{item.role}</div>
                  <div className="customer-person-company">{item.company}</div>
                </div>

                <div className="customer-card-bottom">
                  {item.logo}
                </div>
              </div>

              {/* Bottom-to-Top Slide-Up Overlay on Hover */}
              <div className="customer-hover-overlay">
                <div className="overlay-top">
                  <span className="overlay-metric-badge">{item.metric}</span>
                  <p className="overlay-quote-text">
                    “{item.quote}”
                  </p>
                </div>

                <div className="overlay-bottom">
                  <div className="overlay-author-row">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="overlay-mini-avatar"
                    />
                    <div>
                      <div className="overlay-author-name">{item.name}</div>
                      <div className="overlay-author-sub">{item.company}</div>
                    </div>
                  </div>
                  <a href="#case-study" className="overlay-story-link">
                    Read story <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
