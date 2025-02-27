import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Temporary page components (will be replaced with actual components later)
const Projects = () => <h1 className="text-4xl font-bold">Projects</h1>;
const Blog = () => <h1 className="text-4xl font-bold">Blog</h1>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 