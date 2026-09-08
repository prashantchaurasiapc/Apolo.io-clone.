import React, { useState } from 'react';
import { 
  Users, Building2, List, Database, Send, Mail, Phone, CheckSquare, 
  Calendar, MessageSquare, DollarSign, Wrench, BarChart3, Globe, 
  FileText, Bookmark, ShieldCheck, Settings, Plus, Download, Sparkles,
  ExternalLink, Filter, Search, CheckCircle2, TrendingUp, ArrowRight, Play, Eye,
  HelpCircle, ChevronDown, ChevronUp, Lock, Activity, CreditCard, PackageCheck, Layers,
  LayoutGrid
} from 'lucide-react';

/* ─── 1. Home View (1:1 Exact Match to authentic Apollo app.apollo.io/#/home screenshot) ─── */
export const HomeView = ({ user, showToast, onSelectTab }) => {
  const [completedTasks, setCompletedTasks] = useState({
    task1: false,
    task2: false,
    task3: false,
    task4: false,
    task5: false,
    task6: false
  });
  const [tasksCollapsed, setTasksCollapsed] = useState(false);

  const completedCount = Object.values(completedTasks).filter(Boolean).length;

  const toggleTask = (key, msg) => {
    setCompletedTasks(prev => ({ ...prev, [key]: !prev[key] }));
    if (!completedTasks[key]) {
      showToast(msg || 'Task completed! Earned credits.');
    }
  };

  return (
    <div className="dash-view-content apollo-home-onboarding">
      {/* Top Title & Progress Bar Header */}
      <div className="onboarding-header">
        <div className="onboarding-title-row">
          <div>
            <h1 className="onboarding-title">Get started with Apollo</h1>
            <p className="onboarding-subtitle">
              Complete these tasks in your first 14 days to earn up to <strong>75 credits</strong> and start reaching prospects and booking meetings
            </p>
          </div>
          <div className="getting-started-pill-wrap">
            <button className="getting-started-btn" onClick={() => showToast('Getting Started Checklist Menu')}>
              <LayoutGrid size={15} />
              <span>Getting started</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Thin Green Progress Bar */}
        <div className="onboarding-progress-track">
          <div 
            className="onboarding-progress-fill" 
            style={{ width: `${(completedCount / 6) * 100 || 5}%` }}
          />
        </div>
      </div>

      {/* Main Onboarding Card Container (Matches Screenshot 1:1) */}
      <div className="onboarding-card">
        {/* Card Header Row */}
        <div className="onboarding-card-header">
          <div>
            <div className="onboarding-card-title-group">
              <h2>Start reaching the right prospects</h2>
              <span className="credits-badge">💬 Earn 30 credits</span>
            </div>
            <p className="onboarding-card-subdesc">
              Find people and companies that match your ideal customer profile
            </p>
          </div>

          <button 
            className="onboarding-collapse-toggle"
            onClick={() => setTasksCollapsed(!tasksCollapsed)}
          >
            <span>{completedCount} of 6 completed</span>
            {tasksCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>

        {/* Task Rows List (Exact Wording from Screenshot) */}
        {!tasksCollapsed && (
          <div className="onboarding-task-list">
            {/* Task 1 */}
            <div className={`onboarding-task-row ${completedTasks.task1 ? 'done' : ''}`}>
              <div className="task-left">
                <input 
                  type="checkbox" 
                  className="task-checkbox" 
                  checked={completedTasks.task1}
                  onChange={() => toggleTask('task1', 'Saved target contact prospect!')}
                />
                <span className="task-desc">
                  <strong>Save a contact</strong> to start building your pipeline
                </span>
              </div>
              <button 
                className="task-btn-yellow"
                onClick={() => {
                  toggleTask('task1', 'Saved target contact prospect!');
                  onSelectTab('prospect_people');
                }}
              >
                {completedTasks.task1 ? 'Saved ✓' : 'Save a prospect'}
              </button>
            </div>

            {/* Task 2 */}
            <div className={`onboarding-task-row ${completedTasks.task2 ? 'done' : ''}`}>
              <div className="task-left">
                <input 
                  type="checkbox" 
                  className="task-checkbox" 
                  checked={completedTasks.task2}
                  onChange={() => toggleTask('task2', 'Saved mobile number!')}
                />
                <span className="task-desc">
                  <strong>Save a mobile number</strong> to reach people by phone
                </span>
              </div>
              <button 
                className="task-btn-white"
                onClick={() => {
                  toggleTask('task2', 'Saved mobile number!');
                  onSelectTab('prospect_people');
                }}
              >
                {completedTasks.task2 ? 'Completed ✓' : 'Find numbers'}
              </button>
            </div>

            {/* Task 3 */}
            <div className={`onboarding-task-row ${completedTasks.task3 ? 'done' : ''}`}>
              <div className="task-left">
                <input 
                  type="checkbox" 
                  className="task-checkbox" 
                  checked={completedTasks.task3}
                  onChange={() => toggleTask('task3', 'Created prospect list!')}
                />
                <span className="task-desc">
                  <strong>Create a list</strong> to keep your prospects organized
                </span>
              </div>
              <button 
                className="task-btn-white"
                onClick={() => {
                  toggleTask('task3', 'Target list created!');
                  onSelectTab('lists');
                }}
              >
                {completedTasks.task3 ? 'Created ✓' : 'Create a list'}
              </button>
            </div>

            {/* Task 4 */}
            <div className={`onboarding-task-row ${completedTasks.task4 ? 'done' : ''}`}>
              <div className="task-left">
                <input 
                  type="checkbox" 
                  className="task-checkbox" 
                  checked={completedTasks.task4}
                  onChange={() => toggleTask('task4', 'Created outbound sequence!')}
                />
                <span className="task-desc">
                  <strong>Launch a cold email sequence</strong> to reach decision makers
                </span>
              </div>
              <button 
                className="task-btn-white"
                onClick={() => {
                  toggleTask('task4', 'Outbound sequence created!');
                  onSelectTab('sequences');
                }}
              >
                {completedTasks.task4 ? 'Launched ✓' : 'Launch sequence'}
              </button>
            </div>

            {/* Task 5 */}
            <div className={`onboarding-task-row ${completedTasks.task5 ? 'done' : ''}`}>
              <div className="task-left">
                <input 
                  type="checkbox" 
                  className="task-checkbox" 
                  checked={completedTasks.task5}
                  onChange={() => toggleTask('task5', 'Connected calendar!')}
                />
                <span className="task-desc">
                  <strong>Connect your mailbox & calendar</strong> for automated meeting scheduling
                </span>
              </div>
              <button 
                className="task-btn-white"
                onClick={() => {
                  toggleTask('task5', 'Calendar connected!');
                  onSelectTab('meetings');
                }}
              >
                {completedTasks.task5 ? 'Connected ✓' : 'Connect calendar'}
              </button>
            </div>

            {/* Task 6 */}
            <div className={`onboarding-task-row ${completedTasks.task6 ? 'done' : ''}`}>
              <div className="task-left">
                <input 
                  type="checkbox" 
                  className="task-checkbox" 
                  checked={completedTasks.task6}
                  onChange={() => toggleTask('task6', 'Installed Chrome extension!')}
                />
                <span className="task-desc">
                  <strong>Install Apollo Chrome Extension</strong> to prospect leads on LinkedIn & Websites
                </span>
              </div>
              <button 
                className="task-btn-white"
                onClick={() => {
                  toggleTask('task6', 'Chrome Extension installed!');
                  showToast('Chrome Extension ready for prospecting');
                }}
              >
                {completedTasks.task6 ? 'Installed ✓' : 'Get extension'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Floating Help Button */}
      <button 
        className="floating-help-btn"
        onClick={() => showToast('Apollo Support & Help Center 24/7')}
        title="Help & Support (?)"
      >
        ?
      </button>
    </div>
  );
};

/* ─── 2. AI Assistant View ─── */
export const AIAssistantView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Apollo AI Assistant</h1>
        <p>Generate high-intent TAM prospect lists, write cold emails, and score target accounts.</p>
      </div>
    </div>
    <div className="dash-card-section">
      <div className="dash-section-title" style={{ marginBottom: 16 }}>
        <Sparkles size={18} color="#2563eb" />
        <span>Ask AI Sales Assistant</span>
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input 
          type="text" 
          className="dash-search-input" 
          placeholder="e.g. Find 50 VP of Sales at SaaS companies in US hiring SDRs..."
          style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '10px 14px', borderRadius: 8 }}
        />
        <button className="dash-btn-primary" onClick={() => showToast('AI generating lead list...')}>
          Execute AI Query
        </button>
      </div>
    </div>
  </div>
);

