import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

// component
import Home from '../components/Home/Home'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader/Loader'

// constants
import { LOAD_TIME } from '../helpers/constants'


const HomePage = () => {
    const [isLoad, setIsLoad] = useState(false);

    //  loading animation
    useEffect(() => {
        setTimeout(() => {
            setIsLoad(true)
        }, LOAD_TIME)
    })

    return (
        isLoad?
        <>
            <h1><Link to="/campaign/0">campaign</Link></h1>
            <h1><Link to="/mycampaign/0">my campaign</Link></h1>
            <Home />
            <Footer />
        </>
        :
        <Loader />
    )
}

export default HomePage
