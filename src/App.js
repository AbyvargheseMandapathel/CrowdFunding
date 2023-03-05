import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';

import Etherfund from './contracts/Etherfund.json'

import './App.css';

// components
import NavBar from './components/NavBar/NavBar';

// pages
import Main from './components/Main';

import Campaign from './Campaign';

function App() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [data, setData] = useState([]);

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
      const web3 = new Web3(provider);
      /*
          To interact with smart contract we need
          i) ABI Code
          ii) Contract Address
      
      */

      // gets networkId (in ganacge: 5777)
      const networkId = await web3.eth.net.getId();

      // deployedNetwork.address is contract address of Etherfund
      const deployedNetwork = Etherfund.networks[networkId];

      // instance of smart contract to make interactions
      const contract = new web3.eth.Contract(Etherfund.abi, deployedNetwork.address);

      setState({ web3: web3, contract: contract });// change state
    }

    provider && template()
  }, []);

  return (
    <div className="App">
      <h1>{data}</h1>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Campaign contract={state.contract} web3={state.web3}/>} />
          <Route exact path='/main' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
