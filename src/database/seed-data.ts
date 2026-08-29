// Pseudo data used to seed MongoDB. Mirrors the dashboard's dummy data and the
// website's real promo codes so the API has realistic content immediately.

export const propertiesSeed = [
  {
    name: 'elet signature',
    location: 'Clifton',
    tier: 'premium',
    status: 'live',
    rooms: 24,
    occupancy: 82,
    priceFrom: 18000,
  },
  {
    name: 'elet business',
    location: 'Shahrah-e-Faisal',
    tier: 'mid-range',
    status: 'live',
    rooms: 32,
    occupancy: 74,
    priceFrom: 12000,
  },
  {
    name: 'elet express',
    location: 'DHA',
    tier: 'value',
    status: 'launching',
    rooms: 40,
    occupancy: 0,
    priceFrom: 10000,
  },
];

export const roomTypesSeed = [
  {
    name: 'signature suite',
    property: 'signature',
    basePrice: 24000,
    capacity: 2,
    sizeSqft: 520,
    beds: '1 king',
    amenities: [
      'rooftop view',
      'signature bar access',
      'rain shower',
      'nespresso',
    ],
    count: 6,
  },
  {
    name: 'signature deluxe',
    property: 'signature',
    basePrice: 18000,
    capacity: 2,
    sizeSqft: 380,
    beds: '1 queen',
    amenities: ['courtyard view', 'rain shower', 'workspace'],
    count: 10,
  },
  {
    name: 'signature twin',
    property: 'signature',
    basePrice: 19500,
    capacity: 3,
    sizeSqft: 400,
    beds: '2 twin',
    amenities: ['courtyard view', 'workspace', 'smart tv'],
    count: 8,
  },
  {
    name: 'business executive',
    property: 'business',
    basePrice: 15000,
    capacity: 2,
    sizeSqft: 340,
    beds: '1 king',
    amenities: ['desk', 'cafe access', 'high-speed wifi'],
    count: 12,
  },
  {
    name: 'business standard',
    property: 'business',
    basePrice: 12000,
    capacity: 2,
    sizeSqft: 280,
    beds: '1 queen',
    amenities: ['desk', 'high-speed wifi', 'smart tv'],
    count: 20,
  },
  {
    name: 'express apartment',
    property: 'express',
    basePrice: 14000,
    capacity: 4,
    sizeSqft: 620,
    beds: '1 king + sofa bed',
    amenities: [
      'full kitchen',
      'living area',
      'washer',
      'private floor option',
    ],
    count: 16,
  },
  {
    name: 'express studio',
    property: 'express',
    basePrice: 10000,
    capacity: 2,
    sizeSqft: 400,
    beds: '1 queen',
    amenities: ['kitchenette', 'workspace', 'smart tv'],
    count: 24,
  },
];

// Deterministic room inventory generated from the room-type counts.
export function roomsSeed() {
  const rooms: {
    number: string;
    property: string;
    typeName: string;
    floor: number;
    status: string;
    price: number;
  }[] = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const prefix: Record<string, string> = {
    signature: 'S',
    business: 'B',
    express: 'E',
  };
  for (const type of roomTypesSeed) {
    for (let i = 0; i < type.count; i++) {
      const floor = Math.floor(i / 4) + 1;
      const idx = (i % 4) + 1;
      const number = `${prefix[type.property]}${floor}${String(idx).padStart(2, '0')}`;
      const r = rand();
      const status =
        r < 0.5
          ? 'occupied'
          : r < 0.78
            ? 'available'
            : r < 0.92
              ? 'cleaning'
              : 'maintenance';
      rooms.push({
        number,
        property: type.property,
        typeName: type.name,
        floor,
        status,
        price: type.basePrice + Math.round((rand() - 0.5) * 2000),
      });
    }
  }
  return rooms;
}

