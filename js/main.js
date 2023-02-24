//prettier-ignore
const spaces = [
    1, 2, 3, 
    4, 5, 6, 
    7, 8, 9
];
let curTurn = 'x';
//TODO: make the start page index.html for hosting purposes later
let playerOneSym = `	<i class="fa-solid fa-x x-color"></i>`;
let playerTwoSym = `	<i class="fa-solid fa-o o-color"></i>`;
const spaceEles = document.querySelectorAll('.game-space');

gameConfig = JSON.parse(localStorage.getItem('gameConfig'));
function initConfig() {
	if (gameConfig.pOneTeam == 'o') {
		playerOneSym = `	<i class="fa-solid fa-o o-color"></i>`;
		if ((gameConfig.pTwo = 'cpu')) initCpu();
		playerTwoSym = `	<i class="fa-solid fa-x x-color"></i>`;
	} else {
		playerOneSym = `<i class="fa-solid fa-x x-color"></i>`;
		playerTwoSym = `<i class="fa-solid fa-o o-color"></i>`;
	}
}
initConfig();

//init the cpu, to run on its turn
function initCpu() {
	let space = getRandomInt(0, 8);
	if (spaceIsEmpty(space) == false && allSpacesTaken()) {
		initCpu();
		return;
	}

	spaceEles[space].innerHTML = playerTwoSym;
	spaces[space] = gameConfig.pTwoTeam;
	console.log(spaces);
}

for (let i = 0; i < spaceEles.length; i++) {
	spaceEles[i].onclick = () => spaceSelected(i);
}

function spaceSelected(space) {
	if (curTurn == gameConfig.pOneTeam && spaceIsEmpty(space) == true) {
		spaceEles[space].innerHTML = playerOneSym;
		spaces[space] = gameConfig.pOneTeam;

		if ((gameConfig.pTwo = 'cpu')) initCpu();
	} else if (spaceIsEmpty(space) == true) {
		spaceEles[space].innerHTML = playerTwoSym;
		spaces[space] = gameConfig.pOneTeam;
	}
}

//takes in a space index, if the array value is a number then the bool is true
function spaceIsEmpty(space) {
	if (spaces[space] == 'x' || spaces[space] == 'o') return false;
	return true;
}
function allSpacesTaken() {
	spaces.forEach((space) => {
		if (space === 'x' || space === 'o') {
		}
	});
}
function getRandomInt(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}
