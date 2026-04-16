(() => {
  'use strict';

  const WHATSAPP_NUMBER = '5511998447863';
  const RESELLER_FEE = 200;
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
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');

  // ---------- MENU ----------
  function openMenu() {
    navMenu?.classList.add('active');
    navOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    navMenu?.classList.remove('active');
    navOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }
  function openCart() {
    closeMenu();
    cartSidebar?.classList.add('active');
    cartOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    cartSidebar?.classList.remove('active');
    cartOverlay?.classList.remove('active');
    if (!navMenu?.classList.contains('active')) document.body.style.overflow = '';
  }

  // ---------- CART ----------
  function loadCart() {
    const saved = localStorage.getItem('vorynex_cart');
    if (saved) try { cart = JSON.parse(saved); } catch(e){ cart = []; }
    updateCartUI();
  }
  function saveCart() { localStorage.setItem('vorynex_cart', JSON.stringify(cart)); updateCartUI(); }
  function updateCartUI() {
    if (cartCountSpan) cartCountSpan.textContent = cart.length;
    renderCartItems();
  }
  function addToCart(product) {
    const existing = cart.find(i => i.id === product.id);
    existing ? existing.quantity++ : cart.push({...product, quantity:1});
    saveCart(); openCart();
  }
  function removeFromCart(id) { cart = cart.filter(i => i.id !== id); saveCart(); }
  function updateQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) { item.quantity += delta; if (item.quantity <= 0) removeFromCart(id); else saveCart(); }
  }
  function renderCartItems() {
    if (!cartItemsDiv) return;
    const langData = translations[currentLang] || {};
    if (!cart.length) {
      cartItemsDiv.innerHTML = `<p class="cart-empty">${langData.cartEmpty || 'Your cart is empty.'}</p>`;
      cartTotalSpan.textContent = '$0'; return;
    }
    let html = '', subtotal = 0;
    cart.forEach(item => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g,'')) || 0;
      subtotal += price * item.quantity;
      html += `<div class="cart-item"><div class="cart-item-info"><h4>${escapeHTML(item.name)}</h4><div class="cart-item-price">${item.price} x ${item.quantity}</div></div><div style="display:flex;gap:8px;"><button class="cart-item-remove" data-id="${item.id}" data-action="decrease">−</button><span>${item.quantity}</span><button class="cart-item-remove" data-id="${item.id}" data-action="increase">+</button><i class="fas fa-trash cart-item-remove" data-id="${item.id}" data-action="remove"></i></div></div>`;
    });
    const total = subtotal + RESELLER_FEE;
    html += `<div class="cart-reseller-fee"><span>${langData.resellerFee||'Reseller Fee'}:</span><span>$${RESELLER_FEE.toFixed(2)}</span></div>`;
    cartItemsDiv.innerHTML = html;
    cartTotalSpan.textContent = `$${total.toFixed(2)}`;
    cartItemsDiv.querySelectorAll('[data-id]').forEach(el => el.addEventListener('click', e => {
      const { id, action } = el.dataset;
      if (action === 'remove') removeFromCart(id);
      else updateQuantity(id, action === 'increase' ? 1 : -1);
    }));
    document.querySelector('.cart-header h3').innerHTML = `<i class="fas fa-shopping-cart"></i> ${langData.cartTitle||'Your Cart'}`;
    if (checkoutBtn) checkoutBtn.textContent = langData.checkoutBtn||'Checkout via WhatsApp';
  }
  function checkout() {
    if (!cart.length) return;
    const langData = translations[currentLang] || {};
    let subtotal = 0, msg = `${langData.waCheckoutMsg||'Hello Vorynex, I\'d like to purchase:'}\n`;
    cart.forEach(i => { const p = parseFloat(i.price.replace(/[^0-9.]/g,''))||0; subtotal += p * i.quantity; msg += `- ${i.name} (${i.price}) x${i.quantity}\n`; });
    msg += `\n${langData.resellerFee||'Reseller Fee'}: $${RESELLER_FEE.toFixed(2)}\nTotal: $${(subtotal+RESELLER_FEE).toFixed(2)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  // ---------- I18N ----------
  async function loadTranslations(lang) {
    const res = await fetch('./data/translations.json');
    translations = await res.json();
    return translations[lang] || translations.en;
  }
  function applyTranslations(langData) {
    document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if (langData[k]) el.innerHTML = langData[k]; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { const k = el.dataset.i18nPlaceholder; if (langData[k]) el.placeholder = langData[k]; });
    document.documentElement.lang = currentLang;
    if (currentLangSpan) currentLangSpan.textContent = currentLang.toUpperCase();
    renderBenefits(langData); renderFAQs(langData); renderTestimonials(langData);
    if (products.length) filterAndRender();
    updateCartUI();
  }
  function renderBenefits(d) {
    const c = document.getElementById('benefits-container');
    if (!c) return;
    c.innerHTML = [
      { i:'fa-bolt', t:d.trust1Title, p:d.trust1Desc }, { i:'fa-headset', t:d.trust2Title, p:d.trust2Desc },
      { i:'fa-shield-alt', t:d.trust3Title, p:d.trust3Desc }, { i:'fa-lock', t:d.securePayments||'Secure Payments', p:d.securePaymentsDesc||'' },
      { i:'fa-sync-alt', t:d.lifetimeUpdates||'Lifetime Updates', p:d.lifetimeUpdatesDesc||'' }
    ].map(b => `<div class="trust-item"><div class="trust-icon"><i class="fas ${b.i}"></i></div><h3>${b.t}</h3><p>${b.p}</p></div>`).join('');
  }
  function renderFAQs(d) {
    const c = document.getElementById('faq-container'); if (!c) return;
    let h = ''; for (let i=1;i<=8;i++) { const q=d[`faq${i}Q`], a=d[`faq${i}A`]; if(q&&a) h+=`<div class="faq-item"><h3>${q}</h3><p>${a}</p></div>`; }
    c.innerHTML = h;
  }
  function renderTestimonials(d) {
    const t = document.getElementById('testimonials-track'); if (!t) return;
    const items = []; for (let i=1;i<=6;i++) { const txt = d[`testimonial${i}`]||''; if(txt) items.push({txt, author:`— ${['A.M.','L.C.','P.R.','J.K.','M.S.','T.B.'][i-1]}, ${['Red Team Lead','Security Analyst','CTO','Pentester','DevOps','Security Engineer'][i-1]}`, stars:i<=4?5:4}); }
    t.innerHTML = items.map(it => `<div class="testimonial-card"><div class="review-stars">${'★'.repeat(it.stars)}${'☆'.repeat(5-it.stars)}</div><p class="testimonial__text">${it.txt}</p><div class="testimonial__author">${it.author}</div></div>`).join('').repeat(2);
  }
  async function switchLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    currentLang = lang; localStorage.setItem('vorynex_lang', lang);
    const data = await loadTranslations(lang);
    applyTranslations(data);
    langDropdown?.classList.remove('show');
  }

  // ---------- PRODUCTS ----------
  function renderProducts(prods) {
    if (!prods.length) { productsContainer.innerHTML = `<div class="loading-state">${translations[currentLang]?.noProducts||'No products'}</div>`; return; }
    const langData = translations[currentLang] || {};
    productsContainer.innerHTML = prods.map(p => {
      const trans = p.translations?.[currentLang] || p.translations?.en || { name:p.name, description:p.description };
      return `<article class="product-card"><h3 class="product-name">${escapeHTML(trans.name)}</h3><p class="product-description">${escapeHTML(trans.description)}</p><div class="product-price">${escapeHTML(p.price)}</div><div class="card-actions"><a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello, I'm interested in *${trans.name}*. Price: ${p.price}`)}" target="_blank" class="btn-card btn-wa">${langData.btnBuy||'Buy'}</a><a href="${p.demo_link?.startsWith('http')?p.demo_link:'#'}" target="_blank" class="btn-card btn-demo">${langData.btnDemo||'Demo'}</a><button class="btn-card add-to-cart-btn" data-id="${p.id}" data-name="${escapeHTML(trans.name)}" data-price="${escapeHTML(p.price)}"><i class="fas fa-cart-plus"></i> ${langData.addToCart||'Add to cart'}</button></div></article>`;
    }).join('');
  }
  function escapeHTML(s) { return String(s).replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[m]); }

  // ---------- FILTER ----------
  function filterAndRender() {
    const term = searchInput?.value.toLowerCase() || '', cat = categoryFilter?.value || 'all';
    let filtered = products.filter(p => {
      const trans = p.translations?.[currentLang] || p.translations?.en || {};
      return (trans.name?.toLowerCase().includes(term) || trans.description?.toLowerCase().includes(term)) && (cat==='all' || p.category===cat);
    });
    const sort = sortSelect?.value;
    if (sort === 'price-asc') filtered.sort((a,b) => parseFloat(a.price)-parseFloat(b.price));
    else if (sort === 'price-desc') filtered.sort((a,b) => parseFloat(b.price)-parseFloat(a.price));
    else if (sort === 'name-asc') filtered.sort((a,b) => (a.translations?.[currentLang]?.name||'').localeCompare(b.translations?.[currentLang]?.name||''));
    renderProducts(filtered);
  }

  async function loadProducts() {
    try {
      const res = await fetch('./data/products.json'); products = await res.json();
      if (categoryFilter) {
        const cats = [...new Set(products.map(p => p.category).filter(Boolean))];
        categoryFilter.innerHTML = `<option value="all">${translations[currentLang]?.allCategories||'All Categories'}</option>`;
        cats.forEach(c => categoryFilter.add(new Option(c.charAt(0).toUpperCase()+c.slice(1), c)));
      }
      filterAndRender();
    } catch(e) { productsContainer.innerHTML = '<div class="loading-state">Error</div>'; }
  }

  // ---------- INIT ----------
  async function init() {
    loadCart();
    const saved = localStorage.getItem('vorynex_lang'), browser = navigator.language.split('-')[0];
    currentLang = saved && SUPPORTED_LANGS.includes(saved) ? savedLang : (SUPPORTED_LANGS.includes(browser)?browser:'en');
    const langData = await loadTranslations(currentLang);
    applyTranslations(langData);
    await loadProducts();

    // Eventos
    menuToggle?.addEventListener('click', openMenu);
    navOverlay?.addEventListener('click', closeMenu);
    navMenu?.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', closeMenu));
    cartIcon?.addEventListener('click', openCart);
    cartCloseBtn?.addEventListener('click', closeCart);
    cartOverlay?.addEventListener('click', closeCart);
    checkoutBtn?.addEventListener('click', checkout);
    searchInput?.addEventListener('input', filterAndRender);
    categoryFilter?.addEventListener('change', filterAndRender);
    sortSelect?.addEventListener('change', filterAndRender);
    productsContainer?.addEventListener('click', e => {
      const btn = e.target.closest('.add-to-cart-btn'); if (!btn) return;
      e.preventDefault(); addToCart({ id: btn.dataset.id, name: btn.dataset.name, price: btn.dataset.price });
    });
    langDropdownBtn?.addEventListener('click', e => { e.stopPropagation(); langDropdown?.classList.toggle('show'); });
    document.querySelectorAll('.lang-dropdown-content a').forEach(a => a.addEventListener('click', e => { e.preventDefault(); switchLanguage(a.dataset.lang); }));
    document.addEventListener('click', e => { if (!e.target.closest('.language-selector')) langDropdown?.classList.remove('show'); });
    document.addEventListener('keydown', e => { if (e.key==='Escape') { closeMenu(); closeCart(); langDropdown?.classList.remove('show'); } });
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const el = document.querySelector(a.getAttribute('href')); if(el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); } }));
  }
  init();
})();
