const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const volumeButton = player.querySelector('.player__volume');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.player__fullscreen');

function togglePlay() {
	video.paused ? video.play() : video.pause();
}

function updateButton() {
	const icon = this.paused ? `&#9658;` : `&#9613;&#9613;`;
	toggle.innerHTML = icon;
}

function skip(val) {
	const change = parseFloat(val) || parseFloat(this.dataset.skip);
	video.currentTime += change;
}

function handleRangeUpate() {
	video[this.name] = this.value;
	if (this.name === 'volume') {
		prevVolume = this.value;
		if (video.volume === 0) {
			volumeStatus = false;
		} else {
			volumeStatus = true;
		}
		volumeHTML = `<img src="${volumeStatus ? volumeOn : volumeOff}" alt='Change Volume'>`;
		volumeButton.innerHTML = volumeHTML;
	}
}

function handleProgress() {
	const percent = video.currentTime / video.duration * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubPercent = e.offsetX / player.offsetWidth;
	video.currentTime = parseFloat(video.duration * scrubPercent);
}

function fullscreenMode() {
	video.webkitRequestFullscreen() || 
	video.mozRequestFullScreen() ||
	video.msRequestFullscreen();
}

function mute() {
	volumeStatus ? video.volume = 0 : video.volume = prevVolume;
	volumeStatus ? ranges[0].value = 0 : ranges[0].value = prevVolume;
	volumeStatus = !volumeStatus;
	
	checkVolume();
}

function checkVolume() {
	let volumeHTML = `<img src="${volumeStatus ? volumeOn : volumeOff}" alt='Change Volume'>`;
	volumeButton.innerHTML = volumeHTML;
	ranges[0].value = video.volume;
}

document.onkeydown = function(e) {
	switch (e.keyCode) {
		case 32: {
			e.preventDefault();
			togglePlay();
		}
			break;
		case 37: skip(-10);
			break;
		case 39: skip(25);
			break;
		case 38: {
			e.preventDefault();
			if (video.volume < 1) {
				let val = (video.volume + 0.05).toFixed(2);
				video.volume = val;
				prevVolume = val;
				ranges[0].value = val;
			}
			if (video.volume > 0) {
				volumeStatus = true;
				checkVolume();
			}
			break;
		}
		case 40: {
			e.preventDefault();
			if (video.volume > 0) {
				let val = (video.volume - 0.05).toFixed(2);
				video.volume = val;
				prevVolume = val;
				ranges[0].value = val;
			}
			if (video.volume === 0) {
				volumeStatus = false;
				checkVolume();
			}
			break;
		} 
	}
}

document.onwebkitfullscreenchange = function(e) {
	if (video.volume === 0 && prevVolume > 0) {
		volumeStatus = false;
	} else if (video.volume > 0 && prevVolume === 0) {
		volumeStatus = true;
	}
	checkVolume();
	console.log('I checked');
}

const videoSrc = /STRING/; //paste filename here
video.src = videoSrc;

const volumeOn = 'volume-on.png';
const volumeOff = 'volume-off.png';
let volumeStatus = true;
let prevVolume = video.volume;

checkVolume();

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpate));

let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
fullscreen.addEventListener('click', fullscreenMode);

volumeButton.addEventListener('click', mute);







