import React, { useState } from 'react';
import { Trophy, RefreshCw } from 'lucide-react';
import { GameState, Team, Question } from './types';
import { INITIAL_QUESTIONS } from './constants';
import SetupScreen from './components/SetupScreen';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import QuestionModal from './components/QuestionModal';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'setup',
    teams: [],
    currentTurnIndex: 0,
    questions: [],
    activeQuestionId: null,
  });

  const handleStartGame = (teams: Team[]) => {
    // Shuffle questions and select first 16
    const shuffledQuestions = [...INITIAL_QUESTIONS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 16)
      .map((q, index) => ({ 
        ...q, 
        displayId: index + 1, // Visual ID for the grid
        isPlayed: false 
      })) as Question[];

    setGameState({
      phase: 'playing',
      teams,
      currentTurnIndex: 0,
      questions: shuffledQuestions,
      activeQuestionId: null,
    });
  };

  const handleCardClick = (id: number) => {
    setGameState(prev => ({ ...prev, activeQuestionId: id }));
  };

  const handleAnswer = (correct: boolean) => {
    const { activeQuestionId, questions, currentTurnIndex, teams } = gameState;
    if (activeQuestionId === null) return;

    const currentQuestion = questions.find(q => q.id === activeQuestionId);
    if (!currentQuestion) return;

    const newTeams = [...teams];
    const currentTeam = newTeams[currentTurnIndex];
    
    // Update score
    if (correct) {
      currentTeam.score += currentQuestion.points;
    } else {
      currentTeam.score -= currentQuestion.points;
    }

    // Mark as played
    const newQuestions = questions.map(q => 
      q.id === activeQuestionId ? { ...q, isPlayed: true } : q
    );

    // Next turn logic
    const nextTurnIndex = (currentTurnIndex + 1) % teams.length;
    const allPlayed = newQuestions.every(q => q.isPlayed);

    setGameState(prev => ({
      ...prev,
      teams: newTeams,
      questions: newQuestions,
      activeQuestionId: null,
      currentTurnIndex: nextTurnIndex,
      phase: allPlayed ? 'ended' : 'playing'
    }));

    if (allPlayed) {
      // End game celebration
      if (window.confetti) {
        const duration = 3000;
        const end = Date.now() + duration;
        (function frame() {
          window.confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#22d3ee', '#818cf8'] });
          window.confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#22d3ee', '#818cf8'] });
          if (Date.now() < end) requestAnimationFrame(frame);
        }());
      }
    }
  };

  const handleReset = () => {
    if (window.confirm("Segur que vols reiniciar el joc? Es perdran totes les puntuacions.")) {
      setGameState({
        phase: 'setup',
        teams: [],
        currentTurnIndex: 0,
        questions: [],
        activeQuestionId: null,
      });
    }
  };

  const activeQuestion = gameState.questions.find(q => q.id === gameState.activeQuestionId);

  return (
    <div className="h-full w-full flex flex-col relative">
      {/* Header */}
      {gameState.phase !== 'setup' && (
        <header className="h-14 px-4 bg-slate-900/90 backdrop-blur border-b border-white/10 flex justify-between items-center z-30 shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-1.5 rounded-lg">
              <Trophy size={16} className="text-white" />
            </div>
            <h1 className="font-bold text-base md:text-lg tracking-wide truncate">
              Cytogenetics <span className="text-cyan-400 font-light">Master</span>
            </h1>
          </div>
          
          {gameState.phase === 'playing' && gameState.teams.length > 0 && (
            <div className="hidden md:flex items-center gap-2 text-sm bg-slate-800 py-1 px-3 rounded-full border border-slate-700">
              <span className="text-slate-400 uppercase text-xs font-bold">Torn:</span>
              <span className="font-bold text-cyan-300">{gameState.teams[gameState.currentTurnIndex].name}</span>
            </div>
          )}

          <button onClick={handleReset} className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
            <RefreshCw size={18} />
          </button>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {gameState.phase === 'setup' && <SetupScreen onStartGame={handleStartGame} />}

        {gameState.phase === 'playing' && (
          <div className="flex-1 w-full h-full p-2 md:p-4 flex flex-col">
            <GameBoard questions={gameState.questions} onCardClick={handleCardClick} />
          </div>
        )}

        {gameState.phase === 'ended' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center overflow-y-auto">
            <Trophy size={80} className="text-yellow-400 mb-6 animate-bounce shrink-0" />
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 shrink-0">
              Resultats Finals
            </h2>
            <div className="space-y-3 w-full max-w-md overflow-y-auto pr-2 custom-scrollbar">
              {[...gameState.teams].sort((a,b) => b.score - a.score).map((team, idx) => (
                <div key={team.id} className={`flex justify-between items-center p-3 rounded-xl border ${idx === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'bg-slate-800 border-slate-700'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono font-bold w-6 h-6 flex items-center justify-center rounded-full text-sm ${idx === 0 ? 'bg-yellow-500 text-slate-900' : 'bg-slate-700 text-slate-400'}`}>
                      {idx + 1}
                    </span>
                    <span className="font-bold text-base md:text-lg truncate max-w-[150px]">{team.name}</span>
                  </div>
                  <span className={`text-xl font-bold ${team.score < 0 ? 'text-red-400' : 'text-cyan-400'}`}>{team.score} pts</span>
                </div>
              ))}
            </div>
            <button onClick={handleReset} className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-bold transition-all shrink-0">
              Jugar una altra vegada
            </button>
          </div>
        )}
      </main>

      {/* Modals & Overlays */}
      {gameState.activeQuestionId !== null && activeQuestion && gameState.phase === 'playing' && (
        <QuestionModal 
          question={activeQuestion}
          currentTeam={gameState.teams[gameState.currentTurnIndex]}
          onAnswer={handleAnswer}
        />
      )}

      {/* Footer Scoreboard */}
      {gameState.phase !== 'setup' && (
        <div className="shrink-0 z-40 bg-slate-900/95 backdrop-blur border-t border-white/10 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
          <ScoreBoard 
            teams={gameState.teams} 
            currentTurnIndex={gameState.currentTurnIndex} 
            onManualTurnChange={(idx) => setGameState(prev => ({...prev, currentTurnIndex: idx}))}
          />
        </div>
      )}
    </div>
  );
};

export default App;