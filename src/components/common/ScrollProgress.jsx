import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export const ScrollProgress = ({ type = 'global', targetRef, height = '2px', color = 'emerald' }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform progress to opacity for fade effects
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  // Show progress bar after slight scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const colorClasses = {
    emerald: 'bg-emerald-500',
    white: 'bg-white',
    black: 'bg-black',
  };

  const baseStyles = `fixed left-0 right-0 origin-[0%] ${colorClasses[color]} z-50`;

  if (type === 'global') {
    return (
      <motion.div
        className={`${baseStyles} top-0`}
        style={{
          height,
          scaleX,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          opacity: { duration: 0.3 }
        }}
      />
    );
  }

  return (
    <motion.div
      className={`${baseStyles} top-0`}
      style={{
        height,
        scaleX,
        opacity
      }}
    />
  );
};

export default ScrollProgress; 