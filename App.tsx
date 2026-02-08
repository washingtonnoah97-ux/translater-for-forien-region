
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Gamepad2, Search, Settings, LayoutGrid, Sword, Trophy, 
  Puzzle, RotateCcw, Target, Play, X, Save, 
  ImageIcon, Link as LinkIcon, Sparkles, Plus, 
  Maximize2, Volume2, RefreshCw, Trash2, TrendingUp, FilterX
} from 'lucide-react';
import { Game, Category } from './types';
import { GAMES as INITIAL_GAMES, CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GameCard from './components/GameCard';
import GameTheater from './components/GameTheater';
import AdminForm from './components/AdminForm';

const STORAGE_KEY = 'nebula_game_library';

const App: React.FC = () => {
  // --- State & LocalStorage Logic ---
  const [allGames, setAllGames] = useState<Game[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load games from localStorage", e);
    }
    return INITIAL_GAMES;
  });

  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  // Persistence side effect: Auto-save whenever games change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allGames));
  }, [allGames]);

  // --- Secret 'admin' keyboard trigger ---
  useEffect(() => {
    let input = '';
    const handleKey = (e: KeyboardEvent) => {
      input += e.key.toLowerCase();
      if (input.endsWith('admin')) {
        setShowAdmin(prev => !prev);
        input = '';
      }
      if (input.length > 10) input = input.slice(-5);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddGame = (newGame: Game) => {
    setAllGames(prev => [newGame, ...prev]);
    // Optionally keep admin open or close it
  };

  const deleteGame = (id: string) => {
    if (confirm('Delete this game from your library?')) {
      setAllGames(prev => prev.filter(g => g.id !== id));
    }
  };

  const filteredGames = useMemo(() => {
    return allGames.filter((game) => {
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allGames, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-x-hidden">
      <Navbar 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onToggleAdmin={() => setShowAdmin(!showAdmin)}
        isAdminVisible={showAdmin}
      />
      
      <Sidebar 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory}
        isOpen={sidebarOpen}
      />

      <main className={`flex-1 transition-all duration-300 pt-24 px-4 md:px-8 pb-12 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Admin Form Section (Stealth Feature) */}
          {showAdmin && (
            <div className="mb-12 animate-slide-up">
              <AdminForm onAddGame={handleAddGame} onClose={() => setShowAdmin(false)} />
            </div>
          )}

          {/* Hero / Featured Section */}
          {!searchQuery && activeCategory === 'All' && !showAdmin && (
            <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 p-8 md:p-12 shadow-2xl shadow-violet-600/20 border border-white/10">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Feature" 
                  className="w-full h-full object-cover transform scale-125 rotate-12 translate-x-10 translate-y-10"
                />
              </div>
              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-yellow-400" size={20} />
                  <span className="text-sm font-bold tracking-widest text-white/80 uppercase">Featured Library</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Your Infinite <span className="text-yellow-300 underline underline-offset-8 decoration-yellow-300/30">Arcade.</span>
                </h1>
                <p className="text-white/80 text-lg mb-8 max-w-lg leading-relaxed">
                  Discover, add, and play. Every game you add is saved to your browser. Build the ultimate collection today.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setSelectedGame(allGames[0])}
                    className="bg-white text-violet-600 hover:bg-slate-100 px-8 py-3.5 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
                  >
                    <Play size={20} fill="currentColor" /> Play Now
                  </button>
                  <button 
                    onClick={() => setShowAdmin(true)}
                    className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-3.5 rounded-2xl font-bold transition-all border border-white/20 flex items-center gap-2"
                  >
                    <Plus size={20} /> Add Game
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Catalog Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 p-2 rounded-xl text-violet-400 border border-slate-700">
                <Gamepad2 size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                {activeCategory} Games
                <span className="text-slate-500 font-normal text-sm bg-slate-900 px-3 py-1 rounded-full border border-slate-800">{filteredGames.length}</span>
              </h2>
            </div>
            
            <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
               <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-xl text-sm font-medium border border-slate-700 transition-colors whitespace-nowrap">
                 <TrendingUp size={16} />
                 Trending
               </button>
               <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-xl text-sm font-medium border border-slate-700 transition-colors whitespace-nowrap">
                 Newest First
               </button>
            </div>
          </div>

          {/* Game Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredGames.map((game) => (
                <div key={game.id} className="relative group">
                  <GameCard 
                    game={game} 
                    onPlay={(g) => setSelectedGame(g)} 
                  />
                  {showAdmin && (
                    <button 
                      onClick={() => deleteGame(game.id)}
                      className="absolute top-4 right-4 z-10 p-2 bg-rose-600/80 text-white rounded-xl hover:bg-rose-500 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/10 shadow-lg"
                      title="Delete from library"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-slate-500 bg-slate-900/20 rounded-[2rem] border-2 border-dashed border-slate-800">
              <FilterX size={64} className="mb-4 text-slate-700" />
              <h3 className="text-xl font-bold text-slate-300">No games found</h3>
              <p className="text-sm">Try adjusting your search or filters.</p>
              <button 
                onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
                className="mt-6 text-violet-500 hover:text-violet-400 font-bold transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Theater Mode Overlay */}
      <GameTheater 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />

      {/* Footer */}
      <footer className={`mt-auto py-12 border-t border-slate-900 text-center transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <Gamepad2 size={18} className="text-violet-500" />
            <span className="font-bold text-slate-400">NEBULA GAMING</span>
          </div>
          <p>&copy; 2024 Nebula. Built for explorers of the digital arcade.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
