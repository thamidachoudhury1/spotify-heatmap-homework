//will fetch the listening history and then display the heatmap
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Heatmap from './heatmap';
import { refreshAccessToken } from '../utility/auth';

function Home() {
  const [listeningData, setListeningData] = useState([]);

  useEffect(() => {
    const fetchListeningData = async () => {
      let accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      try {
        const allData = [];
        let after = null;
        let hasNext = true;

        while (hasNext) {
          const params = {
            limit: 50,
          };
          if (after) {
            params.before = after;
          }

          const response = await axios.get(
            'https://api.spotify.com/v1/me/player/recently-played',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              params: params,
            }
          );

          const items = response.data.items;
          allData.push(...items);

          if (items.length < 50) {
            hasNext = false;
          } else {
            after = new Date(
              items[items.length - 1].played_at
            ).getTime();
          }
        }

        setListeningData(allData);
      } catch (error) {
        if (error.response && error.response.status == 401) {
            //Token was expired and needs to be refreshed
            try {
                const newToken = await refreshAccessToken(refreshToken);
                localStorage.setItem('access_token', newToken.access_token);
                accessToken = newToken.access_token;
                //Retries fetching the data
                fetchListeningData();
            } catch(refreshError){
                console.error("Error refresh access token:", refreshError);
            }
        } else{
            console.error("Error fetching the listening data:". error);
        }
      }
    };

    fetchListeningData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {listeningData.length > 0 ? (
        <Heatmap listeningData={listeningData} />
      ) : (
        <p>Loading listening data...</p>
      )}
    </div>
  );
}

export default Home;
