import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

// components
import Switch from '../Switch/Switch'

// helpers
import { connectAccount } from '../../helpers/account'

// contexts
import {AccountContext} from '../../context/AccountContext'

// logo
import Logo from '../../assets/images/logo.png'

// icons
import { TbBrightnessUp } from 'react-icons/tb'
import { BsFillMoonFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { RiMenu2Line } from 'react-icons/ri'


// navigation links
const navOptions = [
    { opt: 'Home', path: 'form' },
    { opt: 'Create', path: '/' },
    { opt: 'Campaigns', path: '/' },
    { opt: 'Requests', path: '/' },
];

const NavBar = () => {
    const [theme, setTheme] = useState('light');
    const [drawerVisibility, setDrawerVisibility] = useState(false);
    const {account, setAccount} = useContext(AccountContext);

    // get current theme
    useEffect(() => {
        let localTheme = localStorage.getItem('theme');
        if (localTheme === 'dark') {
            document.querySelector('html').id = 'dark';
            setTheme('dark');
        }
    }, [])

    // change theme
    const changeTheme = () => {
        let html = document.querySelector('html');
        if (html.id === 'light') {
            html.id = 'dark';
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.id = 'light';
            setTheme('light');
            localStorage.setItem('theme', 'light');
        }
    }

    // open and close side navigation
    const slideDrawer = (pos) => {
        let drawer = document.querySelector('.sidebar-drawer');
        drawerVisibility ? drawer.style.opacity = '0' : drawer.style.opacity = '1'
        drawer.style.left = pos
        setDrawerVisibility(!drawerVisibility)
    }

    const connect = async() => {
        let acc = await connectAccount();
        setAccount(acc);
    }

    return (
        <nav className='nav-bar'>
            <div className="left-nav">
                <div className="brand-nav">
                    <span className="ripple drawer-opener" onClick={() => slideDrawer('0%')}>
                        <RiMenu2Line className='nav-icons' />
                    </span>
                    <img src={Logo} className='logo-nav' alt="" />
                </div>
                <div className="sidebar-drawer">
                    <div className="sidebar">
                        <div className="brand-nav brand-nav-sidebar">
                            <img src={Logo} className="logo-nav" alt="" />
                        </div>
                        <ul className="sidebar-ul">
                            {
                                navOptions.map(({ opt, path }, key) => {
                                    return (
                                        <Link to={path} key={key} onClick={() => slideDrawer('-100%')}>
                                            <li className="sidebar-li">{opt}</li>
                                        </Link>
                                    )
                                })
                            }
                            {
                                account && <Link to='/profile' onClick={() => slideDrawer('-100%')}>
                                    <li className="sidebar-li">Profile</li>
                                </Link>
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
                    navOptions.map(({ opt, path }, key) => {
                        return (
                            <Link className='nav-links' to={path} key={key} id={path}>
                                {opt}
                            </Link>)
                    })
                }
                {
                    account ?
                        <Link
                            className='nav-links profile-icon-nav'
                            to='profile'
                            id='profile'
                        >
                            <FaUserAlt />
                        </Link>
                        :
                        <button className='btn-nav' onClick={connect}>Connect</button>
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

export default NavBar
