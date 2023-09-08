// Get references to HTML elements
const img = document.querySelector("img"); // Reference to the image element
const title = document.getElementById("title"); // Reference to the title element
const artist = document.getElementById("artist"); // Reference to the artist element
const music = document.querySelector("audio"); // Reference to the audio element
const progressContainer = document.getElementById("progress-container"); // Reference to the progress container element
const progress = document.getElementById("progress"); // Reference to the progress bar element
const currentTimeEl = document.getElementById("current-time"); // Reference to the current time element
const durationEl = document.getElementById("duration"); // Reference to the duration element
const prevBtn = document.getElementById("prev"); // Reference to the previous button element
const playBtn = document.getElementById("play"); // Reference to the play/pause button element
const nextBtn = document.getElementById("next"); // Reference to the next button element

// Array of songs
let songs = [
  {
    name: "driving-ambition",
    displayName: "Driving-Ambition",
    artist: "Ahjay Stelino",
  },
  {
    name: "cbpd-400",
    displayName: "CBPD-400",
    artist: "Arulo",
  },
  {
    name: "raising-me-higher",
    displayName: "Raising Me Higher",
    artist: "Ahjay Stelino",
  },
  {
    name: "uplift-me",
    displayName: "Uplift Me",
    artist: "Ahjay Stelino"
  }
];

// Check if music is currently playing
let isPlaying = false;

// Function to play music
function playMusic() {
  music.play();
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
}

// Function to pause music
function pauseMusic() {
  music.pause();
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
}

// Event listener for play/pause button
playBtn.addEventListener("click", () =>
  isPlaying ? pauseMusic() : playMusic()
);

// Function to load a song and update the UI
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
}
let songIndex = 0;
loadSong(songs[songIndex]);

// Function to play the next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playMusic();
}

// Function to play the previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playMusic();
}

// Function to update the progress bar and time display
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Function to set the progress bar when clicked
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
nextBtn.addEventListener("click", nextSong); // Next button click
prevBtn.addEventListener("click", prevSong); // Previous button click
music.addEventListener("timeupdate", updateProgressBar); // Music time update
music.addEventListener("ended", nextSong); // Music ended
progressContainer.addEventListener("click", setProgressBar); // Progress bar click
