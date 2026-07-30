import React, { useRef } from 'react';
import './About.css';
import about_img from '../../assets/about.png';
import play_icon from '../../assets/play-icon.png';
import next_icon from '../../assets/next-icon.png';
import back_icon from '../../assets/back-icon.png';
import leader_1 from '../../assets/leader-1.png';
import leader_2 from '../../assets/leader-2.png';
import leader_3 from '../../assets/leader-3.png';
import leader_4 from '../../assets/user-1.png';

const About = ({ setPlayState }) => {
  const slider = useRef();
  let tx = 0;

  const slideForward = () => {
    if (tx > -50) {
      tx -= 25;
    }
    if (slider.current) {
      slider.current.style.transform = `translateX(${tx}%)`;
    }
  };

  const slideBackward = () => {
    if (tx < 0) {
      tx += 25;
    }
    if (slider.current) {
      slider.current.style.transform = `translateX(${tx}%)`;
    }
  };

  return (
    <div className="about-wrapper" id="about">
      {/* About Main Section */}
      <div className="about">
        <div className="about-left">
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
        <div className="about-right">
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

      {/* Uniform Leadership Slider Section */}
      <div className="team-section">
        <div className="team-header">
          <h3>OUR LEADERSHIP</h3>
          <h2>Board of Directors & Management</h2>
          <p className="team-subtext">
            Meet the visionary leaders driving our social mission, strategic direction, and ground execution.
          </p>
        </div>

        <div className="team-slider-container">
          <img src={next_icon} alt="Next" className="team-next-btn" onClick={slideForward} />
          <img src={back_icon} alt="Previous" className="team-back-btn" onClick={slideBackward} />

          <div className="team-slider">
            <ul ref={slider}>
              <li>
                <div className="team-card">
                  <div className="leader-info">
                    <img src={leader_1} alt="Chairperson" />
                    <div>
                      <h3>Mrs. Sunita Roy</h3>
                      <span className="role-badge">Chairperson</span>
                      <span className="exp-tag">15+ Yrs Experience</span>
                    </div>
                  </div>
                  <p className="leader-bio">
                    Steering the strategic vision of Debipur Disha Seva Sanstha with over 15 years of dedicated leadership in
                    rural healthcare, women empowerment, and social justice. Under her guidance, the organization has launched
                    vital mobile health clinics and digital literacy workshops reaching over 50 rural villages. She is deeply
                    passionate about creating equal opportunity for underprivileged families.
                  </p>
                  <div className="leader-footer-notes">
                    <strong>Key Focus:</strong> Strategic Vision & Community Welfare
                  </div>
                </div>
              </li>

              <li>
                <div className="team-card">
                  <div className="leader-info">
                    <img src={leader_2} alt="Managing Director" />
                    <div>
                      <h3>Mr. Rajesh Ghosh</h3>
                      <span className="role-badge">Managing Director</span>
                      <span className="exp-tag">12+ Yrs Experience</span>
                    </div>
                  </div>
                  <p className="leader-bio">
                    Overseeing daily ground operations, project execution, volunteer mobilization, and institutional partnership
                    programs across West Bengal. With extensive experience in non-profit management and emergency community relief,
                    Mr. Ghosh ensures that every initiative operates with maximum efficiency, complete transparency, and compassionate
                    community empathy for long-term growth.
                  </p>
                  <div className="leader-footer-notes">
                    <strong>Key Focus:</strong> Ground Operations & Relief Programs
                  </div>
                </div>
              </li>

              <li>
                <div className="team-card">
                  <div className="leader-info">
                    <img src={leader_3} alt="Treasurer" />
                    <div>
                      <h3>Mr. Amitava Banerjee</h3>
                      <span className="role-badge">Treasurer & Financial Trustee</span>
                      <span className="exp-tag">18+ Yrs Experience</span>
                    </div>
                  </div>
                  <p className="leader-bio">
                    Managing transparent financial allocation, auditing, compliance, and donor reporting to ensure complete
                    accountability for every contribution. His financial acumen has enabled the organization to maintain an
                    exemplary audit rating while optimizing funds for grassroots health, clean water, and education drives across
                    rural districts.
                  </p>
                  <div className="leader-footer-notes">
                    <strong>Key Focus:</strong> Financial Integrity & Compliance
                  </div>
                </div>
              </li>

              <li>
                <div className="team-card">
                  <div className="leader-info">
                    <img src={leader_4} alt="General Secretary" />
                    <div>
                      <h3>Mrs. Priyanka Sen</h3>
                      <span className="role-badge">General Secretary</span>
                      <span className="exp-tag">10+ Yrs Experience</span>
                    </div>
                  </div>
                  <p className="leader-bio">
                    Coordinating multi-district outreach initiatives, educational bootcamps, government liaisons, and volunteer
                    training workshops. She spearheads our women empowerment and youth leadership programs, bringing local communities
                    together for sustainable long-term advancement, social welfare, skill development, and comprehensive community progress.
                  </p>
                  <div className="leader-footer-notes">
                    <strong>Key Focus:</strong> Educational Outreach & Government Liaison
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
