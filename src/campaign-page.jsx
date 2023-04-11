import React from 'react';
import NavBar from './components/NavBar/NavBar';
import './campaign-page.css';

const CampaignPage = () => {
  return (
    <div>
      <div className="my-component">
        <div className="card">
          <div className="campaign-image"></div>
          <div className="campaign-title">
            <p>Empowering Kerala's Future: Crowdfunding Education</p>
          </div>
          <div className="campaign-category">Category : Education</div>
          <div className="campaign-paragraph">
            Crowdfunding for education of children in Kerala involves the use of
            an online platform to raise funds from a large number of people to
            support the education of underprivileged children in the state of
            Kerala, India.
          </div>
          <div className="campaign-warning">
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="#EAB643"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.56 1h.88l6.54 12.26-.44.74H1.44L1 13.26 7.56 1zM8 2.28L2.28 13H13.7L8 2.28zM8.625 12v-1h-1.25v1h1.25zm-1.25-2V6h1.25v4h-1.25z"
              />
            </svg>
            <p>Expires on 2 July 2023</p>
          </div>
          <button className="contribute-button"><p>Contribute Ether</p></button>
          <button className="chat-button"><p>Chat</p></button>
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
