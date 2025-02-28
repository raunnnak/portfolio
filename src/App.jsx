import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import BlogList from './components/blog/list/BlogList';
import BlogPost from './components/blog/post/BlogPost';
import CategoryList from './components/blog/list/CategoryList';
import TagList from './components/blog/list/TagList';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog/category/:slug" element={<CategoryList />} />
          <Route path="/blog/tag/:slug" element={<TagList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 