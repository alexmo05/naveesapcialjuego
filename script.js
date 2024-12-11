let score = 0;
let level = 1;
let energy = 100;
const spaceship = document.getElementById("spaceship");
const scoreBoard = document.getElementById("score");
const levelBoard = document.getElementById("level");
const energyBar = document.getElementById("energy-fill");
const container = document.getElementById("game-container");
const clickSound = document.getElementById("click-sound");
const powerupSound = document.getElementById("powerup-sound");
const explosionSound = document.getElementById("explosion-sound");
const bgMusic = document.getElementById("bg-music");

bgMusic.volume = 0.5;
bgMusic.play();

function getRandomPosition() {
    const x = Math.random() * (window.innerWidth - 60);
    const y = Math.random() * (window.innerHeight - 60);
    return { x, y };
}

function moveSpaceship() {
    const { x, y } = getRandomPosition();
    gsap.to(spaceship, { duration: 0.5 - level * 0.01, x, y, rotation: "+=360" });
}

function updateEnergy(amount) {
    energy += amount;
    if (energy > 100) energy = 100;
    if (energy <= 0) {
        alert(`¡Juego terminado! Puntuación: ${score}`);
        resetGame();
    }
    energyBar.style.width = energy + "%";
}

function resetGame() {
    score = 0;
    level = 1;
    energy = 100;
    scoreBoard.textContent = score;
    levelBoard.textContent = level;
    updateEnergy(0);
    moveSpaceship();
}

spaceship.addEventListener("click", () => {
    score += 10;
    scoreBoard.textContent = score;
    clickSound.currentTime = 0;
    clickSound.play();
    moveSpaceship();
    if (score % 100 === 0) {
        level++;
        levelBoard.textContent = level;
        powerupSound.play();
    }
    updateEnergy(10);
});

setInterval(() => {
    updateEnergy(-5); // La energía baja más rápido
}, 500); // Cada 0.5 segundos

moveSpaceship();