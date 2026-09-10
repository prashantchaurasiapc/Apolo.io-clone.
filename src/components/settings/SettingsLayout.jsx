import React, { useState } from 'react';
import { 
  ArrowLeft, Search, ChevronDown, ChevronUp, ExternalLink, 
  UserPlus, HelpCircle, Compass, Rocket, BookOpen, MessageSquare, 
  FileQuestion, Lightbulb, X
} from 'lucide-react';
import './SettingsLayout.css';
import UsersSettingsView from './views/UsersSettingsView';
import {
  ProfileSettingsView,
  MailboxesSettingsView,
  PlanOverviewView,
  ApiKeysSettingsView,
  IntegrationsSettingsView,
  GenericSettingsSectionView
} from './views/OtherSettingsViews';
import InviteUserModal from './modals/InviteUserModal';

export default function SettingsLayout({ user, onBack, showToast }) {
  // Default active setting item matching screenshot 1:1
  const [activeItem, setActiveItem] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [showHelpPopover, setShowHelpPopover] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Group collapse state
  const [collapsedGroups, setCollapsedGroups] = useState({
    email_health: true,
    users_teams: false, // expanded in screenshot
    plan_billing: true,
    credits_activity: true,
    integrations: true,
    icp: true,
    rules_engagement: true,
    team_email_sequences: true,
    team_conversations: true,
    data_objects: true,
    data_imports: true,
  });

  const toggleGroup = (key) => {
    setCollapsedGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const currentUser = user || {
    name: 'Shivam Ahirwar',
    email: 'shivamahirwar773@gmail.com',
    provider: 'Google Account',
    avatar: 'SA'
  };

  // Check if item matches search
  const matchesSearch = (label) => {
    if (!searchQuery.trim()) return true;
    return label.toLowerCase().includes(searchQuery.toLowerCase());
  };

  // Render the appropriate main view based on activeItem
  const renderMainView = () => {
    switch (activeItem) {
      case 'users':
        return <UsersSettingsView currentUser={currentUser} showToast={showToast} />;
      case 'profile':
        return <ProfileSettingsView user={currentUser} showToast={showToast} />;
      case 'mailboxes':
        return <MailboxesSettingsView showToast={showToast} />;
      case 'plan_overview':
        return <PlanOverviewView showToast={showToast} />;
      case 'api_keys':
        return <ApiKeysSettingsView showToast={showToast} />;
      case 'connected_integrations':
        return <IntegrationsSettingsView showToast={showToast} />;
      case 'support_access':
        return (
          <GenericSettingsSectionView 
            title="Support Access"
            description="Grant temporary, secure access to the Apollo Support team for troubleshooting."
            badgeText="Disabled"
            contentLines={[
              "Support agents cannot view your account without your explicit permission.",
              "Access automatically revokes after 72 hours.",
              "All support actions are logged in your workspace activity log."
            ]}
          />
        );
      case 'workspace_overview':
        return (
          <GenericSettingsSectionView 
            title="Workspace Overview"
            description="General configuration and company profile settings for your Apollo workspace."
            badgeText="Verified Domain"
            contentLines={[
              "Company Name: Apollo Sales Team",
              "Primary Domain: apollo-user.io",
              "Workspace Owner: Shivam Ahirwar",
              "Timezone: Asia/Kolkata (GMT+05:30)"
            ]}
          />
        );
      case 'email_setup_health':
      case 'tracking':
        return (
          <GenericSettingsSectionView 
            title="Email Setup & Health"
            description="Authenticate your sending domains with SPF, DKIM, and DMARC records."
            badgeText="98% Deliverability"
            contentLines={[
              "SPF record: Verified (v=spf1 include:_spf.google.com ~all)",
              "DKIM 2048-bit signature: Active & Verified",
              "DMARC record: Active (p=quarantine)",
              "Custom Tracking Domain: tracking.apollo-user.io"
            ]}
          />
        );
      case 'credit_usage':
        return (
          <GenericSettingsSectionView 
            title="Credit Usage & Allocation"
            description="Review monthly export and mobile number credits consumption across your team."
            badgeText="Pooled Enterprise Credits"
            contentLines={[
              "Total workspace credits allocated: Unlimited",
              "Credits used this cycle: 1,420",
              "Mobile phone numbers revealed: 340",
              "Cycle reset date: Oct 08, 2026"
            ]}
          />
        );
      case 'personas':
        return (
          <GenericSettingsSectionView 
            title="Ideal Customer Profile: Personas"
            description="Define buyer personas and target titles to automatically highlight best-fit leads."
            badgeText="3 Active Personas"
            contentLines={[
              "Persona 1: VP / Director of Sales & Revenue",
              "Persona 2: Head of Growth / Demand Generation",
              "Persona 3: Chief Revenue Officer (CRO)"
            ]}
          />
        );
      case 'ai_context':
        return (
          <GenericSettingsSectionView 
            title="AI Context Center"
            description="Teach Apollo AI about your product value propositions, case studies, and competitors."
            badgeText="AI Trained"
            contentLines={[
              "Value proposition: AI sales platform helping teams book 3x more pipeline.",
              "Competitor battlecards: Loaded (ZoomInfo, Outreach, Salesloft)",
              "Tone of voice: Professional, concise, high-urgency"
            ]}
          />
        );
      default:
        return (
          <GenericSettingsSectionView 
            title={activeItem.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            description={`Configure and customize options for ${activeItem.replace(/_/g, ' ')}.`}
            badgeText="Active"
          />
        );
    }
  };

  return (
    <div className="apollo-settings-page">
      {/* ═══════════════════════════════════════════════════════════════
          LEFT SIDEBAR (Matches Screenshot 1:1)
      ═══════════════════════════════════════════════════════════════ */}
      <aside className="settings-sidebar">
        {/* Back Arrow button: "← Settings" */}
        <div className="settings-back-header">
          <button className="settings-back-btn" onClick={onBack} title="Back to Apollo App">
            <ArrowLeft size={16} />
            <span>Settings</span>
          </button>
        </div>

        {/* Search Input: "Search settings" */}
        <div className="settings-search-wrap">
          <div className="settings-search-input-box">
            <Search size={14} color="#9ca3af" />
            <input 
              type="text" 
              placeholder="Search settings"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={() => setSearchQuery('')}
              >
                <X size={12} color="#9ca3af" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Navigation Tree */}
        <div className="settings-nav-scroll">
          {/* Top: Get started */}
          {matchesSearch('Get started') && (
            <button 
              className={`settings-get-started-btn ${activeItem === 'get_started' ? 'active' : ''}`}
              onClick={() => setActiveItem('get_started')}
            >
              <Compass size={14} color="#4b5563" />
              <span>Get started</span>
            </button>
          )}

          {/* ─── 1. Personal Settings ─── */}
          <div className="settings-category-header">Personal settings</div>
          
          {matchesSearch('Profile') && (
            <button 
              className={`settings-standalone-btn ${activeItem === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveItem('profile')}
            >
              Profile
            </button>
          )}
          {matchesSearch('Mailboxes') && (
            <button 
              className={`settings-standalone-btn ${activeItem === 'mailboxes' ? 'active' : ''}`}
              onClick={() => setActiveItem('mailboxes')}
            >
              Mailboxes
            </button>
          )}
          {matchesSearch('Notifications') && (
            <button 
              className={`settings-standalone-btn ${activeItem === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveItem('notifications')}
            >
              Notifications
            </button>
          )}
          {matchesSearch('Chrome extension') && (
            <button 
              className={`settings-standalone-btn ${activeItem === 'chrome_extension' ? 'active' : ''}`}
              onClick={() => setActiveItem('chrome_extension')}
            >
              Chrome extension
            </button>
          )}
          {matchesSearch('Conversations') && (
            <button 
              className={`settings-standalone-btn ${activeItem === 'conversations' ? 'active' : ''}`}
              onClick={() => setActiveItem('conversations')}
            >
              Conversations
            </button>
          )}

          {/* ─── 2. Workspace Settings ─── */}
          <div className="settings-category-header">Workspace settings</div>

          {matchesSearch('Workspace overview') && (
            <button 
              className={`settings-standalone-btn ${activeItem === 'workspace_overview' ? 'active' : ''}`}
              onClick={() => setActiveItem('workspace_overview')}
            >
              Workspace overview
            </button>
          )}

          {/* Email setup and health (Expandable) */}
          <div className="settings-nav-group">
            <button 
              className="settings-group-header-btn" 
              onClick={() => toggleGroup('email_health')}
            >
              <span>Email setup and health</span>
              {collapsedGroups.email_health ? <ChevronDown size={14} color="#9ca3af" /> : <ChevronUp size={14} color="#9ca3af" />}
            </button>
            {!collapsedGroups.email_health && (
              <div className="settings-nav-sublist">
                <button 
                  className={`settings-sub-item-btn ${activeItem === 'email_setup_health' ? 'active' : ''}`}
                  onClick={() => setActiveItem('email_setup_health')}
                >
                  Domain authentication
                </button>
                <button 
                  className={`settings-sub-item-btn ${activeItem === 'tracking_domains' ? 'active' : ''}`}
                  onClick={() => setActiveItem('tracking_domains')}
                >
                  Tracking domains
                </button>
              </div>
            )}
          </div>

          {/* Users and teams (EXPANDED by default in screenshot!) */}
          <div className="settings-nav-group">
            <button 
              className="settings-group-header-btn expanded" 
              onClick={() => toggleGroup('users_teams')}
            >
              <span>Users and teams</span>
              {collapsedGroups.users_teams ? <ChevronDown size={14} color="#9ca3af" /> : <ChevronUp size={14} color="#9ca3af" />}
            </button>
            {!collapsedGroups.users_teams && (
              <div className="settings-nav-sublist">
                <button 
                  className={`settings-sub-item-btn ${activeItem === 'users' ? 'active' : ''}`}
                  onClick={() => setActiveItem('users')}
                >
                  Users
                </button>
                <button 
                  className={`settings-sub-item-btn ${activeItem === 'support_access' ? 'active' : ''}`}
                  onClick={() => setActiveItem('support_access')}
                >
                  Support access
                </button>
              </div>
            )}
          </div>

          {/* Plan and billing (Expandable) */}
          <div className="settings-nav-group">
            <button 
              className="settings-group-header-btn" 
              onClick={() => toggleGroup('plan_billing')}
            >
              <span>Plan and billing</span>
              {collapsedGroups.plan_billing ? <ChevronDown size={14} color="#9ca3af" /> : <ChevronUp size={14} color="#9ca3af" />}
            </button>
            {!collapsedGroups.plan_billing && (
              <div className="settings-nav-sublist">
                <button 
                  className={`settings-sub-item-btn ${activeItem === 'plan_overview' ? 'active' : ''}`}
                  onClick={() => setActiveItem('plan_overview')}
                >
                  Plan overview
                </button>
                <button 
                  className={`settings-sub-item-btn ${activeItem === 'product_addons' ? 'active' : ''}`}
                  onClick={() => setActiveItem('product_addons')}
                >
                  Product Add-ons
                </button>
              </div>
            )}
          </div>

          {/* Credits and activity (Expandable) */}
          <div className="settings-nav-group">
            <button 
              className="settings-group-header-btn" 
              onClick={() => toggleGroup('credits_activity')}
            >
              <span>Credits and activity</span>
              {collapsedGroups.credits_activity ? <ChevronDown size={14} color="#9ca3af" /> : <ChevronUp size={14} color="#9ca3af" />}
            </button>
            {!collapsedGroups.credits_activity && (
              <div className="settings-nav-sublist">
                <button 
                  className={`settings-sub-item-btn ${activeItem === 'credit_usage' ? 'active' : ''}`}
                  onClick={() => setActiveItem('credit_usage')}
                >
                  Credit usage
                </button>
                <button 
                  className={`settings-sub-item-btn ${activeItem === 'data_requests' ? 'active' : ''}`}
                  onClick={() => setActiveItem('data_requests')}
                >
                  Data requests
                </button>
                <button 
                  className={`settings-sub-item-btn ${activeItem === 'ai_word_usage' ? 'active' : ''}`}
                  onClick={() => setActiveItem('ai_word_usage')}
                >
                  AI word usage
                </button>
                <button 
                  className={`settings-sub-item-btn ${activeItem === 'system_activity_log' ? 'active' : ''}`}
                  onClick={() => setActiveItem('system_activity_log')}
                >
                  System activity log
                </button>
              </div>
            )}
          </div>

          {/* Integrations (Expandable) */}
          <div className="settings-nav-group">
            <button 
              className="settings-group-header-btn" 
              onClick={() => toggleGroup('integrations')}
            >
              <span>Integrations</span>
              {collapsedGroups.integrations ? <ChevronDown size={14} color="#9ca3af" /> : <ChevronUp size={14} color="#9ca3af" />}
            </button>
            {!collapsedGroups.integrations && (
              <div className="settings-nav-sublist">
                <button 
                  className={`settings-sub-item-btn ${activeItem === 'connected_integrations' ? 'active' : ''}`}
                  onClick={() => setActiveItem('connected_integrations')}
                >
                  Connected Integrations
                </button>
                <button 
                  className={`settings-sub-item-btn ${activeItem === 'mcp' ? 'active' : ''}`}
                  onClick={() => setActiveItem('mcp')}
                >
                  MCP
                </button>
                <button 
                  className={`settings-sub-item-btn ${activeItem === 'api_keys' ? 'active' : ''}`}
                  onClick={() => setActiveItem('api_keys')}
                >
                  <span>API Keys</span>
                  <ExternalLink size={12} color="#9ca3af" />
                </button>
              </div>
            )}
          </div>

          {/* Ideal customer profile (Expandable) */}
          <div className="settings-nav-group">
            <button 
              className="settings-group-header-btn" 
              onClick={() => toggleGroup('icp')}
            >
              <span>Ideal customer profile</span>
              {collapsedGroups.icp ? <ChevronDown size={14} color="#9ca3af" /> : <ChevronUp size={14} color="#9ca3af" />}
            </button>
            {!collapsedGroups.icp && (
              <div className="settings-nav-sublist">
                <button className={`settings-sub-item-btn ${activeItem === 'personas' ? 'active' : ''}`} onClick={() => setActiveItem('personas')}>Personas</button>
                <button className={`settings-sub-item-btn ${activeItem === 'buying_intent' ? 'active' : ''}`} onClick={() => setActiveItem('buying_intent')}>Buying intent</button>
                <button className={`settings-sub-item-btn ${activeItem === 'website_visitors' ? 'active' : ''}`} onClick={() => setActiveItem('website_visitors')}>Website visitors</button>
                <button className={`settings-sub-item-btn ${activeItem === 'signals' ? 'active' : ''}`} onClick={() => setActiveItem('signals')}>Signals</button>
                <button className={`settings-sub-item-btn ${activeItem === 'scoring' ? 'active' : ''}`} onClick={() => setActiveItem('scoring')}>Scoring</button>
              </div>
            )}
          </div>

          {/* AI context center (Standalone) */}
          {matchesSearch('AI context center') && (
            <button 
              className={`settings-standalone-btn ${activeItem === 'ai_context' ? 'active' : ''}`}
              onClick={() => setActiveItem('ai_context')}
            >
              AI context center
            </button>
          )}

          {/* Rules of engagement (Expandable) */}
          <div className="settings-nav-group">
            <button className="settings-group-header-btn" onClick={() => toggleGroup('rules_engagement')}>
              <span>Rules of engagement</span>
              {collapsedGroups.rules_engagement ? <ChevronDown size={14} color="#9ca3af" /> : <ChevronUp size={14} color="#9ca3af" />}
            </button>
            {!collapsedGroups.rules_engagement && (
              <div className="settings-nav-sublist">
                <button className={`settings-sub-item-btn ${activeItem === 'prospecting_config' ? 'active' : ''}`} onClick={() => setActiveItem('prospecting_config')}>Prospecting config</button>
                <button className={`settings-sub-item-btn ${activeItem === 'snippets' ? 'active' : ''}`} onClick={() => setActiveItem('snippets')}>Snippets</button>
              </div>
            )}
          </div>

          {/* Team email & sequences (Expandable) */}
          <div className="settings-nav-group">
            <button className="settings-group-header-btn" onClick={() => toggleGroup('team_email_sequences')}>
              <span>Team email & sequences</span>
              {collapsedGroups.team_email_sequences ? <ChevronDown size={14} color="#9ca3af" /> : <ChevronUp size={14} color="#9ca3af" />}
            </button>
            {!collapsedGroups.team_email_sequences && (
              <div className="settings-nav-sublist">
                <button className={`settings-sub-item-btn ${activeItem === 'tracking' ? 'active' : ''}`} onClick={() => setActiveItem('tracking')}>Tracking</button>
                <button className={`settings-sub-item-btn ${activeItem === 'sequences' ? 'active' : ''}`} onClick={() => setActiveItem('sequences')}>Sequences</button>
              </div>
            )}
          </div>

          {/* Team conversations (Expandable) */}
          <div className="settings-nav-group">
            <button className="settings-group-header-btn" onClick={() => toggleGroup('team_conversations')}>
              <span>Team conversations</span>
              {collapsedGroups.team_conversations ? <ChevronDown size={14} color="#9ca3af" /> : <ChevronUp size={14} color="#9ca3af" />}
            </button>
            {!collapsedGroups.team_conversations && (
              <div className="settings-nav-sublist">
                <button className={`settings-sub-item-btn ${activeItem === 'recording_config' ? 'active' : ''}`} onClick={() => setActiveItem('recording_config')}>Recording configuration</button>
                <button className={`settings-sub-item-btn ${activeItem === 'team_permissions' ? 'active' : ''}`} onClick={() => setActiveItem('team_permissions')}>Team permissions</button>
                <button className={`settings-sub-item-btn ${activeItem === 'trackers' ? 'active' : ''}`} onClick={() => setActiveItem('trackers')}>Trackers</button>
                <button className={`settings-sub-item-btn ${activeItem === 'scorecards' ? 'active' : ''}`} onClick={() => setActiveItem('scorecards')}>Scorecards</button>
                <button className={`settings-sub-item-btn ${activeItem === 'custom_field_prompts' ? 'active' : ''}`} onClick={() => setActiveItem('custom_field_prompts')}>Custom field prompts</button>
              </div>
            )}
          </div>

          {/* Team meetings (Standalone) */}
          {matchesSearch('Team meetings') && (
            <button 
              className={`settings-standalone-btn ${activeItem === 'team_meetings' ? 'active' : ''}`}
              onClick={() => setActiveItem('team_meetings')}
            >
              Team meetings
            </button>
          )}

          {/* Team sharing & defaults (Standalone) */}
          {matchesSearch('Team sharing & defaults') && (
            <button 
              className={`settings-standalone-btn ${activeItem === 'team_sharing_defaults' ? 'active' : ''}`}
              onClick={() => setActiveItem('team_sharing_defaults')}
            >
              Team sharing & defaults
            </button>
          )}

          {/* ─── 3. Data Management ─── */}
          <div className="settings-category-header">Data management</div>

          {/* Objects, fields, stages (Expandable) */}
          <div className="settings-nav-group">
            <button className="settings-group-header-btn" onClick={() => toggleGroup('data_objects')}>
              <span>Objects, fields, stages</span>
              {collapsedGroups.data_objects ? <ChevronDown size={14} color="#9ca3af" /> : <ChevronUp size={14} color="#9ca3af" />}
            </button>
            {!collapsedGroups.data_objects && (
              <div className="settings-nav-sublist">
                <button className={`settings-sub-item-btn ${activeItem === 'contact_fields' ? 'active' : ''}`} onClick={() => setActiveItem('contact_fields')}>Contact fields & stages</button>
                <button className={`settings-sub-item-btn ${activeItem === 'account_fields' ? 'active' : ''}`} onClick={() => setActiveItem('account_fields')}>Account fields & stages</button>
                <button className={`settings-sub-item-btn ${activeItem === 'deal_fields' ? 'active' : ''}`} onClick={() => setActiveItem('deal_fields')}>Deal fields & stages</button>
              </div>
            )}
          </div>

          {/* Imports and exports (Expandable) */}
          <div className="settings-nav-group">
            <button className="settings-group-header-btn" onClick={() => toggleGroup('data_imports')}>
              <span>Imports and exports</span>
              {collapsedGroups.data_imports ? <ChevronDown size={14} color="#9ca3af" /> : <ChevronUp size={14} color="#9ca3af" />}
            </button>
            {!collapsedGroups.data_imports && (
              <div className="settings-nav-sublist">
                <button className={`settings-sub-item-btn ${activeItem === 'contact_import' ? 'active' : ''}`} onClick={() => setActiveItem('contact_import')}>Contact import</button>
                <button className={`settings-sub-item-btn ${activeItem === 'account_import' ? 'active' : ''}`} onClick={() => setActiveItem('account_import')}>Account import</button>
                <button className={`settings-sub-item-btn ${activeItem === 'deals_import' ? 'active' : ''}`} onClick={() => setActiveItem('deals_import')}>Deals import</button>
                <button className={`settings-sub-item-btn ${activeItem === 'csv_exports' ? 'active' : ''}`} onClick={() => setActiveItem('csv_exports')}>CSV exports</button>
                <button className={`settings-sub-item-btn ${activeItem === 'enriched_csvs' ? 'active' : ''}`} onClick={() => setActiveItem('enriched_csvs')}>Enriched CSVs</button>
                <button className={`settings-sub-item-btn ${activeItem === 'csv_export_settings' ? 'active' : ''}`} onClick={() => setActiveItem('csv_export_settings')}>CSV export settings</button>
              </div>
            )}
          </div>

          {/* Removal requests (Standalone) */}
          {matchesSearch('Removal requests') && (
            <button 
              className={`settings-standalone-btn ${activeItem === 'removal_requests' ? 'active' : ''}`}
              onClick={() => setActiveItem('removal_requests')}
            >
              Removal requests
            </button>
          )}
        </div>

        {/* Bottom Sidebar Action: "Add Teammates" */}
        <div className="settings-sidebar-footer">
          <button 
            className="sidebar-add-teammates-btn"
            onClick={() => setIsInviteModalOpen(true)}
          >
            <UserPlus size={14} />
            <span>Add Teammates</span>
          </button>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN CONTENT AREA
      ═══════════════════════════════════════════════════════════════ */}
      <main className="settings-main-content">
        {renderMainView()}
      </main>

      {/* ═══════════════════════════════════════════════════════════════
          FLOATING HELP BUTTON (Bottom Right "?")
      ═══════════════════════════════════════════════════════════════ */}
      <button 
        className="floating-help-btn"
        onClick={() => setShowHelpPopover(!showHelpPopover)}
        title="Apollo Help & Resources"
      >
        ?
      </button>

      {showHelpPopover && (
        <div className="help-popover-card">
          <div className="help-popover-header">Apollo Help & Support</div>
          <div className="help-popover-list">
            <button className="help-popover-item" onClick={() => { showToast?.('Opening Apollo Knowledge Base'); setShowHelpPopover(false); }}>
              <BookOpen size={14} color="#64748b" /> Knowledge Base & Guides
            </button>
            <button className="help-popover-item" onClick={() => { showToast?.('Apollo Academy loaded'); setShowHelpPopover(false); }}>
              <Lightbulb size={14} color="#64748b" /> Apollo Academy Courses
            </button>
            <button className="help-popover-item" onClick={() => { showToast?.('Connecting to Apollo Live Chat Support...'); setShowHelpPopover(false); }}>
              <MessageSquare size={14} color="#64748b" /> Contact Support Team
            </button>
            <button className="help-popover-item" onClick={() => { showToast?.('Keyboard shortcuts: Cmd+K for search'); setShowHelpPopover(false); }}>
              <FileQuestion size={14} color="#64748b" /> Keyboard Shortcuts
            </button>
          </div>
        </div>
      )}

      {/* Teammate Invite Modal from Sidebar */}
      <InviteUserModal 
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={(newUser) => {
          showToast?.(`Invitation sent to ${newUser.email}`);
        }}
      />
    </div>
  );
}
