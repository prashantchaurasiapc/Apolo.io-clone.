import React, { useState, useEffect } from 'react';
import { 
  Sparkles, X, Send, Copy, Check, MessageSquare, Mail, 
  FileText, Zap, ShieldCheck, Flame, ArrowRight, RefreshCw, 
  User, Building2, TrendingUp, CheckCircle2 
} from 'lucide-react';
import './AICopilotDrawer.css';

export default function AICopilotDrawer({ isOpen, onToggle, showToast, onSelectTab }) {
  const [activeTab, setActiveTab] = useState('email'); // 'email' | 'dossier' | 'chat'
  
  // Email Generator State
  const [recipientName, setRecipientName] = useState('Alex Rivera');
  const [recipientRole, setRecipientRole] = useState('VP of Sales Operations');
  const [recipientCompany, setRecipientCompany] = useState('Stripe');
  const [valueProp, setValueProp] = useState('Consolidate data, sequencing, and verified phone dialer into one platform to cut tool spend by 40%');
  const [selectedTone, setSelectedTone] = useState('Executive');
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState({
    subject: 'Consolidating Stripe’s GTM tech stack (40% cost reduction)',
    body: `Hi Alex,\n\nNoticed Stripe is continuing to expand the enterprise GTM team this quarter. Quick question regarding your sales stack:\n\nMost RevOps leaders we speak with are managing 3-5 disconnected tools across contact data, sequencing, and dialer tracking—causing data slippage and high per-seat costs.\n\nWe built a unified platform that replaces ZoomInfo, Outreach, and dialer point solutions while delivering 99.2% verified emails.\n\nOpen to a brief 7-minute intro this Thursday to see how similar teams cut tool spend by 40%?\n\nBest,\nShivam`
  });
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Lead Dossier State
  const [dossierCompany, setDossierCompany] = useState('Datadog');
  const [isGeneratingDossier, setIsGeneratingDossier] = useState(false);
  const [dossierData, setDossierData] = useState({
    company: 'Datadog, Inc.',
    intentScore: 94,
    intentLevel: 'Very High Intent',
    signals: [
      'High Buyer Intent: Visited GTM integration & pricing documentation 4x this week',
      'Hiring Surge: 14 open roles for Sales Development and Enterprise Account Executives',
      'Tech Stack Addition: Recently integrated Salesforce & Snowflake pipelines',
      'Executive Movement: Appointed new VP of Revenue Operations 2 months ago'
    ],
    icebreaker: '“Saw Datadog’s rapid hiring across the enterprise outbound pod—are you looking to streamline rep ramp time and verified dialing for the new cohort?”'
  });

  // Copilot Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hello Shivam! I am your AI Sales Copilot. Ask me to research accounts, personalize emails, analyze sequence bottlenecks, or prepare objection answers.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Keyboard shortcut listener (Cmd+J / Ctrl+J)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        onToggle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggle]);

  // Generate Email handler
  const handleGenerateEmail = () => {
    setIsGeneratingEmail(true);
    setTimeout(() => {
      setGeneratedEmail({
        subject: `${selectedTone === 'Executive' ? 'Quick question regarding' : 'Idea for'} ${recipientCompany}’s outbound efficiency`,
        body: `Hi ${recipientName.split(' ')[0]},\n\nHope your week is off to a strong start. Reaching out because as ${recipientRole} at ${recipientCompany}, pipeline predictability is likely top of mind.\n\n${valueProp}.\n\nTeams like Cyera and Built In saw a 4x increase in rep efficiency within their first 30 days.\n\nDo you have 5 minutes open this week for a quick chat?\n\nBest,\nShivam`
      });
      setIsGeneratingEmail(false);
      if (showToast) showToast('AI Email draft regenerated!');
    }, 700);
  };

  const handleCopyEmail = () => {
    const fullText = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`;
    navigator.clipboard?.writeText?.(fullText);
    setCopiedEmail(true);
    if (showToast) showToast('Copied email to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Generate Dossier handler
  const handleGenerateDossier = () => {
    if (!dossierCompany.trim()) return;
    setIsGeneratingDossier(true);
    setTimeout(() => {
      setDossierData({
        company: dossierCompany,
        intentScore: Math.floor(Math.random() * 8) + 91,
        intentLevel: 'Very High Intent',
        signals: [
          `High Intent: Domain ${dossierCompany.toLowerCase()}.com active on review platforms in past 72 hrs`,
          `Actively evaluating data consolidation to improve outbound conversion rates`,
          `Estimated 500-2000 employees with expanding sales engineering footprint`,
          `Recent news: Accelerated market expansion in North America & EMEA`
        ],
        icebreaker: `“Noticed ${dossierCompany}’s recent expansion in North America—how are you currently outfitting your SDRs with fresh, zero-bounce emails?”`
      });
      setIsGeneratingDossier(false);
      if (showToast) showToast(`Generated AI dossier for ${dossierCompany}!`);
    }, 800);
  };

  // Chat Send handler
  const handleSendChatMessage = (textToSend) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      let reply = `Based on your sales performance data: Here are 3 tactical suggestions:\n1. Personalize the first line using their recent company milestone.\n2. Keep your ask low friction (e.g. "Worth a quick 5-min look?").\n3. Schedule automatic follow-ups on day 3 and day 6 to lift response rates by 34%.`;
      if (text.toLowerCase().includes('objection')) {
        reply = `To overcome "We already have a vendor": Acknowledge immediately ("Totally understand, you likely have ZoomInfo or Outreach in place"), then highlight the differentiator ("Most teams keep their primary CRM but plug our live verified dialer to cut bounce rates from 18% down to under 1%").`;
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* ── 1. Floating Action Button in Bottom-Right ── */}
      {!isOpen && (
        <button 
          className="ai-copilot-floating-trigger"
          onClick={onToggle}
          title="Open AI Sales Copilot (⌘J)"
        >
          <div className="ai-copilot-star-badge">
            <Sparkles size={14} />
          </div>
          <span>Ask AI Copilot</span>
          <span className="ai-copilot-shortcut-hint">⌘J</span>
        </button>
      )}

      {/* ── 2. Slideout Drawer ── */}
      {isOpen && (
        <div className="ai-drawer-overlay" onClick={onToggle}>
          <div className="ai-drawer-panel" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="ai-drawer-header">
              <div className="ai-drawer-title-group">
                <Sparkles size={18} color="#E2FC00" fill="#E2FC00" />
                <h3>
                  AI Sales Copilot
                  <span className="ai-drawer-badge">PRO</span>
                </h3>
              </div>

              <button className="ai-drawer-close-btn" onClick={onToggle} title="Close (Esc)">
                <X size={16} />
              </button>
            </div>

            {/* Sub-Tabs */}
            <div className="ai-drawer-tabs">
              <button 
                className={`ai-drawer-tab ${activeTab === 'email' ? 'active' : ''}`}
                onClick={() => setActiveTab('email')}
              >
                <Mail size={14} />
                <span>1:1 Drafter</span>
              </button>

              <button 
                className={`ai-drawer-tab ${activeTab === 'dossier' ? 'active' : ''}`}
                onClick={() => setActiveTab('dossier')}
              >
                <Flame size={14} color="#EF4444" />
                <span>Intent Intel</span>
              </button>

              <button 
                className={`ai-drawer-tab ${activeTab === 'chat' ? 'active' : ''}`}
                onClick={() => setActiveTab('chat')}
              >
                <MessageSquare size={14} />
                <span>Copilot Chat</span>
              </button>
            </div>

            {/* Body */}
            <div className="ai-drawer-body">
              {/* ── TAB 1: 1:1 Email Drafter ── */}
              {activeTab === 'email' && (
                <div>
                  <label className="ai-field-label">Recipient Name & Title</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '8px' }}>
                    <input 
                      type="text" 
                      className="ai-drawer-input" 
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                    />
                    <input 
                      type="text" 
                      className="ai-drawer-input" 
                      value={recipientRole}
                      onChange={(e) => setRecipientRole(e.target.value)}
                      placeholder="e.g. VP of Sales"
                    />
                  </div>

                  <label className="ai-field-label">Target Company</label>
                  <input 
                    type="text" 
                    className="ai-drawer-input" 
                    value={recipientCompany}
                    onChange={(e) => setRecipientCompany(e.target.value)}
                    placeholder="e.g. Stripe"
                  />

                  <label className="ai-field-label">Value Proposition / Hook</label>
                  <input 
                    type="text" 
                    className="ai-drawer-input" 
                    value={valueProp}
                    onChange={(e) => setValueProp(e.target.value)}
                    placeholder="Core benefit or meeting hook..."
                  />

                  <label className="ai-field-label">Tone & Style</label>
                  <div className="ai-tone-chips">
                    {['Executive', 'Consultative', 'Casual', 'Urgent & Direct'].map((tone) => (
                      <button
                        key={tone}
                        type="button"
                        className={`ai-tone-chip ${selectedTone === tone ? 'active' : ''}`}
                        onClick={() => setSelectedTone(tone)}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>

                  <button 
                    type="button" 
                    className="ai-generate-action-btn"
                    onClick={handleGenerateEmail}
                    disabled={isGeneratingEmail}
                  >
                    {isGeneratingEmail ? <RefreshCw size={15} className="spin" /> : <Sparkles size={15} />}
                    <span>{isGeneratingEmail ? 'Drafting Personalized Email...' : 'Generate 1:1 Email'}</span>
                  </button>

                  {/* Generated Email Result */}
                  <div className="ai-result-box">
                    <div className="ai-result-header">
                      <span className="ai-result-subject">{generatedEmail.subject}</span>
                      <div className="ai-result-actions">
                        <button className="ai-result-copy-btn" onClick={handleCopyEmail}>
                          {copiedEmail ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                          <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                    <div className="ai-result-content">
                      {generatedEmail.body}
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 2: Intent & Account Dossier ── */}
              {activeTab === 'dossier' && (
                <div>
                  <label className="ai-field-label">Analyze Target Company or Domain</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                    <input 
                      type="text" 
                      className="ai-drawer-input" 
                      style={{ marginBottom: 0 }}
                      value={dossierCompany}
                      onChange={(e) => setDossierCompany(e.target.value)}
                      placeholder="e.g. Datadog, Snowflake..."
                    />
                    <button 
                      type="button" 
                      className="ai-generate-action-btn" 
                      style={{ width: 'auto', padding: '0 16px' }}
                      onClick={handleGenerateDossier}
                      disabled={isGeneratingDossier}
                    >
                      {isGeneratingDossier ? <RefreshCw size={14} className="spin" /> : <Zap size={14} />}
                    </button>
                  </div>

                  <div className="ai-dossier-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontWeight: '700', fontSize: '15px', color: '#111827' }}>
                        {dossierData.company}
                      </span>
                      <span className="intent-score-badge">
                        <Flame size={13} />
                        {dossierData.intentScore}/100 • {dossierData.intentLevel}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Top Buying Signals:
                    </div>

                    <ul className="dossier-signals-list">
                      {dossierData.signals.map((sig, i) => (
                        <li key={i} className="dossier-signal-item">
                          <span className="dossier-signal-bullet">•</span>
                          <span>{sig}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
                      <div style={{ fontSize: '12px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                        Suggested Icebreaker:
                      </div>
                      <div style={{ fontSize: '12.5px', color: '#374151', fontStyle: 'italic', background: '#F9FAFB', padding: '8px 10px', borderRadius: '6px' }}>
                        {dossierData.icebreaker}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 3: Conversational Copilot Chat ── */}
              {activeTab === 'chat' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="drawer-chat-messages">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`drawer-msg ${msg.sender}`}>
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  {/* Suggestion Chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '12px 0 6px 0' }}>
                    {[
                      'Handle "No budget" objection',
                      'Analyze drop-offs in sequence 2',
                      'Write a break-up email'
                    ].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        className="ai-tone-chip"
                        style={{ fontSize: '11px', padding: '4px 8px' }}
                        onClick={() => handleSendChatMessage(chip)}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  <div className="drawer-prompt-input-row">
                    <input 
                      type="text" 
                      className="drawer-prompt-field"
                      placeholder="Ask sales copilot anything..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSendChatMessage(); }}
                    />
                    <button 
                      type="button" 
                      className="drawer-send-btn"
                      onClick={() => handleSendChatMessage()}
                    >
                      <Send size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
