import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { BookOpen, ChartBar } from 'lucide-react';
import ChartTypeSelector from './components/ChartTypeSelector';
import ChartEditor from './components/ChartEditor';
import ChartDisplay from './components/ChartDisplay';
import { 
  pieChartData, 
  barChartData, 
  lineChartData, 
  areaChartData, 
  scatterData,
  defaultChartSettings 
} from './data/mockChartData';

const getInitialData = (type) => {
  switch (type) {
    case 'pie': return [...pieChartData];
    case 'bar': return [...barChartData];
    case 'line': return [...lineChartData];
    case 'area': return [...areaChartData];
    case 'scatter': return [...scatterData];
    default: return [];
  }
};

function ChartLearning() {
  const [selectedType, setSelectedType] = useState('');
  const [chartData, setChartData] = useState([]);
  const [chartSettings, setChartSettings] = useState({});

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setChartData(getInitialData(type));
    setChartSettings(defaultChartSettings[type] || {});
  };

  const handleDataChange = (newData) => {
    setChartData(newData);
  };

  const handleSettingsChange = (newSettings) => {
    setChartSettings(newSettings);
  };

  const handleReset = () => {
    setChartData(getInitialData(selectedType));
    setChartSettings(defaultChartSettings[selectedType] || {});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <ChartBar size={40} className="text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Laboratoire de Graphiques
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Apprenez et explorez différents types de graphiques interactifs. 
            Modifiez les données en temps réel pour comprendre comment chaque type de visualisation fonctionne.
          </p>
        </div>

        {/* Chart Type Selection */}
        <div className="mb-8">
          <ChartTypeSelector 
            selectedType={selectedType}
            onTypeSelect={handleTypeSelect}
          />
        </div>

        {/* Main Content */}
        {selectedType && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart Display */}
            <div className="order-2 lg:order-1">
              <ChartDisplay 
                chartType={selectedType}
                data={chartData}
                chartSettings={chartSettings}
              />
            </div>

            {/* Chart Editor */}
            <div className="order-1 lg:order-2">
              <ChartEditor
                chartType={selectedType}
                data={chartData}
                onDataChange={handleDataChange}
                onReset={handleReset}
                chartSettings={chartSettings}
                onSettingsChange={handleSettingsChange}
              />
            </div>
          </div>
        )}

        {/* Learning Tips */}
        {!selectedType && (
          <Card className="mt-8 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="text-blue-600" />
                <span>Comment utiliser cette application ?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">1. Choisissez un graphique</h3>
                  <p className="text-sm text-gray-600">
                    Sélectionnez l'un des 5 types de graphiques disponibles ci-dessus pour commencer votre exploration.
                  </p>
                  
                  <h3 className="font-semibold text-gray-800">2. Modifiez les données</h3>
                  <p className="text-sm text-gray-600">
                    Utilisez l'éditeur pour ajouter, supprimer ou modifier les valeurs. Le graphique se met à jour automatiquement.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">3. Apprenez les cas d'usage</h3>
                  <p className="text-sm text-gray-600">
                    Chaque type de graphique est accompagné d'explications sur quand et comment l'utiliser efficacement.
                  </p>
                  
                  <h3 className="font-semibold text-gray-800">4. Expérimentez</h3>
                  <p className="text-sm text-gray-600">
                    N'hésitez pas à tester différentes données pour comprendre l'impact sur la visualisation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default ChartLearning;