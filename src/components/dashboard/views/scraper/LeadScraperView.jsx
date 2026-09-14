import React, { useState, useEffect } from 'react';
import { 
  Globe, Search, Play, Pause, Square, Download, Plus, CheckCircle2, 
  ExternalLink, Sliders, ShieldCheck, RefreshCw, Database, Terminal, 
  Sparkles, Layers, Building2, User, Phone, Mail, MapPin, Cpu, Check,
  ChevronRight, Filter, AlertCircle, Crown, Zap, CreditCard, Lock
} from 'lucide-react';
import SuperAdminScraperPaymentModal from '../../ai/SuperAdminScraperPaymentModal';
import './LeadScraperView.css';

const INITIAL_SCRAPED_LEADS = [
  {
    id: 'lead-1',
    name: 'Sarah Chen',
    title: 'VP of Engineering',
    company: 'CloudScale AI',
    domain: 'cloudscale.ai',
    email: 'sarah.chen@cloudscale.ai',
    confidence: '99%',
    phone: '+1 (415) 892-4412',
    source: 'linkedin',
    sourceLabel: 'LinkedIn Sales Nav',
    extractedAt: '2 mins ago',
    avatar: 'SC'
  },
  {
    id: 'lead-2',
    name: 'Marcus Vance',
    title: 'Head of Growth Marketing',
    company: 'FinPulse Systems',
    domain: 'finpulse.io',
    email: 'm.vance@finpulse.io',
    confidence: '98%',
    phone: '+1 (617) 502-8819',
    source: 'website',
    sourceLabel: 'Domain Team Crawl',
    extractedAt: '5 mins ago',
    avatar: 'MV'
  },
  {
    id: 'lead-3',
    name: 'Elena Rostova',
    title: 'Chief Technology Officer',
    company: 'Nexus Dynamics',
    domain: 'nexusdynamics.com',
    email: 'elena@nexusdynamics.com',
    confidence: '100%',
    phone: '+1 (206) 773-1029',
    source: 'website',
    sourceLabel: 'Domain Team Crawl',
    extractedAt: '12 mins ago',
    avatar: 'ER'
  },
  {
    id: 'lead-4',
    name: 'David Thorne',
    title: 'Director of RevOps',
    company: 'Datacore Logistics',
    domain: 'datacore.co',
    email: 'david.t@datacore.co',
    confidence: '97%',
    phone: '+1 (512) 441-9920',
    source: 'maps',
    sourceLabel: 'Google Maps Business',
    extractedAt: '18 mins ago',
    avatar: 'DT'
  },
  {
    id: 'lead-5',
    name: 'Aisha Patel',
    title: 'Founder & CEO',
    company: 'Aether Health',
    domain: 'aetherhealth.org',
    email: 'aisha@aetherhealth.org',
    confidence: '99%',
    phone: '+1 (312) 890-5541',
    source: 'linkedin',
    sourceLabel: 'LinkedIn Sales Nav',
    extractedAt: '24 mins ago',
    avatar: 'AP'
  }
];

