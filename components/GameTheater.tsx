
import React from 'react';
import { Game } from '../types';
import { X, Maximize2, RefreshCw, Volume2 } from 'lucide-react';

interface GameTheaterProps {
  game: Game | null;
  onClose: () => void;
}

const GameTheater: React.FC<GameTheaterProps> = ({ game, onClose }) => {
  if (!game) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full h-full md:w-[90vw] md:h-[90vh] bg-slate-900 md:rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-900/80 border-b border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <div>
              <h2 className="text-lg font-bold text-white leading-none">{game.title}</h2>
              <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">{game.category}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"><Volume2 size={20} /></button>
            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"><RefreshCw size={20} /></button>
            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"><Maximize2 size={20} /></button>
            <button 
              onClick={onClose}
              className="hidden md:flex ml-2 px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-colors"
            >
              Exit Theater
            </button>
          </div>
        </div>
        
        {/* Game Container */}
        <div className="flex-1 bg-black relative">
          <iframe
            src={game.gameUrl}
            className="w-full h-full"
            title={game.title}
            frameBorder="0"
            allowFullScreen
          />
        </div>
        
        {/* Footer Info */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 hidden md:flex items-center justify-between">
           <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-800 text-xs text-slate-300 rounded-full">Single Player</span>
              <span className="px-3 py-1 bg-slate-800 text-xs text-slate-300 rounded-full">Web App</span>
              <span className="px-3 py-1 bg-slate-800 text-xs text-slate-300 rounded-full">Trending #1</span>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500">Controls: WASD / Arrow Keys</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GameTheater;
