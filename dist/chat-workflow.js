(() => {
  const root = document.querySelector('.chat-workflow');
  if (!root) return;
  const track = root.querySelector('.chat-scroll-track');
  const stage = root.querySelector('.chat-scroll-stage');
  const body = root.querySelector('.chat-body');
  const staff = root.querySelector('.chat-staff');
  const partner = root.querySelector('.chat-partner');
  const composer = root.querySelector('.chat-compose-text');
  const person = root.querySelector('.chat-person');
  const progress = root.querySelector('.chat-progress span');
  const date = root.querySelector('.chat-date');
  const chapters = [...root.querySelectorAll('[data-chat-chapter]')];
  const buttons = [...root.querySelectorAll('[data-chat-jump]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const summary = root.querySelector('.chat-accessible-summary');
  const chapterStarts = [.8, 4.2, 15.6, 20.2];
  const jumpTimes = [.8, 10.5, 19, 30.4];
  const request = 'Send Sharma Traders GST return for September';
  const clamp = x => Math.max(0, Math.min(1, x));
  const smooth = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const flows = [staff, partner].map(element => ({ element, messages: [...element.children].map(node => ({ node, at: Number(node.dataset.chatAt), end: 0, offset: 0 })) }));
  let enabled = false, active = false, frame = 0, time = .8, target = .8, previousFrame = 0;
  let top = 108, travel = 2400, bodyHeight = 400, chapter = -1, partnerMode = false;

  function measureMessages() {
    bodyHeight = body.clientHeight;
    flows.forEach(flow => flow.messages.forEach(message => {
      message.end = message.node.offsetTop + message.node.offsetHeight;
      message.offset = Math.max(0, message.end - (bodyHeight - 70));
    }));
  }
  function paintFlow(flow, value) {
    let last = -1;
    flow.messages.forEach((message, index) => {
      const amount = smooth((value - message.at) / .7);
      const typing = message.node.classList.contains('chat-typing');
      const opacity = typing ? amount * (1 - smooth((value - 25.2) / .5)) : amount;
      message.node.style.opacity = opacity;
      message.node.style.transform = `translate3d(0,${16 * (1 - amount)}px,0) scale(${.97 + .03 * amount})`;
      if (value >= message.at) last = index;
      if (typing) [...message.node.children].forEach((dot, i) => { dot.style.transform = `translateY(${-2 * Math.sin((value - message.at) * 8 - i) * opacity}px)`; });
    });
    const end = last >= 0 ? flow.messages[last].offset : 0;
    const start = last > 0 ? flow.messages[last - 1].offset : 0;
    const camera = last >= 0 ? start + (end - start) * smooth((value - flow.messages[last].at) / .9) : 0;
    flow.element.style.transform = `translate3d(0,${-camera}px,0)`;
  }
  function render(value) {
    // Move the date out of the way before messages reach the top edge.
    date.style.opacity = 1 - smooth((value - 3) / 1.2);
    const handoff = smooth((value - 20.2) / 1.2);
    staff.style.opacity = 1 - handoff;
    partner.style.opacity = handoff;
    paintFlow(flows[0], value);
    paintFlow(flows[1], value);
    const nextMode = handoff > .5;
    if (nextMode !== partnerMode) {
      partnerMode = nextMode;
      person.textContent = partnerMode ? 'Partner’s conversation' : 'Staff member’s conversation';
    }
    composer.textContent = value >= 21 && value < 22.5 ? request.slice(0, Math.round(clamp((value - 21) / 1.35) * request.length)) || 'Message' : 'Message';
    let selected = 0;
    chapterStarts.forEach((at, i) => { if (value >= at) selected = i; });
    chapters.forEach((item, i) => {
      const enter = i === 0 ? 1 : smooth((value - chapterStarts[i]) / .65);
      const leave = i === chapters.length - 1 ? 1 : 1 - smooth((value - chapterStarts[i + 1]) / .65);
      const opacity = enter * leave;
      item.style.opacity = opacity;
      item.style.transform = `translate3d(0,${(1 - enter) * 10 - (1 - leave) * 10}px,0)`;
    });
    if (selected !== chapter) {
      chapter = selected;
      chapters.forEach((item, i) => { item.classList.toggle('is-current', i === selected); item.setAttribute('aria-hidden', String(i !== selected)); });
      buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === selected)));
    }
    progress.style.transform = `scaleX(${clamp((value - .8) / 30.7)})`;
  }
  function position() {
    if (!enabled) return;
    const rect = track.getBoundingClientRect();
    target = .8 + clamp((top - rect.top) / travel) * 30.7;
  }
  function animate(timestamp) {
    frame = 0;
    if (!enabled) return;
    const delta = previousFrame ? Math.min(50, timestamp - previousFrame) : 16.7;
    previousFrame = timestamp;
    // A small time-based damp keeps trackpads smooth without tying speed to refresh rate.
    time += (target - time) * (1 - Math.exp(-delta / 62));
    if (Math.abs(target - time) < .003) time = target;
    render(time);
    if (time !== target && active) frame = requestAnimationFrame(animate);
    else previousFrame = 0;
  }
  function schedule() {
    if (enabled && !frame) frame = requestAnimationFrame(animate);
  }
  function resetStatic() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0; previousFrame = 0; chapter = -1; partnerMode = false;
    root.classList.remove('chat-enhanced', 'chat-in-view');
    person.textContent = 'Staff member’s conversation';
    composer.textContent = 'Message';
    chapters.forEach(item => { item.removeAttribute('style'); item.removeAttribute('aria-hidden'); });
    flows.forEach(flow => { flow.element.removeAttribute('style'); flow.element.removeAttribute('aria-hidden'); flow.messages.forEach(message => message.node.removeAttribute('style')); });
    summary.hidden = true;
  }
  function configure() {
    const header = document.querySelector('.site-header');
    top = (header?.getBoundingClientRect().height || 72) + 14;
    const available = Math.floor(innerHeight - top - 18);
    const mobile = innerWidth <= 760;
    enabled = !reduced.matches && available >= (mobile ? 545 : 510) && typeof requestAnimationFrame === 'function';
    if (!enabled) { resetStatic(); return; }
    root.style.setProperty('--chat-top', `${top}px`);
    root.style.setProperty('--chat-available', `${available}px`);
    travel = Math.max(mobile ? 1700 : 2100, available * (mobile ? 3.8 : 4.2));
    root.style.setProperty('--chat-travel', `${travel}px`);
    root.classList.add('chat-enhanced');
    if (active) root.classList.add('chat-in-view');
    // The animated chat is decorative; its readable summary is stable for assistive tech.
    staff.setAttribute('aria-hidden', 'true');
    partner.setAttribute('aria-hidden', 'true');
    summary.hidden = false;
    measureMessages();
    position();
    time = target;
    chapter = -1;
    render(time);
  }
  buttons.forEach((button, i) => button.addEventListener('click', () => {
    if (!enabled) return;
    const y = track.getBoundingClientRect().top + scrollY - top + ((jumpTimes[i] - .8) / 30.7) * travel;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }));
  addEventListener('scroll', () => { if (!enabled) return; position(); if (active) schedule(); }, { passive: true });
  let resizeFrame = 0;
  addEventListener('resize', () => { if (!resizeFrame) resizeFrame = requestAnimationFrame(() => { resizeFrame = 0; configure(); }); }, { passive: true });
  reduced.addEventListener('change', configure);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      active = entries[0].isIntersecting;
      root.classList.toggle('chat-in-view', enabled && active);
      if (active && enabled) { position(); time = target; render(time); schedule(); }
    }, { rootMargin: '100px 0px' });
    observer.observe(track);
  } else active = true;
  if ('ResizeObserver' in window) {
    new ResizeObserver(() => { if (enabled) { measureMessages(); render(time); } }).observe(body);
    const header = document.querySelector('.site-header');
    if (header) new ResizeObserver(configure).observe(header);
  }
  configure();
  document.fonts?.ready.then(() => { if (enabled) { measureMessages(); render(time); } });
})();
