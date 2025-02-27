import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Temporary page components (will be replaced with actual components later)
const Home = () => (
  <section className="hero min-h-[80vh] flex flex-col justify-center items-start">
    <h1 className="text-6xl font-bold mb-4">
      Transform Your Online Presence
    </h1>
    <p className="text-xl text-gray-300 mb-8">
      Expert Web Design & SEO to Grow Your Business
    </p>
    <button className="btn-primary">
      Get a Free Consultation
    </button>
  </section>
);

const Projects = () => <h1 className="text-4xl font-bold">Projects</h1>;
const Services = () => <h1 className="text-4xl font-bold">Services</h1>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 