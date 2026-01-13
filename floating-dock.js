// Floating Dock JavaScript
class FloatingDock {
  constructor() {
    this.items = [
      {
        title: 'Início',
        icon: 'fas fa-home',
        href: '#home'
      },
      {
        title: 'Sobre',
        icon: 'fas fa-user',
        href: '#about'
      },
      {
        title: 'Habilidades',
        icon: 'fas fa-code',
        href: '#skills'
      },
      {
        title: 'Projetos',
        icon: 'fas fa-rocket',
        href: '#projects'
      },
      {
        title: 'GitHub',
        icon: 'fab fa-github',
        href: 'https://github.com/rhzaugust-bit',
        target: '_blank'
      },
      {
        title: 'WhatsApp',
        icon: 'fab fa-whatsapp',
        href: 'https://wa.me/5531999162893?text=Ol%C3%A1%20Rhian%20Reis!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar.%20',
        target: '_blank'
      },
      {
        title: 'Email',
        icon: 'fas fa-envelope',
        href: 'javascript:void(0)',
        onclick: 'copiarEmail()'
      }
    ];

    this.init();
  }

  init() {
    console.log('FloatingDock: Starting initialization...');
    this.createDock();
    this.setupEventListeners();
    this.setupScrollEffect();
    console.log('FloatingDock: All methods called!');
  }

  createDock() {
    console.log('FloatingDock: Creating dock...');
    // Create dock container
    const dock = document.createElement('div');
    dock.className = 'floating-dock';
    dock.id = 'floating-dock';
    
    // Set initial styles
    dock.style.opacity = '0';
    dock.style.transform = 'translateX(-50%) translateY(20px)';
    dock.style.transition = 'all 0.5s ease';

    console.log('FloatingDock: Dock container created');

    // Create items
    this.items.forEach((item, index) => {
      const dockItem = document.createElement('a');
      dockItem.className = 'floating-dock-item';
      dockItem.href = item.href;
      
      if (item.target) {
        dockItem.target = item.target;
      }
      
      if (item.onclick) {
        dockItem.setAttribute('onclick', item.onclick);
      }

      // Add icon
      const icon = document.createElement('i');
      icon.className = item.icon;
      dockItem.appendChild(icon);

      // Add tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'floating-dock-tooltip';
      tooltip.textContent = item.title;
      dockItem.appendChild(tooltip);

      // Add hover effects
      this.addHoverEffects(dockItem, index);

      dock.appendChild(dockItem);
    });

    console.log('FloatingDock: All items created, adding to body...');
    
    // Add to page
    document.body.appendChild(dock);
    console.log('FloatingDock: Dock added to body!');

    // Animate entrance
    setTimeout(() => {
      dock.style.opacity = '1';
      dock.style.transform = 'translateX(-50%) translateY(0)';
      console.log('FloatingDock: Entrance animation triggered!');
    }, 1000);
  }

  addHoverEffects(element, index) {
    // Mouse enter effect
    element.addEventListener('mouseenter', (e) => {
      // Scale neighboring items
      const items = document.querySelectorAll('.floating-dock-item');
      items.forEach((item, i) => {
        const distance = Math.abs(i - index);
        const scale = distance === 0 ? 1.2 : distance === 1 ? 1.1 : 1;
        item.style.transform = `scale(${scale})`;
      });

      // Add glow effect
      element.style.boxShadow = `
        0 0 20px rgba(0, 255, 136, 0.8),
        0 0 40px rgba(0, 255, 136, 0.4),
        inset 0 0 20px rgba(0, 255, 136, 0.1)
      `;
    });

    // Mouse leave effect
    element.addEventListener('mouseleave', (e) => {
      // Reset all scales
      const items = document.querySelectorAll('.floating-dock-item');
      items.forEach(item => {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = '';
      });
    });

    // Click effect
    element.addEventListener('click', (e) => {
      // Ripple effect
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.background = 'rgba(0, 255, 136, 0.6)';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple 0.6s ease-out';
      
      const rect = element.getBoundingClientRect();
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      
      element.appendChild(ripple);
      
      setTimeout(() => {
        element.removeChild(ripple);
      }, 600);
    });
  }

  setupEventListeners() {
    // Smooth scroll for anchor links
    document.querySelectorAll('.floating-dock-item[href^="#"]').forEach(link => {
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
  }

  setupScrollEffect() {
    let lastScrollY = window.scrollY;
    const dock = document.getElementById('floating-dock');

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide dock
        dock.classList.add('hidden');
      } else {
        // Scrolling up - show dock
        dock.classList.remove('hidden');
      }
      
      lastScrollY = currentScrollY;
    });
  }
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('FloatingDock: DOM loaded, initializing...');
  try {
    new FloatingDock();
    console.log('FloatingDock: Initialized successfully!');
  } catch (error) {
    console.error('FloatingDock: Error initializing', error);
  }
});

// Also try immediate initialization
if (document.readyState === 'loading') {
  console.log('FloatingDock: Document still loading...');
} else {
  console.log('FloatingDock: Document already loaded, initializing immediately...');
  try {
    new FloatingDock();
    console.log('FloatingDock: Initialized immediately!');
  } catch (error) {
    console.error('FloatingDock: Error in immediate init', error);
  }
}
