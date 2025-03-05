class ButterflyManager {
    constructor() {
        this.animations = ['fly1', 'fly2', 'fly3', 'fly4', 'fly5'];
        this.butterflyPath = 'M50 30 L70 10 Q90 10 70 30 L50 50 L30 30 Q10 10 30 10 L50 30 M50 50 L70 70 Q90 90 70 90 L50 70 L30 90 Q10 90 30 70 L50 50';
    }

    createButterfly(page) {
        const butterfly = document.createElement('div');
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        this.setupSVG(svg, path);
        this.setupButterfly(butterfly);
        this.applyRandomProperties(butterfly);
        
        page.appendChild(butterfly);
        setTimeout(() => butterfly.classList.add('spawn'), 100);
    }

    setupSVG(svg, path) {
        svg.setAttribute('viewBox', '0 0 100 100');
        path.setAttribute('d', this.butterflyPath);
        svg.appendChild(path);
    }

    setupButterfly(butterfly) {
        butterfly.className = 'butterfly';
        butterfly.appendChild(this.createSVG());
        butterfly.classList.add(`color-${this.getRandomNumber(1, 8)}`);
    }

    applyRandomProperties(butterfly) {
        const top = this.getRandomNumber(0, 100);
        const left = this.getRandomNumber(0, 100);
        const size = this.getRandomNumber(30, 50);
        const duration = this.getRandomNumber(15, 35);
        
        butterfly.style.top = `${top}%`;
        butterfly.style.left = `${left}%`;
        butterfly.style.animation = `${this.getRandomAnimation()} ${duration}s infinite ease-in-out`;
        
        const svg = butterfly.querySelector('svg');
        svg.style.width = `${size}px`;
        svg.style.height = `${size}px`;
    }

    createSVG() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.setupSVG(svg, path);
        return svg;
    }

    getRandomAnimation() {
        return this.animations[Math.floor(Math.random() * this.animations.length)];
    }

    getRandomNumber(min, max) {
        return min + Math.random() * (max - min);
    }

    spawnButterflies() {
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            const count = this.getRandomNumber(5, 9);
            for(let i = 0; i < count; i++) {
                setTimeout(() => this.createButterfly(page), i * 300);
            }
        });
    }

    startAutoSpawn() {
        setInterval(() => {
            const pages = document.querySelectorAll('.page');
            const randomPage = pages[Math.floor(Math.random() * pages.length)];
            this.createButterfly(randomPage);
        }, 10000);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const butterflyManager = new ButterflyManager();
    butterflyManager.spawnButterflies();
    butterflyManager.startAutoSpawn();
}); 