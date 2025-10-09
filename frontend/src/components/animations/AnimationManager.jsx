import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, SkipForward } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useSoundManager } from './SoundManager';

// Animations de succès
const SuccessAnimations = {
  confetti: ({ onComplete }) => {
    const particles = Array.from({ length: 20 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
        initial={{ 
          x: Math.random() * window.innerWidth * 0.8,
          y: window.innerHeight,
          rotate: 0,
          opacity: 1
        }}
        animate={{
          y: -100,
          rotate: 360,
          opacity: 0
        }}
        transition={{
          duration: 2 + Math.random() * 1,
          ease: "easeOut",
          delay: Math.random() * 0.5
        }}
        onAnimationComplete={i === 0 ? onComplete : undefined}
      />
    ));
    
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {particles}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1.2, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl">🎉</div>
        </motion.div>
      </div>
    );
  },

  stars: ({ onComplete }) => {
    const stars = Array.from({ length: 15 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute text-4xl"
        initial={{ 
          x: Math.random() * (window.innerWidth - 100),
          y: -50,
          scale: 0,
          rotate: 0
        }}
        animate={{
          y: window.innerHeight + 50,
          scale: [0, 1, 0.8, 1, 0],
          rotate: 360
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          delay: Math.random() * 1
        }}
        onAnimationComplete={i === 0 ? onComplete : undefined}
      >
        ⭐
      </motion.div>
    ));
    
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {stars}
        <motion.div
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-5xl">✨ Parfait ! ✨</div>
        </motion.div>
      </div>
    );
  },

  bubbles: ({ onComplete }) => {
    const bubbles = Array.from({ length: 12 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-70"
        initial={{ 
          x: Math.random() * (window.innerWidth - 50),
          y: window.innerHeight + 50,
          scale: 0.5
        }}
        animate={{
          y: -100,
          scale: [0.5, 1.5, 0.5],
          x: `+=${(Math.random() - 0.5) * 200}`
        }}
        transition={{
          duration: 4,
          ease: "easeOut",
          delay: Math.random() * 0.8
        }}
        onAnimationComplete={i === 0 ? onComplete : undefined}
      />
    ));
    
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {bubbles}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: 2 }}
        >
          <div className="text-6xl">🎈</div>
        </motion.div>
      </div>
    );
  },

  fireworks: ({ onComplete }) => {
    const explosions = Array.from({ length: 8 }, (_, i) => {
      const centerX = Math.random() * (window.innerWidth - 200) + 100;
      const centerY = Math.random() * (window.innerHeight - 200) + 100;
      
      return Array.from({ length: 8 }, (_, j) => (
        <motion.div
          key={`${i}-${j}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full"
          initial={{ 
            x: centerX,
            y: centerY,
            opacity: 1,
            scale: 1
          }}
          animate={{
            x: centerX + (Math.cos((j * 45) * Math.PI / 180) * 100),
            y: centerY + (Math.sin((j * 45) * Math.PI / 180) * 100),
            opacity: 0,
            scale: 0
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.3
          }}
          onAnimationComplete={i === 0 && j === 0 ? onComplete : undefined}
        />
      ));
    }).flat();
    
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {explosions}
        <motion.div
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-5xl font-bold text-yellow-400">🏆 Excellent ! 🏆</div>
        </motion.div>
      </div>
    );
  }
};

// Animation d'erreur
const ErrorAnimation = ({ onRetry, onSkip, onComplete }) => {
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 text-center max-w-md mx-4">
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -5, 5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-8xl mb-4"
            >
              😢
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                Oups !
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                On réessaye ?
              </p>
              
              <div className="flex space-x-4 justify-center">
                <Button
                  onClick={() => {
                    onRetry();
                    onComplete();
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  size="lg"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Réessayer
                </Button>
                
                <Button
                  onClick={() => {
                    onSkip();
                    onComplete();
                  }}
                  variant="outline"
                  size="lg"
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  Passer
                </Button>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Gestionnaire principal des animations
const AnimationManager = ({ 
  type, // 'success' | 'error'
  onComplete,
  onRetry,
  onSkip,
  show = false
}) => {
  const [currentAnimation, setCurrentAnimation] = useState(null);
  const { playSuccess, playError } = useSoundManager();

  useEffect(() => {
    if (show && type === 'success') {
      // Jouer le son de succès
      playSuccess();
      // Choisir une animation de succès aléatoire
      const animations = Object.keys(SuccessAnimations);
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      setCurrentAnimation(randomAnimation);
    } else if (show && type === 'error') {
      // Jouer le son d'erreur
      playError();
      setCurrentAnimation('error');
    } else {
      setCurrentAnimation(null);
    }
  }, [show, type, playSuccess, playError]);

  const handleComplete = () => {
    setCurrentAnimation(null);
    if (onComplete) onComplete();
  };

  if (!show || !currentAnimation) return null;

  if (currentAnimation === 'error') {
    return (
      <ErrorAnimation 
        onRetry={onRetry}
        onSkip={onSkip}
        onComplete={handleComplete}
      />
    );
  }

  const SuccessComponent = SuccessAnimations[currentAnimation];
  return <SuccessComponent onComplete={handleComplete} />;
};

export default AnimationManager;