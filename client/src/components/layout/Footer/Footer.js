import React from 'react'
import playStore from '../../../Images/PlayStore.png'
import appStore from '../../../Images/AppStore.png'
import logo from '../../../Images/logo.png'
import "./Footer.css"

const Footer = () => {
    return (
        <footer id="footer">
            <div className='leftFooter'>
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download our App for Android and IOS mobile phone</p>
                <img src={playStore} alt='Playstore'></img>
                <img src={appStore} alt='Appstore'></img>
            </div>
            <div className='midFooter'>
                <img src={logo} alt='Vivardhini'></img>
                <p>Copyrights 2021 &copy; Vivardhini</p>
            </div>
            <div className='rightFooter'>
                <h4>Folllow Us</h4>
                <a href='#'>Instagram</a>
                <a href='#'>Facebook</a>
                <a href='#'>Twitter</a>
            </div>
        </footer>
    )
}

export default Footer
