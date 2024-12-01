//Will start the login process
import React from 'react';
import { redirectToAuthCodeFlow } from '../utility/auth';

function Login() {
  const handleLogin = () => {
    redirectToAuthCodeFlow();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Music Heatmap</h1>
      <button onClick={handleLogin}>Log in with Spotify</button>
    </div>
  );
}

export default Login;