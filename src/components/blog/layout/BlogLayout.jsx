import { motion } from 'framer-motion';

const BlogLayout = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white"
    >
      <div className="max-w-[120rem] mx-auto px-8 py-12">
        {children}
      </div>
    </motion.div>
  );
};

export default BlogLayout; 