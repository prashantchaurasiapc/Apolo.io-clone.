import React, { useEffect, useRef, useState } from 'react';
import { 
  Search, Bell, ChevronDown, Settings, LogOut, CheckCircle2, Menu, X
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
  const searchInputRef = useRef(null);
  const headerMenusRef = useRef(null);

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
        return <ProspectPeopleView sampleLeads={sampleLeads} showToast={showToast} />;
      case 'prospect_companies':
        return <ProspectCompaniesView showToast={showToast} />;
      case 'lists':
        return <ListsView showToast={showToast} />;
      case 'enrichment':
        return <DataEnrichmentView showToast={showToast} />;
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
      case 'admin_plan':
        return <AdminPlanOverviewView showToast={showToast} />;
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

  return (
    <div className="apollo-dashboard-root light-theme">
      {/* Left Full-Height Sidebar (Star Logo at top left) */}
      <Sidebar 
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        onUpgradeClick={() => showToast('Enterprise Unlimited Plan activated')}
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

            <button className="dash-ai-badge-btn" onClick={() => { onSelectTab('ai_assistant'); setShowUserMenu(false); }}>
              <OrbitIcon />
              <span>AI Assistant</span>
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
              <div className="dash-notifications-dropdown" role="status">
                <div className="dash-popover-heading"><strong>Notifications</strong><button type="button" onClick={() => setShowNotifications(false)} aria-label="Close notifications"><X size={15} /></button></div>
                <button type="button" className="dash-notification-item" onClick={() => { showToast('Your email health report is ready'); setShowNotifications(false); }}><span className="dash-notification-dot" />Your email health report is ready</button>
                <button type="button" className="dash-notification-item" onClick={() => { onSelectTab('tasks'); setShowNotifications(false); }}>3 tasks need your attention</button>
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
      </div>
    </div>
  );
}
