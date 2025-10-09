// Configuration des niveaux et opérations mathématiques

export const OPERATIONS = {
  ADDITION: 'addition',
  SUBTRACTION: 'soustraction', 
  MULTIPLICATION: 'multiplication',
  DIVISION: 'division',
  SQUARE_ROOT: 'racine_carree',
  MIXED: 'melange'
};

export const LEVELS = {
  BEGINNER: 'debutant',
  INTERMEDIATE: 'intermediaire', 
  ADVANCED: 'avance',
  EXPERT: 'expert'
};

export const LEVEL_CONFIG = {
  [LEVELS.BEGINNER]: {
    name: 'Débutant',
    description: 'Opérations simples pour commencer',
    icon: '🌱',
    operations: {
      [OPERATIONS.ADDITION]: {
        min: 1, max: 9,
        negativeAllowed: false,
        maxResult: 18
      },
      [OPERATIONS.SUBTRACTION]: {
        min: 1, max: 9,
        negativeAllowed: false,
        minResult: 0
      },
      [OPERATIONS.MULTIPLICATION]: {
        min: 1, max: 5,
        negativeAllowed: false,
        maxResult: 25
      },
      [OPERATIONS.DIVISION]: {
        dividends: [1, 2, 3, 4, 6, 8, 9, 12, 16],
        exactResults: true
      },
      [OPERATIONS.SQUARE_ROOT]: {
        perfectSquares: [1, 4, 9, 16]
      }
    }
  },
  
  [LEVELS.INTERMEDIATE]: {
    name: 'Intermédiaire',
    description: 'Nombres plus grands et négatifs',
    icon: '🌿',
    operations: {
      [OPERATIONS.ADDITION]: {
        min: -9, max: 15,
        negativeAllowed: true,
        maxResult: 30
      },
      [OPERATIONS.SUBTRACTION]: {
        min: -9, max: 15,
        negativeAllowed: true,
        minResult: -24
      },
      [OPERATIONS.MULTIPLICATION]: {
        min: 1, max: 9,
        negativeAllowed: false,
        maxResult: 81
      },
      [OPERATIONS.DIVISION]: {
        maxDividend: 81,
        exactResults: true,
        negativeAllowed: false
      },
      [OPERATIONS.SQUARE_ROOT]: {
        maxPerfectSquare: 81
      }
    }
  },
  
  [LEVELS.ADVANCED]: {
    name: 'Avancé',
    description: 'Calculs complexes avec nombres négatifs',
    icon: '🌳',
    operations: {
      [OPERATIONS.ADDITION]: {
        min: -99, max: 99,
        negativeAllowed: true,
        maxResult: 198
      },
      [OPERATIONS.SUBTRACTION]: {
        min: -99, max: 99,
        negativeAllowed: true,
        minResult: -198
      },
      [OPERATIONS.MULTIPLICATION]: {
        min: -12, max: 12,
        negativeAllowed: true,
        maxResult: 144
      },
      [OPERATIONS.DIVISION]: {
        min: -144, max: 144,
        exactResults: true,
        negativeAllowed: true
      },
      [OPERATIONS.SQUARE_ROOT]: {
        maxPerfectSquare: 144,
        negativeAllowed: false
      }
    }
  },
  
  [LEVELS.EXPERT]: {
    name: 'Expert',
    description: 'Défis mathématiques pour les experts',
    icon: '🏆',
    operations: {
      [OPERATIONS.ADDITION]: {
        min: -999, max: 999,
        negativeAllowed: true,
        maxResult: 1998
      },
      [OPERATIONS.SUBTRACTION]: {
        min: -999, max: 999,
        negativeAllowed: true,
        minResult: -1998
      },
      [OPERATIONS.MULTIPLICATION]: {
        min: -20, max: 20,
        negativeAllowed: true,
        maxResult: 400
      },
      [OPERATIONS.DIVISION]: {
        min: -400, max: 400,
        exactResults: true,
        negativeAllowed: true
      },
      [OPERATIONS.SQUARE_ROOT]: {
        maxPerfectSquare: 400,
        negativeAllowed: false
      }
    }
  }
};

export const OPERATION_LABELS = {
  [OPERATIONS.ADDITION]: 'Addition',
  [OPERATIONS.SUBTRACTION]: 'Soustraction',
  [OPERATIONS.MULTIPLICATION]: 'Multiplication', 
  [OPERATIONS.DIVISION]: 'Division',
  [OPERATIONS.SQUARE_ROOT]: 'Racine carrée',
  [OPERATIONS.MIXED]: 'Un mélange de tous'
};

export const OPERATION_SYMBOLS = {
  [OPERATIONS.ADDITION]: '+',
  [OPERATIONS.SUBTRACTION]: '-',
  [OPERATIONS.MULTIPLICATION]: '×',
  [OPERATIONS.DIVISION]: '÷',
  [OPERATIONS.SQUARE_ROOT]: '√'
};

