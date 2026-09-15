import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, ChevronDown, ChevronUp, X, Check, Plus, Download, ExternalLink, Mail, Phone, Bookmark, Building2, MapPin, Users, ArrowUpDown, MoreHorizontal, CheckCircle2, UserPlus,
  Trash2, FileSpreadsheet, Play, HelpCircle, Lock, Send, Globe, Info, Calendar, ChevronRight, SlidersHorizontal, Sliders, Zap, Maximize2, Mic, Settings, Bell, List, DollarSign, Award, User
} from 'lucide-react';
import { FULL_PEOPLE_DATA, DEFAULT_LISTS } from './mockPeopleData';
import '../../css/people-prospect.css';

export default function PeopleProspectView({ showToast, onSelectTab }) {
  // Clear any existing localStorage override to ensure fresh mock leads with Sheng Fu etc. display top
  useEffect(() => {
    localStorage.removeItem('apollo_people_data');
  }, []);

  // ─── Main Data State ───
  const [peopleData, setPeopleData] = useState(FULL_PEOPLE_DATA);

  // ─── Lookalikes / Advanced Filters Upgrade Modal ───
  const [lookalikesModalOpen, setLookalikesModalOpen] = useState(false);

  // ─── Active Tab State: 'total' | 'net_new' | 'saved' | 'lists' | 'personas' ───
  const [activeTab, setActiveTab] = useState('total');

  // ─── Selected Rows State ───
  const [selectedIds, setSelectedIds] = useState([]);

  // ─── Main Search & Toolbar ───
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestionsOpen, setSearchSuggestionsOpen] = useState(false);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);

  // Default View Popover State (1:1 Match to Screenshot)
  const [defaultViewDropdownOpen, setDefaultViewDropdownOpen] = useState(false);
  const [defaultViewSearch, setDefaultViewSearch] = useState('');
  const [defaultViewTab, setDefaultViewTab] = useState('all');
  const [selectedViewId, setSelectedViewId] = useState('default_view');
  const [selectedViewName, setSelectedViewName] = useState('Default view');

  // Research with AI Dropdown State
  const [researchAiDropdownOpen, setResearchAiDropdownOpen] = useState(false);

  // Workflow Dropdown State
  const [workflowDropdownOpen, setWorkflowDropdownOpen] = useState(false);

  // ─── Sorting State ───
  const [sortBy, setSortBy] = useState('relevance');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [sortByField, setSortByField] = useState('Relevance');
  const [sortOrderDirection, setSortOrderDirection] = useState('Descending');

  // Import Dropdown State
  const [importDropdownOpen, setImportDropdownOpen] = useState(false);

  // ─── Mutually Exclusive Toolbar Dropdown Handler ───
  const toggleDropdown = (name, e) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    setDefaultViewDropdownOpen(prev => (name === 'defaultView' ? !prev : false));
    setResearchAiDropdownOpen(prev => (name === 'researchAi' ? !prev : false));
    setWorkflowDropdownOpen(prev => (name === 'workflow' ? !prev : false));
    setSortDropdownOpen(prev => (name === 'sort' ? !prev : false));
    setImportDropdownOpen(prev => (name === 'import' ? !prev : false));
  };

  const closeAllToolbarDropdowns = () => {
    setDefaultViewDropdownOpen(false);
    setResearchAiDropdownOpen(false);
    setWorkflowDropdownOpen(false);
    setSortDropdownOpen(false);
    setImportDropdownOpen(false);
  };

  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (e.target && e.target.closest && e.target.closest('.prospect-dropdown-wrap')) {
        return;
      }
      closeAllToolbarDropdowns();
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // ─── View Mode (Landing vs Table) ───
  const [viewMode, setViewMode] = useState('landing');

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

  // ─── Drawer & Sidecar States ───
  const [selectedLeadForDrawer, setSelectedLeadForDrawer] = useState(null);
  const [aiSidecarOpen, setAiSidecarOpen] = useState(false);
  const [showAiBanner, setShowAiBanner] = useState(true);

  // ─── Saved Searches & Search Settings Drawer State ───
  const [savedSearches, setSavedSearches] = useState([]);
  const [searchSettingsDrawerOpen, setSearchSettingsDrawerOpen] = useState(false);
  const [searchSettingsDrawerMode, setSearchSettingsDrawerMode] = useState('save_new'); // 'save_new' | 'settings'
  const [saveSearchName, setSaveSearchName] = useState('Default view');
  const [showNameError, setShowNameError] = useState(false);

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

  // Filter Sub-Section States (Matching original Apollo screenshots)
  const [jobTitleTab, setJobTitleTab] = useState('simple');
  const [pastJobTitlesOpen, setPastJobTitlesOpen] = useState(false);
  const [managementLevelOpen, setManagementLevelOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const [companyFilterMode, setCompanyFilterMode] = useState('is_any_of');
  const [locationTab, setLocationTab] = useState('contact');
  const [locationFilterMode, setLocationFilterMode] = useState('region');
  const [keywordsSubSectionOpen, setKeywordsSubSectionOpen] = useState(true);
  const [includeKeywordsChecked, setIncludeKeywordsChecked] = useState(true);
  const [includeAllKeywordsChecked, setIncludeAllKeywordsChecked] = useState(false);
  const [excludeKeywordsChecked, setExcludeKeywordsChecked] = useState(false);

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
      filtersState: filters,
      isUserCreated: true
    };
    const updated = [newSearch, ...savedSearches];
    setSavedSearches(updated);
    setSelectedViewId(newSearch.id);
    setSelectedViewName(newSearch.name);
    setSearchSettingsDrawerOpen(false);
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
          <div className="prospect-dropdown-wrap" style={{ position: 'relative' }}>
            <button 
              className={`prospect-top-btn white-btn ${importDropdownOpen ? 'active' : ''}`} 
              onClick={(e) => toggleDropdown('import', e)}
            >
              <span>Import</span>
              <ChevronDown size={14} />
            </button>

            {importDropdownOpen && (
              <div className="import-dropdown-menu">
                <button 
                  className="import-dropdown-item" 
                  onClick={() => {
                    setImportDropdownOpen(false);
                    showToast('Opening Single contact creation form...');
                  }}
                >
                  Single contact
                </button>
                <button 
                  className="import-dropdown-item" 
                  onClick={() => {
                    setImportDropdownOpen(false);
                    showToast('Opening CSV Import Wizard...');
                  }}
                >
                  CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 2. STICKY TOOLBAR (1:1 EXACT MATCH TO SCREENSHOT) ── */}
      <div className="prospect-toolbar-sticky exact-toolbar">
        <div className="prospect-toolbar-left">
          {/* Default View Popover Trigger */}
          <div className="prospect-dropdown-wrap" style={{ position: 'relative' }}>
            <button 
              className={`prospect-plain-btn default-view-trigger ${defaultViewDropdownOpen ? 'active' : ''}`}
              onClick={(e) => toggleDropdown('defaultView', e)}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M3 15h18" />
                <path d="M9 3v18" />
                <path d="M15 3v18" />
              </svg>
              <span>{selectedViewName}</span>
              {defaultViewDropdownOpen ? <ChevronUp size={14} color="#6b7280" /> : <ChevronDown size={14} color="#6b7280" />}
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

                {/* ── TAB 1: ALL SEARCHES ── */}
                {defaultViewTab === 'all' && (() => {
                  const query = defaultViewSearch.toLowerCase().trim();
                  const isDefaultMatch = !query || 'default view'.includes(query);
                  const matchedSearches = savedSearches.filter(s => !query || s.name.toLowerCase().includes(query));

                  if (!isDefaultMatch && matchedSearches.length === 0) {
                    return <div className="popover-no-results">No searches found matching "{defaultViewSearch}"</div>;
                  }

                  return (
                    <div className="popover-list-body">
                      {isDefaultMatch && (
                        <div 
                          className={`popover-list-item ${selectedViewId === 'default_view' ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedViewId('default_view');
                            setSelectedViewName('Default view');
                            setFilters(initialFilterState);
                            setDefaultViewDropdownOpen(false);
                            showToast('Applied "Default view"');
                          }}
                        >
                          <div className="item-left">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <path d="M3 9h18" />
                              <path d="M3 15h18" />
                              <path d="M9 3v18" />
                              <path d="M15 3v18" />
                            </svg>
                            <span className="item-name">Default view</span>
                          </div>
                          <div className="item-right">
                            <span className="system-pill">System</span>
                            {selectedViewId === 'default_view' && <Check size={14} color="#2563eb" strokeWidth={2.5} />}
                          </div>
                        </div>
                      )}

                      {matchedSearches.map(search => (
                        <div 
                          key={search.id}
                          className={`popover-list-item ${selectedViewId === search.id ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedViewId(search.id);
                            setSelectedViewName(search.name);
                            if (search.filtersState) setFilters(prev => ({ ...prev, ...search.filtersState }));
                            setDefaultViewDropdownOpen(false);
                            showToast(`Applied saved search: "${search.name}"`);
                          }}
                        >
                          <div className="item-left">
                            <Bookmark size={14} color="#6366f1" />
                            <span className="item-name">{search.name}</span>
                          </div>
                          <div className="item-right">
                            {selectedViewId === search.id && <Check size={14} color="#2563eb" strokeWidth={2.5} />}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}

                {/* ── TAB 2: YOUR SEARCHES ── */}
                {defaultViewTab === 'your' && (() => {
                  const query = defaultViewSearch.toLowerCase().trim();
                  const userSearches = savedSearches.filter(s => s.isUserCreated && (!query || s.name.toLowerCase().includes(query)));

                  if (userSearches.length === 0) {
                    return (
                      <div className="popover-empty-state">
                        <div className="empty-state-graphic">
                          <svg width="120" height="85" viewBox="0 0 120 85" fill="none">
                            <path d="M70 12L71.5 15.5L75 17L71.5 18.5L70 22L68.5 18.5L65 17L68.5 15.5L70 12Z" fill="#cbd5e1"/>
                            <path d="M48 64L49 66.5L51.5 67.5L49 68.5L48 71L47 68.5L44.5 67.5L47 66.5L48 64Z" fill="#cbd5e1"/>
                            <path d="M72 61L73 63L75 64L73 65L72 67L71 65L69 64L71 63L72 61Z" fill="#cbd5e1"/>
                            <rect x="34" y="20" width="52" height="48" rx="4" fill="#bfdbfe" />
                            <rect x="34" y="20" width="52" height="8" rx="3" fill="#2563eb" />
                            <circle cx="40" cy="36" r="2" fill="#2563eb" />
                            <line x1="46" y1="36" x2="74" y2="36" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="40" cy="44" r="2" fill="#2563eb" />
                            <line x1="46" y1="44" x2="74" y2="44" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="40" cy="52" r="2" fill="#2563eb" />
                            <line x1="46" y1="52" x2="74" y2="52" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="40" cy="60" r="2" fill="#2563eb" />
                            <line x1="46" y1="60" x2="74" y2="60" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <div className="popover-empty-title">No saved searches to see yet</div>
                        <div className="popover-empty-desc">Create a new saved search and get your data organized. Or, get a quick start with a shared or system saved search.</div>
                      </div>
                    );
                  }

                  return (
                    <div className="popover-list-body">
                      {userSearches.map(search => (
                        <div 
                          key={search.id}
                          className={`popover-list-item ${selectedViewId === search.id ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedViewId(search.id);
                            setSelectedViewName(search.name);
                            if (search.filtersState) setFilters(prev => ({ ...prev, ...search.filtersState }));
                            setDefaultViewDropdownOpen(false);
                            showToast(`Applied saved search: "${search.name}"`);
                          }}
                        >
                          <div className="item-left">
                            <Bookmark size={14} color="#6366f1" />
                            <span className="item-name">{search.name}</span>
                          </div>
                          <div className="item-right">
                            {selectedViewId === search.id && <Check size={14} color="#2563eb" strokeWidth={2.5} />}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}

                {/* ── TAB 3: STARRED ── */}
                {defaultViewTab === 'starred' && (
                  <div className="popover-empty-state">
                    <div className="empty-state-graphic">
                      <svg width="120" height="85" viewBox="0 0 120 85" fill="none">
                        <path d="M70 12L71.5 15.5L75 17L71.5 18.5L70 22L68.5 18.5L65 17L68.5 15.5L70 12Z" fill="#cbd5e1"/>
                        <path d="M48 64L49 66.5L51.5 67.5L49 68.5L48 71L47 68.5L44.5 67.5L47 66.5L48 64Z" fill="#cbd5e1"/>
                        <path d="M72 61L73 63L75 64L73 65L72 67L71 65L69 64L71 63L72 61Z" fill="#cbd5e1"/>
                        <rect x="34" y="20" width="52" height="48" rx="4" fill="#bfdbfe" />
                        <rect x="34" y="20" width="52" height="8" rx="3" fill="#2563eb" />
                        <circle cx="40" cy="36" r="2" fill="#2563eb" />
                        <line x1="46" y1="36" x2="74" y2="36" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="40" cy="44" r="2" fill="#2563eb" />
                        <line x1="46" y1="44" x2="74" y2="44" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="40" cy="52" r="2" fill="#2563eb" />
                        <line x1="46" y1="52" x2="74" y2="52" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="40" cy="60" r="2" fill="#2563eb" />
                        <line x1="46" y1="60" x2="74" y2="60" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="popover-empty-title">No favorite saved searches to see yet</div>
                    <div className="popover-empty-desc">Bookmark your most-used saved searches for quick access when you need it.</div>
                  </div>
                )}

                {/* ── TAB 4: ASSIGNED TO YOU ── */}
                {defaultViewTab === 'assigned' && (
                  <div className="popover-empty-state">
                    <div className="empty-state-graphic">
                      <svg width="120" height="85" viewBox="0 0 120 85" fill="none">
                        <path d="M70 12L71.5 15.5L75 17L71.5 18.5L70 22L68.5 18.5L65 17L68.5 15.5L70 12Z" fill="#cbd5e1"/>
                        <path d="M48 64L49 66.5L51.5 67.5L49 68.5L48 71L47 68.5L44.5 67.5L47 66.5L48 64Z" fill="#cbd5e1"/>
                        <path d="M72 61L73 63L75 64L73 65L72 67L71 65L69 64L71 63L72 61Z" fill="#cbd5e1"/>
                        <rect x="34" y="20" width="52" height="48" rx="4" fill="#bfdbfe" />
                        <rect x="34" y="20" width="52" height="8" rx="3" fill="#2563eb" />
                        <circle cx="40" cy="36" r="2" fill="#2563eb" />
                        <line x1="46" y1="36" x2="74" y2="36" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="40" cy="44" r="2" fill="#2563eb" />
                        <line x1="46" y1="44" x2="74" y2="44" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="40" cy="52" r="2" fill="#2563eb" />
                        <line x1="46" y1="52" x2="74" y2="52" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="40" cy="60" r="2" fill="#2563eb" />
                        <line x1="46" y1="60" x2="74" y2="60" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="popover-empty-title">No assigned searches to see yet</div>
                    <div className="popover-empty-desc">Keep up-to-date on assigned searches. When someone assigns a search to you, you'll see it here.</div>
                  </div>
                )}

                {/* ── TAB 5: SHARED ── */}
                {defaultViewTab === 'shared' && (
                  <div className="popover-empty-state">
                    <div className="empty-state-graphic">
                      <svg width="120" height="85" viewBox="0 0 120 85" fill="none">
                        <path d="M70 12L71.5 15.5L75 17L71.5 18.5L70 22L68.5 18.5L65 17L68.5 15.5L70 12Z" fill="#cbd5e1"/>
                        <path d="M48 64L49 66.5L51.5 67.5L49 68.5L48 71L47 68.5L44.5 67.5L47 66.5L48 64Z" fill="#cbd5e1"/>
                        <path d="M72 61L73 63L75 64L73 65L72 67L71 65L69 64L71 63L72 61Z" fill="#cbd5e1"/>
                        <rect x="34" y="20" width="52" height="48" rx="4" fill="#bfdbfe" />
                        <rect x="34" y="20" width="52" height="8" rx="3" fill="#2563eb" />
                        <circle cx="40" cy="36" r="2" fill="#2563eb" />
                        <line x1="46" y1="36" x2="74" y2="36" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="40" cy="44" r="2" fill="#2563eb" />
                        <line x1="46" y1="44" x2="74" y2="44" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="40" cy="52" r="2" fill="#2563eb" />
                        <line x1="46" y1="52" x2="74" y2="52" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="40" cy="60" r="2" fill="#2563eb" />
                        <line x1="46" y1="60" x2="74" y2="60" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="popover-empty-title">No shared searches to see yet</div>
                    <div className="popover-empty-desc">Collaborate with your team by sharing saved searches with them.</div>
                  </div>
                )}

                <div className="popover-footer-row">
                  <button 
                    className="create-saved-search-yellow-btn"
                    onClick={() => {
                      setDefaultViewDropdownOpen(false);
                      setSaveSearchName('');
                      setSearchSettingsDrawerMode('save_new');
                      setSearchSettingsDrawerOpen(true);
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
            className="prospect-plain-btn"
            onClick={() => setFilterSidebarOpen(!filterSidebarOpen)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2.2" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="7" y1="12" x2="17" y2="12" />
              <line x1="10" y1="18" x2="14" y2="18" />
            </svg>
            <span>{filterSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
          </button>

          {/* Search Box Input */}
          <div className="prospect-search-input-wrap exact-search">
            <Search size={15} color="#6b7280" className="search-icon" />
            <input 
              type="text" 
              placeholder="Search people" 
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
          {/* Research with AI button & Dropdown (1:1 to Screenshot) */}
          <div className="prospect-dropdown-wrap" style={{ position: 'relative' }}>
            <button 
              className={`ai-research-btn ${researchAiDropdownOpen ? 'active' : ''}`} 
              onClick={(e) => toggleDropdown('researchAi', e)}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                <path d="M5 3v4"/>
                <path d="M19 17v4"/>
                <path d="M3 5h4"/>
                <path d="M17 19h4"/>
              </svg>
              <span>Research with AI</span>
              <ChevronDown size={14} color="#7c3aed" />
            </button>

            {researchAiDropdownOpen && (
              <div className="research-ai-dropdown-menu">
                <button 
                  className="research-ai-menu-item" 
                  onClick={() => {
                    setResearchAiDropdownOpen(false);
                    setAiSidecarOpen(true);
                    showToast('Opening Custom AI Prompt...');
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                    <path d="m5 3 1 2"/>
                    <path d="m19 17 1 2"/>
                  </svg>
                  <span>Run custom AI prompt</span>
                </button>

                <button 
                  className="research-ai-menu-item" 
                  onClick={() => {
                    setResearchAiDropdownOpen(false);
                    showToast('Opening AI Formula Generator...');
                  }}
                >
                  <span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '15px', color: '#374151' }}>fx</span>
                  <span>Generate AI formula</span>
                </button>

                <div className="dropdown-divider-line" />

                <button 
                  className="research-ai-menu-item" 
                  onClick={() => {
                    setResearchAiDropdownOpen(false);
                    setAiSidecarOpen(true);
                    showToast('Launching Apollo Assistant...');
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                  <span>Use Apollo Assistant</span>
                </button>

                <button 
                  className="research-ai-menu-item" 
                  onClick={() => {
                    setResearchAiDropdownOpen(false);
                    showToast('Opening Research Templates...');
                  }}
                >
                  <MoreHorizontal size={16} color="#374151" />
                  <span>Start with a template</span>
                </button>
              </div>
            )}
          </div>

          {/* Create Workflow Button & Dropdown (1:1 to Screenshot) */}
          <div className="prospect-dropdown-wrap" style={{ position: 'relative' }}>
            <button 
              className={`white-tool-btn ${workflowDropdownOpen ? 'active' : ''}`} 
              onClick={(e) => toggleDropdown('workflow', e)}
            >
              <Zap size={14} color="#374151" />
              <span>Create workflow</span>
              <ChevronDown size={13} color="#6b7280" />
            </button>

            {workflowDropdownOpen && (
              <div className="workflow-dropdown-menu">
                <button 
                  className="workflow-menu-item" 
                  onClick={() => { 
                    setWorkflowDropdownOpen(false); 
                    showToast('Opening: Auto-add to sequence workflow builder'); 
                  }}
                >
                  Auto-add to sequence
                </button>
                <button 
                  className="workflow-menu-item" 
                  onClick={() => { 
                    setWorkflowDropdownOpen(false); 
                    showToast('Opening: Auto-add to lists workflow builder'); 
                  }}
                >
                  Auto-add to lists
                </button>
                <button 
                  className="workflow-menu-item" 
                  onClick={() => { 
                    setWorkflowDropdownOpen(false); 
                    showToast('Opening: Auto-update records workflow builder'); 
                  }}
                >
                  Auto-update records
                </button>
                <button 
                  className="workflow-menu-item" 
                  onClick={() => { 
                    setWorkflowDropdownOpen(false); 
                    showToast('Opening: Create workflow from scratch'); 
                  }}
                >
                  Create from scratch
                </button>
              </div>
            )}
          </div>

          {/* Save as new search */}
          <button 
            className="white-tool-btn" 
            onClick={() => {
              setSearchSettingsDrawerMode('save_new');
              setSaveSearchName('');
              setSearchSettingsDrawerOpen(true);
            }}
          >
            <span>Save as new search</span>
          </button>

          {/* Relevance Dropdown & Popover Card (1:1 to Screenshot) */}
          <div className="prospect-dropdown-wrap" style={{ position: 'relative' }}>
            <button 
              className="prospect-plain-btn"
              onClick={(e) => toggleDropdown('sort', e)}
            >
              <ArrowUpDown size={14} color="#4b5563" />
              <span>{sortByField}</span>
              <ChevronDown size={13} color="#6b7280" />
            </button>

            {sortDropdownOpen && (
              <div className="prospect-sort-popover-card">
                <div className="sort-card-header">
                  <span>Sort by</span>
                  <Info size={14} color="#64748b" />
                </div>

                <div className="sort-select-btn active-focus">
                  <span>{sortByField}</span>
                  <ChevronDown size={14} color="#64748b" />
                </div>

                <div className="sort-select-btn">
                  <span>{sortOrderDirection}</span>
                  <ChevronDown size={14} color="#64748b" />
                </div>

                <div className="sort-popover-footer">
                  <button 
                    className="sort-apply-btn" 
                    onClick={() => {
                      setSortDropdownOpen(false);
                      showToast(`Applied sorting: ${sortByField} (${sortOrderDirection})`);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search settings inline */}
          <button 
            className="prospect-plain-btn" 
            onClick={() => {
              setSearchSettingsDrawerMode('settings');
              setSearchSettingsDrawerOpen(true);
            }}
          >
            <Settings size={14} color="#4b5563" />
            <span>Search settings</span>
          </button>
        </div>
      </div>

      {/* ── 4. MAIN WORKSPACE CONTENT (FILTER SIDEBAR + DATA TABLE + AI SIDECAR) ── */}
      <div className="prospect-workspace-body exact-body">
        
        {/* ── LEFT FILTER SIDEBAR (1:1 MATCH TO SCREENSHOT) ── */}
        {filterSidebarOpen && (
          <aside className="prospect-filter-sidebar exact-sidebar">
            {/* Top View Tabs Box (Total 247.2M | Net New 247.2M | Saved 0) */}
            <div className="exact-sidebar-tabs-box">
              <div 
                className={`exact-tab-item ${activeTab === 'total' ? 'active' : ''}`}
                onClick={() => setActiveTab('total')}
              >
                <div className="exact-tab-title">Total</div>
                <div className="exact-tab-count">247.2M</div>
              </div>

              <div 
                className={`exact-tab-item ${activeTab === 'net_new' ? 'active' : ''}`}
                onClick={() => setActiveTab('net_new')}
              >
                <div className="exact-tab-title">Net New</div>
                <div className="exact-tab-count pill">247.2M</div>
              </div>

              <div 
                className={`exact-tab-item ${activeTab === 'saved' ? 'active' : ''}`}
                onClick={() => setActiveTab('saved')}
              >
                <div className="exact-tab-title">Saved</div>
                <div className="exact-tab-count pill">0</div>
              </div>
            </div>

            {/* Collapsible Filter Accordions (Exact Icons & Labels matching Original Apollo) */}
            <div className="exact-filter-accordions-list">
              
              {/* 1. Job Titles */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('jobTitles')}>
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon"><Award size={15} color="#475569" strokeWidth={1.8} /></span>
                    <span className="exact-acc-label">Job Titles</span>
                  </div>
                  {accordionOpen.jobTitles ? <ChevronUp size={14} color="#2563eb" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
                {accordionOpen.jobTitles && (
                  <div className="exact-acc-body">
                    {/* Simple / Advanced Toggle */}
                    <div className="filter-segmented-toggle">
                      <button 
                        className={`filter-segment-btn ${jobTitleTab === 'simple' ? 'active' : ''}`}
                        onClick={() => setJobTitleTab('simple')}
                      >
                        Simple
                      </button>
                      <button 
                        className={`filter-segment-btn ${jobTitleTab === 'advanced' ? 'active' : ''}`}
                        onClick={() => setJobTitleTab('advanced')}
                      >
                        Advanced
                      </button>
                    </div>

                    {/* Include */}
                    <div className="filter-form-group">
                      <label className="filter-form-label">Include</label>
                      <div className="filter-select-input-wrap">
                        <input 
                          type="text" 
                          placeholder="Search for a job title" 
                          value={filters.jobTitleSearch || ''}
                          onChange={(e) => {
                            setFilters(prev => ({ ...prev, jobTitleSearch: e.target.value }));
                            if (e.target.value) setViewMode('table');
                          }}
                          className="filter-select-input"
                        />
                        <ChevronDown size={14} color="#64748b" className="filter-select-arrow" />
                      </div>
                      <span className="filter-help-text">Use "quotation marks" to return exact matches</span>
                    </div>

                    {/* Checkbox: Include people with similar titles */}
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filters.includeSimilarTitles !== false} 
                        onChange={(e) => setFilters(prev => ({ ...prev, includeSimilarTitles: e.target.checked }))}
                      />
                      <span>Include people with similar titles</span>
                      <Info size={13} color="#94a3b8" />
                    </label>

                    {/* Exclude */}
                    <div className="filter-form-group">
                      <label className="filter-form-label">Exclude</label>
                      <div className="filter-select-input-wrap">
                        <input 
                          type="text" 
                          placeholder="Enter titles to exclude" 
                          className="filter-select-input"
                        />
                        <ChevronDown size={14} color="#64748b" className="filter-select-arrow" />
                      </div>
                    </div>

                    {/* Past job titles dropdown link */}
                    <div className="filter-sub-dropdown-link" onClick={() => setPastJobTitlesOpen(!pastJobTitlesOpen)}>
                      <span>Past job titles</span>
                      <ChevronDown size={13} color="#2563eb" />
                    </div>

                    <div className="filter-divider" />

                    {/* Management Level */}
                    <div className="filter-sub-accordion-btn" onClick={() => setManagementLevelOpen(!managementLevelOpen)}>
                      <span>Management Level</span>
                      <ChevronDown size={14} color="#64748b" />
                    </div>

                    {/* Departments & Job Function */}
                    <div className="filter-sub-accordion-btn" onClick={() => setDepartmentsOpen(!departmentsOpen)}>
                      <span>Departments & Job Function</span>
                      <ChevronDown size={14} color="#64748b" />
                    </div>

                    <div className="filter-divider" />

                    {/* Persona Box */}
                    <div className="persona-cta-box">
                      <button className="create-persona-white-btn" onClick={() => showToast('Opening Persona Builder...')}>
                        <UserPlus size={15} color="#2563eb" />
                        <span>Create New Persona</span>
                      </button>
                      <a href="#persona-help" className="persona-help-link" onClick={(e) => { e.preventDefault(); showToast('A Persona is a saved target audience filter set.'); }}>
                        What's a Persona?
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. People Lookalikes (With Lock Icon) */}
              <div className="exact-acc-item">
                <div 
                  className="exact-acc-header" 
                  onClick={() => setLookalikesModalOpen(true)}
                >
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon"><User size={15} color="#475569" strokeWidth={1.8} /></span>
                    <span className="exact-acc-label">People Lookalikes</span>
                  </div>
                  <Lock size={14} color="#2563eb" />
                </div>
              </div>

              {/* 3. Company */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('company')}>
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon"><Building2 size={15} color="#475569" strokeWidth={1.8} /></span>
                    <span className="exact-acc-label">Company</span>
                  </div>
                  {accordionOpen.company ? <ChevronUp size={14} color="#2563eb" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
                {accordionOpen.company && (
                  <div className="exact-acc-body">
                    {/* Card 1: Is any of (Active Blue Card) */}
                    <div className={`filter-radio-card ${companyFilterMode === 'is_any_of' ? 'active-card' : 'inactive-card'}`}>
                      <div className="radio-card-header" onClick={() => setCompanyFilterMode('is_any_of')}>
                        <div className={`custom-radio-circle ${companyFilterMode === 'is_any_of' ? 'selected' : ''}`}>
                          {companyFilterMode === 'is_any_of' && <div className="radio-dot" />}
                        </div>
                        <span className="radio-card-title">Is any of</span>
                      </div>

                      {companyFilterMode === 'is_any_of' && (
                        <div className="radio-card-body">
                          <div className="filter-select-input-wrap">
                            <input 
                              type="text" 
                              placeholder="Enter companies..." 
                              value={filters.companySearch || ''}
                              onChange={(e) => {
                                setFilters(prev => ({ ...prev, companySearch: e.target.value }));
                                if (e.target.value) setViewMode('table');
                              }}
                              className="filter-select-input"
                            />
                            <ChevronDown size={14} color="#64748b" className="filter-select-arrow" />
                          </div>

                          <div className="checkboxes-vertical-list">
                            <label className="filter-checkbox-label">
                              <input type="checkbox" />
                              <span>Is not any of</span>
                            </label>
                            <label className="filter-checkbox-label">
                              <input type="checkbox" />
                              <span>Include past company</span>
                            </label>
                            <label className="filter-checkbox-label">
                              <input type="checkbox" />
                              <span>Exclude past company</span>
                            </label>
                            <label className="filter-checkbox-label">
                              <input type="checkbox" />
                              <span>Domain exists</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card 2: Is known */}
                    <div 
                      className={`filter-radio-card single-line-card ${companyFilterMode === 'is_known' ? 'active-card' : 'inactive-card'}`}
                      onClick={() => setCompanyFilterMode('is_known')}
                    >
                      <div className={`custom-radio-circle ${companyFilterMode === 'is_known' ? 'selected' : ''}`}>
                        {companyFilterMode === 'is_known' && <div className="radio-dot" />}
                      </div>
                      <span className="radio-card-title">Is known</span>
                    </div>

                    {/* Card 3: Is unknown */}
                    <div 
                      className={`filter-radio-card single-line-card ${companyFilterMode === 'is_unknown' ? 'active-card' : 'inactive-card'}`}
                      onClick={() => setCompanyFilterMode('is_unknown')}
                    >
                      <div className={`custom-radio-circle ${companyFilterMode === 'is_unknown' ? 'selected' : ''}`}>
                        {companyFilterMode === 'is_unknown' && <div className="radio-dot" />}
                      </div>
                      <span className="radio-card-title">Is unknown</span>
                    </div>

                    <div className="filter-divider" />

                    {/* Include / exclude list of companies */}
                    <div className="filter-sub-dropdown-link" onClick={() => showToast('Opening bulk company list modal...')}>
                      <span>Include / exclude list of companies</span>
                      <ChevronDown size={13} color="#2563eb" />
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Location */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('location')}>
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon"><MapPin size={15} color="#475569" strokeWidth={1.8} /></span>
                    <span className="exact-acc-label">Location</span>
                  </div>
                  {accordionOpen.location ? <ChevronUp size={14} color="#2563eb" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
                {accordionOpen.location && (
                  <div className="exact-acc-body">
                    {/* Contact vs Account HQ Tabs */}
                    <div className="location-tabs-bar">
                      <button 
                        className={`location-tab-btn ${locationTab === 'contact' ? 'active' : ''}`}
                        onClick={() => setLocationTab('contact')}
                      >
                        <User size={14} />
                        <span>Contact</span>
                      </button>
                      <button 
                        className={`location-tab-btn ${locationTab === 'account_hq' ? 'active' : ''}`}
                        onClick={() => setLocationTab('account_hq')}
                      >
                        <Building2 size={14} />
                        <span>Account HQ</span>
                      </button>
                    </div>

                    {/* Card 1: Select region */}
                    <div className={`filter-radio-card ${locationFilterMode === 'region' ? 'active-card' : 'inactive-card'}`}>
                      <div className="radio-card-header" onClick={() => setLocationFilterMode('region')}>
                        <div className={`custom-radio-circle ${locationFilterMode === 'region' ? 'selected' : ''}`}>
                          {locationFilterMode === 'region' && <div className="radio-dot" />}
                        </div>
                        <span className="radio-card-title">Select region</span>
                      </div>

                      {locationFilterMode === 'region' && (
                        <div className="radio-card-body">
                          <span className="filter-form-sublabel">City / State / Country / ZIP</span>
                          <div className="filter-select-input-wrap">
                            <input 
                              type="text" 
                              placeholder="Enter locations..." 
                              value={filters.locationSearch || ''}
                              onChange={(e) => {
                                setFilters(prev => ({ ...prev, locationSearch: e.target.value }));
                                if (e.target.value) setViewMode('table');
                              }}
                              className="filter-select-input"
                            />
                            <ChevronDown size={14} color="#64748b" className="filter-select-arrow" />
                          </div>

                          <div className="filter-sub-dropdown-link" onClick={() => showToast('Exclude locations option toggled')}>
                            <span>Exclude locations</span>
                            <ChevronDown size={13} color="#2563eb" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card 2: Select ZIP code radius */}
                    <div 
                      className={`filter-radio-card single-line-card ${locationFilterMode === 'radius' ? 'active-card' : 'inactive-card'}`}
                      onClick={() => setLocationFilterMode('radius')}
                    >
                      <div className={`custom-radio-circle ${locationFilterMode === 'radius' ? 'selected' : ''}`}>
                        {locationFilterMode === 'radius' && <div className="radio-dot" />}
                      </div>
                      <span className="radio-card-title">Select ZIP code radius</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Industry & Keywords */}
              <div className="exact-acc-item">
                <div className="exact-acc-header" onClick={() => toggleAccordion('industry')}>
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon"><FileSpreadsheet size={15} color="#475569" strokeWidth={1.8} /></span>
                    <span className="exact-acc-label">Industry & Keywords</span>
                  </div>
                  {accordionOpen.industry ? <ChevronUp size={14} color="#2563eb" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
                {accordionOpen.industry && (
                  <div className="exact-acc-body">
                    {/* Top Industry search input */}
                    <div className="filter-select-input-wrap">
                      <input 
                        type="text" 
                        placeholder="Search industries..." 
                        value={filters.industrySearch || ''}
                        onChange={(e) => {
                          setFilters(prev => ({ ...prev, industrySearch: e.target.value }));
                          if (e.target.value) setViewMode('table');
                        }}
                        className="filter-select-input"
                      />
                      <ChevronDown size={14} color="#64748b" className="filter-select-arrow" />
                    </div>

                    <div className="filter-sub-dropdown-link" onClick={() => showToast('Opening Advanced Industry Settings...')}>
                      <span>Advanced settings</span>
                      <ChevronDown size={13} color="#2563eb" />
                    </div>

                    <div className="filter-divider" />

                    {/* Company Keywords Sub-Section */}
                    <div className="filter-collapsible-section-header" onClick={() => setKeywordsSubSectionOpen(!keywordsSubSectionOpen)}>
                      <div className="section-title-left">
                        <span className="section-title-text">Company Keywords</span>
                        <HelpCircle size={14} color="#2563eb" />
                      </div>
                      {keywordsSubSectionOpen ? <ChevronUp size={14} color="#2563eb" /> : <ChevronDown size={14} color="#2563eb" />}
                    </div>

                    {keywordsSubSectionOpen && (
                      <div className="keywords-sub-section-body">
                        {/* Card 1: Include keywords (Active Blue Card) */}
                        <div className={`filter-radio-card ${includeKeywordsChecked ? 'active-card' : 'inactive-card'}`}>
                          <label className="checkbox-card-header" onClick={(e) => { e.stopPropagation(); setIncludeKeywordsChecked(!includeKeywordsChecked); }}>
                            <input 
                              type="checkbox" 
                              checked={includeKeywordsChecked} 
                              onChange={(e) => setIncludeKeywordsChecked(e.target.checked)}
                            />
                            <span className="radio-card-title">Include keywords</span>
                          </label>

                          {includeKeywordsChecked && (
                            <div className="radio-card-body">
                              <div className="filter-select-input-wrap">
                                <input 
                                  type="text" 
                                  placeholder="e.g. Cloud, AWS" 
                                  className="filter-select-input"
                                />
                                <ChevronDown size={14} color="#64748b" className="filter-select-arrow" />
                              </div>

                              <div className="filter-keyword-type-row">
                                <div className="filter-sub-dropdown-link" onClick={() => showToast('Keyword types: Product, Technology, Skill')}>
                                  <span>Type of Keywords</span>
                                  <ChevronDown size={13} color="#2563eb" />
                                </div>
                                <span className="warning-icon" title="Keywords filter may slow down search">⚠️</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Card 2: Include ALL */}
                        <div 
                          className={`filter-radio-card single-line-card ${includeAllKeywordsChecked ? 'active-card' : 'inactive-card'}`}
                          onClick={() => setIncludeAllKeywordsChecked(!includeAllKeywordsChecked)}
                        >
                          <input 
                            type="checkbox" 
                            checked={includeAllKeywordsChecked}
                            onChange={(e) => setIncludeAllKeywordsChecked(e.target.checked)}
                          />
                          <span className="radio-card-title">Include ALL</span>
                        </div>

                        {/* Card 3: Exclude keywords */}
                        <div 
                          className={`filter-radio-card single-line-card ${excludeKeywordsChecked ? 'active-card' : 'inactive-card'}`}
                          onClick={() => setExcludeKeywordsChecked(!excludeKeywordsChecked)}
                        >
                          <input 
                            type="checkbox" 
                            checked={excludeKeywordsChecked}
                            onChange={(e) => setExcludeKeywordsChecked(e.target.checked)}
                          />
                          <span className="radio-card-title">Exclude keywords</span>
                        </div>

                        <span className="keywords-footnote-text">Keywords filters may slow down your search.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Actions of Sidebar (Matching Original Apollo) */}
            <div className="exact-sidebar-footer">
              <button 
                className="exact-clear-all-btn" 
                onClick={() => { 
                  setFilters(initialFilterState); 
                  showToast('Cleared all filters'); 
                }}
              >
                Clear all
              </button>
              <button 
                className="exact-view-more-filters-btn" 
                onClick={() => showToast('Opening 60+ Filters...')}
              >
                View 60+ Filters
              </button>
            </div>
          </aside>
        )}

        {/* ── CENTER MAIN CONTENT (AI LANDING VS TABLE VIEW) ── */}
        <main className="prospect-main-content exact-main">
          
          {viewMode === 'landing' && !searchQuery ? (
            /* ── AI LANDING / QUICK FILTERS VIEW (MATCHES SCREENSHOT 1:1) ── */
            <div className="people-ai-landing-wrap">
              <h2 className="landing-ai-title">Use Apollo AI to find the right prospects</h2>

              {/* Star AI Search Input Box */}
              <div className="landing-ai-search-box">
                <span className="star-graphic-icon">❋</span>
                <input 
                  type="text" 
                  placeholder="Example: Look for Business Analysts working in companies located in Singapore" 
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
                          onClick={() => {
                            toggleFilterItem('locations', 'United States');
                            setViewMode('table');
                          }}
                        >
                          United States
                        </button>
                        <button 
                          className={`quick-chip-btn ${filters.locations.includes('Canada') ? 'active' : ''}`}
                          onClick={() => {
                            toggleFilterItem('locations', 'Canada');
                            setViewMode('table');
                          }}
                        >
                          Canada
                        </button>
                      </div>
                    </div>

                    {/* Email Status */}
                    <div className="quick-filter-group">
                      <span className="group-label">Email Status</span>
                      <div className="chips-row">
                        <button 
                          className={`quick-chip-btn ${filters.emailStatuses.includes('Verified') ? 'active' : ''}`}
                          onClick={() => {
                            toggleFilterItem('emailStatuses', 'Verified');
                            setViewMode('table');
                          }}
                        >
                          Verified
                        </button>
                        <button 
                          className={`quick-chip-btn ${filters.emailStatuses.includes('Unverified') ? 'active' : ''}`}
                          onClick={() => {
                            toggleFilterItem('emailStatuses', 'Unverified');
                            setViewMode('table');
                          }}
                        >
                          Unverified
                        </button>
                        <button 
                          className={`quick-chip-btn ${filters.emailStatuses.includes('Unavailable') ? 'active' : ''}`}
                          onClick={() => {
                            toggleFilterItem('emailStatuses', 'Unavailable');
                            setViewMode('table');
                          }}
                        >
                          Unavailable
                        </button>
                      </div>
                    </div>

                    {/* Job Titles */}
                    <div className="quick-filter-group">
                      <span className="group-label">Job Titles</span>
                      <div className="chips-row">
                        <button 
                          className={`quick-chip-btn ${filters.jobTitles.includes('founder') ? 'active' : ''}`}
                          onClick={() => {
                            toggleFilterItem('jobTitles', 'founder');
                            setViewMode('table');
                          }}
                        >
                          founder
                        </button>
                        <button 
                          className={`quick-chip-btn ${filters.jobTitles.includes('sales manager') ? 'active' : ''}`}
                          onClick={() => {
                            toggleFilterItem('jobTitles', 'sales manager');
                            setViewMode('table');
                          }}
                        >
                          sales manager
                        </button>
                        <button 
                          className={`quick-chip-btn ${filters.jobTitles.includes('marketing director') ? 'active' : ''}`}
                          onClick={() => {
                            toggleFilterItem('jobTitles', 'marketing director');
                            setViewMode('table');
                          }}
                        >
                          marketing director
                        </button>
                      </div>
                    </div>

                    {/* Industry */}
                    <div className="quick-filter-group">
                      <span className="group-label">Industry</span>
                      <div className="chips-row">
                        <button 
                          className={`quick-chip-btn ${filters.industries.includes('Information Technology & Services') ? 'active' : ''}`}
                          onClick={() => {
                            toggleFilterItem('industries', 'Information Technology & Services');
                            setViewMode('table');
                          }}
                        >
                          Information Technology & Services
                        </button>
                        <button 
                          className={`quick-chip-btn ${filters.industries.includes('Marketing & Advertising') ? 'active' : ''}`}
                          onClick={() => {
                            toggleFilterItem('industries', 'Marketing & Advertising');
                            setViewMode('table');
                          }}
                        >
                          Marketing & Advertising
                        </button>
                        <button 
                          className={`quick-chip-btn ${filters.industries.includes('Retail') ? 'active' : ''}`}
                          onClick={() => {
                            toggleFilterItem('industries', 'Retail');
                            setViewMode('table');
                          }}
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
                  <button className="view-plans-yellow-btn" onClick={() => { window.location.hash = '#/app/plans'; }}>
                    View plans
                  </button>
                </div>
              </div>
            </div>
          ) : (
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
          )}
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

      {/* ── 9. SEARCH SETTINGS DRAWER (1:1 TO SCREENSHOTS) ── */}
      {searchSettingsDrawerOpen && (
        <div className="prospect-drawer-backdrop" onClick={() => setSearchSettingsDrawerOpen(false)}>
          <div className="search-settings-exact-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="search-settings-drawer-header">
              <h2 className="search-settings-title">Search settings</h2>
              <button 
                className="search-settings-close-btn" 
                onClick={() => setSearchSettingsDrawerOpen(false)}
                aria-label="Close search settings"
              >
                <X size={18} />
              </button>
            </div>

            <div className="search-settings-drawer-body">
              {/* If opened from "Save as new search", show the Saved search name input */}
              {searchSettingsDrawerMode === 'save_new' && (
                <div className="search-settings-form-group">
                  <label className="search-settings-label">
                    Saved search name <span className="red-asterisk">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={saveSearchName}
                    onChange={(e) => {
                      setSaveSearchName(e.target.value);
                      if (e.target.value.trim()) setShowNameError(false);
                    }}
                    placeholder="Default view"
                    className="search-settings-name-input"
                    autoFocus
                  />
                  {showNameError && !saveSearchName.trim() && (
                    <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                      This field is required.
                    </span>
                  )}
                </div>
              )}

              {/* Fields Section */}
              <div className="search-settings-section">
                <div className="search-settings-section-title">Fields</div>
                <div 
                  className={`search-settings-row ${searchSettingsDrawerMode === 'settings' ? 'focused-box' : ''}`}
                  onClick={() => {
                    setColumnModalOpen(true);
                  }}
                >
                  <div className="search-settings-row-left">
                    <List size={16} color="#475569" strokeWidth={1.8} />
                    <span>Fields</span>
                  </div>
                  <div className="search-settings-row-right">
                    <span className="search-settings-badge">14</span>
                    <span className="search-settings-arrow">&#9654;</span>
                  </div>
                </div>
              </div>

              {/* Applied filters Section */}
              <div className="search-settings-section">
                <div className="search-settings-section-title">Applied filters</div>
                <div 
                  className="search-settings-row"
                  onClick={() => {
                    setFilterSidebarOpen(true);
                  }}
                >
                  <div className="search-settings-row-left">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="4" y1="6" x2="20" y2="6" />
                      <line x1="6" y1="12" x2="18" y2="12" />
                      <line x1="9" y1="18" x2="15" y2="18" />
                    </svg>
                    <span>Filters</span>
                  </div>
                  <div className="search-settings-row-right">
                    <span className="search-settings-badge">{activeFiltersCount}</span>
                    <span className="search-settings-arrow">&#9654;</span>
                  </div>
                </div>
              </div>

              {/* More settings Section (only in save_new mode) */}
              {searchSettingsDrawerMode === 'save_new' && (
                <div className="search-settings-section">
                  <div className="search-settings-section-title">More settings</div>
                  
                  <div className="search-settings-row" onClick={() => showToast('Visibility: Restricted')}>
                    <div className="search-settings-row-left">
                      <Lock size={16} color="#475569" strokeWidth={1.8} />
                      <span>Visibility and sharing</span>
                    </div>
                    <div className="search-settings-row-right">
                      <span className="search-settings-val">Restricted</span>
                    </div>
                  </div>

                  <div className="search-settings-row" onClick={() => showToast('Subscription alerts: None')}>
                    <div className="search-settings-row-left">
                      <Bell size={16} color="#475569" strokeWidth={1.8} />
                      <span>Subscription alerts</span>
                    </div>
                    <div className="search-settings-row-right">
                      <span className="search-settings-val">None</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer (only in save_new mode) */}
            {searchSettingsDrawerMode === 'save_new' && (
              <div className="search-settings-drawer-footer">
                <button 
                  className="search-settings-cancel-btn" 
                  onClick={() => setSearchSettingsDrawerOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="search-settings-create-btn"
                  onClick={() => {
                    if (!saveSearchName.trim()) {
                      setShowNameError(true);
                      return;
                    }
                    const finalName = saveSearchName.trim();
                    const newSearchItem = {
                      id: 'search_' + Date.now(),
                      name: finalName,
                      filters: { ...filters },
                      isCustom: true
                    };
                    setSavedSearches(prev => [newSearchItem, ...prev]);
                    setSelectedViewId(newSearchItem.id);
                    setSelectedViewName(finalName);
                    showToast(`Created search "${finalName}"`);
                    setSearchSettingsDrawerOpen(false);
                  }}
                >
                  Create search
                </button>
              </div>
            )}
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

      {/* ── LOOKALIKES / ADVANCED FILTERS MODAL (1:1 ORIGINAL APOLLO MATCH) ── */}
      {lookalikesModalOpen && (
        <div className="lookalikes-modal-overlay" onClick={() => setLookalikesModalOpen(false)}>
          <div className="lookalikes-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lookalikes-modal-close-btn" 
              onClick={() => setLookalikesModalOpen(false)}
            >
              <X size={18} />
            </button>

            {/* Illustration Box */}
            <div className="lookalikes-modal-illustration">
              <svg width="260" height="140" viewBox="0 0 260 140" fill="none">
                {/* Center Funnel Top Rim */}
                <rect x="75" y="48" width="110" height="9" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="1.8" />
                
                {/* Funnel Cone */}
                <polygon points="85,57 175,57 148,105 112,105" fill="#f5ede0" stroke="#1e293b" strokeWidth="1.8" strokeLinejoin="round" />
                
                {/* Lower Tube */}
                <rect x="112" y="105" width="36" height="26" rx="2" fill="#f5ede0" stroke="#1e293b" strokeWidth="1.8" />
                <line x1="108" y1="105" x2="152" y2="105" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />

                {/* Top Floating Circle - Calendar */}
                <g transform="translate(130, 28)">
                  <circle cx="0" cy="0" r="16" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1.8" />
                  <rect x="-7" y="-6" width="14" height="12" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="1.2" />
                  <line x1="-7" y1="-2" x2="7" y2="-2" stroke="#1e293b" strokeWidth="1.2" />
                  <line x1="-4" y1="-8" x2="-4" y2="-5" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="4" y1="-8" x2="4" y2="-5" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
                </g>

                {/* Left Floating Circle - Person */}
                <g transform="translate(78, 92)">
                  <circle cx="0" cy="0" r="16" fill="#e0e7ff" stroke="#1e293b" strokeWidth="1.8" />
                  <circle cx="0" cy="-3" r="4.5" fill="#ffffff" stroke="#1e293b" strokeWidth="1.2" />
                  <path d="M-8 9C-8 5 -4 4 0 4C4 4 8 5 8 9" fill="#ffffff" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
                </g>

                {/* Right Floating Circle - Email Envelope */}
                <g transform="translate(182, 80)">
                  <circle cx="0" cy="0" r="16" fill="#ffe4e6" stroke="#1e293b" strokeWidth="1.8" />
                  <rect x="-8" y="-6" width="16" height="12" rx="2" fill="#ffffff" stroke="#1e293b" strokeWidth="1.2" />
                  <polyline points="-8,-5 0,1 8,-5" fill="none" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            </div>

            {/* Modal Title & Description */}
            <h3 className="lookalikes-modal-title">Advanced filters aren't included in your plan</h3>
            <p className="lookalikes-modal-subtitle">
              Upgrade now to unlock <strong>65+ filters</strong> for smarter targeting.
            </p>

            {/* Footer Yellow Button */}
            <div className="lookalikes-modal-footer">
              <button 
                className="lookalikes-pricing-btn"
                onClick={() => {
                  setLookalikesModalOpen(false);
                  if (onSelectTab) {
                    onSelectTab('pricing');
                  } else {
                    window.location.hash = '#/pricing';
                  }
                  showToast('Redirecting to Pricing Plans...');
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
