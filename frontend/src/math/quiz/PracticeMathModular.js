import React from 'react';
import QuizContainer from '../../components/quiz/QuizContainer';
import { mathQuizConfig } from '../../components/QuizConfig';
import { MATH_QUIZ_QUESTIONS } from './MathQuizData';

/**
 * Quiz de mathématiques utilisant l'architecture modulaire
 */
const PracticeMathModular = () => {
  return (
    <QuizContainer
      title={mathQuizConfig.title}
      description={mathQuizConfig.description}
      icon={mathQuizConfig.icon}
      levels={mathQuizConfig.levels}
      categories={mathQuizConfig.categories}
      questionsData={MATH_QUIZ_QUESTIONS}
      questionCount={mathQuizConfig.questionCount}
    />
  );
};

export default PracticeMathModular;