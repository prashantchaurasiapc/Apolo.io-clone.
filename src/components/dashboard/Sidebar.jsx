import React, { useEffect, useState } from 'react';
import { 
  Home, Sparkles, Search, Send, DollarSign, Wrench, LogIn, Bookmark, 
  Settings, ChevronDown, ChevronsLeft, ChevronsRight, ShieldCheck,
  Users, Activity, Lock, CreditCard, PackageCheck, ChevronRight, Phone
} from 'lucide-react';
import './Sidebar.css';

const ApolloStarIcon = () => (
  <svg className="sidebar-logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" fill="#111827"/>
  </svg>
);

const GROUP_TABS = {
  prospect: ['prospect_people', 'prospect_companies', 'lists', 'enrichment'],
  engage: ['sequences', 'emails', 'calls', 'tasks'],
  win_deals: ['meetings', 'conversations', 'deals'],
  tools: ['workflows', 'analytics'],
  inbound: ['website_visitors', 'forms'],
  saved: ['saved_people', 'saved_companies'],
};

const CLOSED_GROUPS = Object.freeze({
  prospect: false,
  engage: false,
  win_deals: false,
  tools: false,
  inbound: false,
  saved: false,
});

const readSavedGroups = () => {
  try {
    const saved = window.sessionStorage.getItem('apollo-sidebar-open-groups');
    return saved ? { ...CLOSED_GROUPS, ...JSON.parse(saved) } : { ...CLOSED_GROUPS };
  } catch {
    return { ...CLOSED_GROUPS };
  }
};

