import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ApolloAIChatWidget.css';

// Authentic Apollo Sunburst SVG
export const ApolloSunburstIcon = ({ size = 24, color = '#E2FC00' }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M19.5993 0.0862365L19.605 13.2568C19.6058 15.3375 17.4222 16.6715 15.6079 15.6986L2.58376 8.7153C3.57706 7.05795 4.82616 5.57609 6.27427 4.32386L16.489 13.8945C17.0303 14.4015 17.8835 13.8518 17.6605 13.1398L13.6992 0.493553C15.0326 0.17147 16.4233 0 17.8536 0C18.4428 0 19.0248 0.0296814 19.5993 0.0862365Z" 
      fill={color} 
    />
    <path 
      d="M16.0635 36.1087L16.0578 23.0046C16.057 20.9239 18.2407 19.5898 20.0549 20.5627L33.0838 27.5486C32.0838 29.2016 30.8289 30.6786 29.3751 31.925L19.1738 22.3668C18.6326 21.8598 17.7793 22.4095 18.0023 23.1215L21.9486 35.72C20.6338 36.0329 19.263 36.1989 17.8539 36.1989C17.2497 36.1989 16.6523 36.1683 16.0635 36.1087Z" 
      fill={color} 
    />
    <path 
      d="M22.0105 16.77L31.4705 6.39392C30.2362 4.92008 28.7742 3.6486 27.1384 2.63702L20.2306 15.8767C19.2709 17.716 20.5871 19.9298 22.6396 19.9288L35.6183 19.923C35.6775 19.3234 35.7082 18.7151 35.7082 18.0996C35.7082 16.6683 35.5436 15.2761 35.2338 13.9406L22.7549 17.9576C22.0526 18.1837 21.5103 17.3187 22.0105 16.77Z" 
      fill={color} 
    />
    <path 
      d="M0.0842758 16.3383L13.0237 16.3325C15.0764 16.3317 16.3923 18.5454 15.4327 20.3846L8.56047 33.5561C6.93095 32.547 5.47394 31.2801 4.24344 29.8121L13.653 19.4914C14.1531 18.9427 13.6107 18.0777 12.9084 18.3037L0.485078 22.3029C0.168551 20.954 0 19.5467 0 18.0994C0 17.5051 0.0290814 16.9177 0.0842758 16.3383Z" 
      fill={color} 
    />
  </svg>
);

