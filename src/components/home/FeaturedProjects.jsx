import { motion } from 'framer-motion';
import ProjectCard from '../projects/ProjectCard';
import { featuredProjects } from '../../data/projects';

const FeaturedProjects = () => {
  return (
    <section className="w-full py-32 relative">
      <div className="max-w-[120rem] mx-auto px-8">
        <div className="flex flex-col md:flex-row items-start">
          {/* Left side - Sticky Heading */}
          <div className="w-full md:w-1/3 md:sticky md:top-40 mb-16 md:mb-0 order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start text-left"
            >
              <motion.div 
                className="flex items-center gap-1 mb-8"
                transition={{ duration: 0.8 }}
              >
                <span className="text-[0.6rem] tracking-[0.25em] text-black uppercase font-['Pixelify_Sans'] whitespace-nowrap">
                  {'{'} FEATURED WORK {'}'}
                </span>
              </motion.div>

              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-[200] tracking-[-0.02em] max-w-lg mb-4"
                transition={{ duration: 0.8 }}
              >
                Combining design with <br />
                <span className="font-['Cormorant'] italic font-[700] text-[1.2em] tracking-[0.03em]">functionality</span>
              </motion.h2>

              <motion.p 
                className="text-xs md:text-sm text-gray-400 font-[200] tracking-[-0.01em] max-w-[65rem]"
                transition={{ duration: 0.8 }}
              >
                A selection of projects that showcase my expertise in turning an{" "}
                <span className="font-['Cormorant'] italic font-[700] text-[1.35em] tracking-[0.03em]">idea</span> into an aesthetic and intuitive digital experience.
              </motion.p>

              <div className="mt-16 flex items-center gap-4">
                <motion.span 
                  className="text-[11px] tracking-[0.25em] text-black uppercase font-['Pixelify_Sans'] font-[300] inline-block"
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
                <div className="h-[1px] w-12 bg-gradient-to-r from-black to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Right side - Projects list */}
          <div className="w-full md:w-2/3 order-2 md:mt-32">
            <div className="pl-0 md:pl-12">
              {featuredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id}
                  project={project} 
                  index={index}
                  inverted
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects; 