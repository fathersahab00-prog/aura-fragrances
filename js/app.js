/**
 * AURA FRAGRANCES BY FRIENDS - Application Core
 * Handles Cart, Wishlist, Modals, Search, Filtering, WhatsApp Orders, and Interactions
 */

(function () {
  'use strict';

  // --- State ---
  let cart = JSON.parse(localStorage.getItem('aura_cart')) || [];
  let wishlist = JSON.parse(localStorage.getItem('aura_wishlist')) || [];
  let currentCategory = 'all';
  let activeProductModal = null;
  let selectedModalSize = null;

  // --- DOM Elements Cache ---
  const productsGrid = document.getElementById('products-grid');
  const catTabButtons = document.querySelectorAll('.cat-tab-btn');
  const sortSelect = document.getElementById('sort-select');
  const typeFilterSelect = document.getElementById('type-filter-select');
  const searchInlineInput = document.getElementById('search-inline-input');

  // Header & Navigation
  const header = document.querySelector('.header-sticky');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const backdropOverlay = document.getElementById('backdrop-overlay');
  const cartToggleBtns = document.querySelectorAll('.cart-toggle-btn');
  const wishlistToggleBtns = document.querySelectorAll('.wishlist-toggle-btn');
  const searchToggleBtns = document.querySelectorAll('.search-toggle-btn');
  const cartBadgeHeader = document.getElementById('cart-badge-header');
  const wishlistBadgeHeader = document.getElementById('wishlist-badge-header');

  // Drawers & Modals
  const cartDrawer = document.getElementById('cart-drawer');
  const wishlistDrawer = document.getElementById('wishlist-drawer');
  const cartItemsList = document.getElementById('cart-items-list');
  const wishlistItemsList = document.getElementById('wishlist-items-list');
  const cartSubtotalEl = document.getElementById('cart-subtotal-val');
  const productModal = document.getElementById('product-detail-modal');
  const checkoutModal = document.getElementById('checkout-modal');
  const searchModal = document.getElementById('search-modal');
  const searchGiantInput = document.getElementById('search-giant-input');
  const searchLiveResults = document.getElementById('search-live-results');
  const toastContainer = document.getElementById('toast-container');

  // WhatsApp Config Link Helper
  function getWhatsAppUrl(messageText) {
    const rawNumber = AURA_CONFIG.whatsappNumber;
    // If placeholder, fallback to placeholder friendly link or prompt
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(messageText);
    if (cleanNumber.length >= 10) {
      return `https://wa.me/${cleanNumber}?text=${encoded}`;
    }
    // Safe placeholder fallback
    return `https://wa.me/?text=${encoded}`;
  }

  // --- Toast Notifications ---
  function showToast(message, icon = '✦') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'luxury-toast';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-msg">${message}</span>
    `;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  // --- Sticky Header Scroll Effect ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // --- Mobile Drawer Toggle ---
  function toggleMobileNav(open = null) {
    const isOpen = open !== null ? open : !mobileNavDrawer.classList.contains('open');
    mobileNavDrawer?.classList.toggle('open', isOpen);
    hamburgerBtn?.classList.toggle('open', isOpen);
    backdropOverlay?.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburgerBtn?.addEventListener('click', () => toggleMobileNav());

  // --- Cart Drawer Management ---
  function toggleCartDrawer(open = null) {
    const isOpen = open !== null ? open : !cartDrawer.classList.contains('open');
    closeAllModals(false);
    cartDrawer?.classList.toggle('open', isOpen);
    backdropOverlay?.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) renderCart();
  }

  // --- Wishlist Drawer Management ---
  function toggleWishlistDrawer(open = null) {
    const isOpen = open !== null ? open : !wishlistDrawer.classList.contains('open');
    closeAllModals(false);
    wishlistDrawer?.classList.toggle('open', isOpen);
    backdropOverlay?.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) renderWishlist();
  }

  // --- Search Modal Management ---
  function toggleSearchModal(open = null) {
    const isOpen = open !== null ? open : !searchModal.classList.contains('active');
    closeAllModals(false);
    searchModal?.classList.toggle('active', isOpen);
    backdropOverlay?.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen && searchGiantInput) {
      searchGiantInput.value = '';
      if (searchLiveResults) searchLiveResults.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem; padding:1rem;">Type to search fragrances...</p>';
      setTimeout(() => searchGiantInput.focus(), 150);
    }
  }

  function closeAllModals(closeBackdrop = true) {
    mobileNavDrawer?.classList.remove('open');
    hamburgerBtn?.classList.remove('open');
    cartDrawer?.classList.remove('open');
    wishlistDrawer?.classList.remove('open');
    productModal?.classList.remove('active');
    checkoutModal?.classList.remove('active');
    searchModal?.classList.remove('active');
    if (closeBackdrop) {
      backdropOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  backdropOverlay?.addEventListener('click', () => closeAllModals(true));

  document.querySelectorAll('.modal-close-trigger').forEach(btn => {
    btn.addEventListener('click', () => closeAllModals(true));
  });

  cartToggleBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleCartDrawer();
  }));

  wishlistToggleBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleWishlistDrawer();
  }));

  searchToggleBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSearchModal();
  }));

  // Close mobile drawer when link clicked
  document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => toggleMobileNav(false));
  });

  // --- Cart Core Functions ---
  function saveCart() {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
    updateBadges();
  }

  function updateBadges() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadgeHeader) {
      cartBadgeHeader.textContent = totalCount;
      cartBadgeHeader.style.display = totalCount > 0 ? 'flex' : 'none';
    }
    if (wishlistBadgeHeader) {
      wishlistBadgeHeader.textContent = wishlist.length;
      wishlistBadgeHeader.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
  }

  function addToCart(productId, size = null, quantity = 1) {
    const product = AURA_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    let sizeObj = null;
    if (size && product.availableSizes) {
      sizeObj = product.availableSizes.find(s => s.size === size);
    }
    if (!sizeObj) {
      sizeObj = product.availableSizes && product.availableSizes.length > 0
        ? product.availableSizes[0]
        : { size: product.size, priceDisplay: product.priceDisplay, numericPrice: product.numericPrice || 0 };
    }

    const chosenSize = sizeObj.size;
    const priceDisplay = sizeObj.priceDisplay;
    const numericPrice = sizeObj.numericPrice || product.numericPrice || 0;

    const existingIndex = cart.findIndex(item => item.id === productId && item.size === chosenSize);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        priceDisplay: priceDisplay,
        numericPrice: numericPrice,
        size: chosenSize,
        image: product.image,
        quantity: quantity
      });
    }

    saveCart();
    renderCart();
    showToast(`Added to your Aura Cart: ${product.name} (${chosenSize})`, '✦');
  }

  function updateCartQuantity(index, delta) {
    if (!cart[index]) return;
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
    renderCart();
  }

  function removeFromCart(index) {
    if (!cart[index]) return;
    const removedName = cart[index].name;
    cart.splice(index, 1);
    saveCart();
    renderCart();
    showToast(`Removed from cart: ${removedName}`, '✕');
  }

  function renderCart() {
    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="drawer-empty-state">
          <div class="drawer-empty-icon">✧</div>
          <p>Your shopping bag is currently empty.</p>
          <button class="btn btn-secondary btn-sm" onclick="document.querySelector('#cart-drawer').classList.remove('open'); document.querySelector('#backdrop-overlay').classList.remove('active'); document.body.style.overflow=''; location.href='#shop';">Explore Fragrances</button>
        </div>
      `;
      if (cartSubtotalEl) cartSubtotalEl.textContent = '₹ 0';
      return;
    }

    cartItemsList.innerHTML = cart.map((item, index) => `
      <div class="drawer-item-card">
        <img src="${item.image}" alt="${item.name}" class="drawer-item-img" />
        <div class="drawer-item-info">
          <h4>${item.name}</h4>
          <div class="drawer-item-meta">${item.size}</div>
          <div style="display:flex; align-items:center; justify-content:space-between; margin-top:0.4rem;">
            <div class="qty-counter" style="transform:scale(0.85); transform-origin:left center;">
              <button class="qty-btn" onclick="window.AURA_APP.updateCartQuantity(${index}, -1)">−</button>
              <input type="text" class="qty-input" value="${item.quantity}" readonly />
              <button class="qty-btn" onclick="window.AURA_APP.updateCartQuantity(${index}, 1)">+</button>
            </div>
            <div class="drawer-item-price">${item.priceDisplay}</div>
          </div>
        </div>
        <div class="drawer-item-remove" onclick="window.AURA_APP.removeFromCart(${index})" title="Remove">✕</div>
      </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + ((item.numericPrice || 0) * item.quantity), 0);
    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = subtotal > 0 ? `₹ ${subtotal.toLocaleString('en-IN')}` : `${cart.length} item(s)`;
    }
  }

  // --- Wishlist Core Functions ---
  function saveWishlist() {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    updateBadges();
  }

  function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    const product = AURA_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    if (index > -1) {
      wishlist.splice(index, 1);
      showToast(`Removed from Wishlist: ${product.name}`, '♡');
    } else {
      wishlist.push(productId);
      showToast(`Saved to your Wishlist: ${product.name}`, '♥');
    }

    saveWishlist();
    renderProducts();
    renderWishlist();
  }

  function renderWishlist() {
    if (!wishlistItemsList) return;

    const wishlistProducts = AURA_PRODUCTS.filter(p => wishlist.includes(p.id));

    if (wishlistProducts.length === 0) {
      wishlistItemsList.innerHTML = `
        <div class="drawer-empty-state">
          <div class="drawer-empty-icon">♡</div>
          <p>You haven't saved any fragrances yet.</p>
          <button class="btn btn-secondary btn-sm" onclick="document.querySelector('#wishlist-drawer').classList.remove('open'); document.querySelector('#backdrop-overlay').classList.remove('active'); document.body.style.overflow=''; location.href='#shop';">Discover Collection</button>
        </div>
      `;
      return;
    }

    wishlistItemsList.innerHTML = wishlistProducts.map(product => `
      <div class="drawer-item-card">
        <img src="${product.image}" alt="${product.name}" class="drawer-item-img" />
        <div class="drawer-item-info">
          <h4>${product.name}</h4>
          <div class="drawer-item-meta">${product.categoryLabel} • ${product.size}</div>
          <div class="drawer-item-price">${product.priceDisplay}</div>
          <button class="btn btn-primary btn-sm" style="margin-top:0.6rem; padding:0.4rem 0.8rem; font-size:0.65rem;" onclick="window.AURA_APP.addToCart('${product.id}'); window.AURA_APP.toggleWishlist('${product.id}')">Move to Bag</button>
        </div>
        <div class="drawer-item-remove" onclick="window.AURA_APP.toggleWishlist('${product.id}')" title="Remove">✕</div>
      </div>
    `).join('');
  }

  // --- WhatsApp Cart Checkout Generator ---
  function orderCartViaWhatsApp() {
    if (cart.length === 0) {
      showToast('Your bag is empty! Add a fragrance first.', '!');
      return;
    }

    let summaryText = `*ORDER INQUIRY - AURA FRAGRANCES BY FRIENDS*\n\nHello, I would like to inquire/order the following fragrances:\n`;
    cart.forEach((item, idx) => {
      summaryText += `\n${idx + 1}. *${item.name}*\n   Size: ${item.size}\n   Quantity: ${item.quantity}\n   Price: ${item.priceDisplay}\n`;
    });

    summaryText += `\nBrand: AURA FRAGRANCES BY FRIENDS`;
    summaryText += `\nPlease let me know order confirmation, availability, and pan-India shipping timeline. Thank you!`;

    const url = getWhatsAppUrl(summaryText);
    window.open(url, '_blank');
  }

  // --- Product Quick View Modal ---
  function openProductModal(productId) {
    const product = AURA_PRODUCTS.find(p => p.id === productId);
    if (!product || !productModal) return;

    activeProductModal = product;
    selectedModalSize = product.availableSizes ? product.availableSizes[0].size : product.size;

    // Populate Modal Content
    document.getElementById('modal-product-img').src = product.image;
    document.getElementById('modal-product-img').alt = product.name;
    document.getElementById('modal-product-cat').textContent = product.categoryLabel;
    document.getElementById('modal-product-title').textContent = product.name;
    document.getElementById('modal-product-type').textContent = product.fragranceType;
    document.getElementById('modal-product-price').textContent = product.availableSizes ? product.availableSizes[0].priceDisplay : product.priceDisplay;
    document.getElementById('modal-product-desc').textContent = product.about;

    // Size selector pills with real prices
    const sizeContainer = document.getElementById('modal-size-pills');
    if (sizeContainer && product.availableSizes) {
      sizeContainer.innerHTML = product.availableSizes.map((s, idx) => `
        <button class="size-pill ${idx === 0 ? 'active' : ''}" onclick="window.AURA_APP.selectModalSize('${s.size}', '${s.priceDisplay}', this)">
          ${s.size} (${s.priceDisplay})
        </button>
      `).join('');
    }

    // Notes breakdown
    document.getElementById('note-top-text').textContent = product.notes.top;
    document.getElementById('note-heart-text').textContent = product.notes.heart;
    document.getElementById('note-base-text').textContent = product.notes.base;

    // About & Usage
    document.getElementById('tab-panel-about').textContent = product.about;
    document.getElementById('tab-panel-usage').textContent = product.howToUse;

    // Reset Quantity
    const qtyInput = document.getElementById('modal-qty-input');
    if (qtyInput) qtyInput.value = 1;

    // Show Modal
    closeAllModals(false);
    productModal.classList.add('active');
    backdropOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function selectModalSize(size, priceDisplay, btnElement) {
    selectedModalSize = size;
    document.querySelectorAll('.size-pill').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    const priceEl = document.getElementById('modal-product-price');
    if (priceEl && priceDisplay) {
      priceEl.textContent = priceDisplay;
    }
  }

  function updateModalQty(delta) {
    const qtyInput = document.getElementById('modal-qty-input');
    if (!qtyInput) return;
    let val = parseInt(qtyInput.value) || 1;
    val = Math.max(1, val + delta);
    qtyInput.value = val;
  }

  function addModalProductToCart(buyNow = false) {
    if (!activeProductModal) return;
    const qtyInput = document.getElementById('modal-qty-input');
    const qty = parseInt(qtyInput?.value) || 1;

    addToCart(activeProductModal.id, selectedModalSize, qty);
    productModal.classList.remove('active');

    if (buyNow) {
      openCheckoutModal();
    }
  }

  function orderModalProductViaWhatsApp() {
    if (!activeProductModal) return;
    const qtyInput = document.getElementById('modal-qty-input');
    const qty = parseInt(qtyInput?.value) || 1;

    const message = `*PRODUCT INQUIRY - AURA FRAGRANCES BY FRIENDS*\n\nHello, I would like to order:\n- *${activeProductModal.name}*\n- Size: ${selectedModalSize}\n- Quantity: ${qty}\n- Fragrance Type: ${activeProductModal.fragranceType}\n- Price: ${activeProductModal.priceDisplay}\n\nPlease share delivery details and payment options. Thank you!`;
    const url = getWhatsAppUrl(message);
    window.open(url, '_blank');
  }

  // --- Modal Tabs Switching ---
  document.querySelectorAll('.modal-tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const targetTab = this.dataset.tab;
      document.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.modal-tab-panel').forEach(p => p.classList.remove('active'));

      this.classList.add('active');
      document.getElementById(`tab-panel-${targetTab}`)?.classList.add('active');
    });
  });

  // --- Checkout Modal ---
  function openCheckoutModal() {
    closeAllModals(false);
    checkoutModal?.classList.add('active');
    backdropOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Summary inside checkout
    const orderItemsSummary = document.getElementById('checkout-items-summary');
    if (orderItemsSummary) {
      if (cart.length === 0) {
        orderItemsSummary.innerHTML = `<p style="color:var(--text-muted);">Bag is empty. Please select a fragrance.</p>`;
      } else {
        orderItemsSummary.innerHTML = cart.map(i => `
          <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem; font-size:0.85rem;">
            <span>${i.name} (${i.size}) × ${i.quantity}</span>
            <span style="color:var(--gold-light);">${i.priceDisplay}</span>
          </div>
        `).join('');
      }
    }
  }

  // Handle Checkout Submission
  const checkoutForm = document.getElementById('checkout-form');
  checkoutForm?.addEventListener('submit', function (e) {
    e.preventDefault();

    if (cart.length === 0) {
      showToast('Please add items to your cart first.', '!');
      return;
    }

    const name = document.getElementById('checkout-name')?.value.trim();
    const phone = document.getElementById('checkout-phone')?.value.trim();
    const address = document.getElementById('checkout-address')?.value.trim();
    const city = document.getElementById('checkout-city')?.value.trim();
    const pincode = document.getElementById('checkout-pincode')?.value.trim();
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || 'whatsapp';

    if (!name || !phone || !address || !city || !pincode) {
      showToast('Please fill all required delivery fields.', '!');
      return;
    }

    if (paymentMethod === 'online') {
      showToast('Payment Gateway Ready: Connect merchant API keys to process live transactions.', '💳');
    }

    // Build complete WhatsApp dispatch note
    let orderMsg = `*NEW ORDER - AURA FRAGRANCES BY FRIENDS*\n\n`;
    orderMsg += `*Customer Details:*\n`;
    orderMsg += `Name: ${name}\nPhone: ${phone}\nAddress: ${address}, ${city} - ${pincode}\nPayment Preference: ${paymentMethod.toUpperCase()}\n\n`;
    orderMsg += `*Fragrance Selection:*\n`;
    cart.forEach((i, idx) => {
      orderMsg += `${idx + 1}. ${i.name} | ${i.size} | Qty: ${i.quantity} | ${i.priceDisplay}\n`;
    });
    orderMsg += `\nPlease confirm my order and share invoice/tracking. Thank you!`;

    const waUrl = getWhatsAppUrl(orderMsg);

    // Show Confirmation UI in Modal
    checkoutModal.querySelector('.checkout-modal-window').innerHTML = `
      <div style="text-align:center; padding:2rem 1rem;">
        <div style="width:70px; height:70px; margin:0 auto 1.5rem; border-radius:50%; border:1px solid var(--border-gold); display:flex; align-items:center; justify-content:center; color:var(--gold-light); font-size:2rem; background:rgba(200,164,93,0.1);">✓</div>
        <h3 style="font-size:2rem; margin-bottom:0.75rem; text-transform:uppercase;">Order Inquiry Registered</h3>
        <p style="color:var(--text-secondary); max-width:480px; margin:0 auto 1.5rem;">
          Thank you, <strong style="color:var(--text-primary);">${name}</strong>. Your luxury fragrance selection has been compiled. You can finalize dispatch instantly with our concierge on WhatsApp.
        </p>
        <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
          <a href="${waUrl}" target="_blank" class="btn btn-whatsapp" style="text-decoration:none;">Send Order to WhatsApp</a>
          <button class="btn btn-secondary" onclick="location.reload()">Return to Collection</button>
        </div>
      </div>
    `;

    // Clear cart
    cart = [];
    saveCart();
  });

  // --- Render Product Catalogue Grid ---
  function renderProducts() {
    if (!productsGrid) return;

    let filtered = AURA_PRODUCTS.slice();

    // 1. Category Filter
    if (currentCategory !== 'all') {
      if (currentCategory === 'best-sellers') {
        filtered = filtered.filter(p => p.isBestSeller || p.category === 'best-sellers');
      } else {
        filtered = filtered.filter(p => p.category === currentCategory);
      }
    }

    // 2. Fragrance Type Filter
    const selectedType = typeFilterSelect?.value;
    if (selectedType && selectedType !== 'all') {
      filtered = filtered.filter(p => p.fragranceType.toLowerCase().includes(selectedType.toLowerCase()));
    }

    // 3. Search Filter (Inline)
    const searchTerm = searchInlineInput?.value.trim().toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.categoryLabel.toLowerCase().includes(searchTerm) ||
        p.shortDescription.toLowerCase().includes(searchTerm) ||
        p.about.toLowerCase().includes(searchTerm)
      );
    }

    // 4. Sorting
    const sortVal = sortSelect?.value;
    if (sortVal === 'az') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortVal === 'za') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortVal === 'featured') {
      filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <p style="font-size: 1.1rem; color: var(--text-secondary);">No fragrances matched your current filters.</p>
          <button class="btn btn-secondary btn-sm" style="margin-top: 1rem;" onclick="window.AURA_APP.resetFilters()">Clear Filters</button>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map(product => {
      const isWishlisted = wishlist.includes(product.id);
      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-media">
            <span class="product-badge">${product.badge}</span>
            <button class="wishlist-btn-card ${isWishlisted ? 'active' : ''}" onclick="window.AURA_APP.toggleWishlist('${product.id}')" title="Save to Wishlist">
              ${isWishlisted ? '♥' : '♡'}
            </button>
            <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" />
          </div>
          <div class="product-details">
            <span class="product-cat-label">${product.categoryLabel}</span>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-short-desc">${product.shortDescription}</p>
            <div class="product-meta-row">
              <span class="product-size-label">${product.size}</span>
              <span class="product-price-label">${product.priceDisplay}</span>
            </div>
            <div class="product-card-actions">
              <button class="btn btn-secondary btn-sm" onclick="window.AURA_APP.openProductModal('${product.id}')">View Details</button>
              <button class="btn btn-primary btn-sm" onclick="window.AURA_APP.addToCart('${product.id}')">Add to Cart</button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function resetFilters() {
    currentCategory = 'all';
    catTabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === 'all'));
    if (typeFilterSelect) typeFilterSelect.value = 'all';
    if (sortSelect) sortSelect.value = 'featured';
    if (searchInlineInput) searchInlineInput.value = '';
    renderProducts();
  }

  // Category Tab Click Handler
  catTabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      catTabButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.dataset.category;
      renderProducts();
    });
  });

  // Filter Listeners
  sortSelect?.addEventListener('change', renderProducts);
  typeFilterSelect?.addEventListener('change', renderProducts);
  searchInlineInput?.addEventListener('input', renderProducts);

  // --- Giant Search Modal Live Search ---
  searchGiantInput?.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    if (!searchLiveResults) return;

    if (!q) {
      searchLiveResults.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem; padding:1rem;">Type to search fragrances...</p>';
      return;
    }

    const matches = AURA_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.about.toLowerCase().includes(q) ||
      p.notes.top.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      searchLiveResults.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem; padding:1rem;">No fragrances found matching "${q}".</p>`;
      return;
    }

    searchLiveResults.innerHTML = matches.map(p => `
      <div class="search-result-item" onclick="window.AURA_APP.openProductModal('${p.id}');">
        <img src="${p.image}" alt="${p.name}" class="search-result-thumb" />
        <div style="flex-grow:1;">
          <h4 style="font-size:0.95rem; color:var(--text-primary); margin-bottom:0.2rem;">${p.name}</h4>
          <span style="font-size:0.75rem; color:var(--gold-primary); text-transform:uppercase;">${p.categoryLabel} • ${p.size}</span>
        </div>
        <div style="font-family:var(--font-serif); color:var(--gold-light);">${p.priceDisplay}</div>
      </div>
    `).join('');
  });

  // --- FAQ Accordion Logic ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answerPanel = item.querySelector('.faq-answer-panel');

    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items for a clean accordion effect
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherPanel = otherItem.querySelector('.faq-answer-panel');
        if (otherPanel) otherPanel.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answerPanel.style.maxHeight = answerPanel.scrollHeight + 'px';
      }
    });
  });

  // --- Direct Checkout Button Triggers ---
  document.getElementById('cart-checkout-btn')?.addEventListener('click', () => {
    openCheckoutModal();
  });
  document.getElementById('cart-whatsapp-btn')?.addEventListener('click', () => {
    orderCartViaWhatsApp();
  });
  document.querySelectorAll('.open-checkout-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCheckoutModal();
    });
  });

  // --- Expose App API for Inline Click Handlers ---
  window.AURA_APP = {
    addToCart,
    updateCartQuantity,
    removeFromCart,
    toggleWishlist,
    openProductModal,
    selectModalSize,
    updateModalQty,
    addModalProductToCart,
    orderModalProductViaWhatsApp,
    orderCartViaWhatsApp,
    openCheckoutModal,
    resetFilters,
    showToast
  };

  // --- Initialize App ---
  updateBadges();
  renderProducts();
})();
