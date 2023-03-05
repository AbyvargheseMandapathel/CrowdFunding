import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';

import Etherfund from './contracts/Etherfund.json'

import './App.css';

// components
import NavBar from './components/NavBar/NavBar';

// pages
import Main from './components/Main';
import Campaign from './Campaign';


// contexts
import { AccountProvider } from './context/AccountContext';
import { ContractWeb3Context } from './context/ContractWeb3Context';

function App() {
  const{ setContract, setWeb3} = useContext(ContractWeb3Context);
  const [contractWeb3, setContractWeb3] = useState(null)

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
      setContractWeb3({contractInstance, web3Instance})
    }
    
    provider && template()
  }, []);

  if(!contractWeb3) {
    return (
      <h1>Loading</h1>
    )
  }

  return (
    <BrowserRouter>
      <AccountProvider>
      <NavBar />
        <Routes>
          <Route exact path='/' element={<Campaign />} />
          <Route exact path='/main' element={<Main />} />
        </Routes>
      </AccountProvider>
    </BrowserRouter>
  );
}

export default App;
