import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.24, 0.25, 0.25, 1],
      }
    },
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const scrollIndicatorVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black text-white"
      initial="initial"
      animate="animate"
      style={{ opacity }}
    >
      <motion.div
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        style={{ y }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <motion.div variants={textVariants}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-[500] tracking-[-0.02em] leading-[1.1]">
                <span className="font-serif italic font-medium">Crafting</span>{" "}
                Digital
              </h1>
            </motion.div>
            
            <motion.div variants={textVariants}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-[500] tracking-[-0.02em] leading-[1.1]">
                Experiences
              </h1>
            </motion.div>

            <motion.p 
              className="text-xl md:text-2xl text-gray-400 mt-8 max-w-2xl font-[350] tracking-[-0.01em]"
              variants={textVariants}
            >
              I specialize in creating thoughtful digital solutions that merge{" "}
              <span className="font-serif italic">functionality</span> with{" "}
              <span className="font-serif italic">aesthetics</span>.
            </motion.p>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          variants={scrollIndicatorVariants}
        >
          <div className="text-[11px] tracking-[0.25em] text-gray-400 uppercase font-[350] mb-2">
            { "Scroll" }
          </div>
          <motion.div 
            className="h-12 w-[1px] bg-gradient-to-b from-gray-400 to-transparent"
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero; 