function openLetter() {
  // Putar musik (jika ada file musik)
  const music = document.getElementById("bg-music");
  if (music) {
    music.play().catch(() => console.log("Audio autoplay dicegah browser"));
  }

  // Transisi Card
  document.getElementById("step-1").classList.remove("active");
  document.getElementById("step-1").classList.add("hidden");

  const step2 = document.getElementById("step-2");
  step2.classList.remove("hidden");
  setTimeout(() => step2.classList.add("active"), 50);

  // Jalankan efek konfeti
  launchConfetti();
}

function launchConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Interaksi Tiup Lilin
const candleArea = document.getElementById("candle-area");
const flame = document.getElementById("flame");
const candleText = document.getElementById("candle-text");

candleArea.addEventListener("click", () => {
  if (!flame.classList.contains("off")) {
    flame.classList.add("off");
    candleText.innerHTML = "✨ <b>Wish kamu sudah terkabul! I Love You!</b> 💖";
    launchConfetti();
  }
});
