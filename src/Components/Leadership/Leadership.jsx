import { useNavigate } from 'react-router-dom';
import './Leadership.css';
import leader1 from '../../assets/chairman.jpeg';
import leader2 from '../../assets/president.jpeg';
import leader3 from '../../assets/secretary.jpeg';
import user1 from '../../assets/executiveMember.jpeg';
import user2 from '../../assets/member.jpeg';
import user3 from '../../assets/user-1.jpeg';
import user4 from '../../assets/user-4.png';
import user5 from '../../assets/leader-1.png';
import user6 from '../../assets/leader-2.png';

import chairmanMsg from '../../data/leader_messages/chairman.txt?raw';
import presidentMsg from '../../data/leader_messages/president.txt?raw';
import secretaryMsg from '../../data/leader_messages/secretary.txt?raw';
import executiveMsg from '../../data/leader_messages/executive.txt?raw';
import kanuMsg from '../../data/leader_messages/kanu-mazumder.txt?raw';
import harikeshMsg from '../../data/leader_messages/harikesh-tiwari.txt?raw';
import ananyaMsg from '../../data/leader_messages/ananya-sen.txt?raw';
import rohitMsg from '../../data/leader_messages/rohit-das.txt?raw';
import meeraMsg from '../../data/leader_messages/meera-nair.txt?raw';

export const leadersData = [
  {
    id: 'chairman',
    image: leader1,
    name: 'Baladeb Mondal',
    role: 'Founder Chairman',
    description: chairmanMsg,
  },
  {
    id: 'president',
    image: leader2,
    name: 'Pritam Ghosh',
    role: 'President',
    description: presidentMsg,
  },
  {
    id: 'secretary',
    image: leader3,
    name: 'Sahadeb Mondal',
    role: 'Secretary',
    description: secretaryMsg,
  },
  {
    id: 'executive',
    image: user1,
    name: 'Sanchaita Mondal',
    role: 'Executive Member',
    description: executiveMsg,
  },
  {
    id: 'kanu-mazumder',
    image: user3,
    name: 'Kanu Mazumder',
    role: 'Member',
    description: kanuMsg,
  },
  {
    id: 'harikesh-tiwari',
    image: user2,
    name: 'Harikesh Tiwari',
    role: 'Member',
    description: harikeshMsg,
  },
  {
    id: 'ananya-sen',
    image: user4,
    name: 'Ananya Sen',
    role: 'Community Coordinator',
    description: ananyaMsg,
  },
  {
    id: 'rohit-das',
    image: user5,
    name: 'Rohit Das',
    role: 'Youth Program Lead',
    description: rohitMsg,
  },
  {
    id: 'meera-nair',
    image: user6,
    name: 'Meera Nair',
    role: 'Social Outreach Member',
    description: meeraMsg,
  },
];

// Helper function to extract a clean short description preview for the home page cards
const getShortDescription = (text) => {
  if (!text) return '';
  const firstParagraph = text.trim().split('\n')[0];
  if (firstParagraph.length > 150) {
    return firstParagraph.substring(0, 150).trim() + '...';
  }
  return firstParagraph;
};

const Leadership = () => {
  const navigate = useNavigate();

  return (
    <div className='leadership' id='leadership'>
      <div className="leadership-grid">
        {leadersData.map((leader) => (
          <div
            className="leader-card"
            key={leader.id}
            onClick={() => navigate(`/leader/${leader.id}`)}
          >
            <div className="leader-accent-line"></div>
            <div className="leader-image-container">
              <img src={leader.image} alt={leader.name} />
              <div className="leader-overlay">
                <span className="view-profile-badge">
                  Read Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </div>
            </div>
            <div className="leader-info">
              <span className="leader-role-badge">{leader.role}</span>
              <h3>{leader.name}</h3>
              <p className="leader-description">{getShortDescription(leader.description)}</p>

              <div className="leader-card-footer">
                <span className="view-profile-link">
                  View Profile
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leadership;
