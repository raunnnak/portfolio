import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when an element enters the viewport
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {number} options.triggerOnce - Only trigger once
 * @param {number} options.rootMargin - Margin around the root element
 * @returns {Array} [ref, isInView, entry] - Ref to attach, boolean if in view, and the IntersectionObserver entry
 */
const useInView = ({
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = '0px',
} = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [entry, setEntry] = useState(null);
  const ref = useRef(null);
  const frozen = useRef(false);

  useEffect(() => {
    // Skip if no ref or if already triggered (when triggerOnce is true)
    if (!ref.current || (triggerOnce && frozen.current)) return;
    
    const observerCallback = (entries, observer) => {
      const [entry] = entries;
      
      // Update state when intersection changes
      setIsInView(entry.isIntersecting);
      setEntry(entry);
      
      // If element has entered the viewport and triggerOnce is true,
      // save the state and unobserve
      if (triggerOnce && entry.isIntersecting) {
        frozen.current = true;
        observer.unobserve(ref.current);
      }
    };
    
    // Create observer with options
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
      rootMargin,
    });
    
    // Start observing
    observer.observe(ref.current);
    
    // Cleanup on unmount
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, triggerOnce, rootMargin]);
  
  return [ref, isInView, entry];
};

export default useInView; 