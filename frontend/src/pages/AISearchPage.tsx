import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Loader2, ImageUp, Search } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import { Card } from '@/components/ui/card';
import { mockAISearch } from '@/data/mockAdmin';
import type { AISearchResult } from '@/types';

export default function AISearchPage() {
  const [params, setParams] = useSearchParams();
  const [results, setResults] = useState<AISearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(params.get('q') || '');
  const [mode, setMode] = useState<'text' | 'image'>(params.get('image') ? 'image' : 'text');

  const runText = (q: string) => {
    setLoading(true);
    setResults([]);
    // TODO: replace with aiApi.search(q)
    setTimeout(() => {
      setResults(mockAISearch(q));
      setLoading(false);
    }, 1200);
  };

  const runImage = () => {
    setLoading(true);
    setResults([]);
    // TODO: replace with aiApi.imageSearch(file)
    setTimeout(() => {
      setResults(mockAISearch('wireless headphones earbuds audio'));
      setLoading(false);
    }, 1800);
  };

  useEffect(() => {
    const q = params.get('q');
    const img = params.get('image');
    if (q) {
      setQuery(q);
      setMode('text');
      runText(q);
    } else if (img) {
      setMode('image');
      runImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-6 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-emerald-500" /> AI-powered search
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Find products with AI</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Describe what you need in plain language, or upload an image to find similar products.
        </p>
      </div>

      <SearchBar
        onImage={() => {
          setMode('image');
          setParams({ image: '1' });
        }}
      />

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {['waterproof running shoes under ₹3000', 'noise cancelling headphones', '4k camera for travel', 'home gym equipment'].map((s) => (
          <button
            key={s}
            onClick={() => {
              setQuery(s);
              setParams({ q: s });
            }}
            className="rounded-full border bg-card px-3 py-1 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              {mode === 'image' ? 'Analyzing image and matching products…' : 'AI is reasoning over your query…'}
            </p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {results.length} match{results.length !== 1 ? 'es' : ''} {query ? `for "${query}"` : 'from your image'}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((r) => (
                <div key={r.product.id} className="space-y-2">
                  <ProductCard product={r.product} />
                  <Card className="bg-emerald-50/50 p-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                      <Sparkles className="h-3.5 w-3.5" /> Why this matched
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{r.matchReason}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-20 text-center">
            {mode === 'text' ? <Search className="h-8 w-8 text-muted-foreground" /> : <ImageUp className="h-8 w-8 text-muted-foreground" />}
            <p className="text-sm text-muted-foreground">
              {query || mode === 'image' ? 'No matches yet — try a more specific query.' : 'Run a search to see AI matches.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
