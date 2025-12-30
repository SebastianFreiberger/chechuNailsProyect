/* ============================================
   JAVASCRIPT PRINCIPAL - ChechUñas
   ============================================ */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los módulos
    Loader.init();
    Navigation.init();
    ScrollEffects.init();
    Gallery.init();
    Testimonials.init();
    ContactForm.init();
    Animations.init();
});

/* ========== LOADER ========== */
const Loader = {
    init() {
        const loader = document.querySelector('.loader');
        if (!loader) return;
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 500);
        });
    }
};

/* ========== NAVEGACIÓN ========== */
const Navigation = {
    init() {
        this.header = document.querySelector('.header');
        this.mobileBtn = document.querySelector('.mobile-menu-btn');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-menu a');
        
        this.bindEvents();
        this.handleScroll();
    },
    
    bindEvents() {
        // Toggle menú móvil
        if (this.mobileBtn) {
            this.mobileBtn.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Cerrar menú al hacer clic en un enlace
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Scroll effects
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Active link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());
    },
    
    toggleMobileMenu() {
        this.mobileBtn.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : 'auto';
    },
    
    closeMobileMenu() {
        this.mobileBtn?.classList.remove('active');
        this.navMenu?.classList.remove('active');
        document.body.style.overflow = 'auto';
    },
    
    handleScroll() {
        if (window.scrollY > 100) {
            this.header?.classList.add('scrolled');
        } else {
            this.header?.classList.remove('scrolled');
        }
    },
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-menu a[href="#${id}"]`);
            
            if (scrollPos >= top && scrollPos < top + height) {
                this.navLinks.forEach(l => l.classList.remove('active'));
                link?.classList.add('active');
            }
        });
    }
};

/* ========== EFECTOS DE SCROLL ========== */
const ScrollEffects = {
    init() {
        this.scrollTopBtn = document.querySelector('.scroll-top');
        this.bindEvents();
    },
    
    bindEvents() {
        // Mostrar/ocultar botón scroll to top
        window.addEventListener('scroll', () => this.toggleScrollTopBtn());
        
        // Click en scroll to top
        this.scrollTopBtn?.addEventListener('click', () => this.scrollToTop());
        
        // Smooth scroll para anchors
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.smoothScroll(e));
        });
    },
    
    toggleScrollTopBtn() {
        if (window.scrollY > 500) {
            this.scrollTopBtn?.classList.add('visible');
        } else {
            this.scrollTopBtn?.classList.remove('visible');
        }
    },
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },
    
    smoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
};

/* ========== GALERÍA ========== */
const Gallery = {
    currentIndex: 0,
    images: [],
    
    init() {
        this.lightbox = document.querySelector('.lightbox');
        this.lightboxImg = document.querySelector('.lightbox-content img');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        
        if (!this.galleryItems.length) return;
        
        this.images = Array.from(this.galleryItems).map(item => 
            item.querySelector('img').src
        );
        
        this.bindEvents();
    },
    
    bindEvents() {
        // Abrir lightbox
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => this.openLightbox(index));
        });
        
        // Cerrar lightbox
        document.querySelector('.lightbox-close')?.addEventListener('click', () => this.closeLightbox());
        this.lightbox?.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.closeLightbox();
        });
        
        // Navegación
        document.querySelector('.lightbox-prev')?.addEventListener('click', () => this.prevImage());
        document.querySelector('.lightbox-next')?.addEventListener('click', () => this.nextImage());
        
        // Teclado
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Touch/swipe para móviles
        this.setupTouchEvents();
    },
    
    openLightbox(index) {
        this.currentIndex = index;
        this.updateLightboxImage();
        this.lightbox?.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    closeLightbox() {
        this.lightbox?.classList.remove('active');
        document.body.style.overflow = 'auto';
    },
    
    updateLightboxImage() {
        if (this.lightboxImg) {
            this.lightboxImg.src = this.images[this.currentIndex];
        }
    },
    
    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateLightboxImage();
    },
    
    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateLightboxImage();
    },
    
    handleKeyboard(e) {
        if (!this.lightbox?.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                this.closeLightbox();
                break;
            case 'ArrowLeft':
                this.prevImage();
                break;
            case 'ArrowRight':
                this.nextImage();
                break;
        }
    },
    
    setupTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.lightbox?.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.lightbox?.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    },
    
    handleSwipe(startX, endX) {
        const diff = startX - endX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextImage();
            } else {
                this.prevImage();
            }
        }
    }
};

/* ========== TESTIMONIOS SLIDER ========== */
const Testimonials = {
    currentSlide: 0,
    autoplayInterval: null,
    
    init() {
        this.slider = document.querySelector('.testimonials-slider');
        this.slides = document.querySelectorAll('.testimonial-card');
        this.dots = document.querySelectorAll('.slider-dot');
        
        if (!this.slides.length) return;
        
        this.bindEvents();
        this.startAutoplay();
    },
    
    bindEvents() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pausar autoplay en hover
        this.slider?.addEventListener('mouseenter', () => this.stopAutoplay());
        this.slider?.addEventListener('mouseleave', () => this.startAutoplay());
    },
    
    goToSlide(index) {
        this.slides.forEach(slide => slide.style.display = 'none');
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        this.currentSlide = index;
        this.slides[index].style.display = 'block';
        this.dots[index]?.classList.add('active');
    },
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    },
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
    },
    
    stopAutoplay() {
        clearInterval(this.autoplayInterval);
    }
};

/* ========== FORMULARIO DE CONTACTO ========== */
const ContactForm = {
    init() {
        this.form = document.querySelector('.contact-form form');
        if (!this.form) return;
        
        this.bindEvents();
    },
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Validación en tiempo real
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    },
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'Este campo es requerido';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un email válido';
            }
        } else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un teléfono válido';
            }
        }
        
        if (!isValid) {
            this.showError(field, errorMessage);
        }
        
        return isValid;
    },
    
    showError(field, message) {
        this.clearError(field);
        field.style.borderColor = '#e91e63';
        
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        error.style.cssText = 'color: #e91e63; font-size: 0.875rem; display: block; margin-top: 0.25rem;';
        
        field.parentNode.appendChild(error);
    },
    
    clearError(field) {
        field.style.borderColor = '';
        const error = field.parentNode.querySelector('.error-message');
        if (error) error.remove();
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        const inputs = this.form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            // Simular envío
            const submitBtn = this.form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            setTimeout(() => {
                submitBtn.textContent = '¡Mensaje Enviado!';
                submitBtn.style.background = '#4caf50';
                
                setTimeout(() => {
                    this.form.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    
                    this.showNotification('¡Gracias! Te contactaremos pronto.', 'success');
                }, 2000);
            }, 1500);
        }
    },
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : '#e91e63'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

/* ========== ANIMACIONES AL SCROLL ========== */
const Animations = {
    init() {
        this.animatedElements = document.querySelectorAll('[data-animate]');
        
        if (!this.animatedElements.length) return;
        
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        
        this.animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            this.observer.observe(el);
        });
    },
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || 0;
                
                setTimeout(() => {
                    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, delay);
                
                this.observer.unobserve(el);
            }
        });
    }
};

/* ========== UTILIDADES ========== */
const Utils = {
    // Debounce para optimizar eventos frecuentes
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle para limitar ejecuciones
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Añadir estilos de animación dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
