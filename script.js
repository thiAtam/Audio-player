const nowPlay = document.querySelector('.now-playing');
const trackArt = document.querySelector('.track-art');
const trackName = document.querySelector('.track-name');
const trackArtist = document.querySelector('.track-artist');

const playButton = document.querySelector('.playpause-track');
const nextButton = document.querySelector('.next-track');
const prevButton = document.querySelector('.prev-track');

const seekSlider = document.querySelector('.seek-slider');
const volumeSlider = document.querySelector('.volume-slider');
const currentTime = document.querySelector('current-time');
const totalDuration = document.querySelector('.total-duration');
const wave = document.getElementById('wave');
const randomIcon = document.querySelector('.random');
const imgButton = document.querySelector('.play')

const currentTrack = document.createElement('audio');

let indexTrack = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const musicList = [
    {
        img : 'image/stay.png',
        name : 'Stay',
        artist : 'The Kid LAROI, Justin Bieber',
        music : 'music/stay.mp3'
    },
    {
        img : 'image/fallingdown.jpg',
        name : 'Falling Down',
        artist : 'Wid Cards',
        music : 'music/fallingdown.mp3'
    },
    {
        img : 'image/faded.png',
        name : 'Faded',
        artist : 'Alan Walker',
        music : 'music/Faded.mp3'
    },
    {
        img : 'image/ratherbe.jpg',
        name : 'Rather Be',
        artist : 'Clean Bandit',
        music : 'music/Rather Be.mp3'
    }
];

function loadTracks() {
    clearInterval(updateTimer)
    reset();

    currentTrack.src = musicList[indexTrack].music;
    currentTrack.load();

    trackArt.style.backgroundImage = 'url('+ musicList[indexTrack] +')';
    trackName.textContent = musicList[indexTrack].name;
    trackArtist.textContent = musicList[indexTrack].artist;
    nowPlay.textContent = 'Playing music'+ [indexTrack + 1] + "of" + musicList.length;
    updateTimer = setInterval(setUpdate, 2000);

    currentTrack.addEventListener('ended', nextTrack);
    randomBgColor()
}

function randomBgColor() {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a) {
        for (let i = 0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y
        }
        return a
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    let angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}

function reset() {
    currentTime.textContent = '00:00';
    totalDuration.textContent = '00:00';
    seekSlider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('random-active');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('random-active');
}

function repeatTrack() {
    let currIndex = indexTrack;
    loadTracks(currIndex);
    playTrack();
}

function playPauseTrack () {
    isPlaying ? pauseTrack() : playTrack ();
}

function playTrack () {
    currentTrack.play();
    isPlaying = true;
    trackArt.classList.add('rotate');
    wave.classList.add('loader');
    play.classList.toggle('active')
}

playButton.addEventListener('click', playTrack)