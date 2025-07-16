// Enhanced script with modern AR/VR/XR animations and effects

// Header scroll effect with enhanced animations
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle with smooth animations
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Enhanced FAQ functionality with smooth animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.classList.remove('active');
        
        const toggleIcon = item.querySelector('.faq-toggle i');
        if (toggleIcon) {
            toggleIcon.className = 'fas fa-plus';
        }
        
        const body = item.querySelector('.faq-body');
        if (body) {
            body.style.maxHeight = '0px';
        }
    });
    
    // Add click event listeners
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        
        header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                
                const otherIcon = otherItem.querySelector('.faq-toggle i');
                if (otherIcon) {
                    otherIcon.className = 'fas fa-plus';
                }
                
                const otherBody = otherItem.querySelector('.faq-body');
                if (otherBody) {
                    otherBody.style.maxHeight = '0px';
                }
            });
            
            // If wasn't active, activate it
            if (!isActive) {
                item.classList.add('active');
                
                const icon = item.querySelector('.faq-toggle i');
                if (icon) {
                    icon.className = 'fas fa-times';
                }
                
                const body = item.querySelector('.faq-body');
                if (body) {
                    body.style.maxHeight = body.scrollHeight + 'px';
                }
            }
        });
    });

    // Enhanced particle system
    createEnhancedParticles();
    
    // Setup improved scroll spy
    setupEnhancedScrollSpy();
    
    // Setup animations
    setupEnhancedAnimations();
    
    // Initialize holographic effects
    initializeHolographicEffects();
    
    // Setup parallax effects
    setupParallaxEffects();
});

// Enhanced particle system with AR/VR theme
function createEnhancedParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.6 + 0.2;
        const animDuration = Math.random() * 20 + 15;
        const animDelay = Math.random() * 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.animationDuration = `${animDuration}s`;
        particle.style.animationDelay = `${animDelay}s`;
        
        heroSection.appendChild(particle);
    }
    
    // Add floating geometric shapes
    createFloatingShapes();
}

// Create floating geometric shapes for AR/VR aesthetic
function createFloatingShapes() {
    const shapes = ['◆', '▲', '●', '■', '◇'];
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    for (let i = 0; i < 10; i++) {
        const shape = document.createElement('div');
        shape.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        shape.style.position = 'absolute';
        shape.style.color = 'rgba(0, 255, 136, 0.3)';
        shape.style.fontSize = Math.random() * 20 + 10 + 'px';
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.pointerEvents = 'none';
        shape.style.animation = `float ${Math.random() * 10 + 8}s ease-in-out infinite`;
        shape.style.animationDelay = Math.random() * 5 + 's';
        
        heroSection.appendChild(shape);
    }
}

// Enhanced scroll spy with smooth transitions
function setupEnhancedScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const threshold = 100;
    const headerHeight = document.querySelector('header').offsetHeight;
    
    const sectionPositions = [];
    
    function calculateSectionPositions() {
        sectionPositions.length = 0;
        
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const sectionTop = section.getBoundingClientRect().top + window.scrollY - headerHeight - threshold;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            sectionPositions.push({
                id: sectionId,
                top: sectionTop,
                bottom: sectionBottom
            });
        });
        
        sectionPositions.sort((a, b) => a.top - b.top);
    }
    
    calculateSectionPositions();
    window.addEventListener('resize', calculateSectionPositions);
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY;
        let activeSection = '';
        
        for (let i = 0; i < sectionPositions.length; i++) {
            const section = sectionPositions[i];
            if (scrollPosition >= section.top && scrollPosition < section.bottom) {
                activeSection = section.id;
                break;
            }
        }
        
        if (window.innerHeight + scrollPosition >= document.body.offsetHeight - 50) {
            activeSection = sectionPositions[sectionPositions.length - 1].id;
        }
        
        if (!activeSection && scrollPosition < sectionPositions[0].top) {
            activeSection = sectionPositions[0].id;
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === activeSection) {
                link.classList.add('active');
            }
        });
    }
    
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    updateActiveLink();
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navMenu && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerOffset = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Enhanced animations with intersection observer
function setupEnhancedAnimations() {
    const revealElements = document.querySelectorAll('.fade-in-up');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for grid items
                if (entry.target.parentElement.classList.contains('features-grid') ||
                    entry.target.parentElement.classList.contains('vision-cards')) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// Initialize holographic effects
function initializeHolographicEffects() {
    const cards = document.querySelectorAll('.feature-card, .vision-card, .timeline-content');
    
    cards.forEach(card => {
        card.classList.add('holographic-border');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });
    
    // Add glitch effect to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.classList.add('glitch');
    }
}

// Setup parallax effects
function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-image img, .about-image img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Enhanced mouse tracking for interactive elements
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.feature-card, .vision-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        } else {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        }
    });
});

// Add typing effect for hero subtitle
function initializeTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid var(--primary)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            subtitle.style.borderRight = 'none';
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Initialize all effects when page loads
window.addEventListener('load', function() {
    initializeTypingEffect();
    
    // Add smooth reveal for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Add dynamic color shifting for accent elements
function initializeDynamicColors() {
    const accentElements = document.querySelectorAll('.btn-primary, .timeline-date, .faq-toggle');
    
    setInterval(() => {
        const hue = Math.floor(Math.random() * 60) + 120; // Green spectrum
        const newColor = `hsl(${hue}, 100%, 50%)`;
        
        accentElements.forEach(element => {
            element.style.setProperty('--primary', newColor);
        });
    }, 5000);
}

// Initialize dynamic colors
// initializeDynamicColors();

// Add smooth scrolling enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});