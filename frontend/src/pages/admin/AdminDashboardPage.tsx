import { IndianRupee, ShoppingCart, Users, Package, TrendingUp } from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts';
import StatCard from '@/components/admin/StatCard';
import ChartCard from '@/components/admin/ChartCard';
import { mockDashboardStats } from '@/data/mockAdmin';
import { formatINR } from '@/data/mockData';

const PIE_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'];

export default function AdminDashboardPage() {
  const stats = mockDashboardStats();

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of store performance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value={formatINR(stats.totalRevenue)} icon={<IndianRupee className="h-5 w-5" />} trend={{ value: '12.4% vs last period', positive: true }} />
        <StatCard title="Orders Today" value={stats.ordersToday} icon={<ShoppingCart className="h-5 w-5" />} trend={{ value: '8.1% vs yesterday', positive: true }} />
        <StatCard title="Active Customers" value={stats.activeCustomers.toLocaleString()} icon={<Users className="h-5 w-5" />} trend={{ value: '3.2% growth', positive: true }} />
        <StatCard title="Total Products" value={stats.totalProducts} icon={<Package className="h-5 w-5" />} hint="Across all categories" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Revenue Trend" subtitle="Last 14 days" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={stats.revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip formatter={(v: number) => formatINR(v)} />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Order Status" subtitle="Current split">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={stats.orderStatusSplit} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {stats.orderStatusSplit.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Category Sales" subtitle="Revenue by category" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stats.categorySales}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="category" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip formatter={(v: number) => formatINR(v)} />
              <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Products" subtitle="By units sold">
          <div className="space-y-3">
            {stats.topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">{i + 1}</span>
                <div className="flex-1">
                  <p className="line-clamp-1 text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.sold} sold · {formatINR(p.revenue)}</p>
                </div>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
