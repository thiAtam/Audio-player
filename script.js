const nowPlay = document.querySelector('.now-playing');
const trackArt = document.querySelector('.track-art');
const trackName = document.querySelector('.track-name');
const trackArtist = document.querySelector('.track-artist');

const playButton = document.querySelector('.playpause-track');
const nextButton = document.querySelector('.next-track');
const prevButton = document.querySelector('.prev-track');

const seekSlider = document.querySelector('.seek_slider');
const volumeSlider = document.querySelector('.volume_slider');
const currentTime = document.querySelector('.current-time');
const totalDuration = document.querySelector('.total-duration');
const wave = document.getElementById('wave');
const randomIcon = document.querySelector('.random');
const imgButton = document.querySelector('.play');
const testButton = document.querySelector('.stop');
const testWaves = document.querySelectorAll('.stroke')

const currentTrack = document.createElement('audio');

let indexTrack = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const musicList = [
    {
        img : './image/stay.png',
        name : 'Stay',
        artist : 'The Kid LAROI, Justin Bieber',
        music : './audio/music_stay.mp3'
    },
    {
        img : './image/fallingdown.jpg',
        name : 'Falling Down',
        artist : 'Wid Cards',
        music : './audio/music_fallingdown.mp3'
    },
    {
        img : './image/faded.png',
        name : 'Faded',
        artist : 'Alan Walker',
        music : './audio/music_Faded.mp3'
    },
    {
        img : './image/ratherbe.jpg',
        name : 'Rather Be',
        artist : 'Clean Bandit',
        music : './audio/music_Rather Be.mp3'
    }
];

nowPlay.textContent = 'Playing music '+ musicList[indexTrack].name + " of " + musicList[indexTrack].artist;
function loadTracks() {
    clearInterval(updateTimer)
    reset();

    currentTrack.src = musicList[indexTrack].music;
    currentTrack.load();

    trackArt.style.backgroundImage = "url(" + musicList[indexTrack].img + ")";
    trackName.textContent = musicList[indexTrack].name;
    trackArtist.textContent = musicList[indexTrack].artist;
    nowPlay.textContent = 'Playing music '+ musicList[indexTrack].name + " of " + musicList[indexTrack].artist;
    updateTimer = setInterval(setUpdate, 1000);

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
   let i = isPlaying ? playTrack : pauseTrack;
   return i
}

function playTrack () {
     isPlaying = true;
    currentTrack.play();
    currentTrack.currentTime = 0;
    trackArt.classList.add('rotate');
    wave.classList.add('stroke');
    testButton.classList.toggle('active');
    imgButton.classList.toggle('hidden');
    loadTracks();
    }

function pauseTrack() {
    if(isPlaying == false) {
        currentTrack.pause();
        isPlaying = false;
    }
    trackArt.classList.remove('rotate');
    wave.classList.remove('stroke');
    testButton.classList.remove('active');
    imgButton.classList.remove('hidden'); 
}


function nextTrack() {
    if(indexTrack < musicList.length - 1 && isRandom == false) {
        indexTrack += 1; 
    }
    else if(indexTrack < musicList.length - 1 && isRandom == true) {
        let randomIndex = Number.parseInt(Math.random() * musicList.length);
        indexTrack = randomIndex;
    } else {
        indexTrack = 0;
    }
    loadTracks(indexTrack);
    playTrack();
}

function prevTrack() {
    if(indexTrack > 0) {
        indexTrack -= 1;
    } else {
        indexTrack = musicList.length - 1;
    }
    loadTracks(indexTrack);
    playTrack();
}

function seekToo () {
    let seekToo = currentTime.duration * (seekSlider.value / 100);
    currentTrack.currentTime = seekToo;
}

function setVolume() {
    currentTrack.volume = volumeSlider.value / 100;
}

function setUpdate() {
    let seekPosition = 0;
    if(!isNaN(currentTrack.duration)){
        seekPosition = currentTrack.currentTime * (100 / currentTrack.duration)
        seekSlider.value = seekPosition;
    }
    let currentMinutes = Math.floor(currentTrack.currentTime / 60);
    let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currentTrack.duration / 60);
    let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);

    if(currentSeconds < 10) {
        currentSeconds = '0' + currentSeconds
    }
    if(durationSeconds < 10) {
        durationSeconds = '0' + durationSeconds;
    };
    if(currentMinutes < 10) {
        currentMinutes = '0' + currentMinutes;
    };
    if(durationMinutes < 10) {
        durationMinutes = '0' + durationMinutes;
    }

    currentTime.textContent = currentMinutes + ':' + currentSeconds;
    totalDuration.textContent = durationMinutes + ':' + durationSeconds;
}
playButton.addEventListener('click', playTrack)
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);
//currentTrack.addEventListener('ended', nextTrack);
randomBgColor();