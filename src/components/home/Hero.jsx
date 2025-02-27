import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="h-screen w-screen bg-black text-white relative">
      <div className="absolute bottom-32 left-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-[500] tracking-[-0.02em] leading-[1.1]">
                  <span className="font-serif italic font-medium">Crafting</span>{" "}
                  Digital
                </h1>
              </div>
              
              <div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-[500] tracking-[-0.02em] leading-[1.1]">
                  Experiences
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-gray-400 mt-8 max-w-2xl font-[350] tracking-[-0.01em]">
                I specialize in creating thoughtful digital solutions that merge{" "}
                <span className="font-serif italic">functionality</span> with{" "}
                <span className="font-serif italic">aesthetics</span>.
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <div className="text-[11px] tracking-[0.25em] text-gray-400 uppercase font-[350] mb-2">
              Scroll
            </div>
            <div className="h-12 w-[1px] bg-gradient-to-b from-gray-400 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 