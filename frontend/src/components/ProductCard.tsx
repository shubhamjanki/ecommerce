import { Link } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';
import type { Product } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/data/mockData';
import { toast } from 'sonner';

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const out = product.stock <= 0;

  return (
    <Card className="group relative overflow-hidden p-0 transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {out && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70">
              <Badge variant="destructive">Out of stock</Badge>
            </div>
          )}
          <Badge
            variant="secondary"
            className="absolute left-2 top-2 bg-background/90 backdrop-blur"
          >
            {product.category}
          </Badge>
        </div>
      </Link>
      <div className="space-y-2 p-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviewCount.toLocaleString()})</span>
          <span className="ml-auto text-xs">{product.brand}</span>
        </div>
        <Link to={`/products/${product.id}`}>
          <h3 className="line-clamp-2 text-sm font-medium leading-snug hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-semibold">{formatINR(product.price)}</span>
          <Button
            size="sm"
            disabled={out}
            onClick={(e) => {
              e.preventDefault();
              add(product, 1);
              toast.success('Added to cart', { description: product.name });
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
