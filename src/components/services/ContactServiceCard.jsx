import { motion } from 'framer-motion';
import { useState } from 'react';

const ContactServiceCard = ({ index }) => {
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
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
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
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const number = String(index + 1).padStart(2, '0');
  
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
      className="mb-24 md:mb-32"
    >
      <div className="w-full">
        <div className="p-6 md:p-8 bg-neutral-900 border border-neutral-800 rounded-md overflow-hidden group">
          <span className="block text-sm uppercase tracking-[0.2em] text-neutral-500 font-light mb-4">
            {number}
          </span>
          <h3 className="text-2xl md:text-3xl font-light mb-3 group-hover:text-neutral-400 transition-colors duration-500">
            Get in touch
          </h3>
          <p className="text-neutral-500 font-light mb-8">
            Have a project in mind? Let's create something exceptional together.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-transparent border-b border-neutral-800 py-2 text-base font-light placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>
            
            <div className="space-y-1">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="w-full bg-transparent border-b border-neutral-800 py-2 text-base font-light placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
            
            <div className="space-y-1">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project"
                rows={4}
                className="w-full bg-transparent border-b border-neutral-800 py-2 text-base font-light placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors resize-none"
              />
              {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 px-6 py-2 border border-neutral-800 rounded text-sm uppercase tracking-wider font-light text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors duration-300 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send message'}
            </button>

            {submitStatus === 'success' && (
              <div className="text-green-500 text-sm mt-4">Message sent successfully!</div>
            )}
            {submitStatus === 'error' && (
              <div className="text-red-500 text-sm mt-4">Failed to send message. Please try again.</div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactServiceCard; 