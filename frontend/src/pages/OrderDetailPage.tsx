import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Mail, CheckCircle2, Clock, Truck, Package } from 'lucide-react';
import { mockOrders } from '@/data/mockAdmin';
import { formatINR } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import { toast } from 'sonner';

const pipeline = ['Pending', 'Processing', 'Shipped', 'Delivered'] as const;

export default function OrderDetailPage() {
  const { id } = useParams();
  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <Button asChild className="mt-4"><Link to="/orders">Back to orders</Link></Button>
      </div>
    );
  }

  const currentIdx = order.status === 'Cancelled' ? -1 : pipeline.indexOf(order.status);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Button variant="ghost" size="sm" className="mb-4 gap-1.5" asChild>
        <Link to="/orders"><ArrowLeft className="h-4 w-4" /> Back to orders</Link>
      </Button>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Order {order.id}</h1>
          <p className="text-sm text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {order.status !== 'Cancelled' && (
        <Card className="mt-6 p-5">
          <div className="flex items-center justify-between">
            {pipeline.map((s, i) => {
              const done = i <= currentIdx;
              const Icon = [Clock, Package, Truck, CheckCircle2][i];
              return (
                <div key={s} className="flex flex-1 flex-col items-center text-center last:flex-none">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${done ? 'border-primary bg-primary text-primary-foreground' : 'border-muted text-muted-foreground'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={`mt-1 text-xs ${done ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{s}</span>
                  {i < pipeline.length - 1 && (
                    <div className={`absolute mt-[-18px] ml-12 h-0.5 w-[calc(50%-24px)] rounded ${i < currentIdx ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_320px]">
        <Card className="p-5">
          <h2 className="mb-3 font-semibold">Items</h2>
          <div className="space-y-3">
            {order.items.map((it) => (
              <div key={it.productId} className="flex gap-3">
                <img src={it.imageUrl} alt={it.name} className="h-16 w-16 rounded-md object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{it.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {it.quantity} × {formatINR(it.price)}</p>
                </div>
                <p className="text-sm font-semibold">{formatINR(it.price * it.quantity)}</p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(order.total)}</span></div>
            <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{formatINR(order.total)}</span></div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-2 text-sm font-semibold"><MapPin className="h-4 w-4" /> Shipping address</div>
            <div className="mt-2 text-sm text-muted-foreground">
              <p className="text-foreground">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.line1}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
              <p>{order.shippingAddress.country}</p>
              <p>{order.shippingAddress.phone}</p>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-2 text-sm font-semibold"><CreditCard className="h-4 w-4" /> Payment</div>
            <p className="mt-2 text-sm">{order.paymentMethod}</p>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-2 text-sm font-semibold"><Mail className="h-4 w-4" /> Confirmation</div>
            <p className="mt-2 text-sm text-muted-foreground">A confirmation was emailed when this order was placed.</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={() => toast.success('Confirmation email resent')}>
              Resend confirmation
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
