import React from 'react'
import './MyCampaignDetails.css'

// component
// import ResponsiveProgressBar from '../ResponsiveProgressBar/ResponsiveProgressBar'

// helper
import { timestampToDate } from '../../helpers/helper'

const MyCampaignDetails = ({details, moreDetails, withdrawStatus}) => {
    return (
        <div>
            <div className="product-card">
                <img src={details.imageURL} alt="Campaign" />
                <div className="product-details">
                    <h2>{details.title}</h2>
                    <p className="category">Category : {details.category}</p>
                    <p className="description">{details.desc}</p>
                    {/* {collectedAmountPercentage >= 100 && <p className="goal-achieved-msg">Goal achieved, waiting for votes.</p>} */}

                    <p className="contribute-before">Contribute before {timestampToDate(details.deadline)}</p>
                    <p className="contribute-before">Amount Needed :  <span style={{fontWeight: '600', margin: '1em 0'}}>2 ETH</span></p>

                    {/* <ResponsiveProgressBar reqAmount={10} percentage={40} /> */}

                    <div className="buttons">
                        {
                            moreDetails.isRequestedToVote === false && moreDetails.isGoalAchieved &&
                            <button className="contribute-now" onClick={() => alert('clicked')}>Request Vote</button>
                        }
                        {
                            moreDetails.isRequestedToVote && moreDetails.isGoalAchieved && withdrawStatus!==true && 
                            <p className='text-p btn-text' style={{marginTop: '1em'}}>Requested to votes.</p>
                        }

                        {
                            withdrawStatus===true && 
                            <button className="contribute-now" onClick={() => alert('withdrawed')}>Withdraw</button>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MyCampaignDetails
