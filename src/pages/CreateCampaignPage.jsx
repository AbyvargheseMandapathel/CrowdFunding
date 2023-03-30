import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'

// components
import CampaignForm from '../components/CampaignForm/CampaignForm'

// context
import { AccountContext } from '../context/AccountContext'

// images
import RaiseFund from '../assets/images/raise-fund.svg'

const CreateCampaignPage = () => {
  const {account} = useContext(AccountContext);
  
  if(account=='')
    return <Navigate to="/" />

  return (
    <section className='create-campaign-container'>
      <p>account: {account}</p>
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
