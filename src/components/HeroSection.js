import { React, useEffect } from 'react';
import './HeroSection.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

function responseGoogle(response) {
  console.log(response);
}

function HeroSection({

  lightBg,
  topLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  imgStart
}) {



  return (
    <>
      <div
        className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}
      >

        <div className='container'>
          <div
            className='row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
            }}
          >
            <div className='col'>
              <div className='home__hero-text-wrapper'>
                <div className='top-line'>{topLine}</div>
                <h1 className={lightText ? 'heading' : 'heading dark'}>
                  {headline}
                </h1>
                <p
                  className={
                    lightTextDesc
                      ? 'home__hero-subtitle'
                      : 'home__hero-subtitle dark'
                  }
                >
                  {description}
                </p>
                <Link to='/'>
                  <Button buttonSize='btn--wide' buttonColor='blue'>
                    {buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className='col'>
              <div className='home__hero-img-wrapper'>
                <img src={img} alt={alt} className='home__hero-img' />
              </div>
            </div>
          </div>
        </div>
        <div className='input-areas'>
          <section className='footer-subscription'>
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
      </section>
        </div>

      </div>
    </>
  );
}

export default HeroSection;