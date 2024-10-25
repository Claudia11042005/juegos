const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('status-message');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;
let timerInterval;
let timeElapsed = 0;
let timerStarted = false;

// Contador de partidas
let totalGames = 0;
const totalGamesDisplay = document.getElementById('total-games');

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startTimer() {
  timerInterval = setInterval(() => {
    timeElapsed++;
    document.getElementById('timer').textContent = `Tiempo: ${timeElapsed} segundos`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  timeElapsed = 0;
  document.getElementById('timer').textContent = `Tiempo: 0 segundos`;
  timerStarted = false;
}

function handleClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (board[cellIndex] !== null || !gameActive) {
    return;
  }

  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }

  board[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusMessage.textContent = `¡Jugador ${currentPlayer} ha ganado!`;
    gameActive = false;
    stopTimer();
    updateGameCounter(); // Actualiza el contador de partidas cuando termine un juego
  } else if (board.every(cell => cell !== null)) {
    statusMessage.textContent = '¡Es un empate!';
    gameActive = false;
    stopTimer();
    updateGameCounter(); // Actualiza el contador de partidas cuando termine un juego
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `Turno del Jugador ${currentPlayer}`;
  }
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === player);
  });
}

function restartGame() {
  board.fill(null);
  gameActive = true;
  currentPlayer = 'X';
  statusMessage.textContent = `Turno del Jugador ${currentPlayer}`;
  cells.forEach(cell => (cell.textContent = ''));
  resetTimer(); // Reinicia el cronómetro al reiniciar el juego
}

// Incrementa el contador de partidas
function updateGameCounter() {
  totalGames++;
  totalGamesDisplay.textContent = totalGames;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
statusMessage.textContent = `Turno del Jugador ${currentPlayer}`;

function initializeMusicControls() {
  const playPauseBtn = document.getElementById('play-pause-btn');
  const volumeControl = document.getElementById('volume-control');
  const backgroundMusic = document.getElementById('background-music');

  // Reproduce o pausa la música
  playPauseBtn.addEventListener('click', () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      playPauseBtn.textContent = '⏸️'; // Cambia el ícono a pausa
    } else {
      backgroundMusic.pause();
      playPauseBtn.textContent = '🎵'; // Cambia el ícono de nuevo a música
    }
  });

  // Control del volumen
  volumeControl.addEventListener('input', () => {
    backgroundMusic.volume = volumeControl.value;
  });

  // Iniciar música automáticamente con un volumen inicial del 50%
  backgroundMusic.volume = 0.5;
  backgroundMusic.play();
}

// Llamar a la función cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  initializeMusicControls();
});

// Botón "Salir" que redirige a la página principal (index.html en la misma carpeta)
document.getElementById('salir').addEventListener('click', function() {
  window.location.href = 'Plays/index.html'; // Redirige a la página principal en la misma carpeta
});





