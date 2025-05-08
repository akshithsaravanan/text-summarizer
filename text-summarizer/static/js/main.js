document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('summarizer-form');
    const textarea = form.querySelector('textarea');
    const submitBtn = form.querySelector('.submit-btn');
    const loadingElement = document.querySelector('.loading');
    const container = document.querySelector('.container');
    const title = document.querySelector('h2');

    // Typing effect for title
    const text = title.textContent;
    title.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            title.innerHTML += `<span style="animation: glow 1s ${i * 0.1}s ease-in-out">${text.charAt(i)}</span>`;
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);

    // Interactive particles on mouse move
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.85) { // Throttle particle creation
            createInteractiveParticle(e.clientX, e.clientY);
        }
    });

    function createInteractiveParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'interactive-particle';
        particle.style.cssText = `
            position: fixed;
            pointer-events: none;
            width: 4px;
            height: 4px;
            background: var(--accent-color);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            opacity: 0.8;
            transform: scale(1);
            transition: all 0.5s ease;
        `;
        document.body.appendChild(particle);

        // Animate particle
        setTimeout(() => {
            particle.style.transform = `scale(0)`;
            particle.style.opacity = '0';
        }, 50);

        // Remove particle
        setTimeout(() => particle.remove(), 550);
    }

    // Add character counter
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.style.cssText = `
        text-align: right;
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-top: -1rem;
        margin-bottom: 1rem;
        opacity: 0.7;
        transition: all 0.3s ease;
    `;
    textarea.parentNode.insertBefore(charCounter, textarea.nextSibling);

    // Update character count with animation
    function updateCharCount() {
        const count = textarea.value.length;
        charCounter.textContent = `${count} characters`;
        charCounter.style.color = count > 5000 ? '#ff4444' : 'var(--text-secondary)';
        charCounter.style.transform = 'scale(1.1)';
        setTimeout(() => charCounter.style.transform = 'scale(1)', 150);
    }

    textarea.addEventListener('input', updateCharCount);
    updateCharCount();

    // Add auto-resize to textarea with smooth animation
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Enhanced form submission with ripple effect
    form.addEventListener('submit', function(e) {
        if (!textarea.value.trim()) {
            e.preventDefault();
            textarea.classList.add('shake');
            setTimeout(() => textarea.classList.remove('shake'), 500);
            return;
        }

        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        submitBtn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1000);

        submitBtn.disabled = true;
        loadingElement.style.display = 'block';
        container.style.opacity = '0.7';
        
        submitBtn.innerHTML = `
            <span style="display: inline-flex; align-items: center;">
                Processing
                <span class="dots">...</span>
            </span>
        `;
    });

    // Add CSS for new animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        
        .shake {
            animation: shake 0.5s ease-in-out;
            border-color: #ff4444 !important;
        }

        @keyframes dots {
            0%, 20% { content: '.'; }
            40%, 60% { content: '..'; }
            80%, 100% { content: '...'; }
        }
        
        .dots {
            animation: dots 1.5s infinite;
            width: 1.5em;
            display: inline-block;
            text-align: left;
        }

        @keyframes glow {
            0% { text-shadow: 0 0 0 var(--accent-color); }
            50% { text-shadow: 0 0 10px var(--accent-color); }
            100% { text-shadow: 0 0 0 var(--accent-color); }
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 1s linear;
            pointer-events: none;
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .interactive-particle {
            z-index: 1000;
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll to summary with enhanced animation
    const summaryBox = document.querySelector('.summary-box');
    if (summaryBox) {
        setTimeout(() => {
            summaryBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            summaryBox.style.transform = 'scale(0.95)';
            setTimeout(() => {
                summaryBox.style.transform = 'scale(1)';
            }, 300);
        }, 500);
    }
}); 