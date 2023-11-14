
const colorText = document.querySelector('color-text')
const body = document.querySelector('body')
const playBtn = document.getElementById("play");
const previous = document.getElementById("previous");
const forward = document.getElementById("forward");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const container = document.querySelector(".container");
const musicVoice = document.getElementById("music-voice");
const volume = document.getElementById("volume");
const playIcon = document.getElementById("playIcon");
const progress = document.getElementById("progress");
const innerProgres = document.getElementById("inner-progress");


audio.volume = 0.5;

const musics = [
  "O urek menim",
  "Eminem - Mockingbird",
  "Eminem - Lose Yourself",
  "Bolalar - Kel Yashaylik Biz Birga",
  "Xcho - Ты и Я",
];

let currentMusicIndex = 0;

const currentMusic = (index) => {
  audio.src = `../music/${musics[index]}.mp3`;
  cover.src = `../images/${musics[index]}.jpg`;
  title.textContent = musics[index];
};

currentMusic(currentMusicIndex);

playBtn.addEventListener("click", () => {
  if (container.classList.contains("play")) {
    pauseMusic();
  } else {
    playMusic();
  }
  loder()
});

forward.addEventListener("click", () => {
  forwardSong();
  playMusic();
  loder()
});

previous.addEventListener("click", () => {
  if (currentMusicIndex > 0) {
    currentMusicIndex--;
  } else {
    currentMusicIndex = musics.length - 1;
  }
  currentMusic(currentMusicIndex);
  playMusic();
  loder()
});

// play song
function playMusic() {
  audio.play();
  playIcon.setAttribute("class", "fa-solid fa-pause");
  container.classList.add("play");
}

// pause song
function pauseMusic() {
  audio.pause();
  container.classList.remove("play");
  playIcon.setAttribute("class", "fa-solid fa-play");
  container.classList.remove("play");
}

// forward song
function forwardSong() {
  if (currentMusicIndex < musics.length - 1) {
    currentMusicIndex++;
  } else {
    currentMusicIndex = 0;
    console.log(currentMusicIndex);
  }
  currentMusic(currentMusicIndex);
  playMusic();
}

musicVoice.addEventListener("input", (e) => {
  audio.volume = musicVoice.value / 10;
});

function updateProgres(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  innerProgres.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const widht = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / widht) * duration;
}

progress.addEventListener("click", setProgress);

audio.addEventListener("timeupdate", updateProgres);

audio.addEventListener("ended", (e) => {
  forwardSong();
});




// rendom color funcrion
function loder() {
  const values = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
  ]
  const mixer = () => {
    let adder = ''
    for (let i = 0; i < 6; i++) {
      let random = Math.round(Math.random() * 15)
      let valueRandom = values[random]
      adder += valueRandom
    }
    return adder
  }

  const mixer1 = mixer()
  const mixer2 = mixer()
  const randomDeg = Math.floor(Math.random() * 360)
  const linearGrad = `linear-gradient(${randomDeg}deg, #${mixer1} , #${mixer2})`

  body.style.background = linearGrad
}

loder()