let targetNumber = Math.floor(Math.random() * 10) + 1;
let guessNumber = 0;

function init() {
	let submitBtn = document.getElementById('submitBtn');
	submitBtn.onclick = function () {
		check(document.getElementById('inputText').value);
		guessNumber++;
	}, false;
}

function check(value) {
	if (value == targetNumber) showWin();
	else if (value != targetNumber && guessNumber >= 5) showLoss();
	else showError();
}

function showWin() {
	console.log("You win.");
}

function showError() {
	console.log("The guess is incorrect.");
}

function showLoss() {
	console.log("You lose.");
}

init();
