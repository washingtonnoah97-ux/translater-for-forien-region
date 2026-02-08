
import { Game, Category } from './types';

export const CATEGORIES: Category[] = ['All', 'Action', 'Sports', 'Puzzle', 'Retro', 'Strategy'];

export const GAMES: Game[] = [
  {
    id: '1',
    title: 'Hextris',
    category: 'Puzzle',
    thumbnail: 'https://picsum.photos/seed/hextris/600/400',
    gameUrl: 'https://hextris.io/',
    description: 'Fast-paced puzzle game where you rotate hexagons to match colored blocks.'
  },
  {
    id: '2',
    title: '2048',
    category: 'Puzzle',
    thumbnail: 'https://picsum.photos/seed/2048/600/400',
    gameUrl: 'https://play2048.co/',
    description: 'Join the numbers and get to the 2048 tile!'
  },
  {
    id: '3',
    title: 'Super Mario Retro',
    category: 'Retro',
    thumbnail: 'https://picsum.photos/seed/retro/600/400',
    gameUrl: 'https://supermario-game.com/emulate',
    description: 'Classic platforming action in a retro style.'
  },
  {
    id: '4',
    title: 'Tower Defense',
    category: 'Strategy',
    thumbnail: 'https://picsum.photos/seed/strategy/600/400',
    gameUrl: 'https://www.towerdefense.net/games/flash/towerdefense.html',
    description: 'Defend your base with tactical tower placements.'
  },
  {
    id: '5',
    title: 'Street Skater',
    category: 'Sports',
    thumbnail: 'https://picsum.photos/seed/skater/600/400',
    gameUrl: 'https://poki.com/en/g/street-skater-3d',
    description: 'Shred the streets and perform amazing tricks.'
  },
  {
    id: '6',
    title: 'Cyber Action',
    category: 'Action',
    thumbnail: 'https://picsum.photos/seed/action/600/400',
    gameUrl: 'https://poki.com/en/g/cyber-cars-punk-racing',
    description: 'High-speed adrenaline fueled racing in a neon city.'
  },
  {
    id: '7',
    title: 'Classic Sudoku',
    category: 'Puzzle',
    thumbnail: 'https://picsum.photos/seed/sudoku/600/400',
    gameUrl: 'https://www.websudoku.com/',
    description: 'The ultimate brain teaser for number lovers.'
  },
  {
    id: '8',
    title: 'World Cup Penalty',
    category: 'Sports',
    thumbnail: 'https://picsum.photos/seed/soccer/600/400',
    gameUrl: 'https://poki.com/en/g/penalty-shooters-2',
    description: 'Take the winning shot for your national team.'
  },
  {
    id: '9',
    title: 'Pac-Hero',
    category: 'Retro',
    thumbnail: 'https://picsum.photos/seed/pac/600/400',
    gameUrl: 'https://pacman.com/en/',
    description: 'Waka waka your way through a maze of ghosts.'
  }
];
