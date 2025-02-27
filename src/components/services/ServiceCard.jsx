import { motion } from 'framer-motion';

const ServiceCard = ({ title, description, index }) => {
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
      className={`mb-24 md:mb-32 ${isEven ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}
    >
      <div className={`w-full md:w-[90%] ${!isEven && 'md:ml-auto'}`}>
        <div className="p-6 md:p-8 bg-neutral-900 border border-neutral-800 rounded-md overflow-hidden group">
          <span className="block text-sm uppercase tracking-[0.2em] text-neutral-500 font-light mb-4">
            {number}
          </span>
          <h3 className="text-2xl md:text-3xl font-light mb-4 group-hover:text-neutral-400 transition-colors duration-500">
            {title}
          </h3>
          <p className="text-neutral-500 text-base md:text-lg font-light">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard; 