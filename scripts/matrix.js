const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const letters = '01';
const fontSize = 16;
let columns = Math.floor(width / fontSize);
let drops = Array(columns).fill(1);

function draw() {
  // Fading background to create trail effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#00bfff'; // Matrix text color
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    if (y > height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 33);

// Smooth resize handler without animation reset
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    const newColumns = Math.floor(newWidth / fontSize);

    canvas.width = newWidth;
    canvas.height = newHeight;
    width = newWidth;
    height = newHeight;

    // Adjust the drops array length without resetting animation
    if (newColumns > drops.length) {
      drops = drops.concat(Array(newColumns - drops.length).fill(1));
    } else {
      drops = drops.slice(0, newColumns);
    }
  }, 200); // debounce delay
});
