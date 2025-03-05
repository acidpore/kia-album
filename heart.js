class HeartManager {
    constructor() {
        this.animations = ['float1', 'float2', 'float3'];
        this.heartPath = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
        this.container = document.body; // Mengubah container ke body
    }

    createHeart() {
        const heart = document.createElement('div');
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        this.setupSVG(svg, path);
        this.setupHeart(heart);
        this.applyRandomProperties(heart);
        
        this.container.appendChild(heart);
        
        // Hapus hati setelah 3 detik
        setTimeout(() => {
            heart.remove();
        }, 3000);

        setTimeout(() => heart.classList.add('spawn'), 100);
    }

    setupSVG(svg, path) {
        svg.setAttribute('viewBox', '0 0 24 24');
        path.setAttribute('d', this.heartPath);
        svg.appendChild(path);
    }

    setupHeart(heart) {
        heart.className = 'heart';
        heart.appendChild(this.createSVG());
        heart.classList.add(`color-${Math.floor(this.getRandomNumber(1, 6))}`);
    }

    applyRandomProperties(heart) {
        const bottom = 5; // Mulai dari bawah layar
        const left = this.getRandomNumber(0, 100);
        const size = this.getRandomNumber(30, 60); // Ukuran lebih besar
        
        heart.style.bottom = `${bottom}%`;
        heart.style.left = `${left}%`;
        heart.style.animation = `${this.getRandomAnimation()} 3s forwards ease-out`; // Durasi tetap 3 detik
        
        const svg = heart.querySelector('svg');
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

    startAutoSpawn() {
        // Spawn 10 hati per detik
        setInterval(() => {
            this.createHeart();
        }, 100); // 1000ms / 10 = 100ms interval
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const heartManager = new HeartManager();
    heartManager.startAutoSpawn();
}); 