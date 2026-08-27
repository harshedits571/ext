"use client";

import { motion } from 'framer-motion';

/**
 * Animated Title with clean upward slide and subtle optical blur dissipation
 * Re-animates dynamically on every scroll in/out (once: false)
 */
export function AnimatedTitle({ children, className = "", style = {}, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.2, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated Paragraph with soft fade-up and blur-to-clear reveal
 * Re-animates dynamically on every scroll in/out (once: false)
 */
export function AnimatedParagraph({ children, className = "", style = {}, delay = 0.1 }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.2, margin: "-40px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.p>
  );
}

/**
 * Staggered container for animating multiple child text elements or cards
 */
export function StaggerContainer({ children, className = "", style = {}, delay = 0, stagger = 0.1 }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2, margin: "-40px" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/**
 * Item variant to use inside StaggerContainer
 */
export function StaggerItem({ children, className = "", style = {} }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div variants={itemVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}
