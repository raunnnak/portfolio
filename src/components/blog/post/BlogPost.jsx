import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import BlogLayout from '../layout/BlogLayout';
import { blogPosts } from '../../../data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    setLoading(true);
    setTimeout(() => {
      const foundPost = blogPosts.find(p => p.slug === slug);
      setPost(foundPost);
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) {
    return (
      <BlogLayout>
        <div className="max-w-4xl mx-auto animate-pulse">
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
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link 
            to="/blog"
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </BlogLayout>
    );
  }

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
            <Link 
              to={`/blog/category/${post.category.slug}`}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              {post.category.name}
            </Link>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{post.readingTime} min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-medium">{post.author.name}</h3>
              <p className="text-sm text-gray-400">Posted on {new Date(post.publishedAt).toLocaleDateString()}</p>
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
          className="mt-12 mb-16"
        >
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Link
                key={tag.id}
                to={`/blog/tag/${tag.slug}`}
                className="px-4 py-2 bg-gray-900 rounded-full text-sm hover:bg-gray-800 transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
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
      </article>
    </BlogLayout>
  );
};

export default BlogPost; 