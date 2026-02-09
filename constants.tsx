
import { Game, Category } from './types';

export const CATEGORIES: Category[] = ['All', 'Action', 'Sports', 'Puzzle', 'Retro', 'Strategy'];

export const GAMES: Game[] = [
  {
    id: 'slope-game',
    title: 'Slope',
    category: 'Action',
    thumbnail: 'https://picsum.photos/seed/slope/600/400',
    gameUrl: 'https://kdata1.com/2020/05/slope/',
    description: 'A fast-paced 3D ball runner game where you navigate through a neon-lit obstacle course.'
  }
];
