// Menú móvil
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

navigation.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

// Los enlaces de los servicios seleccionan automáticamente esa opción en el formulario.
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const serviceSelect = document.querySelector('#service');
    serviceSelect.value = link.dataset.service;
  });
});

// Formulario de cita: abre WhatsApp con los datos escritos.
// IMPORTANTE: sustituye el número de ejemplo por el WhatsApp real de la óptica.
// Formato internacional, solo números. Ejemplo México: 5215512345678.
const WHATSAPP_NUMBER = '5215512345678';

document.querySelector('#appointment-form').addEventListener('submit', event => {
  event.preventDefault();

  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const name = document.querySelector('#name').value.trim();
  const phone = document.querySelector('#phone').value.trim();
  const service = document.querySelector('#service').value;
  const message = `Hola, quiero solicitar una cita en Óptica Clara.%0A%0ANombre: ${encodeURIComponent(name)}%0ATeléfono: ${encodeURIComponent(phone)}%0AServicio: ${encodeURIComponent(service)}%0A¿Podrían ayudarme a coordinar una visita?`;

  const feedback = document.querySelector('#form-feedback');
  if (WHATSAPP_NUMBER === '5215512345678') {
    feedback.textContent = 'Antes de publicar, configura el número real de WhatsApp en js/main.js.';
    return;
  }

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank', 'noopener,noreferrer');
  feedback.textContent = 'Se abrió WhatsApp para enviar tu solicitud.';
});