export default function Sidebar({ activeTab, onSelectTab, onUpgradeClick, showToast, mobileOpen, onCloseMobile, collapsed: controlledCollapsed, onCollapsedChange }) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [showDialerModal, setShowDialerModal] = useState(false);
  const [openGroups, setOpenGroups] = useState(readSavedGroups);
  const collapsed = controlledCollapsed ?? internalCollapsed;
  const setCollapsed = (nextCollapsed) => {
    if (controlledCollapsed === undefined) {
      setInternalCollapsed(nextCollapsed);
    }
    onCollapsedChange?.(nextCollapsed);
  };

  const toggleGroup = (key) => {
    if (collapsed) {
      setCollapsed(false);
      setOpenGroups(prev => ({ ...prev, [key]: true }));
      return;
    }
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = (tab) => {
    setShowAdminPopup(false);
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  useEffect(() => {
    try {
      window.sessionStorage.setItem('apollo-sidebar-open-groups', JSON.stringify(openGroups));
    } catch {
      // Sidebar navigation remains fully functional when storage is unavailable.
    }
  }, [openGroups]);

  useEffect(() => {
    if (mobileOpen) setCollapsed(false);
  }, [mobileOpen]);

  const groupProps = (key) => ({
    role: 'button',
    tabIndex: 0,
    'aria-expanded': !collapsed && openGroups[key],
    onClick: () => toggleGroup(key),
    onKeyDown: (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleGroup(key);
      }
    },
  });

  const isAdminActive = ['admin_settings', 'admin_users', 'admin_activity', 'admin_security', 'admin_plan', 'admin_integrations'].includes(activeTab);

  return (
    <>
      {mobileOpen && (
        <div className="sidebar-mobile-overlay" onClick={onCloseMobile} />
      )}
      <aside className={`apollo-sidebar-container ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Header Logo & Toggle (Matches Screenshot) */}
        <div className="sidebar-header">
          <button type="button" className="sidebar-logo-group" onClick={() => handleSelect('home')} aria-label="Apollo home">
            <ApolloStarIcon />
          </button>
          <button 
            className="sidebar-collapse-btn" 
            onClick={() => { setCollapsed(!collapsed); setShowAdminPopup(false); }}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          </button>
        </div>

      {/* Main Nav Items Scrollable */}
      <div className="sidebar-nav-scroll">
        {/* Home Row (with Phone Dialer Icon on Right matching Screenshot) */}
        <div 
          className={`sidebar-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => handleSelect('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSelect('home'); }}
        >
          <div className="sidebar-item-left">
            <Home size={17} className="sidebar-item-icon" />
            {!collapsed && <span>Home</span>}
          </div>
          {!collapsed && (
            <button 
              className="sidebar-phone-btn" 
              onClick={(e) => { e.stopPropagation(); setShowDialerModal(true); }}
              title="Open Phone Dialer"
            >
              <Phone size={15} color="#64748b" />
            </button>
          )}
        </div>

        {/* AI Assistant */}
        <button 
          className={`sidebar-item ${activeTab === 'ai_assistant' ? 'active' : ''}`}
          onClick={() => handleSelect('ai_assistant')}
        >
          <div className="sidebar-item-left">
            <Sparkles size={17} className="sidebar-item-icon" />
            {!collapsed && <span>AI Assistant</span>}
          </div>
        </button>

        <div className="sidebar-divider-line" />

        {/* ── Category 1: Prospect and enrich ── */}
        <div className="sidebar-group">
          <div className={`sidebar-category-header ${GROUP_TABS.prospect.includes(activeTab) ? 'has-active' : ''}`} {...groupProps('prospect')}>
            <div className="sidebar-category-title">
              <Search size={17} className="sidebar-item-icon" />
              {!collapsed && <span>Prospect and enrich</span>}
            </div>
            {!collapsed && (
              <ChevronDown size={14} className={`sidebar-chevron ${openGroups.prospect ? 'open' : ''}`} />
            )}
          </div>
          {openGroups.prospect && !collapsed && (
            <div className="sidebar-sub-group">
              <button 
                className={`sidebar-sub-item ${activeTab === 'prospect_people' ? 'active' : ''}`}
                onClick={() => handleSelect('prospect_people')}
              >
                People
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'prospect_companies' ? 'active' : ''}`}
                onClick={() => handleSelect('prospect_companies')}
              >
                Companies
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'lists' ? 'active' : ''}`}
                onClick={() => handleSelect('lists')}
              >
                Lists
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'enrichment' ? 'active' : ''}`}
                onClick={() => handleSelect('enrichment')}
              >
                Data enrichment
              </button>
            </div>
          )}
        </div>

        {/* ── Category 2: Engage ── */}
        <div className="sidebar-group">
          <div className={`sidebar-category-header ${GROUP_TABS.engage.includes(activeTab) ? 'has-active' : ''}`} {...groupProps('engage')}>
            <div className="sidebar-category-title">
              <Send size={17} className="sidebar-item-icon" />
              {!collapsed && <span>Engage</span>}
            </div>
            {!collapsed && (
              <ChevronDown size={14} className={`sidebar-chevron ${openGroups.engage ? 'open' : ''}`} />
            )}
          </div>
          {openGroups.engage && !collapsed && (
            <div className="sidebar-sub-group">
              <button 
                className={`sidebar-sub-item ${activeTab === 'sequences' ? 'active' : ''}`}
                onClick={() => handleSelect('sequences')}
              >
                Sequences
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'emails' ? 'active' : ''}`}
                onClick={() => handleSelect('emails')}
              >
                Emails
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'calls' ? 'active' : ''}`}
                onClick={() => handleSelect('calls')}
              >
                Calls
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'tasks' ? 'active' : ''}`}
                onClick={() => handleSelect('tasks')}
              >
                Tasks
              </button>
            </div>
          )}
        </div>

        {/* ── Category 3: Win deals ── */}
        <div className="sidebar-group">
          <div className={`sidebar-category-header ${GROUP_TABS.win_deals.includes(activeTab) ? 'has-active' : ''}`} {...groupProps('win_deals')}>
            <div className="sidebar-category-title">
              <DollarSign size={17} className="sidebar-item-icon" />
              {!collapsed && <span>Win deals</span>}
            </div>
            {!collapsed && (
              <ChevronDown size={14} className={`sidebar-chevron ${openGroups.win_deals ? 'open' : ''}`} />
            )}
          </div>
          {openGroups.win_deals && !collapsed && (
            <div className="sidebar-sub-group">
              <button 
                className={`sidebar-sub-item ${activeTab === 'meetings' ? 'active' : ''}`}
                onClick={() => handleSelect('meetings')}
              >
                Meetings
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'conversations' ? 'active' : ''}`}
                onClick={() => handleSelect('conversations')}
              >
                Conversations
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'deals' ? 'active' : ''}`}
                onClick={() => handleSelect('deals')}
              >
                Deals
              </button>
            </div>
          )}
        </div>

        {/* ── Category 4: Tools and automation ── */}
        <div className="sidebar-group">
          <div className={`sidebar-category-header ${GROUP_TABS.tools.includes(activeTab) ? 'has-active' : ''}`} {...groupProps('tools')}>
            <div className="sidebar-category-title">
              <Wrench size={17} className="sidebar-item-icon" />
              {!collapsed && <span>Tools and automation</span>}
            </div>
            {!collapsed && (
              <ChevronDown size={14} className={`sidebar-chevron ${openGroups.tools ? 'open' : ''}`} />
            )}
          </div>
          {openGroups.tools && !collapsed && (
            <div className="sidebar-sub-group">
              <button 
                className={`sidebar-sub-item ${activeTab === 'workflows' ? 'active' : ''}`}
                onClick={() => handleSelect('workflows')}
              >
                Workflows
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => handleSelect('analytics')}
              >
                Analytics
              </button>
            </div>
          )}
        </div>

        {/* ── Category 5: Inbound ── */}
        <div className="sidebar-group">
          <div className={`sidebar-category-header ${GROUP_TABS.inbound.includes(activeTab) ? 'has-active' : ''}`} {...groupProps('inbound')}>
            <div className="sidebar-category-title">
              <LogIn size={17} className="sidebar-item-icon" />
              {!collapsed && <span>Inbound</span>}
            </div>
            {!collapsed && (
              <ChevronDown size={14} className={`sidebar-chevron ${openGroups.inbound ? 'open' : ''}`} />
            )}
          </div>
          {openGroups.inbound && !collapsed && (
            <div className="sidebar-sub-group">
              <button 
                className={`sidebar-sub-item ${activeTab === 'website_visitors' ? 'active' : ''}`}
                onClick={() => handleSelect('website_visitors')}
              >
                <span>Website visitors</span>
                <span className="sidebar-badge-new">New</span>
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'forms' ? 'active' : ''}`}
                onClick={() => handleSelect('forms')}
              >
                Forms
              </button>
            </div>
          )}
        </div>

        {/* ── Category 6: Saved records ── */}
        <div className="sidebar-group">
          <div className={`sidebar-category-header ${GROUP_TABS.saved.includes(activeTab) ? 'has-active' : ''}`} {...groupProps('saved')}>
            <div className="sidebar-category-title">
              <Bookmark size={17} className="sidebar-item-icon" />
              {!collapsed && <span>Saved records</span>}
            </div>
            {!collapsed && (
              <ChevronDown size={14} className={`sidebar-chevron ${openGroups.saved ? 'open' : ''}`} />
            )}
          </div>
          {openGroups.saved && !collapsed && (
            <div className="sidebar-sub-group">
              <button 
                className={`sidebar-sub-item ${activeTab === 'saved_people' ? 'active' : ''}`}
                onClick={() => handleSelect('saved_people')}
              >
                People
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'saved_companies' ? 'active' : ''}`}
                onClick={() => handleSelect('saved_companies')}
              >
                Companies
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Fixed Actions */}
      <div className="sidebar-bottom-actions" style={{ position: 'relative' }}>
        {!collapsed && (
          <button className="sidebar-upgrade-btn" onClick={onUpgradeClick}>
            Upgrade
          </button>
        )}
        <button 
          className={`sidebar-bottom-item ${activeTab === 'email_health' ? 'active' : ''}`}
          onClick={() => handleSelect('email_health')}
        >
          <ShieldCheck size={17} className="sidebar-item-icon" />
          {!collapsed && <span>Email setup and health</span>}
        </button>

        {/* Admin Settings with Flyout Sub-menu matching Screenshot */}
        <div style={{ position: 'relative' }}>
          <button 
            className={`sidebar-bottom-item ${isAdminActive ? 'active' : ''}`}
            onClick={() => setShowAdminPopup(!showAdminPopup)}
            aria-expanded={showAdminPopup}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
              <Settings size={17} className="sidebar-item-icon" />
              {!collapsed && <span>Admin Settings</span>}
            </div>
            {!collapsed && <ChevronRight size={14} color="#94a3b8" />}
          </button>

          {/* Admin Settings Floating Popover (Matches Screenshot 1:1) */}
          {showAdminPopup && (
            <div className="admin-flyout-card">
              <div className="admin-flyout-header">
                <div className="admin-flyout-title">Team & Workspace setup</div>
                <div className="admin-flyout-progress">
                  <span>11% Completed</span>
                  <div className="admin-progress-line"><div className="admin-progress-fill" style={{ width: '11%' }} /></div>
                </div>
              </div>
              <div className="admin-flyout-menu">
                <button className={`admin-flyout-item ${activeTab === 'admin_users' ? 'active' : ''}`} onClick={() => { handleSelect('admin_users'); setShowAdminPopup(false); }}>
                  <Users size={15} /> <span>Users and teams</span>
                </button>
                <button className={`admin-flyout-item ${activeTab === 'admin_activity' ? 'active' : ''}`} onClick={() => { handleSelect('admin_activity'); setShowAdminPopup(false); }}>
                  <Activity size={15} /> <span>System activity</span>
                </button>
                <button className={`admin-flyout-item ${activeTab === 'admin_security' ? 'active' : ''}`} onClick={() => { handleSelect('admin_security'); setShowAdminPopup(false); }}>
                  <Lock size={15} /> <span>Security</span>
                </button>
                <button className={`admin-flyout-item ${activeTab === 'admin_plan' ? 'active' : ''}`} onClick={() => { handleSelect('admin_plan'); setShowAdminPopup(false); }}>
                  <CreditCard size={15} /> <span>Plan overview</span>
                </button>
                <button className={`admin-flyout-item ${activeTab === 'admin_integrations' ? 'active' : ''}`} onClick={() => { handleSelect('admin_integrations'); setShowAdminPopup(false); }}>
                  <PackageCheck size={15} /> <span>Integrations</span>
                </button>
                <div className="admin-flyout-divider" />
                <button className={`admin-flyout-item bold-item ${activeTab === 'admin_settings' ? 'active' : ''}`} onClick={() => { handleSelect('admin_settings'); setShowAdminPopup(false); }}>
                  <Settings size={15} /> <span>All settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dialer Upgrade Modal */}
      {showDialerModal && (
        <div className="dialer-modal-overlay" onClick={() => setShowDialerModal(false)}>
          <div className="dialer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="dialer-modal-close" onClick={() => setShowDialerModal(false)}>✕</button>
            
            <div className="dialer-modal-graphic">
              {/* Fake Wireframe Graphic representing Call Participants */}
              <div className="dialer-wireframe">
                <div className="dialer-wireframe-header">
                  <span>Call participants</span>
                  <div className="dialer-wireframe-pill"></div>
                </div>
                <div className="dialer-wireframe-body">
                  <div className="dw-line-short"></div>
                  <div className="dw-line-long"></div>
                  <div className="dw-line-short" style={{marginTop: 10}}></div>
                  <div className="dw-line-long"></div>
                </div>
              </div>
              <span className="dialer-sparkle s-top-right">✦</span>
              <span className="dialer-sparkle s-bottom-left">✦</span>
              <span className="dialer-sparkle s-bottom-left-small">✦</span>
            </div>

            <h2 className="dialer-modal-title">Dialer isn't included in your plan</h2>
            
            <div className="dialer-modal-footer">
              <button 
                className="dialer-pricing-btn"
                onClick={() => {
                  setShowDialerModal(false);
                  if(onUpgradeClick) onUpgradeClick();
                }}
              >
                View pricing plans
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
    </>
  );
}
