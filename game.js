const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Задайте начальные координаты Кита (центр канваса)
let blueWhaleX = canvas.width / 2;
let blueWhaleY = canvas.height / 2;

// Задайте начальные координаты препятствия
let obstacleX = canvas.width;
let obstacleY = canvas.height / 2;

// Задайте скорости движения Кита и препятствия
let blueWhaleSpeedX = 1;
let obstacleSpeedX = 3;

const blueWhaleImage = new Image();
blueWhaleImage.src = 'Blue_Whale_01.png';
blueWhaleImage.onload = startGame;

const obstacleImage = new Image();
obstacleImage.src = 'Blue_Whale_obstacle.png';
obstacleImage.onload = startGame;

let imagesLoaded = 0;
function startGame() {
  imagesLoaded++;
  if (imagesLoaded === 2) {
    animate();
  }
}

function animate() {
  // Очистите экран
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Отрисуйте спрайты
  context.drawImage(blueWhaleImage, blueWhaleX, blueWhaleY);
  context.drawImage(obstacleImage, obstacleX, obstacleY);

  // Обновите позиции спрайтов
  blueWhaleX += blueWhaleSpeedX;
  obstacleX -= obstacleSpeedX;

  // Вызовите функцию анимации снова
  requestAnimationFrame(animate);
}

// Запустите анимацию
animate();
