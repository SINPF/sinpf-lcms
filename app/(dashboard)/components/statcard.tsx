import { LucideIcon } from "lucide-react"

interface StatCardProps {
    stat: {
        label: string,
        description: string,
        value: string,
        icon: LucideIcon,
        bgColor: string,
        borderColor: string,
        accentColor: string
    }
}

function StatCard({ stat }: StatCardProps) {
    return (
        <div className={` relative overflow-hidden ${stat.bgColor} ${stat.borderColor} border p-6 rounded-xl shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group cursor-default min-h-35 flex flex-col justify-center`}>
            
          

            <div className="relative z-10 flex items-center justify-between gap-4">
                
                {/* Left Side: Label and Description */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                            <stat.icon className="w-4 h-4 opacity-70" />
                        </div>
                        <h2 className="text-xl font-black text-white tracking-tight uppercase">
                            {stat.label}
                        </h2>
                    </div>
                    <p className="text-white/40 text-[11px] font-medium tracking-wide pl-11">
                        {stat.description}
                    </p>
                </div>

                {/* Right Side: Value */}
                <div className="flex items-center gap-2">
                    <h3 className="text-3xl font-black text-white tracking-tighter">
                        {stat.value}
                    </h3>
                   
                </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-0.75 bg-white/5">
                <div className={`h-full w-0 group-hover:w-full transition-all duration-700 ease-out ${stat.accentColor}`} />
            </div>
        </div>
    )
}

export default StatCard;