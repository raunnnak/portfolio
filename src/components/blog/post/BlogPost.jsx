import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import BlogLayout from '../layout/BlogLayout';
import { blogPosts } from '../../../data/blogPosts';
import styles from '../list/BlogList.module.css';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when post changes
    window.scrollTo(0, 0);
    
    // Simulate API call delay
    setLoading(true);
    setTimeout(() => {
      const foundPost = blogPosts.find(p => p.slug === slug);
      setPost(foundPost);
      setLoading(false);
    }, 500);
  }, [slug]);

  const handleBack = () => {
    navigate('/blog');
  };

  if (loading) {
    return (
      <BlogLayout>
        <div className="max-w-4xl mx-auto px-8 animate-pulse">
          <div className="h-8 w-24 bg-gray-800 rounded mb-4" />
          <div className="h-12 w-3/4 bg-gray-800 rounded mb-8" />
          <div className="h-64 bg-gray-800 rounded-2xl mb-8" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-800 rounded w-full" />
            <div className="h-4 bg-gray-800 rounded w-5/6" />
            <div className="h-4 bg-gray-800 rounded w-4/6" />
          </div>
        </div>
      </BlogLayout>
    );
  }

  if (!post) {
    return (
      <BlogLayout>
        <div className="max-w-4xl mx-auto px-8">
          <button onClick={handleBack} className={styles.backButton}>
            <svg className={styles.backButtonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </button>
          <div className="text-center py-12">
            <h1 className="text-2xl font-[200] mb-4">Post Not Found</h1>
            <p className="text-gray-400 font-[200]">The post you're looking for doesn't exist.</p>
          </div>
        </div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout>
      <div className="max-w-4xl mx-auto px-8">
        {/* Back Button */}
        <button onClick={handleBack} className={styles.backButton}>
          <svg className={styles.backButtonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </button>

        {/* Post Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className={styles.blogCategory}>{post.category.name}</span>
          <h1 className="text-4xl md:text-5xl font-[200] tracking-[-0.02em] leading-[1.15] text-white/90 mt-4 mb-6">
            {post.title.split(' ').map((word, i) => 
              i === 1 ? (
                <span key={i} className="font-['Cormorant'] italic font-[700] text-5xl md:text-6xl tracking-[0.02em] text-white">
                  {word}{' '}
                </span>
              ) : (
                <span key={i}>{word}{' '}</span>
              )
            )}
          </h1>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="font-[200]">{post.readingTime} min read</span>
            <span className="font-[200]">•</span>
            <span className="font-[200]">{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <img
            src={post.coverImage}
            alt={post.title}
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              // Custom styling for other markdown elements
              h1: ({node, ...props}) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-2xl font-bold mt-6 mb-3" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 text-gray-300" {...props} />,
              a: ({node, ...props}) => (
                <a
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4" {...props} />,
              li: ({node, ...props}) => <li className="mb-2" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote
                  className="border-l-4 border-emerald-500 pl-4 italic my-4 text-gray-400"
                  {...props}
                />
              ),
              img: ({node, ...props}) => (
                <img
                  className="rounded-lg my-8 w-full"
                  {...props}
                  loading="lazy"
                />
              ),
              table: ({node, ...props}) => (
                <div className="overflow-x-auto my-8">
                  <table className="min-w-full divide-y divide-gray-800" {...props} />
                </div>
              ),
              th: ({node, ...props}) => (
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  {...props}
                />
              ),
              td: ({node, ...props}) => (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400" {...props} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {post.tags.map(tag => (
            <Link
              key={tag.id}
              to={`/blog?tag=${tag.slug}`}
              className="px-4 py-1 bg-gray-800 rounded-full text-sm hover:bg-gray-700 transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              #{tag.name}
            </Link>
          ))}
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
            <button 
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Twitter
            </button>
            <button 
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              LinkedIn
            </button>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                // You might want to add a toast notification here
              }}
              className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Copy Link
            </button>
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="border-t border-gray-800 pt-12 mt-12"
        >
          <h3 className="text-2xl font-semibold mb-8">Related Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts
              .filter(p => 
                p.id !== post.id && (
                  p.category.id === post.category.id ||
                  p.tags.some(t => post.tags.some(pt => pt.id === t.id))
                )
              )
              .slice(0, 3)
              .map((relatedPost, index) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="block"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-900 rounded-xl overflow-hidden group hover:ring-2 hover:ring-emerald-500/50 transition-all"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-emerald-400 mb-2 block">
                        {relatedPost.category.name}
                      </span>
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <span className="text-sm text-emerald-400 group-hover:translate-x-1 transition-transform inline-block">
                        Read More →
                      </span>
                    </div>
                  </motion.article>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </BlogLayout>
  );
};

export default BlogPost; 