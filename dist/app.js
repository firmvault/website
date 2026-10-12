(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const menu = $('.menu-toggle');
  const nav = $('#mobile-nav');
  function closeMenu() {
    if (!menu || !nav) return;
    nav.hidden = true;
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
  }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    nav.hidden = !open;
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  $$('a', nav || document.createElement('div')).forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  matchMedia('(min-width: 981px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  $('.back-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' }));

  const steps = $$('[data-workflow-step]');
  const scene = $('.workflow-screen');
  const sceneButtons = $$('[data-scene-target]');
  const statuses = { receive: 'Received', organise: 'Filed', pending: 'Filing', retrieve: 'Found' };
  function setScene(value) {
    if (!scene || scene.dataset.scene === value) return;
    scene.dataset.scene = value;
    $$('.scene-details', scene).forEach(detail => detail.setAttribute('aria-hidden', String(!detail.classList.contains(`scene-${value}`))));
    const index = steps.findIndex(step => step.dataset.workflowStep === value);
    $('.scene-counter').textContent = `0${index + 1} / 04`;
    $('.journey-status').textContent = statuses[value];
    steps.forEach(step => step.classList.toggle('is-current', step.dataset.workflowStep === value));
    sceneButtons.forEach(button => {
      const active = button.dataset.sceneTarget === value;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
  sceneButtons.forEach(button => button.addEventListener('click', () => {
    const step = steps.find(item => item.dataset.workflowStep === button.dataset.sceneTarget);
    if (!step) return;
    const offset = innerWidth <= 760 ? $('.workflow-sticky').getBoundingClientRect().height + 100 : 145;
    window.scrollTo({ top: step.getBoundingClientRect().top + scrollY - offset, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    setScene(button.dataset.sceneTarget);
  }));

  const progress = $('.scroll-progress');
  const scatter = $('.scatter-scene');
  let ticking = false;
  function onScroll() {
    const height = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${height > 0 ? Math.min(1, Math.max(0, scrollY / height)) : 0})`;
    if (steps.length) {
      const stickyBottom = $('.workflow-sticky').getBoundingClientRect().bottom;
      const marker = innerWidth <= 760 ? Math.min(innerHeight - 40, Math.max(innerHeight * .65, stickyBottom + 85)) : innerHeight * .53;
      let selected = steps[0];
      let closest = Infinity;
      steps.forEach(step => {
        const rect = step.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height * .42 - marker);
        if (distance < closest) { closest = distance; selected = step; }
      });
      setScene(selected.dataset.workflowStep);
    }
    if (scatter && !reducedMotion.matches) {
      const rect = scatter.getBoundingClientRect();
      if (rect.top < innerHeight && rect.bottom > 0) {
        const distance = (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight;
        scatter.style.setProperty('--scatter-offset', `${Math.max(-18, Math.min(18, distance * 45))}px`);
      }
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  const art = $('.hero-art');
  if (art && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    art.addEventListener('pointermove', event => {
      if (reducedMotion.matches) return;
      const bounds = art.getBoundingClientRect();
      art.style.setProperty('--pointer-x', `${(event.clientX - bounds.left - bounds.width / 2) * .018}px`);
      art.style.setProperty('--pointer-y', `${(event.clientY - bounds.top - bounds.height / 2) * .018}px`);
    });
    art.addEventListener('pointerleave', () => { art.style.setProperty('--pointer-x', '0px'); art.style.setProperty('--pointer-y', '0px'); });
  }
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08, rootMargin: '0px 0px -25px 0px' });
    document.body.classList.add('motion-ready');
    $$('.reveal').forEach(element => observer.observe(element));
    reducedMotion.addEventListener('change', event => {
      if (event.matches) { document.body.classList.remove('motion-ready'); observer.disconnect(); }
    });
  }

  const rows = $$('.vault-row');
  const search = $('#preview-search');
  let filter = 'all';
  function filterRows() {
    let count = 0;
    const query = (search?.value || '').trim().toLowerCase();
    rows.forEach(row => {
      const match = row.textContent.toLowerCase().includes(query) && (filter === 'all' || row.dataset.status === filter);
      row.hidden = !match;
      if (match) count++;
    });
    if ($('.preview-empty')) $('.preview-empty').hidden = count !== 0;
    if ($('.preview-count')) $('.preview-count').textContent = `${count} example document${count === 1 ? '' : 's'}`;
  }
  search?.addEventListener('input', filterRows);
  $$('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    $$('[data-filter]').forEach(tab => { const active = tab === button; tab.classList.toggle('is-active', active); tab.setAttribute('aria-pressed', String(active)); });
    filterRows();
  }));
  const examples = [
    { filename: 'Sharma_GST_Sep.pdf', client: 'Sharma Traders', service: 'GST', type: 'Return', period: 'September 2026', status: 'Filed' },
    { filename: 'PAN_scan.jpg', client: 'Unknown client', service: 'KYC', type: 'Not yet classified', period: 'Not set', status: 'Pending' },
    { filename: 'HDFC_bank_stmt.pdf', client: 'Patil & Co', service: 'Bank', type: 'Statement', period: 'Not set', status: 'Filed' }
  ];
  const dialog = $('#document-dialog');
  let dialogTrigger;
  rows.forEach(row => row.addEventListener('click', () => {
    const example = examples[Number(row.dataset.document)];
    if (!dialog || !example) return;
    dialogTrigger = row;
    $('#document-dialog-title').textContent = example.filename;
    const fields = $('.dialog-fields');
    fields.replaceChildren();
    [['Client', example.client], ['Service', example.service], ['Document type', example.type], ['Period', example.period], ['Status', example.status]].forEach(([label, value]) => {
      const block = document.createElement('div');
      const labelElement = document.createElement('span');
      const valueElement = document.createElement('strong');
      labelElement.textContent = label.toUpperCase(); valueElement.textContent = value;
      block.append(labelElement, valueElement); fields.append(block);
    });
    dialog.showModal();
  }));
  $$('.dialog-close, .dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog?.addEventListener('close', () => dialogTrigger?.focus());
  dialog?.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });

  const billingButtons = $$('[data-billing]');
  billingButtons.forEach(button => button.addEventListener('click', () => {
    const annual = button.dataset.billing === 'annual';
    billingButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    $$('[data-plan-price]').forEach(price => {
      price.textContent = annual ? '₹' + (Math.round(Number(price.dataset.monthly) * .85 / 10) * 10).toLocaleString('en-IN') : price.dataset.monthlyLabel;
    });
    $$('[data-price-period]').forEach(label => { label.textContent = annual ? '/month · billed annually' : '/month'; });
    $('#billing-note').textContent = annual
      ? 'Annual view shows an illustrative 15% prepay discount; the exact percentage is confirmed at sign-up. WhatsApp provider charges are passed through at cost.'
      : 'Annual prepayment earns a discount. WhatsApp provider charges are passed through at cost.';
  }));

  const form = $('#demo-form');
  const trialEnquiry = location.hash === '#trial-enquiry';
  if (form && trialEnquiry) {
    $('#booking-title').textContent = 'Request a free trial.';
    $('.booking-intro').textContent = 'Send a free-trial enquiry by email. Our team will discuss the plan and coordinate your 15-minute walkthrough.';
    $('.form-submit', form).textContent = 'Prepare trial enquiry';
  }
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const firm = String(data.get('firm') || '').trim();
    if (!name || !firm) {
      const invalid = !name ? $('#demo-name') : $('#demo-firm');
      invalid.setCustomValidity('Please enter a name rather than spaces.'); invalid.reportValidity();
      invalid.addEventListener('input', () => invalid.setCustomValidity(''), { once: true });
      return;
    }
    const type = String(data.get('type') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = `FirmVault ${trialEnquiry ? 'free-trial' : 'demo'} enquiry — ${firm.replace(/[\r\n]/g, ' ')}`;
    const body = `Hello FirmVault team,\n\n${trialEnquiry ? "I'd like to discuss a free trial and a 15-minute walkthrough for our firm." : "I'd like to arrange a demo for our firm."}\n\nName: ${name}\nFirm: ${firm}\nEmail: ${email}${type ? `\nPractice: ${type}` : ''}${message ? `\n\nOur document workflow / questions:\n${message}` : ''}\n\nPlease contact me to coordinate a suitable time.\n\nThank you,\n${name}`;
    $('#email-copy').value = `To: contact@nexosk.in\nSubject: ${subject}\n\n${body}`;
    $('#email-fallback').hidden = false;
    $('#email-status').textContent = 'Your request is ready. Send it from your email app to arrange your demo.';
    const mail = document.createElement('a');
    mail.href = `mailto:contact@nexosk.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    mail.click();
    $('#email-fallback').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'nearest' });
  });
  $('#copy-email')?.addEventListener('click', async () => {
    const text = $('#email-copy').value;
    try {
      await navigator.clipboard.writeText(text);
      $('#email-status').textContent = 'Request copied. Paste it into an email to contact@nexosk.in and send it to arrange your demo.';
    } catch {
      $('#email-copy').focus(); $('#email-copy').select();
      $('#email-status').textContent = 'Your request is selected. Copy it and email it to contact@nexosk.in.';
    }
  });
})();
