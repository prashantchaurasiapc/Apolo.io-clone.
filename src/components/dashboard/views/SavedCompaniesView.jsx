import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Plus,
  Sparkles,
  Zap,
  ArrowUpDown,
  Settings,
  Filter,
  Check,
  Award,
  Lock,
  Building2,
  MapPin,
  Globe,
  User,
  Users,
  X,
  LayoutGrid,
  FileText,
  MoreHorizontal,
  Layers,
  List,
  Bell,
  Download,
  Upload,
  HelpCircle
} from 'lucide-react';
import './SavedCompaniesView.css';

export const SavedCompaniesView = ({ showToast = () => {} }) => {
  // Main view & filter states
  const [activeViewName, setActiveViewName] = useState('My saved companies');
  const [showFilters, setShowFilters] = useState(false); // Default hidden as per initial state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterCount, setActiveFilterCount] = useState(1);
  const [companiesList, setCompaniesList] = useState([]); // Starts with 0 records like screenshot
  const [drawerMode, setDrawerMode] = useState(null); // null | 'view_options' | 'save_as_new_view'

  // Active Dropdowns state: null | 'saved_views' | 'ai_research' | 'workflow' | 'sort'
  const [openDropdown, setOpenDropdown] = useState(null);

  // Saved views tab in dropdown
  const [activeViewTab, setActiveViewTab] = useState('All views');
  const [viewSearchQuery, setViewSearchQuery] = useState('');

  // Modals state: null | 'create_company' | 'import'
  const [modalType, setModalType] = useState(null);
  const [newCompany, setNewCompany] = useState({
    name: '',
    phone: '',
    stage: '',
    enrichCompany: '',
    domain: '',
    linkedinUrl: '',
    location: '',
    researchGuidelines: '',
    researchTarget: '',
    businessSummary: '',
    outreachUrgency: '',
    qualificationStatus: '',
    reasoning: ''
  });

  const [companySections, setCompanySections] = useState({
    basicInfo: true,
    others: true
  });

  // Filter Accordions open state
  const [expandedFilters, setExpandedFilters] = useState({
    companyLookalikes: false,
    location: false,
    industry: false,
    employees: false,
    owner: true // Owner expanded with Current User x 1
  });

  // Click outside to close dropdowns
  const controlsRef = useRef(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (controlsRef.current && !controlsRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (e, name) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setOpenDropdown(prev => prev === name ? null : name);
  };

  const toggleFilterGroup = (groupKey) => {
    setExpandedFilters(prev => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  const handleSelectView = (name) => {
    setActiveViewName(name);
    setOpenDropdown(null);
    showToast(`Switched view to "${name}"`);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveFilterCount(0);
    showToast('Filters reset to default');
  };

  const handleCreateCompanySubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newCompany.name.trim()) return;

    const companyObj = {
      id: Date.now(),
      name: newCompany.name.trim(),
      domain: newCompany.domain || (newCompany.enrichCompany ? `${newCompany.enrichCompany.toLowerCase().replace(/\s+/g, '')}.com` : `${newCompany.name.toLowerCase().replace(/\s+/g, '')}.com`),
      industry: 'Technology & Software',
      employees: '50-200',
      location: newCompany.location || 'San Francisco, CA',
      phone: newCompany.phone || '',
      stage: newCompany.stage || 'Cold',
      linkedinUrl: newCompany.linkedinUrl || '',
      savedDate: 'Just now'
    };

    setCompaniesList(prev => [companyObj, ...prev]);
    setModalType(null);
    setNewCompany({
      name: '',
      phone: '',
      stage: '',
      enrichCompany: '',
      domain: '',
      linkedinUrl: '',
      location: '',
      researchGuidelines: '',
      researchTarget: '',
      businessSummary: '',
      outreachUrgency: '',
      qualificationStatus: '',
      reasoning: ''
    });
    showToast(`Added ${companyObj.name} to Companies!`);
  };

  // Saved Views Data for Companies
  const savedViewsList = [
    { name: 'My companies by stage', system: true },
    { name: 'My companies by activity date', system: true },
    { name: 'Companies from mailbox sync', system: true },
    { name: 'My saved companies', system: true },
    { name: 'All companies by activity date', system: true },
    { name: 'All companies by stage', system: true },
    { name: 'All saved companies', system: true }
  ];

  const filteredViews = savedViewsList.filter(v =>
    v.name.toLowerCase().includes(viewSearchQuery.toLowerCase())
  );

  return (
    <div className="sc-view-container">
      {/* ─── 1. Header Sticky ─── */}
      <div className="sc-header">
        <div className="sc-header-left">
          <h1 className="sc-title">Companies</h1>
          <p className="sc-subtitle">{companiesList.length} records</p>
        </div>
        <div className="sc-header-right">
          <button className="sc-btn-import" onClick={() => setModalType('import')}>
            Import
          </button>
          <button className="sc-btn-create-company" onClick={() => setModalType('create_company')}>
            <Plus size={14} /> Create company
          </button>
        </div>
      </div>

      {/* ─── 2. Controls & Action Bar ─── */}
      <div className="sc-controls-bar" ref={controlsRef}>
        {/* Dropdown 1: Saved Views */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            className={`sc-control-btn borderless ${openDropdown === 'saved_views' ? 'active' : ''}`}
            onClick={(e) => toggleDropdown(e, 'saved_views')}
          >
            <LayoutGrid size={15} color="#475569" />
            <span>{activeViewName}</span>
            {openDropdown === 'saved_views' ? (
              <ChevronUp size={14} color="#64748b" />
            ) : (
              <ChevronDown size={14} color="#64748b" />
            )}
          </button>

          {openDropdown === 'saved_views' && (
            <div className="sc-dropdown-menu sc-dd-views" onClick={(e) => e.stopPropagation()}>
              {/* Search views input */}
              <div className="sc-dd-views-search">
                <Search size={14} color="#2563eb" />
                <input
                  type="text"
                  placeholder="Search views"
                  value={viewSearchQuery}
                  onChange={(e) => setViewSearchQuery(e.target.value)}
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px' }}
                />
              </div>

              {/* Tabs */}
              <div className="sc-dd-views-tabs">
                {['All views', 'Your views', 'Starred', 'Shared'].map((tab) => (
                  <span
                    key={tab}
                    className={`sc-dd-tab ${activeViewTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveViewTab(tab)}
                  >
                    {tab}
                  </span>
                ))}
              </div>

              {/* Views List */}
              <div className="sc-dd-views-list">
                {filteredViews.map((item) => (
                  <div
                    key={item.name}
                    className={`sc-dd-view-item ${activeViewName === item.name ? 'selected' : ''}`}
                    onClick={() => handleSelectView(item.name)}
                  >
                    <div className="sc-dd-view-left">
                      <LayoutGrid size={14} color={activeViewName === item.name ? '#2563eb' : '#64748b'} />
                      <span>{item.name}</span>
                    </div>
                    <div className="sc-dd-view-right">
                      {item.system && <span className="sc-pill-system">System</span>}
                      {activeViewName === item.name && <Check size={14} color="#2563eb" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Button */}
              <div className="sc-dd-views-footer">
                <button
                  className="sc-btn-create-company"
                  style={{ fontSize: '12px', padding: '6px 14px', fontWeight: 600 }}
                  onClick={() => {
                    setOpenDropdown(null);
                    setDrawerMode('save_as_new_view');
                  }}
                >
                  Create new view
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Button 2: Show/Hide Filters Toggle */}
        <button
          className={`sc-control-btn borderless ${showFilters ? 'active' : ''}`}
          onClick={() => {
            setOpenDropdown(null);
            setShowFilters(!showFilters);
          }}
          style={{ flexShrink: 0 }}
        >
          <Filter size={15} color="#475569" />
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          {activeFilterCount > 0 && (
            <span className="sc-badge-count">{activeFilterCount}</span>
          )}
        </button>

        {/* Input 3: Search companies */}
        <div className="sc-search-box" onClick={() => setOpenDropdown(null)}>
          <Search size={14} color="#94a3b8" />
          <input
            type="text"
            className="sc-search-input"
            placeholder="Search companies"
            value={searchQuery}
            onFocus={() => setOpenDropdown(null)}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dropdown 4: Research with AI (Purple Button) */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            className={`sc-control-btn sc-btn-ai ${openDropdown === 'ai_research' ? 'active' : ''}`}
            onClick={(e) => toggleDropdown(e, 'ai_research')}
          >
            <Sparkles size={15} color="#6d28d9" />
            <span>Research with AI</span>
            {openDropdown === 'ai_research' ? (
              <ChevronUp size={14} color="#6d28d9" />
            ) : (
              <ChevronDown size={14} color="#6d28d9" />
            )}
          </button>

          {openDropdown === 'ai_research' && (
            <div className="sc-dropdown-menu sc-dd-ai" onClick={(e) => e.stopPropagation()}>
              <div
                className="sc-dd-ai-item"
                onClick={() => { setOpenDropdown(null); showToast('Running custom AI prompt on companies...'); }}
              >
                <Sparkles size={14} color="#6d28d9" />
                <span>Run custom AI prompt</span>
              </div>
              <div
                className="sc-dd-ai-item"
                onClick={() => { setOpenDropdown(null); showToast('Generating AI formula for company fields...'); }}
              >
                <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 700, fontSize: '14px', color: '#475569' }}>fx</span>
                <span>Generate AI formula</span>
              </div>

              <div className="sc-dd-divider" />

              <div
                className="sc-dd-ai-item"
                onClick={() => { setOpenDropdown(null); showToast('Opening Apollo Assistant...'); }}
              >
                <Globe size={14} color="#475569" />
                <span>Use Apollo Assistant</span>
              </div>
              <div
                className="sc-dd-ai-item"
                onClick={() => { setOpenDropdown(null); showToast('Opening AI Company Templates...'); }}
              >
                <MoreHorizontal size={14} color="#475569" />
                <span>Start with a template</span>
              </div>
            </div>
          )}
        </div>

        {/* Dropdown 5: Create workflow */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            className={`sc-control-btn bordered ${openDropdown === 'workflow' ? 'active' : ''}`}
            onClick={(e) => toggleDropdown(e, 'workflow')}
          >
            <Zap size={15} color="#475569" />
            <span>Create workflow</span>
            {openDropdown === 'workflow' ? (
              <ChevronUp size={14} color="#64748b" />
            ) : (
              <ChevronDown size={14} color="#64748b" />
            )}
          </button>

          {openDropdown === 'workflow' && (
            <div className="sc-dropdown-menu sc-dd-workflow" onClick={(e) => e.stopPropagation()}>
              <div className="sc-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Auto-add companies to sequence'); }}>
                Auto-add to sequence
              </div>
              <div className="sc-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Auto-add companies to lists'); }}>
                Auto-add to lists
              </div>
              <div className="sc-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Auto-update company records'); }}>
                Auto-update records
              </div>
              <div className="sc-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Creating company workflow from scratch...'); }}>
                Create from scratch
              </div>
            </div>
          )}
        </div>

        {/* Button 6: Save as new view */}
        <button
          className={`sc-control-btn bordered ${drawerMode === 'save_as_new_view' ? 'active' : ''}`}
          style={{ flexShrink: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            setOpenDropdown(null);
            setDrawerMode('save_as_new_view');
          }}
        >
          Save as new view
        </button>

        <div className="sc-divider-v" style={{ flexShrink: 0 }} />

        {/* Dropdown 7: Sort */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            className={`sc-control-btn borderless ${openDropdown === 'sort' ? 'active' : ''}`}
            onClick={(e) => toggleDropdown(e, 'sort')}
          >
            <ArrowUpDown size={15} color="#475569" />
            <span>Sort</span>
            {openDropdown === 'sort' ? (
              <ChevronUp size={14} color="#64748b" />
            ) : (
              <ChevronDown size={14} color="#64748b" />
            )}
          </button>

          {openDropdown === 'sort' && (
            <div className="sc-dropdown-menu sc-dd-sort" onClick={(e) => e.stopPropagation()}>
              <div className="sc-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Sorted by Last activity date'); }}>
                Last activity date
              </div>
              <div className="sc-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Sorted by Date saved (newest)'); }}>
                Date saved (newest)
              </div>
              <div className="sc-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Sorted by Name (A - Z)'); }}>
                Name (A - Z)
              </div>
              <div className="sc-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Sorted by Industry (A - Z)'); }}>
                Industry (A - Z)
              </div>
              <div className="sc-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Sorted by Employees (High - Low)'); }}>
                # of Employees (High - Low)
              </div>
            </div>
          )}
        </div>

        {/* Dropdown 8: View options */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            className={`sc-control-btn borderless ${drawerMode === 'view_options' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setOpenDropdown(null);
              setDrawerMode('view_options');
            }}
          >
            <Settings size={15} color="#475569" />
            <span>View options</span>
          </button>
        </div>
      </div>

      {/* ─── 3. Main Body Workspace ─── */}
      <div className="sc-workspace">
        {/* Left Filter Sidebar (Toggled via Show/Hide Filters) */}
        {showFilters && (
          <div className="sc-sidebar">
            <div className="sc-sidebar-content">
              {/* Filter 1: Company Lookalikes (Locked) */}
              <div className="sc-filter-group">
                <div className="sc-filter-header" onClick={() => showToast('Company Lookalikes requires Enterprise plan')}>
                  <div className="sc-filter-left">
                    <Building2 size={15} color="#64748b" />
                    <span>Company Lookalikes</span>
                  </div>
                  <Lock size={13} color="#0284c7" />
                </div>
              </div>

              {/* Filter 2: Company Location */}
              <div className="sc-filter-group">
                <div className="sc-filter-header" onClick={() => toggleFilterGroup('location')}>
                  <div className="sc-filter-left">
                    <MapPin size={15} color="#64748b" />
                    <span>Company Location</span>
                  </div>
                  <ChevronDown size={14} color="#94a3b8" />
                </div>
              </div>

              {/* Filter 3: Industry & Keywords */}
              <div className="sc-filter-group">
                <div className="sc-filter-header" onClick={() => toggleFilterGroup('industry')}>
                  <div className="sc-filter-left">
                    <LayoutGrid size={15} color="#64748b" />
                    <span>Industry & Keywords</span>
                  </div>
                  <ChevronDown size={14} color="#94a3b8" />
                </div>
              </div>

              {/* Filter 4: # of Employees */}
              <div className="sc-filter-group">
                <div className="sc-filter-header" onClick={() => toggleFilterGroup('employees')}>
                  <div className="sc-filter-left">
                    <Users size={15} color="#64748b" />
                    <span># of Employees</span>
                  </div>
                  <ChevronDown size={14} color="#94a3b8" />
                </div>
              </div>

              {/* Filter 5: Owner (Active Filter) */}
              <div className="sc-filter-group">
                <div className="sc-filter-header" onClick={() => toggleFilterGroup('owner')}>
                  <div className="sc-filter-left">
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb' }} />
                    <User size={15} color="#64748b" />
                    <span>Owner</span>
                    <span className="sc-badge-count" style={{ fontSize: '10px' }}>x 1</span>
                  </div>
                  <ChevronDown size={14} color="#94a3b8" />
                </div>

                {expandedFilters.owner && (
                  <div className="sc-filter-body">
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                      Account Owner:
                    </div>
                    <span className="sc-filter-chip">
                      Current User
                      <X size={12} color="#64748b" style={{ cursor: 'pointer' }} onClick={handleResetFilters} />
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="sc-sidebar-footer">
              <button className="sc-btn-clear-all" onClick={handleResetFilters}>
                Clear all {activeFilterCount}
              </button>
              <button className="sc-btn-view-more" onClick={() => showToast('60+ Filters Drawer')}>
                View 60+ Filters
              </button>
            </div>
          </div>
        )}

        {/* Central Canvas Area */}
        <div className="sc-canvas">
          {companiesList.length === 0 ? (
            showFilters ? (
              /* When filters are visible: Filter empty state matching screenshot 1:1 */
              <div className="sc-empty-state">
                <div className="sc-mag-glass-graphic">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="45" cy="45" r="30" stroke="#0f172a" strokeWidth="2.5" fill="#f8fafc" />
                    <circle cx="45" cy="45" r="24" stroke="#e2e8f0" strokeWidth="1" fill="#ffffff" />
                    <path d="M68 68L88 88" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="sc-empty-title">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button className="sc-btn-reset-filters" onClick={handleResetFilters}>
                  Reset filters
                </button>
              </div>
            ) : (
              /* When filters are hidden: 2 cards empty state */
              <div className="sc-empty-cards-wrapper">
                <div className="sc-empty-header">
                  <h3 className="sc-empty-main-title">No saved companies</h3>
                  <p className="sc-empty-main-desc">No saved companies yet! Save your first company to get started.</p>
                </div>

                <div className="sc-empty-cards-grid">
                  {/* Card 1: Find companies */}
                  <div className="sc-empty-card" onClick={() => showToast('Redirecting to Find Companies in Prospect section')}>
                    <div className="sc-empty-card-icon">
                      <Building2 size={18} />
                    </div>
                    <h4 className="sc-empty-card-title">Find companies</h4>
                    <p className="sc-empty-card-desc">
                      Looking for target accounts? Go to "Find companies" in the Prospect section
                    </p>
                  </div>

                  {/* Card 2: Import from CSV */}
                  <div className="sc-empty-card" onClick={() => setModalType('import')}>
                    <div className="sc-empty-card-icon">
                      <Download size={18} />
                    </div>
                    <h4 className="sc-empty-card-title">Import from CSV</h4>
                    <p className="sc-empty-card-desc">
                      Upload a CSV of domains or company names to quickly populate accounts
                    </p>
                  </div>
                </div>
              </div>
            )
          ) : (
            /* Records Table View when items exist */
            <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '16px' }}>
              <table className="dash-leads-table">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Domain</th>
                    <th>Industry</th>
                    <th>Employees</th>
                    <th>Location</th>
                    <th>Saved Date</th>
                  </tr>
                </thead>
                <tbody>
                  {companiesList.map((comp) => (
                    <tr key={comp.id}>
                      <td style={{ fontWeight: 700, color: '#2563eb' }}>{comp.name}</td>
                      <td>{comp.domain}</td>
                      <td>{comp.industry}</td>
                      <td>{comp.employees}</td>
                      <td>{comp.location}</td>
                      <td>{comp.savedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Floating Help ? Button */}
      <button
        className="sc-floating-help"
        onClick={() => showToast('Apollo Saved Records Help & Guidance')}
        title="Get Help"
      >
        ?
      </button>

      {/* ─── 4. Right Slide-Over Drawer ("View options" & "Save as new view" — Exact 1:1 Match) ─── */}
      {drawerMode && (
        <div className="sc-drawer-overlay" onClick={() => setDrawerMode(null)}>
          <div className="sc-drawer-panel" key={drawerMode} onClick={(e) => e.stopPropagation()}>
            <div className="sc-drawer-header">
              <h3 className="sc-drawer-title">View options</h3>
              <button className="sc-drawer-close" onClick={() => setDrawerMode(null)} title="Close">
                <X size={18} />
              </button>
            </div>

            <div className="sc-drawer-body">
              {/* View name * input (Only shown when saving as new view) */}
              {drawerMode === 'save_as_new_view' && (
                <div className="sc-drawer-field-group">
                  <label className="sc-drawer-label-red">View name <span>*</span></label>
                  <input
                    type="text"
                    className="sc-drawer-input"
                    value={activeViewName}
                    onChange={(e) => setActiveViewName(e.target.value)}
                  />
                </div>
              )}

              {/* Group By */}
              <div className="sc-drawer-section">
                <span className="sc-drawer-section-title">Group By</span>
                <div 
                  className={`sc-drawer-row-btn ${drawerMode === 'view_options' ? 'focused-blue' : ''}`} 
                  onClick={() => showToast('Group by settings')}
                >
                  <div className="sc-drawer-row-left">
                    <Layers size={16} color="#64748b" />
                    <span>Group By</span>
                  </div>
                  <div className="sc-drawer-row-right">
                    <span>None</span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div className="sc-drawer-section">
                <span className="sc-drawer-section-title">Fields</span>
                <div className="sc-drawer-row-btn" onClick={() => showToast('Configure 12 visible company fields')}>
                  <div className="sc-drawer-row-left">
                    <List size={16} color="#64748b" />
                    <span>Fields</span>
                  </div>
                  <div className="sc-drawer-row-right">
                    <span className="sc-badge-round">12</span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </div>
              </div>

              {/* Applied filters */}
              <div className="sc-drawer-section">
                <span className="sc-drawer-section-title">Applied filters</span>
                <div className="sc-drawer-row-btn" onClick={() => showToast('Applied filters overview')}>
                  <div className="sc-drawer-row-left">
                    <Filter size={16} color="#64748b" />
                    <span>Filters</span>
                  </div>
                  <div className="sc-drawer-row-right">
                    <span className="sc-badge-round">0</span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </div>
              </div>

              {/* More settings (Only shown when saving as new view) */}
              {drawerMode === 'save_as_new_view' && (
                <div className="sc-drawer-section">
                  <span className="sc-drawer-section-title">More settings</span>
                  <div className="sc-drawer-row-btn" onClick={() => showToast('Visibility and sharing settings')}>
                    <div className="sc-drawer-row-left">
                      <Lock size={16} color="#64748b" />
                      <span>Visibility and sharing</span>
                    </div>
                    <div className="sc-drawer-row-right">
                      <span>Restricted</span>
                    </div>
                  </div>

                  <div className="sc-drawer-row-btn" onClick={() => showToast('Subscription alerts settings')}>
                    <div className="sc-drawer-row-left">
                      <Bell size={16} color="#64748b" />
                      <span>Subscription alerts</span>
                    </div>
                    <div className="sc-drawer-row-right">
                      <span>None</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons (Only shown when saving as new view) */}
            {drawerMode === 'save_as_new_view' && (
              <div className="sc-drawer-footer">
                <button className="sc-drawer-btn-cancel" onClick={() => setDrawerMode(null)}>
                  Cancel
                </button>
                <button
                  className="sc-drawer-btn-create"
                  onClick={() => {
                    setDrawerMode(null);
                    showToast(`View "${activeViewName}" created successfully!`);
                  }}
                >
                  Create view
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Modal 1: Create Company (1:1 with Apollo Screenshot) ─── */}
      {modalType === 'create_company' && (
        <div className="sc-modal-overlay" onClick={() => setModalType(null)}>
          <div className="sc-company-modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sc-company-modal-header">
              <h3 className="sc-company-modal-title">Create new Company</h3>
              <div className="sc-company-header-actions">
                <button
                  type="button"
                  className="sc-company-btn-cancel"
                  onClick={() => setModalType(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`sc-company-btn-save ${newCompany.name.trim() ? 'active' : ''}`}
                  disabled={!newCompany.name.trim()}
                  onClick={handleCreateCompanySubmit}
                >
                  Save Company
                </button>
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div className="sc-company-modal-body">
              {/* Section 1: Basic Information */}
              <div className="sc-company-section">
                <div
                  className="sc-company-section-header"
                  onClick={() => setCompanySections(prev => ({ ...prev, basicInfo: !prev.basicInfo }))}
                >
                  <span className="sc-company-section-title active">Basic Information</span>
                  {companySections.basicInfo ? (
                    <ChevronUp size={16} className="sc-company-chevron active" />
                  ) : (
                    <ChevronDown size={16} className="sc-company-chevron active" />
                  )}
                </div>

                {companySections.basicInfo && (
                  <div className="sc-company-section-content">
                    {/* Name */}
                    <div className="sc-company-field">
                      <label className="sc-company-label">Name</label>
                      <input
                        type="text"
                        className="sc-company-input"
                        placeholder="Type the company name"
                        value={newCompany.name}
                        onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                        autoFocus
                      />
                    </div>

                    {/* Phone number */}
                    <div className="sc-company-field">
                      <label className="sc-company-label">Phone number</label>
                      <div className="sc-company-input-wrap-bordered">
                        <input
                          type="text"
                          className="sc-company-input"
                          placeholder="Type phone number"
                          value={newCompany.phone}
                          onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Stage */}
                    <div className="sc-company-field">
                      <label className="sc-company-label">Stage</label>
                      <div className="sc-company-select-wrap">
                        <select
                          className="sc-company-select"
                          value={newCompany.stage}
                          onChange={(e) => setNewCompany({ ...newCompany, stage: e.target.value })}
                        >
                          <option value="">Select stage</option>
                          <option value="Cold">Cold</option>
                          <option value="Approaching">Approaching</option>
                          <option value="Replied">Replied</option>
                          <option value="Interested">Interested</option>
                          <option value="Not Interested">Not Interested</option>
                          <option value="Unresponsive">Unresponsive</option>
                          <option value="Bad Data">Bad Data</option>
                          <option value="Customer">Customer</option>
                        </select>
                        <ChevronDown size={14} className="sc-company-select-caret" />
                      </div>
                    </div>

                    {/* 2-Column: Enrich With Data From Apollo & Domain */}
                    <div className="sc-company-grid-2">
                      <div className="sc-company-field">
                        <label className="sc-company-label">Enrich With Data From Apollo</label>
                        <div className="sc-company-select-wrap">
                          <select
                            className="sc-company-select"
                            value={newCompany.enrichCompany}
                            onChange={(e) => {
                              const val = e.target.value;
                              setNewCompany(prev => ({
                                ...prev,
                                enrichCompany: val,
                                domain: val ? `${val.toLowerCase().replace(/\s+/g, '')}.com` : prev.domain,
                                name: prev.name ? prev.name : val
                              }));
                            }}
                          >
                            <option value="">Select company...</option>
                            <option value="Apollo.io">Apollo.io</option>
                            <option value="Google">Google</option>
                            <option value="Microsoft">Microsoft</option>
                            <option value="Stripe">Stripe</option>
                            <option value="Notion">Notion</option>
                            <option value="Figma">Figma</option>
                            <option value="Salesforce">Salesforce</option>
                            <option value="HubSpot">HubSpot</option>
                            <option value="Snowflake">Snowflake</option>
                            <option value="Amazon">Amazon</option>
                          </select>
                          <ChevronDown size={14} className="sc-company-select-caret" />
                        </div>
                      </div>

                      <div className="sc-company-field">
                        <label className="sc-company-label">Domain</label>
                        <input
                          type="text"
                          className="sc-company-input"
                          value={newCompany.domain}
                          onChange={(e) => setNewCompany({ ...newCompany, domain: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Linkedin URL */}
                    <div className="sc-company-field">
                      <label className="sc-company-label">Linkedin URL</label>
                      <input
                        type="text"
                        className="sc-company-input"
                        placeholder="Copy & paste their LinkedIn URL (e.g. linkedin.com/company/apolloio)"
                        value={newCompany.linkedinUrl}
                        onChange={(e) => setNewCompany({ ...newCompany, linkedinUrl: e.target.value })}
                      />
                    </div>

                    {/* Location */}
                    <div className="sc-company-field">
                      <label className="sc-company-label">Location</label>
                      <input
                        type="text"
                        className="sc-company-input"
                        value={newCompany.location}
                        onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Section 2: Others */}
              <div className="sc-company-section">
                <div
                  className="sc-company-section-header"
                  onClick={() => setCompanySections(prev => ({ ...prev, others: !prev.others }))}
                >
                  <span className="sc-company-section-title active">Others</span>
                  {companySections.others ? (
                    <ChevronUp size={16} className="sc-company-chevron active" />
                  ) : (
                    <ChevronDown size={16} className="sc-company-chevron active" />
                  )}
                </div>

                {companySections.others && (
                  <div className="sc-company-section-content">
                    {/* Prerequisite: Determine Research Guidelines */}
                    <div className="sc-company-field">
                      <label className="sc-company-label">Prerequisite: Determine Research Guidelines</label>
                      <textarea
                        className="sc-company-textarea"
                        rows={3}
                        placeholder="Enter value..."
                        value={newCompany.researchGuidelines}
                        onChange={(e) => setNewCompany({ ...newCompany, researchGuidelines: e.target.value })}
                      />
                    </div>

                    {/* Prerequisite: Research Target Company */}
                    <div className="sc-company-field">
                      <label className="sc-company-label">Prerequisite: Research Target Company</label>
                      <textarea
                        className="sc-company-textarea"
                        rows={3}
                        placeholder="Enter value..."
                        value={newCompany.researchTarget}
                        onChange={(e) => setNewCompany({ ...newCompany, researchTarget: e.target.value })}
                      />
                    </div>

                    {/* Business Executive Summary */}
                    <div className="sc-company-field">
                      <label className="sc-company-label">Business Executive Summary</label>
                      <input
                        type="text"
                        className="sc-company-input"
                        placeholder="Enter value..."
                        value={newCompany.businessSummary}
                        onChange={(e) => setNewCompany({ ...newCompany, businessSummary: e.target.value })}
                      />
                    </div>

                    {/* Outreach Urgency */}
                    <div className="sc-company-field">
                      <label className="sc-company-label">Outreach Urgency</label>
                      <div className="sc-company-select-wrap">
                        <select
                          className="sc-company-select"
                          value={newCompany.outreachUrgency}
                          onChange={(e) => setNewCompany({ ...newCompany, outreachUrgency: e.target.value })}
                        >
                          <option value="">Select...</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                          <option value="Immediate">Immediate</option>
                          <option value="Not Urgent">Not Urgent</option>
                        </select>
                        <ChevronDown size={14} className="sc-company-select-caret" />
                      </div>
                    </div>

                    {/* Qualification Status */}
                    <div className="sc-company-field">
                      <label className="sc-company-label">Qualification Status</label>
                      <div className="sc-company-select-wrap">
                        <select
                          className="sc-company-select"
                          value={newCompany.qualificationStatus}
                          onChange={(e) => setNewCompany({ ...newCompany, qualificationStatus: e.target.value })}
                        >
                          <option value="">Select...</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Disqualified">Disqualified</option>
                          <option value="Pending Review">Pending Review</option>
                          <option value="In Pipeline">In Pipeline</option>
                        </select>
                        <ChevronDown size={14} className="sc-company-select-caret" />
                      </div>
                    </div>

                    {/* Reasoning */}
                    <div className="sc-company-field">
                      <label className="sc-company-label">Reasoning</label>
                      <input
                        type="text"
                        className="sc-company-input"
                        placeholder="Enter value..."
                        value={newCompany.reasoning}
                        onChange={(e) => setNewCompany({ ...newCompany, reasoning: e.target.value })}
                      />
                    </div>

                    {/* Yellow Button: Add/Remove Company Fields */}
                    <button
                      type="button"
                      className="sc-company-btn-yellow"
                      onClick={() => showToast('Customize company fields opened')}
                    >
                      Add/Remove Company Fields
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Modal 2: Upload CSV (Companies - 1:1 Authentic Apollo Modal) ─── */}
      {modalType === 'import' && (
        <div className="sc-modal-overlay" onClick={() => setModalType(null)}>
          <div className="csv-upload-modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="csv-upload-modal-header">
              <h3 className="csv-upload-modal-title">Upload CSV</h3>
              <button
                type="button"
                className="csv-upload-modal-close"
                onClick={() => setModalType(null)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="csv-upload-modal-body">
              {/* Header Icon + Title */}
              <div className="csv-upload-hero">
                <div className="csv-upload-icon-box">
                  <Upload size={20} />
                </div>
                <div className="csv-upload-hero-text">
                  <h4 className="csv-upload-hero-title">Import companies</h4>
                  <p className="csv-upload-hero-subtitle">You can import up to 100,000 rows at a time.</p>
                </div>
              </div>

              {/* Required Fields Pill Box (Screenshot 2: 2 pills) */}
              <div className="csv-upload-callout">
                <span className="csv-upload-callout-label">
                  For accurate mapping, please include at least one of these fields:
                </span>
                <div className="csv-upload-pills-row">
                  <span className="csv-upload-pill">Company Name</span>
                  <span className="csv-upload-pill">Company Website</span>
                </div>
              </div>

              {/* Disclaimer Legal Text */}
              <p className="csv-upload-disclaimer">
                By clicking "Select CSV" below, I acknowledge that business contacts data submitted from my CSV file to Apollo may be used to provide and improve Apollo's services as further described in our{' '}
                <span className="csv-upload-link" onClick={() => showToast('Terms of Service opened')}>Terms of Service</span>.{' '}
                <span className="csv-upload-link" onClick={() => showToast('Data sharing details')}>Learn more</span> about data sharing.
              </p>
            </div>

            {/* Footer */}
            <div className="csv-upload-modal-footer">
              <div
                className="csv-upload-help"
                onClick={() => showToast('Opening Apollo Help Center...')}
              >
                <HelpCircle size={16} />
                <span>Help center</span>
              </div>

              <div className="csv-upload-footer-actions">
                <button
                  type="button"
                  className="csv-upload-btn-sample"
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8,Company Name,Company Website\nStripe,stripe.com\nAcme Corp,acme.com\nNotion Labs,notion.so\nFigma,figma.com";
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", "apollo_companies_template.csv");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showToast('Downloaded sample companies CSV template!');
                  }}
                >
                  <Download size={14} />
                  <span>Download sample template</span>
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv,.xlsx"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const fileName = e.target.files[0].name;
                      setModalType(null);
                      showToast(`Imported 25 companies from ${fileName} successfully!`);
                    }
                  }}
                />

                <button
                  type="button"
                  className="csv-upload-btn-select"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    } else {
                      setModalType(null);
                      showToast('Imported 25 sample companies from CSV!');
                    }
                  }}
                >
                  <Plus size={14} />
                  <span>Select CSV</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
