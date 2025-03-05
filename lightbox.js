class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = this.lightbox.querySelector('img');
        this.lightboxClose = this.lightbox.querySelector('.lightbox-close');
        this.bindEvents();
    }

    bindEvents() {
        const photoContainers = document.querySelectorAll('.photo-container');
        
        photoContainers.forEach(container => {
            container.addEventListener('click', () => this.open(container));
        });

        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.close();
        });

        this.lightboxClose.addEventListener('click', () => this.close());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isActive()) this.close();
        });
    }

    open(container) {
        const img = container.querySelector('img');
        this.lightboxImg.src = img.src;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    isActive() {
        return this.lightbox.classList.contains('active');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
}); 
