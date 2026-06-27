// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Contact form → WhatsApp redirect
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const interes = document.getElementById('interes').value;
  const mensaje = document.getElementById('mensaje').value.trim();

  const interesMap = {
    administracion: 'administrar mi propiedad en renta',
    venta: 'vender mi propiedad',
    compra: 'comprar una propiedad',
    otro: 'otro tema'
  };

  let text = `Hola Angel, soy ${nombre || 'un visitante de tu página'}.`;
  if (interes) text += ` Me interesa ${interesMap[interes] || interes}.`;
  if (telefono) text += ` Mi teléfono es ${telefono}.`;
  if (mensaje) text += ` ${mensaje}`;

  const phone = '526641234567';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
});

// Animate elements on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const animateTargets = document.querySelectorAll(
  '.servicio-card, .diferencia__card, .cliente-card, .stat'
);

animateTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
