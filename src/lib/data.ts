export const products = [
  {
    id: "1",
    name: "Midnight Oud",
    brand: "NOIR Exclusive",
    price: 185,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    isBestSeller: true,
    category: "unisex",
    description: "A captivating blend of rare oud, smoky incense, and warm amber. This luxurious fragrance opens with mysterious dark notes and evolves into a sophisticated, long-lasting scent that leaves an unforgettable impression.",
    notes: {
      top: ["Bergamot", "Saffron", "Pink Pepper"],
      middle: ["Oud", "Rose", "Incense"],
      base: ["Amber", "Sandalwood", "Musk"],
    },
    size: "100ml",
  },
  {
    id: "2",
    name: "Velvet Rose",
    brand: "NOIR Collection",
    price: 165,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
    rating: 4.9,
    reviewCount: 89,
    isBestSeller: true,
    category: "women",
    description: "An elegant floral masterpiece featuring the finest Bulgarian rose, enriched with velvety undertones of peony and jasmine. Perfect for the modern woman who appreciates timeless sophistication.",
    notes: {
      top: ["Bergamot", "Lychee", "Pink Pepper"],
      middle: ["Bulgarian Rose", "Peony", "Jasmine"],
      base: ["White Musk", "Cedar", "Ambroxan"],
    },
    size: "75ml",
  },
  {
    id: "3",
    name: "Ocean Breeze",
    brand: "NOIR Fresh",
    price: 120,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    rating: 4.6,
    reviewCount: 156,
    category: "men",
    description: "A refreshing aquatic fragrance that captures the essence of the Mediterranean coast. Clean, crisp, and invigorating with marine accords and citrus notes.",
    notes: {
      top: ["Sea Salt", "Lemon", "Grapefruit"],
      middle: ["Marine Accord", "Lavender", "Geranium"],
      base: ["White Cedar", "Musk", "Ambergris"],
    },
    size: "100ml",
  },
  {
    id: "4",
    name: "Amber Noir",
    brand: "NOIR Signature",
    price: 195,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
    rating: 4.7,
    reviewCount: 78,
    isNew: true,
    category: "unisex",
    description: "A warm and sensual oriental fragrance built around precious amber accord. Rich, opulent, and deeply sophisticated with hints of vanilla and exotic spices.",
    notes: {
      top: ["Cardamom", "Orange Blossom", "Cinnamon"],
      middle: ["Amber", "Benzoin", "Labdanum"],
      base: ["Vanilla", "Sandalwood", "Tonka Bean"],
    },
    size: "100ml",
  },
  {
    id: "5",
    name: "White Jasmine",
    brand: "NOIR Floral",
    price: 145,
    image: "https://images.unsplash.com/photo-1595425959155-62e4ed21c92e?w=800&q=80",
    rating: 4.5,
    reviewCount: 112,
    category: "women",
    description: "A delicate white floral fragrance centered around night-blooming jasmine. Ethereal, romantic, and utterly feminine with a clean, lasting presence.",
    notes: {
      top: ["Pear", "Mandarin", "Green Notes"],
      middle: ["Jasmine Sambac", "Tuberose", "Ylang-Ylang"],
      base: ["White Musk", "Cedarwood", "Cashmeran"],
    },
    size: "50ml",
  },
  {
    id: "6",
    name: "Tobacco & Leather",
    brand: "NOIR Homme",
    price: 175,
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80",
    rating: 4.8,
    reviewCount: 94,
    isBestSeller: true,
    category: "men",
    description: "A bold masculine fragrance combining rich tobacco leaves with supple leather. Confident, powerful, and undeniably sophisticated for the modern gentleman.",
    notes: {
      top: ["Whiskey", "Apple", "Cardamom"],
      middle: ["Tobacco Leaf", "Leather", "Oud"],
      base: ["Benzoin", "Vetiver", "Moss"],
    },
    size: "100ml",
  },
  {
    id: "7",
    name: "Citrus Garden",
    brand: "NOIR Fresh",
    price: 95,
    image: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=800&q=80",
    rating: 4.4,
    reviewCount: 67,
    category: "unisex",
    description: "A bright and energizing citrus fragrance perfect for everyday wear. Uplifting blend of Italian lemons, bergamot, and fresh green notes.",
    notes: {
      top: ["Lemon", "Bergamot", "Grapefruit"],
      middle: ["Neroli", "Petit Grain", "Green Tea"],
      base: ["White Musk", "Cedar", "Vetiver"],
    },
    size: "75ml",
  },
  {
    id: "8",
    name: "Sandalwood Dreams",
    brand: "NOIR Oriental",
    price: 210,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80",
    rating: 4.9,
    reviewCount: 143,
    isBestSeller: true,
    category: "unisex",
    description: "A meditative woody fragrance featuring the finest Australian sandalwood. Creamy, warm, and deeply comforting with exceptional longevity.",
    notes: {
      top: ["Violet Leaf", "Cardamom", "Bergamot"],
      middle: ["Australian Sandalwood", "Iris", "Rose"],
      base: ["Cashmere Wood", "Vanilla", "Musk"],
    },
    size: "100ml",
  },
]

