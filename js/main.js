/**
 * Apple-style animations and effects
 * Shared across all pages
 */

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar smart hide/show on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
let scrollTimeout;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  clearTimeout(scrollTimeout);

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    navbar.classList.add('hidden');
  } else {
    // Scrolling up
    navbar.classList.remove('hidden');
  }

  lastScrollTop = scrollTop;
});

// Fade in elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all cards and sections for fade-in effect
document.querySelectorAll('.card, .section, .project-card, .empty-state').forEach(el => {
  el.classList.add('fade-in-on-scroll');
  observer.observe(el);
});

// Add staggered animation to cards
const cards = document.querySelectorAll('.card, .project-card');
cards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footer = document.querySelector('.footer__content p');
if (footer && footer.textContent.includes('2024')) {
  footer.innerHTML = footer.innerHTML.replace('2024', currentYear);
}

// Add subtle parallax effect to hero section
let ticking = false;
function updateParallax() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const rate = scrolled * -0.3;
    hero.style.transform = `translateY(${rate}px)`;
  }
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

// Only add parallax if hero exists
if (document.querySelector('.hero')) {
  window.addEventListener('scroll', requestTick);
}

// Add subtle hover effect to cards
document.querySelectorAll('.card, .project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-4px) scale(1.01)';
  });

  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add click feedback to buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 100);
  });
});

// Page load animation
document.addEventListener('DOMContentLoaded', function() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-out';

  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});
