import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Requests.css'

// icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BiShowAlt } from 'react-icons/bi'

const allRequests = [
    {
        campaignId: 0,
        fundRaiser: '6jhjhg89434798hkshfsd78y87w',
        amount: 5,
        deadline: 1680254530,
        isVoted: true
    },
    {
        campaignId: 1,
        fundRaiser: 'jh8764324knsdf9847q39elnkd',
        amount: 15,
        deadline: 1680254530,
        isVoted: false
    },
    {
        campaignId: 2,
        fundRaiser: 'kdjaslkjf987648234fr5',
        amount: 35,
        deadline: 1680254530,
        isVoted: true
    },
    {
        campaignId: 3,
        fundRaiser: '87878766hgvhguygsawnkjhd8787',
        amount: 8,
        deadline: 1680254530,
        isVoted: false
    },
]


const Requests = () => {
    const [requests, setRequests] = useState(allRequests);

    function voteCampaign(campaignId) {
        // const approve = window.confirm("Would you like to confirm your vote for this campaign?")
        // if (!approve) return

        document.getElementById(`vote-btn-span-${campaignId}`).style.display = 'block'
        document.getElementById(`text-content-btn-${campaignId}`).textContent = 'Approving'
        document.getElementById(`vote-btn-${campaignId}`).style.background = 'var(--disabled)'
        
        setTimeout(() => {
            const newReq = [...requests]
            const index = newReq.findIndex(obj => obj.campaignId === campaignId)
            newReq[index].isVoted = true
            setRequests(newReq)
        }, 1500)

    }

    return (
        <section className='requests-container'>
            <table>
                <thead>
                    <tr>
                        <th>SlNo</th>
                        <th>Creator</th>
                        <th>Amount(ETH)</th>
                        <th>Expiry Date</th>
                        <th>View Campaign</th>
                        <th>Approve Withdrawal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allRequests.map(({ campaignId, fundRaiser, amount, deadline, isVoted }, index) => {
                            return (
                                <tr className='request-lists' key={index}>
                                    <td>{index + 1}</td>
                                    <td onClick={()=>alert('address copied')}>
                                        {fundRaiser.substring(0, 3) + "*******" + fundRaiser.substring(fundRaiser.length - 4)}
                                    </td>
                                    <td>{amount}</td>
                                    <td>{deadline}</td>
                                    <td>
                                        <Link 
                                            to={`/campaign/${campaignId}`}>
                                                <span style={{display:'flex', alignItems:'center',justifyContent:'center', columnGap:'5px'}}>
                                                    View
                                                    <BiShowAlt/>
                                                </span>
                                            </Link>
                                    </td>
                                    <td>
                                        {
                                            isVoted === true ?
                                                'Approved' :
                                                <button
                                                    className='vote-btn'
                                                    id={`vote-btn-${campaignId}`}
                                                    onClick={() => voteCampaign(campaignId)}>
                                                    <span id={`vote-btn-span-${campaignId}`}><AiOutlineLoading3Quarters /></span>
                                                    <p id={`text-content-btn-${campaignId}`}>Approve</p>
                                                </button>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </section>
    )
}

export default Requests
