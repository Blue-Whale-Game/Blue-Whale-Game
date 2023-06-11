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
let gameOverElement = document.getElementById('gameOver');
let playAgainElement = document.getElementById('playAgain');

let gameTimer;
let gameTime = 0;
let isGameOver = false;

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
  if (event.code === 'Space' && !isJumping && !isGameOver) {
    isJumping = true;
    blueWhaleY -= 50;
  } else if (event.code === 'Enter' && isGameOver) {
    playAgain();
  }
}

function startGame() {
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  animate();
  animateObstacles();
  startTimer();
  showStartMessage();
}

function showStartMessage() {
  context.fillStyle = 'blue';
  context.font = 'bold 36px Arial';
  context.textAlign = 'center';
  context.fillText('Press Enter to start the game', canvas.width / 2, canvas.height / 2);
}

function showGameOverMessage() {
  context.fillStyle = 'black';
  context.font = 'bold 36px Arial';
  context.textAlign = 'center';
  context.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
  context.fillText('Press Enter to PLAY again', canvas.width / 2, canvas.height - 50);
}

function playAgain() {
  score = 0;
  gameTime = 0;
  isGameOver = false;
  blueWhaleX = canvas.width / 2;
  blueWhaleY = canvas.height / 2;
  obstacleX = canvas.width;
  meduzaX = canvas.width;
  meduzaY = getRandomYPosition();
  updateScore();
  updateTimer();
  gameOverElement.style.display = 'none';
  playAgainElement.style.display = 'none';
  startGame();
}

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(background, 0, 0, canvas.width, canvas.height);

  if (isGameOver) {
    showGameOverMessage();
    gameOverElement.style.display = 'block';
    playAgainElement.style.display = 'block';
    return;
  }

  if (blueWhaleX + blueWhaleImage.width > canvas.width) {
    blueWhaleSpeedX = -1;
  } else if (blueWhaleX < 0) {
    blueWhaleSpeedX = 1;
  }

  blueWhaleX += blueWhaleSpeedX;

  if (isJumping) {
    blueWhaleY -= 5;
    if (blueWhaleY <= 0) {
      isJumping = false;
    }
  } else {
    blueWhaleY += 3;
    if (blueWhaleY + blueWhaleImage.height > canvas.height) {
      blueWhaleY = canvas.height - blueWhaleImage.height;
    }
  }

  context.drawImage(blueWhaleImage, blueWhaleX, blueWhaleY);
  context.drawImage(obstacleImage, obstacleX, obstacleY, obstacleWidth, obstacleHeight);
  context.drawImage(meduzaImage, meduzaX, meduzaY, meduzaWidth, meduzaHeight);

  if (
    blueWhaleX < meduzaX + meduzaWidth &&
    blueWhaleX + blueWhaleImage.width > meduzaX &&
    blueWhaleY < meduzaY + meduzaHeight &&
    blueWhaleY + blueWhaleImage.height > meduzaY
  ) {
    score += 5;
    updateScore();
    meduzaX = canvas.width;
    meduzaY = getRandomYPosition();
  }

  if (
    blueWhaleX < obstacleX + obstacleWidth &&
    blueWhaleX + blueWhaleImage.width > obstacleX &&
    blueWhaleY < obstacleY + obstacleHeight &&
    blueWhaleY + blueWhaleImage.height > obstacleY
  ) {
    endGame();
  }

  requestAnimationFrame(animate);
}

function animateObstacles() {
  if (isGameOver) {
    return;
  }

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
  isGameOver = true;
}

startGame();
