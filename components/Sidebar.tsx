
import React from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';
import { LayoutGrid, Sword, Trophy, Puzzle, RotateCcw, Target } from 'lucide-react';

interface SidebarProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  isOpen: boolean;
}

const CategoryIcon: React.FC<{ name: Category; className?: string }> = ({ name, className }) => {
  switch (name) {
    case 'All': return <LayoutGrid size={20} className={className} />;
    case 'Action': return <Sword size={20} className={className} />;
    case 'Sports': return <Trophy size={20} className={className} />;
    case 'Puzzle': return <Puzzle size={20} className={className} />;
    case 'Retro': return <RotateCcw size={20} className={className} />;
    case 'Strategy': return <Target size={20} className={className} />;
    default: return <LayoutGrid size={20} className={className} />;
  }
};

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onSelectCategory, isOpen }) => {
  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-slate-900 border-r border-slate-800 transition-all duration-300 z-40 
      ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-20 md:translate-x-0'}`}
    >
      <div className="flex flex-col h-full pt-20 px-4">
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`w-full flex items-center p-3 rounded-xl transition-all group relative overflow-hidden
                ${activeCategory === cat 
                  ? 'bg-violet-600 text-white' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <div className="flex items-center min-w-[24px]">
                <CategoryIcon name={cat} />
              </div>
              <span className={`ml-3 font-medium transition-opacity duration-200 whitespace-nowrap ${isOpen ? 'opacity-100' : 'md:opacity-0 w-0 md:w-auto overflow-hidden'}`}>
                {cat}
              </span>
              {!isOpen && (
                <div className="absolute left-16 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                  {cat}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-auto mb-8 p-4 bg-gradient-to-br from-indigo-900/40 to-violet-900/40 rounded-2xl border border-white/5 hidden md:block">
           <p className={`text-xs text-slate-400 leading-tight ${!isOpen && 'hidden'}`}>
             Experience premium gaming without interruptions.
           </p>
           <button className={`mt-3 w-full bg-white/10 hover:bg-white/20 text-white text-xs py-2 rounded-lg font-bold transition-colors ${!isOpen && 'hidden'}`}>
             Go Pro
           </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
