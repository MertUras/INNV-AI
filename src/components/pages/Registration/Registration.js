import React, { useState } from 'react';
import { Button } from '../../Button';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

function Registration() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Client ID obtained from the Google API Console
  const clientId = '951226780574-0dtiobp4up2jaump2f3doe79gum90j1j.apps.googleusercontent.com';

  const onSuccess = (response) => {
    console.log(response);
    setLoggedIn(true);
    // TODO: Handle successful login here
  };

  const onFailure = (response) => {
    console.log(response);
    // TODO: Handle failed login here
  };

  const handleGoogleLogin = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(onSuccess, onFailure);
  };

  return (
    <>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Üyelik Oluşturun
        </p>
        <p className='footer-subscription-text'>
          Abonelik listesi sizin kontrolünüzde
        </p>
        <div className='input-areas'>
          <form>
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
              clientId={clientId}
              buttonText='Google ile Giriş Yap'
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={loggedIn}
              render={(renderProps) => (
                <Button
                  buttonStyle='btn--outline'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Google ile Giriş Yap
                </Button>
              )}
            />
            <button onClick={handleGoogleLogin}>Google ile Giriş Yap</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Registration;
