import { motion } from 'framer-motion';
import ProjectCard from '../projects/ProjectCard';
import { featuredProjects } from '../../data/projects';

const FeaturedProjects = () => {
  return (
    <section className="w-full py-40 relative">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start">
          {/* Left side - Sticky Heading */}
          <div className="w-full md:w-1/3 md:sticky md:top-40 mb-16 md:mb-0 order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="flex flex-col items-start text-left"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-[1px] bg-neutral-300 mb-6 self-start"
              />
              <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-600 mb-4 font-light">
                Featured work
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-neutral-800 text-lg md:text-xl font-light"
                style={{ maxWidth: "90%" }}
              >
                A selection of projects that showcase our expertise in creating impactful digital experiences.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex items-center gap-2"
              >
                <span className="text-xs text-neutral-600 uppercase tracking-widest">Scroll</span>
                <div className="w-6 h-[1px] bg-neutral-400" />
              </motion.div>
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