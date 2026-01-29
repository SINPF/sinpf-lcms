import Sidebar from './components/sidebar';
import Header from './components/header';
import StatsGrid from './components/statsgrid';

export default function DashboardHome() {
  


  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      
      <Sidebar/>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        
        <Header/>

        <StatsGrid/>

        
         
        

          
       
      </main>
    </div>
  );
}