export const bookingsSeed = [
  {
    reference: 'ELT-1042',
    guestName: 'Ayesha Khan',
    email: 'ayesha.khan@gmail.com',
    whatsapp: '+92 300 2345671',
    location: 'clifton',
    checkIn: '2026-08-18',
    checkOut: '2026-08-21',
    rooms: 1,
    adults: 2,
    children: 0,
    promo: 'WELCOME15',
    consent: true,
    source: 'website',
    status: 'confirmed',
  },
  {
    reference: 'ELT-1041',
    guestName: 'Bilal Ahmed',
    email: 'bilal.ahmed@outlook.com',
    whatsapp: '+92 321 8890123',
    location: 'shahrah-e-faisal',
    checkIn: '2026-08-15',
    checkOut: '2026-08-17',
    rooms: 1,
    adults: 1,
    children: 0,
    promo: '',
    consent: true,
    source: 'website',
    status: 'confirmed',
  },
  {
    reference: 'ELT-1040',
    guestName: 'Sana Malik',
    email: 'sana.malik@gmail.com',
    whatsapp: '+92 333 4567890',
    location: 'clifton',
    checkIn: '2026-08-20',
    checkOut: '2026-08-24',
    rooms: 1,
    adults: 2,
    children: 0,
    promo: 'ELET10',
    consent: false,
    source: 'backend',
    status: 'pending',
  },
  {
    reference: 'ELT-1039',
    guestName: 'Hassan Raza',
    email: 'hassan.raza@company.pk',
    whatsapp: '+92 345 1122334',
    location: 'shahrah-e-faisal',
    checkIn: '2026-08-13',
    checkOut: '2026-08-14',
    rooms: 1,
    adults: 1,
    children: 0,
    promo: '',
    consent: true,
    source: 'website',
    status: 'checked-out',
  },
  {
    reference: 'ELT-1038',
    guestName: 'Zara Sheikh',
    email: 'zara.sheikh@gmail.com',
    whatsapp: '+92 300 9988776',
    location: 'clifton',
    checkIn: '2026-08-25',
    checkOut: '2026-08-28',
    rooms: 2,
    adults: 2,
    children: 1,
    promo: 'KARACHI20',
    consent: true,
    source: 'backend',
    status: 'confirmed',
  },
  {
    reference: 'ELT-1037',
    guestName: 'Omar Farooq',
    email: 'omar.farooq@gmail.com',
    whatsapp: '+92 312 6677889',
    location: 'shahrah-e-faisal',
    checkIn: '2026-08-16',
    checkOut: '2026-08-19',
    rooms: 1,
    adults: 2,
    children: 0,
    promo: '',
    consent: true,
    source: 'website',
    status: 'confirmed',
  },
  {
    reference: 'ELT-1036',
    guestName: 'Fatima Noor',
    email: 'fatima.noor@yahoo.com',
    whatsapp: '+92 333 2211009',
    location: 'clifton',
    checkIn: '2026-08-12',
    checkOut: '2026-08-13',
    rooms: 1,
    adults: 2,
    children: 0,
    promo: '',
    consent: false,
    source: 'website',
    status: 'cancelled',
  },
  {
    reference: 'ELT-1035',
    guestName: 'Imran Sethi',
    email: 'imran.sethi@gmail.com',
    whatsapp: '+92 300 5544332',
    location: 'shahrah-e-faisal',
    checkIn: '2026-08-22',
    checkOut: '2026-08-26',
    rooms: 1,
    adults: 1,
    children: 0,
    promo: 'WELCOME15',
    consent: true,
    source: 'backend',
    status: 'confirmed',
  },
];

