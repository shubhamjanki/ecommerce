import { useState } from 'react';
import { Upload, FileSpreadsheet, Check, Loader2, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ImageUploadDropzone from '@/components/ImageUploadDropzone';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { categories } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface CsvRow {
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  valid: boolean;
  error?: string;
}

export default function AdminUploadPage() {
  const [tab, setTab] = useState('single');
  const [image, setImage] = useState<File | null>(null);
  const [form, setForm] = useState({ name: '', brand: '', category: categories[0], price: '', stock: '', description: '' });
  const [csv, setCsv] = useState<CsvRow[]>([]);
  const [parsed, setParsed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submitSingle = async () => {
    setSubmitting(true);
    // TODO: replace with adminApi.createProduct (multipart with image)
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast.success('Product uploaded', { description: form.name });
    setForm({ name: '', brand: '', category: categories[0], price: '', stock: '', description: '' });
    setImage(null);
  };

  const parseCsv = (text: string) => {
    const lines = text.trim().split(/\r?\n/);
    const rows: CsvRow[] = [];
    lines.slice(1).forEach((line) => {
      const [name, brand, category, price, stock] = line.split(',').map((s) => s.trim());
      const p = Number(price);
      const s = Number(stock);
      const valid = !!name && !!brand && !!category && !Number.isNaN(p) && p > 0 && !Number.isNaN(s) && s >= 0;
      rows.push({
        name: name || '',
        brand: brand || '',
        category: category || '',
        price: p || 0,
        stock: s || 0,
        valid,
        error: valid ? undefined : 'Missing or invalid fields',
      });
    });
    setCsv(rows);
    setParsed(true);
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => parseCsv(String(reader.result));
    reader.readAsText(file);
  };

  const commitCsv = async () => {
    setSubmitting(true);
    // TODO: replace with adminApi.bulkUpload
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast.success(`${csv.filter((r) => r.valid).length} products imported`);
    setCsv([]);
    setParsed(false);
  };

  const validCount = csv.filter((r) => r.valid).length;

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Products</h1>
        <p className="text-sm text-muted-foreground">Add a single product or bulk import via CSV.</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="single">Single product</TabsTrigger>
          <TabsTrigger value="csv">CSV bulk upload</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="mt-4">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4 rounded-lg border bg-card p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2"><Label>Product name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div><Label>Brand</Label><Input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} /></div>
                <div>
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Price (₹)</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
                <div><Label>Stock</Label><Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></div>
                <div className="sm:col-span-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              </div>
              <Button onClick={submitSingle} disabled={submitting || !form.name}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Upload product
              </Button>
            </div>
            <div className="space-y-3 rounded-lg border bg-card p-5">
              <Label>Product image</Label>
              <ImageUploadDropzone onFile={setImage} />
              <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB. Square aspect recommended.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="csv" className="mt-4">
          <div className="space-y-4 rounded-lg border bg-card p-5">
            {!parsed ? (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileSpreadsheet className="h-4 w-4" /> CSV format: <code className="rounded bg-muted px-1">name,brand,category,price,stock</code>
                </div>
                <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed text-sm text-muted-foreground hover:border-primary hover:text-primary">
                  <Upload className="h-6 w-6" />
                  <span>Drop CSV here or click to upload</span>
                  <input
                    type="file"
                    accept=".csv,text/csv"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  />
                </label>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex items-center gap-1.5 text-emerald-600"><Check className="h-4 w-4" /> {validCount} valid</span>
                  <span className="flex items-center gap-1.5 text-amber-600"><AlertCircle className="h-4 w-4" /> {csv.length - validCount} invalid</span>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead>Name</TableHead><TableHead>Brand</TableHead><TableHead>Category</TableHead>
                        <TableHead>Price</TableHead><TableHead>Stock</TableHead><TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {csv.map((r, i) => (
                        <TableRow key={i}>
                          <TableCell>{r.name || '—'}</TableCell>
                          <TableCell>{r.brand || '—'}</TableCell>
                          <TableCell>{r.category || '—'}</TableCell>
                          <TableCell>{r.price || '—'}</TableCell>
                          <TableCell>{r.stock || '—'}</TableCell>
                          <TableCell>
                            {r.valid
                              ? <span className="text-xs text-emerald-600">OK</span>
                              : <span className="text-xs text-destructive" title={r.error}>Invalid</span>}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => { setParsed(false); setCsv([]); }}>Cancel</Button>
                  <Button onClick={commitCsv} disabled={submitting || validCount === 0}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Commit {validCount} products
                  </Button>
                </div>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
