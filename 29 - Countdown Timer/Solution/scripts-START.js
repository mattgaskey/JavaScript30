//we need this to clear the interval when the timer reaches zero
let countdown;
//flag to prevent multiple countdowns
let countdownInProgress = false;
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const timerButtons = document.querySelectorAll('.timer__button');
const timerForm = document.querySelector('#custom');
const resetButton = document.querySelector('.timer__reset');

function timer(seconds) {
	//trigger the flag
	countdownInProgress = true;
	//get the current time in ms
	const now = Date.now();
	//set the end time in ms
	const then = now + seconds * 1000;
	displayEndTime(new Date(then));
	//display the coutndown time since setInterval only runs after the first second has elapsed
	displayTimeLeft(seconds);
	//start the interval
	countdown = setInterval(() => {
		//define the amount of time left by taking the end time and removing the current time every second
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		//check when the countdown reaches zero (and check for signed zero -- STUPID JS!)
		if (secondsLeft < 0 || secondsLeft === -0) {
			resetTimer();
		}
		//display the remaining time
		displayTimeLeft(secondsLeft);
	}, 1000);
}

//convert remaining time from the interval function into minutes:seconds and display it
function displayTimeLeft(seconds) {
	//calc the minutes from seconds
	const minutes = Math.floor(seconds / 60);
	//calc the remainder of seconds
	const secondsRemaining = seconds % 60;
	//update the text with minutes and seconds using placeholder zeroes for MM:SS format
	timeLeft.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining}`;
}

function displayEndTime(seconds) {
	//get the hour for end time
	const hours = seconds.getHours();
	//get the minutes for end time
	const mins = seconds.getMinutes();
	//update the text with end time, adjusting for 12-hour time and placeholder zeroes for HH:MM format
	endTime.textContent = `Ends at ${hours > 12 ? hours - 12 : hours}:${mins < 10 ? '0' + mins : mins}`;
}

function resetTimer() {
	clearInterval(countdown);
		//display '00:00' at the end
		displayTimeLeft(0);
		//revert the flag
		countdownInProgress = false;
		//stop the function from running
		endTime.textContent = '';
		return;
}

timerButtons.forEach(button => button.addEventListener('click', () => {
	//check to see if another countdown clock has been started before triggering the timer function
	if (!countdownInProgress) {
		timer(parseFloat(button.dataset.time));
	}
}));

timerForm.addEventListener('submit', (e) => {
	//prevent submit from refreshing the page
	e.preventDefault();
	//grab the value from the form input and transform to seconds
	const seconds = parseFloat(e.target[0].value * 60);
	//check to see if another timer is in progress
	if (!countdownInProgress) {
		//run the timer
		timer(seconds);
		//reset the form
		e.target.reset();
	}
});

resetButton.addEventListener('click', resetTimer);