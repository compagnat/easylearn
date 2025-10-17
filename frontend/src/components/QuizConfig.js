import { 
  Globe, 
  MapPin, 
  Target,
  Trophy,
  Compass,
  Mountain,
  Flag,
  Calculator,
  BookOpen,
  Beaker,
  Lightbulb
} from 'lucide-react';

// Configuration pour le quiz de géographie
export const geoQuizConfig = {
  title: "Pratiquer la Géographie",
  description: "Découvrez le monde ! Apprenez les continents, pays, capitales et monuments célèbres.",
  icon: Globe,
  questionCount: 10,
  
  levels: [
    {
      id: 'debutant',
      name: 'Débutant',
      description: 'Découvrir les continents et les océans',
      icon: '🌍'
    },
    {
      id: 'elementaire',
      name: 'Élémentaire',
      description: 'Apprendre les pays et leurs formes',
      icon: '🗺️'
    },
    {
      id: 'intermediaire',
      name: 'Intermédiaire',
      description: 'Maîtriser les capitales et monuments',
      icon: '🏛️'
    },
    {
      id: 'avance',
      name: 'Avancé',
      description: 'Expert en géographie mondiale',
      icon: '🎓'
    }
  ],
  
  categories: [
    {
      id: 'continents',
      name: 'Continents',
      icon: Globe
    },
    {
      id: 'pays',
      name: 'Pays',
      icon: Flag
    },
    {
      id: 'capitales',
      name: 'Capitales',
      icon: MapPin
    },
    {
      id: 'oceans',
      name: 'Océans',
      icon: Compass
    },
    {
      id: 'monuments',
      name: 'Monuments célèbres',
      icon: Mountain
    },
    {
      id: 'mixed',
      name: 'Mélange de tout',
      icon: Target
    }
  ]
};

// Configuration pour un quiz de mathématiques (exemple)
export const mathQuizConfig = {
  title: "Pratiquer les Mathématiques",
  description: "Entraînez-vous aux calculs et améliorez vos compétences mathématiques avec des exercices adaptés à votre niveau.",
  icon: Calculator,
  questionCount: 10,
  
  levels: [
    {
      id: 'debutant',
      name: 'Débutant',
      description: 'Addition et soustraction simples',
      icon: '🔢'
    },
    {
      id: 'elementaire',
      name: 'Élémentaire',
      description: 'Multiplication et division',
      icon: '➕'
    },
    {
      id: 'intermediaire',
      name: 'Intermédiaire',
      description: 'Fractions et pourcentages',
      icon: '📊'
    },
    {
      id: 'avance',
      name: 'Avancé',
      description: 'Équations et géométrie',
      icon: '📐'
    }
  ],
  
  categories: [
    {
      id: 'addition',
      name: 'Addition',
      icon: Calculator
    },
    {
      id: 'soustraction',
      name: 'Soustraction',
      icon: Calculator
    },
    {
      id: 'multiplication',
      name: 'Multiplication',
      icon: Calculator
    },
    {
      id: 'division',
      name: 'Division',
      icon: Calculator
    },
    {
      id: 'mixed',
      name: 'Mélange',
      icon: Target
    }
  ]
};

// Configuration pour un quiz de sciences (exemple)
export const scienceQuizConfig = {
  title: "Découvrir les Sciences",
  description: "Explorez le monde fascinant des sciences : physique, chimie, biologie et bien plus !",
  icon: Beaker,
  questionCount: 10,
  
  levels: [
    {
      id: 'debutant',
      name: 'Débutant',
      description: 'Notions de base',
      icon: '🧪'
    },
    {
      id: 'elementaire',
      name: 'Élémentaire',
      description: 'Sciences de la vie',
      icon: '🌱'
    },
    {
      id: 'intermediaire',
      name: 'Intermédiaire',
      description: 'Physique et chimie',
      icon: '⚗️'
    },
    {
      id: 'avance',
      name: 'Avancé',
      description: 'Sciences avancées',
      icon: '🚀'
    }
  ],
  
  categories: [
    {
      id: 'biologie',
      name: 'Biologie',
      icon: Beaker
    },
    {
      id: 'physique',
      name: 'Physique',
      icon: Lightbulb
    },
    {
      id: 'chimie',
      name: 'Chimie',
      icon: Beaker
    },
    {
      id: 'astronomie',
      name: 'Astronomie',
      icon: Target
    },
    {
      id: 'mixed',
      name: 'Toutes les sciences',
      icon: BookOpen
    }
  ]
};

// Exemple de structure de données pour les questions
export const sampleQuestionsData = {
  // Questions de géographie - continents
  continents: [
    {
      question: "Quel continent est le plus grand ?",
      answer: "Asie",
      options: ["Asie", "Afrique", "Europe", "Amérique"],
      level: 'debutant'
    },
    {
      question: "Sur quel continent se trouve le Canada ?",
      answer: "Amérique du Nord",
      options: ["Amérique du Nord", "Europe", "Asie", "Afrique"],
      level: 'debutant'
    },
    {
      question: "Combien y a-t-il de continents ?",
      answer: "7",
      options: ["5", "6", "7", "8"],
      level: 'debutant'
    }
  ],
  
  // Questions de mathématiques - addition
  addition: [
    {
      question: "Combien font 5 + 3 ?",
      answer: "8",
      options: ["7", "8", "9", "10"],
      level: 'debutant'
    },
    {
      question: "Combien font 12 + 15 ?",
      answer: "27",
      options: ["25", "26", "27", "28"],
      level: 'elementaire'
    },
    {
      question: "Combien font 125 + 89 ?",
      answer: "214",
      options: ["213", "214", "215", "216"],
      level: 'intermediaire'
    }
  ],
  
  // Questions de sciences - biologie
  biologie: [
    {
      question: "Quel est l'organe qui pompe le sang ?",
      answer: "Le cœur",
      options: ["Le cœur", "Les poumons", "Le foie", "Les reins"],
      level: 'debutant'
    },
    {
      question: "Combien de chambres a le cœur humain ?",
      answer: "4",
      options: ["2", "3", "4", "5"],
      level: 'elementaire'
    }
  ]
};