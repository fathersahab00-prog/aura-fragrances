# AURA FRAGRANCES BY FRIENDS — Luxury E-Commerce Website

Official modern and luxury website created for **AURA FRAGRANCES BY FRIENDS** (`@aurafragrancesbyfriends`).

> **Brand Positioning:**  
> *“Premium Products | Premium Experience”*  
> *“More Than a Fragrance. It’s Your Aura.”*

---

## 💎 Visual Identity & Palette
- **Obsidian Black (Background):** `#080808`
- **Charcoal (Secondary Background):** `#111111` / `#161616`
- **Champagne Gold (Accent):** `#C8A45D`
- **Light Gold (Glow & Highlights):** `#F0D58D`
- **Soft Cream (Primary Text):** `#F6F3EC`
- **Muted Silver-Gold (Secondary Text):** `#AAA39A`
- **Typography:** *Cormorant Garamond* (Luxury Serif) & *Montserrat / Inter* (Modern Sans-Serif)

---

## 🌟 Key Features & Included Sections

1. **Header & Navigation**: Sticky luxury navbar with circular monogram emblem (`AF`), category navigation, live search trigger, animated wishlist & cart badges, and responsive mobile drawer.
2. **Hero Section**: High-impact editorial layout featuring cinematic headline, supporting text, dual CTAs (*Shop Collection* & *Order Now*), floating luxury perfume bottle with ambient golden glow, and interactive HTML5 gold particle canvas.
3. **Brand Introduction**: *"ELEVATE YOUR STYLE"* with brand philosophy and 4 luxury feature cards (*Premium Quality, Curated Collection, Pan-India Delivery, Premium Experience*).
4. **Shop / Collection**: Product catalogue with category filter tabs (*All, For Him, For Her, Unisex, Best Sellers*), Fragrance Type filter, Price/Alphabetical sorting, and instant search.
5. **Product Detail Page / Quick View Modal**: High-res flacon visual, size selector pills, quantity counter, Add to Bag, Buy Now, WhatsApp direct inquiry, and tabbed specifications (*Fragrance Notes: Top/Heart/Base, About This Fragrance, How To Use*).
6. **About Aura**: Split-screen editorial featuring brand identity statement: *"Your Fragrance. Your Aura. Your Identity."*
7. **Why Aura**: 4 luxury feature cards with gold accents and hover motion.
8. **How To Order**: 4-step progressive timeline (`01 EXPLORE`, `02 CHOOSE`, `03 ORDER`, `04 ENJOY`).
9. **Instagram Section**: Direct link to `@aurafragrancesbyfriends` (`https://www.instagram.com/aurafragrancesbyfriends/`) with editorial photo grid.
10. **Testimonials**: Clean, luxury placeholder feedback cards with 5-star ratings ready for real customer reviews.
11. **FAQ Accordion**: All 7 brand questions pre-configured with interactive collapse/expand and official status text.
12. **Contact Section**: Concierge contact card with WhatsApp, Email, Location placeholders and direct action buttons.
13. **Footer**: Luxury dark footer with brand statement, navigation links, policy links, and 2026 copyright.
14. **E-Commerce System**:
    - Slide-over Shopping Cart drawer with quantity controls and automatic subtotal updates.
    - Slide-over Wishlist drawer with persistent `localStorage`.
    - Giant instant search modal with live matching.
    - Checkout modal with customer shipping information and WhatsApp order generator.
    - Toast notifications for cart and wishlist interactions.
    - Floating quick-chat WhatsApp concierge button.

---

## 📂 File Architecture

```
c:/Users/Shakib/OneDrive/ドキュメント/BA/
├── index.html                 # Main HTML5 entrypoint with all 13 sections and modals
├── css/
│   └── styles.css             # Luxury Black & Gold CSS design system
├── js/
│   ├── products-data.js       # Product catalog data structure (clean placeholders)
│   ├── particles.js           # Ambient gold particle canvas engine
│   └── app.js                 # Cart, Wishlist, WhatsApp ordering, filters, search
├── assets/
│   ├── logo.svg               # Circular AF monogram emblem
│   ├── hero-bottle.svg        # Cinematic hero flacon illustration
│   ├── bottle-noir.svg        # For Him flacon
│   ├── bottle-champagne.svg   # For Her flacon
│   ├── bottle-cylinder.svg    # Unisex flacon
│   ├── bottle-imperial.svg    # Best Sellers flacon
│   └── insta-1.svg to 6.svg   # Editorial Instagram placeholders
└── README.md                  # Documentation and customization guide
```

---

## 🛠️ How to Customize

### 1. Update Contact Information & WhatsApp Number
Open `js/products-data.js` and edit the `AURA_CONFIG` object:
```javascript
const AURA_CONFIG = {
  brandName: "AURA FRAGRANCES BY FRIENDS",
  instagramHandle: "@aurafragrancesbyfriends",
  instagramUrl: "https://www.instagram.com/aurafragrancesbyfriends/",
  whatsappNumber: "+919876543210", // <-- Replace with your real WhatsApp number
  email: "contact@aurafragrances.com", // <-- Replace with your email
  location: "Mumbai, India", // <-- Replace with your business address
  currencySymbol: "₹",
  defaultPlaceholderPrice: "₹ 2,499"
};
```

### 2. Update Real Products, Fragrance Notes & Prices
Open `js/products-data.js` and update each product entry in the `AURA_PRODUCTS` array:
```javascript
{
  id: "aura-01",
  name: "Velvet Obsidian", // <-- Your real product name
  category: "for-him", // "for-him" | "for-her" | "unisex" | "best-sellers"
  categoryLabel: "For Him",
  isBestSeller: true,
  fragranceType: "Eau de Parfum",
  size: "100 ml",
  priceDisplay: "₹ 2,999",
  image: "assets/your-bottle-photo.jpg", // <-- Replace with your real bottle photo
  badge: "Best Seller",
  shortDescription: "A rich blend of smoky woods, cardamom, and warm amber.",
  about: "Full description of your fragrance...",
  notes: {
    top: "Bergamot, Cardamom",
    heart: "Smoked Oud, Iris",
    base: "Amber, Leather, Cedar"
  },
  howToUse: "Spray onto pulse points: wrists, collar, and neck."
}
```

### 3. Replace Placeholder Images with Real Photos
Simply place your high-resolution PNG, JPG, or WebP perfume photos inside the `assets/` folder and update the image paths in `js/products-data.js` or `index.html`.

### 4. Connect Payment Gateway (Razorpay / Cashfree / Stripe / PhonePe)
The checkout form in `index.html` and `js/app.js` has a simulated payment gateway trigger ready. When you obtain your API keys from Razorpay or Cashfree:
1. Include the provider script (e.g. `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>`).
2. Add your `key_id` in `js/app.js` under the `paymentMethod === 'online'` handler to open the official gateway modal.

---

## 🚀 How to View & Run

Since this website is built with clean, zero-dependency HTML5, CSS3, and modern JavaScript:
- **Option 1 (Direct):** Double-click `index.html` to open it in any modern browser (Chrome, Edge, Safari, Firefox).
- **Option 2 (Local Server):** If you have Node.js or Python installed, run in your terminal:
  ```bash
  # Using Python:
  python -m http.server 8000
  
  # Or using Node:
  npx serve
  ```
  Then visit `http://localhost:8000`.
