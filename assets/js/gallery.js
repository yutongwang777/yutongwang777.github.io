(() => {
  document.querySelectorAll('.life-gallery').forEach(gallery => {
    const viewport = gallery.querySelector('.life-gallery__viewport');
    const track = gallery.querySelector('.life-gallery__track');
    const cards = [...track.children];
    const dots = gallery.querySelector('.life-gallery__dots');
    const dialog = gallery.querySelector('.life-gallery__dialog');
    const detail = dialog.querySelector('.life-gallery__detail');
    let previousOverflow, activeCard;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0, max = 0, timer, paused = reduced.matches, hovering = false;
    function render() {
      const step = cards[0].getBoundingClientRect().width + 22;
      const visible = Math.max(1, Math.round((viewport.clientWidth + 22) / step));
      max = Math.max(0, cards.length - visible);
      index = Math.min(index, max);
      track.style.transform = `translateX(-${index * step}px)`;
      if (dots.children.length !== cards.length) dots.replaceChildren(...Array.from({length: cards.length}, (_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button'; dot.setAttribute('aria-label', `Show gallery item ${i + 1}`);
        dot.addEventListener('click', () => { index = Math.min(i, max); render(); schedule(); });
        return dot;
      }));
      [...dots.children].forEach((dot, i) => {
        dot.setAttribute('aria-pressed', String(i >= index && i < index + visible));
      });
    }
    function schedule() {
      clearInterval(timer);
      if (!paused && !hovering && !dialog.open && !document.hidden && !gallery.contains(document.activeElement)) {
        timer = setInterval(() => { index = (index + 1) % (max + 1); render(); }, 3000);
      }
    }
    function move(delta) { index = (index + delta + max + 1) % (max + 1); render(); schedule(); }
    gallery.querySelector('.life-gallery__arrow--prev').addEventListener('click', () => move(-1));
    gallery.querySelector('.life-gallery__arrow--next').addEventListener('click', () => move(1));
    cards.forEach(card => {
      function open() {
        activeCard = card;
        const expanded = card.cloneNode(true);
        expanded.removeAttribute('role');
        expanded.removeAttribute('tabindex');
        expanded.removeAttribute('aria-haspopup');
        expanded.removeAttribute('aria-label');
        detail.replaceChildren(expanded);
        dialog.setAttribute('aria-label', card.querySelector('h2').textContent);
        previousOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = 'hidden';
        schedule();
      }
      card.addEventListener('click', open);
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
      });
    });
    dialog.querySelector('.life-gallery__close').addEventListener('click', () => dialog.close());
    let backdropDown = false;
    function outside(event) {
      const r = dialog.getBoundingClientRect();
      return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
    }
    dialog.addEventListener('pointerdown', event => { backdropDown = outside(event); });
    dialog.addEventListener('click', event => { if (backdropDown && outside(event)) dialog.close(); });
    dialog.addEventListener('close', () => {
      document.body.style.overflow = previousOverflow;
      activeCard.focus({preventScroll: true});
      schedule();
    });
    viewport.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
    });
    gallery.addEventListener('mouseenter', () => { hovering = true; schedule(); });
    gallery.addEventListener('mouseleave', () => { hovering = false; schedule(); });
    gallery.addEventListener('focusin', schedule);
    gallery.addEventListener('focusout', () => setTimeout(schedule, 0));
    document.addEventListener('visibilitychange', schedule);
    reduced.addEventListener('change', () => { paused = reduced.matches; schedule(); });
    new ResizeObserver(() => { render(); schedule(); }).observe(viewport);
    render(); schedule();
  });
})();
