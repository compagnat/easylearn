import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
import { 
  CheckCircle, 
  XCircle, 
  SkipForward, 
  RotateCcw, 
  Trophy,
  Clock,
  Target
} from 'lucide-react';
import { QuestionGenerator } from '../data/operationsConfig';
import AnimationManager from '../../../components/animations/AnimationManager';
import { useSoundManager } from '../../../components/animations/SoundManager';

const QuestionDisplay = ({ 
  selectedLevel, 
  selectedOperation, 
  onBack,
  questionCount = 10 
}) => {
  const { playClick } = useSoundManager();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0); // Nombre de questions réellement répondues
  const [isAnswered, setIsAnswered] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationType, setAnimationType] = useState(null);
  const [timeStarted, setTimeStarted] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    generateNewQuestion();
    setTimeStarted(Date.now());
  }, [selectedLevel, selectedOperation]);

  const generateNewQuestion = () => {
    const question = QuestionGenerator.generateQuestion(selectedLevel, selectedOperation);
    setCurrentQuestion(question);
    setUserAnswer('');
    setIsAnswered(false);
    setQuestionStartTime(Date.now());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAnswered || !userAnswer.trim()) return;

    const userNumAnswer = parseFloat(userAnswer);
    const isCorrect = Math.abs(userNumAnswer - currentQuestion.answer) < 0.001;

    setIsAnswered(true);
    setAnsweredQuestions(prev => prev + 1); // Incrémenter le compteur de questions répondues

    if (isCorrect) {
      setScore(prev => prev + 1);
      setAnimationType('success');
      setShowAnimation(true);
      
      // Auto-passer à la question suivante après 2 secondes
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
      // Fin du quiz
      const endTime = Date.now();
      setTotalTime(Math.round((endTime - timeStarted) / 1000));
      setIsFinished(true);
    } else {
      setQuestionNumber(prev => prev + 1);
      generateNewQuestion();
    }
  };

  const handleRetry = () => {
    setUserAnswer('');
    setIsAnswered(false);
  };

  const handleSkip = () => {
    setAnsweredQuestions(prev => prev + 1); // Compter le skip comme une question répondue
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

  const progress = ((questionNumber - 1) / questionCount) * 100;
  const accuracy = answeredQuestions > 0 ? Math.round((score / answeredQuestions) * 100) : 0;

  if (isFinished) {
    return (
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
            <CardTitle className="text-3xl text-blue-600">Terminé !</CardTitle>
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
                  <Badge className="bg-gold text-yellow-800 text-lg px-4 py-2">
                    🌟 Score Parfait ! 🌟
                  </Badge>
                </motion.div>
              )}

              {score >= questionCount * 0.8 && score < questionCount && (
                <Badge variant="secondary" className="text-lg px-4 py-2">
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
              <Button 
                onClick={() => {
                  playClick();
                  handleRestart();
                }} 
                className="bg-blue-500 hover:bg-blue-600"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Recommencer
              </Button>
              <Button 
                onClick={() => {
                  playClick();
                  onBack();
                }} 
                variant="outline"
              >
                Changer de niveau
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!currentQuestion) {
    return <div className="text-center">Génération de la question...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Barre de progression et statistiques */}
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

      {/* Question principale */}
      <motion.div
        key={questionNumber}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-4xl text-gray-800 mb-4">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="max-w-xs mx-auto">
                <Input
                  type="number"
                  step="any"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Votre réponse"
                  className="text-center text-2xl h-16"
                  disabled={isAnswered}
                  autoFocus
                />
              </div>
              
              <div className="flex justify-center space-x-4">
                {!isAnswered && (
                  <Button 
                    type="submit" 
                    size="lg"
                    className="bg-green-500 hover:bg-green-600"
                    disabled={!userAnswer.trim()}
                    onClick={() => playClick()}
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Valider
                  </Button>
                )}
                
                {!isAnswered && (
                  <Button 
                    type="button"
                    onClick={() => {
                      playClick();
                      handleSkip();
                    }}
                    variant="outline"
                    size="lg"
                  >
                    <SkipForward className="w-5 h-5 mr-2" />
                    Passer
                  </Button>
                )}
              </div>

              {isAnswered && animationType === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600"
                >
                  <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-xl font-semibold">Correct ! 🎉</p>
                  <p className="text-sm">Passage à la question suivante...</p>
                </motion.div>
              )}
            </form>
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
  );
};

export default QuestionDisplay;