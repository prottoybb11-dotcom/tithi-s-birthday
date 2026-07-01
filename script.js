const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const page4 = document.getElementById('page4');
const page5 = document.getElementById('page5');
const page6 = document.getElementById('page6');
const letsDanceBtn = document.getElementById('letsDanceBtn');
const unlockWishBtn = document.getElementById('unlockWishBtn');
const openMessageBtn = document.getElementById('openMessageBtn');
const nextSurpriseBtn = document.getElementById('nextSurpriseBtn');
const partyAgainBtn = document.getElementById('partyAgainBtn');
const nextMoveBtn = document.getElementById('nextMoveBtn');

// MUSIC
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const startOverlay = document.getElementById('startOverlay');
let musicOn = false;

// Tap to start overlay — dismisses and starts music
startOverlay.addEventListener('click', () => {
  startOverlay.style.opacity = '0';
  setTimeout(() => startOverlay.remove(), 500);
  bgMusic.play().then(() => {
    musicOn = true;
    musicBtn.textContent = '🎵';
    musicBtn.classList.remove('muted');
  });
});

musicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (musicOn) {
    bgMusic.pause();
    musicBtn.textContent = '🔇';
    musicBtn.classList.add('muted');
    musicOn = false;
  } else {
    bgMusic.play();
    musicBtn.textContent = '🎵';
    musicBtn.classList.remove('muted');
    musicOn = true;
  }
});

function goToPage2() {
  page1.classList.add('hidden');
  page2.classList.remove('hidden');
  startConfetti();
}

function goToPage4() {
  page3.classList.add('hidden');
  page4.classList.remove('hidden');
  startRibbons();
}

function goToPage5() {
  page4.classList.add('hidden');
  page5.classList.remove('hidden');
  startFallingFlowers();
  setTimeout(initScratchCards, 100);
}

function goToPage6() {
  page5.classList.add('hidden');
  page6.classList.remove('hidden');
  startFallingStars6();
}

function partyAgain() {
  window.location.reload();
}

letsDanceBtn.addEventListener('click', goToPage2);
nextMoveBtn.addEventListener('click', () => {
  page2.classList.add('hidden');
  page3.classList.remove('hidden');
});
unlockWishBtn.addEventListener('click', goToPage4);
openMessageBtn.addEventListener('click', goToPage5);
nextSurpriseBtn.addEventListener('click', goToPage6);
partyAgainBtn.addEventListener('click', partyAgain);

// Reveal word on dancer click
let clickedCount = 0;

function revealWord(card, word) {
  const span = card.querySelector('.reveal-word');

  if (!span.classList.contains('visible')) {
    clickedCount++;
    span.innerHTML = word;
    span.classList.add('visible');

    // bounce the card
    card.style.transform = 'scale(1.1)';
    setTimeout(() => { card.style.transform = 'scale(1)'; }, 200);

    // Make draggable after a short delay
    setTimeout(() => makeDraggable(span), 300);
  }
}

function makeDraggable(el) {
  let offsetX = 0, offsetY = 0, dragging = false;

  el.addEventListener('mousedown', (e) => {
    dragging = true;
    if (el.style.position !== 'absolute' || el.parentElement !== page2) {
      const r = el.getBoundingClientRect();
      const p2r = page2.getBoundingClientRect();
      el.style.position = 'absolute';
      el.style.left = (r.left - p2r.left) + 'px';
      el.style.top = (r.top - p2r.top) + 'px';
      el.style.width = r.width + 'px';
      el.style.height = r.height + 'px';
      el.style.zIndex = '999';
      page2.appendChild(el);
    }
    offsetX = e.clientX - el.getBoundingClientRect().left + page2.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top + page2.getBoundingClientRect().top;
    el.style.cursor = 'grabbing';
    e.stopPropagation();
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const p2r = page2.getBoundingClientRect();
    el.style.left = (e.clientX - p2r.left - offsetX) + 'px';
    el.style.top = (e.clientY - p2r.top - offsetY) + 'px';
  });

  document.addEventListener('mouseup', () => {
    dragging = false;
    el.style.cursor = 'grab';
  });

  el.addEventListener('touchstart', (e) => {
    dragging = true;
    if (el.style.position !== 'absolute' || el.parentElement !== page2) {
      const r = el.getBoundingClientRect();
      const p2r = page2.getBoundingClientRect();
      el.style.position = 'absolute';
      el.style.left = (r.left - p2r.left) + 'px';
      el.style.top = (r.top - p2r.top) + 'px';
      el.style.width = r.width + 'px';
      el.style.height = r.height + 'px';
      el.style.zIndex = '999';
      page2.appendChild(el);
    }
    offsetX = e.touches[0].clientX - el.getBoundingClientRect().left + page2.getBoundingClientRect().left;
    offsetY = e.touches[0].clientY - el.getBoundingClientRect().top + page2.getBoundingClientRect().top;
    e.stopPropagation();
  }, { passive: true });

  el.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const p2r = page2.getBoundingClientRect();
    el.style.left = (e.touches[0].clientX - p2r.left - offsetX) + 'px';
    el.style.top = (e.touches[0].clientY - p2r.top - offsetY) + 'px';
    e.preventDefault();
  }, { passive: false });

  el.addEventListener('touchend', () => { dragging = false; });
}

