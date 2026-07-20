import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDataTable, { type Column } from '@/components/admin/AdminDataTable';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockOrders } from '@/data/mockAdmin';
import { formatINR } from '@/data/mockData';
import type { Order, OrderStatus } from '@/types';
import { toast } from 'sonner';

const statuses: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminOrdersPage() {
  const [rows, setRows] = useState<Order[]>(mockOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  const filtered = rows.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress.fullName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id: string, status: OrderStatus) => {
    // TODO: replace with adminApi.updateOrderStatus
    setRows((prev) => prev.map((o) => (o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o)));
    toast.success('Order updated', { description: `${id} → ${status}` });
  };

  const columns: Column<Order>[] = [
    { key: 'id', header: 'Order ID', cell: (o) => <span className="font-medium">{o.id}</span> },
    { key: 'customer', header: 'Customer', cell: (o) => o.shippingAddress.fullName },
    { key: 'items', header: 'Items', cell: (o) => o.items.length },
    { key: 'total', header: 'Total', cell: (o) => <span className="font-medium">{formatINR(o.total)}</span> },
    { key: 'date', header: 'Date', cell: (o) => new Date(o.createdAt).toLocaleDateString() },
    {
      key: 'status',
      header: 'Status',
      cell: (o) => (
        <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v as OrderStatus)}>
          <SelectTrigger className="h-8 w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      ),
    },
    {
      key: 'view',
      header: '',
      className: 'text-right',
      cell: (o) => (
        <Button variant="outline" size="sm" onClick={() => navigate(`/orders/${o.id}`)}>View</Button>
      ),
    },
  ];

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-sm text-muted-foreground">Manage and update order status.</p>
      </div>
      <AdminDataTable
        columns={columns}
        rows={filtered}
        searchValue={search}
        onSearch={setSearch}
        searchPlaceholder="Search by order ID or customer…"
        toolbar={
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        }
      />
      <div className="flex flex-wrap gap-2">
        {statuses.map((s) => {
          const count = rows.filter((o) => o.status === s).length;
          return (
            <span key={s} className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs">
              <OrderStatusBadge status={s} /> {count}
            </span>
          );
        })}
      </div>
    </div>
  );
}
