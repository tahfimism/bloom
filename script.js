window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.remove("not-loaded");
    
    // After 8.5 seconds (blooming complete), move right and start typing
    setTimeout(() => {
      document.body.classList.add("move-right");
      startTypewriter();
    }, 8500);
  }, 500);

  // Initialize twilight garden effects
  initTwilightGarden();
});

function startTypewriter() {
  const textElement = document.getElementById("typewriter-text");
  const message = "We are all just seeds\nwaiting for our own season\nof twilight.\n\n";
  let index = 0;

  function type() {
    if (index < message.length) {
      textElement.textContent += message.charAt(index);
      index++;
      setTimeout(type, 70); // Adjust typing speed here
    }
  }

  type();
}

function initTwilightGarden() {
  const starsContainer = document.querySelector('.stars-container');
  const firefliesContainer = document.querySelector('.fireflies-container');
  const cursorGlow = document.querySelector('.cursor-glow');
  const flowers = document.querySelector('.flowers');
  
  if (!starsContainer || !firefliesContainer) return;

  // 1. Generate Deep Background Stars (static box-shadow for performance)
  const deepStars = document.createElement('div');
  deepStars.className = 'deep-stars';
  let shadows = [];
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * 110 - 5; // spread wider for parallax
    const y = Math.random() * 85;
    const size = Math.random() * 1.2 + 0.4;
    const opacity = Math.random() * 0.4 + 0.15;
    shadows.push(`${x}vw ${y}vh ${Math.random() * 0.5}px rgba(220, 200, 255, ${opacity})`);
  }
  deepStars.style.boxShadow = shadows.join(', ');
  starsContainer.appendChild(deepStars);

  // 2. Generate Twinkling Mid-ground Stars
  for (let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 65}vh`;
    star.style.setProperty('--duration', `${Math.random() * 4 + 3}s`);
    star.style.setProperty('--delay', `${Math.random() * -5}s`);
    starsContainer.appendChild(star);
  }

  // 3. Generate Bright Stars
  for (let i = 0; i < 8; i++) {
    const star = document.createElement('div');
    star.className = 'star star--bright';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 50}vh`;
    star.style.setProperty('--duration', `${Math.random() * 2 + 1.5}s`);
    star.style.setProperty('--delay', `${Math.random() * -3}s`);
    
    const colors = ['#ffd89e', '#a8c8ff', '#f0e6ff'];
    star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    starsContainer.appendChild(star);
  }

  // 4. Shooting Stars
  function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = `${Math.random() * 60 + 10}vw`;
    star.style.top = `${Math.random() * 30 + 5}vh`;
    star.style.setProperty('--speed', `${Math.random() * 0.6 + 0.8}s`);
    star.style.setProperty('--angle', `${Math.random() * 25 + 15}deg`);
    starsContainer.appendChild(star);
    setTimeout(() => star.remove(), 1600);
  }

  function scheduleShootingStar() {
    setTimeout(() => {
      createShootingStar();
      scheduleShootingStar();
    }, Math.random() * 10000 + 12000); // 12-22 seconds
  }
  scheduleShootingStar();

  // 5. Generate Fireflies
  for (let i = 0; i < 20; i++) {
    const ff = document.createElement('div');
    ff.className = 'firefly';
    ff.style.left = `${Math.random() * 100}vw`;
    ff.style.top = `${Math.random() * 55 + 35}vh`;
    ff.style.setProperty('--duration', `${Math.random() * 8 + 8}s`);
    ff.style.setProperty('--delay', `${Math.random() * -12}s`);
    ff.style.setProperty('--tx', `${Math.random() * 80 - 40}px`);
    ff.style.setProperty('--ty', `${Math.random() * -80 - 30}px`);
    
    if (Math.random() > 0.6) {
      ff.classList.add('firefly--lavender');
    }
    firefliesContainer.appendChild(ff);
  }

  // 6. Mouse Parallax & Glow Follower
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    targetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    
    if (cursorGlow) {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
      cursorGlow.style.opacity = 1;
    }
  });

  window.addEventListener('mouseleave', () => {
    if (cursorGlow) cursorGlow.style.opacity = 0;
  });

  function updateParallax() {
    if (!isMobile) {
      // Lerp logic (0.06 factor for extra smooth drift)
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      // Deepest: Stars shift opposite to cursor
      if (starsContainer) {
        starsContainer.style.transform = `translate(${mouseX * -15}px, ${mouseY * -10}px)`;
      }

      // Midground: Flowers shift slightly towards cursor (preserves the 0.9 scale)
      if (flowers) {
        flowers.style.transform = `scale(0.9) translate(${mouseX * 15}px, ${mouseY * 8}px)`;
      }

      // Foreground: Fireflies shift more towards cursor
      if (firefliesContainer) {
        firefliesContainer.style.transform = `translate(${mouseX * 30}px, ${mouseY * 18}px)`;
      }
    }
    requestAnimationFrame(updateParallax);
  }
  updateParallax();
}
