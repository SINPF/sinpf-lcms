import { 
  Gavel, 
  FileText, 
  Clock, 
  AlertCircle, 
} from 'lucide-react';

const stats = [
    { label: "Active Cases", value: "124", icon: Gavel, color: "text-blue-600" },
    { label: "Pending Reviews", value: "12", icon: Clock, color: "text-amber-600" },
    { label: "New Member Claims", value: "45", icon: FileText, color: "text-emerald-600" },
    { label: "Urgent Deadlines", value: "3", icon: AlertCircle, color: "text-rose-600" },
  ];

function StatsGrid() {
    return ( 
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl bg-slate-50 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-slate-200 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <p className="text-slate-500 text-[13px] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
     );
}

export default StatsGrid;