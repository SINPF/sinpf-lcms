import { useRef } from "react";
import { Upload, File, X, Paperclip } from "lucide-react";
import Instructions from "./components/instructions";

const instructions = {
  title: 'Upload Documents',
  instructions: [
    'You can upload your <strong>supporting evidence</strong> and <strong>exhibits</strong> here.',
    'Accepted formats: <strong>PDF, Excel, and CSV</strong>. Max size: 10MB per file.',
    'You can select multiple files at once using the browse button.'
  ]
};

function UploadFiles({ files, setFiles }: { files: File[]; setFiles: (files: File[]) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles([...files, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const triggerBrowse = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-6">
      <Instructions {...instructions} />

      {/* Upload Zone: Institutional Dropzone */}
      <div 
        className="w-full p-12 border-2 border-dashed border-border rounded-2xl bg-muted/20 flex flex-col items-center justify-center transition-all hover:bg-muted/40 hover:border-primary/50 group cursor-pointer"
        onClick={triggerBrowse}
      >
        <div className="p-4 bg-background rounded-xl shadow-lg shadow-primary/5 mb-4 group-hover:scale-110 transition-transform duration-300">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        
        <h3 className="text-lg font-bold text-foreground font-heading">Upload Evidence</h3>
        <p className="text-[11px] font-black text-muted-foreground uppercase tracking-widest mb-6 opacity-60">
          Drag and drop files here or click to browse
        </p>

        {/* Hidden File Input */}
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

      {/* File List Preview: High-Density Cards */}
      {files.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2">
          {files.map((file, index) => (
            <div 
              key={`${file.name}-${index}`} 
              className="group relative flex items-center justify-between p-4 bg-background border border-border rounded-xl shadow-sm hover:border-secondary/50 transition-all"
            >
              {/* Left Side Accent Bar */}
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
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
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

export default UploadFiles;