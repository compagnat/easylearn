import React from 'react';
import QuizFramework from '../../components/QuizFramework';
import { animalsQuizConfig } from './AnimalsQuizConfig';
import { ANIMALS_QUIZ_QUESTIONS } from './AnimalsQuizData';

const AnimalsQuiz = () => {
  return (
    <QuizFramework
      title={animalsQuizConfig.title}
      description={animalsQuizConfig.description}
      icon={animalsQuizConfig.icon}
      levels={animalsQuizConfig.levels}
      categories={animalsQuizConfig.categories}
      questionsData={ANIMALS_QUIZ_QUESTIONS}
      questionCount={animalsQuizConfig.questionCount}
    />
  );
};

export default AnimalsQuiz;