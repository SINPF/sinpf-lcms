import { LucideIcon } from "lucide-react"

interface StatCardProps {
    stat: {
        label: string,
        description: string,
        value: string,
        icon: LucideIcon,
    }
}

function StatCard({ stat }: StatCardProps) {
    return (
        <div className="group relative p-5 rounded-xl bg-background border border-border hover:border-primary/50 shadow-sm transition-all duration-300 overflow-hidden cursor-default">
            
            {/* Background Branding: A subtle, large scale icon watermark */}
            <stat.icon className="absolute -right-4 -bottom-4 w-24 h-24 text-primary/3 -rotate-12 group-hover:text-primary/6 group-hover:rotate-0 transition-all duration-500" />

            <div className="relative z-10 flex flex-col gap-4">
                
                {/* Top Row: Icon & Label */}
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none">
                            {stat.label}
                        </p>
                        <p className="text-muted-foreground text-[10px] font-medium leading-none opacity-60">
                            {stat.description}
                        </p>
                    </div>
                    
                    {/* Compact Icon Glass-morphism */}
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center border border-border group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors">
                        <stat.icon className="w-4 h-4 text-foreground group-hover:text-primary transition-colors" />
                    </div>
                </div>

                {/* Main Content: Big Data Value */}
                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-black text-foreground tracking-tighter font-sans">
                        {stat.value}
                    </h3>
                    {/* Subtle "Records" unit or status indicator */}
                    <span className="text-[10px] font-bold text-muted-foreground/40 uppercase">Total</span>
                </div>
            </div>

            {/* Left Edge "Legal" Ribbon: Using Brand Gold for Active State */}
            <div className="absolute top-0 left-0 h-full w-1 bg-muted group-hover:bg-secondary transition-all duration-300 shadow-[2px_0_10px_rgba(255,222,17,0.1)]" />

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-linear-to-tr from-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    )
}

export default StatCard;