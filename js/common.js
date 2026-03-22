/* PicBrew — Shared Utilities */

// Desktop "More" dropdown for nav overflow
function initDesktopMore() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;
  const items = Array.from(navLinks.querySelectorAll(':scope > li'));
  const VISIBLE = 8;
  let coffeeItem = null;
  const toolItems = [];
  items.forEach(li => {
    if (li.querySelector('.nav-coffee')) coffeeItem = li;
    else toolItems.push(li);
  });
  if (toolItems.length > VISIBLE) {
    const overflow = toolItems.slice(VISIBLE);
    const moreLi = document.createElement('li');
    moreLi.className = 'nav-more';
    const btn = document.createElement('button');
    btn.className = 'nav-more-btn';
    btn.textContent = 'More \u25BE';
    btn.setAttribute('aria-expanded', 'false');
    moreLi.appendChild(btn);
    const dd = document.createElement('ul');
    dd.className = 'nav-more-dropdown';
    let hasActive = false;
    overflow.forEach(li => {
      navLinks.removeChild(li);
      if (li.querySelector('.active')) hasActive = true;
      dd.appendChild(li);
    });
    moreLi.appendChild(dd);
    if (hasActive) moreLi.classList.add('has-active');
    if (coffeeItem) navLinks.insertBefore(moreLi, coffeeItem);
    else navLinks.appendChild(moreLi);
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = moreLi.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    });
    dd.addEventListener('click', e => e.stopPropagation());
    dd.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href');
        if (href) { moreLi.classList.remove('open'); window.location.href = href; }
      });
    });
    document.addEventListener('click', () => {
      moreLi.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  }
}

// Mobile nav — full-screen categorized takeover
function initMobileNav() {
  const navEl = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (!navEl || !toggle) return;

  // Replace hamburger entity with animated bars
  toggle.textContent = '';
  for (let i = 0; i < 3; i++) {
    const bar = document.createElement('span');
    bar.className = 'hamburger-bar';
    toggle.appendChild(bar);
  }

  const currentPage = location.pathname.split('/').pop() || 'index.html';

  const categories = [
    { title: '✂️ Transform', items: [
      { href: 'resize.html', icon: '📐', label: 'Resize' },
      { href: 'crop.html', icon: '✂️', label: 'Crop' },
      { href: 'flip-rotate.html', icon: '🔄', label: 'Flip & Rotate' },
    ]},
    { title: '⚡ Optimize', items: [
      { href: 'compress.html', icon: '📦', label: 'Compress' },
      { href: 'convert.html', icon: '🔀', label: 'Convert' },
      { href: 'image-to-pdf.html', icon: '📄', label: 'To PDF' },
    ]},
    { title: '🎨 Effects', items: [
      { href: 'filters.html', icon: '🎛️', label: 'Filters' },
      { href: 'watermark.html', icon: '💧', label: 'Watermark' },
      { href: 'background-remover.html', icon: '🧹', label: 'BG Remover' },
      { href: 'denoise.html', icon: '✨', label: 'Denoise' },
    ]},
    { title: '🛠️ Create', items: [
      { href: 'meme.html', icon: '😂', label: 'Meme' },
      { href: 'collage.html', icon: '🖼️', label: 'Collage' },
      { href: 'mockup.html', icon: '📱', label: 'Mockup' },
      { href: 'qrcode.html', icon: '📱', label: 'QR Code' },
      { href: 'overlay.html', icon: '🔲', label: 'Overlay' },
    ]},
    { title: '🔧 Developer', items: [
      { href: 'base64.html', icon: '🔣', label: 'Base64' },
      { href: 'palette.html', icon: '🎯', label: 'Palette' },
    ]},
  ];

  const sectionsHTML = categories.map(cat => {
    const itemsHTML = cat.items.map(item => {
      const active = currentPage === item.href ? ' active' : '';
      return `<a href="${item.href}" class="mobile-nav-item${active}"><span class="mobile-nav-item-icon">${item.icon}</span><span class="mobile-nav-item-label">${item.label}</span></a>`;
    }).join('');
    return `<div class="mobile-nav-section"><div class="mobile-nav-section-title">${cat.title}</div><div class="mobile-nav-grid">${itemsHTML}</div></div>`;
  }).join('');

  const homeActive = (currentPage === 'index.html' || currentPage === '') ? ' active' : '';

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';

  // Create mobile nav
  const mobileNav = document.createElement('nav');
  mobileNav.className = 'mobile-nav';
  mobileNav.setAttribute('aria-label', 'Mobile navigation');
  mobileNav.innerHTML = `
    <div class="mobile-nav-header">
      <a href="index.html" class="mobile-nav-brand">Pic<span>Brew</span></a>
      <button class="mobile-nav-close" aria-label="Close menu">\u2715</button>
    </div>
    <a href="index.html" class="mobile-nav-home${homeActive}">\uD83C\uDFE0 All Tools</a>
    ${sectionsHTML}
    <div class="mobile-nav-privacy">\uD83D\uDEE1\uFE0F Your images never leave your device</div>
    <a href="https://buymeacoffee.com/dairylea" class="mobile-nav-coffee" target="_blank" rel="noopener">\u2615 Buy Me a Coffee</a>
  `;

  // Insert after the nav element
  navEl.after(overlay);
  overlay.after(mobileNav);

  let isOpen = false;

  function openNav() {
    if (isOpen) return;
    isOpen = true;
    toggle.classList.add('active');
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    if (!isOpen) return;
    isOpen = false;
    toggle.classList.remove('active');
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => isOpen ? closeNav() : openNav());
  overlay.addEventListener('click', closeNav);
  mobileNav.querySelector('.mobile-nav-close').addEventListener('click', closeNav);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeNav(); });
}

document.addEventListener('DOMContentLoaded', () => {
  initDesktopMore();
  initMobileNav();
});

/* ── File helpers ── */

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getExtension(filename) {
  return filename.split('.').pop().toLowerCase();
}

function baseName(filename) {
  return filename.replace(/\.[^.]+$/, '');
}

/* ── Drop zone setup ── */

function setupDropZone(zoneEl, fileInput, onFiles) {
  zoneEl.addEventListener('click', () => fileInput.click());

  zoneEl.addEventListener('dragover', e => {
    e.preventDefault();
    zoneEl.classList.add('dragover');
  });
  zoneEl.addEventListener('dragleave', () => {
    zoneEl.classList.remove('dragover');
  });
  zoneEl.addEventListener('drop', e => {
    e.preventDefault();
    zoneEl.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length) onFiles(files);
  });
  fileInput.addEventListener('change', () => {
    const files = Array.from(fileInput.files).filter(f => f.type.startsWith('image/'));
    if (files.length) onFiles(files);
    fileInput.value = '';
  });
}

/* ── Image loading ── */

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/* ── Canvas export ── */

function canvasToBlob(canvas, format, quality) {
  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(blob), format, quality);
  });
}

function getMimeType(fmt) {
  const map = { jpeg: 'image/jpeg', jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
  return map[fmt.toLowerCase()] || 'image/png';
}

/* ── Download helpers ── */

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ── Error display ── */

function showError(el, msg) {
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 5000);
}

function hideError(el) {
  el.classList.remove('show');
}
