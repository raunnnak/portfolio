import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

const ContactSection = () => {
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
                Get in touch
              </h2>
              <p className="text-neutral-400 text-lg md:text-xl font-light">
                Have a project in mind? Let's create something exceptional together.
              </p>
            </motion.div>
          </div>

          {/* Right side - Contact Form */}
          <div className="w-full md:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 