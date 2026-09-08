import React from 'react';
import { Star, Award, Shield } from 'lucide-react';
import './CustomerStories.css';

export default function CustomerStories() {
  const testimonials = [
    {
      quote: "Apollo helped us scale our outbound engine from 0 to $10M ARR in less than 12 months. The data quality and intent filters are unmatched.",
      name: "Tania Perez",
      role: "Global Head of Revenue, Census",
      initials: "TP"
    },
    {
      quote: "We cut our tech stack costs by 50% by switching from ZoomInfo + Outreach to Apollo. Our SDRs love the unified workspace.",
      name: "David Krum",
      role: "VP of Sales, Seedify",
      initials: "DK"
    },
    {
      quote: "The AI copywriter and automatic CRM enrichment saved our team 20 hours a week per rep. Essential platform for modern GTM teams.",
      name: "Carlos Mendes",
      role: "RevOps Director, ScaleX",
      initials: "CM"
    }
  ];

  return (
    <section className="customer-stories-section">
      <div className="container">
        {/* Header */}
        <div className="stories-header">
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px' }}>
              CUSTOMER SUCCESS STORIES
            </div>
            <h2 className="stories-title">
              600K+ Companies & Counting
            </h2>
          </div>
          <a href="#customers" className="btn-apollo-secondary">
            Read All Customer Case Studies &rarr;
          </a>
        </div>

        {/* Stories Cards Grid */}
        <div className="stories-grid">
          {testimonials.map((story, idx) => (
            <div key={idx} className="story-card">
              <div className="story-quote">
                “{story.quote}”
              </div>
              <div className="story-user">
                <div className="story-avatar">{story.initials}</div>
                <div>
                  <div className="story-name">{story.name}</div>
                  <div className="story-role">{story.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industry Recognition Badges Strip */}
        <div className="badges-strip">
          <div className="badge-item">
            <div className="g2-badge">G2</div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '15px' }}>#1 Leader in Sales Intelligence</div>
              <div style={{ fontSize: '13px', color: '#666' }}>G2 Grid Leader Winter 2026</div>
            </div>
          </div>

          <div className="badge-item">
            <div className="g2-badge" style={{ background: '#00B67A' }}>★</div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '15px' }}>4.8 / 5 Customer Rating</div>
              <div style={{ fontSize: '13px', color: '#666' }}>Based on 7,500+ Verified Reviews</div>
            </div>
          </div>

          <div className="badge-item">
            <Shield size={36} color="#0F0F0F" />
            <div>
              <div style={{ fontWeight: '800', fontSize: '15px' }}>Enterprise Grade Security</div>
              <div style={{ fontSize: '13px', color: '#666' }}>SOC-2 Type II & ISO 27001 Certified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
