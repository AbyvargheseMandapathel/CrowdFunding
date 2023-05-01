import React, { useContext } from 'react';
import './Profile.css';
import { AccountContext } from '../../context/AccountContext';

const Profile = () => {
  const { account } = useContext(AccountContext);
  const accountSuffix = account.slice(-4);

  return (
      <div className="container">
          <div className="left">
              <p className="better">P {accountSuffix}</p>
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
  )
}


export default Profile;
