import React, { useState } from 'react';
import { 
  Key, Plus, Copy, Check, ShieldCheck, Globe, 
  Sparkles, CheckCircle2, RefreshCw,
  Users, Sliders, Laptop
} from 'lucide-react';
import SuperAdminScraperPaymentModal from '../../dashboard/ai/SuperAdminScraperPaymentModal';

export function ProfileSettingsView({ user, showToast }) {
  const [name, setName] = useState(user?.name || 'Shivam Ahirwar');
  const [title, setTitle] = useState('Founding Account Executive');
  const [timezone, setTimezone] = useState('Asia/Kolkata (GMT+05:30)');

  const handleSave = (e) => {
    e.preventDefault();
    showToast?.('Profile updated successfully');
  };

  return (
    <div className="settings-content-wrapper">
      <div className="settings-view-title-block">
        <h1>Personal Profile</h1>
        <p>Manage your account settings, avatar, and time zone.</p>
      </div>

      <div className="settings-card">
        <h2>Profile Details</h2>
        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', background: '#bfdbfe', color: '#1d4ed8',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700
            }}>
              {user?.avatar || 'SA'}
            </div>
            <div>
              <button type="button" className="btn-apollo-outline" onClick={() => showToast?.('Upload avatar photo')}>
                Upload new picture
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div className="modal-field-group">
              <label>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="modal-field-group">
              <label>Email Address</label>
              <input type="email" value={user?.email || 'shivamahirwar773@gmail.com'} disabled />
            </div>
            <div className="modal-field-group">
              <label>Job Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="modal-field-group">
              <label>Time Zone</label>
              <select value={timezone} onChange={e => setTimezone(e.target.value)}>
                <option>Asia/Kolkata (GMT+05:30)</option>
                <option>America/Los_Angeles (GMT-07:00)</option>
                <option>America/New_York (GMT-04:00)</option>
                <option>Europe/London (GMT+01:00)</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-apollo-yellow">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export function MailboxesSettingsView({ showToast }) {
  return (
    <div className="settings-content-wrapper">
      <div className="settings-view-title-block">
        <h1>Mailboxes</h1>
        <p>Connect and configure email sending accounts for automated sequences.</p>
      </div>

      <div className="settings-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2>Connected Mailboxes</h2>
          <button className="btn-apollo-yellow" onClick={() => showToast?.('Connecting Google / Outlook account...')}>
            <Plus size={14} /> Connect Mailbox
          </button>
        </div>

        <table className="users-table">
          <thead>
            <tr><th>EMAIL</th><th>PROVIDER</th><th>DAILY LIMIT</th><th>HEALTH</th><th>STATUS</th></tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600 }}>shivamahirwar773@gmail.com</td>
              <td>Google Workspace</td>
              <td>400 / day</td>
              <td><span style={{ color: '#16a34a', fontWeight: 600 }}>98% Excellent</span></td>
              <td><span className="pill-badge">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PlanOverviewView({ showToast }) {
  const [isUnlimitedActive, setIsUnlimitedActive] = useState(() => {
    try {
      return localStorage.getItem('apollo_unlimited_scraping') === 'true';
    } catch  {
      return false;
    }
  });
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const handlePaymentSuccess = () => {
    setIsUnlimitedActive(true);
    try {
      localStorage.setItem('apollo_unlimited_scraping', 'true');
    } catch  {}
    showToast?.('Super Admin Unlimited Scraping subscription active!');
  };

  return (
    <div className="settings-content-wrapper">
      <div className="settings-view-title-block">
        <h1>Plan & Billing Overview</h1>
        <p>Manage your Apollo workspace tier, seats, and enterprise scraping add-ons.</p>
      </div>

      {/* Main Base Plan */}
      <div className="settings-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="pill-badge" style={{ background: '#dbeafe', color: '#1e40af', marginBottom: 8 }}>
              Active Base Plan
            </span>
            <h2 style={{ fontSize: 22, marginTop: 6, marginBottom: 4 }}>Enterprise Unlimited Plan</h2>
            <p style={{ fontSize: 13, color: '#64748b' }}>Next automatic renewal on Oct 08, 2026 ($99/mo per seat)</p>
          </div>
          <button className="btn-apollo-yellow" onClick={() => showToast?.('Plan management portal loaded')}>
            Manage Plan
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24 }}>
          <div style={{ padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>EXPORT CREDITS</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginTop: 4 }}>Unlimited</div>
          </div>
          <div style={{ padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>ACTIVE SEATS</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginTop: 4 }}>1 / 5 Used</div>
          </div>
          <div style={{ padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>MOBILE DIALER</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginTop: 4 }}>Included</div>
          </div>
        </div>
      </div>

      {/* Super Admin Unlimited Scraping Add-on Card */}
      <div className="settings-card" style={{ marginTop: 24, border: isUnlimitedActive ? '1.5px solid #86efac' : '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span className="pill-badge" style={{ 
                background: isUnlimitedActive ? '#dcfce7' : '#fef3c7', 
                color: isUnlimitedActive ? '#15803d' : '#92400e',
                fontWeight: 700
              }}>
                {isUnlimitedActive ? '✓ ACTIVE ADD-ON' : 'SUPER ADMIN PRIVILEGE'}
              </span>
              <span style={{ fontSize: 12, color: '#64748b' }}>Workspace-wide add-on</span>
            </div>
            <h2 style={{ fontSize: 20, marginTop: 4, marginBottom: 6, color: '#0f172a' }}>
              Unlimited Scraping Engine
            </h2>
            <p style={{ fontSize: 13, color: '#64748b', maxWidth: 640, lineHeight: 1.45 }}>
              Unmetered web crawling, LinkedIn Sales Navigator extraction, and Google Maps directory scraping with 100+ rotating residential proxies. $149/mo (or $1,490/yr) with Net-30 Corporate Invoice or Card.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {isUnlimitedActive ? (
              <button 
                className="btn-apollo-outline" 
                onClick={() => setPaymentModalOpen(true)}
                style={{ padding: '8px 14px', fontSize: 13 }}
              >
                Manage Invoicing / Net-30
              </button>
            ) : (
              <button 
                className="btn-apollo-yellow" 
                onClick={() => setPaymentModalOpen(true)}
                style={{ padding: '8px 16px', fontSize: 13, fontWeight: 600 }}
              >
                Upgrade to Unlimited ($149/mo)
              </button>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 20 }}>
          <div style={{ padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>SCRAPING VOLUME</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: isUnlimitedActive ? '#16a34a' : '#0f172a', marginTop: 4 }}>
              {isUnlimitedActive ? '∞ Unlimited' : '8,420 credits/mo'}
            </div>
          </div>
          <div style={{ padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>ROTATING PROXIES</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginTop: 4 }}>
              {isUnlimitedActive ? '100+ Dedicated IPs' : '16 Standard IPs'}
            </div>
          </div>
          <div style={{ padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>PAYMENT TERMS</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginTop: 4 }}>
              Net-30 / Corp Card
            </div>
          </div>
        </div>
      </div>

      {/* Super Admin Payment Modal */}
      <SuperAdminScraperPaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

