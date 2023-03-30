import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ContractWeb3Provider } from './context/ContractWeb3Context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContractWeb3Provider>
        <App />
    </ContractWeb3Provider>
);

