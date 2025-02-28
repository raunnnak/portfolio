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
      className="mb-24 md:mb-32"
    >
      <div className={`w-full md:w-[85%] ${isEven ? 'md:ml-auto' : ''}`}>
        <Link to={link} className="block group">
          <motion.div 
            className="relative overflow-hidden bg-gradient-to-br from-white via-white to-neutral-50"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1.0] }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0)_50%)] z-0" />
            
            {/* Content Wrapper */}
            <div className="relative z-10">
              {/* Project image with overlay */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ 
                    scale: 1.08,
                    transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1.0] }
                  }}
                >
                  <motion.img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-all duration-500"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2 }}
                  />
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
                
                {/* Category Tags - Moved to overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-wrap gap-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  {categories.map((category, index) => (
                    <motion.span 
                      key={index}
                      className="text-[11px] tracking-widest uppercase font-light bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-neutral-800"
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
              </div>
              
              {/* Project details */}
              <div className="p-8 relative">
                {/* Number with line decoration */}
                <div className="absolute -top-12 right-8 z-20 flex items-center gap-3">
                  <div className="h-[1px] w-12 bg-neutral-300 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <span className="font-serif italic text-xl text-neutral-400">
                    {number}
                  </span>
                </div>

                <div className="relative">
                  <motion.h3 
                    className="text-xl md:text-2xl font-thin text-neutral-900 tracking-[-0.02em] leading-snug mb-3 group-hover:translate-x-2 transition-all duration-500"
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
                    className="text-sm font-light leading-relaxed text-neutral-600 line-clamp-2 max-w-[90%]"
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

                  {/* Hover indicator */}
                  <div className="absolute left-0 bottom-0 h-[1px] w-full bg-neutral-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 