// Confetti
function startConfetti() {
  const container = document.getElementById('confettiContainer');
  const colors = ['#ff6bcb', '#ffd700', '#00e5ff', '#ff4545', '#a3ff70', '#ffffff', '#ff9a00'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = '-20px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (Math.random() * 3 + 2) + 's';
    piece.style.animationDelay = (Math.random() * 4) + 's';
    piece.style.width = (Math.random() * 6 + 5) + 'px';
    piece.style.height = (Math.random() * 8 + 10) + 'px';
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(piece);
  }
}

// CAROUSEL
let currentSlide = 0;
const track = document.getElementById('carouselTrack');
const dots = document.querySelectorAll('.dot');
const totalSlides = 4;

function updateCarousel() {
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    updateCarousel();
  });
});

// Touch swipe support
let startX = 0;
track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;
  
  if (diff > 50 && currentSlide < totalSlides - 1) {
    currentSlide++;
    updateCarousel();
  } else if (diff < -50 && currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }
});


// FALLING RIBBONS for page 4
function startRibbons() {
  const colors = ['#ff6bcb', '#c77dff', '#ffd700', '#00e5ff', '#ff4545', '#a3ff70'];
  for (let i = 0; i < 80; i++) {
    const ribbon = document.createElement('div');
    ribbon.classList.add('ribbon-piece');
    ribbon.style.left = Math.random() * 100 + 'vw';
    ribbon.style.top = '-40px';
    ribbon.style.background = colors[Math.floor(Math.random() * colors.length)];
    ribbon.style.height = (Math.random() * 40 + 30) + 'px';
    ribbon.style.animationDuration = (Math.random() * 4 + 3) + 's';
    ribbon.style.animationDelay = (Math.random() * 5) + 's';
    page4.appendChild(ribbon);
  }
}


// FALLING FLOWERS for page 5
function startFallingFlowers() {
  const container = document.getElementById('fallingFlowers');
  const colors = ['#ff9de2', '#c77dff', '#ff6bcb', '#a3ff70', '#ffd700', '#00e5ff', '#ff8fab'];
  for (let i = 0; i < 120; i++) {
    const petal = document.createElement('div');
    petal.classList.add('fall-flower');
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.top = '-20px';
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];
    petal.style.width = (Math.random() * 8 + 6) + 'px';
    petal.style.height = (Math.random() * 8 + 6) + 'px';
    petal.style.animationDuration = (Math.random() * 2 + 1) + 's';
    petal.style.animationDelay = (Math.random() * 3) + 's';
    container.appendChild(petal);
  }
}


// FALLING GLOWING DOTS for page 6
function startFallingStars6() {
  const container = document.getElementById('fallingStars6');
  const colors = ['#ffffff', '#ffd700', '#ff69b4', '#00ffff', '#c77dff', '#ff8fab'];
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.classList.add('star6-piece');
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = '-10px';
    star.style.background = colors[Math.floor(Math.random() * colors.length)];
    star.style.width = (Math.random() * 5 + 3) + 'px';
    star.style.height = star.style.width;
    star.style.boxShadow = `0 0 6px 2px ${colors[Math.floor(Math.random() * colors.length)]}`;
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    star.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(star);
  }
}


// SCRATCH CARDS
function initScratchCards() {
  const canvases = document.querySelectorAll('.scratch-canvas');
  canvases.forEach(canvas => {
    const wrap = canvas.parentElement;
    const label = wrap.querySelector('.scratch-label');
    const rect = wrap.getBoundingClientRect();

    canvas.width = wrap.offsetWidth;
    canvas.height = wrap.offsetHeight;

    const ctx = canvas.getContext('2d');

    // Fill with gradient scratch layer
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#c77dff');
    grad.addColorStop(1, '#ff69b4');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isScratching = false;
    let totalPixels = canvas.width * canvas.height;
    let scratchedEnough = false;

    function scratch(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fill();

      // Hide label as soon as scratching starts
      label.style.display = 'none';

      // Check if enough scratched
      if (!scratchedEnough) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let cleared = 0;
        for (let i = 3; i < imageData.data.length; i += 4) {
          if (imageData.data[i] === 0) cleared++;
        }
        if (cleared / totalPixels > 0.5) {
          scratchedEnough = true;
          canvas.style.transition = 'opacity 0.5s';
          canvas.style.opacity = '0';
          setTimeout(() => canvas.remove(), 500);
        }
      }
    }

    function getPos(e, canvas) {
      const r = canvas.getBoundingClientRect();
      if (e.touches) {
        return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
      }
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    canvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(...Object.values(getPos(e, canvas))); });
    canvas.addEventListener('mousemove', (e) => { if (isScratching) scratch(...Object.values(getPos(e, canvas))); });
    canvas.addEventListener('mouseup', () => isScratching = false);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); isScratching = true; const p = getPos(e, canvas); scratch(p.x, p.y); }, { passive: false });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if (isScratching) { const p = getPos(e, canvas); scratch(p.x, p.y); } }, { passive: false });
    canvas.addEventListener('touchend', () => isScratching = false);
  });
}
