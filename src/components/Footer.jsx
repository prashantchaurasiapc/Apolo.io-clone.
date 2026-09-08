import React from 'react';
import './Footer.css';

export default function Footer({ onSignupClick, onPricingClick, onDemoClick }) {
  return (
    <footer className="apollo-footer">
      <div className="apollo-footer-container">
        {/* ── Left Column: Giant Apollo Propeller Logo & Legal ── */}
        <div className="apollo-footer-brand">
          <div className="apollo-footer-giant-logo">
            <svg 
              width="180" 
              height="180" 
              viewBox="0 0 200 200" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="apollo-propeller-svg"
            >
              {/* 7 Curved Propeller Blades matching original Apollo logo */}
              {[0, 51.43, 102.86, 154.29, 205.71, 257.14, 308.57].map((deg, i) => (
                <path
                  key={i}
                  d="M100,24 C107,24 116,28 119,34 C124,44 121,60 110,75 C105,82 98,82 94,77 C91,72 92,64 94,54 C96,44 96,32 100,24 Z"
                  fill="#1C1C1C"
                  transform={`rotate(${deg} 100 100)`}
                />
              ))}
              {/* Central counter-blades giving curved boomerang look */}
              {[0, 51.43, 102.86, 154.29, 205.71, 257.14, 308.57].map((deg, i) => (
                <path
                  key={`hook-${i}`}
                  d="M100,26 C105,25 114,29 117,35 C122,46 117,66 102,80 C98,84 94,82 92,78 C90,74 91,66 94,55 C96,42 96,32 100,26 Z"
                  fill="#1C1C1C"
                  transform={`rotate(${deg} 100 100)`}
                />
              ))}
            </svg>
          </div>

          <div className="apollo-footer-brand-text">
            <p className="apollo-footer-brand-title">Apollo.io</p>
            <p className="apollo-footer-copy">© 2026 Zenprospect, Inc.</p>
            <p className="apollo-footer-copy-sub">All rights reserved.</p>
          </div>
        </div>

        {/* ── Right Links Grid (4 Columns, 2 Tiers) ── */}
        <div className="apollo-footer-nav-grid">
          {/* ══ Column 1: Get started & Use Cases ══ */}
          <div className="apollo-footer-col">
            <div className="apollo-nav-block">
              <h4 className="apollo-col-heading">Get started</h4>
              <ul className="apollo-link-list">
                <li>
                  <a 
                    href="#signup" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (onSignupClick) onSignupClick(); 
                    }}
                  >
                    Sign up for free
                  </a>
                </li>
                <li>
                  <a 
                    href="#pricing" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (onPricingClick) onPricingClick(); 
                    }}
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a 
                    href="#demo" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (onDemoClick) onDemoClick(); 
                    }}
                  >
                    Request a demo
                  </a>
                </li>
              </ul>
            </div>

            <div className="apollo-nav-block apollo-nav-block-bottom">
              <h4 className="apollo-col-heading">Use Cases</h4>
              <ul className="apollo-link-list">
                <li><a href="#database">B2B Database</a></li>
                <li><a href="#lead-scoring">Lead Scoring</a></li>
                <li><a href="#inbound-router">Inbound Lead Router</a></li>
                <li><a href="#sales-engagement">Sales Engagement</a></li>
                <li><a href="#scheduler">Meetings Scheduler</a></li>
                <li><a href="#deal-management">Deal Management</a></li>
                <li><a href="#call-recording">Sales Call Recording</a></li>
                <li><a href="#ci">Conversation Intelligence</a></li>
                <li><a href="#analytics">Sales Analytics</a></li>
                <li><a href="#coaching">Sales Coaching</a></li>
                <li><a href="#calling">Cold Calling</a></li>
                <li><a href="#deliverability">Email Deliverability</a></li>
                <li><a href="#visitor-id">Website Visitor Identification</a></li>
              </ul>
            </div>
          </div>

          {/* ══ Column 2: Solutions & Resources ══ */}
          <div className="apollo-footer-col">
            <div className="apollo-nav-block">
              <h4 className="apollo-col-heading">Solutions</h4>
              <ul className="apollo-link-list">
                <li><a href="#outbound">Outbound</a></li>
                <li><a href="#inbound">Inbound</a></li>
                <li><a href="#enrichment">Data Enrichment</a></li>
                <li><a href="#deal-execution">Deal Execution</a></li>
              </ul>
            </div>

            <div className="apollo-nav-block apollo-nav-block-bottom">
              <h4 className="apollo-col-heading">Resources</h4>
              <ul className="apollo-link-list">
                <li><a href="#academy">Apollo Academy</a></li>
                <li><a href="#magazine">Magazine</a></li>
                <li><a href="#insights">Insights</a></li>
                <li><a href="#partners">Partners</a></li>
                <li><a href="#kb">Knowledge Base &#8599;</a></li>
                <li><a href="#webinars">Webinars</a></li>
                <li><a href="#success-stories">Success Stories</a></li>
                <li><a href="#privacy-center">Privacy Center</a></li>
                <li><a href="#api-docs">API Docs &#8599;</a></li>
                <li><a href="#community">Join Our Community</a></li>
                <li><a href="#onboarding">Onboarding</a></li>
              </ul>
            </div>
          </div>

          {/* ══ Column 3: Platform, Company & Social ══ */}
          <div className="apollo-footer-col">
            <div className="apollo-nav-block">
              <h4 className="apollo-col-heading">Platform</h4>
              <ul className="apollo-link-list">
                <li><a href="#data">Apollo Data</a></li>
                <li><a href="#assistant">AI Assistant</a></li>
                <li><a href="#mcp">Apollo MCP</a></li>
                <li><a href="#integrations">Integrations</a></li>
                <li><a href="#extension">Chrome Extension</a></li>
                <li><a href="#workflow">Workflow Automation</a></li>
                <li><a href="#security">Security</a></li>
              </ul>
            </div>

            <div className="apollo-nav-block apollo-nav-block-bottom">
              <h4 className="apollo-col-heading">Company</h4>
              <ul className="apollo-link-list">
                <li><a href="#about">About Apollo</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#reviews">Customer Reviews</a></li>
                <li><a href="#newsroom">Newsroom</a></li>
                <li><a href="#contact">Contact Us &amp; Sales</a></li>
                <li><a href="#hey-ai">Hey AI, learn about us</a></li>
              </ul>

              <h4 className="apollo-col-heading apollo-social-subheading">Find us on social</h4>
              <ul className="apollo-link-list">
                <li><a href="#youtube">YouTube</a></li>
                <li><a href="#instagram">Instagram</a></li>
                <li><a href="#tiktok">TikTok</a></li>
                <li><a href="#x">X</a></li>
                <li><a href="#facebook">Facebook</a></li>
              </ul>
            </div>
          </div>

          {/* ══ Column 4: Roles, Ask AI, & Prospect Anywhere ══ */}
          <div className="apollo-footer-col">
            <div className="apollo-nav-block">
              <h4 className="apollo-col-heading">Roles</h4>
              <ul className="apollo-link-list">
                <li><a href="#sales-leaders">Sales Leaders</a></li>
                <li><a href="#ae">Account Executives</a></li>
                <li><a href="#sdr">Sales Development</a></li>
                <li><a href="#founders">Founders</a></li>
                <li><a href="#marketing">Marketing</a></li>
                <li><a href="#revops">Revenue Operations</a></li>
              </ul>
            </div>

            <div className="apollo-nav-block apollo-nav-block-bottom">
              <h4 className="apollo-col-heading">Ask AI about Apollo</h4>
              
              {/* 5 AI Badges Row */}
              <div className="apollo-ai-badges-row">
                {/* 1. ChatGPT */}
                <a href="#ask-chatgpt" className="apollo-ai-badge-btn" title="ChatGPT" aria-label="Ask ChatGPT">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.6607zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813v6.7227zm1.1451-2.2285l3.0478-1.7607 3.0478 1.7607v3.5215l-3.0478 1.7607-3.0478-1.7607z"/>
                  </svg>
                </a>

                {/* 2. Claude (Anthropic) */}
                <a href="#ask-claude" className="apollo-ai-badge-btn apollo-ai-claude" title="Claude" aria-label="Ask Claude">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/>
                  </svg>
                </a>

                {/* 3. Perplexity */}
                <a href="#ask-perplexity" className="apollo-ai-badge-btn" title="Perplexity" aria-label="Ask Perplexity">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M12 3v18M3 12h18"/>
                  </svg>
                </a>

                {/* 4. Grok / Mistral */}
                <a href="#ask-grok" className="apollo-ai-badge-btn apollo-ai-orange" title="Grok" aria-label="Ask Grok">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFFFFF">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-6.5l-2 2m-7 7l-2 2m11 0l-2-2m-7-7l-2-2" stroke="#FFFFFF" strokeWidth="2"/>
                  </svg>
                </a>

                {/* 5. Gemini */}
                <a href="#ask-gemini" className="apollo-ai-badge-btn" title="Gemini" aria-label="Ask Gemini">
                  <svg width="15" height="15" viewBox="0 0 24 24">
                    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" fill="#FFFFFF"/>
                  </svg>
                </a>
              </div>

              {/* Prospect Anywhere block */}
              <div className="apollo-prospect-block">
                <h4 className="apollo-col-heading">Prospect anywhere</h4>
                <p className="apollo-prospect-desc">
                  Get verified emails and phone numbers and instantly reach out while working in your favorite tools.
                </p>
                <a href="#extension" className="apollo-extension-btn">
                  Apollo Chrome Extension
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
