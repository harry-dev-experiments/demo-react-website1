import useScrollReveal from '../../hooks/useScrollReveal';
import './About.css';
import about_img from '../../assets/about.png';
import play_icon from '../../assets/play-icon.png';

const About = ({ setPlayState }) => {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  return (
    <div className="about-wrapper" id="about">
      {/* About Main Section */}
      <div className="about">
        <div className="about-left reveal-left" ref={leftRef}>
          <img src={about_img} alt="About Us" className="about-img" />
          <img
            src={play_icon}
            alt="Play Video"
            className="play-icon"
            onClick={() => {
              setPlayState(true);
            }}
          />
        </div>
        <div className="about-right reveal-right" ref={rightRef}>
          <h3>DEBIPUR DISHA SEVA SANSTHA</h3>
          <h2>Together for a Better Tomorrow.</h2>
          <p>
            Embark on a transformative journey with our community-first initiatives. Our organization is dedicated to
            empowering individuals with knowledge, healthcare support, and sustainable development.
          </p>
          <p>
            With a focus on innovation, hands-on social work, and personalized mentorship, our programs prepare aspiring
            youth and families to build resilient and thriving communities.
          </p>
          <p>
            Whether in healthcare, vocational skill training, or educational assistance, our goal is to create equal
            opportunities for everyone to achieve their full potential.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
