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
      { href: 'background-removal.html', icon: '🪄', label: 'AI Erase BG' },
      { href: 'denoise.html', icon: '✨', label: 'Denoise' },
    ]},
    { title: '🛠️ Create', items: [
      { href: 'meme.html', icon: '😂', label: 'Meme' },
      { href: 'collage.html', icon: '🖼️', label: 'Collage' },
      { href: 'mockup.html', icon: '📱', label: 'Mockup' },
      { href: 'qrcode.html', icon: '📱', label: 'QR Code' },
      { href: 'overlay.html', icon: '🔲', label: 'Overlay' },
      { href: 'text.html', icon: '✏️', label: 'Add Text' },
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

/* ── Usage tracking ── */

function trackUsage() {
  const count = parseInt(localStorage.getItem('picbrew_uses') || '0', 10) + 1;
  localStorage.setItem('picbrew_uses', String(count));
  return count;
}

function getUsageCount() {
  return parseInt(localStorage.getItem('picbrew_uses') || '0', 10);
}

/* ── Post-action donation CTA ── */

function showPostActionCTA() {
  const uses = getUsageCount();

  // Toast CTA (once per session)
  if (!sessionStorage.getItem('picbrew_cta_shown')) {
    sessionStorage.setItem('picbrew_cta_shown', '1');

    setTimeout(() => {
      const toast = document.createElement('a');
      toast.href = 'https://buymeacoffee.com/dairylea';
      toast.target = '_blank';
      toast.rel = 'noopener';
      toast.className = 'picbrew-cta-toast';

      if (uses >= 3) {
        toast.innerHTML = "You've processed " + uses + " images for free — help keep PicBrew free ☕ <strong>Support us</strong>";
      } else {
        toast.innerHTML = 'Glad this helped? ☕ <strong>Buy us a coffee</strong>';
      }

      Object.assign(toast.style, {
        position: 'fixed', bottom: '24px', right: '24px', zIndex: '9999',
        background: '#1a1a2e', color: '#fff', padding: uses >= 3 ? '14px 24px' : '12px 20px',
        borderRadius: '10px', fontSize: uses >= 3 ? '15px' : '14px', fontFamily: 'inherit',
        textDecoration: 'none', boxShadow: uses >= 3 ? '0 6px 28px rgba(0,0,0,0.35)' : '0 4px 20px rgba(0,0,0,0.25)',
        display: 'flex', alignItems: 'center', gap: '6px',
        opacity: '0', transform: 'translateY(16px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        cursor: 'pointer', maxWidth: '380px', lineHeight: '1.4'
      });

      if (uses >= 3) {
        toast.style.border = '1px solid rgba(255,200,60,0.3)';
      }

      document.body.appendChild(toast);
      requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
      });

      function dismiss() {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(16px)';
        setTimeout(() => toast.remove(), 300);
      }

      toast.addEventListener('click', dismiss);
      setTimeout(dismiss, uses >= 3 ? 14000 : 10000);
    }, 1000);
  }

  // Persistent banner at 5+ uses (once per session, dismissible)
  if (uses >= 5 && !sessionStorage.getItem('picbrew_banner_dismissed') && !document.getElementById('picbrew-support-banner')) {
    setTimeout(() => {
      if (document.getElementById('picbrew-support-banner')) return;

      const banner = document.createElement('div');
      banner.id = 'picbrew-support-banner';

      Object.assign(banner.style, {
        position: 'fixed', bottom: '0', left: '0', right: '0', zIndex: '9990',
        background: 'rgba(20, 20, 40, 0.95)', backdropFilter: 'blur(8px)',
        color: '#fff', padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
        fontFamily: 'inherit', fontSize: '14px', lineHeight: '1.4',
        boxShadow: '0 -2px 20px rgba(0,0,0,0.3)',
        borderTop: '1px solid rgba(255,200,60,0.2)',
        flexWrap: 'wrap'
      });

      const text = document.createElement('span');
      text.textContent = "You're a power user! \uD83C\uDF89 You've processed " + uses + " images for free. Consider supporting PicBrew";
      text.style.flex = '1 1 auto';
      text.style.textAlign = 'center';
      text.style.minWidth = '200px';

      const bmcLink = document.createElement('a');
      bmcLink.href = 'https://buymeacoffee.com/dairylea';
      bmcLink.target = '_blank';
      bmcLink.rel = 'noopener';
      bmcLink.textContent = '☕ Buy Me a Coffee';
      Object.assign(bmcLink.style, {
        background: '#ffdd00', color: '#1a1a2e', padding: '8px 18px',
        borderRadius: '8px', fontSize: '14px', fontWeight: '700',
        textDecoration: 'none', whiteSpace: 'nowrap',
        boxShadow: '0 2px 8px rgba(255,221,0,0.3)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        flexShrink: '0'
      });
      bmcLink.addEventListener('mouseenter', () => {
        bmcLink.style.transform = 'scale(1.05)';
        bmcLink.style.boxShadow = '0 4px 14px rgba(255,221,0,0.45)';
      });
      bmcLink.addEventListener('mouseleave', () => {
        bmcLink.style.transform = 'scale(1)';
        bmcLink.style.boxShadow = '0 2px 8px rgba(255,221,0,0.3)';
      });

      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '\u2715';
      closeBtn.setAttribute('aria-label', 'Dismiss banner');
      Object.assign(closeBtn.style, {
        background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)',
        fontSize: '18px', cursor: 'pointer', padding: '4px 8px',
        lineHeight: '1', flexShrink: '0',
        transition: 'color 0.15s ease'
      });
      closeBtn.addEventListener('mouseenter', () => { closeBtn.style.color = '#fff'; });
      closeBtn.addEventListener('mouseleave', () => { closeBtn.style.color = 'rgba(255,255,255,0.6)'; });
      closeBtn.addEventListener('click', () => {
        sessionStorage.setItem('picbrew_banner_dismissed', '1');
        banner.style.transform = 'translateY(100%)';
        banner.style.opacity = '0';
        setTimeout(() => banner.remove(), 300);
      });

      banner.appendChild(text);
      banner.appendChild(bmcLink);
      banner.appendChild(closeBtn);

      banner.style.transform = 'translateY(100%)';
      banner.style.opacity = '0';
      banner.style.transition = 'transform 0.4s ease, opacity 0.4s ease';

      document.body.appendChild(banner);
      requestAnimationFrame(() => {
        banner.style.transform = 'translateY(0)';
        banner.style.opacity = '1';
      });
    }, 2000);
  }
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
  trackUsage();
  showPostActionCTA();
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
