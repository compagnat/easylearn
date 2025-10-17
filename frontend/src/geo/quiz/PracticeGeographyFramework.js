import React from 'react';
import QuizFramework from '../../components/QuizFramework';
import { geoQuizConfig } from '../../components/QuizConfig';
import { GEOGRAPHY_QUESTIONS } from './data';

const PracticeGeographyFramework = () => {
  return (
    <QuizFramework
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

export default PracticeGeographyFramework;