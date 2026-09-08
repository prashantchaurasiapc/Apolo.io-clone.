import React, { useState } from 'react';
import { 
  AlertTriangle, ChevronLeft, ChevronRight, ChevronDown, 
  Search, SlidersHorizontal, ArrowUpDown, Sparkles, Settings, 
  Check, X, Calendar as CalendarIcon, ExternalLink, Shield
} from 'lucide-react';
import './MeetingsView.css';

/* ─── App SVGs ─── */
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
    <path d="M14 18.5H17M15.5 18.5V23" stroke="#5059C9" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const GreenCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#2E7D32" />
    <path d="M6 10.2L8.6 12.8L14 7.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MiniMeetIcon = () => (
  <svg width="13" height="13" viewBox="0 0 48 48" fill="none">
    <path fill="#00832d" d="M30 20.5l-6-4.5v16l6-4.5z"/>
    <path fill="#0066da" d="M10 13c0-2.2 1.8-4 4-4h10v11.5l-6 4.5H10z"/>
    <path fill="#e94235" d="M24 9h4c2.2 0 4 1.8 4 4v7.5L24 25z"/>
    <path fill="#2684fc" d="M10 25h8l6 4.5V39H14c-2.2 0-4-1.8-4-4z"/>
    <path fill="#00ac47" d="M24 39v-9.5l8 4.5V35c0 2.2-1.8 4-4 4z"/>
    <path fill="#ffba00" d="M32 20.5v7l6 4.5V16z"/>
  </svg>
);

const MiniTeamsIcon = () => (
  <svg width="13" height="13" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="6" fill="#5059C9" />
    <path d="M14 11H22V16H14z" fill="white" />
    <circle cx="18" cy="22" r="4" fill="white" />
  </svg>
);