/* ─── 3. Prospect People View ─── */
export const ProspectPeopleView = ({ sampleLeads, showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Prospect & Enrich — People Search</h1>
        <p>Access 275M+ verified B2B decision makers worldwide.</p>
      </div>
      <button className="dash-btn-primary" onClick={() => showToast('Exporting contacts to CSV...')}>
        <Download size={14} />
        <span>Export Selected CSV</span>
      </button>
    </div>
    <div className="dash-card-section">
      <div className="dash-leads-table-wrap">
        <table className="dash-leads-table">
          <thead>
            <tr>
              <th>Contact Name</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Contact Info</th>
            </tr>
          </thead>
          <tbody>
            {sampleLeads.map((lead) => (
              <tr key={lead.id}>
                <td style={{ fontWeight: 700, color: '#0f172a' }}>{lead.name}</td>
                <td>{lead.role}</td>
                <td>{lead.company}</td>
                <td>{lead.location}</td>
                <td>
                  <button className="dash-email-btn" onClick={() => showToast(`Contact details for ${lead.name} unlocked`)}>
                    Access Contact Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

/* ─── 4. Prospect Companies View ─── */
export const ProspectCompaniesView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Prospect & Enrich — Companies Directory</h1>
        <p>Filter 736k target accounts by Revenue, Tech Stack, Employee Count & Hiring Intent.</p>
      </div>
    </div>
    <div className="dash-card-section">
      <table className="dash-leads-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Industry</th>
            <th>Employees</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ fontWeight: 700 }}>Apollo.io</td><td>Sales Intelligence & AI</td><td>500-1000</td><td>San Francisco, CA</td><td><button className="dash-btn-secondary" onClick={()=>showToast('Account added to target list')}>Save Company</button></td></tr>
          <tr><td style={{ fontWeight: 700 }}>Stripe</td><td>FinTech & Payments</td><td>5000+</td><td>San Francisco, CA</td><td><button className="dash-btn-secondary" onClick={()=>showToast('Account added to target list')}>Save Company</button></td></tr>
          <tr><td style={{ fontWeight: 700 }}>Notion</td><td>Productivity Software</td><td>1000-5000</td><td>San Francisco, CA</td><td><button className="dash-btn-secondary" onClick={()=>showToast('Account added to target list')}>Save Company</button></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── 5. Lists View ─── */
export const ListsView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>My Target Lists</h1>
        <p>Organize contacts and companies into custom segmented lists.</p>
      </div>
      <button className="dash-btn-primary" onClick={() => showToast('New List Created')}>
        <Plus size={14} /> Create New List
      </button>
    </div>
    <div className="dash-card-section">
      <table className="dash-leads-table">
        <thead>
          <tr><th>List Name</th><th>Records</th><th>Created Date</th><th>Action</th></tr>
        </thead>
        <tbody>
          <tr><td style={{ fontWeight: 700 }}>Q3 Enterprise Tech CEOs</td><td>142 contacts</td><td>Sep 02, 2026</td><td><button className="dash-btn-secondary" onClick={()=>showToast('Opening List...')}>View List</button></td></tr>
          <tr><td style={{ fontWeight: 700 }}>UK FinTech Decision Makers</td><td>88 contacts</td><td>Aug 28, 2026</td><td><button className="dash-btn-secondary" onClick={()=>showToast('Opening List...')}>View List</button></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── 6. Data Enrichment View ─── */
export const DataEnrichmentView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Data Enrichment Pipeline</h1>
        <p>Automatically match, verify, and enrich existing CRM or CSV lead data.</p>
      </div>
      <button className="dash-btn-primary" onClick={() => showToast('Opening CSV Uploader...')}>
        <Download size={14} /> Upload CSV File
      </button>
    </div>
    <div className="dash-card-section" style={{ textAlign: 'center', padding: '40px 20px' }}>
      <Database size={40} color="#2563eb" style={{ marginBottom: 12 }} />
      <h3 style={{ margin: '0 0 8px 0' }}>Enrich your CRM contacts with Apollo's 275M+ database</h3>
      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 20 }}>Drag and drop CSV files to instantly reveal verified emails, direct dials, and LinkedIn URLs.</p>
      <button className="dash-btn-primary" onClick={() => showToast('Opening CSV Uploader...')}>Select CSV to Enrich</button>
    </div>
  </div>
);

