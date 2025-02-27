import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="h-screen w-screen bg-black text-white relative">
      <div className="h-full w-full relative">
        <div className="absolute bottom-[15%] left-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main content */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-[500] tracking-[-0.02em] leading-[1.1]">
              Crafting digital<br />
              <span className="font-serif italic font-medium">experiences</span>.
            </h1>
          </div>

          {/* Description and scroll indicator */}
          <div className="mt-8 space-y-16">
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-[350] tracking-[-0.01em]">
              I specialize in creating thoughtful digital solutions that merge{" "}
              <span className="font-serif italic">functionality</span> with{" "}
              <span className="font-serif italic">aesthetics</span>.
            </p>

            {/* Scroll indicator */}
            <div className="flex items-center gap-4">
              <span className="text-[11px] tracking-[0.25em] text-gray-400 uppercase font-[350]">
                Scroll
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-gray-400 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 