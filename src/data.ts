import { Destination, TravelPlan, TourPackage, BlogPost, Testimonial, FAQ } from './types';

export const destinations: Destination[] = [
  {
    id: 'neelum-valley',
    name: 'Neelum Valley',
    location: 'Azad Kashmir, Pakistan',
    rating: 4.9,
    description: 'A 144 km long bow-shaped valley with dramatic pine-forested hills, gushing waterfalls, and the sapphire Neelum River tracing its path.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    bestTime: 'May to October'
  },
  {
    id: 'arang-kel',
    name: 'Arang Kel',
    location: 'Neelum Valley, Kashmir',
    rating: 5.0,
    description: 'Known as the Pearl of Neelum Valley, this breathtaking hilltop pasture village is accessed via a scenic cable car or hike through dense forests.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    bestTime: 'June to September'
  },
  {
    id: 'keran',
    name: 'Keran',
    location: 'Neelum Valley Riverfront',
    rating: 4.8,
    description: 'A beautiful riverside village providing stunning, tranquil views of the dividing line. The perfect spot to unwind to the sound of flowing currents.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800',
    bestTime: 'April to October'
  },
  {
    id: 'sharda',
    name: 'Sharda',
    location: 'Neelum Valley Historical Site',
    rating: 4.7,
    description: 'A place of historic significance, home to the ancient Sharda Peeth ruins. Immerse yourself in ancient legends, sweeping river beds, and lush valleys.',
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800',
    bestTime: 'April to November'
  },
  {
    id: 'ratti-gali',
    name: 'Ratti Gali Lake',
    location: 'Alpine Lake Altitude 12,130 ft',
    rating: 4.9,
    description: 'A magical, glacier-fed alpine lake surrounded by fields of wild, vibrant mountain flowers and guarded by towering snowy peaks.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
    bestTime: 'July to September'
  },
  {
    id: 'pir-chinasi',
    name: 'Pir Chinasi',
    location: 'Muzaffarabad Ridge, Kashmir',
    rating: 4.8,
    description: 'A towering hilltop shrine offering an expansive, 360-degree panoramic view of Muzaffarabad and the sweeping snow-capped Himalayan ranges.',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=800',
    bestTime: 'Year-Round'
  }
];

export const travelPlans: TravelPlan[] = [
  {
    id: 'plan-3-days',
    name: '3 Days Adventure',
    price: 35000,
    duration: '3 Days, 2 Nights',
    hotel: 'Premium Riverfront Lodge (Keran)',
    transport: 'Private 4x4 Prado Luxury SUV',
    meals: 'Gourmet Breakfast & Traditional Dinner',
    guide: 'Expert Local Historian & Trekking Guide',
    features: [
      'Scenic stopovers at Muzaffarabad',
      'Exclusive Riverside Keran bonfire night',
      'Guided historical tour of Sharda Peeth',
      'All entry fees and permits pre-arranged'
    ]
  },
  {
    id: 'plan-5-days',
    name: '5 Days Explorer',
    price: 55000,
    duration: '5 Days, 4 Nights',
    hotel: 'Luxury Pine Heights Chalet (Kail/Arang Kel)',
    transport: 'Private Luxury Land Cruiser (V8)',
    meals: 'Full Board (Fine Dining local cuisines)',
    guide: 'Dedicated 24/7 Concierge and Tour Leader',
    features: [
      'VVIP Cable Car access to Arang Kel',
      'Guided day-trek inside the fairy-tale Kel forests',
      'Live music and barbecue under the stars',
      'Premium photo & cinematic video session'
    ]
  },
  {
    id: 'plan-7-days',
    name: '7 Days Premium Escape',
    price: 85000,
    duration: '7 Days, 6 Nights',
    hotel: 'Elite Luxury Villas & Premium Glass Cabins',
    transport: 'Chauffeur-Driven High-End SUV & Mountain 4x4',
    meals: 'Full Board including live Kashmiri Wazwan Feast',
    guide: 'Elite Bi-lingual Certified Tour Specialist',
    features: [
      'Full Neelum Valley & Ratti Gali Lake excursion',
      'Jeep safari ride up to the alpine glacier pastures',
      'Exclusive horse riding around Ratti Gali lake',
      'Relaxing wellness therapies and luxury high-tea'
    ]
  },
  {
    id: 'plan-10-days',
    name: '10 Days Luxury Experience',
    price: 120000,
    duration: '10 Days, 9 Nights',
    hotel: 'Kashmir Palace Suites & Signature Luxury Chalets',
    transport: 'Private Mercedes-Benz Executive Sprinter or Luxury SUV',
    meals: 'All Inclusive (Gourmet Dining + In-room Butler)',
    guide: 'Elite Director of Expeditions & Local Guides',
    features: [
      'Ultimate grand tour covering Muzaffarabad, Keran, Sharda, Kel, and Arang Kel',
      'Helicopter charter availability (Optional)',
      'VIP customized itinerary based on your preferences',
      'Traditional musical evening & luxury bonfire banquet'
    ]
  }
];

