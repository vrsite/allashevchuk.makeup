const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.querySelector('.menu-overlay');

function setMenu(open) {
  body.classList.toggle('menu-open', open);
  menuToggle?.setAttribute('aria-expanded', String(open));
  menuOverlay?.setAttribute('aria-hidden', String(!open));
}

menuToggle?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
document.querySelectorAll('.overlay-nav a, .menu-footer a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// Never carry the mobile overlay into the desktop layout after a resize/orientation change.
const desktopMenuBreakpoint = window.matchMedia('(min-width: 1025px)');
const closeMobileMenuOnDesktop = event => {
  if (event.matches) setMenu(false);
};
desktopMenuBreakpoint.addEventListener?.('change', closeMobileMenuOnDesktop);
if (desktopMenuBreakpoint.matches) setMenu(false);

// Booking chooser modal
const bookingModal = document.querySelector('.booking-modal');
const bookingDialog = bookingModal?.querySelector('.booking-dialog');
const bookingClose = bookingModal?.querySelector('.booking-close');
let lastFocused = null;
let lockedScrollY = 0;

function lockPageScroll() {
  if (body.classList.contains('modal-open')) return;
  lockedScrollY = window.scrollY;
  body.style.position = 'fixed';
  body.style.top = `-${lockedScrollY}px`;
  body.style.left = '0';
  body.style.right = '0';
  body.style.width = '100%';
  body.classList.add('modal-open');
}

function unlockPageScroll() {
  if (!body.classList.contains('modal-open')) return;
  body.classList.remove('modal-open');
  body.style.position = '';
  body.style.top = '';
  body.style.left = '';
  body.style.right = '';
  body.style.width = '';
  window.scrollTo(0, lockedScrollY);
}

function setBooking(open) {
  if (!bookingModal) return;
  if (open) {
    lastFocused = document.activeElement;
    bookingModal.classList.add('open');
    bookingModal.setAttribute('aria-hidden', 'false');
    lockPageScroll();
    window.setTimeout(() => bookingDialog?.focus({ preventScroll:true }), 60);
  } else {
    bookingModal.classList.remove('open');
    bookingModal.setAttribute('aria-hidden', 'true');
    unlockPageScroll();
    lastFocused?.focus?.({ preventScroll:true });
  }
}

document.querySelectorAll('[data-booking]').forEach(el => el.addEventListener('click', e => {
  e.preventDefault();
  setBooking(true);
}));
bookingClose?.addEventListener('click', () => setBooking(false));
bookingModal?.addEventListener('click', e => { if (e.target === bookingModal) setBooking(false); });
bookingDialog?.addEventListener('click', e => e.stopPropagation());

// FAQ accordion
for (const item of document.querySelectorAll('.accordion-item')) {
  const trigger = item.querySelector('.accordion-trigger');
  const panel = item.querySelector('.accordion-panel');
  trigger.addEventListener('click', () => {
    const open = item.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(open));
    panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
  });
}

