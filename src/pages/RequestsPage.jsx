import React, { useState, useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'

// context
import { AccountContext } from '../context/AccountContext'

// components
import Requests from '../components/Request/Requests'
import Loader from '../components/Loader/Loader'
import Footer from '../components/Footer/Footer'

// constants
import { LOAD_TIME } from '../helpers/constants'

const RequestsPage = () => {
    const { account } = useContext(AccountContext);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        document.querySelector('title').innerHTML = 'Etherfund - Requests'
        setTimeout(() => {
            setIsLoad(true)
        }, LOAD_TIME)
    })

    if (account === '')
        return <Navigate to="/login" />

    return (
        isLoad ?
            <>
                <Requests />
                <Footer />
            </>
            :
            <Loader />
    )
}

export default RequestsPage
