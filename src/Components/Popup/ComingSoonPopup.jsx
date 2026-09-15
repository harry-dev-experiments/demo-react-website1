import './ComingSoonPopup.css';

const ComingSoonPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <h2>Coming Soon</h2>
        <p>We are working on this feature. Stay tuned!</p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ComingSoonPopup;
