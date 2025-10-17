import React from 'react';
import { useQuiz } from '../../hooks/useQuiz';
import SelectionScreen from './SelectionScreen';
import GameScreen from './GameScreen';
import ResultScreen from './ResultScreen';

/**
 * Container principal pour un quiz - orchestration complète
 * Utilise le hook useQuiz pour la logique métier et les composants modulaires pour l'UI
 */
const QuizContainer = ({
  title,
  description,
  icon,
  levels,
  categories,
  questionsData,
  questionCount = 10
}) => {
  const { state, actions } = useQuiz(questionsData, questionCount);

  // Écran de résultats
  if (state.isComplete) {
    return (
      <ResultScreen
        score={state.score}
        questionCount={state.questionCount}
        accuracy={state.accuracy}
        totalTime={state.totalTime}
        onRestart={actions.restart}
        onBackToSelection={actions.backToSelection}
        onReset={actions.reset}
      />
    );
  }

  // Écran de jeu
  if (state.isInGame) {
    return (
      <GameScreen
        question={state.currentQuestion}
        questionNumber={state.questionNumber}
        questionCount={state.questionCount}
        score={state.score}
        accuracy={state.accuracy}
        progress={state.progress}
        selectedAnswer={state.selectedAnswer}
        isAnswered={state.isAnswered}
        showAnimation={state.showAnimation}
        animationType={state.animationType}
        onAnswerSelect={actions.selectAnswer}
        onSkip={actions.skipQuestion}
        onNext={actions.nextQuestion}
        onRetry={actions.retryQuestion}
        onBack={actions.backToSelection}
        onAnimationComplete={actions.completeAnimation}
      />
    );
  }

  // Écran de sélection (par défaut)
  return (
    <SelectionScreen
      title={title}
      description={description}
      icon={icon}
      levels={levels}
      categories={categories}
      selectedLevel={state.selectedLevel}
      selectedCategory={state.selectedCategory}
      onLevelSelect={actions.selectLevel}
      onCategorySelect={actions.selectCategory}
      onStart={actions.startGame}
      canStart={state.canStart}
      questionCount={state.questionCount}
    />
  );
};

export default QuizContainer;