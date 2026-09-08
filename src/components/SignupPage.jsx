import React, { useState, useEffect } from 'react';
import { 
  Search, Users, Building2, Mail, Workflow, Phone, 
  Settings, HelpCircle, Sparkles, Check, X, ArrowLeft, 
  ChevronDown, Plus, Copy, Send, Filter, TrendingDown,
  UserPlus, Loader2, BarChart3
} from 'lucide-react';
import './SignupPage.css';

export default function SignupPage({ onClose, onLoginClick, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [view, setView] = useState('form'); // 'form' | 'google' | 'microsoft' | 'loading' | 'success'
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDashboardRedirect = () => {
    if (onLoginSuccess) {
      onLoginSuccess({
        name: selectedUser?.name || 'Explorer',
        email: selectedUser?.email || email || 'user@apollo.io',
        provider: 'Apollo Signup',
        avatar: (selectedUser?.name || 'E').substring(0, 1).toUpperCase()
      });
    } else if (onClose) {
      onClose();
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSelectedUser({ name: email.split('@')[0], email: email });
      setView('success');
    }
  };

  const handleAccountSelect = (account) => {
    setSelectedUser(account);
    setView('loading');
    setTimeout(() => {
      setView('success');
    }, 900);
  };

  const googleAccounts = [
    {
      name: 'Shivam Ahirwar',
      email: 'shivamahirwar@gmail.com',
      avatarBg: '#8b5cf6',
      initial: 'S',
      signedIn: 'Signed in',
    },
    {
      name: 'Shivam Ahirwar (Work)',
      email: 'shivam@apollo-sales.io',
      avatarBg: '#0d9488',
      initial: 'S',
      signedIn: 'Signed in',
    },
  ];

  const microsoftAccounts = [
    {
      name: 'Shivam Ahirwar',
      email: 'shivam@outlook.com',
      avatarBg: '#0284c7',
      initial: 'S',
      signedIn: 'Connected',
    },
    {
      name: 'Shivam Ahirwar (Enterprise)',
      email: 'shivam.a@enterprise.com',
      avatarBg: '#4f46e5',
      initial: 'S',
      signedIn: 'Work account',
    },
  ];

  return (
    <div className="signup-page-container">
      {/* ─────────────────────────────────────────────────────────────
          1. BACKGROUND LAYER: AUTHENTIC APOLLO APPLICATION INTERFACE
          (Exactly as visible in the user's reference screenshot)
         ───────────────────────────────────────────────────────────── */}
      <div className="apollo-app-viewport" aria-hidden="true">
        {/* Top Navigation Bar */}
        <header className="apollo-topbar">
          <div className="apollo-topbar-left">
            {/* Apollo circular logo */}
            <div className="apollo-circle-badge">
              <span className="apollo-orbit-dot" />
            </div>

            {/* Search across Apollo */}
            <div className="apollo-search-box">
              <Search size={15} className="apollo-search-icon" />
              <span className="apollo-search-placeholder">Search across Apollo...</span>
              <kbd className="apollo-search-kbd">⌘ K</kbd>
            </div>
          </div>

          <div className="apollo-topbar-right">
            <button className="apollo-execute-btn" type="button" tabIndex={-1}>
              <Sparkles size={14} className="sparkle-icon" />
              <span>Execute with AI</span>
            </button>
            <div className="apollo-user-avatar">
              <span>SH</span>
            </div>
          </div>
        </header>

        {/* Layout Body: Left Rail + Main Content + Right AI Panel */}
        <div className="apollo-layout-body">
          {/* Left Icon Rail */}
          <aside className="apollo-left-rail">
            <div className="rail-top-icons">
              <div className="rail-icon-btn active" title="Search">
                <Search size={19} />
              </div>
              <div className="rail-icon-btn" title="People / Contacts">
                <Users size={19} />
              </div>
              <div className="rail-icon-btn" title="Companies">
                <Building2 size={19} />
              </div>
              <div className="rail-icon-btn email-active" title="Emails">
                <Mail size={19} />
                <span className="active-dot" />
              </div>
              <div className="rail-icon-btn" title="Sequences">
                <Workflow size={19} />
              </div>
              <div className="rail-icon-btn" title="Calls / Dialer">
                <Phone size={19} />
              </div>
              <div className="rail-icon-btn" title="Analytics">
                <BarChart3 size={19} />
              </div>
              <div className="rail-icon-btn" title="Settings">
                <Settings size={19} />
              </div>
            </div>

            <div className="rail-bottom-icons">
              <div className="rail-icon-btn" title="Help & Support">
                <HelpCircle size={19} />
              </div>
              {/* Distinctive bright yellow Apollo tile at bottom left */}
              <div className="apollo-yellow-tile" title="Apollo.io">
                <span className="yellow-tile-letter">A</span>
              </div>
            </div>
          </aside>

          {/* Main Workspace Area: Emails & Analytics Dashboard */}
          <main className="apollo-main-content">
            {/* Header & Tabs */}
            <div className="emails-header-row">
              <div className="emails-title-group">
                <h1 className="emails-title">Emails</h1>
                <div className="emails-tabs-nav">
                  <span className="emails-tab">All emails</span>
                  <span className="emails-tab">Templates</span>
                  <span className="emails-tab active">Analytics</span>
                </div>
              </div>
              <button className="apollo-yellow-pill-btn" type="button" tabIndex={-1}>
                Go to Analytics
              </button>
            </div>

            {/* Filter toolbar */}
            <div className="emails-filter-toolbar">
              <div className="filter-dropdown-pill">
                <span>Select timeframe</span>
                <ChevronDown size={14} />
              </div>
              <button className="add-filter-btn" type="button" tabIndex={-1}>
                <Plus size={14} />
                <span>Add filter</span>
              </button>
            </div>

            {/* Email Stats Section */}
            <div className="stats-section">
              <h2 className="section-title">Email Stats</h2>
              <div className="stats-row">
                <div className="stat-card">
                  <span className="stat-label"># Emails sent</span>
                  <div className="stat-value-row">
                    <span className="stat-number">11</span>
                    <span className="stat-trend-badge red">
                      <TrendingDown size={12} /> 50 From Mar 2
                    </span>
                  </div>
                </div>

                <div className="stat-card">
                  <span className="stat-label"># Emails opened</span>
                  <div className="stat-value-row">
                    <span className="stat-number">1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Funnel Chart */}
            <div className="funnel-section">
              <h2 className="section-title">Email Funnel</h2>
              
              <div className="funnel-chart-container">
                {/* Y-axis percentages */}
                <div className="funnel-y-axis">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>

                {/* 5 Funnel Bars */}
                <div className="funnel-bars-track">
                  {/* Grid background lines */}
                  <div className="chart-grid-line line-100" />
                  <div className="chart-grid-line line-75" />
                  <div className="chart-grid-line line-50" />
                  <div className="chart-grid-line line-25" />

                  {/* Bar 1: # Emails delivered (100% - 11) */}
                  <div className="funnel-col">
                    <div className="col-top-metric">
                      <span className="col-pct">100%</span>
                      <span className="col-count">11</span>
                    </div>
                    <div className="bar-wrapper">
                      <div className="funnel-bar bar-blue full-height" />
                    </div>
                    <span className="col-name"># Emails delivered</span>
                  </div>

                  {/* Bar 2: # Emails opened (33% - 1) */}
                  <div className="funnel-col">
                    <div className="col-top-metric">
                      <span className="col-pct">33%</span>
                      <span className="col-count">1</span>
                    </div>
                    <div className="bar-wrapper">
                      <div className="funnel-bar bar-two-tone">
                        <div className="two-tone-top" />
                        <div className="two-tone-bottom" />
                      </div>
                    </div>
                    <span className="col-name"># Emails opened (del...</span>
                  </div>

                  {/* Bar 3: # Emails clicked */}
                  <div className="funnel-col">
                    <div className="col-top-metric">
                      <span className="col-pct">0%</span>
                      <span className="col-count">0</span>
                    </div>
                    <div className="bar-wrapper">
                      <div className="funnel-bar bar-subtle" style={{ height: '8%' }} />
                    </div>
                    <span className="col-name"># Emails clicked (link...</span>
                  </div>

                  {/* Bar 4: # Emails replied */}
                  <div className="funnel-col">
                    <div className="col-top-metric">
                      <span className="col-pct">0%</span>
                      <span className="col-count">0</span>
                    </div>
                    <div className="bar-wrapper">
                      <div className="funnel-bar bar-subtle" style={{ height: '5%' }} />
                    </div>
                    <span className="col-name"># Emails replied</span>
                  </div>

                  {/* Bar 5: # Emails interested */}
                  <div className="funnel-col">
                    <div className="col-top-metric">
                      <span className="col-pct">0%</span>
                      <span className="col-count">0</span>
                    </div>
                    <div className="bar-wrapper">
                      <div className="funnel-bar bar-subtle" style={{ height: '5%' }} />
                    </div>
                    <span className="col-name"># Emails interested</span>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Right Sidebar: AI TAM Assistant Panel */}
          <aside className="apollo-right-panel">
            <div className="tam-panel-header">
              <div className="tam-header-title">
                <Sparkles size={16} className="tam-sparkle" />
                <span>Build me a structure...</span>
                <ChevronDown size={14} />
              </div>
              <div className="tam-header-actions">
                <Plus size={15} />
                <Copy size={15} />
                <X size={15} />
              </div>
            </div>

            <div className="tam-panel-body">
              <p className="tam-intro-text">
                Here to create a structured view of <strong>736 companies</strong> that match your Total Addressable Market criteria.
              </p>

              {/* Current TAM Structure Block */}
              <div className="tam-structure-block">
                <div className="block-title">
                  <span className="block-icon">🎯</span>
                  <strong>Current TAM Structure</strong>
                </div>
                <p className="block-desc">Your view now shows companies that are:</p>
                <ul className="tam-bullet-list">
                  <li><strong>Scaling sales operations</strong> (11-5,000 employees)</li>
                  <li><strong>Actively hiring</strong> for sales roles (SDRs, AEs, Sales Managers in last 6 months)</li>
                  <li><strong>Qualified prospects</strong> (Good company score or above)</li>
                  <li><strong>In key markets</strong> (USA, UK, Canada, Australia, Western Europe)</li>
                </ul>
              </div>

              {/* Next Steps to Refine TAM Block */}
              <div className="tam-structure-block">
                <div className="block-title">
                  <span className="block-icon">ℹ️</span>
                  <strong>Next Steps to Refine Your TAM</strong>
                </div>
                <p className="block-desc">You can now:</p>
                <ul className="tam-bullet-list">
                  <li><strong>Apply Precision Filters</strong> to narrow to high-intent decision makers (funding status, seniority levels, verified emails)</li>
                  <li><strong>Research these companies</strong> to gather deeper insights (tech stack, growth signals, pain points)</li>
                  <li><strong>Export this TAM</strong> to your CRM for strategic planning</li>
                  <li><strong>Add to a list</strong> to organize and track your addressable market</li>
                </ul>
                <p className="tam-prompt-question">
                  Would you like to refine further with precision filters, or proceed with one of the actions above?
                </p>
              </div>

              {/* Quick Action Chips */}
              <div className="tam-action-chips">
                <button type="button" className="tam-chip" tabIndex={-1}>Apply precision filters</button>
                <button type="button" className="tam-chip" tabIndex={-1}>Research these TAM accounts</button>
                <button type="button" className="tam-chip" tabIndex={-1}>Add all TAM to a list</button>
                <button type="button" className="tam-chip" tabIndex={-1}>Export to CSV</button>
              </div>
            </div>

            {/* Bottom Chat Bar */}
            <div className="tam-panel-footer">
              <div className="tam-chat-input-wrapper">
                <span className="tam-chat-placeholder">Message Assistant...</span>
                <button type="button" className="tam-send-btn" tabIndex={-1}>
                  <Send size={14} />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FOREGROUND LAYER: THE EXACT SIGNUP POPUP MODAL
          (Centered over the blurred Apollo dashboard)
         ───────────────────────────────────────────────────────────── */}
      <div className="signup-overlay-backdrop" onClick={onClose}>
        <div 
          className={`signup-center-modal ${view === 'google' || view === 'microsoft' ? 'oauth-mode' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close 'X' Button */}
          {onClose && (
            <button 
              className="signup-close-btn" 
              onClick={onClose} 
              aria-label="Close and return to login"
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          )}

          {/* 2.1 DEFAULT SCREENSHOT MATCHING FORM VIEW */}
          {view === 'form' && (
            <div className="signup-inner-content">
              {/* Exact Title from Reference Screenshot */}
              <h2 className="signup-hero-title">
                Sign up for Apollo —<br />free forever
              </h2>

              {/* Exact Subtitle */}
              <p className="signup-hero-subtitle">
                Find, contact, and close your ideal buyers with over 240 million contacts in one, easy-to-use AI sales platform.
              </p>

              {/* Inline Form: Enter email + Sign up for free */}
              <form onSubmit={handleEmailSubmit} className="signup-inline-form">
                <input
                  type="email"
                  className="signup-text-input"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
                <button type="submit" className="signup-yellow-cta-btn">
                  Sign up for free
                </button>
              </form>

              {/* Centered 'or' divider */}
              <div className="signup-or-divider">
                <div className="or-line" />
                <span className="or-label">or</span>
                <div className="or-line" />
              </div>

              {/* Social Login Buttons in Two Columns */}
              <div className="signup-social-grid">
                {/* Google Button */}
                <button 
                  type="button" 
                  className="signup-provider-btn"
                  onClick={() => setView('google')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" className="provider-logo">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Sign up with Google</span>
                </button>

                {/* Microsoft Button */}
                <button 
                  type="button" 
                  className="signup-provider-btn"
                  onClick={() => setView('microsoft')}
                >
                  <svg width="18" height="18" viewBox="0 0 21 21" className="provider-logo">
                    <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                    <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                    <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                    <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
                  </svg>
                  <span>Sign up with Microsoft</span>
                </button>
              </div>

              {/* Terms of Service & Privacy Policy disclaimer */}
              <p className="signup-disclaimer-text">
                By signing up, I agree to Apollo's <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.
              </p>

              {/* Quick switch to Login */}
              {onLoginClick && (
                <div className="signup-login-switch">
                  <span>Already have an account?</span>{' '}
                  <button type="button" onClick={onLoginClick} className="signup-login-link">
                    Log in
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 2.2 INTERACTIVE GOOGLE ACCOUNT CHOOSER VIEW */}
          {view === 'google' && (
            <div className="oauth-panel-container">
              <button className="oauth-nav-back-btn" onClick={() => setView('form')}>
                <ArrowLeft size={16} /> Back to Sign up
              </button>

              <div className="oauth-brand-header">
                <svg width="28" height="28" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <h3 className="oauth-brand-title">Choose an account</h3>
                <p className="oauth-brand-sub">to continue to <strong>Apollo.io</strong></p>
              </div>

              <div className="oauth-accounts-group">
                {googleAccounts.map((acc, i) => (
                  <div 
                    key={i} 
                    className="oauth-account-item" 
                    onClick={() => handleAccountSelect(acc)}
                  >
                    <div className="oauth-item-avatar" style={{ backgroundColor: acc.avatarBg }}>
                      {acc.initial}
                    </div>
                    <div className="oauth-item-text">
                      <div className="oauth-item-name">{acc.name}</div>
                      <div className="oauth-item-email">{acc.email}</div>
                    </div>
                    <div className="oauth-item-badge">{acc.signedIn}</div>
                  </div>
                ))}

                <div 
                  className="oauth-account-item oauth-add-new" 
                  onClick={() => handleAccountSelect({ name: 'New User', email: 'user@gmail.com' })}
                >
                  <div className="oauth-item-avatar oauth-add-icon">
                    <UserPlus size={18} />
                  </div>
                  <div className="oauth-item-text">
                    <div className="oauth-item-name">Use another account</div>
                  </div>
                </div>
              </div>

              <p className="oauth-footer-privacy">
                Google will share your name, email address, language preference, and profile picture with Apollo.io.
              </p>
            </div>
          )}

          {/* 2.3 INTERACTIVE MICROSOFT ACCOUNT CHOOSER VIEW */}
          {view === 'microsoft' && (
            <div className="oauth-panel-container">
              <button className="oauth-nav-back-btn" onClick={() => setView('form')}>
                <ArrowLeft size={16} /> Back to Sign up
              </button>

              <div className="oauth-brand-header">
                <svg width="26" height="26" viewBox="0 0 21 21">
                  <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                  <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                  <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                  <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
                </svg>
                <h3 className="oauth-brand-title">Pick an account</h3>
                <p className="oauth-brand-sub">to continue to <strong>Apollo.io</strong></p>
              </div>

              <div className="oauth-accounts-group">
                {microsoftAccounts.map((acc, i) => (
                  <div 
                    key={i} 
                    className="oauth-account-item" 
                    onClick={() => handleAccountSelect(acc)}
                  >
                    <div className="oauth-item-avatar" style={{ backgroundColor: acc.avatarBg }}>
                      {acc.initial}
                    </div>
                    <div className="oauth-item-text">
                      <div className="oauth-item-name">{acc.name}</div>
                      <div className="oauth-item-email">{acc.email}</div>
                    </div>
                    <div className="oauth-item-badge">{acc.signedIn}</div>
                  </div>
                ))}

                <div 
                  className="oauth-account-item oauth-add-new" 
                  onClick={() => handleAccountSelect({ name: 'Work User', email: 'user@outlook.com' })}
                >
                  <div className="oauth-item-avatar oauth-add-icon">
                    <UserPlus size={18} />
                  </div>
                  <div className="oauth-item-text">
                    <div className="oauth-item-name">Use another account</div>
                  </div>
                </div>
              </div>

              <p className="oauth-footer-privacy">
                Microsoft will share your name and email with Apollo.io.
              </p>
            </div>
          )}

          {/* 2.4 LOADING ANIMATION VIEW */}
          {view === 'loading' && (
            <div className="signup-status-view">
              <Loader2 size={40} className="signup-spinner" />
              <h3 className="status-heading">Creating your free Apollo workspace...</h3>
              <p className="status-subtext">Connecting as {selectedUser?.email}</p>
            </div>
          )}

          {/* 2.5 SUCCESS WELCOME VIEW */}
          {view === 'success' && (
            <div className="signup-status-view success-mode">
              <div className="signup-check-circle">
                <Check size={32} />
              </div>
              <h3 className="status-heading">Welcome to Apollo, {selectedUser?.name || 'Explorer'}!</h3>
              <p className="status-subtext">
                Your free forever account is ready with <strong>{selectedUser?.email}</strong>. Explore 275M+ verified buyer profiles, execute AI lead scoring, and start closing deals.
              </p>
              <button 
                type="button" 
                className="signup-yellow-cta-btn" 
                onClick={handleDashboardRedirect}
                style={{ marginTop: 24, width: '100%' }}
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
