import type { Product } from '@/types';

export const categories = [
  'Electronics',
  'Audio',
  'Wearables',
  'Home',
  'Kitchen',
  'Fitness',
  'Footwear',
  'Gaming',
  'Photography',
  'Accessories',
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'AeroPulse Wireless Running Shoes',
    description:
      'Lightweight knit upper with responsive foam midsole. Breathable, waterproof membrane keeps feet dry on trail and road. Energy-return plate for explosive toe-off.',
    price: 2799,
    category: 'Footwear',
    brand: 'StridePro',
    rating: 4.6,
    reviewCount: 1284,
    stock: 42,
    imageUrl:
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['waterproof', 'running', 'lightweight', 'breathable'],
    createdAt: '2025-11-02T10:00:00Z',
  },
  {
    id: 'p2',
    name: 'Nimbus Pro ANC Headphones',
    description:
      'Adaptive hybrid noise cancellation, 40mm titanium drivers, 40-hour battery, USB-C fast charge. Memory-foam earcups for all-day comfort.',
    price: 8999,
    category: 'Audio',
    brand: 'Soundwave',
    rating: 4.8,
    reviewCount: 3120,
    stock: 18,
    imageUrl:
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['anc', 'wireless', 'headphones', 'noise-cancelling'],
    createdAt: '2025-10-15T10:00:00Z',
  },
  {
    id: 'p3',
    name: 'Lumina 4K Mirrorless Camera',
    description:
      '24.2MP back-illuminated sensor, 5-axis in-body stabilization, 4K60 video, weather-sealed magnesium body. Tilting touchscreen and dual SD slots.',
    price: 74999,
    category: 'Photography',
    brand: 'Lumina',
    rating: 4.7,
    reviewCount: 542,
    stock: 7,
    imageUrl:
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['camera', '4k', 'mirrorless', 'stabilization'],
    createdAt: '2025-09-20T10:00:00Z',
  },
  {
    id: 'p4',
    name: 'PulseFit Smartwatch Series 6',
    description:
      '1.4" AMOLED display, continuous SpO2 and heart-rate tracking, built-in GPS, 14-day battery, 5ATM water resistance. 100+ workout modes.',
    price: 12999,
    category: 'Wearables',
    brand: 'PulseFit',
    rating: 4.5,
    reviewCount: 2104,
    stock: 65,
    imageUrl:
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['smartwatch', 'fitness', 'gps', 'heart-rate'],
    createdAt: '2025-11-10T10:00:00Z',
  },
  {
    id: 'p5',
    name: 'ZenBrew Stainless Coffee Maker',
    description:
      'Precise 92-96C brewing temperature, thermal carafe keeps coffee hot 6 hours, programmable timer, reusable gold-tone filter. 12-cup capacity.',
    price: 5499,
    category: 'Kitchen',
    brand: 'ZenBrew',
    rating: 4.4,
    reviewCount: 876,
    stock: 30,
    imageUrl:
      'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['coffee', 'kitchen', 'stainless', 'programmable'],
    createdAt: '2025-08-05T10:00:00Z',
  },
  {
    id: 'p6',
    name: 'VortexBook Ultra Slim Laptop',
    description:
      '14" 2.8K OLED, 16GB LPDDR5, 1TB NVMe, 12-core CPU, 18-hour battery, 1.1kg aluminum chassis. Backlit keyboard and Windows 11 Pro.',
    price: 89999,
    category: 'Electronics',
    brand: 'Vortex',
    rating: 4.7,
    reviewCount: 421,
    stock: 12,
    imageUrl:
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    tags: ['laptop', 'oled', 'ultrabook', 'lightweight'],
    createdAt: '2025-10-28T10:00:00Z',
  },
  {
    id: 'p7',
    name: 'AquaGrip Yoga Mat 6mm',
    description:
      'Eco-friendly TPE material, double-sided non-slip texture, 6mm cushioning, alignment lines. Comes with carry strap.',
    price: 1299,
    category: 'Fitness',
    brand: 'AquaGrip',
    rating: 4.3,
    reviewCount: 1580,
    stock: 88,
    imageUrl:
      'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['yoga', 'fitness', 'non-slip', 'eco'],
    createdAt: '2025-07-12T10:00:00Z',
  },
  {
    id: 'p8',
    name: 'NovaArc Mechanical Keyboard',
    description:
      'Hot-swappable switches, per-key RGB, aluminum frame, wireless + USB-C, 8000mAh battery. Gasket mount for soft typing feel.',
    price: 7499,
    category: 'Gaming',
    brand: 'NovaArc',
    rating: 4.6,
    reviewCount: 932,
    stock: 24,
    imageUrl:
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['keyboard', 'mechanical', 'rgb', 'wireless'],
    createdAt: '2025-09-01T10:00:00Z',
  },
  {
    id: 'p9',
    name: 'PureMist Humidifier 4L',
    description:
      'Ultrasonic cool-mist, auto humidity sensor, 4L tank, 36-hour runtime, whisper-quiet, essential-oil tray. LED night light.',
    price: 2199,
    category: 'Home',
    brand: 'PureMist',
    rating: 4.2,
    reviewCount: 645,
    stock: 50,
    imageUrl:
      'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['humidifier', 'home', 'ultrasonic', 'quiet'],
    createdAt: '2025-06-18T10:00:00Z',
  },
  {
    id: 'p10',
    name: 'TrailBlaze Waterproof Backpack 30L',
    description:
      'IPX6 waterproof, padded 15" laptop sleeve, ventilated back panel, rain cover included, compression straps. 30L capacity.',
    price: 3499,
    category: 'Accessories',
    brand: 'TrailBlaze',
    rating: 4.5,
    reviewCount: 1120,
    stock: 37,
    imageUrl:
      'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['backpack', 'waterproof', 'travel', 'laptop'],
    createdAt: '2025-10-02T10:00:00Z',
  },
  {
    id: 'p11',
    name: 'EchoBuds True Wireless Earbuds',
    description:
      'ANC active noise cancellation, 28-hour total battery with case, IPX5 sweat resistance, low-latency game mode. Touch controls.',
    price: 3999,
    category: 'Audio',
    brand: 'Soundwave',
    rating: 4.4,
    reviewCount: 2870,
    stock: 73,
    imageUrl:
      'https://images.pexels.com/photos/3780622/pexels-photo-3780622.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['earbuds', 'wireless', 'anc', 'ipx5'],
    createdAt: '2025-11-15T10:00:00Z',
  },
  {
    id: 'p12',
    name: 'GlideFit Adjustable Dumbbell 24kg',
    description:
      'Quick-select weight 2-24kg, space-saving design replaces 15 sets, anti-slip handle, auto-locking mechanism. Sold as single.',
    price: 8999,
    category: 'Fitness',
    brand: 'GlideFit',
    rating: 4.6,
    reviewCount: 410,
    stock: 19,
    imageUrl:
      'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['dumbbell', 'fitness', 'adjustable', 'home-gym'],
    createdAt: '2025-08-22T10:00:00Z',
  },
];

export function formatINR(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}
