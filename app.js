//Created Date: June 04, 2021

const board = document.querySelector(".grid-container");
const blocks = document.querySelectorAll(".grid-item");
const message = document.querySelector(".message");
const anouncement = document.querySelector(".anouncement");
const greeting = document.querySelector(".greeting");
const overlay = document.querySelector(".overlay-trigger");
const playAgain = document.querySelector(".playAgain");

const blocksArray = Array.from(blocks);

/////////////////////////////////////////////////////////////
// Computer Mode Toggle

const computerModeBtn = document.querySelector(".mode");
let isOn = false;
let stopId;
let stopIdforLight;

// AI on-off switch
computerModeBtn.addEventListener("click", OnOffFunc);
playAgain.addEventListener("click", play_again);

function play_again() {
  location.reload();
}

function OnOffFunc() {
  if (!isOn) {
    computerModeBtn.innerHTML = "ON";
    computerModeBtn.style.color = "green";
    isOn = true;
  } else {
    computerModeBtn.innerHTML = "OFF";
    computerModeBtn.style.color = "goldenrod";
    isOn = false;
  }
}

///////////////////////////////////////////////////////////

let isItFirstClick = true;
let stepCount = 0;
let winingPossition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let [a1, a2, a3, b1, b2, b3, c1, c2] = winingPossition;

//history should be used later on

let historyOfXAndO = [];
let historyOfX = [];
let historyOfO = [];

const actionToClick = (e, i) => {
  let block = e.target;
  let index = blocksArray.indexOf(block);
  turnOfXOrO(block);
  recordOfEachStep(block, index);

  if (isOn) {
    AI_action(block, index);
  }
};

blocksArray.map((block, i) =>
  block.addEventListener("click", (e) => actionToClick(e, i))
);

//Defining X and O alternately after each click

function turnOfXOrO(block) {
  if (isOn) {
    block.innerHTML = "X";
  } else {
    if (isItFirstClick) {
      block.innerHTML = "X";
      isItFirstClick = false;
    } else {
      block.innerHTML = "O";
      block.style.color = "red";
      isItFirstClick = true;
    }
  }

  block.style.pointerEvents = "none";
}

// Message Function

function messageFunc(player) {
  if (player === "tied") {
    board.style.pointerEvents = "none";
    //overlay.classList.add('overlay')
    anouncement.innerHTML = `The game is ${player}!`;
    greeting.innerHTML = "Try again!";
    message.style.animationPlayState = "running";
    clearInterval(stopIdforLight);
    clearTimeout(stopId);
    isOn = false;
  } else {
    board.style.pointerEvents = "none";
    //overlay.classList.add('overlay')
    anouncement.innerHTML = `Player ${player} won the game!`;
    message.style.animationPlayState = "running";
    clearInterval(stopIdforLight);
    clearTimeout(stopId);
    isOn = false;
  }
}

//Creating wining point to compare or creating history to track

let winingPoint = [];

function recordOfEachStep(block, index) {
  //console.log(block, index)
  for (let i = 0; i < winingPossition.length; i++) {
    winingPossition[i].some((el) => {
      if (el == index) {
        winingPoint[i] = winingPossition[i];
        winingPoint[i].splice(
          winingPossition[i].indexOf(el),
          1,
          block.innerHTML
        );
      }
    });
  }
  if (block.innerHTML === "X") {
    winnerX(block, index, winingPoint);
  }
  if (block.innerHTML === "O") {
    winnerO(block, index, winingPoint);
  }
}

// Winner X
let winX;
let countForTie = 0;

function winnerX(block, index, winingPoint) {
  countForTie++;
  for (let i = 0; i < winingPoint.length; i++) {
    if (winingPoint[i]) {
      winX = winingPoint[i].every((el) => {
        return el === "X";
      });
    }
    if (winX === true) {
      countForTie++;
      messageFunc("X");
      break;
    }
  }
  tieGame(countForTie);
}

// Winner O
let winO;

