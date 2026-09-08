import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Phone, Link2, List, GitBranch, MailOpen } from 'lucide-react';
import './LoginPage.css';

/* ─── SVG Icons ─── */
const ApolloStarIcon = () => (
  <svg className="login-top-logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" fill="#D4FF00"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
  </svg>
);

const MicrosoftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M0 0h8.571v8.571H0V0Z" fill="#F25022"/>
    <path d="M9.429 0H18v8.571H9.429V0Z" fill="#7FBA00"/>
    <path d="M0 9.429h8.571V18H0V9.429Z" fill="#00A4EF"/>
    <path d="M9.429 9.429H18V18H9.429V9.429Z" fill="#FFB900"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.78 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
  </svg>
);

const OrgIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const PencilIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const ChromeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" fill="#fff"/>
    <path d="M12 8h8.45A10 10 0 1 0 12 22" stroke="#fff" strokeWidth="0" fill="none"/>
    <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="1.5" fill="none"/>
    <path d="M12 8h8.45" stroke="#EA4335" strokeWidth="2"/>
    <path d="M4.22 14 8 8" stroke="#34A853" strokeWidth="2"/>
    <path d="M7.55 20.45 12 12" stroke="#4285F4" strokeWidth="2" transform="rotate(120 12 12)"/>
  </svg>
);

/* ─── Extension Mockup Card ─── */
const ExtensionMockup = () => (
  <div className="login-extension-mockup">
    {/* Background browser window */}
    <div className="ext-bg-window">
      <div className="ext-bg-dots">
        <div className="ext-bg-dot" />
        <div className="ext-bg-dot" />
        <div className="ext-bg-dot" />
      </div>
    </div>

    {/* Main Apollo extension card */}
    <div className="ext-card">
      {/* Header */}
      <div className="ext-card-header">
        <div className="ext-header-left">
          <svg className="ext-logo-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" fill="#D4FF00"/>
          </svg>
          <span className="ext-logo-text">Apollo</span>
        </div>
        <div className="ext-close-btn">
          <svg width="8" height="8" viewBox="0 0 8 8">
            <line x1="1" y1="1" x2="7" y2="7" stroke="#999" strokeWidth="1.5"/>
            <line x1="7" y1="1" x2="1" y2="7" stroke="#999" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>

      {/* Person / Company Tabs */}
      <div className="ext-tabs">
        <div className="ext-tab active-tab">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="white" style={{marginRight: 4}}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" fill="none"/>
          </svg>
          Person
        </div>
        <div className="ext-tab inactive-tab">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{marginRight: 4}}>
            <rect x="2" y="7" width="20" height="14" rx="2" stroke="#888" strokeWidth="2"/>
            <path d="M16 7V5a2 2 0 0 0-4 0v2" stroke="#888" strokeWidth="2"/>
          </svg>
          Company
        </div>
      </div>

      {/* Person info */}
      <div className="ext-person-info">
        <div className="ext-person-name">Matt Curl</div>
        <div className="ext-person-role">CEO at Apollo</div>
        <div className="ext-match-badge">Excellent match</div>
      </div>

      {/* Action buttons */}
      <div className="ext-actions">
        <div className="ext-action-btn">
          <List size={13} color="#444" />
          <span>Add to list</span>
        </div>
        <div className="ext-action-btn">
          <GitBranch size={13} color="#444" />
          <span>Add to Sequence</span>
        </div>
        <div className="ext-action-btn">
          <MailOpen size={13} color="#444" />
          <span>Compose email</span>
        </div>
      </div>

      {/* Contact info */}
      <div className="ext-contact-rows">
        <div className="ext-contact-row">
          <Mail size={13} color="#888" />
          <div>
            <div className="ext-contact-value">mc@apollo.io</div>
            <div className="ext-contact-type">Work</div>
          </div>
        </div>
        <div className="ext-contact-row">
          <Phone size={13} color="#888" />
          <div>
            <div className="ext-contact-value">(123) 456-7890</div>
            <div className="ext-contact-type">Mobile</div>
          </div>
        </div>
      </div>

      {/* Social icons */}
      <div className="ext-social-row">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#D4FF00">
          <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z"/>
        </svg>
        {/* LinkedIn */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#888">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
        <Link2 size={14} color="#888" />
        {/* X / Twitter */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#888">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.727-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </div>
    </div>
  </div>
);

/* ─── Main Component ─── */
export default function LoginPage({ onClose, onSignupClick }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSigned, setKeepSigned] = useState(true);
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-page">
      {/* Top-left Apollo logo */}
      <button className="login-top-logo" onClick={onClose} aria-label="Go to homepage">
        <ApolloStarIcon />
        <span className="login-top-logo-text">Apollo</span>
      </button>

      {/* ── Left Panel ── */}
      <div className="login-left">
        {/* Log In / Sign Up tabs */}
        <div className="login-tabs">
          <button
            className={`login-tab ${activeTab === 'login' ? 'active' : 'inactive'}`}
            onClick={() => setActiveTab('login')}
          >
            Log In
          </button>
          <button
            className={`login-tab ${activeTab === 'signup' ? 'active' : 'inactive'}`}
            onClick={() => {
              if (onSignupClick) {
                onSignupClick();
              } else {
                setActiveTab('signup');
              }
            }}
          >
            <PencilIcon />
            Sign Up
          </button>
        </div>

        {/* Social auth buttons */}
        <div className="login-social-btns">
          <button className="login-social-btn" type="button">
            <GoogleIcon />
            Log In with Google
          </button>
          <button className="login-social-btn" type="button">
            <MicrosoftIcon />
            Log In with Microsoft
          </button>
          <button className="login-social-btn" type="button">
            <AppleIcon />
            Sign in with Apple
          </button>
          <button className="login-social-btn" type="button">
            <OrgIcon />
            Log In with your Organization
          </button>
        </div>

        {/* Or divider */}
        <div className="login-divider">
          <div className="login-divider-line" />
          <span className="login-divider-text">Or</span>
          <div className="login-divider-line" />
        </div>

        {/* Email & Password form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label" htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              className="login-input"
              placeholder="Work Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="login-password">Password</label>
            <div className="login-password-wrap">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="login-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="login-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit-btn">Log In</button>
        </form>

        {/* Keep me signed in + forgot password */}
        <div className="login-bottom-row">
          <label className="login-keep-signed">
            <input
              type="checkbox"
              checked={keepSigned}
              onChange={(e) => setKeepSigned(e.target.checked)}
            />
            <span>Keep me signed in</span>
          </label>
          <button className="login-forgot" type="button">Forgot password?</button>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p>2026 All Rights Reserved.</p>
          <p>
            <a href="#privacy">Privacy</a> and <a href="#terms">Terms.</a>
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="login-right">
        <div className="login-right-shape" />
        <div className="login-right-content">
          <ExtensionMockup />
          <div className="login-right-stat">
            <div className="login-right-stat-num">1,000,000+</div>
            <p className="login-right-stat-desc">
              Salespeople and marketers use our extension to prospect, connect, and convert leads faster.
            </p>
            <button className="login-ext-cta-btn">
              <ChromeIcon />
              Get Apollo Chrome Extension
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
