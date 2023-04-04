import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

// contexts
import { ContractWeb3Context } from '../../context/ContractWeb3Context'

// components
import CampaignCard from '../CampaignCard/CampaignCard'

const Home = () => {
    const [campaigns, setCampaigns] = useState([]);
    const { contract } = useContext(ContractWeb3Context);

    useEffect(() => {
        async function getCampaigns() {
            try {
                const allCampaigns = await contract.methods.getIncompleteCampaigns().call();
                setCampaigns(allCampaigns)
                //  console.warn(allCampaigns[0].category);
            } catch (err) {
                console.warn("\nError\n"+err);
            }
        }
        contract && getCampaigns();
    }, []);

    if (contract === '' || contract === undefined)
        return <h1>No Contracts Available</h1>

    return (
        <section className="home-container">

            <div className="campaigns-home-container">
                <h1 className='heading-campaign-type'>New Campaigns</h1>
                <div className="campaigns-home">
                    <CampaignCard campaign={campaigns[campaigns.length - 1]} />
                    <CampaignCard campaign={campaigns[campaigns.length - 2]} />
                    <CampaignCard campaign={campaigns[campaigns.length - 3]} />
                    <CampaignCard campaign={campaigns[campaigns.length - 1]} />
                    <CampaignCard campaign={campaigns[campaigns.length - 2]} />
                </div>
                <span className='show-more-campaigns-home'>
                    <Link to="/campaigns">Show More</Link>
                </span>
            </div>

            <div className="campaigns-home-container">
                <h1>New Campaigns</h1>
                <div className="campaigns-home">
                    <CampaignCard campaign={campaigns[campaigns.length - 1]} />
                    <CampaignCard campaign={campaigns[campaigns.length - 2]} />
                    <CampaignCard campaign={campaigns[campaigns.length - 3]} />
                    <CampaignCard campaign={campaigns[campaigns.length - 1]} />
                    <CampaignCard campaign={campaigns[campaigns.length - 2]} />
                </div>
                <span className='show-more-campaigns-home'>
                    <Link to="/campaigns">Show More</Link>
                </span>
            </div>
        </section>
    )
}

export default Home
