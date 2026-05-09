import Navbar from '../components/Navbar';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import HistorySection from '../components/home/HistorySection';
import ContactSection from '../components/home/ContactSection';
// import Footer from '../components/home/Footer';

const Home = () => (
  <div className=" bg-stone-950">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <HistorySection />
    <ContactSection />
    {/* <Footer /> */}
  </div>
);

export default Home;
