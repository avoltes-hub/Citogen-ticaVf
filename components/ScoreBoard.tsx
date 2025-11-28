import React from 'react';
import { Trophy } from 'lucide-react';
import { Team } from '../types';

interface ScoreBoardProps {
  teams: Team[];
  currentTurnIndex: number;
  onManualTurnChange: (index: number) => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ teams, currentTurnIndex, onManualTurnChange }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-nowrap overflow-x-auto gap-4 items-end justify-center md:justify-center no-scrollbar pt-8 pb-3">
        {teams.map((team, index) => {
          const isTurn = index === currentTurnIndex;
          // Determine if leading
          const maxScore = Math.max(...teams.map(t => t.score));
          const isLeading = teams.length > 1 && team.score === maxScore && team.score > 0;

          return (
            <div
              key={team.id}
              onClick={() => onManualTurnChange(index)}
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-300 select-none
                flex flex-col items-center justify-center rounded-lg border
                ${isTurn
                  ? 'bg-gradient-to-b from-cyan-900/40 to-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] transform -translate-y-2 z-10 w-24 md:w-28 py-3'
                  : 'bg-slate-800/40 border-slate-700 hover:bg-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100 w-20 md:w-24 py-2'
                }
              `}
            >
              {isLeading && (
                <div className="absolute -top-3 -right-2 bg-yellow-500 text-slate-900 p-1 rounded-full shadow-lg z-20">
                  <Trophy size={12} />
                </div>
              )}
              
              {isTurn && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-[10px] font-bold px-2 py-0.5 rounded-full text-slate-900 uppercase tracking-wider shadow-md whitespace-nowrap">
                  Torn
                </div>
              )}

              <h3 className={`font-bold transition-all truncate w-full text-center px-1 ${isTurn ? 'text-2xl md:text-3xl mb-1' : 'text-xl md:text-2xl text-slate-400'}`}>
                {team.name}
              </h3>
              
              <span className={`font-mono font-bold leading-none transition-all ${
                isTurn ? 'text-xl md:text-2xl text-cyan-300' : 'text-lg md:text-xl'
              } ${team.score < 0 ? 'text-red-500' : isTurn ? 'text-cyan-300' : 'text-slate-400'}`}>
                {team.score}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreBoard;