// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Completely rewritten FAQ functionality to ensure no glitches
document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Add an explicit initialization for all FAQ items
    faqItems.forEach(item => {
        // Ensure all items start closed
        item.classList.remove('active');
        
        // Make sure all toggle icons are plus
        const toggleIcon = item.querySelector('.faq-toggle i');
        if (toggleIcon) {
            toggleIcon.className = 'fas fa-plus';
        }
        
        // Explicitly set max-height to 0 on all bodies
        const body = item.querySelector('.faq-body');
        if (body) {
            body.style.maxHeight = '0px';
        }
    });
    
    // Add click event listeners to each FAQ header
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        
        header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            
            // First check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close ALL items first
            faqItems.forEach(otherItem => {
                // Remove active class
                otherItem.classList.remove('active');
                
                // Reset icon
                const otherIcon = otherItem.querySelector('.faq-toggle i');
                if (otherIcon) {
                    otherIcon.className = 'fas fa-plus';
                }
                
                // Collapse content
                const otherBody = otherItem.querySelector('.faq-body');
                if (otherBody) {
                    otherBody.style.maxHeight = '0px';
                }
            });
            
            // If the clicked item wasn't active before, now activate it
            if (!isActive) {
                // Add active class
                item.classList.add('active');
                
                // Change icon to X
                const icon = item.querySelector('.faq-toggle i');
                if (icon) {
                    icon.className = 'fas fa-times';
                }
                
                // Expand content
                const body = item.querySelector('.faq-body');
                if (body) {
                    body.style.maxHeight = body.scrollHeight + 'px';
                }
            }
        });
    });

    // Particle effect for hero section
    createParticles();
    
    // Set up IMPROVED scroll spy for navigation
    setupScrollSpy();
    
    // Set up code copy buttons
    setupCodeCopy();
    
    // Set up animations
    setupAnimations();
});

// Particle effect for the hero section
function createParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 5 + 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        const animDuration = Math.random() * 10 + 10;
        const animDelay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.animation = `float ${animDuration}s ease-in-out ${animDelay}s infinite alternate`;
        
        heroSection.appendChild(particle);
    }
}

// COMPLETELY REWRITTEN scroll spy functionality
function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Use a smaller threshold for better accuracy - reduce from 200 to 100
    const threshold = 100;
    const headerHeight = document.querySelector('header').offsetHeight;
    
    // Create an array to store section positions for better performance
    const sectionPositions = [];
    
    // Function to calculate and store section positions
    function calculateSectionPositions() {
      sectionPositions.length = 0; // Clear array
      
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
      
      // Sort sections by position from top to bottom
      sectionPositions.sort((a, b) => a.top - b.top);
    }
    
    // Call once to initialize
    calculateSectionPositions();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateSectionPositions);
    
    // Improved function to update active nav link
    function updateActiveLink() {
      const scrollPosition = window.scrollY;
      let activeSection = '';
      
      // Find the section that's currently in view
      for (let i = 0; i < sectionPositions.length; i++) {
        const section = sectionPositions[i];
        if (scrollPosition >= section.top && scrollPosition < section.bottom) {
          activeSection = section.id;
          break;
        }
      }
      
      // If we're at the bottom of the page, activate the last section
      if (window.innerHeight + scrollPosition >= document.body.offsetHeight - 50) {
        activeSection = sectionPositions[sectionPositions.length - 1].id;
      }
      
      // If no section is active and we're at the top, activate the first one
      if (!activeSection && scrollPosition < sectionPositions[0].top) {
        activeSection = sectionPositions[0].id;
      }
      
      // Update active class on navigation links
      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1); // Remove #
        if (href === activeSection) {
          link.classList.add('active');
        }
      });
    }
    
    // Update on scroll - use requestAnimationFrame for better performance
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
    
    // Initial check
    updateActiveLink();
    
    // Improved navigation click handler
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
        
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            // Get fresh measurements for accuracy
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

// Setup code copy functionality
function setupCodeCopy() {
    const copyButtons = document.querySelectorAll('.code-copy');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.closest('.code-block');
            if (!codeBlock) return;
            
            const code = codeBlock.querySelector('pre').textContent;
            
            navigator.clipboard.writeText(code).then(() => {
                // Change button icon temporarily to show success
                const originalIcon = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                
                setTimeout(() => {
                    button.innerHTML = originalIcon;
                }, 2000);
            });
        });
    });
}

// Setup reveal animations on scroll
function setupAnimations() {
    const revealElements = document.querySelectorAll('.fade-in-up');
    
    // Initialize elements as hidden
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Function to reveal elements as they enter the viewport
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check to reveal elements already in view
    revealOnScroll();
}

// Add terminal typing effect for any terminal elements
function initializeTerminalEffect() {
    const terminalElements = document.querySelectorAll('.terminal-text');
    
    terminalElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        typeWriter();
    });
}

// Call terminal effect on load
document.addEventListener('DOMContentLoaded', function() {
    initializeTerminalEffect();
});
