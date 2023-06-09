const blueWhaleImage = new Image();
blueWhaleImage.src = 'path/to/Blue_Whale_01.png';

const obstacleImage = new Image();
obstacleImage.src = 'path/to/Blue_Whale_obstacle.png';

// Дождитесь загрузки изображений перед началом игры
Promise.all([blueWhaleImage.onload, obstacleImage.onload]).then(startGame);

function startGame() {
  // Здесь можно начинать игру
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
