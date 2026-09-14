import React, { useState } from 'react';
import {
  Mail, AlertTriangle, Search, SlidersHorizontal, Settings,
  LayoutGrid, ChevronDown, Activity, TrendingUp, Edit3, X, Globe,
  CheckCircle2, Wrench, AlertCircle, Plus, FileText, User, Paperclip,
  Send, Eye, Sparkles, Tag, Folder
} from 'lucide-react';
import '../../css/emails-view.css';

export default function EmailsView({ showToast }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'templates' | 'analytics'
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [composeModalOpen, setComposeModalOpen] = useState(false);
  const [createTemplateModalOpen, setCreateTemplateModalOpen] = useState(false);

  // Compose Form State
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Create Template Form State (Matching User's Exact Prompt)
  const [templateName, setTemplateName] = useState('Cold Outbound Outreach');
  const [templateFolder, setTemplateFolder] = useState('Default Folder');
  const [templateTags, setTemplateTags] = useState('sales, outbound');
  const [templateOwner, setTemplateOwner] = useState('Abhishek Kumar (You)');
  const [templateSubject, setTemplateSubject] = useState('Quick question regarding {{company_name}} sales ops');
  const [templateBody, setTemplateBody] = useState('Hi {{first_name}},\n\nI noticed your team at {{company_name}} is scaling rapidly. Would love to share how Apollo can accelerate your pipeline.\n\nBest regards,\nAbhishek');
  const [attachedFile, setAttachedFile] = useState(null);

  // Templates List State
  const [templatesList, setTemplatesList] = useState([]);

  const handleSendEmail = () => {
    if (!recipient.trim()) {
      showToast('Please enter a recipient email address.');
      return;
    }
    showToast(`Email sent to ${recipient}`);
    setComposeModalOpen(false);
    setRecipient('');
    setSubject('');
    setEmailBody('');
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      showToast('Please enter a template name.');
      return;
    }
    const newTmpl = {
      id: `tmpl-${Date.now()}`,
      name: templateName,
      folder: templateFolder,
      subject: templateSubject,
      owner: templateOwner,
      updated: 'Just now'
    };
    setTemplatesList(prev => [newTmpl, ...prev]);
    setCreateTemplateModalOpen(false);
    showToast(`Saved email template "${templateName}"`);
  };

  const handleSendTestEmail = () => {
    showToast(`Test email sent to abhishek@apollo-user.io from default mailbox`);
  };

  return (
    <div className="dash-view-content apollo-emails-page">
      
      {/* ── 1. TOP HEADER BAR (1:1 MATCH TO SCREENSHOTS) ── */}
      <div className="emails-top-header">
        <h1 className="emails-page-title">Engage</h1>

        <div className="emails-header-right-actions">
          {activeTab === 'templates' ? (
            <button 
              className="compose-email-yellow-btn"
              onClick={() => setCreateTemplateModalOpen(true)}
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Create template</span>
            </button>
          ) : (
            <>
              <button 
                className="manage-mailboxes-btn"
                onClick={() => showToast('Opening Mailboxes Management...')}
              >
                Manage mailboxes
              </button>

              <button 
                className="deliverability-stats-btn"
                onClick={() => showToast('Opening Deliverability Stats...')}
              >
                Deliverability stats
              </button>

              <button 
                className="compose-email-yellow-btn"
                onClick={() => setComposeModalOpen(true)}
              >
                <Edit3 size={15} />
                <span>Compose</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── 2. SUB-NAVIGATION TABS BAR (1:1 MATCH TO SCREENSHOTS) ── */}
      <div className="emails-tabs-bar">
        <button 
          className={`emails-tab-item ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <span>All emails</span>
        </button>

        <button 
          className={`emails-tab-item ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          <span>Templates</span>
        </button>

        <button 
          className={`emails-tab-item ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <span>Analytics</span>
        </button>
      </div>

      {/* ── 3. WARNING ALERT BANNER (1:1 MATCH TO SCREENSHOTS) ── */}
      <div className="emails-warning-alert-banner">
        <AlertTriangle size={17} className="warning-alert-icon" color="#92400e" />
        <span>
          You have no mailboxes linked. Please connect your email account to start managing and sending emails via Apollo. 
          <span 
            className="link-mailbox-anchor" 
            onClick={() => showToast('Redirecting to Mailbox Connection Settings...')}
          >
            Link mailbox
          </span>
        </span>
      </div>

      {/* ── 4. STICKY FILTER TOOLBAR (For All Emails & Templates) ── */}
      {activeTab === 'all' && (
        <div className="emails-filter-toolbar">
          <div className="emails-toolbar-left">
            <button 
              className="white-toolbar-btn"
              onClick={() => showToast('Selecting Mailbox Inbox...')}
            >
              <LayoutGrid size={14} color="#3f3f46" />
              <span>All inboxes</span>
              <ChevronDown size={13} color="#3f3f46" />
            </button>

            <button 
              className={`white-toolbar-btn ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={14} color="#3f3f46" />
              <span>Show Filters</span>
            </button>

            <div className="search-emails-input-wrap">
              <Search size={14} color="#a1a1aa" className="search-icon" />
              <input 
                type="text" 
                placeholder="Search emails" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-emails-input"
              />
            </div>
          </div>

          <div className="emails-toolbar-right">
            <button className="white-toolbar-btn" onClick={() => showToast('View Saved Successfully')}>
              <span>Save as new view</span>
            </button>

            <button className="view-options-btn" onClick={() => showToast('Opening Email Display Options...')}>
              <Settings size={14} color="#3f3f46" />
              <span>View options</span>
            </button>
          </div>
        </div>
      )}

      {/* ── 5. MAIN BODY CONTENT AREA ── */}
      <div className="emails-main-body-container">
        
        {/* ── TAB 1: ALL EMAILS (SCREENSHOT 1 & 2) ── */}
        {activeTab === 'all' && (
          <div className="emails-empty-card-container">
            <div className="emails-illustration-wrapper">
              <div className="domain-health-mock-card">
                <div className="mock-domain-header">
                  <div>DOMAINS</div>
                  <div>AT RISK</div>
                  <div>HEALTH</div>
                  <div style={{ textAlign: 'center' }}>MAILBOXES</div>
                </div>

                <div className="mock-domain-row">
                  <div className="domain-name-cell">
                    <Globe size={14} color="#0284c7" />
                    <span>cloudripple.org</span>
                  </div>
                  <div className="at-risk-cell">SPF, DKIM, DMARC</div>
                  <div>
                    <span className="health-status-chip fix">
                      <Wrench size={10} /> Fix
                    </span>
                  </div>
                  <div className="mailboxes-count-cell">2</div>
                </div>

                <div className="mock-domain-row">
                  <div className="domain-name-cell">
                    <Globe size={14} color="#0284c7" />
                    <span>apollo.io</span>
                  </div>
                  <div className="at-risk-cell">Tracking subdomain</div>
                  <div>
                    <span className="health-status-chip review">
                      <AlertCircle size={10} /> Review
                    </span>
                  </div>
                  <div className="mailboxes-count-cell">3</div>
                </div>
              </div>

              <div className="floating-envelope-row-card">
                <div className="envelope-graphic-box">
                  <Mail size={22} color="#18181b" />
                </div>
                <div className="domain-name-cell">
                  <Globe size={14} color="#0284c7" />
                  <span>cloudripple.org</span>
                </div>
                <div>
                  <span className="health-status-chip good">
                    <CheckCircle2 size={10} /> Good
                  </span>
                </div>
                <div className="at-risk-cell" style={{ fontWeight: 500, color: '#27272a' }}>
                  Email opened
                </div>
              </div>
            </div>

            <h2 className="emails-empty-heading">No emails yet.</h2>
            <p className="emails-empty-subtitle">
              Once you start sending emails, they'll appear here. Before you begin, make sure your domains are healthy so your messages reach the inbox.
            </p>

            <button 
              className="view-domains-btn"
              onClick={() => showToast('Opening Email Setup & Domain Health...')}
            >
              <Activity size={16} color="#ef4444" />
              <span>View domains</span>
            </button>

            <div className="emails-footer-domain-tip">
              <TrendingUp size={16} color="#52525b" />
              <span>
                Healthy domains can deliver up to 2–3× more emails to prospects' inboxes compared to domains with unresolved issues.
              </span>
            </div>
          </div>
        )}

        {/* ── TAB 2: TEMPLATES (1:1 MATCH TO USER SCREENSHOT 3) ── */}
        {activeTab === 'templates' && (
          <div className="templates-tab-container">
            {templatesList.length === 0 ? (
              <div className="templates-empty-card">
                <h2 className="templates-empty-title">No templates yet</h2>
                <p className="templates-empty-sub">Create your first email template to get started.</p>
                <button 
                  className="compose-email-yellow-btn"
                  onClick={() => setCreateTemplateModalOpen(true)}
                >
                  Create template
                </button>
              </div>
            ) : (
              <div className="active-tasks-table-container">
                <div className="exact-apollo-table-card">
                  <table className="exact-apollo-table">
                    <thead>
                      <tr>
                        <th>TEMPLATE NAME</th>
                        <th>FOLDER</th>
                        <th>SUBJECT</th>
                        <th>OWNER</th>
                        <th>LAST UPDATED</th>
                      </tr>
                    </thead>
                    <tbody>
                      {templatesList.map(tmpl => (
                        <tr key={tmpl.id} className="exact-row">
                          <td style={{ fontWeight: 600, color: '#18181b' }}>{tmpl.name}</td>
                          <td><span className="sequence-tag-pill">{tmpl.folder}</span></td>
                          <td style={{ color: '#52525b' }}>{tmpl.subject}</td>
                          <td><span className="due-date-text">{tmpl.owner}</span></td>
                          <td><span className="due-date-text">{tmpl.updated}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: ANALYTICS (1:1 MATCH TO USER SCREENSHOTS) ── */}
        {activeTab === 'analytics' && (
          <div className="analytics-tab-container">
            
            {/* Top Toggle: Analytics / Capacity utilization */}
            <div className="analytics-top-toggle-container">
              <div className="analytics-toggle-group">
                <button className="analytics-toggle-btn active">Analytics</button>
                <button className="analytics-toggle-btn">Capacity utilization</button>
              </div>
            </div>

            {/* Upgrade Banner */}
            <div className="analytics-upgrade-banner">
              <div className="banner-left">
                <AlertCircle size={16} color="#52525b" />
                <span>Upgrade to a paid plan to track email opens and clicks.</span>
              </div>
              <div className="banner-right">
                <span className="compare-plans-link">Compare plans</span>
                <X size={16} className="close-banner-icon" />
              </div>
            </div>

            {/* Filter Bar */}
            <div className="analytics-filter-bar">
              <button className="analytics-dropdown-btn">
                <span>Select timeframe</span>
                <ChevronDown size={14} color="#71717a" />
              </button>
              <button className="analytics-add-filter-btn">
                <Plus size={14} color="#52525b" />
                <span>Add filter</span>
              </button>
            </div>

            {/* Stats Cards Grid */}
            <div className="analytics-cards-container">
              
              {/* Email Stats Card */}
              <div className="analytics-card-box full-width">
                <div className="analytics-card-header">
                  <h3 className="analytics-card-title">Email Stats</h3>
                </div>
                <div className="analytics-stats-grid">
                  
                  <div className="stat-item">
                    <div className="stat-label"># Emails sent</div>
                    <div className="stat-value-row">
                      <span className="stat-big-value">0</span>
                      <div className="stat-trend-chip down">
                        <ChevronDown size={12} /> 0
                      </div>
                    </div>
                    <div className="stat-date-sub">From Sep 7</div>
                  </div>

                  <div className="stat-item">
                    <div className="stat-label"># Emails opened (bots in...</div>
                    <div className="stat-value-row">
                      <span className="stat-big-value empty">--</span>
                    </div>
                    <div className="stat-date-sub link-style">
                      <span className="blue-link">Enable tracking</span> to view data.
                    </div>
                  </div>

                  <div className="stat-item">
                    <div className="stat-label"># Emails replied</div>
                    <div className="stat-value-row">
                      <span className="stat-big-value">0</span>
                      <div className="stat-trend-chip down">
                        <ChevronDown size={12} /> 0
                      </div>
                    </div>
                    <div className="stat-date-sub">From Sep 7</div>
                  </div>

                  <div className="stat-item">
                    <div className="stat-label">% Emails spam bl...</div>
                    <div className="stat-value-row">
                      <span className="stat-big-value">0%</span>
                      <div className="stat-trend-chip down">
                        <ChevronDown size={12} /> 0%
                      </div>
                    </div>
                    <div className="stat-date-sub">From Sep 7</div>
                  </div>

                </div>
              </div>

              {/* Email Funnel Card */}
              <div className="analytics-card-box full-width">
                <div className="analytics-card-header">
                  <h3 className="analytics-card-title">Email Funnel</h3>
                  <div className="card-header-actions">
                    <button className="card-icon-btn"><Settings size={14} /></button>
                  </div>
                </div>
                <div className="analytics-empty-chart-body">
                  <div className="chart-empty-illustration">
                    <div className="bar-mock"></div>
                    <div className="bar-mock"></div>
                    <div className="bar-mock"></div>
                    <div className="bar-mock"></div>
                  </div>
                  <div className="chart-empty-text">No data available</div>
                </div>
              </div>

              {/* 2-Column Layout for the rest */}
              <div className="analytics-two-col-grid">
                
                {/* Most Effective Email Templates */}
                <div className="analytics-card-box">
                  <div className="analytics-card-header">
                    <h3 className="analytics-card-title">Most Effective Email Templates</h3>
                    <div className="card-header-actions">
                      <button className="card-icon-btn"><SlidersHorizontal size={14} /></button>
                      <button className="card-icon-btn"><Settings size={14} /></button>
                    </div>
                  </div>
                  <div className="analytics-empty-data-body">
                    <LayoutGrid size={24} color="#a1a1aa" className="empty-chart-icon" />
                    <div className="chart-empty-text bold">No data yet</div>
                    <div className="chart-empty-subtext">You'll need to update the combination of metrics, group bys, and filters.</div>
                  </div>
                </div>

                {/* Email Activity By Week */}
                <div className="analytics-card-box">
                  <div className="analytics-card-header">
                    <h3 className="analytics-card-title">Email Activity By Week</h3>
                    <div className="card-header-actions">
                      <button className="card-icon-btn"><Settings size={14} /></button>
                    </div>
                  </div>
                  <div className="analytics-line-chart-mock">
                    <div className="y-axis-labels">
                      <span>3</span>
                      <span>2</span>
                      <span>1</span>
                      <span>0</span>
                    </div>
                    <div className="line-chart-area">
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line"></div>
                      <div className="grid-line last"></div>
                      
                      <div className="chart-zero-line"></div>
                      
                      <div className="x-axis-labels">
                        <span>J...</span><span>J...</span><span>J...</span><span>J...</span><span>J...</span><span>J...</span><span>J...</span><span>J...</span><span>A...</span><span>A...</span><span>A...</span><span>A...</span><span>A...</span><span>S...</span>
                      </div>
                      <div className="x-axis-title">Week</div>
                    </div>
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item"><span className="legend-dot blue"></span>% Emails opened (bots included, tracking enabled)</div>
                    <div className="legend-item"><span className="legend-dot cyan"></span>% Emails replied</div>
                  </div>
                </div>

                {/* Reps with Most Effective Emails */}
                <div className="analytics-card-box">
                  <div className="analytics-card-header">
                    <h3 className="analytics-card-title">Reps with Most Effective Emails</h3>
                    <div className="card-header-actions">
                      <button className="card-icon-btn"><SlidersHorizontal size={14} /></button>
                      <button className="card-icon-btn"><Settings size={14} /></button>
                    </div>
                  </div>
                  <div className="analytics-empty-data-body">
                    <LayoutGrid size={24} color="#a1a1aa" className="empty-chart-icon" />
                    <div className="chart-empty-text bold">No data yet</div>
                    <div className="chart-empty-subtext">You'll need to update the combination of metrics, group bys, and filters.</div>
                  </div>
                </div>

                {/* Most Effective Email Sequences */}
                <div className="analytics-card-box">
                  <div className="analytics-card-header">
                    <h3 className="analytics-card-title">Most Effective Email Sequences</h3>
                    <div className="card-header-actions">
                      <button className="card-icon-btn"><SlidersHorizontal size={14} /></button>
                      <button className="card-icon-btn"><Settings size={14} /></button>
                    </div>
                  </div>
                  <div className="analytics-empty-data-body">
                    <LayoutGrid size={24} color="#a1a1aa" className="empty-chart-icon" />
                    <div className="chart-empty-text bold">No data yet</div>
                    <div className="chart-empty-subtext">You'll need to update the combination of metrics, group bys, and filters.</div>
                  </div>
                </div>

                {/* Most Engaged Personas with Emails */}
                <div className="analytics-card-box">
                  <div className="analytics-card-header">
                    <h3 className="analytics-card-title">Most Engaged Personas with Emails</h3>
                    <div className="card-header-actions">
                      <button className="card-icon-btn"><SlidersHorizontal size={14} /></button>
                      <button className="card-icon-btn"><Settings size={14} /></button>
                    </div>
                  </div>
                  <div className="analytics-empty-data-body">
                    <div className="chart-empty-text bold" style={{ color: '#ef4444' }}>Error:</div>
                    <div className="chart-empty-subtext">Your team does not have any persona to build this report</div>
                  </div>
                </div>

                {/* Most Engaged Company Sizes with Emails */}
                <div className="analytics-card-box">
                  <div className="analytics-card-header">
                    <h3 className="analytics-card-title">Most Engaged Company Sizes with Emails</h3>
                    <div className="card-header-actions">
                      <button className="card-icon-btn"><SlidersHorizontal size={14} /></button>
                      <button className="card-icon-btn"><Settings size={14} /></button>
                    </div>
                  </div>
                  <div className="analytics-empty-data-body">
                    <LayoutGrid size={24} color="#a1a1aa" className="empty-chart-icon" />
                    <div className="chart-empty-text bold">No data yet</div>
                    <div className="chart-empty-subtext">You'll need to update the combination of metrics, group bys, and filters.</div>
                  </div>
                </div>

                {/* Most Engaged Industries With Emails */}
                <div className="analytics-card-box">
                  <div className="analytics-card-header">
                    <h3 className="analytics-card-title">Most Engaged Industries With Emails</h3>
                    <div className="card-header-actions">
                      <button className="card-icon-btn"><SlidersHorizontal size={14} /></button>
                      <button className="card-icon-btn"><Settings size={14} /></button>
                    </div>
                  </div>
                  <div className="analytics-empty-data-body">
                    <LayoutGrid size={24} color="#a1a1aa" className="empty-chart-icon" />
                    <div className="chart-empty-text bold">No data yet</div>
                    <div className="chart-empty-subtext">You'll need to update the combination of metrics, group bys, and filters.</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* ── FLOATING HELP QUESTION MARK BUTTON (1:1 SCREENSHOT) ── */}
      <button 
        className="emails-floating-help-btn"
        title="Help & Documentation"
        onClick={() => showToast('Opening Email Help Documentation...')}
      >
        <span className="help-question-mark">?</span>
      </button>

      {/* ── COMPOSE EMAIL POPUP MODAL ── */}
      {composeModalOpen && (
        <div className="task-modal-backdrop" onClick={() => setComposeModalOpen(false)}>
          <div className="task-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="task-modal-header">
              <h2 className="task-modal-title">New Email</h2>
              <button className="task-modal-close" onClick={() => setComposeModalOpen(false)}>
                <X size={18} color="#71717a" />
              </button>
            </div>

            <div className="task-modal-body">
              <div className="task-form-group">
                <label className="task-form-label required">To</label>
                <input 
                  type="email" 
                  className="task-form-input" 
                  placeholder="Recipient email (e.g. chloe.kim@target.com)" 
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="task-form-group">
                <label className="task-form-label">Subject</label>
                <input 
                  type="text" 
                  className="task-form-input" 
                  placeholder="Email subject" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="task-form-group">
                <label className="task-form-label">Body</label>
                <textarea 
                  className="task-form-textarea" 
                  placeholder="Write your email message..." 
                  rows={5}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                />
              </div>
            </div>

            <div className="task-modal-footer">
              <button 
                type="button" 
                className="task-modal-cancel-btn" 
                onClick={() => setComposeModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="task-modal-create-btn" 
                onClick={handleSendEmail}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 1:1 CREATE EMAIL TEMPLATE MODAL (MATCHING EXACT USER SPECIFIED FIELDS) ── */}
      {createTemplateModalOpen && (
        <div className="task-modal-backdrop" onClick={() => setCreateTemplateModalOpen(false)}>
          <div className="template-editor-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="task-modal-header">
              <h2 className="task-modal-title">Email Template</h2>
              <button className="task-modal-close" onClick={() => setCreateTemplateModalOpen(false)}>
                <X size={18} color="#71717a" />
              </button>
            </div>

            {/* Split 2-Column Body: Form Controls on Left, Template Preview on Right */}
            <div className="template-modal-split-body">
              
              {/* LEFT COLUMN: FORM FIELDS */}
              <div className="template-form-left-col">
                
                {/* Name */}
                <div className="task-form-group">
                  <label className="task-form-label required">Name:</label>
                  <input 
                    type="text" 
                    className="task-form-input"
                    placeholder="Enter template name"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    autoFocus
                  />
                </div>

                {/* Folder with Browse link */}
                <div className="task-form-group">
                  <div className="task-form-label-row">
                    <label className="task-form-label">Folder:</label>
                    <button 
                      type="button"
                      className="task-add-snippet-btn"
                      onClick={() => showToast('Opening Folder Browser...')}
                    >
                      Browse
                    </button>
                  </div>
                  <select 
                    className="task-form-select"
                    value={templateFolder}
                    onChange={(e) => setTemplateFolder(e.target.value)}
                  >
                    <option value="Default Folder">Default Folder</option>
                    <option value="Cold Outreach 2026">Cold Outreach 2026</option>
                    <option value="Follow-up Templates">Follow-up Templates</option>
                  </select>
                </div>

                {/* Tags & Snippets link */}
                <div className="task-form-group">
                  <div className="task-form-label-row">
                    <label className="task-form-label">Tags:</label>
                    <button 
                      type="button"
                      className="task-add-snippet-btn"
                      onClick={() => showToast('Opening Snippet Manager...')}
                    >
                      Create and Edit Snippets
                    </button>
                  </div>
                  <input 
                    type="text" 
                    className="task-form-input"
                    placeholder="sales, outbound, intro"
                    value={templateTags}
                    onChange={(e) => setTemplateTags(e.target.value)}
                  />
                </div>

                {/* Owner (Abhishek Kumar - You) */}
                <div className="task-form-group">
                  <label className="task-form-label">Owner:</label>
                  <select 
                    className="task-form-select"
                    value={templateOwner}
                    onChange={(e) => setTemplateOwner(e.target.value)}
                  >
                    <option value="Abhishek Kumar (You)">Abhishek Kumar (You)</option>
                    <option value="Team Admin">Team Admin</option>
                  </select>
                </div>

                {/* Subject */}
                <div className="task-form-group">
                  <label className="task-form-label">Subject:</label>
                  <input 
                    type="text" 
                    className="task-form-input"
                    placeholder="Enter email subject"
                    value={templateSubject}
                    onChange={(e) => setTemplateSubject(e.target.value)}
                  />
                </div>

                {/* Body Textarea */}
                <div className="task-form-group">
                  <label className="task-form-label">Body:</label>
                  <textarea 
                    className="task-form-textarea"
                    rows={6}
                    placeholder="Write email template content..."
                    value={templateBody}
                    onChange={(e) => setTemplateBody(e.target.value)}
                  />
                </div>

                {/* File Attachment Input */}
                <div className="task-form-group">
                  <label className="task-form-label">Attachment:</label>
                  <div className="file-upload-input-row">
                    <input 
                      type="file" 
                      id="template-file-input"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setAttachedFile(file.name);
                      }}
                    />
                    <button 
                      type="button"
                      className="white-toolbar-btn"
                      onClick={() => document.getElementById('template-file-input').click()}
                    >
                      <Paperclip size={14} />
                      <span>Choose file</span>
                    </button>
                    <span className="file-chosen-text">
                      {attachedFile ? attachedFile : 'No file chosen'}
                    </span>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: TEMPLATE PREVIEW */}
              <div className="template-preview-right-col">
                <h3 className="preview-heading">Template Preview</h3>
                <p className="preview-subtitle-note">
                  This is a preview for an example contact. <span className="blue-link" onClick={() => showToast('Select contact preview modal')}>Click here to generate the preview for a specific contact.</span>
                </p>

                {/* Preview Box */}
                <div className="preview-display-box">
                  <div className="preview-field-row">
                    <span className="preview-label">To:</span>
                    <span className="preview-value">Example Contact &lt;contact.example@apollo-demo.com&gt;</span>
                  </div>

                  <div className="preview-field-row">
                    <span className="preview-label">Subject:</span>
                    <span className="preview-value subject-text">
                      {templateSubject 
                        ? templateSubject.replace('{{company_name}}', 'Acme Corp').replace('{{first_name}}', 'Alex')
                        : '(No subject)'}
                    </span>
                  </div>

                  <div className="preview-body-content">
                    {templateBody 
                      ? templateBody.replace(/{{company_name}}/g, 'Acme Corp').replace(/{{first_name}}/g, 'Alex')
                      : '(No body content)'}
                  </div>
                </div>

                {/* Send Test Email Action Box */}
                <div className="send-test-email-box">
                  <button 
                    type="button"
                    className="view-domains-btn send-test-btn"
                    onClick={handleSendTestEmail}
                  >
                    <Send size={14} />
                    <span>Send Test Email to Me</span>
                  </button>
                  <p className="test-email-note">
                    Tests will deliver from your default mailbox to <strong>abhishek@apollo-user.io</strong>
                  </p>
                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="task-modal-footer">
              <button 
                type="button" 
                className="task-modal-cancel-btn" 
                onClick={() => setCreateTemplateModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="task-modal-create-btn" 
                onClick={handleSaveTemplate}
              >
                Save template
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

