import React from 'react';
import { Lock } from 'lucide-react';
import { Question } from '../types';

interface GameBoardProps {
  questions: Question[];
  onCardClick: (id: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ questions, onCardClick }) => {
  return (
    <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center">
      <div className="grid grid-cols-4 grid-rows-4 gap-3 md:gap-4 h-full w-full max-h-[80vh] aspect-square md:aspect-video mx-auto">
        {questions.map((q) => (
          <button
            key={q.id}
            onClick={() => !q.isPlayed && onCardClick(q.id)}
            disabled={q.isPlayed}
            className={`
              relative w-full h-full rounded-xl flex flex-col items-center justify-center p-2 transition-all duration-300 transform group
              ${q.isPlayed 
                ? 'bg-slate-800/40 border border-slate-800 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] hover:border-cyan-400/50 cursor-pointer shadow-lg active:scale-95'
              }
            `}
          >
            {q.isPlayed ? (
              <div className="text-slate-600">
                <Lock className="w-8 h-8" />
              </div>
            ) : (
              <>
                <span className={`absolute top-2 left-2 text-xs md:text-sm font-bold px-2 py-0.5 rounded-full ${
                  q.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' : 
                  q.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {q.points}
                </span>

                <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-blue-500 drop-shadow-sm font-mono group-hover:from-white group-hover:to-cyan-200 transition-colors">
                  {q.displayId}
                </span>
                
                <div className="absolute top-2 right-2">
                  <span className={`w-2 h-2 rounded-full block ${
                    q.difficulty === 'easy' ? 'bg-green-500' : 
                    q.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                  } shadow-[0_0_6px_currentColor]`}></span>
                </div>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;