// --- 1. DAFTAR 20 FOTO ---
// Pastikan nama file dan format (.jpg / .png / .jpeg) sesuai dengan yang ada di folder photos/
const photos = [
  "photos/foto1.jpg",
  "photos/foto2.jpg",
  "photos/foto3.jpg",
  "photos/foto4.jpg",
  "photos/foto5.jpg",
  "photos/foto6.jpg",
  "photos/foto7.jpg",
  "photos/foto8.jpg",
  "photos/foto9.jpg",
  "photos/foto10.jpg",
  "photos/foto11.jpg",
  "photos/foto12.jpg",
  "photos/foto13.jpg",
  "photos/foto14.jpg",
  "photos/foto15.jpg",
  "photos/foto16.jpg",
  "photos/foto17.jpg",
  "photos/foto18.jpg",
  "photos/foto19.jpg",
  "photos/foto20.jpg"
];

let currentIndex = 0;
let slideInterval = null;

// --- 2. FUNGSI BUKA SURAT ---
function openLetter() {
  // Putar musik
  const music = document.getElementById("bg-music");
  if (music) {
    music.play().catch(() => console.log("Audio autoplay dicegah oleh browser"));
  }

  // Transisi Halaman
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");

  if (step1 && step2) {
    step1.classList.remove("active");
    step1.classList.add("hidden");

    step2.classList.remove("hidden");
    setTimeout(() => step2.classList.add("active"), 50);
  }

  // Efek konfeti pembuka
  launchConfetti();

  // Mulai otomatis ganti foto tiap 4 detik setelah surat dibuka
  startSlideShow();
}

// --- 3. LOGIKA SLIDESHOW FOTO ---
function showPhoto(index) {
  const polaroidImg = document.getElementById("polaroid-img");
  const polaroidCaption = document.getElementById("polaroid-caption");

  if (!polaroidImg) return;

  polaroidImg.style.opacity = 0;
  setTimeout(() => {
    polaroidImg.src = photos[index];
    if (polaroidCaption) {
      polaroidCaption.innerText = `Momen Indah Kita ✨ (${index + 1}/${photos.length})`;
    }
    polaroidImg.style.opacity = 1;
  }, 200);
}

function nextPhoto() {
  currentIndex = (currentIndex + 1) % photos.length;
  showPhoto(currentIndex);
  resetSlideShow(); // Reset timer saat diklik manual
}

function prevPhoto() {
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  showPhoto(currentIndex);
  resetSlideShow(); // Reset timer saat diklik manual
}

function startSlideShow() {
  if (!slideInterval) {
    slideInterval = setInterval(nextPhoto, 4000);
  }
}

function resetSlideShow() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextPhoto, 4000);
}

// --- 4. EFEK KONFETI ---
function launchConfetti() {
  if (typeof confetti !== "function") return;

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

// --- 5. INTERAKSI TIUP LILIN ---
document.addEventListener("DOMContentLoaded", () => {
  const candleArea = document.getElementById("candle-area");
  const flame = document.getElementById("flame");
  const candleText = document.getElementById("candle-text");

  if (candleArea && flame) {
    candleArea.addEventListener("click", () => {
      if (!flame.classList.contains("off")) {
        flame.classList.add("off");
        if (candleText) {
          candleText.innerHTML = "✨ <b>Wish kamu sudah terkabul! I Love You!</b> 💖";
        }
        launchConfetti();
      }
    });
  }
});
