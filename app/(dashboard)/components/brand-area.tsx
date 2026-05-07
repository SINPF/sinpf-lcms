import Image from "next/image";

function BrandArea() {
    return ( 
        <div className="flex items-center gap-3 mb-10 px-2 transition-colors duration-300">
          <div className="relative">
            <Image
              src="/sinpf-logo.png"
              alt="SINPF Logo"
              width={40}
              height={40}
              className="rounded-xl shadow-lg shadow-primary/20 transition-shadow"
            />
          </div>
          <div className="flex flex-col">
            {/* Switched to text-foreground and font-heading for the "badass" look */}
            <span className="font-bold text-foreground tracking-tight text-sm uppercase font-heading">
                LCMS
            </span>
            {/* Switched to text-muted-foreground for the sub-label */}
            <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase leading-none">
                Legal Department
            </span>
          </div>
        </div>
     );
}

export default BrandArea;