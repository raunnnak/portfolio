import Hero from '../home/Hero';
import FeaturedProjects from '../home/FeaturedProjects';
import ServicesSection from '../services/ServicesSection';
import ScrollSection from '../common/ScrollSection';
import AboutIntro from '../AboutIntro';

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
        <AboutIntro />
      </ScrollSection>

      <ScrollSection>
        <ServicesSection />
      </ScrollSection>
    </main>
  );
};

export default Home; 