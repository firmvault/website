(() => {
  const root = document.getElementById('fv-hero');
  if (!root) return;
  const find = selector => root.querySelector(selector);
  const art = find('.ha-art'), wa = find('.ha-wa-wrap'), dash = find('.ha-dashboard-wrap');
  const body = find('.ha-chat-body'), flow = find('.ha-flow'), row = find('.ha-dash-row');
  const state = find('.ha-file-state'), scene = find('.ha-scene');
  const packet = find('.ha-packet'), path = find('.ha-link path'), pause = find('.ha-play');
  const messages = [...flow.children].map(node => ({node, at: Number(node.dataset.at), camera: 0}));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !reduced.matches, visible = false, elapsed = 800, last = 0, frame = 0, points;
  const ease = value => { const x = Math.max(0, Math.min(1, value)); return x * x * (3 - 2 * x); };

  function measure() {
    messages.forEach(message => {
      message.camera = Math.max(0, message.node.offsetTop + message.node.offsetHeight - (body.clientHeight - 35));
    });
    // Use layout coordinates, so floating transforms cannot change the path.
    const stacked = getComputedStyle(wa).position !== 'absolute';
    const start = stacked
      ? {x: wa.offsetLeft + wa.offsetWidth / 2, y: wa.offsetTop + wa.offsetHeight + 7}
      : {x: wa.offsetLeft + wa.offsetWidth - 20, y: wa.offsetTop + wa.offsetHeight * .67};
    const end = stacked
      ? {x: dash.offsetLeft + dash.offsetWidth / 2, y: dash.offsetTop + 1}
      : {x: dash.offsetLeft + dash.offsetWidth - 24, y: dash.offsetTop + 83};
    points = {start, end, stacked,
      one: stacked ? {x: start.x, y: start.y + 20} : {x: start.x + 115, y: start.y + 5},
      two: stacked ? {x: end.x, y: end.y - 20} : {x: end.x + 12, y: end.y - 60}};
    // Keep the approved curved connection inside the hero on narrow desktop columns.
    points.one.x = Math.min(points.one.x, art.clientWidth - 6);
    points.two.x = Math.min(points.two.x, art.clientWidth - 6);
    path.setAttribute('d', `M${start.x} ${start.y} C${points.one.x} ${points.one.y} ${points.two.x} ${points.two.y} ${end.x} ${end.y}`);
  }
  function position(p) {
    const q = 1 - p;
    return {
      x: q*q*q*points.start.x + 3*q*q*p*points.one.x + 3*q*p*p*points.two.x + p*p*p*points.end.x,
      y: q*q*q*points.start.y + 3*q*q*p*points.one.y + 3*q*p*p*points.two.y + p*p*p*points.end.y
    };
  }
  function draw(t) {
    flow.style.opacity = 1 - ease((t - 16.3) / .7);
    let newest = 0;
    messages.forEach((message, index) => {
      const amount = ease((t - message.at) / .6);
      message.node.style.opacity = amount;
      message.node.style.transform = `translateY(${12*(1-amount)}px) scale(${.98+.02*amount})`;
      if (t >= message.at) newest = index;
    });
    const end = messages[newest].camera, start = newest ? messages[newest - 1].camera : 0;
    flow.style.transform = `translateY(${-start-(end-start)*ease((t-messages[newest].at)/.85)}px)`;
    const filed = ease((t - 6.4) / .85);
    row.style.opacity = .85 + .15 * filed;
    row.style.transform = `translateY(${8*(1-filed)}px)`;
    const label = filed > .5 ? '✓ Filed' : 'Filing…';
    if (state.textContent !== label) state.textContent = label;
    const caption = t < 3.6 ? 'Forward a document on WhatsApp' : t < 8.8 ? 'Organised in your FirmVault dashboard' : t < 12.2 ? 'Ask for it on WhatsApp' : 'Get the same PDF back on WhatsApp';
    if (scene.textContent !== caption) scene.textContent = caption;
    const drift = reduced.matches ? 0 : Math.sin(t * .75) * 2.6;
    wa.style.transform = `translateY(${drift}px) rotate(${points?.stacked || reduced.matches ? 0 : -1.1}deg)`;
    dash.style.transform = `translateY(${-drift*.6}px) rotate(${points?.stacked || reduced.matches ? 0 : .8}deg)`;
    let trip = -1, reverse = false;
    if (t >= 4.5 && t <= 6.7) trip = (t - 4.5) / 2.2;
    else if (t >= 10.4 && t <= 12.2) { trip = (t - 10.4) / 1.8; reverse = true; }
    if (trip >= 0 && points) {
      const pos = position(reverse ? 1 - ease(trip) : ease(trip));
      packet.style.opacity = Math.min(1, trip * 6, (1-trip) * 6);
      packet.style.transform = `translate(${pos.x-23.5}px,${pos.y-17}px) scale(.9)`;
    } else packet.style.opacity = 0;
  }
  function animate(stamp) {
    frame = 0;
    if (!playing || !visible || document.hidden) { last = 0; return; }
    if (last) elapsed += Math.min(100, stamp - last);
    last = stamp;
    draw((elapsed / 1000) % 17);
    frame = requestAnimationFrame(animate);
  }
  function start() { if (playing && visible && !document.hidden && !frame) frame = requestAnimationFrame(animate); }
  function stop() { if (frame) cancelAnimationFrame(frame); frame = 0; last = 0; }
  function controls() {
    pause.hidden = reduced.matches;
    pause.setAttribute('aria-pressed', String(!playing));
    pause.setAttribute('aria-label', playing ? 'Pause hero animation' : 'Play hero animation');
    pause.textContent = playing ? 'Pause motion' : 'Play motion';
  }
  pause.addEventListener('click', () => { playing = !playing; controls(); if (playing) start(); else stop(); });
  reduced.addEventListener('change', () => {
    stop(); playing = !reduced.matches; controls();
    if (reduced.matches) draw(13); else { elapsed = 800; draw(.8); start(); }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
  root.classList.add('hero-motion-ready');
  measure(); controls(); draw(reduced.matches ? 13 : .8);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) start(); else stop();
  }).observe(art);
  else { visible = true; start(); }
  const resize = () => { measure(); draw(reduced.matches ? 13 : (elapsed / 1000) % 17); };
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(art);
  else window.addEventListener('resize', resize, {passive: true});
  document.fonts?.ready.then(resize);
})();
