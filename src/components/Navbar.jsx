import React, { useState, useEffect, useRef } from 'react';
import ApolloLogo from './ApolloLogo';
import { 
  ChevronDown, 
  Send, 
  Target, 
  Database, 
  PieChart, 
  Menu, 
  X,
  BookOpen,
  Calendar,
  Layers,
  FileText,
  Video,
  HelpCircle,
  Users,
  Briefcase,
  TrendingUp,
  Sparkles,
  Zap,
  Bot
} from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onLoginClick, onPricingClick, onDemoClick, onSignupClick, onDashboardClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const closeTimer = useRef(null);

  const openMenu = (name) => {
    clearTimeout(closeTimer.current);
    setActiveMenu(name);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const stayOpen = () => {
    clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-wrapper${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Left Section: Logo & Nav Links */}
        <div className="nav-left">
          <a href="/" aria-label="Apollo.io Homepage">
            <ApolloLogo height={28} />
          </a>

          {/* Desktop Nav Items */}
          <nav>
            <ul className="nav-menu">
              {/* Solutions Dropdown */}
              <li className="nav-item" onMouseEnter={() => openMenu('solutions')} onMouseLeave={closeMenu}>
                <button className="nav-link-btn">
                  Solutions <ChevronDown className={`chevron-icon${activeMenu === 'solutions' ? ' chevron-open' : ''}`} />
                </button>
                <div className={`dropdown-mega${activeMenu === 'solutions' ? ' dropdown-open' : ''}`} onMouseEnter={stayOpen} onMouseLeave={closeMenu}>
                  <div className="dropdown-card dropdown-solutions">

                    {/* Solutions 2-col grid */}
                    <div className="sol-col-wide">
                      <div className="dropdown-section-title">APOLLO SOLUTIONS</div>
                      <div className="solution-grid">

                        <a href="#outbound" className="solution-item">
                          <div className="solution-icon-simple">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.4" strokeLinecap="round">
                              <path d="M4 11a9 9 0 0 1 9 9" />
                              <path d="M4 4a16 16 0 0 1 16 16" />
                              <circle cx="5" cy="19" r="1.5" fill="#111" />
                            </svg>
                          </div>
                          <div>
                            <div className="solution-title">Outbound</div>
                            <div className="solution-desc">Turn hours of prospecting into minutes</div>
                          </div>
                        </a>

                        <a href="#enrichment" className="solution-item">
                          <div className="solution-icon-simple">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 12h2l3-6 4 12 4-12 3 6h4" />
                            </svg>
                          </div>
                          <div>
                            <div className="solution-title">Data Enrichment</div>
                            <div className="solution-desc">Fuel smarter selling with always-fresh data</div>
                          </div>
                        </a>

                        <a href="#inbound" className="solution-item">
                          <div className="solution-icon-simple">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 3L4 19l8-3 8 3L12 3z" />
                            </svg>
                          </div>
                          <div>
                            <div className="solution-title">Inbound</div>
                            <div className="solution-desc">Qualify and act on inbound leads in seconds</div>
                          </div>
                        </a>

                        <a href="#deal-execution" className="solution-item">
                          <div className="solution-icon-simple">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="9" />
                              <path d="M12 3v9l6 4" />
                              <path d="M21 12h-9l-4 6" />
                              <path d="M12 21v-9l-6-4" />
                              <path d="M3 12h9l4-6" />
                            </svg>
                          </div>
                          <div>
                            <div className="solution-title">Deal Execution</div>
                            <div className="solution-desc">Capture every conversation, accelerate every deal</div>
                          </div>
                        </a>

                      </div>
                    </div>

                    {/* Platform — plain text links */}
                    <div className="sol-col-narrow">
                      <div className="dropdown-section-title">PLATFORM</div>
                      <ul className="link-list link-list-plain">
                        <li className="link-item"><a href="#apollo-data">Apollo Data</a></li>
                        <li className="link-item"><a href="#ai-assistant">AI Assistant</a></li>
                        <li className="link-item"><a href="#mcp">Apollo MCP</a></li>
                        <li className="link-item"><a href="#integrations">Integrations</a></li>
                        <li className="link-item"><a href="#chrome-extension">Chrome Extension</a></li>
                        <li className="link-item"><a href="#workflows">Workflow Automation</a></li>
                      </ul>
                    </div>

                    {/* What's New — gradient card */}
                    <div className="sol-col-narrow">
                      <div className="dropdown-section-title">WHAT'S NEW</div>
                      <div className="whats-new-card">
                        <div className="whats-new-gradient" />
                        <div className="whats-new-content">
                          <div className="whats-new-headline">
                            The GTM<br/>event of<br/>the year
                          </div>
                          <div className="whats-new-footer">
                            <span className="whats-new-brand">✳ Next</span>
                            <a href="#next" className="whats-new-cta">Register now</a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </li>


              {/* Roles Dropdown */}
              <li className="nav-item" onMouseEnter={() => openMenu('roles')} onMouseLeave={closeMenu}>
                <button className="nav-link-btn">
                  Roles <ChevronDown className={`chevron-icon${activeMenu === 'roles' ? ' chevron-open' : ''}`} />
                </button>
                <div className={`dropdown-mega${activeMenu === 'roles' ? ' dropdown-open' : ''}`} onMouseEnter={stayOpen} onMouseLeave={closeMenu}>
                  <div className="dropdown-card dropdown-roles">
                    {/* Left Column: Roles list */}
                    <div className="roles-col-left">
                      <h3 className="roles-header-title">Roles</h3>
                      <p className="roles-header-sub">Discover tools tailored to your role and goals</p>
                      <ul className="roles-list">
                        <li><a href="#sales-leaders">Sales Leaders</a></li>
                        <li><a href="#account-executives">Account Executives</a></li>
                        <li><a href="#sales-development">Sales Development</a></li>
                        <li><a href="#revenue-operations">Revenue Operations</a></li>
                        <li><a href="#marketers">Marketers</a></li>
                        <li><a href="#founders">Founders</a></li>
                      </ul>
                    </div>

                    {/* Right Column: Case study / Feature card */}
                    <div className="roles-col-right">
                      <div className="roles-banner-card">
                        <div className="roles-banner-bg" />
                        <div className="roles-banner-logos">
                          <div className="roles-logo-apollo">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.8" strokeLinecap="round">
                              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
                            </svg>
                            <span>Apollo</span>
                          </div>
                          <span className="roles-plus-sign">+</span>
                          <div className="roles-logo-accord">
                            <svg width="22" height="18" viewBox="0 0 26 20" fill="none" stroke="#111827" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 18L7 3" />
                              <path d="M7 18L12 3" />
                              <path d="M12 18L17 3" />
                              <path d="M17 3L23 18" />
                            </svg>
                            <span>Accord</span>
                          </div>
                        </div>
                      </div>

                      <div className="roles-card-meta">
                        <div className="roles-card-tag">APOLLO PLATFORM</div>
                        <h4 className="roles-card-headline">
                          How Accord Turned Stakeholder Mapping Into a Built-In Sales Motion
                        </h4>
                        <a href="#learn-more" className="roles-card-link">Learn more</a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* Resources Dropdown */}
              <li className="nav-item" onMouseEnter={() => openMenu('resources')} onMouseLeave={closeMenu}>
                <button className="nav-link-btn">
                  Resources <ChevronDown className={`chevron-icon${activeMenu === 'resources' ? ' chevron-open' : ''}`} />
                </button>
                <div className={`dropdown-mega dropdown-mega-resources${activeMenu === 'resources' ? ' dropdown-open' : ''}`} onMouseEnter={stayOpen} onMouseLeave={closeMenu}>
                  <div className="dropdown-card dropdown-resources">

                    {/* Column 1: Learn */}
                    <div className="res-col">
                      <div className="res-col-title">Learn</div>
                      <div className="res-col-sub">Level up your sales mastery and Apollo know-how</div>
                      <ul className="res-link-list">
                        <li><a href="#academy">Academy</a></li>
                        <li><a href="#events">Events</a></li>
                        <li><a href="#magazine">Magazine</a></li>
                        <li><a href="#guides">Books &amp; Guides</a></li>
                        <li><a href="#templates">Templates</a></li>
                        <li><a href="#webinars">Webinars</a></li>
                        <li><a href="#videos">Videos</a></li>
                        <li><a href="#knowledge">Knowledge Base</a></li>
                        <li><a href="#onboarding">Onboarding</a></li>
                      </ul>
                    </div>

                    {/* Column 2: Connect */}
                    <div className="res-col">
                      <div className="res-col-title">Connect</div>
                      <div className="res-col-sub">Find out how others are driving growth with Apollo</div>
                      <ul className="res-link-list">
                        <li><a href="#community">Join the Community</a></li>
                        <li><a href="#customer-stories">Customer Stories</a></li>
                        <li><a href="#reviews">Reviews</a></li>
                        <li><a href="#startups">Apollo for Startups</a></li>
                      </ul>
                    </div>

                    {/* Column 3: Partner */}
                    <div className="res-col">
                      <div className="res-col-title">Partner</div>
                      <div className="res-col-sub">Explore opportunities to partner and grow together</div>
                      <ul className="res-link-list">
                        <li><a href="#affiliate">Affiliate Partners</a></li>
                        <li><a href="#solutions-partners">Solutions Partners</a></li>
                        <li><a href="#technology">Technology Partners</a></li>
                        <li><a href="#reseller">Data Reseller Partners</a></li>
                        <li><a href="#certified">Find a Certified Partner</a></li>
                      </ul>
                    </div>

                    {/* Column 4: Careers */}
                    <div className="res-col">
                      <div className="res-col-title">Careers</div>
                      <div className="res-col-sub">Build your career helping transform B2B sales</div>
                      <ul className="res-link-list">
                        <li><a href="#open-positions">See Open Positions</a></li>
                        <li><a href="#our-story">Our Story</a></li>
                        <li><a href="#life-apollo">Life at Apollo</a></li>
                        <li><a href="#teams">Teams</a></li>
                        <li><a href="#tech-blog">Tech Blog</a></li>
                        <li><a href="#newsroom">Newsroom</a></li>
                      </ul>
                    </div>

                    {/* Feature Card 1: Apollo Platform */}
                    <div className="res-feature-card">
                      <div className="res-feature-img res-feature-img-gtm">
                        <div className="res-img-quote">"This is the new standard for GTM"</div>
                      </div>
                      <div className="res-feature-tag">APOLLO PLATFORM</div>
                      <div className="res-feature-headline">A CEO's Guide to GTM: What used to cost millions, now costs $30</div>
                      <a href="#gtm-guide" className="res-feature-link">Learn more</a>
                    </div>

                    {/* Feature Card 2: Apollo Academy */}
                    <div className="res-feature-card">
                      <div className="res-feature-img res-feature-img-academy">
                        <div className="res-academy-ui">
                          <div className="res-academy-bar res-academy-bar-green">run every week on Monday</div>
                          <div className="res-academy-row">
                            <span className="res-academy-label">Industry</span>
                            <span>real estate</span>
                          </div>
                          <div className="res-academy-row">
                            <span className="res-academy-label">edition</span>
                            <span>real estate</span>
                          </div>
                          <div className="res-academy-bar res-academy-bar-purple">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#a855f7" strokeWidth="2">
                              <circle cx="6" cy="6" r="4"/>
                            </svg>
                            Run power-ups
                          </div>
                          <div className="res-academy-assign">Assign as SaaS or non-SaaS</div>
                        </div>
                      </div>
                      <div className="res-feature-tag">APOLLO ACADEMY</div>
                      <div className="res-feature-headline">How to Use AI Research to Accelerate Prospecting</div>
                      <a href="#academy-ai" className="res-feature-link">Learn more</a>
                    </div>

                  </div>
                </div>
              </li>

              {/* Pricing */}
              <li className="nav-item">
                <a href="javascript:void(0)" className="nav-link-btn" onClick={() => onPricingClick && onPricingClick()}>
                  Pricing
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="nav-right">
          {onDashboardClick && (
            <button 
              onClick={onDashboardClick} 
              className="nav-desktop-only" 
              style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '7px 14px', fontSize: '13.5px', fontWeight: 600, color: '#0f172a', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Dashboard
            </button>
          )}
          <button onClick={onLoginClick} className="login-link nav-desktop-only" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Log in</button>
          <button onClick={onDemoClick} className="btn-apollo-secondary nav-desktop-only" style={{ padding: '8px 18px', fontSize: '14px', border: '1px solid #111', background: '#fff', cursor: 'pointer' }}>
            Get a demo
          </button>
          <button onClick={onSignupClick} className="btn-apollo-primary nav-desktop-only" style={{ padding: '8px 18px', fontSize: '14px', border: 'none', cursor: 'pointer' }}>
            Sign up for free
          </button>
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-links">
              <a href="#platform" className="mobile-drawer-link" onClick={() => setMobileOpen(false)}>
                Platform
              </a>
              <a href="#solutions" className="mobile-drawer-link" onClick={() => setMobileOpen(false)}>
                Solutions
              </a>
              <a href="#resources" className="mobile-drawer-link" onClick={() => setMobileOpen(false)}>
                Resources
              </a>
              <a 
                href="javascript:void(0)" 
                className="mobile-drawer-link" 
                onClick={() => {
                  setMobileOpen(false);
                  if (onPricingClick) onPricingClick();
                }}
              >
                Pricing
              </a>
            </div>

            <div className="mobile-drawer-actions">
              <button 
                onClick={() => {
                  setMobileOpen(false);
                  if (onLoginClick) onLoginClick();
                }} 
                className="btn-apollo-secondary mobile-action-btn"
              >
                Log in
              </button>
              <button 
                onClick={() => {
                  setMobileOpen(false);
                  if (onSignupClick) onSignupClick();
                }} 
                className="btn-apollo-primary mobile-action-btn"
              >
                Sign up for free
              </button>
              <button 
                onClick={() => {
                  setMobileOpen(false);
                  if (onDemoClick) onDemoClick();
                }} 
                className="btn-apollo-outline mobile-action-btn"
              >
                Get a demo
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
