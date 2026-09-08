import React, { useState } from 'react';
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

const fadeStyle = {
  animation: 'pageFadeIn 0.25s ease forwards',
};

// Inject keyframes once
const styleSheet = document.createElement('style');
styleSheet.textContent = `@keyframes pageFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(styleSheet);

// Navbar is fixed at 72px height — all pages need this offset
const NAV_HEIGHT = 72;

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'login' | 'pricing' | 'signup'
  const [key, setKey] = useState(0);
  const [demoOpen, setDemoOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const navigate = (page) => {
    setCurrentPage(page);
    setKey(k => k + 1);
    window.scrollTo(0, 0);
  };

  // Login page — full screen, no navbar
  if (currentPage === 'login') {
    return (
      <div key={key} style={fadeStyle}>
        <LoginPage 
          onClose={() => navigate('home')} 
          onSignupClick={() => navigate('signup')}
        />
      </div>
    );
  }

  // Signup page — authentic Apollo platform background + popup modal (matches screenshot)
  if (currentPage === 'signup') {
    return (
      <div key={key} style={fadeStyle}>
        <SignupPage 
          onClose={() => navigate('login')} 
          onLoginClick={() => navigate('login')} 
        />
      </div>
    );
  }

  // Pricing page
  if (currentPage === 'pricing') {
    return (
      <>
        {/* Navbar rendered outside keyed div so it stays fixed and doesn't re-mount */}
        <Navbar 
          onLoginClick={() => navigate('login')} 
          onPricingClick={() => navigate('pricing')} 
          onDemoClick={() => setDemoOpen(true)}
          onSignupClick={() => navigate('signup')}
        />
        <div key={key} style={{ ...fadeStyle, paddingTop: NAV_HEIGHT }}>
          <Pricing onBack={() => navigate('home')} />
          <Footer 
            onSignupClick={() => navigate('signup')}
            onPricingClick={() => navigate('pricing')}
            onDemoClick={() => setDemoOpen(true)}
          />
        </div>
        {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
        {signupOpen && <SignupModal onClose={() => { setSignupOpen(false); navigate('login'); }} />}
      </>
    );
  }

  // Home page
  return (
    <>
      <Navbar 
        onLoginClick={() => navigate('login')} 
        onPricingClick={() => navigate('pricing')} 
        onDemoClick={() => setDemoOpen(true)}
        onSignupClick={() => navigate('signup')}
      />
      <div key={key} style={{ ...fadeStyle, paddingTop: NAV_HEIGHT, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1 }}>
          <Hero onSignupClick={() => navigate('signup')} />
          <SocialProof />
          <InteractiveTabs />
          <FastestGrowing />
          <SecurityCompliance />
          <ComparisonBanner onSignupClick={() => navigate('signup')} />
          <FAQAccordion />
        </main>
        <Footer 
          onSignupClick={() => navigate('signup')}
          onPricingClick={() => navigate('pricing')}
          onDemoClick={() => setDemoOpen(true)}
        />
      </div>
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
      {signupOpen && <SignupModal onClose={() => { setSignupOpen(false); navigate('login'); }} />}
    </>
  );
}