export const blogs = [
  {
    id: "1",
    title: "The Art of Layering Fragrances: A Complete Guide",
    excerpt: "Discover how to combine multiple perfumes to create your own unique signature scent. Learn the techniques used by professional perfumers.",
    content: `Fragrance layering is an art form that allows you to create a personalized scent that's uniquely yours. By combining different perfumes strategically, you can achieve a complexity and depth that single fragrances often can't provide.

## Understanding Fragrance Families

Before you start layering, it's essential to understand the basic fragrance families:

- **Citrus**: Fresh, bright, and energizing
- **Floral**: Romantic, feminine, and elegant
- **Oriental**: Warm, sensual, and exotic
- **Woody**: Earthy, grounding, and sophisticated
- **Fresh**: Clean, aquatic, and invigorating

## Basic Layering Techniques

### 1. Start with a Base
Begin with your heaviest, most long-lasting fragrance. This is typically an oriental or woody scent that will anchor your combination.

### 2. Add Complementary Notes
Layer a lighter fragrance on top that shares at least one note with your base. This creates harmony between the scents.

### 3. Apply Strategically
Apply different fragrances to different pulse points. Your base scent goes on your chest and wrists, while lighter scents can go behind your ears or in the crooks of your elbows.

## Tips for Success

- Start with just two fragrances before attempting more complex combinations
- Test your combinations at home before wearing them out
- Keep notes of successful combinations
- Don't be afraid to experiment

The beauty of layering is that there are no strict rules. Trust your nose and have fun creating something uniquely you.`,
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80",
    category: "Guide",
    date: "Mar 15, 2024",
    author: "Sophie Laurent",
  },
  {
    id: "2",
    title: "Top 10 Perfume Trends for 2024",
    excerpt: "From sustainable ingredients to nostalgic scents, explore the fragrance trends that are defining this year's perfume landscape.",
    content: `The perfume industry is constantly evolving, and 2024 brings exciting new trends that reflect our changing world and values.

## 1. Sustainable Luxury
Eco-conscious consumers are driving demand for perfumes made with sustainably sourced ingredients and recyclable packaging.

## 2. Gender-Fluid Fragrances
The lines between masculine and feminine scents continue to blur, with more brands offering truly unisex options.

## 3. Nostalgic Scents
Comforting, familiar scents that evoke memories are making a strong comeback, from fresh laundry to grandmother's kitchen.

## 4. Wellness Fragrances
Perfumes designed to influence mood and promote well-being are increasingly popular.

## 5. Rare Ingredients
Consumers are seeking out fragrances featuring unusual, hard-to-find ingredients for uniqueness.`,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "Trends",
    date: "Mar 10, 2024",
    author: "James Chen",
  },
  {
    id: "3",
    title: "How to Make Your Perfume Last All Day",
    excerpt: "Expert tips and tricks to maximize the longevity of your favorite fragrances, from application techniques to storage solutions.",
    content: `Nothing is more frustrating than spraying on your favorite perfume only to have it fade within a few hours. Here's how to make your scent last from morning to night.

## Prep Your Skin

Moisturized skin holds fragrance better than dry skin. Apply an unscented lotion or body oil before your perfume.

## Target Pulse Points

Apply perfume to areas where blood vessels are close to the skin:
- Wrists
- Behind ears
- Base of throat
- Inside elbows
- Behind knees

## Don't Rub

Rubbing your wrists together after applying perfume breaks down the molecules and causes the scent to fade faster.

## Layer Your Products

Use matching body wash, lotion, and perfume from the same line to build intensity.

## Store Properly

Keep your perfumes away from heat, light, and humidity. A cool, dark drawer is ideal.`,
    image: "https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=800&q=80",
    category: "Tips",
    date: "Mar 5, 2024",
    author: "Emma Williams",
  },
  {
    id: "4",
    title: "The History of Oud: From Ancient Arabia to Modern Perfumery",
    excerpt: "Explore the fascinating journey of oud, one of the world's most precious and sought-after fragrance ingredients.",
    content: `Oud, also known as agarwood, has been treasured for thousands of years. This precious ingredient has a rich history that spans continents and cultures.

## Origins

Oud is derived from the Aquilaria tree, native to Southeast Asia. When the tree becomes infected with a specific type of mold, it produces a dark, fragrant resin as a defense mechanism.

## Cultural Significance

In the Middle East, oud has been burned as incense for millennia and is deeply woven into cultural and religious practices. It symbolizes luxury, hospitality, and spirituality.

## Modern Renaissance

While oud has always been popular in the Middle East, it only entered Western perfumery in the early 2000s. Today, it's one of the most sought-after ingredients in luxury fragrances.`,
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80",
    category: "History",
    date: "Feb 28, 2024",
    author: "Ahmad Hassan",
  },
  {
    id: "5",
    title: "Perfume Gifting Guide: Finding the Perfect Scent",
    excerpt: "Choosing a perfume for someone else can be daunting. Here's your comprehensive guide to selecting a fragrance gift they'll love.",
    content: `Gifting perfume can feel risky, but with the right approach, you can choose a fragrance that will delight your recipient.

## Know Their Preferences

Pay attention to:
- Scents they already wear
- Their personality and lifestyle
- Seasons they prefer certain scents

## Safe Choices

When in doubt, consider these universally appealing options:
- Light florals for spring/summer
- Warm vanillas for fall/winter
- Fresh citrus for active lifestyles

## Presentation Matters

A beautifully packaged perfume with a handwritten note shows extra thought and care.`,
    image: "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=800&q=80",
    category: "Guide",
    date: "Feb 20, 2024",
    author: "Sophie Laurent",
  },
]

