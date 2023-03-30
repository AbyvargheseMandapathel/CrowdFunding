import React from 'react'

// components
import CampaignForm from '../components/CampaignForm/CampaignForm'

// images
import RaiseFund from '../assets/images/raise-fund.svg'

const CreateCampaignPage = () => {
  return (
    <section className='create-campaign-container'>
        <div className="form-left">
            <CampaignForm />
        </div>
        <div className="form-right">
            <img src={RaiseFund} alt="Create a campaign" />
        </div>
    </section>
  )
}

export default CreateCampaignPage
