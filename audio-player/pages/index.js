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
  {
    src: "../assets/audio/edsheeran.mp3",
    img: "../assets/images/edsheeran.jpg",
    background: "../assets/images/edsheeran.jpg",
    singer: "Ed Sheeran",
    song: "Shape of you",
  },
  {
    src: "../assets/audio/samsmith.mp3",
    img: "../assets/images/samsmith.jpg",
    background: "../assets/images/samsmith.jpg",
    singer: "Sam Smith",
    song: "Stay with me",
  },
];

const playPause = document.querySelector(".play-btn");
const background = document.querySelector("body");
const photo = document.querySelector(".photo");
const singer = document.querySelector(".singer");
const song = document.querySelector(".song");
const progressTimer = document.querySelector(".progress-timer");
const progressSound = document.querySelector(".progress-sound");
const lowButton = document.querySelector(".sound-btn.low");
const highButton = document.querySelector(".sound-btn.high");
const backward = document.querySelector(".backward-btn");
const forward = document.querySelector(".forward-btn");
const time = document.querySelector(".time");
const duration = document.querySelector(".duration");
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

//Функция автоматического включения следующего трека после окончания текущего
function toggleAudioEnd() {
  loadNextTrack();
}

//Функция получения прошедшего времени проигрывания трека
function updateTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  if (sec < 10) {
    return `${min}:0${sec}`;
  } else {
    return `${min}:${sec}`;
  }
}

//Функция обновлеия продолжительности трека
function updateDuration() {
  duration.textContent = updateTime(audio.duration);
}

//Функция обновления времени, прошедшего с начала проигрывания трека
function updateProgressTimer() {
  progressTimer.value = (audio.currentTime / audio.duration) * 100;
  time.textContent = updateTime(audio.currentTime);
  updateProgressTimerBar();
  
}

//Функция обновления прогрессБара прошедшего времени проигрывания
function updateProgressTimerBar() {
  const value = ((progressTimer.value - progressTimer.min) / (progressTimer.max - progressTimer.min)) * 100;
  progressTimer.style.background = `linear-gradient(to right, #ffb749 ${value}%, #ddd ${value}%)`;
}

//Функция обновления прогрессБара звука
function updateProgressSoundBar() {
  const value = ((progressSound.value - progressSound.min) / (progressSound.max - progressSound.min)) * 100;
  progressSound.style.background = `linear-gradient(to right, #ffb749 ${value}%, #ddd ${value}%)`;
}

//Функция обновления прогрессБара звука при нажатии на кнопки мин и макс звука
function toggleSoundButton(event) {
  const button = event.target.closest("button");
  if (button.classList.contains("low")) {
    progressSound.value = 0;
  } else if (button.classList.contains("high")) {
    progressSound.value = 100;
  }
  audio.volume = progressSound.value / 100;
  updateProgressSoundBar();
}

//Функция обновления продолжительности трека, сброс прогресс-бара и начало воспроизведение трека
function updateMetaData() {
  progressTimer.value = 0;
  updateDuration();
  updateProgressTimerBar(); 
  updateProgressSoundBar();
  updateContent();
  if (isPlaying) {
    audio.play();
  }
}

//Обработчик для обновления контента, продолжительности трека и прогресс-баров при загрузке
audio.addEventListener("loadedmetadata", updateMetaData);

//Обработчик для обновления прогресс-бара при изменении времени, прошедшего с начала аудио
audio.addEventListener("timeupdate", updateProgressTimer);

//Обработчик для отслеживания нажатия на кнопку проигрывания
playPause.addEventListener("click", togglePlayPause);

//Обработчик для отслеживания нажатия на кнопку мин звука
lowButton.addEventListener("click", toggleSoundButton);

//Обработчик для отслеживания нажатия на кнопку макс звука
highButton.addEventListener("click", toggleSoundButton);

//Обработчик для отслеживания нажатия на кнопку перемотки назад
backward.addEventListener("click", loadPreviousTrack);

//Обработчик для отслеживания нажатия на кнопку перемотки вперед
forward.addEventListener("click", loadNextTrack);

//Обработчик для установки положения ползунка продолжительности трека
progressTimer.addEventListener("input", function () {
  audio.currentTime = (progressTimer.value / 100) * audio.duration;
  updateProgressTimerBar();
});

//Обработчик для установки положения ползунка звука
progressSound.addEventListener("input", function () {
  audio.volume = progressSound.value / 100;
  updateProgressSoundBar();
});
