(() => {
  const video = document.querySelector('#firmvault-video');
  const button = document.querySelector('.film-play');
  const status = document.querySelector('.film-status');
  if (!video || !button) return;
  video.controls = false;
  button.hidden = false;
  button.addEventListener('click', async () => {
    button.disabled = true;
    video.controls = true;
    if (video.ended) video.currentTime = 0;
    try {
      await video.play();
      button.hidden = true;
      video.focus({ preventScroll: true });
      status.textContent = '';
    } catch {
      button.hidden = false;
      status.textContent = 'Playback could not start. Try Play again, or use the video controls.';
    } finally {
      button.disabled = false;
    }
  });
  video.addEventListener('playing', () => { button.hidden = true; });
  video.addEventListener('ended', () => {
    button.querySelector('[data-film-action]').textContent = 'Watch again';
    button.hidden = false;
  });
  video.addEventListener('error', () => {
    video.controls = true;
    status.classList.remove('sr-only');
    status.textContent = 'The film could not load. Please try again in a moment.';
    button.disabled = false;
  });
  const pause = () => {
    if (!video.paused && !document.fullscreenElement && !document.pictureInPictureElement && !video.webkitDisplayingFullscreen) video.pause();
  };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) pause(); }, { threshold: 0 }).observe(video);
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
})();
