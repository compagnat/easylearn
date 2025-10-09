// Test rapide de la logique des opérations
const { QuestionGenerator, LEVELS, OPERATIONS } = require('./frontend/src/math/operations/data/operationsConfig.js');

console.log('🧮 Test du générateur de questions mathématiques');
console.log('================================================');

// Test des différents niveaux et opérations
const testCases = [
  { level: LEVELS.BEGINNER, operation: OPERATIONS.ADDITION },
  { level: LEVELS.INTERMEDIATE, operation: OPERATIONS.SUBTRACTION },
  { level: LEVELS.ADVANCED, operation: OPERATIONS.MULTIPLICATION },
  { level: LEVELS.EXPERT, operation: OPERATIONS.DIVISION },
  { level: LEVELS.BEGINNER, operation: OPERATIONS.SQUARE_ROOT },
  { level: LEVELS.INTERMEDIATE, operation: OPERATIONS.MIXED }
];

testCases.forEach(({ level, operation }, index) => {
  try {
    const question = QuestionGenerator.generateQuestion(level, operation);
    console.log(`${index + 1}. [${level.toUpperCase()}] ${question.question} → Réponse: ${question.answer}`);
  } catch (error) {
    console.error(`❌ Erreur pour ${level} - ${operation}:`, error.message);
  }
});

console.log('\n✅ Tests terminés !');

// Test du calcul de pourcentage corrigé
console.log('\n📊 Test de calcul de pourcentage:');
let score = 3, answeredQuestions = 4;
let accuracy = answeredQuestions > 0 ? Math.round((score / answeredQuestions) * 100) : 0;
console.log(`Score: ${score}/${answeredQuestions} = ${accuracy}% (attendu: 75%)`);

score = 0, answeredQuestions = 0;
accuracy = answeredQuestions > 0 ? Math.round((score / answeredQuestions) * 100) : 0;
console.log(`Score: ${score}/${answeredQuestions} = ${accuracy}% (attendu: 0%)`);

console.log('✅ Calculs corrects !');