import { motion } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import BlogLayout from '../layout/BlogLayout';
import { blogPosts } from '../../../data/blogPosts';

const POSTS_PER_PAGE = 6;
const MAX_SEARCH_LENGTH = 100;

const BlogList = ({ defaultCategory = '', defaultTag = '' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Only keep error state, remove loading state
  const [error, setError] = useState(null);

  // Validate and normalize URL parameters
  const validateAndNormalizeParams = () => {
    const params = new URLSearchParams(searchParams);
    let hasChanges = false;

    // Validate search query
    const search = params.get('search') || '';
    if (search.length > MAX_SEARCH_LENGTH) {
      params.set('search', search.slice(0, MAX_SEARCH_LENGTH));
      hasChanges = true;
    }

    // Validate page number
    const page = params.get('page');
    if (page !== null) {
      const pageNum = parseInt(page);
      if (isNaN(pageNum) || pageNum < 1) {
        params.delete('page');
        hasChanges = true;
      }
    }

    // Validate category
    const category = params.get('category') || defaultCategory;
    if (category && !blogPosts.some(post => post.category.slug === category)) {
      params.delete('category');
      hasChanges = true;
      setError('Invalid category specified');
    }

    // Validate tag
    const tag = params.get('tag') || defaultTag;
    if (tag && !blogPosts.some(post => post.tags.some(t => t.slug === tag))) {
      params.delete('tag');
      hasChanges = true;
      setError('Invalid tag specified');
    }

    // Update URL if parameters were invalid
    if (hasChanges) {
      setSearchParams(params);
    }

    return {
      search: params.get('search') || '',
      category: params.get('category') || defaultCategory,
      tag: params.get('tag') || defaultTag,
      page: Math.max(1, parseInt(params.get('page') || '1'))
    };
  };

  // Initialize state from validated URL parameters
  const validatedParams = useMemo(() => validateAndNormalizeParams(), [searchParams, defaultCategory, defaultTag]);
  const [searchQuery, setSearchQuery] = useState(validatedParams.search);
  const [selectedCategory, setSelectedCategory] = useState(validatedParams.category);
  const [selectedTag, setSelectedTag] = useState(validatedParams.tag);
  const [currentPage, setCurrentPage] = useState(validatedParams.page);

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
  const totalPages = Math.ceil((filteredPosts.length - 1) / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(1).slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Featured post is always the first post if no filters are applied
  const featuredPost = searchQuery === '' && selectedCategory === '' && selectedTag === '' 
    ? blogPosts[0] 
    : null;

  // Update URL parameters
  useEffect(() => {
    document.body.style.cursor = 'wait'; // Minimal loading indication
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.set('search', searchQuery.slice(0, MAX_SEARCH_LENGTH));
    }
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedTag) params.set('tag', selectedTag);
    if (currentPage > 1) params.set('page', currentPage.toString());

    // Only update URL if there are parameters
    if (Array.from(params.entries()).length > 0) {
      setSearchParams(params);
    } else {
      // If no parameters, remove query string completely
      navigate('.', { replace: true });
    }
    
    document.body.style.cursor = 'default'; // Reset cursor
  }, [searchQuery, selectedCategory, selectedTag, currentPage, setSearchParams, navigate]);

  // Validate and adjust current page when filters change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
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

  // Add error message display
  const ErrorMessage = () => error && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-900/50 text-red-200 px-4 py-2 rounded-lg mb-4"
    >
      {error}
      <button
        onClick={() => setError(null)}
        className="ml-2 text-red-200 hover:text-red-100"
      >
        ×
      </button>
    </motion.div>
  );

  return (
    <BlogLayout>
      <ErrorMessage />
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
      )}

      {/* Blog Grid Section */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-2xl font-semibold">Latest Posts</h2>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* Search and Filters */}
            <div className="flex gap-4 w-full md:w-auto">
              <input
                type="search"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={handleSearch}
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 w-full md:w-64"
              />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
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
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
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