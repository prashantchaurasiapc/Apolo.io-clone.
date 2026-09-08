import React, { useState } from 'react';
import {
  LayoutGrid,
  BarChart3,
  Trophy,
  ChevronDown,
  Star,
  ExternalLink,
  MoreHorizontal,
  X,
  Lock,
  Unlock,
  Bell,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import './AnalyticsView.css';

export const AnalyticsView = ({ showToast = () => {} }) => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'dashboards' | 'reports'
  const [activeRecentTab, setActiveRecentTab] = useState('dashboards'); // 'dashboards' | 'reports' | 'goals'
  const [isStarred, setIsStarred] = useState(false);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState('Sales Rep Activity Overview');
  const [showDashboardMenu, setShowDashboardMenu] = useState(false);

  // Access / Trial State (Gating)
  const [hasAnalyticsAccess, setHasAnalyticsAccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // General Modals
  const [modalType, setModalType] = useState(null); // 'dashboard' | 'report' | 'goal' | 'learn_more' | null
  const [newItemName, setNewItemName] = useState('');

  // 1. Horizontal Multi-Bar Chart Data (Emails sent by Sales Rep)
  const salesRepEmailsData = [
    { name: 'Alex Thompson', scheduled: 540, sent: 310, calls: 690 },
    { name: 'Maria Rodriguez', scheduled: 610, sent: 420, calls: 760 },
    { name: 'James Wilson', scheduled: 480, sent: 340, calls: 620 },
    { name: 'Jeph Francois', scheduled: 530, sent: 390, calls: 720 },
    { name: 'Michael O\'Connor', scheduled: 570, sent: 450, calls: 790 },
    { name: 'Emma Parker', scheduled: 520, sent: 370, calls: 645 },
    { name: 'Sarah Chen', scheduled: 470, sent: 350, calls: 670 },
    { name: 'Ankur Bansal', scheduled: 490, sent: 410, calls: 640 },
    { name: 'Wojciech Niemkowski', scheduled: 640, sent: 470, calls: 770 }
  ];

  // 2. Donut Chart Segments (Calls made by Sales Rep)
  const donutReps = [
    { name: 'Alex Thompson', color: '#818cf8', value: 14 },
    { name: 'Tolga Ozkan', color: '#2dd4bf', value: 16 },
    { name: 'James Wilson', color: '#3b82f6', value: 12 },
    { name: 'Jeph Francois', color: '#93c5fd', value: 10 },
    { name: 'Michael O\'Connor', color: '#60a5fa', value: 18 },
    { name: 'Emma Parker', color: '#a7f3d0', value: 8 },
    { name: 'Sarah Chen', color: '#c084fc', value: 11 },
    { name: 'Wojciech Niemkowski', color: '#0f766e', value: 15 }
  ];

  const totalDonutValue = donutReps.reduce((sum, r) => sum + r.value, 0);

  // Recent items by subtab
  const recentItems = {
    dashboards: [
      { id: 'd1', title: 'Deals Analytics Dashboard' },
      { id: 'd2', title: 'Email Engagement Performance' },
      { id: 'd3', title: 'Sequence Performance' }
    ],
    reports: [
      { id: 'r1', title: 'Weekly Cold Outbound Conversion' },
      { id: 'r2', title: 'Rep Dialer Connect Rate' },
      { id: 'r3', title: 'Account Tier Win Rates' }
    ],
    goals: [
      { id: 'g1', title: 'Q3 Enterprise Pipeline Target' },
      { id: 'g2', title: '100+ Qualified Meetings / Mo' },
      { id: 'g3', title: '95% CRM Data Enrichment SLA' }
    ]
  };

  // Tab click handler with gating enforcement
  const handleTabClick = (tabName) => {
    if (tabName === 'overview') {
      setActiveTab('overview');
      return;
    }

    if (!hasAnalyticsAccess) {
      setShowConfirmModal(true);
      showToast(`Please confirm trial access to unlock ${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
      return;
    }

    setActiveTab(tabName);
    showToast(`Viewing ${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
  };

  // Confirm Trial Access
  const handleConfirmAccess = () => {
    setHasAnalyticsAccess(true);
    setShowConfirmModal(false);
    showToast('🎉 Advanced Analytics trial activated! Full features & dashboards unlocked.');
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    showToast(`New ${modalType} "${newItemName}" created successfully!`);
    setNewItemName('');
    setModalType(null);
  };

  return (
    <div className="av-view-container">
      {/* ─── 1. Header Row (Matching Screenshot 1:1) ─── */}
      <div className="av-header">
        <div className="av-header-left">
          <h1 className="av-title">Analytics</h1>
          <div className="av-tabs">
            <button
              className={`av-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => handleTabClick('overview')}
            >
              Overview
            </button>
            <button
              className={`av-tab-btn ${activeTab === 'dashboards' ? 'active' : ''}`}
              onClick={() => handleTabClick('dashboards')}
            >
              Dashboards
            </button>
            <button
              className={`av-tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => handleTabClick('reports')}
            >
              Reports
            </button>
          </div>
        </div>

        <div className="av-header-right">
          <button
            className="av-btn-create"
            onClick={() => setShowCreateDropdown(!showCreateDropdown)}
          >
            Create <ChevronDown size={14} />
          </button>

          {showCreateDropdown && (
            <div className="av-dropdown-menu">
              <div
                className="av-dropdown-item"
                onClick={() => {
                  setShowCreateDropdown(false);
                  if (!hasAnalyticsAccess) {
                    setShowConfirmModal(true);
                  } else {
                    setModalType('dashboard');
                  }
                }}
              >
                <LayoutGrid size={15} color="#0d9488" />
                <span>Create dashboard</span>
              </div>
              <div
                className="av-dropdown-item"
                onClick={() => {
                  setShowCreateDropdown(false);
                  if (!hasAnalyticsAccess) {
                    setShowConfirmModal(true);
                  } else {
                    setModalType('report');
                  }
                }}
              >
                <BarChart3 size={15} color="#db2777" />
                <span>Create report</span>
              </div>
              <div
                className="av-dropdown-item"
                onClick={() => {
                  setShowCreateDropdown(false);
                  if (!hasAnalyticsAccess) {
                    setShowConfirmModal(true);
                  } else {
                    setModalType('goal');
                  }
                }}
              >
                <Trophy size={15} color="#9333ea" />
                <span>Create goal</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── 2. Main Split Content Area with Global Fade Overlay (Screenshot 1:1) ─── */}
      <div className="av-layout-wrapper">
        <div className="av-layout">
          {/* Left Sidebar Panel */}
          <div className="av-sidebar">
            {/* Action Cards */}
            <div
              className="av-action-card"
              onClick={() => {
                if (!hasAnalyticsAccess) setShowConfirmModal(true);
                else setModalType('dashboard');
              }}
            >
              <div className="av-action-icon-wrap teal">
                <LayoutGrid size={18} />
              </div>
              <span className="av-action-title">Create dashboard</span>
            </div>

            <div
              className="av-action-card"
              onClick={() => {
                if (!hasAnalyticsAccess) setShowConfirmModal(true);
                else setModalType('report');
              }}
            >
              <div className="av-action-icon-wrap pink">
                <BarChart3 size={18} />
              </div>
              <span className="av-action-title">Create report</span>
            </div>

            <div
              className="av-action-card"
              onClick={() => {
                if (!hasAnalyticsAccess) setShowConfirmModal(true);
                else setModalType('goal');
              }}
            >
              <div className="av-action-icon-wrap purple">
                <Trophy size={18} />
              </div>
              <span className="av-action-title">Create goal</span>
            </div>

            {/* Recent Box */}
            <div className="av-recent-box">
              <span className="av-recent-heading">Recent</span>
              <div className="av-recent-subtabs">
                <button
                  className={`av-recent-subtab ${activeRecentTab === 'dashboards' ? 'active' : ''}`}
                  onClick={() => setActiveRecentTab('dashboards')}
                >
                  Dashboards
                </button>
                <button
                  className={`av-recent-subtab ${activeRecentTab === 'reports' ? 'active' : ''}`}
                  onClick={() => setActiveRecentTab('reports')}
                >
                  Reports
                </button>
                <button
                  className={`av-recent-subtab ${activeRecentTab === 'goals' ? 'active' : ''}`}
                  onClick={() => setActiveRecentTab('goals')}
                >
                  Goals
                </button>
              </div>

              <div className="av-recent-list">
                {recentItems[activeRecentTab].map(item => (
                  <div
                    key={item.id}
                    className="av-recent-item"
                    onClick={() => {
                      if (!hasAnalyticsAccess) {
                        setShowConfirmModal(true);
                      } else {
                        setSelectedDashboard(item.title);
                        showToast(`Opened ${item.title}`);
                      }
                    }}
                  >
                    <LayoutGrid size={15} className="av-recent-item-icon" />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Main Dashboard Area */}
          <div className="av-main">
            {/* Dashboard Selector Bar */}
            <div className="av-dashboard-bar">
              <div style={{ position: 'relative' }}>
                <button
                  className="av-dash-select-btn"
                  onClick={() => setShowDashboardMenu(!showDashboardMenu)}
                >
                  <span>{selectedDashboard}</span>
                  <ChevronDown size={14} />
                </button>

                {showDashboardMenu && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: '6px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                      zIndex: 100,
                      width: '260px',
                      padding: '6px'
                    }}
                  >
                    {[
                      'Sales Rep Activity Overview',
                      'Deals Analytics Dashboard',
                      'Email Engagement Performance',
                      'Sequence Performance'
                    ].map((dash, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '8px 12px',
                          fontSize: '13px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: selectedDashboard === dash ? '700' : '500',
                          background: selectedDashboard === dash ? '#f1f5f9' : 'transparent',
                          color: '#0f172a'
                        }}
                        onClick={() => {
                          setSelectedDashboard(dash);
                          setShowDashboardMenu(false);
                          showToast(`Loaded dashboard: ${dash}`);
                        }}
                      >
                        {dash}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="av-dash-actions">
                <button
                  className="av-btn-action"
                  onClick={() => {
                    setIsStarred(!isStarred);
                    showToast(isStarred ? 'Removed from starred' : 'Dashboard added to Starred');
                  }}
                >
                  <Star size={14} fill={isStarred ? '#facc15' : 'none'} color={isStarred ? '#ca8a04' : '#475569'} />
                  <span>{isStarred ? 'Starred' : 'Star'}</span>
                </button>
                <button
                  className="av-btn-action"
                  onClick={() => showToast(`Opening ${selectedDashboard} full view...`)}
                >
                  <ExternalLink size={14} />
                  <span>Open dashboard</span>
                </button>
              </div>
            </div>

            {/* ─── Row 1 Charts: Emails Sent & Calls Made (2 Column Grid) ─── */}
            <div className="av-charts-row">
              {/* Chart 1: Emails sent by Sales Rep */}
              <div className="av-chart-card">
                <div className="av-chart-header">
                  <h3 className="av-chart-title">Emails sent by Sales Rep</h3>
                  <button className="av-btn-dots" onClick={() => showToast('Options: Edit Chart, Export CSV, Filter by Team')}>
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                <div className="av-hbar-chart">
                  {salesRepEmailsData.map((rep, idx) => (
                    <div key={idx} className="av-hbar-row">
                      <span className="av-hbar-user" title={rep.name}>{rep.name}</span>
                      <div className="av-hbar-bars-container">
                        <div className="av-hbar-bar scheduled" style={{ width: `${(rep.scheduled / 1000) * 100}%` }} title={`Scheduled: ${rep.scheduled}`} />
                        <div className="av-hbar-bar sent" style={{ width: `${(rep.sent / 1000) * 100}%` }} title={`Sent: ${rep.sent}`} />
                        <div className="av-hbar-bar calls" style={{ width: `${(rep.calls / 1000) * 100}%` }} title={`Calls: ${rep.calls}`} />
                      </div>
                    </div>
                  ))}

                  {/* X Axis Numbers */}
                  <div className="av-hbar-axis-x">
                    <span>0</span>
                    <span>250</span>
                    <span>500</span>
                    <span>750</span>
                    <span>1000</span>
                  </div>

                  {/* Legend */}
                  <div className="av-hbar-legend">
                    <div className="av-legend-item">
                      <span className="av-legend-dot" style={{ background: '#818cf8' }} />
                      <span># Emails Scheduled</span>
                    </div>
                    <div className="av-legend-item">
                      <span className="av-legend-dot" style={{ background: '#38bdf8' }} />
                      <span># Emails Sent</span>
                    </div>
                    <div className="av-legend-item">
                      <span className="av-legend-dot" style={{ background: '#1e40af' }} />
                      <span># Calls Logged</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart 2: Calls made by Sales Rep */}
              <div className="av-chart-card">
                <div className="av-chart-header">
                  <h3 className="av-chart-title">Calls made by Sales Rep</h3>
                  <button className="av-btn-dots" onClick={() => showToast('Options: Edit Chart, Export CSV, Filter by Team')}>
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                <div className="av-donut-container">
                  {/* SVG Donut */}
                  <div className="av-donut-wrap">
                    <svg width="170" height="170" viewBox="0 0 170 170">
                      {(() => {
                        const center = 85;
                        const radius = 60;
                        const strokeWidth = 24;
                        const circumference = 2 * Math.PI * radius;
                        let accumulatedPercent = 0;

                        return donutReps.map((rep, i) => {
                          const percent = rep.value / totalDonutValue;
                          const strokeDasharray = `${percent * circumference} ${circumference}`;
                          const strokeDashoffset = -accumulatedPercent * circumference;
                          accumulatedPercent += percent;

                          return (
                            <circle
                              key={i}
                              cx={center}
                              cy={center}
                              r={radius}
                              fill="transparent"
                              stroke={rep.color}
                              strokeWidth={strokeWidth}
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              transform="rotate(-90 85 85)"
                              style={{ transition: 'stroke-width 0.2s ease', cursor: 'pointer' }}
                            />
                          );
                        });
                      })()}
                    </svg>
                    <div className="av-donut-center-label">50</div>
                  </div>

                  {/* Right Reps Legend */}
                  <div className="av-donut-legend">
                    {donutReps.map((rep, idx) => (
                      <div key={idx} className="av-donut-legend-item">
                        <span className="av-donut-dot" style={{ background: rep.color }} />
                        <span>{rep.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Global Bottom Fade & Hero Callout (Hidden once trial is confirmed) ─── */}
        {!hasAnalyticsAccess && (
          <>
            <div className="av-global-fade-overlay" />
            <div className="av-global-cta-banner">
              <h2 className="av-overlay-title">Sell smarter with advanced analytics.</h2>
              <p className="av-overlay-subtitle">
                Take the guesswork out of sales. Use data-driven insights and reporting to understand your
                performance, identify the biggest bottlenecks in your funnel, and close more deals.
              </p>
              <div className="av-overlay-actions">
                <button
                  className="av-btn-learn"
                  onClick={() => setModalType('learn_more')}
                >
                  Learn more
                </button>
                <button
                  className="av-btn-try"
                  onClick={() => setShowConfirmModal(true)}
                >
                  Try Analytics now
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ─── Floating Question Mark Help Icon ─── */}
      <button
        className="av-floating-help"
        onClick={() => showToast('Apollo Analytics Help & Documentation Center')}
        title="Get help with Analytics"
      >
        ?
      </button>

      {/* ─── MODAL: Confirm access to Analytics (Screenshot 1:1) ─── */}
      {showConfirmModal && (
        <div className="av-modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="av-confirm-card" onClick={(e) => e.stopPropagation()}>
            <div className="av-confirm-header">
              <h3 className="av-confirm-title">Confirm access to Analytics</h3>
              <button className="av-confirm-close" onClick={() => setShowConfirmModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="av-confirm-body">
              <p className="av-confirm-desc">
                Start exploring all of Apollo's analytics features — create custom dashboards, generate reports, and set team goals. You can upgrade anytime or cancel without any obligation.
              </p>

              {/* 3 Step Timeline Strip */}
              <div className="av-trial-strip">
                <div className="av-trial-line" />

                {/* Step 1: Access starts */}
                <div className="av-trial-step">
                  <div className="av-trial-step-icon green">
                    <Unlock size={17} />
                  </div>
                  <div className="av-trial-step-info">
                    <span className="av-trial-step-title">Access starts</span>
                    <span className="av-trial-step-date">Sep 8, 2026</span>
                  </div>
                </div>

                {/* Step 2: Reminder */}
                <div className="av-trial-step">
                  <div className="av-trial-step-icon yellow">
                    <Bell size={17} />
                  </div>
                  <div className="av-trial-step-info">
                    <span className="av-trial-step-title">Reminder</span>
                    <span className="av-trial-step-date">Oct 7, 2026</span>
                  </div>
                </div>

                {/* Step 3: Access ends */}
                <div className="av-trial-step">
                  <div className="av-trial-step-icon yellow">
                    <CreditCard size={17} />
                  </div>
                  <div className="av-trial-step-info">
                    <span className="av-trial-step-title">Access ends</span>
                    <span className="av-trial-step-date">Oct 8, 2026</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="av-confirm-footer">
              <button
                className="av-btn-cancel"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="av-btn-confirm"
                onClick={handleConfirmAccess}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── General Modals (Create Dashboard/Report/Goal) ─── */}
      {modalType && (
        <div className="av-modal-overlay" onClick={() => setModalType(null)}>
          <div className="av-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="av-modal-header">
              <h3 className="av-modal-title">
                {modalType === 'dashboard' && 'Create New Dashboard'}
                {modalType === 'report' && 'Create Custom Report'}
                {modalType === 'goal' && 'Set New Team Goal'}
                {modalType === 'learn_more' && 'Apollo Advanced Analytics'}
              </h3>
              <button className="av-btn-dots" onClick={() => setModalType(null)}>
                <X size={18} />
              </button>
            </div>

            {modalType === 'learn_more' ? (
              <div className="av-modal-body">
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.55 }}>
                  Apollo Advanced Analytics unlocks automated pipeline forecasting, sequence engagement heatmaps, rep activity attribution, and bi-directional CRM revenue reporting.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#0f172a' }}>🎯 Funnel Bottlenecks</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Pinpoint exact stages where prospect deals lose momentum.</p>
                  </div>
                  <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#0f172a' }}>⚡ Rep Performance</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Benchmark individual SDR call volumes, reply rates, and conversion.</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateSubmit} className="av-modal-body">
                <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155' }}>
                  {modalType === 'dashboard' && 'Dashboard Name'}
                  {modalType === 'report' && 'Report Title'}
                  {modalType === 'goal' && 'Goal Target Name'}
                </label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder={`e.g. Q4 ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  autoFocus
                />
                <div className="av-modal-footer" style={{ margin: '10px -22px -22px -22px' }}>
                  <button
                    type="button"
                    className="av-btn-learn"
                    onClick={() => setModalType(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="av-btn-try"
                  >
                    Save {modalType}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
