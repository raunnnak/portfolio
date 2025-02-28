import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import ContactServiceCard from './ContactServiceCard';

const services = [
  {
    title: ["UI", "Design"],
    description: "Creating beautiful interfaces that engage users and enhance brand identity through thoughtful visual design and micro-interactions.",
    accents: ["thoughtful visual design", "micro-interactions"]
  },
  {
    title: ["UX", "Design"],
    description: "Crafting seamless user experiences through research-driven design, user journey mapping, and iterative prototyping to maximise user satisfaction.",
    accents: ["maximise user satisfaction"]
  },
  {
    title: ["Search Engine", "Optimisation"],
    description: "Implementing strategic SEO practices to improve visibility, drive organic traffic, and ensure your content actually converts into leads.",
    accents: ["organic traffic", "converts into leads"]
  },
  {
    title: ["Web", "Development"],
    description: "Crafting digital masterpieces using modern technologies and best practice to get your leads to come out of the consideration phase  and turn into paying customers.",
    accents: ["consideration phase", "paying customers"]
  }
];

const ServiceItem = ({ title, description, index, accents }) => {
  const number = String(index + 1).padStart(2, '0');
  const isEven = index % 2 === 0;
  
  const renderDescription = (text, accents) => {
    let result = text;
    accents.forEach(accent => {
      const regex = new RegExp(accent, 'gi');
      result = result.replace(regex, `<accent>${accent}</accent>`);
    });
    
    const parts = result.split(/(<accent>.*?<\/accent>)/);
    return parts.map((part, i) => {
      if (part.startsWith('<accent>') && part.endsWith('</accent>')) {
        const content = part.replace(/<\/?accent>/g, '');
        return <span key={i} className="font-['Cormorant'] italic font-[700] text-[1.35em] tracking-[0.03em]">{content} </span>;
      }
      return <span key={i}>{part}</span>;
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        duration: 1.2,
        delay: index * 0.3,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      className={`relative group w-full md:w-[85%] ${
        isEven ? 'ml-0' : 'ml-auto'
      }`}
    >
      {/* Service Number */}
      <span className={`absolute top-0 font-serif italic text-5xl text-neutral-200 opacity-60 select-none ${
        isEven ? '-left-8' : '-right-8'
      }`}>
        {number}
      </span>

      {/* Content Container */}
      <motion.div 
        className={`relative pt-6 pb-8 ${
          isEven 
            ? 'pl-6 border-l border-neutral-200' 
            : 'pr-6 border-r border-neutral-200'
        }`}
        whileHover={{ x: isEven ? 16 : -16 }}
        transition={{ duration: 0.4 }}
      >
        {/* Title */}
        <h3 className={`text-2xl md:text-3xl font-thin mb-4 flex flex-wrap gap-3 ${
          isEven ? 'justify-start' : 'justify-end'
        }`}>
          {title.map((word, i) => (
            <span key={i} className="relative inline-block group-hover:text-neutral-800 transition-colors duration-300">
              {word}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-400 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.2, delay: 0.4 + index * 0.3 }}
              />
            </span>
          ))}
        </h3>

        {/* Description */}
        <p className={`text-sm text-neutral-600 font-light leading-relaxed max-w-xl ${
          isEven ? 'text-left' : 'text-right ml-auto'
        }`}>
          {renderDescription(description, accents)}
        </p>

        {/* Hover Indicator */}
        <motion.div
          className={`absolute top-0 w-[1px] h-full bg-neutral-800 origin-bottom ${
            isEven ? 'left-0' : 'right-0'
          }`}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.6 + index * 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-transparent text-sm font-light text-neutral-800 border-b border-neutral-200 py-2 px-0 focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-400"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-transparent text-sm font-light text-neutral-800 border-b border-neutral-200 py-2 px-0 focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-400"
        />
      </div>
      <div>
        <textarea
          name="message"
          placeholder="Tell me about your project"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="w-full bg-transparent text-sm font-light text-neutral-800 border-b border-neutral-200 py-2 px-0 focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-400 resize-none"
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-6 py-2 text-sm font-light text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
      >
        Send message
      </motion.button>
    </form>
  );
};

