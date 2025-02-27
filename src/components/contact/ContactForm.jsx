import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full p-6 md:p-8">
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mb-6 p-4 bg-green-900/20 border border-green-500 text-green-300 rounded-md"
        >
          Thank you for your message! We'll get back to you soon.
        </motion.div>
      )}
      
      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-300 rounded-md"
        >
          There was an error sending your message. Please try again.
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <motion.label 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            htmlFor="name" 
            className="block text-sm uppercase tracking-wider text-neutral-500 font-light"
          >
            Name
          </motion.label>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-neutral-800 border ${
                errors.name ? 'border-red-500' : 'border-neutral-700'
              } p-3 rounded-md focus:outline-none focus:border-white transition-colors duration-300`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </motion.div>
        </div>
        
        <div className="space-y-2">
          <motion.label 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            htmlFor="email" 
            className="block text-sm uppercase tracking-wider text-neutral-500 font-light"
          >
            Email
          </motion.label>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-neutral-800 border ${
                errors.email ? 'border-red-500' : 'border-neutral-700'
              } p-3 rounded-md focus:outline-none focus:border-white transition-colors duration-300`}
              placeholder="Your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </motion.div>
        </div>
        
        <div className="space-y-2">
          <motion.label 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            htmlFor="message" 
            className="block text-sm uppercase tracking-wider text-neutral-500 font-light"
          >
            Message
          </motion.label>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative"
          >
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={`w-full bg-neutral-800 border ${
                errors.message ? 'border-red-500' : 'border-neutral-700'
              } p-3 rounded-md focus:outline-none focus:border-white transition-colors duration-300`}
              placeholder="Your message"
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message}</p>
            )}
          </motion.div>
        </div>
        
        <motion.button
          type="submit"
          disabled={isSubmitting}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-6 rounded-md text-white font-medium 
            ${isSubmitting 
              ? 'bg-neutral-700 cursor-not-allowed' 
              : 'bg-neutral-800 hover:bg-neutral-700'
            } transition-colors duration-300 border border-neutral-700`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </div>
          ) : (
            'Send Message'
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default ContactForm; 