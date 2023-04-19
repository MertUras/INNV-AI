import { React, useEffect } from 'react';
import './Footer.css';
import { Button } from '../../Button';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';
import { MdFingerprint } from 'react-icons/md';
import GoogleLogin from 'react-google-login';


function Footer() {
  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <div className='footer-container'>
      {/* <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Üyelik Oluşturun
        </p>
        <p className='footer-subscription-text'>
          Abonelik listesi sizin kontrolünüzde
        </p>
       <div className='input-areas'>
          -<form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <input
              className='footer-input'
              name='password'
              type='password'
              placeholder='Password'
            />
            <Button buttonStyle='btn--outline'>Kayıt</Button>
            <GoogleLogin
              clientId="951226780574-0dtiobp4up2jaump2f3doe79gum90j1j.apps.googleusercontent.com"
              buttonText="Google ile Giriş Yap"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              className='googleButton'
              style={{background:'blue'}}
              to='/home'
            />
          </form>
        </div>
      </section>*/}
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Hakkımızda</h2>
            <Link to='/sign-up'>Nasıl Çalışır</Link>
            <Link to='/'>Kariyer</Link>
            <Link to='/'>İş Ortakları</Link>

          </div>
          <div className='footer-link-items'>
            <h2>Bizimle iletişime geçin</h2>
            <Link to='/'>İletişim</Link>
            <Link to='/'>Destek</Link>

          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Sosyal Medya</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              <MdFingerprint className='navbar-icon' />
              INNV
            </Link>
          </div>
          <small className='website-rights'>INNOVA© 2023</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <FaFacebook />
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <FaInstagram />
            </Link>

            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <FaTwitter />
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;