// Générateur de questions
export class QuestionGenerator {
  static generateQuestion(level, operation) {
    const config = LEVEL_CONFIG[level].operations[operation];
    
    switch (operation) {
      case OPERATIONS.ADDITION:
        return this.generateAddition(config);
      case OPERATIONS.SUBTRACTION:
        return this.generateSubtraction(config);
      case OPERATIONS.MULTIPLICATION:
        return this.generateMultiplication(config);
      case OPERATIONS.DIVISION:
        return this.generateDivision(config, level);
      case OPERATIONS.SQUARE_ROOT:
        return this.generateSquareRoot(config, level);
      case OPERATIONS.MIXED:
        return this.generateMixed(level);
      default:
        return null;
    }
  }
  
  static generateAddition(config) {
    const a = this.randomInRange(config.min, config.max);
    const b = this.randomInRange(config.min, config.max);
    
    return {
      question: `${a} + ${b} = ?`,
      answer: a + b,
      operation: OPERATIONS.ADDITION,
      operands: [a, b]
    };
  }
  
  static generateSubtraction(config) {
    const a = this.randomInRange(config.min, config.max);
    const b = this.randomInRange(config.min, config.max);
    
    return {
      question: `${a} - ${b} = ?`,
      answer: a - b,
      operation: OPERATIONS.SUBTRACTION,
      operands: [a, b]
    };
  }
  
  static generateMultiplication(config) {
    const a = this.randomInRange(config.min, config.max);
    const b = this.randomInRange(config.min, config.max);
    
    return {
      question: `${a} × ${b} = ?`,
      answer: a * b,
      operation: OPERATIONS.MULTIPLICATION,
      operands: [a, b]
    };
  }
  
  static generateDivision(config, level) {
    if (level === LEVELS.BEGINNER) {
      const dividends = config.dividends;
      const dividend = dividends[Math.floor(Math.random() * dividends.length)];
      const divisors = this.getDivisors(dividend).filter(d => d !== dividend);
      const divisor = divisors[Math.floor(Math.random() * divisors.length)];
      
      return {
        question: `${dividend} ÷ ${divisor} = ?`,
        answer: dividend / divisor,
        operation: OPERATIONS.DIVISION,
        operands: [dividend, divisor]
      };
    }
    
    // Pour les autres niveaux, générer division avec résultats exacts
    const result = this.randomInRange(1, 20);
    const divisor = this.randomInRange(2, 12);
    const dividend = result * divisor;
    
    if (config.negativeAllowed && Math.random() < 0.3) {
      const makeNegative = Math.random() < 0.5;
      return {
        question: `${makeNegative ? -dividend : dividend} ÷ ${makeNegative ? divisor : -divisor} = ?`,
        answer: makeNegative ? -result : result,
        operation: OPERATIONS.DIVISION,
        operands: [makeNegative ? -dividend : dividend, makeNegative ? divisor : -divisor]
      };
    }
    
    return {
      question: `${dividend} ÷ ${divisor} = ?`,
      answer: result,
      operation: OPERATIONS.DIVISION,
      operands: [dividend, divisor]
    };
  }
  
  static generateSquareRoot(config, level) {
    if (level === LEVELS.BEGINNER) {
      const squares = config.perfectSquares;
      const square = squares[Math.floor(Math.random() * squares.length)];
      
      return {
        question: `√${square} = ?`,
        answer: Math.sqrt(square),
        operation: OPERATIONS.SQUARE_ROOT,
        operands: [square]
      };
    }
    
    // Pour les autres niveaux
    const maxRoot = Math.floor(Math.sqrt(config.maxPerfectSquare));
    const root = this.randomInRange(1, maxRoot);
    const square = root * root;
    
    return {
      question: `√${square} = ?`,
      answer: root,
      operation: OPERATIONS.SQUARE_ROOT,
      operands: [square]
    };
  }
  
  static generateMixed(level) {
    const availableOps = [
      OPERATIONS.ADDITION,
      OPERATIONS.SUBTRACTION,
      OPERATIONS.MULTIPLICATION,
      OPERATIONS.DIVISION,
      OPERATIONS.SQUARE_ROOT
    ];
    
    const randomOp = availableOps[Math.floor(Math.random() * availableOps.length)];
    return this.generateQuestion(level, randomOp);
  }
  
  static randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  static getDivisors(n) {
    const divisors = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) {
        divisors.push(i);
      }
    }
    return divisors;
  }
}

export default {
  OPERATIONS,
  LEVELS,
  LEVEL_CONFIG,
  OPERATION_LABELS,
  OPERATION_SYMBOLS,
  QuestionGenerator
};