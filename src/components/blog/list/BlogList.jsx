import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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

  // Add scroll progress tracking
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
      {/* Add scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-400/30 origin-left z-50"
        style={{ scaleX }}
      />

      <ErrorMessage />
      {/* Featured Post Section with enhanced animations */}
      {featuredPost && (
        <section className="mb-32">
          <div className="flex items-center gap-1 mb-8">
            <motion.span 
              className="text-[0.6rem] tracking-[0.25em] text-white/60 uppercase font-['Pixelify_Sans'] whitespace-nowrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              &#123; FEATURED POST &#125;
            </motion.span>
          </div>
          <Link to={`/blog/${featuredPost.slug}`} className="block">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1]
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="relative h-[70vh] rounded-2xl overflow-hidden group bg-black/30 backdrop-blur-sm border border-white/5"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"
                style={{
                  y: useTransform(scrollYProgress, [0, 0.2], [0, 50])
                }}
              />
              <motion.img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                style={{
                  y: useTransform(scrollYProgress, [0, 0.2], [0, 100])
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-12 z-20">
                <motion.span 
                  className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-[0.7rem] tracking-[0.25em] text-emerald-400 uppercase font-['Pixelify_Sans'] mb-6"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                  }}
                >
                  {featuredPost.category.name}
                </motion.span>
                <h1 className="text-[2.5rem] md:text-[3.5rem] font-[200] tracking-[-0.02em] leading-[1.15] mb-6 max-w-4xl text-white">
                  {featuredPost.title}
                </h1>
                <p className="text-base text-gray-300 mb-8 max-w-2xl font-[200] tracking-[-0.01em]">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6">
                  <motion.span 
                    className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-full text-sm tracking-wide font-[200]"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    Read Article
                  </motion.span>
                  <span className="text-[0.7rem] tracking-[0.25em] text-white/60 uppercase font-['Pixelify_Sans']">
                    {featuredPost.readingTime} min read
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        </section>
      )}

      {/* Blog Grid Section with staggered animations */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          {/* Left Side - Heading */}
          <div className="w-full md:w-1/3 md:sticky md:top-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start text-left"
            >
              <motion.div 
                className="flex items-center gap-1 mb-8"
                transition={{ duration: 0.8 }}
              >
                <span className="text-[0.6rem] tracking-[0.25em] text-white/60 uppercase font-['Pixelify_Sans'] whitespace-nowrap">
                  &#123; LATEST POSTS &#125;
                </span>
              </motion.div>

              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-[200] tracking-[-0.02em] max-w-lg mb-4"
                transition={{ duration: 0.8 }}
              >
                Exploring the world of{" "}
                <span className="font-['Cormorant'] italic font-[700] text-[1.2em] tracking-[0.03em]">design</span> and{" "}
                <span className="font-['Cormorant'] italic font-[700] text-[1.2em] tracking-[0.03em]">development</span>
              </motion.h2>

              {/* Search and Filters */}
              <div className="w-full space-y-4 mt-8">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:outline-none focus:border-white/20 transition-all duration-300 text-sm font-[200]"
                  />
                </div>
                
                <div className="flex gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="flex-1 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:outline-none focus:border-white/20 transition-all duration-300 text-sm font-[200] appearance-none cursor-pointer"
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
                    className="flex-1 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:outline-none focus:border-white/20 transition-all duration-300 text-sm font-[200] appearance-none cursor-pointer"
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
            </motion.div>
          </div>

          {/* Right Side - Blog Grid with staggered animations */}
          <div className="w-full md:w-2/3">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              {paginatedPosts.map((post, index) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <motion.article
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1]
                        }
                      }
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    className="group relative h-[400px] rounded-xl overflow-hidden bg-black/30 backdrop-blur-sm border border-white/5"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"
                      style={{
                        y: useTransform(scrollYProgress, 
                          [index * 0.1, (index * 0.1) + 0.2], 
                          [0, 30]
                        )
                      }}
                    />
                    <motion.img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                      style={{
                        y: useTransform(scrollYProgress, 
                          [index * 0.1, (index * 0.1) + 0.2], 
                          [0, 50]
                        )
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                      <motion.span 
                        className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-[0.6rem] tracking-[0.25em] text-emerald-400 uppercase font-['Pixelify_Sans'] mb-4"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(255, 255, 255, 0.15)",
                        }}
                      >
                        {post.category.name}
                      </motion.span>
                      <h3 className="text-xl font-[200] tracking-[-0.02em] leading-tight mb-4 text-white">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-4">
                        <span className="text-[0.6rem] tracking-[0.25em] text-white/60 uppercase font-['Pixelify_Sans']">
                          {post.readingTime} min read
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-[200] transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-white/10 backdrop-blur-sm border border-white/20'
                        : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </BlogLayout>
  );
};

export default BlogList; 