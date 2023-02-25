//prettier-ignore
let spaces = [
    1, 2, 3, 
    4, 5, 6, 
    7, 8, 9
];
let curTurn = 'x';
//TODO: make the start page index.html for hosting purposes later
let playerOneSym = `<i class="fa-solid fa-x x-color"></i>`;
let playerTwoSym = `	<i class="fa-solid fa-o o-color"></i>`;
let tieSym = `	<i class="fa-solid fa-minus tie-color"></i>`;

const spaceEles = document.querySelectorAll('.game-space');

let gamePlaying = true;

gameConfig = JSON.parse(localStorage.getItem('gameConfig'));

//pOne wins ties, pTwo Wins
let scores = [0, 0, 0];

//front end eles changing
const turnContainer = document.querySelector('.turn-container');

function initConfig() {
	gamePlaying = true;
	curTurn = 'x';
	if (gameConfig.pOneTeam == 'o') {
		playerOneSym = `<i class="fa-solid fa-o o-color"></i>`;
		playerTwoSym = `	<i class="fa-solid fa-x x-color"></i>`;
		if ((gameConfig.pTwo = 'cpu')) {
			console.log('here');
			initCpu();
			curTurn = 'o';
		}
	} else {
		playerOneSym = `<i class="fa-solid fa-x x-color"></i>`;
		playerTwoSym = `<i class="fa-solid fa-o o-color"></i>`;
	}
}
initConfig();

//TODO: Make all spaces taken function check if all spaces are taken, and if so run a win
//then refactor code to check if all spaces taken, after checking win everytime
//init the cpu, to run on its turn
function initCpu() {
	if (!gamePlaying) return;

	console.log('placing item');
	let space = getRandomInt(0, 8);
	if (spaceIsEmpty(space) == false) {
		initCpu();
		return;
	}
	if (spaceIsEmpty(space)) {
		setTimeout(function () {
			spaceEles[space].innerHTML = playerTwoSym;
			spaces[space] = gameConfig.pTwoTeam;

			turnContainer.innerHTML = `
			<p>
				${playerOneSym}
				TURN
			</p>
					`;
			checkWin();
			curTurn = gameConfig.pOneTeam;
		}, 500);
	}
}

for (let i = 0; i < spaceEles.length; i++) {
	spaceEles[i].onclick = () => spaceSelected(i);
}

function initScoreBoard() {
	if (gameConfig.pOneTeam === 'x') {
	}
}
//update current turn
function spaceSelected(space) {
	if (!gamePlaying) return;
	if (curTurn == gameConfig.pOneTeam && spaceIsEmpty(space)) {
		curTurn = gameConfig.pTwoTeam;
		spaceEles[space].innerHTML = playerOneSym;
		spaces[space] = gameConfig.pOneTeam;

		turnContainer.innerHTML = `
			<p>
				${playerTwoSym}
				TURN
			</p>
					`;
		checkWin();

		if (gameConfig.pTwo == 'cpu') initCpu();
	} else if (
		spaceIsEmpty(space) == true &&
		curTurn == gameConfig.pTwoTeam &&
		gameConfig.pTwo != 'cpu'
	) {
		spaceEles[space].innerHTML = playerTwoSym;
		spaces[space] = gameConfig.pTwoTeam;
		checkWin();
	}
}

