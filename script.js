const highScore = document.querySelector("#high-score span");
const timer = document.getElementById("timer");
const scoreBoard = document.getElementById("score");
const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const btn = document.getElementById("start-btn");
let lastHole;
let score = 0;
let timeUp = false;
let isStarted = false;
const timeLimit = 15000;

const storedHighScore = Number(localStorage.getItem("highScore"));
if (storedHighScore !== null) highScore.textContent = storedHighScore;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const i = Math.floor(Math.random() * holes.length);
  const hole = holes[i];

  if (lastHole === hole) {
    randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(400, 800);
  const hole = randomHole(holes);
  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function whack(e) {
  if (!e.isTrusted) return;
  this.classList.remove("up");
  score++;
  scoreBoard.innerHTML = score;
}

function endGame() {
  timeUp = true;
  isStarted = false;
  highScore.textContent = Math.max(score, Number(highScore.textContent));
  const storedHighScore = localStorage.setItem("highScore", JSON.stringify(highScore.textContent));
}

function startGame() {
  let timeLimit = 15;
  score = 0;
  timeUp = false;
  isStarted = true;

  timer.textContent = `0:${timeLimit < 10 ? '0' : ''}${timeLimit}`;

  const interval = setInterval(() => {
    timeLimit--;
    if (timeLimit <= 0) {
      timer.textContent = "0:00";
      clearInterval(interval);
      return;
    }

    timer.textContent = `0:${timeLimit < 10 ? '0' : ''}${timeLimit}`;
  }, 1000);

  peep();
  setTimeout(endGame, 15000);
}

function endGame() {
  timeUp = true;
  isStarted = false;
  highScore.textContent = Math.max(score, Number(highScore.textContent));
  localStorage.setItem("highScore", highScore.textContent);
}

moles.forEach((mole) => mole.addEventListener("click", whack));
btn.addEventListener("click", () => {
  if (!isStarted) startGame();
});