// Curated category collections. Only the selected category is rendered, keeping the page light.
const portfolioData = {
  makeup: {
    title: 'МАКІЯЖ',
    items: [
      ['assets/gallery/makeup/editorial-red.webp','EDITORIAL MAKE-UP'], ['assets/gallery/makeup/flowers.webp','MAKE-UP · ФОТОСЕСІЯ'],
      ['assets/gallery/makeup/portrait-dark.webp','ВЕЧІРНІЙ МАКІЯЖ'], ['assets/gallery/makeup/evening-black.webp','SOFT GLAM'],
      ['assets/gallery/makeup/soft-black.webp','КЛАСИЧНИЙ ОБРАЗ'], ['assets/gallery/makeup/portrait-alla.webp','NATURAL BEAUTY'],
      ['assets/gallery/makeup/rose.webp','ROSE MAKE-UP'], ['assets/gallery/makeup/warm.webp','ТЕПЛИЙ МАКІЯЖ'],
      ['assets/gallery/makeup/sunlight.webp','ДЕННИЙ ОБРАЗ'], ['assets/gallery/makeup/curls.webp','MAKE-UP & CURLS'],
      ['assets/gallery/makeup/violet.webp','ВЕЧІРНІЙ АКЦЕНТ'], ['assets/gallery/makeup/violet-close.webp','BEAUTY PORTRAIT']
    ]
  },
  bride: {
    title: 'НАРЕЧЕНІ',
    items: [
      ['assets/gallery/bride/window-01.webp','РАНОК НАРЕЧЕНОЇ'], ['assets/gallery/bride/window-02.webp','НІЖНИЙ ОБРАЗ'],
      ['assets/gallery/bride/tea.webp','WEDDING MORNING'], ['assets/gallery/bride/chair.webp','BRIDAL PORTRAIT'],
      ['assets/gallery/bride/sunset.webp','ВЕСІЛЬНИЙ ОБРАЗ'], ['assets/gallery/bride/veil-garden.webp','КЛАСИЧНА НАРЕЧЕНА'],
      ['assets/gallery/bride/bouquet.webp','BRIDAL BEAUTY'], ['assets/gallery/bride/artist.webp','ОБРАЗ У 4 РУКИ'],
      ['assets/gallery/bride/preparation.webp','ПІДГОТОВКА'], ['assets/gallery/bride/morning.webp','SOFT BRIDAL'],
      ['assets/gallery/bride/hotel.webp','HOTEL MORNING'], ['assets/gallery/bride/minimal.webp','MINIMAL BRIDE']
    ]
  },
  looks: {
    title: 'ОБРАЗИ',
    items: [
      ['assets/gallery/looks/silver.webp','SILVER LOOK'], ['assets/gallery/looks/graphic.webp','GRAPHIC MAKE-UP'],
      ['assets/gallery/looks/black-dress.webp','BLACK DRESS'], ['assets/gallery/looks/editorial.webp','RED EDITORIAL'],
      ['assets/gallery/looks/red-room.webp','RED ROOM'], ['assets/gallery/looks/city-black.webp','CITY LOOK'],
      ['assets/gallery/looks/city-camel.webp','STREET STYLE'], ['assets/gallery/looks/flowers-city.webp','FLOWER STORY'],
      ['assets/video/beauty-process-01.mp4','BEAUTY PROCESS · VIDEO 01','video','assets/video/beauty-process-01-poster.jpg'],
      ['assets/video/beauty-process-02.mp4','BEAUTY PROCESS · VIDEO 02','video','assets/video/beauty-process-02-poster.jpg'],
      ['assets/video/beauty-process-03.mp4','BEAUTY PROCESS · VIDEO 03','video','assets/video/beauty-process-03-poster.jpg'],
      ['assets/video/beauty-process-04.mp4','BEAUTY PROCESS · VIDEO 04','video','assets/video/beauty-process-04-poster.jpg']
    ]
  },
  brows: {
    title: 'БРОВИ',
    items: [
      ['assets/gallery/brows/violet.webp','ПРИРОДНА ФОРМА'], ['assets/gallery/brows/violet-soft.webp','SOFT BROWS'],
      ['assets/gallery/brows/pink.webp','BEAUTY BROWS'], ['assets/gallery/brows/dark.webp','ВИРАЗНИЙ ПОГЛЯД'],
      ['assets/gallery/brows/dark-soft.webp','NATURAL SHAPE'], ['assets/gallery/brows/natural.webp','ДОГЛЯНУТІ БРОВИ'],
      ['assets/gallery/brows/natural-soft.webp','МʼЯКА КОРЕКЦІЯ']
    ]
  }
};

const allSelection = [
  ['makeup',0], ['bride',1], ['looks',8], ['makeup',1], ['looks',2], ['brows',0]
];
const portfolioGrid = document.querySelector('.portfolio-grid');
const tabButtons = document.querySelectorAll('.portfolio-tabs button');
const lensSupported = window.matchMedia('(hover:hover) and (pointer:fine) and (min-width:1025px) and (prefers-reduced-motion:no-preference)').matches;
const portfolioLens = lensSupported ? document.body.appendChild(Object.assign(document.createElement('div'), { className:'portfolio-lens', ariaHidden:'true' })) : null;
if (lensSupported) body.classList.add('lens-enabled');

