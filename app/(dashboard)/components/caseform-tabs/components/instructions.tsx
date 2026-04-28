import { Info } from "lucide-react";

interface InstructionsProps {
    title: string,
    instructions: string[]
}

function Instructions({title, instructions}: InstructionsProps) {
  return (
    <section className="bg-muted/30 border border-border p-6 rounded-xl mb-8 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-5 text-primary">
        <Info className="w-5 h-5" />
        <h3 className="font-bold text-xs uppercase tracking-[0.2em] font-heading">
          {title}
        </h3>
      </div>
      
      <div className="space-y-4">
        {instructions.map((instruction, idx) => (
            <div key={idx} className="flex gap-4 group">
                {/* Step Number: Uses Secondary Gold for high-contrast visibility */}
                <span className="shrink-0 w-6 h-6 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center text-[10px] font-black shadow-sm group-hover:scale-110 transition-transform">
                    {String(idx + 1).padStart(2, '0')}
                </span>
                <p 
                    className="text-foreground/80 text-sm leading-relaxed font-sans"
                    dangerouslySetInnerHTML={{ __html: instruction }}
                /> 
            </div>
        ))}
      </div>
    </section>
  );
}

export default Instructions;