export function ApiKeysSettingsView({ showToast }) {
  const [apiKey, setApiKey] = useState('apl_live_9f8382910fae412984bbf0192e44');
  const [copied, setCopied] = useState(false);

  const copyKey = () => {
    navigator.clipboard?.writeText(apiKey);
    setCopied(true);
    showToast?.('API Key copied to clipboard');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="settings-content-wrapper">
      <div className="settings-view-title-block">
        <h1>API Keys</h1>
        <p>Generate personal and workspace API keys for integrations and webhook automation.</p>
      </div>

      <div className="settings-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2>Active API Key</h2>
          <button className="btn-apollo-yellow" onClick={() => showToast?.('Generated new API Key')}>
            <Plus size={14} /> Generate New Key
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f8fafc', padding: 12, borderRadius: 6, border: '1px solid #e2e8f0' }}>
          <Key size={16} color="#64748b" />
          <code style={{ fontSize: 13, flex: 1, fontFamily: 'monospace' }}>{apiKey}</code>
          <button className="btn-apollo-outline" onClick={copyKey} style={{ padding: '4px 8px', fontSize: 12 }}>
            {copied ? <Check size={13} color="#16a34a" /> : <Copy size={13} />} {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function IntegrationsSettingsView({ showToast }) {
  const integrations = [
    { name: 'Salesforce', desc: 'Sync contacts, leads, and accounts bidirectionally.', connected: true, icon: '☁️' },
    { name: 'HubSpot', desc: 'Auto-log sequences, emails, and notes to HubSpot CRM.', connected: false, icon: '🟠' },
    { name: 'LinkedIn Sales Navigator', desc: 'Enrich lead profiles right in Apollo.', connected: true, icon: '💼' },
    { name: 'Zapier', desc: 'Connect Apollo workflows with 5,000+ apps.', connected: true, icon: '⚡' }
  ];

  return (
    <div className="settings-content-wrapper">
      <div className="settings-view-title-block">
        <h1>Connected Integrations</h1>
        <p>Supercharge your prospecting by syncing Apollo with your CRM and favorite tools.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {integrations.map(item => (
          <div key={item.name} className="settings-card" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 4px 0' }}>{item.name}</h3>
                  <p style={{ fontSize: 12.5, color: '#64748b', margin: 0 }}>{item.desc}</p>
                </div>
              </div>
              <span className={`pill-badge ${item.connected ? 'green' : ''}`}>
                {item.connected ? 'Connected' : 'Connect'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GenericSettingsSectionView({ title, description, badgeText, contentLines = [] }) {
  return (
    <div className="settings-content-wrapper">
      <div className="settings-view-title-block">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="settings-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h2>Configuration & Settings</h2>
          {badgeText && <span className="pill-badge">{badgeText}</span>}
        </div>
        {contentLines.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#334155' }}>
            {contentLines.map((line, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle2 size={14} color="#16a34a" />
                <span>{line}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 13, color: '#64748b' }}>
            All settings and options for <strong>{title}</strong> are operating with optimal Apollo recommended defaults.
          </p>
        )}
      </div>
    </div>
  );
}
