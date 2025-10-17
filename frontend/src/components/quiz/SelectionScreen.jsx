import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const SelectionScreen = ({
  title,
  description,
  icon: MainIcon,
  levels,
  categories,
  selectedLevel,
  selectedCategory,
  onLevelSelect,
  onCategorySelect,
  onStart,
  canStart,
  questionCount
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center space-x-3 mb-6">
          <MainIcon size={48} className="text-blue-600" />
          <h1 className="text-5xl font-bold text-gray-900">{title}</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
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
                onClick={() => onLevelSelect(level.id)}
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
                    onClick={() => onCategorySelect(category.id)}
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
      {canStart && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <Button onClick={onStart} size="lg" className="w-full bg-green-500 hover:bg-green-600">
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

export default SelectionScreen;