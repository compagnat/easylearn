import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Calculator, BookOpen, Target } from 'lucide-react';
import LevelSelector from './components/LevelSelector';
import OperationSelector from './components/OperationSelector';
import QuestionDisplay from './components/QuestionDisplay';
import { LEVEL_CONFIG, OPERATION_LABELS } from './data/operationsConfig';

const PracticeOperations = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStart = () => {
    if (selectedLevel && selectedOperation) {
      setGameStarted(true);
    }
  };

  const handleBack = () => {
    setGameStarted(false);
    setSelectedLevel(null);
    setSelectedOperation(null);
  };

  const handleBackToSelection = () => {
    setGameStarted(false);
  };

  if (gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header avec retour */}
          <div className="flex items-center justify-between mb-8">
            <Button 
              onClick={handleBackToSelection}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ArrowLeft size={20} />
              <span>Retour à la sélection</span>
            </Button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {LEVEL_CONFIG[selectedLevel].name} - {OPERATION_LABELS[selectedOperation]}
              </h1>
            </div>
            
            <div className="w-40"></div> {/* Spacer pour équilibrer */}
          </div>

          <QuestionDisplay 
            selectedLevel={selectedLevel}
            selectedOperation={selectedOperation}
            onBack={handleBackToSelection}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Calculator size={48} className="text-blue-600" />
            <h1 className="text-5xl font-bold text-gray-900">
              Pratiquer les Opérations
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entraînez-vous aux opérations mathématiques de base avec des exercices adaptés à votre niveau. 
            Choisissez votre niveau de difficulté et le type d'opérations à pratiquer.
          </p>
        </motion.div>

        {/* Sélection du niveau */}
        <LevelSelector 
          selectedLevel={selectedLevel}
          onLevelSelect={setSelectedLevel}
        />

        {/* Sélection de l'opération */}
        {selectedLevel && (
          <OperationSelector
            selectedLevel={selectedLevel}
            selectedOperation={selectedOperation}
            onOperationSelect={setSelectedOperation}
          />
        )}

        {/* Bouton de démarrage */}
        {selectedLevel && selectedOperation && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Target className="text-green-600" />
                  <span>Prêt à commencer ?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Niveau :</span>
                    <span className="font-semibold">{LEVEL_CONFIG[selectedLevel].name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Opération :</span>
                    <span className="font-semibold">{OPERATION_LABELS[selectedOperation]}</span>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={handleStart}
                    size="lg"
                    className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-3"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Commencer l'exercice
                  </Button>
                </motion.div>

                <p className="text-sm text-gray-500">
                  Vous aurez 10 questions à résoudre
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Instructions */}
        {!selectedLevel && (
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <BookOpen className="text-blue-600" />
                  <span>Comment ça marche ?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="font-semibold text-gray-800">Choisissez votre niveau</h3>
                    <p className="text-sm text-gray-600">
                      Sélectionnez un niveau adapté à vos compétences, du débutant à l'expert.
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold text-green-600">2</span>
                    </div>
                    <h3 className="font-semibold text-gray-800">Choisissez l'opération</h3>
                    <p className="text-sm text-gray-600">
                      Concentrez-vous sur une opération spécifique ou mélangez toutes les opérations.
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold text-purple-600">3</span>
                    </div>
                    <h3 className="font-semibold text-gray-800">Pratiquez et progressez</h3>
                    <p className="text-sm text-gray-600">
                      Résolvez les exercices et profitez des animations ludiques pour apprendre en s'amusant !
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PracticeOperations;