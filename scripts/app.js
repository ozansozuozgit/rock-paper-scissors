/* eslint-disable no-nested-ternary */
const selections = document.querySelectorAll(".card");
console.log(selections);
selections.forEach(selection =>
  selection.addEventListener("click", e => {
    console.log(e.target);
    console.log(selection.id);
  })
);

let playerWins = 0;
let computerWins = 0;
let draws = 0;
let rounds = 0;

function displayMessage(winner, playerSelection, computerSelection) {
  if (winner === "player") {
    playerWins += 1;
    return `Player beats Computer! -  ${playerSelection} beats ${computerSelection}!`;
  }
  if (winner === "computer") {
    computerWins += 1;
    return `Computer beats Player! - ${computerSelection} beats ${playerSelection}!`;
  }
  draws += 1;
  return `It's a draw!`;
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
  if (
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "rock" && computerSelection === "paper")
  ) {
    return playerSelection === "paper"
      ? displayMessage("player", playerSelection, computerSelection)
      : displayMessage("computer", playerSelection, computerSelection);
  }
  if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "scissors" && computerSelection === "rock")
  ) {
    return playerSelection === "rock"
      ? displayMessage("player", playerSelection, computerSelection)
      : displayMessage("computer", playerSelection, computerSelection);
  }
  if (
    (playerSelection === "scissors" && computerSelection === "paper") ||
    (playerSelection === "paper" && computerSelection === "scissors")
  ) {
    return playerSelection === "scissors"
      ? displayMessage("player", playerSelection, computerSelection)
      : displayMessage("computer", playerSelection, computerSelection);
  }
  return displayMessage();
}

function game() {
  const computerSelection = computerPlay();

  console.log(
    `Player won ${playerWins} time(s).
  Computer won ${computerWins} time(s).
  There were ${draws} draws.`
  );
}

//game();
