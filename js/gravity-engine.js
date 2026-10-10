/**
 * Axion Designs — Anti-Gravity Physics Engine
 * Handles floating physics, 3D card tilt physics,
 * ambient cursor tracking, and hero parallax.
 */

class GravityEngine {
  constructor() {
    this.gravityValue = 0.0; // Pure weightless Zero-G default for Obsidian & Cyan Aurora
    this.root = document.documentElement;
    this.heroSection = document.getElementById('home');
    this.heroBgImg = document.getElementById('hero-bg-img');
    this.heroGlow = document.getElementById('hero-ambient-glow');
    this.cursorGlow = document.getElementById('cursor-glow');
    this.projectCards = document.querySelectorAll('.project-card');

    this.mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.cursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    this.init();
  }

  init() {
    this.setupCursorTracking();
    this.setupCardPhysics();
    this.setupHeroParallax();
    this.applyZeroGravityState();
  }

  applyZeroGravityState() {
    // Pure weightless levitation parameters
    this.root.style.setProperty('--levitation-distance', '-16px');
    this.root.style.setProperty('--levitation-duration', '4.2s');
    this.root.style.setProperty('--accent-cyan', '#00F2FE');
    this.root.style.setProperty('--accent-cyan-rgb', '0, 242, 254');
    this.root.style.setProperty('--accent-cyan-glow', 'rgba(0, 242, 254, 0.55)');

    if (this.heroGlow) {
      this.heroGlow.style.opacity = '0.85';
      this.heroGlow.style.transform = 'scale(1.15)';
    }
  }

  setupCursorTracking() {
    window.addEventListener('pointermove', (e) => {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY;
    });

    const loop = () => {
      if (this.cursorGlow) {
        // Smooth inertia trailing
        this.cursorPos.x += (this.mousePos.x - this.cursorPos.x) * 0.12;
        this.cursorPos.y += (this.mousePos.y - this.cursorPos.y) * 0.12;
        this.cursorGlow.style.left = `${this.cursorPos.x}px`;
        this.cursorGlow.style.top = `${this.cursorPos.y}px`;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  setupCardPhysics() {
    this.projectCards.forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-14px)`;
      });

      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  setupHeroParallax() {
    if (!this.heroSection) return;

    this.heroSection.addEventListener('pointermove', (e) => {
      const rect = this.heroSection.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      if (this.heroBgImg) {
        this.heroBgImg.style.transform = `scale(1.04) translate(${relX * -18}px, ${relY * -14}px)`;
      }
      if (this.heroGlow) {
        this.heroGlow.style.transform = `translate(${relX * 40}px, ${relY * 30}px) scale(1.15)`;
      }
    });

    this.heroSection.addEventListener('pointerleave', () => {
      if (this.heroBgImg) {
        this.heroBgImg.style.transform = 'scale(1.02)';
      }
      if (this.heroGlow) {
        this.heroGlow.style.transform = 'scale(1)';
      }
    });
  }
}

export default GravityEngine;
