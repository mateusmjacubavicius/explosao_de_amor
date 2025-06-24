// Obtem o canvas e contexto
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const music = document.getElementById("bg-music");

// Ajusta o tamanho do canvas à janela
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Texto da declaração
const text = "EU TE AMO";
const fontSize = 18;

let particles = []; // Partículas ao clique
let hearts = []; // Corações ao clique
let secretShown = false; // Controle da mensagem secreta

// 💜 Corações que flutuam continuamente no fundo
let floatingHearts = [];
for (let i = 0; i < 100; i++) {
  floatingHearts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 16 + Math.random() * 20,
    speed: 0.5 + Math.random() * 0.5,
    alpha: 0.4 + Math.random() * 0.6,
  });
}

// Desenha os corações flutuantes do fundo
function drawFloatingHearts() {
  for (let heart of floatingHearts) {
    ctx.font = `${heart.size}px serif`;
    ctx.fillStyle = `rgba(204, 102, 255, ${heart.alpha})`;
    ctx.fillText("💜", heart.x, heart.y);
    heart.y -= heart.speed;
    if (heart.y < -20) {
      heart.y = canvas.height + Math.random() * 50;
      heart.x = Math.random() * canvas.width;
    }
  }
}

// Desenha partículas do texto ao clique
function drawParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    ctx.globalAlpha = p.alpha;
    ctx.font = `${p.size}px monospace`;
    ctx.fillStyle = "#da70d6";
    ctx.fillText(text, p.x, p.y);
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.015;
    if (p.alpha <= 0) particles.splice(i, 1);
  }
  ctx.globalAlpha = 1;
}

// Desenha corações 💜 ao clicar
function drawHearts() {
  ctx.font = "20px serif";
  for (let i = hearts.length - 1; i >= 0; i--) {
    const h = hearts[i];
    ctx.fillStyle = `rgba(221,160,221,${h.alpha})`;
    ctx.fillText("💜", h.x, h.y);
    h.y -= 1;
    h.alpha -= 0.005;
    if (h.alpha <= 0) hearts.splice(i, 1);
  }
}

// Clique adiciona partículas + corações
canvas.addEventListener("click", (e) => {
  for (let i = 0; i < 25; i++) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      alpha: 1,
      size: fontSize + Math.random() * 12,
    });
  }
  for (let i = 0; i < 8; i++) {
    hearts.push({
      x: e.clientX + (Math.random() - 0.5) * 50,
      y: e.clientY + (Math.random() - 0.5) * 50,
      alpha: 1,
    });
  }
});

// Mensagem secreta com duplo clique
canvas.addEventListener("dblclick", () => {
  if (!secretShown) {
    alert("Prometo te amar, cuidar e te fazer sorrir todos os dias 💜");
    secretShown = true;
  }
});

// ✨ Loop principal de animação
function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawFloatingHearts(); // fundo contínuo
  drawParticles(); // texto ao clique
  drawHearts(); // corações ao clique
  requestAnimationFrame(animate);
}
animate();

// Controla música
function toggleMusic() {
  if (music.paused) {
    music.load();
    music.play().catch((e) => console.log("Erro ao tocar música:", e));
  } else {
    music.pause();
  }
}

// Compartilha pelo WhatsApp
function shareLove() {
  const msg = encodeURIComponent(
    "EU TE AMO, MINHA PRETA 💜 Para sempre no meu coração"
  );
  const url = `https://api.whatsapp.com/send?text=${msg}`;
  window.open(url, "_blank");
}

// ⏱️ Contador de tempo real desde o namoro
function startCounter() {
  const startDate = new Date("2024-08-12T00:00:00");
  const counterElement = document.getElementById("day-counter");

  function updateCounter() {
    const now = new Date();
    let diff = now - startDate;

    if (diff < 0) {
      counterElement.textContent = "Ainda não começamos nosso amor...";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);

    const seconds = Math.floor(diff / 1000);

    counterElement.textContent = `Estamos juntos há ${days} dias, ${hours}h ${minutes}m ${seconds}s 💜`;
  }

  updateCounter();
  setInterval(updateCounter, 1000);
}

// Tela cheia no início
function requestFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  else if (el.msRequestFullscreen) el.msRequestFullscreen();
}
