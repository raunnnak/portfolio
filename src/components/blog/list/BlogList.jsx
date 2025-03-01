import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import BlogLayout from '../layout/BlogLayout';
import { blogPosts } from '../../../data/blogPosts';
import styles from './BlogList.module.css';

const POSTS_PER_PAGE = 6;

const BlogList = () => {
  // States for search, filters, and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique categories and tags
  const categories = useMemo(() => {
    const uniqueCategories = new Set(blogPosts.map(post => JSON.stringify(post.category)));
    return Array.from(uniqueCategories).map(cat => JSON.parse(cat));
  }, []);

  const tags = useMemo(() => {
    const uniqueTags = new Set(blogPosts.flatMap(post => post.tags.map(tag => JSON.stringify(tag))));
    return Array.from(uniqueTags).map(tag => JSON.parse(tag));
  }, []);

  // Filter posts based on search query and filters
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === '' || 
        post.category.slug === selectedCategory;

      const matchesTag = selectedTag === '' || 
        post.tags.some(tag => tag.slug === selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  // Calculate pagination
  const totalPages = Math.ceil((filteredPosts.length - 1) / POSTS_PER_PAGE); // -1 because first post is featured
  const paginatedPosts = filteredPosts.slice(1).slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Featured post is always the first post if no filters are applied
  const featuredPost = searchQuery === '' && selectedCategory === '' && selectedTag === '' 
    ? blogPosts[0] 
    : null;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug === selectedCategory ? '' : categorySlug);
    setCurrentPage(1);
  };

  const handleTagChange = (tagSlug) => {
    setSelectedTag(tagSlug === selectedTag ? '' : tagSlug);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BlogLayout>
      {/* Featured Post Section */}
      {featuredPost && (
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
                <span className={styles.blogCategory}>{featuredPost.category.name}</span>
                <h1 className={styles.featuredTitle}>
                  {featuredPost.title.split(' ').map((word, i) => 
                    i === 1 ? (
                      <span key={i} className={styles.featuredTitleAccent}> {word} </span>
                    ) : (
                      <span key={i}> {word} </span>
                    )
                  )}
                </h1>
                <p className="text-lg text-gray-300 mb-4 max-w-2xl font-[200]">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <span className={`${styles.readMore} px-6 py-2 bg-white text-black rounded-full group-hover:bg-gray-100 transition-colors`}>
                    Read More
                  </span>
                  <span className="text-sm text-gray-400 font-[200]">{featuredPost.readingTime} min read</span>
                </div>
              </div>
            </motion.div>
          </Link>
        </section>
      )}

      {/* Blog Grid Section */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className={styles.sectionTitle}>
            Latest <span className={styles.sectionTitleAccent}>Posts</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* Search and Filters */}
            <div className="flex gap-4 w-full md:w-auto">
              <input
                type="search"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={handleSearch}
                className={`${styles.searchInput} px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 w-full md:w-64`}
              />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className={`${styles.filterLabel} px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500`}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedTag}
                onChange={(e) => handleTagChange(e.target.value)}
                className={`${styles.filterLabel} px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500`}
              >
                <option value="">All Tags</option>
                {tags.map(tag => (
                  <option key={tag.id} value={tag.slug}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post, index) => (
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
                  <span className={styles.blogCategory}>{post.category.name}</span>
                  <h3 className={`${styles.postTitle} mb-2 group-hover:text-emerald-400`}>
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4 font-[200]">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-[200]">{post.readingTime} min read</span>
                    <span className={`${styles.readMore} text-emerald-400 group-hover:translate-x-1 transition-transform`}>
                      Read More →
                    </span>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors disabled:opacity-50 disabled:hover:border-gray-700"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-white text-black'
                    : 'border border-gray-700 hover:border-gray-500'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors disabled:opacity-50 disabled:hover:border-gray-700"
            >
              Next
            </button>
          </div>
        )}

        {/* No Results Message */}
        {paginatedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No posts found matching your criteria.</p>
          </div>
        )}
      </section>
    </BlogLayout>
  );
};

export default BlogList; 