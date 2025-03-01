import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LoadingWrapper.module.css';

const LoadingWrapper = ({ children, isLoading = true, duration = 800 }) => {
  const [progress, setProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState(1); // 1: Initial, 2: Middle, 3: Final
  const [showContent, setShowContent] = useState(false);
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    // Reset progress when isLoading changes to true
    if (isLoading) {
      setProgress(0);
      setLoadingPhase(1);
      setShowContent(false);
      setShowLoader(true);
    }

    // If not loading, show content immediately but keep loader visible briefly for transition
    if (!isLoading) {
      setProgress(100);
      setLoadingPhase(3);
      setShowContent(true);
      
      const hideLoaderTimer = setTimeout(() => {
        setShowLoader(false);
      }, 300);
      
      return () => clearTimeout(hideLoaderTimer);
    }
    
    // If loading, animate progress with phases
    let startTime;
    let animationFrame;

    const updateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const nextProgress = Math.min(100, (elapsed / duration) * 100);
      
      setProgress(nextProgress);
      
      // Update loading phase based on progress
      if (nextProgress < 33) {
        setLoadingPhase(1);
      } else if (nextProgress < 66) {
        setLoadingPhase(2);
      } else {
        setLoadingPhase(3);
      }
      
      if (nextProgress < 100) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        // When progress reaches 100%, show content and hide loader after transition
        setShowContent(true);
        
        const hideLoaderTimer = setTimeout(() => {
          setShowLoader(false);
        }, 300);
        
        return () => clearTimeout(hideLoaderTimer);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isLoading, duration]);

  // Always render children, but conditionally show loader
  return (
    <>
      {children}
      
      <AnimatePresence>
        {showLoader && (
          <motion.div 
            className={styles.blogLoadingWrapper} 
            style={{ 
              opacity: showContent ? 0 : 1, 
              pointerEvents: showContent ? 'none' : 'auto' 
            }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.blogLoadingContent}>
              <div className={styles.blogLoadingLabel}>
                <span className={styles.blogLoadingLabelText}>
                  {loadingPhase === 1 && "INITIALIZING"}
                  {loadingPhase === 2 && "LOADING"}
                  {loadingPhase === 3 && "FINALIZING"}
                </span>
              </div>
              
              <div className={styles.blogLoadingBarContainer}>
                <motion.div 
                  className={styles.blogLoadingBar}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
              
              <div className={styles.blogLoadingPercentage}>
                <motion.span 
                  className={styles.blogLoadingNumber}
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                >
                  {Math.round(progress)}
                </motion.span>
                <span className={styles.blogLoadingPercent}>%</span>
              </div>
              
              <div className={styles.blogLoadingScanlines}></div>
              
              {/* Pixelated edges */}
              <div className={styles.blogLoadingPixelEdges}></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoadingWrapper; 