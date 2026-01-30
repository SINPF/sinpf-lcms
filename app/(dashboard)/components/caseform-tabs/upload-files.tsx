import { useState, useRef } from "react";
import { Upload, File, X, Paperclip } from "lucide-react";
import Instructions from "./components/instructions";

const instructions = {
  title: 'Upload Documents',
  instructions: [
    'You can upload your <strong>supporting evidence</strong> and <strong>exhibits</strong> here.',
    'Accepted formats: <strong>PDF, DOCX, and JPEG</strong>. Max size: 10MB per file.',
    'You can select multiple files at once using the browse button.'
  ]
};

function UploadFiles() {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerBrowse = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-6">
      <Instructions {...instructions} />

      {/* Upload Zone */}
      <div className="w-full p-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center transition-all hover:bg-slate-50 hover:border-[#002B5C]/30">
        <div className="p-4 bg-white rounded-full shadow-sm mb-4">
          <Upload className="w-8 h-8 text-[#002B5C]" />
        </div>
        
        <h3 className="text-lg font-semibold text-slate-800">Upload Evidence</h3>
        <p className="text-sm text-slate-500 mb-6">Drag and drop files here or use the button below</p>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />

        <button
          type="button"
          onClick={triggerBrowse}
          className="flex items-center gap-2 px-6 py-3 bg-[#002B5C] text-white rounded-xl font-medium hover:bg-[#001f42] transition-all shadow-lg shadow-blue-900/10"
        >
          <Paperclip className="w-4 h-4" />
          Browse Files
        </button>
      </div>

      {/* File List Preview */}
      {files.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2">
          {files.map((file, index) => (
            <div 
              key={`${file.name}-${index}`} 
              className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <File className="w-5 h-5 text-slate-400 shrink-0" />
                <div className="truncate">
                  <p className="text-sm font-medium text-slate-700 truncate">{file.name}</p>
                  <p className="text-[10px] text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button 
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-md transition-colors"
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