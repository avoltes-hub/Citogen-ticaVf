import { Question } from './types';

export const INITIAL_QUESTIONS: Omit<Question, 'displayId'>[] = [
  // Easy (100 points)
  { 
    id: 1, 
    question: "47,XY,+21", 
    answer: "Sexe masculí, Síndrome de Down per trisomia 21 lliure.", 
    difficulty: 'easy', 
    points: 100, 
    isPlayed: false, 
    category: 'A' 
  },
  { 
    id: 2, 
    question: "Sexe femení, monosomia del cromosoma X", 
    answer: "45,X (Síndrome de Turner)", 
    difficulty: 'easy', 
    points: 100, 
    isPlayed: false, 
    category: 'B' 
  },
  { 
    id: 3, 
    question: "47,XX,+18", 
    answer: "Sexe femení, Síndrome de Edwards per trisomia 18 lliure.", 
    difficulty: 'easy', 
    points: 100, 
    isPlayed: false, 
    category: 'A' 
  },
  { 
    id: 4, 
    question: "47,XY,+13", 
    answer: "Sexe masculí, Síndrome de Patau per trisomia 13 lliure.", 
    difficulty: 'easy', 
    points: 100, 
    isPlayed: false, 
    category: 'A' 
  },
  { 
    id: 5, 
    question: "Sexe masculí, trisomia del cromosoma 8", 
    answer: "47,XY,+8", 
    difficulty: 'easy', 
    points: 100, 
    isPlayed: false, 
    category: 'B',
  },
  { 
    id: 6, 
    question: "Síndrome de Klinefelter: sexe masculí, cromosoma X addicional", 
    answer: "47, XXY", 
    difficulty: 'easy', 
    points: 100, 
    isPlayed: false, 
    category: 'A',
  },
  
  // Medium (200 points)
  { 
    id: 7, 
    question: "46,XY,del(5)(p15)", 
    answer: "Síndrome del 'Cri du Chat'. Deleció terminal del braç curt del cromosoma 5 a la banda 5 de la regió 1, sexe masculí", 
    difficulty: 'medium', 
    points: 200, 
    isPlayed: false, 
    category: 'A' 
  },
  { 
    id: 8, 
    question: "Sexe femení amb deleció del braç curt del cromosoma 4 a partir de la banda 6 de la regió 1", 
    answer: "46,XX,del(4)(p16) (Síndrome de Wolf-Hirschhorn)", 
    difficulty: 'medium', 
    points: 200, 
    isPlayed: false, 
    category: 'B' 
  },
  { 
    id: 9, 
    question: "46,XX,inv(9)(p11q13)", 
    answer: "Inversió pericèntrica del cromosoma 9 entre les bandes 1 i 3 de la regió 1, sexe femení", 
    difficulty: 'medium', 
    points: 200, 
    isPlayed: false, 
    category: 'A' 
  },
  { 
    id: 10, 
    question: "Triploïdia amb sexe masculí", 
    answer: "69,XXY o 69,XYY", 
    difficulty: 'medium', 
    points: 200, 
    isPlayed: false, 
    category: 'B' 
  },
  { 
    id: 11, 
    question: "46,XY,dup(1)(q21q42)", 
    answer: "Duplicació intersticial al braç llarg del cromosoma 1 del segment comprès entre la banda 1 de la regió 2 i banda 2 de la regió 4", 
    difficulty: 'medium', 
    points: 200, 
    isPlayed: false, 
    category: 'A' 
  },

  // Hard (300-500 points)
  { 
    id: 12, 
    question: "46,XX,t(9;22)(q34;q11)", 
    answer: "Sexe femení, 46 cromosomes, presenta una translocació recíproca entre el cromosoma 9 i el cromosoma 22. El punt de trencament al cromosoma 9 es localitza al braç llarg a la banda 4 de la regió 3, i el punt de trencament al cromosoma 22 es localitza al braç llarg a la banda 1 de la regió 1.", 
    difficulty: 'hard', 
    points: 300, 
    isPlayed: false, 
    category: 'C' 
  },
  { 
    id: 13, 
    question: "46,XY,ins(12;5)(q23;p14p12)", 
    answer: "Sexe masculí, 46 cromosomes, inserció d'un segment del braç curt del cromosoma 5 (entre les bandes 4 i 2 de la regió 1) dins del braç llarg del cromosoma 12 a la banda 3 de la regió 2.", 
    difficulty: 'hard', 
    points: 300, 
    isPlayed: false, 
    category: 'C' 
  },
  { 
    id: 14, 
    question: "Sexe femení, 46 cromosomes, inserció d'un segment del braç curt del cromosoma 3 (entre les bandes 4 i 2 de la regió 2) dins del braç llarg del mateix cromosoma 3 a la banda 5 de la regió 2", 
    answer: "46,XX,ins(3)(q25p24p22)", 
    difficulty: 'hard', 
    points: 400, 
    isPlayed: false, 
    category: 'C' 
  },
  { 
    id: 15, 
    question: "mos 45,X[15]/46,XX[35]", 
    answer: "Mosaicisme: línia cel·lular amb monosomia X (15 extensions) i una altra normal (35).", 
    difficulty: 'hard', 
    points: 300, 
    isPlayed: false, 
    category: 'C' 
  },
  { 
    id: 16, 
    question: "Mosaïcisme, sexe femení: 20 extensions presenten un cromosoma X en anell format per la fusió dels punts de trencament a p22 i q28, mentre que unes altres 30 extensions presenten un cromosoma X amb una inserció del segment entre les bandes 1 i 4 de la regió 2 dins del seu propi braç llarg, a la banda 1 de la regió 2.", 
    answer: "mos 46,X,r(X)(p22q28)[20]/46,X,ins(X)(p21q21q24)[30]", 
    difficulty: 'hard', 
    points: 500, 
    isPlayed: false, 
    category: 'C' 
  }
];

export const DEFAULT_EMOJIS = ['🧬', '🔬', '🧫', '🧪', '🩸', '🥽'];