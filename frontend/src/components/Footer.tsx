import { Link } from 'react-router-dom';
import { Store, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Store className="h-4 w-4" />
            </span>
            AI CloudMart
          </Link>
          <p className="text-sm text-muted-foreground">
            AI-powered shopping. Find what you need with natural language and image search.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-foreground">All Products</Link></li>
            <li><Link to="/ai-search" className="hover:text-foreground">AI Search</Link></li>
            <li><Link to="/cart" className="hover:text-foreground">Cart</Link></li>
            <li><Link to="/orders" className="hover:text-foreground">Orders</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Account</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/login" className="hover:text-foreground">Login</Link></li>
            <li><Link to="/register" className="hover:text-foreground">Register</Link></li>
            <li><Link to="/profile" className="hover:text-foreground">Profile</Link></li>
            <li><Link to="/admin/login" className="hover:text-foreground">Admin Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">AI Features</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> Natural-language search</li>
            <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> Image-based search</li>
            <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> Smart recommendations</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AI CloudMart. Built for demonstration.
      </div>
    </footer>
  );
}
