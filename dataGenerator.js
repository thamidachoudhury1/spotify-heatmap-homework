const fs = require('fs');

// Define a larger list of artists and their songs
const artists = [
  'Taylor Swift',
  'Ed Sheeran',
  'Beyoncé',
  'Drake',
  'Adele',
  'Bruno Mars',
  'Billie Eilish',
  'The Weeknd',
  'Kendrick Lamar',
  'Lady Gaga',
  'Maroon 5',
  'Ariana Grande',
  'Justin Bieber',
  'Rihanna',
  'Shawn Mendes',
  'Dua Lipa',
  'Katy Perry',
  'Harry Styles',
  'Sam Smith',
  'Imagine Dragons',
  'Coldplay',
  'Post Malone',
  'Selena Gomez',
  'Doja Cat',
  'Lil Nas X',
  'Cardi B',
  'Halsey',
  'Sia',
  'Olivia Rodrigo',
  'Jonas Brothers',
  'Miley Cyrus',
  'Jason Derulo',
  'Camila Cabello',
  'Justin Timberlake',
  'Khalid',
  'Demi Lovato',
  'Shakira',
  'Zayn',
  'J Balvin',
  'Bad Bunny',
  'Lewis Capaldi',
  'OneRepublic',
  'Lizzo',
  'Alicia Keys',
  'Eminem',
  'Jay-Z',
  'Kanye West',
  'Nicki Minaj',
  'Snoop Dogg',
  'Queen',
  'The Beatles',
  'Elton John',
  'David Bowie',
  'Prince',
  'Madonna',
  'Whitney Houston',
  'Stevie Wonder',
  'Bob Marley',
  'Michael Jackson',
];

