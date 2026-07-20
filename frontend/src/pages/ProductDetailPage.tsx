import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Minus, Plus, ShoppingCart, ShieldCheck, Truck, Check } from 'lucide-react';
import { mockProducts, formatINR } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id);
  const { add } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Button asChild className="mt-4"><Link to="/products">Back to products</Link></Button>
      </div>
    );
  }

  const out = product.stock <= 0;
  const related = mockProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Button variant="ghost" size="sm" className="mb-4 gap-1.5" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl border bg-muted">
          <img src={product.imageUrl} alt={product.name} className="aspect-square w-full object-cover" />
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              <span className="text-xs text-muted-foreground">{product.brand}</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewCount.toLocaleString()} reviews)</span>
              </span>
            </div>
          </div>

          <p className="text-3xl font-bold">{formatINR(product.price)}</p>

          <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className={out ? 'text-sm font-medium text-destructive' : 'text-sm font-medium text-emerald-600'}>
              {out ? 'Out of stock' : `${product.stock} in stock`}
            </span>
          </div>

          {!out && (
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-md border">
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQty(Math.max(1, qty - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQty(qty + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                className="flex-1 gap-2"
                onClick={() => {
                  add(product, qty);
                  toast.success('Added to cart', { description: `${qty} × ${product.name}` });
                }}
              >
                <ShoppingCart className="h-4 w-4" /> Add to cart
              </Button>
              <Button variant="outline" onClick={() => { add(product, qty); navigate('/checkout'); }}>
                Buy now
              </Button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="flex items-center gap-2 rounded-lg border p-3 text-sm">
              <Truck className="h-5 w-5 text-primary" />
              <span>Free delivery over ₹999</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border p-3 text-sm">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>2-year warranty</span>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-xl font-bold">Related products</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <Link to={`/products/${p.id}`} key={p.id} className="group">
                <Card className="overflow-hidden p-0 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-3">
                    <p className="line-clamp-1 text-sm font-medium">{p.name}</p>
                    <p className="mt-1 text-sm font-semibold">{formatINR(p.price)}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
