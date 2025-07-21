const highScore = document.querySelector("#high-score span");
const scoreBoard = document.getElementById("score");
const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const btn = document.getElementById("start-btn");
let lastHole;
let score = 0;
let timeUp = false;
let isStarted = false;

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

function startGame() {
  scoreBoard.textContent = 0;
  score = 0;
  timeUp = false;
  isStarted = true;
  peep();
  setTimeout(() => (timeUp = true, isStarted = false, highScore.textContent = Math.max(score, Number(highScore.textContent))), 15000);
  
}

moles.forEach((mole) => mole.addEventListener("click", whack));
btn.addEventListener("click", () => {
  if (!isStarted) startGame();
});


