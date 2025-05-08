class ParticleAnimation {
    constructor() {
        this.particles = document.querySelector('.particles');
        this.numberOfParticles = 30;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isRunning = true;
        this.particlePool = [];
        this.init();
        this.setupMouseTracking();
        this.setupPageVisibility();
    }

    init() {
        // Pre-create particle pool
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.createParticle(true);
        }

        // Create glowing orbs
        for (let i = 0; i < 4; i++) {
            this.createGlowingOrb();
        }

        // Start animation loop
        this.animate();

        // Handle page refresh/unload
        window.addEventListener('beforeunload', () => {
            this.isRunning = false;
        });
    }

    setupPageVisibility() {
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.isRunning = false;
            } else {
                this.isRunning = true;
                this.animate();
            }
        });
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    createParticle(isInitial = false) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2 and 8 pixels
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position based on mouse or random
        const offset = Math.random() * 100 - 50;
        const startX = this.mouseX ? this.mouseX + offset : Math.random() * window.innerWidth;
        particle.style.left = `${startX}px`;
        
        // Random animation duration between 8 and 15 seconds
        const duration = Math.random() * 7 + 8;
        particle.style.setProperty('--duration', `${duration}s`);
        
        // Stagger initial animations
        if (isInitial) {
            particle.style.animationDelay = `${Math.random() * duration}s`;
        }
        
        // Random Z translation
        const zTranslate = Math.random() * 200 - 100;
        particle.style.transform = `translateZ(${zTranslate}px)`;
        
        this.particles.appendChild(particle);
        this.particlePool.push(particle);
        
        // Remove and recreate particle after animation ends
        particle.addEventListener('animationend', () => {
            if (this.isRunning) {
                particle.remove();
                this.particlePool = this.particlePool.filter(p => p !== particle);
                this.createParticle();
            }
        });
    }

    createGlowingOrb() {
        const orb = document.createElement('div');
        orb.className = 'glow';
        
        // Random starting position
        orb.style.left = `${Math.random() * 100}%`;
        orb.style.top = `${Math.random() * 100}%`;
        
        // Random size between 150px and 300px
        const size = Math.random() * 150 + 150;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        
        // Continuous animation
        const duration = Math.random() * 10 + 10;
        orb.style.animationDuration = `${duration}s`;
        orb.style.animationDelay = `${Math.random() * duration}s`;
        
        this.particles.appendChild(orb);
    }

    animate() {
        if (!this.isRunning) return;

        // Update particle positions based on mouse movement
        this.particlePool.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const dx = this.mouseX - rect.left;
            const dy = this.mouseY - rect.top;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const angle = Math.atan2(dy, dx);
                const force = (200 - distance) / 200;
                const offsetX = Math.cos(angle) * force * 50;
                const offsetY = Math.sin(angle) * force * 50;
                
                particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animation = new ParticleAnimation();
}); 