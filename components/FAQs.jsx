"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { q: 'What types of videos do you create?', a: 'Product demos, launch videos, ads, product explainers, keynotes.' },
    { q: 'How do you learn about our product/ service?', a: 'We start with an onboarding call to understand your product, target audience, key features, and video goals. We then set up a dedicated Google Drive for screen recordings, brand assets, logos, references, and project files. If needed, we’ll also get demo access to your product so our team can understand it inside and out.' },
    { q: 'How much does a video cost?', a: 'Our videos start at $1000, with projects typically ranging up to $10,000+, depending on the video’s complexity, style, and duration. We take 50% upfront and 50% upon final delivery.' },
    { q: 'How long does a video take?', a: 'Once the storyboard is approved, animation typically takes 8-10 business days. More complex projects may require additional time.' },
    { q: 'Do you offer monthly packages?', a: 'Yes. We offer monthly retainers for brands that need ongoing video production, including product demos, feature launches, ad creatives, explainers, and other marketing content.' }
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div>
        <h2 className="section-title">Your questions<br/>answered.</h2>
        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(index)}>
                {faq.q}
                <span className="icon">+</span>
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="contact-card">
          <div className="client-avatar" style={{ margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👋</div>
          <h3>Still have questions?</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '15px 0' }}>We're here to help you understand how motion design can elevate your product.</p>
          <Link href="/start-project" className="cta-button primary-cta">Book a call</Link>
        </div>
      </div>
    </section>
  );
}
