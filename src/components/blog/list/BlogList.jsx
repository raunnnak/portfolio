import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BlogLayout from '../layout/BlogLayout';
import { blogPosts } from '../../../data/blogPosts';

const BlogList = () => {
  const featuredPost = blogPosts[0]; // Using first post as featured

  return (
    <BlogLayout>
      {/* Featured Post Section */}
      <section className="mb-16">
        <Link to={`/blog/${featuredPost.slug}`} className="block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative h-[60vh] rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <span className="text-sm text-emerald-400 mb-2 block">{featuredPost.category.name}</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {featuredPost.title}
              </h1>
              <p className="text-lg text-gray-300 mb-4 max-w-2xl">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <span className="px-6 py-2 bg-white text-black rounded-full group-hover:bg-gray-100 transition-colors">
                  Read More
                </span>
                <span className="text-sm text-gray-400">{featuredPost.readingTime} min read</span>
              </div>
            </div>
          </motion.div>
        </Link>
      </section>

      {/* Blog Grid Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Latest Posts</h2>
          <div className="flex gap-4">
            {/* Filter and Search Placeholder */}
            <button className="px-4 py-2 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors">
              Filter
            </button>
            <input
              type="search"
              placeholder="Search posts..."
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
            />
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Skip the first post as it's featured */}
          {blogPosts.slice(1).map((post, index) => (
            <Link 
              key={post.id}
              to={`/blog/${post.slug}`}
              className="block"
            >
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="bg-gray-900 rounded-xl overflow-hidden group hover:ring-2 hover:ring-emerald-500/50 transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-emerald-400 mb-2 block">{post.category.name}</span>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{post.readingTime} min read</span>
                    <span className="text-sm text-emerald-400 group-hover:translate-x-1 transition-transform">
                      Read More →
                    </span>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          <button className="px-4 py-2 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors">
            Next
          </button>
        </div>
      </section>
    </BlogLayout>
  );
};

export default BlogList; 