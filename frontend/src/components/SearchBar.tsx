import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ImageUp, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function SearchBar({
  className,
  onImage,
}: {
  className?: string;
  onImage?: (file: File) => void;
}) {
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const [query, setQuery] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'text') {
      if (query.trim()) navigate(`/ai-search?q=${encodeURIComponent(query.trim())}`);
    } else if (file) {
      if (onImage) onImage(file);
      else navigate(`/ai-search?image=1`);
    }
  };

  const handleFile = (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  return (
    <form
      onSubmit={submit}
      className={cn(
        'w-full rounded-xl border bg-card p-2 shadow-sm transition-all focus-within:ring-2 focus-within:ring-ring',
        className
      )}
    >
      <div className="mb-2 flex items-center gap-1 px-1">
        <button
          type="button"
          onClick={() => setMode('text')}
          className={cn(
            'flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
            mode === 'text' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'
          )}
        >
          <Sparkles className="h-3.5 w-3.5" /> AI Text
        </button>
        <button
          type="button"
          onClick={() => setMode('image')}
          className={cn(
            'flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
            mode === 'image' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'
          )}
        >
          <ImageUp className="h-3.5 w-3.5" /> Image
        </button>
      </div>

      {mode === 'text' ? (
        <div className="flex items-center gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. waterproof running shoes under ₹3000"
            className="border-0 shadow-none focus-visible:ring-0"
          />
          <Button type="submit" size="sm" className="gap-1.5">
            <Search className="h-4 w-4" /> Search
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {preview ? (
            <div className="relative">
              <img src={preview} alt="preview" className="h-32 w-full rounded-md object-cover" />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setFile(null);
                }}
                className="absolute right-2 top-2 rounded-full bg-background/80 p-1 hover:bg-background"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">
              <ImageUp className="h-6 w-6" />
              <span>Drag & drop or tap to upload an image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </label>
          )}
          <Button type="submit" size="sm" className="w-full gap-1.5" disabled={!file}>
            <Search className="h-4 w-4" /> Find similar products
          </Button>
        </div>
      )}
    </form>
  );
}
