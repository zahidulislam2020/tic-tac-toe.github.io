const board = document.querySelector(".grid-container");
const blocks = document.querySelectorAll(".grid-item");
const message = document.querySelector(".message");
const anouncement = document.querySelector(".anouncement");
const greeting = document.querySelector(".greeting");

const blocksArray = Array.from(blocks);

let isItFirstClick = true;
let stepCount = 0;
let winningPossition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let [a1, a2, a3, b1, b2, b3, c1, c2] = winningPossition;

//history should be used later on

let history = [];

const actionToClick = (e, i) => {
  let block = e.target;
  let index = blocksArray.indexOf(block);
  turnOfXOrO(block);
  recordOfEachStep(block, index);
};

//Defining X and O alternately after each click

function turnOfXOrO(block) {
  if (isItFirstClick) {
    block.innerHTML = "X";
    isItFirstClick = false;
  } else {
    block.innerHTML = "O";
    isItFirstClick = true;
  }
  block.style.pointerEvents = "none";
}

function messageFunc(player) {
  if (player === 'tied') {
    board.style.pointerEvents = "none";
    anouncement.innerHTML = `The game is ${player}!`;
    greeting.innerHTML = 'Try again!'
    message.style.animationPlayState = "running";
  } else {
    board.style.pointerEvents = "none";
    anouncement.innerHTML = `Player ${player} won the game!`;
    message.style.animationPlayState = "running";
  }
}

//Creating wining point to compare

let winingPoint = [[], [], [], [], [], [], [], []];

function recordOfEachStep(block, index) {
  //history[index] = block.innerHTML;
  if (a1.includes(index)) {
    winingPoint[0] += block.innerHTML;
  }
  if (a2.includes(index)) {
    winingPoint[1] += block.innerHTML;
  }
  if (a3.includes(index)) {
    winingPoint[2] += block.innerHTML;
  }
  if (b1.includes(index)) {
    winingPoint[3] += block.innerHTML;
  }
  if (b2.includes(index)) {
    winingPoint[4] += block.innerHTML;
  }
  if (b3.includes(index)) {
    winingPoint[5] += block.innerHTML;
  }
  if (c1.includes(index)) {
    winingPoint[6] += block.innerHTML;
  }
  if (c2.includes(index)) {
    winingPoint[7] += block.innerHTML;
  }

  if (winingPoint[0] === "XXX" || winingPoint[0] === "OOO") {
    messageFunc(winingPoint[0][0]);
  } else if (winingPoint[1] === "XXX" || winingPoint[1] === "OOO") {
    messageFunc(winingPoint[1][0]);
  } else if (winingPoint[2] === "XXX" || winingPoint[2] === "OOO") {
    messageFunc(winingPoint[2][0]);
  } else if (winingPoint[3] === "XXX" || winingPoint[3] === "OOO") {
    messageFunc(winingPoint[3][0]);
  } else if (winingPoint[4] === "XXX" || winingPoint[4] === "OOO") {
    messageFunc(winingPoint[4][0]);
  } else if (winingPoint[5] === "XXX" || winingPoint[5] === "OOO") {
    messageFunc(winingPoint[5][0]);
  } else if (winingPoint[6] === "XXX" || winingPoint[6] === "OOO") {
    messageFunc(winingPoint[6][0]);
  } else if (winingPoint[7] === "XXX" || winingPoint[7] === "OOO") {
    messageFunc(winingPoint[7][0]);
  } else {
    stepCount++
    if(stepCount === 9)
    messageFunc("tied");
  }
}

blocksArray.map((block, i) =>
  block.addEventListener("click", (e) => actionToClick(e, i))
);
