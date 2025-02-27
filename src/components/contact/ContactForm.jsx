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
  
  return (
    <div className="w-full">
      <div className="p-6 md:p-8 bg-neutral-900 border border-neutral-800 rounded-md overflow-hidden group">
        <span className="block text-sm uppercase tracking-[0.2em] text-neutral-500 font-light mb-4">
          05
        </span>
        <h3 className="text-2xl md:text-3xl font-light mb-8 group-hover:text-neutral-400 transition-colors duration-500">
          Let's work together
        </h3>
        
        <form className="space-y-6">
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-transparent border-b border-neutral-800 py-2 text-base font-light placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>
          
          <div className="space-y-1">
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-transparent border-b border-neutral-800 py-2 text-base font-light placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>
          
          <div className="space-y-1">
            <textarea
              placeholder="Tell me about your project"
              rows={4}
              className="w-full bg-transparent border-b border-neutral-800 py-2 text-base font-light placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="mt-8 px-6 py-2 border border-neutral-800 rounded text-sm uppercase tracking-wider font-light text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors duration-300"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm; 