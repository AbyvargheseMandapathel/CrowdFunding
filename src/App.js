import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

// components
import NavBar from './components/NavBar/NavBar';

// pages
import Main from './components/Main';

function App() {
  useEffect(() => {
    // check current theme
    let theme = localStorage.getItem('theme');
    if (theme === 'dark'){
      document.querySelector('html').id = 'dark'
    }
  })

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route exact path='/' element={<Main/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
