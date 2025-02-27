import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="w-full pt-0 pb-40 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="mb-24 flex flex-col items-start"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[1px] bg-neutral-700 mb-6"
          />
          <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-2 font-light">
            Get in touch
          </h2>
        </motion.div>

        {/* Contact form in project card style */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="w-full mb-32 md:mb-40 group"
        >
          <div className="flex flex-col md:ml-0 md:mr-auto w-full md:w-[60%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6"
            >
              <h3 className="text-3xl md:text-4xl font-light mb-4">
                Let's work together
              </h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-neutral-500 text-base md:text-lg font-light max-w-[32rem]"
              >
                Have a project in mind or want to discuss a potential collaboration? 
                Fill out the form below and I'll get back to you as soon as possible.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full overflow-hidden bg-neutral-900 rounded-md border border-neutral-800"
            >
              <ContactForm />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection; 