const ContactItem = () => {
  const number = "05";
  const isEven = true;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1 }}
      className={`relative group w-full md:w-[85%] ${
        isEven ? 'ml-0' : 'ml-auto'
      }`}
    >
      {/* Service Number */}
      <span className={`absolute top-0 font-serif italic text-5xl text-neutral-200 opacity-60 select-none ${
        isEven ? '-left-8' : '-right-8'
      }`}>
        {number}
      </span>

      {/* Content Container */}
      <motion.div 
        className={`relative pt-6 pb-8 ${
          isEven 
            ? 'pl-6 border-l border-neutral-200' 
            : 'pr-6 border-r border-neutral-200'
        }`}
        whileHover={{ x: isEven ? 16 : -16 }}
        transition={{ duration: 0.4 }}
      >
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-thin mb-6">Get in touch</h3>
        
        {/* Description */}
        <p className="text-sm text-neutral-600 font-light leading-relaxed mb-8">
          Have a project in mind? Let's create something exceptional together.
        </p>

        {/* Contact Form */}
        <div className="relative">
          <ContactForm />
        </div>

        {/* Hover Indicator */}
        <motion.div
          className={`absolute top-0 w-[1px] h-full bg-neutral-800 origin-bottom ${
            isEven ? 'left-0' : 'right-0'
          }`}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const [isHeaderStuck, setIsHeaderStuck] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const isStuck = containerRect.top <= 40;
      
      // Check if we're at the bottom of the page
      const isBottom = window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 100;
      setShowBackToTop(isBottom);

      // Check if scroll button is over footer
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const isOverFooter = footerRect.top <= window.innerHeight - 60; // 60px offset for button position
        setIsOverFooter(isOverFooter);
      }
      
      if (isStuck !== isHeaderStuck) {
        setIsHeaderStuck(isStuck);
        if (isStuck && !isPaused) {
          setIsPaused(true);
          document.documentElement.style.scrollBehavior = 'smooth';
          setTimeout(() => {
            setIsPaused(false);
            document.documentElement.style.scrollBehavior = '';
          }, 800);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = '';
    };
  }, [isHeaderStuck, isPaused]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={containerRef} 
      className="py-32 relative"
      style={{ 
        scrollBehavior: isPaused ? 'smooth' : 'auto',
        scrollSnapType: isPaused ? 'y mandatory' : 'none'
      }}
    >
      <div className="max-w-[120rem] mx-auto px-8">
        <div className="flex flex-col md:flex-row items-start gap-x-32">
          {/* Left side - Services list */}
          <div className="w-full md:w-2/3 order-2 md:order-1">
            <div className="space-y-40 pl-8">
              {services.map((service, index) => (
                <ServiceItem
                  key={service.title.join('')}
                  {...service}
                  index={index}
                />
              ))}
              <ContactItem />
            </div>
          </div>

          {/* Right side - Heading */}
          <div 
            ref={headerRef}
            className="w-full md:w-1/3 md:sticky md:top-40 mb-12 md:mb-0 order-1 md:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              animate={isHeaderStuck ? {
                scale: 1.015,
                opacity: 1,
                filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.04))"
              } : {
                scale: 1,
                opacity: 0.95,
                filter: "drop-shadow(0 0 0 rgba(0, 0, 0, 0))"
              }}
              className="flex flex-col items-start transition-all duration-800 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]"
            >
              <motion.div 
                className="flex items-center gap-1 mb-8"
                transition={{ duration: 0.8 }}
              >
                <span className="text-[0.6rem] tracking-[0.25em] text-black uppercase font-['Pixelify_Sans']">
                  {'{'} OUR EXPERTISE {'}'}
                </span>
              </motion.div>
              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-[200] tracking-[-0.02em] max-w-lg"
                transition={{ duration: 0.8 }}
              >
                Transforming ideas into exceptional {" "} <br></br>
                <span className="font-['Cormorant'] italic font-[700] text-[1.2em] tracking-[0.03em]">digital experiences</span>  
              </motion.h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll/Back to Top Button */}
      <div className="fixed bottom-8 right-8 flex items-center gap-4 z-50">
        <motion.button
          onClick={showBackToTop ? scrollToTop : undefined}
          className={`text-[11px] tracking-[0.25em] uppercase font-['Pixelify_Sans'] font-[300] inline-block cursor-pointer transition-colors duration-300 ${
            isOverFooter ? 'text-white' : 'text-black'
          }`}
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
          {showBackToTop ? "BACK TO TOP" : "SCROLL"}
        </motion.button>
        <div className={`h-[1px] w-12 bg-gradient-to-r transition-colors duration-300 ${
          isOverFooter ? 'from-white' : 'from-black'
        } to-transparent`} />
      </div>
    </section>
  );
};

export default ServicesSection; 