export const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    comment: "Absolutely stunning fragrance! The Midnight Oud has become my signature scent. It's sophisticated, long-lasting, and I receive compliments everywhere I go.",
    product: "Midnight Oud",
    date: "Mar 12, 2024",
    verified: true,
  },
  {
    name: "Michael K.",
    rating: 5,
    comment: "The Tobacco & Leather is everything I was looking for. Rich, masculine, and perfect for evening wear. The longevity is incredible.",
    product: "Tobacco & Leather",
    date: "Mar 10, 2024",
    verified: true,
  },
  {
    name: "Emma L.",
    rating: 4,
    comment: "Velvet Rose is beautifully crafted. The rose is natural and not overwhelming. Perfect for my wedding day!",
    product: "Velvet Rose",
    date: "Mar 8, 2024",
    verified: true,
  },
  {
    name: "David R.",
    rating: 5,
    comment: "Sandalwood Dreams is pure luxury in a bottle. Creamy, warm, and incredibly comforting. Worth every penny.",
    product: "Sandalwood Dreams",
    date: "Mar 5, 2024",
    verified: true,
  },
  {
    name: "Jennifer H.",
    rating: 5,
    comment: "I was skeptical about buying perfume online, but the customer service team helped me find the perfect scent. Amazing experience!",
    product: "White Jasmine",
    date: "Mar 3, 2024",
    verified: true,
  },
  {
    name: "Thomas B.",
    rating: 4,
    comment: "Ocean Breeze is my go-to summer fragrance. Fresh, clean, and lasts all day. Great for the office too.",
    product: "Ocean Breeze",
    date: "Feb 28, 2024",
    verified: true,
  },
]

export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}

export function getBlogById(id: string) {
  return blogs.find((b) => b.id === id)
}
