import { useParams, Navigate } from 'react-router-dom';
import BlogList from './BlogList';
import { blogPosts } from '../../../data/blogPosts';

const CategoryList = () => {
  const { slug } = useParams();
  
  // Verify category exists
  const categoryExists = blogPosts.some(post => post.category.slug === slug);
  
  if (!categoryExists) {
    return <Navigate to="/blog" replace />;
  }

  return <BlogList defaultCategory={slug} />;
};

export default CategoryList; 