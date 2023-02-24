//prettier-ignore
const spaces = [
    1, 2, 3, 
    4, 5, 6, 
    7, 8, 9
];
let curTurn = 'x';
//TODO: make the start page index.html for hosting purposes later
let playerOneSym = `<i class="fa-solid fa-x x-color"></i>`;
let playerTwoSym = `	<i class="fa-solid fa-o o-color"></i>`;
const spaceEles = document.querySelectorAll('.game-space');

let gamePlaying = true;

gameConfig = JSON.parse(localStorage.getItem('gameConfig'));

//front end eles changing
const turnContainer = document.querySelector('.turn-container');

function initConfig() {
	if (gameConfig.pOneTeam == 'o') {
		playerOneSym = `<i class="fa-solid fa-o o-color"></i>`;
		playerTwoSym = `	<i class="fa-solid fa-x x-color"></i>`;
		if ((gameConfig.pTwo = 'cpu')) {
			initCpu();
			curTurn = 'o';
		}
	} else {
		playerOneSym = `<i class="fa-solid fa-x x-color"></i>`;
		playerTwoSym = `<i class="fa-solid fa-o o-color"></i>`;
	}
}
initConfig();

//init the cpu, to run on its turn
function initCpu() {
	let space = getRandomInt(0, 8);
	if (spaceIsEmpty(space) == false && !allSpacesTaken()) {
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
//update current turn
function spaceSelected(space) {
	if (curTurn == gameConfig.pOneTeam && spaceIsEmpty(space)) {
		curTurn = gameConfig.pTwoTeam;
		console.log(curTurn);
		spaceEles[space].innerHTML = playerOneSym;
		spaces[space] = gameConfig.pOneTeam;

		turnContainer.innerHTML = `
			<p>
				${playerTwoSym}
				TURN
			</p>
					`;

		if (gameConfig.pTwo == 'cpu') initCpu();
	} else if (
		spaceIsEmpty(space) == true &&
		curTurn == gameConfig.pTwoTeam &&
		gameConfig.pTwo != 'cpu'
	) {
		spaceEles[space].innerHTML = playerTwoSym;
		spaces[space] = gameConfig.pOneTeam;
	}
	checkWin();
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
}

const winEle = {
	container: document.querySelector('.win-container'),
	title: document.querySelector('.win-container h2'),
	nextRound: document.querySelector('.next-round-button'),
};
const winContainer = document.querySelector('.win-container');
function initWinScreen(winnerSym, team) {
	const lTeam = team == 'x' ? 'o' : 'x';
	winContainer.style.display = 'flex';
	winEle.title.innerHTML = ` 
		<h2 class="${team}-color">
			${winnerSym}
			TAKES THE ROUND
		</h2>
	`;
	winEle.nextRound.classList.add(`${lTeam}-background`);
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
	if (takenSpaces.length === spaces.length) return true;
	else return false;
}
function getRandomInt(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}
