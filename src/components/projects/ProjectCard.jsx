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
      className={`mb-24 md:mb-32 ${isEven ? 'md:ml-12' : 'md:mr-12'}`}
    >
      <div className={`w-full md:w-[95%] ${isEven ? 'md:ml-auto' : ''}`}>
        <Link to={link} className="block group">
          <div className="relative overflow-hidden">
            {/* Number indicator */}
            <motion.span 
              className={`absolute top-6 right-6 text-sm uppercase tracking-[0.2em] font-light z-10 ${
                inverted ? 'text-neutral-600' : 'text-neutral-500'
              }`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1.0]
              }}
            >
              {number}
            </motion.span>

            {/* Project image */}
            <div className={`relative w-full aspect-video overflow-hidden ${
              inverted ? 'bg-neutral-100' : 'bg-neutral-900'
            }`}>
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
              >
                <motion.img
                  src={image}
                  alt={title}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    inverted 
                      ? 'opacity-80 group-hover:opacity-95'
                      : 'opacity-90 group-hover:opacity-100'
                  }`}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                />
              </motion.div>
            </div>
            
            {/* Project details */}
            <div className="mt-6 md:mt-8">
              <div className="flex flex-wrap gap-4 md:gap-6 mb-4">
                {categories.map((category, index) => (
                  <motion.span 
                    key={index}
                    className={`text-sm tracking-widest uppercase font-light ${
                      inverted ? 'text-neutral-600' : 'text-neutral-500'
                    }`}
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
                className={`text-2xl md:text-3xl font-light mb-4 transition-colors duration-500 ${
                  inverted 
                    ? 'group-hover:text-neutral-600'
                    : 'group-hover:text-neutral-400'
                }`}
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
                className={`text-base md:text-lg font-light max-w-2xl ${
                  inverted ? 'text-neutral-600' : 'text-neutral-500'
                }`}
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
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 