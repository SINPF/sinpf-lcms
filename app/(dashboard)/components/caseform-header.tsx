import { X, Maximize2, Minimize2 } from "lucide-react";

interface HeaderProps {
  onClose: () => void;
  onToggleExpand: () => void;
  isMaximized: boolean;
}

function Header({ onClose, onToggleExpand, isMaximized }: HeaderProps) {
  const iconClasses = "w-4 h-4 transition-transform duration-200 active:scale-90";
  const buttonClasses =
    "p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all flex items-center justify-center border border-transparent hover:border-border";

  return (
    <header className="px-8 py-5 border-b border-border flex justify-between items-center bg-background transition-colors duration-300">
      <div>
        <h2 className="text-lg font-bold text-foreground tracking-tight font-heading">
          Create New Case
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black opacity-70">
            Legal Filing Portal
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleExpand}
          className={`${buttonClasses} hover:bg-secondary/10 hover:text-secondary-foreground hover:border-secondary/20`}
          title={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? (
            <Minimize2 className={iconClasses} />
          ) : (
            <Maximize2 className={iconClasses} />
          )}
        </button>

        <button
          onClick={onClose}
          className={`${buttonClasses} hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20`}
          title="Close"
        >
          <X className={iconClasses} />
        </button>
      </div>
    </header>
  );
}

export default Header;
