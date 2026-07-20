import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Upload,
  ClipboardList,
  ScrollText,
  Server,
  LogOut,
  Store,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/products/upload', label: 'Upload', icon: Upload },
  { to: '/admin/orders', label: 'Orders', icon: ClipboardList },
  { to: '/admin/logs', label: 'Logs', icon: ScrollText },
  { to: '/admin/server-monitor', label: 'Server Monitor', icon: Server },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r bg-slate-900 text-slate-300 md:flex">
      <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-5 text-white">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-900">
          <Store className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold">CloudMart</p>
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Admin</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== '/admin/dashboard' && pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : 'hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-800 p-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-white"
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="mt-1 w-full justify-start text-slate-400 hover:bg-slate-800"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to store
        </Button>
      </div>
    </aside>
  );
}
