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
  let frame = 0, target = { x: 0, y: 0 }, current = { x: 0, y: 0 }, pointer = null;
  let geometry = null, lastFrame = 0;
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
    frame = 0; lastFrame = 0; pointer = null; geometry = null;
    target = { x: 0, y: 0 }; current = { x: 0, y: 0 };
    screen.classList.remove('is-following', 'is-gliding');
    paintPosition();
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
    button.hidden = true;
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

  // Animate only the transform. Geometry is measured on entry/layout changes,
  // rather than reading layout on every mouse event or animation frame.
  function paintPosition() {
    screen.style.setProperty('--film-offset-x', `${current.x.toFixed(2)}px`);
    screen.style.setProperty('--film-offset-y', `${current.y.toFixed(2)}px`);
  }
  function scheduleFollowing() {
    if (!frame) frame = requestAnimationFrame(follow);
  }
  function follow(stamp) {
    frame = 0;
    const delta = lastFrame ? Math.min(40, stamp - lastFrame) : 16.7;
    lastFrame = stamp;
    const amount = 1 - Math.exp(-delta / (pointer ? 85 : 135));
    current.x += (target.x - current.x) * amount;
    current.y += (target.y - current.y) * amount;
    if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) < .08) {
      current = { ...target }; lastFrame = 0;
      if (!pointer) screen.classList.remove('is-gliding');
    } else scheduleFollowing();
    paintPosition();
  }
  function measurePointerArea() {
    const bounds = screen.getBoundingClientRect();
    const width = button.offsetWidth, height = button.offsetHeight;
    const bottom = parseFloat(getComputedStyle(button).bottom) || bounds.height * .06;
    geometry = { bounds, halfWidth: width / 2 + 10, halfHeight: height / 2 + 10,
      homeX: bounds.width / 2, homeY: bounds.height - bottom - height / 2 };
  }
  function returnToCentre() {
    pointer = null;
    target = { x: 0, y: 0 };
    screen.classList.remove('is-following');
    if (!reduced.matches && preview) scheduleFollowing();
    else stopFollowing();
  }
  function moveToPointer() {
    if (!pointer) return;
    if (!geometry) measurePointerArea();
    const { bounds, halfWidth, halfHeight, homeX, homeY } = geometry;
    if (pointer.x < bounds.left || pointer.x > bounds.right || pointer.y < bounds.top || pointer.y > bounds.bottom) { returnToCentre(); return; }
    const clamp = (value, margin, size) => Math.max(margin, Math.min(size - margin, value));
    target = { x: clamp(pointer.x - bounds.left, halfWidth, bounds.width) - homeX,
      y: clamp(pointer.y - bounds.top, halfHeight, bounds.height) - homeY };
    screen.classList.add('is-following', 'is-gliding');
    scheduleFollowing();
  }
  function capturePointer(event) {
    if (!preview || event.pointerType !== 'mouse' || !mouse.matches || reduced.matches || button.matches(':focus-visible')) return;
    pointer = { x: event.clientX, y: event.clientY };
    moveToPointer();
  }
  screen.addEventListener('pointerenter', event => { geometry = null; capturePointer(event); });
  screen.addEventListener('pointermove', capturePointer, { passive: true });
  window.addEventListener('scroll', () => {
    geometry = null;
    moveToPointer();
  }, { passive: true });
  window.addEventListener('resize', stopFollowing, { passive: true });
  screen.addEventListener('pointerleave', returnToCentre);
  button.addEventListener('focus', stopFollowing);
  mouse.addEventListener('change', stopFollowing);
  reduced.addEventListener('change', () => {
    stopFollowing();
    if (preview) { if (reduced.matches) video.pause(); else startPreview(); }
    updateToggle();
  });
  if ('ResizeObserver' in window) {
    const resize = new ResizeObserver(() => { geometry = null; moveToPointer(); });
    resize.observe(screen); resize.observe(button);
  }
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
