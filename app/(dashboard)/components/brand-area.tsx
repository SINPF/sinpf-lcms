function BrandArea() {
    return ( 
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-[#002B5C] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <span className="text-white font-black text-[10px] tracking-tighter">SINPF</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 tracking-tight text-sm uppercase">LCMS</span>
            <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase leading-none">Legal Department</span>
          </div>
        </div>
     );
}

export default BrandArea;