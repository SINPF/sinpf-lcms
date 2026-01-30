import { X, Maximize2, Minimize2 } from "lucide-react";

interface HeaderProps {
  onClose: () => void;
  onToggleExpand: () => void;
  isMaximized: boolean;
}

function Header({ onClose, onToggleExpand, isMaximized }: HeaderProps) {
  const iconClasses = "w-5 h-5 transition-transform duration-200 active:scale-90";
  const buttonClasses = "p-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-all flex items-center justify-center";

  return (
    <header className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Create New Case
        </h2>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          Legal Filing Portal
        </p>
      </div>

      <div className="flex items-center gap-1">
        {/* Expand / Minimize Toggle */}
        <button
          onClick={onToggleExpand}
          className={buttonClasses}
          title={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? (
            <Minimize2 className={iconClasses} />
          ) : (
            <Maximize2 className={iconClasses} />
          )}
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`${buttonClasses} hover:bg-red-50 hover:text-red-500`}
          title="Close"
        >
          <X className={iconClasses} />
        </button>
      </div>
    </header>
  );
}

export default Header;