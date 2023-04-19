import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdFingerprint } from 'react-icons/md'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Button } from './Button'
import './Navbar.css'
import { IconContext } from 'react-icons/lib'

function Navbar() {
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }
    useEffect(() => {
        showButton();

    }, []);
    window.addEventListener('resize', showButton);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <div className='navbar-container container'>
                        <Link to='' className='navbar-logo' onClick={closeMobileMenu}>
                            <MdFingerprint className='navbar-icon' />INNV
                        </Link>
                        <div className='menu-icon' onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                    Ana Sayfa
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/services'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Hizmetler
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/products'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Ürünler
                                </Link>
                            </li>
                            <li className='nav-btn'>
                                {button ? (
                                    <Link to='/pages/Registration' className='btn-link'>
                                        <Button buttonStyle='btn--outline'>KAYIT OL</Button>
                                    </Link>
                                ) : (
                                    <Link to='/pages/Registration' className='btn-link'>
                                        <Button
                                            buttonStyle='btn--outline'
                                            buttonSize='btn--mobile'
                                            onClick={closeMobileMenu}
                                        >
                                            KAYIT OL
                                        </Button>
                                    </Link>
                                )}
                            </li>
                            <li className='nav-btn'>
                                <Link to='/Interview' className='btn-link'>
                                    <Button buttonStyle='btn--outline'>Mülakata Başla</Button>
                                </Link>
                            </li>

                        </ul>
                    </div>

                </div>
            </IconContext.Provider>

        </>
    )
}

export default Navbar