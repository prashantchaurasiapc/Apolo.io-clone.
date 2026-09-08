import React, { useState } from 'react';
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

export default function Sidebar({ activeTab, onSelectTab, onUpgradeClick, showToast }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [openGroups, setOpenGroups] = useState({
    prospect: true,
    engage: true,
    win_deals: true,
    tools: true,
    inbound: true,
    saved: true
  });

  const toggleGroup = (key) => {
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className={`apollo-sidebar-container ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header Logo & Toggle (Matches Screenshot) */}
      <div className="sidebar-header">
        <div className="sidebar-logo-group" onClick={() => onSelectTab('home')}>
          <ApolloStarIcon />
        </div>
        <button 
          className="sidebar-collapse-btn" 
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>

      {/* Main Nav Items Scrollable */}
      <div className="sidebar-nav-scroll">
        {/* Home Row (with Phone Dialer Icon on Right matching Screenshot) */}
        <button 
          className={`sidebar-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => onSelectTab('home')}
        >
          <div className="sidebar-item-left">
            <Home size={17} className="sidebar-item-icon" />
            {!collapsed && <span>Home</span>}
          </div>
          {!collapsed && (
            <button 
              className="sidebar-phone-btn" 
              onClick={(e) => { e.stopPropagation(); showToast('Opening Apollo Dialer...'); }}
              title="Open Phone Dialer"
            >
              <Phone size={15} color="#64748b" />
            </button>
          )}
        </button>

        {/* AI Assistant */}
        <button 
          className={`sidebar-item ${activeTab === 'ai_assistant' ? 'active' : ''}`}
          onClick={() => onSelectTab('ai_assistant')}
        >
          <div className="sidebar-item-left">
            <Sparkles size={17} className="sidebar-item-icon" />
            {!collapsed && <span>AI Assistant</span>}
          </div>
        </button>

        <div className="sidebar-divider-line" />

        {/* ── Category 1: Prospect and enrich ── */}
        <div className="sidebar-group">
          <div 
            className="sidebar-category-header"
            onClick={() => toggleGroup('prospect')}
          >
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
                onClick={() => onSelectTab('prospect_people')}
              >
                People
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'prospect_companies' ? 'active' : ''}`}
                onClick={() => onSelectTab('prospect_companies')}
              >
                Companies
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'lists' ? 'active' : ''}`}
                onClick={() => onSelectTab('lists')}
              >
                Lists
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'enrichment' ? 'active' : ''}`}
                onClick={() => onSelectTab('enrichment')}
              >
                Data enrichment
              </button>
            </div>
          )}
        </div>

        {/* ── Category 2: Engage ── */}
        <div className="sidebar-group">
          <div 
            className="sidebar-category-header"
            onClick={() => toggleGroup('engage')}
          >
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
                onClick={() => onSelectTab('sequences')}
              >
                Sequences
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'emails' ? 'active' : ''}`}
                onClick={() => onSelectTab('emails')}
              >
                Emails
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'calls' ? 'active' : ''}`}
                onClick={() => onSelectTab('calls')}
              >
                Calls
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'tasks' ? 'active' : ''}`}
                onClick={() => onSelectTab('tasks')}
              >
                Tasks
              </button>
            </div>
          )}
        </div>

        {/* ── Category 3: Win deals ── */}
        <div className="sidebar-group">
          <div 
            className="sidebar-category-header"
            onClick={() => toggleGroup('win_deals')}
          >
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
                onClick={() => onSelectTab('meetings')}
              >
                Meetings
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'conversations' ? 'active' : ''}`}
                onClick={() => onSelectTab('conversations')}
              >
                Conversations
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'deals' ? 'active' : ''}`}
                onClick={() => onSelectTab('deals')}
              >
                Deals
              </button>
            </div>
          )}
        </div>

        {/* ── Category 4: Tools and automation ── */}
        <div className="sidebar-group">
          <div 
            className="sidebar-category-header"
            onClick={() => toggleGroup('tools')}
          >
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
                onClick={() => onSelectTab('workflows')}
              >
                Workflows
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => onSelectTab('analytics')}
              >
                Analytics
              </button>
            </div>
          )}
        </div>

        {/* ── Category 5: Inbound ── */}
        <div className="sidebar-group">
          <div 
            className="sidebar-category-header"
            onClick={() => toggleGroup('inbound')}
          >
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
                onClick={() => onSelectTab('website_visitors')}
              >
                <span>Website visitors</span>
                <span className="sidebar-badge-new">New</span>
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'forms' ? 'active' : ''}`}
                onClick={() => onSelectTab('forms')}
              >
                Forms
              </button>
            </div>
          )}
        </div>

        {/* ── Category 6: Saved records ── */}
        <div className="sidebar-group">
          <div 
            className="sidebar-category-header"
            onClick={() => toggleGroup('saved')}
          >
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
                onClick={() => onSelectTab('saved_people')}
              >
                People
              </button>
              <button 
                className={`sidebar-sub-item ${activeTab === 'saved_companies' ? 'active' : ''}`}
                onClick={() => onSelectTab('saved_companies')}
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
          onClick={() => onSelectTab('email_health')}
        >
          <ShieldCheck size={17} className="sidebar-item-icon" />
          {!collapsed && <span>Email setup and health</span>}
        </button>

        {/* Admin Settings with Flyout Sub-menu matching Screenshot */}
        <div style={{ position: 'relative' }}>
          <button 
            className={`sidebar-bottom-item ${activeTab === 'admin_settings' ? 'active' : ''}`}
            onClick={() => setShowAdminPopup(!showAdminPopup)}
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
                <button className="admin-flyout-item" onClick={() => { onSelectTab('admin_settings'); setShowAdminPopup(false); }}>
                  <Users size={15} /> <span>Users and teams</span>
                </button>
                <button className="admin-flyout-item" onClick={() => { showToast('Opening System Activity logs'); setShowAdminPopup(false); }}>
                  <Activity size={15} /> <span>System activity</span>
                </button>
                <button className="admin-flyout-item" onClick={() => { showToast('Security & SAML SSO configuration'); setShowAdminPopup(false); }}>
                  <Lock size={15} /> <span>Security</span>
                </button>
                <button className="admin-flyout-item" onClick={() => { showToast('Enterprise Plan Overview'); setShowAdminPopup(false); }}>
                  <CreditCard size={15} /> <span>Plan overview</span>
                </button>
                <button className="admin-flyout-item" onClick={() => { showToast('CRM & API Integrations'); setShowAdminPopup(false); }}>
                  <PackageCheck size={15} /> <span>Integrations</span>
                </button>
                <div className="admin-flyout-divider" />
                <button className="admin-flyout-item bold-item" onClick={() => { onSelectTab('admin_settings'); setShowAdminPopup(false); }}>
                  <Settings size={15} /> <span>All settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
