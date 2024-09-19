const musicArray = [
  {
    src: "../assets/audio/beyonce.mp3",
    img: "../assets/images/beyonce.png",
    background: "../assets/images/beyonce.png",
    singer: "Beyoncé",
    song: "Lemonade",
  },
  {
    src: "../assets/audio/dualipa.mp3",
    img: "../assets/images/dualipa.png",
    background: "../assets/images/dualipa.png",
    singer: "Dua Lipa",
    song: "Don't start now",
  },
];

const playPause = document.querySelector(".play-btn");
const background = document.querySelector("body");
const photo = document.querySelector(".photo");
const singer = document.querySelector(".singer");
const song = document.querySelector(".song");
let trackIndex = 0;
const audio = new Audio(musicArray[trackIndex].src);
let isPlaying = false;

//Функция обновления контента
function updateContent() {
  photo.style.backgroundImage = `url(${musicArray[trackIndex].img})`;
  background.style.backgroundImage = `url(${musicArray[trackIndex].background})`;
  singer.textContent = musicArray[trackIndex].singer;
  song.textContent = musicArray[trackIndex].song;
}

//Функция для переключения кнопки Play/Pause
function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playPause.classList.remove("playing");
  } else {
    audio.play();
    playPause.classList.add("playing");
  }
  isPlaying = !isPlaying;
}

//Функция перехода к следующему треку
function loadNextTrack() {
  if (trackIndex < musicArray.length - 1) {
    trackIndex += 1;
  } else {
    trackIndex = 0;
  }
  loadTrack();
}

//Функция перехода к предыдущему треку
function loadPreviousTrack() {
  if (trackIndex > 0) {
    trackIndex -= 1;
  } else {
    trackIndex = musicArray.length - 1;
  }
  loadTrack();
}

//Функция загрузки трека
function loadTrack() {
  audio.src = musicArray[trackIndex].src;
  audio.load();
  updateContent();
}

//Обработчик кнопки проигрывания
playPause.addEventListener("click", togglePlayPause);

//Обработчик кнопки перемотки назад
document.querySelector(".backward-btn").addEventListener("click", loadPreviousTrack);

//Обработчик кнопки перемотки вперед
document.querySelector(".forward-btn").addEventListener("click", loadNextTrack);

updateContent();
