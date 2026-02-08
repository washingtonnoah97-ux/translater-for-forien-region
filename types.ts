
export type Category = 'All' | 'Action' | 'Sports' | 'Puzzle' | 'Retro' | 'Strategy';

export interface Game {
  id: string;
  title: string;
  category: Category;
  thumbnail: string;
  gameUrl: string;
  description: string;
}
