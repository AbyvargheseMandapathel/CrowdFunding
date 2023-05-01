import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useNavigate ,useLocation } from 'react-router-dom'
import './NavBar.css'

// components
import Switch from '../Switch/Switch'

// constants
import { NAVOPTIONS } from '../../helpers/constants'

// helpers
import { connectAccount } from '../../helpers/helper'

// contexts
import { AccountContext } from '../../context/AccountContext'

// logo
import Logo from '../../assets/images/logo.png'

// icons
import { TbBrightnessUp } from 'react-icons/tb'
import { BsFillMoonFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { RiMenu2Line } from 'react-icons/ri'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'


const NavBar = ({ isLoginPage }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [drawerVisibility, setDrawerVisibility] = useState(false);
    const { account, setAccount } = useContext(AccountContext);
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      const storedAccount = JSON.parse(localStorage.getItem('account'));
      if (!account && location.pathname !== '/login' && storedAccount) {
        setAccount(storedAccount);
      } else if (!account && location.pathname !== '/login') {
        navigate('/login');
      }
    }, [account, location.pathname, navigate, setAccount]);
  
    const changeTheme = () => {
      const html = document.querySelector('html');
      if (html.id === 'light') {
        html.id = 'dark';
        setTheme('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        html.id = 'light';
        setTheme('light');
        localStorage.setItem('theme', 'light');
      }
    };
  
    const slideDrawer = (pos) => {
      const drawer = document.querySelector('.sidebar-drawer');
      drawerVisibility ? (drawer.style.opacity = '0') : (drawer.style.opacity = '1');
      drawer.style.left = pos;
      setDrawerVisibility(!drawerVisibility);
    };
  
    const connect = async () => {
      const acc = await connectAccount();
      setAccount(acc);
      localStorage.setItem('account', JSON.stringify(acc));
      navigate('/');
    };
  
    const handleLogout = () => {
      setAccount(null);
      localStorage.removeItem('account');
      navigate('/login');
    };
  

    return (
        <nav className='nav-bar'>
            <div className="left-nav">
                <div className="brand-nav">
                    <span className="ripple drawer-opener" onClick={() => slideDrawer('0%')}>
                        <RiMenu2Line className='nav-icons' />
                    </span>
                    <NavLink to="/"><img src={Logo} className='logo-nav' alt="" /></NavLink>
                </div>

                <div className="sidebar-drawer">
                    <div className="sidebar">
                        <div className="brand-nav brand-nav-sidebar">
                            <NavLink to="/" onClick={() => slideDrawer("-100%")}>
                                <img src={Logo} className="logo-nav" alt="" />
                            </NavLink>
                        </div>

                        <ul className="sidebar-ul">
                            {
                                NAVOPTIONS.map(({ opt, path }, index) => {
                                    return (
                                        <NavLink
                                            to={path}
                                            key={index}
                                            onClick={() => slideDrawer('-100%')}
                                        >
                                            <li className="sidebar-li" id={opt}>{opt}</li>
                                        </NavLink>
                                    )
                                })
                            }
                            {
                                account &&
                                <NavLink
                                    to='/profile'
                                    onClick={() => slideDrawer('-100%')}
                                >
                                    <li className="sidebar-li" id='profile'>profile</li>
                                </NavLink>
                            }
                        </ul>
                        
                        <div className="switch-theme-sidear">
                            <Switch onChange={changeTheme} checked={theme === 'dark' && true} />
                            <span className="ripple">
                                {
                                    theme === 'dark' ?
                                        <TbBrightnessUp className='nav-icons ripple' />
                                        :
                                        <BsFillMoonFill className='nav-icons ripple' style={{ color: 'var(--text)' }} />

                                }
                            </span>
                        </div>
                    </div>
                    <div className="drawer-closer" onClick={() => slideDrawer('-100%')}></div>
                </div>

            </div>

            <div className="right-nav">
                {
                    NAVOPTIONS.map(({ opt, path }, index) => {
                        return (
                            <NavLink
                                to={path}
                                className='nav-links'
                                key={index}
                                id={opt}
                            >
                                {opt}
                            </NavLink>)
                    })
                }
                  {
    account ?
        <>
            <NavLink
                to='profile'
                className='nav-links profile-icon-nav'
                id='profile'
            >
                <FaUserAlt />
            </NavLink>
            <button
                className='btn-nav'
                onClick={() => {
                    setAccount(null);
                    localStorage.removeItem('account');
                    navigate('/login'); // navigate to the login page
                }}
                >
                Logout
                </button>

        </>
        :
        <button className='btn-nav' onClick={connect}>
            <span className='btn-nav-load'><AiOutlineLoading3Quarters /></span>
            Connect
        </button>
}
                
                <Switch className="nav-switch" onChange={changeTheme} checked={theme === 'dark' && true} />
                
                <span className="ripple nav-switch">
                    {
                        theme === 'dark' ?
                            <TbBrightnessUp className='nav-icons ripple' />
                            :
                            <BsFillMoonFill className='nav-icons ripple' style={{ color: 'var(--text)' }} />
                    }
                </span>
            </div>
        </nav>
    )
}

export default NavBar;