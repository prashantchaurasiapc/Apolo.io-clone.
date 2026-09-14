import React, { useState } from 'react';
import {
  Globe,
  Calendar,
  ChevronDown,
  Send,
  List,
  MoreHorizontal,
  X,
  Copy,
  Check,
  ShieldCheck,
  Building2,
  User,
  Lock
} from 'lucide-react';
import './WebsiteVisitorsView.css';

export const WebsiteVisitorsView = ({ showToast = () => {} }) => {
  const [activeTab, setActiveTab] = useState('people'); // 'companies' | 'people' | 'analytics'
  const [domain, setDomain] = useState('apollo.io');
  const [timeRange, setTimeRange] = useState('Last 90 days');
  const [showDomainMenu, setShowDomainMenu] = useState(false);
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [showAddWebsiteModal, setShowAddWebsiteModal] = useState(false);
  const [newDomainInput, setNewDomainInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [trackingType, setTrackingType] = useState('company'); // 'company' | 'company_person'
  const [showAdvancedIntent, setShowAdvancedIntent] = useState(false);
  const [pageLabel, setPageLabel] = useState('');
  const [intentScore, setIntentScore] = useState('High');

  const sampleTrackingSnippet = `<script>
  (function(a,p,o,l,l,o_io){
    a['ApolloTrackingObject']=l;a[l]=a[l]||function(){
    (a[l].q=a[l].q||[]).push(arguments)},a[l].l=1*new Date();
    o=p.createElement('script'),o_io=p.getElementsByTagName('script')[0];
    o.async=1;o.src='https://assets.apollo.io/micro/track.js';
    o_io.parentNode.insertBefore(o,o_io);
  })(window,document,'script','apollo');
  apollo('init', 'AP-98421074-XYZ');
</script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleTrackingSnippet);
    setCopiedCode(true);
    showToast('Tracking snippet copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleSaveDomain = (e) => {
    if (e) e.preventDefault();
    if (!newDomainInput.trim()) {
      showToast('Please enter a website domain (e.g. yourdomain.com)');
      return;
    }
    const cleanDomain = newDomainInput.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    setDomain(cleanDomain);
    setShowAddWebsiteModal(false);
    showToast(`Domain ${cleanDomain} added successfully with ${trackingType === 'company' ? 'Company' : 'Company & Person'} tracking!`);
    setNewDomainInput('');
  };

  return (
    <div className="wv-view-container">
      {/* ─── 1. Center Floating Mockup Preview Card (Screenshot 1:1) ─── */}
      <div className="wv-preview-card">
        {/* Card Header */}
        <div className="wv-card-header">
          <h2 className="wv-card-title">Website visitors</h2>

          <div className="wv-card-controls">
            {/* Domain Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                className="wv-pill-select"
                onClick={() => setShowDomainMenu(!showDomainMenu)}
              >
                <Globe size={13} color="#2563eb" />
                <span>{domain}</span>
                <ChevronDown size={12} />
              </button>

              {showDomainMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '4px',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    zIndex: 50,
                    width: '160px',
                    padding: '4px'
                  }}
                >
                  {['apollo.io', 'acme-corp.com', 'stripe.com'].map((d, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '6px 10px',
                        fontSize: '12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: domain === d ? '700' : '500',
                        background: domain === d ? '#f1f5f9' : 'transparent',
                        color: '#0f172a'
                      }}
                      onClick={() => {
                        setDomain(d);
                        setShowDomainMenu(false);
                        showToast(`Filtered by domain: ${d}`);
                      }}
                    >
                      {d}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Time Range Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                className="wv-pill-select"
                onClick={() => setShowTimeMenu(!showTimeMenu)}
              >
                <Calendar size={13} color="#64748b" />
                <span>{timeRange}</span>
                <ChevronDown size={12} />
              </button>

              {showTimeMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '4px',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    zIndex: 50,
                    width: '150px',
                    padding: '4px'
                  }}
                >
                  {['Last 7 days', 'Last 30 days', 'Last 90 days', 'Last 12 months'].map((t, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '6px 10px',
                        fontSize: '12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: timeRange === t ? '700' : '500',
                        background: timeRange === t ? '#f1f5f9' : 'transparent',
                        color: '#0f172a'
                      }}
                      onClick={() => {
                        setTimeRange(t);
                        setShowTimeMenu(false);
                        showToast(`Timeframe set to: ${t}`);
                      }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subtabs */}
        <div className="wv-card-tabs">
          <button
            className={`wv-tab-item ${activeTab === 'companies' ? 'active' : ''}`}
            onClick={() => setActiveTab('companies')}
          >
            Visited companies
          </button>
          <button
            className={`wv-tab-item ${activeTab === 'people' ? 'active' : ''}`}
            onClick={() => setActiveTab('people')}
          >
            Visited people
          </button>
          <button
            className={`wv-tab-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>

        {/* 3 Metrics Box */}
        <div className="wv-metrics-row">
          <div className="wv-metric-box">
            <span className="wv-metric-label">Total website visits</span>
            <span className="wv-metric-value">5,368</span>
          </div>
          <div className="wv-metric-box">
            <span className="wv-metric-label">Unique visitors</span>
            <span className="wv-metric-value">3,137</span>
          </div>
          <div className="wv-metric-box">
            <span className="wv-metric-label">Unique identified visitors</span>
            <span className="wv-metric-value">2,275</span>
          </div>
        </div>

        {/* Live Intent Right-to-Left Ticker Stream */}
        <div className="wv-stream-badge-row">
          <div className="wv-pulse-dot" />
          <div className="wv-stream-marquee">
            <span className="wv-stream-chip">⚡ Mastercard — VP of Payments viewed Pricing 3m ago</span>
            <span className="wv-stream-chip">⚡ Accenture — Managing Director viewed API Docs 6m ago</span>
            <span className="wv-stream-chip">⚡ Adobe — Head of Growth viewed Enterprise 11m ago</span>
            <span className="wv-stream-chip">⚡ Etsy — Director of Engineering viewed Integrations 14m ago</span>
            <span className="wv-stream-chip">⚡ Shopify — VP of Product viewed Security 18m ago</span>
            <span className="wv-stream-chip">⚡ Notion — Lead Architect viewed Enterprise 24m ago</span>
            {/* Duplicated for smooth infinite loop */}
            <span className="wv-stream-chip">⚡ Mastercard — VP of Payments viewed Pricing 3m ago</span>
            <span className="wv-stream-chip">⚡ Accenture — Managing Director viewed API Docs 6m ago</span>
            <span className="wv-stream-chip">⚡ Adobe — Head of Growth viewed Enterprise 11m ago</span>
            <span className="wv-stream-chip">⚡ Etsy — Director of Engineering viewed Integrations 14m ago</span>
          </div>
        </div>

        {/* Table Mockup with Realistic Logos & Shimmer Effect */}
        <div className="wv-table-container">
          <table className="wv-mock-table">
            <thead>
              <tr>
                <th className="wv-mock-th" style={{ width: '32px' }}>
                  <input type="checkbox" readOnly checked={false} style={{ cursor: 'pointer' }} />
                </th>
                <th className="wv-mock-th" style={{ width: '170px' }}>NAME</th>
                <th className="wv-mock-th" style={{ width: '180px' }}>COMPANY</th>
                <th className="wv-mock-th">JOB TITLE</th>
                <th className="wv-mock-th" style={{ width: '90px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Mastercard */}
              <tr className="wv-mock-tr">
                <td className="wv-mock-td" style={{ color: '#94a3b8', fontSize: '11px' }}>1</td>
                <td className="wv-mock-td">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="wv-avatar-badge">L</span>
                    <span className="wv-skeleton-bar" style={{ width: '100px' }} />
                  </div>
                </td>
                <td className="wv-mock-td">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="wv-company-logo wv-logo-mastercard">●</span>
                    <span className="wv-skeleton-bar" style={{ width: '95px' }} />
                  </div>
                </td>
                <td className="wv-mock-td">
                  <span className="wv-skeleton-bar" style={{ width: '130px' }} />
                </td>
                <td className="wv-mock-td" style={{ textAlign: 'right' }}>
                  <div className="wv-actions-cell" style={{ justifyContent: 'flex-end' }}>
                    <Send size={13} style={{ cursor: 'pointer' }} onClick={() => showToast('Enrolling in sequence...')} />
                    <List size={13} style={{ cursor: 'pointer' }} onClick={() => showToast('Added to target list')} />
                    <MoreHorizontal size={13} style={{ cursor: 'pointer' }} />
                  </div>
                </td>
              </tr>

              {/* Row 2: Accenture */}
              <tr className="wv-mock-tr">
                <td className="wv-mock-td" style={{ color: '#94a3b8', fontSize: '11px' }}>2</td>
                <td className="wv-mock-td">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="wv-avatar-badge">M</span>
                    <span className="wv-skeleton-bar" style={{ width: '90px' }} />
                  </div>
                </td>
                <td className="wv-mock-td">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="wv-company-logo wv-logo-accenture">&gt;</span>
                    <span className="wv-skeleton-bar" style={{ width: '110px' }} />
                  </div>
                </td>
                <td className="wv-mock-td">
                  <span className="wv-skeleton-bar" style={{ width: '140px' }} />
                </td>
                <td className="wv-mock-td" style={{ textAlign: 'right' }}>
                  <div className="wv-actions-cell" style={{ justifyContent: 'flex-end' }}>
                    <Send size={13} style={{ cursor: 'pointer' }} onClick={() => showToast('Enrolling in sequence...')} />
                    <List size={13} style={{ cursor: 'pointer' }} onClick={() => showToast('Added to target list')} />
                    <MoreHorizontal size={13} style={{ cursor: 'pointer' }} />
                  </div>
                </td>
              </tr>

              {/* Row 3: Adobe */}
              <tr className="wv-mock-tr">
                <td className="wv-mock-td" style={{ color: '#94a3b8', fontSize: '11px' }}>3</td>
                <td className="wv-mock-td">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="wv-avatar-badge">A</span>
                    <span className="wv-skeleton-bar" style={{ width: '95px' }} />
                  </div>
                </td>
                <td className="wv-mock-td">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="wv-company-logo wv-logo-adobe">A</span>
                    <span className="wv-skeleton-bar" style={{ width: '90px' }} />
                  </div>
                </td>
                <td className="wv-mock-td">
                  <span className="wv-skeleton-bar" style={{ width: '120px' }} />
                </td>
                <td className="wv-mock-td" style={{ textAlign: 'right' }}>
                  <div className="wv-actions-cell" style={{ justifyContent: 'flex-end' }}>
                    <Send size={13} style={{ cursor: 'pointer' }} onClick={() => showToast('Enrolling in sequence...')} />
                    <List size={13} style={{ cursor: 'pointer' }} onClick={() => showToast('Added to target list')} />
                    <MoreHorizontal size={13} style={{ cursor: 'pointer' }} />
                  </div>
                </td>
              </tr>

              {/* Row 4: Etsy */}
              <tr className="wv-mock-tr">
                <td className="wv-mock-td" style={{ color: '#94a3b8', fontSize: '11px' }}>4</td>
                <td className="wv-mock-td">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="wv-avatar-badge">S</span>
                    <span className="wv-skeleton-bar" style={{ width: '85px' }} />
                  </div>
                </td>
                <td className="wv-mock-td">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="wv-company-logo wv-logo-etsy">E</span>
                    <span className="wv-skeleton-bar" style={{ width: '85px' }} />
                  </div>
                </td>
                <td className="wv-mock-td">
                  <span className="wv-skeleton-bar" style={{ width: '135px' }} />
                </td>
                <td className="wv-mock-td" style={{ textAlign: 'right' }}>
                  <div className="wv-actions-cell" style={{ justifyContent: 'flex-end' }}>
                    <Send size={13} style={{ cursor: 'pointer' }} onClick={() => showToast('Enrolling in sequence...')} />
                    <List size={13} style={{ cursor: 'pointer' }} onClick={() => showToast('Added to target list')} />
                    <MoreHorizontal size={13} style={{ cursor: 'pointer' }} />
                  </div>
                </td>
              </tr>

              {/* Row 5: Shopify */}
              <tr className="wv-mock-tr">
                <td className="wv-mock-td" style={{ color: '#94a3b8', fontSize: '11px' }}>5</td>
                <td className="wv-mock-td">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="wv-avatar-badge">V</span>
                    <span className="wv-skeleton-bar" style={{ width: '105px' }} />
                  </div>
                </td>
                <td className="wv-mock-td">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="wv-company-logo wv-logo-shopify">S</span>
                    <span className="wv-skeleton-bar" style={{ width: '100px' }} />
                  </div>
                </td>
                <td className="wv-mock-td">
                  <span className="wv-skeleton-bar" style={{ width: '125px' }} />
                </td>
                <td className="wv-mock-td" style={{ textAlign: 'right' }}>
                  <div className="wv-actions-cell" style={{ justifyContent: 'flex-end' }}>
                    <Send size={13} style={{ cursor: 'pointer' }} onClick={() => showToast('Enrolling in sequence...')} />
                    <List size={13} style={{ cursor: 'pointer' }} onClick={() => showToast('Added to target list')} />
                    <MoreHorizontal size={13} style={{ cursor: 'pointer' }} />
                  </div>
                </td>
              </tr>

              {/* Row 6: Notion */}
              <tr className="wv-mock-tr">
                <td className="wv-mock-td" style={{ color: '#94a3b8', fontSize: '11px' }}>6</td>
                <td className="wv-mock-td">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="wv-avatar-badge">N</span>
                    <span className="wv-skeleton-bar" style={{ width: '90px' }} />
                  </div>
                </td>
                <td className="wv-mock-td">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="wv-company-logo wv-logo-notion">N</span>
                    <span className="wv-skeleton-bar" style={{ width: '95px' }} />
                  </div>
                </td>
                <td className="wv-mock-td">
                  <span className="wv-skeleton-bar" style={{ width: '115px' }} />
                </td>
                <td className="wv-mock-td" style={{ textAlign: 'right' }}>
                  <div className="wv-actions-cell" style={{ justifyContent: 'flex-end' }}>
                    <Send size={13} style={{ cursor: 'pointer' }} onClick={() => showToast('Enrolling in sequence...')} />
                    <List size={13} style={{ cursor: 'pointer' }} onClick={() => showToast('Added to target list')} />
                    <MoreHorizontal size={13} style={{ cursor: 'pointer' }} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── 2. Bottom Hero Copy & CTA (Screenshot 1:1) ─── */}
      <div className="wv-hero-cta">
        <h1 className="wv-cta-title">Turn website visitors into pipeline</h1>
        <p className="wv-cta-desc">
          Identify high-intent people and companies browsing your site, then retarget them with
          the right outreach to increase form submissions and meetings booked
        </p>
        <button
          className="wv-btn-add-website"
          onClick={() => setShowAddWebsiteModal(true)}
        >
          Add website
        </button>
      </div>

      {/* ─── Floating Question Mark Help Icon ─── */}
      <button
        className="wv-floating-help"
        onClick={() => showToast('Apollo Website Visitors Intent Documentation')}
        title="Get help with Website Visitors"
      >
        ?
      </button>

      {/* ─── Modal: Add new domain (Screenshot 1:1) ─── */}
      {showAddWebsiteModal && (
        <div className="wv-modal-overlay" onClick={() => setShowAddWebsiteModal(false)}>
          <div className="wv-domain-modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="wv-domain-modal-header">
              <h3 className="wv-domain-modal-title">Add new domain</h3>
              <button
                type="button"
                className="wv-domain-modal-close"
                onClick={() => setShowAddWebsiteModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="wv-domain-modal-body">
              {/* Description */}
              <p className="wv-domain-modal-desc">
                Type or paste the URL of the website you'd like to add the website tracking pixel to. Note that the same pixel works for both company & person-level tracking and you only need to install it once.
              </p>

              {/* Form Box */}
              <div className="wv-domain-form-box">
                {/* Website URL field */}
                <div className="wv-domain-field">
                  <label className="wv-domain-label">
                    Website URL <span className="wv-req-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="wv-domain-input"
                    placeholder="https://yourdomain.com or https://subdomain.yourdomain.com"
                    value={newDomainInput}
                    onChange={(e) => setNewDomainInput(e.target.value)}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSaveDomain();
                      }
                    }}
                  />
                </div>

                {/* Tracking section */}
                <div className="wv-tracking-section">
                  <label className="wv-tracking-label">Tracking</label>
                  <div className="wv-tracking-grid">
                    {/* Option 1: Company (Selected by default) */}
                    <div
                      className={`wv-tracking-card ${trackingType === 'company' ? 'selected' : ''}`}
                      onClick={() => setTrackingType('company')}
                    >
                      <div className="wv-tracking-card-left">
                        <input
                          type="radio"
                          name="trackingType"
                          checked={trackingType === 'company'}
                          onChange={() => setTrackingType('company')}
                          className="wv-tracking-radio"
                        />
                        <div className="wv-tracking-text-wrap">
                          <strong className="wv-tracking-title">Company</strong>
                          <span className="wv-tracking-sub">Identify companies only</span>
                        </div>
                      </div>
                      <div className="wv-tracking-card-right">
                        <Building2 size={16} className="wv-tracking-icon" />
                      </div>
                    </div>

                    {/* Option 2: Company & person */}
                    <div
                      className={`wv-tracking-card ${trackingType === 'company_person' ? 'selected' : ''}`}
                      onClick={() => setTrackingType('company_person')}
                    >
                      <div className="wv-tracking-card-left">
                        <input
                          type="radio"
                          name="trackingType"
                          checked={trackingType === 'company_person'}
                          onChange={() => setTrackingType('company_person')}
                          className="wv-tracking-radio"
                        />
                        <div className="wv-tracking-text-wrap">
                          <div className="wv-tracking-title-row">
                            <strong className="wv-tracking-title">Company & person</strong>
                            <span className="wv-badge-addon">Inbound add-on</span>
                          </div>
                        </div>
                      </div>
                      <div className="wv-tracking-card-right" style={{ display: 'flex', gap: '3px' }}>
                        <Building2 size={16} className="wv-tracking-icon" />
                        <User size={16} className="wv-tracking-icon" />
                      </div>
                    </div>
                  </div>

                  {/* When Company & person is selected: Person-level tracking alert banner (Screenshot 1:1) */}
                  {trackingType === 'company_person' && (
                    <div className="wv-addon-notice-banner">
                      <div className="wv-addon-notice-left">
                        <Lock size={13} className="wv-addon-lock-icon" />
                        <span>
                          <strong>Person-level tracking</strong> requires the Inbound add-on
                        </span>
                      </div>
                      <button
                        type="button"
                        className="wv-addon-link-btn"
                        onClick={() => showToast('Redirecting to Inbound add-on plans & pricing...')}
                      >
                        View add-on details
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Advanced Intent Settings (Collapsible) */}
              <div className="wv-advanced-intent-card">
                <div
                  className="wv-advanced-intent-header"
                  onClick={() => setShowAdvancedIntent(!showAdvancedIntent)}
                >
                  <div className="wv-advanced-intent-left">
                    <strong className="wv-advanced-title">Advanced Intent Settings</strong>
                    <span className="wv-advanced-sub">Set page label and intent</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className="wv-advanced-chevron"
                    style={{
                      transform: showAdvancedIntent ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </div>

                {showAdvancedIntent && (
                  <div className="wv-advanced-intent-body">
                    <div className="wv-intent-field">
                      <label className="wv-domain-label">Page Label</label>
                      <input
                        type="text"
                        className="wv-domain-input"
                        placeholder="e.g. Pricing, Demo Request, Case Studies"
                        value={pageLabel}
                        onChange={(e) => setPageLabel(e.target.value)}
                      />
                    </div>
                    <div className="wv-intent-field" style={{ marginTop: '10px' }}>
                      <label className="wv-domain-label">Intent Weight</label>
                      <select
                        className="wv-domain-input"
                        value={intentScore}
                        onChange={(e) => setIntentScore(e.target.value)}
                      >
                        <option value="High">High intent (3x intent score)</option>
                        <option value="Medium">Medium intent (2x intent score)</option>
                        <option value="Standard">Standard intent (1x intent score)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="wv-domain-modal-footer">
              <button
                type="button"
                className="wv-btn-domain-cancel"
                onClick={() => setShowAddWebsiteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`wv-btn-domain-save ${trackingType === 'company_person' ? 'disabled' : ''}`}
                disabled={trackingType === 'company_person'}
                onClick={trackingType === 'company_person' ? undefined : handleSaveDomain}
                title={trackingType === 'company_person' ? 'Person-level tracking requires Inbound add-on' : 'Save domain'}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
