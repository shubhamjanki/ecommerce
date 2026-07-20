import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, Mail } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import CheckoutSteps from '@/components/CheckoutSteps';
import { formatINR } from '@/data/mockData';
import { mockOrders } from '@/data/mockAdmin';
import { toast } from 'sonner';

const schema = z.object({
  fullName: z.string().min(2, 'Required'),
  line1: z.string().min(3, 'Required'),
  line2: z.string().optional(),
  city: z.string().min(2, 'Required'),
  state: z.string().min(2, 'Required'),
  zip: z.string().min(4, 'Required'),
  phone: z.string().min(6, 'Required'),
});
type Values = z.infer<typeof schema>;

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState('upi');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: user?.name || '',
      line1: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
    },
  });

  const shipping = subtotal > 999 ? 0 : 49;
  const total = subtotal + shipping;

  if (items.length === 0 && !orderId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Button asChild className="mt-4"><a href="/products">Browse products</a></Button>
      </div>
    );
  }

  const placeOrder = async () => {
    setSubmitting(true);
    // TODO: replace with orderApi.create(...)
    await new Promise((r) => setTimeout(r, 1100));
    const id = 'CM' + Math.floor(10000 + Math.random() * 90000);
    setOrderId(id);
    setSubmitting(false);
    setStep(3);
    clear();
    toast.success('Order placed!', { description: `Order ${id} confirmed.` });
  };

  if (orderId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
        <h1 className="mt-4 text-3xl font-bold">Order confirmed!</h1>
        <p className="mt-2 text-muted-foreground">Your order <span className="font-semibold text-foreground">{orderId}</span> has been placed successfully.</p>
        <Card className="mx-auto mt-6 max-w-md p-5 text-left">
          <div className="flex items-center gap-2 text-sm text-emerald-700">
            <Mail className="h-4 w-4" /> Confirmation sent to your email
          </div>
          <p className="mt-2 text-sm text-muted-foreground">We've emailed a confirmation to {user?.email || 'your inbox'}. You can resend it from the order detail page.</p>
        </Card>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => navigate(`/orders/${orderId}`)}>View order</Button>
          <Button variant="outline" onClick={() => navigate('/products')}>Continue shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Checkout</h1>
      <div className="mb-8 max-w-2xl">
        <CheckoutSteps current={step} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {step === 0 && (
            <Card className="p-5">
              <h2 className="mb-4 font-semibold">Review your cart</h2>
              <div className="space-y-3">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <img src={product.imageUrl} alt={product.name} className="h-12 w-12 rounded-md object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-snug">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty {quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">{formatINR(product.price * quantity)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <Button onClick={() => setStep(1)}>Continue to address</Button>
            </Card>
          )}

          {step === 1 && (
            <Card className="p-5">
              <h2 className="mb-4 font-semibold">Shipping address</h2>
              <form onSubmit={form.handleSubmit(() => setStep(2))} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label>Full name</Label>
                    <Input {...form.register('fullName')} />
                    {form.formState.errors.fullName && <p className="mt-1 text-xs text-destructive">{form.formState.errors.fullName.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Address line 1</Label>
                    <Input {...form.register('line1')} placeholder="House no, street" />
                    {form.formState.errors.line1 && <p className="mt-1 text-xs text-destructive">{form.formState.errors.line1.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Address line 2 (optional)</Label>
                    <Input {...form.register('line2')} />
                  </div>
                  <div><Label>City</Label><Input {...form.register('city')} />{form.formState.errors.city && <p className="mt-1 text-xs text-destructive">{form.formState.errors.city.message}</p>}</div>
                  <div><Label>State</Label><Input {...form.register('state')} />{form.formState.errors.state && <p className="mt-1 text-xs text-destructive">{form.formState.errors.state.message}</p>}</div>
                  <div><Label>ZIP</Label><Input {...form.register('zip')} />{form.formState.errors.zip && <p className="mt-1 text-xs text-destructive">{form.formState.errors.zip.message}</p>}</div>
                  <div><Label>Phone</Label><Input {...form.register('phone')} />{form.formState.errors.phone && <p className="mt-1 text-xs text-destructive">{form.formState.errors.phone.message}</p>}</div>
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setStep(0)}>Back</Button>
                  <Button type="submit">Continue to payment</Button>
                </div>
              </form>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-5">
              <h2 className="mb-4 font-semibold">Payment method</h2>
              <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3">
                {[
                  { value: 'upi', label: 'UPI', desc: 'Pay via any UPI app' },
                  { value: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                  { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive' },
                ].map((p) => (
                  <Label key={p.value} className="flex cursor-pointer items-center gap-3 rounded-md border p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <RadioGroupItem value={p.value} />
                    <div>
                      <p className="text-sm font-medium">{p.label}</p>
                      <p className="text-xs text-muted-foreground">{p.desc}</p>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
              <div className="mt-5 flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={placeOrder} disabled={submitting}>
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Place order · {formatINR(total)}
                </Button>
              </div>
            </Card>
          )}
        </div>

        <Card className="h-fit space-y-3 p-5 lg:sticky lg:top-20">
          <h2 className="font-semibold">Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? 'Free' : formatINR(shipping)}</span></div>
            <Separator />
            <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{formatINR(total)}</span></div>
          </div>
          <p className="text-xs text-muted-foreground">By placing this order you agree to our Terms & Privacy Policy.</p>
        </Card>
      </div>
    </div>
  );
}
