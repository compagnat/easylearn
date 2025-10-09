import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { LEVELS, LEVEL_CONFIG } from '../data/operationsConfig';
import { useSoundManager } from '../../../components/animations/SoundManager';

const LevelSelector = ({ selectedLevel, onLevelSelect }) => {
  const { playClick } = useSoundManager();
  const levels = Object.entries(LEVEL_CONFIG);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Choisissez votre niveau
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {levels.map(([levelKey, levelData], index) => (
          <motion.div
            key={levelKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 ${
                selectedLevel === levelKey 
                  ? 'ring-2 ring-blue-500 bg-blue-50 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => {
                playClick();
                onLevelSelect(levelKey);
              }}
            >
              <CardHeader className="text-center pb-2">
                <div className="text-4xl mb-2">{levelData.icon}</div>
                <CardTitle className="text-lg">{levelData.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  {levelData.description}
                </p>
                
                {selectedLevel === levelKey && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Badge variant="default" className="bg-blue-500">
                      ✓ Sélectionné
                    </Badge>
                  </motion.div>
                )}
                
                {selectedLevel !== levelKey && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                  >
                    Choisir
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {selectedLevel && (
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-blue-100 rounded-lg p-4 max-w-2xl mx-auto">
            <h3 className="font-semibold text-blue-800 mb-2">
              Niveau {LEVEL_CONFIG[selectedLevel].name} sélectionné !
            </h3>
            <p className="text-blue-700 text-sm">
              Vous pouvez maintenant choisir le type d'opérations à pratiquer.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LevelSelector;