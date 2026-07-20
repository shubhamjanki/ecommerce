import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { mockOrders } from '@/data/mockAdmin';
import { formatINR } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import OrderStatusBadge from '@/components/OrderStatusBadge';

export default function OrdersPage() {
  const orders = mockOrders;

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">No orders yet</h1>
        <Button asChild className="mt-4"><Link to="/products">Start shopping</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Your Orders</h1>
      <div className="space-y-3">
        {orders.map((o) => (
          <Card key={o.id} className="p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{o.id}</p>
                  <OrderStatusBadge status={o.status} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Placed {new Date(o.createdAt).toLocaleDateString()} · {o.items.length} item{o.items.length !== 1 ? 's' : ''}
                </p>
                <div className="mt-2 flex -space-x-2">
                  {o.items.slice(0, 4).map((it) => (
                    <img key={it.productId} src={it.imageUrl} alt={it.name} className="h-10 w-10 rounded-md border-2 border-background object-cover" />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <p className="text-lg font-semibold">{formatINR(o.total)}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/orders/${o.id}`}>View details</Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
