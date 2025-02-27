import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollSection = ({ children, isBlack = false, isFirst = false }) => {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.499, 0.5, 1],
    [1, 1, 0, 0]
  );

  return (
    <motion.section className={`relative ${isFirst ? 'pt-0' : 'pt-20'} pb-20`}>
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: isBlack ? '#171717' : '#ffffff',
          opacity,
        }}
      />
      
      <div className={`relative z-10 min-h-[80vh] flex flex-col justify-center ${
        isBlack ? 'text-white' : 'text-black'
      }`}>
        {children}
      </div>
    </motion.section>
  );
};

export default ScrollSection; 