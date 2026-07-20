import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatINR } from '@/data/mockData';

export default function CartPage() {
  const { items, setQty, remove, subtotal, count } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal > 999 ? 0 : 49;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-1 text-sm text-muted-foreground">Browse products and add something you love.</p>
        <Button asChild className="mt-6"><Link to="/products">Browse products</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Shopping Cart ({count})</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {items.map(({ product, quantity }) => (
            <Card key={product.id} className="flex gap-4 p-4">
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} alt={product.name} className="h-24 w-24 rounded-md object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-medium leading-snug hover:text-primary">{product.name}</h3>
                </Link>
                <p className="text-xs text-muted-foreground">{product.brand}</p>
                <p className="mt-1 text-sm font-semibold">{formatINR(product.price)}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center rounded-md border">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQty(product.id, quantity - 1)}>
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-9 text-center text-sm">{quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQty(product.id, quantity + 1)}>
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={() => remove(product.id)}>
                    <Trash2 className="mr-1 h-4 w-4" /> Remove
                  </Button>
                </div>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-sm text-muted-foreground">Subtotal</p>
                <p className="text-lg font-semibold">{formatINR(product.price * quantity)}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="h-fit space-y-3 p-5 lg:sticky lg:top-20">
          <h2 className="font-semibold">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? 'Free' : formatINR(shipping)}</span></div>
            <Separator />
            <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{formatINR(total)}</span></div>
          </div>
          <Button className="w-full gap-1.5" onClick={() => navigate('/checkout')}>
            Proceed to checkout <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/products">Continue shopping</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
