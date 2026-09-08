import React, { useState, useMemo } from 'react';
import {
  Search, Filter, ChevronDown, ChevronUp, X, Check, Plus, Download, Sparkles,
  ExternalLink, Mail, Phone, Bookmark, ShieldCheck, Building2, MapPin, Briefcase,
  Users, Layers, ArrowUpDown, MoreVertical, LayoutGrid, CheckCircle2, UserPlus,
  Trash2, FileSpreadsheet, Eye, Play, HelpCircle, Lock, RefreshCw, Send, Tag,
  Globe, Info, MessageSquare, Calendar, ChevronRight, SlidersHorizontal, BookOpen,
  Sliders, Star, Zap, Maximize2, Mic, Settings, DollarSign, CreditCard, Bell, List
} from 'lucide-react';
import { FULL_COMPANIES_DATA } from './mockCompaniesData';
import '../../css/companies-prospect.css';

export default function CompaniesProspectView({ showToast }) {
  // Main Data State
  const [companiesData, setCompaniesData] = useState(FULL_COMPANIES_DATA);

  // Active Tab: 'total' | 'net_new' | 'saved'
  const [activeTab, setActiveTab] = useState('total');

  // Selected Row Checkboxes
  const [selectedIds, setSelectedIds] = useState([]);

  // Main Search & Filter Sidebar Toggle
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);

  // Default View Popover State (1:1 Match to Screenshot)
  const [defaultViewDropdownOpen, setDefaultViewDropdownOpen] = useState(false);
  const [defaultViewSearch, setDefaultViewSearch] = useState('');
  const [defaultViewTab, setDefaultViewTab] = useState('all');

  // Sorting & View Mode
  const [sortBy, setSortBy] = useState('relevance');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState('landing'); // 'landing' (quick filters card) or 'table'

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);

  // Drawers & Modals
  const [selectedCompanyForDrawer, setSelectedCompanyForDrawer] = useState(null);
  const [saveSearchModalOpen, setSaveSearchModalOpen] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState('');
  const [showNameError, setShowNameError] = useState(true);

  // Filter State
  const initialFilterState = {
    locations: [],
    empRanges: [],
    industries: [],
    companies: []
  };
  const [filters, setFilters] = useState(initialFilterState);

  // Filter Accordion Open States
  const [accordionOpen, setAccordionOpen] = useState({
    company: true,
    lookalikes: false,
    location: true,
    employees: true,
    industry: true
  });

  const toggleAccordion = (key) => {
    setAccordionOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Toggle filter item helper
  const toggleFilterItem = (category, value) => {
    setViewMode('table');
    setFilters(prev => {
      const arr = prev[category] || [];
      const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
      return { ...prev, [category]: next };
    });
    showToast(`Filter applied: ${value}`);
  };

  const resetAllFilters = () => {
    setFilters(initialFilterState);
    setSearchQuery('');
    showToast('Company filters cleared');
  };

  // Filter & Search Logic
  const filteredCompanies = useMemo(() => {
    return companiesData.filter(comp => {
      if (activeTab === 'saved' && !comp.saved) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = comp.name.toLowerCase().includes(q);
        const matchInd = comp.industry.toLowerCase().includes(q);
        const matchLoc = comp.location.toLowerCase().includes(q);
        if (!matchName && !matchInd && !matchLoc) return false;
      }

      if (filters.locations.length > 0) {
        const matchLoc = filters.locations.some(l => 
          comp.location.toLowerCase().includes(l.toLowerCase()) || comp.country.toLowerCase().includes(l.toLowerCase())
        );
        if (!matchLoc) return false;
      }

      if (filters.empRanges.length > 0) {
        if (!filters.empRanges.includes(comp.employees)) return false;
      }

      if (filters.industries.length > 0) {
        const matchInd = filters.industries.some(i => 
          comp.industry.toLowerCase().includes(i.toLowerCase())
        );
        if (!matchInd) return false;
      }

      if (filters.companies.length > 0) {
        const matchComp = filters.companies.some(c => 
          comp.name.toLowerCase().includes(c.toLowerCase())
        );
        if (!matchComp) return false;
      }

      return true;
    });
  }, [companiesData, activeTab, searchQuery, filters]);

  // Sorting
  const sortedCompanies = useMemo(() => {
    const list = [...filteredCompanies];
    switch (sortBy) {
      case 'name_asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case 'emp_desc':
        return list.sort((a, b) => b.employeeCountNum - a.employeeCountNum);
      case 'score_desc':
        return list.sort((a, b) => b.score - a.score);
      case 'relevance':
      default:
        return list;
    }
  }, [filteredCompanies, sortBy]);

  // Paginated records
  const totalCount = sortedCompanies.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const currentPageCompanies = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedCompanies.slice(start, start + pageSize);
  }, [sortedCompanies, page, pageSize]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(currentPageCompanies.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSaveCompany = (id, e) => {
    if (e) e.stopPropagation();
    setCompaniesData(prev => prev.map(c => {
      if (c.id === id) {
        const nextSaved = !c.saved;
        showToast(nextSaved ? `Saved ${c.name} to target accounts` : `Removed ${c.name} from saved`);
        return { ...c, saved: nextSaved };
      }
      return c;
    }));
  };

  return (
    <div className="dash-view-content apollo-companies-prospect-page">
      {/* ── 1. TOP HEADER ── */}
      <div className="prospect-top-bar exact-header">
        <h1 className="prospect-title exact-title">Find companies</h1>
        <div className="prospect-top-right">
          <button className="prospect-top-btn white-btn" onClick={() => showToast('Opening CSV Import Wizard...')}>
            <span>Import</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* ── 2. STICKY TOOLBAR ── */}
      <div className="prospect-toolbar-sticky exact-toolbar">
        <div className="prospect-toolbar-left">
          
          {/* Default View Popover Trigger */}
          <div className="prospect-dropdown-wrap" style={{ position: 'relative' }}>
            <button 
              className={`prospect-tool-btn white-tool-btn default-view-trigger ${defaultViewDropdownOpen ? 'active' : ''}`}
              onClick={() => setDefaultViewDropdownOpen(!defaultViewDropdownOpen)}
            >
              <FileSpreadsheet size={15} color="#475569" />
              <span>Default view</span>
              {defaultViewDropdownOpen ? <ChevronUp size={14} color="#475569" /> : <ChevronDown size={14} color="#475569" />}
            </button>

            {/* 1:1 Popover Card Box */}
            {defaultViewDropdownOpen && (
              <div className="default-view-popover-card">
                <div className="popover-search-wrap">
                  <Search size={15} color="#94a3b8" className="popover-search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={defaultViewSearch}
                    onChange={(e) => setDefaultViewSearch(e.target.value)}
                    className="popover-search-input"
                    autoFocus
                  />
                </div>

                <div className="popover-tabs-row">
                  <button className={`popover-tab ${defaultViewTab === 'all' ? 'active' : ''}`} onClick={() => setDefaultViewTab('all')}>All searches</button>
                  <button className={`popover-tab ${defaultViewTab === 'your' ? 'active' : ''}`} onClick={() => setDefaultViewTab('your')}>Your searches</button>
                  <button className={`popover-tab ${defaultViewTab === 'starred' ? 'active' : ''}`} onClick={() => setDefaultViewTab('starred')}>Starred</button>
                  <button className={`popover-tab ${defaultViewTab === 'assigned' ? 'active' : ''}`} onClick={() => setDefaultViewTab('assigned')}>Assigned to you</button>
                  <button className={`popover-tab ${defaultViewTab === 'shared' ? 'active' : ''}`} onClick={() => setDefaultViewTab('shared')}>Shared</button>
                </div>

                <div className="popover-list-body">
                  <div className="popover-list-item selected">
                    <div className="item-left">
                      <FileSpreadsheet size={15} color="#475569" />
                      <span className="item-name">Default view</span>
                    </div>
                    <div className="item-right">
                      <span className="system-pill">System</span>
                      <Check size={14} color="#2563eb" />
                    </div>
                  </div>
                </div>

                <div className="popover-footer-row">
                  <button 
                    className="create-saved-search-yellow-btn"
                    onClick={() => {
                      setDefaultViewDropdownOpen(false);
                      setSaveSearchModalOpen(true);
                    }}
                  >
                    Create saved search
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Hide/Show Filters */}
          <button 
            className={`prospect-tool-btn white-tool-btn ${filterSidebarOpen ? 'active' : ''}`}
            onClick={() => setFilterSidebarOpen(!filterSidebarOpen)}
          >
            <SlidersHorizontal size={15} color="#475569" />
            <span>{filterSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
          </button>

          {/* Search Input Box */}
          <div className="prospect-search-input-wrap exact-search">
            <Search size={15} color="#64748b" className="search-icon" />
            <input 
              type="text" 
              placeholder="Search companies" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length > 0) setViewMode('table');
              }}
              className="prospect-search-input exact-input"
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        <div className="prospect-toolbar-right">
          {/* Research with AI button */}
          <button className="prospect-tool-btn ai-purple-btn" onClick={() => showToast('Researching target accounts with AI...')}>
            <Sparkles size={14} color="#8b5cf6" />
            <span>Research with AI</span>
            <ChevronDown size={14} />
          </button>

          {/* Create workflow */}
          <button className="prospect-tool-btn white-tool-btn" onClick={() => showToast('Opening Workflow Builder...')}>
            <Zap size={14} color="#0f172a" />
            <span>Create workflow</span>
            <ChevronDown size={14} />
          </button>

          {/* Save as new search */}
          <button className="prospect-tool-btn white-tool-btn" onClick={() => setSaveSearchModalOpen(true)}>
            <span>Save as new search</span>
          </button>

          {/* Sort dropdown */}
          <div className="prospect-dropdown-wrap" style={{ position: 'relative' }}>
            <button className="prospect-tool-btn white-tool-btn" onClick={() => setSortDropdownOpen(!sortDropdownOpen)}>
              <ArrowUpDown size={14} color="#64748b" />
              <span>Sort</span>
              <ChevronDown size={14} />
            </button>

            {sortDropdownOpen && (
              <div className="prospect-sort-popover">
                <div className={`sort-opt ${sortBy === 'relevance' ? 'active' : ''}`} onClick={() => { setSortBy('relevance'); setSortDropdownOpen(false); }}>Relevance</div>
                <div className={`sort-opt ${sortBy === 'score_desc' ? 'active' : ''}`} onClick={() => { setSortBy('score_desc'); setSortDropdownOpen(false); }}>Highest Score</div>
                <div className={`sort-opt ${sortBy === 'name_asc' ? 'active' : ''}`} onClick={() => { setSortBy('name_asc'); setSortDropdownOpen(false); }}>Company Name A-Z</div>
                <div className={`sort-opt ${sortBy === 'emp_desc' ? 'active' : ''}`} onClick={() => { setSortBy('emp_desc'); setSortDropdownOpen(false); }}>Employee Count (High to Low)</div>
              </div>
            )}
          </div>

          {/* Search settings link */}
          <button className="search-settings-btn" onClick={() => showToast('Opening Company Search Settings...')}>
            <Settings size={14} color="#64748b" />
            <span>Search settings</span>
          </button>
        </div>
      </div>

      {/* ── 3. MAIN WORKSPACE CONTENT ── */}
      <div className="prospect-workspace-body exact-body">
        
        {/* ── LEFT FILTER SIDEBAR ── */}
        {filterSidebarOpen && (
          <aside className="prospect-filter-sidebar exact-sidebar">
            {/* Top View Tabs Box (Total 28.0M | Net New 28.0M | Saved 0) */}
            <div className="exact-sidebar-tabs-box">
              <div className={`exact-tab-item ${activeTab === 'total' ? 'active' : ''}`} onClick={() => { setActiveTab('total'); setViewMode('table'); }}>
                <div className="exact-tab-title">Total</div>
                <div className="exact-tab-count">28.0M</div>
              </div>
              <div className={`exact-tab-item ${activeTab === 'net_new' ? 'active' : ''}`} onClick={() => { setActiveTab('net_new'); setViewMode('table'); }}>
                <div className="exact-tab-title">Net New</div>
                <div className="exact-tab-count">28.0M</div>
              </div>
              <div className={`exact-tab-item ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => { setActiveTab('saved'); setViewMode('table'); }}>
                <div className="exact-tab-title">Saved</div>
                <div className="exact-tab-count">{companiesData.filter(c => c.saved).length}</div>
              </div>
            </div>

            {/* Filter Accordion List */}
            <div className="exact-filter-accordions-list">
              
              {/* 1. Company Accordion */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('company')}>
                  <div className="exact-acc-left"><span className="exact-acc-icon">🏢</span><span>Company</span></div>
                  {accordionOpen.company ? <ChevronUp size={14} color="#64748b" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
                {accordionOpen.company && (
                  <div className="accordion-body">
                    <div className="filter-chips-presets">
                      {['Cheetah Mobile', 'Human Workplace', 'Apollo.io', 'Stripe', 'Notion', 'Figma', 'HubSpot', 'Shopify', 'Datadog', 'Snowflake'].map(c => (
                        <button 
                          key={c}
                          className={`chip-preset-btn ${filters.companies.includes(c) ? 'selected' : ''}`}
                          onClick={() => toggleFilterItem('companies', c)}
                        >
                          {c} {filters.companies.includes(c) && '✓'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Lookalikes Accordion */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('lookalikes')}>
                  <div className="exact-acc-left"><span className="exact-acc-icon">🏢</span><span>Lookalikes</span></div>
                  <Lock size={13} color="#3b82f6" />
                </div>
                {accordionOpen.lookalikes && (
                  <div className="accordion-body lock-hint">
                    <p>Find lookalike companies matching your target closed accounts.</p>
                    <button className="upgrade-pill-btn" onClick={() => showToast('Company Lookalikes unlocked')}>Unlock Feature</button>
                  </div>
                )}
              </div>

              {/* 3. Account Location Accordion */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('location')}>
                  <div className="exact-acc-left"><span className="exact-acc-icon">📍</span><span>Account Location</span></div>
                  {accordionOpen.location ? <ChevronUp size={14} color="#64748b" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
                {accordionOpen.location && (
                  <div className="accordion-body">
                    <div className="filter-chips-presets">
                      {['United States', 'Canada', 'United Kingdom', 'China', 'Germany', 'India', 'Saudi Arabia'].map(loc => (
                        <button 
                          key={loc}
                          className={`chip-preset-btn ${filters.locations.includes(loc) ? 'selected' : ''}`}
                          onClick={() => toggleFilterItem('locations', loc)}
                        >
                          {loc} {filters.locations.includes(loc) && '✓'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Employee Count Accordion */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('employees')}>
                  <div className="exact-acc-left"><span className="exact-acc-icon">👥</span><span># Employees</span></div>
                  {accordionOpen.employees ? <ChevronUp size={14} color="#64748b" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
                {accordionOpen.employees && (
                  <div className="accordion-body">
                    <div className="filter-chips-presets">
                      {['1-10', '11-20', '21-50', '51–200', '201–500', '501–1000', '1001–5000', '5000+'].map(emp => (
                        <button 
                          key={emp}
                          className={`chip-preset-btn ${filters.empRanges.includes(emp) ? 'selected' : ''}`}
                          onClick={() => toggleFilterItem('empRanges', emp)}
                        >
                          {emp} {filters.empRanges.includes(emp) && '✓'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Industry Accordion */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('industry')}>
                  <div className="exact-acc-left"><span className="exact-acc-icon">🏭</span><span>Industry & Keywords</span></div>
                  {accordionOpen.industry ? <ChevronUp size={14} color="#64748b" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
                {accordionOpen.industry && (
                  <div className="accordion-body">
                    <div className="filter-chips-presets">
                      {['Information Technology & Services', 'Marketing & Advertising', 'Retail & E-Commerce', 'Financial Services & FinTech', 'Professional Services', 'SaaS & Mobile Tech'].map(ind => (
                        <button 
                          key={ind}
                          className={`chip-preset-btn ${filters.industries.includes(ind) ? 'selected' : ''}`}
                          onClick={() => toggleFilterItem('industries', ind)}
                        >
                          {ind} {filters.industries.includes(ind) && '✓'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Actions in Filter Sidebar */}
            <div className="companies-sidebar-footer">
              <button className="clear-filters-btn" onClick={resetAllFilters}>Clear filters</button>
              <button className="view-more-filters-btn" onClick={() => showToast('Opening 30+ Advanced Company Filters...')}>
                View 30+ Filters
              </button>
            </div>
          </aside>
        )}

        {/* ── CENTER MAIN CONTENT (AI LANDING VS TABLE VIEW) ── */}
        <main className="prospect-main-content exact-main">
          
          {viewMode === 'landing' && !searchQuery ? (
            /* ── AI LANDING / QUICK FILTERS VIEW ── */
            <div className="companies-ai-landing-wrap">
              <h2 className="landing-ai-title">Use Apollo AI to find the right prospects</h2>

              {/* Star AI Search Input Box */}
              <div className="landing-ai-search-box">
                <span className="star-graphic-icon" style={{ fontSize: 20 }}>❋</span>
                <input 
                  type="text" 
                  placeholder="Example: Search for information technology & services companies operating in Boston" 
                  className="landing-ai-input"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setSearchQuery(e.target.value);
                      setViewMode('table');
                    }
                  }}
                />
              </div>

              {/* Quick Filters Card */}
              <div className="quick-filters-card-box">
                <div className="quick-filters-card-body">
                  <h3 className="card-quick-title">Quick filters</h3>

                  <div className="quick-filters-grid">
                    {/* Locations */}
                    <div className="quick-filter-group">
                      <span className="group-label">Locations</span>
                      <div className="chips-row">
                        <button 
                          className={`quick-chip-btn ${filters.locations.includes('United States') ? 'active' : ''}`}
                          onClick={() => toggleFilterItem('locations', 'United States')}
                        >
                          United States
                        </button>
                        <button 
                          className={`quick-chip-btn ${filters.locations.includes('Canada') ? 'active' : ''}`}
                          onClick={() => toggleFilterItem('locations', 'Canada')}
                        >
                          Canada
                        </button>
                      </div>
                    </div>

                    {/* Employee Count */}
                    <div className="quick-filter-group">
                      <span className="group-label">Employee Count</span>
                      <div className="chips-row">
                        <button 
                          className={`quick-chip-btn ${filters.empRanges.includes('1-10') ? 'active' : ''}`}
                          onClick={() => toggleFilterItem('empRanges', '1-10')}
                        >
                          1-10
                        </button>
                        <button 
                          className={`quick-chip-btn ${filters.empRanges.includes('11-20') ? 'active' : ''}`}
                          onClick={() => toggleFilterItem('empRanges', '11-20')}
                        >
                          11-20
                        </button>
                        <button 
                          className={`quick-chip-btn ${filters.empRanges.includes('21-50') ? 'active' : ''}`}
                          onClick={() => toggleFilterItem('empRanges', '21-50')}
                        >
                          21-50
                        </button>
                      </div>
                    </div>

                    {/* Industry */}
                    <div className="quick-filter-group full-width">
                      <span className="group-label">Industry</span>
                      <div className="chips-row">
                        <button 
                          className={`quick-chip-btn ${filters.industries.includes('Information Technology & Services') ? 'active' : ''}`}
                          onClick={() => toggleFilterItem('industries', 'Information Technology & Services')}
                        >
                          Information Technology & Services
                        </button>
                        <button 
                          className={`quick-chip-btn ${filters.industries.includes('Marketing & Advertising') ? 'active' : ''}`}
                          onClick={() => toggleFilterItem('industries', 'Marketing & Advertising')}
                        >
                          Marketing & Advertising
                        </button>
                        <button 
                          className={`quick-chip-btn ${filters.industries.includes('Retail') ? 'active' : ''}`}
                          onClick={() => toggleFilterItem('industries', 'Retail')}
                        >
                          Retail
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Unlock Advanced Filters Strip inside Card */}
                <div className="unlock-advanced-strip">
                  <div className="unlock-left">
                    <Lock size={14} color="#64748b" />
                    <span>Unlock advanced filters:</span>
                    <span className="advanced-item"><DollarSign size={13} /> Revenue</span>
                    <span className="advanced-item"><Building2 size={13} /> Funding</span>
                    <span className="advanced-item"><Users size={13} /> Company Lookalikes</span>
                  </div>
                  <button className="view-plans-yellow-btn" onClick={() => showToast('Opening Unlimited Enterprise Plans...')}>
                    View plans
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ── ENTERPRISE COMPANIES TABLE VIEW ── */
            <div className="exact-table-card">
              <div className="table-top-toolbar-strip">
                <button className="back-to-quick-btn" onClick={() => setViewMode('landing')}>
                  ← Back to Quick Filters
                </button>
                <span className="results-total-text">{totalCount.toLocaleString()} companies found</span>
              </div>

              <table className="exact-apollo-table">
                <thead>
                  <tr>
                    <th className="th-checkbox">
                      <input 
                        type="checkbox" 
                        checked={currentPageCompanies.length > 0 && currentPageCompanies.every(c => selectedIds.includes(c.id))}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </th>
                    <th>COMPANY NAME</th>
                    <th>ACCOUNT LOCATION</th>
                    <th>EMPLOYEES</th>
                    <th>INDUSTRY</th>
                    <th>REVENUE</th>
                    <th>SCORE</th>
                    <th style={{ textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageCompanies.map(comp => {
                    const isSelected = selectedIds.includes(comp.id);
                    return (
                      <tr 
                        key={comp.id}
                        className={`exact-row ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedCompanyForDrawer(comp)}
                      >
                        <td className="td-checkbox" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={() => toggleSelectRow(comp.id)}
                          />
                        </td>
                        <td>
                          <div className="comp-name-wrap">
                            <span className="comp-logo-badge">{comp.logo}</span>
                            <span className="exact-name-link">{comp.name}</span>
                          </div>
                        </td>
                        <td>{comp.location}</td>
                        <td>{comp.employees}</td>
                        <td>{comp.industry}</td>
                        <td>{comp.revenue}</td>
                        <td><span className="score-badge high">{comp.score}</span></td>
                        <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                          <button className="row-icon-btn" onClick={(e) => toggleSaveCompany(comp.id, e)}>
                            <Bookmark size={13} fill={comp.saved ? '#4f46e5' : 'none'} color={comp.saved ? '#4f46e5' : '#64748b'} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Bottom Pagination Bar */}
              <div className="exact-bottom-pagination-row">
                <div className="pagination-arrows-box">
                  <button className="arrow-nav-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>‹</button>
                  <select className="page-select-dropdown" value={page} onChange={(e) => setPage(Number(e.target.value))}>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <button className="arrow-nav-btn" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>›</button>
                </div>
                <span className="exact-pagination-count-text">1 - 30 of 28.0M</span>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── STICKY BULK ACTION BAR ── */}
      {selectedIds.length > 0 && (
        <div className="prospect-bulk-action-bar">
          <div className="bulk-left-info">
            <span className="bulk-count-pill"><strong>{selectedIds.length}</strong> selected</span>
            <button className="bulk-link-btn" onClick={() => handleSelectAll(true)}>Select all {totalCount}</button>
            <button className="bulk-link-btn" onClick={() => setSelectedIds([])}>Clear selection</button>
          </div>
          <div className="bulk-right-actions">
            <button className="bulk-btn" onClick={() => showToast(`Saved ${selectedIds.length} companies`)}><Bookmark size={13} /> Save</button>
            <button className="bulk-btn primary" onClick={() => showToast(`Exported ${selectedIds.length} companies to CSV`)}><Download size={13} /> Export CSV</button>
            <button className="bulk-btn danger" onClick={() => setSelectedIds([])}><Trash2 size={13} /> Delete</button>
          </div>
        </div>
      )}

      {/* ── COMPANY PROFILE DRAWER ── */}
      {selectedCompanyForDrawer && (
        <div className="prospect-drawer-backdrop" onClick={() => setSelectedCompanyForDrawer(null)}>
          <div className="prospect-profile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header-bar">
              <span className="drawer-title-sub">Company Account Details</span>
              <button className="drawer-close-btn" onClick={() => setSelectedCompanyForDrawer(null)}><X size={18} /></button>
            </div>
            <div className="drawer-content-body">
              <div className="drawer-profile-hero">
                <div className="hero-avatar">{selectedCompanyForDrawer.logo}</div>
                <div className="hero-details">
                  <h2>{selectedCompanyForDrawer.name}</h2>
                  <p className="hero-title">{selectedCompanyForDrawer.industry}</p>
                  <p className="hero-company"><MapPin size={13} /> {selectedCompanyForDrawer.location}</p>
                </div>
              </div>
              <div className="drawer-section">
                <h3>Account Overview</h3>
                <p>{selectedCompanyForDrawer.description}</p>
                <div className="company-info-grid" style={{ marginTop: 10 }}>
                  <div><strong>Employees:</strong> {selectedCompanyForDrawer.employees}</div>
                  <div><strong>Est. Revenue:</strong> {selectedCompanyForDrawer.revenue}</div>
                  <div><strong>Funding:</strong> {selectedCompanyForDrawer.funding}</div>
                  <div><strong>Founded:</strong> {selectedCompanyForDrawer.founded}</div>
                  <div><strong>Website:</strong> <a href={`https://${selectedCompanyForDrawer.website}`} target="_blank" rel="noreferrer">{selectedCompanyForDrawer.website}</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 1:1 CREATE SEARCH DRAWER (MATCHING SCREENSHOT) ── */}
      {saveSearchModalOpen && (
        <div className="prospect-drawer-backdrop" onClick={() => setSaveSearchModalOpen(false)}>
          <div className="create-search-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header-bar">
              <h2 className="drawer-title-text">Create search</h2>
              <button className="drawer-close-btn" onClick={() => setSaveSearchModalOpen(false)}><X size={18} /></button>
            </div>

            <div className="drawer-body-content">
              {/* Saved search name input with error indicator matching screenshot */}
              <div className="form-field-group">
                <label className="field-label-required">Saved search name <span className="red-star">*</span></label>
                <div className={`input-with-error-wrap ${showNameError && !saveSearchName.trim() ? 'has-error' : ''}`}>
                  <input 
                    type="text" 
                    placeholder="Choose a search name" 
                    value={saveSearchName}
                    onChange={(e) => {
                      setSaveSearchName(e.target.value);
                      if (e.target.value.trim()) setShowNameError(false);
                    }}
                    className="create-search-input"
                    autoFocus
                  />
                  {showNameError && !saveSearchName.trim() && (
                    <span className="error-alert-icon">!</span>
                  )}
                </div>
                {showNameError && !saveSearchName.trim() && (
                  <span className="error-message-text">This field is required.</span>
                )}
              </div>

              {/* Fields Section */}
              <div className="drawer-sub-section">
                <div className="section-meta-label">Fields</div>
                <div className="section-row-item" onClick={() => showToast('Fields selection opened')}>
                  <div className="row-left">
                    <List size={16} color="#475569" />
                    <span>Fields</span>
                  </div>
                  <div className="row-right">
                    <span className="count-badge-grey">9</span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </div>
              </div>

              {/* Applied filters Section */}
              <div className="drawer-sub-section">
                <div className="section-meta-label">Applied filters</div>
                <div className="section-row-item" onClick={() => showToast('Applied filters opened')}>
                  <div className="row-left">
                    <SlidersHorizontal size={16} color="#475569" />
                    <span>Filters</span>
                  </div>
                  <div className="row-right">
                    <span className="count-badge-grey">0</span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </div>
              </div>

              {/* More settings Section */}
              <div className="drawer-sub-section">
                <div className="section-meta-label">More settings</div>
                <div className="section-row-item" onClick={() => showToast('Visibility and sharing options opened')}>
                  <div className="row-left">
                    <Lock size={16} color="#475569" />
                    <span>Visibility and sharing</span>
                  </div>
                  <div className="row-right">
                    <span className="text-val-grey">Restricted</span>
                  </div>
                </div>

                <div className="section-row-item" onClick={() => showToast('Subscription and alert options opened')}>
                  <div className="row-left">
                    <Bell size={16} color="#475569" />
                    <span>Subscription and alerts</span>
                  </div>
                  <div className="row-right">
                    <span className="text-val-grey">None</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Action Buttons */}
            <div className="drawer-footer-actions">
              <button className="cancel-text-btn" onClick={() => setSaveSearchModalOpen(false)}>
                Cancel
              </button>
              <button 
                className="create-search-yellow-btn"
                onClick={() => {
                  if (!saveSearchName.trim()) {
                    setShowNameError(true);
                    return;
                  }
                  showToast(`Created saved search "${saveSearchName}"`);
                  setSaveSearchModalOpen(false);
                  setSaveSearchName('');
                }}
              >
                Create search
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
