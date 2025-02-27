import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-primary text-white">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <motion.main 
        className="flex-1 pt-16 lg:pt-20" // pt-16 to account for fixed Navigation height
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </motion.main>

      {/* Footer - No mt-auto needed here as the main content uses flex-1 */}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout; 