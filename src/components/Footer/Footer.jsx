import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

// icons
import { MdOutlineEmail } from 'react-icons/md'
import { BsTelephone } from 'react-icons/bs'

const Footer = () => {
    return (
        <footer>
            <div className="foot-details">
                <div className="foot-left">
                    <h1>Etherfund</h1>
                    <address>
                        ABC Building <br />
                        Abc Road <br />
                        Kerala, Kottayam, 686663
                    </address>
                    <p><span className='icon-phone-mail'><MdOutlineEmail /></span> etherfund2022@gmail.com</p>
                    <p><span className='icon-phone-mail'><BsTelephone /></span> +91 9876543210</p>
                </div>

                <div className="foot-right">
                    <p><Link to='/'>About Etherfund</Link></p>
                    <p><Link to='/'>How it works?</Link></p>
                    <p><Link to='/'>What is crowdfunding and why Etherfund?</Link></p>
                </div>
            </div>
            <div className='footer-copyright'>
                &nbsp;
                &copy; 
                {new Date().getFullYear()}
                &nbsp;
                Etherfund
            </div>
        </footer>
    )
}

export default Footer
