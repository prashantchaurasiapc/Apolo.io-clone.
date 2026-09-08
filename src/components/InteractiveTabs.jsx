import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  MailCheck, 
  ListTodo, 
  Workflow, 
  History, 
  RefreshCw, 
  Calendar, 
  GitFork, 
  Layers, 
  CheckCircle2, 
  Target, 
  Database, 
  FileText, 
  PhoneCall, 
  Bell, 
  BarChart2
} from 'lucide-react';
import './InteractiveTabs.css';

const TABS_DATA = [
  {
    id: 'outbound',
    label: 'OUTBOUND',
    activeColor: '#F8FF2C',
    title: 'Turn hours of prospecting into minutes',
    image: '/tabs/tab-1-outbound.png',
    items: [
      {
        icon: <Sparkles size={18} strokeWidth={2} />,
        text: 'AI-powered, multichannel campaigns in a click'
      },
      {
        icon: <MailCheck size={18} strokeWidth={2} />,
        text: 'Built-in email deliverability guardrails'
      },
      {
        icon: <ListTodo size={18} strokeWidth={2} />,
        text: 'Prioritized task lists to maximize selling'
      },
      {
        icon: <Workflow size={18} strokeWidth={2} />,
        text: 'Workflow automations to identify and scale what works'
      }
    ]
  },
  {
    id: 'inbound',
    label: 'INBOUND',
    activeColor: '#C1B7FF',
    title: 'Qualify and act on inbound leads in seconds',
    image: '/tabs/tab-2-inbound.png',
    items: [
      {
        icon: <History size={18} strokeWidth={2} />,
        text: 'Anonymous visitor identification'
      },
      {
        icon: <RefreshCw size={18} strokeWidth={2} />,
        text: 'Real-time form enrichment'
      },
      {
        icon: <Calendar size={18} strokeWidth={2} />,
        text: 'Instant routing with built-in calendar and scheduler'
      },
      {
        icon: <GitFork size={18} strokeWidth={2} />,
        text: 'Automated nurture & follow-up sequences'
      }
    ]
  },
  {
    id: 'enrichment',
    label: 'DATA ENRICHMENT',
    activeColor: '#FFBDF5',
    title: 'Fuel smarter selling with always-fresh data',
    image: '/tabs/tab-3-enrichment.png',
    items: [
      {
        icon: <Layers size={18} strokeWidth={2} />,
        text: '240M+ contacts and 30M+ companies'
      },
      {
        icon: <CheckCircle2 size={18} strokeWidth={2} />,
        text: 'Verified emails & phone numbers for faster reach'
      },
      {
        icon: <Target size={18} strokeWidth={2} />,
        text: 'Better targeting and personalization'
      },
      {
        icon: <Database size={18} strokeWidth={2} />,
        text: 'Clean data across your entire stack and CRM'
      }
    ]
  },
  {
    id: 'deal',
    label: 'DEAL EXECUTION',
    activeColor: '#C0DAFF',
    title: 'Capture every conversation, accelerate every deal',
    image: '/tabs/tab-4-deal.png',
    items: [
      {
        icon: <FileText size={18} strokeWidth={2} />,
        text: 'Pre-meeting insights to prep in seconds'
      },
      {
        icon: <PhoneCall size={18} strokeWidth={2} />,
        text: 'AI-powered call summaries, follow-ups, and task creation'
      },
      {
        icon: <Bell size={18} strokeWidth={2} />,
        text: 'Pipeline boards & real-time deal alerts'
      },
      {
        icon: <BarChart2 size={18} strokeWidth={2} />,
        text: 'Conversation insights & performance dashboards for coaching'
      }
    ]
  }
];

export default function InteractiveTabs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);
  const isClickingRef = useRef(false);

  // Scroll Animation: Slides bottom-to-top one-by-one as user scrolls down
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isClickingRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          // Navbar height is 72px, give extra clearance
          const offsetTop = 80;
          const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

          if (totalScrollable <= 0) {
            ticking = false;
            return;
          }

          const progress = (-rect.top + offsetTop) / totalScrollable;

          if (progress <= 0) {
            setActiveIdx(0);
          } else if (progress >= 1) {
            setActiveIdx(3);
          } else {
            // 4 tabs: 0 (0-0.25), 1 (0.25-0.5), 2 (0.5-0.75), 3 (0.75-1.0)
            const step = Math.min(Math.floor(progress * 4), 3);
            setActiveIdx(step);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // When clicking a tab button, jump directly to that tab and scroll smoothly
  const handleTabClick = (idx) => {
    setActiveIdx(idx);
    if (!containerRef.current) return;

    isClickingRef.current = true;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const sectionTop = containerRef.current.offsetTop;
    // Scroll to the midpoint of the chosen tab
    const targetScrollY = sectionTop + ((idx + 0.35) / 4) * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isClickingRef.current = false;
    }, 700);
  };

  return (
    <section className="apollo-scroll-container" ref={containerRef} id="solutions">
      <div className="apollo-sticky-box">
        <div className="apollo-tabs-content-wrapper">
          {/* 4 Tabs Top Navigation - OUTBOUND, INBOUND, DATA ENRICHMENT, DEAL EXECUTION */}
          <div className="apollo-tabs-bar">
            {TABS_DATA.map((tab, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`apollo-tab-button ${isActive ? 'tab-active' : ''}`}
                  style={isActive ? { backgroundColor: tab.activeColor } : {}}
                  onClick={() => handleTabClick(idx)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Slider Viewport with Vertical (Bottom-to-Top) Slide Effect */}
          <div className="apollo-slider-viewport">
            <div 
              className="apollo-slider-track"
              style={{ transform: `translateY(-${activeIdx * 100}%)` }}
            >
              {TABS_DATA.map((tab, idx) => (
                <div 
                  key={tab.id} 
                  className={`apollo-slide ${activeIdx === idx ? 'slide-active' : ''}`}
                >
                  {/* Left Column: Heading, CTA Buttons, Feature checklist */}
                  <div className="apollo-slide-left">
                    <h2 className="apollo-slide-heading">
                      {tab.title}
                    </h2>

                    <div className="apollo-slide-actions">
                      <a href="#signup" className="apollo-btn-black">
                        Get started for free
                      </a>
                      <a href="#learn-more" className="apollo-btn-outline">
                        Learn more
                      </a>
                    </div>

                    <ul className="apollo-features-list">
                      {tab.items.map((item, i) => (
                        <li key={i} className="apollo-feature-row">
                          <span className="apollo-feature-icon">
                            {item.icon}
                          </span>
                          <span className="apollo-feature-label">
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Original Official Mockup Screenshot */}
                  <div className="apollo-slide-right">
                    <div className="apollo-screenshot-card">
                      <img 
                        src={tab.image} 
                        alt={tab.title}
                        className="apollo-screenshot-img"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
