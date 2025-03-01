import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import BlogLayout from '../layout/BlogLayout';
import LoadingWrapper from '../animations/LoadingWrapper';
import { SkeletonCard, SkeletonFeaturedPost } from '../animations/SkeletonElements';
import { blogPosts } from '../../../data/blogPosts';
import styles from './BlogList.module.css';

const POSTS_PER_PAGE = 6;

const BlogList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Simulate loading for demo purposes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Reset all filters when navigating directly to /blog
  useEffect(() => {
    if (location.pathname === '/blog' && !location.search) {
      setSearchQuery('');
      setSelectedCategory('');
      setSelectedTag('');
      setCurrentPage(1);
      setSearchParams({});
    }
  }, [location.pathname, location.search]);

  // Handle URL parameters
  useEffect(() => {
    const tagFromUrl = searchParams.get('tag');
    if (tagFromUrl && tagFromUrl !== selectedTag) {
      setSelectedTag(tagFromUrl);
      setCurrentPage(1);
    }
  }, [searchParams]);

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug === selectedCategory ? '' : categorySlug);
    setCurrentPage(1);
  };

  const handleTagChange = (tagSlug) => {
    const newTag = tagSlug === selectedTag ? '' : tagSlug;
    setSelectedTag(newTag);
    setCurrentPage(1);
    
    // Update URL
    if (newTag) {
      setSearchParams({ tag: newTag });
    } else {
      setSearchParams({});
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (searchQuery || selectedCategory || selectedTag) {
      setSearchQuery('');
      setSelectedCategory('');
      setSelectedTag('');
      setCurrentPage(1);
    } else {
      navigate('/');
    }
  };

  const isFiltered = searchQuery || selectedCategory || selectedTag;

  return (
    <LoadingWrapper isLoading={loading} duration={800}>
      <BlogLayout>
        <div className={styles.mainContainer}>
          {/* Featured Post Section */}
          {featuredPost && !isFiltered && (
            <section className={styles.featuredSection}>
              {loading ? (
                <SkeletonFeaturedPost />
              ) : (
                <Link to={`/blog/${featuredPost.slug}`} className={styles.featuredPostLink}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className={`${styles.featuredPost} group`}
                  >
                    <div className={styles.featuredPostOverlay} />
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className={styles.featuredContent}>
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
                      <p className={styles.featuredExcerpt}>
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
              )}
            </section>
          )}

          {/* Blog Content */}
          <div className={styles.blogContentWrapper}>
            {/* Left side - Header */}
            <div className={styles.blogHeader}>
              {/* Back Button - Sticks at top */}
              <div className={styles.backButtonContainer}>
                <button onClick={handleBack} className={styles.backButton}>
                  <svg className={styles.backButtonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  {isFiltered ? 'Clear Filters' : 'Back to Home'}
                </button>
              </div>

              {/* Main Header - Sticks at Featured Projects height */}
              <div className={styles.mainHeaderContainer}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8 }}
                  className={styles.blogHeaderContent}
                >
                  <div className={styles.headerTextGroup}>
                    <div className={styles.titleGroup}>
                      <span className={styles.blogLabel}>
                        {'{'} LATEST ARTICLES {'}'}
                      </span>

                      <h2 className={styles.blogTitle}>
                        Insights about <br />
                        <span className="font-['Cormorant'] italic font-[700] text-[1.2em] tracking-[0.03em]">
                          design & development
                        </span>
                      </h2>

                      <p className={styles.blogDescription}>
                        Exploring the intersection of design, technology, and user experience through in-depth articles and case studies.
                      </p>
                    </div>

                    {/* Search and Filters */}
                    <div className={styles.searchSection}>
                      <input
                        type="search"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className={styles.searchInput}
                      />
                      <div className={styles.searchFilters}>
                        <select
                          value={selectedCategory}
                          onChange={(e) => handleCategoryChange(e.target.value)}
                          className={styles.filterLabel}
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
                          className={styles.filterLabel}
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
                </motion.div>
              </div>
            </div>

            {/* Right side - Blog Posts */}
            <div className={styles.blogContent}>
              <div className={styles.blogPostsContainer}>
                {/* Blog Grid */}
                <div className={styles.gridLayout}>
                  {loading ? (
                    // Show skeleton cards when loading
                    Array.from({ length: 6 }).map((_, index) => (
                      <SkeletonCard key={index} index={index} />
                    ))
                  ) : (
                    // Show actual posts when loaded
                    paginatedPosts.map((post, index) => (
                      <Link 
                        key={post.id}
                        to={`/blog/${post.slug}`}
                        className={styles.postCardLink}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <motion.article
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ y: -5 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className={`${styles.postCard} group`}
                          data-even={index % 2 === 0}
                        >
                          <div className="relative pb-[56.25%] overflow-hidden">
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className={styles.postCardContent}>
                            <span className={styles.blogCategory}>{post.category.name}</span>
                            <h3 className={styles.postTitle}>
                              {post.title}
                            </h3>
                            <p className="text-gray-400 font-[200]">
                              {post.excerpt}
                            </p>
                            <div className={styles.postCardFooter}>
                              <span className="text-sm text-gray-500 font-[200]">{post.readingTime} min read</span>
                              <span className={styles.readMore}>
                                Read More →
                              </span>
                            </div>
                          </div>
                        </motion.article>
                      </Link>
                    ))
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className={styles.paginationContainer}>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={styles.paginationButton}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`${styles.paginationButton} ${
                          currentPage === page ? styles.paginationButtonActive : ''
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={styles.paginationButton}
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* No Results Message */}
                {paginatedPosts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400 font-[200]">No posts found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </BlogLayout>
    </LoadingWrapper>
  );
};

export default BlogList; 