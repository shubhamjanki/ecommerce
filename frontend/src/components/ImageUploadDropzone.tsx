import { useState, type ReactNode } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ImageUploadDropzone({
  onFile,
  className,
  label = 'Drop image here or click to upload',
}: {
  onFile: (file: File) => void;
  className?: string;
  label?: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (f: File) => {
    setPreview(URL.createObjectURL(f));
    onFile(f);
  };

  return (
    <div className={className}>
      {preview ? (
        <div className="relative">
          <img src={preview} alt="preview" className="h-40 w-full rounded-md object-cover" />
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="absolute right-2 top-2 rounded-full bg-background/80 p-1 hover:bg-background"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          className={cn(
            'flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary',
            dragging && 'border-primary bg-primary/5 text-primary'
          )}
        >
          <UploadCloud className="h-6 w-6" />
          <span>{label}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </label>
      )}
    </div>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="text-sm font-medium">{children}</label>;
}
