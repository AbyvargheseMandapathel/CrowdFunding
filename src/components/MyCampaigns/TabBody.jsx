import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Img2 from '../../assets/icons/home-card-1.jfif'

const TabBody = ({ campaigns }) => {
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoad(true);
        }, 700)
    })

    return (
        <div className="tab-body">
            {
                campaigns.length > 0 && campaigns.slice().reverse().map(campaign => {
                    return (
                        <Link to={`/campaign/${campaign.id}`}>
                            <div className={load ? "tab-img-container" : "tab-img-container skeleton"}>
                                <img style={{ visibility: load ? 'visible' : 'hidden' }} src={Img2} alt="" />
                                {load && <p className='tab-img-desc text-overflow-hide'>{campaign.title}</p>}
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default TabBody
