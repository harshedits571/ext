"use client";

import { useState } from 'react';

export default function OurProcess() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Onboarding',
      desc: 'After you submit your project, we get on an onboarding call to understand your product, ICP, where the video will be posted, what you want it to achieve, and the style you’re looking for.'
    },
    {
      num: '02',
      title: 'Collaborative Scripting',
      desc: 'Have a script? We’ll refine it.\nDon’t have one? We’ll write it from scratch based on your goals and what you’re trying to communicate.'
    },
    {
      num: '03',
      title: 'Storyboarding',
      desc: 'We storyboard the video frame by frame in Figma, with notes on what happens in each scene and how it will be animated. This gives you a clear idea of the video before we start animating.'
    },
    {
      num: '04',
      title: 'Animation & Sound Design',
      desc: 'Once the storyboard is approved, we bring it to life with animation, motion design, sound effects, and music.'
    },
    {
      num: '05',
      title: 'Post-Production',
      desc: 'We review the video, make the changes you want, and get it ready for delivery. You get 2 rounds of revisions included at no extra cost.'
    }
  ];

  const handleNext = () => setCurrentIndex((currentIndex + 1) % steps.length);
  const handlePrev = () => setCurrentIndex((currentIndex - 1 + steps.length) % steps.length);

  return (
    <section id="process" style={{ padding: '120px 5%', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 className="section-title">Our Process</h2>
      
      <div style={{ position: 'relative', maxWidth: '800px', margin: '60px auto 0', height: '350px' }}>
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              padding: '50px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              opacity: idx === currentIndex ? 1 : 0,
              visibility: idx === currentIndex ? 'visible' : 'hidden',
              transform: idx === currentIndex ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: idx === currentIndex ? '0 20px 40px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--border-color)', marginBottom: '20px', lineHeight: 1 }}>{step.num}</div>
            <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>{step.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{step.desc}</p>
          </div>
        ))}

        <div style={{ position: 'absolute', bottom: '-80px', left: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px' }}>
          <button onClick={handlePrev} className="cta-button secondary-cta" style={{ width: '50px', height: '50px', padding: 0, borderRadius: '50%', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <div style={{ display: 'flex', gap: '10px' }}>
            {steps.map((_, idx) => (
              <span 
                key={idx} 
                onClick={() => setCurrentIndex(idx)} 
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: idx === currentIndex ? 'var(--accent-dark)' : 'var(--border-color)',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              />
            ))}
          </div>
          <button onClick={handleNext} className="cta-button secondary-cta" style={{ width: '50px', height: '50px', padding: 0, borderRadius: '50%', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
        </div>
      </div>
    </section>
  );
}
