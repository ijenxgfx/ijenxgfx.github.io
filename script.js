// Fade-in animation on scroll
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.about img, .about-text, .thumbnails img').forEach(el => {
    el.classList.add('fade-hidden');
    observer.observe(el);
  });
});