/* ─── 7. Sequences View ─── */
export const SequencesView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Engage — Sales Sequences</h1>
        <p>Automated multi-channel outbound email & call sequences.</p>
      </div>
      <button className="dash-btn-primary" onClick={() => showToast('Creating New Outbound Sequence...')}>
        <Plus size={14} /> New Sequence
      </button>
    </div>
    <div className="dash-card-section">
      <table className="dash-leads-table">
        <thead>
          <tr><th>Sequence Name</th><th>Active Leads</th><th>Delivered</th><th>Open Rate</th><th>Reply Rate</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td style={{ fontWeight: 700 }}>Outbound SaaS Decision Makers - Cold Email</td><td>340</td><td>1,200</td><td>54.2%</td><td>11.8%</td><td><span className="dash-metric-badge green">Active</span></td></tr>
          <tr><td style={{ fontWeight: 700 }}>Follow-up Sequence: Post Demo</td><td>82</td><td>240</td><td>68.0%</td><td>24.5%</td><td><span className="dash-metric-badge green">Active</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── 8. Emails View ─── */
export const EmailsView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Engage — Email Outreach Inbox</h1>
        <p>Manage sent emails, templates, scheduled drafts, and recipient engagement.</p>
      </div>
    </div>
    <div className="dash-card-section">
      <table className="dash-leads-table">
        <thead>
          <tr><th>Recipient</th><th>Subject Line</th><th>Sequence Step</th><th>Sent Time</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td style={{ fontWeight: 700 }}>mc@apollo.io</td><td>Scaling sales operations at Apollo.io</td><td>Step 1 - Cold Outbound</td><td>Today, 10:14 AM</td><td><span className="dash-metric-badge blue">Opened</span></td></tr>
          <tr><td style={{ fontWeight: 700 }}>s.jenkins@stripe.com</td><td>Quick question regarding Stripe RevOps team</td><td>Step 2 - Follow-up</td><td>Yesterday, 4:30 PM</td><td><span className="dash-metric-badge green">Replied</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── 9. Calls View ─── */
