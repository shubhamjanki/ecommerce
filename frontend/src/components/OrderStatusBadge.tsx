import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/types';

const map: Record<OrderStatus, string> = {
  Pending: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
  Processing: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  Shipped: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-100',
  Delivered: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
  Cancelled: 'bg-rose-100 text-rose-700 hover:bg-rose-100',
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge variant="outline" className={cn('font-medium', map[status])}>
      {status}
    </Badge>
  );
}
