import Sidebar from './components/sidebar';
import Header from './components/header';


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  


  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      
      <Sidebar/>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        
        <Header/>


        <div className='p-8'>
            {children}
        </div>

       
      </main>
    </div>
  );
}