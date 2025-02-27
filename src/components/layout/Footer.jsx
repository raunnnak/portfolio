import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Projects', path: '/projects' },
    { text: 'Services', path: '/services' },
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Twitter', url: 'https://twitter.com' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.footer 
      className="bg-primary/95 backdrop-blur-sm w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 justify-items-center md:justify-items-start">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="space-y-4 max-w-sm w-full">
              <h3 className="text-xl font-semibold">Your Agency</h3>
              <p className="text-gray-400">
                Transforming ideas into exceptional digital experiences. We create websites that drive results.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4 w-full text-center md:text-left">
              <h3 className="text-xl font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="space-y-4 w-full text-center md:text-left">
              <h3 className="text-xl font-semibold">Connect</h3>
              <ul className="space-y-2">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Copyright - Integrated within footer with consistent styling */}
        <motion.div 
          variants={itemVariants}
          className="py-4 border-t border-white/10"
        >
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Your Agency. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer; 