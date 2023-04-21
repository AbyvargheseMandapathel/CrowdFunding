import React from 'react';
import NavBar from './components/NavBar/NavBar';
import './campaign-page.css';
import Footer from './components/Footer/Footer';
import ProgressBar from './components/ProgressBar/ProgressBar';
import ResponsiveProgressBar from './components/ProgressBar/ProgressBar';

const CampaignPage = () => {
  const percentageFunded = 75; // Example value, replace with actual percentage
  
  return (
    <>
      <div className="product-card">
        <img src="https://kutt.it/etherfundpic" alt="Campaign Image" />
        <div className="product-details">
          <h2>Empowering Kerala's Future: Crowdfunding Education</h2>
          <p className="category">Category : Education</p>
          <p className="description">Crowdfunding for education of children in Kerala involves the use of an online platform to raise funds from a large number of people to support the education of underprivileged children in the state of Kerala, India. </p>
          <p className="contribute-before">Contribute before 2 July 2023</p>

            <ResponsiveProgressBar />
        
          <div className="buttons">
            <button className="contribute-now">Contribute Now</button>
            <button className="chat-now">Chat Now</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CampaignPage;
