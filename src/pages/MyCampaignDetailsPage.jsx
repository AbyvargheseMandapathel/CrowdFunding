import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css'

// components
import MyCampaignDetails from '../components/MyCampaignDetails/MyCampaignDetails';
import Footer from '../components/Footer/Footer';

// contexts
import { ContractWeb3Context } from '../context/ContractWeb3Context';
import { AccountContext } from '../context/AccountContext';


const MyCampaignDetailsPage = () => {

  const { contract, web3 } = useContext(ContractWeb3Context);
  const {account} = useContext(AccountContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [campaignDetails, setCampaignDetails] = useState([]);
  const [moreDetails, setMoreDetails] = useState([]);
  const [withdrawStatus, setWithdrawStatus] = useState(false);
  const [amtReq, setAmtReq] = useState(0);
  const [collectedAmt, setCollectedAmt] = useState(0);

  // get campaign details
  useEffect(() => {
    contract && getCampaignAllDetails();
    if(!account || account==="")
      navigate("/")
  }, [])

  async function getCampaignAllDetails() {
    try {
      const details = await contract.methods.getCampaignDetails(id).call();
      
      if(account.toLowerCase() !==details.fundRaiser.toLowerCase())
        navigate('/')

      const campaignMoreDetails = await contract.methods.getCampaignMoreDetails(id).call();
      const status = await contract.methods.getWithdrawStatus(id).call();
      const amtReqInEth = web3.utils.fromWei(details.amountRequired, 'ether');
      const amtCollectedInEth = web3.utils.fromWei(details.collectedAmount, 'ether');

      console.warn(details)
      console.warn(campaignMoreDetails)

      setCampaignDetails(details);
      setMoreDetails(campaignMoreDetails);
      setWithdrawStatus(status);
      setAmtReq(amtReqInEth);
      setCollectedAmt(amtCollectedInEth);
    } catch (err) {
      alert("Error occured while fetching data")
      navigate('/')
    }
  }

  async function requestVote() {
    if(!account || account==="")
      return
      
      try {
       await contract.methods.requestVote(parseInt(id)).send({
        from: account,
        gas: 200000
       });
        console.warn(typeof id)
    } catch (err) {
      alert("Error occured while requesting");
      console.warn(err)
    }
  }

  return (
    <>
      <MyCampaignDetails
        details={campaignDetails}
        moreDetails={moreDetails}
        reqAmount={amtReq}
        collected={collectedAmt}
        withdrawStatus={withdrawStatus}
        requestVote={requestVote}
      />
      <Footer />
    </>
  )
}

export default MyCampaignDetailsPage
