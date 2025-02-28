import { useParams, Navigate } from 'react-router-dom';
import BlogList from './BlogList';
import { blogPosts } from '../../../data/blogPosts';

const TagList = () => {
  const { slug } = useParams();
  
  // Verify tag exists
  const tagExists = blogPosts.some(post => 
    post.tags.some(tag => tag.slug === slug)
  );
  
  if (!tagExists) {
    return <Navigate to="/blog" replace />;
  }

  return <BlogList defaultTag={slug} />;
};

export default TagList; 