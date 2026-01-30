import { Info } from "lucide-react";

interface InstructionsProps {
    title: string,
    instructions: string[]
}

function Instructions({title, instructions}: InstructionsProps) {
  return (
    <section className="bg-slate-50 border border-slate-200 p-5 mb-8">
      <div className="flex items-center gap-2 mb-3 text-[#002B5C]">
        <Info className="w-5 h-5" />
        <h3 className="font-semibold text-sm uppercase tracking-wider">
          {title}
        </h3>
      </div>
      
      <div className="space-y-3">
        {instructions.map((instruction, idx) =>(
            <div key={idx}className="flex gap-4">
                <span className="shrink-0 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm">
                    {idx+1}
                </span>
                <p 
                    className="text-slate-600 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: instruction }}
                /> 
            </div>
        ))}

      </div>
    </section>
  );
}

export default Instructions;