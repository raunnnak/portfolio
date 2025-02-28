import { motion } from 'framer-motion';
import BlogLayout from '../layout/BlogLayout';

const BlogPost = () => {
  return (
    <BlogLayout>
      <article className="max-w-4xl mx-auto">
        {/* Post Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-emerald-400">Technology</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">5 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Understanding Modern Web Architecture
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            A deep dive into the principles and practices that shape modern web development.
          </p>
          <div className="flex items-center gap-4">
            <img
              src="/placeholder-avatar.jpg"
              alt="Author"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-gray-400">Posted on March 1, 2024</p>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <img
            src="/placeholder-post-full.jpg"
            alt="Blog post featured image"
            className="w-full h-[50vh] object-cover rounded-2xl"
          />
        </motion.div>

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <h2>Introduction</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <h2>Main Content</h2>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>

          {/* Code Block Example */}
          <pre className="bg-gray-900 p-4 rounded-lg">
            <code className="text-sm">
              {`const example = () => {
  console.log("Hello World");
};`}
            </code>
          </pre>

          <h2>Conclusion</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 mb-16"
        >
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-gray-900 rounded-full text-sm">
              #webdev
            </span>
            <span className="px-4 py-2 bg-gray-900 rounded-full text-sm">
              #architecture
            </span>
            <span className="px-4 py-2 bg-gray-900 rounded-full text-sm">
              #frontend
            </span>
          </div>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-800 pt-8 mt-8"
        >
          <h3 className="text-xl font-semibold mb-4">Share this post</h3>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Twitter
            </button>
            <button className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              LinkedIn
            </button>
            <button className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              Copy Link
            </button>
          </div>
        </motion.div>
      </article>
    </BlogLayout>
  );
};

export default BlogPost; 