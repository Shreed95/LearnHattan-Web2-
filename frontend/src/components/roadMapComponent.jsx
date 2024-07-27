// RoadmapComponent.jsx
import './roadMapComponent.css';

const RoadmapComponent = () => {
  return (
    <div className='roadmap-main-container'>
    <h2>How to Start?</h2>
    <div className="roadmap-container">
      <div className="roadmap-element connect-wallet">
        <img src="/assets/images/wallet.png" alt="" />
        <h3>Connect Your Wallet</h3>
      </div>
      <div className="roadmap-element enroll-course alternate">
        <h3>Enroll in a Course</h3>
        <img src="/assets/images/course.png" alt="" />
      </div>
      <div className="roadmap-element complete-assignments">
        <img src="/assets/images/assignment.png" alt="" />
        <h3>Complete Assignments</h3>
      </div>
      <div className="roadmap-element earn-tokens alternate">
        <h3>Earn Tokens</h3>
        <img src="/assets/images/Criptocurrency-trans.png" alt="" />
      </div>
      <div className="roadmap-element become-contributor">
        <img src="/assets/images/contributor.png" alt="" />
        <h3>Become A Contributor</h3>
      </div>
    </div>
    </div>
  );
}

export default RoadmapComponent;
