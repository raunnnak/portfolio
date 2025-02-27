import Hero from '../components/home/Hero';
import FeaturedProjects from '../components/home/FeaturedProjects';
import ServicesSection from '../components/services/ServicesSection';
import ContactSection from '../components/contact/ContactSection';
import ScrollSection from '../components/common/ScrollSection';

const Home = () => {
  return (
    <main className="relative">
      <ScrollSection isBlack isFirst>
        <Hero />
      </ScrollSection>

      <ScrollSection>
        <FeaturedProjects />
      </ScrollSection>

      <ScrollSection isBlack>
        <ServicesSection />
      </ScrollSection>

      <ScrollSection isBlack>
        <ContactSection />
      </ScrollSection>
    </main>
  );
};

export default Home; 