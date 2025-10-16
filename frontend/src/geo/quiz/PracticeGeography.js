import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Globe, 
  MapPin, 
  Target,
  Trophy,
  CheckCircle,
  XCircle,
  SkipForward,
  RotateCcw,
  Compass,
  Mountain,
  Flag
} from 'lucide-react';
import { CATEGORIES, GEOGRAPHY_QUESTIONS } from './data';
import { LEVELS } from '@/data/Main';




const LEVEL_CONFIG = {
  [LEVELS.BEGINNER]: {
    name: 'Débutant',
    description: 'Découvrir les continents et les océans',
    icon: '🌍',
    categories: [CATEGORIES.CONTINENTS, CATEGORIES.OCEANS]
  },
  [LEVELS.ELEMENTARY]: {
    name: 'Élémentaire',
    description: 'Apprendre les pays et leurs formes',
    icon: '🗺️',
    categories: [CATEGORIES.CONTINENTS, CATEGORIES.COUNTRIES, CATEGORIES.OCEANS]
  },
  [LEVELS.INTERMEDIATE]: {
    name: 'Intermédiaire',
    description: 'Maîtriser les capitales et monuments',
    icon: '🏛️',
    categories: [CATEGORIES.COUNTRIES, CATEGORIES.CAPITALS, CATEGORIES.LANDMARKS]
  },
  [LEVELS.ADVANCED]: {
    name: 'Avancé',
    description: 'Expert en géographie mondiale',
    icon: '🎓',
    categories: Object.values(CATEGORIES).filter(c => c !== CATEGORIES.MIXED)
  }
};

const CATEGORY_LABELS = {
  [CATEGORIES.CONTINENTS]: 'Continents',
  [CATEGORIES.COUNTRIES]: 'Pays',
  [CATEGORIES.CAPITALS]: 'Capitales',
  [CATEGORIES.OCEANS]: 'Océans',
  [CATEGORIES.LANDMARKS]: 'Monuments célèbres',
  [CATEGORIES.MIXED]: 'Mélange de tout'
};

const CATEGORY_ICONS = {
  [CATEGORIES.CONTINENTS]: Globe,
  [CATEGORIES.COUNTRIES]: Flag,
  [CATEGORIES.CAPITALS]: MapPin,
  [CATEGORIES.OCEANS]: Compass,
  [CATEGORIES.LANDMARKS]: Mountain,
  [CATEGORIES.MIXED]: Target
};


// Générateur de questions
class QuestionGenerator {
  static generateQuestion(level, category) {
    if (category === CATEGORIES.MIXED) {
      const availableCategories = LEVEL_CONFIG[level].categories.filter(c => c !== CATEGORIES.MIXED);
      category = availableCategories[Math.floor(Math.random() * availableCategories.length)];
    }

    const questions = GEOGRAPHY_QUESTIONS[category] || [];
    if (questions.length === 0) return null;

    const question = questions[Math.floor(Math.random() * questions.length)];
    return { ...question, category };
  }
}

