import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function EditCreditModal({ isOpen, user, onClose, onSave }) {
  const [creditType, setCreditType] = useState(
    user?.credits?.toLowerCase().includes('no credit limit') ? 'no_limit' : 'custom'
  );
  const [amount, setAmount] = useState(
    parseInt(user?.credits) || 250
  );

  if (!isOpen || !user) return null;

  const handleSave = (e) => {
    e.preventDefault();
    const newCreditText = creditType === 'no_limit' 
      ? 'No credit limit' 
      : `${amount} credits/mo`;
    onSave(user.id, newCreditText);
    onClose();
  };

  return (
    <div className="apollo-modal-backdrop" onClick={onClose}>
      <div className="apollo-modal-container" onClick={e => e.stopPropagation()}>
        <div className="apollo-modal-header">
          <h2>Edit Credit Limit for {user.name}</h2>
          <button className="apollo-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div className="apollo-modal-body">
            <p style={{ fontSize: 13, color: '#4b5563', margin: 0 }}>
              Adjust the monthly export credits allocation for <strong>{user.email}</strong>.
            </p>

            <div className="modal-field-group" style={{ marginTop: 8 }}>
              <label>Credit Allocation Type</label>
              <select 
                value={creditType} 
                onChange={e => setCreditType(e.target.value)}
              >
                <option value="no_limit">No credit limit (Unlimited pooled credits)</option>
                <option value="custom">Set monthly credit limit</option>
              </select>
            </div>

            {creditType === 'custom' && (
              <div className="modal-field-group">
                <label>Monthly Credits Cap</label>
                <input 
                  type="number" 
                  min="10" 
                  max="50000" 
                  value={amount} 
                  onChange={e => setAmount(e.target.value)}
                  required
                />
                <span className="helper-text">Unused credits do not roll over to next billing month.</span>
              </div>
            )}
          </div>

          <div className="apollo-modal-footer">
            <button type="button" className="btn-apollo-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-apollo-yellow">
              <Check size={14} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
