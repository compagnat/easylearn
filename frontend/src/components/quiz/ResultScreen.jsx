import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { RotateCcw } from 'lucide-react';

const ResultScreen = ({
  score,
  questionCount,
  accuracy,
  totalTime,
  onRestart,
  onBackToSelection,
  onReset
}) => {
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
            {/* Statistiques */}
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

            {/* Badges de performance */}
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

              {score < questionCount * 0.6 && (
                <Badge variant="outline" className="text-lg px-4 py-2">
                  💪 Continuez à pratiquer !
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={onRestart} className="bg-blue-500 hover:bg-blue-600">
                <RotateCcw className="w-4 h-4 mr-2" />
                Recommencer
              </Button>
              <Button onClick={onBackToSelection} variant="outline">
                Changer de niveau
              </Button>
              <Button onClick={onReset} variant="outline">
                Nouveau quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResultScreen;