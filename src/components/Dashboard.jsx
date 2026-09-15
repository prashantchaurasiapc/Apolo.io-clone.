import React, { useEffect, useRef, useState } from 'react';
import { 
  Search, Bell, ChevronDown, Settings, LogOut, CheckCircle2, Menu, X, RotateCcw, ArrowLeft
} from 'lucide-react';
import Sidebar from './dashboard/Sidebar';
import SettingsLayout from './settings/SettingsLayout';
import {
  HomeView, AIAssistantView, ProspectPeopleView, ProspectCompaniesView,
  ListsView, DataEnrichmentView, SequencesView, EmailsView, CallsView,
  TasksView, MeetingsView, ConversationsView, DealsView, WorkflowsView,
  AnalyticsView, WebsiteVisitorsView, FormsView, SavedPeopleView,
  SavedCompaniesView, EmailHealthView, AdminSettingsView,
  AdminUsersTeamsView, AdminSystemActivityView, AdminSecurityView,
  AdminPlanOverviewView, AdminIntegrationsView
} from './dashboard/views/ViewContainer';
import LeadScraperView from './dashboard/views/scraper/LeadScraperView';
import AICopilotDrawer from './dashboard/ai/AICopilotDrawer';
import Pricing from './Pricing';
import PricingCheckoutView from './dashboard/views/PricingCheckoutView';
import './Dashboard.css';

/* ─── Apollo Star Icon SVG ─── */
const OrbitIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" strokeDasharray="4 2" />
    <circle cx="12" cy="12" r="4" fill="white" />
  </svg>
);

export default function Dashboard({ user, activeTab = 'home', onSelectTab, onLogout }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [revealedEmails, setRevealedEmails] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifTab, setNotifTab] = useState('activities'); // 'activities' | 'notifications'
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [showPricingView, setShowPricingView] = useState(false);
  const searchInputRef = useRef(null);
  const headerMenusRef = useRef(null);

  const openPricingPlans = () => setShowPricingView(true);

  const currentUser = user || {
    name: 'Shivam Ahirwar',
    email: 'shivamahirwar773@gmail.com',
    provider: 'Google Account',
    avatar: 'SA'
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const toggleRevealEmail = (id, email) => {
    setRevealedEmails(prev => ({
      ...prev,
      [id]: prev[id] ? null : email
    }));
    if (!revealedEmails[id]) {
      showToast(`Verified email unlocked: ${email}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.key === 'Escape') {
        setShowUserMenu(false);
        setShowNotifications(false);
        setMobileSidebarOpen(false);
      }
    };
    const handlePointerDown = (event) => {
      if (!headerMenusRef.current?.contains(event.target)) {
        setShowUserMenu(false);
        setShowNotifications(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  // Mock Contacts Data
  const sampleLeads = [
    { id: 1, name: 'Matt Curl', role: 'CEO & Founder', company: 'Apollo.io', location: 'San Francisco, CA', email: 'mc@apollo.io', phone: '+1 (415) 892-0192', employees: '500-1000' },
    { id: 2, name: 'Sarah Jenkins', role: 'VP of Sales', company: 'Stripe', location: 'New York, NY', email: 's.jenkins@stripe.com', phone: '+1 (212) 441-9981', employees: '5000+' },
    { id: 3, name: 'David Chen', role: 'Head of Growth', company: 'Notion', location: 'Austin, TX', email: 'david.c@m.notion.so', phone: '+1 (512) 330-8812', employees: '1000-5000' },
    { id: 4, name: 'Elena Rostova', role: 'Director of RevOps', company: 'Figma', location: 'Seattle, WA', email: 'elena@figma.com', phone: '+1 (206) 773-1029', employees: '1000-5000' },
    { id: 5, name: 'Marcus Vance', role: 'Chief Revenue Officer', company: 'HubSpot', location: 'Boston, MA', email: 'm.vance@hubspot.com', phone: '+1 (617) 902-3341', employees: '5000+' }
  ];

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView user={currentUser} sampleLeads={sampleLeads} revealedEmails={revealedEmails} toggleRevealEmail={toggleRevealEmail} showToast={showToast} onSelectTab={onSelectTab} />;
      case 'ai_assistant':
        return <AIAssistantView showToast={showToast} />;
      case 'prospect_people':
        return <ProspectPeopleView sampleLeads={sampleLeads} showToast={showToast} onSelectTab={onSelectTab} />;
      case 'prospect_companies':
        return <ProspectCompaniesView showToast={showToast} onSelectTab={onSelectTab} />;
      case 'prospect_scraper':
        return <LeadScraperView showToast={showToast} />;
      case 'lists':
        return <ListsView showToast={showToast} />;
      case 'enrichment':
        return <DataEnrichmentView showToast={showToast} onViewPricingPlans={openPricingPlans} />;
      case 'sequences':
        return <SequencesView showToast={showToast} />;
      case 'emails':
        return <EmailsView showToast={showToast} />;
      case 'calls':
        return <CallsView showToast={showToast} />;
      case 'tasks':
        return <TasksView showToast={showToast} />;
      case 'meetings':
        return <MeetingsView showToast={showToast} />;
      case 'conversations':
        return <ConversationsView showToast={showToast} />;
      case 'deals':
        return <DealsView showToast={showToast} />;
      case 'workflows':
        return <WorkflowsView showToast={showToast} />;
      case 'analytics':
        return <AnalyticsView showToast={showToast} />;
      case 'website_visitors':
        return <WebsiteVisitorsView showToast={showToast} />;
      case 'forms':
        return <FormsView showToast={showToast} />;
      case 'saved_people':
        return <SavedPeopleView sampleLeads={sampleLeads} showToast={showToast} />;
      case 'saved_companies':
        return <SavedCompaniesView showToast={showToast} />;
      case 'email_health':
        return <EmailHealthView showToast={showToast} />;
      case 'admin_users':
        return <AdminUsersTeamsView showToast={showToast} />;
      case 'admin_activity':
        return <AdminSystemActivityView showToast={showToast} />;
      case 'admin_security':
        return <AdminSecurityView showToast={showToast} />;
      case 'plans':
      case 'pricing':
      case 'admin_plan':
        return (
          <div className="dashboard-pricing-view" style={{ width: '100%', height: '100%', overflowY: 'auto', background: '#ffffff' }}>
            <Pricing onBack={() => onSelectTab('prospect_people')} />
          </div>
        );
      case 'admin_integrations':
        return <AdminIntegrationsView showToast={showToast} />;
      case 'admin_settings':
        return <AdminSettingsView user={currentUser} onLogout={onLogout} />;
      default:
        return <HomeView user={currentUser} sampleLeads={sampleLeads} revealedEmails={revealedEmails} toggleRevealEmail={toggleRevealEmail} showToast={showToast} onSelectTab={onSelectTab} />;
    }
  };

  const isSettingsActive = activeTab === 'settings' || activeTab === 'admin_settings' || activeTab.startsWith('admin_');
  if (isSettingsActive) {
    return (
      <div className="apollo-dashboard-root light-theme">
        <SettingsLayout 
          user={currentUser} 
          onBack={() => onSelectTab('home')} 
          showToast={showToast} 
        />
        {toastMessage && (
          <div className="apollo-toast" role="alert" aria-live="assertive">
            <CheckCircle2 size={16} />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // If pricing view is active, render it over the dashboard
  if (showPricingView) {
    return (
      <div className="apollo-dashboard-root light-theme">
        <Sidebar 
          activeTab={activeTab}
          onSelectTab={(tab) => { setShowPricingView(false); onSelectTab(tab); }}
          onUpgradeClick={openPricingPlans}
          showToast={showToast}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />
        <div className="dash-right-area" style={{ overflowY: 'auto', padding: 0 }}>
          {/* Back button bar — exact Apollo.io style */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 24px',
            background: '#fff',
            borderBottom: '1.5px solid #e5e7eb',
            position: 'sticky', top: 0, zIndex: 50,
          }}>
            <button
              onClick={() => setShowPricingView(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: '#f3f4f6', border: '1.5px solid #e5e7eb',
                borderRadius: 8, padding: '5px 14px',
                cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#374151',
              }}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <span style={{ width: 1, height: 18, background: '#e5e7eb', flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: '#111827', letterSpacing: '-0.1px' }}>Pricing Plans</span>
          </div>
          <main style={{ minHeight: '100%' }}>
            <PricingCheckoutView showToast={showToast} onBack={() => setShowPricingView(false)} />
          </main>
          {toastMessage && (
            <div className="dash-toast">
              <CheckCircle2 size={16} />
              <span>{toastMessage}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="apollo-dashboard-root light-theme">
      {/* Left Full-Height Sidebar (Star Logo at top left) */}
      <Sidebar 
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        onUpgradeClick={openPricingPlans}
        showToast={showToast}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />

      {/* Right Main Content Area (Header at top of right area) */}
      <div className="dash-right-area">
        {/* ─────────────────────────────────────────────────────────────
            TOPBAR HEADER (Matches Screenshot 1:1)
           ───────────────────────────────────────────────────────────── */}
        <header className="dash-topbar">
          <div className="dash-topbar-left">
            <button 
              className="dash-mobile-menu-btn" 
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              title="Toggle Menu"
            >
              <Menu size={18} />
            </button>
          </div>

          <div className="dash-search-container">
            <Search size={15} className="dash-search-icon" />
            <input
              type="text"
              className="dash-search-input"
              placeholder="Search or ask a question in Apollo"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              ref={searchInputRef}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && searchQuery.trim()) {
                  showToast(`Searching Apollo for “${searchQuery.trim()}”`);
                }
              }}
            />
            <span className="dash-search-shortcut">⌘ K</span>
          </div>

          <div className="dash-topbar-right" ref={headerMenusRef}>
            <button className="dash-credits-pill" onClick={() => showToast('80 credits remaining')}>
              80 credits
            </button>

            <button 
              className="dash-ai-badge-btn" 
              onClick={() => { setCopilotOpen(!copilotOpen); setShowUserMenu(false); }}
              title="Toggle AI Sales Copilot (⌘J)"
            >
              <OrbitIcon />
              <span>AI Copilot</span>
            </button>

            <button
              className={`dash-icon-btn ${showNotifications ? 'selected' : ''}`}
              title="Notifications"
              aria-label="Notifications"
              aria-expanded={showNotifications}
              onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
            >
              <Bell size={17} />
              <span className="dash-notif-dot" />
            </button>

            {showNotifications && (
              <div className="dash-notifications-dropdown" role="status" onClick={(e) => e.stopPropagation()}>
                {/* Header Row with Tabs and Action Buttons (Matches Screenshots 1:1) */}
                <div className="notif-dropdown-header">
                  <div className="notif-dropdown-tabs">
                    <button 
                      className={`notif-dropdown-tab ${notifTab === 'activities' ? 'active' : ''}`}
                      onClick={() => setNotifTab('activities')}
                    >
                      Activities
                    </button>
                    <button 
                      className={`notif-dropdown-tab ${notifTab === 'notifications' ? 'active' : ''}`}
                      onClick={() => setNotifTab('notifications')}
                    >
                      Notifications
                    </button>
                  </div>

                  <div className="notif-dropdown-actions">
                    {notifTab === 'activities' && (
                      <button 
                        className="notif-action-icon-btn" 
                        title="Refresh Activities"
                        onClick={() => showToast('Refreshed activities')}
                      >
                        <RotateCcw size={13} />
                      </button>
                    )}
                    <button 
                      className="notif-action-icon-btn" 
                      title="Close"
                      onClick={() => setShowNotifications(false)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                {notifTab === 'activities' ? (
                  <div className="notif-dropdown-body activities-empty">
                    {/* Clean canvas for activities as shown in screenshot 1 */}
                  </div>
                ) : (
                  <div className="notif-dropdown-body">
                    {/* 1:1 Magnifying Glass with Heartbeat Pulse & Red 0 Badge */}
                    <div className="notif-empty-state-graphic">
                      <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                        {/* Radiating Action Lines */}
                        <line x1="76" y1="28" x2="80" y2="18" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                        <line x1="90" y1="36" x2="100" y2="28" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                        <line x1="98" y1="48" x2="110" y2="48" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />

                        {/* Magnifying Glass Frame */}
                        <circle cx="65" cy="65" r="32" stroke="#bfdbfe" strokeWidth="7" fill="#ffffff" />
                        
                        {/* Pulse / Heartbeat Line inside Glass */}
                        <path 
                          d="M45 65 H53 L58 58 L63 72 L68 62 L73 67 H85" 
                          stroke="#2563eb" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                        />

                        {/* Handle */}
                        <line x1="88" y1="88" x2="108" y2="108" stroke="#2563eb" strokeWidth="10" strokeLinecap="round" />

                        {/* Red 0 Badge */}
                        <circle cx="82" cy="38" r="14" fill="#ef4444" />
                        <text x="82" y="43" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily="sans-serif">0</text>
                      </svg>
                    </div>

                    <div className="notif-empty-state-title">No Notifications</div>
                  </div>
                )}
              </div>
            )}

            {/* User Account Dropdown */}
            <div className="dash-user-menu-wrap">
              <button 
                className="dash-user-trigger"
                onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
                title="Account Settings"
                aria-label="Open account menu"
                aria-expanded={showUserMenu}
              >
                <div className="dash-user-avatar-badge">
                  {currentUser.avatar || 'AK'}
                </div>
                <ChevronDown size={14} className={`dash-user-chevron ${showUserMenu ? 'open' : ''}`} />
              </button>

              {showUserMenu && (
                <div className="dash-user-dropdown">
                  <div className="dash-dropdown-user-info">
                    <div className="dash-dropdown-name">{currentUser.name}</div>
                    <div className="dash-dropdown-email">{currentUser.email}</div>
                    <span className="dash-dropdown-badge">{currentUser.provider || 'Authenticated'}</span>
                  </div>
                  <button 
                    className="dash-dropdown-item"
                    onClick={() => { onSelectTab('admin_settings'); setShowUserMenu(false); }}
                  >
                    <Settings size={15} />
                    <span>Account & Settings</span>
                  </button>
                  <button 
                    className="dash-dropdown-item logout-red"
                    onClick={() => { setShowUserMenu(false); onLogout(); }}
                  >
                    <LogOut size={15} />
                    <span>Log Out of Software</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Toast Floating Notification */}
        {toastMessage && (
          <div className="dash-toast">
            <CheckCircle2 size={16} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main View Area */}
        <main className="dash-main">
          {renderActiveView()}
        </main>

        {/* Persistent AI Sales Copilot Drawer */}
        <AICopilotDrawer
          isOpen={copilotOpen}
          onToggle={() => setCopilotOpen(!copilotOpen)}
          showToast={showToast}
          onSelectTab={onSelectTab}
        />
      </div>
    </div>
  );
}
