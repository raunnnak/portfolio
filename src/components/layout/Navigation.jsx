import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(true);
  const location = useLocation();

  // Handle background detection for contrast
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const navHeight = 48; // h-12 = 48px
      
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navHeight && rect.bottom >= navHeight) {
          // Check if section has a dark background
          const bg = window.getComputedStyle(section).backgroundColor;
          const isDark = bg.includes('rgba(0, 0, 0') || bg.includes('rgb(0, 0, 0');
          setIsDarkBg(isDark);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const textColor = isDarkBg ? 'text-white' : 'text-neutral-900';
  const textColorHover = isDarkBg ? 'text-neutral-200' : 'text-neutral-600';
  const borderColor = isDarkBg ? 'border-white/10' : 'border-neutral-900/10';
  const numberColor = isDarkBg ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-transparent border-b ${borderColor} w-screen transition-colors duration-300`}>
      <div className="max-w-[120rem] mx-auto px-12">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link 
            to="/" 
            className={`relative flex items-center h-12 focus:outline-none group`}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-32 md:h-40 z-10 -my-10 md:-my-14"
            >
              <img
                src="/logo.svg"
                alt="Logo"
                className={`h-full w-auto object-contain transition-all duration-300 ${
                  isDarkBg 
                    ? 'brightness-0 invert opacity-100 group-hover:opacity-80' 
                    : 'brightness-0 opacity-100 group-hover:opacity-60'
                }`}
              />
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center">
            {menuItems.map((item, index) => (
              <Link
                key={item.number}
                to={item.path}
                className={`group flex items-center h-12 px-16 border-l ${borderColor} last:border-r focus:outline-none relative`}
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: parseInt(item.number) * 0.1 }}
                  className="flex items-center space-x-3 relative overflow-hidden"
                >
                  <span className={`font-serif italic text-base ${numberColor}`}>{item.number}</span>
                  <span className={`relative font-light text-sm ${textColor} flex flex-col`}>
                    <span className="block transition-transform duration-700 ease-in-out group-hover:-translate-y-full">
                      {item.text}
                    </span>
                    <span className="absolute top-0 left-0 translate-y-full transition-transform duration-700 ease-in-out group-hover:translate-y-0">
                      {item.text}
                    </span>
                    {/* Active indicator */}
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-[18px] left-0 w-full h-[1px] bg-red-500"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`md:hidden inline-flex items-center justify-center p-2 ${textColor} hover:${textColorHover} focus:outline-none`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-4 w-4" aria-hidden="true" />
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
              className="absolute top-12 left-0 right-0 bg-black/95 border-b border-neutral-800/50 shadow-lg md:hidden"
            >
              <div className="divide-y divide-neutral-800/50">
                {menuItems.map((item) => (
                  <Link
                    key={item.number}
                    to={item.path}
                    className="flex items-center space-x-3 py-3 px-12 relative"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="font-serif italic text-base text-neutral-400">{item.number}</span>
                    <span className="font-light text-sm text-white relative">
                      {item.text}
                      {location.pathname === item.path && (
                        <motion.div
                          layoutId="activeNavMobile"
                          className="absolute -bottom-1 left-0 w-full h-[1px] bg-red-500"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </span>
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