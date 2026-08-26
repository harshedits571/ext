"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close menu when clicking a link
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar glass ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link href="#" className="logo">
          <img src="/logo.jpg" alt="EXTProduction Logo" />
        </Link>
        
        {/* Desktop Links */}
        <div className="nav-links">
          <a href="#home" onClick={(e) => handleScrollClick(e, '#home')}>Home</a>
          <a href="#work" onClick={(e) => handleScrollClick(e, '#work')}>Our work</a>
          <a href="#process" onClick={(e) => handleScrollClick(e, '#process')}>Our Process</a>
          <a href="#testimonials" onClick={(e) => handleScrollClick(e, '#testimonials')}>Testimonials</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Link href="/start-project" className="cta-button nav-cta">Start Your project</Link>
          
          {/* Mobile Hamburger Button */}
          <button 
            className="hamburger-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="#home" onClick={(e) => handleScrollClick(e, '#home')}>Home</a>
        <a href="#work" onClick={(e) => handleScrollClick(e, '#work')}>Our work</a>
        <a href="#process" onClick={(e) => handleScrollClick(e, '#process')}>Our Process</a>
        <a href="#testimonials" onClick={(e) => handleScrollClick(e, '#testimonials')}>Testimonials</a>
      </div>
    </nav>
  );
}
