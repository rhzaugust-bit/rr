// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .animated-card, .animated-contact, .stat');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Form submission handler
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Create WhatsApp message
    const whatsappMessage = `Olá Rhian! Meu nome é ${name} (${email}) e gostaria de conversar sobre:\n\n${message}`;
    const whatsappUrl = `https://wa.me/5531999162893?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    contactForm.reset();
    
    // Show success feedback
    showNotification('Mensagem enviada com sucesso! Redirecionando para o WhatsApp...', 'success');
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--primary-color)' : 'var(--secondary-color)'};
        color: var(--dark-bg);
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for aurora background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const aurora1 = document.querySelector('.aurora-1');
    const aurora2 = document.querySelector('.aurora-2');
    const aurora3 = document.querySelector('.aurora-3');
    
    if (aurora1) aurora1.style.transform = `translateY(${scrolled * 0.5}px)`;
    if (aurora2) aurora2.style.transform = `translateY(${scrolled * 0.3}px)`;
    if (aurora3) aurora3.style.transform = `translateY(${scrolled * 0.7}px)`;
});

// Dynamic cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    transform: translate(-50%, -50%);
`;
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
cursorFollower.style.cssText = `
    position: fixed;
    width: 40px;
    height: 40px;
    background: rgba(0, 255, 136, 0.1);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: all 0.3s ease;
    transform: translate(-50%, -50%);
`;
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Hide cursor on mobile
if (window.innerWidth <= 768) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .skill-item, .animated-card, .clickable-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.background = 'var(--primary-color)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'transparent';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Enhanced particle effect with icons
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const icons = ['<i class="fas fa-code"></i>', '<i class="fas fa-rocket"></i>', '<i class="fas fa-star"></i>', '<i class="fas fa-heart"></i>', '<i class="fas fa-bolt"></i>'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    
    const size = Math.random() * 15 + 10;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const duration = Math.random() * 4 + 3;
    
    particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        color: var(--primary-color);
        left: ${posX}px;
        top: ${posY}px;
        pointer-events: none;
        z-index: 1;
        animation: float-particle ${duration}s linear infinite;
        opacity: 0.7;
        font-size: ${size}px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    particle.innerHTML = randomIcon;
    document.body.appendChild(particle);
    
    setTimeout(() => {
        document.body.removeChild(particle);
    }, duration * 1000);
}

// Create particles periodically with icons
setInterval(createParticle, 800);

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeOut 0.5s ease 1s forwards;
    `;
    
    const loaderContent = document.createElement('div');
    loaderContent.style.cssText = `
        text-align: center;
    `;
    
    const loaderLogo = document.createElement('div');
    loaderLogo.className = 'rr-logo';
    loaderLogo.textContent = 'RR';
    loaderLogo.style.cssText = `
        font-size: 4rem;
        font-weight: 900;
        background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: pulse 1s ease-in-out infinite;
    `;
    
    loaderContent.appendChild(loaderLogo);
    loader.appendChild(loaderContent);
    document.body.appendChild(loader);
    
    setTimeout(() => {
        document.body.removeChild(loader);
    }, 1500);
});

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            visibility: hidden;
        }
    }
`;
document.head.appendChild(fadeOutStyle);

// Simple email copy function
function copiarEmail() {
    const email = 'rhzaugust@gmail.com';
    const subject = 'Contato via Portfólio';
    const body = 'Olá Rhian Reis! Vi seu portfólio e gostaria de conversar.';
    
    // Copia para área de transferência
    navigator.clipboard.writeText(email).then(() => {
        showNotification('📧 Email copiado: rhzaugust@gmail.com', 'success');
        
        // Tenta abrir Gmail com mensagem pré-definida
        setTimeout(() => {
            window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + email + '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body), '_blank');
        }, 500);
    }).catch(() => {
        // Fallback se clipboard não funcionar
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        showNotification('📧 Email copiado! Abrindo Gmail...', 'success');
        setTimeout(() => {
            window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + email + '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body), '_blank');
        }, 500);
    });
}

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    showNotification('🌈 Easter Egg ativado! Você encontrou o código secreto!', 'success');
    
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}
