(() => {
  'use strict';
  const WHATSAPP_NUMBER = '5511998447863';
  let currentLang = 'en';
  let translations = {};
  let products = [];
  let cart = [];

  // DOM elements
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const cartIcon = document.getElementById('cart-icon');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartCloseBtn = document.getElementById('cart-close');
  const langDropdownBtn = document.getElementById('langDropdownBtn');
  const langDropdown = document.getElementById('langDropdown');
  const currentLangSpan = document.getElementById('currentLang');

  // Menu functions
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
    document.body.style.overflow = '';
  }

  // Event listeners imediatos
  menuToggle?.addEventListener('click', openMenu);
  navOverlay?.addEventListener('click', closeMenu);
  navMenu?.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', closeMenu));
  cartIcon?.addEventListener('click', openCart);
  cartCloseBtn?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  // Language dropdown
  if (langDropdownBtn) {
    langDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown?.classList.toggle('show');
    });
  }
  document.querySelectorAll('.lang-dropdown-content a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = link.dataset.lang;
      switchLanguage(lang);
      langDropdown?.classList.remove('show');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-selector')) langDropdown?.classList.remove('show');
  });

  async function switchLanguage(lang) {
    if (!['en','pt','fr','es','it','ru'].includes(lang)) return;
    currentLang = lang;
    localStorage.setItem('vorynex_lang', lang);
    const res = await fetch('./data/translations.json');
    translations = await res.json();
    const langData = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (langData[key]) el.innerHTML = langData[key];
    });
    if (currentLangSpan) currentLangSpan.textContent = lang.toUpperCase();
    // Recarrega produtos traduzidos
    if (products.length) filterAndRender();
  }

  // Produtos e carrinho (mantidos minimalistas para não poluir)
  async function loadProducts() {
    const res = await fetch('./data/products.json');
    products = await res.json();
    renderProducts(products);
  }
  function renderProducts(prods) { /* ... implementação básica ... */ }
  function filterAndRender() { /* ... */ }

  // Inicialização
  (async () => {
    const savedLang = localStorage.getItem('vorynex_lang') || 'en';
    await switchLanguage(savedLang);
    await loadProducts();
  })();
})();