export const CallsView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Engage — Dialer & Call Logs</h1>
        <p>Make direct dials, log call disposition, and listen to call recordings.</p>
      </div>
      <button className="dash-btn-primary" onClick={() => showToast('Opening Apollo Dialer...')}>
        <Phone size={14} /> Open Dialer
      </button>
    </div>
    <div className="dash-card-section">
      <table className="dash-leads-table">
        <thead>
          <tr><th>Contact</th><th>Phone Number</th><th>Duration</th><th>Outcome</th><th>Date</th></tr>
        </thead>
        <tbody>
          <tr><td style={{ fontWeight: 700 }}>Matt Curl (Apollo)</td><td>+1 (415) 892-0192</td><td>4m 12s</td><td>Meeting Scheduled</td><td>Sep 08, 2026</td></tr>
          <tr><td style={{ fontWeight: 700 }}>David Chen (Notion)</td><td>+1 (512) 330-8812</td><td>1m 45s</td><td>Left Voicemail</td><td>Sep 07, 2026</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── 10. Tasks View ─── */
export const TasksView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Engage — Daily Tasks</h1>
        <p>Manual touchpoints, follow-up emails, and call tasks queued for today.</p>
      </div>
    </div>
    <div className="dash-card-section">
      <table className="dash-leads-table">
        <thead>
          <tr><th>Task Title</th><th>Contact</th><th>Due Date</th><th>Priority</th><th>Action</th></tr>
        </thead>
        <tbody>
          <tr><td style={{ fontWeight: 700 }}>Send custom demo video proposal</td><td>Elena Rostova (Figma)</td><td>Today, 2:00 PM</td><td><span className="dash-metric-badge red">High</span></td><td><button className="dash-btn-primary" style={{ padding: '4px 10px', fontSize: 12 }} onClick={()=>showToast('Task marked complete')}>Complete Task</button></td></tr>
          <tr><td style={{ fontWeight: 700 }}>Follow-up phone call</td><td>Marcus Vance (HubSpot)</td><td>Tomorrow, 11:00 AM</td><td><span className="dash-metric-badge blue">Medium</span></td><td><button className="dash-btn-primary" style={{ padding: '4px 10px', fontSize: 12 }} onClick={()=>showToast('Task marked complete')}>Complete Task</button></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── 11. Meetings View ─── */
