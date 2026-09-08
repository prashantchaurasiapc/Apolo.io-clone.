import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQAccordion.css';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Apollo.io?",
      answer: "Apollo.io is an all-in-one AI sales platform that helps revenue teams prospect, engage buyers, and close deals. It features a database of 275M+ verified contacts, AI email writer, multi-channel sales engagement sequences, and automated data enrichment."
    },
    {
      question: "How accurate is Apollo's B2B contact data compared to ZoomInfo?",
      answer: "Apollo's living data network uses real-time verification algorithms to deliver 99.2% email deliverability. Our data is continuously updated through crowdsourced updates, public registries, and direct contributor networks, offering fresh data at a fraction of ZoomInfo's cost."
    },
    {
      question: "Can I get started for free?",
      answer: "Yes! Apollo offers a Free Forever plan that includes unlimited email sending, 60 mobile credits per year, 120 export credits per year, basic filter access, and sequence automation with no credit card required."
    },
    {
      question: "What CRM integrations does Apollo support?",
      answer: "Apollo seamlessly connects bi-directionally with Salesforce, HubSpot, Outreach, Salesloft, Gong, Marketo, and Zapier. You can auto-sync contacts, deals, activities, and enrichment fields with zero manual effort."
    },
    {
      question: "How does Apollo's AI Assistant help sales reps?",
      answer: "Apollo AI generates highly personalized 1:1 email drafts based on prospect research and intent signals, summarizes sales calls, predicts buyer interest, and suggests optimal follow-up steps for reps."
    },
    {
      question: "Is Apollo compliant with GDPR and CCPA privacy laws?",
      answer: "Yes. Apollo is SOC-2 Type II certified, ISO 27001 compliant, and adheres strictly to GDPR and CCPA privacy regulations. Users have total control over their data rights and privacy opt-outs."
    }
  ];

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <h2 className="faq-title">Frequently asked questions</h2>
        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button 
                  className="faq-question-btn"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                >
                  <span>{faq.question}</span>
                  <div className="faq-icon-wrapper">
                    <ChevronDown size={18} />
                  </div>
                </button>
                {isOpen && (
                  <div className="faq-answer animate-slide-up">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
