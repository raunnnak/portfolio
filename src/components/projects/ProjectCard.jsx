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
            className={`relative overflow-hidden ${
              inverted 
                ? 'bg-gradient-to-br from-white/90 to-white/75 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12),0_4px_16px_-4px_rgba(0,0,0,0.05)]' 
                : 'bg-gradient-to-br from-neutral-900/90 to-neutral-800/75 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25),0_4px_16px_-4px_rgba(0,0,0,0.1)]'
            } backdrop-blur-[8px] rounded-[2rem] rounded-br-lg rounded-tl-lg`}
            whileHover={{ 
              y: -8,
              x: isEven ? -4 : 4,
              scale: 1.01,
              transition: { 
                duration: 0.4, 
                ease: [0.2, 0.8, 0.2, 1.0] 
              }
            }}
          >
            {/* Number indicator */}
            <motion.span 
              className={`absolute top-8 right-8 text-sm uppercase tracking-[0.2em] font-light z-10 ${
                inverted ? 'text-neutral-500' : 'text-neutral-400'
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
            <div className="relative w-full aspect-video overflow-hidden rounded-t-[2rem] rounded-tr-lg rounded-bl-lg">
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
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    inverted 
                      ? 'opacity-90 group-hover:opacity-100 group-hover:saturate-[1.1]'
                      : 'opacity-85 group-hover:opacity-95 group-hover:saturate-[1.2]'
                  }`}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                />
              </motion.div>
            </div>
            
            {/* Project details */}
            <div className="p-8 pt-6 pb-10">
              <div className="flex flex-wrap gap-4 md:gap-6 mb-4">
                {categories.map((category, index) => (
                  <motion.span 
                    key={index}
                    className={`text-xs tracking-widest uppercase font-light ${
                      inverted ? 'text-neutral-500' : 'text-neutral-400'
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
                className={`text-xl md:text-2xl font-light mb-2 transition-all duration-500 ${
                  inverted 
                    ? 'text-neutral-800 group-hover:text-neutral-600 group-hover:translate-x-1'
                    : 'text-white group-hover:text-neutral-200 group-hover:-translate-x-1'
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
                className={`text-sm md:text-base font-light leading-relaxed ${
                  inverted ? 'text-neutral-600' : 'text-neutral-400'
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
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 