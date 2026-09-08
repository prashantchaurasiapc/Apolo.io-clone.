import React, { useState } from 'react';
import { 
  Sparkles, Clock, RotateCcw, Send, Play, Pause, Volume2, 
  Maximize2, RotateCw, ChevronDown, MessageSquare, Scissors, 
  HelpCircle, Check, ExternalLink, X
} from 'lucide-react';
import './ConversationsView.css';

/* ─── Conferencing App SVGs ─── */
const ZoomIcon = () => (
  <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="18" fill="#2D8CFF" />
    <path d="M11 13.5C11 12.3954 11.8954 11.5 13 11.5H20C21.1046 11.5 22 12.3954 22 13.5V22.5C22 23.6046 21.1046 24.5 20 24.5H13C11.8954 24.5 11 23.6046 11 22.5V13.5Z" fill="white" />
    <path d="M22 16.2L27 12.8V23.2L22 19.8V16.2Z" fill="white" />
  </svg>
);

const GoogleMeetIcon = () => (
  <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
    <path fill="#00832d" d="M30 20.5l-6-4.5v16l6-4.5z"/>
    <path fill="#0066da" d="M10 13c0-2.2 1.8-4 4-4h10v11.5l-6 4.5H10z"/>
    <path fill="#e94235" d="M24 9h4c2.2 0 4 1.8 4 4v7.5L24 25z"/>
    <path fill="#2684fc" d="M10 25h8l6 4.5V39H14c-2.2 0-4-1.8-4-4z"/>
    <path fill="#00ac47" d="M24 39v-9.5l8 4.5V35c0 2.2-1.8 4-4 4z"/>
    <path fill="#ffba00" d="M32 20.5v7l6 4.5V16z"/>
  </svg>
);

const MicrosoftTeamsIcon = () => (
  <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="8" fill="#5059C9" />
    <path d="M24 13C24.8 13 25.5 12.3 25.5 11.5C25.5 10.7 24.8 10 24 10C23.2 10 22.5 10.7 22.5 11.5C22.5 12.3 23.2 13 24 13Z" fill="white" fillOpacity="0.85" />
    <path d="M26.5 14.5H21.5C21 14.5 20.5 14.9 20.5 15.4V21.5C21 21.8 21.6 22 22.2 22H26.5C27.3 22 28 21.3 28 20.5V16C28 15.2 27.3 14.5 26.5 14.5Z" fill="white" fillOpacity="0.85" />
    <circle cx="15.5" cy="12" r="2.5" fill="white" />
    <rect x="10" y="15.5" width="11" height="9.5" rx="1.5" fill="white" />
  </svg>
);

const GreenCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#2E7D32" />
    <path d="M6 10.2L8.6 12.8L14 7.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ConversationsView({ showToast }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [videoImgUrl, setVideoImgUrl] = useState("https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80");


  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (showToast) {
      showToast(!isPlaying ? 'Playing recording playback' : 'Playback paused');
    }
  };

  const handleAskAI = () => {
    if (showToast) {
      showToast('Apollo AI Assistant: Analyzing call transcript for key deal drivers...');
    }
  };

  return (
    <div className="conversations-view-wrapper">
      {/* ─── Top Header Title ─── */}
      <div className="conversations-page-header">
        <h1 className="conversations-page-title">Conversations</h1>
      </div>

      {/* ─── Main Split Section ─── */}
      <div className="conversations-split-layout">
        {/* ─── LEFT: Dark Navy Container with Floating UI Cards ─── */}
        <div className="conversations-illustration-col">

          {/* CARD 1: AI Summary & Transcript Floating Card */}
          <div className="conversations-summary-card">
            <div className="conv-summary-tabs">
              <span 
                className={`conv-tab-item ${activeTab === 'summary' ? 'active' : ''}`}
                onClick={() => setActiveTab('summary')}
              >
                Summary
              </span>
              <span 
                className={`conv-tab-item ${activeTab === 'transcript' ? 'active' : ''}`}
                onClick={() => { setActiveTab('transcript'); showToast && showToast('Viewing Full Transcript'); }}
              >
                Transcript
              </span>
              <span 
                className={`conv-tab-item ${activeTab === 'trackers' ? 'active' : ''}`}
                onClick={() => { setActiveTab('trackers'); showToast && showToast('Viewing Tracker Metrics'); }}
              >
                Trackers
              </span>
              <span 
                className={`conv-tab-item ${activeTab === 'comments' ? 'active' : ''}`}
                onClick={() => { setActiveTab('comments'); showToast && showToast('Viewing Team Comments'); }}
              >
                Comments <span className="conv-tab-badge">4</span>
              </span>
            </div>

            <button className="btn-ask-ai-meeting" onClick={handleAskAI}>
              <Sparkles size={13} color="#ffffff" />
              <span>Ask anything about this meeting</span>
              <span className="beta-pill">Beta</span>
            </button>

            <div className="conv-subtitle-row">
              <span className="conv-sections-count">5 sections generated</span>
              <div className="conv-action-icons">
                <Clock size={11} />
                <RotateCcw size={11} />
                <Send size={11} />
              </div>
            </div>

            {/* AI Generated Sections */}
            <div className="conv-summary-section">
              <div className="conv-section-title">Overview</div>
              <div className="conv-section-text">
                Janet discussed how to filter searches, link Salesforce, set up mappings in Salesforce, and use the platform to save contacts. They discussed the amount of credits the Shopify has, and the resources available to them as an enterprise customer. Janet agreed to sign the renewal contract within 1 week.
              </div>
            </div>

            <div className="conv-summary-section">
              <div className="conv-section-title">Pricing</div>
              <div className="conv-section-text">
                Janet and Jake agreed to sign a renewal contract of $60,000 yearly for 5 years.
              </div>
            </div>

            <div className="conv-summary-section">
              <div className="conv-section-title">Pain points</div>
              <div className="conv-bullet-item">
                <span className="conv-speaker-tag">Jake:</span>
                Janet was concerned about the complexity of setting up the integration settings for Salesforce.
              </div>
            </div>

            <div className="conv-summary-section">
              <div className="conv-section-title">Next steps</div>
              <div className="conv-bullet-item">
                <span className="conv-speaker-tag">Janet:</span> Send the contract renewal via DocuSign to Jake and Amy.
              </div>
              <div className="conv-bullet-item">
                <span className="conv-speaker-tag">Jake:</span> Send the signed contract within 1 week.
              </div>
            </div>

            <div className="conv-summary-section">
              <div className="conv-section-title">Questions</div>
              <div className="conv-bullet-item">
                <span className="conv-timestamp-badge">5:30</span>
                <span className="conv-speaker-tag">Jake</span> Should we do a walkthrough of integration setup?
              </div>
              <div className="conv-bullet-item">
                <span className="conv-timestamp-badge">13:42</span>
                <span className="conv-speaker-tag">Jake</span> Can you walk me through pricing tier limits?
              </div>
            </div>

            <div className="conv-feedback-footer">
              <span>Help us improve! Is this summary useful?</span>
              <span style={{ cursor: 'pointer' }} onClick={() => showToast && showToast('Thank you for feedback!')}>👍</span>
              <span style={{ cursor: 'pointer' }} onClick={() => showToast && showToast('Thank you for feedback!')}>👎</span>
            </div>
          </div>

          {/* CARD 2: Video Player & Audio Talk-Track Analytics Card */}
          <div className="conversations-video-card">
            {/* Video Player */}
            <div className="video-frame-container">
              <img 
                src={videoImgUrl} 
                alt="Janet Mendoza - Video Participant" 
                className="video-participant-img"
                onError={() => {
                  setVideoImgUrl("https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80");
                }}
              />
              
              <div className="video-controls-overlay">
                <div className="video-progress-bar-track">
                  <div className="video-progress-bar-fill" />
                </div>
                
                <div className="video-controls-row">
                  <div className="video-controls-left">
                    <button className="video-control-btn" onClick={togglePlay}>
                      {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                    </button>
                    <button className="video-control-btn" title="Rewind 10s">
                      <RotateCcw size={11} />
                    </button>
                    <button className="video-control-btn" title="Forward 10s">
                      <RotateCw size={11} />
                    </button>
                    <button className="video-control-btn">
                      <Volume2 size={12} />
                    </button>
                    <span className="video-time-text">2:35 / 29:55</span>
                  </div>

                  <div className="video-controls-right">
                    <span style={{ fontSize: '9px', background: 'rgba(255,255,255,0.2)', padding: '1px 4px', borderRadius: '3px', cursor: 'pointer' }}>1x</span>
                    <button className="video-control-btn">
                      <Maximize2 size={11} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Talk-Track Analytics Timeline */}
            <div className="talk-track-container">
              <div className="talk-track-header">
                <div className="talk-track-action-btn">
                  <span>👥 Listen to</span>
                  <ChevronDown size={10} />
                </div>
                <div className="talk-track-actions">
                  <button className="talk-track-action-btn" onClick={() => showToast && showToast('Comment added at 2:35')}>
                    <MessageSquare size={10} />
                    <span>Comment</span>
                  </button>
                  <button className="talk-track-action-btn" onClick={() => showToast && showToast('Snippet clip created')}>
                    <Scissors size={10} />
                    <span>Share clip</span>
                  </button>
                </div>
              </div>

              <div className="speaker-rows-list">
                {/* Janet Mendoza */}
                <div className="speaker-item-row">
                  <div className="speaker-meta-info">
                    <span className="speaker-name">Janet Mendoza</span>
                    <span className="speaker-stats">Spoke: 40% • 12m</span>
                  </div>
                  <div className="speaker-segmented-bar">
                    <div className="bar-segment gray" style={{ width: '25%' }} />
                    <div className="bar-segment gray" style={{ width: '45%' }} />
                    <div className="bar-segment gray" style={{ width: '20%' }} />
                  </div>
                </div>

                {/* Jake Peralta */}
                <div className="speaker-item-row">
                  <div className="speaker-meta-info">
                    <span className="speaker-name">Jake Peralta</span>
                    <span className="speaker-stats">Spoke: 45% • 13m</span>
                  </div>
                  <div className="speaker-segmented-bar">
                    <div className="bar-segment blue" style={{ width: '30%' }} />
                    <div className="bar-segment blue" style={{ width: '35%' }} />
                    <div className="bar-segment blue" style={{ width: '25%' }} />
                  </div>
                </div>

                {/* Amy Santiago */}
                <div className="speaker-item-row">
                  <div className="speaker-meta-info">
                    <span className="speaker-name">Amy Santiago</span>
                    <span className="speaker-stats">Spoke: 5% • 2m</span>
                  </div>
                  <div className="speaker-segmented-bar">
                    <div className="bar-segment orange" style={{ width: '15%' }} />
                    <div className="bar-segment orange" style={{ width: '20%' }} />
                  </div>
                </div>

                {/* Screen Share */}
                <div className="speaker-item-row">
                  <div className="speaker-meta-info">
                    <span className="speaker-name" style={{ color: '#64748b', fontWeight: 500 }}>Screen share</span>
                    <span className="speaker-stats">45% • 13m</span>
                  </div>
                  <div className="speaker-segmented-bar">
                    <div className="bar-segment purple" style={{ width: '70%', marginLeft: '15%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ─── RIGHT: Content, Value Props & CTAs Column ─── */}
        <div className="conversations-content-col">
          <div className="conversations-content-inner">
            <h2 className="conversations-hero-heading">
              Automatically record, transcribe, and analyze video call meetings with Apollo Conversations
            </h2>

            <div className="conversations-conferencing-title">
              Works with conferencing apps
            </div>

            <div className="conferencing-apps-row">
              <div 
                className="conferencing-app-icon-wrap" 
                title="Zoom Meetings"
                onClick={() => showToast && showToast('Zoom Conversations recording ready')}
              >
                <ZoomIcon />
              </div>
              <div 
                className="conferencing-app-icon-wrap" 
                title="Google Meet"
                onClick={() => showToast && showToast('Google Meet Conversations recording ready')}
              >
                <GoogleMeetIcon />
              </div>
              <div 
                className="conferencing-app-icon-wrap" 
                title="Microsoft Teams"
                onClick={() => showToast && showToast('Microsoft Teams Conversations recording ready')}
              >
                <MicrosoftTeamsIcon />
              </div>
            </div>

            <div className="conversations-features-list">
              <div className="conversations-feature-item">
                <div className="conversations-check-circle">
                  <GreenCheckIcon />
                </div>
                <div className="conversations-feature-text">
                  Record video and generate transcripts using your web conferencing app
                </div>
              </div>

              <div className="conversations-feature-item">
                <div className="conversations-check-circle">
                  <GreenCheckIcon />
                </div>
                <div className="conversations-feature-text">
                  Get actionable insights from AI-generated meeting summaries
                </div>
              </div>

              <div className="conversations-feature-item">
                <div className="conversations-check-circle">
                  <GreenCheckIcon />
                </div>
                <div className="conversations-feature-text">
                  Help your team sell more by understanding key conversation metrics
                </div>
              </div>

              <div className="conversations-feature-item">
                <div className="conversations-check-circle">
                  <GreenCheckIcon />
                </div>
                <div className="conversations-feature-text">
                  Save time with automated post-meeting follow-up tasks
                </div>
              </div>
            </div>

            <div className="conversations-cta-group">
              <button 
                className="btn-get-started-yellow"
                onClick={() => showToast && showToast('Apollo Conversations activated for your workspace!')}
              >
                Get started now
              </button>

              <button 
                className="btn-explore-demo-white"
                onClick={() => setShowDemoModal(true)}
              >
                Explore a live demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Demo Modal */}
      {showDemoModal && (
        <div className="calendar-modal-backdrop" onClick={() => setShowDemoModal(false)}>
          <div className="calendar-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="calendar-modal-header">
              <h3>Explore Apollo Conversations Demo</h3>
              <button className="calendar-modal-close" onClick={() => setShowDemoModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="calendar-modal-body">
              <p style={{ fontSize: '13.5px', color: '#64748b', margin: '0 0 12px 0' }}>
                Experience live AI conversation intelligence analysis across your sales team:
              </p>
              
              <div style={{ background: '#f8fafc', padding: 14, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 4 }}>
                  📹 Enterprise Sales Call Demo (28m)
                </div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>
                  Participants: Sarah Jenkins (Stripe), Alex Rivera (Apollo AE)
                </div>
                <button 
                  className="btn-get-started-yellow" 
                  style={{ width: '100%', padding: '10px' }}
                  onClick={() => {
                    setShowDemoModal(false);
                    showToast && showToast('Interactive demo loaded! Play recording to inspect AI transcript.');
                  }}
                >
                  Launch Interactive Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
