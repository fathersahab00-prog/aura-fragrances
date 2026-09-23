/**
 * AURA FRAGRANCES BY FRIENDS - Subtle Luxury Gold Particles
 * Creates an elegant, ambient gold dust shimmer in the hero section.
 */

(function () {
  const canvas = document.getElementById("hero-particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let animationFrameId;
  let width, height;

  const PARTICLE_COUNT = window.innerWidth < 768 ? 28 : 50;

  function resizeCanvas() {
    const parent = canvas.parentElement;
    width = canvas.width = parent.offsetWidth;
    height = canvas.height = parent.offsetHeight;
  }

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.radius = Math.random() * 1.6 + 0.6; // 0.6px to 2.2px
      this.speedY = Math.random() * 0.35 + 0.15; // slow graceful ascent
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.baseOpacity = Math.random() * 0.4 + 0.15; // subtle luxury glow
      this.opacity = this.baseOpacity;
      this.pulseSpeed = Math.random() * 0.015 + 0.005;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.pulsePhase += this.pulseSpeed;
      this.opacity = this.baseOpacity + Math.sin(this.pulsePhase) * 0.15;

      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset(false);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 164, 93, ${Math.max(0.05, Math.min(1, this.opacity))})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#F0D58D";
      ctx.fill();
      ctx.shadowBlur = 0; // reset shadow for performance
    }
  }

  function init() {
    resizeCanvas();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
  });

  // Observe visibility to save GPU resources when not in view
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!animationFrameId) animate();
        } else {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      });
    });
    observer.observe(canvas.parentElement);
  }

  init();
  animate();
})();
