/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
const selectionContainer = document.querySelector("#selection");
const selections = document.querySelectorAll(".card");
const playerScore = document.querySelector("#player-score .score-display");
const computerScore = document.querySelector("#computer-score .score-display");
const drawScore = document.querySelector("#draw .score-display");
const winnerInfo = document.querySelector("#winner-info");
const roundInfo = document.querySelector("#round-info");
const btnNextRound = document.querySelector("#btn-next-round");
const gameScreen = document.querySelector("#game-screen");
const playerSelectionImage = document.querySelector("#player-selection-image");
const btnRestart = document.querySelector("#btn-restart");
const computerSelectionImage = document.querySelector(
  "#computer-selection-image"
);
const results = document.querySelector("#results");

let playerWins = 0;
let computerWins = 0;
let draws = 0;
let rounds = 0;
let playerWonRound = false;
let computerWonRound = false;

function playsound(sound) {
  const audio = document.querySelector(`#sound-${sound}`);
  audio.currenTime = 0;
  audio.play();
}

function displayResults() {
  let winner;
  playsound(3);
  if (playerWins > computerWins) {
    winner = "Player";
  } else if (computerWins > playerWins) {
    winner = "Computer";
  } else {
    winner = "Nobody";
  }

  results.textContent = `The winner is ${winner}!!! Player won ${playerWins} time(s).
    Computer won ${computerWins} time(s).
    There were ${draws} draws.`;

  results.style.display = "";
  btnRestart.style.display = "";
}

function displayChosenCards(player, computer) {
  // If span the text is clicked, find the image
  if (player.tagName === "SPAN") {
    playerSelectionImage.src = player.previousElementSibling.src;
  } else if (player.tagName === "IMG") {
    playerSelectionImage.src = player.src;
  } else {
    // If container div is clicked, find the image
    playerSelectionImage.src = player.children[0].src;
  }

  if (computer === "rock") {
    computerSelectionImage.src = "images/rock.png";
  }
  if (computer === "paper") {
    computerSelectionImage.src = "images/paper.jpg";
  }
  if (computer === "scissors") {
    computerSelectionImage.src = "images/scissors.jpg";
  }
  gameScreen.style.display = "";
  selectionContainer.style.display = "none";
  btnNextRound.style.display = "";
}

function displayMessage(playerSelection, computerSelection) {
  roundInfo.textContent = `Round ${rounds}`;
  if (playerWonRound) {
    playerScore.textContent = playerWins;
    winnerInfo.textContent = `Player beats Computer! - ${playerSelection} beats ${computerSelection}!`;
  } else if (computerWonRound) {
    computerScore.textContent = computerWins;
    winnerInfo.textContent = `Computer beats Player! - ${computerSelection} beats ${playerSelection}!`;
  } else {
    drawScore.textContent = draws;
    winnerInfo.textContent = `It's a draw!`;
  }
}

function computerPlay() {
  const randomNumber = Math.floor(Math.random() * 3);
  return randomNumber === 2
    ? "rock"
    : randomNumber === 1
    ? "paper"
    : "scissors";
}

function playRound(playerSelection, computerSelection) {
  playerWonRound = false;
  computerWonRound = false;
  if (
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "rock" && computerSelection === "paper")
  ) {
    // In this condition, paper always beats rock, if player chose paper, they win
    if (playerSelection === "paper") {
      playerWonRound = true;
    } else {
      computerWonRound = true;
    }
  }
  if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "scissors" && computerSelection === "rock")
  ) {
    if (playerSelection === "rock") {
      playerWonRound = true;
    } else {
      computerWonRound = true;
    }
  }

  if (
    (playerSelection === "scissors" && computerSelection === "paper") ||
    (playerSelection === "paper" && computerSelection === "scissors")
  ) {
    if (playerSelection === "scissors") {
      playerWonRound = true;
    } else {
      computerWonRound = true;
    }
  }
  if (playerWonRound === true) {
    playsound(2);
    playerWins += 1;
  } else if (computerWonRound === true) {
    playsound(1);
    computerWins += 1;
  } else {
    playsound(4);
    draws += 1;
  }
  rounds += 1;
}

selections.forEach(selection =>
  selection.addEventListener("click", e => {
    console.log(e);
    const computerSelection = computerPlay();
    playRound(selection.id, computerSelection);
    displayChosenCards(e.target, computerSelection);
    displayMessage(selection.id, computerSelection);

    // Remove unnessary containers and display results
    if (rounds >= 5) {
      selectionContainer.style.display = "none";
      gameScreen.style.display = "none";
      btnNextRound.style.display = "none";
      displayResults();
    }
  })
);

btnNextRound.addEventListener("click", () => {
  selectionContainer.style.display = "";
  btnNextRound.style.display = "none";
  gameScreen.style.display = "none";
});

// Restart Game
btnRestart.addEventListener("click", () => {
  playerWins = 0;
  computerWins = 0;
  draws = 0;
  rounds = 0;
  playerScore.textContent = playerWins;
  computerScore.textContent = computerWins;
  drawScore.textContent = draws;

  roundInfo.textContent = "Rock,Paper or Scissors?";
  results.style.display = "none";
  selectionContainer.style.display = "";
  btnRestart.style.display = "none";
});
