import { motion } from 'framer-motion';

const ServiceCard = ({ title, description, accents = [], index, isLight = false }) => {
  const number = String(index + 1).padStart(2, '0');
  
  // Function to add styling to accented words
  const formatDescription = (text, accents) => {
    let formattedText = text;
    accents.forEach(accent => {
      formattedText = formattedText.replace(
        new RegExp(`(${accent})`, 'gi'),
        '<span class="text-neutral-800">$1</span>'
      );
    });
    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

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
      className="mb-12"
    >
      <motion.div 
        className="w-full group"
        whileHover={{ scale: 1.02, rotate: -1 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1.0] }}
      >
        <div className={`relative p-8 rounded-[2rem] overflow-hidden transition-all duration-500
          ${isLight 
            ? 'bg-gradient-to-br from-white/90 via-white/95 to-neutral-50/90 backdrop-blur-xl shadow-[0_8px_24px_-12px_rgba(0,0,0,0.2),0_24px_48px_-16px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.2),0_32px_64px_-16px_rgba(0,0,0,0.15)]' 
            : 'bg-neutral-900 border border-neutral-800'
          }`}
        >
          {/* Subtle serif number */}
          <span className="absolute top-6 left-8 font-['Cormorant'] italic font-[700] text-[2rem] text-neutral-300 opacity-60">
            {number}
          </span>
          
          {/* Content */}
          <div className="relative mt-6">            
            <h3 className={`text-2xl md:text-3xl font-[200] mb-3 transition-all duration-500 ${
              isLight 
                ? 'text-neutral-900 group-hover:translate-x-2' 
                : 'text-white'
            }`}>
              {title.join(' ')}
            </h3>
            
            <p className={`text-base font-[200] leading-relaxed ${
              isLight ? 'text-neutral-600 group-hover:text-neutral-800' : 'text-neutral-500'
            }`}>
              {formatDescription(description, accents)}
            </p>
          </div>

          {/* Comic-style decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-50 bg-gradient-to-br from-neutral-100/50 to-transparent rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
          <div className="absolute bottom-0 left-0 w-48 h-48 opacity-30 bg-gradient-to-tr from-neutral-100/30 to-transparent rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-60" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard; 