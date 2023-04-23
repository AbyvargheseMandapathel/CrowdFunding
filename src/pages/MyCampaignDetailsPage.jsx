import React, { useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// components
import MyCampaignDetails from '../components/MyCampaignDetails/MyCampaignDetails';
import Footer from '../components/Footer/Footer';

// contexts
import { ContractWeb3Context } from '../context/ContractWeb3Context';
// import { AccountContext } from '../context/AccountContext';


const MyCampaignDetailsPage = () => {

  const { contract } = useContext(ContractWeb3Context);
  // const {account} = useContext(AccountContext);
  const {id} = useParams();
  const navigate = useNavigate();

  const [campaignDetails, setCampaignDetails] = useState([]);
  const [moreDetails, setMoreDetails] = useState([]);
  const [withdrawStatus, setWithdrawStatus] = useState(false);

  // get campaign details
  useEffect(() => {
    contract && getCampaignAllDetails();
  }, [])

  async function getCampaignAllDetails() {
    try {
      const details = await contract.methods.getCampaignDetails(id).call();
      // if(account.toLowerCase() !==details.fundRaiser.toLowerCase())
      //   navigate('/')

      const campaignMoreDetails = await contract.methods.getCampaignMoreDetails(id).call();
      const status = await contract.methods.getWithdrawStatus(id).call();
      setCampaignDetails(details);
      setMoreDetails(campaignMoreDetails);
      setWithdrawStatus(status);
    } catch(err) {
      alert("Error occured while fetching data")
      navigate('/')
    }
  }

  return (
    <>
        <MyCampaignDetails details={campaignDetails} moreDetails={moreDetails}/>
        <Footer />
    </>
  )
}

export default MyCampaignDetailsPage