function bindPortfolioLens(card) {
  if (!portfolioLens) return;
  const preview = card.querySelector('img');
  const radius = 56;
  const zoom = 1.62;
  card.addEventListener('pointerenter', () => {
    portfolioLens.style.backgroundImage = `url("${preview.currentSrc || preview.src}")`;
    portfolioLens.classList.add('visible');
  });
  card.addEventListener('pointermove', e => {
    const rect = card.getBoundingClientRect();
    const naturalW = preview.naturalWidth || rect.width;
    const naturalH = preview.naturalHeight || rect.height;
    const coverScale = Math.max(rect.width / naturalW, rect.height / naturalH);
    const shownW = naturalW * coverScale;
    const shownH = naturalH * coverScale;
    const offsetX = (rect.width - shownW) / 2;
    const offsetY = (rect.height - shownH) / 2;
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    portfolioLens.style.left = `${e.clientX}px`;
    portfolioLens.style.top = `${e.clientY}px`;
    portfolioLens.style.backgroundSize = `${shownW * zoom}px ${shownH * zoom}px`;
    portfolioLens.style.backgroundPosition = `${radius - (localX - offsetX) * zoom}px ${radius - (localY - offsetY) * zoom}px`;
  });
  card.addEventListener('pointerleave', () => portfolioLens.classList.remove('visible'));
  card.addEventListener('pointercancel', () => portfolioLens.classList.remove('visible'));
  card.addEventListener('click', () => portfolioLens.classList.remove('visible'));
}

function cardMarkup(category, item, index) {
  const [src, label, type, poster] = item;
  const preview = type === 'video' ? poster : src;
  return `<figure class="portfolio-card reveal visible filter-pop" data-category="${category}" data-index="${index}" tabindex="0" role="button" aria-label="Відкрити: ${label}">
    <img src="${preview}" alt="${label}" loading="lazy" decoding="async">${type === 'video' ? '<i class="portfolio-play" aria-hidden="true">▶</i>' : ''}<figcaption>${label}</figcaption><b>${String(index + 1).padStart(2,'0')}</b>
  </figure>`;
}

function renderPortfolio(filter = 'all') {
  if (!portfolioGrid) return;
  const cards = filter === 'all'
    ? allSelection.map(([category,index]) => cardMarkup(category, portfolioData[category].items[index], index))
    : portfolioData[filter].items.map((item,index) => cardMarkup(filter,item,index));
  portfolioGrid.classList.toggle('category-view', filter !== 'all');
  portfolioGrid.innerHTML = cards.join('');
  portfolioGrid.querySelectorAll('.portfolio-card').forEach((card,i) => {
    card.style.setProperty('--delay',`${Math.min(i,8) * 35}ms`);
    card.addEventListener('click', () => openGallery(card.dataset.category, Number(card.dataset.index)));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); } });
    bindPortfolioLens(card);
  });
}

tabButtons.forEach(btn => btn.addEventListener('click', () => {
  tabButtons.forEach(b => b.classList.remove('is-active'));
  btn.classList.add('is-active');
  renderPortfolio(btn.dataset.filter || 'all');
}));

const galleryModal = document.querySelector('.gallery-modal');
const galleryImage = galleryModal?.querySelector('.gallery-image-wrap img');
const galleryVideo = galleryModal?.querySelector('.gallery-image-wrap video');
const galleryTitle = galleryModal?.querySelector('#gallery-title');
const galleryCaption = galleryModal?.querySelector('.gallery-caption');
const galleryCurrent = galleryModal?.querySelector('.gallery-count span');
const galleryTotal = galleryModal?.querySelector('.gallery-count b');
const galleryThumbs = galleryModal?.querySelector('.gallery-thumbs');
const galleryClose = galleryModal?.querySelector('.gallery-close');
let galleryCategory = 'makeup';
let galleryIndex = 0;
let galleryLastFocus = null;

function showGalleryImage(index, animate = true) {
  const collection = portfolioData[galleryCategory];
  galleryIndex = (index + collection.items.length) % collection.items.length;
  const [src,label,type,poster] = collection.items[galleryIndex];
  galleryVideo?.pause();
  if (animate) galleryModal.classList.add('changing');
  window.setTimeout(() => {
    const isVideo = type === 'video';
    galleryImage.hidden = isVideo;
    galleryVideo.hidden = !isVideo;
    if (isVideo) {
      galleryVideo.poster = poster;
      if (galleryVideo.getAttribute('src') !== src) galleryVideo.src = src;
    } else {
      galleryVideo.removeAttribute('src');
      galleryVideo.load();
      galleryImage.src = src;
      galleryImage.alt = label;
    }
    galleryCaption.textContent = label;
    galleryCurrent.textContent = String(galleryIndex + 1).padStart(2,'0');
    galleryThumbs?.querySelectorAll('.gallery-thumb').forEach((thumb,i) => thumb.classList.toggle('active', i === galleryIndex));
    galleryThumbs?.querySelector('.gallery-thumb.active')?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
    galleryModal.classList.remove('changing');
  }, animate ? 170 : 0);
}

