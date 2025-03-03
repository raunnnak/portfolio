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

      <ScrollSection 
        showBottomDivider
        dividerShape="clouds"
        dividerHeight={70}
        animationDuration={30}
      >
        <FeaturedProjects />
      </ScrollSection>

      <ScrollSection 
        isBlack 
        showTopDivider
        dividerShape="clouds"
        dividerHeight={70}
        animationDuration={30}
        dividerColor="#000000"
      >
        <AboutIntro />
      </ScrollSection>

      <ScrollSection 
        showTopDivider
        dividerShape="clouds"
        dividerHeight={70}
        animationDuration={30}
      >
        <ServicesSection />
      </ScrollSection>
    </main>
  );
};

export default Home; 