
import React from 'react';
import { Search, Bell, Menu, Gamepad2, User, Settings } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleSidebar: () => void;
  onToggleAdmin: () => void;
  isAdminVisible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, onSearchChange, onToggleSidebar, onToggleAdmin, isAdminVisible }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 px-4 md:px-8">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="bg-violet-600 p-1.5 rounded-lg shadow-lg shadow-violet-600/20">
              <Gamepad2 size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 hidden sm:block">
              NEBULA
            </span>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-8 relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for games..."
            className="block w-full bg-slate-800/50 border border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 p-2.5 pl-10 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <button 
            onClick={onToggleAdmin}
            className={`p-2 rounded-full transition-colors ${isAdminVisible ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            title="Manage Games"
          >
            <Settings size={20} />
          </button>

          <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-900"></span>
          </button>
          
          <div className="h-8 w-[1px] bg-slate-800 hidden sm:block"></div>
          
          <button className="flex items-center gap-2 p-1.5 pr-3 hover:bg-slate-800 rounded-full transition-colors group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white hidden sm:block">
              Guest
            </span>
          </button>
        </div>
      </div>
      
      {/* Mobile search bar */}
      <div className="md:hidden pt-2 pb-4">
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Search size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search..."
                className="block w-full bg-slate-800/50 border border-slate-700 text-white text-xs rounded-xl focus:ring-violet-500 p-2 pl-9"
              />
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
