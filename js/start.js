// slider
const pickSymSlider = document.querySelector('.pick-sym-slider');

let sliderOnX = true;

const xSym = document.querySelector('#x-sym');
const oSym = document.querySelector('#o-sym');

xSym.onclick = () => {
	sliderOnX = true;
	checkSlider();
};
oSym.onclick = () => {
	sliderOnX = false;
	checkSlider();
};
//make it not toggle
function checkSlider() {
	if (sliderOnX) {
		pickSymSlider.style.setProperty('--slider-position', '0');
		oSym.style.color = '#a8bfc9';
		xSym.style.color = '#11242e';
	}
	if (!sliderOnX) {
		pickSymSlider.style.setProperty('--slider-position', '50%');
		xSym.style.color = '#a8bfc9';
		oSym.style.color = '#11242e';
	}
}

//init game
const newCpuGame = document.querySelector('.new-game-cpu');
newCpuGame.onclick = () => initCpuGame();
function initCpuGame() {
	let pOneTeam;
	let pTwoTeam;
	sliderOnX ? (pOneTeam = 'x') : (pOneTeam = 'o');
	sliderOnX ? (pTwoTeam = 'o') : (pTwoTeam = 'x');

	let Op = 'cpu';
	let game = {
		pOneTeam: pOneTeam,
		pTwoTeam: pTwoTeam,
		pTwo: Op,
	};
	window.localStorage.setItem('gameConfig', JSON.stringify(game));
	window.location = '../index.html';
}