export const MeetingsView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Win Deals — Meetings & Scheduling</h1>
        <p>Calendar integration and upcoming sales discovery calls.</p>
      </div>
    </div>
    <div className="dash-card-section">
      <table className="dash-leads-table">
        <thead>
          <tr><th>Meeting Name</th><th>Attendee</th><th>Time</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td style={{ fontWeight: 700 }}>Apollo Platform Demo & Pricing Overview</td><td>Sarah Jenkins (Stripe)</td><td>Today, 3:30 PM - 4:00 PM</td><td><span className="dash-metric-badge green">Confirmed</span></td></tr>
          <tr><td style={{ fontWeight: 700 }}>Discovery Call: Enterprise Lead Enrichment</td><td>David Chen (Notion)</td><td>Tomorrow, 10:00 AM - 10:30 AM</td><td><span className="dash-metric-badge green">Confirmed</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── 12. Conversations View ─── */
export const ConversationsView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Win Deals — Call Conversations Intelligence</h1>
        <p>Call recordings, key talk tracks, and buyer sentiment analysis.</p>
      </div>
    </div>
    <div className="dash-card-section">
      <table className="dash-leads-table">
        <thead>
          <tr><th>Recording Title</th><th>Participants</th><th>Duration</th><th>Key Topics</th><th>Action</th></tr>
        </thead>
        <tbody>
          <tr><td style={{ fontWeight: 700 }}>Stripe - Enterprise Pricing Review</td><td>Sarah Jenkins, You</td><td>28m 10s</td><td>Budget, Security, API Limits</td><td><button className="dash-btn-secondary" onClick={()=>showToast('Loading Call Recording Transcript...')}>Listen Call</button></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── 13. Deals View (Kanban) ─── */
export const DealsView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Win Deals — Opportunity Pipeline</h1>
        <p>Manage active deals across pipeline stages.</p>
      </div>
      <button className="dash-btn-primary" onClick={() => showToast('New Deal Created')}>
        <Plus size={14} /> New Deal Opportunity
      </button>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      <div className="dash-card-section">
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, borderBottom: '2px solid #3b82f6', paddingBottom: 6 }}>
          Discovery (3)
        </div>
        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: 12, borderRadius: 8, marginBottom: 10 }}>
          <div style={{ fontWeight: 700 }}>Figma Enterprise</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>$45,000 • Value</div>
        </div>
      </div>
      <div className="dash-card-section">
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, borderBottom: '2px solid #eab308', paddingBottom: 6 }}>
          Proposal Sent (2)
        </div>
        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: 12, borderRadius: 8, marginBottom: 10 }}>
          <div style={{ fontWeight: 700 }}>Stripe RevOps</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>$120,000 • Value</div>
        </div>
      </div>
      <div className="dash-card-section">
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, borderBottom: '2px solid #a855f7', paddingBottom: 6 }}>
          Negotiation (1)
        </div>
        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: 12, borderRadius: 8, marginBottom: 10 }}>
          <div style={{ fontWeight: 700 }}>Notion Growth Team</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>$83,500 • Value</div>
        </div>
      </div>
      <div className="dash-card-section">
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, borderBottom: '2px solid #22c55e', paddingBottom: 6 }}>
          Closed Won (5)
        </div>
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: 12, borderRadius: 8, marginBottom: 10 }}>
          <div style={{ fontWeight: 700, color: '#166534' }}>Apollo.io Upgrade</div>
          <div style={{ fontSize: 12, color: '#15803d' }}>$250,000 • Closed</div>
        </div>
      </div>
    </div>
  </div>
);

