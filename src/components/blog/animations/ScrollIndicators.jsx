import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ScrollIndicators.module.css';

const ScrollIndicators = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [userActive, setUserActive] = useState(true);
  
  // Handle scroll position to determine when to show indicators
  useEffect(() => {
    const handleScroll = () => {
      // Reset inactivity timer when user scrolls
      setUserActive(true);
      
      // Determine if at top or bottom
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // Set states based on scroll position
      setIsAtTop(scrollTop < 100);
      setIsAtBottom(scrollTop + windowHeight >= docHeight - 100);
      
      // Only show indicators if user is not at extremes
      setIsVisible(!isAtTop || !isAtBottom);
    };
    
    // Handle inactivity
    let inactivityTimer;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      setUserActive(true);
      inactivityTimer = setTimeout(() => {
        setUserActive(false);
      }, 3000); // Hide after 3 seconds of inactivity
    };
    
    // Event listeners for user activity
    const activityEvents = ['scroll', 'mousemove', 'keydown', 'touchstart', 'touchmove'];
    activityEvents.forEach(event => {
      window.addEventListener(event, resetInactivityTimer, { passive: true });
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    resetInactivityTimer();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer);
      });
      clearTimeout(inactivityTimer);
    };
  }, [isAtTop, isAtBottom]);
  
  // Smooth scroll functions
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={`${styles.scrollIndicatorsContainer} ${userActive ? styles.fadeIn : styles.fadeOut}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Up indicator - only show if not at top */}
          {!isAtTop && (
            <motion.button
              className={`${styles.scrollIndicator} ${!userActive ? '' : styles.pulseAnimation}`}
              onClick={scrollToTop}
              aria-label="Scroll to top"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 5L19 12L17.5 13.5L13 9V19H11V9L6.5 13.5L5 12L12 5Z" 
                  fill="currentColor"
                />
              </svg>
            </motion.button>
          )}
          
          {/* Down indicator - only show if not at bottom */}
          {!isAtBottom && (
            <motion.button
              className={`${styles.scrollIndicator} ${!userActive ? '' : styles.pulseAnimation}`}
              onClick={scrollToBottom}
              aria-label="Scroll to bottom"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 19L5 12L6.5 10.5L11 15V5H13V15L17.5 10.5L19 12L12 19Z" 
                  fill="currentColor"
                />
              </svg>
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollIndicators; 