import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import InteractiveTabs from './components/InteractiveTabs';
import FastestGrowing from './components/FastestGrowing';
import SecurityCompliance from './components/SecurityCompliance';
import ComparisonBanner from './components/ComparisonBanner';
import FAQAccordion from './components/FAQAccordion';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import Pricing from './components/Pricing';
import DemoModal from './components/DemoModal';
import SignupModal from './components/SignupModal';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';

const fadeStyle = {
  animation: 'pageFadeIn 0.25s ease forwards',
};

// Inject keyframes once
const styleSheet = document.createElement('style');
styleSheet.textContent = `@keyframes pageFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(styleSheet);

const NAV_HEIGHT = 72;

export const TAB_TO_HASH = {
  home: '#/home',
  ai_assistant: '#/ai-assistant',
  prospect_people: '#/prospect/people',
  prospect_companies: '#/prospect/companies',
  lists: '#/prospect/lists',
  enrichment: '#/prospect/enrichment',
  sequences: '#/engage/sequences',
  emails: '#/engage/emails',
  calls: '#/engage/calls',
  tasks: '#/engage/tasks',
  meetings: '#/win/meetings',
  conversations: '#/win/conversations',
  deals: '#/win/deals',
  workflows: '#/tools/workflows',
  analytics: '#/tools/analytics',
  website_visitors: '#/inbound/website-visitors',
  forms: '#/inbound/forms',
  saved_people: '#/saved/people',
  saved_companies: '#/saved/companies',
  email_health: '#/email-health',
  admin_settings: '#/admin-settings',
};

export const HASH_TO_TAB = Object.fromEntries(
  Object.entries(TAB_TO_HASH).map(([tab, hash]) => [hash, tab])
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'landing' | 'login' | 'pricing' | 'signup' | 'dashboard'
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [key, setKey] = useState(0);
  const [demoOpen, setDemoOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  // Sync route state with window.location.hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/home';
      
      if (hash === '#/login') {
        setCurrentPage('login');
      } else if (hash === '#/signup') {
        setCurrentPage('signup');
      } else if (hash === '#/pricing') {
        setCurrentPage('pricing');
      } else if (hash === '#/landing') {
        setCurrentPage('landing');
      } else {
        setCurrentPage('dashboard');
        const matchedTab = HASH_TO_TAB[hash] || 'home';
        setActiveTab(matchedTab);
      }
      setKey(k => k + 1);
    };

    // Initial check
    if (!window.location.hash) {
      window.location.hash = '#/home';
    } else {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (pageOrHash) => {
    if (pageOrHash === 'login') {
      window.location.hash = '#/login';
    } else if (pageOrHash === 'signup') {
      window.location.hash = '#/signup';
    } else if (pageOrHash === 'pricing') {
      window.location.hash = '#/pricing';
    } else if (pageOrHash === 'landing') {
      window.location.hash = '#/landing';
    } else if (TAB_TO_HASH[pageOrHash]) {
      window.location.hash = TAB_TO_HASH[pageOrHash];
    } else {
      window.location.hash = '#/home';
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    window.location.hash = '#/home';
  };

  const handleLogout = () => {
    setUser(null);
    window.location.hash = '#/login';
  };

  // Login page — full screen
  if (currentPage === 'login') {
    return (
      <div key={key} style={fadeStyle}>
        <LoginPage 
          onClose={() => navigateTo('landing')} 
          onSignupClick={() => navigateTo('signup')}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  // Signup page
  if (currentPage === 'signup') {
    return (
      <div key={key} style={fadeStyle}>
        <SignupPage 
          onClose={() => navigateTo('login')} 
          onLoginClick={() => navigateTo('login')} 
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  // Pricing page
  if (currentPage === 'pricing') {
    return (
      <>
        <Navbar 
          onLoginClick={() => navigateTo('login')} 
          onPricingClick={() => navigateTo('pricing')} 
          onDemoClick={() => setDemoOpen(true)}
          onSignupClick={() => navigateTo('signup')}
        />
        <div key={key} style={{ ...fadeStyle, paddingTop: NAV_HEIGHT }}>
          <Pricing onBack={() => navigateTo('landing')} />
          <Footer 
            onSignupClick={() => navigateTo('signup')}
            onPricingClick={() => navigateTo('pricing')}
            onDemoClick={() => setDemoOpen(true)}
          />
        </div>
        {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
        {signupOpen && <SignupModal onClose={() => { setSignupOpen(false); navigateTo('login'); }} />}
      </>
    );
  }

  // Marketing Landing page
  if (currentPage === 'landing') {
    return (
      <>
        <Navbar 
          onLoginClick={() => navigateTo('login')} 
          onPricingClick={() => navigateTo('pricing')} 
          onDemoClick={() => setDemoOpen(true)}
          onSignupClick={() => navigateTo('signup')}
        />
        <div key={key} style={{ ...fadeStyle, paddingTop: NAV_HEIGHT, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <main style={{ flex: 1 }}>
            <Hero onSignupClick={() => navigateTo('signup')} />
            <SocialProof />
            <InteractiveTabs />
            <FastestGrowing />
            <SecurityCompliance />
            <ComparisonBanner onSignupClick={() => navigateTo('signup')} />
            <FAQAccordion />
          </main>
          <Footer 
            onSignupClick={() => navigateTo('signup')}
            onPricingClick={() => navigateTo('pricing')}
            onDemoClick={() => setDemoOpen(true)}
          />
        </div>
        {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
        {signupOpen && <SignupModal onClose={() => { setSignupOpen(false); navigateTo('login'); }} />}
      </>
    );
  }

  // Default Dashboard / Software App View with hash routing
  return (
    <div key={key} style={fadeStyle}>
      <Dashboard 
        user={user}
        activeTab={activeTab}
        onSelectTab={(tab) => navigateTo(tab)}
        onLogout={handleLogout}
      />
    </div>
  );
}
