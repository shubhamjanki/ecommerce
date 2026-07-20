import type {
  Order,
  OrderStatus,
  SystemLog,
  DashboardStats,
  ServerMetrics,
  AISearchResult,
} from '@/types';
import { mockProducts } from './mockData';

const statuses: OrderStatus[] = [
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
];

const customers = [
  'Aarav Sharma',
  'Diya Patel',
  'Vihaan Reddy',
  'Ananya Iyer',
  'Arjun Mehta',
  'Saanvi Nair',
  'Kabir Singh',
  'Myra Kapoor',
  'Reyansh Gupta',
  'Ishita Joshi',
];

function pad(n: number) {
  return n < 10 ? '0' + n : '' + n;
}

function daysAgoISO(days: number, hour = 10) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

export const mockOrders: Order[] = Array.from({ length: 24 }).map((_, i) => {
  const itemCount = (i % 3) + 1;
  const items = Array.from({ length: itemCount }).map((__, j) => {
    const p = mockProducts[(i * 2 + j) % mockProducts.length];
    const qty = ((i + j) % 3) + 1;
    return {
      productId: p.id,
      name: p.name,
      price: p.price,
      quantity: qty,
      imageUrl: p.imageUrl,
    };
  });
  const total = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const status = statuses[i % statuses.length];
  const customer = customers[i % customers.length];
  return {
    id: 'CM' + (10240 + i).toString(),
    userId: 'u' + ((i % 10) + 1),
    items,
    total,
    status,
    shippingAddress: {
      fullName: customer,
      line1: `${i + 12}, MG Road`,
      city: ['Bengaluru', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad'][i % 5],
      state: ['Karnataka', 'Maharashtra', 'Delhi', 'Maharashtra', 'Telangana'][i % 5],
      zip: '5600' + pad(i % 10),
      country: 'India',
      phone: '+91 9' + (800000000 + i * 137).toString().slice(0, 9),
    },
    paymentMethod: i % 2 === 0 ? 'UPI' : 'Card',
    createdAt: daysAgoISO(i % 20, (i % 12) + 8),
    updatedAt: daysAgoISO(Math.max(0, (i % 20) - 1), (i % 12) + 9),
  };
});

const actions = [
  'LOGIN',
  'LOGOUT',
  'CREATE_PRODUCT',
  'UPDATE_PRODUCT',
  'DELETE_PRODUCT',
  'PLACE_ORDER',
  'UPDATE_ORDER_STATUS',
  'UPLOAD_CSV',
  'REFUND_ISSUED',
  'AI_SEARCH',
];
const resources = ['auth', 'product', 'order', 'user', 'system', 'csv'];

export const mockLogs: SystemLog[] = Array.from({ length: 40 }).map((_, i) => {
  const action = actions[i % actions.length];
  const failed = i % 7 === 0;
  return {
    id: 'log_' + (1000 + i),
    timestamp: daysAgoISO(i % 25, (i % 24)),
    actor: i % 3 === 0 ? 'system' : customers[i % customers.length],
    action,
    resource: resources[i % resources.length],
    severity: failed ? 'error' : i % 5 === 0 ? 'warning' : 'info',
    status: failed ? 'failed' : 'success',
    message: `${action} on ${resources[i % resources.length]} ${
      failed ? 'failed: permission denied' : 'completed successfully'
    }`,
  };
});

export function mockDashboardStats(): DashboardStats {
  const revenueTrend = Array.from({ length: 14 }).map((_, i) => ({
    date: daysAgoISO(13 - i, 0).slice(0, 10),
    revenue: 42000 + Math.round(Math.sin(i / 2) * 12000) + i * 1800,
  }));
  const categorySales = [
    { category: 'Electronics', sales: 184000 },
    { category: 'Audio', sales: 92000 },
    { category: 'Wearables', sales: 67000 },
    { category: 'Fitness', sales: 48000 },
    { category: 'Home', sales: 39000 },
    { category: 'Photography', sales: 210000 },
  ];
  const orderStatusSplit = [
    { status: 'Delivered', count: 9 },
    { status: 'Shipped', count: 5 },
    { status: 'Processing', count: 4 },
    { status: 'Pending', count: 4 },
    { status: 'Cancelled', count: 2 },
  ];
  const topProducts = [
    { name: 'VortexBook Ultra Slim Laptop', sold: 42, revenue: 3779958 },
    { name: 'Lumina 4K Mirrorless Camera', sold: 31, revenue: 2324969 },
    { name: 'Nimbus Pro ANC Headphones', sold: 88, revenue: 791912 },
    { name: 'PulseFit Smartwatch Series 6', sold: 56, revenue: 727944 },
    { name: 'EchoBuds True Wireless Earbuds', sold: 120, revenue: 479880 },
  ];
  return {
    totalRevenue: revenueTrend.reduce((s, d) => s + d.revenue, 0),
    ordersToday: 38,
    activeCustomers: 1240,
    totalProducts: mockProducts.length,
    revenueTrend,
    categorySales,
    orderStatusSplit,
    topProducts,
  };
}

export function mockServerMetrics(): ServerMetrics {
  return {
    uptime: 99.98,
    responseTime: 142 + Math.round(Math.random() * 40),
    errorRate: +(0.4 + Math.random() * 0.6).toFixed(2),
    cpu: Math.round(30 + Math.random() * 45),
    memory: Math.round(45 + Math.random() * 35),
    disk: 62,
    requestsPerMin: Math.round(800 + Math.random() * 600),
  };
}

export function mockAISearch(query: string): AISearchResult[] {
  const q = query.toLowerCase();
  const scored = mockProducts
    .map((p) => {
      const text = (
        p.name +
        ' ' +
        p.description +
        ' ' +
        p.category +
        ' ' +
        p.tags.join(' ')
      ).toLowerCase();
      const tokens = q.split(/\s+/).filter(Boolean);
      let score = 0;
      const matched: string[] = [];
      tokens.forEach((t) => {
        if (text.includes(t)) {
          score += 1;
          matched.push(t);
        }
      });
      // price filter like "under 3000"
      const underMatch = q.match(/under\s*₹?\s*(\d+)/);
      if (underMatch) {
        const cap = parseInt(underMatch[1], 10);
        if (p.price <= cap) score += 2;
        else score -= 2;
      }
      return { product: p, score, matched };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return scored.map((r) => ({
    product: r.product,
    score: r.score,
    matchReason: r.matched.length
      ? `Matched on: ${r.matched.slice(0, 4).join(', ')}`
      : 'Semantic similarity match',
  }));
}
