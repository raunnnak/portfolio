import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Footer from './Footer';
import ScrollProgress from '../common/ScrollProgress';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-primary text-white">
      {/* Global Scroll Progress */}
      <ScrollProgress type="global" color="emerald" height="2px" />
      
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <motion.main 
        className="flex-1" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        {/* Removed max-width constraint but kept padding for content alignment */}
        <div className="w-full">
          {children}
        </div>
      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout; 