/* ─── 14. Workflows View ─── */
export const WorkflowsView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Tools & Automation — Workflows</h1>
        <p>Trigger-based automation rules for lead routing, tagging, and CRM sync.</p>
      </div>
      <button className="dash-btn-primary" onClick={() => showToast('Creating New Workflow...')}>
        <Plus size={14} /> Create Workflow
      </button>
    </div>
    <div className="dash-card-section">
      <table className="dash-leads-table">
        <thead>
          <tr><th>Workflow Trigger</th><th>Automated Action</th><th>Executions</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td style={{ fontWeight: 700 }}>New Verified Lead in US</td><td>Auto-add to Cold Outbound Sequence</td><td>4,210</td><td><span className="dash-metric-badge green">Active</span></td></tr>
          <tr><td style={{ fontWeight: 700 }}>Website Visitor Intent Signal</td><td>Create Task: Follow-up Phone Call</td><td>840</td><td><span className="dash-metric-badge green">Active</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── 15. Analytics View ─── */
export const AnalyticsView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Tools & Automation — Analytics & Reports</h1>
        <p>Comprehensive reports on email deliverability, meeting conversion rates, and rep activity.</p>
      </div>
    </div>
    <div className="dash-card-section">
      <div className="dash-metrics-grid">
        <div className="dash-metric-card">
          <div className="dash-metric-label">Total Outbound Emails</div>
          <div className="dash-metric-value">12,450</div>
        </div>
        <div className="dash-metric-card">
          <div className="dash-metric-label">Open Rate Average</div>
          <div className="dash-metric-value">54.8%</div>
        </div>
        <div className="dash-metric-card">
          <div className="dash-metric-label">Reply Rate Average</div>
          <div className="dash-metric-value">11.2%</div>
        </div>
        <div className="dash-metric-card">
          <div className="dash-metric-label">Meetings Booked</div>
          <div className="dash-metric-value">42</div>
        </div>
      </div>
    </div>
  </div>
);

/* ─── 16. Website Visitors View ─── */
export const WebsiteVisitorsView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Inbound — Website Visitors Intent</h1>
        <p>Identify companies visiting your website before they fill out a form.</p>
      </div>
    </div>
    <div className="dash-card-section">
      <table className="dash-leads-table">
        <thead>
          <tr><th>Visiting Company</th><th>Pages Viewed</th><th>Visit Time</th><th>Intent Score</th><th>Action</th></tr>
        </thead>
        <tbody>
          <tr><td style={{ fontWeight: 700 }}>Datadog</td><td>Pricing, Enterprise API Docs</td><td>12 mins ago</td><td><span className="dash-metric-badge green">Very High</span></td><td><button className="dash-btn-primary" style={{ padding: '4px 10px', fontSize: 12 }} onClick={()=>showToast('Revealing decision makers at Datadog...')}>Find Decision Makers</button></td></tr>
          <tr><td style={{ fontWeight: 700 }}>Snowflake</td><td>Features, Lead Intelligence</td><td>45 mins ago</td><td><span className="dash-metric-badge green">High</span></td><td><button className="dash-btn-primary" style={{ padding: '4px 10px', fontSize: 12 }} onClick={()=>showToast('Revealing decision makers at Snowflake...')}>Find Decision Makers</button></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── 17. Forms View ─── */