export const blogsSeed = [
  {
    title: "Karachi's first premium hotel apartments have arrived",
    slug: 'premium-hotel-apartments-karachi',
    author: 'The Elet Team',
    category: 'Announcements',
    status: 'published',
    excerpt:
      'elet express brings hotel-grade comfort with the space and privacy of an apartment, at up to 60% below traditional rates.',
    cover: 'launch',
    views: 3421,
    publishedAt: '2026-08-01',
  },
  {
    title: "A weekend guide to Clifton's cafe strip",
    slug: 'clifton-cafe-guide',
    author: 'Sana Malik',
    category: 'City Guides',
    status: 'published',
    excerpt:
      "from morning flat whites to late-night desserts, here's how to spend 48 unhurried hours around elet signature.",
    cover: 'clifton',
    views: 1875,
    publishedAt: '2026-07-24',
  },
  {
    title: 'Why we built a signature bar into our flagship',
    slug: 'signature-bar-story',
    author: 'The Elet Team',
    category: 'Behind the Scenes',
    status: 'published',
    excerpt:
      'moody lighting, black iron shelving and a hand-finished counter — the thinking behind the elet signature bar.',
    cover: 'bar',
    views: 1204,
    publishedAt: '2026-07-15',
  },
  {
    title: 'Corporate stays that actually work for teams',
    slug: 'corporate-long-stay-rates',
    author: 'Omar Farooq',
    category: 'Business Travel',
    status: 'scheduled',
    excerpt:
      'flexible rates, real kitchens and quiet workspaces — a look at how elet business supports project teams.',
    cover: 'business',
    views: 0,
    publishedAt: '2026-08-20',
  },
  {
    title: 'Designing rooms for slow evenings',
    slug: 'designing-for-slow-evenings',
    author: 'Zara Sheikh',
    category: 'Design',
    status: 'draft',
    excerpt:
      'warm wood tones, tailored curtains and comfort over minimalism — our approach to residential-style interiors.',
    cover: 'design',
    views: 0,
    publishedAt: '2026-08-18',
  },
  {
    title: 'The referral scheme, explained',
    slug: 'referral-scheme-explained',
    author: 'The Elet Team',
    category: 'Offers',
    status: 'published',
    excerpt:
      "give a friend 15% off and take 15% off your next stay — here's how it works.",
    cover: 'referral',
    views: 942,
    publishedAt: '2026-07-05',
  },
];

export const areasSeed = [
  {
    name: 'clifton',
    blurb: "cafes, dolmen mall, sea view. karachi's evening address.",
    properties: 1,
    featured: true,
  },
  {
    name: 'dha',
    blurb: 'quiet streets, boutique retail, private neighbourhoods.',
    properties: 1,
    featured: true,
  },
  {
    name: 'shahrah-e-faisal',
    blurb: "the city's business corridor. offices, hotels, hospitals.",
    properties: 1,
    featured: true,
  },
  {
    name: 'zamzama',
    blurb: 'boulevard dining and small-label boutiques.',
    properties: 0,
    featured: false,
  },
];

export const promosSeed = [
  {
    code: 'ELET10',
    label: 'welcome offer',
    discount: '10% off',
    discountPct: 10,
    active: true,
    uses: 148,
    expiresAt: '2026-12-31',
  },
  {
    code: 'WELCOME15',
    label: 'first stay',
    discount: '15% off',
    discountPct: 15,
    active: true,
    uses: 92,
    expiresAt: '2026-12-31',
  },
  {
    code: 'KARACHI20',
    label: 'launch offer',
    discount: '20% off',
    discountPct: 20,
    active: true,
    uses: 61,
    expiresAt: '2026-09-30',
  },
  {
    code: 'SUMMER25',
    label: 'summer campaign',
    discount: '25% off',
    discountPct: 25,
    active: false,
    uses: 210,
    expiresAt: '2026-07-31',
  },
];

export const subscribersSeed = [
  {
    email: 'ayesha.khan@gmail.com',
    name: 'Ayesha Khan',
    source: 'booking',
    consent: true,
    subscribedAt: '2026-08-12',
  },
  {
    email: 'maryam.j@gmail.com',
    name: 'Maryam Javed',
    source: 'newsletter',
    consent: true,
    subscribedAt: '2026-08-11',
  },
  {
    email: 'bilal.ahmed@outlook.com',
    name: 'Bilal Ahmed',
    source: 'booking',
    consent: true,
    subscribedAt: '2026-08-11',
  },
  {
    email: 'faisal.k@yahoo.com',
    name: 'Faisal Kamal',
    source: 'newsletter',
    consent: false,
    subscribedAt: '2026-08-10',
  },
  {
    email: 'hina.raza@gmail.com',
    name: 'Hina Raza',
    source: 'referral',
    consent: true,
    subscribedAt: '2026-08-09',
  },
  {
    email: 'omar.farooq@gmail.com',
    name: 'Omar Farooq',
    source: 'booking',
    consent: true,
    subscribedAt: '2026-08-09',
  },
  {
    email: 'sadaf.n@gmail.com',
    name: 'Sadaf Naqvi',
    source: 'newsletter',
    consent: true,
    subscribedAt: '2026-08-08',
  },
  {
    email: 'arsalan.m@outlook.com',
    name: 'Arsalan Mirza',
    source: 'newsletter',
    consent: true,
    subscribedAt: '2026-08-07',
  },
];
