
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GameCard from './components/GameCard';
import GameTheater from './components/GameTheater';
import AdminForm from './components/AdminForm';
import { GAMES as INITIAL_GAMES } from './constants';
import { Game, Category } from './types';
// Fixed error: Added missing Plus icon to lucide-react imports
import { Gamepad, TrendingUp, Sparkles, FilterX, Settings, Plus } from 'lucide-react';

const STORAGE_KEY = 'nebula_game_library';

const App: React.FC = () => {
  // Initialize games from local storage or use defaults
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

  // Persistence side effect
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allGames));
  }, [allGames]);

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
    setShowAdmin(false);
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
          
          {/* Admin Form Section */}
          {showAdmin && (
            <div className="mb-12">
              <AdminForm onAddGame={handleAddGame} onClose={() => setShowAdmin(false)} />
            </div>
          )}

          {/* Hero / Featured Section (Only if no search/filter active) */}
          {!searchQuery && activeCategory === 'All' && !showAdmin && (
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 p-8 md:p-12 shadow-2xl shadow-violet-600/20">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                <img 
                  src="https://picsum.photos/seed/nebula/800/600" 
                  alt="Feature" 
                  className="w-full h-full object-cover transform scale-125 rotate-12 translate-x-10 translate-y-10"
                />
              </div>
              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-yellow-400" size={20} />
                  <span className="text-sm font-bold tracking-widest text-white/80 uppercase">Featured Library</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                  Your custom <span className="text-yellow-300 underline decoration-yellow-300/30 underline-offset-8">galaxy</span> of games.
                </h1>
                <p className="text-white/80 text-lg mb-8 max-w-lg leading-relaxed">
                  Every game you add is saved directly to your browser. Build the ultimate arcade without touching a line of code.
                </p>
                <button 
                  onClick={() => setShowAdmin(true)}
                  className="bg-white text-violet-600 hover:bg-slate-100 px-8 py-3.5 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add New Game
                </button>
              </div>
            </div>
          )}

          {/* Catalog Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 p-2 rounded-xl text-violet-400">
                <Gamepad size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {activeCategory} Games
                <span className="ml-3 text-slate-500 font-normal text-sm">{filteredGames.length} titles</span>
              </h2>
            </div>
            
            <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
               <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-xl text-sm font-medium transition-colors whitespace-nowrap">
                 <TrendingUp size={16} />
                 Trending
               </button>
               <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-xl text-sm font-medium transition-colors whitespace-nowrap">
                 Newest First
               </button>
            </div>
          </div>

          {/* Game Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredGames.map((game) => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onPlay={(g) => setSelectedGame(g)} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-slate-500 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800">
              <FilterX size={64} className="mb-4 text-slate-700" />
              <h3 className="text-xl font-bold text-slate-300">No games found</h3>
              <p className="text-sm">Try adjusting your search or filters.</p>
              <button 
                onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
                className="mt-6 text-violet-500 hover:text-violet-400 font-bold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <GameTheater 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />

      {/* Footer Decoration */}
      <footer className={`mt-auto py-8 border-t border-slate-900 text-center transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <p className="text-slate-600 text-sm">
          &copy; 2024 Nebula Gaming. Built for speed and glory.
        </p>
      </footer>
    </div>
  );
};

export default App;
