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
  X,
  LayoutGrid,
  FileText,
  MoreHorizontal,
  Layers,
  List,
  Bell,
  Download,
  Code,
  Upload,
  HelpCircle
} from 'lucide-react';
import './SavedPeopleView.css';

export const SavedPeopleView = ({ sampleLeads = [], showToast = () => {} }) => {
  // Main view & filter states
  const [activeViewName, setActiveViewName] = useState('My saved people');
  const [showFilters, setShowFilters] = useState(false); // Default hidden as per screenshot 1
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterCount, setActiveFilterCount] = useState(1);
  const [peopleList, setPeopleList] = useState([]); // Starts with 0 records like screenshot
  const [drawerMode, setDrawerMode] = useState(null); // null | 'view_options' | 'save_as_new_view'

  // Active Dropdowns state: null | 'saved_views' | 'ai_research' | 'workflow' | 'sort' | 'view_options'
  const [openDropdown, setOpenDropdown] = useState(null);

  // Saved views tab in dropdown
  const [activeViewTab, setActiveViewTab] = useState('All views');
  const [viewSearchQuery, setViewSearchQuery] = useState('');

  // Modals state: null | 'create_person' | 'import'
  const [modalType, setModalType] = useState(null);
  const [newPerson, setNewPerson] = useState({
    name: '',
    email: '',
    title: '',
    company: '',
    location: ''
  });

  // Create New Contact Detailed Form States (Screenshot 1:1)
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    companySelect: '',
    companyName: '',
    stage: '',
    companyPhone: '',
    phoneNumbers: [],
    phoneNotes: '',
    linkedinUrl: '',
    location: '',
    timeZone: '',
    customPersona: '',
    customLeadSource: ''
  });

  const [contactSections, setContactSections] = useState({
    basicInfo: true,
    additionalInfo: true,
    customFields: false
  });

  // Filter Accordions open state
  const [expandedFilters, setExpandedFilters] = useState({
    jobTitles: false,
    lookalikes: false,
    company: false,
    location: false,
    industry: false,
    owner: true // Owner expanded in Image 3
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

  const handleCreatePersonSubmit = (e) => {
    if (e) e.preventDefault();
    const fullName = `${newContact.firstName.trim()} ${newContact.lastName.trim()}`.trim() || newPerson.name.trim() || newContact.email.trim() || 'New Contact';
    if (!fullName) {
      showToast('Please enter at least first name, last name, or email.');
      return;
    }

    const personObj = {
      id: Date.now(),
      name: fullName,
      role: newContact.title || newPerson.title || 'Director of Sales',
      company: newContact.companyName || newContact.companySelect || newPerson.company || 'Acme Corp',
      location: newContact.location || newPerson.location || 'San Francisco, CA',
      savedDate: 'Just now'
    };

    setPeopleList(prev => [personObj, ...prev]);
    setModalType(null);
    setNewPerson({ name: '', email: '', title: '', company: '', location: '' });
    setNewContact({
      firstName: '',
      lastName: '',
      email: '',
      title: '',
      companySelect: '',
      companyName: '',
      stage: '',
      companyPhone: '',
      phoneNumbers: [],
      phoneNotes: '',
      linkedinUrl: '',
      location: '',
      timeZone: '',
      customPersona: '',
      customLeadSource: ''
    });
    showToast(`Added ${personObj.name} to Contacts!`);
  };

  // Saved Views Data (Image 2)
  const savedViewsList = [
    { name: 'My people by stage', system: true },
    { name: 'My people by activity date', system: true },
    { name: 'People from mailbox sync', system: true },
    { name: 'My saved people', system: true },
    { name: 'All people by activity date', system: true },
    { name: 'All people by stage', system: true },
    { name: 'All saved people', system: true }
  ];

  const filteredViews = savedViewsList.filter(v =>
    v.name.toLowerCase().includes(viewSearchQuery.toLowerCase())
  );

  return (
    <div className="sp-view-container">
      {/* ─── 1. Header Sticky ─── */}
      <div className="sp-header">
        <div className="sp-header-left">
          <h1 className="sp-title">People</h1>
          <p className="sp-subtitle">{peopleList.length} records</p>
        </div>
        <div className="sp-header-right">
          <button className="sp-btn-import" onClick={() => setModalType('import')}>
            Import
          </button>
          <button className="sp-btn-create-person" onClick={() => setModalType('create_person')}>
            <Plus size={14} /> Create person
          </button>
        </div>
      </div>

      {/* ─── 2. Controls & Action Bar ─── */}
      <div className="sp-controls-bar" ref={controlsRef}>
        {/* Dropdown 1: Saved Views (Image 2) */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            className={`sp-control-btn borderless ${openDropdown === 'saved_views' ? 'active' : ''}`}
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
            <div className="sp-dropdown-menu sp-dd-views" onClick={(e) => e.stopPropagation()}>
              {/* Search views input */}
              <div className="sp-dd-views-search">
                <Search size={14} color="#2563eb" />
                <input
                  type="text"
                  placeholder="Search views"
                  value={viewSearchQuery}
                  onChange={(e) => setViewSearchQuery(e.target.value)}
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px' }}
                  autoFocus
                />
              </div>

              {/* Tabs */}
              <div className="sp-dd-views-tabs">
                {['All views', 'Your views', 'Starred', 'Shared'].map((tab) => (
                  <span
                    key={tab}
                    className={`sp-dd-tab ${activeViewTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveViewTab(tab)}
                  >
                    {tab}
                  </span>
                ))}
              </div>

              {/* Views List */}
              <div className="sp-dd-views-list">
                {filteredViews.map((item) => (
                  <div
                    key={item.name}
                    className={`sp-dd-view-item ${activeViewName === item.name ? 'selected' : ''}`}
                    onClick={() => handleSelectView(item.name)}
                  >
                    <div className="sp-dd-view-left">
                      <LayoutGrid size={14} color={activeViewName === item.name ? '#2563eb' : '#64748b'} />
                      <span>{item.name}</span>
                    </div>
                    <div className="sp-dd-view-right">
                      {item.system && <span className="sp-pill-system">System</span>}
                      {activeViewName === item.name && <Check size={14} color="#2563eb" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Button */}
              <div className="sp-dd-views-footer">
                <button
                  className="sp-btn-create-person"
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
          className={`sp-control-btn borderless ${showFilters ? 'active' : ''}`}
          onClick={() => {
            setOpenDropdown(null);
            setShowFilters(!showFilters);
          }}
          style={{ flexShrink: 0 }}
        >
          <Filter size={15} color="#475569" />
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          {activeFilterCount > 0 && (
            <span className="sp-badge-count">{activeFilterCount}</span>
          )}
        </button>

        {/* Input 3: Search people */}
        <div className="sp-search-box" onClick={() => setOpenDropdown(null)}>
          <Search size={14} color="#94a3b8" />
          <input
            type="text"
            className="sp-search-input"
            placeholder="Search people"
            value={searchQuery}
            onFocus={() => setOpenDropdown(null)}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dropdown 4: Research with AI (Purple Button - Image 4) */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            className={`sp-control-btn sp-btn-ai ${openDropdown === 'ai_research' ? 'active' : ''}`}
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
            <div className="sp-dropdown-menu sp-dd-ai" onClick={(e) => e.stopPropagation()}>
              <div
                className="sp-dd-ai-item"
                onClick={() => { setOpenDropdown(null); showToast('Running custom AI prompt...'); }}
              >
                <Sparkles size={14} color="#6d28d9" />
                <span>Run custom AI prompt</span>
              </div>
              <div
                className="sp-dd-ai-item"
                onClick={() => { setOpenDropdown(null); showToast('Generating AI formula...'); }}
              >
                <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 700, fontSize: '14px', color: '#475569' }}>fx</span>
                <span>Generate AI formula</span>
              </div>

              <div className="sp-dd-divider" />

              <div
                className="sp-dd-ai-item"
                onClick={() => { setOpenDropdown(null); showToast('Opening Apollo Assistant...'); }}
              >
                <Globe size={14} color="#475569" />
                <span>Use Apollo Assistant</span>
              </div>
              <div
                className="sp-dd-ai-item"
                onClick={() => { setOpenDropdown(null); showToast('Opening AI Templates...'); }}
              >
                <MoreHorizontal size={14} color="#475569" />
                <span>Start with a template</span>
              </div>
            </div>
          )}
        </div>

        {/* Dropdown 5: Create workflow (Image 5) */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            className={`sp-control-btn bordered ${openDropdown === 'workflow' ? 'active' : ''}`}
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
            <div className="sp-dropdown-menu sp-dd-workflow" onClick={(e) => e.stopPropagation()}>
              <div className="sp-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Auto-add to sequence wizard'); }}>
                Auto-add to sequence
              </div>
              <div className="sp-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Auto-add to lists wizard'); }}>
                Auto-add to lists
              </div>
              <div className="sp-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Auto-update records wizard'); }}>
                Auto-update records
              </div>
              <div className="sp-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Creating workflow from scratch...'); }}>
                Create from scratch
              </div>
            </div>
          )}
        </div>

        {/* Button 6: Save as new view */}
        <button
          className={`sp-control-btn bordered ${drawerMode === 'save_as_new_view' ? 'active' : ''}`}
          style={{ flexShrink: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            setOpenDropdown(null);
            setDrawerMode('save_as_new_view');
          }}
        >
          Save as new view
        </button>

        <div className="sp-divider-v" style={{ flexShrink: 0 }} />

        {/* Dropdown 7: Sort */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            className={`sp-control-btn borderless ${openDropdown === 'sort' ? 'active' : ''}`}
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
            <div className="sp-dropdown-menu sp-dd-sort" onClick={(e) => e.stopPropagation()}>
              <div className="sp-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Sorted by Last activity date'); }}>
                Last activity date
              </div>
              <div className="sp-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Sorted by Date saved (newest)'); }}>
                Date saved (newest)
              </div>
              <div className="sp-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Sorted by Name (A - Z)'); }}>
                Name (A - Z)
              </div>
              <div className="sp-dd-wf-item" onClick={() => { setOpenDropdown(null); showToast('Sorted by Company (A - Z)'); }}>
                Company (A - Z)
              </div>
            </div>
          )}
        </div>

        {/* Dropdown 8: View options */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            className={`sp-control-btn borderless ${drawerMode === 'view_options' ? 'active' : ''}`}
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
      <div className="sp-workspace">
        {/* Left Filter Sidebar (Toggled via Show/Hide Filters) */}
        {showFilters && (
          <div className="sp-sidebar">
            <div className="sp-sidebar-content">
              {/* Filter 1: Job Titles */}
              <div className="sp-filter-group">
                <div className="sp-filter-header" onClick={() => toggleFilterGroup('jobTitles')}>
                  <div className="sp-filter-left">
                    <Award size={15} color="#64748b" />
                    <span>Job Titles</span>
                  </div>
                  <ChevronDown size={14} color="#94a3b8" />
                </div>
              </div>

              {/* Filter 2: People Lookalikes (Locked) */}
              <div className="sp-filter-group">
                <div className="sp-filter-header" onClick={() => showToast('People Lookalikes requires Enterprise plan')}>
                  <div className="sp-filter-left">
                    <User size={15} color="#64748b" />
                    <span>People Lookalikes</span>
                  </div>
                  <Lock size={13} color="#0284c7" />
                </div>
              </div>

              {/* Filter 3: Company */}
              <div className="sp-filter-group">
                <div className="sp-filter-header" onClick={() => toggleFilterGroup('company')}>
                  <div className="sp-filter-left">
                    <Building2 size={15} color="#64748b" />
                    <span>Company</span>
                  </div>
                  <ChevronDown size={14} color="#94a3b8" />
                </div>
              </div>

              {/* Filter 4: Location */}
              <div className="sp-filter-group">
                <div className="sp-filter-header" onClick={() => toggleFilterGroup('location')}>
                  <div className="sp-filter-left">
                    <MapPin size={15} color="#64748b" />
                    <span>Location</span>
                  </div>
                  <ChevronDown size={14} color="#94a3b8" />
                </div>
              </div>

              {/* Filter 5: Industry & Keywords */}
              <div className="sp-filter-group">
                <div className="sp-filter-header" onClick={() => toggleFilterGroup('industry')}>
                  <div className="sp-filter-left">
                    <LayoutGrid size={15} color="#64748b" />
                    <span>Industry & Keywords</span>
                  </div>
                  <ChevronDown size={14} color="#94a3b8" />
                </div>
              </div>

              {/* Filter 6: Owner (Active Filter - Image 3) */}
              <div className="sp-filter-group">
                <div className="sp-filter-header" onClick={() => toggleFilterGroup('owner')}>
                  <div className="sp-filter-left">
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb' }} />
                    <User size={15} color="#64748b" />
                    <span>Owner</span>
                    <span className="sp-badge-count" style={{ fontSize: '10px' }}>x 1</span>
                  </div>
                  <ChevronDown size={14} color="#94a3b8" />
                </div>

                {expandedFilters.owner && (
                  <div className="sp-filter-body">
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                      Contact Owner:
                    </div>
                    <span className="sp-filter-chip">
                      Current User
                      <X size={12} color="#64748b" style={{ cursor: 'pointer' }} onClick={handleResetFilters} />
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="sp-sidebar-footer">
              <button className="sp-btn-clear-all" onClick={handleResetFilters}>
                Clear all {activeFilterCount}
              </button>
              <button className="sp-btn-view-more" onClick={() => showToast('60+ Filters Drawer')}>
                View 60+ Filters
              </button>
            </div>
          </div>
        )}

        {/* Central Canvas Area */}
        <div className="sp-canvas">
          {peopleList.length === 0 ? (
            showFilters ? (
              /* When filters are visible: Filter empty state matching media_1788858725247.png */
              <div className="sp-empty-state">
                <div className="sp-mag-glass-graphic">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="45" cy="45" r="30" stroke="#0f172a" strokeWidth="2.5" fill="#f8fafc" />
                    <circle cx="45" cy="45" r="24" stroke="#e2e8f0" strokeWidth="1" fill="#ffffff" />
                    <path d="M68 68L88 88" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="sp-empty-title">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button className="sp-btn-reset-filters" onClick={handleResetFilters}>
                  Reset filters
                </button>
              </div>
            ) : (
              /* When filters are hidden: 2 cards empty state matching media_1788859995779.png / media_1788860243975.png */
              <div className="sp-empty-cards-wrapper">
                <div className="sp-empty-header">
                  <h3 className="sp-empty-main-title">No saved people</h3>
                  <p className="sp-empty-main-desc">No saved people yet! Save your first person to get started.</p>
                </div>

                <div className="sp-empty-cards-grid">
                  {/* Card 1: Find people */}
                  <div className="sp-empty-card" onClick={() => showToast('Redirecting to Find People in Prospect section')}>
                    <div className="sp-empty-card-icon">
                      <User size={18} />
                    </div>
                    <h4 className="sp-empty-card-title">Find people</h4>
                    <p className="sp-empty-card-desc">
                      Looking for new contacts? Go to "Find people" in the Prospect section
                    </p>
                  </div>

                  {/* Card 2: Import from CSV */}
                  <div className="sp-empty-card" onClick={() => setModalType('import')}>
                    <div className="sp-empty-card-icon">
                      <Download size={18} />
                    </div>
                    <h4 className="sp-empty-card-title">Import from CSV</h4>
                    <p className="sp-empty-card-desc">
                      Upload a CSV to quickly populate contacts
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
                    <th>Name</th>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Saved Date</th>
                  </tr>
                </thead>
                <tbody>
                  {peopleList.map((person) => (
                    <tr key={person.id}>
                      <td style={{ fontWeight: 700, color: '#2563eb' }}>{person.name}</td>
                      <td>{person.role}</td>
                      <td>{person.company}</td>
                      <td>{person.location}</td>
                      <td>{person.savedDate}</td>
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
        className="sp-floating-help"
        onClick={() => showToast('Apollo Saved Records Help & Guidance')}
        title="Get Help"
      >
        ?
      </button>

      {/* ─── 4. Right Slide-Over Drawer ("View options" & "Save as new view" — Exact 1:1 Match) ─── */}
      {drawerMode && (
        <div className="sp-drawer-overlay" onClick={() => setDrawerMode(null)}>
          <div className="sp-drawer-panel" key={drawerMode} onClick={(e) => e.stopPropagation()}>
            <div className="sp-drawer-header">
              <h3 className="sp-drawer-title">View options</h3>
              <button className="sp-drawer-close" onClick={() => setDrawerMode(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="sp-drawer-body">
              {/* View name * input (Only shown when saving as new view - Image media_1788859995779.png) */}
              {drawerMode === 'save_as_new_view' && (
                <div className="sp-drawer-field-group">
                  <label className="sp-drawer-label-red">View name <span>*</span></label>
                  <input
                    type="text"
                    className="sp-drawer-input"
                    value={activeViewName}
                    onChange={(e) => setActiveViewName(e.target.value)}
                  />
                </div>
              )}

              {/* Group By */}
              <div className="sp-drawer-section">
                <span className="sp-drawer-section-title">Group By</span>
                <div 
                  className={`sp-drawer-row-btn ${drawerMode === 'view_options' ? 'focused-blue' : ''}`} 
                  onClick={() => showToast('Group by settings')}
                >
                  <div className="sp-drawer-row-left">
                    <Layers size={16} color="#64748b" />
                    <span>Group By</span>
                  </div>
                  <div className="sp-drawer-row-right">
                    <span>None</span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div className="sp-drawer-section">
                <span className="sp-drawer-section-title">Fields</span>
                <div className="sp-drawer-row-btn" onClick={() => showToast('Configure 13 visible fields')}>
                  <div className="sp-drawer-row-left">
                    <List size={16} color="#64748b" />
                    <span>Fields</span>
                  </div>
                  <div className="sp-drawer-row-right">
                    <span className="sp-badge-round">13</span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </div>
              </div>

              {/* Applied filters */}
              <div className="sp-drawer-section">
                <span className="sp-drawer-section-title">Applied filters</span>
                <div className="sp-drawer-row-btn" onClick={() => showToast('Applied filters overview')}>
                  <div className="sp-drawer-row-left">
                    <Filter size={16} color="#64748b" />
                    <span>Filters</span>
                  </div>
                  <div className="sp-drawer-row-right">
                    <span className="sp-badge-round">0</span>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                </div>
              </div>

              {/* More settings (Only shown when saving as new view - Image media_1788859995779.png) */}
              {drawerMode === 'save_as_new_view' && (
                <div className="sp-drawer-section">
                  <span className="sp-drawer-section-title">More settings</span>
                  <div className="sp-drawer-row-btn" onClick={() => showToast('Visibility and sharing settings')}>
                    <div className="sp-drawer-row-left">
                      <Lock size={16} color="#64748b" />
                      <span>Visibility and sharing</span>
                    </div>
                    <div className="sp-drawer-row-right">
                      <span>Restricted</span>
                    </div>
                  </div>

                  <div className="sp-drawer-row-btn" onClick={() => showToast('Subscription alerts settings')}>
                    <div className="sp-drawer-row-left">
                      <Bell size={16} color="#64748b" />
                      <span>Subscription alerts</span>
                    </div>
                    <div className="sp-drawer-row-right">
                      <span>None</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons (Only shown when saving as new view - Image media_1788859995779.png) */}
            {drawerMode === 'save_as_new_view' && (
              <div className="sp-drawer-footer">
                <button className="sp-drawer-btn-cancel" onClick={() => setDrawerMode(null)}>
                  Cancel
                </button>
                <button
                  className="sp-drawer-btn-create"
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

      {/* ─── Modal 1: Create New Contact (Screenshot 1:1) ─── */}
      {modalType === 'create_person' && (
        <div className="sp-modal-overlay" onClick={() => setModalType(null)}>
          <div className="sp-contact-modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sp-contact-modal-header">
              <h3 className="sp-contact-modal-title">Create New Contact</h3>
              <div className="sp-contact-header-actions">
                <button
                  type="button"
                  className="sp-contact-btn-cancel"
                  onClick={() => setModalType(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`sp-contact-btn-save ${newContact.firstName.trim() || newContact.lastName.trim() || newContact.email.trim() ? 'active' : ''}`}
                  onClick={handleCreatePersonSubmit}
                >
                  Save Contact
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="sp-contact-modal-body">
              {/* Section 1: Basic Information */}
              <div className="sp-contact-section">
                <div
                  className="sp-contact-section-header"
                  onClick={() => setContactSections(prev => ({ ...prev, basicInfo: !prev.basicInfo }))}
                >
                  <span className="sp-contact-section-title active">Basic Information</span>
                  {contactSections.basicInfo ? (
                    <ChevronUp size={16} className="sp-contact-chevron active" />
                  ) : (
                    <ChevronDown size={16} className="sp-contact-chevron active" />
                  )}
                </div>

                {contactSections.basicInfo && (
                  <div className="sp-contact-section-content">
                    {/* Row 1: First name & Last name */}
                    <div className="sp-contact-grid-2">
                      <div className="sp-contact-field">
                        <label className="sp-contact-label">First name</label>
                        <input
                          type="text"
                          className="sp-contact-input"
                          placeholder="Type the person's first name"
                          value={newContact.firstName}
                          onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
                          autoFocus
                        />
                      </div>
                      <div className="sp-contact-field">
                        <label className="sp-contact-label">Last name</label>
                        <input
                          type="text"
                          className="sp-contact-input"
                          placeholder="Type the person's last name"
                          value={newContact.lastName}
                          onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Row 2: Primary email */}
                    <div className="sp-contact-field">
                      <label className="sp-contact-label">Primary email</label>
                      <input
                        type="email"
                        className="sp-contact-input"
                        placeholder="Type their email address"
                        value={newContact.email}
                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      />
                    </div>

                    {/* Row 3: Job title */}
                    <div className="sp-contact-field">
                      <label className="sp-contact-label">Job title</label>
                      <input
                        type="text"
                        className="sp-contact-input"
                        placeholder='"Director of Sales", "VP of Marketing", etc.'
                        value={newContact.title}
                        onChange={(e) => setNewContact({ ...newContact, title: e.target.value })}
                      />
                    </div>

                    {/* Row 4: Company & Company name */}
                    <div className="sp-contact-grid-2">
                      <div className="sp-contact-field">
                        <label className="sp-contact-label">Company</label>
                        <div className="sp-contact-select-wrap">
                          <select
                            className="sp-contact-select"
                            value={newContact.companySelect}
                            onChange={(e) => {
                              setNewContact({
                                ...newContact,
                                companySelect: e.target.value,
                                companyName: e.target.value || newContact.companyName
                              });
                            }}
                          >
                            <option value="">Choose / type Company name</option>
                            <option value="Acme Corp">Acme Corp</option>
                            <option value="Stripe Inc.">Stripe Inc.</option>
                            <option value="Notion Labs">Notion Labs</option>
                            <option value="Figma">Figma</option>
                            <option value="Snowflake">Snowflake</option>
                          </select>
                          <ChevronDown size={14} className="sp-contact-select-caret" />
                        </div>
                      </div>
                      <div className="sp-contact-field">
                        <label className="sp-contact-label">Company name</label>
                        <input
                          type="text"
                          className="sp-contact-input"
                          placeholder="Company name"
                          value={newContact.companyName}
                          onChange={(e) => setNewContact({ ...newContact, companyName: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Row 5: Stage */}
                    <div className="sp-contact-field">
                      <label className="sp-contact-label">Stage</label>
                      <div className="sp-contact-select-wrap">
                        <select
                          className="sp-contact-select"
                          value={newContact.stage}
                          onChange={(e) => setNewContact({ ...newContact, stage: e.target.value })}
                        >
                          <option value="">Select contact stage...</option>
                          <option value="Cold">Cold</option>
                          <option value="Approaching">Approaching</option>
                          <option value="Replied">Replied</option>
                          <option value="Interested">Interested</option>
                          <option value="Not Interested">Not Interested</option>
                          <option value="Unresponsive">Unresponsive</option>
                          <option value="Bad Data">Bad Data</option>
                          <option value="Customer">Customer</option>
                        </select>
                        <ChevronDown size={14} className="sp-contact-select-caret" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 2: Additional Information */}
              <div className="sp-contact-section">
                <div
                  className="sp-contact-section-header"
                  onClick={() => setContactSections(prev => ({ ...prev, additionalInfo: !prev.additionalInfo }))}
                >
                  <span className="sp-contact-section-title active">Additional Information</span>
                  {contactSections.additionalInfo ? (
                    <ChevronUp size={16} className="sp-contact-chevron active" />
                  ) : (
                    <ChevronDown size={16} className="sp-contact-chevron active" />
                  )}
                </div>

                {contactSections.additionalInfo && (
                  <div className="sp-contact-section-content">
                    {/* Company Phone */}
                    <div className="sp-contact-field">
                      <label className="sp-contact-label">
                        Company Phone <span className="sp-contact-hint">(When saved, this number will also update at the Company level.)</span>
                      </label>
                      <input
                        type="text"
                        className="sp-contact-input"
                        placeholder="Type phone number"
                        value={newContact.companyPhone}
                        onChange={(e) => setNewContact({ ...newContact, companyPhone: e.target.value })}
                      />
                    </div>

                    {/* Phone numbers */}
                    <div className="sp-contact-field">
                      <label className="sp-contact-label">Phone numbers</label>
                      <button
                        type="button"
                        className="sp-contact-add-phone-btn"
                        onClick={() => {
                          showToast('Added direct phone line field');
                        }}
                      >
                        <Plus size={14} /> Add a Phone Number
                      </button>
                    </div>

                    {/* Phone Notes */}
                    <div className="sp-contact-field">
                      <label className="sp-contact-label">Phone Notes</label>
                      <textarea
                        rows={3}
                        className="sp-contact-textarea"
                        placeholder="Use this box to enter instructions on how to enter through the phone tree. (E.g. Dial 123# to reach the Contact's direct line)."
                        value={newContact.phoneNotes}
                        onChange={(e) => setNewContact({ ...newContact, phoneNotes: e.target.value })}
                      />
                    </div>

                    {/* LinkedIn URL */}
                    <div className="sp-contact-field">
                      <label className="sp-contact-label">Linkedin URL</label>
                      <input
                        type="url"
                        className="sp-contact-input"
                        placeholder="Copy & paste their LinkedIn URL (e.g. linkedin.com/contactname)"
                        value={newContact.linkedinUrl}
                        onChange={(e) => setNewContact({ ...newContact, linkedinUrl: e.target.value })}
                      />
                    </div>

                    {/* Location & Time Zone */}
                    <div className="sp-contact-grid-2">
                      <div className="sp-contact-field">
                        <label className="sp-contact-label">Location</label>
                        <input
                          type="text"
                          className="sp-contact-input"
                          placeholder="Location / Country"
                          value={newContact.location}
                          onChange={(e) => setNewContact({ ...newContact, location: e.target.value })}
                        />
                      </div>
                      <div className="sp-contact-field">
                        <label className="sp-contact-label">Time Zone</label>
                        <input
                          type="text"
                          className="sp-contact-input disabled-like"
                          placeholder="Will be decided based on location"
                          value={newContact.timeZone}
                          onChange={(e) => setNewContact({ ...newContact, timeZone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: Contact Custom Fields */}
              <div className="sp-contact-section">
                <div
                  className="sp-contact-section-header"
                  onClick={() => setContactSections(prev => ({ ...prev, customFields: !prev.customFields }))}
                >
                  <span className="sp-contact-section-title">Contact Custom Fields</span>
                  {contactSections.customFields ? (
                    <ChevronUp size={16} className="sp-contact-chevron" />
                  ) : (
                    <ChevronDown size={16} className="sp-contact-chevron" />
                  )}
                </div>

                {contactSections.customFields && (
                  <div className="sp-contact-section-content">
                    <div className="sp-contact-grid-2">
                      <div className="sp-contact-field">
                        <label className="sp-contact-label">Persona</label>
                        <select
                          className="sp-contact-select"
                          value={newContact.customPersona}
                          onChange={(e) => setNewContact({ ...newContact, customPersona: e.target.value })}
                        >
                          <option value="">Select Persona...</option>
                          <option value="Decision Maker">Decision Maker</option>
                          <option value="Champion">Champion</option>
                          <option value="Influencer">Influencer</option>
                          <option value="End User">End User</option>
                        </select>
                      </div>
                      <div className="sp-contact-field">
                        <label className="sp-contact-label">Lead Source</label>
                        <select
                          className="sp-contact-select"
                          value={newContact.customLeadSource}
                          onChange={(e) => setNewContact({ ...newContact, customLeadSource: e.target.value })}
                        >
                          <option value="">Select Lead Source...</option>
                          <option value="Inbound Website">Inbound Website</option>
                          <option value="Outbound Sales">Outbound Sales</option>
                          <option value="Referral">Referral</option>
                          <option value="Apollo Chrome Extension">Apollo Chrome Extension</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Modal 2: Upload CSV (People - 1:1 Authentic Apollo Modal) ─── */}
      {modalType === 'import' && (
        <div className="sp-modal-overlay" onClick={() => setModalType(null)}>
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
                  <h4 className="csv-upload-hero-title">Import people</h4>
                  <p className="csv-upload-hero-subtitle">You can import up to 100,000 rows at a time.</p>
                </div>
              </div>

              {/* Required Fields Pill Box */}
              <div className="csv-upload-callout">
                <span className="csv-upload-callout-label">
                  For accurate mapping, please include at least one of these fields:
                </span>
                <div className="csv-upload-pills-row">
                  <span className="csv-upload-pill">Company Name</span>
                  <span className="csv-upload-pill">Company Website</span>
                  <span className="csv-upload-pill">LinkedIn URL</span>
                  <span className="csv-upload-pill">Contact Email</span>
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
                    const csvContent = "data:text/csv;charset=utf-8,First Name,Last Name,Company Name,Company Website,LinkedIn URL,Contact Email\nJane,Doe,Stripe,stripe.com,https://linkedin.com/in/janedoe,jane@stripe.com\nAlex,Smith,Acme Corp,acme.com,https://linkedin.com/in/alexsmith,alex@acme.com";
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", "apollo_people_template.csv");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showToast('Downloaded sample people CSV template!');
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
                      showToast(`Imported 50 contacts from ${fileName} successfully!`);
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
                      showToast('Imported 50 contacts from CSV successfully!');
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
