/**
 * AURA FRAGRANCES BY FRIENDS - Curated Luxury Product Catalog
 * Brand Identity: "Premium Products | Premium Experience"
 * "More Than a Fragrance. It's Your Aura."
 */

const AURA_CONFIG = {
  brandName: "AURA FRAGRANCES BY FRIENDS",
  tagline: "More Than a Fragrance. It’s Your Aura.",
  instagramHandle: "@aurafragrancesbyfriends",
  instagramUrl: "https://www.instagram.com/aurafragrancesbyfriends/",
  whatsappNumber: "+919876543210",
  whatsappDisplay: "+91 98765 43210",
  email: "concierge@aurafragrances.com",
  location: "Mumbai, India • Pan-India Delivery",
  currencySymbol: "₹"
};

const AURA_PRODUCTS = [
  {
    id: "aura-01",
    name: "Obsidian Aura",
    category: "for-him",
    categoryLabel: "For Him",
    isBestSeller: true,
    fragranceType: "Eau de Parfum",
    size: "100 ml",
    numericPrice: 3499,
    priceDisplay: "₹ 3,499",
    availableSizes: [
      { size: "50 ml", priceDisplay: "₹ 2,499", numericPrice: 2499 },
      { size: "100 ml", priceDisplay: "₹ 3,499", numericPrice: 3499 }
    ],
    image: "assets/bottle-noir.svg",
    badge: "Best Seller",
    shortDescription: "A commanding presence of smoky bergamot, dark agarwood, and amber resin.",
    about: "Obsidian Aura is designed for the modern connoisseur. It opens with an electric burst of Sicilian bergamot and cracked black pepper before sinking into a hypnotic heart of smoked leather and aged Cambodian oud. A scent that leaves an undeniable mark.",
    notes: {
      top: "Sicilian Bergamot, Pink Peppercorn, Cardamom",
      heart: "Smoked Leather, Night Iris, Birch Tar",
      base: "Cambodian Oud, Golden Amber, Haitian Vetiver"
    },
    howToUse: "Spray directly onto pulse points—wrists, collarbone, and behind the ears. For maximum longevity, apply immediately after showering onto hydrated skin."
  },
  {
    id: "aura-02",
    name: "Velvet Aurelia",
    category: "for-her",
    categoryLabel: "For Her",
    isBestSeller: true,
    fragranceType: "Extrait de Parfum",
    size: "100 ml",
    numericPrice: 3799,
    priceDisplay: "₹ 3,799",
    availableSizes: [
      { size: "50 ml", priceDisplay: "₹ 2,699", numericPrice: 2699 },
      { size: "100 ml", priceDisplay: "₹ 3,799", numericPrice: 3799 }
    ],
    image: "assets/bottle-champagne.svg",
    badge: "Signature",
    shortDescription: "An intoxicating harmony of champagne nectar, velvet rose, and bourbon vanilla.",
    about: "Velvet Aurelia radiates luminous warmth and magnetic sensuality. Basking in top notes of sparkling champagne accord and golden peach, it settles into an opulent velvet rose heart embraced by Madagascar vanilla and cashmere woods.",
    notes: {
      top: "Champagne Accord, White Peach, Mandarin Zest",
      heart: "Damask Rose Absolute, Egyptian Jasmine, Lily of the Valley",
      base: "Bourbon Vanilla, Cashmere Musks, Amber Crystal"
    },
    howToUse: "Mist into the air and step through, or apply directly to wrists, collarbones, and hair tips for an enchanting sillage that lingers from dusk till dawn."
  },
  {
    id: "aura-03",
    name: "Aura Sublime",
    category: "unisex",
    categoryLabel: "Unisex",
    isBestSeller: false,
    fragranceType: "Extrait de Parfum",
    size: "100 ml",
    numericPrice: 3899,
    priceDisplay: "₹ 3,899",
    availableSizes: [
      { size: "50 ml", priceDisplay: "₹ 2,799", numericPrice: 2799 },
      { size: "100 ml", priceDisplay: "₹ 3,899", numericPrice: 3899 }
    ],
    image: "assets/bottle-cylinder.svg",
    badge: "Unisex",
    shortDescription: "A transcendent fusion of crimson saffron, bitter almond, and ambergris.",
    about: "Aura Sublime defies gender boundaries with supreme sophistication. It envelops the wearer in a golden halo of Kashmiri saffron and toasted almond, anchored by the oceanic depths of ambergris and cedarwood.",
    notes: {
      top: "Kashmiri Saffron, Bitter Almond, Blood Orange",
      heart: "Jasmine Sambac, Mineral Amber, Cedarwood Needle",
      base: "Precious Ambergris, Fir Balsam, White Musk"
    },
    howToUse: "Apply 2-3 sprays on neck and chest. The high extrait concentration develops complex nuances throughout the day."
  },
  {
    id: "aura-04",
    name: "Imperial Aura",
    category: "best-sellers",
    categoryLabel: "Best Sellers",
    isBestSeller: true,
    fragranceType: "Grand Extrait",
    size: "100 ml",
    numericPrice: 4199,
    priceDisplay: "₹ 4,199",
    availableSizes: [
      { size: "50 ml", priceDisplay: "₹ 2,999", numericPrice: 2999 },
      { size: "100 ml", priceDisplay: "₹ 4,199", numericPrice: 4199 }
    ],
    image: "assets/bottle-imperial.svg",
    badge: "Exclusive",
    shortDescription: "The zenith of royalty: Imperial agarwood, smoked frankincense, and dark honey.",
    about: "The jewel of our maison. Imperial Aura is formulated with rare botanical extracts and ceremonial resins, exuding sovereign luxury, poise, and prestige.",
    notes: {
      top: "Wild Honey, Spiced Nutmeg, Bergamot Zest",
      heart: "Royal Frankincense, Turkish Rose, Smoked Cedar",
      base: "Imperial Oud, Labdanum, Benzoin Resin, Tonka Bean"
    },
    howToUse: "Best reserved for defining moments, formal occasions, or signature evening wear."
  },
  {
    id: "aura-05",
    name: "Monarch Noir",
    category: "for-him",
    categoryLabel: "For Him",
    isBestSeller: false,
    fragranceType: "Eau de Parfum",
    size: "100 ml",
    numericPrice: 3699,
    priceDisplay: "₹ 3,699",
    availableSizes: [
      { size: "50 ml", priceDisplay: "₹ 2,599", numericPrice: 2599 },
      { size: "100 ml", priceDisplay: "₹ 3,699", numericPrice: 3699 }
    ],
    image: "assets/bottle-noir.svg",
    badge: "New Arrival",
    shortDescription: "Dark aromatics woven with French lavender, Tuscan iris, and espresso bean.",
    about: "A sharp, tailored fragrance evoking bespoke evening suits and timeless masculine authority. Clean aromatic spices give way to earthy orris and rich roasted coffee notes.",
    notes: {
      top: "French Lavender, Cardamom Pods, Grapefruit",
      heart: "Tuscan Iris, Roasted Espresso, Cinnamon Bark",
      base: "Indonesian Patchouli, Tonka, Leather, Sandalwood"
    },
    howToUse: "Mist on pulse points before formal events or crisp evening gatherings."
  },
  {
    id: "aura-06",
    name: "Golden Sillage",
    category: "for-her",
    categoryLabel: "For Her",
    isBestSeller: false,
    fragranceType: "Eau de Parfum",
    size: "100 ml",
    numericPrice: 3299,
    priceDisplay: "₹ 3,299",
    availableSizes: [
      { size: "50 ml", priceDisplay: "₹ 2,299", numericPrice: 2299 },
      { size: "100 ml", priceDisplay: "₹ 3,299", numericPrice: 3299 }
    ],
    image: "assets/bottle-champagne.svg",
    badge: "Luxe",
    shortDescription: "A sun-drenched veil of neroli petals, orange blossom, and golden sandalwood.",
    about: "Golden Sillage captures the magic of golden hour. It radiates effortless grace with radiant floral accords swirled in warm caramel and cream woods.",
    notes: {
      top: "Tunisian Neroli, Calabrian Lemon, Green Pear",
      heart: "Orange Blossom, Magnolia, Creamy Ylang-Ylang",
      base: "Australian Sandalwood, Salted Caramel, Amber Glow"
    },
    howToUse: "Spray on pulse points and brush through hair for an angelic trail that turns heads."
  },
  {
    id: "aura-07",
    name: "Celestial Santal",
    category: "unisex",
    categoryLabel: "Unisex",
    isBestSeller: true,
    fragranceType: "Eau de Parfum",
    size: "100 ml",
    numericPrice: 3699,
    priceDisplay: "₹ 3,699",
    availableSizes: [
      { size: "50 ml", priceDisplay: "₹ 2,599", numericPrice: 2599 },
      { size: "100 ml", priceDisplay: "₹ 3,699", numericPrice: 3699 }
    ],
    image: "assets/bottle-cylinder.svg",
    badge: "Best Seller",
    shortDescription: "Creamy sandalwood blended with delicate violet, papyrus, and smoked cardamom.",
    about: "A cult modern classic. Celestial Santal is comforting yet mysterious, featuring rich milky wood accords interwoven with leather and cool crushed violet leaves.",
    notes: {
      top: "Crushed Cardamom, Violet Leaf, Cypress",
      heart: "Egyptian Papyrus, Orris Concrete, Smoky Cedar",
      base: "Mysore Sandalwood, Supple Leather, Amber, Iso E Super"
    },
    howToUse: "Perfect for year-round everyday signature wear. Layer with lighter scents or wear solo."
  },
  {
    id: "aura-08",
    name: "Elysian Mist",
    category: "best-sellers",
    categoryLabel: "Best Sellers",
    isBestSeller: true,
    fragranceType: "Eau de Parfum",
    size: "100 ml",
    numericPrice: 3599,
    priceDisplay: "₹ 3,599",
    availableSizes: [
      { size: "50 ml", priceDisplay: "₹ 2,499", numericPrice: 2499 },
      { size: "100 ml", priceDisplay: "₹ 3,599", numericPrice: 3599 }
    ],
    image: "assets/bottle-imperial.svg",
    badge: "Limited Edition",
    shortDescription: "A royal alchemy of dark damask rose, golden amber crystals, and white oud.",
    about: "An ethereal composition born from private reserves. Elysian Mist leaves an aura of mystique, blending delicate morning blossoms with ancient smoldering timbers.",
    notes: {
      top: "Rosewater Dew, Bergamot, Pink Pepper",
      heart: "May Rose, Amberwood, Smoked Incense",
      base: "White Agarwood, Velvet Musks, Praline"
    },
    howToUse: "Spray on pulse points and let settle naturally into the skin without rubbing."
  }
];