export default function MeetingsView({ showToast }) {
  const [selectedDate, setSelectedDate] = useState(23);
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [toggleStates, setToggleStates] = useState({
    meeting1: true,
    meeting2: true,
    meeting3: false
  });
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showMailboxModal, setShowMailboxModal] = useState(false);
  const [calendarEmail, setCalendarEmail] = useState('shivamahirwar773@gmail.com');

  const toggleRecording = (key) => {
    setToggleStates(prev => {
      const next = !prev[key];
      if (showToast) {
        showToast(next ? 'Meeting recording enabled with AI notes' : 'Meeting recording disabled');
      }
      return { ...prev, [key]: next };
    });
  };

  const handleConnectCalendar = (e) => {
    if (e) e.preventDefault();
    if (!calendarEmail || !calendarEmail.includes('@')) {
      if (showToast) showToast('Please enter a valid email address');
      return;
    }
    setShowCalendarModal(false);
    if (showToast) {
      showToast(`Connecting calendar for ${calendarEmail}...`);
      setTimeout(() => {
        showToast(`Calendar successfully connected for ${calendarEmail}!`);
      }, 1200);
    }
  };

  const handleConnectProvider = (provider) => {
    setShowCalendarModal(false);
    if (showToast) {
      showToast(`Successfully linked ${provider} to Apollo Meetings!`);
    }
  };

  const handleLinkMailbox = (provider) => {
    setShowMailboxModal(false);
    if (showToast) {
      showToast(`Mailbox connected via ${provider}!`);
    }
  };

  return (
    <div className="meetings-view-wrapper">
      {/* ─── Top Header Title ─── */}
      <div className="meetings-page-header">
        <h1 className="meetings-page-title">Meetings</h1>
      </div>

      {/* ─── Warning Banner ─── */}
      <div className="meetings-warning-banner">
        <AlertTriangle size={17} className="meetings-warning-icon" />
        <div className="meetings-warning-text">
          <span>You have no mailboxes linked. Please connect your email account to start managing and sending emails via Apollo.</span>
          <span 
            className="meetings-link-mailbox"
            onClick={() => setShowMailboxModal(true)}
          >
            Link mailbox
          </span>
        </div>
      </div>

      {/* ─── Main Split Section ─── */}
      <div className="meetings-split-layout">
        {/* ─── LEFT: Illustration & Preview Cards Column ─── */}
        <div className="meetings-illustration-col">
          <div className="meetings-bg-glow-orb" />

          {/* CARD 1: Calendar & Time Slots Interactive Preview */}
          <div className="meetings-preview-card">
            <div className="scheduler-inner-grid">
              {/* Left col: Date picker */}
              <div>
                <div className="scheduler-col-title">Select date</div>
                
                <div className="scheduler-month-nav">
                  <button className="scheduler-nav-btn" onClick={() => showToast && showToast('Previous month')}><ChevronLeft size={13} /></button>
                  <span className="scheduler-month-label">January 2025</span>
                  <button className="scheduler-nav-btn" onClick={() => showToast && showToast('Next month')}><ChevronRight size={13} /></button>
                </div>

                <div className="calendar-days-header">
                  <span className="calendar-day-header-item">SUN</span>
                  <span className="calendar-day-header-item">MON</span>
                  <span className="calendar-day-header-item">TUE</span>
                  <span className="calendar-day-header-item">WED</span>
                  <span className="calendar-day-header-item">THU</span>
                  <span className="calendar-day-header-item">FRI</span>
                  <span className="calendar-day-header-item">SAT</span>
                </div>

                <div className="calendar-dates-grid">
                  {/* Row 1: starts Wednesday */}
                  <span className="calendar-date-cell empty"></span>
                  <span className="calendar-date-cell empty"></span>
                  <span className="calendar-date-cell empty"></span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(1)}>1</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(2)}>2</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(3)}>3</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(4)}>4</span>

                  {/* Row 2 */}
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(5)}>5</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(6)}>6</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(7)}>7</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(8)}>8</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(9)}>9</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(10)}>10</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(11)}>11</span>

                  {/* Row 3 */}
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(12)}>12</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(13)}>13</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(14)}>14</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(15)}>15</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(16)}>16</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(17)}>17</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(18)}>18</span>

                  {/* Row 4 (Highlights on 22, 23, 24) */}
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(19)}>19</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(20)}>20</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(21)}>21</span>
                  <span className={`calendar-date-cell ${selectedDate === 22 ? 'highlight-active' : 'highlight-light'}`} onClick={() => setSelectedDate(22)}>22</span>
                  <span className={`calendar-date-cell ${selectedDate === 23 ? 'highlight-active' : 'highlight-light'}`} onClick={() => setSelectedDate(23)}>23</span>
                  <span className={`calendar-date-cell ${selectedDate === 24 ? 'highlight-active' : 'highlight-light'}`} onClick={() => setSelectedDate(24)}>24</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(25)}>25</span>

                  {/* Row 5 */}
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(26)}>26</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(27)}>27</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(28)}>28</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(29)}>29</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(30)}>30</span>
                  <span className="calendar-date-cell" onClick={() => setSelectedDate(31)}>31</span>
                  <span className="calendar-date-cell empty"></span>
                </div>

                <div className="timezone-selector">
                  <div className="timezone-label">Time zone</div>
                  <div className="timezone-pill" onClick={() => showToast && showToast('Time zone: (GMT-05:00) Eastern Time (US & Canada)')}>
                    <span>(GMT-05:00) America/New_York</span>
                    <ChevronDown size={11} color="#64748b" />
                  </div>
                </div>
              </div>

              {/* Right col: Time slots */}
              <div>
                <div className="scheduler-col-title">Select time</div>
                <div className="time-slots-list">
                  <div className="time-slot-skeleton" />
                  <div className="time-slot-skeleton" style={{ width: '85%' }} />
                  
                  <div 
                    className={`time-slot-pill ${selectedTime === '10:15 AM' ? 'active' : ''}`}
                    onClick={() => { setSelectedTime('10:15 AM'); showToast && showToast('Selected 10:15 AM'); }}
                  >
                    10:15 AM
                  </div>
                  
                  <div 
                    className={`time-slot-pill ${selectedTime === '11:00 AM' ? 'active' : ''}`}
                    onClick={() => { setSelectedTime('11:00 AM'); showToast && showToast('Selected 11:00 AM'); }}
                  >
                    11:00 AM
                  </div>
                  
                  <div 
                    className={`time-slot-pill ${selectedTime === '03:30 PM' ? 'active' : ''}`}
                    onClick={() => { setSelectedTime('03:30 PM'); showToast && showToast('Selected 03:30 PM'); }}
                  >
                    03:30 PM
                  </div>

                  <div className="time-slot-skeleton" style={{ width: '90%' }} />
                  <div className="time-slot-skeleton" style={{ width: '75%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: Upcoming Meetings Micro-Table Preview */}
          <div className="meetings-table-preview-card">
            <div className="table-card-topbar">
              <div className="table-card-top-left">
                <button className="table-filter-btn" onClick={() => showToast && showToast('Upcoming view active')}>
                  <span>Upcoming</span>
                  <ChevronDown size={10} />
                </button>
                <button className="table-filter-btn" onClick={() => showToast && showToast('Filters toggled')}>
                  <SlidersHorizontal size={9} />
                  <span>Show filters</span>
                </button>
                <div className="table-search-box">
                  <Search size={10} color="#94a3b8" />
                  <input type="text" placeholder="Search for event" readOnly />
                </div>
              </div>
              <button className="table-sort-btn" onClick={() => showToast && showToast('Sorting meetings')}>
                <ArrowUpDown size={10} />
                <span>Sort</span>
                <ChevronDown size={10} />
              </button>
            </div>

            <table className="micro-meetings-table">
              <thead>
                <tr>
                  <th>Meeting title</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Record meeting</th>
                  <th>Going?</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1: CTS Global */}
                <tr>
                  <td>
                    <div className="meeting-title-cell">
                      <span>CTS Global</span>
                      <span className="badge-in-min">In 10 min</span>
                    </div>
                  </td>
                  <td>03/07/24</td>
                  <td>11:00 - 11:30 AM</td>
                  <td>
                    <div className="location-link-cell" onClick={() => showToast && showToast('Opening Teams meeting link')}>
                      <MiniTeamsIcon />
                      <span>Link</span>
                    </div>
                  </td>
                  <td>
                    <div 
                      className={`micro-toggle ${toggleStates.meeting1 ? 'on' : ''}`} 
                      onClick={() => toggleRecording('meeting1')}
                    >
                      <div className="micro-toggle-knob" />
                    </div>
                  </td>
                  <td>Yes</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button className="insights-btn-pill" onClick={() => showToast && showToast('Generated AI Meeting Prep Notes for CTS Global')}>
                        <Sparkles size={9} color="#2563eb" />
                        <span>Insights</span>
                      </button>
                      <Settings size={11} className="table-gear-icon" onClick={() => showToast && showToast('Meeting settings')} />
                    </div>
                  </td>
                </tr>

                {/* Row 2: Client consultation */}
                <tr>
                  <td>
                    <div className="meeting-title-cell">
                      <span>Client consultation</span>
                      <span className="badge-in-min">In 15 min</span>
                    </div>
                  </td>
                  <td>03/07/24</td>
                  <td>11:00 - 11:30 AM</td>
                  <td>
                    <div className="location-link-cell" onClick={() => showToast && showToast('Opening Google Meet link')}>
                      <MiniMeetIcon />
                      <span>Link</span>
                    </div>
                  </td>
                  <td>
                    <div 
                      className={`micro-toggle ${toggleStates.meeting2 ? 'on' : ''}`} 
                      onClick={() => toggleRecording('meeting2')}
                    >
                      <div className="micro-toggle-knob" />
                    </div>
                  </td>
                  <td>Yes</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button className="insights-btn-pill" onClick={() => showToast && showToast('Generated AI Meeting Prep Notes for Client consultation')}>
                        <Sparkles size={9} color="#2563eb" />
                        <span>Insights</span>
                      </button>
                      <Settings size={11} className="table-gear-icon" onClick={() => showToast && showToast('Meeting settings')} />
                    </div>
                  </td>
                </tr>

                {/* Row 3: Discovery call */}
                <tr>
                  <td>
                    <div className="meeting-title-cell">
                      <span>Discovery call</span>
                    </div>
                  </td>
                  <td>03/02/24</td>
                  <td>10:00 - 11:00 AM</td>
                  <td>
                    <span className="badge-no-location">No location set</span>
                  </td>
                  <td>
                    <div 
                      className={`micro-toggle ${toggleStates.meeting3 ? 'on' : ''}`} 
                      onClick={() => toggleRecording('meeting3')}
                    >
                      <div className="micro-toggle-knob" />
                    </div>
                  </td>
                  <td>Yes</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button className="insights-btn-pill" onClick={() => showToast && showToast('Generated AI Meeting Prep Notes for Discovery call')}>
                        <Sparkles size={9} color="#2563eb" />
                        <span>Insights</span>
                      </button>
                      <Settings size={11} className="table-gear-icon" onClick={() => showToast && showToast('Meeting settings')} />
                    </div>
                  </td>
                </tr>

                {/* Ghost / skeleton rows */}
                <tr className="table-row-skeleton">
                  <td><div className="skeleton-bar" style={{ width: '80%' }} /></td>
                  <td><div className="skeleton-bar" style={{ width: '60%' }} /></td>
                  <td><div className="skeleton-bar" style={{ width: '90%' }} /></td>
                  <td><div className="skeleton-bar" style={{ width: '50%' }} /></td>
                  <td><div className="skeleton-bar" style={{ width: '40%' }} /></td>
                  <td><div className="skeleton-bar" style={{ width: '40%' }} /></td>
                  <td><div className="skeleton-bar" style={{ width: '70%' }} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── RIGHT: Content, Benefits & CTA Column ─── */}
        <div className="meetings-content-col">
          <div className="meetings-content-inner">
            <h2 className="meetings-hero-heading">
              Simplify scheduling and run more effective meetings
            </h2>

            <div className="meetings-conferencing-title">
              Works with conferencing apps
            </div>

            <div className="conferencing-apps-row">
              <div 
                className="conferencing-app-icon-wrap" 
                title="Connect Zoom"
                onClick={() => showToast && showToast('Zoom conferencing integration ready')}
              >
                <ZoomIcon />
              </div>
              <div 
                className="conferencing-app-icon-wrap" 
                title="Connect Google Meet"
                onClick={() => showToast && showToast('Google Meet conferencing integration ready')}
              >
                <GoogleMeetIcon />
              </div>
              <div 
                className="conferencing-app-icon-wrap" 
                title="Connect Microsoft Teams"
                onClick={() => showToast && showToast('Microsoft Teams conferencing integration ready')}
              >
                <MicrosoftTeamsIcon />
              </div>
            </div>

            <div className="meetings-features-list">
              <div className="meetings-feature-item">
                <div className="meetings-check-circle">
                  <GreenCheckIcon />
                </div>
                <div className="meetings-feature-text">
                  Let customers easily book meetings through your booking link
                </div>
              </div>

              <div className="meetings-feature-item">
                <div className="meetings-check-circle">
                  <GreenCheckIcon />
                </div>
                <div className="meetings-feature-text">
                  Get AI-powered insights to prep for upcoming meetings
                </div>
              </div>

              <div className="meetings-feature-item">
                <div className="meetings-check-circle">
                  <GreenCheckIcon />
                </div>
                <div className="meetings-feature-text">
                  Link meetings to contacts and accounts to view history in one place
                </div>
              </div>
            </div>

            <button 
              className="btn-connect-calendar"
              onClick={() => setShowCalendarModal(true)}
            >
              Connect calendar
            </button>
          </div>
        </div>
      </div>

      {/* ─── MODAL: Connect Calendar Flow (1:1 with Screenshot) ─── */}
      {showCalendarModal && (
        <div className="calendar-modal-backdrop" onClick={() => setShowCalendarModal(false)}>
          <div className="calendar-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="cal-modal-top">
              <h3 className="cal-modal-title">Connect your calendar</h3>
              <button 
                className="cal-modal-close" 
                onClick={() => setShowCalendarModal(false)}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <p className="cal-modal-subtitle">
              One Google or Microsoft (365, Outlook, Exchange) calendar per user can be connected.
            </p>

            <form onSubmit={handleConnectCalendar}>
              <div className="cal-modal-form-group">
                <label className="cal-modal-label">
                  Email <span className="cal-label-star">*</span>
                </label>
                <input 
                  type="email"
                  className="cal-modal-input"
                  value={calendarEmail}
                  onChange={(e) => setCalendarEmail(e.target.value)}
                  placeholder="name@company.com"
                  autoFocus
                  required
                />
              </div>

              <p className="cal-modal-disclaimer">
                By clicking &quot;Connect&quot; below, I acknowledge that business contact data submitted from my calendar to Apollo may be used to provide and improve Apollo&apos;s services as further described in our{' '}
                <a 
                  href="#terms" 
                  onClick={(e) => { e.preventDefault(); showToast && showToast('Opening Terms of Service'); }}
                  className="cal-link"
                >
                  Terms of Service
                </a>
                .{' '}
                <a 
                  href="#learn-more" 
                  onClick={(e) => { e.preventDefault(); showToast && showToast('Learn more about data sharing'); }}
                  className="cal-link"
                >
                  Learn more
                </a>{' '}
                about data sharing.
              </p>

              <div className="cal-modal-actions">
                <button 
                  type="button"
                  className="cal-btn-cancel" 
                  onClick={() => setShowCalendarModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="cal-btn-connect"
                >
                  Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: Link Mailbox Flow ─── */}
      {showMailboxModal && (
        <div className="calendar-modal-backdrop" onClick={() => setShowMailboxModal(false)}>
          <div className="calendar-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="calendar-modal-header">
              <h3>Link a mailbox</h3>
              <button className="calendar-modal-close" onClick={() => setShowMailboxModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="calendar-modal-body">
              <p style={{ fontSize: '13.5px', color: '#64748b', margin: '0 0 8px 0' }}>
                Connect your business email account to send personalized sequences and manage replies inside Apollo:
              </p>

              <div className="calendar-provider-card" onClick={() => handleLinkMailbox('Google Workspace')}>
                <div className="calendar-provider-left">
                  <GoogleMeetIcon />
                  <div>
                    <div className="calendar-provider-name">Google Workspace</div>
                    <div className="calendar-provider-sub">Connect via OAuth 2.0</div>
                  </div>
                </div>
                <ExternalLink size={16} color="#64748b" />
              </div>

              <div className="calendar-provider-card" onClick={() => handleLinkMailbox('Microsoft 365')}>
                <div className="calendar-provider-left">
                  <MicrosoftTeamsIcon />
                  <div>
                    <div className="calendar-provider-name">Microsoft 365 (Exchange)</div>
                    <div className="calendar-provider-sub">Connect via Azure AD OAuth</div>
                  </div>
                </div>
                <ExternalLink size={16} color="#64748b" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