export const FormsView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Inbound — Lead Capture Forms</h1>
        <p>Embed high-converting lead forms to automatically enrich and score inbound leads.</p>
      </div>
      <button className="dash-btn-primary" onClick={() => showToast('New Form Created')}>
        <Plus size={14} /> Create Inbound Form
      </button>
    </div>
    <div className="dash-card-section">
      <table className="dash-leads-table">
        <thead>
          <tr><th>Form Name</th><th>Submissions</th><th>Conversion Rate</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td style={{ fontWeight: 700 }}>Request Demo Form</td><td>428</td><td>18.4%</td><td><span className="dash-metric-badge green">Active</span></td></tr>
          <tr><td style={{ fontWeight: 700 }}>Pricing Calculator Form</td><td>192</td><td>12.1%</td><td><span className="dash-metric-badge green">Active</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── 18 & 19. Saved Records Views ─── */
export const SavedPeopleView = ({ sampleLeads, showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Saved Records — People</h1>
        <p>Your saved contact records and exported leads.</p>
      </div>
    </div>
    <div className="dash-card-section">
      <table className="dash-leads-table">
        <thead>
          <tr><th>Name</th><th>Role</th><th>Company</th><th>Saved Date</th></tr>
        </thead>
        <tbody>
          {sampleLeads.map((l) => (
            <tr key={l.id}>
              <td style={{ fontWeight: 700 }}>{l.name}</td>
              <td>{l.role}</td>
              <td>{l.company}</td>
              <td>Sep 08, 2026</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const SavedCompaniesView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Saved Records — Companies</h1>
        <p>Your saved account records and target enterprise lists.</p>
      </div>
    </div>
    <div className="dash-card-section">
      <table className="dash-leads-table">
        <thead>
          <tr><th>Company Name</th><th>Employees</th><th>Industry</th><th>Saved Date</th></tr>
        </thead>
        <tbody>
          <tr><td style={{ fontWeight: 700 }}>Apollo.io</td><td>500-1000</td><td>Sales Tech</td><td>Sep 08, 2026</td></tr>
          <tr><td style={{ fontWeight: 700 }}>Stripe</td><td>5000+</td><td>FinTech</td><td>Sep 08, 2026</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── 20. Email Health View ─── */
export const EmailHealthView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Email Setup and Health</h1>
        <p>Domain SPF/DKIM verification, deliverability health, and mailbox warm-up score.</p>
      </div>
    </div>
    <div className="dash-card-section">
      <div className="dash-metrics-grid" style={{ marginBottom: 20 }}>
        <div className="dash-metric-card">
          <div className="dash-metric-label">Mailbox Health Score</div>
          <div className="dash-metric-value" style={{ color: '#16a34a' }}>99 / 100</div>
        </div>
        <div className="dash-metric-card">
          <div className="dash-metric-label">SPF / DKIM / DMARC</div>
          <div className="dash-metric-value" style={{ color: '#2563eb' }}>Verified</div>
        </div>
        <div className="dash-metric-card">
          <div className="dash-metric-label">Daily Sending Limit</div>
          <div className="dash-metric-value">250 / 500</div>
        </div>
      </div>
    </div>
  </div>
);

/* ─── 21. Admin Settings View ─── */
export const AdminSettingsView = ({ user, onLogout }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Admin & Workspace Settings</h1>
        <p>Manage team members, billing plan, API integrations, and security.</p>
      </div>
    </div>
    <div className="dash-card-section" style={{ lineHeight: 1.8 }}>
      <p><strong>Workspace Name:</strong> Apollo Sales Team</p>
      <p><strong>Primary Administrator:</strong> {user?.name || 'Abhishek Kumar'} ({user?.email || 'abhishek@apollo-user.io'})</p>
      <p><strong>Plan Tier:</strong> Unlimited Enterprise Plan ($99/mo)</p>
      <p><strong>Auth Provider:</strong> {user?.provider || 'Google OAuth'}</p>
      <button className="dash-btn-primary" style={{ marginTop: 16 }} onClick={onLogout}>
        Log Out of Workspace
      </button>
    </div>
  </div>
);
