import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

// components
import CampaignCard from '../CampaignCard/CampaignCard'

const Home = () => {
    return (
        <section className="home-container">
            
            <div className="campaigns-home-container">
                <h1 className='heading-campaign-type'>New Campaigns</h1>
                <div className="campaigns-home">
                    <CampaignCard />
                    <CampaignCard />
                    <CampaignCard />
                    <CampaignCard />
                    <CampaignCard />
                </div>
                <span className='show-more-campaigns-home'>
                    <Link to="/campaigns">Show More</Link>
                </span>
            </div>

            <div className="campaigns-home-container">
                <h1>New Campaigns</h1>
                <div className="campaigns-home">
                    <CampaignCard />
                    <CampaignCard />
                    <CampaignCard />
                    <CampaignCard />
                    <CampaignCard />
                </div>
                <span className='show-more-campaigns-home'>
                    <Link to="/campaigns">Show More</Link>
                </span>
            </div>
        </section>
    )
}

export default Home
