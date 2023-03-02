import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

// components
import Switch from '../Switch/Switch'

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
    const [wallet, setWallet] = useState(false);

    // get current theme
    useEffect(() => {
        let localTheme = localStorage.getItem('theme');
        if (localTheme === 'dark') {
            document.querySelector('html').id = 'dark';
            setTheme('dark');
        }
    })

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

    return (
        <nav className='nav-bar'>
            <div className="left-nav">
                <div className="brand-nav">
                    <span className="ripple drawer-opener" onClick={() => slideDrawer('0%')}>
                        <RiMenu2Line className='nav-icons' />
                    </span>
                    <h3>BF&nbsp;</h3>
                    <h3>BettedFund</h3>
                </div>
                <div className="sidebar-drawer">
                    <div className="sidebar">
                        <div className="brand-nav brand-nav-sidebar">
                            <h3>Betterfund</h3>
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
                                wallet && <Link to='/profile' onClick={() => slideDrawer('-100%')}>
                                    <li className="sidebar-li">Profile</li>
                                </Link>
                            }
                        </ul>
                        <div className="switch-theme-sidear">
                            <Switch onChange={changeTheme} checked={theme === 'dark' && true} />
                            <span className="ripple">
                                {
                                    theme === 'dark' ?
                                        <BsFillMoonFill className='nav-icons ripple' style={{ color: 'var(--text)' }} />
                                        :
                                        <TbBrightnessUp className='nav-icons ripple' />
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
                    wallet ?
                        <Link
                            className='nav-links profile-icon-nav'
                            to='profile'
                            id='profile'
                        >
                            <FaUserAlt />
                        </Link>
                        :
                        <button className='btn-nav'>Connect</button>
                }
                <Switch className="nav-switch" onChange={changeTheme} checked={theme === 'dark' && true} />
                <span className="ripple nav-switch">
                    {
                        theme === 'dark' ?
                            <BsFillMoonFill className='nav-icons ripple' style={{ color: 'var(--text)' }} />
                            :
                            <TbBrightnessUp className='nav-icons ripple' />
                    }
                </span>
            </div>
        </nav>
    )
}

export default NavBar
