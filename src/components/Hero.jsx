import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, PhoneCall, Send, Sparkles } from 'lucide-react';
import './Hero.css';

export default function Hero({ onSignupClick }) {
  const [email, setEmail] = useState('');
  const [callsCount, setCallsCount] = useState(311);
  const [emailsCount, setEmailsCount] = useState(569);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const videoRef = useRef(null);

  // Animated ticker effect to show live dynamic activity
  useEffect(() => {
    const interval = setInterval(() => {
      setCallsCount(prev => prev + Math.floor(Math.random() * 2) + 1);
      setEmailsCount(prev => prev + Math.floor(Math.random() * 4) + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSignupClick) {
      onSignupClick();
    } else if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="hero-section">
      <div className="container-wide">
        {/* Main Rounded White Canvas Card */}
        <div className="hero-canvas-card">
          <div className="hero-content">
            {/* Main Headline - Mixed Editorial Serif & Sans */}
            <h1 className="hero-headline animate-slide-up">
              <span className="headline-serif">The AI sales platform for</span>
              <span className="headline-sans">smarter, faster revenue</span>
              <span className="headline-serif">growth</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              Build pipeline smarter, close deals faster, and simplify your tech stack with
              <br className="hero-sub-break" />
              a unified platform built for modern sales and marketing teams.
            </p>

            {/* Credit Card Pill */}
            <div className="credit-card-pill">
              <CheckCircle2 size={15} color="#16A34A" /> No credit card required
            </div>

            {/* Sign Up Form Box */}
            <div className="signup-box">
              {isSubmitted ? (
                <div style={{
                  background: '#E2FC00',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '16px',
                  color: '#0F0F0F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: '1.5px solid #000'
                }}>
                  <Sparkles size={20} /> Welcome aboard! Redirecting to your free workspace...
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="email-form">
                  <input 
                    type="email" 
                    className="email-input" 
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="signup-btn">
                    Sign up for free
                  </button>
                </form>
              )}

              {/* Divider */}
              <div className="divider-row">
                <div className="divider-line"></div>
                <span>or</span>
                <div className="divider-line"></div>
              </div>

              {/* Social Buttons */}
              <div className="social-btns-row">
                <button className="social-btn" type="button" onClick={onSignupClick}>
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  Sign up with Google
                </button>

                <button className="social-btn" type="button" onClick={onSignupClick}>
                  <svg width="18" height="18" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z"/>
                    <path fill="#81bc06" d="M12 1h10v10H1z"/>
                    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                    <path fill="#ffba08" d="M12 12h10v10H12z"/>
                  </svg>
                  Sign up with Microsoft
                </button>
              </div>

              {/* Walkthrough Link */}
              <p className="hero-walkthrough">
                Prefer a walkthrough? <a href="#demo">Get a demo.</a>
              </p>
            </div>
          </div>

          {/* Visual Banner Stage Card with Video */}
          <div className="hero-stage-card">
            {/* Background Video from Apollo.io */}
            <video
              ref={videoRef}
              className="hero-video-bg"
              autoPlay
              loop
              muted
              playsInline
              poster="https://www.apollo.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhomepage-static-for-video.0h98v3yl13hkl.png&w=1920&q=75"
            >
              <source 
                src="https://www.apollo.io/_next/static/media/homepage-hero.17rsa~-g60iw0.webm" 
                type="video/webm" 
              />
            </video>

            {/* Subtle Lighting Overlay */}
            <div className="hero-video-overlay" />

            {/* Floating Metric Pills Overlay */}
            <div className="card-stack">
              {/* Top Metric Card */}
              <div className="metric-pill-card animate-float" style={{ transform: 'translateY(-8px) scale(0.96)', opacity: 0.96 }}>
                <PhoneCall size={22} color="#0F0F0F" />
                <span>{callsCount} calls dialed</span>
              </div>

              {/* Bottom Metric Card */}
              <div className="metric-pill-card" style={{ zIndex: 3, boxShadow: '0 20px 48px rgba(0,0,0,0.22)' }}>
                <Send size={24} color="#0F0F0F" />
                <span>{emailsCount} emails sent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