// Define songs for each artist
const tracks = {
  'Taylor Swift': ['Lover', 'Shake It Off', 'Blank Space', 'Bad Blood', 'Cardigan'],
  'Ed Sheeran': ['Shape of You', 'Perfect', 'Photograph', 'Thinking Out Loud', 'Bad Habits'],
  'Beyoncé': ['Halo', 'Crazy in Love', 'Formation', 'Single Ladies', 'Run the World'],
  'Drake': ["God's Plan", 'Hotline Bling', 'One Dance', 'In My Feelings', 'Toosie Slide'],
  'Adele': ['Hello', 'Someone Like You', 'Rolling in the Deep', 'Set Fire to the Rain', 'Easy on Me'],
  'Bruno Mars': ['Uptown Funk', 'Just the Way You Are', 'Grenade', '24K Magic', 'Locked Out of Heaven'],
  'Billie Eilish': ['Bad Guy', 'Ocean Eyes', "When the Party's Over", 'Everything I Wanted', 'Happier Than Ever'],
  'The Weeknd': ['Blinding Lights', 'Starboy', "Can't Feel My Face", 'The Hills', 'Save Your Tears'],
  'Kendrick Lamar': ['HUMBLE.', 'Alright', 'DNA.', 'King Kunta', 'Money Trees'],
  'Lady Gaga': ['Poker Face', 'Bad Romance', 'Shallow', 'Just Dance', 'Rain On Me'],
  'Maroon 5': ['Sugar', 'Memories', 'Girls Like You', 'She Will Be Loved', 'Moves Like Jagger'],
  'Ariana Grande': ['Thank U, Next', '7 rings', 'Positions', 'No Tears Left to Cry', 'God is a woman'],
  'Justin Bieber': ['Peaches', 'Sorry', 'Love Yourself', 'Yummy', 'What Do You Mean?'],
  'Rihanna': ['Diamonds', 'Umbrella', 'Work', 'Only Girl', 'We Found Love'],
  'Shawn Mendes': ['Señorita', 'Stitches', 'Treat You Better', "There's Nothing Holdin' Me Back", 'In My Blood'],
  'Dua Lipa': ["Don't Start Now", 'Levitating', 'New Rules', 'Break My Heart', 'Physical'],
  'Katy Perry': ['Roar', 'Firework', 'Dark Horse', 'California Gurls', 'Last Friday Night'],
  'Harry Styles': ['Watermelon Sugar', 'Sign of the Times', 'Adore You', 'Golden', 'Kiwi'],
  'Sam Smith': ['Stay With Me', 'Too Good at Goodbyes', "I'm Not the Only One", 'Dancing with a Stranger', 'Diamonds'],
  'Imagine Dragons': ['Believer', 'Radioactive', 'Thunder', 'Demons', 'Whatever It Takes'],
  'Coldplay': ['Viva La Vida', 'Yellow', 'Fix You', 'Paradise', 'A Sky Full of Stars'],
  'Post Malone': ['Circles', 'Rockstar', 'Sunflower', 'Better Now', 'Congratulations'],
  'Selena Gomez': ['Lose You to Love Me', 'Rare', 'Wolves', 'Hands to Myself', 'Good for You'],
  'Doja Cat': ['Say So', 'Kiss Me More', 'Streets', 'Boss Bitch', 'Need to Know'],
  'Lil Nas X': ['Old Town Road', 'Montero', 'Panini', 'Industry Baby', 'Rodeo'],
  'Cardi B': ['Bodak Yellow', 'I Like It', 'WAP', 'Money', 'Up'],
  'Halsey': ['Without Me', 'Closer', 'Bad at Love', 'Graveyard', 'Eastside'],
  'Sia': ['Chandelier', 'Cheap Thrills', 'Elastic Heart', 'Unstoppable', 'The Greatest'],
  'Olivia Rodrigo': ['Drivers License', 'Good 4 U', 'Deja Vu', 'Traitor', 'Brutal'],
  'Jonas Brothers': ['Sucker', 'Only Human', 'Cool', "Burnin' Up", 'What a Man Gotta Do'],
  'Miley Cyrus': ['Wrecking Ball', 'Party in the U.S.A.', 'Malibu', "We Can't Stop", 'Midnight Sky'],
  'Jason Derulo': ['Savage Love', 'Talk Dirty', 'Want to Want Me', 'Whatcha Say', 'Wiggle'],
  'Camila Cabello': ['Havana', 'Señorita', 'Never Be the Same', 'My Oh My', "Don't Go Yet"],
  'Justin Timberlake': ["Can't Stop the Feeling!", 'Mirrors', 'SexyBack', 'Cry Me a River', 'Suit & Tie'],
  'Khalid': ['Location', 'Young Dumb & Broke', 'Talk', 'Better', 'Love Lies'],
  'Demi Lovato': ['Sorry Not Sorry', 'Confident', 'Cool for the Summer', 'Heart Attack', 'Anyone'],
  'Shakira': ["Hips Don't Lie", 'Waka Waka', 'Whenever, Wherever', "Can't Remember to Forget You", 'She Wolf'],
  'Zayn': ['Pillowtalk', 'Dusk Till Dawn', "I Don't Wanna Live Forever", 'Let Me', 'Vibez'],
  'J Balvin': ['Mi Gente', 'Ginza', 'Ay Vamos', 'Loco Contigo', 'X'],
  'Bad Bunny': ['Dakiti', 'Mía', 'Yonaguni', 'Callaíta', 'Booker T'],
  'Lewis Capaldi': ['Someone You Loved', 'Before You Go', 'Bruises', 'Hold Me While You Wait', 'Grace'],
  'OneRepublic': ['Counting Stars', 'Apologize', 'Secrets', 'Rescue Me', 'Stop and Stare'],
  'Lizzo': ['Truth Hurts', 'Good as Hell', 'Juice', 'Boys', 'Tempo'],
  'Alicia Keys': ["Fallin'", "If I Ain't Got You", 'No One', 'Girl on Fire', 'Empire State of Mind'],
  'Eminem': ['Lose Yourself', 'Rap God', 'The Real Slim Shady', 'Not Afraid', 'Godzilla'],
  'Jay-Z': ['Empire State of Mind', '99 Problems', 'Numb/Encore', 'Run This Town', 'Otis'],
  'Kanye West': ['Stronger', 'Gold Digger', 'Heartless', 'Power', 'All of the Lights'],
  'Nicki Minaj': ['Super Bass', 'Starships', 'Anaconda', 'Bang Bang', 'Chun-Li'],
  'Snoop Dogg': ["Drop It Like It's Hot", 'Gin and Juice', 'Young, Wild & Free', 'Sensual Seduction', 'Who Am I'],
  'Queen': ['Bohemian Rhapsody', "Don't Stop Me Now", 'Another One Bites the Dust', 'We Will Rock You', 'Somebody to Love'],
  'The Beatles': ['Hey Jude', 'Let It Be', 'Come Together', 'Yesterday', 'Here Comes the Sun'],
  'Elton John': ['Rocket Man', 'Tiny Dancer', 'Your Song', "I'm Still Standing", 'Candle in the Wind'],
  'David Bowie': ['Heroes', 'Space Oddity', "Let's Dance", 'Life on Mars?', 'Under Pressure'],
  'Prince': ['Purple Rain', 'When Doves Cry', 'Kiss', 'Little Red Corvette', '1999'],
  'Madonna': ['Like a Prayer', 'Material Girl', 'Vogue', 'Hung Up', 'Like a Virgin'],
  'Whitney Houston': ['I Will Always Love You', 'I Wanna Dance with Somebody', 'Greatest Love of All', 'How Will I Know', 'One Moment in Time'],
  'Stevie Wonder': ['Superstition', "Isn't She Lovely", 'Sir Duke', 'I Just Called to Say I Love You', 'Higher Ground'],
  'Bob Marley': ['Three Little Birds', 'No Woman, No Cry', 'One Love', 'Could You Be Loved', 'Redemption Song'],
  'Michael Jackson': ['Thriller', 'Billie Jean', 'Beat It', 'Smooth Criminal', 'Man in the Mirror'],
};

