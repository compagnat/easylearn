// Données pour le quiz de mathématiques utilisant le framework
export const MATH_QUIZ_QUESTIONS = {
  addition: [
    // Niveau débutant
    {
      question: "Combien font 2 + 3 ?",
      answer: "5",
      options: ["4", "5", "6", "7"],
      level: 'debutant'
    },
    {
      question: "Combien font 7 + 4 ?",
      answer: "11",
      options: ["10", "11", "12", "13"],
      level: 'debutant'
    },
    {
      question: "Combien font 9 + 6 ?",
      answer: "15",
      options: ["14", "15", "16", "17"],
      level: 'debutant'
    },
    
    // Niveau élémentaire
    {
      question: "Combien font 25 + 37 ?",
      answer: "62",
      options: ["60", "61", "62", "63"],
      level: 'elementaire'
    },
    {
      question: "Combien font 48 + 29 ?",
      answer: "77",
      options: ["75", "76", "77", "78"],
      level: 'elementaire'
    },
    
    // Niveau intermédiaire
    {
      question: "Combien font 156 + 248 ?",
      answer: "404",
      options: ["402", "403", "404", "405"],
      level: 'intermediaire'
    },
    {
      question: "Combien font 789 + 321 ?",
      answer: "1110",
      options: ["1108", "1109", "1110", "1111"],
      level: 'intermediaire'
    }
  ],
  
  soustraction: [
    // Niveau débutant
    {
      question: "Combien font 8 - 3 ?",
      answer: "5",
      options: ["4", "5", "6", "7"],
      level: 'debutant'
    },
    {
      question: "Combien font 12 - 7 ?",
      answer: "5",
      options: ["4", "5", "6", "7"],
      level: 'debutant'
    },
    
    // Niveau élémentaire
    {
      question: "Combien font 45 - 18 ?",
      answer: "27",
      options: ["25", "26", "27", "28"],
      level: 'elementaire'
    },
    {
      question: "Combien font 73 - 29 ?",
      answer: "44",
      options: ["42", "43", "44", "45"],
      level: 'elementaire'
    },
    
    // Niveau intermédiaire
    {
      question: "Combien font 245 - 127 ?",
      answer: "118",
      options: ["116", "117", "118", "119"],
      level: 'intermediaire'
    }
  ],
  
  multiplication: [
    // Niveau débutant
    {
      question: "Combien font 3 × 4 ?",
      answer: "12",
      options: ["10", "11", "12", "13"],
      level: 'debutant'
    },
    {
      question: "Combien font 5 × 6 ?",
      answer: "30",
      options: ["28", "29", "30", "31"],
      level: 'debutant'
    },
    
    // Niveau élémentaire
    {
      question: "Combien font 12 × 7 ?",
      answer: "84",
      options: ["82", "83", "84", "85"],
      level: 'elementaire'
    },
    {
      question: "Combien font 15 × 8 ?",
      answer: "120",
      options: ["118", "119", "120", "121"],
      level: 'elementaire'
    },
    
    // Niveau intermédiaire
    {
      question: "Combien font 24 × 15 ?",
      answer: "360",
      options: ["358", "359", "360", "361"],
      level: 'intermediaire'
    }
  ],
  
  division: [
    // Niveau débutant
    {
      question: "Combien font 15 ÷ 3 ?",
      answer: "5",
      options: ["4", "5", "6", "7"],
      level: 'debutant'
    },
    {
      question: "Combien font 24 ÷ 6 ?",
      answer: "4",
      options: ["3", "4", "5", "6"],
      level: 'debutant'
    },
    
    // Niveau élémentaire
    {
      question: "Combien font 72 ÷ 8 ?",
      answer: "9",
      options: ["8", "9", "10", "11"],
      level: 'elementaire'
    },
    {
      question: "Combien font 96 ÷ 12 ?",
      answer: "8",
      options: ["6", "7", "8", "9"],
      level: 'elementaire'
    },
    
    // Niveau intermédiaire
    {
      question: "Combien font 144 ÷ 16 ?",
      answer: "9",
      options: ["8", "9", "10", "11"],
      level: 'intermediaire'
    }
  ],
  
  fractions: [
    // Niveau intermédiaire
    {
      question: "Combien font 1/2 + 1/4 ?",
      answer: "3/4",
      options: ["1/2", "2/3", "3/4", "4/5"],
      level: 'intermediaire'
    },
    {
      question: "Quelle est la moitié de 1/4 ?",
      answer: "1/8",
      options: ["1/6", "1/7", "1/8", "1/9"],
      level: 'intermediaire'
    }
  ],
  
  geometrie: [
    // Niveau avancé
    {
      question: "Combien d'angles a un triangle ?",
      answer: "3",
      options: ["2", "3", "4", "5"],
      level: 'avance'
    },
    {
      question: "Quelle est l'aire d'un carré de côté 5 cm ?",
      answer: "25 cm²",
      options: ["20 cm²", "25 cm²", "30 cm²", "35 cm²"],
      level: 'avance'
    }
  ]
};