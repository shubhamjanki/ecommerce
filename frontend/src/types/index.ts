export type Role = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  imageUrl: string;
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export interface AISearchResult {
  product: Product;
  matchReason: string;
  score: number;
}

export type LogSeverity = 'info' | 'warning' | 'error';
export type LogStatus = 'success' | 'failed';

export interface SystemLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  severity: LogSeverity;
  status: LogStatus;
  message: string;
}

export interface ServerMetrics {
  uptime: number;
  responseTime: number;
  errorRate: number;
  cpu: number;
  memory: number;
  disk: number;
  requestsPerMin: number;
}

export interface DashboardStats {
  totalRevenue: number;
  ordersToday: number;
  activeCustomers: number;
  totalProducts: number;
  revenueTrend: { date: string; revenue: number }[];
  categorySales: { category: string; sales: number }[];
  orderStatusSplit: { status: string; count: number }[];
  topProducts: { name: string; sold: number; revenue: number }[];
}