export const tourPackages: TourPackage[] = [
  {
    id: 'pkg-honeymoon-suite',
    name: 'Neelum Valley Honeymoon Suite',
    price: 180000,
    duration: '5 Days, 4 Nights',
    rating: 5.0,
    reviewsCount: 38,
    description: 'An ultra-romantic getaway meticulously curated for couples. Sleep in luxury glass-roof cabins with panoramic views of the stars and the majestic river below.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    tag: 'Popular Romantic',
    included: ['Honeymoon Decor', 'Private Candlelight Dinner', 'V8 Chauffeur Service', 'Arang Kel Cable Car']
  },
  {
    id: 'pkg-chitta-katha',
    name: 'Chitta Katha Lake Elite Trek',
    price: 95000,
    duration: '6 Days, 5 Nights',
    rating: 4.9,
    reviewsCount: 24,
    description: 'Conquer the turquoise jewel of Shonter Valley. Features a premium camping setup, personalized porter services, and warm culinary preparation at 13,500 feet.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    tag: 'Adventure Luxury',
    included: ['Premium North Face Tents', 'Personal Porter', 'Chef-prepared Meals', '4x4 Expedition Jeep']
  },
  {
    id: 'pkg-autumn-escape',
    name: 'Kashmir Autumn Gold Retreat',
    price: 250000,
    duration: '8 Days, 7 Nights',
    rating: 5.0,
    reviewsCount: 42,
    description: 'Witness the valley turn into a blazing canvas of gold, amber, and crimson. Reside in premium heated timber chalets with spectacular vistas of falling Chinar leaves.',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800',
    tag: 'Seasonal Masterpiece',
    included: ['Heated Premium Lodging', 'Wazwan Tasting Dinners', 'Professional Photographer', 'Airport Pick & Drop']
  }
];

export const whyChooseUs = [
  {
    title: 'Premium Hotels',
    description: 'We handpick elite, 5-star standard riverfront cabins, luxury glass-roof villas, and high-end timber chalets with top-notch amenities.'
  },
  {
    title: 'Luxury Transport',
    description: 'Travel in absolute comfort in our fleet of premium V8 Land Cruisers, Prado SUVs, and air-conditioned luxury vans custom-fitted for mountain terrains.'
  },
  {
    title: 'Professional Tour Guides',
    description: 'Our experienced local guides are passionate, certified storytellers, fluent in English/Urdu, and trained in wilderness safety.'
  },
  {
    title: 'Safe Travel Experience',
    description: 'With satellite phones, first-aid medical kits, real-time weather monitoring, and elite safety protocols, your well-being is our highest priority.'
  },
  {
    title: '24/7 Customer Support',
    description: 'A dedicated round-the-clock remote concierge desk is available to assist you with live flight updates, changes, and local tips.'
  },
  {
    title: 'Affordable Pricing',
    description: 'Transparent luxury. We offer premium curated packages with high-value returns. No hidden fees, ever.'
  },
  {
    title: 'Custom Tour Planning',
    description: 'Want a custom helicopter ride, special catering, or a specific slow-paced travel path? Our experts will craft your dream itinerary in detail.'
  },
  {
    title: 'Best Travel Memories',
    description: 'From campfire poetry to live photography, we add small customized touches to turn your journey into unforgettable lifetime memories.'
  }
];

