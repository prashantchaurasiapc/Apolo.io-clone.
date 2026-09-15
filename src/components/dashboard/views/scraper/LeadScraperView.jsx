import React, { useState, useEffect } from 'react';
import { 
  Globe, Search, Play, Square, Download, Plus, CheckCircle2, 
  Sliders, ShieldCheck, RefreshCw, Database, Terminal, 
  Sparkles, Building2, User, Mail, MapPin, Cpu, ChevronRight, AlertCircle, Crown, Zap, CreditCard, Code2, Briefcase, Flame, ShoppingBag, Bot, Radio, X, FileCode
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
  },
  {
    id: 'lead-6',
    name: 'Devon Brooks',
    title: 'Principal Infrastructure Architect',
    company: 'Vercel / Next.js Core',
    domain: 'vercel.com',
    email: 'devon@brooks-labs.dev',
    confidence: '100%',
    phone: '+1 (415) 902-8812',
    source: 'github',
    sourceLabel: 'GitHub Repo Crawl',
    extractedAt: '31 mins ago',
    avatar: 'DB'
  },
  {
    id: 'lead-7',
    name: 'Maya Lindqvist',
    title: 'Head of Talent Acquisition',
    company: 'DataDog Enterprise',
    domain: 'datadoghq.com',
    email: 'maya.l@datadoghq.com',
    confidence: '99%',
    phone: '+1 (212) 840-2219',
    source: 'hiring',
    sourceLabel: 'Careers / ATS Crawl',
    extractedAt: '38 mins ago',
    avatar: 'ML'
  },
  {
    id: 'lead-8',
    name: 'Julian Vance',
    title: 'VP of Commercial Sales',
    company: 'Stratos Cloud',
    domain: 'stratoscloud.com',
    email: 'julian@stratoscloud.com',
    confidence: '98%',
    phone: '+1 (415) 670-3341',
    source: 'social_intent',
    sourceLabel: 'X / Social Intent Signal',
    extractedAt: '45 mins ago',
    avatar: 'JV'
  },
  {
    id: 'lead-9',
    name: 'Chloe Dupont',
    title: 'Head of E-Commerce Growth',
    company: 'Modern Luxe Brands',
    domain: 'modernluxe.co',
    email: 'chloe@modernluxe.co',
    confidence: '97%',
    phone: '+1 (213) 980-4412',
    source: 'ecommerce',
    sourceLabel: 'Shopify Storefront Crawl',
    extractedAt: '52 mins ago',
    avatar: 'CD'
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
    } catch  {
      return false;
    }
  });
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Future Features / AI Sandbox State
  const [sandboxModalOpen, setSandboxModalOpen] = useState(false);
  const [sandboxPrompt, setSandboxPrompt] = useState('Extract all VP of Sales at Series B B2B SaaS companies in New York hiring 10+ engineers this month');
  const [isSandboxRunning, setIsSandboxRunning] = useState(false);
  const [sandboxLogs, setSandboxLogs] = useState([]);
  const [sandboxOutput, setSandboxOutput] = useState(null);

  const handlePaymentSuccess = (subscription) => {
    setIsUnlimitedActive(true);
    try {
      localStorage.setItem('apollo_unlimited_scraping', 'true');
    } catch  {}
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
    } else if (tabKey === 'github') {
      setTargetInput('https://github.com/vercel/next.js');
    } else if (tabKey === 'hiring') {
      setTargetInput('https://boards.greenhouse.io/datadog/jobs');
    } else if (tabKey === 'social_intent') {
      setTargetInput('"switching from hubspot" OR "apollo alternative"');
    } else if (tabKey === 'ecommerce') {
      setTargetInput('allbirds.com, gymshark.com, glossier.com');
    }
  };

  const handleToggleOption = (key) => {
    setExtractOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRequestBeta = (featureName) => {
    if (showToast) {
      showToast(`Priority access requested for ${featureName}! Our engineering team will enable it for your workspace.`);
    }
  };

  const handleOpenSandbox = () => {
    setSandboxModalOpen(true);
    if (sandboxLogs.length === 0) {
      setSandboxLogs([
        `[Ready] Kiaan Deep Crawl 2.0 Autonomous Agent initialized.`,
        `[Ready] Awaiting natural language crawler intent...`
      ]);
    }
  };

  const handleRunSandboxSimulation = () => {
    setIsSandboxRunning(true);
    setSandboxLogs([
      `[${new Date().toLocaleTimeString()}] Parsing natural language prompt: "${sandboxPrompt}"...`,
      `[${new Date().toLocaleTimeString()}] Translating prompt into autonomous browser task graph...`,
      `[${new Date().toLocaleTimeString()}] Spawning headless browser cluster with residential IP rotators...`
    ]);

    setTimeout(() => {
      setSandboxLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Navigating target directories & evaluating DOM structure...`,
        `[${new Date().toLocaleTimeString()}] Identified dynamic pagination & hiring signal badges on target profiles...`
      ]);
    }, 900);

    setTimeout(() => {
      const generatedResult = [
        {
          name: 'Marcus Vance',
          title: 'VP of Commercial Sales',
          company: 'FinPulse Systems (Series B)',
          location: 'New York, NY',
          verifiedEmail: 'm.vance@finpulse.io',
          hiringSignals: 'Hiring 14 Engineers (Greenhouse)',
          confidence: '99%'
        },
        {
          name: 'Elena Rostova',
          title: 'Head of Enterprise Revenue',
          company: 'Nexus Dynamics (Series B)',
          location: 'New York, NY',
          verifiedEmail: 'elena.r@nexusdynamics.com',
          hiringSignals: 'Hiring 18 Engineers (Lever)',
          confidence: '98%'
        },
        {
          name: 'Adrian Sterling',
          title: 'VP of Global Business Development',
          company: 'Datacore Logistics',
          location: 'New York, NY',
          verifiedEmail: 'a.sterling@datacore.co',
          hiringSignals: 'Hiring 11 Engineers (Workday)',
          confidence: '97%'
        }
      ];
      setSandboxOutput(generatedResult);
      setSandboxLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Agent synthesized 3 high-confidence lead entities matching criteria.`,
        `[${new Date().toLocaleTimeString()}] Execution completed successfully in 1.8s.`
      ]);
      setIsSandboxRunning(false);
      if (showToast) showToast('AI Sandbox crawl completed! Structured leads generated.');
    }, 2000);
  };

  const handlePushSandboxLeadsToTable = () => {
    if (!sandboxOutput || sandboxOutput.length === 0) return;
    const newItems = sandboxOutput.map((item, idx) => ({
      id: `lead-sandbox-${Date.now()}-${idx}`,
      name: item.name,
      title: item.title,
      company: item.company,
      domain: item.verifiedEmail.split('@')[1] || 'domain.com',
      email: item.verifiedEmail,
      confidence: item.confidence,
      phone: '+1 (212) 555-' + Math.floor(1000 + Math.random() * 9000),
      source: 'social_intent',
      sourceLabel: 'AI Autonomous Deep Crawl',
      extractedAt: 'Just now',
      avatar: item.name.split(' ').map(n => n[0]).join('')
    }));

    setLeads(prev => [...newItems, ...prev]);
    setSandboxModalOpen(false);
    if (showToast) showToast(`Added ${newItems.length} AI-extracted leads to your active table!`);
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
            // Append newly scraped record based on source
            let newLead;
            if (sourceTab === 'github') {
              newLead = {
                id: `lead-${Date.now()}`,
                name: 'Felix Sommer',
                title: 'Core Runtime Contributor',
                company: 'Supabase / Open Source',
                domain: 'supabase.com',
                email: 'felix.s@supabase.io',
                confidence: '99%',
                phone: '+1 (415) 789-2244',
                source: 'github',
                sourceLabel: 'GitHub Repo Crawl',
                extractedAt: 'Just now',
                avatar: 'FS'
              };
            } else if (sourceTab === 'hiring') {
              newLead = {
                id: `lead-${Date.now()}`,
                name: 'Kavita Raman',
                title: 'VP of Global Talent Acquisition',
                company: 'Figma Cloud Inc.',
                domain: 'figma.com',
                email: 'k.raman@figma.com',
                confidence: '98%',
                phone: '+1 (415) 332-9011',
                source: 'hiring',
                sourceLabel: 'Careers / ATS Crawl',
                extractedAt: 'Just now',
                avatar: 'KR'
              };
            } else if (sourceTab === 'social_intent') {
              newLead = {
                id: `lead-${Date.now()}`,
                name: 'Brett Callaghan',
                title: 'Chief Revenue Officer',
                company: 'Veloce Data Systems',
                domain: 'velocedata.com',
                email: 'bcallaghan@velocedata.com',
                confidence: '99%',
                phone: '+1 (650) 441-9288',
                source: 'social_intent',
                sourceLabel: 'X / Social Intent Signal',
                extractedAt: 'Just now',
                avatar: 'BC'
              };
            } else if (sourceTab === 'ecommerce') {
              newLead = {
                id: `lead-${Date.now()}`,
                name: 'Sophie Martinez',
                title: 'Head of Direct-to-Consumer',
                company: 'Oasis Apparel Brands',
                domain: 'oasisapparel.co',
                email: 'sophie@oasisapparel.co',
                confidence: '97%',
                phone: '+1 (213) 980-4412',
                source: 'ecommerce',
                sourceLabel: 'Shopify Storefront Crawl',
                extractedAt: 'Just now',
                avatar: 'SM'
              };
            } else {
              newLead = {
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
            }
            setLeads(prevLeads => [newLead, ...prevLeads]);
            setActiveLogLines(prev => [
              ...prev,
              `[${new Date().toLocaleTimeString()}] Extracted verified contact: ${newLead.name} (${newLead.email})`,
              `[${new Date().toLocaleTimeString()}] Extraction job complete. 1 new verified lead added to table.`
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
      }, 900);
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
            <span>Tech Stack Footprint</span>
          </button>

          <button 
            type="button" 
            className={`config-source-btn ${sourceTab === 'github' ? 'active' : ''}`}
            onClick={() => handleSourceTabChange('github')}
          >
            <Code2 size={15} />
            <span>GitHub & Dev Talent</span>
            <span className="source-mini-badge new">NEW</span>
          </button>

          <button 
            type="button" 
            className={`config-source-btn ${sourceTab === 'hiring' ? 'active' : ''}`}
            onClick={() => handleSourceTabChange('hiring')}
          >
            <Briefcase size={15} />
            <span>Hiring Signals & Careers</span>
            <span className="source-mini-badge new">NEW</span>
          </button>

          <button 
            type="button" 
            className={`config-source-btn ${sourceTab === 'social_intent' ? 'active' : ''}`}
            onClick={() => handleSourceTabChange('social_intent')}
          >
            <Flame size={15} />
            <span>Social Intent & X</span>
            <span className="source-mini-badge beta">BETA</span>
          </button>

          <button 
            type="button" 
            className={`config-source-btn ${sourceTab === 'ecommerce' ? 'active' : ''}`}
            onClick={() => handleSourceTabChange('ecommerce')}
          >
            <ShoppingBag size={15} />
            <span>E-Commerce & DTC</span>
            <span className="source-mini-badge new">NEW</span>
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
                sourceTab === 'tech' ? 'Enter technology keyword (e.g. Shopify, Salesforce, AWS)...' :
                sourceTab === 'github' ? 'Enter GitHub repository URL or organization (e.g. github.com/vercel/next.js)...' :
                sourceTab === 'hiring' ? 'Enter careers board or ATS URL (e.g. boards.greenhouse.io/datadog/jobs)...' :
                sourceTab === 'social_intent' ? 'Enter intent keywords or competitor complaints (e.g. "switching from hubspot")...' :
                'Enter Shopify / WooCommerce store domains or DTC niche...'
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
              <option value="github">GitHub & Dev Talent</option>
              <option value="hiring">Hiring Signals & Careers</option>
              <option value="social_intent">Social Intent & X</option>
              <option value="ecommerce">E-Commerce & DTC</option>
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

      {/* ── 6. Kiaan Scraping Labs & Future Capabilities ── */}
      <div className="scraper-labs-section">
        <div className="labs-header">
          <div className="labs-title-group">
            <div className="labs-pill">
              <Sparkles size={13} /> KIAAN SCRAPING LABS
            </div>
            <h2>Next-Gen Scraping Engine Roadmap</h2>
            <p>
              Explore upcoming autonomous scraping capabilities, real-time lead pipelines, and AI agent crawlers currently in development by Kiaan.
            </p>
          </div>
          <div className="labs-header-action">
            <button 
              type="button" 
              className="btn-labs-sandbox"
              onClick={handleOpenSandbox}
            >
              <Bot size={15} />
              <span>Launch AI Crawler Sandbox</span>
            </button>
          </div>
        </div>

        <div className="labs-cards-grid">
          
          {/* Card 1: AI Autonomous Agent */}
          <div className="labs-card">
            <div className="labs-card-top">
              <div className="labs-card-icon" style={{ background: '#FEF3C7', color: '#92400E' }}>
                <Bot size={20} />
              </div>
              <span className="labs-status-pill beta">BETA PREVIEW</span>
            </div>
            <h3>AI Autonomous Web Agent (Deep Crawl 2.0)</h3>
            <p>
              Natural language prompt-to-dataset crawler. Autonomous AI agents navigate complex single-page apps (SPAs), resolve dynamic pagination, and synthesize verified lead records without manual selector writing.
            </p>
            <div className="labs-card-tags">
              <span>Dynamic DOM Parsing</span>
              <span>Self-Healing Selectors</span>
              <span>LLM Structuring</span>
            </div>
            <div className="labs-card-footer">
              <button className="labs-btn-action" onClick={handleOpenSandbox}>
                <span>Try Sandbox Preview</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Card 2: Competitor Churn Scraper */}
          <div className="labs-card">
            <div className="labs-card-top">
              <div className="labs-card-icon" style={{ background: '#FEE2E2', color: '#B91C1C' }}>
                <Flame size={20} />
              </div>
              <span className="labs-status-pill coming">COMING Q4 2026</span>
            </div>
            <h3>Competitor Churn & Dissatisfaction Scraper</h3>
            <p>
              Monitors negative reviews on G2, Capterra, and Trustpilot. Extracts author company details and identifies dissatisfied accounts actively seeking alternative vendors to trigger targeted outreach.
            </p>
            <div className="labs-card-tags">
              <span>Review Sentiment NLP</span>
              <span>Account Matching</span>
              <span>Buyer Discontent Signals</span>
            </div>
            <div className="labs-card-footer">
              <button 
                className="labs-btn-action"
                onClick={() => handleRequestBeta('Competitor Churn & Dissatisfaction Scraper')}
              >
                <span>Request Early Access</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Card 3: Real-Time Webhook Pipeline */}
          <div className="labs-card">
            <div className="labs-card-top">
              <div className="labs-card-icon" style={{ background: '#E0E7FF', color: '#3730A3' }}>
                <Radio size={20} />
              </div>
              <span className="labs-status-pill coming">COMING Q4 2026</span>
            </div>
            <h3>Continuous Webhook & Event Stream Pipeline</h3>
            <p>
              Automated 24/7 background monitors watching target company directories. Instantly emits HTTP webhooks to Salesforce, HubSpot, and Slack whenever new executives or engineering leads are appointed.
            </p>
            <div className="labs-card-tags">
              <span>Zero-Poll Webhooks</span>
              <span>Diff Detection</span>
              <span>Direct CRM Streaming</span>
            </div>
            <div className="labs-card-footer">
              <button 
                className="labs-btn-action"
                onClick={() => handleRequestBeta('Continuous Webhook & Event Stream Pipeline')}
              >
                <span>Request Early Access</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Card 4: Multi-Region Canvas & TLS Mimicking */}
          <div className="labs-card">
            <div className="labs-card-top">
              <div className="labs-card-icon" style={{ background: '#DCFCE7', color: '#166534' }}>
                <ShieldCheck size={20} />
              </div>
              <span className="labs-status-pill live">SUPER ADMIN LABS</span>
            </div>
            <h3>Canvas & TLS Hardware Fingerprint Mimicking</h3>
            <p>
              Advanced bot detection bypass utilizing real mobile 4G/5G proxy backbones and randomized browser WebGL canvas profiles to eliminate Cloudflare and Akamai captcha challenges on high-security targets.
            </p>
            <div className="labs-card-tags">
              <span>Hardware Spoofing</span>
              <span>4G/5G Carrier IP</span>
              <span>99.9% Bypass Rate</span>
            </div>
            <div className="labs-card-footer">
              <button 
                className="labs-btn-action"
                onClick={() => handleRequestBeta('Canvas & TLS Hardware Fingerprint Mimicking')}
              >
                <span>View Architecture</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Interactive AI Sandbox Modal ── */}
      {sandboxModalOpen && (
        <div className="sandbox-modal-overlay" onClick={() => setSandboxModalOpen(false)}>
          <div className="sandbox-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="sandbox-modal-close" onClick={() => setSandboxModalOpen(false)}>
              <X size={18} />
            </button>

            <div className="sandbox-modal-header">
              <div className="sandbox-modal-badge">
                <Bot size={13} /> KIAAN DEEP CRAWL 2.0 SANDBOX
              </div>
              <h2>Natural Language Web Scraper Engine</h2>
              <p>Test prompt-to-data autonomous extraction with self-healing DOM navigation.</p>
            </div>

            <div className="sandbox-prompt-area">
              <label>Crawler Natural Language Objective:</label>
              <div className="sandbox-prompt-input-row">
                <input 
                  type="text"
                  value={sandboxPrompt}
                  onChange={(e) => setSandboxPrompt(e.target.value)}
                  placeholder="Describe who and what you want the AI crawler to extract..."
                  className="sandbox-input-box"
                />
                <button 
                  className="btn-run-sandbox"
                  onClick={handleRunSandboxSimulation}
                  disabled={isSandboxRunning}
                >
                  {isSandboxRunning ? <RefreshCw size={14} className="spin" /> : <Play size={14} fill="currentColor" />}
                  <span>{isSandboxRunning ? 'Agent Crawling...' : 'Run Agent Crawl'}</span>
                </button>
              </div>

              {/* Sample Prompts */}
              <div className="sandbox-prompt-chips">
                <span className="chips-label">Try sample:</span>
                <button 
                  type="button" 
                  className="prompt-chip" 
                  onClick={() => setSandboxPrompt('Find all VP of Sales at Series B B2B SaaS companies in New York hiring 10+ engineers')}
                >
                  VP Sales @ NYC Series B
                </button>
                <button 
                  type="button" 
                  className="prompt-chip" 
                  onClick={() => setSandboxPrompt('Extract core open-source committers of Next.js and Supabase with personal GitHub emails')}
                >
                  GitHub OSS Core Committers
                </button>
                <button 
                  type="button" 
                  className="prompt-chip" 
                  onClick={() => setSandboxPrompt('Identify founders of top 100 fastest-growing Shopify Plus beauty brands')}
                >
                  Shopify Plus Founders
                </button>
              </div>
            </div>

            {/* Terminal Logs */}
            <div className="sandbox-terminal-box">
              <div className="sandbox-terminal-bar">
                <Terminal size={14} color="#34D399" />
                <span>Autonomous Agent DOM Execution Traces</span>
              </div>
              <div className="sandbox-terminal-output">
                {sandboxLogs.map((log, i) => (
                  <div key={i} className="terminal-trace-line">
                    <ChevronRight size={11} color="#34D399" />
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Extracted JSON Preview */}
            {sandboxOutput && (
              <div className="sandbox-result-area">
                <div className="sandbox-result-header">
                  <div className="result-title">
                    <CheckCircle2 size={14} color="#16A34A" />
                    <span>Extracted Dataset Preview (3 Records Synthesized)</span>
                  </div>
                  <button className="btn-add-table" onClick={handlePushSandboxLeadsToTable}>
                    <Plus size={13} />
                    <span>Import to Leads Table</span>
                  </button>
                </div>
                <pre className="sandbox-json-preview">
                  {JSON.stringify(sandboxOutput, null, 2)}
                </pre>
              </div>
            )}

            <div className="sandbox-modal-footer">
              <div className="sandbox-footer-note">
                <Sparkles size={13} color="#E2FC00" />
                <span>Powered by Kiaan Autonomous Agent Framework & Playwright cluster</span>
              </div>
              <button className="btn-modal-done" onClick={() => setSandboxModalOpen(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Super Admin Payment Modal ── */}
      <SuperAdminScraperPaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
