import React, { useState } from 'react';
import { X, UserPlus, Info } from 'lucide-react';

export default function InviteUserModal({ isOpen, onClose, onInvite }) {
  const [emails, setEmails] = useState('');
  const [permissionProfile, setPermissionProfile] = useState('Admin');
  const [creditLimit, setCreditLimit] = useState('no_limit');
  const [customCredits, setCustomCredits] = useState('100');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emails.trim()) return;

    // Support multiple comma/space/newline separated emails
    const emailList = emails
      .split(/[\s,]+/)
      .map(item => item.trim())
      .filter(item => item.includes('@'));

    if (emailList.length === 0) {
      alert('Please enter at least one valid email address.');
      return;
    }

    const creditText = creditLimit === 'no_limit' 
      ? 'No credit limit' 
      : `${customCredits} credits/mo`;

    emailList.forEach(email => {
      const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      onInvite({
        id: Date.now() + Math.random(),
        name: name,
        email: email,
        avatar: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U',
        permission: permissionProfile,
        credits: creditText,
        isYou: false
      });
    });

    setEmails('');
    onClose();
  };

  return (
    <div className="apollo-modal-backdrop" onClick={onClose}>
      <div className="apollo-modal-container" onClick={e => e.stopPropagation()}>
        <div className="apollo-modal-header">
          <h2>Invite Teammates to Apollo</h2>
          <button className="apollo-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="apollo-modal-body">
            <div className="modal-field-group">
              <label>Email Addresses</label>
              <textarea 
                rows={3}
                placeholder="colleague@company.com, sales@company.com"
                value={emails}
                onChange={e => setEmails(e.target.value)}
                required
                autoFocus
              />
              <span className="helper-text">Enter one or multiple email addresses separated by commas or spaces.</span>
            </div>

            <div className="modal-field-group">
              <label>Permission Profile</label>
              <select 
                value={permissionProfile} 
                onChange={e => setPermissionProfile(e.target.value)}
              >
                <option value="Admin">Admin (Full workspace access & billing)</option>
                <option value="Standard">Standard (Prospecting, sequences, deals)</option>
                <option value="Manager">Manager (Team reporting, templates)</option>
                <option value="Limited">Limited (Read-only access)</option>
              </select>
            </div>

            <div className="modal-field-group">
              <label>Export Credits Limit</label>
              <select 
                value={creditLimit} 
                onChange={e => setCreditLimit(e.target.value)}
              >
                <option value="no_limit">No credit limit (Unlimited pooled credits)</option>
                <option value="custom">Custom monthly credit cap</option>
              </select>
            </div>

            {creditLimit === 'custom' && (
              <div className="modal-field-group">
                <label>Monthly Credit Limit</label>
                <input 
                  type="number" 
                  min="1" 
                  max="10000" 
                  value={customCredits} 
                  onChange={e => setCustomCredits(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="apollo-modal-footer">
            <button type="button" className="btn-apollo-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-apollo-yellow">
              <UserPlus size={14} /> Send Invitations
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
