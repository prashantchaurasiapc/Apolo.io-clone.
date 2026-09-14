import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle2, CreditCard, FileText, Landmark, Lock, 
  Sparkles, X, ChevronRight, AlertCircle, Building, Check, ArrowRight,
  Download, Zap
} from 'lucide-react';
import './SuperAdminScraperPaymentModal.css';

export default function SuperAdminScraperPaymentModal({ isOpen, onClose, onSuccess, initialBillingCycle = 'annual' }) {
  const [billingCycle, setBillingCycle] = useState(initialBillingCycle); // 'monthly' | 'annual'
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'invoice' | 'ach'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptId, setReceiptId] = useState('');

  // Form states
  const [cardData, setCardData] = useState({
    name: 'Shivam Ahirwar',
    number: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvc: '•••',
    zip: '94105'
  });

  const [invoiceData, setInvoiceData] = useState({
    companyLegalName: 'Kiaan Enterprise Technologies Inc.',
    taxId: 'US-EIN-94-8219034',
    apEmail: 'billing-ap@kiaan.ai',
    poNumber: 'PO-2026-KSC-091',
    terms: 'Net-30 Days'
  });

  const [achData, setAchData] = useState({
    bankName: 'Silicon Valley Bank / First Republic',
    routingNumber: '121000358',
    accountNumber: '••••••••8831',
    accountType: 'Corporate Checking'
  });

  if (!isOpen) return null;

  const monthlyPrice = 149;
  const annualPrice = 1490; // $124/mo equivalent (Save 20%)
  const totalAmount = billingCycle === 'annual' ? annualPrice : monthlyPrice;

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedId = `INV-KSC-${Math.floor(100000 + Math.random() * 900000)}`;
      setReceiptId(generatedId);
      setIsProcessing(false);
      setIsSuccess(true);
      if (onSuccess) {
        onSuccess({
          plan: 'Unlimited Scraping Engine',
          billingCycle,
          price: totalAmount,
          method: paymentMethod,
          receiptId: generatedId,
          activatedAt: new Date().toISOString()
        });
      }
    }, 1200);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="super-admin-modal-overlay" onClick={onClose}>
      <div className="super-admin-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="super-admin-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {!isSuccess ? (
          <div className="super-admin-modal-body">
            
            {/* Header with Super Admin Tag */}
            <div className="super-admin-modal-header">
              <div className="super-admin-badge-row">
                <span className="super-admin-pill">
                  <ShieldCheck size={13} /> SUPER ADMIN PRIVILEGE
                </span>
                <span className="workspace-pill">
                  Workspace: Kiaan Apollo Enterprise
                </span>
              </div>
              <h2 className="super-admin-modal-title">
                Unlock Unlimited Scraping Engine
              </h2>
              <p className="super-admin-modal-desc">
                Deploy unmetered automated web, LinkedIn Sales Navigator, and directory scraping with rotating residential proxies and zero credit deduction.
              </p>
            </div>

            {/* Plan Tier Selection & Pricing */}
            <div className="scraper-pricing-box">
              <div className="scraper-billing-toggle">
                <button 
                  type="button"
                  className={`billing-toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
                  onClick={() => setBillingCycle('annual')}
                >
                  Annual (20% Off)
                  <span className="save-badge">Save $298</span>
                </button>
                <button 
                  type="button"
                  className={`billing-toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Monthly
                </button>
              </div>

              <div className="scraper-pricing-display">
                <div className="price-num">
                  <span className="currency">$</span>
                  <span className="amount">{billingCycle === 'annual' ? '124' : '149'}</span>
                  <span className="freq">/month</span>
                </div>
                <div className="price-meta">
                  {billingCycle === 'annual' ? (
                    <span className="annual-billed">Billed annually as ${annualPrice}/year</span>
                  ) : (
                    <span className="annual-billed">Billed monthly, cancel anytime</span>
                  )}
                  <span className="tax-notice">Includes full Super Admin corporate SLA</span>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="scraper-features-list">
              <div className="scraper-feature-item">
                <Zap size={14} className="feat-icon" />
                <span><strong>∞ Unlimited Lead Scraping:</strong> Zero per-record credits, extract high-volume lists 24/7.</span>
              </div>
              <div className="scraper-feature-item">
                <CheckCircle2 size={14} className="feat-icon" />
                <span><strong>Rotating Residential Proxies:</strong> 100+ dedicated multi-region nodes with 99.8% uptime.</span>
              </div>
              <div className="scraper-feature-item">
                <CheckCircle2 size={14} className="feat-icon" />
                <span><strong>Bypass Detection & CAPTCHA:</strong> Built-in anti-bot bypass & stealth browser emulation.</span>
              </div>
              <div className="scraper-feature-item">
                <CheckCircle2 size={14} className="feat-icon" />
                <span><strong>Live Multi-Engine Crawling:</strong> LinkedIn, Google Maps, AngelList, Crunchbase & custom domains.</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="payment-methods-tabs">
              <div className="tabs-header-label">Select Payment Method (Super Admin):</div>
              <div className="payment-options-grid">
                
                <button 
                  type="button"
                  className={`payment-option-card ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={18} />
                  <div className="option-title">Corporate Card</div>
                  <div className="option-desc">Visa, Mastercard, Amex</div>
                </button>

                <button 
                  type="button"
                  className={`payment-option-card ${paymentMethod === 'invoice' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('invoice')}
                >
                  <FileText size={18} />
                  <div className="option-title">Corporate Invoice</div>
                  <div className="option-desc">Net-30 / Wire Transfer</div>
                </button>

                <button 
                  type="button"
                  className={`payment-option-card ${paymentMethod === 'ach' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('ach')}
                >
                  <Landmark size={18} />
                  <div className="option-title">ACH Bank Debit</div>
                  <div className="option-desc">Direct corporate US bank</div>
                </button>

              </div>
            </div>

            {/* Payment Form Fields */}
            <form onSubmit={handleSubmitPayment} className="payment-details-form">
              
              {/* Option 1: Card */}
              {paymentMethod === 'card' && (
                <div className="form-fields-group">
                  <div className="form-row">
                    <label>Cardholder Name</label>
                    <input 
                      type="text" 
                      value={cardData.name} 
                      onChange={(e) => setCardData({...cardData, name: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-row">
                    <label>Card Number</label>
                    <div className="input-with-icon">
                      <CreditCard size={16} className="input-inner-icon" />
                      <input 
                        type="text" 
                        value={cardData.number} 
                        onChange={(e) => setCardData({...cardData, number: e.target.value})}
                        required 
                      />
                    </div>
                  </div>
                  <div className="form-grid-2">
                    <div className="form-row">
                      <label>Expires</label>
                      <input 
                        type="text" 
                        value={cardData.expiry} 
                        onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="form-row">
                      <label>CVC / CVV</label>
                      <input 
                        type="text" 
                        value={cardData.cvc} 
                        onChange={(e) => setCardData({...cardData, cvc: e.target.value})}
                        required 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Option 2: Corporate Net-30 Invoice */}
              {paymentMethod === 'invoice' && (
                <div className="form-fields-group invoice-box">
                  <div className="corporate-invoice-notice">
                    <Building size={16} />
                    <span>Invoices will be issued immediately under Net-30 terms. Unlimited Scraping activates instantly upon submission.</span>
                  </div>
                  <div className="form-grid-2">
                    <div className="form-row">
                      <label>Legal Entity Name</label>
                      <input 
                        type="text" 
                        value={invoiceData.companyLegalName} 
                        onChange={(e) => setInvoiceData({...invoiceData, companyLegalName: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="form-row">
                      <label>Tax ID / VAT Number</label>
                      <input 
                        type="text" 
                        value={invoiceData.taxId} 
                        onChange={(e) => setInvoiceData({...invoiceData, taxId: e.target.value})}
                        required 
                      />
                    </div>
                  </div>
                  <div className="form-grid-2">
                    <div className="form-row">
                      <label>Accounts Payable (AP) Email</label>
                      <input 
                        type="email" 
                        value={invoiceData.apEmail} 
                        onChange={(e) => setInvoiceData({...invoiceData, apEmail: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="form-row">
                      <label>Purchase Order (PO) #</label>
                      <input 
                        type="text" 
                        value={invoiceData.poNumber} 
                        onChange={(e) => setInvoiceData({...invoiceData, poNumber: e.target.value})}
                        placeholder="e.g. PO-89102" 
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <label>Payment Terms</label>
                    <input type="text" value={invoiceData.terms} disabled className="disabled-input" />
                  </div>
                </div>
              )}

              {/* Option 3: ACH Bank Debit */}
              {paymentMethod === 'ach' && (
                <div className="form-fields-group">
                  <div className="form-row">
                    <label>Depository Bank Name</label>
                    <input 
                      type="text" 
                      value={achData.bankName} 
                      onChange={(e) => setAchData({...achData, bankName: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-grid-2">
                    <div className="form-row">
                      <label>Routing Transit Number (ABA)</label>
                      <input 
                        type="text" 
                        value={achData.routingNumber} 
                        onChange={(e) => setAchData({...achData, routingNumber: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="form-row">
                      <label>Corporate Account Number</label>
                      <input 
                        type="text" 
                        value={achData.accountNumber} 
                        onChange={(e) => setAchData({...achData, accountNumber: e.target.value})}
                        required 
                      />
                    </div>
                  </div>
                  <div className="ach-auth-text">
                    By submitting, you authorize Kiaan Technologies Inc. to initiate debit entries to your specified corporate checking account.
                  </div>
                </div>
              )}

              {/* Submit & Security Lock Footer */}
              <div className="modal-submit-area">
                <div className="security-guarantee">
                  <Lock size={14} />
                  <span>256-bit SSL encrypted • Authorized Super Admin transaction</span>
                </div>
                
                <div className="modal-action-buttons">
                  <button type="button" className="btn-modal-cancel" onClick={onClose} disabled={isProcessing}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-modal-confirm-pay" disabled={isProcessing}>
                    {isProcessing ? (
                      <span className="btn-loading">
                        <span className="spinner-dots" /> Verifying Super Admin Payment...
                      </span>
                    ) : (
                      <>
                        <span>
                          {paymentMethod === 'invoice' 
                            ? `Authorize Net-30 ($${totalAmount}) & Activate` 
                            : `Authorize $${totalAmount} & Activate Unlimited`}
                        </span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>

          </div>
        ) : (
          /* Success Screen */
          <div className="super-admin-success-view">
            <div className="success-icon-badge">
              <Check size={36} />
            </div>
            
            <div className="success-super-badge">
              <ShieldCheck size={14} /> SUPER ADMIN SUBSCRIPTION CONFIRMED
            </div>

            <h2>Unlimited Scraping Engine Active</h2>
            <p className="success-message">
              Congratulations! Your Apollo workspace now has unmetered access to the high-concurrency scraping pipeline. All credit limits on LinkedIn, Domain, and Directory crawlers have been removed.
            </p>

            <div className="success-receipt-card">
              <div className="receipt-row">
                <span className="receipt-label">Invoice Ref:</span>
                <span className="receipt-val font-mono">{receiptId}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Subscription:</span>
                <span className="receipt-val">Unlimited Scraping Engine Add-on</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Billing Cycle:</span>
                <span className="receipt-val">{billingCycle === 'annual' ? 'Annual ($1,490/yr)' : 'Monthly ($149/mo)'}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Payment Method:</span>
                <span className="receipt-val">
                  {paymentMethod === 'card' && 'Corporate Credit Card (•••• 4242)'}
                  {paymentMethod === 'invoice' && 'Corporate Net-30 Invoicing'}
                  {paymentMethod === 'ach' && 'ACH Corporate Direct Debit'}
                </span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Scraping Concurrency:</span>
                <span className="receipt-val text-green">16 / 16 Workers (Unthrottled)</span>
              </div>
            </div>

            <div className="success-actions">
              <button type="button" className="btn-apollo-primary-launch" onClick={handleFinish}>
                <span>Launch Unlimited Lead Scraper</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
