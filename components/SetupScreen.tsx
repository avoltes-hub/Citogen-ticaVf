import React, { useState } from 'react';
import { Play, Dna } from 'lucide-react';
import { Team } from '../types';
import { DEFAULT_EMOJIS } from '../constants';

interface SetupScreenProps {
  onStartGame: (teams: Team[]) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame }) => {
  const [numGroups, setNumGroups] = useState(2);
  const [groupNames, setGroupNames] = useState<string[]>(DEFAULT_EMOJIS);

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...groupNames];
    newNames[index] = name;
    setGroupNames(newNames);
  };

  const handleStart = () => {
    const finalGroups: Team[] = [];
    for (let i = 0; i < numGroups; i++) {
      finalGroups.push({
        id: i,
        name: groupNames[i] || `Equip ${i + 1}`,
        score: 0
      });
    }
    onStartGame(finalGroups);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-10 left-10 opacity-10 animate-pulse">
        <Dna size={200} className="text-cyan-400" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10 animate-pulse delay-700">
        <Dna size={200} className="text-purple-400" />
      </div>

      <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-2xl z-10 max-h-full overflow-y-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          Nomenclatura Citogenètica
        </h1>
        <p className="text-center text-blue-200 mb-6">Configuració del Joc</p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-blue-300 mb-3 text-center">Nombre d'equips</label>
          <div className="flex justify-center gap-2">
            {[2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                onClick={() => setNumGroups(num)}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full font-bold transition-all duration-300 ${
                  numGroups === num
                    ? 'bg-cyan-500 text-white scale-110 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {Array.from({ length: numGroups }).map((_, idx) => (
            <div key={idx} className="relative group">
              <label className="text-xs text-slate-400 mb-1 block pl-1">Equip {idx + 1}</label>
              <input
                type="text"
                value={groupNames[idx] || ''}
                onChange={(e) => handleNameChange(idx, e.target.value)}
                className="block w-full text-center py-3 text-2xl border border-slate-600 rounded-lg bg-slate-800/50 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                placeholder="Emoji"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleStart}
          className="w-full flex items-center justify-center gap-2 py-3 px-6 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transform transition-all hover:scale-[1.02]"
        >
          <Play size={24} fill="currentColor" />
          COMENÇAR EL JOC
        </button>
      </div>
    </div>
  );
};

export default SetupScreen;