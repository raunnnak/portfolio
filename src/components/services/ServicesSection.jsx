import { motion } from 'framer-motion';
import { useRef } from 'react';
import ServiceCard from './ServiceCard';
import ContactServiceCard from './ContactServiceCard';
import { useState } from 'react';

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
        return <span key={i} className="text-neutral-800 font-serif italic">{content} </span>;
      }
      return <span key={i}>{part}</span>;
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.2,
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
        <h3 className={`text-2xl md:text-3xl font-light mb-4 flex flex-wrap gap-3 ${
          isEven ? 'justify-start' : 'justify-end'
        }`}>
          {title.map((word, i) => (
            <span key={i} className="relative inline-block group-hover:text-neutral-800 transition-colors duration-300">
              {word}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-400 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
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
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
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
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
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
        <h3 className="text-2xl md:text-3xl font-light mb-6">Get in touch</h3>
        
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
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="py-32">
      <div className="max-w-[120rem] mx-auto px-8">
        <div className="flex flex-col md:flex-row items-start gap-x-32">
          {/* Left side - Services list */}
          <div className="w-full md:w-2/3 order-2 md:order-1">
            <div className="space-y-32 pl-8">
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
          <div className="w-full md:w-1/3 md:sticky md:top-40 mb-12 md:mb-0 order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-[60px] bg-neutral-400" />
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-light">
                  Our Expertise
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[-0.02em] max-w-lg">
                Transforming ideas into{" "}
                <span className="font-serif italic">exceptional</span> digital experiences
              </h2>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 