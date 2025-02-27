import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, position = 'left' }) => {
  const { title, categories, description, image, link } = project;
  const isLeft = position === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="w-full mb-32 md:mb-40 group"
    >
      <div className={`flex flex-col ${isLeft ? 'md:ml-0 md:mr-auto' : 'md:mr-0 md:ml-auto'} w-full md:w-[60%]`}>
        <Link to={link} className="block">
          <div className="relative w-full aspect-video overflow-hidden bg-neutral-900">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <motion.img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2 }}
              />
            </motion.div>
          </div>
          
          <div className={`mt-6 md:mt-8 ${isLeft ? 'md:text-left' : 'md:text-right'} text-left`}>
            <div className={`flex flex-wrap gap-4 md:gap-6 mb-2 md:mb-3 ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-start`}>
              {categories.map((category, index) => (
                <motion.span 
                  key={index}
                  className="text-sm tracking-widest text-neutral-500 uppercase font-light"
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
              className="text-3xl md:text-4xl font-light mb-2 md:mb-3 group-hover:text-neutral-400 transition-colors duration-500"
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
              className={`text-neutral-500 text-base md:text-lg font-light ${isLeft ? '' : 'md:ml-auto'}`}
              style={{ maxWidth: "32rem" }}
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
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 