import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section className="h-screen w-screen bg-transparent text-white relative overflow-hidden">
      {/* Spline Scene Background */}
      <div className="absolute top-0 right-0 w-[53%] h-screen flex items-center justify-end translate-y-[0%] translate-x-[-5%]">
        <div className="relative w-[92%] h-[92%]">
          <div className="absolute inset-0 scale-[1.3]">
            <div className="w-full h-full [&>div]:!h-full [&>div>canvas]:!h-full [&>div>div]:opacity-0 [&>div>div]:!hidden">
              <Spline scene="https://prod.spline.design/JU0gQo7ulYAp1ZNF/scene.splinecode" />
            </div>
            {/* Black overlay to cover watermark */}
            <div className="absolute bottom-[-40px] right-[-20px] w-[200px] h-[50px] bg-black z-50" />
          </div>
        </div>
      </div>

      {/* Scroll indicator - Moved to top */}
      <div className="absolute top-24 left-8 lg:left-12 z-20">
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

      {/* Content Container */}
      <div className="h-full w-full relative z-10 flex items-end">
        <div className="w-full max-w-[100rem] mx-auto px-8 lg:px-12 pb-8">
          {/* Main content */}
          <div className="max-w-[65%] space-y-8">
            <div className="flex items-center gap-1">
              <span className="text-[0.6rem] tracking-[0.25em] text-white/80 uppercase font-['Pixelify_Sans']">
                {"{"} I CREATE {"}"}
              </span>
            </div>

            <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-[200] text-white/100 tracking-[-0.02em] leading-[1.15]">
              Digital <span className="font-['Cormorant'] italic font-[700] text-white text-[3rem] md:text-[4rem] lg:text-[5rem] tracking-[0.02em]">experiences</span> that merge functionality with aesthetic.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 