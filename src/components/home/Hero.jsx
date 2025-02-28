import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="h-screen w-screen bg-black text-white relative">
      <div className="h-full w-full relative">
        <div className="absolute bottom-[15%] left-0 max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main content */}
          <div className="space-y-8">
            <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-[200] text-white/100 tracking-[-0.02em] leading-[1.15]">
              Crafting digital<br />
              <span className="font-['Cormorant'] italic font-[700] text-white text-[3rem] md:text-[4rem] lg:text-[5rem] tracking-[0.02em]">experiences</span>.
            </h1>
          </div>

          {/* Description and scroll indicator */}
          <div className="mt-8 space-y-24">
            <p className="text-xs md:text-sm text-gray-400 font-[200] tracking-[-0.01em] max-w-[65rem]">
              I specialize in creating thoughtful digital solutions that merge{" "}
              <span className="font-['Cormorant'] italic font-[700] text-[1.35em] tracking-[0.03em]">functionality</span> with{" "}
              <span className="font-['Cormorant'] italic font-[700] text-[1.35em] tracking-[0.03em]">aesthetics</span>.
            </p>

            {/* Scroll indicator */}
            <div className="flex items-center gap-4">
              <motion.span 
                className="text-[11px] tracking-[0.25em] text-gray-400 uppercase font-['Pixelify_Sans'] font-[300] inline-block"
                animate={{
                  y: [-10, 10],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                SCROLL
              </motion.span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-gray-400 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 