(() => {
  'use strict';

  const WHATSAPP_NUMBER = '5511998447863';
  const RESELLER_FEE = 200; // Taxa de revenda em dólares
  const SUPPORTED_LANGS = ['en', 'pt', 'fr', 'es', 'it', 'ru'];
  let currentLang = 'en';
  let translations = {};
  let products = [];
  let cart = [];

  // DOM elements
  const productsContainer = document.getElementById('products-container');
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const sortSelect = document.getElementById('sort-select');
  const cartCountSpan = document.getElementById('cart-count');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');
  const cartCloseBtn = document.getElementById('cart-close');
  const cartIcon = document.getElementById('cart-icon');
  const checkoutBtn = document.getElementById('checkout-btn');
  const langDropdownBtn = document.getElementById('langDropdownBtn');
  const langDropdown = document.getElementById('langDropdown');
  const currentLangSpan = document.getElementById('currentLang');

  // ---------- CART FUNCTIONS ----------
  function loadCart() {
    const saved = localStorage.getItem('vorynex_cart');
    if (saved) try { cart = JSON.parse(saved); } catch(e){ cart = []; }
    updateCartUI();
  }
  function saveCart() {
    localStorage.setItem('vorynex_cart', JSON.stringify(cart));
    updateCartUI();
  }
  function updateCartUI() {
    if (cartCountSpan) cartCountSpan.textContent = cart.length;
    renderCartItems();
  }
  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    openCart();
  }
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
  }
  function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
      item.quantity = (item.quantity || 1) + delta;
      if (item.quantity <= 0) removeFromCart(productId);
      else saveCart();
    }
  }
  function renderCartItems() {
    if (!cartItemsDiv) return;
    const langData = translations[currentLang] || {};
    if (cart.length === 0) {
      cartItemsDiv.innerHTML = `<p class="cart-empty">${langData.cartEmpty || 'Your cart is empty.'}</p>`;
      cartTotalSpan.textContent = '$0';
      return;
    }
    let html = '';
    let subtotal = 0;
    cart.forEach(item => {
      const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
      const itemTotal = priceNum * (item.quantity || 1);
      subtotal += itemTotal;
      html += `
        <div class="cart-item">
          <div class="cart-item-info">
            <h4>${escapeHTML(item.name)}</h4>
            <div class="cart-item-price">${item.price} x ${item.quantity}</div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <button class="cart-item-remove" data-id="${item.id}" data-action="decrease">−</button>
            <span>${item.quantity}</span>
            <button class="cart-item-remove" data-id="${item.id}" data-action="increase">+</button>
            <i class="fas fa-trash cart-item-remove" data-id="${item.id}" data-action="remove" style="margin-left:8px; cursor:pointer;"></i>
          </div>
        </div>
      `;
    });
    const total = subtotal + RESELLER_FEE;
    // Adiciona linha da taxa de revenda
    html += `
      <div class="cart-reseller-fee">
        <span>${langData.resellerFee || 'Reseller Fee'}:</span>
        <span>$${RESELLER_FEE.toFixed(2)}</span>
      </div>
    `;
    cartItemsDiv.innerHTML = html;
    cartTotalSpan.textContent = `$${total.toFixed(2)}`;
    // Attach cart item listeners
    cartItemsDiv.querySelectorAll('[data-id]').forEach(el => {
      el.addEventListener('click', e => {
        e.stopPropagation();
        const id = el.dataset.id;
        const action = el.dataset.action;
        if (action === 'remove') removeFromCart(id);
        else if (action === 'increase') updateQuantity(id, 1);
        else if (action === 'decrease') updateQuantity(id, -1);
      });
    });
    // Update header
    const cartHeader = document.querySelector('.cart-header h3');
    if (cartHeader) cartHeader.innerHTML = `<i class="fas fa-shopping-cart"></i> ${langData.cartTitle || 'Your Cart'}`;
    if (checkoutBtn) checkoutBtn.textContent = langData.checkoutBtn || 'Checkout via WhatsApp';
  }
  function openCart() {
    cartSidebar?.classList.add('active');
    cartOverlay?.classList.add('active');
  }
  function closeCart() {
    cartSidebar?.classList.remove('active');
    cartOverlay?.classList.remove('active');
  }
  function checkout() {
    if (cart.length === 0) return;
    const langData = translations[currentLang] || {};
    let subtotal = 0;
    let message = `${langData.waCheckoutMsg || 'Hello Vorynex, I\'d like to purchase:'}\n`;
    cart.forEach(item => {
      const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
      subtotal += priceNum * (item.quantity || 1);
      message += `- ${item.name} (${item.price}) x${item.quantity}\n`;
    });
    const total = subtotal + RESELLER_FEE;
    message += `\n${langData.resellerFee || 'Reseller Fee'}: $${RESELLER_FEE.toFixed(2)}`;
    message += `\nTotal: $${total.toFixed(2)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  }

  // ---------- I18N ----------
  async function loadTranslations(lang) {
    try {
      const res = await fetch('./data/translations.json');
      translations = await res.json();
      return translations[lang] || translations['en'];
    } catch(e) { return {}; }
  }
  function applyTranslations(langData) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (langData[key]) el.innerHTML = langData[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (langData[key]) el.placeholder = langData[key];
    });
    document.documentElement.lang = currentLang;
    if (currentLangSpan) currentLangSpan.textContent = currentLang.toUpperCase();
    
    renderBenefits(langData);
    renderFAQs(langData);
    renderTestimonials(langData);
    if (products.length) filterAndRender();
    updateCartUI();
  }
  function renderBenefits(langData) {
    const container = document.getElementById('benefits-container');
    if (!container) return;
    const benefits = [
      { icon: 'fa-bolt', title: langData.trust1Title, desc: langData.trust1Desc },
      { icon: 'fa-headset', title: langData.trust2Title, desc: langData.trust2Desc },
      { icon: 'fa-shield-alt', title: langData.trust3Title, desc: langData.trust3Desc },
      { icon: 'fa-lock', title: langData.securePayments || 'Secure Payments', desc: langData.securePaymentsDesc || '' },
      { icon: 'fa-sync-alt', title: langData.lifetimeUpdates || 'Lifetime Updates', desc: langData.lifetimeUpdatesDesc || '' }
    ];
    container.innerHTML = benefits.map(b => `
      <div class="trust-item">
        <div class="trust-icon"><i class="fas ${b.icon}"></i></div>
        <h3>${b.title}</h3>
        <p>${b.desc}</p>
      </div>
    `).join('');
  }
  function renderFAQs(langData) {
    const container = document.getElementById('faq-container');
    if (!container) return;
    let html = '';
    for (let i=1; i<=8; i++) {
      const q = langData[`faq${i}Q`], a = langData[`faq${i}A`];
      if (q && a) html += `<div class="faq-item"><h3>${q}</h3><p>${a}</p></div>`;
    }
    container.innerHTML = html;
  }
  function renderTestimonials(langData) {
    const track = document.getElementById('testimonials-track');
    if (!track) return;
    const items = [];
    for (let i=1; i<=6; i++) {
      const text = langData[`testimonial${i}`] || '';
      if (text) items.push({ text, author: `— ${['A. M.','L. C.','P. R.','J. K.','M. S.','T. B.'][i-1]}, ${['Red Team Lead','Security Analyst','CTO','Pentester','DevOps','Security Engineer'][i-1]}`, stars: i<=4 ? 5 : 4 });
    }
    const cards = items.map(t => `
      <div class="testimonial-card">
        <div class="review-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5-t.stars)}</div>
        <p class="testimonial__text">${t.text}</p>
        <div class="testimonial__author">${t.author}</div>
      </div>
    `).join('');
    track.innerHTML = cards + cards;
  }

  async function switchLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    currentLang = lang;
    const langData = await loadTranslations(lang);
    applyTranslations(langData);
    localStorage.setItem('vorynex_lang', lang);
    langDropdown?.classList.remove('show');
  }

  // ---------- RENDER PRODUCTS ----------
  function renderProducts(prods) {
    if (!prods.length) {
      productsContainer.innerHTML = `<div class="loading-state">${translations[currentLang]?.noProducts || 'No products'}</div>`;
      return;
    }
    const langData = translations[currentLang] || {};
    const html = prods.map(p => {
      const trans = p.translations?.[currentLang] || p.translations?.en || { name: p.name || 'Product', description: p.description || '' };
      const name = trans.name;
      const description = trans.description;
      const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello, I'm interested in *${name}*.\nPrice: ${p.price}`)}`;
      const demoHref = p.demo_link?.startsWith('http') ? p.demo_link : waLink;
      return `
        <article class="product-card">
          <h3 class="product-name">${escapeHTML(name)}</h3>
          <p class="product-description">${escapeHTML(description)}</p>
          <div class="product-price">${escapeHTML(p.price)}</div>
          <div class="card-actions">
            <a href="${waLink}" target="_blank" class="btn-card btn-wa">${langData.btnBuy || 'Buy'}</a>
            <a href="${demoHref}" target="_blank" class="btn-card btn-demo">${langData.btnDemo || 'Demo'}</a>
            <button class="btn-card add-to-cart-btn" data-id="${p.id}" data-name="${escapeHTML(name)}" data-price="${escapeHTML(p.price)}">
              <i class="fas fa-cart-plus"></i> ${langData.addToCart || 'Add to cart'}
            </button>
          </div>
        </article>
      `;
    }).join('');
    productsContainer.innerHTML = html;
  }

  productsContainer.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-to-cart-btn');
    if (!addBtn) return;
    e.preventDefault();
    const id = addBtn.dataset.id;
    const name = addBtn.dataset.name;
    const price = addBtn.dataset.price;
    addToCart({ id, name, price });
  });

  function escapeHTML(s) { return String(s).replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[m]); }

  // ---------- FILTER & SORT ----------
  function filterAndRender() {
    const term = searchInput?.value.toLowerCase() || '';
    const cat = categoryFilter?.value || 'all';
    let filtered = products.filter(p => {
      const trans = p.translations?.[currentLang] || p.translations?.en || {};
      const name = (trans.name || '').toLowerCase();
      const desc = (trans.description || '').toLowerCase();
      return (name.includes(term) || desc.includes(term)) && (cat === 'all' || p.category === cat);
    });
    const sort = sortSelect?.value;
    if (sort === 'price-asc') filtered.sort((a,b) => parseFloat(a.price.replace(/[^0-9.]/g,'')) - parseFloat(b.price.replace(/[^0-9.]/g,'')));
    else if (sort === 'price-desc') filtered.sort((a,b) => parseFloat(b.price.replace(/[^0-9.]/g,'')) - parseFloat(a.price.replace(/[^0-9.]/g,'')));
    else if (sort === 'name-asc') filtered.sort((a,b) => {
      const na = a.translations?.[currentLang]?.name || '';
      const nb = b.translations?.[currentLang]?.name || '';
      return na.localeCompare(nb);
    });
    renderProducts(filtered);
  }

  async function loadProducts() {
    try {
      const res = await fetch('./data/products.json');
      products = await res.json();
      if (categoryFilter) {
        const cats = [...new Set(products.map(p => p.category).filter(Boolean))];
        const langData = translations[currentLang] || {};
        categoryFilter.innerHTML = `<option value="all">${langData.allCategories || 'All Categories'}</option>`;
        cats.forEach(c => { const opt = new Option(c.charAt(0).toUpperCase()+c.slice(1), c); categoryFilter.add(opt); });
      }
      filterAndRender();
    } catch(e) { productsContainer.innerHTML = '<div class="loading-state">Error loading products</div>'; }
  }

  async function init() {
    loadCart();
    const savedLang = localStorage.getItem('vorynex_lang');
    const browser = navigator.language.split('-')[0];
    currentLang = savedLang && SUPPORTED_LANGS.includes(savedLang) ? savedLang : (SUPPORTED_LANGS.includes(browser)?browser:'en');
    const langData = await loadTranslations(currentLang);
    applyTranslations(langData);
    await loadProducts();

    searchInput?.addEventListener('input', filterAndRender);
    categoryFilter?.addEventListener('change', filterAndRender);
    sortSelect?.addEventListener('change', filterAndRender);
    cartIcon?.addEventListener('click', openCart);
    cartCloseBtn?.addEventListener('click', closeCart);
    cartOverlay?.addEventListener('click', closeCart);
    checkoutBtn?.addEventListener('click', checkout);
    
    langDropdownBtn?.addEventListener('click', () => langDropdown?.classList.toggle('show'));
    document.querySelectorAll('.lang-dropdown-content a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const lang = link.dataset.lang;
        switchLanguage(lang);
      });
    });
    window.addEventListener('click', e => { if (!e.target.closest('.language-selector')) langDropdown?.classList.remove('show'); });

    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const href = a.getAttribute('href'); if (href==='#') return;
      const el = document.querySelector(href); if(el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
    }));
  }
  init();
})();
