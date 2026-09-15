import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, ChevronDown, ChevronUp, X, Check, Download, Sparkles,
  Mail, Bookmark, Building2, MapPin, Users, ArrowUpDown, LayoutGrid, UserPlus,
  Trash2, FileSpreadsheet, Play, Lock, Send, Globe, MessageSquare, ChevronRight, SlidersHorizontal, Sliders, Zap, Mic, Settings, DollarSign, Bell, List, MoreHorizontal, Info
} from 'lucide-react';
import { FULL_COMPANIES_DATA } from './mockCompaniesData';
import '../../css/companies-prospect.css';
import '../../css/people-prospect.css';

export default function CompaniesProspectView({ showToast, onSelectTab }) {
  // Main Data State
  const [companiesData, setCompaniesData] = useState(FULL_COMPANIES_DATA);

  // Active Tab: 'total' | 'net_new' | 'saved'
  const [activeTab, setActiveTab] = useState('total');

  // Lookalikes / Advanced Filters Upgrade Modal
  const [lookalikesModalOpen, setLookalikesModalOpen] = useState(false);

  // Selected Row Checkboxes
  const [selectedIds, setSelectedIds] = useState([]);

  // Main Search & Filter Sidebar Toggle
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);

  // Default View Popover State (1:1 Match to Screenshot)
  const [defaultViewDropdownOpen, setDefaultViewDropdownOpen] = useState(false);
  const [defaultViewSearch, setDefaultViewSearch] = useState('');
  const [defaultViewTab, setDefaultViewTab] = useState('all');
  const [selectedViewName, setSelectedViewName] = useState('Default view');
  const [selectedViewId, setSelectedViewId] = useState('default_view');
  const [importDropdownOpen, setImportDropdownOpen] = useState(false);
  const [researchAiDropdownOpen, setResearchAiDropdownOpen] = useState(false);
  const [workflowDropdownOpen, setWorkflowDropdownOpen] = useState(false);

  // Sorting & View Mode
  const [sortBy, setSortBy] = useState('relevance');
  const [sortByField, setSortByField] = useState('Relevance');
  const [sortOrderDirection, setSortOrderDirection] = useState('Descending');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState('landing'); // 'landing' (quick filters card) or 'table'

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);

  // Drawers & Modals
  const [selectedCompanyForDrawer, setSelectedCompanyForDrawer] = useState(null);
  const [searchSettingsDrawerOpen, setSearchSettingsDrawerOpen] = useState(false);
  const [searchSettingsDrawerMode, setSearchSettingsDrawerMode] = useState('save_new');
  const [savedSearches, setSavedSearches] = useState([]);
  const [saveSearchName, setSaveSearchName] = useState('');
  const [showNameError, setShowNameError] = useState(false);

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

  // Filter State
  const initialFilterState = {
    locations: [],
    empRanges: [],
    industries: [],
    companies: []
  };
  const [filters, setFilters] = useState(initialFilterState);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.locations.length > 0) count += filters.locations.length;
    if (filters.empRanges.length > 0) count += filters.empRanges.length;
    if (filters.industries.length > 0) count += filters.industries.length;
    if (filters.companies.length > 0) count += filters.companies.length;
    return count;
  }, [filters]);

  // Filter Accordion Open States
  const [accordionOpen, setAccordionOpen] = useState({
    company: false,
    lookalikes: false,
    location: false,
    employees: false,
    industry: false,
    websiteVisitors: false
  });

  const toggleAccordion = (key) => {
    setAccordionOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Accordion sub-filter states
  const [companyFilterMode, setCompanyFilterMode] = useState('is_any_of');
  const [companyIsNotAnyOf, setCompanyIsNotAnyOf] = useState(false);
  const [companyDomainExists, setCompanyDomainExists] = useState(false);
  const [companySearchInput, setCompanySearchInput] = useState('');

  const [locationFilterMode, setLocationFilterMode] = useState('region');
  const [locationSearchInput, setLocationSearchInput] = useState('');

  const [employeeFilterMode, setEmployeeFilterMode] = useState('predefined');

  const [industryFilterMode, setIndustryFilterMode] = useState('is_any_of');
  const [industryIsNotAnyOf, setIndustryIsNotAnyOf] = useState(false);
  const [industrySearchInput, setIndustrySearchInput] = useState('');

  const EMPLOYEE_RANGES = [
    { label: '1-10', count: '17.8M' },
    { label: '11-20', count: '1.9M' },
    { label: '21-50', count: '1.3M' },
    { label: '51-100', count: '490.8K' },
    { label: '101-200', count: '205.8K' },
    { label: '201-500', count: '152.6K' },
    { label: '501-1000', count: '65.8K' },
    { label: '1001-2000', count: '36.4K' },
    { label: '2001-5000', count: '29.2K' },
    { label: '5001-10000', count: '9.4K' },
    { label: '10001+', count: '9.9K' }
  ];

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
    setCompanySearchInput('');
    setLocationSearchInput('');
    setIndustrySearchInput('');
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
                    showToast('Opening Single company creation form...');
                  }}
                >
                  Single company
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
                            if (search.filters) setFilters(prev => ({ ...prev, ...search.filters }));
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
                  const userSearches = savedSearches.filter(s => (s.isUserCreated || s.isCustom) && (!query || s.name.toLowerCase().includes(query)));

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
                            if (search.filters) setFilters(prev => ({ ...prev, ...search.filters }));
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
                    <div className="popover-empty-title">No shared saved searches to see yet</div>
                    <div className="popover-empty-desc">Keep up-to-date on shared saved searches. When someone shares a saved search with you, you'll see it here.</div>
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

          {/* Search Input Box */}
          <div className="prospect-search-input-wrap exact-search">
            <Search size={15} color="#6b7280" className="search-icon" />
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
                    showToast('Opening Custom AI Prompt for companies...');
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

      {/* ── 3. MAIN WORKSPACE CONTENT ── */}
      <div className="prospect-workspace-body exact-body">
        
        {/* ── LEFT FILTER SIDEBAR (1:1 ORIGINAL MATCH TO SCREENSHOTS) ── */}
        {filterSidebarOpen && (
          <aside className="prospect-filter-sidebar exact-sidebar">
            {/* Top View Tabs Box (Total 27.5M | Net New 27.5M | Saved 0) */}
            <div className="exact-sidebar-tabs-box">
              <div 
                className={`exact-tab-item ${activeTab === 'total' ? 'active' : ''}`} 
                onClick={() => { setActiveTab('total'); setViewMode('table'); }}
              >
                <div className="exact-tab-title">Total</div>
                <div className="exact-tab-count">27.5M</div>
              </div>
              <div 
                className={`exact-tab-item ${activeTab === 'net_new' ? 'active' : ''}`} 
                onClick={() => { setActiveTab('net_new'); setViewMode('table'); }}
              >
                <div className="exact-tab-title">Net New</div>
                <div className="exact-tab-count pill">27.5M</div>
              </div>
              <div 
                className={`exact-tab-item ${activeTab === 'saved' ? 'active' : ''}`} 
                onClick={() => { setActiveTab('saved'); setViewMode('table'); }}
              >
                <div className="exact-tab-title">Saved</div>
                <div className="exact-tab-count pill">{companiesData.filter(c => c.saved).length}</div>
              </div>
            </div>

            {/* Filter Accordion List */}
            <div className="exact-filter-accordions-list">
              
              {/* 1. Company Accordion */}
              <div className="exact-acc-item">
                <div 
                  className={`exact-acc-header ${accordionOpen.company ? 'open' : ''}`} 
                  onClick={() => toggleAccordion('company')}
                >
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon"><Building2 size={16} color={accordionOpen.company ? "#2563eb" : "#475569"} strokeWidth={1.8} /></span>
                    <span className="exact-acc-label" style={{ color: accordionOpen.company ? "#2563eb" : "#1e293b" }}>Company</span>
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
                              value={companySearchInput}
                              onChange={(e) => {
                                setCompanySearchInput(e.target.value);
                                if (e.target.value) {
                                  toggleFilterItem('companies', e.target.value);
                                }
                              }}
                              className="filter-select-input"
                            />
                            <ChevronDown size={14} color="#64748b" className="filter-select-arrow" />
                          </div>

                          <div className="checkboxes-vertical-list">
                            <label className="filter-checkbox-label">
                              <input 
                                type="checkbox" 
                                checked={companyIsNotAnyOf}
                                onChange={(e) => setCompanyIsNotAnyOf(e.target.checked)}
                              />
                              <span>Is not any of</span>
                            </label>
                            <label className="filter-checkbox-label">
                              <input 
                                type="checkbox" 
                                checked={companyDomainExists}
                                onChange={(e) => setCompanyDomainExists(e.target.checked)}
                              />
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
                    <div className="filter-sub-dropdown-link" onClick={() => showToast('Opening Include/exclude list of companies modal...')}>
                      <span>Include / exclude list of companies</span>
                      <ChevronDown size={13} color="#2563eb" />
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Lookalikes Accordion */}
              <div className="exact-acc-item">
                <div 
                  className="exact-acc-header" 
                  onClick={() => setLookalikesModalOpen(true)}
                >
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.8">
                        <rect x="3" y="3" width="13" height="18" rx="2" />
                        <circle cx="17" cy="12" r="4" fill="#ffffff" stroke="#475569" strokeWidth="1.5" />
                        <path d="M17 10v4" stroke="#475569" strokeWidth="1.3" />
                        <path d="M15 12h4" stroke="#475569" strokeWidth="1.3" />
                      </svg>
                    </span>
                    <span className="exact-acc-label">Lookalikes</span>
                  </div>
                  <Lock size={14} color="#2563eb" />
                </div>
              </div>

              {/* 3. Account Location Accordion */}
              <div className="exact-acc-item">
                <div 
                  className={`exact-acc-header ${accordionOpen.location ? 'open' : ''}`} 
                  onClick={() => toggleAccordion('location')}
                >
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon"><MapPin size={16} color={accordionOpen.location ? "#2563eb" : "#475569"} strokeWidth={1.8} /></span>
                    <span className="exact-acc-label" style={{ color: accordionOpen.location ? "#2563eb" : "#1e293b" }}>Account Location</span>
                  </div>
                  {accordionOpen.location ? <ChevronUp size={14} color="#2563eb" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
                {accordionOpen.location && (
                  <div className="exact-acc-body">
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
                              value={locationSearchInput}
                              onChange={(e) => {
                                setLocationSearchInput(e.target.value);
                                if (e.target.value) {
                                  toggleFilterItem('locations', e.target.value);
                                }
                              }}
                              className="filter-select-input"
                            />
                            <ChevronDown size={14} color="#64748b" className="filter-select-arrow" />
                          </div>

                          <div className="filter-sub-dropdown-link" onClick={() => showToast('Exclude locations options toggled')}>
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

              {/* 4. Employee Count Accordion */}
              <div className="exact-acc-item">
                <div 
                  className={`exact-acc-header ${accordionOpen.employees ? 'open' : ''}`} 
                  onClick={() => toggleAccordion('employees')}
                >
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon"><Users size={16} color={accordionOpen.employees ? "#2563eb" : "#475569"} strokeWidth={1.8} /></span>
                    <span className="exact-acc-label" style={{ color: accordionOpen.employees ? "#2563eb" : "#1e293b" }}># Employees</span>
                  </div>
                  {accordionOpen.employees ? <ChevronUp size={14} color="#2563eb" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
                {accordionOpen.employees && (
                  <div className="exact-acc-body">
                    <div className={`filter-radio-card ${employeeFilterMode === 'predefined' ? 'active-card' : 'inactive-card'}`}>
                      <div className="radio-card-header" onClick={() => setEmployeeFilterMode('predefined')}>
                        <div className={`custom-radio-circle ${employeeFilterMode === 'predefined' ? 'selected' : ''}`}>
                          {employeeFilterMode === 'predefined' && <div className="radio-dot" />}
                        </div>
                        <span className="radio-card-title">Predefined Range</span>
                      </div>

                      {employeeFilterMode === 'predefined' && (
                        <div className="employee-checkboxes-list">
                          {EMPLOYEE_RANGES.map((item) => (
                            <label key={item.label} className="employee-checkbox-row">
                              <div className="employee-checkbox-left">
                                <input 
                                  type="checkbox" 
                                  checked={filters.empRanges.includes(item.label)}
                                  onChange={() => toggleFilterItem('empRanges', item.label)}
                                />
                                <span>{item.label}</span>
                              </div>
                              <span className="employee-count-badge">{item.count}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Industry Accordion */}
              <div className="exact-acc-item">
                <div 
                  className={`exact-acc-header ${accordionOpen.industry ? 'open' : ''}`} 
                  onClick={() => toggleAccordion('industry')}
                >
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon"><FileSpreadsheet size={16} color={accordionOpen.industry ? "#2563eb" : "#475569"} strokeWidth={1.8} /></span>
                    <span className="exact-acc-label" style={{ color: accordionOpen.industry ? "#2563eb" : "#1e293b" }}>Industry & Keywords</span>
                  </div>
                  {accordionOpen.industry ? <ChevronUp size={14} color="#2563eb" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
                {accordionOpen.industry && (
                  <div className="exact-acc-body">
                    {/* Card 1: Is any of */}
                    <div className={`filter-radio-card ${industryFilterMode === 'is_any_of' ? 'active-card' : 'inactive-card'}`}>
                      <div className="radio-card-header" onClick={() => setIndustryFilterMode('is_any_of')}>
                        <div className={`custom-radio-circle ${industryFilterMode === 'is_any_of' ? 'selected' : ''}`}>
                          {industryFilterMode === 'is_any_of' && <div className="radio-dot" />}
                        </div>
                        <span className="radio-card-title">Is any of</span>
                      </div>

                      {industryFilterMode === 'is_any_of' && (
                        <div className="radio-card-body">
                          <div className="filter-select-input-wrap">
                            <input 
                              type="text" 
                              placeholder="Enter industries or keywords..." 
                              value={industrySearchInput}
                              onChange={(e) => {
                                setIndustrySearchInput(e.target.value);
                                if (e.target.value) {
                                  toggleFilterItem('industries', e.target.value);
                                }
                              }}
                              className="filter-select-input"
                            />
                            <ChevronDown size={14} color="#64748b" className="filter-select-arrow" />
                          </div>

                          <div className="checkboxes-vertical-list">
                            <label className="filter-checkbox-label">
                              <input 
                                type="checkbox" 
                                checked={industryIsNotAnyOf}
                                onChange={(e) => setIndustryIsNotAnyOf(e.target.checked)}
                              />
                              <span>Is not any of</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card 2: Is known */}
                    <div 
                      className={`filter-radio-card single-line-card ${industryFilterMode === 'is_known' ? 'active-card' : 'inactive-card'}`}
                      onClick={() => setIndustryFilterMode('is_known')}
                    >
                      <div className={`custom-radio-circle ${industryFilterMode === 'is_known' ? 'selected' : ''}`}>
                        {industryFilterMode === 'is_known' && <div className="radio-dot" />}
                      </div>
                      <span className="radio-card-title">Is known</span>
                    </div>

                    {/* Card 3: Is unknown */}
                    <div 
                      className={`filter-radio-card single-line-card ${industryFilterMode === 'is_unknown' ? 'active-card' : 'inactive-card'}`}
                      onClick={() => setIndustryFilterMode('is_unknown')}
                    >
                      <div className={`custom-radio-circle ${industryFilterMode === 'is_unknown' ? 'selected' : ''}`}>
                        {industryFilterMode === 'is_unknown' && <div className="radio-dot" />}
                      </div>
                      <span className="radio-card-title">Is unknown</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Website Visitors Accordion */}
              <div className="exact-acc-item">
                <div 
                  className={`exact-acc-header ${accordionOpen.websiteVisitors ? 'open' : ''}`} 
                  onClick={() => toggleAccordion('websiteVisitors')}
                >
                  <div className="exact-acc-left">
                    <span className="exact-acc-icon"><Globe size={16} color={accordionOpen.websiteVisitors ? "#2563eb" : "#475569"} strokeWidth={1.8} /></span>
                    <span className="exact-acc-label" style={{ color: accordionOpen.websiteVisitors ? "#2563eb" : "#1e293b" }}>Website Visitors</span>
                  </div>
                  {accordionOpen.websiteVisitors ? <ChevronUp size={14} color="#2563eb" /> : <ChevronDown size={14} color="#64748b" />}
                </div>
                {accordionOpen.websiteVisitors && (
                  <div className="exact-acc-body">
                    <div className="filter-radio-card active-card">
                      <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: '1.4', margin: 0 }}>
                        Identify anonymous companies visiting your website and turn traffic into pipeline.
                      </p>
                      <button 
                        className="create-persona-white-btn" 
                        style={{ marginTop: '8px' }}
                        onClick={() => showToast('Opening Website Visitor Tracking setup...')}
                      >
                        Set up Website Visitors
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Actions in Filter Sidebar (1:1 with Screenshot) */}
            <div className="exact-sidebar-footer">
              <button className="exact-clear-all-btn" onClick={resetAllFilters}>Clear filters</button>
              <button className="exact-view-more-filters-btn" onClick={() => showToast('Opening View 30+ Filters modal...')}>
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
                  <button className="view-plans-yellow-btn" onClick={() => { window.location.hash = '#/app/plans'; }}>
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
                    placeholder="Choose a search name"
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
                  onClick={() => showToast('Company Fields selection opened')}
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
                  onClick={() => setFilterSidebarOpen(true)}
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
