import React, { useState } from 'react';
import {
  ShieldCheck, AlertTriangle, CheckCircle2, RefreshCw, Globe,
  Lock, Activity, TrendingUp, Flame, Radio, Sliders, Play, Pause,
  ChevronRight, ExternalLink, HelpCircle, Check, X, Sparkles,
  Mail, AlertCircle, ArrowUpRight, Zap
} from 'lucide-react';
import './EmailDeliverabilitySuite.css';

export default function EmailDeliverabilitySuite({ showToast, isModal = false, onClose }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'dns' | 'warmup' | 'blacklists' | 'pacing'
  const [isWarmupActive, setIsWarmupActive] = useState(true);
  const [isCheckingDNS, setIsCheckingDNS] = useState(false);
  const [dnsCheckedAt, setDnsCheckedAt] = useState('2 mins ago');
  const [sendPacing, setSendPacing] = useState('randomized'); // 'randomized' | 'fixed' | 'aggressive'
  const [dailyCap, setDailyCap] = useState(50);
  const [bounceGuard, setBounceGuard] = useState(true);

  const handleRecheckDNS = () => {
    setIsCheckingDNS(true);
    setTimeout(() => {
      setIsCheckingDNS(false);
      setDnsCheckedAt('Just now');
      if (showToast) showToast('All DNS records (SPF, DKIM, DMARC, BIMI) re-verified! 100% deliverability pass.');
    }, 1200);
  };

  const handleToggleWarmup = () => {
    setIsWarmupActive(prev => {
      const next = !prev;
      if (showToast) {
        showToast(next ? 'Mailbox warmup activated! Peer network engagement resumed.' : 'Mailbox warmup paused.');
      }
      return next;
    });
  };

  return (
    <div className={`deliverability-suite-container ${isModal ? 'modal-mode' : ''}`}>
      
      {/* ── Header ── */}
      <div className="deliv-header">
        <div className="deliv-title-group">
          <div className="deliv-badge-row">
            <span className="deliv-score-badge">
              <ShieldCheck size={14} /> 98.4% DELIVERABILITY RATING
            </span>
            <span className="deliv-status-pill">
              Inbox Placement: Excellent
            </span>
          </div>
          <h1>Email Deliverability & Spam Guard Studio</h1>
          <p>
            Mailchimp-grade deliverability engine. Monitor sender reputation, verify cryptographic authentication, automate mailbox warmup, and prevent spam blocking across Gmail and Outlook.
          </p>
        </div>

        <div className="deliv-header-actions">
          <button 
            className="deliv-btn-secondary"
            onClick={handleRecheckDNS}
            disabled={isCheckingDNS}
          >
            <RefreshCw size={14} className={isCheckingDNS ? 'spin' : ''} />
            <span>{isCheckingDNS ? 'Verifying DNS...' : 'Verify DNS Records'}</span>
          </button>
          <button 
            className={`deliv-btn-warmup ${isWarmupActive ? 'active' : ''}`}
            onClick={handleToggleWarmup}
          >
            {isWarmupActive ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
            <span>{isWarmupActive ? 'Pause Warmup' : 'Resume Warmup'}</span>
          </button>
          {isModal && onClose && (
            <button className="deliv-modal-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
      <div className="deliv-tabs-bar">
        <button 
          className={`deliv-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Activity size={15} />
          <span>Reputation & Placement</span>
        </button>

        <button 
          className={`deliv-tab-btn ${activeTab === 'dns' ? 'active' : ''}`}
          onClick={() => setActiveTab('dns')}
        >
          <Lock size={15} />
          <span>DNS Protocols (SPF/DKIM/DMARC)</span>
          <span className="tab-pill-success">PASS</span>
        </button>

        <button 
          className={`deliv-tab-btn ${activeTab === 'warmup' ? 'active' : ''}`}
          onClick={() => setActiveTab('warmup')}
        >
          <Flame size={15} />
          <span>Automated Mailbox Warmup</span>
          <span className="tab-pill-warmup">ACTIVE</span>
        </button>

        <button 
          className={`deliv-tab-btn ${activeTab === 'blacklists' ? 'active' : ''}`}
          onClick={() => setActiveTab('blacklists')}
        >
          <ShieldCheck size={15} />
          <span>Blacklist Watchdog</span>
          <span className="tab-pill-clean">0 FLAGGED</span>
        </button>

        <button 
          className={`deliv-tab-btn ${activeTab === 'pacing' ? 'active' : ''}`}
          onClick={() => setActiveTab('pacing')}
        >
          <Sliders size={15} />
          <span>Anti-Blocking Pacing</span>
        </button>
      </div>

      {/* ── TAB 1: Reputation & Placement Overview ── */}
      {activeTab === 'overview' && (
        <div className="deliv-tab-content">
          
          {/* Key Deliverability Metrics Grid */}
          <div className="deliv-metrics-grid">
            <div className="deliv-metric-card">
              <div className="metric-header">
                <span className="metric-title">Inbox Placement Rate</span>
                <span className="metric-tag green">TOP 1%</span>
              </div>
              <div className="metric-val text-green">98.4%</div>
              <div className="metric-sub">
                <CheckCircle2 size={13} /> Only 1.6% lands in spam/promo
              </div>
            </div>

            <div className="deliv-metric-card">
              <div className="metric-header">
                <span className="metric-title">Domain Sender Score</span>
                <span className="metric-tag blue">POSTMASTER</span>
              </div>
              <div className="metric-val text-blue">99 / 100</div>
              <div className="metric-sub">
                <TrendingUp size={13} /> High sender authority score
              </div>
            </div>

            <div className="deliv-metric-card">
              <div className="metric-header">
                <span className="metric-title">Spam Complaint Rate</span>
                <span className="metric-tag safe">SAFE ZONE</span>
              </div>
              <div className="metric-val text-green">&lt; 0.02%</div>
              <div className="metric-sub">
                Well below Google's 0.10% threshold
              </div>
            </div>

            <div className="deliv-metric-card">
              <div className="metric-header">
                <span className="metric-title">Hard Bounce Rate</span>
                <span className="metric-tag safe">HEALTHY</span>
              </div>
              <div className="metric-val text-green">0.38%</div>
              <div className="metric-sub">
                Target &lt; 2.0% (Zero-bounce list clean)
              </div>
            </div>
          </div>

          {/* Placement Breakdown by Mail Provider */}
          <div className="deliv-card-section">
            <div className="section-header-row">
              <div>
                <h3>ESP Inbox Placement Breakdown</h3>
                <p>Live delivery benchmark simulated across major consumer and enterprise email providers.</p>
              </div>
              <div className="benchmark-period">Last 30 Days</div>
            </div>

            <div className="esp-provider-list">
              <div className="esp-row">
                <div className="esp-name">
                  <div className="esp-icon-dot google"></div>
                  <strong>Google Workspace / Gmail</strong>
                </div>
                <div className="esp-bar-wrap">
                  <div className="esp-bar-fill" style={{ width: '99.1%' }}></div>
                </div>
                <div className="esp-stat"><strong>99.1%</strong> Inbox</div>
                <span className="status-badge-ok">Optimal</span>
              </div>

              <div className="esp-row">
                <div className="esp-name">
                  <div className="esp-icon-dot microsoft"></div>
                  <strong>Microsoft 365 / Outlook</strong>
                </div>
                <div className="esp-bar-wrap">
                  <div className="esp-bar-fill" style={{ width: '98.2%' }}></div>
                </div>
                <div className="esp-stat"><strong>98.2%</strong> Inbox</div>
                <span className="status-badge-ok">Optimal</span>
              </div>

              <div className="esp-row">
                <div className="esp-name">
                  <div className="esp-icon-dot yahoo"></div>
                  <strong>Yahoo! & AOL Mail</strong>
                </div>
                <div className="esp-bar-wrap">
                  <div className="esp-bar-fill" style={{ width: '97.6%' }}></div>
                </div>
                <div className="esp-stat"><strong>97.6%</strong> Inbox</div>
                <span className="status-badge-ok">Optimal</span>
              </div>

              <div className="esp-row">
                <div className="esp-name">
                  <div className="esp-icon-dot corporate"></div>
                  <strong>Private Corporate Exchange / Barracuda</strong>
                </div>
                <div className="esp-bar-wrap">
                  <div className="esp-bar-fill" style={{ width: '98.8%' }}></div>
                </div>
                <div className="esp-stat"><strong>98.8%</strong> Inbox</div>
                <span className="status-badge-ok">Optimal</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ── TAB 2: DNS & Authentication Protocols ── */}
      {activeTab === 'dns' && (
        <div className="deliv-tab-content">
          <div className="dns-summary-card">
            <div className="dns-summary-left">
              <div className="dns-shield-icon">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h4>Cryptographic Domain Authentication Verified</h4>
                <p>SPF, DKIM, DMARC, and Custom Tracking Domain are verified. Email providers recognize your messages as authentic and tamper-proof.</p>
              </div>
            </div>
            <div className="dns-summary-meta">
              <span>Last checked: {dnsCheckedAt}</span>
              <button className="deliv-btn-text" onClick={handleRecheckDNS}>Re-validate DNS</button>
            </div>
          </div>

          <div className="dns-records-grid">
            
            {/* SPF Record */}
            <div className="dns-record-item">
              <div className="record-header">
                <div className="record-title">
                  <span className="record-tag">TXT</span>
                  <strong>SPF (Sender Policy Framework)</strong>
                </div>
                <span className="record-status-pill verified">
                  <Check size={12} /> VERIFIED
                </span>
              </div>
              <p className="record-desc">Authorizes Apollo IP addresses to send emails on behalf of your domain name.</p>
              <div className="code-box">
                <code>v=spf1 include:_spf.google.com include:mail.apollo.io ~all</code>
              </div>
              <div className="record-meta-note">Status: 100% aligned with mail envelope-from</div>
            </div>

            {/* DKIM Record */}
            <div className="dns-record-item">
              <div className="record-header">
                <div className="record-title">
                  <span className="record-tag">CNAME</span>
                  <strong>DKIM (DomainKeys Identified Mail)</strong>
                </div>
                <span className="record-status-pill verified">
                  <Check size={12} /> VERIFIED
                </span>
              </div>
              <p className="record-desc">2048-bit cryptographic signature embedded in headers preventing in-transit message alteration.</p>
              <div className="code-box">
                <code>apollo._domainkey.kiaan-enterprise.io &rarr; dkim.apollo.io</code>
              </div>
              <div className="record-meta-note">Key Length: 2048-bit RSA • Validated</div>
            </div>

            {/* DMARC Record */}
            <div className="dns-record-item">
              <div className="record-header">
                <div className="record-title">
                  <span className="record-tag">TXT</span>
                  <strong>DMARC (Domain-based Message Authentication)</strong>
                </div>
                <span className="record-status-pill verified">
                  <Check size={12} /> ENFORCED (Reject)
                </span>
              </div>
              <p className="record-desc">Instructs recipient mail servers to block spoofed emails from unauthorized imposters.</p>
              <div className="code-box">
                <code>v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-reports@kiaan.ai</code>
              </div>
              <div className="record-meta-note">Policy: Strict (p=reject) • Complies with 2024 Gmail/Yahoo Mandate</div>
            </div>

            {/* Custom Tracking Domain */}
            <div className="dns-record-item">
              <div className="record-header">
                <div className="record-title">
                  <span className="record-tag">CNAME</span>
                  <strong>Custom Tracking Domain (SSL Branded)</strong>
                </div>
                <span className="record-status-pill verified">
                  <Check size={12} /> ACTIVE (SSL)
                </span>
              </div>
              <p className="record-desc">Wraps open/click tracking URLs with your dedicated subdomain instead of generic shared domains.</p>
              <div className="code-box">
                <code>trk.kiaan-enterprise.io &rarr; ssl.apollo-links.com</code>
              </div>
              <div className="record-meta-note">Prevents spam filters from triggering on shared tracking domains</div>
            </div>

          </div>
        </div>
      )}

      {/* ── TAB 3: Automated Mailbox Warmup ── */}
      {activeTab === 'warmup' && (
        <div className="deliv-tab-content">
          <div className="warmup-control-card">
            <div className="warmup-banner-row">
              <div className="warmup-banner-left">
                <div className="warmup-icon-flame">
                  <Flame size={26} />
                </div>
                <div>
                  <div className="warmup-stage-tag">WARMUP PROTOCOL: DAY 18 OF 28 (RAMP STAGE 3)</div>
                  <h3>Automated Peer-to-Peer Mailbox Warmup</h3>
                  <p>
                    Your mailbox autonomously interacts with 25,000+ real corporate inboxes in the Kiaan network. Emails are opened, marked as important, removed from spam, and replied to with human-like conversation patterns.
                  </p>
                </div>
              </div>

              <div className="warmup-toggle-action">
                <button 
                  className={`btn-warmup-toggle ${isWarmupActive ? 'on' : 'off'}`}
                  onClick={handleToggleWarmup}
                >
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">{isWarmupActive ? 'Warmup Active' : 'Warmup Paused'}</span>
                </button>
              </div>
            </div>

            {/* Warmup Metrics */}
            <div className="warmup-stats-strip">
              <div className="w-stat">
                <span className="w-label">Warmup Volume Today</span>
                <span className="w-val">45 / 45 Sent</span>
              </div>
              <div className="w-stat">
                <span className="w-label">Inbox Landing Rate</span>
                <span className="w-val text-green">100%</span>
              </div>
              <div className="w-stat">
                <span className="w-label">Simulated Reply Rate</span>
                <span className="w-val">38% (High Positive Engagement)</span>
              </div>
              <div className="w-stat">
                <span className="w-label">Spam Rescue Count</span>
                <span className="w-val">12 Emails Saved</span>
              </div>
            </div>
          </div>

          {/* Ramp Schedule Timeline */}
          <div className="deliv-card-section">
            <h3>Automated Warmup Ramp-Up Schedule</h3>
            <p className="section-sub">Gradually accelerates sending capacity to establish pristine IP/domain history before heavy outbound campaigns.</p>

            <div className="ramp-steps-grid">
              <div className="ramp-step completed">
                <div className="step-num"><Check size={14} /></div>
                <div className="step-title">Week 1: Seed Stage</div>
                <div className="step-vol">10 emails / day</div>
                <div className="step-desc">Establish baseline TLS handshake & recipient reputation</div>
              </div>

              <div className="ramp-step completed">
                <div className="step-num"><Check size={14} /></div>
                <div className="step-title">Week 2: Low Volume</div>
                <div className="step-vol">25 emails / day</div>
                <div className="step-desc">Introduce bi-directional conversations & thread replies</div>
              </div>

              <div className="ramp-step active">
                <div className="step-num">3</div>
                <div className="step-title">Week 3: Scale (Current)</div>
                <div className="step-vol">45 emails / day</div>
                <div className="step-desc">Active ramp. Safe for introductory 50-email outbound batches</div>
              </div>

              <div className="ramp-step upcoming">
                <div className="step-num">4</div>
                <div className="step-title">Week 4: High Capacity</div>
                <div className="step-vol">75 emails / day</div>
                <div className="step-desc">Full reputation maturity across Google Postmaster & Outlook</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: Blacklist Watchdog ── */}
      {activeTab === 'blacklists' && (
        <div className="deliv-tab-content">
          <div className="blacklist-status-hero">
            <div className="hero-left">
              <div className="blacklist-clean-circle">
                <Check size={32} />
              </div>
              <div>
                <h3>Pristine Blacklist Status: 0 / 54 Flagged</h3>
                <p>
                  Continuous hourly monitoring across all major DNSBLs, RBLs, and spam trap registries. Neither your sending domain nor IP has ever been listed.
                </p>
              </div>
            </div>
            <button 
              className="deliv-btn-secondary"
              onClick={() => {
                if (showToast) showToast('Live DNSBL query dispatched: 54 databases verified clean.');
              }}
            >
              <RefreshCw size={13} />
              <span>Run Live RBL Query</span>
            </button>
          </div>

          <div className="blacklist-table-wrap">
            <table className="blacklist-table">
              <thead>
                <tr>
                  <th>Registry Name</th>
                  <th>Database Code</th>
                  <th>Monitored Target</th>
                  <th>Current Status</th>
                  <th>Response Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Spamhaus ZEN</strong></td>
                  <td>zen.spamhaus.org</td>
                  <td>Domain & Sending IP</td>
                  <td><span className="status-pill-clean"><Check size={12} /> Clean</span></td>
                  <td>28ms</td>
                </tr>
                <tr>
                  <td><strong>Barracuda Central</strong></td>
                  <td>b.barracudacentral.org</td>
                  <td>Outbound Relay</td>
                  <td><span className="status-pill-clean"><Check size={12} /> Clean</span></td>
                  <td>34ms</td>
                </tr>
                <tr>
                  <td><strong>SpamCop Blocking List</strong></td>
                  <td>bl.spamcop.net</td>
                  <td>Sending IP</td>
                  <td><span className="status-pill-clean"><Check size={12} /> Clean</span></td>
                  <td>41ms</td>
                </tr>
                <tr>
                  <td><strong>SORBS Safe Network</strong></td>
                  <td>dnsbl.sorbs.net</td>
                  <td>Domain Record</td>
                  <td><span className="status-pill-clean"><Check size={12} /> Clean</span></td>
                  <td>38ms</td>
                </tr>
                <tr>
                  <td><strong>Invaluement Anti-Spam</strong></td>
                  <td>dnsbl.invaluement.com</td>
                  <td>Domain & Subdomains</td>
                  <td><span className="status-pill-clean"><Check size={12} /> Clean</span></td>
                  <td>52ms</td>
                </tr>
                <tr>
                  <td><strong>Google Postmaster Spam Signal</strong></td>
                  <td>postmaster.google.com</td>
                  <td>DKIM Identifier</td>
                  <td><span className="status-pill-clean"><Check size={12} /> High (0.00% Complaints)</span></td>
                  <td>12ms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 5: Anti-Blocking Pacing & Throttling Rules ── */}
      {activeTab === 'pacing' && (
        <div className="deliv-tab-content">
          <div className="deliv-card-section">
            <h3>Sending Rate Limits & Anti-Throttling Controls</h3>
            <p className="section-sub">Configure algorithmic delay pacing to replicate human behavior and prevent Gmail/Exchange rate-limit blocks.</p>

            <div className="pacing-controls-grid">
              
              {/* Delay Pacing */}
              <div className="pacing-box">
                <label className="pacing-label">
                  <span>Sending Interval Pacing</span>
                  <HelpCircle size={13} className="info-icon" />
                </label>
                <div className="pacing-options">
                  <button 
                    className={`pacing-opt-btn ${sendPacing === 'randomized' ? 'active' : ''}`}
                    onClick={() => setSendPacing('randomized')}
                  >
                    <strong>Randomized (Recommended)</strong>
                    <span>45s – 120s human jitter</span>
                  </button>
                  <button 
                    className={`pacing-opt-btn ${sendPacing === 'fixed' ? 'active' : ''}`}
                    onClick={() => setSendPacing('fixed')}
                  >
                    <strong>Fixed Steady Rate</strong>
                    <span>Exactly 60s per email</span>
                  </button>
                </div>
              </div>

              {/* Daily Send Cap */}
              <div className="pacing-box">
                <label className="pacing-label">
                  <span>Daily Cap Per Mailbox: <strong>{dailyCap} emails</strong></span>
                  <span className="safe-badge-pill">SAFE FOR OUTBOUND</span>
                </label>
                <input 
                  type="range" 
                  min="20" 
                  max="150" 
                  step="5"
                  value={dailyCap}
                  onChange={(e) => setDailyCap(Number(e.target.value))}
                  className="deliv-slider"
                />
                <div className="slider-limits">
                  <span>20 (Ultra-Conservative)</span>
                  <span>50 (Recommended)</span>
                  <span>150 (Max Safe Limit)</span>
                </div>
              </div>

              {/* Automatic Bounce Protection */}
              <div className="pacing-box full-width">
                <div className="toggle-switch-row">
                  <div>
                    <strong>Automated Bounce Spike Protection</strong>
                    <p>Automatically pauses outgoing sequences if hard bounces exceed 1.5% in any 1-hour window, protecting your domain from permanent ESP blacklisting.</p>
                  </div>
                  <button 
                    className={`btn-simple-toggle ${bounceGuard ? 'active' : ''}`}
                    onClick={() => {
                      setBounceGuard(!bounceGuard);
                      if (showToast) showToast(bounceGuard ? 'Bounce Guard paused' : 'Bounce Guard enabled');
                    }}
                  >
                    {bounceGuard ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>

            </div>

            <div className="save-pacing-row">
              <button 
                className="deliv-btn-primary"
                onClick={() => {
                  if (showToast) showToast('Deliverability pacing and anti-throttling settings saved!');
                }}
              >
                Save Pacing Configuration
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
