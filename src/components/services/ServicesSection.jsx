import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

const services = [
  {
    title: "UI Design",
    description: "Creating beautiful, intuitive interfaces that engage users and enhance brand identity through thoughtful visual design and micro-interactions."
  },
  {
    title: "UX Design",
    description: "Crafting seamless user experiences through research-driven design, user journey mapping, and iterative prototyping to maximize user satisfaction."
  },
  {
    title: "Web Development",
    description: "Building fast, responsive, and scalable web applications using modern technologies and best practices for optimal performance and maintainability."
  },
  {
    title: "Search Engine Optimisation",
    description: "Implementing strategic SEO practices to improve visibility, drive organic traffic, and ensure your content reaches the right audience effectively."
  }
];

const ServicesSection = () => {
  return (
    <section className="w-full py-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start gap-x-24">
          {/* Left side - Heading */}
          <div className="w-full md:w-1/3 md:sticky md:top-40 mb-16 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start"
            >
              <div className="h-[1px] w-[100px] bg-neutral-700 mb-6" />
              <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-4 font-light">
                Our Specialisation
              </h2>
              <p className="text-neutral-400 text-lg md:text-xl font-light">
                Expertise in creating digital experiences that combine aesthetics with functionality.
              </p>
            </motion.div>
          </div>

          {/* Right side - Services list */}
          <div className="w-full md:w-2/3">
            <div>
              {services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 