// Composant principal
const PracticeGeography = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeStarted, setTimeStarted] = useState(null);
  const [totalTime, setTotalTime] = useState(0);

  const questionCount = 10;

  useEffect(() => {
    if (gameStarted && !currentQuestion) {
      generateNewQuestion();
      setTimeStarted(Date.now());
    }
  }, [gameStarted]);

  const generateNewQuestion = () => {
    const question = QuestionGenerator.generateQuestion(selectedLevel, selectedCategory);
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleAnswerSelect = (answer) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    setAnsweredQuestions(prev => prev + 1);

    const isCorrect = answer === currentQuestion.answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setTimeout(() => {
        handleNext();
      }, 2000);
    }
  };

  const handleNext = () => {
    if (questionNumber >= questionCount) {
      const endTime = Date.now();
      setTotalTime(Math.round((endTime - timeStarted) / 1000));
      setIsFinished(true);
    } else {
      setQuestionNumber(prev => prev + 1);
      generateNewQuestion();
    }
  };

  const handleSkip = () => {
    setAnsweredQuestions(prev => prev + 1);
    handleNext();
  };

  const handleRestart = () => {
    setQuestionNumber(1);
    setScore(0);
    setAnsweredQuestions(0);
    setIsFinished(false);
    setTimeStarted(Date.now());
    generateNewQuestion();
  };

  const handleBackToSelection = () => {
    setGameStarted(false);
    setCurrentQuestion(null);
  };

  const handleStart = () => {
    if (selectedLevel && selectedCategory) {
      setGameStarted(true);
    }
  };

  const progress = ((questionNumber - 1) / questionCount) * 100;
  const accuracy = answeredQuestions > 0 ? Math.round((score / answeredQuestions) * 100) : 0;

  // Écran de résultats
  if (isFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="text-center">
            <CardHeader>
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 1 }}
                className="text-6xl mb-4"
              >
                🏆
              </motion.div>
              <CardTitle className="text-3xl text-blue-600">Bravo !</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">{score}/{questionCount}</div>
                  <div className="text-sm text-green-800">Bonnes réponses</div>
                </div>
                <div className="bg-blue-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{accuracy}%</div>
                  <div className="text-sm text-blue-800">Précision</div>
                </div>
                <div className="bg-purple-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">{totalTime}s</div>
                  <div className="text-sm text-purple-800">Temps total</div>
                </div>
                <div className="bg-yellow-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-600">
                    {Math.round(totalTime / questionCount)}s
                  </div>
                  <div className="text-sm text-yellow-800">Temps/question</div>
                </div>
              </div>

              <div className="space-y-3">
                {score === questionCount && (
                  <Badge className="bg-yellow-400 text-yellow-900 text-lg px-4 py-2">
                    🌟 Score Parfait ! 🌟
                  </Badge>
                )}
                {score >= questionCount * 0.8 && score < questionCount && (
                  <Badge className="bg-green-500 text-white text-lg px-4 py-2">
                    🎯 Excellent travail !
                  </Badge>
                )}
              </div>

              <div className="flex space-x-3 justify-center">
                <Button onClick={handleRestart} className="bg-blue-500 hover:bg-blue-600">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Recommencer
                </Button>
                <Button onClick={handleBackToSelection} variant="outline">
                  Changer de niveau
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Écran de jeu
  if (gameStarted && currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Button onClick={handleBackToSelection} variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <Badge variant="outline" className="px-3 py-1">
                  <Target className="w-4 h-4 mr-1" />
                  Question {questionNumber}/{questionCount}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  <Trophy className="w-4 h-4 mr-1" />
                  Score: {score}
                </Badge>
                {answeredQuestions > 0 && (
                  <Badge variant="outline" className="px-3 py-1">
                    📊 {accuracy}%
                  </Badge>
                )}
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>

          <motion.div
            key={questionNumber}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-center text-gray-800">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === currentQuestion.answer;
                    const showResult = isAnswered && isSelected;

                    return (
                      <motion.div
                        key={index}
                        whileHover={!isAnswered ? { scale: 1.02 } : {}}
                        whileTap={!isAnswered ? { scale: 0.98 } : {}}
                      >
                        <Button
                          onClick={() => handleAnswerSelect(option)}
                          disabled={isAnswered}
                          className={`w-full h-20 text-lg ${
                            showResult
                              ? isCorrect
                                ? 'bg-green-500 hover:bg-green-500'
                                : 'bg-red-500 hover:bg-red-500'
                              : 'bg-white text-gray-800 hover:bg-gray-100 border-2 border-gray-200'
                          }`}
                          variant={showResult ? "default" : "outline"}
                        >
                          {option}
                          {showResult && (
                            <span className="ml-2">
                              {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                            </span>
                          )}
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>

                {!isAnswered && (
                  <div className="flex justify-center">
                    <Button onClick={handleSkip} variant="outline">
                      <SkipForward className="w-4 h-4 mr-2" />
                      Passer
                    </Button>
                  </div>
                )}

                {isAnswered && selectedAnswer === currentQuestion.answer && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-600"
                  >
                    <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-xl font-semibold">Excellent ! 🎉</p>
                    <p className="text-sm">Passage à la question suivante...</p>
                  </motion.div>
                )}

                {isAnswered && selectedAnswer !== currentQuestion.answer && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <div className="bg-blue-100 rounded-lg p-4 mb-4">
                      <p className="text-blue-800">
                        La bonne réponse est : <strong>{currentQuestion.answer}</strong>
                      </p>
                    </div>
                    <Button onClick={handleNext}>
                      Continuer
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Écran de sélection
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Globe size={48} className="text-blue-600" />
          <h1 className="text-5xl font-bold text-gray-900">
            Pratiquer la Géographie
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Découvrez le monde ! Apprenez les continents, pays, capitales et monuments célèbres.
        </p>
      </motion.div>

      {/* Sélection du niveau */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Choisissez votre niveau
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {Object.entries(LEVEL_CONFIG).map(([key, level], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                className={`cursor-pointer transition-all ${
                  selectedLevel === key ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedLevel(key)}
              >
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{level.icon}</div>
                  <CardTitle className="text-lg">{level.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600">{level.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sélection de la catégorie */}
      {selectedLevel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Choisissez une catégorie
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {[...LEVEL_CONFIG[selectedLevel].categories, CATEGORIES.MIXED].map((category, index) => {
              const IconComponent = CATEGORY_ICONS[category];
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedCategory === category ? 'ring-2 ring-green-500 bg-green-50' : ''
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <CardHeader className="text-center pb-2">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center mb-2">
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <CardTitle className="text-sm">{CATEGORY_LABELS[category]}</CardTitle>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Bouton démarrer */}
      {selectedLevel && selectedCategory && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <Button onClick={handleStart} size="lg" className="w-full bg-green-500 hover:bg-green-600">
                <Globe className="w-5 h-5 mr-2" />
                Commencer l'aventure !
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                {questionCount} questions vous attendent
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default PracticeGeography;