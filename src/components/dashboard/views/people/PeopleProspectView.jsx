import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, Filter, ChevronDown, ChevronUp, X, Check, Plus, Download, Sparkles,
  ExternalLink, Mail, Phone, Bookmark, ShieldCheck, Building2, MapPin, Briefcase,
  Users, Layers, ArrowUpDown, MoreVertical, LayoutGrid, CheckCircle2, UserPlus,
  Trash2, FileSpreadsheet, Eye, Play, HelpCircle, Lock, RefreshCw, Send, Tag,
  Globe, Info, MessageSquare, Calendar, ChevronRight, SlidersHorizontal, BookOpen,
  Sliders, Star, Zap, Maximize2, Mic, Settings, Bell, List
} from 'lucide-react';
import { FULL_PEOPLE_DATA, DEFAULT_LISTS, DEFAULT_PERSONAS } from './mockPeopleData';
import '../../css/people-prospect.css';

export default function PeopleProspectView({ showToast }) {
  // Clear any existing localStorage override to ensure fresh mock leads with Sheng Fu etc. display top
  useEffect(() => {
    localStorage.removeItem('apollo_people_data');
  }, []);

  // ─── Main Data State ───
  const [peopleData, setPeopleData] = useState(FULL_PEOPLE_DATA);

  // ─── Active Tab State: 'total' | 'net_new' | 'saved' | 'lists' | 'personas' ───
  const [activeTab, setActiveTab] = useState('total');

  // ─── Selected Rows State ───
  const [selectedIds, setSelectedIds] = useState([]);

  // ─── Main Search & Toolbar ───
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestionsOpen, setSearchSuggestionsOpen] = useState(false);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(true);

  // Default View Popover State (1:1 Match to Screenshot)
  const [defaultViewDropdownOpen, setDefaultViewDropdownOpen] = useState(false);
  const [defaultViewSearch, setDefaultViewSearch] = useState('');
  const [defaultViewTab, setDefaultViewTab] = useState('all');

  // ─── Sorting State ───
  const [sortBy, setSortBy] = useState('relevance');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // ─── View Mode (Table vs Cards) ───
  const [viewMode, setViewMode] = useState('table');

  // ─── Columns Customization Modal & Config ───
  const [columnModalOpen, setColumnModalOpen] = useState(false);
  const [columns, setColumns] = useState({
    checkbox: true,
    name: true,
    jobTitle: true,
    company: true,
    location: true,
    email: true,
    phone: true,
    seniority: true,
    department: true,
    industry: true,
    employees: true,
    score: true,
    actions: true
  });

  const toggleColumn = (key) => {
    setColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // ─── Pagination State ───
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);

  // ─── Drawer & Sidecar States (Default AI Sidecar OPEN matching screenshot!) ───
  const [selectedLeadForDrawer, setSelectedLeadForDrawer] = useState(null);
  const [aiSidecarOpen, setAiSidecarOpen] = useState(true);
  const [showAiBanner, setShowAiBanner] = useState(true);

  // ─── Saved Searches State ───
  const [savedSearches, setSavedSearches] = useState([
    { id: 's1', name: 'India SaaS Sales Directors', count: 42, date: '2026-09-01' },
    { id: 's2', name: 'US FinTech VPs', count: 128, date: '2026-08-28' }
  ]);
  const [saveSearchModalOpen, setSaveSearchModalOpen] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState('');
  const [saveSearchDesc, setSaveSearchDesc] = useState('');
  const [showNameError, setShowNameError] = useState(true);

  // ─── Lists State ───
  const [customLists, setCustomLists] = useState(DEFAULT_LISTS);
  const [addToListModalOpen, setAddToListModalOpen] = useState(false);
  const [newListInput, setNewListInput] = useState('');

  // ─── Interactive Filter State ───
  const initialFilterState = {
    jobTitles: [],
    jobTitleSearch: '',
    jobTitleInclude: true,
    includeSimilarTitles: true,
    locations: [],
    locationSearch: '',
    emailStatuses: [],
    seniorities: [],
    departments: [],
    companies: [],
    companySearch: '',
    empRanges: [],
    minEmp: '',
    maxEmp: '',
    industries: [],
    industrySearch: ''
  };

  const [filters, setFilters] = useState(initialFilterState);

  // Filter Accordions Open/Closed State
  const [accordionOpen, setAccordionOpen] = useState({
    jobTitles: false,
    lookalikes: false,
    company: false,
    location: false,
    industry: false,
    employees: false,
    emailStatus: false,
    seniority: false,
    department: false
  });

  const toggleAccordion = (key) => {
    setAccordionOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // ─── Revealed Emails Map ───
  const [revealedEmails, setRevealedEmails] = useState({});

  const toggleRevealEmail = (id, email) => {
    setRevealedEmails(prev => ({ ...prev, [id]: !prev[id] }));
    if (!revealedEmails[id]) {
      showToast(`Unlocked verified email: ${email}`);
    }
  };

  // ─── Filter Logic Implementation ───
  const filteredLeads = useMemo(() => {
    return peopleData.filter(lead => {
      if (activeTab === 'saved' && !lead.saved) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = lead.name.toLowerCase().includes(q);
        const matchTitle = lead.jobTitle.toLowerCase().includes(q);
        const matchComp = lead.company.toLowerCase().includes(q);
        const matchLoc = lead.location.toLowerCase().includes(q);
        const matchEmail = lead.email.toLowerCase().includes(q);
        const matchInd = lead.industry.toLowerCase().includes(q);
        if (!matchName && !matchTitle && !matchComp && !matchLoc && !matchEmail && !matchInd) {
          return false;
        }
      }

      if (filters.jobTitles.length > 0) {
        const titleMatch = filters.jobTitles.some(t => 
          lead.jobTitle.toLowerCase().includes(t.toLowerCase())
        );
        if (filters.jobTitleInclude && !titleMatch) return false;
        if (!filters.jobTitleInclude && titleMatch) return false;
      }

      if (filters.locations.length > 0) {
        const locMatch = filters.locations.some(loc => 
          lead.location.toLowerCase().includes(loc.toLowerCase()) || 
          lead.country.toLowerCase().includes(loc.toLowerCase())
        );
        if (!locMatch) return false;
      }

      if (filters.emailStatuses.length > 0) {
        if (!filters.emailStatuses.includes(lead.emailStatus)) return false;
      }

      if (filters.seniorities.length > 0) {
        if (!filters.seniorities.includes(lead.seniority)) return false;
      }

      if (filters.departments.length > 0) {
        if (!filters.departments.includes(lead.department)) return false;
      }

      if (filters.companies.length > 0) {
        const compMatch = filters.companies.some(c => 
          lead.company.toLowerCase().includes(c.toLowerCase())
        );
        if (!compMatch) return false;
      }

      if (filters.empRanges.length > 0) {
        if (!filters.empRanges.includes(lead.employees)) return false;
      }

      if (filters.minEmp && lead.employeeCountNum < parseInt(filters.minEmp)) return false;
      if (filters.maxEmp && lead.employeeCountNum > parseInt(filters.maxEmp)) return false;

      if (filters.industries.length > 0) {
        const indMatch = filters.industries.some(ind => 
          lead.industry.toLowerCase().includes(ind.toLowerCase())
        );
        if (!indMatch) return false;
      }

      return true;
    });
  }, [peopleData, activeTab, searchQuery, filters]);

  // ─── Sorting Logic ───
  const sortedLeads = useMemo(() => {
    const list = [...filteredLeads];
    switch (sortBy) {
      case 'name_asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case 'company_asc':
        return list.sort((a, b) => a.company.localeCompare(b.company));
      case 'score_desc':
        return list.sort((a, b) => b.score - a.score);
      case 'emp_desc':
        return list.sort((a, b) => b.employeeCountNum - a.employeeCountNum);
      case 'relevance':
      default:
        return list;
    }
  }, [filteredLeads, sortBy]);

  // ─── Paginated Records ───
  const totalCount = sortedLeads.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const currentPageLeads = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedLeads.slice(start, start + pageSize);
  }, [sortedLeads, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, filters, pageSize, activeTab, sortBy]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.jobTitles.length > 0) count += filters.jobTitles.length;
    if (filters.locations.length > 0) count += filters.locations.length;
    if (filters.emailStatuses.length > 0) count += filters.emailStatuses.length;
    if (filters.seniorities.length > 0) count += filters.seniorities.length;
    if (filters.departments.length > 0) count += filters.departments.length;
    if (filters.companies.length > 0) count += filters.companies.length;
    if (filters.empRanges.length > 0) count += filters.empRanges.length;
    if (filters.industries.length > 0) count += filters.industries.length;
    if (filters.minEmp || filters.maxEmp) count += 1;
    return count;
  }, [filters]);

  const toggleFilterItem = (category, value) => {
    setFilters(prev => {
      const arr = prev[category] || [];
      const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
      return { ...prev, [category]: next };
    });
  };

  const removeFilterChip = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: (prev[category] || []).filter(v => v !== value)
    }));
  };

  const resetAllFilters = () => {
    setFilters(initialFilterState);
    setSearchQuery('');
    showToast('Filters reset to default');
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const pageIds = currentPageLeads.map(l => l.id);
      setSelectedIds(Array.from(new Set([...selectedIds, ...pageIds])));
    } else {
      const pageIds = currentPageLeads.map(l => l.id);
      setSelectedIds(selectedIds.filter(id => !pageIds.includes(id)));
    }
  };

  const isAllCurrentSelected = currentPageLeads.length > 0 && currentPageLeads.every(l => selectedIds.includes(l.id));

  const toggleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSaveLead = (id, e) => {
    if (e) e.stopPropagation();
    setPeopleData(prev => prev.map(l => {
      if (l.id === id) {
        const nextSaved = !l.saved;
        showToast(nextSaved ? `Saved ${l.name} to Saved Records` : `Removed ${l.name} from Saved`);
        return { ...l, saved: nextSaved };
      }
      return l;
    }));
  };

  const handleBulkSave = () => {
    setPeopleData(prev => prev.map(l => selectedIds.includes(l.id) ? { ...l, saved: true } : l));
    showToast(`Saved ${selectedIds.length} contacts to Saved Records`);
  };

  const handleBulkExportCSV = () => {
    const targets = peopleData.filter(l => selectedIds.includes(l.id));
    const csvRows = [
      ['Name', 'Job Title', 'Company', 'Location', 'Email', 'Phone', 'Seniority', 'Industry', 'Employees', 'Score'].join(','),
      ...targets.map(l => [
        `"${l.name}"`, `"${l.jobTitle}"`, `"${l.company}"`, `"${l.location}"`, `"${l.email}"`, `"${l.phone}"`, `"${l.seniority}"`, `"${l.industry}"`, `"${l.employees}"`, l.score
      ].join(','))
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apollo_prospects_${selectedIds.length}_leads.csv`;
    a.click();
    showToast(`Exported ${selectedIds.length} contacts to CSV file`);
  };

  const handleBulkDelete = () => {
    setPeopleData(prev => prev.filter(l => !selectedIds.includes(l.id)));
    showToast(`Removed ${selectedIds.length} contacts from list`);
    setSelectedIds([]);
  };

  const handleSaveSearchSubmit = (e) => {
    e.preventDefault();
    if (!saveSearchName.trim()) return;
    const newSearch = {
      id: Date.now().toString(),
      name: saveSearchName,
      description: saveSearchDesc,
      count: filteredLeads.length,
      date: new Date().toISOString().split('T')[0],
      filtersState: filters
    };
    const updated = [newSearch, ...savedSearches];
    setSavedSearches(updated);
    setSaveSearchModalOpen(false);
    setSaveSearchName('');
    setSaveSearchDesc('');
    showToast(`Saved search configuration: "${newSearch.name}"`);
  };

  const applyPersona = (persona) => {
    setFilters(prev => ({
      ...initialFilterState,
      ...(persona.filters || {})
    }));
    setActiveTab('total');
    showToast(`Applied Persona filter: "${persona.name}"`);
  };

  const handleCreateList = (e) => {
    e.preventDefault();
    if (!newListInput.trim()) return;
    const newListObj = {
      id: Date.now().toString(),
      name: newListInput,
      count: selectedIds.length || 0,
      color: '#4f46e5'
    };
    setCustomLists(prev => [...prev, newListObj]);
    setNewListInput('');

    if (selectedIds.length > 0) {
      setPeopleData(prev => prev.map(l => {
        if (selectedIds.includes(l.id)) {
          const currentLists = l.lists || [];
          if (!currentLists.includes(newListObj.name)) {
            return { ...l, lists: [...currentLists, newListObj.name] };
          }
        }
        return l;
      }));
      showToast(`Added ${selectedIds.length} contacts to list "${newListObj.name}"`);
    } else {
      showToast(`Created new list "${newListObj.name}"`);
    }
    setAddToListModalOpen(false);
  };

  return (
    <div className="dash-view-content apollo-people-prospect-page exact-match-1to1">
      {/* ── 1. TOP HEADER & IMPORT BUTTON ── */}
      <div className="prospect-top-bar exact-header">
        <h1 className="prospect-title exact-title">Find people</h1>
        <div className="prospect-top-right">
          <button className="prospect-top-btn white-btn" onClick={() => showToast('Opening CSV Import Wizard...')}>
            <span>Import</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* ── 2. STICKY TOOLBAR (1:1 EXACT MATCH TO SCREENSHOT) ── */}
      <div className="prospect-toolbar-sticky exact-toolbar">
        <div className="prospect-toolbar-left">
          {/* Default View Popover Trigger (1:1 Match to Screenshot) */}
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

          {/* Hide/Show Filters Button */}
          <button 
            className={`prospect-tool-btn white-tool-btn ${filterSidebarOpen ? 'active' : ''}`}
            onClick={() => setFilterSidebarOpen(!filterSidebarOpen)}
          >
            <SlidersHorizontal size={15} color="#475569" />
            <span>{filterSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
            <span className="prospect-badge-pill">1</span>
          </button>

          {/* Search Box Input */}
          <div className="prospect-search-input-wrap exact-search">
            <Search size={15} color="#64748b" className="search-icon" />
            <input 
              type="text" 
              placeholder="Search people" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          {/* Starred Button */}
          <button className="prospect-tool-btn icon-only-btn" title="Starred Searches">
            <Star size={14} color="#64748b" />
            <ChevronDown size={12} color="#64748b" />
          </button>

          {/* Create Workflow Button */}
          <button className="prospect-tool-btn white-tool-btn" onClick={() => showToast('Create workflow drawer opened')}>
            <Zap size={14} color="#0f172a" />
            <span>Create workflow</span>
            <ChevronDown size={14} />
          </button>

          {/* Save as new search */}
          <button className="prospect-tool-btn white-tool-btn" onClick={() => setSaveSearchModalOpen(true)}>
            <span>Save as new search</span>
          </button>

          {/* Relevance Dropdown */}
          <div className="prospect-dropdown-wrap" style={{ position: 'relative' }}>
            <button 
              className="prospect-tool-btn white-tool-btn"
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            >
              <ArrowUpDown size={14} color="#64748b" />
              <span>Relevance</span>
              <ChevronDown size={14} />
            </button>

            {sortDropdownOpen && (
              <div className="prospect-sort-popover">
                <div className="sort-opt active" onClick={() => setSortDropdownOpen(false)}>Relevance</div>
                <div className="sort-opt" onClick={() => { setSortBy('score_desc'); setSortDropdownOpen(false); }}>Highest Lead Score</div>
                <div className="sort-opt" onClick={() => { setSortBy('name_asc'); setSortDropdownOpen(false); }}>Name A–Z</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 3. SEARCH SETTINGS LINK ROW (Right aligned above table matching screenshot) ── */}
      <div className="search-settings-link-row">
        <button className="search-settings-btn" onClick={() => showToast('Opening Search Settings...')}>
          <Settings size={14} color="#64748b" />
          <span>Search settings</span>
        </button>
      </div>

      {/* ── 4. MAIN WORKSPACE CONTENT (FILTER SIDEBAR + DATA TABLE + AI SIDECAR) ── */}
      <div className="prospect-workspace-body exact-body">
        
        {/* ── LEFT FILTER SIDEBAR (1:1 MATCH TO SCREENSHOT) ── */}
        {filterSidebarOpen && (
          <aside className="prospect-filter-sidebar exact-sidebar">
            {/* Top View Tabs Box (Total 81.8M | Net New 81.8M | Saved 0) */}
            <div className="exact-sidebar-tabs-box">
              <div 
                className={`exact-tab-item ${activeTab === 'total' ? 'active' : ''}`}
                onClick={() => setActiveTab('total')}
              >
                <div className="exact-tab-title">Total</div>
                <div className="exact-tab-count">81.8M</div>
              </div>

              <div 
                className={`exact-tab-item ${activeTab === 'net_new' ? 'active' : ''}`}
                onClick={() => setActiveTab('net_new')}
              >
                <div className="exact-tab-title">Net New</div>
                <div className="exact-tab-count">81.8M</div>
              </div>

              <div 
                className={`exact-tab-item ${activeTab === 'saved' ? 'active' : ''}`}
                onClick={() => setActiveTab('saved')}
              >
                <div className="exact-tab-title">Saved</div>
                <div className="exact-tab-count">0</div>
              </div>
            </div>

            {/* Collapsible Filter Accordions (Exact Icons & Labels from Screenshot) */}
            <div className="exact-filter-accordions-list">
              
              {/* 1. Job Titles */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('jobTitles')}>
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon">🎯</span>
                    <span className="exact-acc-label">Job Titles</span>
                  </div>
                  {accordionOpen.jobTitles ? <ChevronUp size={14} color="#64748b" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
                {accordionOpen.jobTitles && (
                  <div className="accordion-body">
                    <div className="inc-exc-toggle">
                      <button className="toggle-btn active">Include</button>
                      <button className="toggle-btn">Exclude</button>
                    </div>
                    <div className="filter-chips-presets">
                      {['VP Sales', 'Sales Director', 'Head of Sales', 'CEO', 'CTO'].map(t => (
                        <button key={t} className="chip-preset-btn" onClick={() => toggleFilterItem('jobTitles', t)}>{t}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. People Lookalikes (With Lock Icon) */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('lookalikes')}>
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon">👤</span>
                    <span className="exact-acc-label">People Lookalikes</span>
                  </div>
                  <Lock size={13} color="#3b82f6" />
                </div>
              </div>

              {/* 3. Company */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('company')}>
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon">🏢</span>
                    <span className="exact-acc-label">Company</span>
                  </div>
                  {accordionOpen.company ? <ChevronUp size={14} color="#64748b" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
              </div>

              {/* 4. Location */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('location')}>
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon">📍</span>
                    <span className="exact-acc-label">Location</span>
                  </div>
                  {accordionOpen.location ? <ChevronUp size={14} color="#64748b" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
              </div>

              {/* 5. Industry & Keywords */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('industry')}>
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon">🏭</span>
                    <span className="exact-acc-label">Industry & Keywords</span>
                  </div>
                  {accordionOpen.industry ? <ChevronUp size={14} color="#64748b" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
              </div>

              {/* 6. Employee Count */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('employees')}>
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon">👥</span>
                    <span className="exact-acc-label">Employee Count</span>
                  </div>
                  {accordionOpen.employees ? <ChevronUp size={14} color="#64748b" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
              </div>

              {/* 7. Email Status */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('emailStatus')}>
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon">🛡️</span>
                    <span className="exact-acc-label">Email Status</span>
                  </div>
                  {accordionOpen.emailStatus ? <ChevronUp size={14} color="#64748b" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
              </div>

            </div>
          </aside>
        )}

        {/* ── CENTER DATA TABLE AREA ── */}
        <main className="prospect-main-content exact-main">
          
          <div className="exact-table-card">
            <div className="exact-table-scroll-wrap">
              <table className="exact-apollo-table">
                <thead>
                  <tr>
                    <th className="th-checkbox">
                      <input 
                        type="checkbox" 
                        checked={isAllCurrentSelected}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </th>
                    <th className="th-name">NAME</th>
                    <th className="th-add-col" colSpan={4}>
                      <button className="add-col-link-btn" onClick={() => setColumnModalOpen(true)}>
                        + add column
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageLeads.map((lead) => {
                    const isSelected = selectedIds.includes(lead.id);
                    return (
                      <tr 
                        key={lead.id} 
                        className={`exact-row ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedLeadForDrawer(lead)}
                      >
                        <td className="td-checkbox" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={() => toggleSelectRow(lead.id)}
                          />
                        </td>

                        <td className="td-name">
                          <span className="exact-name-link">{lead.name}</span>
                        </td>

                        <td className="td-role-title">
                          <span className="exact-role-text">{lead.jobTitle}</span>
                        </td>

                        <td className="td-company-text">
                          <span>{lead.company}</span>
                        </td>

                        <td className="td-location-text">
                          <span>{lead.location}</span>
                        </td>

                        <td className="td-actions-right" onClick={(e) => e.stopPropagation()}>
                          <button className="row-icon-btn" onClick={(e) => toggleSaveLead(lead.id, e)}>
                            <Bookmark size={13} fill={lead.saved ? '#4f46e5' : 'none'} color={lead.saved ? '#4f46e5' : '#64748b'} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ── 5. BOTTOM EMBEDDED PAGINATION BAR (1:1 MATCH TO SCREENSHOT) ── */}
            <div className="exact-bottom-pagination-row">
              <div className="pagination-arrows-box">
                <button 
                  className="arrow-nav-btn" 
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  ‹
                </button>

                <select 
                  className="page-select-dropdown" 
                  value={page}
                  onChange={(e) => setPage(Number(e.target.value))}
                >
                  {Array.from({ length: totalPages }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>

                <button 
                  className="arrow-nav-btn"
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  ›
                </button>
              </div>

              <span className="exact-pagination-count-text">
                1 - 30 of 81.796M
              </span>
            </div>
          </div>
        </main>

        {/* ── 6. RIGHT-SIDE AI ASSISTANT PANEL (1:1 EXACT MATCH TO SCREENSHOT RIGHT PANEL!) ── */}
        {aiSidecarOpen && (
          <aside className="exact-ai-sidecar-panel">
            {/* Sidecar Top Header */}
            <div className="exact-sidecar-header">
              <div className="sidecar-title-group">
                <div className="sidecar-star-icon">❖</div>
                <span className="sidecar-title-text">Analyze my pipeline ...</span>
                <ChevronDown size={14} color="#64748b" />
              </div>

              <div className="sidecar-header-actions">
                <button className="sidecar-icon-btn" title="New AI Thread"><Plus size={14} color="#475569" /></button>
                <button className="sidecar-icon-btn" title="Expand Panel"><Maximize2 size={13} color="#475569" /></button>
                <button className="sidecar-icon-btn" title="Close Panel" onClick={() => setAiSidecarOpen(false)}><X size={14} color="#475569" /></button>
              </div>
            </div>

            {/* Sidecar Panel Body */}
            <div className="exact-sidecar-body">
              {/* Card 1: Email Funnel by Sequence */}
              <div className="exact-card-box">
                <div className="exact-card-header">
                  <div className="card-header-left">
                    <FileSpreadsheet size={15} color="#475569" />
                    <span>Email Funnel by Sequence</span>
                  </div>
                  <Maximize2 size={13} color="#94a3b8" />
                </div>

                <div className="exact-card-empty-center">
                  <div className="empty-table-icon">田</div>
                  <span className="empty-text">No data yet</span>
                </div>
              </div>

              {/* Card 2: AI Prompt Chat Box */}
              <div className="exact-ai-prompt-box">
                {showAiBanner && (
                  <div className="ai-banner-strip">
                    <span>Customize your AI for 37% more replies</span>
                    <button className="banner-close-x" onClick={() => setShowAiBanner(false)}>✕</button>
                  </div>
                )}

                <textarea 
                  className="exact-ai-textarea"
                  placeholder="Reply to Assistant"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      showToast('AI response generated for query');
                      e.target.value = '';
                    }
                  }}
                />

                <div className="exact-prompt-inner-right">
                  <span className="chats-left-pill">4 CHATS LEFT</span>
                  <button className="mic-icon-btn" title="Voice Input"><Mic size={14} color="#475569" /></button>
                </div>

                <div className="exact-prompt-footer-tags">
                  <button className="prompt-tag-btn" onClick={() => showToast('Linking context...')}>
                    📖 Context
                  </button>
                  <button className="prompt-tag-btn" onClick={() => showToast('Asking Assistant...')}>
                    💬 Ask
                  </button>
                </div>
              </div>

              {/* Sidecar Bottom Disclaimer */}
              <div className="exact-sidecar-disclaimer">
                <p>Chats may be shared with third parties, see <a href="#policy" onClick={(e) => { e.preventDefault(); showToast('AI Policy Documentation'); }}>AI Policy</a>. Avoid sharing sensitive info.</p>
                <p className="sidecar-id-text">ID 6a9fba947475d4001c460435</p>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* ── 7. STICKY BULK ACTION BAR ── */}
      {selectedIds.length > 0 && (
        <div className="prospect-bulk-action-bar">
          <div className="bulk-left-info">
            <span className="bulk-count-pill"><strong>{selectedIds.length}</strong> selected</span>
            <button className="bulk-link-btn" onClick={() => handleSelectAll(true)}>Select all {totalCount}</button>
            <button className="bulk-link-btn" onClick={() => setSelectedIds([])}>Clear selection</button>
          </div>
          <div className="bulk-right-actions">
            <button className="bulk-btn" onClick={handleBulkSave}><Bookmark size={13} /> Save</button>
            <button className="bulk-btn primary" onClick={handleBulkExportCSV}><Download size={13} /> Export CSV</button>
            <button className="bulk-btn danger" onClick={handleBulkDelete}><Trash2 size={13} /> Delete</button>
          </div>
        </div>
      )}

      {/* ── 8. CONTACT PROFILE DRAWER ── */}
      {selectedLeadForDrawer && (
        <div className="prospect-drawer-backdrop" onClick={() => setSelectedLeadForDrawer(null)}>
          <div className="prospect-profile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header-bar">
              <span className="drawer-title-sub">Prospect Profile</span>
              <button className="drawer-close-btn" onClick={() => setSelectedLeadForDrawer(null)}><X size={18} /></button>
            </div>
            <div className="drawer-content-body">
              <div className="drawer-profile-hero">
                <div className="hero-avatar">{selectedLeadForDrawer.avatar}</div>
                <div className="hero-details">
                  <h2>
                    {selectedLeadForDrawer.name}
                    {selectedLeadForDrawer.emailStatus === 'Verified' && <CheckCircle2 size={16} color="#16a34a" />}
                  </h2>
                  <p className="hero-title">{selectedLeadForDrawer.jobTitle}</p>
                  <p className="hero-company"><Building2 size={13} /> {selectedLeadForDrawer.company} • {selectedLeadForDrawer.location}</p>
                </div>
              </div>
              <div className="drawer-action-buttons">
                <button className="drawer-btn primary" onClick={() => toggleRevealEmail(selectedLeadForDrawer.id, selectedLeadForDrawer.email)}>
                  <Mail size={14} /> <span>Email Lead</span>
                </button>
              </div>
              <div className="drawer-section">
                <h3>Contact Information</h3>
                <div className="info-row"><Mail size={15} color="#64748b" /><div><div className="info-label">Work Email</div><div className="info-value"><a href={`mailto:${selectedLeadForDrawer.email}`}>{selectedLeadForDrawer.email}</a></div></div></div>
                <div className="info-row"><Phone size={15} color="#64748b" /><div><div className="info-label">Direct Phone</div><div className="info-value">{selectedLeadForDrawer.phone}</div></div></div>
                <div className="info-row"><MapPin size={15} color="#64748b" /><div><div className="info-label">Location</div><div className="info-value">{selectedLeadForDrawer.location}</div></div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 9. 1:1 CREATE SEARCH DRAWER (MATCHING SCREENSHOT) ── */}
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

      {/* ── 10. COLUMN CUSTOMIZATION MODAL (+ add column) ── */}
      {columnModalOpen && (
        <div className="prospect-modal-backdrop" onClick={() => setColumnModalOpen(false)}>
          <div className="prospect-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Customize Table Columns</h3>
              <button className="modal-close" onClick={() => setColumnModalOpen(false)}><X size={16} /></button>
            </div>
            <div className="modal-body">
              <div className="column-checkboxes-grid">
                {[
                  { key: 'name', label: 'Contact Name' },
                  { key: 'jobTitle', label: 'Job Title' },
                  { key: 'company', label: 'Company Name' },
                  { key: 'location', label: 'Location' },
                  { key: 'email', label: 'Email Address' },
                ].map(col => (
                  <label key={col.key} className="col-checkbox-item">
                    <input type="checkbox" checked={!!columns[col.key]} onChange={() => toggleColumn(col.key)} />
                    <span>{col.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-save" onClick={() => setColumnModalOpen(false)}>Done</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
