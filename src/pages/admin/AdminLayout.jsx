import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Menu, X, LayoutDashboard, Film, Users, LogOut,
  FileText, CreditCard, Info, ChevronDown, ChevronRight, Settings,
} from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const [pagesOpen, setPagesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menu = [
    { name: 'Dashboard',     path: '/admin',               icon: LayoutDashboard },
    { name: 'Movies',        path: '/admin/movies',         icon: Film },
    { name: 'Users',         path: '/admin/users',          icon: Users },
    { name: 'Subscriptions', path: '/admin/subscriptions',  icon: CreditCard },
    // ── NEW ──────────────────────────────────────────────────────────────
    { name: 'Settings',      path: '/admin/settings',       icon: Settings },
    // ─────────────────────────────────────────────────────────────────────
    { name: 'About Us',      path: '/admin/about-us',       icon: Info },
  ];

  return (
    <div className="min-h-screen bg-[#1c2333] text-gray-300 flex fixed inset-0 z-50 font-sans">

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-[#141a29] border-r border-gray-800 flex flex-col shrink-0 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-20 flex items-center justify-between border-b border-gray-800/50">
          <h2 className="text-xl md:text-2xl font-bold text-[#4aa5ff] tracking-wider">MovieVerse Admin</h2>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 py-6 space-y-1 px-4 overflow-y-auto custom-scrollbar">

          {/* First 3 items: Dashboard, Movies, Users */}
          {menu.slice(0, 3).map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-[#3b82f6] text-white font-semibold shadow-lg shadow-blue-500/20'
                  : 'text-gray-400 hover:bg-[#1e2638] hover:text-white font-medium'
              }`}
            >
              <item.icon size={20} strokeWidth={location.pathname === item.path ? 2.5 : 2} />
              <span>{item.name}</span>
            </Link>
          ))}

          {/* Pages Dropdown */}
          <div className="pt-2 pb-1">
            <button
              onClick={() => setPagesOpen(!pagesOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                pagesOpen || location.pathname.includes('/admin/page')
                  ? 'bg-[#3b82f6] text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-400 hover:bg-[#1e2638] hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FileText size={20} strokeWidth={pagesOpen || location.pathname.includes('/admin/page') ? 2.5 : 2} />
                <span>Pages</span>
              </div>
              {pagesOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>

            {pagesOpen && (
              <div className="mt-1 ml-4 pl-4 border-l-2 border-gray-700/50 space-y-1 flex flex-col py-2">
                <Link
                  to="/admin/pages"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                    location.pathname === '/admin/pages'
                      ? 'text-[#4aa5ff] bg-[#4aa5ff]/10'
                      : 'text-gray-400 hover:text-white hover:bg-[#1e2638]'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${location.pathname === '/admin/pages' ? 'bg-[#4aa5ff]' : 'bg-gray-500'}`}></div>
                  <span>Page Listing</span>
                </Link>
              </div>
            )}
          </div>

          {/* Remaining items: Subscriptions, Settings, About Us */}
          {menu.slice(3).map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-[#3b82f6] text-white font-semibold shadow-lg shadow-blue-500/20'
                  : 'text-gray-400 hover:bg-[#1e2638] hover:text-white font-medium'
              }`}
            >
              <item.icon size={20} strokeWidth={location.pathname === item.path ? 2.5 : 2} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-gray-800/50">
          <Link to="/" className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium">
            <LogOut size={20} />
            <span>Exit Admin</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

        {/* Top Header */}
        <header className="h-20 bg-[#1c2333] border-b border-gray-800/30 flex items-center justify-between px-4 md:px-8 shrink-0 z-10 shadow-sm">
          <div className="flex items-center">
            <button
              className="mr-4 md:hidden text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider truncate max-w-[150px] sm:max-w-xs">
              {menu.find(m => m.path === location.pathname)?.name ||
                (location.pathname === '/admin/pages' ? 'Pages' : 'Admin Panel')}
            </h1>
          </div>
          <div className="flex items-center space-x-3 md:space-x-5">
            <div className="flex items-center space-x-1 p-1 bg-[#141a29] rounded-full border border-gray-700/50">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-700/50 text-white cursor-pointer"><span className="text-xs">⚙</span></div>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:text-white cursor-pointer"><span className="text-xs">🌙</span></div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#4aa5ff] flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/30 cursor-pointer">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-8 bg-[#1c2333]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
