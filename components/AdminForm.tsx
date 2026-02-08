
import React, { useState } from 'react';
import { Game, Category } from '../types';
import { CATEGORIES } from '../constants';
import { Plus, X, Save, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface AdminFormProps {
  onAddGame: (game: Game) => void;
  onClose: () => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ onAddGame, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Action' as Category,
    gameUrl: '',
    thumbnail: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGame: Game = {
      id: Date.now().toString(),
      ...formData
    };
    onAddGame(newGame);
    setFormData({
      title: '',
      category: 'Action',
      gameUrl: '',
      thumbnail: '',
      description: ''
    });
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl animate-in zoom-in duration-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-600/20 text-violet-400 rounded-lg">
            <Plus size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">Add New Game</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Game Title</label>
            <input
              required
              type="text"
              placeholder="e.g. Galaxy Quest"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
            <select
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all appearance-none"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
            >
              {CATEGORIES.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
            <textarea
              required
              rows={3}
              placeholder="Briefly describe the gameplay..."
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <LinkIcon size={12} /> Game URL
            </label>
            <input
              required
              type="url"
              placeholder="https://..."
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all"
              value={formData.gameUrl}
              onChange={(e) => setFormData({ ...formData, gameUrl: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <ImageIcon size={12} /> Thumbnail URL
            </label>
            <input
              required
              type="url"
              placeholder="https://..."
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Save size={18} />
              Save Game to Library
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
