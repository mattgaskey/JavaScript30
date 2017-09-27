function playSound(event) {
	const key = event.which || event.keyCode;
	const beat = document.querySelectorAll(`[data-key="${key}"`);
	if (beat.length > 0) {
		event.preventDefault();
		const audio = new Audio(beat[1].src);
		audio.play();
		beat[0].classList.add('playing');
	}
}

function removeTransition(e) {
	if (e.propertyName !== 'transform') return;
	this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);
