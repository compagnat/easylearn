import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  ArrowLeft, 
  Target,
  Trophy,
  CheckCircle,
  XCircle,
  SkipForward
} from 'lucide-react';
import AnimationManager from '../animations/AnimationManager';

const GameScreen = ({
  question,
  questionNumber,
  questionCount,
  score,
  accuracy,
  progress,
  selectedAnswer,
  isAnswered,
  showAnimation,
  animationType,
  onAnswerSelect,
  onSkip,
  onNext,
  onRetry,
  onBack,
  onAnimationComplete
}) => {
  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Génération de la question...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Bouton retour */}
        <Button onClick={onBack} variant="outline" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

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
                {accuracy > 0 && (
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
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center text-gray-800">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Options de réponse */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === question.answer;
                  const showResult = isAnswered && isSelected;

                  return (
                    <motion.div
                      key={index}
                      whileHover={!isAnswered ? { scale: 1.02 } : {}}
                      whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    >
                      <Button
                        onClick={() => onAnswerSelect(option)}
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

              {/* Actions */}
              {!isAnswered && (
                <div className="flex justify-center">
                  <Button onClick={onSkip} variant="outline">
                    <SkipForward className="w-4 h-4 mr-2" />
                    Passer
                  </Button>
                </div>
              )}

              {/* Feedback après réponse */}
              {isAnswered && selectedAnswer === question.answer && (
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

              {isAnswered && selectedAnswer !== question.answer && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="bg-blue-100 rounded-lg p-4 mb-4">
                    <p className="text-blue-800">
                      La bonne réponse est : <strong>{question.answer}</strong>
                    </p>
                  </div>
                  <Button onClick={onNext}>
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
          onComplete={onAnimationComplete}
          onRetry={onRetry}
          onSkip={onSkip}
        />
      </div>
    </div>
  );
};

export default GameScreen;