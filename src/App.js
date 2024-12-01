import React from 'react';
import Heatmap from './components/heatmap';
import { heatmapValues } from './dataProcess';

function App() {
  return (
    <div>
      <h1>Spotify Listening History Heatmap</h1>
      <Heatmap values={heatmapValues} />
    </div>
  );
}

export default App;
