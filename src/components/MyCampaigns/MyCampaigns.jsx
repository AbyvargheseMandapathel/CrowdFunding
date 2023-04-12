import React, { useState, useEffect, useContext, useRef } from 'react'
import './MyCampaigns.css'

// icons
import { ImList } from 'react-icons/im'
import { BsGraphUp } from 'react-icons/bs'

// componets
import TabBody from './TabBody'

// contexts
import { ContractWeb3Context } from '../../context/ContractWeb3Context'

const MyCampaigns = () => {
    const { contract } = useContext(ContractWeb3Context);
    const tabHeaderRef = useRef(null);

    const [tabIndex, setTabIndex] = useState(0);
    const [activeCampaigns, setActiveCampaigns] = useState([]);
    const [allCampaigns, setAllCampaigns] = useState([]);

    useEffect(() => {
        function handleScroll() {
            if(tabHeaderRef.current.offsetTop >= 1) 
                tabHeaderRef.current.classList.add('sticky')
            else 
                tabHeaderRef.current.classList.remove('sticky')
        }

        window.addEventListener('scroll', handleScroll);

        return ()=>window.removeEventListener('scroll', handleScroll);
    }, [])

  

    async function getMyCampaigns() {
        try {
            const campaigns = await contract.methods.getMyCampaigns().call();
            const active = campaigns.filter(campaign => !campaign.isCompleted)
            setActiveCampaigns(active);
            setAllCampaigns(campaigns);
        } catch (err) {
            console.warn('error');
        }
    }

    contract && getMyCampaigns();


    return (
        <section className='my-campaigns-container'>
            <div className="campaign-tab-header" ref={tabHeaderRef}>
                <p
                    onClick={() => setTabIndex(0)}
                    style={{ color: tabIndex === 0 ? 'var(--primary)' : 'var(--text)' }}
                >
                    <span className='tab-icon'><ImList /></span>
                    All Campaigns
                </p>
                <p
                    onClick={() => setTabIndex(1)}
                    style={{ color: tabIndex === 1 ? 'var(--primary)' : 'var(--text)' }}
                >
                    <span className='tab-icon'><BsGraphUp /></span>
                    Active Campaigns
                </p>
                <p
                    className='tab-glider'
                    style={{ left: tabIndex === 0 ? 'calc(50% - 15em)' : 'calc(50% + 1em)' }}
                >
                </p>
            </div>
            {
                tabIndex === 0 && allCampaigns.length > 0 &&
                    <TabBody campaigns={allCampaigns} />
            }

            {
                tabIndex === 1 && activeCampaigns.length > 0 &&
                <TabBody campaigns={activeCampaigns} />
            }
        </section>
    )
}

export default MyCampaigns
