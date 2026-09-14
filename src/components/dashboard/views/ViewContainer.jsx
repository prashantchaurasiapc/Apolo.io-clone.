import React, { useState } from 'react';
import PeopleProspectView from './people/PeopleProspectView';
import CompaniesProspectView from './companies/CompaniesProspectView';
import ListsViewComponent from './lists/ListsView';
import DataEnrichmentViewComponent from './enrichment/DataEnrichmentView';
import SequencesViewComponent from './sequences/SequencesView';
import TasksViewComponent from './tasks/TasksView';
import CallsViewComponent from './calls/CallsView';
import EmailsViewComponent from './emails/EmailsView';


import { 
  Users, Building2, List, Database, Send, Mail, Phone, CheckSquare, 
  Calendar, MessageSquare, DollarSign, Wrench, BarChart3, Globe, 
  FileText, Bookmark, ShieldCheck, Settings, Plus, Download, Sparkles,
  ExternalLink, Filter, Search, CheckCircle2, TrendingUp, ArrowRight, Play, Eye,
  HelpCircle, ChevronDown, ChevronUp, Lock, Activity, CreditCard, PackageCheck, Layers,
  LayoutGrid, Info, Check, BookOpen
} from 'lucide-react';
import MeetingsView from './MeetingsView';
import ConversationsView from './ConversationsView';
import DealsView from './DealsView';
import { WorkflowsView } from './WorkflowsView';
import { AnalyticsView } from './AnalyticsView';
import { WebsiteVisitorsView } from './WebsiteVisitorsView';
import { FormsView } from './FormsView';
import { SavedPeopleView } from './SavedPeopleView';
import { SavedCompaniesView } from './SavedCompaniesView';




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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [layoutSearch, setLayoutSearch] = useState('');
  const [layoutTab, setLayoutTab] = useState('system'); // 'system' | 'your' | 'starred'
  const [selectedLayout, setSelectedLayout] = useState('Getting started');

  const completedCount = Object.values(completedTasks).filter(Boolean).length;

  const toggleTask = (key, msg) => {
    setCompletedTasks(prev => ({ ...prev, [key]: !prev[key] }));
    if (!completedTasks[key]) {
      showToast(msg || 'Task completed! Earned credits.');
    }
  };

  const layoutOptions = [
    { id: 'getting_started', label: 'Getting started' },
    { id: 'gen_pipe_1', label: 'Generate Pipeline' },
    { id: 'win_close', label: 'Win & Close' },
    { id: 'gen_pipe_2', label: 'Generate Pipeline' }
  ];

  const filteredLayouts = layoutOptions.filter(opt => 
    opt.label.toLowerCase().includes(layoutSearch.toLowerCase())
  );

  return (
    <div className="dash-view-content apollo-home-onboarding">
      {/* Top Title & Progress Bar Header */}
      <div className="onboarding-header">
        <div className="onboarding-title-row">
          <div>
            <h1 className="onboarding-title">Get started with Apollo</h1>
            <p className="onboarding-subtitle">
              Complete these tasks in your first <strong>14 days</strong> to earn up to <strong>75 credits</strong> and start reaching prospects and booking meetings
            </p>
          </div>

          {/* Interactive "Getting started" Layout Dropdown (Matches Screenshot 1:1) */}
          <div className="getting-started-pill-wrap" style={{ position: 'relative' }}>
            <button 
              className="getting-started-btn" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <LayoutGrid size={15} />
              <span>{selectedLayout}</span>
              {dropdownOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {dropdownOpen && (
              <div className="layout-dropdown-popover">
                {/* Search Input Box */}
                <div className="layout-search-wrap">
                  <Search size={15} color="#64748b" />
                  <input 
                    type="text" 
                    placeholder="Search layouts" 
                    value={layoutSearch}
                    onChange={(e) => setLayoutSearch(e.target.value)}
                    className="layout-search-input"
                    autoFocus
                  />
                </div>

                {/* System / Your layouts / Starred Tabs */}
                <div className="layout-tabs-row">
                  <button 
                    className={`layout-tab-btn ${layoutTab === 'system' ? 'active' : ''}`}
                    onClick={() => setLayoutTab('system')}
                  >
                    System
                  </button>
                  <button 
                    className={`layout-tab-btn ${layoutTab === 'your' ? 'active' : ''}`}
                    onClick={() => setLayoutTab('your')}
                  >
                    Your layouts
                  </button>
                  <button 
                    className={`layout-tab-btn ${layoutTab === 'starred' ? 'active' : ''}`}
                    onClick={() => setLayoutTab('starred')}
                  >
                    Starred
                  </button>
                </div>

                {/* Information Banner Note Box */}
                <div className="layout-info-banner">
                  <div className="info-banner-left">
                    <Info size={16} color="#334155" className="info-icon" />
                    <span>You're viewing the new layout of this page.</span>
                  </div>
                  <button 
                    className="info-switch-btn"
                    onClick={() => showToast('Switched to classic layout mode')}
                  >
                    Switch
                  </button>
                </div>

                {/* Layout Options List */}
                <div className="layout-options-list">
                  {filteredLayouts.map((opt, idx) => {
                    const isSelected = selectedLayout === opt.label && idx === 0;
                    return (
                      <div 
                        key={idx}
                        className={`layout-option-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedLayout(opt.label);
                          setDropdownOpen(false);
                          showToast(`Layout switched to "${opt.label}"`);
                        }}
                      >
                        <div className="option-item-left">
                          <LayoutGrid size={16} color={isSelected ? '#0f172a' : '#64748b'} />
                          <span>{opt.label}</span>
                        </div>
                        {isSelected && <Check size={16} color="#2563eb" />}
                      </div>
                    );
                  })}
                </div>

                {/* Popover Footer with Yellow Create New Button */}
                <div className="layout-popover-footer">
                  <button 
                    className="create-new-layout-btn"
                    onClick={() => {
                      setDropdownOpen(false);
                      showToast('Create new custom layout dialog');
                    }}
                  >
                    Create new
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thin Green Progress Bar */}
        <div className="onboarding-progress-track">
          <div 
            className="onboarding-progress-fill" 
            style={{ width: `${(completedCount / 6) * 100 || 3}%` }}
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
              <span className="credits-badge">🏷️ Earn 30 credits</span>
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

        {/* Task Rows List (Exact Wording & Buttons from Screenshot) */}
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
                  onChange={() => toggleTask('task4', 'Saved target company!')}
                />
                <span className="task-desc">
                  <strong>Save target companies</strong> to find the right people inside them
                </span>
              </div>
              <button 
                className="task-btn-white"
                onClick={() => {
                  toggleTask('task4', 'Saved target company!');
                  onSelectTab('prospect_companies');
                }}
              >
                {completedTasks.task4 ? 'Saved ✓' : 'Save a company'}
              </button>
            </div>

            {/* Task 5 */}
            <div className={`onboarding-task-row ${completedTasks.task5 ? 'done' : ''}`}>
              <div className="task-left">
                <input 
                  type="checkbox" 
                  className="task-checkbox" 
                  checked={completedTasks.task5}
                  onChange={() => toggleTask('task5', 'Set up saved search alert!')}
                />
                <span className="task-desc">
                  <strong>Save your search and get notified</strong> when new leads match your audience
                </span>
              </div>
              <button 
                className="task-btn-white"
                onClick={() => {
                  toggleTask('task5', 'Search alert created!');
                  onSelectTab('prospect_people');
                }}
              >
                {completedTasks.task5 ? 'Alert Set ✓' : 'Set up alert'}
              </button>
            </div>

            {/* Task 6 */}
            <div className={`onboarding-task-row ${completedTasks.task6 ? 'done' : ''}`}>
              <div className="task-left">
                <input 
                  type="checkbox" 
                  className="task-checkbox" 
                  checked={completedTasks.task6}
                  onChange={() => toggleTask('task6', 'Installed Chrome Extension!')}
                />
                <span className="task-desc">
                  <strong>Download the Chrome extension</strong> to prospect directly on LinkedIn and company websites
                </span>
              </div>
              <button 
                className="task-btn-white"
                onClick={() => {
                  toggleTask('task6', 'Chrome Extension installed!');
                  showToast('Chrome Extension ready for LinkedIn prospecting');
                }}
              >
                {completedTasks.task6 ? 'Installed ✓' : 'Install extension'}
              </button>
            </div>
          </div>
        )}

        {/* Load More Button at bottom of card */}
        <div className="onboarding-load-more-wrap">
          <button className="onboarding-load-more-btn" onClick={() => showToast('Loading additional onboarding tasks...')}>
            Load more
          </button>
        </div>
      </div>

      {/* ─── Bottom Resource Cards Section ("More resources to help you master Apollo") ─── */}
      <div className="resources-section">
        <h2 className="resources-section-title">More resources to help you master Apollo</h2>
        <p className="resources-section-subtitle">
          Watch walkthroughs, explore tutorials, or dive into detailed guides.
        </p>

        <div className="resources-grid">
          {/* Card 1: Learn with Apollo Academy */}
          <div className="resource-card">
            <div className="resource-card-banner banner-blue-shield">
              <div className="banner-icon-graphic">
                <div className="shield-graphic-wrap">
                  <div className="shield-shape">
                    <CheckCircle2 size={24} color="#0f172a" />
                  </div>
                  <span className="sparkle-star s1">✨</span>
                  <span className="sparkle-star s2">✨</span>
                </div>
              </div>
            </div>
            <div className="resource-card-body">
              <h3>Learn with Apollo Academy</h3>
              <p>Explore tutorials and best practices designed to help you get started.</p>
              <button className="resource-card-btn" onClick={() => showToast('Opening Apollo Academy')}>
                Visit Academy
              </button>
            </div>
          </div>

          {/* Card 2: Watch a webinar */}
          <div className="resource-card">
            <div className="resource-card-banner banner-blue-webinar">
              <div className="banner-icon-graphic">
                <div className="play-graphic-wrap">
                  <div className="play-circle-ring">
                    <Play size={22} fill="#d4ff00" color="#d4ff00" style={{ marginLeft: 2 }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="resource-card-body">
              <h3>Watch a webinar</h3>
              <p>See Apollo in action through live sessions or on-demand walkthroughs you can watch anytime.</p>
              <button className="resource-card-btn" onClick={() => showToast('Opening Apollo Webinars')}>
                Browse webinars
              </button>
            </div>
          </div>

          {/* Card 3: Go deeper with help docs */}
          <div className="resource-card">
            <div className="resource-card-banner banner-blue-bulb">
              <div className="banner-icon-graphic">
                <div className="bulb-graphic-wrap">
                  <div className="bulb-icon-shape">
                    💡
                  </div>
                </div>
              </div>
            </div>
            <div className="resource-card-body">
              <h3>Go deeper with help docs</h3>
              <p>Find detailed answers, setup guidance, and product info at your own pace.</p>
              <button className="resource-card-btn" onClick={() => showToast('Searching Apollo Knowledge Base')}>
                Search help docs
              </button>
            </div>
          </div>
        </div>
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

/* ─── 2. AI Assistant View (1:1 Exact Match to authentic Apollo app.apollo.io/#/ai-assistant screenshots) ─── */
export const AIAssistantView = ({ showToast }) => {
  const [chats, setChats] = useState([
    { 
      id: 'chat_1', 
      title: 'Analyze my pipeline and sequence ...', 
      timestamp: 'Just now',
      messages: [
        { 
          sender: 'user', 
          text: 'Analyze my pipeline and sequence performance using a core set of metrics. Create a dashboard named "Sequence and Pipeline Analysis" with exactly four reports: A report showing emails sent, open rate, reply rate, interest rate, and meetings booked by sequence A report identifying the top-performing sequences by name A report identifying the underperforming sequences by name Call out the largest drop-off points using the reports. After creating the dashboard, provide a short written summary of concrete recommendations in chat. Do not add text summaries to the dashboard.' 
        }
      ]
    }
  ]);
  const [activeChatId, setActiveChatId] = useState('chat_1');
  const [promptInput, setPromptInput] = useState('');
  const [chatsLeft, setChatsLeft] = useState(4);
  const [showBanner, setShowBanner] = useState(true);
  const [activeNavTab, setActiveNavTab] = useState('chat'); // 'chat' | 'context' | 'memory'
  const [isGenerating, setIsGenerating] = useState(false);

  // Context Center state
  const [companyUrl, setCompanyUrl] = useState('www.yourcompany.com');
  const [contextTab, setContextTab] = useState('url'); // 'url' | 'nowebsite'

  // Memory state
  const [memoryEnabled, setMemoryEnabled] = useState(true);

  const activeChat = chats.find(c => c.id === activeChatId);
  const currentMessages = activeChat ? activeChat.messages : [];

  const startNewChat = () => {
    setActiveChatId(null);
    setPromptInput('');
    setActiveNavTab('chat');
    showToast('New AI Chat session started');
  };

  const handleSendPrompt = (textToSend) => {
    const text = textToSend || promptInput;
    if (!text.trim()) return;

    if (chatsLeft <= 0) {
      showToast('Daily AI limit reached! Upgrade to Unlimited.');
      return;
    }

    const userMsg = { sender: 'user', text };
    let currentId = activeChatId;

    if (!currentId) {
      currentId = Date.now().toString();
      setActiveChatId(currentId);
      const title = text.length > 25 ? text.substring(0, 25) + '...' : text;
      const newChatObj = { id: currentId, title, timestamp: 'Just now', messages: [userMsg] };
      setChats(prev => [newChatObj, ...prev]);
    } else {
      setChats(prev => prev.map(c => c.id === currentId ? { ...c, messages: [...c.messages, userMsg] } : c));
    }

    setPromptInput('');
    setChatsLeft(prev => Math.max(0, prev - 1));
    setIsGenerating(true);

    // AI Response simulation
    setTimeout(() => {
      let aiText = `Analyzed performance data for your sequences and pipeline. Generated dashboard "Sequence and Pipeline Analysis" with 4 core report cards. Top recommendations: 1) Increase follow-up frequency on day 3. 2) Personalize subject line for 28% higher open rate.`;
      
      setChats(prev => prev.map(c => {
        if (c.id === currentId) {
          return {
            ...c,
            messages: [
              ...c.messages,
              { 
                sender: 'ai', 
                text: aiText,
                prospects: [
                  { name: 'Sequence Alpha', role: '45% Open • 12% Reply', company: '1,240 Sent', email: '8 Meetings Booked' },
                  { name: 'Outbound SaaS SDR', role: '52% Open • 18% Reply', company: '2,100 Sent', email: '15 Meetings Booked' }
                ]
              }
            ]
          };
        }
        return c;
      }));
      setIsGenerating(false);
    }, 900);
  };

  return (
    <div className="ai-assistant-layout">
      {/* ── Sub-Sidebar (Left panel inside view - Matches Screenshots 1:1) ── */}
      <div className="ai-sub-sidebar">
        <div className="ai-sub-header">
          <h2 className="ai-sub-title">AI Assistant</h2>
          <button className="ai-sidebar-toggle-btn" title="Toggle AI Sidebar">
            <LayoutGrid size={15} color="#64748b" />
          </button>
        </div>

        {/* + Start new chat Button */}
        <button className="ai-start-chat-btn" onClick={startNewChat}>
          <Plus size={15} />
          <span>Start new chat</span>
        </button>

        {/* Navigation Items */}
        <div 
          className={`ai-nav-item ${activeNavTab === 'context' ? 'active' : ''}`}
          onClick={() => {
            setActiveNavTab('context');
            showToast('Opened Context Center configuration');
          }}
        >
          <BookOpen size={16} color="#64748b" />
          <span>Context center</span>
        </div>

        <div 
          className={`ai-nav-item ${activeNavTab === 'memory' ? 'active' : ''}`}
          onClick={() => {
            setActiveNavTab('memory');
            showToast('Opened AI Memory preferences');
          }}
        >
          <Sparkles size={16} color="#64748b" />
          <span>Memory</span>
        </div>

        {/* CHATS History Section */}
        <div className="ai-chats-section">
          <span className="ai-chats-label">CHATS</span>
          {chats.length === 0 ? (
            <span className="ai-no-chats">No chats yet</span>
          ) : (
            <div className="ai-chats-history-list">
              {chats.map(chat => (
                <div 
                  key={chat.id} 
                  className={`ai-chat-history-item ${activeChatId === chat.id && activeNavTab === 'chat' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveChatId(chat.id);
                    setActiveNavTab('chat');
                  }}
                >
                  <MessageSquare size={14} color="#64748b" />
                  <span className="chat-history-title">{chat.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Main Workspace Area (Center) ── */}
      <div className="ai-chat-main">
        {activeNavTab === 'context' ? (
          /* ── 2. Context Center View (1:1 Match to Screenshot 2) ── */
          <div className="ai-context-center-panel">
            <span className="context-mini-tag">PERSONALIZE YOUR AI</span>
            <h1 className="context-main-title">Make your AI an expert on your product</h1>
            <p className="context-desc">
              Apollo scans your website to understand exactly what you sell and who you sell to. This ensures every AI-generated recommendation, email and strategy is tailored to your unique value proposition.
            </p>

            {/* Sub-tabs: Company URL / I don't have a website */}
            <div className="context-tabs-row">
              <button 
                className={`context-tab-btn ${contextTab === 'url' ? 'active' : ''}`}
                onClick={() => setContextTab('url')}
              >
                Company URL
              </button>
              <button 
                className={`context-tab-btn ${contextTab === 'nowebsite' ? 'active' : ''}`}
                onClick={() => setContextTab('nowebsite')}
              >
                I don't have a website
              </button>
            </div>

            {/* Input Field with Globe Icon */}
            <div className="context-input-box-wrap">
              <Globe size={18} color="#64748b" className="context-globe-icon" />
              <input 
                type="text" 
                className="context-url-input" 
                value={companyUrl}
                onChange={(e) => setCompanyUrl(e.target.value)}
                placeholder="www.yourcompany.com"
              />
            </div>

            <p className="context-hint-text">
              You'll review and refine the AI draft before saving. Double-check anything that doesn't fit your business.
            </p>

            {/* Attach Documents Link */}
            <div className="context-attach-link-row">
              <button className="context-attach-btn" onClick={() => showToast('Attach document dialog opened')}>
                <FileText size={15} color="#475569" />
                <span>Attach documents (optional)</span>
              </button>
            </div>

            {/* Continue Button Row */}
            <div className="context-continue-row">
              <button className="context-continue-btn" onClick={() => showToast('AI website scan initiated for ' + companyUrl)}>
                Continue
              </button>
              <span className="context-time-sub">Takes less than 2 minutes</span>
            </div>
          </div>
        ) : activeNavTab === 'memory' ? (
          /* ── 3. Memory View (1:1 Match to Screenshot 3) ── */
          <div className="ai-memory-panel">
            <h1 className="memory-title">Memory</h1>

            {/* Toggle Header Row */}
            <div className="memory-toggle-row">
              <div>
                <h3 className="memory-toggle-title">Generate memory from chat history</h3>
                <p className="memory-toggle-sub">Allow Apollo to remember relevant context from your chats.</p>
              </div>

              {/* Black Toggle Switch with Checkmark */}
              <button 
                className={`memory-switch-btn ${memoryEnabled ? 'on' : 'off'}`}
                onClick={() => setMemoryEnabled(!memoryEnabled)}
              >
                <div className="switch-knob">
                  {memoryEnabled && <Check size={12} color="#ffffff" />}
                </div>
              </button>
            </div>

            {/* Manage Memory Card Box */}
            <div className="manage-memory-card">
              <h3 className="manage-memory-title">Manage memory</h3>
              <p className="manage-memory-sub">This is what Apollo remembers about you.</p>

              <div className="memory-body-empty">
                <p>No memories yet. Start chatting and the assistant will remember things about you.</p>
              </div>

              <div className="manage-memory-footer">
                <button className="edit-memory-btn" onClick={() => showToast('Edit Memory dialog opened')}>
                  <PencilIcon />
                  <span>Edit memory</span>
                </button>
              </div>
            </div>
          </div>
        ) : currentMessages.length > 0 ? (
          /* ── 4. Active Chat Thread View (1:1 Match to Screenshot 4) ── */
          <div className="ai-messages-thread-wrap">
            <div className="ai-messages-list">
              {currentMessages.map((msg, i) => (
                <div key={i} className={`ai-msg-bubble-row ${msg.sender}`}>
                  {msg.sender === 'user' ? (
                    /* User Message Bubble (Right Aligned Grey Box matching Screenshot 4) */
                    <div className="user-msg-bubble">
                      <p>{msg.text}</p>
                    </div>
                  ) : (
                    /* AI Response Bubble */
                    <div className="ai-msg-bubble-wrap ai">
                      <div className="msg-avatar">❖</div>
                      <div className="msg-content">
                        <p>{msg.text}</p>
                        {msg.prospects && (
                          <div className="ai-prospects-cards-grid">
                            {msg.prospects.map((p, idx) => (
                              <div key={idx} className="ai-prospect-card">
                                <div className="prospect-card-header">
                                  <strong>{p.name}</strong>
                                  <span>{p.role}</span>
                                </div>
                                <div className="prospect-card-sub">{p.company} • {p.email}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isGenerating && (
                <div className="ai-msg-bubble-wrap ai">
                  <div className="msg-avatar">❖</div>
                  <div className="msg-content">
                    <span className="ai-typing-indicator">Analyzing metrics & sequences...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Reply Prompt Box (Matching Screenshot 4 1:1) */}
            <div className="ai-prompt-card fixed-bottom">
              {showBanner && (
                <div className="ai-banner-row">
                  <span>Customize your AI for 37% more replies</span>
                  <button className="ai-banner-close" onClick={() => setShowBanner(false)}>✕</button>
                </div>
              )}

              <textarea 
                className="ai-prompt-textarea"
                placeholder="Reply to Assistant"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendPrompt();
                  }
                }}
              />

              <div className="ai-prompt-toolbar">
                <div className="ai-toolbar-left">
                  <button className="ai-tag-btn" onClick={() => showToast('Context Center linked')}>
                    📖 Context
                  </button>
                  <button className="ai-tag-btn" onClick={() => showToast('Asking Apollo AI Engine')}>
                    💬 Ask
                  </button>
                </div>

                <div className="ai-toolbar-right">
                  <span className="ai-chats-left-badge">{chatsLeft} CHATS LEFT</span>
                  <button className="ai-mic-btn" title="Voice Input" onClick={() => showToast('Listening for voice prompt...')}>
                    🎤
                  </button>
                  <button className="ai-send-btn" title="Send Prompt" onClick={() => handleSendPrompt()}>
                    ↑
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Disclaimer Text */}
            <div className="ai-thread-footer-disclaimer">
              <p>Chats may be shared with third parties, see <a href="#policy" onClick={(e) => { e.preventDefault(); showToast('AI Policy Documentation'); }}>AI Policy</a>. Avoid sharing sensitive info.</p>
              <p className="ai-session-id">ID 6a9fba947475d40010460435</p>
            </div>
          </div>
        ) : (
          /* ── 1. Default Empty Landing View (Matches Screenshot 1) ── */
          <div className="ai-hero-center-content">
            <div className="ai-hero-graphic-wrap">
              <svg className="ai-star-svg" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" fill="#0f172a"/>
              </svg>
            </div>

            <h1 className="ai-hero-title">I'm your AI Assistant.</h1>
            <p className="ai-hero-subtitle">
              I've got verified contacts — the stuff pipelines are made of.
            </p>

            {/* Prompt Input Box */}
            <div className="ai-prompt-card">
              {showBanner && (
                <div className="ai-banner-row">
                  <span>Customize your AI for 37% more replies</span>
                  <button className="ai-banner-close" onClick={() => setShowBanner(false)}>✕</button>
                </div>
              )}

              <textarea 
                className="ai-prompt-textarea"
                placeholder="What can I help you do?"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendPrompt();
                  }
                }}
              />

              <div className="ai-prompt-toolbar">
                <div className="ai-toolbar-left">
                  <button className="ai-tag-btn" onClick={() => showToast('Context Center linked')}>
                    📖 Context
                  </button>
                  <button className="ai-tag-btn" onClick={() => showToast('Asking Apollo AI Engine')}>
                    💬 Ask
                  </button>
                </div>

                <div className="ai-toolbar-right">
                  <span className="ai-chats-left-badge">{chatsLeft} CHATS LEFT</span>
                  <button className="ai-mic-btn" title="Voice Input" onClick={() => showToast('Listening for voice prompt...')}>
                    🎤
                  </button>
                  <button className="ai-send-btn" title="Send Prompt" onClick={() => handleSendPrompt()}>
                    ↑
                  </button>
                </div>
              </div>
            </div>

            {/* Preset Prompt Pills */}
            <div className="ai-presets-wrap">
              <span className="ai-presets-label">Start with a preset</span>
              <div className="ai-presets-row">
                <button 
                  className="ai-preset-pill"
                  onClick={() => handleSendPrompt('Find 25 VPs of Sales at SaaS companies in US hiring SDRs')}
                >
                  🔍 Prospecting
                </button>
                <button 
                  className="ai-preset-pill"
                  onClick={() => handleSendPrompt('Analyze competitive advantage of Apollo.io vs ZoomInfo')}
                >
                  ✨ Research
                </button>
                <button 
                  className="ai-preset-pill"
                  onClick={() => handleSendPrompt('Write 3-step high-converting cold email sequence for VP Marketing')}
                >
                  🚀 Sequencing
                </button>
                <button 
                  className="ai-preset-pill"
                  onClick={() => handleSendPrompt('Calculate conversion rates and credit usage breakdown')}
                >
                  📊 Analytics
                </button>
                <button 
                  className="ai-preset-pill"
                  onClick={() => handleSendPrompt('Generate list of target enterprise accounts in healthcare')}
                >
                  ••• More
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Help Button */}
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

// Pencil Icon Helper
const PencilIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

/* ─── 3. Prospect People View ─── */
export const ProspectPeopleView = ({ sampleLeads, showToast }) => (
  <PeopleProspectView showToast={showToast} />
);

/* ─── 4. Prospect Companies View ─── */
export const ProspectCompaniesView = ({ showToast }) => (
  <CompaniesProspectView showToast={showToast} />
);

/* ─── 5. Lists View ─── */
export const ListsView = ({ showToast, onSelectTab }) => (
  <ListsViewComponent showToast={showToast} onNavigateToProspect={(type) => onSelectTab && onSelectTab(type === 'people' ? 'people' : 'companies')} />
);

/* ─── 6. Data Enrichment View ─── */
export const DataEnrichmentView = ({ showToast, onSelectTab }) => (
  <DataEnrichmentViewComponent showToast={showToast} onNavigateToProspect={onSelectTab} />
);

/* ─── 7. Sequences View ─── */
export const SequencesView = ({ showToast }) => (
  <SequencesViewComponent showToast={showToast} />
);

/* ─── 8. Emails View ─── */
export const EmailsView = ({ showToast }) => (
  <EmailsViewComponent showToast={showToast} />
);

/* ─── 9. Calls View ─── */
export const CallsView = ({ showToast }) => (
  <CallsViewComponent showToast={showToast} />
);


/* ─── 10. Tasks View ─── */
export const TasksView = ({ showToast, onSelectTab }) => (
  <TasksViewComponent showToast={showToast} onNavigateToProspect={onSelectTab} />
);

/* ─── 11. Meetings View ─── */
export { MeetingsView };


/* ─── 12. Conversations View ─── */
export { ConversationsView };


/* ─── 13. Deals View ─── */
export { DealsView };


/* ─── 14. Workflows View ─── */
export { WorkflowsView };

/* ─── 15. Analytics View ─── */
export { AnalyticsView };

/* ─── 16. Website Visitors View ─── */
export { WebsiteVisitorsView };

/* ─── 17. Forms View ─── */
export { FormsView };

/* ─── 18. Saved People View ─── */
export { SavedPeopleView };

/* ─── 19. Saved Companies View ─── */
export { SavedCompaniesView };

/* ─── 20. Email Health View (Combined with Admin Settings) ─── */
export const EmailHealthView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Settings & Email Health</h1>
        <p>Manage your workspace settings, domain verification, and deliverability health.</p>
      </div>
    </div>

    <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '10px 0 14px 0', color: '#0f172a' }}>Email Setup and Health</h2>
    <div className="dash-card-section" style={{ marginBottom: 24 }}>
      <div className="dash-metrics-grid">
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

    <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '20px 0 14px 0', color: '#0f172a' }}>Workspace Settings</h2>
    <div className="dash-card-section" style={{ lineHeight: 1.8 }}>
      <p><strong>Workspace Name:</strong> Apollo Sales Team</p>
      <p><strong>Plan Tier:</strong> Unlimited Enterprise Plan ($99/mo)</p>
      <button className="dash-btn-primary" style={{ marginTop: 16 }} onClick={() => showToast('Settings saved!')}>
        Manage Billing
      </button>
    </div>
  </div>
);

/* ─── 21. Admin Sub-Views ─── */
export const AdminUsersTeamsView = ({ showToast }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Users and Teams</h1>
        <p>Manage your workspace members, roles, and permissions.</p>
      </div>
      <button className="dash-btn-primary" onClick={() => showToast('Invite modal opened')}>
        Invite Users
      </button>
    </div>
    <div className="dash-card-section">
      <table className="dash-leads-table">
        <thead>
          <tr><th>User Name</th><th>Email</th><th>Role</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td style={{ fontWeight: 700 }}>Abhishek Kumar</td><td>abhishek@apollo-user.io</td><td>Admin</td><td><span className="dash-metric-badge green">Active</span></td></tr>
          <tr><td style={{ fontWeight: 700 }}>John Doe</td><td>john@example.com</td><td>Member</td><td><span className="dash-metric-badge green">Active</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

export const AdminSystemActivityView = () => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>System Activity</h1>
        <p>Review audit logs and system events.</p>
      </div>
    </div>
    <div className="dash-card-section">
      <p><strong>Recent Events:</strong></p>
      <ul>
        <li>Admin login at 10:45 AM</li>
        <li>Billing plan updated at 9:00 AM</li>
        <li>User invite sent to john@example.com</li>
      </ul>
    </div>
  </div>
);

export const AdminSecurityView = () => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Security Settings</h1>
        <p>Configure SAML SSO, 2FA, and session timeouts.</p>
      </div>
    </div>
    <div className="dash-card-section">
      <p><strong>Two-Factor Authentication:</strong> Enabled</p>
      <p><strong>SAML SSO:</strong> Not Configured</p>
      <button className="dash-btn-primary" style={{ marginTop: 10 }}>Configure SSO</button>
    </div>
  </div>
);

export const AdminPlanOverviewView = () => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Plan Overview</h1>
        <p>Manage your subscription and billing details.</p>
      </div>
    </div>
    <div className="dash-card-section">
      <p><strong>Current Plan:</strong> Unlimited Enterprise ($99/mo)</p>
      <p><strong>Next Billing Date:</strong> Oct 08, 2026</p>
      <div className="dash-metrics-grid" style={{ marginTop: 20 }}>
        <div className="dash-metric-card">
          <div className="dash-metric-label">Export Credits</div>
          <div className="dash-metric-value">Unlimited</div>
        </div>
      </div>
    </div>
  </div>
);

export const AdminIntegrationsView = () => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Integrations</h1>
        <p>Connect Apollo to your CRM and other tools.</p>
      </div>
    </div>
    <div className="dash-card-section">
      <p><strong>Salesforce:</strong> Connected</p>
      <p><strong>HubSpot:</strong> Not Connected</p>
      <p><strong>Zapier:</strong> API Key Active</p>
    </div>
  </div>
);

export const AdminSettingsView = ({ user, onLogout }) => (
  <div className="dash-view-content">
    <div className="dash-view-header">
      <div className="dash-view-title-group">
        <h1>Workspace Settings</h1>
        <p>General settings for your Apollo workspace.</p>
      </div>
    </div>
    <div className="dash-card-section" style={{ lineHeight: 1.8 }}>
      <p><strong>Workspace Name:</strong> Apollo Sales Team</p>
      <p><strong>Primary Administrator:</strong> {user?.name || 'Abhishek Kumar'} ({user?.email || 'abhishek@apollo-user.io'})</p>
      <button className="dash-btn-primary" style={{ marginTop: 16 }} onClick={onLogout}>
        Log Out of Workspace
      </button>
    </div>
  </div>
);