// Define total streams for each song (numbers not exceeding 3,000,000)
const songTotalStreams = {};

// Function to generate realistic total streams
function generateTotalStreams() {
  return getRandomInt(1_000_000, 3_000_000);
}

// Populate the songTotalStreams object
artists.forEach((artist) => {
  tracks[artist].forEach((track) => {
    const songKey = `${artist} - ${track}`;
    const totalStreams = generateTotalStreams();
    songTotalStreams[songKey] = totalStreams;
  });
});

// Function to get total streams for a song
function getTotalStreamsForSong(artist, track) {
  const songKey = `${artist} - ${track}`;
  return songTotalStreams[songKey];
}

// Set the date range
const startDate = new Date('2024-01-01');
const endDate = new Date();

// Array to hold all the entries
const data = [];

// Function to generate random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Iterate over each day in the date range
for (
  let date = new Date(startDate);
  date <= endDate;
  date.setDate(date.getDate() + 1)
) {
  // Generate a random number of plays for the day (e.g., between 0 and 15)
  const plays = getRandomInt(0, 15);

  for (let i = 0; i < plays; i++) {
    // Randomly select an artist
    const artist = artists[getRandomInt(0, artists.length - 1)];
    // Randomly select a track from the artist
    const trackList = tracks[artist];
    const track = trackList[getRandomInt(0, trackList.length - 1)];
    // Generate a random time for the 'endTime'
    const hour = getRandomInt(0, 23);
    const minute = getRandomInt(0, 59);
    const endTime = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(
      hour
    ).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

    // Generate a random play duration between 30 seconds and 5 minutes
    const msPlayed = getRandomInt(30_000, 300_000);

    // Get total streams for the artist's song
    const totalStreams = getTotalStreamsForSong(artist, track);

    // Add the entry to the data array
    data.push({
      endTime: endTime,
      artistName: artist,
      trackName: track,
      msPlayed: msPlayed,
      totalStreams: totalStreams, // Total streams as precise numbers
    });
  }
}

// Write the data to a JSON file
const outputDir = 'src/data';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
fs.writeFileSync(
  `${outputDir}/StreamingHistory0.json`,
  JSON.stringify(data, null, 2)
);

console.log(`Generated ${data.length} entries in StreamingHistory0.json`);
