import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/userSlice'; 

const TabBody = ({ campaigns }) => {
  const [load, setLoad] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 700);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 700);
  }, []);

  return (
    <div className="tab-body">
      {campaigns.length > 0 &&
        campaigns
          .slice()
          .reverse()
          .map((campaign) => (
            <Link to={`/campaign/${campaign.id}`} key={campaign.id}>
              <div className={load ? 'tab-img-container' : 'tab-img-container skeleton'}>
                <img style={{ visibility: load ? 'visible' : 'hidden' }} src={campaign.imageURL} alt="" />
                {load && <p className="tab-img-desc text-overflow-hide">{campaign.title}</p>}
              </div>
            </Link>
          ))}
    </div>
  );
};

export default TabBody;
