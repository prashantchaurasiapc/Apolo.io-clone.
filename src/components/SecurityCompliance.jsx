import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './SecurityCompliance.css';

const BADGES = [
  {
    id: 'gdpr',
    label: 'GDPR',
    icon: (
      <svg width="84" height="84" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ring of 12 EU Stars */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 50 + 36 * Math.sin(rad);
          const cy = 50 - 36 * Math.cos(rad);
          return (
            <text
              key={i}
              x={cx}
              y={cy + 3}
              textAnchor="middle"
              fontSize="9"
              fill="#222222"
              fontWeight="bold"
            >
              ★
            </text>
          );
        })}
        {/* Star before and after GDPR */}
        <text x="50" y="54" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111111" letterSpacing="0.05em">
          ★ GDPR ★
        </text>
      </svg>
    )
  },
  {
    id: 'soc2',
    label: 'SOC 2',
    icon: (
      <svg width="84" height="84" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shield Outline */}
        <path
          d="M50 16 C68 16 78 22 80 38 C80 62 65 77 50 84 C35 77 20 62 20 38 C22 22 32 16 50 16 Z"
          stroke="#222222"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <text x="50" y="47" textAnchor="middle" fontSize="12" fontWeight="600" fill="#111111" letterSpacing="0.04em">
          SOC
        </text>
        <text x="50" y="61" textAnchor="middle" fontSize="12" fontWeight="600" fill="#111111">
          2
        </text>
      </svg>
    )
  },
  {
    id: 'ccpa',
    label: 'CCPA',
    icon: (
      <svg width="84" height="84" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Rounded Box */}
        <rect x="22" y="20" width="56" height="60" rx="10" stroke="#222222" strokeWidth="1.6" />
        {/* Padlock Icon */}
        <rect x="44" y="38" width="12" height="10" rx="2" stroke="#222222" strokeWidth="1.5" />
        <path d="M46 38 V33 C46 30.8 47.8 29 50 29 C52.2 29 54 30.8 54 33 V38" stroke="#222222" strokeWidth="1.5" />
        <text x="50" y="62" textAnchor="middle" fontSize="12" fontWeight="600" fill="#111111" letterSpacing="0.04em">
          CCPA
        </text>
      </svg>
    )
  },
  {
    id: 'iso27001',
    label: 'ISO/IEC 27001',
    icon: (
      <svg width="84" height="84" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Double Concentric Circles */}
        <circle cx="50" cy="50" r="36" stroke="#222222" strokeWidth="1.6" />
        <circle cx="50" cy="50" r="33" stroke="#222222" strokeWidth="1" strokeOpacity="0.7" />
        <text x="50" y="47" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#111111" letterSpacing="0.02em">
          ISO/IEC
        </text>
        <text x="50" y="60" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#111111" letterSpacing="0.02em">
          27001
        </text>
      </svg>
    )
  },
  {
    id: 'casa-tier2',
    label: 'CASA TIER 2',
    icon: (
      <svg width="84" height="84" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Circle Outline */}
        <circle cx="50" cy="50" r="35" stroke="#222222" strokeWidth="1.6" />
        <text x="50" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#111111" letterSpacing="0.03em">
          CASA
        </text>
        <text x="50" y="60" textAnchor="middle" fontSize="10" fontWeight="600" fill="#111111" letterSpacing="0.03em">
          TIER 2
        </text>
      </svg>
    )
  },
  {
    id: 'cpra',
    label: 'CPRA',
    icon: (
      <svg width="84" height="84" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Rounded Box */}
        <rect x="22" y="20" width="56" height="60" rx="10" stroke="#222222" strokeWidth="1.6" />
        {/* Padlock Icon */}
        <rect x="44" y="38" width="12" height="10" rx="2" stroke="#222222" strokeWidth="1.5" />
        <path d="M46 38 V33 C46 30.8 47.8 29 50 29 C52.2 29 54 30.8 54 33 V38" stroke="#222222" strokeWidth="1.5" />
        <text x="50" y="62" textAnchor="middle" fontSize="12" fontWeight="600" fill="#111111" letterSpacing="0.04em">
          CPRA
        </text>
      </svg>
    )
  },
  {
    id: 'eu-us-dpf',
    label: 'EU-US DPF',
    icon: (
      <svg width="84" height="84" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Square with Diamond Inside */}
        <rect x="22" y="20" width="56" height="60" rx="8" stroke="#222222" strokeWidth="1.6" />
        <polygon points="50,23 75,50 50,77 25,50" stroke="#222222" strokeWidth="1.2" />
        <text x="50" y="47" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#111111">
          EU-US
        </text>
        <text x="50" y="60" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#111111">
          DPF
        </text>
      </svg>
    )
  },
  {
    id: 'pci-dss',
    label: 'PCI DSS',
    icon: (
      <svg width="84" height="84" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Diamond with Text */}
        <rect
          x="26"
          y="26"
          width="48"
          height="48"
          rx="6"
          stroke="#222222"
          strokeWidth="1.6"
          transform="rotate(45 50 50)"
        />
        <text x="50" y="54" textAnchor="middle" fontSize="11" fontWeight="600" fill="#111111" letterSpacing="0.02em">
          PCI DSS
        </text>
      </svg>
    )
  }
];

export default function SecurityCompliance() {
  const trackRef = useRef(null);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  return (
    <section className="security-compliance-section">
      <div className="security-compliance-container">
        {/* ── Top Header Row: Headline & Carousel Navigation Buttons ── */}
        <div className="security-header-row">
          <h2 className="security-title">
            Go to market with<br />confidence—protected at<br />every step
          </h2>

          <div className="security-nav-controls">
            <button 
              type="button" 
              className="security-arrow-btn" 
              onClick={scrollLeft}
              aria-label="Previous compliance badges"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              type="button" 
              className="security-arrow-btn" 
              onClick={scrollRight}
              aria-label="Next compliance badges"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── 8 Compliance Badges Strip ── */}
        <div className="security-badges-track" ref={trackRef}>
          {BADGES.map((badge) => (
            <div key={badge.id} className="security-badge-item">
              <div className="security-badge-card">
                {badge.icon}
              </div>
              <span className="security-badge-label">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
