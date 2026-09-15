import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './LeaderProfile.css';
import { leadersData } from '../../Components/Leadership/Leadership';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const LeaderProfile = () => {
  const { roleId } = useParams();
  
  // Find the leader based on the URL parameter
  const leader = leadersData.find((l) => l.id === roleId);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!leader) {
    return (
      <div className="not-found">
        <h2>Leader not found</h2>
        <Link to="/">Go back to Home</Link>
      </div>
    );
  }

  const getMessage = () => {
    if (leader.description) {
      return leader.description;
    }
    return `As the ${leader.role}, I am incredibly proud of the progress we have made together. Our community's dedication to sustainable growth and mutual support has been nothing short of inspiring.`;
  };

  return (
    <div className="leader-profile-page">
      {/* We can re-use the Navbar, but it might need a solid background class since we don't have a hero image here. */}
      <div className="profile-nav-wrapper">
        <Navbar />
      </div>

      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-image-section">
            <img src={leader.image} alt={leader.name} className="profile-main-img" />

          </div>

          <div className="profile-text-section">
            <h1>{leader.name}</h1>
            <h3 className="profile-role">{leader.role}</h3>
            
            <div className="profile-message">
              {getMessage().split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="profile-bottom-signature">
              <span className="signature-font">{leader.name}</span>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LeaderProfile;
