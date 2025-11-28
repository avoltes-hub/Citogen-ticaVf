import React, { useEffect, useState } from 'react';
import { Microscope, Eye, X, Check, AlertCircle } from 'lucide-react';
import { Question, Team } from '../types';

interface QuestionModalProps {
  question: Question;
  currentTeam: Team;
  onAnswer: (correct: boolean) => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ question, currentTeam, onAnswer }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const handleCorrect = () => {
    // Trigger global confetti if available
    if (window.confetti) {
      window.confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22d3ee', '#818cf8', '#e879f9', '#ffffff']
      });
    }
    setIsClosing(true);
    setTimeout(() => onAnswer(true), 300);
  };

  const handleIncorrect = () => {
    setIsClosing(true);
    setTimeout(() => onAnswer(false), 300);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div className={`bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ${isClosing ? 'scale-95' : 'scale-100'} flex flex-col max-h-[90vh]`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 md:p-6 flex justify-between items-center border-b border-slate-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-900/50 rounded-lg">
              <Microscope className="text-blue-400" size={24} />
            </div>
            <div>
              <h3 className="text-slate-400 text-xs md:text-sm uppercase tracking-wider">Torn de l'equip</h3>
              <p className="text-lg md:text-xl font-bold text-white truncate max-w-[150px] md:max-w-none">{currentTeam.name}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-xs md:text-sm font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-1
              ${question.difficulty === 'easy' ? 'bg-green-900/50 text-green-400 border border-green-800' : 
              question.difficulty === 'medium' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-800' : 
              'bg-red-900/50 text-red-400 border border-red-800'}`}>
              {question.points} Pts
            </span>
            <span className="text-[10px] md:text-xs text-slate-500">Targeta #{question.displayId}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 text-center overflow-y-auto flex-1 custom-scrollbar w-full">
          <div className="mb-6">
            <h2 className="text-lg md:text-3xl font-bold text-white leading-snug mb-4 break-words">
              {question.question}
            </h2>
            <div className="w-16 h-1 bg-cyan-500 mx-auto rounded-full mb-6"></div>

            {question.image && (
              <div className="mb-6 flex justify-center">
                <img 
                  src={question.image} 
                  alt="Imatge de la pregunta" 
                  className="max-h-48 md:max-h-72 rounded-lg shadow-lg border border-slate-600 object-contain bg-white"
                />
              </div>
            )}
          </div>

          {/* Answer Reveal Area */}
          <div className="min-h-[80px] md:min-h-[100px] flex items-center justify-center pb-4">
            {!showAnswer ? (
              <button 
                onClick={() => setShowAnswer(true)}
                className="group flex flex-col items-center gap-2 text-blue-300 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-lg border border-slate-600 group-hover:border-blue-500">
                  <Eye className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="font-semibold tracking-wide text-sm md:text-base">VEURE RESPOSTA</span>
              </button>
            ) : (
              <div className="animate-in fade-in zoom-in duration-300 w-full max-w-2xl mx-auto">
                <p className="text-lg md:text-2xl text-cyan-300 font-medium bg-cyan-950/30 p-4 md:p-6 rounded-xl border border-cyan-900/50 break-words">
                  {question.answer}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-800/50 p-4 md:p-6 border-t border-slate-700 flex justify-center gap-3 md:gap-4 shrink-0">
          {showAnswer && (
            <>
              <button onClick={handleIncorrect} className="flex-1 max-w-[200px] flex items-center justify-center gap-2 py-3 px-4 md:px-6 rounded-xl bg-red-900/20 text-red-400 border border-red-900/50 hover:bg-red-600 hover:text-white transition-all duration-200 font-bold text-sm md:text-base">
                <X size={20} /> INCORRECTE
              </button>
              <button onClick={handleCorrect} className="flex-1 max-w-[200px] flex items-center justify-center gap-2 py-3 px-4 md:px-6 rounded-xl bg-green-900/20 text-green-400 border border-green-900/50 hover:bg-green-600 hover:text-white transition-all duration-200 font-bold shadow-[0_0_15px_rgba(34,197,94,0.1)] text-sm md:text-base">
                <Check size={20} /> CORRECTE
              </button>
            </>
          )}
          {!showAnswer && (
            <div className="text-slate-500 text-xs md:text-sm flex items-center gap-2 italic text-center">
              <AlertCircle size={16} className="shrink-0" /> Mostra la resposta per validar els punts
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;