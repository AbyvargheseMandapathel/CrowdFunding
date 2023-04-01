import React, { useState, useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'

// components
import CampaignForm from '../components/CampaignForm/CampaignForm'
import Loader from '../components/Loader/Loader'
import Footer from '../components/Footer/Footer'

// context
import { AccountContext } from '../context/AccountContext'

// images
import RaiseFund from '../assets/images/raise-fund.svg'

// constant
import { LOAD_TIME } from '../helpers/constants'

const CreateCampaignPage = () => {
  const { account } = useContext(AccountContext);
  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    document.querySelector('title').innerHTML = 'Etherfund - Create Campaign'
    setTimeout(() => {
      setIsLoad(true)
    }, LOAD_TIME)
  })

  if (account == '')
    return <Navigate to="/login" />

  return (
    isLoad ?
      <>
        <section className='create-campaign-container'>
          <div className="form-left">
            <CampaignForm />
          </div>
          <div className="form-right">
            <img src={RaiseFund} alt="Create a campaign" />
          </div>
        </section>
        <Footer />
      </>
      :
      <Loader />
  )
}

export default CreateCampaignPage
