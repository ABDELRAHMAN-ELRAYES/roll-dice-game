'use strict';

let playerOneTotalScore = document.querySelector('.player-one-score');
let playerTwoTotalScore = document.querySelector('.player-two-score');
let playerOneCurrentScore = document.querySelector('.player-one-current-score');
let playerTwoCurrentScore = document.querySelector('.player-two-current-score');
let playerOneBackground = document.querySelector('.lSide');
let playerTwoBackground = document.querySelector('.rSide');

let overlay = document.querySelector('.overlay');
let modalWindow = document.querySelector('.modal-window');
let theWinner = document.querySelector('.winner');

let playerOne = {
  totalScore: 0,
  currentScore: 0,
  turn: true,
  turnNumbers: [],
};
let playerTwo = {
  totalScore: 0,
  currentScore: 0,
  turn: false,
  turnNumbers: [],
};

let newGameBtn = document.querySelectorAll('.new-game-btn');
let rollDiceBtn = document.querySelector('.roll-dice-btn');
let holdBtn = document.querySelector('.hold-btn');
let closeBtn = document.querySelector('.close-btn');

let dice = document.querySelectorAll('.dice');

rollDiceBtn.addEventListener('click', () => {
  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  const classFace = `dice${diceNumber}`;

  dice.forEach(die => {
    if (die.classList.contains(classFace)) {
      die.classList.remove('hidden');
    } else {
      die.classList.add('hidden');
    }
  });
  if (playerOne.turn) {
    playerOneTurn(diceNumber);
  } else {
    playerTwoTurn(diceNumber);
  }
});

//refactoring
function playerBackground() {
  playerOneBackground.style.backgroundColor = playerOne.turn
    ? '#3b3c80ad'
    : '#cecaf51f';
  playerTwoBackground.style.backgroundColor = playerTwo.turn
    ? '#3b3c80ad'
    : '#cecaf51f';
}
//refactoring
function resetPlayerOne() {
  playerOne.turnNumbers = [];
  playerOneCurrentScore.textContent = 0;
  playerOne.currentScore = 0;
  playerOne.turn = false;
  playerTwo.turn = true;
}
//refactoring
function resetPlayerTwo() {
  playerTwo.turnNumbers = [];
  playerTwoCurrentScore.textContent = 0;
  playerTwo.currentScore = 0;
  playerTwo.turn = false;
  playerOne.turn = true;
}
function playerOneTurn(diceNumber) {
  playerBackground();
  // playerOneBackground.style.backgroundColor = '#3b3c80ad';
  // playerTwoBackground.style.backgroundColor = '#cecaf51f';
  if (!playerOne.turnNumbers.includes(diceNumber)) {
    playerOne.turnNumbers.push(diceNumber);
    playerOne.currentScore += diceNumber;
    playerOneCurrentScore.textContent = playerOne.currentScore;
    holdBtn.addEventListener('click', () => {
      playerOne.totalScore += playerOne.currentScore;
      playerOneTotalScore.textContent = playerOne.totalScore;
      if (playerOne.totalScore >= 100) {
        theWinner.textContent = 1;
        openModalWindow();
      }
      // playerOneBackground.style.backgroundColor = '#cecaf51f';
      // playerTwoBackground.style.backgroundColor = '#3b3c80ad';
      resetPlayerOne();
      playerBackground();
      // playerOne.turnNumbers = [];
      // playerOneCurrentScore.textContent = 0;
      // playerOne.currentScore = 0;
      // playerOne.turn = false;
      // playerTwo.turn = true;
    });
  } else {
    // playerOneBackground.style.backgroundColor = '#cecaf51f';
    // playerTwoBackground.style.backgroundColor = '#3b3c80ad';
    // playerOne.turnNumbers = [];
    // playerOneCurrentScore.textContent = 0;
    // playerOne.currentScore = 0;
    // playerOne.turn = false;
    // playerTwo.turn = true;
    resetPlayerOne();
    playerBackground();
  }
}
function playerTwoTurn(diceNumber) {
  playerBackground();
  // playerOneBackground.style.backgroundColor = '#cecaf51f';
  // playerTwoBackground.style.backgroundColor = '#3b3c80ad';
  if (!playerTwo.turnNumbers.includes(diceNumber)) {
    playerTwo.turnNumbers.push(diceNumber);
    playerTwo.currentScore += diceNumber;
    playerTwoCurrentScore.textContent = playerTwo.currentScore;
    holdBtn.addEventListener('click', () => {
      playerTwo.totalScore += playerTwo.currentScore;
      playerTwoTotalScore.textContent = playerTwo.totalScore;
      if (playerTwo.totalScore >= 100) {
        theWinner.textContent = 2;
        openModalWindow();
      }
      // playerOneBackground.style.backgroundColor = '#3b3c80ad';
      // playerTwoBackground.style.backgroundColor = '#cecaf51f';
      // playerTwo.turnNumbers = [];
      // playerTwoCurrentScore.textContent = 0;
      // playerTwo.currentScore = 0;
      // playerTwo.turn = false;
      // playerOne.turn = true;
      resetPlayerTwo();
      playerBackground();
    });
  } else {
    // playerOneBackground.style.backgroundColor = '#3b3c80ad';
    // playerTwoBackground.style.backgroundColor = '#cecaf51f';
    // playerTwo.turnNumbers = [];
    // playerTwoCurrentScore.textContent = 0;
    // playerTwo.currentScore = 0;
    // playerTwo.turn = false;
    // playerOne.turn = true;
    resetPlayerTwo();
    playerBackground();
  }
}
newGameBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    playerOne.turnNumbers = [];
    playerOne.totalScore = 0;
    playerOne.currentScore = 0;
    playerOneCurrentScore.textContent = 0;
    playerOneTotalScore.textContent = 0;
    resetPlayerTwo();

    playerTwoTotalScore.textContent = 0;
    playerTwo.totalScore = 0;
    playerBackground();
    closeModalWindow();
  });
});
// newGameBtn.addEventListener('click', () => {
//   // playerOneBackground.style.backgroundColor = '#3b3c80ad';
//   // playerTwoBackground.style.backgroundColor = '#cecaf51f';
//   playerOne.turnNumbers = [];
//   playerOne.totalScore = 0;
//   playerOne.currentScore = 0;
//   playerOneCurrentScore.textContent = 0;
//   playerOneTotalScore.textContent = 0;

//   // playerTwo.turnNumbers = [];
//   // playerTwo.currentScore = 0;
//   // playerTwo.currentScore = 0;
//   // playerTwoCurrentScore.textContent = 0;
//   // playerTwo.turn = false;
//   // playerOne.turn = true;
//   resetPlayerTwo();

//   playerTwoTotalScore.textContent = 0;
//   playerTwo.totalScore = 0;
//   playerBackground();
// });
closeBtn.addEventListener('click', () => {
  closeModalWindow();
});
overlay.addEventListener('click', () => {
  closeModalWindow();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalWindow();
});
function closeModalWindow() {
  overlay.classList.add('hidden');
  modalWindow.classList.add('hidden');
}
function openModalWindow() {
  overlay.classList.remove('hidden');
  modalWindow.classList.remove('hidden');
}
