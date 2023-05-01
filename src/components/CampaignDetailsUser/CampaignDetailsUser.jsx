import React, { useState, useContext } from 'react';
import '../../pages/styles.css'

// components
import ResponsiveProgressBar from '../ResponsiveProgressBar/ResponsiveProgressBar';
import ContributeEther from '../ContributeEther/ContributeEther'

// helpers
import { timestampToDate, etherToWei } from '../../helpers/helper';

// contexts
import { ContractWeb3Context } from '../../context/ContractWeb3Context';
import { AccountContext } from '../../context/AccountContext';

const CampaignDetailsUser = ({ details, moreDetails, reqAmount, collected, id }) => {
  console.warn(moreDetails)

  const {contract, web3} = useContext(ContractWeb3Context);
  const {account} = useContext(AccountContext);

  const [contributePopupVisible, setContributePopupVisible] = useState(false);

  function closePopup() {
    setContributePopupVisible(false)
  }

  async function contributeEther(amountInEth) {
    if(account===undefined || account===null || account==="") {
      alert("Please Login to contribute");
      return
    }
    try {
        const value = etherToWei(web3, amountInEth)
        await contract.methods.contribute(id)
            .send({
                from: account,
                value: value,
                gas: 200000
            })
        setContributePopupVisible(false);
    } catch (e) {
        console.warn('error')
        console.warn(e)
    }
}

  return (
    <>
      <div className='campaign-details-card-wrapper'>
        <div className="product-card">
          <img src={details.imageURL} alt="Campaign Image" />
          <div className="product-details">
            <h2>{details.title}</h2>
            <p className="category">Category : {details.category}</p>
            <p className="description">{details.desc}</p>
            <p className="contribute-before">Contribute before {timestampToDate(details.deadline)}</p>
            {!account && <p className="contribute-before">Please login to transfer ETH</p>}
            {collected >= reqAmount && (
              account && details.creator === account ?
                <button className="withdraw-now">Withdraw</button> :
                <p className="goal-achieved">Goal Achieved, waiting for votes.</p>
            )}

            <ResponsiveProgressBar reqAmount={reqAmount} collected={collected}/>

            <div className="buttons">
              {account && collected<reqAmount && <button className="contribute-now" onClick={()=>setContributePopupVisible(true)}>Contribute Now</button>}
            </div>
          </div>
        </div>
      </div>
      {account && contributePopupVisible && <ContributeEther closePopup={closePopup} contributeEther={contributeEther}/>}
    </>
  );
};

export default CampaignDetailsUser;