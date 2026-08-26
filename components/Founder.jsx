"use client";
import { motion } from 'framer-motion';

export default function Founder() {
  return (
    <section id="about" style={{ padding: '120px 5%', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h2 style={{ fontSize: '1.5rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '40px', fontWeight: 700 }}>EXT Production</h2>

        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '50px',
          border: '1px solid rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }}>
          <img 
            src="/logo.jpg" 
            alt="EXT Production Logo" 
            style={{ width: '60%', height: 'auto' }} 
          />
        </div>

        <p style={{ fontSize: '1.4rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          "EXTProduction is a leading motion design studio working with SaaS, AI, and fintech companies. We make product demos, launch videos, promos, ad creatives, explainers, and keynotes that help companies show what they’ve built and get people to care. From the first idea to the final frame, we handle the creative and production so you don’t have to build an in-house video team."
        </p>
      </motion.div>
    </section>
  );
}