export const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&q=80&w=800',
    title: 'Neelum River Reflection'
  },
  {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
    title: 'Sunlight through Pine Forests'
  },
  {
    url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=800',
    title: 'Chinar Autumn Splendor'
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    title: 'Arang Kel Peak'
  },
  {
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800',
    title: 'Alpine Lake Sunrise'
  },
  {
    url: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=800',
    title: 'Mist Flowing in the Valley'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'top-10-places',
    title: 'Top 10 Places to Visit in Kashmir',
    category: 'Travel Guide',
    date: 'July 15, 2026',
    author: 'Ayesha Rahman',
    description: 'From secret hidden alpine lakes to historical ancient temples, discover the definitive checklist of must-visit destinations in Azad Kashmir.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800',
    readTime: '6 mins read'
  },
  {
    id: 'best-time-neelum',
    title: 'Best Time to Visit Neelum Valley',
    category: 'Seasonal Guide',
    date: 'June 28, 2026',
    author: 'Zain Malik',
    description: 'A comprehensive month-by-month breakdown of weather conditions, road accessibility, and seasonal festivals in the valley of Neelum.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    readTime: '4 mins read'
  },
  {
    id: 'essential-packing',
    title: 'Essential Packing Tips for Kashmir',
    category: 'Travel Tips',
    date: 'May 10, 2026',
    author: 'Bilal Ahmed',
    description: 'Prepare like a pro. Essential clothing layers, footwear selections, photography gear, and medical safety lists needed for your high-altitude trip.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
    readTime: '5 mins read'
  },
  {
    id: 'budget-vs-luxury',
    title: 'Budget vs Luxury Travel Guide',
    category: 'Expert Advice',
    date: 'April 22, 2026',
    author: 'Sania Khan',
    description: 'We compare budget touring options and high-end curated stays to help you find the absolute perfect middle ground or ultimate luxury experience.',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800',
    readTime: '7 mins read'
  },
  {
    id: 'photography-spots',
    title: 'Photography Spots in Kashmir',
    category: 'Inspiration',
    date: 'March 14, 2026',
    author: 'Kamran Ali',
    description: 'Discover the absolute best golden hour coordinates, camera settings, and composition angles to capture Kashmir’s dramatic rivers and peaks.',
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800',
    readTime: '5 mins read'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ahmed Khan',
    role: 'Executive Director, Karachi',
    review: 'Our 7 Days Premium Escape with Kashmir Escape was flawless. The private Prado was immaculate, and the riverfront cabins in Keran felt like a five-star resort in Switzerland. Will definitely book again!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'test-2',
    name: 'Fatima Noor',
    role: 'Travel Journalist, Lahore',
    review: 'Arang Kel is truly a slice of heaven, but what made it unforgettable was Kashmir Escape’s flawless logistics. No queues for cable cars, private VIP entries, and excellent hot Wazwan dishes served fresh!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'test-3',
    name: 'Ali Raza',
    role: 'Landscape Photographer',
    review: 'The Gold Retreat was spectacular. From lighting coordinates shared by our bi-lingual tour lead to our customized camp spot at Ratti Gali, every detail was optimized for perfect memories. Five-star standard!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'test-4',
    name: 'Sara Malik',
    role: 'Family Tour, Islamabad',
    review: 'We traveled with elder parents and toddlers. The support was incredible—safe slow-paced driving, wheelchair assistance wherever possible, and special kid-friendly meals prepared by our guides on request.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
  }
];

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What is the best season to visit Kashmir?',
    answer: 'The best season depends on your preference. Summer (May to September) offers glorious green meadows and fully accessible lakes like Ratti Gali. Autumn (October to November) showcases magical golden foliage. Winter (December to February) is perfect for snow lovers, with Kel and Sharda covered in fresh powdery white snow.'
  },
  {
    id: 'faq-2',
    question: 'How do I book a package?',
    answer: 'You can select your preferred Travel Plan or Featured Tour Package on our website and click the "Book Now" button. Alternatively, fill out our quick contact form or message us directly on WhatsApp (+92 300 0000000) for instant reservation and custom itinerary creation.'
  },
  {
    id: 'faq-3',
    question: 'Are meals included?',
    answer: 'Yes, all our luxury plans and featured packages include meals. From gourmet continental breakfasts to local high-altitude specialties and authentic Kashmiri Wazwan dining, your culinary experience is curated in full-board style.'
  },
  {
    id: 'faq-4',
    question: 'Can I customize my trip?',
    answer: 'Absolutely. Custom tour planning is one of our signatures. You can modify hotel stays, extend your stay in specific valleys, upgrade vehicles to premium luxury classes, or add custom excursions like horse-riding or helicopter transfers.'
  },
  {
    id: 'faq-5',
    question: 'What payment methods do you accept?',
    answer: 'We accept secure digital bank transfers, Visa/Mastercard credit and debit cards, and standard corporate payment gateways. A 50% deposit is required at booking to lock in high-end vehicle and resort reservations.'
  },
  {
    id: 'faq-6',
    question: 'Is transportation included?',
    answer: 'Yes, private premium transportation is fully included. From high-end luxury SUVs (Toyota Prado, Land Cruiser V8) to modern Mercedes Sprinters, our fleet is fully chauffeured and includes local fuels, mountain road tolls, and special off-road permits.'
  }
];
