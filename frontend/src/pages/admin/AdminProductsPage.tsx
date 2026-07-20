import { useState } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import AdminDataTable, { type Column } from '@/components/admin/AdminDataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { mockProducts, categories, formatINR } from '@/data/mockData';
import type { Product } from '@/types';
import { toast } from 'sonner';

export default function AdminProductsPage() {
  const [rows, setRows] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Product>>({});

  const filtered = rows.filter((r) =>
    (r.name + r.brand + r.category).toLowerCase().includes(search.toLowerCase())
  );

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm(p);
    setOpen(true);
  };
  const openNew = () => {
    setEditing(null);
    setForm({ name: '', price: 0, stock: 0, category: categories[0], brand: '', imageUrl: '', description: '', rating: 0, reviewCount: 0, tags: [] });
    setOpen(true);
  };

  const save = async () => {
    setSaving(true);
    // TODO: replace with adminApi.updateProduct / create
    await new Promise((r) => setTimeout(r, 400));
    if (editing) {
      setRows((prev) => prev.map((p) => (p.id === editing.id ? { ...editing, ...form } as Product : p)));
      toast.success('Product updated');
    } else {
      const newP: Product = {
        id: 'p' + Date.now(),
        name: form.name || '',
        description: form.description || '',
        price: form.price || 0,
        category: form.category || categories[0],
        brand: form.brand || '',
        rating: form.rating || 0,
        reviewCount: form.reviewCount || 0,
        stock: form.stock || 0,
        imageUrl: form.imageUrl || '',
        tags: form.tags || [],
        createdAt: new Date().toISOString(),
      };
      setRows((prev) => [newP, ...prev]);
      toast.success('Product created');
    }
    setSaving(false);
    setOpen(false);
  };

  const remove = async (p: Product) => {
    // TODO: replace with adminApi.deleteProduct
    setRows((prev) => prev.filter((r) => r.id !== p.id));
    toast.success('Product deleted', { description: p.name });
  };

  const columns: Column<Product>[] = [
    {
      key: 'name',
      header: 'Product',
      cell: (p) => (
        <div className="flex items-center gap-3">
          <img src={p.imageUrl} alt={p.name} className="h-10 w-10 rounded-md object-cover" />
          <div>
            <p className="line-clamp-1 text-sm font-medium">{p.name}</p>
            <p className="text-xs text-muted-foreground">{p.brand}</p>
          </div>
        </div>
      ),
    },
    { key: 'category', header: 'Category', cell: (p) => <Badge variant="secondary">{p.category}</Badge> },
    { key: 'price', header: 'Price', cell: (p) => <span className="font-medium">{formatINR(p.price)}</span> },
    {
      key: 'stock',
      header: 'Stock',
      cell: (p) => (
        <span className={p.stock <= 0 ? 'text-destructive' : p.stock < 10 ? 'text-amber-600' : 'text-emerald-600'}>
          {p.stock}
        </span>
      ),
    },
    { key: 'rating', header: 'Rating', cell: (p) => <span>{p.rating} ({p.reviewCount})</span> },
    {
      key: 'actions',
      header: '',
      className: 'text-right',
      cell: (p) => (
        <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => remove(p)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">{rows.length} products in catalog</p>
        </div>
        <Button className="gap-1.5" onClick={openNew}><Plus className="h-4 w-4" /> New product</Button>
      </div>

      <AdminDataTable
        columns={columns}
        rows={filtered}
        searchValue={search}
        onSearch={setSearch}
        searchPlaceholder="Search products…"
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit product' : 'New product'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Brand</Label><Input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} /></div>
            <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
            <div><Label>Price (₹)</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} /></div>
            <div><Label>Stock</Label><Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: +e.target.value })} /></div>
            <div className="sm:col-span-2"><Label>Image URL</Label><Input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} /></div>
            <div className="sm:col-span-2"><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
