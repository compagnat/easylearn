import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import AppLayout from './components/AppLayout';
import HomePage from './components/HomePage';
import ChartLearning from './math/chart/ChartLearning';
import PracticeOperations from './math/operations/PracticeOperations';
import PracticeGeography from './geo/quiz/PracticeGeography';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="math/chart" element={<ChartLearning />} />
            <Route path="math/operations" element={<PracticeOperations />} />
            <Route path="geo/quiz" element={<PracticeGeography />} />
            {/* Add more routes here as needed */}
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;