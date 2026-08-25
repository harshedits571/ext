"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollClick = (e, targetId) => {
    e.preventDefault();
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
        <div className="nav-links">
          <a href="#home" onClick={(e) => handleScrollClick(e, '#home')}>Home</a>
          <a href="#work" onClick={(e) => handleScrollClick(e, '#work')}>Our work</a>
          <a href="#process" onClick={(e) => handleScrollClick(e, '#process')}>Our Process</a>
          <a href="#testimonials" onClick={(e) => handleScrollClick(e, '#testimonials')}>Testimonials</a>
        </div>
        <Link href="/start-project" className="cta-button nav-cta">Start Your project</Link>
      </div>
    </nav>
  );
}