export default function LeadScraperView({ showToast }) {
  const [sourceTab, setSourceTab] = useState('linkedin'); // 'linkedin' | 'website' | 'maps' | 'tech'
  const [targetInput, setTargetInput] = useState('https://linkedin.com/sales/search/people?keywords=VP+Engineering+San+Francisco');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeProgress, setScrapeProgress] = useState(0);
  const [activeLogLines, setActiveLogLines] = useState([]);
  const [leads, setLeads] = useState(INITIAL_SCRAPED_LEADS);
  const [selectedLeadIds, setSelectedLeadIds] = useState(new Set());
  const [tableSearch, setTableSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');

  // Extraction field toggles
  const [extractOptions, setExtractOptions] = useState({
    emails: true,
    phones: true,
    titles: true,
    techStack: true,
    socials: true
  });

  // Super Admin Unlimited Scraping State
  const [isUnlimitedActive, setIsUnlimitedActive] = useState(() => {
    try {
      return localStorage.getItem('apollo_unlimited_scraping') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const handlePaymentSuccess = (subscription) => {
    setIsUnlimitedActive(true);
    try {
      localStorage.setItem('apollo_unlimited_scraping', 'true');
    } catch (e) {}
    if (showToast) {
      showToast('Super Admin Unlimited Scraping activated! Zero credit limits.');
    }
  };

  const handleSourceTabChange = (tabKey) => {
    setSourceTab(tabKey);
    if (tabKey === 'linkedin') {
      setTargetInput('https://linkedin.com/sales/search/people?keywords=VP+Engineering+San+Francisco');
    } else if (tabKey === 'website') {
      setTargetInput('stripe.com, figma.com, notion.so');
    } else if (tabKey === 'maps') {
      setTargetInput('SaaS software companies in Austin, Texas');
    } else if (tabKey === 'tech') {
      setTargetInput('Shopify Plus stores with >$5M ARR');
    }
  };

  const handleToggleOption = (key) => {
    setExtractOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Launch Simulated Scrape Job
  const handleLaunchScrape = () => {
    if (!targetInput.trim()) {
      if (showToast) showToast('Please enter a target URL or search query');
      return;
    }

    setIsScraping(true);
    setScrapeProgress(10);
    setActiveLogLines([
      `[${new Date().toLocaleTimeString()}] Initializing stealth headless browser cluster...`,
      `[${new Date().toLocaleTimeString()}] Dispatching task through rotating residential proxy pool...`,
      `[${new Date().toLocaleTimeString()}] Connecting to target: ${targetInput.slice(0, 48)}...`
    ]);

    if (showToast) showToast('Scraper dispatched! Live extraction in progress.');
  };

  // Simulation timer for progress bar & logs
  useEffect(() => {
    let timer;
    if (isScraping && scrapeProgress < 100) {
      timer = setTimeout(() => {
        setScrapeProgress(prev => {
          const next = prev + 30;
          if (next >= 100) {
            setIsScraping(false);
            // Append newly scraped record
            const newLead = {
              id: `lead-${Date.now()}`,
              name: sourceTab === 'maps' ? 'Jonathan Miller' : 'Rachel Adams',
              title: sourceTab === 'maps' ? 'Managing Partner' : 'VP of Product Innovation',
              company: sourceTab === 'maps' ? 'Miller & Co Ventures' : 'HyperScale Labs',
              domain: sourceTab === 'maps' ? 'millerventures.com' : 'hyperscalelabs.io',
              email: sourceTab === 'maps' ? 'jmiller@millerventures.com' : 'rachel.adams@hyperscalelabs.io',
              confidence: '99%',
              phone: '+1 (415) 302-9988',
              source: sourceTab,
              sourceLabel: sourceTab === 'linkedin' ? 'LinkedIn Sales Nav' : sourceTab === 'website' ? 'Domain Team Crawl' : 'Google Maps',
              extractedAt: 'Just now',
              avatar: sourceTab === 'maps' ? 'JM' : 'RA'
            };
            setLeads(prevLeads => [newLead, ...prevLeads]);
            setActiveLogLines(prev => [
              ...prev,
              `[${new Date().toLocaleTimeString()}] Extracted verified contact: ${newLead.name} (${newLead.email})`,
              `[${new Date().toLocaleTimeString()}] Completed extraction run with 100% deliverability check.`
            ]);
            if (showToast) showToast(`Scrape completed! Extracted fresh leads for ${newLead.company}.`);
            return 100;
          }
          setActiveLogLines(prev => [
            ...prev,
            `[${new Date().toLocaleTimeString()}] Crawled depth level 2 • Parsed DOM elements • Bypassed challenge: OK`
          ]);
          return next;
        });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isScraping, scrapeProgress, sourceTab, showToast]);

  const handleToggleSelectAll = () => {
    if (selectedLeadIds.size === leads.length) {
      setSelectedLeadIds(new Set());
    } else {
      setSelectedLeadIds(new Set(leads.map(l => l.id)));
    }
  };

  const handleToggleSelectLead = (id) => {
    setSelectedLeadIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleExportCSV = () => {
    const leadsToExport = selectedLeadIds.size > 0 
      ? leads.filter(l => selectedLeadIds.has(l.id))
      : leads;

    const headers = 'Name,Title,Company,Domain,Email,Phone,Confidence,Source,ExtractedAt\n';
    const rows = leadsToExport.map(l => 
      `"${l.name}","${l.title}","${l.company}","${l.domain}","${l.email}","${l.phone}","${l.confidence}","${l.sourceLabel}","${l.extractedAt}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `apollo_scraped_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (showToast) showToast(`Exported ${leadsToExport.length} scraped leads to CSV!`);
  };

  const handlePushToSequence = () => {
    const count = selectedLeadIds.size || leads.length;
    if (showToast) showToast(`Pushed ${count} leads into automated outbound sequence!`);
  };

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      lead.company.toLowerCase().includes(tableSearch.toLowerCase()) ||
      lead.title.toLowerCase().includes(tableSearch.toLowerCase()) ||
      lead.email.toLowerCase().includes(tableSearch.toLowerCase());
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  return (
    <div className="dash-view-content apollo-scraper-view">
      
      {/* ── 1. Top Header ── */}
      <div className="scraper-header">
        <div className="scraper-title-group">
          <h1>
            Web & Social Scraper
            <span className="scraper-live-badge">LIVE ENGINE</span>
          </h1>
          <p className="scraper-subtitle">
            Extract fresh verified leads, team rosters, and decision-maker contact details on-demand directly from LinkedIn, websites, and directories.
          </p>
        </div>

        <div className="scraper-header-actions">
          {!isUnlimitedActive ? (
            <button 
              className="scraper-btn-super-admin"
              onClick={() => setPaymentModalOpen(true)}
              title="Super Admin: Unlock Unlimited Scraping"
            >
              <Zap size={15} className="super-admin-zap-icon" />
              <span>Unlock Unlimited (Super Admin)</span>
            </button>
          ) : (
            <div className="scraper-unlimited-active-badge">
              <ShieldCheck size={14} />
              <span>Super Admin Unlimited Active</span>
            </div>
          )}

          <button className="scraper-btn-secondary" onClick={handleExportCSV}>
            <Download size={15} />
            <span>Export CSV</span>
          </button>
          <button className="scraper-btn-primary" onClick={handleLaunchScrape} disabled={isScraping}>
            {isScraping ? <RefreshCw size={15} className="spin" /> : <Play size={15} fill="currentColor" />}
            <span>{isScraping ? 'Extracting...' : 'New Scrape Task'}</span>
          </button>
        </div>
      </div>

      {/* ── Super Admin Unlimited Scraping Upgrade Banner ── */}
      {!isUnlimitedActive ? (
        <div className="scraper-super-admin-banner">
          <div className="banner-left">
            <div className="super-admin-tag">
              <Crown size={13} /> SUPER ADMIN ADD-ON
            </div>
            <div className="banner-text">
              <h4>Scale Lead Generation with Unlimited Scraping Engine</h4>
              <p>
                Extract thousands of verified profiles across LinkedIn Sales Nav, Google Maps, and company domains with 100+ rotating residential proxies. $149/mo or $1,490/yr with Corporate Invoice (Net-30) or Card options.
              </p>
            </div>
          </div>
          <div className="banner-right">
            <button 
              className="btn-banner-activate"
              onClick={() => setPaymentModalOpen(true)}
            >
              <Zap size={14} />
              <span>Activate Unlimited Scraping</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="scraper-super-admin-banner active-mode">
          <div className="banner-left">
            <div className="super-admin-tag active">
              <ShieldCheck size={13} /> SUPER ADMIN UNLIMITED ENGINE ACTIVE
            </div>
            <div className="banner-text">
              <h4>Unthrottled High-Concurrency Scraping Enabled</h4>
              <p>
                Your workspace has unlimited record extraction, zero rate-limit blocks, and dedicated residential IP rotators.
              </p>
            </div>
          </div>
          <div className="banner-right">
            <button 
              className="btn-banner-manage"
              onClick={() => setPaymentModalOpen(true)}
            >
              <CreditCard size={14} />
              <span>Manage Billing / Invoice</span>
            </button>
          </div>
        </div>
      )}

      {/* ── 2. KPI Metrics Row ── */}
      <div className="scraper-stats-grid">
        <div className="scraper-stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Leads Scraped Today</span>
            <div className="stat-card-icon"><Database size={15} /></div>
          </div>
          <div className="stat-card-value">{leads.length * 284}</div>
          <div className="stat-card-sub"><CheckCircle2 size={13} /> +18.4% vs last week</div>
        </div>

        <div className="scraper-stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Verified Email Rate</span>
            <div className="stat-card-icon"><ShieldCheck size={15} /></div>
          </div>
          <div className="stat-card-value">98.6%</div>
          <div className="stat-card-sub"><Sparkles size={13} /> Zero-bounce guarantee</div>
        </div>

        <div className="scraper-stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Active Proxy Workers</span>
            <div className="stat-card-icon"><Globe size={15} /></div>
          </div>
          <div className="stat-card-value">16 / 16</div>
          <div className="stat-card-sub"><CheckCircle2 size={13} /> Rotating residential IP</div>
        </div>

        <div className="scraper-stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Scraper Credits</span>
            <div className="stat-card-icon"><Cpu size={15} /></div>
          </div>
          <div className="stat-card-value">
            {isUnlimitedActive ? '∞ Unlimited' : '8,420'}
          </div>
          {isUnlimitedActive ? (
            <div className="stat-card-sub text-green">
              <ShieldCheck size={13} /> Super Admin Unmetered
            </div>
          ) : (
            <div 
              className="stat-card-sub click-upgrade" 
              onClick={() => setPaymentModalOpen(true)}
              style={{ cursor: 'pointer', color: '#B45309' }}
            >
              <Zap size={13} /> Upgrade to Unlimited (Super Admin)
            </div>
          )}
        </div>
      </div>

      {/* ── 3. Interactive Scraper Configuration Studio Panel ── */}
      <div className="scraper-config-panel">
        <div className="config-sources-tabs">
          <button 
            type="button" 
            className={`config-source-btn ${sourceTab === 'linkedin' ? 'active' : ''}`}
            onClick={() => handleSourceTabChange('linkedin')}
          >
            <User size={15} />
            <span>LinkedIn / Sales Nav</span>
          </button>

          <button 
            type="button" 
            className={`config-source-btn ${sourceTab === 'website' ? 'active' : ''}`}
            onClick={() => handleSourceTabChange('website')}
          >
            <Globe size={15} />
            <span>Domain & Team Crawler</span>
          </button>

          <button 
            type="button" 
            className={`config-source-btn ${sourceTab === 'maps' ? 'active' : ''}`}
            onClick={() => handleSourceTabChange('maps')}
          >
            <MapPin size={15} />
            <span>Google Maps Directory</span>
          </button>

          <button 
            type="button" 
            className={`config-source-btn ${sourceTab === 'tech' ? 'active' : ''}`}
            onClick={() => handleSourceTabChange('tech')}
          >
            <Cpu size={15} />
            <span>Tech Stack & Footprint</span>
          </button>
        </div>

        {/* Input & Launch Button */}
        <div className="config-inputs-grid">
          <div className="target-input-wrap">
            <Search size={16} className="target-input-icon" />
            <input 
              type="text" 
              className="target-input-field" 
              placeholder={
                sourceTab === 'linkedin' ? 'Paste LinkedIn profile, Sales Nav search URL, or company directory URL...' :
                sourceTab === 'website' ? 'Enter domains separated by comma (e.g. stripe.com, figma.com)...' :
                sourceTab === 'maps' ? 'Search query + location (e.g. SaaS companies in Austin, TX)...' :
                'Enter technology keyword (e.g. Shopify, Salesforce, AWS)...'
              }
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleLaunchScrape(); }}
            />
          </div>

          <button 
            type="button" 
            className="run-scrape-btn" 
            onClick={handleLaunchScrape}
            disabled={isScraping}
          >
            {isScraping ? <RefreshCw size={15} className="spin" /> : <Play size={15} fill="currentColor" />}
            <span>{isScraping ? 'Extracting Data...' : 'Run Scraper'}</span>
          </button>
        </div>

        {/* Extraction Filters & Proxy Health Status */}
        <div className="config-options-row">
          <div className="extraction-toggles">
            <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#374151', marginRight: '4px' }}>
              Extract Fields:
            </span>
            <label className="toggle-chip">
              <input 
                type="checkbox" 
                checked={extractOptions.emails} 
                onChange={() => handleToggleOption('emails')} 
              />
              Verified Emails
            </label>
            <label className="toggle-chip">
              <input 
                type="checkbox" 
                checked={extractOptions.phones} 
                onChange={() => handleToggleOption('phones')} 
              />
              Direct Phone Numbers
            </label>
            <label className="toggle-chip">
              <input 
                type="checkbox" 
                checked={extractOptions.titles} 
                onChange={() => handleToggleOption('titles')} 
              />
              Executive Titles
            </label>
            <label className="toggle-chip">
              <input 
                type="checkbox" 
                checked={extractOptions.techStack} 
                onChange={() => handleToggleOption('techStack')} 
              />
              Tech Stack
            </label>
          </div>

          <div className="proxy-status-pill">
            <div className="status-dot"></div>
            <span>Anti-CAPTCHA & Stealth Proxies Enabled</span>
          </div>
        </div>
      </div>

      {/* ── 4. Live Scraper Activity Box (Active or Logs) ── */}
      {(isScraping || activeLogLines.length > 0) && (
        <div className="live-crawler-box">
          <div className="crawler-header-row">
            <div className="crawler-title-wrap">
              <Terminal size={16} color="#34D399" />
              <span>
                {isScraping ? `Live Extraction: ${scrapeProgress}% complete` : 'Last Extraction Run Completed'}
              </span>
            </div>
            <div className="crawler-controls">
              {isScraping && (
                <button 
                  type="button" 
                  className="crawler-ctrl-btn"
                  onClick={() => setIsScraping(false)}
                >
                  <Square size={12} fill="currentColor" style={{ marginRight: '4px' }} /> Stop
                </button>
              )}
            </div>
          </div>

          <div className="crawler-progress-bar-bg">
            <div 
              className="crawler-progress-bar-fill" 
              style={{ width: `${scrapeProgress}%` }}
            />
          </div>

          <div className="crawler-terminal-logs">
            {activeLogLines.map((line, idx) => (
              <div key={idx} className="crawler-log-line">
                <ChevronRight size={12} color="#34D399" />
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5. Scraped Leads Data Table ── */}
      <div className="scraped-leads-card">
        <div className="table-toolbar">
          <div className="toolbar-left">
            <div className="table-search-wrap">
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input 
                type="text" 
                className="table-search-input" 
                placeholder="Search scraped leads..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
              />
            </div>

            <select 
              className="table-filter-select"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              <option value="all">All Extraction Sources</option>
              <option value="linkedin">LinkedIn Sales Nav</option>
              <option value="website">Domain Team Crawl</option>
              <option value="maps">Google Maps Directory</option>
            </select>
          </div>

          <div className="toolbar-right">
            {selectedLeadIds.size > 0 && (
              <button className="scraper-btn-primary" onClick={handlePushToSequence} style={{ padding: '6px 12px', fontSize: '13px' }}>
                <Play size={13} fill="currentColor" />
                <span>Push {selectedLeadIds.size} to Sequence</span>
              </button>
            )}
            <button className="scraper-btn-secondary" onClick={handleExportCSV} style={{ padding: '6px 12px', fontSize: '13px' }}>
              <Download size={13} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="leads-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedLeadIds.size === filteredLeads.length && filteredLeads.length > 0}
                    onChange={handleToggleSelectAll}
                  />
                </th>
                <th>Contact Name & Title</th>
                <th>Company & Domain</th>
                <th>Extracted Email</th>
                <th>Phone Number</th>
                <th>Extraction Source</th>
                <th>Scraped</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '36px', color: '#6B7280' }}>
                    No scraped leads matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map(lead => {
                  const isSelected = selectedLeadIds.has(lead.id);
                  return (
                    <tr key={lead.id} style={isSelected ? { backgroundColor: '#F8FAFC' } : {}}>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => handleToggleSelectLead(lead.id)}
                        />
                      </td>

                      <td>
                        <div className="contact-cell">
                          <div className="contact-avatar">{lead.avatar}</div>
                          <div>
                            <div className="contact-info-name">{lead.name}</div>
                            <div className="contact-info-title">{lead.title}</div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="company-cell-name">{lead.company}</div>
                        <div className="company-cell-domain">{lead.domain}</div>
                      </td>

                      <td>
                        <span className="email-pill-verified">
                          <CheckCircle2 size={12} />
                          {lead.email}
                        </span>
                      </td>

                      <td style={{ color: '#4B5563', fontSize: '13px' }}>
                        {lead.phone}
                      </td>

                      <td>
                        <span className={`source-badge ${lead.source}`}>
                          {lead.sourceLabel}
                        </span>
                      </td>

                      <td style={{ color: '#9CA3AF', fontSize: '12.5px' }}>
                        {lead.extractedAt}
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <button 
                          className="table-action-btn"
                          onClick={() => {
                            if (showToast) showToast(`Added ${lead.name} to sequence!`);
                          }}
                        >
                          Sequence
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Super Admin Payment Modal ── */}
      <SuperAdminScraperPaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
