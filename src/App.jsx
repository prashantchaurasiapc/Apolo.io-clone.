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
  home: '#/app/home',
  ai_assistant: '#/app/ai-assistant',
  prospect_people: '#/app/prospect/people',
  prospect_companies: '#/app/prospect/companies',
  lists: '#/app/prospect/lists',
  enrichment: '#/app/prospect/enrichment',
  sequences: '#/app/engage/sequences',
  emails: '#/app/engage/emails',
  calls: '#/app/engage/calls',
  tasks: '#/app/engage/tasks',
  meetings: '#/app/win/meetings',
  conversations: '#/app/win/conversations',
  deals: '#/app/win/deals',
  workflows: '#/app/tools/workflows',
  analytics: '#/app/tools/analytics',
  website_visitors: '#/app/inbound/website-visitors',
  forms: '#/app/inbound/forms',
  saved_people: '#/app/saved/people',
  saved_companies: '#/app/saved/companies',
  email_health: '#/app/email-health',
  admin_settings: '#/app/admin-settings',
};

export const HASH_TO_TAB = Object.fromEntries(
  Object.entries(TAB_TO_HASH).map(([tab, hash]) => [hash, tab])
);

export default function App() {
  const [viewMode, setViewMode] = useState('website'); // 'website' | 'login' | 'signup' | 'pricing' | 'dashboard'
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [key, setKey] = useState(0);
  const [demoOpen, setDemoOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  // Sync route mode with window.location.hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '';

      if (hash === '#/login') {
        setViewMode('login');
      } else if (hash === '#/signup') {
        setViewMode('signup');
      } else if (hash === '#/pricing') {
        setViewMode('pricing');
      } else if (hash.startsWith('#/app/')) {
        setViewMode('dashboard');
        const matchedTab = HASH_TO_TAB[hash] || 'home';
        setActiveTab(matchedTab);
      } else {
        setViewMode('website');
      }
      setKey(k => k + 1);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (destination) => {
    if (destination === 'login') {
      window.location.hash = '#/login';
    } else if (destination === 'signup') {
      window.location.hash = '#/signup';
    } else if (destination === 'pricing') {
      window.location.hash = '#/pricing';
    } else if (destination === 'website' || destination === 'landing' || destination === 'home_website') {
      window.location.hash = '';
    } else if (TAB_TO_HASH[destination]) {
      window.location.hash = TAB_TO_HASH[destination];
    } else {
      window.location.hash = '#/app/home';
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    window.location.hash = '#/app/home';
  };

  const handleLogout = () => {
    setUser(null);
    window.location.hash = '';
  };

  // 1. LOGIN PAGE (Full screen, no navbar)
  if (viewMode === 'login') {
    return (
      <div key={key} style={fadeStyle}>
        <LoginPage 
          onClose={() => navigateTo('website')} 
          onSignupClick={() => navigateTo('signup')}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  // 2. SIGNUP PAGE (Popup over background)
  if (viewMode === 'signup') {
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

  // 3. PRICING PAGE
  if (viewMode === 'pricing') {
    return (
      <>
        <Navbar 
          onLoginClick={() => navigateTo('login')} 
          onPricingClick={() => navigateTo('pricing')} 
          onDemoClick={() => setDemoOpen(true)}
          onSignupClick={() => navigateTo('signup')}
        />
        <div key={key} style={{ ...fadeStyle, paddingTop: NAV_HEIGHT }}>
          <Pricing onBack={() => navigateTo('website')} />
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

  // 4. SOFTWARE APP DASHBOARD (When logged in or visiting #/app/...)
  if (viewMode === 'dashboard') {
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

  // 5. DEFAULT WEBSITE MARKETING LANDING PAGE (Hero, SocialProof, InteractiveTabs, Pricing link, Log In button, Sign Up button)
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
