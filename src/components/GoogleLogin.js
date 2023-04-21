import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';

const GoogleLoginComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const onSuccess = (response) => {
    setIsLoggedIn(true);
    setUserData(response.profileObj);
  };

  const onFailure = (response) => {
    console.log(response);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2
          .init({
            client_id: 'Y951226780574-0dtiobp4up2jaump2f3doe79gum90j1j.apps.googleusercontent.com',
          })
          .then(() => {
            console.log('Google API initialized');
          });
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Welcome {userData.name}!</p>
          <p>Email: {userData.email}</p>
          <img src={userData.imageUrl} alt={userData.name} />
        </div>
      ) : (
        <GoogleLogin
          clientId="951226780574-0dtiobp4up2jaump2f3doe79gum90j1j.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      )}
    </div>
  );
};

export default GoogleLoginComponent;
