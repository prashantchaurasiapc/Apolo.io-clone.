import React, { useState, useRef } from 'react';
import { 
  Layers, LayoutGrid, SlidersHorizontal, Search, ChevronDown, ChevronUp,
  ArrowUpDown, Settings, Plus, Upload, X, DollarSign, Calendar, 
  Building2, User, TrendingUp, BarChart3, CheckCircle2, Check,
  GitFork, ListFilter, MapPin, Users, Briefcase, FileText, Filter,
  ChevronRight, Lock, ArrowUp, Download
} from 'lucide-react';
import './DealsView.css';

/* ─── Golden Trophy SVG Illustration (1:1 with Screenshot) ─── */
const TrophyIcon = () => (
  <svg width="105" height="105" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Handle */}
    <path 
      d="M32 30H20C16.6863 30 14 32.6863 14 36V48C14 54.6274 19.3726 60 26 60H32" 
      stroke="#F59E0B" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    {/* Right Handle */}
    <path 
      d="M68 30H80C83.3137 30 86 32.6863 86 36V48C86 54.6274 80.6274 60 74 60H68" 
      stroke="#F59E0B" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    {/* Cup Body */}
    <path 
      d="M28 20H72V52C72 64.1503 62.1503 74 50 74C37.8497 74 28 64.1503 28 52V20Z" 
      fill="#FBBF24" 
    />
    {/* Top Rim of Cup */}
    <rect x="26" y="18" width="48" height="5" rx="2.5" fill="#F59E0B" />
    {/* Dollar Sign */}
    <text 
      x="50" 
      y="54" 
      fontSize="26" 
      fontWeight="900" 
      fill="#0F172A" 
      textAnchor="middle" 
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      $
    </text>
    {/* Stem */}
    <rect x="46" y="74" width="8" height="12" fill="#F59E0B" />
    {/* Base Top Tier */}
    <path d="M38 86H62L66 94H34L38 86Z" fill="#FBBF24" />
    {/* Base Bottom Tier */}
    <rect x="30" y="94" width="40" height="4" rx="2" fill="#D97706" />
  </svg>
);

function TableIcon({ size = 15, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.3">
      <rect x="2" y="2" width="12" height="12" rx="2" />
      <line x1="2" y1="7" x2="14" y2="7" />
      <line x1="7" y1="2" x2="7" y2="14" />
    </svg>
  );
}

function KanbanIcon({ size = 15, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.3">
      <rect x="2" y="2" width="12" height="12" rx="2" />
      <line x1="6.5" y1="2" x2="6.5" y2="14" />
      <line x1="10.5" y1="2" x2="10.5" y2="14" />
    </svg>
  );
}

