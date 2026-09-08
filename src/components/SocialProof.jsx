import React from 'react';
import './SocialProof.css';

export default function SocialProof() {
  const brands = ['AUTODESK', 'Dolby', 'iru', 'SMARTLING', 'Brex', 'ANTHROPIC'];

  return (
    <section className="social-proof-section">
      <div className="container">
        {/* Top Header & Brand Logos */}
        <div className="social-header-row">
          <div className="company-count-label">
            JOIN OVER 600,000 COMPANIES USING APOLLO
          </div>
          <div className="logo-grid">
            {brands.map((brand, idx) => (
              <span key={idx} className="brand-logo-text">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Big Quote Box */}
        <div className="quote-block">
          <h2 className="quote-heading">
            “Every rep is more productive with Apollo. We booked 75% more meetings while cutting manual work in half.”
          </h2>
          <div className="quote-author">
            <span className="quote-author-name">ANDREW FRONING</span>
            <span>BDR LEADER</span>
            <span className="quote-company-logo">CYERA</span>
          </div>
        </div>

        {/* Metric Impact Cards */}
        <div className="metrics-grid">
          {/* Card 1 */}
          <div className="metric-card">
            <div className="metric-card-header">
              <span className="metric-label">70% Increase in sales leads</span>
              <span className="metric-brand">customer.io</span>
            </div>
            <div className="metric-value">70%</div>
          </div>

          {/* Card 2 */}
          <div className="metric-card">
            <div className="metric-card-header">
              <span className="metric-label">4X SDR efficiency</span>
              <span className="metric-brand">GTM Ops</span>
            </div>
            <div className="metric-value">4x</div>
          </div>

          {/* Card 3 */}
          <div className="metric-card">
            <div className="metric-card-header">
              <span className="metric-label">64% lower tech stack costs</span>
              <span className="metric-brand">Census</span>
            </div>
            <div className="metric-value">64%</div>
          </div>
        </div>
      </div>
    </section>
  );
}
