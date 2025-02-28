import { motion } from 'framer-motion';
import { useState } from 'react';

const ContactServiceCard = ({ index, isLight = false }) => {
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
      className="mb-12"
    >
      <motion.div 
        className="w-[90%] group"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1.0] }}
      >
        <div className={`relative p-12 rounded-[2rem] overflow-hidden transition-all duration-500
          ${isLight 
            ? 'bg-gradient-to-br from-white/90 via-white/95 to-neutral-50/90 backdrop-blur-xl shadow-[0_8px_24px_-12px_rgba(0,0,0,0.2),0_24px_48px_-16px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.2),0_32px_64px_-16px_rgba(0,0,0,0.15)]' 
            : 'bg-neutral-900 border border-neutral-800'
          }`}
        >
          {/* Subtle serif number */}
          <span className="absolute top-8 left-12 font-['Cormorant'] italic font-[700] text-[2rem] text-neutral-300 opacity-60">
            {number}
          </span>

          <div className="relative mt-8">
            <h3 className={`text-3xl md:text-4xl font-[200] mb-6 transition-all duration-500 ${
              isLight 
                ? 'text-neutral-900 group-hover:translate-x-2' 
                : 'text-white'
            }`}>
              Get in touch
            </h3>
            <p className={`text-lg md:text-xl font-[200] mb-12 ${
              isLight ? 'text-neutral-600' : 'text-neutral-500'
            }`}>
              Have a project in mind? Let's create something exceptional together.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-16">
              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`w-full bg-transparent py-4 text-lg font-[200] transition-all duration-300 ${
                    isLight 
                      ? 'border-b-2 border-neutral-200 placeholder:text-neutral-400 focus:border-neutral-400' 
                      : 'border-b border-neutral-800 placeholder:text-neutral-600 focus:border-neutral-600'
                  } focus:outline-none`}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </div>
              
              <div className="space-y-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className={`w-full bg-transparent py-4 text-lg font-[200] transition-all duration-300 ${
                    isLight 
                      ? 'border-b-2 border-neutral-200 placeholder:text-neutral-400 focus:border-neutral-400' 
                      : 'border-b border-neutral-800 placeholder:text-neutral-600 focus:border-neutral-600'
                  } focus:outline-none`}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>
              
              <div className="space-y-3">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project"
                  rows={4}
                  className={`w-full bg-transparent py-4 text-lg font-[200] resize-none transition-all duration-300 ${
                    isLight 
                      ? 'border-b-2 border-neutral-200 placeholder:text-neutral-400 focus:border-neutral-400' 
                      : 'border-b border-neutral-800 placeholder:text-neutral-600 focus:border-neutral-600'
                  } focus:outline-none`}
                />
                {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`mt-12 px-8 py-4 rounded-xl text-base uppercase tracking-wider font-[200] transition-all duration-300 disabled:opacity-50 ${
                  isLight 
                    ? 'bg-neutral-900 text-white hover:bg-neutral-800' 
                    : 'bg-white text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-500 text-lg mt-4"
                >
                  Message sent successfully!
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-lg mt-4"
                >
                  Failed to send message. Please try again.
                </motion.div>
              )}
            </form>
          </div>

          {/* Comic-style decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-50 bg-gradient-to-br from-neutral-100/50 to-transparent rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
          <div className="absolute bottom-0 left-0 w-48 h-48 opacity-30 bg-gradient-to-tr from-neutral-100/30 to-transparent rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-60" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactServiceCard; 