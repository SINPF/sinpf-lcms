function BrandArea() {
    return ( 
        <div className="flex items-center gap-3 mb-10 px-2">
          <img 
            src="/logo.png" 
            alt="SINPF Logo" 
            className="h-10 w-10 rounded-xl shadow-lg shadow-blue-600/20"
          />
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 tracking-tight text-sm uppercase">LCMS</span>
            <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase leading-none">Legal Department</span>
          </div>
        </div>
     );
}

export default BrandArea;