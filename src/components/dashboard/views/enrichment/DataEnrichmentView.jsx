import React, { useState } from 'react';
import { 
  ChevronDown, Plus, Upload, Database, RefreshCw, Layers, CheckCircle2, 
  Sparkles, FileSpreadsheet, Lock, HelpCircle, ExternalLink, Zap, Settings,
  AlertCircle, ArrowRight, ShieldCheck, Check, Users, Search, Sliders
} from 'lucide-react';

import '../../css/enrichment-view.css';

export default function DataEnrichmentView({ showToast, onNavigateToProspect }) {
  // Active Sub-Tab: 'data_health' | 'crm' | 'csv' | 'job_alerts' | 'form_enrichment'
  const [activeTab, setActiveTab] = useState('data_health');

  // Popover States
  const [automateDropdownOpen, setAutomateDropdownOpen] = useState(false);
  const [connectCrmDropdownOpen, setConnectCrmDropdownOpen] = useState(false);

  // Scheduled Jobs Count
  const [scheduledJobsCount, setScheduledJobsCount] = useState(0);

  // CSV Drag and drop file state
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // CRM Sync Connection Status
  const [crmConnections, setCrmConnections] = useState({
    salesforce: false,
    hubspot: false,
    zoho: false,
    pipedrive: false
  });

  const toggleCrmSync = (crmName) => {
    const nextState = !crmConnections[crmName];
    setCrmConnections(prev => ({ ...prev, [crmName]: nextState }));
    showToast(nextState ? `Connected and synced with ${crmName}!` : `Disconnected ${crmName}`);
  };

  return (
    <div className="dash-view-content apollo-data-enrichment-page">
      
      {/* ── 1. TOP HEADER BAR ── */}
      <div className="enrichment-top-header">
        <h1 className="enrichment-page-title">Data enrichment</h1>

        <div className="enrichment-top-right-actions">
          {/* View Scheduled Jobs Button */}
          <button 
            className="white-subtle-btn scheduled-jobs-btn"
            onClick={() => showToast(`Opening Scheduled Jobs (${scheduledJobsCount} active)`)}
          >
            <span>View scheduled jobs</span>
            <span className="jobs-count-pill">{scheduledJobsCount}</span>
          </button>

          {/* Automate Enrichment Dropdown Button */}
          <div className="dropdown-relative-wrap">
            <button 
              className="yellow-primary-btn automate-enrichment-btn"
              onClick={() => setAutomateDropdownOpen(!automateDropdownOpen)}
            >
              <span>Automate Enrichment</span>
              <ChevronDown size={15} />
            </button>

            {automateDropdownOpen && (
              <div className="enrichment-popover-menu">
                <div className="popover-item" onClick={() => { setAutomateDropdownOpen(false); showToast('Created automated CRM enrichment workflow'); }}>
                  <Zap size={15} color="#2563eb" />
                  <div>
                    <strong className="item-title">Auto-Enrich New CRM Leads</strong>
                    <span className="item-desc">Enrich incoming leads in real-time</span>
                  </div>
                </div>
                <div className="popover-item" onClick={() => { setAutomateDropdownOpen(false); showToast('Configured CSV auto-enrichment schedule'); }}>
                  <FileSpreadsheet size={15} color="#059669" />
                  <div>
                    <strong className="item-title">Scheduled CSV Enrichment</strong>
                    <span className="item-desc">Weekly recurring database refresh</span>
                  </div>
                </div>
                <div className="popover-item" onClick={() => { setAutomateDropdownOpen(false); showToast('Opened Form Enrichment Setup'); }}>
                  <Sliders size={15} color="#8b5cf6" />
                  <div>
                    <strong className="item-title">Inbound Form Autocomplete</strong>
                    <span className="item-desc">Shorten web forms by 80%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 2. SUB-NAVIGATION TABS BAR (1:1 MATCH TO SCREENSHOT) ── */}
      <div className="enrichment-tabs-bar">
        <button 
          className={`enrichment-tab-item ${activeTab === 'data_health' ? 'active' : ''}`}
          onClick={() => setActiveTab('data_health')}
        >
          Data health center
        </button>

        <button 
          className={`enrichment-tab-item ${activeTab === 'crm' ? 'active' : ''}`}
          onClick={() => setActiveTab('crm')}
        >
          <span>CRM</span>
          <span className="green-new-badge">New</span>
        </button>

        <button 
          className={`enrichment-tab-item ${activeTab === 'csv' ? 'active' : ''}`}
          onClick={() => setActiveTab('csv')}
        >
          CSV
        </button>

        <button 
          className={`enrichment-tab-item ${activeTab === 'job_alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('job_alerts')}
        >
          Job change alerts
        </button>

        <button 
          className={`enrichment-tab-item ${activeTab === 'form_enrichment' ? 'active' : ''}`}
          onClick={() => setActiveTab('form_enrichment')}
        >
          Form enrichment
        </button>
      </div>

      {/* ── 3. MAIN TAB CONTENT AREA ── */}
      <div className="enrichment-main-body-container">
        
        {/* ── TAB 1: DATA HEALTH CENTER (1:1 MATCH TO SCREENSHOT) ── */}
        {activeTab === 'data_health' && (
          <div className="data-health-center-view">
            
            {/* 1:1 Stacked Cards Graphic SVG matching Screenshot */}
            <div className="health-illustration-wrap">
              <svg 
                width="180" 
                height="150" 
                viewBox="0 0 180 150" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="stacked-dashboard-svg"
              >
                {/* Back Left Card: Light Blue Pie Chart Card */}
                <rect x="25" y="15" width="80" height="60" rx="6" fill="#DCE7F6" stroke="#000000" strokeWidth="1.5" />
                <line x1="33" y1="28" x2="60" y2="28" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="33" y1="36" x2="52" y2="36" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                {/* Pie Chart Circle */}
                <circle cx="85" cy="40" r="14" fill="#DCE7F6" stroke="#000000" strokeWidth="1.5" />
                <path d="M85 40 L85 26 A14 14 0 0 1 99 40 Z" fill="#000000" opacity="0.15" />
                <line x1="85" y1="40" x2="95" y2="48" stroke="#000000" strokeWidth="1.5" />

                {/* Middle Front Card: Light Beige Cream Card */}
                <rect x="18" y="48" width="75" height="55" rx="6" fill="#F4EFE6" stroke="#000000" strokeWidth="1.5" />
                <rect x="26" y="60" width="59" height="12" rx="3" fill="#E6DFD3" stroke="#000000" strokeWidth="1" />
                <line x1="26" y1="80" x2="75" y2="80" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="26" y1="88" x2="60" y2="88" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />

                {/* Back Right Card: Light Pink/Salmon Bar Chart Card */}
                <rect x="68" y="70" width="82" height="60" rx="6" fill="#F8C8C8" stroke="#000000" strokeWidth="1.5" />
                <line x1="78" y1="82" x2="110" y2="82" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                {/* Bar Chart Columns */}
                <rect x="78" y="105" width="8" height="15" fill="#F8C8C8" stroke="#000000" strokeWidth="1.5" />
                <rect x="91" y="98" width="8" height="22" fill="#000000" opacity="0.2" stroke="#000000" strokeWidth="1.5" />
                <rect x="104" y="92" width="8" height="28" fill="#F8C8C8" stroke="#000000" strokeWidth="1.5" />
                <rect x="117" y="100" width="8" height="20" fill="#F8C8C8" stroke="#000000" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Main Headline */}
            <h2 className="health-center-title">Build your data health center dashboard</h2>

            {/* Subtitle Description */}
            <p className="health-center-subtext">
              Save contacts on the People page or connect your CRM to unlock powerful insights and track the quality of your data
            </p>

            {/* Bottom Call to Action Strip (Works with HubSpot & Salesforce) */}
            <div className="health-bottom-cta-strip">
              <div className="works-with-logos-row">
                <span className="works-with-label">Works with</span>
                <div className="crm-logo-badges">
                  {/* HubSpot Logo */}
                  <span className="hubspot-sprocket-icon" title="HubSpot CRM">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF7A59">
                      <path d="M18.8 10.6V7.4c.8-.4 1.4-1.2 1.4-2.2 0-1.3-1.1-2.4-2.4-2.4-1.3 0-2.4 1.1-2.4 2.4 0 1 .6 1.8 1.4 2.2v3.2c-1.1.3-2.1.8-3 1.5L8.5 7.6c.1-.3.2-.6.2-.9 0-1.5-1.2-2.7-2.7-2.7S3.3 5.2 3.3 6.7s1.2 2.7 2.7 2.7c.5 0 1-.1 1.4-.4l5.3 4.5c-1 1.6-1.6 3.4-1.6 5.3 0 .7.1 1.4.2 2.1l-3.3 2.1c-.4-.5-1-.8-1.7-.8-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4c0-.2 0-.5-.1-.7l3.4-2.1c1.2 1.3 2.8 2.2 4.6 2.5v2c-.8.4-1.4 1.2-1.4 2.2 0 1.3 1.1 2.4 2.4 2.4 1.3 0 2.4-1.1 2.4-2.4 0-1-.6-1.8-1.4-2.2v-2c3.7-.6 6.6-3.7 6.6-7.5 0-2.1-.8-4-2.2-5.4z" />
                    </svg>
                  </span>

                  {/* Salesforce Logo */}
                  <span className="salesforce-cloud-icon" title="Salesforce CRM">
                    <svg width="24" height="16" viewBox="0 0 24 16" fill="#00A1E0">
                      <path d="M19.4 6.2C18.8 2.7 15.7 0 12 0 9.1 0 6.6 1.7 5.4 4.1 2.3 4.5 0 7.1 0 10.3 0 13.4 2.6 16 5.7 16H19.3c2.6 0 4.7-2.1 4.7-4.7 0-2.4-1.8-4.5-4.6-5.1z" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Interactive Buttons */}
              <div className="cta-buttons-group">
                
                {/* Connect CRM Button */}
                <div className="dropdown-relative-wrap">
                  <button 
                    className="white-subtle-btn connect-crm-btn"
                    onClick={() => setConnectCrmDropdownOpen(!connectCrmDropdownOpen)}
                  >
                    <span>Connect CRM</span>
                    <ChevronDown size={14} />
                  </button>

                  {connectCrmDropdownOpen && (
                    <div className="enrichment-popover-menu bottom-left">
                      <div className="popover-item" onClick={() => { setConnectCrmDropdownOpen(false); toggleCrmSync('salesforce'); }}>
                        <span className="crm-icon-badge">☁</span>
                        <div>
                          <strong className="item-title">Salesforce Integration</strong>
                          <span className="item-desc">Bi-directional account & lead sync</span>
                        </div>
                      </div>
                      <div className="popover-item" onClick={() => { setConnectCrmDropdownOpen(false); toggleCrmSync('hubspot'); }}>
                        <span className="crm-icon-badge" style={{ color: '#ff7a59' }}>⚙</span>
                        <div>
                          <strong className="item-title">HubSpot CRM Integration</strong>
                          <span className="item-desc">Auto-enrich deals & contacts</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Save Contacts Yellow Button */}
                <button 
                  className="yellow-primary-btn save-contacts-btn"
                  onClick={() => {
                    if (onNavigateToProspect) {
                      onNavigateToProspect('prospect_people');
                    } else {
                      window.location.hash = '#/app/prospect/people';
                    }
                    showToast('Navigating to People search page to save contacts');
                  }}
                >
                  Save contacts
                </button>
              </div>
            </div>

            {/* ── KEY BENEFITS SECTION ── */}
            <div className="key-benefits-container">
              <h3 className="key-benefits-heading">Key benefits</h3>
              <div className="key-benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon-wrapper">
                    <Search size={36} color="#374151" strokeWidth={1.5} />
                  </div>
                  <h4 className="benefit-title">Discover enrichable data</h4>
                  <p className="benefit-desc">See job changes, missing emails, and CRM fields ready for enrichment</p>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon-wrapper">
                    <Layers size={36} color="#374151" strokeWidth={1.5} />
                  </div>
                  <h4 className="benefit-title">Detect and merge duplicates</h4>
                  <p className="benefit-desc">Keep your records clean and streamlined</p>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon-wrapper">
                    <CheckCircle2 size={36} color="#374151" strokeWidth={1.5} />
                  </div>
                  <h4 className="benefit-title">Track enrichment activities</h4>
                  <p className="benefit-desc">Monitor enrichment job performance and credit usage effortlessly</p>
                </div>
              </div>
              <button className="learn-more-btn">Learn more</button>
            </div>

          </div>
        )}

        {/* ── TAB 2: CRM ENRICHMENT ── */}
        {activeTab === 'crm' && (
          <div className="crm-enrichment-tab-view">
            <div className="tab-card-hero">
              <h3 className="section-card-title">Connect your CRM for Automatic Bi-Directional Sync</h3>
              <p className="section-card-desc">Automatically fill missing phone numbers, verified emails, job titles, and company tech stacks in your CRM.</p>
            </div>

            <div className="crm-cards-grid">
              {/* Salesforce */}
              <div className="crm-integration-card">
                <div className="crm-card-header">
                  <div className="crm-info">
                    <span className="crm-icon salesforce">☁</span>
                    <div>
                      <h4 className="crm-name">Salesforce</h4>
                      <span className="crm-status">{crmConnections.salesforce ? '● Connected' : 'Not Connected'}</span>
                    </div>
                  </div>
                  <button 
                    className={`crm-toggle-btn ${crmConnections.salesforce ? 'active' : ''}`}
                    onClick={() => toggleCrmSync('salesforce')}
                  >
                    {crmConnections.salesforce ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
                <div className="crm-card-features">
                  <div>✓ Auto-enrich new leads</div>
                  <div>✓ Custom field mapping</div>
                  <div>✓ Lead score sync</div>
                </div>
              </div>

              {/* HubSpot */}
              <div className="crm-integration-card">
                <div className="crm-card-header">
                  <div className="crm-info">
                    <span className="crm-icon hubspot">⚙</span>
                    <div>
                      <h4 className="crm-name">HubSpot CRM</h4>
                      <span className="crm-status">{crmConnections.hubspot ? '● Connected' : 'Not Connected'}</span>
                    </div>
                  </div>
                  <button 
                    className={`crm-toggle-btn ${crmConnections.hubspot ? 'active' : ''}`}
                    onClick={() => toggleCrmSync('hubspot')}
                  >
                    {crmConnections.hubspot ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
                <div className="crm-card-features">
                  <div>✓ Real-time deal enrichment</div>
                  <div>✓ Activity logging</div>
                  <div>✓ Contact deduplication</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: CSV BULK UPLOAD ENRICHMENT ── */}
        {activeTab === 'csv' && (
          <div className="csv-enrichment-tab-view">
            <h3 className="section-card-title">Bulk CSV Data Enrichment</h3>
            <p className="section-card-desc">Upload a CSV file containing names, domains, or social URLs to append 65+ verified data points.</p>

            <div 
              className={`csv-dropzone-box ${dragActive ? 'drag-active' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  const f = e.dataTransfer.files[0];
                  setUploadedFile(f);
                  showToast(`Uploaded ${f.name} for bulk enrichment processing`);
                }
              }}
            >
              <Upload size={32} color="#3b82f6" className="upload-cloud-icon" />
              <h4 className="dropzone-heading">Drag and drop your CSV lead file here</h4>
              <p className="dropzone-sub">Supports .csv, .xlsx up to 50,000 records</p>
              
              <label className="browse-files-btn">
                <span>Browse Files</span>
                <input 
                  type="file" 
                  accept=".csv,.xlsx" 
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const f = e.target.files[0];
                      setUploadedFile(f);
                      showToast(`Selected file ${f.name} for enrichment`);
                    }
                  }}
                />
              </label>
            </div>

            {uploadedFile && (
              <div className="uploaded-file-status-card">
                <div className="file-left">
                  <FileSpreadsheet size={20} color="#059669" />
                  <div>
                    <strong className="file-name">{uploadedFile.name}</strong>
                    <span className="file-meta">{(uploadedFile.size / 1024).toFixed(1)} KB • Ready to enrich</span>
                  </div>
                </div>
                <button 
                  className="yellow-primary-btn"
                  onClick={() => {
                    showToast(`Started bulk enrichment job for ${uploadedFile.name}!`);
                    setScheduledJobsCount(prev => prev + 1);
                    setUploadedFile(null);
                  }}
                >
                  Start CSV Enrichment →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 4: JOB CHANGE ALERTS ── */}
        {activeTab === 'job_alerts' && (
          <div className="job-alerts-tab-view">
            <h3 className="section-card-title">Job Change Alerts & Executive Tracking</h3>
            <p className="section-card-desc">Automatically get notified when key target contacts change companies or get promoted.</p>

            <div className="job-alerts-list-card">
              <div className="alert-item-row">
                <div className="alert-avatar">L</div>
                <div className="alert-info">
                  <strong>Liz Ryan</strong> changed job title to <em>VP of Talent Strategy</em> at <strong>Human Workplace</strong>
                  <span className="alert-time">2 hours ago</span>
                </div>
                <button className="white-subtle-btn" onClick={() => showToast('Re-engaged Liz Ryan with updated email')}>Re-engage →</button>
              </div>

              <div className="alert-item-row">
                <div className="alert-avatar" style={{ background: '#dbeafe', color: '#1d4ed8' }}>J</div>
                <div className="alert-info">
                  <strong>Jeffrey Towson</strong> joined <strong>Bain & Company</strong> as <em>Senior Partner</em>
                  <span className="alert-time">Yesterday</span>
                </div>
                <button className="white-subtle-btn" onClick={() => showToast('Unlocked new verified email')}>Get New Email →</button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 5: FORM ENRICHMENT ── */}
        {activeTab === 'form_enrichment' && (
          <div className="form-enrichment-tab-view">
            <h3 className="section-card-title">Inbound Web Form Autocomplete</h3>
            <p className="section-card-desc">Shorten landing page form friction by auto-filling company tech stack, location, and employee count from work emails.</p>

            <div className="form-enrichment-demo-card">
              <div className="demo-form-box">
                <label className="demo-label">Work Email Address</label>
                <input type="email" placeholder="alex@stripe.com" className="demo-input" defaultValue="alex@stripe.com" />
                <div className="autofill-preview-strip">
                  <span className="sparkles-badge">✨ Auto-detected by Apollo:</span>
                  <span className="detected-tag">Stripe, Inc.</span>
                  <span className="detected-tag">Financial Services</span>
                  <span className="detected-tag">5,000+ employees</span>
                </div>
              </div>
              <button className="yellow-primary-btn" onClick={() => showToast('Generated Form Enrichment Embed Script!')}>Get Embed Code</button>
            </div>
          </div>
        )}

      </div>

      {/* ── FLOATING HELP QUESTION MARK BUTTON (1:1 SCREENSHOT) ── */}
      <button 
        className="enrichment-floating-help-btn"
        title="Help & Documentation"
        onClick={() => showToast('Opening Data Enrichment Help Guide...')}
      >
        <span className="help-question-mark">?</span>
      </button>

    </div>
  );
}
