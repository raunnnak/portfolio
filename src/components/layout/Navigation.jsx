import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const menuItems = [
    { number: '01', text: 'Home', path: '/' },
    { number: '02', text: 'Projects', path: '/projects' },
    { number: '03', text: 'Blog', path: '/blog' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-neutral-800/50 w-screen">
      <div className="max-w-[120rem] mx-auto px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-light tracking-tight focus:outline-none text-white hover:text-neutral-200 transition-colors"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Agency
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center">
            {menuItems.map((item, index) => (
              <Link
                key={item.number}
                to={item.path}
                className="group flex items-center h-16 px-16 border-l border-neutral-800/50 last:border-r focus:outline-none"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: parseInt(item.number) * 0.1 }}
                  className="flex items-center space-x-3 relative overflow-hidden"
                >
                  <span className="font-serif italic text-sm text-neutral-400">{item.number}</span>
                  <span className="relative font-light text-white">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                      {item.text}
                    </span>
                    <span className="absolute top-0 left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                      {item.text}
                    </span>
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 text-white hover:text-neutral-200 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 md:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 bg-black/95 border-b border-neutral-800/50 shadow-lg md:hidden"
            >
              <div className="divide-y divide-neutral-800/50">
                {menuItems.map((item) => (
                  <Link
                    key={item.number}
                    to={item.path}
                    className="flex items-center space-x-3 py-4 px-12"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="font-serif italic text-sm text-neutral-400">{item.number}</span>
                    <span className="font-light text-white">{item.text}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation; 