function winnerO(block, index, winingPoint) {
  countForTie++;
  for (let i = 0; i < winingPoint.length; i++) {
    if (winingPoint[i]) {
      winO = winingPoint[i].every((el) => {
        return el === "O";
      });
    }
    if (winO === true) {
      messageFunc("O");
      break;
    }
  }
  tieGame(countForTie);
}

// Game Tie

function tieGame(countForTie) {
  if (countForTie === 9) {
    messageFunc("tied");
  }
}

/////////////////////////////////////////////////////////////////

// AI development

const greenLight = document.querySelector(".blinkingLight");

function AI_action(block, index) {
  let stopId = setTimeout(timeFunc, 3000);
  let stopIdforLight = setInterval(timeFuncForLight, 500);
  let isLightGreen = false;

  function timeFuncForLight() {
    board.style.pointerEvents = "none";
    if (!isLightGreen) {
      greenLight.style.color = "goldenrod";
      isLightGreen = true;
    } else if (isLightGreen) {
      greenLight.style.color = "white";
      isLightGreen = false;
    }
  }

  function timeFunc() {
    clearInterval(stopIdforLight);
    greenLight.style.color = "rgb(248, 236, 204)";
    board.style.pointerEvents = "auto";
    AI_Logic_Func(block, index);
  }
}

let randomActivityArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let countForRandom = false;
let array;
let randomNum;
///////////// Start - Difficulty level-1 for Human /////////////////////
function AI_Logic_Func(block, index) {
  //let history = winingPoint;
  randomActivityArray.splice(index, 1, "X");
  array = randomActivityArray.filter((el) => typeof el !== "string");
  randomNum = Math.floor(Math.random() * array.length);
  if (array.length === 0) {
    clearTimeout(stopId);
    isOn = false;
  } else {
    //Level Up System
    if (true) {
      ///////////// Start - Difficulty level-3 for Human /////////////////////
      ///Steps for Level-3
      if (setps_for__level_2(winingPoint, array, index) || setps_for__level_3(winingPoint, array, index)) {
      } else {
        blocksArray[array[randomNum]].innerHTML = "O";
        blocksArray[array[randomNum]].style.color = "red";
        recordOfEachStep(blocksArray[array[randomNum]], array[randomNum]);
        randomActivityArray.splice(array[randomNum], 1, "O");
        blocksArray[array[randomNum]].style.pointerEvents = "none";
        //console.log('level_1')
        ///////////// Complete - Difficulty level-3 for Human /////////////////////
      }
    }
    if (false) {
      ///////////// Start - Difficulty level-2 for Human /////////////////////
      //setps_for__level_2
      if (!setps_for__level_2(winingPoint, array, randomNum)) {
        blocksArray[array[randomNum]].innerHTML = "O";
        blocksArray[array[randomNum]].style.color = "red";
        recordOfEachStep(blocksArray[array[randomNum]], array[randomNum]);
        randomActivityArray.splice(array[randomNum], 1, "O");
        blocksArray[array[randomNum]].style.pointerEvents = "none";
        ///////////// Complete - Difficulty level-2 for Human /////////////////////
      }
    }
    if (false) {
      ///////////// Start - Difficulty level-1 for Human /////////////////////
      blocksArray[array[randomNum]].innerHTML = "O";
      blocksArray[array[randomNum]].style.color = "red";
      recordOfEachStep(blocksArray[array[randomNum]], array[randomNum]);
      blocksArray[array[randomNum]].style.pointerEvents = "none";
      randomActivityArray.splice(array[randomNum], 1, "O");
      ///////////// Complete - Difficulty level-1 for Human /////////////////////
    }
  }
}

