import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';

const Blog = () => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center">
    <h1 className="text-4xl font-[200]">Blog Coming Soon</h1>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 