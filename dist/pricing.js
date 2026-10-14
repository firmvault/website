(() => {
  const root = document.querySelector('#pricing');
  if (!root) return;
  const money = value => '₹' + Math.round(value).toLocaleString('en-IN');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let seats = 3, storageBlocks = 0, displayed = 999, animation = 0;
  function update() {
    const storage = 20 + storageBlocks * 50;
    const seatCost = (seats - 3) * 500, storageCost = storageBlocks * 500;
    const total = 999 + seatCost + storageCost;
    root.querySelector('#pv-seats-display').textContent = seats;
    root.querySelector('#pv-storage-display').replaceChildren(document.createTextNode(String(storage)), Object.assign(document.createElement('span'), {textContent:'GB'}));
    root.querySelector('#pv-seat-quantity').textContent = `${seats - 3} added`;
    root.querySelector('#pv-storage-quantity').textContent = storageBlocks ? `${storageBlocks * 50}GB added` : '0 added';
    root.querySelector('#pv-seat-cost').textContent = money(seatCost);
    root.querySelector('#pv-storage-cost').textContent = money(storageCost);
    root.querySelector('#pv-configuration').textContent = `${seats} seats · ${storage}GB storage`;
    root.querySelector('[data-change="seats:-1"]').disabled = seats <= 3;
    root.querySelector('[data-change="storage:-1"]').disabled = storageBlocks <= 0;
    root.querySelector('[data-change="seats:1"]').disabled = seats >= 999;
    root.querySelector('[data-change="storage:1"]').disabled = storageBlocks >= 999;
    root.querySelector('#pv-reset').disabled = seats === 3 && storageBlocks === 0;
    root.querySelector('#pv-calculation-status').textContent = `${money(total)} per month for ${seats} seats and ${storage}GB storage.`;
    cancelAnimationFrame(animation);
    const from = displayed, started = performance.now();
    function tick(now) {
      const progress = reduced.matches ? 1 : Math.min(1, (now - started) / 260);
      displayed = from + (total - from) * (1 - (1 - progress) ** 3);
      root.querySelector('#pv-estimate').textContent = money(displayed);
      if (progress < 1) animation = requestAnimationFrame(tick);
    }
    animation = requestAnimationFrame(tick);
  }
  root.querySelectorAll('[data-change]').forEach(button => button.addEventListener('click', () => {
    const [field, amount] = button.dataset.change.split(':');
    if (field === 'seats') seats = Math.max(3, Math.min(999, seats + Number(amount)));
    else storageBlocks = Math.max(0, Math.min(999, storageBlocks + Number(amount)));
    update();
  }));
  root.querySelector('#pv-example').addEventListener('click', () => { seats = 4; storageBlocks = 1; update(); });
  root.querySelector('#pv-reset').addEventListener('click', () => { seats = 3; storageBlocks = 0; update(); });
})();
