const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const blueWhaleImage = new Image();
blueWhaleImage.src = 'Blue_Whale_01.png';

const obstacleImage = new Image();
obstacleImage.src = 'Blue_Whale_obstacle.png';

const meduzaImage = new Image();
meduzaImage.src = 'Meduza_Blue_Whale.png';

const background = new Image();
background.src = 'Blue_Whale_BG.png';

let blueWhaleX = canvas.width / 2;
let blueWhaleY = canvas.height / 2;
let blueWhaleSpeedX = 1;

let obstacleX = canvas.width;
let obstacleY = canvas.height / 2;
let obstacleWidth = 76;
let obstacleHeight = 100;
let obstacleSpeedX = 3;

let meduzaX = canvas.width;
let meduzaY = getRandomYPosition();
let meduzaWidth = obstacleWidth;
let meduzaHeight = obstacleHeight;

let isJumping = false;
let score = 0;
let scoreElement = document.getElementById('score');
let timerElement = document.getElementById('timer');

let gameTimer;
let gameTime = 0;

function startGame() {
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  animate();
  animateObstacles();
  startTimer();
}
// ...

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  blueWhaleX += blueWhaleSpeedX;
  obstacleX -= obstacleSpeedX;

  if (obstacleX + obstacleWidth < 0) {
    obstacleX = canvas.width;
  }

  if (isJumping) {
    blueWhaleY += 5;
    if (blueWhaleY >= canvas.height / 2) {
      isJumping = false;
    }
  }

  context.drawImage(blueWhaleImage, blueWhaleX, blueWhaleY);
  context.drawImage(obstacleImage, obstacleX, obstacleY, obstacleWidth, obstacleHeight);

  if (blueWhaleX > obstacleX + obstacleWidth) {
    score += 10;
    updateScore();
  }

  // ...

  requestAnimationFrame(animate);
}

// ...

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(background, 0, 0, canvas.width, canvas.height);

  blueWhaleX += blueWhaleSpeedX;

  if (blueWhaleX + blueWhaleImage.width > canvas.width) {
    blueWhaleX = canvas.width - blueWhaleImage.width;
  }

  if (isJumping) {
    blueWhaleY -= 5;
    if (blueWhaleY <= 0) {
      isJumping = false;
    }
  } else {
    blueWhaleY += 5;
    if (blueWhaleY + blueWhaleImage.height > canvas.height) {
      endGame();
    }
  }

  context.drawImage(blueWhaleImage, blueWhaleX, blueWhaleY);
  context.drawImage(obstacleImage, obstacleX, obstacleY, obstacleWidth, obstacleHeight);
  context.drawImage(meduzaImage, meduzaX, meduzaY, meduzaWidth, meduzaHeight);

  if (blueWhaleX > obstacleX + obstacleWidth) {
    score += 10;
    updateScore();
  }

  if (
    blueWhaleX < meduzaX + meduzaWidth &&
    blueWhaleX + blueWhaleImage.width > meduzaX &&
    blueWhaleY < meduzaY + meduzaHeight &&
    blueWhaleY + blueWhaleImage.height > meduzaY
  ) {
    score += 5;
    updateScore();
    meduzaX = -meduzaWidth;
  }

  requestAnimationFrame(animate);
}

function animateObstacles() {
  obstacleX -= obstacleSpeedX;
  meduzaX -= obstacleSpeedX;

  if (obstacleX + obstacleWidth < 0) {
    obstacleX = canvas.width;
  }

  if (meduzaX + meduzaWidth < 0) {
    meduzaX = canvas.width;
    meduzaY = getRandomYPosition();
  }

  requestAnimationFrame(animateObstacles);
}

function handleKeyDown(event) {
  if (event.code === 'Space' && !isJumping) {
    isJumping = true;
    blueWhaleY -= 50;
  }
}

function getRandomYPosition() {
  return Math.floor(Math.random() * (canvas.height - obstacleHeight));
}

function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

function startTimer() {
  gameTimer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  gameTime++;
  timerElement.textContent = `Time: ${gameTime}s`;
}

function endGame() {
  clearInterval(gameTimer);
  document.removeEventListener('keydown', handleKeyDown);
  // Дополнительные действия по завершению игры, например, вывод результата
}

blueWhaleImage.onload = function () {
  obstacleImage.onload = function () {
    meduzaImage.onload = function () {
      startGame();
    }
  }
};

document.addEventListener('keydown', handleKeyDown);
