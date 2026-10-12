(() => {
  const video = document.querySelector('#firmvault-video');
  const button = document.querySelector('.film-play');
  const screen = document.querySelector('.film-screen');
  const toggle = document.querySelector('.film-preview-toggle');
  const status = document.querySelector('.film-status');
  if (!video || !button || !screen || !toggle) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mouse = matchMedia('(hover: hover) and (pointer: fine)');
  let inView = false, preview = true, held = false, pending = false;
  let frame = 0, target = null, current = null, pointer = null;
  video.controls = false;
  video.muted = true;
  video.loop = true;
  button.hidden = false;
  toggle.hidden = false;

  const immersive = () => document.fullscreenElement || document.pictureInPictureElement || video.webkitDisplayingFullscreen;
  const updateToggle = () => {
    toggle.hidden = !preview;
    toggle.textContent = held || (reduced.matches && video.paused) ? 'Play preview' : 'Pause preview';
    toggle.setAttribute('aria-pressed', String(held));
  };
  const stopFollowing = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0; target = null; current = null; pointer = null;
    screen.classList.remove('is-following');
  };
  const pauseOffscreen = () => {
    if (!immersive()) video.pause();
    stopFollowing();
  };
  async function startPreview(force = false) {
    if (!preview || held || (!force && reduced.matches) || !inView || document.hidden || pending || !video.paused) return;
    pending = true;
    try {
      await video.play();
      if (preview && (!inView || document.hidden || held)) video.pause();
    } catch {
      // Autoplay may be blocked. The explicit play button remains available.
    } finally { pending = false; }
  }
  async function playFilm() {
    if (button.disabled || !preview && !video.ended) return;
    preview = false;
    stopFollowing();
    updateToggle();
    button.disabled = true;
    video.loop = false;
    video.controls = true;
    video.muted = false;
    video.currentTime = 0;
    try {
      await video.play();
      button.hidden = true;
      video.focus({ preventScroll: true });
      status.textContent = '';
    } catch {
      button.hidden = true;
      status.classList.remove('sr-only');
      status.textContent = 'Use the video controls to start the film.';
    } finally { button.disabled = false; }
  }
  button.addEventListener('click', playFilm);
  screen.addEventListener('click', event => {
    if (preview && !button.contains(event.target)) playFilm();
  });
  toggle.addEventListener('click', () => {
    held = reduced.matches ? !video.paused : !held;
    updateToggle();
    if (held) video.pause(); else startPreview(true);
  });
  video.addEventListener('ended', () => {
    button.querySelector('[data-film-action]').textContent = 'Watch again';
    button.hidden = false;
  });
  video.addEventListener('playing', updateToggle);
  video.addEventListener('pause', updateToggle);
  video.addEventListener('error', () => {
    preview = false; stopFollowing(); updateToggle();
    video.controls = true;
    button.hidden = true;
    status.classList.remove('sr-only');
    status.textContent = 'The film could not load. Please try again in a moment.';
  });

  // Follow mouse movement with one animation frame, without intercepting native controls.
  function follow() {
    frame = 0;
    if (!target || !current) return;
    current.x += (target.x - current.x) * .24;
    current.y += (target.y - current.y) * .24;
    screen.style.setProperty('--film-cursor-x', `${current.x.toFixed(1)}px`);
    screen.style.setProperty('--film-cursor-y', `${current.y.toFixed(1)}px`);
    if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > .15) frame = requestAnimationFrame(follow);
  }
  function moveToPointer() {
    if (!pointer) return;
    const bounds = screen.getBoundingClientRect();
    if (pointer.x < bounds.left || pointer.x > bounds.right || pointer.y < bounds.top || pointer.y > bounds.bottom) { stopFollowing(); return; }
    const halfWidth = button.offsetWidth / 2 + 10, halfHeight = button.offsetHeight / 2 + 10;
    const clamp = (value, margin, size) => Math.max(margin, Math.min(size - margin, value));
    target = { x: clamp(pointer.x - bounds.left, halfWidth, bounds.width), y: clamp(pointer.y - bounds.top, halfHeight, bounds.height) };
    if (!current) current = { ...target };
    screen.classList.add('is-following');
    if (!frame) frame = requestAnimationFrame(follow);
  }
  screen.addEventListener('pointermove', event => {
    if (!preview || event.pointerType !== 'mouse' || !mouse.matches || reduced.matches || button.matches(':focus-visible')) return;
    pointer = { x: event.clientX, y: event.clientY };
    moveToPointer();
  });
  window.addEventListener('scroll', moveToPointer, { passive: true });
  window.addEventListener('resize', stopFollowing, { passive: true });
  screen.addEventListener('pointerleave', stopFollowing);
  button.addEventListener('focus', stopFollowing);
  mouse.addEventListener('change', stopFollowing);
  reduced.addEventListener('change', () => {
    stopFollowing();
    if (preview) { if (reduced.matches) video.pause(); else startPreview(); }
    updateToggle();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      // Start after a meaningful part of the film is visible; pause as it leaves.
      if (entry.intersectionRatio >= .35) { inView = true; startPreview(); }
      else if (entry.intersectionRatio < .1) { inView = false; pauseOffscreen(); }
    }, { threshold: [0, .1, .35], rootMargin: '-72px 0px 0px 0px' }).observe(video);
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) pauseOffscreen(); else startPreview(); });
  updateToggle();
})();
