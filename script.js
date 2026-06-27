/* ============================================================
   Angel Barba Realty — script.js
   ============================================================ */

// ── Nav: fondo sólido al hacer scroll ──────────────────────
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 48);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Menú móvil ─────────────────────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});

// Cerrar al hacer clic en un enlace
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// ── Scroll suave para anclas ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Formulario de estimación → WhatsApp ────────────────────
const PHONE = '526647548143';

const tipoMap = {
  venta:  'conocer el precio de venta de mi propiedad',
  renta:  'saber a cuánto puedo rentar mi propiedad',
  ambos:  'conocer tanto el precio de venta como de renta de mi propiedad'
};

document.getElementById('estimacionForm').addEventListener('submit', e => {
  e.preventDefault();
  const nombre    = document.getElementById('est-nombre').value.trim();
  const telefono  = document.getElementById('est-telefono').value.trim();
  const tipo      = document.getElementById('est-tipo').value;
  const propiedad = document.getElementById('est-propiedad').value.trim();

  let msg = `Hola Angel, soy ${nombre || 'un visitante de tu página'} y me gustaría solicitar una estimación de precio gratuita.`;
  if (tipo)      msg += ` Me interesa ${tipoMap[tipo] || tipo}.`;
  if (propiedad) msg += ` Aquí te cuento sobre mi propiedad: ${propiedad}`;
  if (telefono)  msg += ` Mi número es ${telefono}.`;

  window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
});

// ── Formulario de contacto → WhatsApp ──────────────────────
const interesMap = {
  administracion: 'administrar mi propiedad en renta',
  venta:          'vender mi propiedad',
  estimacion:     'solicitar una estimación de precio gratuita',
  otro:           'otro tema'
};

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const nombre   = document.getElementById('c-nombre').value.trim();
  const telefono = document.getElementById('c-telefono').value.trim();
  const interes  = document.getElementById('c-interes').value;
  const mensaje  = document.getElementById('c-mensaje').value.trim();

  let msg = `Hola Angel, soy ${nombre || 'un visitante de tu página'}.`;
  if (interes)   msg += ` Me interesa ${interesMap[interes] || interes}.`;
  if (mensaje)   msg += ` ${mensaje}`;
  if (telefono)  msg += ` Puedes contactarme al ${telefono}.`;

  window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
});

// ── Animaciones de entrada con IntersectionObserver ────────
const revealTargets = document.querySelectorAll(
  '.svc-card, .dif-card, .blog-card, .sobre-mi__copy, .estimacion__copy, .estimacion__form, .contacto__copy, .contacto__form'
);

revealTargets.forEach(el => el.classList.add('js-reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => observer.observe(el));