function checkWin() {
	for (let i = 0; i < spaces.length; i++) {
		const horiStartSpaces = [0, 3, 6];
		const vertStartSpaces = [0, 1, 2];

		//starting from the first chance of horizontal spacing
		//it checks if you have 3 in a line
		if (horiStartSpaces.includes(i)) {
			if (
				spaces[i] === spaces[i + 1] &&
				spaces[i + 1] === spaces[i + 2]
			) {
				if (spaces[i] == gameConfig.pOneTeam)
					initWinScreen(playerOneSym, gameConfig.pOneTeam);
				else if (spaces[i] == gameConfig.pTwoTeam) {
					initWinScreen(playerTwoSym, gameConfig.pTwoTeam);
				}
			}
		} else if (vertStartSpaces.includes(i)) {
			if (
				spaces[i] === spaces[i + 3] &&
				spaces[i + 3] === spaces[i + 6]
			) {
				if (spaces[i] == gameConfig.pOneTeam)
					initWinScreen(playerOneSym, gameConfig.pOneTeam);
				else if (spaces[i] == gameConfig.pTwoTeam)
					initWinScreen(playerTwoSym, gameConfig.pTwoTeam);
			}
			//when its at 1
		}
		if (i === 0) {
			if (
				spaces[i] === spaces[i + 4] &&
				spaces[i + 4] === spaces[i + 8]
			) {
				if (spaces[i] == gameConfig.pOneTeam)
					initWinScreen(playerOneSym, gameConfig.pOneTeam);
				else if (spaces[i] == gameConfig.pTwoTeam)
					initWinScreen(playerTwoSym, gameConfig.pTwoTeam);
			}
		}
		if (i === 2) {
			if (
				spaces[i] === spaces[i + 2] &&
				spaces[i + 2] === spaces[i + 4]
			) {
				if (spaces[i] == gameConfig.pOneTeam)
					initWinScreen(playerOneSym, gameConfig.pOneTeam);
				else if (spaces[i] == gameConfig.pTwoTeam)
					initWinScreen(playerTwoSym, gameConfig.pTwoTeam);
			}
		}
	}
	if (gamePlaying === true) allSpacesTaken();
}
const winEle = {
	container: document.querySelector('.win-container'),
	title: document.querySelector('.win-container h2'),
	nextRound: document.querySelector('.next-round-button'),
};
const winContainer = document.querySelector('.win-container');
function initWinScreen(winnerSym, team) {
	gamePlaying = false;
	const lTeam = team == 'x' ? 'o' : 'x';
	winContainer.style.display = 'flex';
	winEle.title.innerHTML = ` 
		<h2 class="${team}-color">
			${winnerSym}
			TAKES THE ROUND
		</h2>
	`;
	winEle.nextRound.classList.add(`${lTeam}-background`);
	if (team === 'cpu') {
		scores[1]++;
		updateScore(scores);
		return;
	}
	team == gameConfig.pOneTeam ? scores[0]++ : scores[2]++;
	updateScore(scores);
}
const currentScoreEle = document.querySelectorAll('.current-score');
function initScore() {
	const scoreContainer = document.querySelectorAll('.score-container');
	const teamEle = document.querySelectorAll('.score-container > p');
	console.log(gameConfig);
	scoreContainer[0].setAttribute('data-team', gameConfig.pOneTeam);
	scoreContainer[2].setAttribute('data-team', gameConfig.pTwoTeam);

	teamEle[0].innerHTML = `
		<i class="fa-solid fa-${gameConfig.pOneTeam}"></i>
		(YOU)
	`;
	teamEle[4].innerHTML = `
		<i class="fa-solid fa-${gameConfig.pTwoTeam}"></i>
		(${gameConfig.pTwo})
	`;
}
initScore();
function updateScore(scores) {
	for (let i = 0; i < currentScoreEle.length; i++) {
		currentScoreEle[i].innerHTML = `${scores[i]}`;
	}
}
//takes in a space index, if the array value is a number then the bool is true
function spaceIsEmpty(space) {
	if (spaces[space] == 'x' || spaces[space] == 'o') return false;
	return true;
}
function allSpacesTaken() {
	let takenSpaces = spaces.filter(function (space) {
		return space == 'x' || space == 'o';
	});
	if (takenSpaces.length === spaces.length) {
		initWinScreen(tieSym, 'tie');
	}
}
function getRandomInt(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}
//starting a new round

function clearGame() {
	spaces = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	for (let i = 0; i < spaceEles.length; i++) {
		spaceEles[i].innerHTML = '';
	}
}
const nextRoundButton = document.querySelector('.next-round-button');
nextRoundButton.onclick = () => startNextRound();

function startNextRound() {
	clearGame();
	winContainer.style.display = 'none';
	initConfig();
	gamePlaying = true;
}