function openGallery(category, index = 0) {
  if (!galleryModal || !portfolioData[category]) return;
  galleryLastFocus = document.activeElement;
  galleryCategory = category;
  galleryTitle.textContent = portfolioData[category].title;
  galleryTotal.textContent = String(portfolioData[category].items.length).padStart(2,'0');
  galleryThumbs.innerHTML = portfolioData[category].items.map(([src,label,type,poster],i) => `<button class="gallery-thumb${type === 'video' ? ' is-video' : ''}" type="button" aria-label="${i + 1}: ${label}"><img src="${type === 'video' ? poster : src}" alt="" loading="lazy"></button>`).join('');
  galleryThumbs.querySelectorAll('.gallery-thumb').forEach((thumb,i) => thumb.addEventListener('click', () => showGalleryImage(i)));
  galleryModal.classList.add('open');
  galleryModal.setAttribute('aria-hidden','false');
  body.classList.add('modal-open');
  showGalleryImage(index,false);
  window.setTimeout(() => galleryClose?.focus(),80);
}

function closeGallery() {
  galleryVideo?.pause();
  galleryModal?.classList.remove('open');
  galleryModal?.setAttribute('aria-hidden','true');
  body.classList.remove('modal-open');
  galleryLastFocus?.focus?.();
}

galleryClose?.addEventListener('click',closeGallery);
galleryModal?.querySelector('.gallery-prev')?.addEventListener('click',() => showGalleryImage(galleryIndex - 1));
galleryModal?.querySelector('.gallery-next')?.addEventListener('click',() => showGalleryImage(galleryIndex + 1));
galleryModal?.addEventListener('click',e => { if (e.target === galleryModal) closeGallery(); });
galleryModal?.querySelector('.gallery-stage')?.addEventListener('click',e => {
  if (e.target.matches('.gallery-stage, .gallery-image-wrap')) closeGallery();
});
let touchStartX = 0;
galleryModal?.addEventListener('touchstart',e => { touchStartX = e.changedTouches[0].clientX; },{passive:true});
galleryModal?.addEventListener('touchend',e => {
  const distance = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) > 55) showGalleryImage(galleryIndex + (distance < 0 ? 1 : -1));
},{passive:true});

renderPortfolio();

// Reveal on scroll with slight staggering.
const revealEls = document.querySelectorAll('.reveal');
revealEls.forEach((el, i) => el.style.setProperty('--reveal-delay', `${(i % 4) * 55}ms`));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -4% 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// Header, nav state and reading progress.
const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress span');
const mobileBooking = document.querySelector('.mobile-booking');
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const trackedSections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

function onScroll() {
  const y = window.scrollY;
  header?.classList.toggle('scrolled', y > 60);
  mobileBooking?.classList.toggle('is-visible', y > window.innerHeight * .72);
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  if (progress) progress.style.transform = `scaleX(${Math.min(1, y / max)})`;

  const marker = y + window.innerHeight * .32;
  let current = null;
  trackedSections.forEach(section => { if (section.offsetTop <= marker) current = section.id; });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', onScroll, { passive:true });
onScroll();

// Reliable back-to-top behavior for Safari, file:// previews and hosted builds.
document.querySelector('.back-top')?.addEventListener('click', e => {
  e.preventDefault();
  setMenu(false);
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  window.scrollTo({ top:0, left:0, behavior });
  if (history.replaceState) history.replaceState(null, '', `${location.pathname}${location.search}#top`);
});

// Subtle hero parallax on desktop only.
const heroBg = document.querySelector('.hero-bg');
if (heroBg && window.matchMedia('(min-width: 1025px) and (prefers-reduced-motion: no-preference)').matches) {
  window.addEventListener('scroll', () => {
    const y = Math.min(window.scrollY, window.innerHeight);
    heroBg.style.transform = `scale(1.025) translate3d(0, ${y * .035}px, 0)`;
  }, { passive:true });
}

// Close overlays via Escape.
document.addEventListener('keydown', e => {
  if (galleryModal?.classList.contains('open')) {
    if (e.key === 'ArrowLeft') showGalleryImage(galleryIndex - 1);
    if (e.key === 'ArrowRight') showGalleryImage(galleryIndex + 1);
    if (e.key === 'Escape') closeGallery();
    return;
  }
  if (e.key !== 'Escape') return;
  if (body.classList.contains('menu-open')) setMenu(false);
  if (bookingModal?.classList.contains('open')) setBooking(false);
});

// Hero entrance after assets settle.
window.addEventListener('load', () => body.classList.add('loaded'));
