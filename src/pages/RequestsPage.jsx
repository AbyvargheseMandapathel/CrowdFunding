import React, { useState, useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'

// context
import { AccountContext } from '../context/AccountContext'

// components
import Requests from '../components/Request/Requests'
import Loader from '../components/Loader/Loader'

// constants
import { LOAD_TIME } from '../helpers/constants'

const RequestsPage = () => {
    const { account } = useContext(AccountContext);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoad(true)
        }, LOAD_TIME)
    })

    if (account === '')
        return <Navigate to="/login" />

    return (
        isLoad ?
            <Requests />
            :
            <Loader />
    )
}

export default RequestsPage
