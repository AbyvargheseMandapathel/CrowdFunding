import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './CampaignCard.css'

const CampaignCard = () => {
    const navigate = useNavigate();
  return (
        <div className="campaign-card">
            <div className="campaign-img-container">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUHrKEUdHqLbftyPLDuDDeXwEQAt6rVPSxAQ" alt="" />
            </div>

            <div className="campaign-card-details">
                <h1 className="campaign-card-title text-overflow-hide">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore nihil laboriosam maxime repellendus commodi adipisci.
                </h1>

                <p className="campaign-card-description text-overflow-hide">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi labore excepturi dolore fuga vel saepe.
                </p>

                <div className="campaign-card-progress">
                    <div className="progress-amount-details">
                        <span>Collected: <span className="text-bold">4.56 ETH</span></span>
                        <span>Total: <span className="text-bold">10 ETH</span></span>
                    </div>
                    <div className="campaign-card-progress-bar"></div>
                </div>

                <div className="view-campaign-btn-container">
                    <button 
                        id='view-campaign'
                        onClick={()=> navigate('/campaign')}
                    >
                        View Campaign
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CampaignCard