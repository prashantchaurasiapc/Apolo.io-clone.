import React, { useState } from 'react';
import { X, Check, ArrowLeft, UserPlus, Loader2 } from 'lucide-react';
import './SignupModal.css';

export default function SignupModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [view, setView] = useState('form'); // 'form' | 'google' | 'microsoft' | 'loading' | 'success'
  const [selectedUser, setSelectedUser] = useState(null);

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
    <div className="signup-modal-overlay" onClick={onClose}>
      <div 
        className={`signup-modal-card ${view === 'google' || view === 'microsoft' ? 'oauth-card' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="signup-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* 1. DEFAULT APOLLO FORM VIEW */}
        {view === 'form' && (
          <>
            <h2 className="signup-modal-title">
              Sign up for Apollo —<br />free forever
            </h2>
            <p className="signup-modal-subtitle">
              Find, contact, and close your ideal buyers with over 240 million contacts in one, easy-to-use AI sales platform.
            </p>

            <form onSubmit={handleEmailSubmit} className="signup-modal-form">
              <input
                type="email"
                className="signup-modal-input"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
              <button type="submit" className="signup-modal-btn-yellow">
                Sign up for free
              </button>
            </form>

            <div className="signup-modal-divider">
              <div className="signup-divider-line" />
              <span className="signup-divider-text">or</span>
              <div className="signup-divider-line" />
            </div>

            <div className="signup-modal-socials">
              <button 
                type="button" 
                className="signup-social-btn" 
                onClick={() => setView('google')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Sign up with Google</span>
              </button>

              <button 
                type="button" 
                className="signup-social-btn" 
                onClick={() => setView('microsoft')}
              >
                <svg width="18" height="18" viewBox="0 0 21 21">
                  <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                  <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                  <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                  <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
                </svg>
                <span>Sign up with Microsoft</span>
              </button>
            </div>

            <p className="signup-modal-terms">
              By signing up, I agree to Apollo's <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.
            </p>
          </>
        )}

        {/* 2. GOOGLE ACCOUNT CHOOSER VIEW */}
        {view === 'google' && (
          <div className="oauth-panel">
            <button className="oauth-back-btn" onClick={() => setView('form')}>
              <ArrowLeft size={16} /> Back
            </button>

            <div className="google-header">
              <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginBottom: 12 }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <h3 className="oauth-title">Choose an account</h3>
              <p className="oauth-subtitle">to continue to <strong>Apollo.io</strong></p>
            </div>

            <div className="oauth-accounts-list">
              {googleAccounts.map((acc, i) => (
                <div 
                  key={i} 
                  className="oauth-account-row" 
                  onClick={() => handleAccountSelect(acc)}
                >
                  <div className="oauth-avatar" style={{ backgroundColor: acc.avatarBg }}>
                    {acc.initial}
                  </div>
                  <div className="oauth-account-info">
                    <div className="oauth-account-name">{acc.name}</div>
                    <div className="oauth-account-email">{acc.email}</div>
                  </div>
                  <div className="oauth-account-status">{acc.signedIn}</div>
                </div>
              ))}

              <div 
                className="oauth-account-row oauth-use-another" 
                onClick={() => handleAccountSelect({ name: 'New User', email: 'user@gmail.com' })}
              >
                <div className="oauth-avatar oauth-avatar-another">
                  <UserPlus size={18} />
                </div>
                <div className="oauth-account-info">
                  <div className="oauth-account-name">Use another account</div>
                </div>
              </div>
            </div>

            <p className="oauth-disclaimer">
              To continue, Google will share your name, email address, language preference, and profile picture with Apollo.io. Before using this app, you can review Apollo.io's <a href="#privacy">Privacy Policy</a> and <a href="#terms">Terms of Service</a>.
            </p>
          </div>
        )}

        {/* 3. MICROSOFT ACCOUNT CHOOSER VIEW */}
        {view === 'microsoft' && (
          <div className="oauth-panel">
            <button className="oauth-back-btn" onClick={() => setView('form')}>
              <ArrowLeft size={16} /> Back
            </button>

            <div className="google-header">
              <svg width="24" height="24" viewBox="0 0 21 21" style={{ marginBottom: 12 }}>
                <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
              </svg>
              <h3 className="oauth-title">Pick an account</h3>
              <p className="oauth-subtitle">to continue to <strong>Apollo.io</strong></p>
            </div>

            <div className="oauth-accounts-list">
              {microsoftAccounts.map((acc, i) => (
                <div 
                  key={i} 
                  className="oauth-account-row" 
                  onClick={() => handleAccountSelect(acc)}
                >
                  <div className="oauth-avatar" style={{ backgroundColor: acc.avatarBg }}>
                    {acc.initial}
                  </div>
                  <div className="oauth-account-info">
                    <div className="oauth-account-name">{acc.name}</div>
                    <div className="oauth-account-email">{acc.email}</div>
                  </div>
                  <div className="oauth-account-status">{acc.signedIn}</div>
                </div>
              ))}

              <div 
                className="oauth-account-row oauth-use-another" 
                onClick={() => handleAccountSelect({ name: 'Microsoft User', email: 'user@outlook.com' })}
              >
                <div className="oauth-avatar oauth-avatar-another">
                  <UserPlus size={18} />
                </div>
                <div className="oauth-account-info">
                  <div className="oauth-account-name">Use another account</div>
                </div>
              </div>
            </div>

            <p className="oauth-disclaimer">
              To continue, Microsoft will share your name and email with Apollo.io. Review Apollo's <a href="#privacy">Privacy Statement</a>.
            </p>
          </div>
        )}

        {/* 4. LOADING STATE */}
        {view === 'loading' && (
          <div className="oauth-loading">
            <Loader2 size={36} className="oauth-spinner" />
            <h3 className="oauth-loading-title">Connecting to Apollo.io...</h3>
            <p className="oauth-loading-subtitle">Signing in as {selectedUser?.email}</p>
          </div>
        )}

        {/* 5. SUCCESS STATE */}
        {view === 'success' && (
          <div className="signup-modal-success">
            <div className="signup-success-icon">
              <Check size={28} />
            </div>
            <h3 className="signup-success-title">Welcome to Apollo!</h3>
            <p className="signup-success-desc">
              Logged in as <strong>{selectedUser?.name || 'User'}</strong> ({selectedUser?.email}). Start exploring 275M+ verified contacts and launch your first AI sequence.
            </p>
            <button className="signup-modal-btn-yellow" onClick={onClose} style={{ marginTop: '20px', width: '100%' }}>
              Get Started Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

