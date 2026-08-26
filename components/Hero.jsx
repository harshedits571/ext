"use client";
import Link from 'next/link';
import Ipad3D from './Ipad3D';
import { motion } from 'framer-motion';

export default function Hero({ onOpenModal }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, opacity: 1, 
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <section id="home" className="hero-section">
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <motion.h1 variants={itemVariants}>We make High-Converting<br /><b>Motion Films for SaaS, AI & Fintech.</b></motion.h1>
        
        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/start-project" className="cta-button primary-cta">Book your project</Link>
          </motion.div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cta-button secondary-cta" onClick={onOpenModal}>Showreel</motion.button>
        </motion.div>
      </motion.div>
      <motion.div 
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.3, delay: 0.3 }}
      >
        <Ipad3D />
      </motion.div>
    </section>
  );
}
