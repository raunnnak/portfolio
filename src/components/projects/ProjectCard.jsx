import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, index, inverted = false }) => {
  const { title, categories, description, image, link } = project;
  const number = String(index + 1).padStart(2, '0');
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6,
        delay: 0.1 + (index * 0.1),
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      className="mb-32 md:mb-48"
    >
      <div className={`w-full md:w-[80%] ${isEven ? 'md:ml-auto' : ''}`}>
        <Link to={link} className="block group">
          <motion.div 
            className="relative overflow-hidden rounded-[2rem] bg-white/90"
            whileHover={{ scale: 1.02, rotate: -1 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1.0] }}
          >
            {/* Subtle serif number */}
            <span className="absolute top-8 right-12 font-serif italic text-2xl text-neutral-300 z-10">
              {number}
            </span>

            {/* Project image */}
            <div className="relative w-full aspect-video overflow-hidden">
              <motion.div
                className="w-full h-full"
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1.0] }
                }}
              >
                <motion.img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:saturate-[1.1] transition-all duration-700"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                />
              </motion.div>
            </div>
            
            {/* Project details */}
            <div className="p-12">
              <div className="flex flex-wrap gap-4 md:gap-6 mb-4">
                {categories.map((category, index) => (
                  <motion.span 
                    key={index}
                    className="text-xs tracking-widest uppercase font-light text-neutral-500"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.2 + (index * 0.1),
                      ease: [0.25, 0.1, 0.25, 1.0]
                    }}
                  >
                    {category}
                  </motion.span>
                ))}
              </div>
              
              <motion.h3 
                className="text-xl md:text-2xl font-light mb-2 text-neutral-800 group-hover:text-neutral-600 group-hover:translate-x-1 transition-all duration-500"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3,
                  ease: [0.25, 0.1, 0.25, 1.0]
                }}
              >
                {title}
              </motion.h3>
              
              <motion.p 
                className="text-sm md:text-base font-light leading-relaxed text-neutral-600"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.4,
                  ease: [0.25, 0.1, 0.25, 1.0]
                }}
              >
                {description}
              </motion.p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-50 bg-gradient-to-br from-neutral-100/50 to-transparent rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
            <div className="absolute bottom-0 left-0 w-48 h-48 opacity-30 bg-gradient-to-tr from-neutral-100/30 to-transparent rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-60" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 