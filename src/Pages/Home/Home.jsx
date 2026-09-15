import { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Hero from '../../Components/Hero/Hero';
import Programs from '../../Components/Programs/Programs';
import Title from '../../Components/Title/Title';
import About from '../../Components/About/About';
import Campus from '../../Components/Campus/Campus';
import Testimonials from '../../Components/Testimonials/Testimonials';
import Blog from '../../Components/Blog/Blog';
import Volunteer from '../../Components/Volunteer/Volunteer';
import Contact from '../../Components/Contact/Contact';
import Footer from '../../Components/Footer/Footer';
import VideoPlayer from '../../Components/VideoPlayer/VideoPlayer';
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop';
import Stats from '../../Components/Stats/Stats';
import EventCarousel from '../../Components/EventCarousel/EventCarousel';
import Leadership from '../../Components/Leadership/Leadership';
import VisionMission from '../../Components/VisionMission/VisionMission';

const Home = () => {
  const [playState, setPlayState] = useState(false);

  return (
    <div>
      <Navbar />
      <Hero />
      <Stats />
      <div className="container">
        <Title subTitle='OUR TEAM' title='Leadership' />
        <Leadership />
        <Title subTitle='Our PROGRAM' title='What We Offer' />
        <Programs />
        <About setPlayState={setPlayState} />
        <Title subTitle='OUR CORE' title='Vision, Mission & Motto' />
        <VisionMission />
        <Title subTitle='Gallery' title='Social Initiatives' />
        <Campus />
        <Title subTitle='OUR EVENTS' title='Moments That Matter' />
        <EventCarousel />
        <Title subTitle='TESTIMONIALS' title='What Common Man Says' />
        <Testimonials />
        <Title subTitle='LATEST ARTICLES' title='Our Blog & Stories' />
        <Blog />
        <Title subTitle='JOIN OUR CAUSE' title='Become a Volunteer' />
        <Volunteer />
        <Title subTitle='Contact Us' title='Get in Touch' />
        <Contact />
        <Footer />
      </div>
      <VideoPlayer playState={playState} setPlayState={setPlayState} />
      <ScrollToTop />
    </div>
  );
};

export default Home;
