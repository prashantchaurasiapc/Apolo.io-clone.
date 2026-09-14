import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Code
} from 'lucide-react';
import './FormsView.css';

export const FormsView = ({ showToast = () => {} }) => {
  const [modalType, setModalType] = useState(null); // 'enrich' | 'builder' | null
  const [formUrl, setFormUrl] = useState('');
  const [newFormTitle, setNewFormTitle] = useState('Inbound Demo Request');

  const handleEnrichSubmit = (e) => {
    e.preventDefault();
    if (!formUrl.trim()) return;
    setModalType(null);
    showToast(`Enrichment enabled for ${formUrl}! Automatically mapping 65+ Apollo fields.`);
    setFormUrl('');
  };

  const handleCreateFormSubmit = (e) => {
    e.preventDefault();
    if (!newFormTitle.trim()) return;
    setModalType(null);
    showToast(`New form "${newFormTitle}" created! Embed code generated.`);
  };

  return (
    <div className="fv-view-container">
      {/* ─── 1. Header (Sticky) ─── */}
      <div className="fv-header">
        <h1 className="fv-title">Forms</h1>
      </div>

      {/* ─── 2. Main Body ─── */}
      <div className="fv-body">
        {/* Hero Copy */}
        <div className="fv-hero-section">
          <h2 className="fv-hero-title">
            Capture more qualified leads with Apollo's Form Builder and Form enrichment
          </h2>
          <p className="fv-hero-desc">
            Create a new form or connect your existing website forms to autofill known fields, shorten, and enrich each submission in real-time.
          </p>
        </div>

        {/* 2 Feature Cards Grid */}
        <div className="fv-cards-grid">
          {/* Card 1: Form Enrichment */}
          <div className="fv-card">
            {/* Top Graphic (Sky Blue) */}
            <div className="fv-graphic-box blue">
              <div className="fv-flower-cluster blue">
                <div className="fv-petal blue p1" />
                <div className="fv-petal blue p2" />
                <div className="fv-petal blue p3" />
                <div className="fv-petal blue p4" />
                <div className="fv-petal blue p5" />
              </div>

              <div className="fv-enrichment-comparison">
                {/* Before Enrichment (Long clunky form) */}
                <div className="fv-mini-form">
                  <span className="fv-badge-pill before">Before enrichment</span>
                  <div className="fv-form-logo">hello <span>inc.</span></div>
                  <div className="fv-mock-input">example@email.com</div>
                  <div className="fv-mock-input pink-highlight">Name</div>
                  <div className="fv-mock-input pink-highlight">Company</div>
                  <div className="fv-mock-input pink-highlight"># Employees</div>
                  <div className="fv-mock-input pink-highlight">Industry</div>
                  <div className="fv-mock-input" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Purpose of the demo</span>
                    <span>▾</span>
                  </div>
                </div>

                {/* After Enrichment (Short 2-field form) */}
                <div className="fv-mini-form after-card">
                  <span className="fv-badge-pill after">After enrichment</span>
                  <div className="fv-form-logo">hello <span>inc.</span></div>
                  <div className="fv-mock-input">example@email.com</div>
                  <div className="fv-mock-input" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Purpose of the demo</span>
                    <span>▾</span>
                  </div>
                  <div className="fv-mock-input" style={{ height: '24px', fontSize: '7px', color: '#64748b' }}>
                    Any specific features you'd like to focus?
                  </div>
                  <div className="fv-btn-submit-mock">Request a demo</div>
                </div>
              </div>
            </div>

            {/* Content Below */}
            <div className="fv-card-content">
              <div className="fv-card-info">
                <h3 className="fv-card-heading">Form Enrichment</h3>
                <p className="fv-card-text">
                  Enrich your existing website forms using Apollo data to increase conversion rates and improve data hygiene.
                </p>
              </div>
              <button
                className="fv-btn-yellow"
                onClick={() => setModalType('enrich')}
              >
                Enrich existing website form
              </button>
            </div>
          </div>

          {/* Card 2: Form builder */}
          <div className="fv-card">
            {/* Top Graphic (Warm Peach) */}
            <div className="fv-graphic-box peach">
              <div className="fv-flower-cluster yellow">
                <div className="fv-petal yellow p1" />
                <div className="fv-petal yellow p2" />
                <div className="fv-petal yellow p3" />
                <div className="fv-petal yellow p4" />
                <div className="fv-petal yellow p5" />
              </div>

              <div className="fv-builder-modal-mock">
                <h4 className="fv-builder-title">Contact Us</h4>
                <div className="fv-builder-field">
                  <span className="fv-builder-label">Name *</span>
                  <div className="fv-builder-input">Full Name</div>
                </div>
                <div className="fv-builder-field">
                  <span className="fv-builder-label">Email *</span>
                  <div className="fv-builder-input">email@example.com</div>
                </div>
                <div className="fv-builder-field">
                  <span className="fv-builder-label">Company</span>
                  <div className="fv-builder-input">ex.: Apollo</div>
                </div>
                <div className="fv-builder-field">
                  <span className="fv-builder-label">Position</span>
                  <div className="fv-builder-input">Your position at company</div>
                </div>
              </div>
            </div>

            {/* Content Below */}
            <div className="fv-card-content">
              <div className="fv-card-info">
                <h3 className="fv-card-heading">Form builder</h3>
                <p className="fv-card-text">
                  Capture website leads with Apollo's form builder - a drag-and-drop editor with custom branding, built-in enrichment, and more.
                </p>
              </div>
              <button
                className="fv-btn-yellow"
                onClick={() => setModalType('builder')}
              >
                Create new website form
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Floating Help Button ─── */}
      <button
        className="fv-floating-help"
        onClick={() => showToast('Apollo Form Builder & Enrichment Help')}
        title="Get help with Forms"
      >
        ?
      </button>

      {/* ─── Modal 1: Enrich Existing Form ─── */}
      {modalType === 'enrich' && (
        <div className="fv-modal-overlay" onClick={() => setModalType(null)}>
          <div className="fv-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="fv-modal-header">
              <h3 className="fv-modal-title">Enrich Existing Website Form</h3>
              <button className="fv-modal-close" onClick={() => setModalType(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEnrichSubmit} className="fv-modal-body">
              <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>
                Connect your existing HubSpot, Marketo, Webflow, or custom HTML forms. When a prospect enters their email, Apollo instantly enriches company name, job title, size, and CRM records in real-time.
              </p>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#0f172a' }}>
                  Website Form URL or Webhook endpoint:
                </label>
                <input
                  type="text"
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  placeholder="https://acme.com/contact-sales"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '13px',
                    outline: 'none',
                    marginTop: '6px',
                    boxSizing: 'border-box'
                  }}
                  autoFocus
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#0d9488', background: '#f0fdfa', padding: '10px 14px', borderRadius: '6px', border: '1px solid #ccfbf1' }}>
                <Sparkles size={16} />
                <span>Shortens forms from 8 fields down to 2 fields, increasing conversion rates by +35%.</span>
              </div>

              <div className="fv-modal-footer" style={{ margin: '10px -24px -24px -24px' }}>
                <button
                  type="button"
                  className="fv-btn-cancel"
                  onClick={() => setModalType(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="fv-btn-submit"
                >
                  Enable Form Enrichment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Modal 2: Create New Website Form ─── */}
      {modalType === 'builder' && (
        <div className="fv-modal-overlay" onClick={() => setModalType(null)}>
          <div className="fv-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="fv-modal-header">
              <h3 className="fv-modal-title">Create New Inbound Form</h3>
              <button className="fv-modal-close" onClick={() => setModalType(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateFormSubmit} className="fv-modal-body">
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#0f172a' }}>
                  Form Name:
                </label>
                <input
                  type="text"
                  value={newFormTitle}
                  onChange={(e) => setNewFormTitle(e.target.value)}
                  placeholder="e.g. Enterprise Demo Request"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '13px',
                    outline: 'none',
                    marginTop: '6px',
                    boxSizing: 'border-box'
                  }}
                  autoFocus
                />
              </div>

              <div>
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#0f172a' }}>Included Default Fields:</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                  {['Full Name (Required)', 'Work Email (Required)', 'Company Name', 'Job Title', 'Phone Number', 'Custom Dropdown'].map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#334155', background: '#f8fafc', padding: '6px 10px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                      <CheckCircle2 size={13} color="#22c55e" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="fv-modal-footer" style={{ margin: '10px -24px -24px -24px' }}>
                <button
                  type="button"
                  className="fv-btn-cancel"
                  onClick={() => setModalType(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="fv-btn-submit"
                >
                  Open Form Designer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
