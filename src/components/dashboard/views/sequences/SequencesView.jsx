import React, { useState } from 'react';
import {
  Plus, Play, Sparkles, ChevronDown, ChevronUp, AlertTriangle, X, Check,
  Mail, Phone, Calendar, Send, Settings, ExternalLink, HelpCircle, Lock,
  Users, Trash2, Eye, Download, Search, SlidersHorizontal, ArrowRight, Layers,
  MoreHorizontal, FileSpreadsheet, ArrowUpDown, Filter
} from 'lucide-react';

import '../../css/sequences-view.css';

export default function SequencesView({ showToast }) {
  // Tab State: 'all' | 'analytics' | 'diagnostics'
  const [activeTab, setActiveTab] = useState('all');

  // Page View Mode: 'welcome' (1:1 Screenshot View) or 'table'
  const [pageMode, setPageMode] = useState('welcome');

  // Video Playing State
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Expandable Accordion State ("More sequence resources")
  const [resourcesExpanded, setResourcesExpanded] = useState(false);

  // Link Mailbox Warning Banner State
  const [bannerVisible, setBannerVisible] = useState(true);
  const [mailboxModalOpen, setMailboxModalOpen] = useState(false);

  // Analytics Filter States
  const [timeframe, setTimeframe] = useState('Select timeframe');

  // Create Sequence Modal / Drawer State
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createWithAI, setCreateWithAI] = useState(false);
  const [sequenceName, setSequenceName] = useState('');
  const [nameError, setNameError] = useState(false);

  // Sample Created Sequences List
  const [sequencesList, setSequencesList] = useState([
    {
      id: 'seq-1',
      name: '22Q2 - Sr Technical Recruiter US',
      stepsCount: 3,
      activeLeads: 340,
      delivered: 1734,
      opened: '12.4%',
      replied: '1.5%',
      status: 'Active',
      updatedDate: '7:07 pm'
    },
    {
      id: 'seq-2',
      name: '22Q2 - Strategic Finance Analyst',
      stepsCount: 2,
      activeLeads: 200,
      delivered: 800,
      opened: '18.2%',
      replied: '3.4%',
      status: 'Active',
      updatedDate: '7:07 pm'
    },
    {
      id: 'seq-3',
      name: '22Q2 - Account Executive VP (US Companies LATAM)',
      stepsCount: 4,
      activeLeads: 240,
      delivered: 662,
      opened: '38.4%',
      replied: '7.8%',
      status: 'Active',
      updatedDate: '6:42 pm'
    }
  ]);

  // Open Terms Modal First
  const handleOpenCreate = (isAI = false) => {
    setCreateWithAI(isAI);
    setTermsModalOpen(true);
  };

  // Accept Terms and Open Sequence Drawer
  const handleAcceptTerms = () => {
    setTermsModalOpen(false);
    setSequenceName(createWithAI ? 'AI Generated High-Converting Sequence' : 'New Outbound Sequence');
    setNameError(false);
    setCreateModalOpen(true);
  };

  // Submit New Sequence
  const handleCreateSequence = () => {
    if (!sequenceName.trim()) {
      setNameError(true);
      return;
    }

    const newSeq = {
      id: `seq-${Date.now()}`,
      name: sequenceName.trim(),
      stepsCount: createWithAI ? 4 : 3,
      activeLeads: 45,
      delivered: 120,
      opened: '42.0%',
      replied: '8.5%',
      status: 'Active',
      updatedDate: 'Just now'
    };

    setSequencesList(prev => [newSeq, ...prev]);
    setCreateModalOpen(false);
    setPageMode('table');
    showToast(`Created sequence "${newSeq.name}"`);
  };

  // Delete Sequence
  const handleDeleteSequence = (id, name, e) => {
    if (e) e.stopPropagation();
    setSequencesList(prev => prev.filter(s => s.id !== id));
    showToast(`Deleted sequence "${name}"`);
  };

  return (
    <div className="dash-view-content apollo-sequences-page">
      
      {/* ── 1. TOP HEADER BAR (1:1 MATCH TO SCREENSHOTS) ── */}
      <div className="sequences-top-header">
        <h1 className="sequences-title-text">Sequences</h1>

        <div className="sequences-header-right">
          {activeTab === 'all' && (
            <>
              {pageMode === 'table' && (
                <button 
                  className="view-toggle-btn"
                  onClick={() => setPageMode('welcome')}
                >
                  Show Demo & Overview
                </button>
              )}

              {/* Yellow Create Sequence Button */}
              <button 
                className="create-sequence-yellow-btn"
                onClick={() => handleOpenCreate(false)}
              >
                Create sequence
              </button>
            </>
          )}

          {activeTab === 'analytics' && (
            <button 
              className="create-sequence-yellow-btn"
              onClick={() => showToast('Navigating to full Analytics dashboard...')}
            >
              Go to Analytics
            </button>
          )}
        </div>
      </div>

      {/* ── 2. SUB-NAVIGATION TABS BAR (1:1 MATCH TO SCREENSHOTS) ── */}
      <div className="sequences-tabs-bar">
        <button 
          className={`seq-tab-item ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Sequences
        </button>

        <button 
          className={`seq-tab-item ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>

        <button 
          className={`seq-tab-item ${activeTab === 'diagnostics' ? 'active' : ''}`}
          onClick={() => setActiveTab('diagnostics')}
        >
          Diagnostics
        </button>
      </div>

      {/* ── TAB 1: ALL SEQUENCES VIEW ── */}
      {activeTab === 'all' && (
        <>
          {/* Warning Alert Banner */}
          {bannerVisible && (
            <div className="sequences-warning-banner">
              <div className="banner-left-info">
                <AlertTriangle size={18} color="#d97706" className="warning-icon" />
                <span className="banner-text">
                  You have no mailboxes linked. Please connect your email account to start managing and sending emails via Apollo.
                </span>
                <button 
                  className="link-mailbox-btn-link"
                  onClick={() => setMailboxModalOpen(true)}
                >
                  Link mailbox
                </button>
              </div>
              <button className="banner-close-btn" onClick={() => setBannerVisible(false)}>
                <X size={15} color="#92400e" />
              </button>
            </div>
          )}

          {/* MAIN BODY CONTENT AREA */}
          <div className="sequences-main-body-container">
            {pageMode === 'welcome' ? (
              /* ── 1:1 SCREENSHOT WELCOME & VIDEO WALKTHROUGH VIEW ── */
              <div className="sequences-welcome-wrapper">
                
                {/* 1:1 Video Player Container matching Screenshot */}
                <div className="video-player-card-container">
                  <div className="video-frame-inner">
                    <div className="video-pattern-strip left">
                      <span>▲</span><span>▲</span><span>▲</span><span>▲</span>
                      <span>▲</span><span>▲</span><span>▲</span><span>▲</span>
                    </div>

                    <div className="video-screen-content">
                      {isPlayingVideo ? (
                        <div className="real-video-player-wrap">
                          <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1" 
                            title="Demo Video" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                            className="real-html5-video"
                            style={{ border: 'none' }}
                          ></iframe>
                          <button className="close-video-float-btn" onClick={() => setIsPlayingVideo(false)} title="Close Video">
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="video-graphic-bg">
                          <div className="annotation-badge engaged">
                            <span className="handwriting-font">Engaged in campaign</span>
                          </div>

                          <div className="annotation-badge meeting">
                            <span className="handwriting-font">Meeting scheduled</span>
                          </div>

                          <div className="annotation-badge prospect">
                            <span className="handwriting-font">* Key prospect</span>
                          </div>

                          <button 
                            className="center-play-button-overlay"
                            onClick={() => {
                              setIsPlayingVideo(true);
                              showToast('Playing Apollo Sequences Video Walkthrough');
                            }}
                          >
                            <div className="play-triangle-box">
                              <Play size={28} fill="#ffffff" color="#ffffff" style={{ marginLeft: 4 }} />
                            </div>
                          </button>
                        </div>
                      )}

                      {!isPlayingVideo && (
                        <div className="video-control-bar">
                          <button className="control-btn" onClick={() => setIsPlayingVideo(true)}>
                            <Play size={14} fill="#ffffff" color="#ffffff" />
                          </button>
                          <span className="video-time-text">1:05</span>

                          <div className="control-right-group">
                            <span className="control-icon" title="Volume" onClick={() => setIsPlayingVideo(true)}>🔊</span>
                            <span className="control-icon" title="Settings" onClick={() => setIsPlayingVideo(true)}>⚙</span>
                            <span className="control-icon" title="Fullscreen" onClick={() => setIsPlayingVideo(true)}>⛶</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="video-pattern-strip right">
                      <span>▲</span><span>▲</span><span>▲</span><span>▲</span>
                      <span>▲</span><span>▲</span><span>▲</span><span>▲</span>
                    </div>
                  </div>
                </div>

                {/* Headline & CTA Subtitle */}
                <div className="sequences-headline-section">
                  <h2 className="seq-main-heading">Create your first sequence</h2>
                  <p className="seq-subtext-desc">
                    Build custom campaigns to automate emails, set more meetings, and convert more customers.
                  </p>

                  <div className="seq-action-buttons-row">
                    <button 
                      className="purple-ai-sequence-btn"
                      onClick={() => handleOpenCreate(true)}
                    >
                      <Sparkles size={16} color="#7c3aed" />
                      <span>Create a sequence with AI</span>
                    </button>

                    <button 
                      className="yellow-primary-btn"
                      onClick={() => handleOpenCreate(false)}
                    >
                      Create sequence
                    </button>
                  </div>
                </div>

                {/* More sequence resources Accordion */}
                <div className="more-resources-accordion-wrap">
                  <button 
                    className="more-resources-toggle-btn"
                    onClick={() => setResourcesExpanded(!resourcesExpanded)}
                  >
                    <span>More sequence resources</span>
                    {resourcesExpanded ? <ChevronUp size={16} color="#475569" /> : <ChevronDown size={16} color="#475569" />}
                  </button>

                  {resourcesExpanded && (
                    <div className="resources-expanded-content">
                      <div className="resource-card-item" onClick={() => handleOpenCreate(false)}>
                        <div className="item-icon-box blue"><Mail size={18} color="#2563eb" /></div>
                        <div className="item-details">
                          <strong>Cold Outbound 3-Step Campaign</strong>
                          <span>Initial intro email + automated follow-up + phone task</span>
                        </div>
                        <button className="use-template-btn">Use Template →</button>
                      </div>

                      <div className="resource-card-item" onClick={() => handleOpenCreate(true)}>
                        <div className="item-icon-box purple"><Sparkles size={18} color="#7c3aed" /></div>
                        <div className="item-details">
                          <strong>AI Persona-Based Outreach</strong>
                          <span>Tailored messaging based on recipient job title & seniority</span>
                        </div>
                        <button className="use-template-btn">Use Template →</button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              /* ACTIVE SEQUENCES TABLE VIEW */
              <div className="active-sequences-table-container">
                <div className="table-top-bar">
                  <div className="table-search-wrap">
                    <Search size={15} color="#94a3b8" />
                    <input type="text" placeholder="Search Sequences..." className="table-search-input" />
                  </div>
                  <button className="yellow-primary-btn" onClick={() => handleOpenCreate(false)}>+ New Sequence</button>
                </div>

                <div className="exact-apollo-table-card">
                  <table className="exact-apollo-table">
                    <thead>
                      <tr>
                        <th>SEQUENCE NAME</th>
                        <th>ACTIVE LEADS</th>
                        <th>DELIVERED</th>
                        <th>OPEN RATE</th>
                        <th>REPLY RATE</th>
                        <th>STATUS</th>
                        <th style={{ textAlign: 'right' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sequencesList.map(seq => (
                        <tr key={seq.id} className="exact-row">
                          <td>
                            <div className="seq-name-wrap">
                              <Mail size={16} color="#2563eb" />
                              <div>
                                <strong className="seq-title">{seq.name}</strong>
                                <span className="seq-steps-count">{seq.stepsCount} steps • Updated {seq.updatedDate}</span>
                              </div>
                            </div>
                          </td>
                          <td><strong>{seq.activeLeads}</strong></td>
                          <td>{seq.delivered}</td>
                          <td><span className="rate-badge blue">{seq.opened}</span></td>
                          <td><span className="rate-badge green">{seq.replied}</span></td>
                          <td><span className="status-pill active">● {seq.status}</span></td>
                          <td style={{ textAlign: 'right' }}>
                            <button 
                              className="table-action-icon-btn danger"
                              onClick={(e) => handleDeleteSequence(seq.id, seq.name, e)}
                            >
                              <Trash2 size={14} color="#ef4444" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── TAB 2: ANALYTICS VIEW (1:1 MATCH TO SCREENSHOT) ── */}
      {activeTab === 'analytics' && (
        <div className="seq-analytics-view-container">
          {/* Timeframe & Filter Bar */}
          <div className="analytics-filter-toolbar">
            <button className="white-dropdown-btn" onClick={() => showToast('Timeframe dropdown opened')}>
              <span>{timeframe}</span>
              <ChevronDown size={14} color="#64748b" />
            </button>

            <button className="add-filter-text-btn" onClick={() => showToast('Added analytics filter')}>
              <Plus size={15} color="#475569" />
              <span>Add filter</span>
            </button>
          </div>

          {/* Main Analytics Card */}
          <div className="analytics-performance-card">
            <div className="card-top-header-row">
              <h3 className="card-title-text">Highest Performing Sequences</h3>
              <button className="icon-dots-btn" onClick={() => showToast('Card options menu')}>
                <MoreHorizontal size={18} color="#64748b" />
              </button>
            </div>

            {/* Skeleton Table / Empty State Container */}
            <div className="analytics-skeleton-body">
              {/* Skeleton Faint Lines */}
              <div className="skeleton-row-line"></div>
              <div className="skeleton-row-line"></div>
              <div className="skeleton-row-line"></div>
              <div className="skeleton-row-line"></div>
              <div className="skeleton-row-line"></div>

              {/* Center No Data Graphic */}
              <div className="center-no-data-box">
                <FileSpreadsheet size={22} color="#64748b" className="no-data-icon" />
                <span className="no-data-text">No data yet</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: DIAGNOSTICS VIEW (1:1 MATCH TO SCREENSHOT) ── */}
      {activeTab === 'diagnostics' && (
        <div className="seq-diagnostics-view-container">
          
          {/* Left Sidebar Menu */}
          <aside className="diagnostics-left-sidebar">
            <div className="diag-menu-item active">
              <Send size={15} color="#2563eb" />
              <span>Unverified contacts</span>
            </div>

            <div className="sidebar-bottom-action">
              <button className="need-help-btn" onClick={() => showToast('Opening Diagnostics Support Docs')}>
                Need help?
              </button>
            </div>
          </aside>

          {/* Right Main Content Card */}
          <main className="diagnostics-right-content">
            <div className="diag-main-card">
              
              {/* Header Title + Dropdown */}
              <div className="diag-header-row">
                <h3 className="diag-card-title">Sequences with the Most Unverified Emails</h3>

                <button className="white-dropdown-btn sort-btn" onClick={() => showToast('Filter options')}>
                  <SlidersHorizontal size={14} color="#64748b" />
                  <span>Unverified</span>
                  <ChevronDown size={14} color="#64748b" />
                </button>
              </div>

              {/* Subtitle instructions */}
              <p className="diag-subtext">
                Select the sequence to see the unverified contacts that can be paused or remove the contacts from the sequence
              </p>

              {/* Card Body Empty State */}
              <div className="diag-empty-card-body">
                <span className="no-seq-found-text">No Sequences Found</span>
              </div>

            </div>
          </main>

        </div>
      )}

      {/* ── FLOATING HELP QUESTION MARK BUTTON (1:1 SCREENSHOT) ── */}
      <button 
        className="sequences-floating-help-btn"
        title="Help & Documentation"
        onClick={() => showToast('Opening Sequences Documentation...')}
      >
        <span className="help-question-mark">?</span>
      </button>

      {/* ── LINK MAILBOX MODAL ── */}
      {mailboxModalOpen && (
        <div className="prospect-drawer-backdrop" onClick={() => setMailboxModalOpen(false)}>
          <div className="create-search-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header-bar">
              <h2 className="drawer-title-text">Link your Mailbox</h2>
              <button className="drawer-close-btn" onClick={() => setMailboxModalOpen(false)}><X size={18} /></button>
            </div>
            <div className="drawer-body-content">
              <p style={{ fontSize: 13, color: '#475569' }}>Select your email provider to link your mailbox and start sending automated outreach campaigns.</p>
              
              <div className="mailbox-provider-cards">
                <button 
                  className="provider-card-btn"
                  onClick={() => {
                    setMailboxModalOpen(false);
                    showToast('Successfully connected Google Workspace (Gmail) mailbox!');
                  }}
                >
                  <span className="provider-icon">G</span>
                  <span>Connect Google Workspace / Gmail</span>
                </button>

                <button 
                  className="provider-card-btn"
                  onClick={() => {
                    setMailboxModalOpen(false);
                    showToast('Successfully connected Microsoft Outlook 365 mailbox!');
                  }}
                >
                  <span className="provider-icon" style={{ background: '#0078d4' }}>M</span>
                  <span>Connect Microsoft Outlook 365</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TERMS OF SERVICES MODAL ── */}
      {termsModalOpen && (
        <div className="terms-modal-backdrop" onClick={() => setTermsModalOpen(false)}>
          <div className="terms-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="terms-close-icon" onClick={() => setTermsModalOpen(false)}>
              <X size={20} color="#64748b" />
            </button>
            
            <div className="terms-modal-body">
              <div className="terms-illustration">
                <div className="doc-icon blue">
                  <div className="doc-line top"></div>
                  <div className="doc-line mid"></div>
                  <div className="doc-line bottom"></div>
                </div>
                <div className="doc-icon light-blue">
                  <div className="doc-line top"></div>
                  <div className="doc-line mid"></div>
                  <div className="doc-line bottom"></div>
                </div>
              </div>

              <h2 className="terms-modal-title">Agree to Terms of Services</h2>
              <p className="terms-modal-desc">
                I will comply with Apollo's <span className="blue-link-text">Terms of Service</span> when sending emails. I agree not to send any spam or harassing emails (commercial or otherwise).
              </p>

              <div className="terms-modal-actions">
                <button className="yellow-primary-btn full-width-btn" onClick={handleAcceptTerms}>
                  I will comply
                </button>
                <button className="decline-text-btn" onClick={() => setTermsModalOpen(false)}>
                  I decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 1:1 CREATE SEQUENCE MODAL / DRAWER ── */}
      {createModalOpen && (
        <div className="prospect-drawer-backdrop" onClick={() => setCreateModalOpen(false)}>
          <div className="create-search-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header-bar">
              <h2 className="drawer-title-text">
                {createWithAI ? 'Create AI Sequence' : 'Create sequence'}
              </h2>
              <button className="drawer-close-btn" onClick={() => setCreateModalOpen(false)}><X size={18} /></button>
            </div>

            <div className="drawer-body-content">
              <div className="form-field-group">
                <label className="field-label-required">
                  Sequence name <span className="red-star">*</span>
                </label>
                <div className={`input-with-error-wrap ${nameError && !sequenceName.trim() ? 'has-error' : ''}`}>
                  <input 
                    type="text" 
                    placeholder="e.g. Q3 VP of Sales Cold Outreach"
                    value={sequenceName}
                    onChange={(e) => {
                      setSequenceName(e.target.value);
                      if (e.target.value.trim()) setNameError(false);
                    }}
                    className="create-search-input"
                    autoFocus
                  />
                  {nameError && !sequenceName.trim() && (
                    <span className="error-alert-icon">!</span>
                  )}
                </div>
                {nameError && !sequenceName.trim() && (
                  <span className="error-message-text">This field is required.</span>
                )}
              </div>

              <div className="drawer-sub-section">
                <div className="section-meta-label">Sequence Template</div>
                <div className="section-row-item">
                  <div className="row-left">
                    <Mail size={16} color="#2563eb" />
                    <span>3-Step Cold Outbound (Email + Follow-up + Call)</span>
                  </div>
                  <div className="row-right">
                    <span className="count-badge-grey">Recommended</span>
                  </div>
                </div>
              </div>

              <div className="drawer-sub-section">
                <div className="section-meta-label">More settings</div>
                <div className="section-row-item">
                  <div className="row-left">
                    <Lock size={16} color="#475569" />
                    <span>Permissions and sharing</span>
                  </div>
                  <div className="row-right">
                    <span className="text-val-grey">Shared with Team</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="drawer-footer-actions">
              <button className="cancel-text-btn" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </button>
              <button 
                className="create-search-yellow-btn"
                onClick={handleCreateSequence}
              >
                Create sequence
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
