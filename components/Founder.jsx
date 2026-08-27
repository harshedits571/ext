"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Founder() {
  return (
    <section id="about" style={{ padding: '120px 5%', textAlign: 'center' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Animated Badge */}
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            fontSize: '0.9rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '32px',
            fontWeight: 700,
            color: 'var(--accent-dark)'
          }}
        >
          About Us
        </motion.h2>

        {/* Animated Avatar Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.06, rotate: 2 }}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0 12px 35px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            border: '1px solid rgba(255,255,255,0.8)',
            overflow: 'hidden'
          }}
        >
          <img
            src="/logo.jpg"
            alt="EXT Production Logo"
            style={{ width: '65%', height: 'auto', borderRadius: '50%' }}
          />
        </motion.div>

        {/* Paragraph 1 with blur reveal */}
        <motion.p
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1.15rem, 1.4vw, 1.32rem)',
            lineHeight: '1.75',
            color: 'var(--text-primary)',
            fontWeight: 400,
            marginBottom: '20px'
          }}
        >
          EXTProduction is a leading motion design studio working with startups, SaaS, AI, and fintech companies. From product demos and launch videos to ads, explainers, and keynotes, we handle the entire process, from the first idea to the final frame.
        </motion.p>

        {/* Paragraph 2 with blur reveal */}
        <motion.p
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1.15rem, 1.4vw, 1.32rem)',
            lineHeight: '1.75',
            color: 'var(--text-secondary)',
            fontWeight: 400,
            marginBottom: '0'
          }}
        >
          We help you get the right audience discover your product, understand how it works, and convert into customers.
        </motion.p>
      </div>
    </section>
  );
}
