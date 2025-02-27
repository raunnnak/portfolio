import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/layout/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary text-white">
        <Navigation />
        <main className="container mx-auto px-4 pt-24">
          <section className="hero min-h-[80vh] flex flex-col justify-center items-start">
            <h1 className="text-6xl font-bold mb-4 animate-fade-in">
              Transform Your Online Presence
            </h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in">
              Expert Web Design & SEO to Grow Your Business
            </p>
            <button className="btn-primary animate-fade-in">
              Get a Free Consultation
            </button>
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App; 