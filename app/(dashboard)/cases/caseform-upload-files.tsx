import { useRef } from "react";
import { Upload, File, X, Paperclip, Info } from "lucide-react";

const INSTRUCTIONS = [
  'You can upload your <strong>supporting evidence</strong> and <strong>exhibits</strong> here.',
  'Accepted formats: <strong>PDF, Excel, and CSV</strong>. Max size: 10MB per file.',
  'You can select multiple files at once using the browse button.',
];

export default function UploadFiles({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (files: File[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Instructions */}
      <section className="bg-muted/30 border border-border p-6 rounded-xl">
        <div className="flex items-center gap-2 mb-5 text-primary">
          <Info className="w-5 h-5" />
          <h3 className="font-bold text-xs uppercase tracking-[0.2em] font-heading">Upload Documents</h3>
        </div>
        <div className="space-y-4">
          {INSTRUCTIONS.map((instruction, idx) => (
            <div key={idx} className="flex gap-4 group">
              <span className="shrink-0 w-6 h-6 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center text-[10px] font-black shadow-sm group-hover:scale-110 transition-transform">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <p
                className="text-foreground/80 text-sm leading-relaxed font-sans"
                dangerouslySetInnerHTML={{ __html: instruction }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Upload Zone */}
      <div
        className="w-full p-12 border-2 border-dashed border-border rounded-2xl bg-muted/20 flex flex-col items-center justify-center transition-all hover:bg-muted/40 hover:border-primary/50 group cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="p-4 bg-background rounded-xl shadow-lg shadow-primary/5 mb-4 group-hover:scale-110 transition-transform duration-300">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground font-heading">Upload Evidence</h3>
        <p className="text-[11px] font-black text-muted-foreground uppercase tracking-widest mb-6 opacity-60">
          Drag and drop files here or click to browse
        </p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
          accept=".pdf,.xlsx,.xls,.csv"
        />
        <button
          type="button"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold transition-all shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 font-heading"
        >
          <Paperclip className="w-4 h-4 stroke-[3px]" />
          Browse Files
        </button>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="group relative flex items-center justify-between p-4 bg-background border border-border rounded-xl shadow-sm hover:border-secondary/50 transition-all"
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/5 bg-secondary rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 overflow-hidden pl-1">
                <div className="p-2 bg-muted rounded-lg text-primary">
                  <File className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-foreground truncate font-sans">{file.name}</p>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-tight">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                className="p-1.5 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
