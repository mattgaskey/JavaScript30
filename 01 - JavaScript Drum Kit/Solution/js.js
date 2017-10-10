function playSound(event) {
	//cross-browser key event support; event.which is a Firefox-only fix
	const key = event.which || event.keyCode;
	//grab all the keys on the screen
	const beat = document.querySelectorAll(`[data-key="${key}"`);
	//check that the key pressed is one of the available triggers
	if (beat.length > 0) {
		//don't use the default key assignment if any
		event.preventDefault();
		//select the corresponding audio file
		const audio = new Audio(beat[1].src);
		//play it
		audio.play();
		//let the user know they've activated the trigger
		beat[0].classList.add('playing');
	}
}

//sniff out the transitionend event and do this
function removeTransition(e) {
	//make sure we are removing the class only after the transform has ended
	if (e.propertyName !== 'transform') return;
	//remove the class from the trigger
	this.classList.remove('playing');
}

//grab all the triggers
const keys = document.querySelectorAll('.key');
//attach the event handler to remove the playing class after the transform is done
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
//attach the playSound event handler to all keypresses
window.addEventListener('keydown', playSound);
