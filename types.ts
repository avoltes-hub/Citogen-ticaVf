export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: number;
  displayId?: number; // The number shown on the card
  question: string;
  answer: string;
  difficulty: Difficulty;
  points: number;
  isPlayed: boolean;
  category: string;
  image?: string;
}

export interface Team {
  id: number;
  name: string;
  score: number;
}

export type GamePhase = 'setup' | 'playing' | 'ended';

export interface GameState {
  phase: GamePhase;
  teams: Team[];
  currentTurnIndex: number;
  questions: Question[];
  activeQuestionId: number | null;
}

// Global definition for canvas-confetti since we are loading it via script tag
declare global {
  interface Window {
    confetti: any;
  }
}