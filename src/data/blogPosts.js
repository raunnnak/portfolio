export const blogPosts = [
  {
    id: '1',
    title: 'The Future of Web Development',
    slug: 'future-of-web-development',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development.',
    content: `# The Future of Web Development

Web development is evolving at an unprecedented pace. From AI-powered development tools to WebAssembly and Edge Computing, the landscape is shifting dramatically.

## Key Trends

### 1. AI-Powered Development
The integration of AI into development workflows is revolutionizing how we build applications. Automated code generation, intelligent debugging, and AI-assisted testing are becoming mainstream.

### 2. Edge Computing
The rise of edge computing is changing how we think about application architecture. By processing data closer to where it's needed, we can create faster, more responsive applications.

### 3. WebAssembly
WebAssembly is opening new possibilities for web applications, allowing developers to write high-performance code in languages like Rust and C++ that can run in the browser.

## Looking Ahead
As these technologies mature, we'll see more sophisticated web applications that blur the line between native and web-based software. The future of web development is not just about writing code—it's about orchestrating a complex ecosystem of tools and services to create exceptional user experiences.`,
    coverImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1600&q=80',
    publishedAt: '2024-03-01',
    readingTime: 5,
    author: {
      id: 'author1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      bio: 'Senior Web Developer'
    },
    category: {
      id: 'cat1',
      name: 'Technology',
      slug: 'technology'
    },
    tags: [
      { id: 'tag1', name: 'WebDev', slug: 'webdev' },
      { id: 'tag2', name: 'Frontend', slug: 'frontend' },
      { id: 'tag3', name: 'Trends', slug: 'trends' }
    ]
  },
  {
    id: '2',
    title: 'Mastering Modern CSS Techniques',
    slug: 'mastering-modern-css-techniques',
    excerpt: 'Deep dive into advanced CSS features and best practices for modern web development.',
    content: `# Mastering Modern CSS Techniques

Modern CSS has evolved far beyond simple styling. With features like Grid, Custom Properties, and Container Queries, we can create more dynamic and maintainable stylesheets than ever before.

## Advanced Features

### 1. CSS Grid
CSS Grid has revolutionized layout design, making it possible to create complex two-dimensional layouts with minimal markup.

### 2. Custom Properties
CSS Custom Properties (variables) enable dynamic styling and improve maintainability by centralizing design tokens.

### 3. Container Queries
Container queries represent the future of responsive design, allowing components to adapt based on their container rather than the viewport.

## Best Practices
Understanding these features is just the beginning. The real art lies in knowing when and how to use them effectively in your projects.`,
    coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1600&q=80',
    publishedAt: '2024-02-28',
    readingTime: 4,
    author: {
      id: 'author1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      bio: 'Senior Web Developer'
    },
    category: {
      id: 'cat2',
      name: 'CSS',
      slug: 'css'
    },
    tags: [
      { id: 'tag4', name: 'CSS', slug: 'css' },
      { id: 'tag5', name: 'Design', slug: 'design' }
    ]
  },
  {
    id: '3',
    title: 'React Performance Optimization',
    slug: 'react-performance-optimization',
    excerpt: 'Learn how to optimize your React applications for better performance.',
    content: `# React Performance Optimization

Performance optimization is crucial for creating smooth, responsive React applications. Let's explore some key techniques for improving your app's performance.

## Key Optimization Techniques

### 1. Code Splitting
Break down your application into smaller chunks that can be loaded on demand, reducing the initial bundle size.

### 2. Memoization
Use React.memo, useMemo, and useCallback effectively to prevent unnecessary re-renders and optimize expensive calculations.

### 3. Virtual List
Implement virtual scrolling for long lists to maintain smooth performance with large datasets.

## Measuring Performance
Before optimizing, always measure. Use React DevTools and Performance profiler to identify bottlenecks in your application.`,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1600&q=80',
    publishedAt: '2024-02-27',
    readingTime: 6,
    author: {
      id: 'author2',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      bio: 'React Specialist'
    },
    category: {
      id: 'cat3',
      name: 'React',
      slug: 'react'
    },
    tags: [
      { id: 'tag6', name: 'React', slug: 'react' },
      { id: 'tag7', name: 'Performance', slug: 'performance' }
    ]
  }
]; 