import React from 'react';
import QuizFramework from '../../components/QuizFramework';
import { Calculator } from 'lucide-react';

// Configuration simple pour test
const testConfig = {
  title: "Quiz Math Test",
  description: "Test simple",
  icon: Calculator,
  questionCount: 5,
  
  levels: [
    {
      id: 'debutant',
      name: 'Débutant',
      description: 'Test niveau',
      icon: '🔢'
    }
  ],
  
  categories: [
    {
      id: 'addition',
      name: 'Addition',
      icon: Calculator
    }
  ]
};

// Questions simples pour test
const testQuestions = {
  addition: [
    {
      question: "Combien font 2 + 3 ?",
      answer: "5",
      options: ["4", "5", "6", "7"],
      level: 'debutant'
    },
    {
      question: "Combien font 1 + 1 ?",
      answer: "2",
      options: ["1", "2", "3", "4"],
      level: 'debutant'
    }
  ]
};

const TestMathFramework = () => {
  console.log('TestMathFramework - Config:', testConfig);
  console.log('TestMathFramework - Questions:', testQuestions);
  
  return (
    <QuizFramework
      title={testConfig.title}
      description={testConfig.description}
      icon={testConfig.icon}
      levels={testConfig.levels}
      categories={testConfig.categories}
      questionsData={testQuestions}
      questionCount={testConfig.questionCount}
    />
  );
};

export default TestMathFramework;