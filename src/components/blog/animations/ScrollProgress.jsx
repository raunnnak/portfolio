import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './ScrollProgress.module.css';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showPercentage, setShowPercentage] = useState(false);

  // Calculate scroll progress
  useEffect(() => {
    const calculateScrollProgress = () => {
      // Get scroll position and document height
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      
      // Set progress state (constrain between 0 and 1)
      setScrollProgress(Math.min(Math.max(scrollPercent, 0), 1));
      
      // Set active state for visual enhancement during scroll
      if (!isScrolling) {
        setIsScrolling(true);
      }
      
      // Clear the scrolling state after a brief delay
      if (scrollingTimeout) {
        clearTimeout(scrollingTimeout);
      }
    };

    // Timeout reference for scroll end detection
    let scrollingTimeout;
    
    // Track scroll end
    const handleScrollEnd = () => {
      scrollingTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    // Attach event listeners
    window.addEventListener('scroll', calculateScrollProgress, { passive: true });
    window.addEventListener('scroll', handleScrollEnd, { passive: true });
    
    // Initial calculation
    calculateScrollProgress();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
      window.removeEventListener('scroll', handleScrollEnd);
      if (scrollingTimeout) {
        clearTimeout(scrollingTimeout);
      }
    };
  }, [isScrolling]);

  // Calculate percentage display
  const displayPercentage = Math.round(scrollProgress * 100);
  
  return (
    <div 
      className={`${styles.progressContainer} ${isScrolling ? styles.progressActive : ''}`}
      aria-hidden="true"
    >
      <div 
        className={styles.progressBar} 
        style={{ width: `${displayPercentage}%` }}
      />
      <div 
        className={styles.hoverZone}
        onMouseEnter={() => setShowPercentage(true)}
        onMouseLeave={() => setShowPercentage(false)}
      />
      <motion.div 
        className={styles.progressPercentage}
        initial={{ opacity: 0 }}
        animate={{ opacity: showPercentage ? 1 : 0 }}
      >
        {displayPercentage}%
      </motion.div>
    </div>
  );
};

export default ScrollProgress; 