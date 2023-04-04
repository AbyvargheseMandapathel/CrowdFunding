import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';
import './App.css';
import Etherfund from './contracts/Etherfund.json'



// constants
// import { LOAD_TIME } from './helpers/constants';

// components
import NavBar from './components/NavBar/NavBar';
// import Loader from './components/Loader/Loader';
import Login from './components/Login/Login';

// pages
import CreateCampaignPage from './pages/CreateCampaignPage';
import RequestsPage from './pages/RequestsPage';
import HomePage from './pages/HomePage';

// examples
import Main from './components/Main';
import Campaign from './Campaign';


// contexts
import { AccountProvider } from './context/AccountContext';
import { ContractWeb3Context } from './context/ContractWeb3Context';

function App() {
  // const [isLoad, setIsLoad] = useState(false)
  const { setContract, setWeb3 } = useContext(ContractWeb3Context);
  const [contractWeb3, setContractWeb3] = useState(null)

  // loading animation
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoad(true)
  //   }, LOAD_TIME)
  // })

  // for changing theme when loading
  useEffect(() => {
    let theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.querySelector('html').id = 'dark'
    }
  })

  // connect to smart contract while loading
  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545"); // rpc server url of ganache
    async function template() {
      const web3Instance = new Web3(provider);
      /*
          To interact with smart contract we need
          i) ABI Code
          ii) Contract Address
      
      */

      // gets networkId (in ganacge: 5777)
      const networkId = await web3Instance.eth.net.getId();

      // deployedNetwork.address is contract address of Etherfund
      const deployedNetwork = Etherfund.networks[networkId];

      // instance of smart contract to make interactions
      const contractInstance = new web3Instance.eth.Contract(Etherfund.abi, deployedNetwork.address);

      setContract(contractInstance);
      setWeb3(web3Instance);
      setContractWeb3({ contractInstance, web3Instance })
    }

    provider && template()
  }, []);

  if (!contractWeb3) {
    // return (<h1>Loading</h1>)
    console.warn("%cNo contracts available", "background:#EAB643; color:#fff; font-size:16px; padding: 5px 10px;")
  }

  // if (!isLoad)
  //   return <Loader />

  return (
    <BrowserRouter>
      <AccountProvider>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/login' element={<Login />} />
          <Route path='/campaign' element={<Campaign />} />
          <Route path='/campaign/:id' element={<Main />} />
          <Route path='/createCampaign' element={<CreateCampaignPage />} />
          <Route path='/requests' element={<RequestsPage />} />
          <Route path='/main' element={<Main />} />
        </Routes>
      </AccountProvider>
    </BrowserRouter>
  );
}

export default App;
