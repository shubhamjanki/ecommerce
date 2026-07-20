import { Link } from 'react-router-dom';
import {
  Sparkles,
  Image as ImageIcon,
  ShieldCheck,
  Truck,
  Tag,
  ArrowRight,
} from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/data/mockData';

export default function LandingPage() {
  const featured = mockProducts.slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-background via-background to-emerald-50/40">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
              AI-powered shopping, reimagined
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Find exactly what you want.{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Just describe it.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              Search with natural language or a photo. Our AI understands intent, budget,
              and style to surface the right product in seconds.
            </p>
            <div className="mx-auto mt-8 max-w-2xl">
              <SearchBar />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><ImageIcon className="h-3.5 w-3.5" /> Image search</span>
              <span className="flex items-center gap-1.5"><Tag className="h-3.5 w-3.5" /> Price-aware matches</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Secure checkout</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured products</h2>
            <p className="text-sm text-muted-foreground">Hand-picked by our AI this week.</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/products" className="gap-1.5">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Feature strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Sparkles, title: 'Natural-language search', desc: 'Ask in plain English — we parse intent, specs, and budget.' },
            { icon: ImageIcon, title: 'Visual image search', desc: 'Upload a photo and find visually similar products instantly.' },
            { icon: Truck, title: 'Fast, tracked delivery', desc: 'Real-time order status from checkout to your doorstep.' },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl bg-slate-900 px-6 py-12 text-center text-white md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Ready to shop smarter?</h2>
          <p className="mx-auto mt-2 max-w-md text-slate-300">
            Create an account to save your cart, track orders, and unlock personalized AI recommendations.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/register">Get started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-white">
              <Link to="/products">Browse products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
