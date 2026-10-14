// Screenshots open over the page instead of as a bare image file.
// Click, Escape or ✕ closes; arrows and the side buttons switch pictures.
// Without JavaScript the links still open the image itself.
(() => {
  const links = [...document.querySelectorAll('.shots a')];
  if (!links.length) return;

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.innerHTML =
    '<img alt="">' +
    '<button class="lightbox-close" type="button" aria-label="Close">×</button>' +
    '<button class="lightbox-prev" type="button" aria-label="Previous">‹</button>' +
    '<button class="lightbox-next" type="button" aria-label="Next">›</button>';
  document.body.append(box);
  const img = box.querySelector('img');

  let current = 0;
  const show = i => {
    current = (i + links.length) % links.length;
    img.src = links[current].href;
    img.alt = links[current].querySelector('img')?.alt || '';
  };
  const close = () => {
    box.hidden = true;
    document.body.classList.remove('lightbox-open');
    links[current].focus();
  };

  links.forEach((link, i) => link.addEventListener('click', e => {
    e.preventDefault();
    show(i);
    box.hidden = false;
    document.body.classList.add('lightbox-open');
    box.querySelector('.lightbox-close').focus();
  }));

  box.addEventListener('click', e => {
    if (e.target.closest('.lightbox-prev')) show(current - 1);
    else if (e.target.closest('.lightbox-next')) show(current + 1);
    else close();
  });

  document.addEventListener('keydown', e => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
  });
})();
