//Will handle the redirects from spotify and get the access token
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAccessToken } from '../utility/auth';
import queryString from 'query-string';

function Callback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const { code, state } = queryString.parse(location.search);
      const storedState = localStorage.getItem('state');

      if (state !== storedState) {
        console.error('State mismatch');
        return;
      }

      try {
        const tokenData = await getAccessToken(code);
        localStorage.setItem('access_token', tokenData.access_token);
        localStorage.setItem('refresh_token', tokenData.refresh_token);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchToken();
  }, [location.search, navigate]);

  return <div>Loading...</div>;
}

export default Callback;