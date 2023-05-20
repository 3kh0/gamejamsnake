// Made for a school game jam
// Marvel at my shitty JS
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const gridWidth = canvasWidth / gridSize;
const gridHeight = canvasHeight / gridSize;

let snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];
let direction = "right";
let food = { x: 15, y: 15 };
let score = document.getElementById("score").innerText;

function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = "#0f0";
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
}

function drawFood() {
  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").textContent = score;
    document.getElementById("status").textContent = `Collected food`;
    console.log(`Collected food`)
    generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  document.getElementById("status").textContent = `Placing food...`;
  console.log("Placing food")
  food = {
    x: Math.floor(Math.random() * gridWidth),
    y: Math.floor(Math.random() * gridHeight),
  };
}

function handleKeyDown(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case "ArrowRight":
      if (direction !== "left") {
        direction = "right";
      }
      break;
  }
}

function checkGameOver() {
  let head = snake[0];
  if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }

  return false;
}

function gameLoop() {
  document.getElementById("status").textContent = `Running.`;
  console.log('Running')
  if (checkGameOver()) {
    const playagain = document.getElementById("playagain");
    clearInterval(intervalId);
    document.getElementById("status").textContent = `Game over!`;
    console.log("Game over")
    playagain.style.display = "";
  }

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawSnake();
  drawFood();
  moveSnake();
}

generateFood();

document.addEventListener("keydown", handleKeyDown);
let intervalId = setInterval(gameLoop, 150);