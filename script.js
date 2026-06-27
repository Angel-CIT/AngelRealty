/* ================================================================
   ANGEL BARBA REALTY — script.js
   ================================================================ */

// ── Nav scroll ──────────────────────────────────────────────
const nav = document.getElementById('nav');
const handleScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ── Menú móvil ───────────────────────────────────────────────
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');

burger.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
drawer.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    drawer.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

// ── Scroll suave ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
  });
});

// ── Animaciones de entrada ────────────────────────────────────
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      revealObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ── WhatsApp helpers ──────────────────────────────────────────
const PHONE = '526647548143';
const wa = text => `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

// ── Formulario de valuación ────────────────────────────────────
document.getElementById('valuationForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const nombre  = document.getElementById('v-nombre')?.value.trim();
  const wa_num  = document.getElementById('v-whatsapp')?.value.trim();
  const tipo    = document.getElementById('v-tipo')?.value;
  const detalle = document.getElementById('v-detalle')?.value.trim();

  const tipoMap = {
    renta:  'saber a cuánto puedo rentar mi propiedad',
    venta:  'conocer el precio de venta de mi propiedad',
    ambos:  'conocer tanto el precio de renta como de venta',
  };

  let msg = `Hola Angel, soy ${nombre || 'un visitante de tu página'} y quisiera solicitar una valuación gratuita.`;
  if (tipo)    msg += ` Me interesa ${tipoMap[tipo] || tipo}.`;
  if (detalle) msg += ` Sobre mi propiedad: ${detalle}`;
  if (wa_num)  msg += ` Mi número es ${wa_num}.`;

  window.open(wa(msg), '_blank');
});
