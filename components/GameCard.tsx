
import React from 'react';
import { Game } from '../types';
import { Play } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  return (
    <div className="group relative bg-slate-800/30 rounded-2xl overflow-hidden border border-slate-800 hover:border-violet-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-600/10 hover:-translate-y-1">
      <div className="aspect-video w-full overflow-hidden relative">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => onPlay(game)}
            className="bg-violet-600 hover:bg-violet-500 text-white p-4 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300"
          >
            <Play fill="white" size={24} />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white rounded-md border border-white/10">
            {game.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors line-clamp-1">
          {game.title}
        </h3>
        <p className="text-slate-400 text-sm mt-1 line-clamp-2 min-h-[40px]">
          {game.description}
        </p>
        
        <button
          onClick={() => onPlay(game)}
          className="mt-4 w-full bg-slate-700/50 hover:bg-violet-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 group/btn"
        >
          <span>Play Now</span>
          <Play size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default GameCard;
