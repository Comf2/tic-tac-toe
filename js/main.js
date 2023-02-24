//prettier-ignore
const spaces = [
    1, 2, 3, 
    4, 5, 6, 
    7, 8, 9
];

const playerSym = `	<i class="fa-solid fa-x x-color"></i>`;
const spaceEles = document.querySelectorAll('.game-space');

for (let i = 0; i < spaceEles.length; i++) {
	spaceEles[i].onclick = () => spaceSelected(i);
}

function spaceSelected(space) {
	spaceEles[space].innerHTML = playerSym;
}
