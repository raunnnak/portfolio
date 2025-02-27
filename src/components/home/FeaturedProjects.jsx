import { motion } from 'framer-motion';
import ProjectCard from '../projects/ProjectCard';
import { featuredProjects } from '../../data/projects';

const FeaturedProjects = () => {
  return (
    <section className="w-full py-40 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="mb-24 flex flex-col items-start"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[1px] bg-neutral-700 mb-6"
          />
          <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-2 font-light">
            Featured work
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute right-6 lg:right-12 top-40 flex items-center gap-2"
          >
            <span className="text-xs text-neutral-500 uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-[1px] bg-neutral-500" />
          </motion.div>
        </motion.div>

        <div>
          {featuredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              position={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects; 