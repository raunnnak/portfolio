import React from 'react';
import { motion } from 'framer-motion';
import useInView from './useInView';

/**
 * FadeIn - Animates an element to fade in when it enters the viewport
 */
export const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  threshold = 0.1,
  className = '', 
  rootMargin = '0px',
  direction = 'up',
  distance = 20,
  triggerOnce = true,
  ...props 
}) => {
  const [ref, isInView] = useInView({ threshold, triggerOnce, rootMargin });
  
  // Set direction-based movement
  let initial = { opacity: 0 };
  
  if (direction === 'up') {
    initial.y = distance;
  } else if (direction === 'down') {
    initial.y = -distance;
  } else if (direction === 'left') {
    initial.x = distance;
  } else if (direction === 'right') {
    initial.x = -distance;
  }
  
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : initial}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] // custom ease curve
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerChildren - Creates a staggered animation for child elements
 */
export const StaggerChildren = ({ 
  children, 
  containerDelay = 0,
  staggerDelay = 0.1,
  childrenDelay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = '',
  rootMargin = '0px',
  triggerOnce = true,
  childClassName = '',
  ...props 
}) => {
  const [ref, isInView] = useInView({ threshold, triggerOnce, rootMargin });
  
  // Clone children with animations
  const animatedChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ 
          duration, 
          delay: containerDelay + (index * staggerDelay) + childrenDelay,
          ease: [0.25, 0.1, 0.25, 1.0]
        }}
        className={childClassName}
      >
        {child}
      </motion.div>
    );
  });
  
  return (
    <div ref={ref} className={className} {...props}>
      {animatedChildren}
    </div>
  );
};

/**
 * ParallaxSection - Creates a subtle parallax effect when scrolling
 */
export const ParallaxSection = ({
  children,
  speed = 0.1, // Lower values = more subtle movement
  className = '',
  threshold = 0,
  triggerOnce = false,
  rootMargin = '-100px 0px',
  ...props
}) => {
  const [ref, isInView, entry] = useInView({ 
    threshold, 
    triggerOnce,
    rootMargin
  });
  
  // Calculate parallax position based on scroll
  const yOffset = entry ? 
    (entry.boundingClientRect.y * speed) : 0;
  
  return (
    <motion.div
      ref={ref}
      animate={{
        y: isInView ? yOffset : 0,
      }}
      transition={{ type: 'spring', stiffness: 10, damping: 20 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * RevealText - Reveals text with a sweeping animation
 */
export const RevealText = ({
  children,
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = '0px',
  className = '',
  ...props
}) => {
  const [ref, isInView] = useInView({ threshold, triggerOnce, rootMargin });
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
      <motion.div
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : { y: '100%' }}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1.0]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default {
  FadeIn,
  StaggerChildren,
  ParallaxSection,
  RevealText
}; 