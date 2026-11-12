let currentSlide = 0;

function getTotalSlides() {
  return document.querySelectorAll('.slide-card').length || 5;
}

// Selector de Sistema Operativo en Diapositiva 1
let currentOs = 'android';

function selectOs(os) {
  currentOs = os;
  const btnAndroid = document.getElementById('btnOsAndroid');
  const btnIos = document.getElementById('btnOsIos');
  const tabAndroid = document.getElementById('osTabAndroid');
  const tabIos = document.getElementById('osTabIos');
  const videoEl = document.getElementById('video-slide-0');
  const videoTitleEl = document.getElementById('videoTitleSlide0');
  const expandBtn = document.getElementById('btnExpandSlide0');

  if (os === 'android') {
    if (btnAndroid) btnAndroid.classList.add('active');
    if (btnIos) btnIos.classList.remove('active');
    if (tabAndroid) tabAndroid.classList.add('active');
    if (tabIos) tabIos.classList.remove('active');
    if (videoTitleEl) videoTitleEl.innerHTML = '<i class="mdi mdi-android"></i> Video: Instalación en Android';
    if (videoEl) {
      videoEl.style.display = 'block';
      const placeholder = document.getElementById('placeholder-slide-0');
      if (placeholder) placeholder.style.display = 'none';
      videoEl.src = 'video/instalacion_pwa_android.mp4';
      videoEl.load();
      videoEl.muted = true;
      videoEl.play().catch(() => {});
    }
    if (expandBtn) {
      expandBtn.setAttribute('onclick', "expandVideo('video/instalacion_pwa_android.mp4', '1. Instalación PWA en Android')");
    }
  } else {
    if (btnIos) btnIos.classList.add('active');
    if (btnAndroid) btnAndroid.classList.remove('active');
    if (tabIos) tabIos.classList.add('active');
    if (tabAndroid) tabAndroid.classList.remove('active');
    if (videoTitleEl) videoTitleEl.innerHTML = '<i class="mdi mdi-apple"></i> Video: Instalación en iPhone (iOS)';
    if (videoEl) {
      videoEl.style.display = 'block';
      const placeholder = document.getElementById('placeholder-slide-0');
      if (placeholder) placeholder.style.display = 'none';
      videoEl.src = 'video/instalacion_pwa_ios.mp4';
      videoEl.load();
      videoEl.muted = true;
      videoEl.play().catch(() => {});
    }
    if (expandBtn) {
      expandBtn.setAttribute('onclick', "expandVideo('video/instalacion_pwa_ios.mp4', '1. Instalación PWA en iPhone (iOS)')");
    }
  }
}

function clickSlide0Video() {
  if (currentOs === 'android') {
    expandVideo('video/instalacion_pwa_android.mp4', '1. Instalación PWA en Android');
  } else {
    expandVideo('video/instalacion_pwa_ios.mp4', '1. Instalación PWA en iPhone (iOS)');
  }
}

// Navegación entre Diapositivas
function updateSlide() {
  // Ocultar todas y mostrar la actual
  document.querySelectorAll('.slide-card').forEach((slide, idx) => {
    slide.classList.toggle('active', idx === currentSlide);
  });

  // Pausar y reiniciar videos de diapositivas inactivas
  document.querySelectorAll('.slide-card video').forEach(v => {
    v.pause();
    v.currentTime = 0;
  });

  // Reproducir automáticamente el video de la diapositiva activa
  const activeSlideEl = document.querySelector('.slide-card.active');
  if (activeSlideEl) {
    const activeVideo = activeSlideEl.querySelector('video');
    if (activeVideo) {
      activeVideo.muted = true;
      activeVideo.play().catch(() => {});
    }
  }

  // Actualizar dots
  document.querySelectorAll('.deck-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentSlide);
  });

  // Contador
  const total = getTotalSlides();
  const counterEl = document.getElementById('slideCounterBadge');
  if (counterEl) {
    counterEl.innerHTML = `<i class="mdi mdi-presentation"></i> Diapositiva ${currentSlide + 1} de ${total}`;
  }

  // Barra de progreso superior
  const progressBar = document.getElementById('deckProgressBar');
  if (progressBar) {
    const pct = ((currentSlide + 1) / total) * 100;
    progressBar.style.width = pct + '%';
  }

  // Estado de botones
  const prevBtn = document.getElementById('btnPrevSlide');
  if (prevBtn) {
    prevBtn.disabled = currentSlide === 0;
  }

  const nextBtn = document.getElementById('btnNextSlide');
  if (nextBtn) {
    if (currentSlide === total - 1) {
      nextBtn.style.display = 'none';
    } else {
      nextBtn.style.display = 'inline-flex';
      nextBtn.innerHTML = 'Siguiente <i class="mdi mdi-chevron-right"></i>';
    }
  }
}

function nextSlide() {
  const total = getTotalSlides();
  if (currentSlide < total - 1) {
    currentSlide++;
    updateSlide();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide();
  }
}

function goToSlide(idx) {
  const total = getTotalSlides();
  if (idx >= 0 && idx < total) {
    currentSlide = idx;
    updateSlide();
  }
}

// Modal de Video Expandido
function expandVideo(src, title) {
  const modal = document.getElementById('videoModal');
  const modalVid = document.getElementById('modalVideoPlayer');
  const titleEl = document.getElementById('videoModalTitle');

  if (!modal || !modalVid) return;

  if (title && titleEl) {
    titleEl.innerHTML = `<i class="mdi mdi-video-box"></i> ${title}`;
  }

  modalVid.src = src;
  modal.classList.add('active');
  modalVid.play().catch(() => {});
}

function closeExpandedVideo() {
  const modal = document.getElementById('videoModal');
  const modalVid = document.getElementById('modalVideoPlayer');

  if (!modal || !modalVid) return;

  modal.classList.remove('active');
  modalVid.pause();
  modalVid.removeAttribute('src');
  modalVid.load();

  // Asegurar que el video de la diapositiva activa siga reproduciéndose
  const activeSlideEl = document.querySelector('.slide-card.active');
  if (activeSlideEl) {
    const activeVideo = activeSlideEl.querySelector('video');
    if (activeVideo) {
      activeVideo.play().catch(() => {});
    }
  }
}

// Detectar si los videos existen o mostrar placeholder visual amigable
document.querySelectorAll('.slide-video-player-wrap video').forEach((vid, idx) => {
  vid.addEventListener('error', () => {
    vid.style.display = 'none';
    const placeholder = document.getElementById(`placeholder-slide-${idx}`);
    if (placeholder) placeholder.style.display = 'flex';
  });
});

// Control con Teclado (Flechas y Esc)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeExpandedVideo();
    return;
  }
  const modal = document.getElementById('videoModal');
  if (modal && modal.classList.contains('active')) {
    return;
  }

  if (e.key === 'ArrowRight' || e.key === ' ') {
    nextSlide();
  } else if (e.key === 'ArrowLeft') {
    prevSlide();
  }
});

// Iniciar presentación
document.addEventListener('DOMContentLoaded', () => {
  updateSlide();
});
