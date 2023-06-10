const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let blueWhaleX = canvas.width / 2;
let blueWhaleY = canvas.height / 2;

let obstacleX = canvas.width;
let obstacleY = canvas.height / 2;
let obstacleWidth = 76;
let obstacleHeight = 100;

let meduzaX = canvas.width;
let meduzaY = getRandomYPosition();
let meduzaWidth = obstacleWidth;
let meduzaHeight = obstacleHeight;

let blueWhaleSpeedX = 1;
let obstacleSpeedX = 3;

const blueWhaleImage = new Image();
blueWhaleImage.src = 'Blue_Whale_01.png';
blueWhaleImage.onload = startGame;

const obstacleImage = new Image();
obstacleImage.src = 'Blue_Whale_obstacle.png';
obstacleImage.onload = startGame;

const meduzaImage = new Image();
meduzaImage.src = 'Meduza_Blue_Whale.png';

let imagesLoaded = 0;
let isJumping = false;
let score = 0;

function startGame() {
  imagesLoaded++;
  if (imagesLoaded === 3) {
    animate();
  }
}

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
  if (event.code === 'Space' && !isJumping) {
    isJumping = true;
    blueWhaleY -= 50;
  }
}

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  blueWhaleX += blueWhaleSpeedX;
  obstacleX -= obstacleSpeedX;
  meduzaX -= obstacleSpeedX;

  if (obstacleX + obstacleWidth < 0) {
    obstacleX = canvas.width;
  }

  if (meduzaX + meduzaWidth < 0) {
    meduzaX = canvas.width;
    meduzaY = getRandomYPosition();
  }

  if (isJumping) {
    blueWhaleY += 5;
    if (blueWhaleY >= canvas.height / 2) {
      isJumping = false;
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

  if (
    (blueWhaleX < obstacleX + obstacleWidth &&
      blueWhaleX + blueWhaleImage.width > obstacleX &&
      blueWhaleY < obstacleY + obstacleHeight &&
      blueWhaleY + blueWhaleImage.height > obstacleY) ||
    blueWhaleY + blueWhaleImage.height >= canvas.height
  ) {
    endGame();
  } else {
    requestAnimationFrame(animate);
  }
}

function getRandomYPosition() {
  return Math.floor(Math.random() * (canvas.height - obstacleHeight));
}

function updateScore() {
  document.getElementById('score').textContent = `Score: ${score}`;
}

function endGame() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = '30px Arial';
  context.fillStyle = 'white';
  context.textAlign = 'center';
  context.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
}

updateScore();
animate();
