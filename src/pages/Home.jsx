import Hero from '../components/home/Hero';
import FeaturedProjects from '../components/home/FeaturedProjects';
import ServicesSection from '../components/services/ServicesSection';
import ScrollSection from '../components/common/ScrollSection';
import AboutIntro from '../components/AboutIntro';

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