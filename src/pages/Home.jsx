import Hero from '../components/home/Hero';
import FeaturedProjects from '../components/home/FeaturedProjects';
import ContactSection from '../components/contact/ContactSection';

const Home = () => {
  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <Hero />
      <FeaturedProjects />
      <ContactSection />
    </main>
  );
};

export default Home; 