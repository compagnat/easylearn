import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { 
  OPERATIONS, 
  OPERATION_LABELS, 
  OPERATION_SYMBOLS,
  LEVEL_CONFIG 
} from '../data/operationsConfig';
import { 
  Plus, 
  Minus, 
  X, 
  Divide, 
  Calculator,
  Shuffle
} from 'lucide-react';
import { useSoundManager } from '../../../components/animations/SoundManager';

const operationIcons = {
  [OPERATIONS.ADDITION]: Plus,
  [OPERATIONS.SUBTRACTION]: Minus,
  [OPERATIONS.MULTIPLICATION]: X,
  [OPERATIONS.DIVISION]: Divide,
  [OPERATIONS.SQUARE_ROOT]: Calculator,
  [OPERATIONS.MIXED]: Shuffle
};

const operationColors = {
  [OPERATIONS.ADDITION]: 'from-green-400 to-green-600',
  [OPERATIONS.SUBTRACTION]: 'from-red-400 to-red-600',
  [OPERATIONS.MULTIPLICATION]: 'from-blue-400 to-blue-600',
  [OPERATIONS.DIVISION]: 'from-purple-400 to-purple-600',
  [OPERATIONS.SQUARE_ROOT]: 'from-yellow-400 to-yellow-600',
  [OPERATIONS.MIXED]: 'from-pink-400 to-pink-600'
};

const OperationSelector = ({ selectedLevel, selectedOperation, onOperationSelect }) => {
  const { playClick } = useSoundManager();
  
  if (!selectedLevel) return null;

  const availableOperations = Object.keys(LEVEL_CONFIG[selectedLevel].operations);
  const operations = [...availableOperations, OPERATIONS.MIXED];

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Choisissez le type d'opération
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {operations.map((operation, index) => {
          const IconComponent = operationIcons[operation];
          const colorClass = operationColors[operation];
          const isSelected = selectedOperation === operation;
          
          return (
            <motion.div
              key={operation}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'ring-2 ring-blue-500 shadow-lg transform scale-105' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => {
                  playClick();
                  onOperationSelect(operation);
                }}
              >
                <CardHeader className="text-center pb-2">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${colorClass} flex items-center justify-center mb-2`}>
                    <IconComponent 
                      size={24} 
                      className="text-white"
                    />
                  </div>
                  <CardTitle className="text-sm font-medium">
                    {OPERATION_LABELS[operation]}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center pt-0">
                  {operation !== OPERATIONS.MIXED && (
                    <div className="text-2xl font-bold text-gray-600 mb-2">
                      {OPERATION_SYMBOLS[operation]}
                    </div>
                  )}
                  
                  {operation === OPERATIONS.MIXED && (
                    <div className="text-lg text-gray-600 mb-2">
                      🎲
                    </div>
                  )}
                  
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Badge variant="default" className="bg-blue-500">
                        ✓
                      </Badge>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      {selectedOperation && (
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-green-100 rounded-lg p-4 max-w-2xl mx-auto">
            <h3 className="font-semibold text-green-800 mb-2">
              {OPERATION_LABELS[selectedOperation]} sélectionné !
            </h3>
            <p className="text-green-700 text-sm">
              {selectedOperation === OPERATIONS.MIXED 
                ? "Vous allez affronter un mélange de toutes les opérations !"
                : `Préparez-vous à pratiquer les ${OPERATION_LABELS[selectedOperation].toLowerCase()}.`
              }
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OperationSelector;