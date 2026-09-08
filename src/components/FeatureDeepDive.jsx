import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Bot, 
  Zap, 
  Layers, 
  RefreshCw, 
  ShieldCheck, 
  Globe2 
} from 'lucide-react';
import './FeatureDeepDive.css';

export default function FeatureDeepDive() {
  return (
    <section className="feature-deepdive-section">
      <div className="container">
        {/* Feature Block 1: Outbound AI */}
        <div className="feature-block">
          <div>
            <span className="feature-tag-badge">OUTBOUND INTELLIGENCE</span>
            <h2 className="feature-heading">
              Turn hours of prospecting into minutes
            </h2>
            <p className="feature-desc">
              Find decision-makers instantly using 65+ buyer intent filters, verified email addresses, and direct phone numbers powered by Apollo's self-healing database.
            </p>
            <ul className="feature-list">
              <li className="feature-list-item">
                <CheckCircle2 size={20} color="#16A34A" /> 275M+ verified B2B buyer profiles
              </li>
              <li className="feature-list-item">
                <CheckCircle2 size={20} color="#16A34A" /> Intent signals: hiring surges, tech stack & funding changes
              </li>
              <li className="feature-list-item">
                <CheckCircle2 size={20} color="#16A34A" /> AI-generated personalized email sequences in 1 click
              </li>
            </ul>
            <a href="#prospecting" className="btn-apollo-primary">
              <Sparkles size={16} /> Start Prospecting Free
            </a>
          </div>

          <div className="feature-visual-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ fontWeight: '700', fontSize: '18px' }}>AI Prospecting Assistant</div>
              <span style={{ background: '#E2FC00', padding: '4px 10px', borderRadius: '99px', fontWeight: '700', fontSize: '12px' }}>
                98.4% Match
              </span>
            </div>

            <div style={{ background: '#FAF9F5', padding: '20px', borderRadius: '12px', border: '1px solid #E5E2DA', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#666', marginBottom: '8px' }}>PROSPECT INTENT DETECTED</div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#0F0F0F' }}>
                "Acme Corp just expanded engineering team by 45% and installed Salesforce Enterprise"
              </div>
            </div>

            <div className="stat-dial-box">
              <div style={{ background: '#0F0F0F', color: '#FFF', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                AI
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>Automated Sequence Triggered</div>
                <div style={{ fontSize: '13px', color: '#666' }}>3-step hyper-personalized outreach draft ready</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Block 2: Data & Workflows */}
        <div className="feature-block">
          <div className="feature-visual-box" style={{ order: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Globe2 size={28} color="#0F0F0F" />
              <div>
                <div style={{ fontWeight: '800', fontSize: '18px' }}>Living Data Network</div>
                <div style={{ fontSize: '13px', color: '#666' }}>Real-time verification pipeline</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: '#FAF9F5', padding: '16px', borderRadius: '12px', border: '1px solid #E5E2DA' }}>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#16A34A' }}>&lt; 0.5s</div>
                <div style={{ fontSize: '12px', color: '#666' }}>CRM Sync Latency</div>
              </div>
              <div style={{ background: '#FAF9F5', padding: '16px', borderRadius: '12px', border: '1px solid #E5E2DA' }}>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#2563EB' }}>100M+</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Monthly Updates</div>
              </div>
            </div>

            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '14px', borderRadius: '10px', color: '#065F46', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} /> GDPR, CCPA & SOC-2 Type II Certified
            </div>
          </div>

          <div style={{ order: 1 }}>
            <span className="feature-tag-badge">WORKFLOW ENGINE</span>
            <h2 className="feature-heading">
              Automate your entire sales stack in one place
            </h2>
            <p className="feature-desc">
              Connect Apollo directly to Salesforce, HubSpot, Outreach, Gong, and LinkedIn. Eliminate repetitive manual tasks and keep your CRM data 100% enriched.
            </p>
            <ul className="feature-list">
              <li className="feature-list-item">
                <CheckCircle2 size={20} color="#16A34A" /> Bi-directional CRM synchronization with zero data loss
              </li>
              <li className="feature-list-item">
                <CheckCircle2 size={20} color="#16A34A" /> Auto-assign leads to reps based on territory rules
              </li>
              <li className="feature-list-item">
                <CheckCircle2 size={20} color="#16A34A" /> Native Chrome Extension for LinkedIn prospecting
              </li>
            </ul>
            <a href="#integrations" className="btn-apollo-secondary">
              <Zap size={16} /> Explore 50+ Integrations
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
