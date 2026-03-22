/* PicBrew — Shared Utilities */

// Mobile nav toggle + "More" dropdown for nav overflow
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    // Inject mobile header (brand + close button) at top of nav-links
    const mobileHeader = document.createElement('div');
    mobileHeader.className = 'nav-mobile-header';
    const brandLink = document.querySelector('.nav-brand');
    if (brandLink) {
      const brandClone = brandLink.cloneNode(true);
      mobileHeader.appendChild(brandClone);
    }
    const closeBtn = document.createElement('button');
    closeBtn.className = 'nav-close';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.innerHTML = '&times;';
    mobileHeader.appendChild(closeBtn);
    navLinks.insertBefore(mobileHeader, navLinks.firstChild);

    function openMenu() {
      navLinks.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
    }
    function closeMenu() {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }

    toggle.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    // Close menu when any nav link is tapped (delegation handles dynamic items)
    navLinks.addEventListener('click', e => {
      if (e.target.closest('a')) closeMenu();
    });
  }

  // Move overflow items into a "More" dropdown
  if (navLinks) {
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
      // Clicking inside dropdown: don't close it via document handler
      dd.addEventListener('click', e => {
        e.stopPropagation();
      });
      // Ensure dropdown links navigate reliably (especially on touch devices)
      dd.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
          const href = link.getAttribute('href');
          if (href) {
            moreLi.classList.remove('open');
            window.location.href = href;
          }
        });
      });
      document.addEventListener('click', () => {
        moreLi.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    }
  }
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
