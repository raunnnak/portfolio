import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import BlogLayout from '../layout/BlogLayout';
import LoadingWrapper from '../animations/LoadingWrapper';
import { SkeletonPostContent } from '../animations/SkeletonElements';
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
    
    // Always set loading to true when slug changes
    setLoading(true);
    
    // Find post immediately to prevent flashing of "not found" state
    const foundPost = blogPosts.find(p => p.slug === slug);
    setPost(foundPost);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => {
      clearTimeout(timer);
    };
  }, [slug]);

  const handleBack = () => {
    setLoading(true);
    navigate('/blog');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || 'Blog Post';
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url)
          .then(() => alert('Link copied to clipboard!'))
          .catch(err => console.error('Could not copy text: ', err));
        break;
      default:
        break;
    }
  };

  // Show not found only when we're sure the post doesn't exist and we're not loading
  if (!post && !loading) {
    return (
      <BlogLayout>
        <div className="max-w-4xl mx-auto px-8">
          <button onClick={handleBack} className={styles.backButton}>
            <svg className={styles.backButtonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </button>
          <div className="py-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Post Not Found</h2>
            <p className="text-gray-400">The blog post you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </BlogLayout>
    );
  }

  return (
    <LoadingWrapper isLoading={loading} duration={800}>
      <BlogLayout>
        {loading ? (
          <SkeletonPostContent />
        ) : (
          post ? (
            <div className="max-w-4xl mx-auto px-8">
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
                transition={{ duration: 0.5 }}
                className="mt-12 mb-8"
              >
                <div className="mb-4">
                  <span className={styles.blogCategory}>{post.category.name}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-[200] tracking-[-0.02em] leading-[1.15] text-white/90 mb-6">
                  {post.title}
                </h1>
                <div className="flex items-center gap-6 text-sm text-gray-400 font-[200]">
                  <span>{post.publishedAt}</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </motion.div>
              
              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-12"
              >
                <div className="relative pb-[56.25%] w-full overflow-hidden rounded-lg">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Post Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
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
                    pre({node, children, ...props}) {
                      return <pre className="not-prose" {...props}>{children}</pre>;
                    },
                    table({node, children, ...props}) {
                      return (
                        <div className="overflow-x-auto">
                          <table className="border-collapse border border-white/10" {...props}>
                            {children}
                          </table>
                        </div>
                      );
                    },
                    th({node, children, ...props}) {
                      return <th className="border border-white/10 px-4 py-2 bg-black/30" {...props}>{children}</th>;
                    },
                    td({node, children, ...props}) {
                      return <td className="border border-white/10 px-4 py-2" {...props}>{children}</td>;
                    },
                    blockquote({node, children, ...props}) {
                      return (
                        <blockquote className="border-l-4 border-white/20 pl-4 italic text-white/70" {...props}>
                          {children}
                        </blockquote>
                      );
                    },
                    h1({node, children, ...props}) {
                      return <h1 className="text-3xl font-[300] mt-8 mb-4" {...props}>{children}</h1>;
                    },
                    h2({node, children, ...props}) {
                      return <h2 className="text-2xl font-[300] mt-6 mb-3" {...props}>{children}</h2>;
                    },
                    h3({node, children, ...props}) {
                      return <h3 className="text-xl font-[300] mt-5 mb-2" {...props}>{children}</h3>;
                    },
                    p({node, children, ...props}) {
                      return <p className="my-4 text-white/80" {...props}>{children}</p>;
                    },
                    ul({node, children, ...props}) {
                      return <ul className="list-disc pl-6 my-4" {...props}>{children}</ul>;
                    },
                    ol({node, children, ...props}) {
                      return <ol className="list-decimal pl-6 my-4" {...props}>{children}</ol>;
                    },
                    li({node, children, ...props}) {
                      return <li className="my-1" {...props}>{children}</li>;
                    }
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </motion.div>
              
              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-12 mb-16"
              >
                <h3 className="text-xl font-[200] mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link 
                      key={tag.id} 
                      to={`/blog?tag=${tag.slug}`}
                      className="text-[11px] tracking-[0.25em] uppercase font-['Pixelify_Sans'] font-[300] bg-black/30 border border-white/10 px-3 py-1 rounded-full text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
              
              {/* Share */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 mb-16 border-t border-white/10 pt-12"
              >
                <h3 className="text-xl font-[200] mb-4">Share this article</h3>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="text-[11px] tracking-[0.25em] uppercase font-['Pixelify_Sans'] font-[300] bg-black/30 border border-white/10 px-4 py-2 rounded-full text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                  >
                    Twitter
                  </button>
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="text-[11px] tracking-[0.25em] uppercase font-['Pixelify_Sans'] font-[300] bg-black/30 border border-white/10 px-4 py-2 rounded-full text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                  >
                    Facebook
                  </button>
                  <button 
                    onClick={() => handleShare('linkedin')}
                    className="text-[11px] tracking-[0.25em] uppercase font-['Pixelify_Sans'] font-[300] bg-black/30 border border-white/10 px-4 py-2 rounded-full text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                  >
                    LinkedIn
                  </button>
                  <button 
                    onClick={() => handleShare('copy')}
                    className="text-[11px] tracking-[0.25em] uppercase font-['Pixelify_Sans'] font-[300] bg-black/30 border border-white/10 px-4 py-2 rounded-full text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                  >
                    Copy Link
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto px-8">
              <button onClick={handleBack} className={styles.backButton}>
                <svg className={styles.backButtonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blog
              </button>
              <div className="py-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">Post Not Found</h2>
                <p className="text-gray-400">The blog post you're looking for doesn't exist or has been removed.</p>
              </div>
            </div>
          )
        )}
      </BlogLayout>
    </LoadingWrapper>
  );
};

export default BlogPost; 