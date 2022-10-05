const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const album = document.getElementById("album");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const muteBtn = document.getElementById("mute");
const shuffleBtn = document.getElementById("shuffle");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const songTime = document.getElementById("current-time");
const songDuration = document.getElementById("duration");
const music = document.querySelector("audio");

// Music - object with songs
const songs = [
  {
    name: "rock-1",
    displayName: "Anybody Seen My Baby",
    artist: "The Rolling Stones",
    cover: "rock-3",
    album: "Bridges To Babylon - 1997",
  },

  {
    name: "rock-2",
    displayName: "Be Yourself",
    artist: "Audioslave",
    cover: "rock-2",
    album: "Out of Exile - 2005",
  },

  {
    name: "rock-3",
    displayName: "Breaking The Habit",
    artist: "Linkin Park",
    cover: "rock-4",
    album: "Meteora - 2003",
  },

  {
    name: "rock-4",
    displayName: "Bulletproof",
    artist: "Godsmack",
    cover: "rock-5",
    album: "When Legends Rise - 2018",
  },

  {
    name: "rock-5",
    displayName: "Save Me",
    artist: "Shinedown",
    cover: "rock-6",
    album: "Us and Them - 2005",
  },

  {
    name: "rock-6",
    displayName: "In The End",
    artist: "Linkin Park",
    cover: "rock-7",
    album: "Hybrid Theory- 2000",
  },

  {
    name: "rock-7",
    displayName: "White Trash Beautiful",
    artist: "Everlast",
    cover: "rock-8",
    album: "White Trash Beautiful - 2004",
  },

  {
    name: "rock-8",
    displayName: "Aerials",
    artist: "S.O.A.D",
    cover: "rock-9",
    album: "Toxicity - 2001",
  },

  {
    name: "rock-9",
    displayName: "Papercut",
    artist: "Linkin Park",
    cover: "rock-10",
    album: "Hybrid Theory - 2000",
  },

  {
    name: "rock-10",
    displayName: "Under Your Scars",
    artist: "Godsmack",
    cover: "rock-11",
    album: "When Legends Rise - 2018",
  },

  {
    name: "rock-11",
    displayName: "Just to Get High",
    artist: "Nickelback",
    cover: "rock-12",
    album: "Dark Horse - 2008",
  },

  {
    name: "rock-12",
    displayName: "Next Go Round",
    artist: "Nickelback",
    cover: "rock-14",
    album: "Dark Horse- 2008",
  },

  {
    name: "rock-13",
    displayName: "Have a Nice Day",
    artist: "Bon Jovi",
    cover: "rock-15",
    album: "Have a Nice Day- 2005",
  },

  {
    name: "rock-14",
    displayName: "How You Remind Me",
    artist: "Nickelback",
    cover: "rock-13",
    album: "Silver Side Up - 2001",
  },
  
  {
    name: "rock-15",
    displayName: "Away",
    artist: "Breaking Benjamin",
    cover: "rock-16",
    album: "Phobia - 2006",
  },

  {
    name: "rock-16",
    displayName: "Cold",
    artist: "Breaking Benjamin",
    cover: "rock-17",
    album: "Phobia - 2006",
  }
];

let isPlaying = false;
let isMuted = true;

// Play
function playMusic() {
  isPlaying = true;
  music.play();
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
}

// Pause
function pauseMusic() {
  isPlaying = false;
  music.pause();
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

// Play or Pause
playBtn.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

// Mute
function muteSong() {
  isMuted = true;
  music.muted = true;
  muteBtn.setAttribute("title", "Unmute Song");
  muteBtn.classList.replace("fa-volume-high", "fa-volume-off");
}

// Unmute
function unMuteSong() {
  isMuted = false;
  music.muted = false;
  muteBtn.setAttribute("title", "Mute Song");
  muteBtn.classList.replace("fa-volume-off", "fa-volume-high");
}

// Mute or Unmute
muteBtn.addEventListener("click", () => {
  isMuted ? unMuteSong() : muteSong();
});

// Get random song
function randomSong() {
  const random = songs[Math.floor(Math.random() * songs.length)];
  console.log(random);
  loadSong(random);
  playMusic();
}

//  Click to get random song
shuffleBtn.addEventListener("click", randomSong);

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `./music/${song.name}.mp3`;
  image.src = `./img/${song.cover}.jpg`;
  album.textContent = song.album;
}

let songIndex = 0;

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playMusic();
}

// Prev song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playMusic();
}

loadSong(songs[songIndex]);

// Next song and Prev Button
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Update progress bar and duration
function progressBarUpdate(e) {
  if (isPlaying) {
    // console.log(e)
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    // console.log(duration)
    // console.log(currentTime)
    const barPercent = (currentTime / duration) * 100;
    // console.log(barPercent)
    progress.style.width = `${barPercent}%`;

    // Show how many minutes long the song is - duration
    const songDurationInMinutes = Math.floor(duration / 60);
    // console.log("minutes: ",songDurationInMinutes)
    // console.log("minutes: ", Math.floor(songDurationInMinutes))
    let songDurationInSeconds = Math.floor(duration % 60);
    if (songDurationInSeconds < 10) {
      songDurationInSeconds = `0${songDurationInSeconds}`;
    }
    // console.log(songDurationInSeconds)
    if (songDurationInMinutes) {
      songDuration.textContent = `${songDurationInMinutes}:${songDurationInSeconds}`;
    }

    // Show the current time of the song
    const currentTimeOfSongMinutes = Math.floor(currentTime / 60);
    // console.log(currentTimeOfSongMinutes);
    let currentTimeOfSongInSecunds = Math.floor(currentTime % 60);
    if (currentTimeOfSongInSecunds < 10) {
      currentTimeOfSongInSecunds = `0${currentTimeOfSongInSecunds}`;
    }
    // console.log(currentTimeOfSongInSecunds, currentTimeOfSongMinutes);
    songTime.textContent = `${currentTimeOfSongMinutes}:${currentTimeOfSongInSecunds}`;
  }
}
// Progress bar
music.addEventListener("timeupdate", progressBarUpdate);

function selectProgressBar(e) {
  // console.log(e)
  const width = this.clientWidth;
  console.log("max with of container: ", width);
  const clickX = e.offsetX;
  console.log("click max: ", clickX);
  console.log(clickX / width);
  const { duration } = music;
  console.log((clickX / width) * duration);
  music.currentTime = (clickX / width) * duration;
}
// Jump to different section of the song by clicking on the bar
progressContainer.addEventListener("click", selectProgressBar);

// Play next song when the current one ends
music.addEventListener("ended", nextSong);