export default function ApolloAIChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'messages'
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi there! 👋 I am Apollo AI. How can I help you with our plans, credits, or finding verified leads today?'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (activeTab === 'messages') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

  const handleSend = (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setActiveTab('messages');
    setIsTyping(true);

    // Smart AI Response Logic
    setTimeout(() => {
      let reply = "I can definitely help you with that! Apollo gives you access to over 275M+ verified buyer contacts, automated multichannel sequences, and AI prospecting.";
      const lower = query.toLowerCase();

      if (lower.includes('credit')) {
        reply = "Apollo credits give you access to verified data:\n• 1 credit = 1 verified email\n• 8 credits = 1 direct mobile dial\n• 1-8 credits = Account data enrichment\n• 1 credit/run = AI Account research.\n\nYou can also calculate your exact credit needs anytime on this page!";
      } else if (lower.includes('free')) {
        reply = "Our Free plan ($0 forever) includes:\n• 900 credits/year (granted monthly)\n• AI Assistant with 5 chats\n• Basic prospecting & Gmail extension\n• 250 daily email sends.\n\nIt's great for testing out the Apollo platform!";
      } else if (lower.includes('pro') || lower.includes('professional')) {
        reply = "The Professional plan ($79/seat/mo billed annually) is our MOST POPULAR tier! It includes:\n• 48,000 credits/year\n• Unlimited email mailboxes & warmup\n• Pre-meeting AI insights & 4,000 mins of call recordings\n• Advanced sequence automation.";
      } else if (lower.includes('basic')) {
        reply = "The Basic plan ($49/seat/mo billed annually) includes 30,000 credits/year, 2 Lead Scoring models, buying signals, and uncapped sequence sends.";
      } else if (lower.includes('cancel') || lower.includes('refund') || lower.includes('annual')) {
        reply = "You can upgrade, downgrade, or cancel your subscription at any time. When choosing annual billing, you save 24% and get all your annual credits upfront!";
      } else if (lower.includes('which plan') || lower.includes('choose')) {
        reply = "If you're an individual sales rep or founder doing outbound, the **Basic ($49/mo)** or **Professional ($79/mo)** tier is the best choice. Most growing sales teams select Professional for unlimited email accounts and AI meeting insights!";
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 850);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="apollo-ai-widget-container">
      {/* Floating Popup Window */}
      {isOpen && (
        <div className="apollo-ai-popup">
          {activeTab === 'home' ? (
            <>
              {/* Top Header */}
              <div className="apollo-ai-header">
                <div className="apollo-ai-header-left">
                  <ApolloSunburstIcon size={26} color="#000000" />
                </div>
                <div className="apollo-ai-header-right">
                  <div className="apollo-ai-avatars">
                    <img 
                      className="apollo-ai-avatar" 
                      src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&auto=format&fit=crop&q=80" 
                      alt="Art" 
                    />
                    <img 
                      className="apollo-ai-avatar" 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                      alt="Agent" 
                    />
                    <div className="apollo-ai-avatar-letter">R</div>
                  </div>
                  <button 
                    className="apollo-ai-close-btn" 
                    onClick={() => setIsOpen(false)}
                    aria-label="Close"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Main Body */}
              <div className="apollo-ai-body">
                <div className="apollo-ai-greeting-sub">
                  Hi ! <span>👋</span>
                </div>
                <div className="apollo-ai-greeting-main">
                  How can we help?
                </div>

                {/* Send us a message Action Card */}
                <button 
                  className="apollo-ai-action-card" 
                  onClick={() => setActiveTab('messages')}
                >
                  <span className="apollo-ai-action-title">Send us a message</span>
                  <span className="apollo-ai-action-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </span>
                </button>

                {/* Quick Prompts */}
                <div className="apollo-ai-prompts-title">Instant Answers</div>
                <div className="apollo-ai-prompts-list">
                  <button 
                    className="apollo-ai-prompt-chip" 
                    onClick={() => handleSend('Which pricing plan is best for me?')}
                  >
                    💡 Which plan should I choose?
                  </button>
                  <button 
                    className="apollo-ai-prompt-chip" 
                    onClick={() => handleSend('How do Apollo credits work?')}
                  >
                    ⚡ How do credits work?
                  </button>
                  <button 
                    className="apollo-ai-prompt-chip" 
                    onClick={() => handleSend('What features are included in the Free tier?')}
                  >
                    ✦ What is in the Free plan?
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Chat / Messages View */
            <div className="apollo-ai-chat-view">
              <div className="apollo-ai-chat-header">
                <button 
                  className="apollo-ai-chat-back-btn" 
                  onClick={() => setActiveTab('home')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="apollo-ai-chat-title-group">
                  <div className="apollo-ai-chat-title">Apollo Assistant</div>
                  <div className="apollo-ai-chat-status">
                    <span className="apollo-ai-chat-status-dot" /> AI Online
                  </div>
                </div>
                <button 
                  className="apollo-ai-close-btn" 
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Messages list */}
              <div className="apollo-ai-messages-list">
                {messages.map((m) => (
                  <div key={m.id} className={`apollo-ai-message ${m.sender === 'user' ? 'is-user' : 'is-bot'}`}>
                    {m.sender === 'bot' && (
                      <div className="apollo-ai-bot-badge">
                        <ApolloSunburstIcon size={14} color="#E2FC00" />
                      </div>
                    )}
                    <div className="apollo-ai-message-bubble">
                      {m.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="apollo-ai-message is-bot">
                    <div className="apollo-ai-bot-badge">
                      <ApolloSunburstIcon size={14} color="#E2FC00" />
                    </div>
                    <div className="apollo-ai-message-bubble apollo-ai-typing">
                      <span className="apollo-ai-typing-dot" />
                      <span className="apollo-ai-typing-dot" />
                      <span className="apollo-ai-typing-dot" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input */}
              <div className="apollo-ai-chat-input-bar">
                <input
                  type="text"
                  className="apollo-ai-input"
                  placeholder="Ask a question..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button 
                  className="apollo-ai-send-btn" 
                  onClick={() => handleSend()}
                  disabled={!inputVal.trim()}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="apollo-ai-bottom-nav">
            <button 
              className={`apollo-ai-nav-tab ${activeTab === 'home' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Home</span>
            </button>
            <button 
              className={`apollo-ai-nav-tab ${activeTab === 'messages' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>Messages</span>
            </button>
          </div>
        </div>
      )}

      {/* Launcher Circle Button (Exact Apollo Style) */}
      <button 
        className={`apollo-ai-launcher-btn ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Apollo Assistant"
        title={isOpen ? "Close Assistant" : "Open Apollo AI Assistant"}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        ) : (
          <ApolloSunburstIcon size={26} color="#E2FC00" />
        )}
      </button>
    </div>,
    document.body
  );
}
