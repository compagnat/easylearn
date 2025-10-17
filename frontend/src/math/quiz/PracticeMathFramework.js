import React from 'react';
import QuizFramework from '../../components/QuizFramework';
import { mathQuizConfig } from '../../components/QuizConfig';
import { MATH_QUIZ_QUESTIONS } from './MathQuizData';

const PracticeMathFramework = () => {
  return (
    <QuizFramework
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

export default PracticeMathFramework;