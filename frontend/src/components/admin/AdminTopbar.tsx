import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function AdminTopbar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-slate-900 px-4 text-slate-200 md:hidden">
      <Link to="/admin/dashboard" className="flex items-center gap-2 font-bold text-white">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-slate-900 text-xs">
          CM
        </span>
      </Link>
      <span className={cn('text-sm font-medium')}>{title}</span>
    </header>
  );
}