// Steps for Level-2
function setps_for__level_2(winingPoint, array, randomNum) {
  let history = winingPoint.sort(function (a, b) {
    if (a.includes("O")) {
      return -1;
    } else if (b.includes("O")) {
      return 0;
    }
  });

  for (let i = 0; i < history.length; i++) {
    if (history[i]) {
      let checkLen = history[i].filter((el) => typeof el === "number").length;
      if (checkLen === 1) {
        if (history[i].includes("O") && !history[i].includes("X")) {
          let index = history[i].filter((e) => typeof e === "number");
          blocksArray[+index].innerHTML = "O";
          blocksArray[+index].style.color = "red";
          recordOfEachStep(blocksArray[+index], +index);
          randomActivityArray.splice(+index, 1, "O");
          blocksArray[+index].style.pointerEvents = "none";
          return true;
        } else if (history[i].includes("X") && !history[i].includes("O")) {
          let index = history[i].filter((e) => typeof e === "number");
          blocksArray[+index].innerHTML = "O";
          blocksArray[+index].style.color = "red";
          recordOfEachStep(blocksArray[+index], +index);
          randomActivityArray.splice(+index, 1, "O");
          blocksArray[+index].style.pointerEvents = "none";
          //console.log('hi')
          return true;
        }
      }
    }
  }
}
/////////////// Steps complete for Level-2 /////////////////////

/////////////// Start - Difficulty level-3 for Human /////////////////////
let flag = 0;
let flag_1 = 0;

function setps_for__level_3(winingPoint, array, index) {
  if (randomActivityArray.indexOf("X") !== 4 && array.includes(4)) {
    blocksArray[4].innerHTML = "O";
    blocksArray[4].style.color = "red";
    recordOfEachStep(blocksArray[4], 4);
    randomActivityArray.splice(4, 1, "O");
    blocksArray[4].style.pointerEvents = "none";
    //console.log('bye_1')
    return true;
  }else if(randomActivityArray.indexOf("X") !== 4 && !array.includes(4)) {
    let newArr = []
    for(let i = 0; i < winingPoint.length; i++) {
      if(winingPoint[i] && winingPoint[i].filter(e => typeof e === 'number').length === 2) {
        newArr = [...newArr, ...winingPoint[i].filter(e => typeof e === 'number')]
        if(newArr.length === 4) {
          let random = Math.floor(Math.random() * newArr.length)
          blocksArray[newArr[random]].innerHTML = "O";
          blocksArray[newArr[random]].style.color = "red";
          recordOfEachStep(blocksArray[newArr[random]], newArr[random]);
          randomActivityArray.splice(newArr[random], 1, "O");
          blocksArray[newArr[random]].style.pointerEvents = "none";
          //console.log('wow_1')
          return true
        }
        //console.log(newArr)
        
      }
    }
    //let arr = [0, 2, 6, 8];
    let arr = [1, 3, 5, 7];
    let filteredArr = []

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] === array[i]) {
          filteredArr.push(arr[j]);
        }
      }
    }
    let randNum = Math.floor(Math.random() * filteredArr.length);
      blocksArray[filteredArr[randNum]].innerHTML = "O";
      blocksArray[filteredArr[randNum]].style.color = "red";
      recordOfEachStep(blocksArray[filteredArr[randNum]], filteredArr[randNum]);
      randomActivityArray.splice(filteredArr[randNum], 1, "O");
      blocksArray[filteredArr[randNum]].style.pointerEvents = "none";
      //console.log('wow')
      return true
  }
  if (randomActivityArray.indexOf("X") === 4 &&
    !array.includes(4)
  ) {
    //let arr = [1, 3, 5, 7];
    let arr = [0, 2, 6, 8];
    let filteredArr = []

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] === array[i]) {
          filteredArr.push(arr[j]);
        }
      }
    }
    let randNum = Math.floor(Math.random() * filteredArr.length);
    //if(!setps_for__level_2(winingPoint, array, randomNum)) {
      blocksArray[filteredArr[randNum]].innerHTML = "O";
      blocksArray[filteredArr[randNum]].style.color = "red";
      recordOfEachStep(blocksArray[filteredArr[randNum]], filteredArr[randNum]);
      randomActivityArray.splice(filteredArr[randNum], 1, "O");
      blocksArray[filteredArr[randNum]].style.pointerEvents = "none";
      //console.log('bye')
      return true;
    //}
  }
  //return true
}

/////////////// Complete - Difficulty level-3 for Human /////////////////////
