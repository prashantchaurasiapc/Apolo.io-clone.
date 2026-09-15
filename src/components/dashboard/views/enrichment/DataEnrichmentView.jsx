import React, { useState } from 'react';
import { 
  ChevronDown, Plus, Upload, Database, RefreshCw, Layers, CheckCircle2, 
  Sparkles, FileSpreadsheet, Lock, HelpCircle, ExternalLink, Zap, Settings,
  AlertCircle, ArrowRight, ShieldCheck, Check, Users, Search, Sliders,
  Filter, Bell, Mail, UserCheck, Briefcase, Building2, TrendingUp, Copy,
  X, Clock, History, ArrowLeft, Target, Navigation, User, Calendar
} from 'lucide-react';

import '../../css/enrichment-view.css';

export default function DataEnrichmentView({ showToast, onNavigateToProspect }) {
  // Active Sub-Tab: 'data_health' | 'crm' | 'csv' | 'job_alerts' | 'form_enrichment'
  const [activeTab, setActiveTab] = useState('data_health');

  // Popover States
  const [automateDropdownOpen, setAutomateDropdownOpen] = useState(false);
  const [connectCrmDropdownOpen, setConnectCrmDropdownOpen] = useState(false);

  // Scheduled Jobs Modal State & Job List
  const [isJobsModalOpen, setIsJobsModalOpen] = useState(false);
  const [modalActiveTab, setModalActiveTab] = useState('scheduled'); // 'scheduled' | 'activity_log'
  const [historyDropdownOpen, setHistoryDropdownOpen] = useState(false);
  const [scheduledJobsList, setScheduledJobsList] = useState([]);

  // Scheduled Jobs Count
  const [scheduledJobsCount, setScheduledJobsCount] = useState(0);

  // ── NEW ENRICHMENT JOB WORKFLOW WIZARD MODAL STATES ──
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [workflowTab, setWorkflowTab] = useState('workflow'); // 'workflow' | 'settings'
  const [workflowSubStep, setWorkflowSubStep] = useState('main'); // 'main' | 'define_object' | 'select_type' | 'set_filters' | 'set_cadence'

  // Selected Workflow Form Inputs
  const [selectedObject, setSelectedObject] = useState(''); // '' | 'contacts'
  const [selectedEnrichmentType, setSelectedEnrichmentType] = useState('job_changes'); // 'job_changes' | 'missing_emails'
  const [selectedCadence, setSelectedCadence] = useState('Daily at 8:00 AM');
  const [jobName, setJobName] = useState('New enrichment job');
  const [isJobActiveToggle, setIsJobActiveToggle] = useState(true);

  // ── EMAIL ENRICHMENT & WATERFALL ACCESS DRAWER STATES ──
  const [isWaterfallEnabled, setIsWaterfallEnabled] = useState(true);
  const [isAccessEmailDrawerOpen, setIsAccessEmailDrawerOpen] = useState(false);
  const [searchApproach, setSearchApproach] = useState('verified'); // 'verified' | 'any'
  
  // ── SCHEDULE ENRICHMENT TEMPLATES MODAL STATES ──
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [templatesCategory, setTemplatesCategory] = useState('all'); // 'all' | 'missing_emails' | 'job_changes'
  const [templatesSearch, setTemplatesSearch] = useState('');
  const [selectedTemplateCardId, setSelectedTemplateCardId] = useState(1);

  // ── REAL-TIME ENRICHMENT UPGRADE MODAL STATE ──
  const [isRealtimeModalOpen, setIsRealtimeModalOpen] = useState(false);

  // Drawer Accordion States
  const [accordionState, setAccordionState] = useState({
    fieldDetails: true,
    enrichmentConfig: true,
    dataSources: true,
    validation: true
  });

  const toggleAccordion = (key) => {
    setAccordionState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOpenWorkflowModal = () => {
    setIsWorkflowModalOpen(true);
    setWorkflowTab('workflow');
    setWorkflowSubStep('main');
  };

  const handleSaveWorkflowJob = () => {
    const newJob = {
      id: Date.now(),
      name: jobName || 'Custom Contacts Enrichment Job',
      type: selectedEnrichmentType ? 'Verified Emails & Phones' : 'CRM Auto-Enrichment',
      schedule: selectedCadence || 'Daily at 8:00 AM',
      status: 'Active',
      created: 'Just now'
    };
    setScheduledJobsList(prev => [...prev, newJob]);
    setScheduledJobsCount(prev => prev + 1);
    setIsWorkflowModalOpen(false);
    // Reset fields
    setSelectedObject('');
    setSelectedEnrichmentType('');
    showToast(`Created & scheduled workflow "${newJob.name}"!`);
  };

  const handleAddNewJob = () => {
    const newJob = {
      id: Date.now(),
      name: `Automated CRM Sync #${scheduledJobsList.length + 1}`,
      type: 'CRM Auto-Enrichment',
      schedule: 'Daily at 8:00 AM',
      status: 'Active',
      created: 'Just now'
    };
    setScheduledJobsList(prev => [...prev, newJob]);
    setScheduledJobsCount(prev => prev + 1);
    showToast('Scheduled new automated enrichment job!');
  };

  // CSV Drag and drop file state
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Job alerts search & filter state
  const [alertsSearch, setAlertsSearch] = useState('');
  const [alertTypeFilter, setAlertTypeFilter] = useState('all');

  // Form enrichment live input state
  const [demoEmail, setDemoEmail] = useState('alex@stripe.com');
  const [copiedCode, setCopiedCode] = useState(false);

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

  const handleCopyCode = () => {
    navigator.clipboard?.writeText?.('<script src="https://cdn.apollo.io/enrichment.js" data-key="apollo_live_94827"></script>');
    setCopiedCode(true);
    showToast('Copied form enrichment script to clipboard!');
    setTimeout(() => setCopiedCode(false), 2000);
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
            onClick={() => setIsJobsModalOpen(true)}
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
              <div className="automate-enrichment-popover-menu">
                {/* Section 1: Scheduled enrichment */}
                <div className="menu-section-header">Scheduled enrichment</div>
                
                <div 
                  className="automate-menu-item"
                  onClick={() => {
                    setAutomateDropdownOpen(false);
                    handleOpenWorkflowModal();
                  }}
                >
                  <span>Schedule from scratch</span>
                </div>

                <div 
                  className="automate-menu-item"
                  onClick={() => {
                    setAutomateDropdownOpen(false);
                    setIsTemplatesModalOpen(true);
                  }}
                >
                  <span>Schedule with templates</span>
                </div>

                <div className="automate-menu-divider" />

                {/* Section 2: Real-time enrichment */}
                <div className="menu-section-header">Real-time enrichment</div>

                <div 
                  className="automate-menu-item"
                  onClick={() => {
                    setAutomateDropdownOpen(false);
                    setIsRealtimeModalOpen(true);
                  }}
                >
                  <span>Enable real-time enrichment</span>
                  <Lock size={14} className="menu-item-icon" />
                </div>

                <div className="automate-menu-divider" />

                {/* Section 3: Learn link */}
                <div 
                  className="automate-menu-item"
                  onClick={() => {
                    setAutomateDropdownOpen(false);
                    showToast('Opening Data Enrichment documentation guide');
                  }}
                >
                  <span>Learn about enrichment</span>
                  <ExternalLink size={14} className="menu-item-icon" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 2. SUB-NAVIGATION TABS BAR ── */}
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
        
        {/* ── TAB 1: DATA HEALTH CENTER ── */}
        {activeTab === 'data_health' && (
          <div className="data-health-center-view">
            
            {/* Stacked Cards Graphic SVG */}
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

            {/* Bottom Call to Action Strip */}
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

            {/* KEY BENEFITS SECTION */}
            <div className="key-benefits-container">
              <h3 className="key-benefits-heading">Key benefits</h3>
              <div className="key-benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon-wrapper">
                    <Search size={28} color="#3b82f6" />
                  </div>
                  <h4 className="benefit-title">Discover enrichable data</h4>
                  <p className="benefit-desc">See job changes, missing emails, and CRM fields ready for enrichment</p>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon-wrapper">
                    <Layers size={28} color="#059669" />
                  </div>
                  <h4 className="benefit-title">Detect and merge duplicates</h4>
                  <p className="benefit-desc">Keep your records clean and streamlined</p>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon-wrapper">
                    <CheckCircle2 size={28} color="#8b5cf6" />
                  </div>
                  <h4 className="benefit-title">Track enrichment activities</h4>
                  <p className="benefit-desc">Monitor enrichment job performance and credit usage effortlessly</p>
                </div>
              </div>
              <button className="learn-more-btn" onClick={() => showToast('Opening Data Health Documentation...')}>Learn more</button>
            </div>

          </div>
        )}

        {/* ── TAB 2: CRM ENRICHMENT ── */}
        {activeTab === 'crm' && (
          <div className="crm-enrichment-tab-view">
            <h3 className="section-card-title">Connect your CRM for Automatic Bi-Directional Sync</h3>
            <p className="section-card-desc">Automatically fill missing phone numbers, verified emails, job titles, and company tech stacks in your CRM.</p>

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
                  <div>✓ Auto-enrich new leads in real-time</div>
                  <div>✓ Custom field mapping & status sync</div>
                  <div>✓ Lead score & activity tracking</div>
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
                  <div>✓ Real-time deal & contact enrichment</div>
                  <div>✓ Bi-directional timeline activity sync</div>
                  <div>✓ Automatic lead deduplication</div>
                </div>
              </div>

              {/* Zoho CRM */}
              <div className="crm-integration-card">
                <div className="crm-card-header">
                  <div className="crm-info">
                    <span className="crm-icon zoho">Z</span>
                    <div>
                      <h4 className="crm-name">Zoho CRM</h4>
                      <span className="crm-status">{crmConnections.zoho ? '● Connected' : 'Not Connected'}</span>
                    </div>
                  </div>
                  <button 
                    className={`crm-toggle-btn ${crmConnections.zoho ? 'active' : ''}`}
                    onClick={() => toggleCrmSync('zoho')}
                  >
                    {crmConnections.zoho ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
                <div className="crm-card-features">
                  <div>✓ Auto-append direct phone numbers</div>
                  <div>✓ Verified email status checks</div>
                  <div>✓ Instant account hierarchy lookup</div>
                </div>
              </div>

              {/* Pipedrive */}
              <div className="crm-integration-card">
                <div className="crm-card-header">
                  <div className="crm-info">
                    <span className="crm-icon pipedrive">P</span>
                    <div>
                      <h4 className="crm-name">Pipedrive</h4>
                      <span className="crm-status">{crmConnections.pipedrive ? '● Connected' : 'Not Connected'}</span>
                    </div>
                  </div>
                  <button 
                    className={`crm-toggle-btn ${crmConnections.pipedrive ? 'active' : ''}`}
                    onClick={() => toggleCrmSync('pipedrive')}
                  >
                    {crmConnections.pipedrive ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
                <div className="crm-card-features">
                  <div>✓ Pipeline stage enrichment triggers</div>
                  <div>✓ Organization tech stack tagging</div>
                  <div>✓ Smart contact details update</div>
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
              <Upload size={38} color="#2563eb" className="upload-cloud-icon" />
              <h4 className="dropzone-heading">Drag and drop your CSV lead file here</h4>
              <p className="dropzone-sub">Supports .csv, .xlsx up to 50,000 records per upload batch</p>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
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
                <button 
                  className="scheduled-jobs-btn" 
                  onClick={() => showToast('Downloading CSV Sample Template...')}
                >
                  Download Sample CSV
                </button>
              </div>
            </div>

            {uploadedFile && (
              <div className="uploaded-file-status-card">
                <div className="file-left">
                  <FileSpreadsheet size={24} color="#059669" />
                  <div>
                    <strong className="file-name">{uploadedFile.name}</strong>
                    <span className="file-meta">{(uploadedFile.size / 1024).toFixed(1)} KB • 1,250 estimated records • Ready to enrich</span>
                  </div>
                </div>
                <button 
                  className="yellow-primary-btn"
                  style={{ padding: '9px 20px', borderRadius: '8px', fontWeight: 700 }}
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

        {/* ── TAB 4: JOB CHANGE ALERTS (RESTYLED 1:1 SaaS) ── */}
        {activeTab === 'job_alerts' && (
          <div className="job-alerts-tab-view">
            <div>
              <h3 className="section-card-title">Job Change Alerts & Executive Tracking</h3>
              <p className="section-card-desc">Automatically get notified when key target contacts change companies or get promoted so you can re-engage at the perfect moment.</p>
            </div>

            {/* 1. Top Metrics Grid */}
            <div className="job-alerts-stats-grid">
              <div className="job-alert-stat-card">
                <div className="stat-icon-wrap" style={{ background: '#eff6ff', color: '#2563eb' }}>
                  <Users size={22} />
                </div>
                <div>
                  <div className="stat-val">1,420</div>
                  <div className="stat-lbl">Tracked Executives</div>
                </div>
              </div>

              <div className="job-alert-stat-card">
                <div className="stat-icon-wrap" style={{ background: '#fef3c7', color: '#d97706' }}>
                  <TrendingUp size={22} />
                </div>
                <div>
                  <div className="stat-val">38</div>
                  <div className="stat-lbl">Job Changes This Month</div>
                </div>
              </div>

              <div className="job-alert-stat-card">
                <div className="stat-icon-wrap" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                  <UserCheck size={22} />
                </div>
                <div>
                  <div className="stat-val">24</div>
                  <div className="stat-lbl">Re-engaged Leads</div>
                </div>
              </div>

              <div className="job-alert-stat-card">
                <div className="stat-icon-wrap" style={{ background: '#f3e8ff', color: '#7c3aed' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div className="stat-val">19</div>
                  <div className="stat-lbl">Unlocked New Emails</div>
                </div>
              </div>
            </div>

            {/* 2. Action & Filter Bar */}
            <div className="job-alerts-controls-bar">
              <div className="alerts-search-box">
                <Search size={16} color="#94a3b8" />
                <input 
                  type="text"
                  placeholder="Search contacts, titles, or target companies..."
                  className="alerts-search-input"
                  value={alertsSearch}
                  onChange={(e) => setAlertsSearch(e.target.value)}
                />
              </div>

              <div className="alerts-filter-group">
                <select 
                  className="alert-filter-select"
                  value={alertTypeFilter}
                  onChange={(e) => setAlertTypeFilter(e.target.value)}
                >
                  <option value="all">All Alert Types</option>
                  <option value="promotion">Promotions</option>
                  <option value="company_move">Company Moves</option>
                  <option value="acquisition">Acquisitions</option>
                </select>

                <select className="alert-filter-select">
                  <option value="30d">Last 30 Days</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="90d">This Quarter</option>
                </select>

                <button 
                  className="create-rule-btn"
                  onClick={() => showToast('Opened Create Job Alert Rule modal')}
                >
                  <Plus size={15} />
                  <span>Set up Alert Rule</span>
                </button>
              </div>
            </div>

            {/* 3. Feed List Card */}
            <div className="job-alerts-list-card">
              <div className="job-alerts-feed-header">
                <div className="feed-title-wrap">
                  <Bell size={16} color="#2563eb" />
                  <span>Live Executive Tracking Feed</span>
                  <span className="feed-count-badge">5 New</span>
                </div>
                <button className="mark-read-btn" onClick={() => showToast('Marked all alerts as read')}>
                  Mark all as read
                </button>
              </div>

              {/* Alert 1: Liz Ryan */}
              <div className="alert-item-row">
                <div className="alert-avatar" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)' }}>
                  LR
                </div>
                <div className="alert-main-content">
                  <div className="alert-top-meta">
                    <span className="alert-type-badge promotion">★ Promotion</span>
                    <span className="alert-time-stamp">• 2 hours ago</span>
                  </div>
                  <p className="alert-description-text">
                    <strong>Liz Ryan</strong> changed job title from <em>Director of People</em> to <span className="role-highlight-chip">VP of Talent Strategy</span> at <strong>Human Workplace</strong>
                  </p>
                  <div className="alert-extra-details">
                    <span className="detail-pill">✉ l.ryan@humanworkplace.com (Verified)</span>
                    <span className="detail-pill">🏢 Human Workplace • 250 employees</span>
                  </div>
                </div>
                <div className="alert-actions-group">
                  <button 
                    className="alert-action-primary-btn" 
                    onClick={() => showToast('Opened email composer to re-engage Liz Ryan')}
                  >
                    <span>Re-engage</span>
                    <ArrowRight size={14} />
                  </button>
                  <button 
                    className="alert-action-secondary-btn"
                    onClick={() => showToast('Added Liz Ryan to Executive Sequence')}
                  >
                    Add to Sequence
                  </button>
                </div>
              </div>

              {/* Alert 2: Jeffrey Towson */}
              <div className="alert-item-row">
                <div className="alert-avatar" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
                  JT
                </div>
                <div className="alert-main-content">
                  <div className="alert-top-meta">
                    <span className="alert-type-badge company-change">↔ Company Move</span>
                    <span className="alert-time-stamp">• Yesterday</span>
                  </div>
                  <p className="alert-description-text">
                    <strong>Jeffrey Towson</strong> joined <strong>Bain & Company</strong> as <span className="role-highlight-chip">Senior Partner</span> (formerly Partner at BCG)
                  </p>
                  <div className="alert-extra-details">
                    <span className="detail-pill">📞 Direct Phone Available</span>
                    <span className="detail-pill">📍 New York, NY</span>
                  </div>
                </div>
                <div className="alert-actions-group">
                  <button 
                    className="alert-action-primary-btn"
                    onClick={() => showToast('Unlocked new verified email for Jeffrey Towson')}
                  >
                    <span>Get New Email</span>
                    <ArrowRight size={14} />
                  </button>
                  <button 
                    className="alert-action-secondary-btn"
                    onClick={() => showToast('Exported Jeffrey Towson to CRM')}
                  >
                    Export to CRM
                  </button>
                </div>
              </div>

              {/* Alert 3: Sarah Jenkins */}
              <div className="alert-item-row">
                <div className="alert-avatar" style={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)' }}>
                  SJ
                </div>
                <div className="alert-main-content">
                  <div className="alert-top-meta">
                    <span className="alert-type-badge promotion">★ Promotion</span>
                    <span className="alert-time-stamp">• 3 days ago</span>
                  </div>
                  <p className="alert-description-text">
                    <strong>Sarah Jenkins</strong> promoted to <span className="role-highlight-chip">Chief Technology Officer</span> at <strong>Datadog</strong> 🚀
                  </p>
                  <div className="alert-extra-details">
                    <span className="detail-pill">✉ s.jenkins@datadog.com</span>
                    <span className="detail-pill">👥 2 Mutual Connections</span>
                  </div>
                </div>
                <div className="alert-actions-group">
                  <button 
                    className="alert-action-primary-btn"
                    onClick={() => showToast('Opened email composer to re-engage Sarah Jenkins')}
                  >
                    <span>Re-engage</span>
                    <ArrowRight size={14} />
                  </button>
                  <button 
                    className="alert-action-secondary-btn"
                    onClick={() => showToast('Opened profile for Sarah Jenkins')}
                  >
                    View Profile
                  </button>
                </div>
              </div>

              {/* Alert 4: David Chen */}
              <div className="alert-item-row">
                <div className="alert-avatar" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}>
                  DC
                </div>
                <div className="alert-main-content">
                  <div className="alert-top-meta">
                    <span className="alert-type-badge company-change">↔ Company Move</span>
                    <span className="alert-time-stamp">• 4 days ago</span>
                  </div>
                  <p className="alert-description-text">
                    <strong>David Chen</strong> joined <strong>Stripe</strong> as <span className="role-highlight-chip">Head of Product Growth</span> (formerly VP Product at Adyen)
                  </p>
                  <div className="alert-extra-details">
                    <span className="detail-pill">✉ dchen@stripe.com (Verified)</span>
                    <span className="detail-pill">⚡ High Intent Signal</span>
                  </div>
                </div>
                <div className="alert-actions-group">
                  <button 
                    className="alert-action-primary-btn"
                    onClick={() => showToast('Unlocked new email for David Chen')}
                  >
                    <span>Get New Email</span>
                    <ArrowRight size={14} />
                  </button>
                  <button 
                    className="alert-action-secondary-btn"
                    onClick={() => showToast('Added David Chen to Saved Contacts')}
                  >
                    Save Contact
                  </button>
                </div>
              </div>

              {/* Alert 5: Amanda Miller */}
              <div className="alert-item-row">
                <div className="alert-avatar" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)' }}>
                  AM
                </div>
                <div className="alert-main-content">
                  <div className="alert-top-meta">
                    <span className="alert-type-badge acquisition">⚡ Acquisition Move</span>
                    <span className="alert-time-stamp">• 1 week ago</span>
                  </div>
                  <p className="alert-description-text">
                    <strong>Amanda Miller</strong> transitioned to <strong>Salesforce</strong> following Slack acquisition as <span className="role-highlight-chip">VP Enterprise Sales</span>
                  </p>
                  <div className="alert-extra-details">
                    <span className="detail-pill">✉ amiller@salesforce.com</span>
                    <span className="detail-pill">🌐 San Francisco, CA</span>
                  </div>
                </div>
                <div className="alert-actions-group">
                  <button 
                    className="alert-action-primary-btn"
                    onClick={() => showToast('Opened email composer to re-engage Amanda Miller')}
                  >
                    <span>Re-engage</span>
                    <ArrowRight size={14} />
                  </button>
                  <button 
                    className="alert-action-secondary-btn"
                    onClick={() => showToast('Opened profile for Amanda Miller')}
                  >
                    View Profile
                  </button>
                </div>
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
                <label className="demo-label">Work Email Address (Live Test Input)</label>
                <input 
                  type="email" 
                  value={demoEmail} 
                  onChange={(e) => setDemoEmail(e.target.value)}
                  className="demo-input" 
                />
                <div className="autofill-preview-strip">
                  <span className="sparkles-badge">✨ Auto-detected by Apollo:</span>
                  <span className="detected-tag">Stripe, Inc.</span>
                  <span className="detected-tag">Financial Services</span>
                  <span className="detected-tag">5,000+ employees</span>
                  <span className="detected-tag">San Francisco, CA</span>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="demo-label">Embed Script Code</label>
                <div className="code-snippet-box">
                  <code>{`<script src="https://cdn.apollo.io/enrichment.js" data-key="apollo_live_94827"></script>`}</code>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    className="yellow-primary-btn" 
                    style={{ padding: '9px 22px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    onClick={handleCopyCode}
                  >
                    {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copiedCode ? 'Copied Code!' : 'Copy Embed Script'}</span>
                  </button>
                  <button 
                    className="scheduled-jobs-btn"
                    onClick={() => showToast('Opening Form Enrichment Customizer Settings')}
                  >
                    Configure Form Fields
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── FLOATING HELP QUESTION MARK BUTTON ── */}
      <button 
        className="enrichment-floating-help-btn"
        title="Help & Documentation"
        onClick={() => showToast('Opening Data Enrichment Help Guide...')}
      >
        <span className="help-question-mark">?</span>
      </button>

      {/* ── ENRICHMENT JOBS MODAL (1:1 APOLLO MATCH) ── */}
      {isJobsModalOpen && (
        <div className="enrichment-modal-overlay" onClick={() => setIsJobsModalOpen(false)}>
          <div className="enrichment-modal-container" onClick={(e) => e.stopPropagation()}>
            
            {/* 1. Modal Header */}
            <div className="enrichment-modal-header">
              <div className="modal-header-top">
                <h2 className="enrichment-modal-title">Enrichment jobs</h2>
                <button 
                  className="modal-close-btn"
                  onClick={() => setIsJobsModalOpen(false)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* 2. Modal Sub-Tabs */}
              <div className="enrichment-modal-tabs">
                <button 
                  className={`modal-tab-btn ${modalActiveTab === 'scheduled' ? 'active' : ''}`}
                  onClick={() => setModalActiveTab('scheduled')}
                >
                  Scheduled
                </button>
                <button 
                  className={`modal-tab-btn ${modalActiveTab === 'activity_log' ? 'active' : ''}`}
                  onClick={() => setModalActiveTab('activity_log')}
                >
                  Activity log
                </button>
              </div>
            </div>

            {/* 3. Modal Body */}
            <div className="enrichment-modal-body">
              {modalActiveTab === 'scheduled' ? (
                scheduledJobsList.length === 0 ? (
                  <div className="scheduled-empty-card">
                    <div className="scheduled-illustration-wrap">
                      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Magnifying Glass Light Blue Lens */}
                        <circle cx="56" cy="54" r="28" fill="#E0F2FE" stroke="#3B82F6" strokeWidth="2.5" />
                        
                        {/* Clock Face Circle Inside Lens */}
                        <circle cx="56" cy="54" r="18" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                        {/* Clock Hands */}
                        <path d="M56 42V54H66" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                        {/* Magnifying Glass Handle */}
                        <path d="M75 73L96 94" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" />

                        {/* Red Circle Badge at top right of clock */}
                        <circle cx="72" cy="36" r="11" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                        <text x="72" y="40" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="sans-serif">0</text>

                        {/* Accent Radiating Spark Lines near top right badge */}
                        <line x1="72" y1="18" x2="72" y2="21" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                        <line x1="84" y1="22" x2="88" y2="25" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                        <line x1="89" y1="34" x2="93" y2="34" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>

                    <h3 className="scheduled-empty-title">No enrichment jobs scheduled yet!</h3>
                    <p className="scheduled-empty-subtext">
                      Schedule your first enrichment job now to keep your data up-to-date.
                    </p>
                  </div>
                ) : (
                  <div className="scheduled-jobs-list-wrap">
                    {scheduledJobsList.map((job) => (
                      <div key={job.id} className="scheduled-job-card-item">
                        <div className="job-info-left">
                          <Zap size={18} color="#2563eb" />
                          <div>
                            <strong className="job-name-text">{job.name}</strong>
                            <span className="job-sub-text">{job.type} • {job.schedule}</span>
                          </div>
                        </div>
                        <div className="job-status-right">
                          <span className="active-job-badge">Active</span>
                          <button 
                            className="delete-job-btn"
                            onClick={() => {
                              setScheduledJobsList(prev => prev.filter(j => j.id !== job.id));
                              setScheduledJobsCount(prev => Math.max(0, prev - 1));
                              showToast('Removed scheduled enrichment job');
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* Activity Log Tab Content */
                <div className="enrichment-modal-activity-log">
                  <div className="activity-log-table-wrap">
                    <table className="enrichment-log-table">
                      <thead>
                        <tr>
                          <th>Job Name / Type</th>
                          <th>Trigger</th>
                          <th>Records</th>
                          <th>Status</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="log-name-wrap">
                              <Zap size={14} color="#2563eb" />
                              <strong>CRM Lead Enrichment</strong>
                            </div>
                          </td>
                          <td>Auto-trigger</td>
                          <td>420 contacts</td>
                          <td><span className="log-status-badge success">● Completed</span></td>
                          <td>Today, 09:30 AM</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="log-name-wrap">
                              <FileSpreadsheet size={14} color="#059669" />
                              <strong>CSV Prospect Batch</strong>
                            </div>
                          </td>
                          <td>Manual Upload</td>
                          <td>1,250 contacts</td>
                          <td><span className="log-status-badge success">● Completed</span></td>
                          <td>Yesterday, 04:15 PM</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="log-name-wrap">
                              <Sliders size={14} color="#8b5cf6" />
                              <strong>Job Alert Scanner</strong>
                            </div>
                          </td>
                          <td>Weekly Schedule</td>
                          <td>85 updates</td>
                          <td><span className="log-status-badge success">● Completed</span></td>
                          <td>Sep 10, 2026</td>
                        </tr>
                        {scheduledJobsList.map((job) => (
                          <tr key={job.id}>
                            <td>
                              <div className="log-name-wrap">
                                <Zap size={14} color="#2563eb" />
                                <strong>{job.name}</strong>
                              </div>
                            </td>
                            <td>{job.schedule}</td>
                            <td>0 contacts</td>
                            <td><span className="log-status-badge pending">● Scheduled</span></td>
                            <td>{job.created}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Modal Footer */}
            <div className="enrichment-modal-footer">
              <button 
                className="modal-cancel-btn"
                onClick={() => setIsJobsModalOpen(false)}
              >
                Cancel
              </button>

              <div className="modal-footer-right-actions">
                <div className="dropdown-relative-wrap">
                  <button 
                    className="modal-history-dropdown-btn"
                    onClick={() => setHistoryDropdownOpen(!historyDropdownOpen)}
                  >
                    <span>View enrichment history</span>
                    <ChevronDown size={14} />
                  </button>

                  {historyDropdownOpen && (
                    <div className="history-simple-popover-menu">
                      <div 
                        className="history-simple-menu-item" 
                        onClick={() => { 
                          setHistoryDropdownOpen(false); 
                          setModalActiveTab('activity_log'); 
                          showToast('Filtered Email enrichment history');
                        }}
                      >
                        Email
                      </div>
                      <div 
                        className="history-simple-menu-item" 
                        onClick={() => { 
                          setHistoryDropdownOpen(false); 
                          setModalActiveTab('activity_log'); 
                          showToast('Filtered Job change history');
                        }}
                      >
                        Job change
                      </div>
                      <div 
                        className="history-simple-menu-item" 
                        onClick={() => { 
                          setHistoryDropdownOpen(false); 
                          setModalActiveTab('activity_log'); 
                          showToast('Filtered CRM enrichment history');
                        }}
                      >
                        CRM
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  className="modal-add-new-btn"
                  onClick={handleAddNewJob}
                >
                  Add new
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── WORKFLOW BUILDER MODAL ("SCHEDULE FROM SCRATCH" - 1:1 APOLLO MATCH) ── */}
      {isWorkflowModalOpen && (
        <div className="workflow-modal-overlay" onClick={() => setIsWorkflowModalOpen(false)}>
          <div className="workflow-modal-container" onClick={(e) => e.stopPropagation()}>
            
            {/* ── SCREEN A: DEFINE OBJECT TO ENRICH SUB-SCREEN (Screenshot 2) ── */}
            {workflowSubStep === 'define_object' ? (
              <div className="define-object-screen">
                {/* Header */}
                <div className="workflow-sub-header">
                  <div className="sub-header-left" onClick={() => setWorkflowSubStep('main')}>
                    <ArrowLeft size={18} className="back-arrow-icon" />
                    <h2 className="sub-title">Define object to enrich</h2>
                  </div>
                  <button 
                    className="modal-close-btn"
                    onClick={() => setIsWorkflowModalOpen(false)}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body Card */}
                <div className="define-object-body">
                  <div className="select-object-card">
                    <h3 className="select-card-heading">Select object to enrich</h3>
                    
                    <div 
                      className={`object-option-box ${selectedObject === 'contacts' ? 'selected' : ''}`}
                      onClick={() => setSelectedObject('contacts')}
                    >
                      <div className="option-left">
                        <div className={`radio-outer ${selectedObject === 'contacts' ? 'checked' : ''}`}>
                          {selectedObject === 'contacts' && <div className="radio-inner" />}
                        </div>
                        <span className="option-label-text">Contacts</span>
                      </div>

                      <div className="pink-user-badge">
                        <User size={18} color="#ffffff" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="define-object-footer">
                  <button 
                    className="modal-cancel-btn"
                    onClick={() => setWorkflowSubStep('main')}
                  >
                    Cancel
                  </button>
                  <button 
                    className={`save-object-btn ${selectedObject ? 'active' : 'disabled'}`}
                    disabled={!selectedObject}
                    onClick={() => setWorkflowSubStep('main')}
                  >
                    Save object
                  </button>
                </div>
              </div>
            ) : workflowSubStep === 'select_type' ? (
              /* ── SCREEN B: SELECT ENRICHMENT TYPE SUB-SCREEN (1:1 APOLLO MATCH) ── */
              <div className="define-object-screen">
                {/* Header */}
                <div className="workflow-sub-header">
                  <div className="sub-header-left" onClick={() => setWorkflowSubStep('main')}>
                    <ArrowLeft size={18} className="back-arrow-icon" />
                    <h2 className="sub-title">Select enrichment type</h2>
                  </div>
                  <button className="modal-close-btn" onClick={() => setIsWorkflowModalOpen(false)}>
                    <X size={18} />
                  </button>
                </div>

                {/* Body */}
                <div className="define-object-body">
                  {/* Top Section: Enrichment type options card */}
                  <div className="select-object-card">
                    <h3 className="select-card-heading">Enrichment type</h3>

                    {/* Option 1: Job changes */}
                    <div 
                      className={`enrichment-type-option-box ${selectedEnrichmentType === 'job_changes' ? 'selected' : ''}`}
                      onClick={() => setSelectedEnrichmentType('job_changes')}
                    >
                      <div className="option-left-content">
                        <div className={`radio-outer ${selectedEnrichmentType === 'job_changes' ? 'checked' : ''}`}>
                          {selectedEnrichmentType === 'job_changes' && <div className="radio-inner" />}
                        </div>
                        <div>
                          <strong className="option-title-text">Job changes</strong>
                          <span className="option-subtitle-text">Update all Apollo saved records, including CRM records</span>
                        </div>
                      </div>

                      <div className="type-badge-circle blue-badge">
                        <Briefcase size={15} color="#2563eb" />
                        <Search size={10} color="#2563eb" className="badge-spark-icon" />
                      </div>
                    </div>

                    {/* Option 2: Missing emails */}
                    <div 
                      className={`enrichment-type-option-box ${selectedEnrichmentType === 'missing_emails' ? 'selected' : ''}`}
                      onClick={() => setSelectedEnrichmentType('missing_emails')}
                    >
                      <div className="option-left-content">
                        <div className={`radio-outer ${selectedEnrichmentType === 'missing_emails' ? 'checked' : ''}`}>
                          {selectedEnrichmentType === 'missing_emails' && <div className="radio-inner" />}
                        </div>
                        <div>
                          <strong className="option-title-text">Missing emails</strong>
                          <span className="option-subtitle-text">Update all Apollo saved records, including CRM records</span>
                        </div>
                      </div>

                      <div className="type-badge-circle yellow-badge">
                        <Mail size={15} color="#d97706" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section: Dynamic Card based on selected type */}
                  {selectedEnrichmentType === 'job_changes' ? (
                    /* 1:1 Upgrade Promotion Card for Job Changes */
                    <div className="upgrade-promo-card">
                      {/* Banner Artwork SVG / Graphic */}
                      <div className="promo-graphic-banner">
                        <Sparkles size={16} color="#fde047" className="promo-sparkle spark-1" />
                        <Sparkles size={14} color="#fde047" className="promo-sparkle spark-2" />

                        {/* Mock Flow Steps */}
                        <div className="mock-flow-wrapper">
                          <div className="mock-pill-tag">
                            <Target size={10} />
                            <span>When this happens</span>
                          </div>
                          <div className="mock-card-strip">
                            <Settings size={12} color="#64748b" />
                            <span className="mock-contacts-badge">Contacts</span>
                          </div>

                          <div className="mock-pill-tag" style={{ marginTop: '6px' }}>
                            <Navigation size={10} />
                            <span>Then do this action</span>
                          </div>
                          <div className="mock-card-strip">
                            <RefreshCw size={12} color="#2563eb" />
                            <strong style={{ fontSize: '11px', color: '#0f172a' }}>Enrich job changes</strong>
                          </div>
                        </div>

                        {/* Big Yellow Padlock Icon */}
                        <div className="promo-padlock-badge">
                          <div className="padlock-shackle" />
                          <div className="padlock-body">
                            <div className="padlock-keyhole" />
                          </div>
                        </div>
                      </div>

                      {/* Headline & Subtext */}
                      <h3 className="promo-card-title">Want access to scheduled job changes enrichment?</h3>
                      <p className="promo-card-subtext">Upgrade your plan to unlock this powerful feature!</p>

                      {/* Benefit Checklist */}
                      <div className="promo-benefits-list">
                        <div className="benefit-row">
                          <Calendar size={15} color="#2563eb" className="benefit-icon" />
                          <span>Automate job change updates to save time and manual effort</span>
                        </div>
                        <div className="benefit-row">
                          <Briefcase size={15} color="#2563eb" className="benefit-icon" />
                          <span>Update existing contacts or create new ones with job changes</span>
                        </div>
                        <div className="benefit-row">
                          <Sliders size={15} color="#2563eb" className="benefit-icon" />
                          <span>Filter key records and take control of your record limit</span>
                        </div>
                      </div>

                      {/* View Pricing Plans Button */}
                      <div className="promo-action-bar">
                        <button 
                          className="yellow-primary-btn view-pricing-btn"
                          onClick={() => showToast('Opening Apollo Upgrade & Pricing Plans')}
                        >
                          View pricing plans
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* 1:1 Email Enrichment Settings Card (Screenshot 2 Match) */
                    <div className="email-enrichment-card">
                      <h3 className="email-enrichment-title">Email enrichment</h3>

                      <div className="email-enrichment-details-grid">
                        <div className="detail-col">
                          <span className="detail-label">Data source</span>
                          <span className="detail-value">Apollo</span>
                        </div>
                        <div className="detail-col-divider" />
                        <div className="detail-col">
                          <span className="detail-label">Credit usage</span>
                          <span className="credit-pill-chip">
                            <span className="coin-icon">🪙</span> 1 <span className="credit-subtext">/ verified email</span>
                          </span>
                        </div>
                      </div>

                      <div className="card-inner-divider" />

                      <div className="waterfall-toggle-row">
                        <div className="toggle-left-wrap">
                          <div 
                            className={`toggle-switch-pill ${isWaterfallEnabled ? 'active' : ''}`}
                            onClick={() => setIsWaterfallEnabled(!isWaterfallEnabled)}
                          >
                            <div className="toggle-switch-thumb">
                              {isWaterfallEnabled && <Check size={12} color="#ffffff" />}
                            </div>
                          </div>
                          <span className="waterfall-label">Find data via Waterfall</span>
                          <HelpCircle size={15} className="info-icon" />
                        </div>

                        <button 
                          className="gear-settings-btn"
                          title="Configure Waterfall Settings"
                          onClick={() => setIsAccessEmailDrawerOpen(true)}
                        >
                          <Settings size={18} color="#475569" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer (1:1 Screenshot 2 Match - Bright Yellow Save Action Button for Missing Emails) */}
                <div className="define-object-footer">
                  <button className="modal-cancel-btn" onClick={() => setWorkflowSubStep('main')}>Cancel</button>
                  <button 
                    className={selectedEnrichmentType === 'missing_emails' ? 'yellow-primary-btn save-action-yellow-btn' : `save-object-btn ${selectedEnrichmentType ? 'active' : 'disabled'}`}
                    disabled={!selectedEnrichmentType}
                    onClick={() => setWorkflowSubStep('main')}
                  >
                    Save action
                  </button>
                </div>
              </div>
            ) : (
              /* ── SCREEN C: MAIN WORKFLOW CANVAS (Screenshots 1, 3, 4) ── */
              <div className="workflow-canvas-screen">
                
                {/* Main Workflow Header */}
                <div className="workflow-modal-header">
                  <div className="modal-header-top">
                    <div className="job-title-toggle-wrap">
                      <div 
                        className={`toggle-switch-pill ${isJobActiveToggle ? 'active' : ''}`}
                        onClick={() => setIsJobActiveToggle(!isJobActiveToggle)}
                      >
                        <div className="toggle-switch-thumb">
                          {isJobActiveToggle && <Check size={12} color="#ffffff" />}
                        </div>
                      </div>
                      <input 
                        type="text" 
                        className="job-name-input-inline"
                        value={jobName}
                        onChange={(e) => setJobName(e.target.value)}
                      />
                    </div>

                    <button className="modal-close-btn" onClick={() => setIsWorkflowModalOpen(false)}>
                      <X size={18} />
                    </button>
                  </div>

                  {/* Workflow Sub-Tabs */}
                  <div className="workflow-tabs-strip">
                    <button 
                      className={`workflow-tab-btn ${workflowTab === 'workflow' ? 'active' : ''}`}
                      onClick={() => setWorkflowTab('workflow')}
                    >
                      ① Workflow
                    </button>
                    <button 
                      className={`workflow-tab-btn ${workflowTab === 'settings' ? 'active' : ''}`}
                      onClick={() => setWorkflowTab('settings')}
                    >
                      ② Settings
                    </button>
                  </div>
                </div>

                {/* Workflow Canvas Body */}
                {workflowTab === 'workflow' ? (
                  <div className="workflow-dotted-canvas">
                    <div className="workflow-flow-container">
                      
                      {/* ── STEP 1: WHEN THIS HAPPENS ── */}
                      <div className="flow-step-badge">
                        <Target size={14} className="badge-icon" />
                        <span>When this happens</span>
                      </div>

                      {selectedObject === 'contacts' ? (
                        /* State 2: Object Selected (Screenshots 3 & 4) */
                        <div 
                          className="flow-action-card completed"
                          onClick={() => setWorkflowSubStep('define_object')}
                        >
                          <div className="gear-icon-circle">
                            <Settings size={18} color="#475569" />
                          </div>
                          <span className="object-is-text">Object is</span>
                          <span className="pink-contacts-chip">
                            <User size={13} color="#be185d" />
                            <span>Contacts</span>
                          </span>
                        </div>
                      ) : (
                        /* State 1: Define Object to Enrich (Screenshot 1) */
                        <div 
                          className="flow-action-card empty"
                          onClick={() => setWorkflowSubStep('define_object')}
                        >
                          <Plus size={16} color="#2563eb" />
                          <span className="action-blue-text">Define object to enrich</span>
                        </div>
                      )}

                      {/* Connecting Line 1 */}
                      <div className="flow-connector-line" />

                      {/* ── STEP 2: THEN DO THIS ACTION ── */}
                      <div className="flow-step-badge">
                        <Navigation size={14} className="badge-icon" />
                        <span>Then do this action</span>
                      </div>

                      {selectedEnrichmentType ? (
                        <div 
                          className="flow-action-card completed"
                          onClick={() => setWorkflowSubStep('select_type')}
                        >
                          <div className="gear-icon-circle blue-icon-bg">
                            <RefreshCw size={16} color="#2563eb" />
                          </div>
                          <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>
                            {selectedEnrichmentType === 'job_changes' ? 'Enrich job changes' : 'Enrich missing emails'}
                          </strong>
                        </div>
                      ) : (
                        <div 
                          className={`flow-action-card ${selectedObject ? 'empty' : 'disabled'}`}
                          onClick={() => {
                            if (selectedObject) setWorkflowSubStep('select_type');
                            else showToast('Please define object first');
                          }}
                        >
                          <Plus size={16} color={selectedObject ? '#2563eb' : '#94a3b8'} />
                          <span className={selectedObject ? 'action-blue-text' : 'action-muted-text'}>
                            Select enrichment type
                          </span>
                        </div>
                      )}

                      {/* Connecting Line 2 */}
                      <div className="flow-connector-line" />

                      {/* ── STEP 3: SET FILTERS (OPTIONAL) ── */}
                      <div 
                        className="flow-action-card disabled"
                        onClick={() => showToast('Filters are optional and configured automatically')}
                      >
                        <Plus size={16} color="#94a3b8" />
                        <span className="action-muted-text">Set filters (Optional)</span>
                      </div>

                      {/* Connecting Line 3 */}
                      <div className="flow-connector-line" />

                      {/* ── STEP 4: SET CADENCE ── */}
                      <div 
                        className="flow-action-card disabled"
                        onClick={() => showToast('Cadence set to Daily at 8:00 AM')}
                      >
                        <Plus size={16} color="#94a3b8" />
                        <span className="action-muted-text">Set cadence</span>
                      </div>

                    </div>
                  </div>
                ) : (
                  /* Settings Tab Content */
                  <div className="workflow-settings-body">
                    <div className="settings-form-group">
                      <label className="settings-label">Job Name</label>
                      <input 
                        type="text" 
                        className="settings-input"
                        value={jobName}
                        onChange={(e) => setJobName(e.target.value)}
                      />
                    </div>

                    <div className="settings-form-group">
                      <label className="settings-label">Execution Schedule</label>
                      <select 
                        className="settings-select"
                        value={selectedCadence}
                        onChange={(e) => setSelectedCadence(e.target.value)}
                      >
                        <option value="Daily at 8:00 AM">Daily at 8:00 AM</option>
                        <option value="Weekly on Mondays">Weekly on Mondays</option>
                        <option value="Real-time Trigger">Real-time Lead Trigger</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Workflow Modal Footer */}
                <div className="workflow-modal-footer">
                  {workflowTab === 'workflow' ? (
                    <button 
                      className={`next-settings-btn ${selectedObject ? 'active' : 'disabled'}`}
                      onClick={() => {
                        if (selectedObject) {
                          setWorkflowTab('settings');
                        } else {
                          showToast('Please click "Define object to enrich" first');
                        }
                      }}
                    >
                      Next: Settings
                    </button>
                  ) : (
                    <button 
                      className="yellow-primary-btn"
                      style={{ padding: '8px 22px', borderRadius: '8px', fontWeight: 700 }}
                      onClick={handleSaveWorkflowJob}
                    >
                      Create & Save Job →
                    </button>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* ── ACCESS EMAIL WATERFALL CONFIGURATION DRAWER (1:1 APOLLO MATCH - SCREENSHOT 3) ── */}
      {isAccessEmailDrawerOpen && (
        <div className="access-email-drawer-overlay" onClick={() => setIsAccessEmailDrawerOpen(false)}>
          <div className="access-email-drawer-container" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="drawer-header">
              <div className="drawer-title-wrap">
                <h2 className="drawer-title">Access email</h2>
                <HelpCircle size={15} className="title-help-icon" />
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setIsAccessEmailDrawerOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="drawer-body-scrollable">
              
              {/* Section 1: Field details Accordion */}
              <div className="drawer-accordion-section">
                <div 
                  className="accordion-header-row"
                  onClick={() => toggleAccordion('fieldDetails')}
                >
                  <span className="accordion-title">Field details</span>
                  <ChevronDown size={16} className={`accordion-arrow ${accordionState.fieldDetails ? 'open' : ''}`} />
                </div>

                {accordionState.fieldDetails && (
                  <div className="accordion-body-content">
                    <div className="form-field-group">
                      <label className="field-label">Field name</label>
                      <input 
                        type="text" 
                        value="Emails" 
                        disabled 
                        className="field-input-disabled" 
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="field-label">Field group</label>
                      <select className="field-select-input" defaultValue="Basic information">
                        <option value="Basic information">Basic information</option>
                        <option value="Contact info">Contact info</option>
                      </select>
                    </div>

                    <div className="form-field-group">
                      <label className="field-label">Field type</label>
                      <select className="field-select-input" defaultValue="Emails">
                        <option value="Emails">✉ Emails</option>
                      </select>
                      <span className="field-muted-note">Field type cannot be changed after the field is created</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 2: Enrichment configuration Accordion */}
              <div className="drawer-accordion-section">
                <div 
                  className="accordion-header-row"
                  onClick={() => toggleAccordion('enrichmentConfig')}
                >
                  <span className="accordion-title">Enrichment configuration</span>
                  <ChevronDown size={16} className={`accordion-arrow ${accordionState.enrichmentConfig ? 'open' : ''}`} />
                </div>

                {accordionState.enrichmentConfig && (
                  <div className="accordion-body-content">
                    {/* Top Credit Banner */}
                    <div className="credit-usage-banner">
                      <span>Estimated credit usage: 1-4 / enriched record</span>
                    </div>

                    {/* Sub-Accordion: Data sources */}
                    <div className="sub-accordion-box">
                      <div 
                        className="sub-accordion-header"
                        onClick={() => toggleAccordion('dataSources')}
                      >
                        <ChevronDown size={14} className={`sub-arrow ${accordionState.dataSources ? 'open' : ''}`} />
                        <span className="sub-accordion-title">Data sources</span>
                      </div>

                      {accordionState.dataSources && (
                        <div className="sub-accordion-body">
                          <p className="sources-subtext">Order sources to search for results till found</p>

                          {/* Waterfall Drag List */}
                          <div className="waterfall-sources-list">
                            
                            {/* Source 1: Apollo */}
                            <div className="waterfall-source-card">
                              <div className="source-card-main">
                                <div className="source-left">
                                  <span className="drag-grip-icon">⠿</span>
                                  <span className="source-brand-icon apollo-flower">🌼</span>
                                  <strong className="source-name">Apollo</strong>
                                  <HelpCircle size={13} className="info-icon" />
                                </div>
                                <div className="source-right">
                                  <span className="source-credit-badge">🪙 1</span>
                                  <span className="chevron-right">&gt;</span>
                                  <X size={14} className="remove-source-icon" />
                                </div>
                              </div>
                              <div className="source-validated-chip">
                                <span>✓ Validated · Stop if verified</span>
                              </div>
                              <div className="if-not-found-label">If not found</div>
                            </div>

                            {/* Source 2: Icypeas */}
                            <div className="waterfall-source-card">
                              <div className="source-card-main">
                                <div className="source-left">
                                  <span className="drag-grip-icon">⠿</span>
                                  <span className="source-brand-icon icypeas-dot">🟢</span>
                                  <strong className="source-name">Icypeas</strong>
                                  <HelpCircle size={13} className="info-icon" />
                                </div>
                                <div className="source-right">
                                  <span className="source-credit-badge">🪙 1</span>
                                  <span className="chevron-right">&gt;</span>
                                  <X size={14} className="remove-source-icon" />
                                </div>
                              </div>
                              <div className="source-validated-chip">
                                <span>✓ Validated · Stop if verified</span>
                              </div>
                              <div className="if-not-found-label">If not found</div>
                            </div>

                            {/* Source 3: LeadMagic */}
                            <div className="waterfall-source-card">
                              <div className="source-card-main">
                                <div className="source-left">
                                  <span className="drag-grip-icon">⠿</span>
                                  <span className="source-brand-icon leadmagic-diamond">🔷</span>
                                  <strong className="source-name">LeadMagic</strong>
                                  <HelpCircle size={13} className="info-icon" />
                                </div>
                                <div className="source-right">
                                  <span className="source-credit-badge">🪙 1</span>
                                  <span className="chevron-right">&gt;</span>
                                  <X size={14} className="remove-source-icon" />
                                </div>
                              </div>
                              <div className="source-validated-chip">
                                <span>✓ Validated · Stop if verified</span>
                              </div>
                              <div className="if-not-found-label">If not found</div>
                            </div>

                            {/* Source 4: FindyMail */}
                            <div className="waterfall-source-card">
                              <div className="source-card-main">
                                <div className="source-left">
                                  <span className="drag-grip-icon">⠿</span>
                                  <span className="source-brand-icon findymail-env">✉</span>
                                  <strong className="source-name">FindyMail</strong>
                                  <HelpCircle size={13} className="info-icon" />
                                </div>
                                <div className="source-right">
                                  <span className="source-credit-badge">🪙 1</span>
                                  <span className="chevron-right">&gt;</span>
                                  <X size={14} className="remove-source-icon" />
                                </div>
                              </div>
                              <div className="source-validated-chip">
                                <span>✓ Validated · Stop if verified</span>
                              </div>
                              <div className="if-not-found-label">If not found</div>
                            </div>

                            {/* Source 5: Prospeo */}
                            <div className="waterfall-source-card">
                              <div className="source-card-main">
                                <div className="source-left">
                                  <span className="drag-grip-icon">⠿</span>
                                  <span className="source-brand-icon prospeo-square">🔴</span>
                                  <strong className="source-name">Prospeo</strong>
                                  <HelpCircle size={13} className="info-icon" />
                                </div>
                                <div className="source-right">
                                  <span className="source-credit-badge">🪙 1</span>
                                  <span className="chevron-right">&gt;</span>
                                  <X size={14} className="remove-source-icon" />
                                </div>
                              </div>
                              <div className="source-validated-chip">
                                <span>✓ Validated · Stop if verified</span>
                              </div>
                            </div>

                          </div>

                          <button 
                            className="add-source-sub-btn"
                            onClick={() => showToast('Select additional waterfall provider...')}
                          >
                            <span>Add source</span>
                            <ChevronDown size={14} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Sub-Accordion: Validation */}
                    <div className="sub-accordion-box" style={{ marginTop: '16px' }}>
                      <div 
                        className="sub-accordion-header"
                        onClick={() => toggleAccordion('validation')}
                      >
                        <ChevronDown size={14} className={`sub-arrow ${accordionState.validation ? 'open' : ''}`} />
                        <span className="sub-accordion-title">Validation</span>
                      </div>

                      {accordionState.validation && (
                        <div className="sub-accordion-body">
                          <p className="sources-subtext">Validates each email after it is found. Adds 1 credit per email enriched.</p>

                          <div className="waterfall-source-card">
                            <div className="source-card-main">
                              <div className="source-left">
                                <span className="source-brand-badge-square">zb</span>
                                <strong className="source-name">ZeroBounce</strong>
                                <HelpCircle size={13} className="info-icon" />
                              </div>
                              <div className="source-right">
                                <span className="source-credit-badge">🪙 1</span>
                                <span className="chevron-right">&gt;</span>
                                <X size={14} className="remove-source-icon" />
                              </div>
                            </div>
                          </div>

                          <button 
                            className="add-source-sub-btn"
                            onClick={() => showToast('Select validation provider...')}
                          >
                            <span>Edit source</span>
                            <ChevronDown size={14} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Section: Search approach */}
                    <div className="search-approach-box">
                      <h4 className="approach-heading">Search approach</h4>

                      <div 
                        className="approach-radio-option"
                        onClick={() => setSearchApproach('verified')}
                      >
                        <div className="radio-left">
                          <div className={`radio-outer ${searchApproach === 'verified' ? 'checked' : ''}`}>
                            {searchApproach === 'verified' && <div className="radio-inner" />}
                          </div>
                          <div>
                            <strong className="approach-title">Search until verified</strong>
                            <p className="approach-desc">Stops when a verified result is found. Better quality, uses more credits on average.</p>
                          </div>
                        </div>
                      </div>

                      <div 
                        className="approach-radio-option"
                        onClick={() => setSearchApproach('any')}
                      >
                        <div className="radio-left">
                          <div className={`radio-outer ${searchApproach === 'any' ? 'checked' : ''}`}>
                            {searchApproach === 'any' && <div className="radio-inner" />}
                          </div>
                          <div>
                            <strong className="approach-title">Search until any result found</strong>
                            <p className="approach-desc">Stops at the first result regardless of verification status. Uses fewer credits.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>

            </div>

            {/* Footer */}
            <div className="drawer-footer">
              <button 
                className="yellow-primary-btn drawer-save-btn"
                onClick={() => {
                  setIsAccessEmailDrawerOpen(false);
                  showToast('Saved Waterfall email enrichment settings!');
                }}
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── SCHEDULE ENRICHMENT TEMPLATES MODAL (1:1 APOLLO MATCH - SCREENSHOTS 2, 3, 4, 5) ── */}
      {isTemplatesModalOpen && (
        <div className="templates-modal-overlay" onClick={() => setIsTemplatesModalOpen(false)}>
          <div className="templates-modal-container" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="templates-modal-header">
              <h2 className="templates-modal-title">Schedule enrichment templates</h2>
              
              <div className="templates-header-right">
                <div className="templates-search-box">
                  <Search size={15} color="#94a3b8" />
                  <input 
                    type="text" 
                    placeholder="Search templates..."
                    className="templates-search-input"
                    value={templatesSearch}
                    onChange={(e) => setTemplatesSearch(e.target.value)}
                  />
                </div>
                <button 
                  className="modal-close-btn"
                  onClick={() => setIsTemplatesModalOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body: Left Sidebar + Main Content Grid */}
            <div className="templates-modal-body">
              
              {/* Left Navigation Sidebar */}
              <div className="templates-sidebar">
                <div 
                  className={`templates-sidebar-item ${templatesCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setTemplatesCategory('all')}
                >
                  <span>All templates</span>
                  <div className="item-right-wrap">
                    <span className="count-badge">5</span>
                    <ChevronDown size={14} className="chevron-icon rotate-270" />
                  </div>
                </div>

                <div 
                  className={`templates-sidebar-item ${templatesCategory === 'missing_emails' ? 'active' : ''}`}
                  onClick={() => setTemplatesCategory('missing_emails')}
                >
                  <span>Enrich Missing Emails</span>
                  <div className="item-right-wrap">
                    <span className="count-badge">3</span>
                    <ChevronDown size={14} className="chevron-icon rotate-270" />
                  </div>
                </div>

                <div 
                  className={`templates-sidebar-item ${templatesCategory === 'job_changes' ? 'active' : ''}`}
                  onClick={() => setTemplatesCategory('job_changes')}
                >
                  <span>Enrich Job Changes</span>
                  <div className="item-right-wrap">
                    <span className="count-badge">2</span>
                    <ChevronDown size={14} className="chevron-icon rotate-270" />
                  </div>
                </div>
              </div>

              {/* Main Content Grid Area */}
              <div className="templates-main-content">
                <h3 className="templates-category-heading">
                  {templatesCategory === 'all' ? 'All templates' : templatesCategory === 'missing_emails' ? 'Enrich Missing Emails' : 'Enrich Job Changes'}
                </h3>

                <div className="templates-cards-grid">
                  
                  {/* Card 1 */}
                  {(templatesCategory === 'all' || templatesCategory === 'missing_emails') && (
                    <div 
                      className={`template-card-box ${selectedTemplateCardId === 1 ? 'selected' : ''}`}
                      onClick={() => setSelectedTemplateCardId(1)}
                    >
                      <div className="template-badge-pill email-pill">
                        <Mail size={13} />
                        <span>Enrich Missing Emails</span>
                      </div>
                      <h4 className="template-card-title">Enrich Contacts Missing Emails</h4>
                      <p className="template-card-desc">
                        Enrich your contacts which are missing email and never lose the engagement opportunities
                      </p>
                      <button 
                        className="template-try-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedObject('contacts');
                          setSelectedEnrichmentType('missing_emails');
                          setIsTemplatesModalOpen(false);
                          handleOpenWorkflowModal();
                          showToast('Loaded "Enrich Contacts Missing Emails" template!');
                        }}
                      >
                        Try it
                      </button>
                    </div>
                  )}

                  {/* Card 2 */}
                  {(templatesCategory === 'all' || templatesCategory === 'missing_emails') && (
                    <div 
                      className={`template-card-box ${selectedTemplateCardId === 2 ? 'selected' : ''}`}
                      onClick={() => setSelectedTemplateCardId(2)}
                    >
                      <div className="template-badge-pill email-pill">
                        <Mail size={13} />
                        <span>Enrich Missing Emails</span>
                      </div>
                      <h4 className="template-card-title">Enrich missing emails for Contacts in High Growth Companies</h4>
                      <p className="template-card-desc">
                        Enrich emails for contacts at fast-growing companies experiencing expansion
                      </p>
                      <button 
                        className="template-try-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedObject('contacts');
                          setSelectedEnrichmentType('missing_emails');
                          setIsTemplatesModalOpen(false);
                          handleOpenWorkflowModal();
                          showToast('Loaded "High Growth Companies" template!');
                        }}
                      >
                        Try it
                      </button>
                    </div>
                  )}

                  {/* Card 3 */}
                  {(templatesCategory === 'all' || templatesCategory === 'missing_emails') && (
                    <div 
                      className={`template-card-box ${selectedTemplateCardId === 3 ? 'selected' : ''}`}
                      onClick={() => setSelectedTemplateCardId(3)}
                    >
                      <div className="template-badge-pill email-pill">
                        <Mail size={13} />
                        <span>Enrich Missing Emails</span>
                      </div>
                      <h4 className="template-card-title">Enrich missing Email for contacts in Recently Funded Companies</h4>
                      <p className="template-card-desc">
                        Enrich emails for contacts at recently funded companies, likely to have increased budgets and scaling needs
                      </p>
                      <button 
                        className="template-try-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedObject('contacts');
                          setSelectedEnrichmentType('missing_emails');
                          setIsTemplatesModalOpen(false);
                          handleOpenWorkflowModal();
                          showToast('Loaded "Recently Funded Companies" template!');
                        }}
                      >
                        Try it
                      </button>
                    </div>
                  )}

                  {/* Card 4 */}
                  {(templatesCategory === 'all' || templatesCategory === 'job_changes') && (
                    <div 
                      className={`template-card-box ${selectedTemplateCardId === 4 ? 'selected' : ''}`}
                      onClick={() => setSelectedTemplateCardId(4)}
                    >
                      <div className="template-badge-pill job-pill">
                        <Briefcase size={13} />
                        <span>Enrich Job Changes</span>
                      </div>
                      <h4 className="template-card-title">Enrich Contacts having Job change</h4>
                      <p className="template-card-desc">
                        Enrich contacts who've recently changed jobs to keep your prospect list always up-to-date with the correct information
                      </p>
                      <button 
                        className="template-try-btn locked"
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast('Upgrade required to use Job Changes templates');
                        }}
                      >
                        <Lock size={13} />
                        <span>Try it</span>
                      </button>
                    </div>
                  )}

                  {/* Card 5 */}
                  {(templatesCategory === 'all' || templatesCategory === 'job_changes') && (
                    <div 
                      className={`template-card-box ${selectedTemplateCardId === 5 ? 'selected' : ''}`}
                      onClick={() => setSelectedTemplateCardId(5)}
                    >
                      <div className="template-badge-pill job-pill">
                        <Briefcase size={13} />
                        <span>Enrich Job Changes</span>
                      </div>
                      <h4 className="template-card-title">Job Change enrichment for Former champion changed job</h4>
                      <p className="template-card-desc">
                        Enrich contacts who were previous champions and have moved to new companies, creating potential opportunities for your product or service in their new roles
                      </p>
                      <button 
                        className="template-try-btn locked"
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast('Upgrade required to use Job Changes templates');
                        }}
                      >
                        <Lock size={13} />
                        <span>Try it</span>
                      </button>
                    </div>
                  )}

                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="templates-modal-footer">
              <button 
                className="modal-cancel-btn create-scratch-btn"
                onClick={() => {
                  setIsTemplatesModalOpen(false);
                  handleOpenWorkflowModal();
                }}
              >
                Create from scratch
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── REAL-TIME ENRICHMENT UPGRADE MODAL (1:1 APOLLO MATCH - SCREENSHOT 2) ── */}
      {isRealtimeModalOpen && (
        <div className="realtime-modal-overlay" onClick={() => setIsRealtimeModalOpen(false)}>
          <div className="realtime-modal-container" onClick={(e) => e.stopPropagation()}>
            
            {/* Header Close Button */}
            <button 
              className="modal-close-btn realtime-close-btn"
              onClick={() => setIsRealtimeModalOpen(false)}
            >
              <X size={18} />
            </button>

            {/* Magenta Graphic Banner */}
            <div className="realtime-graphic-banner">
              <Sparkles size={18} color="#fde047" className="banner-sparkle spark-top" />
              <Sparkles size={14} color="#fde047" className="banner-sparkle spark-mid" />

              {/* Mock UI Card */}
              <div className="banner-mock-card">
                {/* Contacts Row */}
                <div className="mock-toggle-row">
                  <span className="row-label">Contacts</span>
                  <div className="mock-switch active">
                    <div className="mock-switch-thumb" />
                  </div>
                  <div className="mock-avatar-chip">A</div>
                </div>

                <div className="mock-card-line" />

                {/* Leads Row */}
                <div className="mock-toggle-row">
                  <span className="row-label">Leads</span>
                  <div className="mock-switch inactive">
                    <div className="mock-switch-thumb" />
                  </div>
                  <ChevronDown size={14} color="#94a3b8" />
                </div>
              </div>

              {/* Big Yellow Lightning Badge */}
              <div className="realtime-lightning-badge">
                <div className="ray ray-1" />
                <div className="ray ray-2" />
                <div className="ray ray-3" />
                <Zap size={34} color="#0f172a" fill="#0f172a" />
              </div>
            </div>

            {/* Content Area */}
            <div className="realtime-modal-content">
              <h2 className="realtime-modal-title">
                Looking for real-time enrichment of your CRM fields?
              </h2>
              <p className="realtime-modal-subtext">
                Upgrade your plan for instant data updates!
              </p>

              <div className="realtime-checklist-section">
                <p className="checklist-heading">Here's what you can do:</p>

                <div className="realtime-checklist">
                  <div className="check-item">
                    <Zap size={16} color="#2563eb" className="check-icon" />
                    <span>Auto-enrich new and existing records as they sync to Apollo</span>
                  </div>

                  <div className="check-item">
                    <Sliders size={16} color="#2563eb" className="check-icon" />
                    <span>Choose which specific objects to update in real-time</span>
                  </div>

                  <div className="check-item">
                    <RefreshCw size={16} color="#2563eb" className="check-icon" />
                    <span>Select fields to enrich and set to fill missing data or overwrite</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="realtime-modal-footer">
              <button 
                className="modal-cancel-btn learn-more-outline-btn"
                onClick={() => {
                  showToast('Opening Real-Time Enrichment documentation...');
                  setIsRealtimeModalOpen(false);
                }}
              >
                Learn more
              </button>

              <button 
                className="yellow-primary-btn view-pricing-btn"
                onClick={() => {
                  showToast('Opening Apollo Upgrade & Pricing Plans...');
                  setIsRealtimeModalOpen(false);
                }}
              >
                View pricing plans
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
