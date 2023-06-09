const blueWhaleImage = new Image();
blueWhaleImage.src = 'path/to/Blue_Whale_01.png';

const obstacleImage = new Image();
obstacleImage.src = 'path/to/Blue_Whale_obstacle.png';
const blueWhaleImage = new Image();
blueWhaleImage.src = 'path/to/Blue_Whale_01.png';
blueWhaleImage.onload = startGame;

const obstacleImage = new Image();
obstacleImage.src = 'path/to/Blue_Whale_obstacle.png';
obstacleImage.onload = startGame;
function startGame() {
  // Очистите экран
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Отрисуйте спрайты
  context.drawImage(blueWhaleImage, blueWhaleX, blueWhaleY);
  context.drawImage(obstacleImage, obstacleX, obstacleY);

  // Добавьте остальной код игры

  // Запустите анимацию
  animate();
}
