
function Header() {
 
    return ( 
        <header className="bg-white border-l-0  flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b  border-slate-200 p-8">
            <h1 className="font-bold text-xl text-slate-900 -tracking-normal">
              Welcome back, <span className="text-[#002B5C] ">Brandon</span>
            </h1>
        </header>
     );
}

export default Header;