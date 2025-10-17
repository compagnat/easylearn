import { useState, useEffect } from 'react';
import { useSoundManager } from '../components/animations/SoundManager';

// Hook personnalisé pour gérer toute la logique d'un quiz
export const useQuiz = (questionsData, questionCount = 10) => {
  const { playClick } = useSoundManager();
  
  // États de configuration
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // États du jeu
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  // États de temps
  const [timeStarted, setTimeStarted] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  
  // États d'animation
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationType, setAnimationType] = useState(null);

  // Générateur de questions générique
  const generateQuestion = (level, category, questionsData) => {
    if (category === 'mixed') {
      const availableCategories = Object.keys(questionsData).filter(c => c !== 'mixed');
      category = availableCategories[Math.floor(Math.random() * availableCategories.length)];
    }

    const questions = questionsData[category] || [];
    if (questions.length === 0) return null;

    // Filtrer par niveau si spécifié
    const levelQuestions = questions.filter(q => !q.level || q.level === level);
    const finalQuestions = levelQuestions.length > 0 ? levelQuestions : questions;

    if (finalQuestions.length === 0) return null;

    const question = finalQuestions[Math.floor(Math.random() * finalQuestions.length)];
    return { ...question, category };
  };

  // Générer une nouvelle question
  const generateNewQuestion = () => {
    if (!selectedLevel || !selectedCategory) return;
    
    const question = generateQuestion(selectedLevel, selectedCategory, questionsData);
    if (!question) {
      console.error('No question generated for level:', selectedLevel, 'category:', selectedCategory);
      return;
    }
    
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuestionStartTime(Date.now());
  };

  // Effect pour démarrer le jeu
  useEffect(() => {
    if (gameStarted && selectedLevel && selectedCategory) {
      generateNewQuestion();
      setTimeStarted(Date.now());
    }
  }, [gameStarted, selectedLevel, selectedCategory]);

  // Actions du quiz
  const actions = {
    // Sélection
    selectLevel: (level) => {
      playClick();
      setSelectedLevel(level);
    },
    
    selectCategory: (category) => {
      playClick();
      setSelectedCategory(category);
    },
    
    // Contrôle du jeu
    startGame: () => {
      if (selectedLevel && selectedCategory) {
        playClick();
        setGameStarted(true);
      }
    },
    
    // Réponses
    selectAnswer: (answer) => {
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
          actions.nextQuestion();
        }, 2000);
      } else {
        setAnimationType('error');
        setShowAnimation(true);
      }
    },
    
    // Navigation
    nextQuestion: () => {
      if (questionNumber >= questionCount) {
        const endTime = Date.now();
        setTotalTime(Math.round((endTime - timeStarted) / 1000));
        setIsFinished(true);
      } else {
        setQuestionNumber(prev => prev + 1);
        generateNewQuestion();
      }
    },
    
    skipQuestion: () => {
      playClick();
      setAnsweredQuestions(prev => prev + 1);
      actions.nextQuestion();
    },
    
    retryQuestion: () => {
      setSelectedAnswer(null);
      setIsAnswered(false);
    },
    
    // Contrôles globaux
    restart: () => {
      playClick();
      setQuestionNumber(1);
      setScore(0);
      setAnsweredQuestions(0);
      setIsFinished(false);
      setTimeStarted(Date.now());
      generateNewQuestion();
    },
    
    backToSelection: () => {
      playClick();
      setGameStarted(false);
      setCurrentQuestion(null);
      // Reset optional: garder level et category sélectionnés
    },
    
    reset: () => {
      playClick();
      setSelectedLevel(null);
      setSelectedCategory(null);
      setGameStarted(false);
      setCurrentQuestion(null);
      setQuestionNumber(1);
      setScore(0);
      setAnsweredQuestions(0);
      setIsFinished(false);
      setTimeStarted(null);
      setTotalTime(0);
    },
    
    // Animations
    completeAnimation: () => {
      setShowAnimation(false);
    }
  };

  // État calculé
  const progress = ((questionNumber - 1) / questionCount) * 100;
  const accuracy = answeredQuestions > 0 ? Math.round((score / answeredQuestions) * 100) : 0;

  // État du quiz
  const quizState = {
    // Configuration
    selectedLevel,
    selectedCategory,
    
    // Jeu
    gameStarted,
    currentQuestion,
    questionNumber,
    score,
    answeredQuestions,
    selectedAnswer,
    isAnswered,
    isFinished,
    
    // Temps
    timeStarted,
    questionStartTime,
    totalTime,
    
    // Animations
    showAnimation,
    animationType,
    
    // Calculés
    progress,
    accuracy,
    questionCount,
    
    // Helpers
    canStart: selectedLevel && selectedCategory,
    isInGame: gameStarted && currentQuestion,
    isComplete: isFinished
  };

  return {
    state: quizState,
    actions
  };
};