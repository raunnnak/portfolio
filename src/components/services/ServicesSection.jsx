import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import ContactServiceCard from './ContactServiceCard';

const services = [
  {
    title: ["UI", "Design"],
    description: "Creating beautiful, intuitive interfaces that engage users and enhance brand identity through thoughtful visual design and micro-interactions.",
    accents: ["beautiful", "intuitive", "visual design"]
  },
  {
    title: ["UX", "Design"],
    description: "Crafting seamless user experiences through research-driven design, user journey mapping, and iterative prototyping to maximize user satisfaction.",
    accents: ["seamless", "experiences", "journey"]
  },
  {
    title: ["Web", "Development"],
    description: "Building fast, responsive, and scalable web applications using modern technologies and best practices for optimal performance and maintainability.",
    accents: ["responsive", "scalable", "modern"]
  },
  {
    title: ["Search Engine", "Optimisation"],
    description: "Implementing strategic SEO practices to improve visibility, drive organic traffic, and ensure your content reaches the right audience effectively.",
    accents: ["strategic", "visibility", "organic"]
  }
];

const ServicesSection = () => {
  return (
    <div className="py-40">
      <div className="max-w-[110rem] mx-auto px-16">
        <div className="flex flex-col md:flex-row items-start gap-x-40">
          {/* Left side - Services list */}
          <div className="w-full md:w-2/3 order-2 md:order-1">
            <div className="space-y-20">
              {services.map((service, index) => (
                <div 
                  key={service.title.join('')} 
                  className={`w-full ${
                    index % 2 === 0 
                      ? 'md:pr-24' 
                      : 'md:pl-24'
                  }`}
                >
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    accents={service.accents}
                    index={index}
                    isLight={true}
                  />
                </div>
              ))}
              <div className="w-full mt-32">
                <ContactServiceCard index={services.length} isLight={true} />
              </div>
            </div>
          </div>

          {/* Right side - Heading */}
          <div className="w-full md:w-1/3 md:sticky md:top-40 mb-24 md:mb-0 order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start"
            >
              <div className="h-[1px] w-[100px] bg-neutral-200 mb-8" />
              <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6 font-light">
                Our Specialisation
              </h2>
              <p className="text-neutral-600 text-lg md:text-xl font-light leading-relaxed">
                Expertise in creating digital experiences that combine <span className="font-serif italic">aesthetics</span> with <span className="font-serif italic">functionality</span>.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection; 