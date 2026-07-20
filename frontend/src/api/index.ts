import { api } from './axiosInstance';
import type { Product, AISearchResult, Order, User, Address } from '@/types';

// TODO: replace mock returns with real API calls once backend is wired up.

export const authApi = {
  async login(email: string, password: string): Promise<User> {
    // return (await api.post('/auth/login', { email, password })).data;
    await new Promise((r) => setTimeout(r, 500));
    const isAdmin = email.startsWith('admin');
    return {
      id: isAdmin ? 'a1' : 'u1',
      name: isAdmin ? 'Admin User' : 'Demo Customer',
      email,
      role: isAdmin ? 'admin' : 'customer',
    };
  },
  async register(name: string, email: string, password: string): Promise<User> {
    // return (await api.post('/auth/register', { name, email, password })).data;
    await new Promise((r) => setTimeout(r, 500));
    return { id: 'u' + Date.now(), name, email, role: 'customer' };
  },
};

export const productApi = {
  async list(params?: {
    search?: string;
    category?: string;
    sort?: string;
    page?: number;
  }): Promise<{ items: Product[]; total: number }> {
    // return (await api.get('/products', { params })).data;
    await new Promise((r) => setTimeout(r, 300));
    return { items: [], total: 0 };
  },
  async get(id: string): Promise<Product | undefined> {
    // return (await api.get(`/products/${id}`)).data;
    await new Promise((r) => setTimeout(r, 200));
    return undefined;
  },
};

export const aiApi = {
  async search(query: string): Promise<AISearchResult[]> {
    // return (await api.post('/ai/search', { query })).data;
    await new Promise((r) => setTimeout(r, 1200));
    return [];
  },
  async imageSearch(file: File): Promise<AISearchResult[]> {
    // const form = new FormData();
    // form.append('image', file);
    // return (await api.post('/ai/image-search', form)).data;
    await new Promise((r) => setTimeout(r, 1800));
    return [];
  },
};

export const orderApi = {
  async create(payload: {
    items: { productId: string; quantity: number }[];
    address: Address;
    paymentMethod: string;
  }): Promise<Order> {
    // return (await api.post('/orders', payload)).data;
    await new Promise((r) => setTimeout(r, 900));
    return {} as Order;
  },
  async list(): Promise<Order[]> {
    // return (await api.get('/orders')).data;
    await new Promise((r) => setTimeout(r, 400));
    return [];
  },
  async get(id: string): Promise<Order | undefined> {
    // return (await api.get(`/orders/${id}`)).data;
    await new Promise((r) => setTimeout(r, 300));
    return undefined;
  },
};

export const adminApi = {
  async dashboardStats() {
    // return (await api.get('/admin/dashboard/stats')).data;
    await new Promise((r) => setTimeout(r, 600));
    return null;
  },
  async listProducts() {
    // return (await api.get('/admin/products')).data;
    await new Promise((r) => setTimeout(r, 400));
    return [];
  },
  async updateProduct(id: string, patch: Partial<Product>) {
    // return (await api.put(`/admin/products/${id}`, patch)).data;
    await new Promise((r) => setTimeout(r, 400));
    return { id, ...patch };
  },
  async deleteProduct(id: string) {
    // return (await api.delete(`/admin/products/${id}`)).data;
    await new Promise((r) => setTimeout(r, 300));
    return { id };
  },
  async listOrders() {
    // return (await api.get('/admin/orders')).data;
    await new Promise((r) => setTimeout(r, 400));
    return [];
  },
  async updateOrderStatus(id: string, status: string) {
    // return (await api.put(`/admin/orders/${id}`, { status })).data;
    await new Promise((r) => setTimeout(r, 400));
    return { id, status };
  },
  async listLogs() {
    // return (await api.get('/admin/logs')).data;
    await new Promise((r) => setTimeout(r, 400));
    return [];
  },
  async serverMetrics() {
    // return (await api.get('/admin/server/metrics')).data;
    await new Promise((r) => setTimeout(r, 500));
    return null;
  },
};
