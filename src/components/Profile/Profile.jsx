import React from 'react';
import './Profile.css';

const Profile = ({ address }) => {
  const shortAddress = address ? `${address.substring(0, 2)}****${address.substring(address.length - 4)}` : '';

  return (
    <div className="container">
      <div className="left">
        <p className="better">P {address}</p>
        <p className="access"><br />Q 4.256 ETH </p>
      </div>

      <div className="text">
        <p className="crowdfunding">5</p>
        <p className="good"><br />Active Campaigns</p>
      </div>

      <div className="fund">
        <p className="campaign">2</p>
        <p className="active"><br />Total Campaigns</p>
      </div>
    </div>
  );
};

export default Profile;
