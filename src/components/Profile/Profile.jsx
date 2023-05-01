import React from 'react'
import './Profile.css'

const Profile = () => {
    return (
        <div className="container">
            <div className="left">
                <p className="better">P 0x5B38Da********ddC4</p>
                <p className="access"><br />Q 4.256 ETH </p>
            </div>

            <div className="text">
                <p className="crowdfunding">5</p>
                <p className="good"><br />Active Campaigns</p>
            </div>

            <div className="fund">
                <p className="campaign">2</p>
                <p className="active-campaigns"><br />Total Campaigns</p>
            </div>
        </div>

    )
}

export default Profile
