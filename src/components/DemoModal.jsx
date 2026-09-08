import React, { useState } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import './DemoModal.css';

export default function DemoModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="demo-modal-overlay" onClick={onClose}>
      <div className="demo-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="demo-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <h2 className="demo-modal-title">See Apollo in action</h2>
            <p className="demo-modal-subtitle">
              We'd love to show how Apollo can help you sell better.
            </p>

            <form onSubmit={handleSubmit} className="demo-modal-form">
              <input
                type="email"
                className="demo-modal-input"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
              <button type="submit" className="demo-modal-btn">
                <span>Get a demo</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="demo-modal-disclaimer">
              By submitting this form, you will receive information, tips, and promotions from Apollo. To learn more, see our <a href="#privacy">Privacy Statement</a>.
            </p>

            <div className="demo-modal-reviews">
              <span className="demo-stars">★★★★★</span>
              <span className="demo-reviews-text">4.7/5 based on 9,690 reviews | GDPR compliant</span>
            </div>
          </>
        ) : (
          <div className="demo-modal-success">
            <div className="demo-success-icon">
              <Check size={28} />
            </div>
            <h3 className="demo-success-title">Demo Request Received!</h3>
            <p className="demo-success-desc">
              Thank you for your interest. An Apollo specialist will reach out to <strong>{email}</strong> shortly with a personalized walkthrough.
            </p>
            <button className="demo-modal-btn" onClick={onClose} style={{ marginTop: '20px' }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