export default function DealsView({ showToast }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dropdown States
  const [pipelineDropdownOpen, setPipelineDropdownOpen] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState('All Pipelines');

  const [dealsDropdownOpen, setDealsDropdownOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('All deals');
  const [viewsSubTab, setViewsSubTab] = useState('all');
  const [viewsSearch, setViewsSearch] = useState('');

  // Sort dropdown state (Screenshot 2)
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [sortByField, setSortByField] = useState('Created date');
  const [sortOrder, setSortOrder] = useState('Descending');

  // Side Drawers (Screenshot 1 & 3)
  const [showSaveNewViewDrawer, setShowSaveNewViewDrawer] = useState(false);
  const [showViewOptionsDrawer, setShowViewOptionsDrawer] = useState(false);
  const [viewNameInput, setViewNameInput] = useState('All deals');
  const [selectedLayout, setSelectedLayout] = useState('table'); // 'table' | 'kanban'

  // Show / Hide Filters Panel State
  const [showFilters, setShowFilters] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({ stage: true });

  // Modals & Drawers
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  const [showCustomFields, setShowCustomFields] = useState(false);
  const [dealForm, setDealForm] = useState({
    name: '',
    company: '',
    pipeline: 'Pipeline 1',
    stage: '',
    closeDate: '',
    owner: 'Shivam Ahirwar (You)',
    amount: '',
    dealType: '',
    leadSource: ''
  });
  const [isImportPage, setIsImportPage] = useState(false);
  const fileInputRef = useRef(null);
  const [showManagePipelinesModal, setShowManagePipelinesModal] = useState(false);
  const [dealsList, setDealsList] = useState([]);

  const handleDownloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Deal name,Amount,Account,Account domain,Closed date\n" +
      "Enterprise Expansion,50000,Acme Corp,acme.com,2026-11-30\n" +
      "Global Platform License,85000,Stripe Inc,stripe.com,2026-12-15\n" +
      "Cloud Integration Pilot,30000,Notion Labs,notion.so,2026-10-20\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "apollo_deals_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (showToast) showToast('Downloaded: apollo_deals_import_template.csv');
  };

  const handleFileSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (showToast) showToast(`Uploading and validating ${file.name}...`);
      setTimeout(() => {
        const imported = [
          { id: Date.now() + 1, name: 'Acme Corp Enterprise Deal', amount: '$50,000', stage: 'Discovery', company: 'Acme Corp', pipeline: 'Pipeline 1', closeDate: '2026-11-30', owner: 'Shivam Ahirwar (You)', createdAt: 'Just now' },
          { id: Date.now() + 2, name: 'Stripe Global Platform License', amount: '$85,000', stage: 'Proposal', company: 'Stripe Inc', pipeline: 'Pipeline 1', closeDate: '2026-12-15', owner: 'Shivam Ahirwar (You)', createdAt: 'Just now' },
          { id: Date.now() + 3, name: 'Notion Cloud Integration', amount: '$30,000', stage: 'Qualification', company: 'Notion Labs', pipeline: 'Pipeline 1', closeDate: '2026-10-20', owner: 'Shivam Ahirwar (You)', createdAt: 'Just now' },
        ];
        setDealsList(prev => [...imported, ...prev]);
        setIsImportPage(false);
        if (showToast) showToast(`Successfully imported 3 deals from ${file.name}!`);
      }, 1000);
    }
  };

  const toggleAccordion = (name) => {
    setOpenAccordions(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleCreateDeal = (e, createAnother = false) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!dealForm.name.trim()) {
      if (showToast) showToast('Please enter a deal name');
      return;
    }

    const created = {
      id: Date.now(),
      name: dealForm.name,
      amount: dealForm.amount ? `$${Number(dealForm.amount).toLocaleString()}` : '$25,000',
      stage: dealForm.stage || 'Discovery',
      company: dealForm.company || 'New Enterprise Account',
      pipeline: dealForm.pipeline || 'Pipeline 1',
      closeDate: dealForm.closeDate || '2026-10-15',
      owner: dealForm.owner || 'Shivam Ahirwar (You)',
      createdAt: 'Just now'
    };

    setDealsList(prev => [created, ...prev]);

    if (createAnother) {
      setDealForm({
        name: '',
        company: '',
        pipeline: 'Pipeline 1',
        stage: '',
        closeDate: '',
        owner: 'Shivam Ahirwar (You)',
        amount: '',
        dealType: '',
        leadSource: ''
      });
      if (showToast) {
        showToast(`Deal "${created.name}" created! Ready to create another.`);
      }
    } else {
      setShowCreateDrawer(false);
      setDealForm({
        name: '',
        company: '',
        pipeline: 'Pipeline 1',
        stage: '',
        closeDate: '',
        owner: 'Shivam Ahirwar (You)',
        amount: '',
        dealType: '',
        leadSource: ''
      });
      if (showToast) {
        showToast(`Deal "${created.name}" created successfully!`);
      }
    }
  };

  // Close dropdowns when clicking outside
  const closeAllDropdowns = () => {
    if (pipelineDropdownOpen) setPipelineDropdownOpen(false);
    if (dealsDropdownOpen) setDealsDropdownOpen(false);
    if (sortDropdownOpen) setSortDropdownOpen(false);
  };

  const handleSaveViewSubmit = () => {
    setShowSaveNewViewDrawer(false);
    if (showToast) {
      showToast(`View "${viewNameInput}" saved successfully!`);
    }
  };

  const viewsData = [
    { id: 'board', name: 'Board view of Deals', icon: KanbanIcon, isSystem: true },
    { id: 'all', name: 'All deals', icon: TableIcon, isSystem: true },
    { id: 'all_my', name: 'All my deals', icon: TableIcon, isSystem: false },
    { id: 'lost', name: 'My lost deals', icon: TableIcon, isSystem: false },
    { id: 'open', name: 'My open deals', icon: TableIcon, isSystem: false },
    { id: 'won', name: 'My won deals', icon: TableIcon, isSystem: false },
  ];

  if (isImportPage) {
    return (
      <div className="deals-view-wrapper deals-import-view-root">
        {/* Top Header Breadcrumb & Title */}
        <div className="deals-import-header">
          <div className="deals-breadcrumb">
            <button 
              type="button" 
              className="deals-breadcrumb-link" 
              onClick={() => setIsImportPage(false)}
            >
              Deals
            </button>
            <span className="deals-breadcrumb-sep">&gt;</span>
            <span className="deals-breadcrumb-current">Import Deals</span>
          </div>
          <h1 className="deals-import-title">Bulk import from CSV</h1>
        </div>

        {/* Center Canvas */}
        <div className="deals-import-canvas">
          {/* Main Card (Matches Screenshot 1:1) */}
          <div className="deals-import-card">
            {/* Dollar circle with blue upload arrow badge */}
            <div className="deals-import-icon-badge">
              <div className="deals-dollar-circle">
                <span>$</span>
              </div>
              <div className="deals-arrow-circle">
                <ArrowUp size={14} color="#ffffff" strokeWidth={3} />
              </div>
            </div>

            <h2 className="deals-import-card-title">Import deals</h2>
            <p className="deals-import-card-subtitle">You can import up to 10,000 records at a time</p>

            <div className="deals-import-instructions">
              <p className="deals-inst-lead">When importing deals, your file must include the following columns:</p>
              <p className="deals-inst-cols">Deal name, Amount, Account, Account domain, and Closed date</p>
            </div>

            <p className="deals-import-disclaimer">
              By clicking &quot;Select CSV file&quot; below, I acknowledge that business deals data submitted from my CSV file to Apollo may be used to provide and improve Apollo&apos;s services as further described in our{' '}
              <a 
                href="#terms" 
                onClick={(e) => { e.preventDefault(); showToast && showToast('Opening Terms of Service'); }}
                className="deals-import-link"
              >
                Terms of Service
              </a>
              .{' '}
              <a 
                href="#learn-more" 
                onClick={(e) => { e.preventDefault(); showToast && showToast('Learn more about data sharing'); }}
                className="deals-import-link"
              >
                Learn more
              </a>{' '}
              about data sharing.
            </p>

            {/* Action buttons row */}
            <div className="deals-import-actions-row">
              <button 
                type="button" 
                className="btn-sample-template"
                onClick={handleDownloadTemplate}
              >
                <Download size={15} color="#334155" />
                <span>Sample template</span>
              </button>

              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                accept=".csv" 
                style={{ display: 'none' }} 
              />

              <button 
                type="button" 
                className="btn-select-csv-yellow"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                Select CSV file
              </button>
            </div>
          </div>

          {/* Alternative Import Options Row */}
          <div className="deals-import-alt-row">
            <span className="deals-import-alt-text">Or you can choose to:</span>
            <button 
              type="button" 
              className="deals-import-alt-btn"
              onClick={() => showToast && showToast('Redirecting to Import contacts')}
            >
              <Users size={16} color="#475569" />
              <span>Import contacts</span>
            </button>
            <button 
              type="button" 
              className="deals-import-alt-btn"
              onClick={() => showToast && showToast('Redirecting to Import accounts')}
            >
              <Building2 size={16} color="#475569" />
              <span>Import accounts</span>
            </button>
          </div>

          {/* Help and FAQs footer */}
          <div className="deals-import-help-footer">
            <span className="deals-help-text">Need help getting started?</span>
            <a 
              href="#help" 
              className="deals-help-link"
              onClick={(e) => { e.preventDefault(); showToast && showToast('Opening Apollo Help Center'); }}
            >
              Visit our help center
            </a>
            <span className="deals-help-sep">|</span>
            <a 
              href="#faqs" 
              className="deals-help-link"
              onClick={(e) => { e.preventDefault(); showToast && showToast('Opening Deals Import FAQs'); }}
            >
              View FAQs
            </a>
          </div>
        </div>

        {/* Floating Help Button */}
        <button 
          type="button"
          className="deals-floating-help-btn"
          onClick={() => showToast && showToast('Help & Guidance')}
          title="Help"
        >
          ?
        </button>
      </div>
    );
  }

  return (
    <div className="deals-view-wrapper" onClick={closeAllDropdowns}>
      {/* ─── 1. Header Row (Title & Action Buttons) ─── */}
      <div className="deals-page-header">
        <h1 className="deals-page-title">Deals</h1>
        <div className="deals-header-actions">
          {activeTab === 'analytics' ? (
            <button 
              className="btn-create-deal-yellow"
              onClick={() => showToast && showToast('Opening Advanced Analytics Hub')}
            >
              Go to Analytics
            </button>
          ) : (
            <>
              <button 
                className="btn-import-csv"
                onClick={() => setIsImportPage(true)}
              >
                Import CSV
              </button>
              <button 
                className="btn-create-deal-yellow"
                onClick={() => setShowCreateDrawer(true)}
              >
                Create deal
              </button>
            </>
          )}
        </div>
      </div>

      {/* ─── 2. Tabs Row (Overview & Analytics) ─── */}
      <div className="deals-tabs-row">
        <button 
          className={`deals-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`deals-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('analytics');
            showToast && showToast('Viewing Deals Pipeline Analytics');
          }}
        >
          Analytics
          <span className="deals-badge-new">New</span>
        </button>
      </div>

      {/* ─── 3. Filter & Control Bar (Different for Analytics vs Overview) ─── */}
      {activeTab === 'analytics' ? (
        <div className="analytics-controls-bar">
          <button 
            className="btn-timeframe-dropdown"
            onClick={() => showToast && showToast('Timeframe selector')}
          >
            <span>Select timeframe</span>
            <ChevronDown size={13} color="#64748b" />
          </button>

          <button 
            className="btn-add-filter-analytics"
            onClick={() => showToast && showToast('Add Analytics Filter')}
          >
            <Plus size={14} />
            <span>Add filter</span>
          </button>
        </div>
      ) : (
        <div className="deals-filter-bar" onClick={(e) => e.stopPropagation()}>
        <div className="deals-filter-left">
          
          {/* All Pipelines Dropdown (1:1 Screenshot 1) */}
          <div className="dropdown-relative-wrap">
            <button 
              className={`deals-dropdown-trigger ${pipelineDropdownOpen ? 'open' : ''}`}
              onClick={() => {
                setPipelineDropdownOpen(!pipelineDropdownOpen);
                setDealsDropdownOpen(false);
                setSortDropdownOpen(false);
              }}
            >
              <Layers size={14} color="#64748b" />
              <span>{selectedPipeline}</span>
              {pipelineDropdownOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {pipelineDropdownOpen && (
              <div className="pipelines-dropdown-menu">
                <div 
                  className={`pipeline-item ${selectedPipeline === 'All Pipelines' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedPipeline('All Pipelines');
                    setPipelineDropdownOpen(false);
                    showToast && showToast('Selected All Pipelines');
                  }}
                >
                  <span>All Pipelines</span>
                  {selectedPipeline === 'All Pipelines' && (
                    <Check size={16} className="pipeline-checkmark" />
                  )}
                </div>

                <div 
                  className={`pipeline-item ${selectedPipeline === 'Pipeline 1' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedPipeline('Pipeline 1');
                    setPipelineDropdownOpen(false);
                    showToast && showToast('Selected Pipeline 1');
                  }}
                >
                  <span>Pipeline 1</span>
                  {selectedPipeline === 'Pipeline 1' && (
                    <Check size={16} className="pipeline-checkmark" />
                  )}
                </div>

                <div className="pipelines-divider" />

                <div className="pipelines-footer">
                  <button 
                    className="btn-manage-pipelines"
                    onClick={() => {
                      setPipelineDropdownOpen(false);
                      setShowManagePipelinesModal(true);
                    }}
                  >
                    <Settings size={14} color="#475569" />
                    <span>Manage Pipelines</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* All deals Dropdown (1:1 Screenshot 2) */}
          <div className="dropdown-relative-wrap">
            <button 
              className={`deals-dropdown-trigger ${dealsDropdownOpen ? 'open' : ''}`}
              onClick={() => {
                setDealsDropdownOpen(!dealsDropdownOpen);
                setPipelineDropdownOpen(false);
                setSortDropdownOpen(false);
              }}
            >
              <TableIcon size={14} />
              <span>{selectedView}</span>
              {dealsDropdownOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {dealsDropdownOpen && (
              <div className="views-dropdown-menu">
                {/* Search input */}
                <div className="views-search-container">
                  <Search size={13} color="#94a3b8" />
                  <input 
                    type="text" 
                    className="views-search-input" 
                    placeholder="Search views"
                    value={viewsSearch}
                    onChange={(e) => setViewsSearch(e.target.value)}
                  />
                </div>

                {/* Sub-tabs */}
                <div className="views-subtabs">
                  <button 
                    className={`views-subtab-btn ${viewsSubTab === 'all' ? 'active' : ''}`}
                    onClick={() => setViewsSubTab('all')}
                  >
                    All views
                  </button>
                  <button 
                    className={`views-subtab-btn ${viewsSubTab === 'your' ? 'active' : ''}`}
                    onClick={() => setViewsSubTab('your')}
                  >
                    Your views
                  </button>
                  <button 
                    className={`views-subtab-btn ${viewsSubTab === 'starred' ? 'active' : ''}`}
                    onClick={() => setViewsSubTab('starred')}
                  >
                    Starred
                  </button>
                  <button 
                    className={`views-subtab-btn ${viewsSubTab === 'shared' ? 'active' : ''}`}
                    onClick={() => setViewsSubTab('shared')}
                  >
                    Shared
                  </button>
                </div>

                {/* Views List */}
                <div className="views-list-container">
                  {viewsData
                    .filter(v => v.name.toLowerCase().includes(viewsSearch.toLowerCase()))
                    .map((item) => {
                      const ItemIcon = item.icon;
                      const isSelected = selectedView === item.name;
                      return (
                        <div 
                          key={item.id}
                          className={`views-item-row ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedView(item.name);
                            setDealsDropdownOpen(false);
                            showToast && showToast(`Switched view to "${item.name}"`);
                          }}
                        >
                          <div className="views-item-left">
                            <ItemIcon size={14} color={isSelected ? '#2563eb' : '#64748b'} />
                            <span>{item.name}</span>
                          </div>
                          <div className="views-item-right">
                            {item.isSystem && (
                              <span className="views-system-badge">System</span>
                            )}
                            {isSelected && (
                              <Check size={16} color="#2563eb" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Bottom Footer Button */}
                <div className="views-footer">
                  <button 
                    className="btn-create-new-view"
                    onClick={() => {
                      setDealsDropdownOpen(false);
                      setShowSaveNewViewDrawer(true);
                    }}
                  >
                    Create new view
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Show / Hide Filters Button (1:1 Screenshot 3) */}
          <button 
            className={`deals-btn-filter ${showFilters ? 'active' : ''}`}
            onClick={() => {
              setShowFilters(!showFilters);
              if (showToast) {
                showToast(!showFilters ? 'Filter side panel opened' : 'Filter panel hidden');
              }
            }}
          >
            <SlidersHorizontal size={13} color="#64748b" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>

          {/* Search Input Box */}
          <div className="deals-search-input-wrap">
            <Search size={13} color="#94a3b8" />
            <input 
              type="text" 
              className="deals-search-input" 
              placeholder="Search deals"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="deals-filter-right">
          {/* 1. Save as new view button (Triggers right slide-out drawer) */}
          <button 
            className="btn-save-view"
            onClick={() => {
              setShowSaveNewViewDrawer(true);
              setShowViewOptionsDrawer(false);
            }}
          >
            Save as new view
          </button>

          {/* 2. Created date dropdown (Triggers sort popover with arrow notch) */}
          <div className="dropdown-relative-wrap">
            <button 
              className={`deals-dropdown-trigger ${sortDropdownOpen ? 'open' : ''}`}
              onClick={() => {
                setSortDropdownOpen(!sortDropdownOpen);
                setPipelineDropdownOpen(false);
                setDealsDropdownOpen(false);
              }}
            >
              <ArrowUpDown size={13} />
              <span>{sortByField}</span>
              <ChevronDown size={13} />
            </button>

            {sortDropdownOpen && (
              <div className="sort-dropdown-menu">
                <div className="sort-dropdown-title">Sort by</div>
                <div className="sort-select-group">
                  <div className="sort-select-box focused">
                    <span>{sortByField}</span>
                    <ChevronDown size={13} color="#64748b" />
                  </div>
                  <div 
                    className="sort-select-box"
                    onClick={() => setSortOrder(sortOrder === 'Descending' ? 'Ascending' : 'Descending')}
                  >
                    <span>{sortOrder}</span>
                    <ChevronDown size={13} color="#64748b" />
                  </div>
                </div>
                <div className="sort-dropdown-footer">
                  <button 
                    className="btn-apply-sort"
                    onClick={() => {
                      setSortDropdownOpen(false);
                      showToast && showToast(`Applied sort by ${sortByField} (${sortOrder})`);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. View options button (Triggers right slide-out drawer) */}
          <button 
            className="deals-control-link"
            onClick={() => {
              setShowViewOptionsDrawer(true);
              setShowSaveNewViewDrawer(false);
            }}
          >
            <Settings size={13} />
            <span>View options</span>
          </button>
        </div>
      </div>
      )}

      {/* ─── 4. Main Body: Split Layout with Side Filters Panel (Screenshot 3) ─── */}
      <div className="deals-body-layout">
        {/* Left Side Filters Sidebar (Rendered when showFilters is TRUE) */}
        {showFilters && (
          <aside className="deals-filters-sidebar">
            <div className="filters-scroll-area">
              
              {/* 1. Company */}
              <div className="filter-accordion-item">
                <button className="filter-accordion-header" onClick={() => toggleAccordion('company')}>
                  <div className="filter-accordion-left">
                    <Building2 size={15} className="filter-accordion-icon" />
                    <span>Company</span>
                  </div>
                  <ChevronDown size={13} color="#94a3b8" />
                </button>
                {openAccordions.company && (
                  <div className="filter-accordion-body">
                    <label className="filter-option-checkbox-row">
                      <input type="checkbox" /> Stripe
                    </label>
                    <label className="filter-option-checkbox-row">
                      <input type="checkbox" /> Notion
                    </label>
                  </div>
                )}
              </div>

              {/* 2. Owner */}
              <div className="filter-accordion-item">
                <button className="filter-accordion-header" onClick={() => toggleAccordion('owner')}>
                  <div className="filter-accordion-left">
                    <User size={15} className="filter-accordion-icon" />
                    <span>Owner</span>
                  </div>
                  <ChevronDown size={13} color="#94a3b8" />
                </button>
              </div>

              {/* 3. Stage */}
              <div className="filter-accordion-item">
                <button className="filter-accordion-header" onClick={() => toggleAccordion('stage')}>
                  <div className="filter-accordion-left">
                    <GitFork size={15} className="filter-accordion-icon" />
                    <span>Stage</span>
                  </div>
                  <ChevronDown size={13} color="#94a3b8" />
                </button>
                {openAccordions.stage && (
                  <div className="filter-accordion-body">
                    <label className="filter-option-checkbox-row">
                      <input type="checkbox" defaultChecked /> Discovery
                    </label>
                    <label className="filter-option-checkbox-row">
                      <input type="checkbox" defaultChecked /> Qualification
                    </label>
                    <label className="filter-option-checkbox-row">
                      <input type="checkbox" defaultChecked /> Proposal
                    </label>
                    <label className="filter-option-checkbox-row">
                      <input type="checkbox" defaultChecked /> Closed Won
                    </label>
                  </div>
                )}
              </div>

              {/* 4. Closed Date */}
              <div className="filter-accordion-item">
                <button className="filter-accordion-header" onClick={() => toggleAccordion('closed_date')}>
                  <div className="filter-accordion-left">
                    <Calendar size={15} className="filter-accordion-icon" />
                    <span>Closed Date</span>
                  </div>
                  <ChevronDown size={13} color="#94a3b8" />
                </button>
              </div>

              {/* 5. Created Date */}
              <div className="filter-accordion-item">
                <button className="filter-accordion-header" onClick={() => toggleAccordion('created_date')}>
                  <div className="filter-accordion-left">
                    <Calendar size={15} className="filter-accordion-icon" />
                    <span>Created Date</span>
                  </div>
                  <ChevronDown size={13} color="#94a3b8" />
                </button>
              </div>

              {/* 6. Stage Updated At */}
              <div className="filter-accordion-item">
                <button className="filter-accordion-header" onClick={() => toggleAccordion('stage_updated_at')}>
                  <div className="filter-accordion-left">
                    <Calendar size={15} className="filter-accordion-icon" />
                    <span>Stage Updated At</span>
                  </div>
                  <ChevronDown size={13} color="#94a3b8" />
                </button>
              </div>

              {/* 7. Next Step Updated At */}
              <div className="filter-accordion-item">
                <button className="filter-accordion-header" onClick={() => toggleAccordion('next_step_updated_at')}>
                  <div className="filter-accordion-left">
                    <Calendar size={15} className="filter-accordion-icon" />
                    <span>Next Step Updated At</span>
                  </div>
                  <ChevronDown size={13} color="#94a3b8" />
                </button>
              </div>

              {/* 8. Amount */}
              <div className="filter-accordion-item">
                <button className="filter-accordion-header" onClick={() => toggleAccordion('amount')}>
                  <div className="filter-accordion-left">
                    <DollarSign size={15} className="filter-accordion-icon" />
                    <span>Amount</span>
                  </div>
                  <ChevronDown size={13} color="#94a3b8" />
                </button>
              </div>

              {/* 9. Custom Fields */}
              <div className="filter-accordion-item">
                <button className="filter-accordion-header" onClick={() => toggleAccordion('custom_fields')}>
                  <div className="filter-accordion-left">
                    <SlidersHorizontal size={15} className="filter-accordion-icon" />
                    <span>Custom Fields</span>
                  </div>
                  <ChevronDown size={13} color="#94a3b8" />
                </button>
              </div>

              {/* 10. Account Lists */}
              <div className="filter-accordion-item">
                <button className="filter-accordion-header" onClick={() => toggleAccordion('account_lists')}>
                  <div className="filter-accordion-left">
                    <FileText size={15} className="filter-accordion-icon" />
                    <span>Account Lists</span>
                  </div>
                  <ChevronDown size={13} color="#94a3b8" />
                </button>
              </div>

              {/* 11. Location */}
              <div className="filter-accordion-item">
                <button className="filter-accordion-header" onClick={() => toggleAccordion('location')}>
                  <div className="filter-accordion-left">
                    <MapPin size={15} className="filter-accordion-icon" />
                    <span>Location</span>
                  </div>
                  <ChevronDown size={13} color="#94a3b8" />
                </button>
              </div>

              {/* 12. # Employees */}
              <div className="filter-accordion-item">
                <button className="filter-accordion-header" onClick={() => toggleAccordion('employees')}>
                  <div className="filter-accordion-left">
                    <Users size={15} className="filter-accordion-icon" />
                    <span># Employees</span>
                  </div>
                  <ChevronDown size={13} color="#94a3b8" />
                </button>
              </div>

              {/* 13. Industry & Keywords */}
              <div className="filter-accordion-item">
                <button className="filter-accordion-header" onClick={() => toggleAccordion('industry')}>
                  <div className="filter-accordion-left">
                    <Briefcase size={15} className="filter-accordion-icon" />
                    <span>Industry & Keywords</span>
                  </div>
                  <ChevronDown size={13} color="#94a3b8" />
                </button>
              </div>
            </div>

            {/* Sticky Clear Filters Footer */}
            <div className="filters-sidebar-footer">
              <button 
                className="btn-clear-filters"
                onClick={() => showToast && showToast('Filters reset')}
              >
                Clear filters
              </button>
            </div>
          </aside>
        )}

        {/* Right Canvas: Empty State or Kanban */}
        {activeTab === 'overview' ? (
          dealsList.length === 0 ? (
            <div className="deals-empty-state-canvas">
              <div className="trophy-icon-wrapper">
                <TrophyIcon />
              </div>

              <h2 className="deals-empty-title">Let's start winning more deals</h2>
              <p className="deals-empty-desc">
                Create your first deal to start tracking activities,<br />
                contacts, and conversations in one spot.
              </p>

              <button 
                className="btn-empty-create-deal"
                onClick={() => setShowCreateDrawer(true)}
              >
                Create deal
              </button>
            </div>
          ) : (
            <div className="deals-kanban-board">
              {['Discovery', 'Qualification', 'Proposal', 'Closed Won'].map(stage => {
                const stageDeals = dealsList.filter(d => d.stage === stage);
                return (
                  <div key={stage} className="deals-column">
                    <div className="deals-col-header">
                      <span>{stage}</span>
                      <span style={{ fontSize: 11, background: '#e2e8f0', padding: '2px 6px', borderRadius: 10 }}>
                        {stageDeals.length}
                      </span>
                    </div>
                    {stageDeals.map(deal => (
                      <div key={deal.id} className="deals-card-item">
                        <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a', marginBottom: 4 }}>
                          {deal.name}
                        </div>
                        <div style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, marginBottom: 4 }}>
                          {deal.amount}
                        </div>
                        {deal.company && (
                          <div style={{ fontSize: 11, color: '#64748b' }}>
                            🏢 {deal.company}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )
        ) : (
          /* ─── DEALS ANALYTICS DASHBOARD (1:1 with Screenshot) ─── */
          <div className="deals-analytics-container">
            
            {/* 1. Deals Stats Row */}
            <div className="deals-stats-card">
              <div className="deals-stats-header">Deals Stats</div>
              <div className="deals-stats-grid">
                
                {/* Stat 1 */}
                <div className="deals-stat-item">
                  <span className="deals-stat-label">% Deal win rate</span>
                  <div className="deals-stat-val-row">
                    <span className="deals-stat-number">0%</span>
                    <span className="deals-stat-badge-red">- 0% From Sep 7</span>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="deals-stat-item">
                  <span className="deals-stat-label"># Deals</span>
                  <div className="deals-stat-val-row">
                    <span className="deals-stat-number">0</span>
                    <span className="deals-stat-badge-red">- 0 From Sep 7</span>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="deals-stat-item">
                  <span className="deals-stat-label">$ Deal total amount won</span>
                  <div className="deals-stat-val-row">
                    <span className="deals-stat-number">0</span>
                    <span className="deals-stat-badge-red">- 0 From Sep 7</span>
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="deals-stat-item">
                  <span className="deals-stat-label">$ Deal total weighted forecasted revenue</span>
                  <div className="deals-stat-val-row">
                    <span className="deals-stat-number">0</span>
                    <span className="deals-stat-badge-red">- 0 From Sep 7</span>
                  </div>
                </div>

                {/* Stat 5 */}
                <div className="deals-stat-item">
                  <span className="deals-stat-label">Deal avg. sales cycle length</span>
                  <div className="deals-stat-val-row">
                    <span className="deals-stat-number">0</span>
                    <span className="deals-stat-badge-red">- 0 From Sep 7</span>
                  </div>
                </div>

              </div>
            </div>

            {/* 2. Grid 3 Cards: Pipeline, Volume by Stages, Sales Cycle Length */}
            <div className="analytics-grid-3-col">
              
              {/* Card A: Pipeline */}
              <div className="analytics-box-card">
                <div className="analytics-box-header">
                  <span className="analytics-box-title">Pipeline</span>
                  <button className="analytics-box-menu" onClick={() => showToast && showToast('Pipeline options')}>•••</button>
                </div>
                <div className="pipeline-axis-wrap">
                  <div className="pipeline-y-labels">
                    <span>$ Deal pipeline generated</span>
                    <span>$ Deal total weighted forecasted revenue</span>
                    <span>$ Deal total amount won</span>
                    <span>$ Deal avg. amount</span>
                  </div>
                  <div className="pipeline-chart-area">
                    <span className="pipeline-x-label">0</span>
                  </div>
                </div>
              </div>

              {/* Card B: Deal Volume by Stages */}
              <div className="analytics-box-card">
                <div className="analytics-box-header">
                  <span className="analytics-box-title">Deal Volume by Stages</span>
                  <button className="analytics-box-menu" onClick={() => showToast && showToast('Volume options')}>•••</button>
                </div>
                <div className="volume-chart-area">
                  <div className="volume-y-row">
                    <span className="volume-y-label"># Deals</span>
                    <div className="volume-dashed-line">
                      <div className="volume-zero-dot" />
                    </div>
                  </div>
                  <div className="volume-x-stages">
                    <span>Lead</span>
                    <span>Sales...</span>
                    <span>Mee...</span>
                    <span>Nego...</span>
                    <span>Cont...</span>
                    <span>Clo...</span>
                    <span>Clo...</span>
                  </div>
                  <div className="volume-bottom-caption">Deal Stage</div>
                </div>
              </div>

              {/* Card C: Average Sales Cycle Length by Stage */}
              <div className="analytics-box-card">
                <div className="analytics-box-header">
                  <span className="analytics-box-title">Average Sales Cycle Length by Stage</span>
                  <button className="analytics-box-menu" onClick={() => showToast && showToast('Cycle options')}>•••</button>
                </div>
                <div className="cycle-chart-area">
                  <div className="cycle-y-stages">
                    <span>Lead</span>
                    <span>Sales Qualified</span>
                    <span>Meeting Booked</span>
                    <span>Negotiation</span>
                    <span>Contract Sent</span>
                    <span>Closed Won</span>
                    <span>Closed Lost</span>
                  </div>
                  <div className="cycle-chart-line">
                    <span className="pipeline-x-label">0</span>
                  </div>
                </div>
                <div className="volume-bottom-caption" style={{ marginTop: 18 }}>
                  Deal avg. stage change in days
                </div>
              </div>

            </div>

            {/* 3. Grid 2 Cards: Revenue Trends & Forecasted Revenue by Category */}
            <div className="analytics-grid-2-col">
              
              {/* Card A: Revenue Trends */}
              <div className="analytics-box-card">
                <div className="analytics-box-header">
                  <span className="analytics-box-title">Revenue Trends</span>
                  <button className="analytics-box-menu" onClick={() => showToast && showToast('Revenue Trends options')}>•••</button>
                </div>
                
                <div className="revenue-trends-canvas">
                  <div className="revenue-trend-line-wrap">
                    <div className="revenue-flat-blue-line" />
                    <div className="revenue-chart-dot" />
                    <div className="revenue-chart-dot" />
                    <div className="revenue-chart-dot" />
                    <div className="revenue-chart-dot" style={{ boxShadow: '0 0 0 3px rgba(37,99,235,0.3)' }} />
                    <div className="revenue-chart-dot" />
                    
                    {/* Dark Floating Tooltip matching Screenshot */}
                    <div className="revenue-dark-tooltip">
                      <div className="revenue-dark-tooltip-title">
                        <span style={{ width: 6, height: 6, background: '#38bdf8', borderRadius: 1, display: 'inline-block' }} />
                        $ Deal total weighted forecasted revenue
                      </div>
                      <div className="revenue-dark-tooltip-date">Sep 08 2024 - Sep 15 2024</div>
                      <div className="revenue-dark-tooltip-val">0</div>
                    </div>
                  </div>

                  <div className="revenue-dates-row">
                    <span>Aug 25 2024</span>
                    <span>Aug 29</span>
                    <span>Sep 01</span>
                    <span>Sep 08 2024</span>
                    <span>Sep 15 2024</span>
                  </div>
                </div>

                <div className="revenue-legend-row">
                  <div className="revenue-legend-item">
                    <div className="legend-square-blue" />
                    <span>$ Amount total revenue</span>
                  </div>
                  <div className="revenue-legend-item">
                    <div className="legend-square-blue" style={{ background: '#38bdf8' }} />
                    <span>$ Deal total amount won</span>
                  </div>
                  <div className="revenue-legend-item">
                    <div className="legend-square-blue" style={{ background: '#818cf8' }} />
                    <span>$ Deal pipeline generated</span>
                  </div>
                  <div className="revenue-legend-item">
                    <div className="legend-square-blue" style={{ background: '#60a5fa' }} />
                    <span>$ Deal total amount</span>
                  </div>
                  <div className="revenue-legend-item">
                    <div className="legend-square-blue" style={{ background: '#2563eb' }} />
                    <span>$ Deal total weighted forecasted revenue</span>
                  </div>
                </div>
              </div>

              {/* Card B: Forecasted Revenue by Category */}
              <div className="analytics-box-card">
                <div className="analytics-box-header">
                  <span className="analytics-box-title">Forecasted Revenue by Category</span>
                  <button className="analytics-box-menu" onClick={() => showToast && showToast('Category options')}>•••</button>
                </div>
                
                <div className="donut-chart-wrap">
                  <svg className="donut-circle-svg" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="2.8"
                    />
                  </svg>

                  <div className="donut-legend-grid">
                    <div className="donut-legend-item">
                      <div className="legend-dot-circle" style={{ background: '#60a5fa' }} />
                      <span>Best Case</span>
                    </div>
                    <div className="donut-legend-item">
                      <div className="legend-dot-circle" style={{ background: '#0284c7' }} />
                      <span>Closed</span>
                    </div>
                    <div className="donut-legend-item">
                      <div className="legend-dot-circle" style={{ background: '#2563eb' }} />
                      <span>Commit</span>
                    </div>
                    <div className="donut-legend-item">
                      <div className="legend-dot-circle" style={{ background: '#93c5fd' }} />
                      <span>Most Likely</span>
                    </div>
                    <div className="donut-legend-item">
                      <div className="legend-dot-circle" style={{ background: '#3b82f6' }} />
                      <span>Omitted</span>
                    </div>
                    <div className="donut-legend-item">
                      <div className="legend-dot-circle" style={{ background: '#10b981' }} />
                      <span>Pipeline</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* 4. Deals Leaderboard (Full width card) */}
            <div className="analytics-box-card">
              <div className="analytics-box-header">
                <span className="analytics-box-title">Deals Leaderboard</span>
                <button className="analytics-box-menu" onClick={() => showToast && showToast('Leaderboard options')}>•••</button>
              </div>
              <div className="leaderboard-empty-table">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '60%', margin: '10px 0' }}>
                  <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4 }} />
                  <div style={{ height: 8, background: '#f8fafc', borderRadius: 4 }} />
                  <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4 }} />
                </div>
                <TableIcon size={24} color="#cbd5e1" />
                <span>No data yet</span>
              </div>
            </div>

            {/* 5. Grid 2 Cards: Deal Amount Won by Rep & Activity by Rep */}
            <div className="analytics-grid-2-col">
              
              <div className="analytics-box-card">
                <div className="analytics-box-header">
                  <span className="analytics-box-title">Deal Amount Won by Rep</span>
                  <button className="analytics-box-menu" onClick={() => showToast && showToast('Options')}>•••</button>
                </div>
                <div className="leaderboard-empty-table" style={{ minHeight: 160 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', height: 80, marginBottom: 10 }}>
                    <div style={{ width: 18, height: 40, background: '#f1f5f9', borderRadius: '4px 4px 0 0' }} />
                    <div style={{ width: 18, height: 60, background: '#f1f5f9', borderRadius: '4px 4px 0 0' }} />
                    <div style={{ width: 18, height: 30, background: '#f1f5f9', borderRadius: '4px 4px 0 0' }} />
                  </div>
                  <BarChart3 size={22} color="#cbd5e1" />
                  <span>No data yet</span>
                </div>
              </div>

              <div className="analytics-box-card">
                <div className="analytics-box-header">
                  <span className="analytics-box-title">Activity by Rep</span>
                  <button className="analytics-box-menu" onClick={() => showToast && showToast('Options')}>•••</button>
                </div>
                <div className="leaderboard-empty-table" style={{ minHeight: 160 }}>
                  <TrendingUp size={22} color="#cbd5e1" />
                  <span>No data yet</span>
                </div>
              </div>

            </div>

            {/* 6. Deals for follow-up (Bottom celebration card) */}
            <div className="deals-followup-card">
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>Deals for follow-up</div>
              
              <div className="deals-followup-controls">
                <div className="followup-owner-pill" onClick={() => showToast && showToast('Filter by owner')}>
                  <span>Shivam Ahirwar (You)</span>
                  <span className="followup-owner-counter">1</span>
                  <ChevronDown size={12} color="#64748b" />
                </div>

                <div className="followup-timeframe-pill" onClick={() => showToast && showToast('Filter timeframe')}>
                  <span style={{ color: '#64748b', fontSize: 11.5 }}>Follow-up timeframe:</span>
                  <span style={{ fontWeight: 600 }}>14 Days</span>
                  <ChevronDown size={12} color="#64748b" />
                </div>
              </div>

              <div className="followup-empty-center">
                <div className="followup-title">Deals are looking good!</div>
                <div className="followup-subtext">
                  Great news! All deals are up to date. Try adjusting the owner filter or visit your overview page to view all deals.
                </div>
                <button 
                  className="btn-view-deals-yellow"
                  onClick={() => setActiveTab('overview')}
                >
                  View deals
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ─── 5. SLIDE-OUT DRAWER 1: Save as new view (1:1 with Screenshot 1) ─── */}
        {showSaveNewViewDrawer && (
          <aside className="side-drawer-container" onClick={(e) => e.stopPropagation()}>
            <div className="side-drawer-header">
              <h3 className="side-drawer-title">Save as new view</h3>
              <button 
                className="side-drawer-close"
                onClick={() => setShowSaveNewViewDrawer(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="side-drawer-body">
              {/* View name input */}
              <div className="drawer-field-group">
                <label className="drawer-field-label">
                  View name <span className="req">*</span>
                </label>
                <input 
                  type="text" 
                  className="drawer-input-text"
                  value={viewNameInput}
                  onChange={(e) => setViewNameInput(e.target.value)}
                />
              </div>

              {/* Layout section */}
              <div className="drawer-field-group">
                <label className="drawer-field-label">Layout</label>
                <div className="drawer-layout-cards">
                  <div 
                    className={`drawer-layout-card ${selectedLayout === 'table' ? 'selected' : ''}`}
                    onClick={() => setSelectedLayout('table')}
                  >
                    <div className="drawer-layout-card-left">
                      <TableIcon size={16} color={selectedLayout === 'table' ? '#2563eb' : '#64748b'} />
                      <span>Table</span>
                    </div>
                    {selectedLayout === 'table' && <Check size={16} color="#2563eb" />}
                  </div>

                  <div 
                    className={`drawer-layout-card ${selectedLayout === 'kanban' ? 'selected' : ''}`}
                    onClick={() => setSelectedLayout('kanban')}
                  >
                    <div className="drawer-layout-card-left">
                      <KanbanIcon size={16} color={selectedLayout === 'kanban' ? '#2563eb' : '#64748b'} />
                      <span>Kanban board</span>
                    </div>
                    {selectedLayout === 'kanban' && <Check size={16} color="#2563eb" />}
                  </div>
                </div>
              </div>

              {/* Group by */}
              <div className="drawer-field-group">
                <label className="drawer-field-label">Group by</label>
                <div className="drawer-nav-row" onClick={() => showToast && showToast('Group by configuration')}>
                  <div className="drawer-nav-left">
                    <Layers size={16} color="#64748b" />
                    <span>Group by</span>
                  </div>
                  <div className="drawer-nav-right">
                    <span>None</span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div className="drawer-field-group">
                <label className="drawer-field-label">Fields</label>
                <div className="drawer-nav-row" onClick={() => showToast && showToast('Configure visible fields')}>
                  <div className="drawer-nav-left">
                    <ListFilter size={16} color="#64748b" />
                    <span>Fields</span>
                  </div>
                  <div className="drawer-nav-right">
                    <span className="drawer-pill-counter">8</span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </div>
              </div>

              {/* Applied filters */}
              <div className="drawer-field-group">
                <label className="drawer-field-label">Applied filters</label>
                <div className="drawer-nav-row" onClick={() => showToast && showToast('Applied filters configuration')}>
                  <div className="drawer-nav-left">
                    <Filter size={16} color="#64748b" />
                    <span>Filters</span>
                  </div>
                  <div className="drawer-nav-right">
                    <span className="drawer-pill-counter">0</span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </div>
              </div>

              {/* More settings */}
              <div className="drawer-subheading">More settings</div>
              <div className="drawer-nav-row" onClick={() => showToast && showToast('Visibility and sharing settings')}>
                <div className="drawer-nav-left">
                  <Lock size={15} color="#64748b" />
                  <span>Visibility and sharing</span>
                </div>
                <div className="drawer-nav-right">
                  <span>Restricted</span>
                </div>
              </div>
            </div>

            <div className="side-drawer-footer">
              <button 
                className="btn-drawer-cancel"
                onClick={() => setShowSaveNewViewDrawer(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-drawer-submit-yellow"
                onClick={handleSaveViewSubmit}
              >
                Create view
              </button>
            </div>
          </aside>
        )}

        {/* ─── 6. SLIDE-OUT DRAWER 2: View options (1:1 with Screenshot 3) ─── */}
        {showViewOptionsDrawer && (
          <aside className="side-drawer-container" onClick={(e) => e.stopPropagation()}>
            <div className="side-drawer-header">
              <h3 className="side-drawer-title">View options</h3>
              <button 
                className="side-drawer-close"
                onClick={() => setShowViewOptionsDrawer(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="side-drawer-body">
              {/* Layout section */}
              <div className="drawer-field-group">
                <label className="drawer-field-label">Layout</label>
                <div className="drawer-layout-cards">
                  <div 
                    className={`drawer-layout-card ${selectedLayout === 'table' ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedLayout('table');
                      showToast && showToast('Switched layout to Table');
                    }}
                  >
                    <div className="drawer-layout-card-left">
                      <TableIcon size={16} color={selectedLayout === 'table' ? '#2563eb' : '#64748b'} />
                      <span>Table</span>
                    </div>
                    {selectedLayout === 'table' && <Check size={16} color="#2563eb" />}
                  </div>

                  <div 
                    className={`drawer-layout-card ${selectedLayout === 'kanban' ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedLayout('kanban');
                      showToast && showToast('Switched layout to Kanban board');
                    }}
                  >
                    <div className="drawer-layout-card-left">
                      <KanbanIcon size={16} color={selectedLayout === 'kanban' ? '#2563eb' : '#64748b'} />
                      <span>Kanban board</span>
                    </div>
                    {selectedLayout === 'kanban' && <Check size={16} color="#2563eb" />}
                  </div>
                </div>
              </div>

              {/* Group by */}
              <div className="drawer-field-group">
                <label className="drawer-field-label">Group by</label>
                <div className="drawer-nav-row" onClick={() => showToast && showToast('Group by configuration')}>
                  <div className="drawer-nav-left">
                    <Layers size={16} color="#64748b" />
                    <span>Group by</span>
                  </div>
                  <div className="drawer-nav-right">
                    <span>None</span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div className="drawer-field-group">
                <label className="drawer-field-label">Fields</label>
                <div className="drawer-nav-row" onClick={() => showToast && showToast('Configure visible fields')}>
                  <div className="drawer-nav-left">
                    <ListFilter size={16} color="#64748b" />
                    <span>Fields</span>
                  </div>
                  <div className="drawer-nav-right">
                    <span className="drawer-pill-counter">8</span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </div>
              </div>

              {/* Applied filters */}
              <div className="drawer-field-group">
                <label className="drawer-field-label">Applied filters</label>
                <div className="drawer-nav-row" onClick={() => showToast && showToast('Applied filters configuration')}>
                  <div className="drawer-nav-left">
                    <Filter size={16} color="#64748b" />
                    <span>Filters</span>
                  </div>
                  <div className="drawer-nav-right">
                    <span className="drawer-pill-counter">0</span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* ─── SLIDE-OVER DRAWER: Create Deal (1:1 with Screenshot) ─── */}
      {showCreateDrawer && (
        <div className="cdeal-drawer-overlay" onClick={() => setShowCreateDrawer(false)}>
          <aside className="cdeal-drawer-panel" onClick={(e) => e.stopPropagation()}>
            {/* Drawer Header */}
            <div className="cdeal-drawer-header">
              <h2 className="cdeal-drawer-title">Create deal</h2>
              <button 
                className="cdeal-drawer-close"
                onClick={() => setShowCreateDrawer(false)}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Scrollable Body */}
            <div className="cdeal-drawer-body">
              {/* Customize deal form link */}
              <div className="cdeal-top-actions">
                <button 
                  type="button" 
                  className="cdeal-customize-link"
                  onClick={() => showToast && showToast('Deal form customization settings')}
                >
                  <Settings size={15} color="#2563eb" />
                  <span>Customize deal form</span>
                </button>
              </div>

              <form id="create-deal-drawer-form" onSubmit={(e) => handleCreateDeal(e, false)}>
                {/* Deal name */}
                <div className="cdeal-field-group">
                  <label className="cdeal-label">
                    Deal name <span className="cdeal-star">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="cdeal-input" 
                    placeholder="Deal name"
                    value={dealForm.name}
                    onChange={(e) => setDealForm({ ...dealForm, name: e.target.value })}
                    required
                  />
                </div>

                {/* Company */}
                <div className="cdeal-field-group">
                  <label className="cdeal-label">Company</label>
                  <div className="cdeal-select-wrap">
                    <select 
                      className="cdeal-select"
                      value={dealForm.company}
                      onChange={(e) => setDealForm({ ...dealForm, company: e.target.value })}
                    >
                      <option value="">Select...</option>
                      <option value="Acme Corp">Acme Corp</option>
                      <option value="Stripe Inc">Stripe Inc</option>
                      <option value="Notion Labs">Notion Labs</option>
                      <option value="Figma Systems">Figma Systems</option>
                      <option value="Scale AI">Scale AI</option>
                    </select>
                    <ChevronDown size={14} className="cdeal-select-chevron" />
                  </div>
                  <div className="cdeal-create-account-row">
                    <button 
                      type="button" 
                      className="cdeal-create-account-btn"
                      onClick={() => showToast && showToast('Create account modal')}
                    >
                      + Create account
                    </button>
                  </div>
                </div>

                {/* Pipeline */}
                <div className="cdeal-field-group">
                  <label className="cdeal-label">
                    Pipeline <span className="cdeal-star">*</span>
                  </label>
                  <div className="cdeal-select-wrap">
                    <select 
                      className="cdeal-select"
                      value={dealForm.pipeline}
                      onChange={(e) => setDealForm({ ...dealForm, pipeline: e.target.value })}
                      required
                    >
                      <option value="Pipeline 1">Pipeline 1</option>
                      <option value="Enterprise Sales">Enterprise Sales</option>
                      <option value="Inbound Mid-Market">Inbound Mid-Market</option>
                      <option value="Partnership Channel">Partnership Channel</option>
                    </select>
                    <ChevronDown size={14} className="cdeal-select-chevron" />
                  </div>
                </div>

                {/* Stage */}
                <div className="cdeal-field-group">
                  <label className="cdeal-label">
                    Stage <span className="cdeal-star">*</span>
                  </label>
                  <div className="cdeal-select-wrap">
                    <select 
                      className="cdeal-select"
                      value={dealForm.stage}
                      onChange={(e) => setDealForm({ ...dealForm, stage: e.target.value })}
                      required
                    >
                      <option value="">Select...</option>
                      <option value="Discovery">Discovery</option>
                      <option value="Qualification">Qualification</option>
                      <option value="Demo / Pitch">Demo / Pitch</option>
                      <option value="Proposal">Proposal</option>
                      <option value="Closed Won">Closed Won</option>
                      <option value="Closed Lost">Closed Lost</option>
                    </select>
                    <ChevronDown size={14} className="cdeal-select-chevron" />
                  </div>
                </div>

                {/* Estimated close date */}
                <div className="cdeal-field-group">
                  <label className="cdeal-label">
                    Estimated close date <span className="cdeal-star">*</span>
                  </label>
                  <div className="cdeal-date-wrap">
                    <input 
                      type="date"
                      className="cdeal-input cdeal-date-input"
                      value={dealForm.closeDate}
                      onChange={(e) => setDealForm({ ...dealForm, closeDate: e.target.value })}
                      placeholder="dd/mm/yyyy"
                      required
                    />
                  </div>
                </div>

                {/* Owner */}
                <div className="cdeal-field-group">
                  <label className="cdeal-label">Owner</label>
                  <div className="cdeal-owner-picker">
                    <div className="cdeal-owner-chip">
                      <span>Shivam Ahirwar (You)</span>
                      <button 
                        type="button" 
                        className="cdeal-owner-clear"
                        onClick={() => showToast && showToast('Owner cleared')}
                        title="Clear owner"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <ChevronDown size={14} color="#64748b" />
                  </div>
                </div>

                {/* Amount ($) */}
                <div className="cdeal-field-group">
                  <label className="cdeal-label">Amount ($)</label>
                  <input 
                    type="number"
                    className="cdeal-input"
                    placeholder=""
                    value={dealForm.amount}
                    onChange={(e) => setDealForm({ ...dealForm, amount: e.target.value })}
                  />
                </div>

                {/* Collapsible custom fields */}
                <div className="cdeal-toggle-row">
                  <button 
                    type="button" 
                    className="cdeal-toggle-link"
                    onClick={() => setShowCustomFields(!showCustomFields)}
                  >
                    <span className="cdeal-toggle-icon">{showCustomFields ? '▾' : '▸'}</span>
                    <span>{showCustomFields ? 'Hide custom fields (2)' : 'Show custom fields (2)'}</span>
                  </button>
                </div>

                {showCustomFields && (
                  <div className="cdeal-custom-panel">
                    <div className="cdeal-field-group">
                      <label className="cdeal-label">Deal type</label>
                      <div className="cdeal-select-wrap">
                        <select 
                          className="cdeal-select"
                          value={dealForm.dealType}
                          onChange={(e) => setDealForm({ ...dealForm, dealType: e.target.value })}
                        >
                          <option value="">Select...</option>
                          <option value="New Business">New Business</option>
                          <option value="Existing Business">Existing Business</option>
                          <option value="Renewal">Renewal</option>
                          <option value="Expansion">Expansion</option>
                        </select>
                        <ChevronDown size={14} className="cdeal-select-chevron" />
                      </div>
                    </div>

                    <div className="cdeal-field-group">
                      <label className="cdeal-label">Lead source</label>
                      <div className="cdeal-select-wrap">
                        <select 
                          className="cdeal-select"
                          value={dealForm.leadSource}
                          onChange={(e) => setDealForm({ ...dealForm, leadSource: e.target.value })}
                        >
                          <option value="">Select...</option>
                          <option value="Inbound Website">Inbound Website</option>
                          <option value="SDR Outbound">SDR Outbound</option>
                          <option value="Referral">Referral</option>
                          <option value="Partner">Partner</option>
                          <option value="Conference / Event">Conference / Event</option>
                        </select>
                        <ChevronDown size={14} className="cdeal-select-chevron" />
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Sticky Drawer Footer matching Screenshot 1:1 */}
            <div className="cdeal-drawer-footer">
              <div className="cdeal-footer-left">
                <button 
                  type="submit" 
                  form="create-deal-drawer-form"
                  className="cdeal-btn-yellow"
                  onClick={(e) => handleCreateDeal(e, false)}
                >
                  Save
                </button>
                <button 
                  type="button" 
                  className="cdeal-btn-yellow"
                  onClick={(e) => handleCreateDeal(e, true)}
                >
                  Save and create another
                </button>
              </div>
              <div className="cdeal-footer-right">
                <button 
                  type="button" 
                  className="cdeal-btn-cancel"
                  onClick={() => setShowCreateDrawer(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}



      {/* ─── MODAL: Manage Pipelines ─── */}
      {showManagePipelinesModal && (
        <div className="deal-modal-backdrop" onClick={() => setShowManagePipelinesModal(false)}>
          <div className="deal-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="deal-modal-header">
              <h3>Manage Pipelines</h3>
              <button className="deal-modal-close" onClick={() => setShowManagePipelinesModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="deal-modal-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>Standard Sales Pipeline</div>
                    <div style={{ fontSize: 11.5, color: '#64748b' }}>4 stages • Default</div>
                  </div>
                  <span style={{ fontSize: 11, background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>Active</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>Pipeline 1 (Inbound Enterprise)</div>
                    <div style={{ fontSize: 11.5, color: '#64748b' }}>5 stages</div>
                  </div>
                  <button className="btn-save-view" onClick={() => showToast && showToast('Pipeline 1 edited')}>Edit</button>
                </div>
              </div>
            </div>
            <div className="deal-modal-footer">
              <button className="btn-modal-cancel" onClick={() => setShowManagePipelinesModal(false)}>Close</button>
              <button className="btn-modal-submit" onClick={() => { setShowManagePipelinesModal(false); showToast && showToast('New pipeline created'); }}>
                + Add Pipeline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
