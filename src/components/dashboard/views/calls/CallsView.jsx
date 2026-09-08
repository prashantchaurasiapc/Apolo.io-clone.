import React, { useState, useMemo } from 'react';
import { 
  Phone, Check, Calendar, ChevronDown, Plus, Info, ExternalLink, 
  MoreHorizontal, LayoutGrid, Search, X
} from 'lucide-react';
import '../../css/calls-view.css';

export default function CallsView({ showToast }) {
  // Sub-Tab State: 'all' | 'analytics'
  const [activeTab, setActiveTab] = useState('all');

  // Analytics Toggle Pill State: 'rep' | 'account'
  const [perfToggle, setPerfToggle] = useState('rep');

  // Date Range Filter Dropdown State
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

  // Add Filter Popover State
  const [addFilterPopoverOpen, setAddFilterPopoverOpen] = useState(false);
  const [filterSearchText, setFilterSearchText] = useState('');
  const [appliedFilters, setAppliedFilters] = useState([]);

  // Checkbox Selection State for All Calls
  const [checkedRows, setCheckedRows] = useState({
    row1: true,
    row2: true
  });

  // Phone Dialer Modal State
  const [showDialer, setShowDialer] = useState(false);
  const [dialedNumber, setDialedNumber] = useState('');
  const [callActive, setCallActive] = useState(false);

  const toggleRow = (key) => {
    setCheckedRows(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleKeyPress = (num) => {
    setDialedNumber(prev => prev + num);
  };

  const handleStartCall = () => {
    if (!dialedNumber) return;
    setCallActive(true);
    showToast(`Calling ${dialedNumber}...`);
    setTimeout(() => {
      setCallActive(false);
      setShowDialer(false);
      setDialedNumber('');
      showToast('Call ended. Disposition recorded: Connected.');
    }, 4000);
  };

  const handleSelectFilter = (filterName) => {
    if (!appliedFilters.includes(filterName)) {
      setAppliedFilters(prev => [...prev, filterName]);
    }
    setAddFilterPopoverOpen(false);
    setFilterSearchText('');
    showToast(`Applied filter: ${filterName}`);
  };

  const removeFilterChip = (filterName) => {
    setAppliedFilters(prev => prev.filter(f => f !== filterName));
    showToast(`Removed filter: ${filterName}`);
  };

  // Filter Items Definition matching screenshot 1:1
  const rawFilterGroups = [
    {
      groupHeader: null,
      items: ['User - Team', 'User', 'Team']
    },
    {
      groupHeader: 'Phone Call',
      items: ['Phone Number Type']
    },
    {
      groupHeader: 'Phone Call',
      items: ['Phone Call Direction', 'Call Disposition', 'Call Duration', 'Sequence', 'Campaign']
    }
  ];

  const filteredGroups = useMemo(() => {
    if (!filterSearchText.trim()) return rawFilterGroups;
    const q = filterSearchText.toLowerCase();
    return rawFilterGroups.map(group => ({
      ...group,
      items: group.items.filter(item => item.toLowerCase().includes(q))
    })).filter(group => group.items.length > 0);
  }, [filterSearchText]);

  // 1:1 Rep Performance Metric Items
  const overallStatsItems = [
    { id: 1, label: 'Dials', value: '0', hasLink: true },
    { id: 2, label: 'Inbound Calls', value: '0', hasLink: true },
    { id: 3, label: 'Answered (Human)', value: '0', hasLink: true },
    { id: 4, label: 'Connected', value: '0', hasLink: true },
    { id: 5, label: 'Conversations (Dialer)', value: '0', hasLink: true },
    { id: 6, label: 'Dial to answered (Human)', value: '0%', hasLink: false },
    { id: 7, label: 'Inbound to connect', value: '0%', hasLink: false },
    { id: 8, label: 'Dial to connect', value: '0%', hasLink: false },
    { id: 9, label: 'Answered (Human) to conversation', value: '0%', hasLink: false },
    { id: 10, label: 'Meetings (Dialer)', value: '0', hasLink: false }
  ];

  return (
    <div className="apollo-calls-page">
      {/* Top Title Header */}
      <div className="calls-top-header">
        <h1 className="calls-title-text">Calls</h1>
      </div>


      {/* Sub Tabs Bar (All Calls | Analytics) */}
      <div className="calls-tabs-bar">
        <button 
          className={`calls-tab-item ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Calls
        </button>
        <button 
          className={`calls-tab-item ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>

      {/* ─── TAB 1: ALL CALLS ─── */}
      {activeTab === 'all' ? (
        <div className="calls-main-body-container">
          {/* 1:1 Vector Illustration Replica */}
          <div className="calls-illustration-wrapper">
            {/* Layer 1: Background Table Skeleton Card */}
            <div className="calls-bg-table-card">
              <div className="calls-bg-header-row">
                <span>PHONE CALLS</span>
                <span>COMPANY</span>
                <span>DISPOSITION</span>
                <span>DATE</span>
              </div>
              <div className="calls-bg-skeleton-list">
                <div className="calls-bg-skeleton-row">
                  <div className="skel-pink-dot" />
                  <div className="skel-bar w-120" />
                  <div className="skel-bar w-100" style={{ marginLeft: 30 }} />
                  <div className="skel-bar w-70" style={{ marginLeft: 30 }} />
                  <div className="skel-bar w-80" style={{ marginLeft: 30 }} />
                </div>
                <div className="calls-bg-skeleton-row">
                  <div className="skel-pink-dot" />
                  <div className="skel-bar w-120" />
                  <div className="skel-bar w-100" style={{ marginLeft: 30 }} />
                  <div className="skel-bar w-70" style={{ marginLeft: 30 }} />
                  <div className="skel-bar w-80" style={{ marginLeft: 30 }} />
                </div>
                <div className="calls-bg-skeleton-row" style={{ opacity: 0.2 }}>
                  <div className="skel-pink-dot" />
                  <div className="skel-bar w-120" />
                  <div className="skel-bar w-100" style={{ marginLeft: 30 }} />
                  <div className="skel-bar w-70" style={{ marginLeft: 30 }} />
                  <div className="skel-bar w-80" style={{ marginLeft: 30 }} />
                </div>
                <div className="calls-bg-skeleton-row" style={{ opacity: 0.15 }}>
                  <div className="skel-pink-dot" />
                  <div className="skel-bar w-120" />
                  <div className="skel-bar w-100" style={{ marginLeft: 30 }} />
                  <div className="skel-bar w-70" style={{ marginLeft: 30 }} />
                  <div className="skel-bar w-80" style={{ marginLeft: 30 }} />
                </div>
              </div>
            </div>

            {/* Layer 2: Floating Foreground Card (1:1 Match) */}
            <div className="calls-fg-floating-card">
              {/* Row 1: Anna Williams */}
              <div className="calls-fg-row">
                <div className="calls-row-left">
                  <div 
                    className="calls-check-square"
                    onClick={() => toggleRow('row1')}
                    style={{ cursor: 'pointer', opacity: checkedRows.row1 ? 1 : 0.3 }}
                  >
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <div className="calls-phone-icon-badge">
                    <Phone size={15} />
                  </div>
                  <span className="calls-contact-name">Anna Williams</span>
                </div>

                <div className="calls-row-right">
                  <span className="calls-company-name">ABC Technologies</span>
                  <span className="disposition-pill-connected">Connected</span>
                  <span className="calls-date-text">1 day ago</span>
                </div>
              </div>

              <div className="calls-fg-row-divider" />

              {/* Row 2: Martha Smith */}
              <div className="calls-fg-row">
                <div className="calls-row-left">
                  <div 
                    className="calls-check-square"
                    onClick={() => toggleRow('row2')}
                    style={{ cursor: 'pointer', opacity: checkedRows.row2 ? 1 : 0.3 }}
                  >
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <div className="calls-phone-icon-badge">
                    <Phone size={15} />
                  </div>
                  <span className="calls-contact-name">Martha Smith</span>
                </div>

                <div className="calls-row-right">
                  <span className="calls-company-name" style={{ minWidth: 120 }}>Terra</span>
                  <span className="disposition-pill-connected">Connected</span>
                  <span className="calls-date-text">1 day ago</span>
                </div>
              </div>
            </div>
          </div>

          <h2 className="calls-empty-heading">
            Call contacts directly from Apollo to book more meetings
          </h2>
        </div>
      ) : (
        /* ─── TAB 2: ANALYTICS (1:1 SCREENSHOT REPLICA) ─── */
        <div className="calls-analytics-container">
          {/* Top Filter Toolbar */}
          <div className="analytics-top-toolbar">
            <div className="toolbar-filter-left">
              {/* Date Dropdown */}
              <div style={{ position: 'relative' }}>
                <button 
                  className="date-picker-dropdown-btn"
                  onClick={() => { setDateDropdownOpen(!dateDropdownOpen); setAddFilterPopoverOpen(false); }}
                >
                  <Calendar size={14} color="#64748b" />
                  <span>{dateRange}</span>
                  <ChevronDown size={14} color="#94a3b8" />
                </button>

                {dateDropdownOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, width: 180, background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 8, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 150, padding: '4px 0' }}>
                    {['Last 7 days', 'Last 30 days', 'Last 90 days', 'Year to date'].map(range => (
                      <div 
                        key={range}
                        onClick={() => { setDateRange(range); setDateDropdownOpen(false); showToast(`Filter updated: ${range}`); }}
                        style={{ padding: '8px 14px', fontSize: 13, cursor: 'pointer', background: dateRange === range ? '#f1f5f9' : 'transparent', color: dateRange === range ? '#2563eb' : '#334155', fontWeight: dateRange === range ? 600 : 400 }}
                      >
                        {range}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add filter pill button */}
              <div style={{ position: 'relative' }}>
                <button 
                  className="add-filter-btn" 
                  onClick={() => { setAddFilterPopoverOpen(!addFilterPopoverOpen); setDateDropdownOpen(false); }}
                >
                  <Plus size={15} />
                  <span>Add filter</span>
                </button>

                {/* 1:1 Add Filter Popover Menu matching Screenshot */}
                {addFilterPopoverOpen && (
                  <div className="add-filter-popover-card">
                    <input 
                      type="text" 
                      placeholder="Search filters" 
                      value={filterSearchText}
                      onChange={(e) => setFilterSearchText(e.target.value)}
                      className="add-filter-search-input"
                      autoFocus
                    />

                    <div className="add-filter-scroll-list">
                      {filteredGroups.map((group, groupIdx) => (
                        <React.Fragment key={groupIdx}>
                          {groupIdx > 0 && <div className="add-filter-divider" />}
                          {group.groupHeader && (
                            <div className="add-filter-section-header">{group.groupHeader}</div>
                          )}
                          {group.items.map(item => (
                            <div 
                              key={item} 
                              className="add-filter-item"
                              onClick={() => handleSelectFilter(item)}
                            >
                              {item}
                            </div>
                          ))}
                        </React.Fragment>
                      ))}

                      {filteredGroups.length === 0 && (
                        <div style={{ padding: '12px 10px', fontSize: 12.5, color: '#94a3b8', textAlign: 'center' }}>
                          No matching filters
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Active Applied Filter Chips */}
              {appliedFilters.map(chip => (
                <div 
                  key={chip} 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 16, fontSize: 12, fontWeight: 600, color: '#1d4ed8' }}
                >
                  <span>{chip}: All</span>
                  <X size={13} style={{ cursor: 'pointer' }} onClick={() => removeFilterChip(chip)} />
                </div>
              ))}
            </div>

            {/* Rep Performance / Account Performance Toggle Pills */}
            <div className="performance-toggle-pills">
              <button 
                className={`toggle-pill-btn ${perfToggle === 'rep' ? 'active' : ''}`}
                onClick={() => setPerfToggle('rep')}
              >
                Rep performance
              </button>
              <button 
                className={`toggle-pill-btn ${perfToggle === 'account' ? 'active' : ''}`}
                onClick={() => setPerfToggle('account')}
              >
                Account performance
              </button>
            </div>
          </div>

          {/* Section 1: Dialer: Rep Performance: Overall Stats */}
          <div className="analytics-section-card">
            <div className="analytics-card-header">
              <h3 className="analytics-card-title">
                {perfToggle === 'rep' ? 'Dialer: Rep Performance: Overall Stats' : 'Dialer: Account Performance: Overall Stats'}
              </h3>
            </div>

            <div className="overall-stats-grid">
              {overallStatsItems.map((item) => (
                <div key={item.id} className="stat-metric-box">
                  <div className="stat-box-top-row">
                    <span className="stat-label-text">{item.label}</span>
                    <div className="stat-icons-group">
                      <Info size={13} style={{ cursor: 'pointer' }} title={item.label} />
                      {item.hasLink && <ExternalLink size={11} style={{ cursor: 'pointer' }} />}
                    </div>
                  </div>
                  <div className="stat-value-text">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Dialer: Rep Performance: Table */}
          <div className="analytics-section-card">
            <div className="analytics-card-header">
              <h3 className="analytics-card-title">
                {perfToggle === 'rep' ? 'Dialer: Rep Performance: Table' : 'Dialer: Account Performance: Table'}
              </h3>
              <button className="more-options-btn" onClick={() => showToast('Table Options')}>
                <MoreHorizontal size={16} />
              </button>
            </div>

            <div className="mock-empty-table-wrap">
              <div className="mock-table-skeleton-lines">
                <div className="mock-skel-line head" />
                <div className="mock-skel-line" />
                <div className="mock-skel-line" />
                <div className="mock-skel-line" />
              </div>
              <div className="no-data-placeholder-text">
                <LayoutGrid size={20} color="#cbd5e1" />
                <span>No data yet</span>
              </div>
            </div>
          </div>

          {/* Section 3: Dialer: Rep Performance: Funnel */}
          <div className="analytics-section-card">
            <div className="analytics-card-header">
              <h3 className="analytics-card-title">
                {perfToggle === 'rep' ? 'Dialer: Rep Performance: Funnel' : 'Dialer: Account Performance: Funnel'}
              </h3>
              <button className="more-options-btn" onClick={() => showToast('Funnel Options')}>
                <MoreHorizontal size={16} />
              </button>
            </div>

            <div className="mock-funnel-chart-wrap">
              <div className="no-data-placeholder-text" style={{ marginBottom: 14 }}>
                <span>No data available</span>
              </div>
              <div className="funnel-bars-graphic">
                <div className="funnel-bar b1" />
                <div className="funnel-bar b2" />
                <div className="funnel-bar b3" />
                <div className="funnel-bar b4" />
              </div>
            </div>
          </div>

          {/* Section 4: Dialer: Rep Performance: Line */}
          <div className="analytics-section-card">
            <div className="analytics-card-header">
              <h3 className="analytics-card-title">
                {perfToggle === 'rep' ? 'Dialer: Rep Performance: Line' : 'Dialer: Account Performance: Line'}
              </h3>
              <button className="more-options-btn" onClick={() => showToast('Line Chart Options')}>
                <MoreHorizontal size={16} />
              </button>
            </div>

            <div className="mock-line-chart-wrap">
              <span className="chart-y-axis-label">Dials</span>
              <span className="chart-y-zero">0</span>
              <div className="chart-horizontal-baseline">
                <div className="chart-data-dot" style={{ position: 'absolute', left: '30%' }} />
                <div className="chart-data-dot" style={{ position: 'absolute', left: '80%' }} />
              </div>
              <div className="chart-x-axis-row">
                <span>Aug 2026</span>
                <span>Sep 2026</span>
              </div>
              <span className="chart-bottom-x-label">Month</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom-Right Help Button (?) */}
      <button className="calls-floating-help-btn" onClick={() => showToast('Apollo Call Analytics Support & Guides')}>
        <span className="calls-help-question-mark">?</span>
      </button>

      {/* Phone Dialer Modal */}
      {showDialer && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(2px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 320, background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>Apollo Phone Dialer</span>
              <button onClick={() => setShowDialer(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#64748b' }}>✕</button>
            </div>

            <div style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px 14px', fontSize: 18, fontWeight: 700, textAlign: 'center', minHeight: 48, marginBottom: 16, color: '#0f172a' }}>
              {dialedNumber || '+1 (555) 019-2831'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, width: '100%', marginBottom: 16 }}>
              {['1','2','3','4','5','6','7','8','9','*','0','#'].map((num) => (
                <button 
                  key={num}
                  onClick={() => handleKeyPress(num)}
                  style={{ height: 44, borderRadius: 8, border: '1px solid #e2e8f0', background: '#ffffff', fontSize: 16, fontWeight: 600, color: '#0f172a', cursor: 'pointer' }}
                >
                  {num}
                </button>
              ))}
            </div>

            <button 
              onClick={handleStartCall}
              disabled={callActive}
              style={{ width: '100%', height: 44, borderRadius: 8, background: callActive ? '#16a34a' : '#2563eb', color: '#ffffff', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <Phone size={16} />
              <span>{callActive ? 'Call In Progress...' : 'Start Call'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
