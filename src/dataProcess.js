import streamingHistory from './data/StreamingHistory0.json';

// Initialize an object to store data per day
const playsPerDay = {};

// Process each listening event
streamingHistory.forEach((entry) => {
  // Extract the date from the 'endTime' field
  const date = entry.endTime.split(' ')[0]; // Format: 'YYYY-MM-DD'

  // Initialize the date entry if it doesn't exist
  if (!playsPerDay[date]) {
    playsPerDay[date] = {
      count: 0,
      tracks: [],
      duration: 0,
    };
  }

  // Increment the play count and store the track info
  playsPerDay[date].count += 1;
  playsPerDay[date].tracks.push({
    trackName: entry.trackName,
    artistName: entry.artistName,
    msPlayed: entry.msPlayed,
    totalStreams: entry.totalStreams,
  });
  playsPerDay[date].duration += entry.msPlayed;
});

// Prepare data for the heatmap
export const heatmapValues = Object.keys(playsPerDay).map((date) => {
  const trackCounts = {};
  const trackStreams = {};

  // Count occurrences and get total streams for each track
  playsPerDay[date].tracks.forEach((track) => {
    const trackKey = `${track.artistName} - ${track.trackName}`;
    trackCounts[trackKey] = (trackCounts[trackKey] || 0) + 1;
    trackStreams[trackKey] = track.totalStreams; // Total streams in millions
  });

  // Find the most played track
  const mostPlayedTrack = Object.keys(trackCounts).reduce((a, b) =>
    trackCounts[a] > trackCounts[b] ? a : b
  );

  // Get total streams for the most played track
  const totalStreamsForTrack = trackStreams[mostPlayedTrack];

  // Convert total duration from ms to hh:mm:ss
  const totalMsPlayed = playsPerDay[date].duration;
  const hours = Math.floor(totalMsPlayed / (1000 * 60 * 60));
  const minutes = Math.floor((totalMsPlayed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((totalMsPlayed % (1000 * 60)) / 1000);
  const durationString = `${hours}h ${minutes}m ${seconds}s`;

  return {
    date: date,
    count: playsPerDay[date].count,
    mostPlayedTrack: mostPlayedTrack,
    totalStreamsForTrack: `${totalStreamsForTrack}`,
    totalDuration: durationString,
  };
});
