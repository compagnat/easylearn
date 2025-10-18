import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  Target,
  Trophy,
  CheckCircle,
  XCircle,
  SkipForward,
  RotateCcw,
  Clock
} from 'lucide-react';
import AnimationManager from './animations/AnimationManager';
import { useSoundManager } from './animations/SoundManager';

// Générateur de questions générique
class QuestionGenerator {
  static generateQuestion(level, category, questionsData) {
    if (category === 'mixed') {
      // Pour mixed, prendre une catégorie aléatoire parmi celles disponibles pour le niveau
      const availableCategories = Object.keys(questionsData).filter(c => c !== 'mixed');
      category = availableCategories[Math.floor(Math.random() * availableCategories.length)];
    }

    const questions = questionsData[category] || [];
    if (questions.length === 0) return null;

    // Filtrer par niveau si spécifié dans les questions
    const levelQuestions = questions.filter(q => !q.level || q.level === level);
    const finalQuestions = levelQuestions.length > 0 ? levelQuestions : questions;

    if (finalQuestions.length === 0) return null;

    const question = finalQuestions[Math.floor(Math.random() * finalQuestions.length)];
    return { ...question, category };
  }
}

const QuizFramework = ({
  title,
  description,
  icon: MainIcon,
  levels,
  categories,
  questionsData,
  questionCount = 10
}) => {
  const { playClick, playSuccess, playError } = useSoundManager();
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
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationType, setAnimationType] = useState(null);

  useEffect(() => {
    if (gameStarted && selectedLevel && selectedCategory) {
      generateNewQuestion();
      setTimeStarted(Date.now());
    }
  }, [gameStarted, selectedLevel, selectedCategory]);

  const generateNewQuestion = () => {
    if (!selectedLevel || !selectedCategory) {
      return;
    }
    
    const question = QuestionGenerator.generateQuestion(selectedLevel, selectedCategory, questionsData);
    
    if (!question) {
      console.error('No question generated for level:', selectedLevel, 'category:', selectedCategory);
      return;
    }
    
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuestionStartTime(Date.now());
  };

  const handleAnswerSelect = (answer) => {
    if (isAnswered) return;
    
    playClick();
    setSelectedAnswer(answer);
    setIsAnswered(true);
    setAnsweredQuestions(prev => prev + 1);

    const isCorrect = answer === currentQuestion.answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setAnimationType('success');
      setShowAnimation(true);
      
      setTimeout(() => {
        handleNext();
      }, 2000);
    } else {
      setAnimationType('error');
      setShowAnimation(true);
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
    playClick();
    setAnsweredQuestions(prev => prev + 1);
    handleNext();
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleRestart = () => {
    playClick();
    setQuestionNumber(1);
    setScore(0);
    setAnsweredQuestions(0);
    setIsFinished(false);
    setTimeStarted(Date.now());
    generateNewQuestion();
  };

  const handleBackToSelection = () => {
    playClick();
    setGameStarted(false);
    setCurrentQuestion(null);
  };

  const handleStart = () => {
    if (selectedLevel && selectedCategory) {
      playClick();
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
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Badge className="bg-yellow-400 text-yellow-900 text-lg px-4 py-2">
                      🌟 Score Parfait ! 🌟
                    </Badge>
                  </motion.div>
                )}

                {score >= questionCount * 0.8 && score < questionCount && (
                  <Badge className="bg-green-500 text-white text-lg px-4 py-2">
                    🎯 Excellent travail !
                  </Badge>
                )}

                {score >= questionCount * 0.6 && score < questionCount * 0.8 && (
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    👍 Bien joué !
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
                <div className="flex items-center space-x-4">
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
                      📊 {accuracy}% de réussite
                    </Badge>
                  )}
                </div>
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
                {/* Affichage de l'image si disponible */}
                {currentQuestion.image && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center mt-4"
                  >
                    <img 
                      src={currentQuestion.image} 
                      alt="Illustration de la question"
                      className="max-w-xs max-h-48 rounded-xl shadow-lg object-cover border-4 border-blue-200 hover:border-blue-300 transition-colors duration-300"
                      loading="lazy"
                    />
                  </motion.div>
                )}
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

          {/* Gestionnaire d'animations */}
          <AnimationManager
            type={animationType}
            show={showAnimation}
            onComplete={() => setShowAnimation(false)}
            onRetry={handleRetry}
            onSkip={handleSkip}
          />
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
          <MainIcon size={48} className="text-blue-600" />
          <h1 className="text-5xl font-bold text-gray-900">
            {title}
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      </motion.div>

      {/* Sélection du niveau */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Choisissez votre niveau
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                className={`cursor-pointer transition-all ${
                  selectedLevel === level.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => {
                  playClick();
                  setSelectedLevel(level.id);
                }}
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
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedCategory === category.id ? 'ring-2 ring-green-500 bg-green-50' : ''
                    }`}
                    onClick={() => {
                      playClick();
                      setSelectedCategory(category.id);
                    }}
                  >
                    <CardHeader className="text-center pb-2">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center mb-2">
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <CardTitle className="text-sm">{category.name}</CardTitle>
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
                <MainIcon className="w-5 h-5 mr-2" />
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

export default QuizFramework;