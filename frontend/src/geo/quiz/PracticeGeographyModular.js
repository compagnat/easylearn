import React from 'react';
import QuizContainer from '../../components/quiz/QuizContainer';
import { geoQuizConfig } from '../../components/QuizConfig';
import { GEOGRAPHY_QUESTIONS } from './data';

/**
 * Quiz de géographie utilisant l'architecture modulaire
 * Composant ultra-simple qui ne fait que passer la configuration
 */
const PracticeGeographyModular = () => {
  return (
    <QuizContainer
      title={geoQuizConfig.title}
      description={geoQuizConfig.description}
      icon={geoQuizConfig.icon}
      levels={geoQuizConfig.levels}
      categories={geoQuizConfig.categories}
      questionsData={GEOGRAPHY_QUESTIONS}
      questionCount={geoQuizConfig.questionCount}
    />
  );
};

export default PracticeGeographyModular;