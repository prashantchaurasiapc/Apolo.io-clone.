import React, { useState } from 'react';
import './ComparisonBanner.css';

export default function ComparisonBanner({ onSignupClick }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    if (onSignupClick) {
      onSignupClick();
    } else {
      setSubmitted(true);
    }
  };

  return (
    <section className="why-buy-five-section" id="platform">
      <div className="why-buy-five-container">
        {/* Left Column: Headline, Description, Form */}
        <div className="why-buy-five-left">
          <h2 className="why-buy-five-title">
            Why buy five tools<br />when one does it<br />better?
          </h2>

          <p className="why-buy-five-desc">
            Apollo replaces your data provider, outreach platform, dialer, enrichment, and CRM—saving teams thousands each year.
          </p>

          <div className="why-buy-five-form-wrap">
            {submitted ? (
              <div className="why-buy-five-success">
                Thank you! Check your email to get started.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="why-buy-five-form">
                <input
                  type="email"
                  className="why-buy-five-input"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="why-buy-five-submit">
                  Get started for free
                </button>
              </form>
            )}

            <div className="why-buy-five-divider">
              <span>or</span>
            </div>

            <div className="why-buy-five-social-row">
              {/* Google Button */}
              <button 
                type="button" 
                className="why-buy-five-social-btn" 
                aria-label="Sign up with Google"
                onClick={() => {
                  if (onSignupClick) onSignupClick();
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              </button>

              {/* Microsoft Button */}
              <button 
                type="button" 
                className="why-buy-five-social-btn" 
                aria-label="Sign up with Microsoft"
                onClick={() => {
                  if (onSignupClick) onSignupClick();
                }}
              >
                <svg width="18" height="18" viewBox="0 0 21 21">
                  <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                  <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                  <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                  <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
                </svg>
              </button>
            </div>

            <p className="why-buy-five-disclaimer">
              By signing up, I agree to Apollo's <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.
            </p>
          </div>
        </div>

        {/* Right Column: High-Res Warm Meeting Room Photo */}
        <div className="why-buy-five-right">
          <div className="why-buy-five-image-wrapper">
            <img
              src="/images/why-buy-five.jpg"
              alt="Woman working on laptop in modern office"
              className="why-buy-five-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
