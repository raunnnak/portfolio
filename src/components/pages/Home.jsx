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
        showTopDivider 
        showBottomDivider
        dividerShape="waves"
        dividerHeight={80}
        animationDuration={28}
      >
        <FeaturedProjects />
      </ScrollSection>

      <ScrollSection 
        isBlack 
        showTopDivider 
        showBottomDivider
        dividerShape="bubbles"
        dividerHeight={90}
        animationDuration={25}
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