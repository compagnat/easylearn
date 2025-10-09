import React from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { BarChart3, PieChart, LineChart, AreaChart, Zap } from 'lucide-react';

const chartTypes = [
  { 
    id: 'pie', 
    name: 'Graphique en secteurs', 
    icon: PieChart, 
    color: 'bg-blue-500 hover:bg-blue-600' 
  },
  { 
    id: 'bar', 
    name: 'Graphique en barres', 
    icon: BarChart3, 
    color: 'bg-green-500 hover:bg-green-600' 
  },
  { 
    id: 'line', 
    name: 'Graphique linéaire', 
    icon: LineChart, 
    color: 'bg-purple-500 hover:bg-purple-600' 
  },
  { 
    id: 'area', 
    name: 'Graphique en aires', 
    icon: AreaChart, 
    color: 'bg-orange-500 hover:bg-orange-600' 
  },
  { 
    id: 'scatter', 
    name: 'Nuage de points', 
    icon: Zap, 
    color: 'bg-red-500 hover:bg-red-600' 
  }
];

const ChartTypeSelector = ({ selectedType, onTypeSelect }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Choisissez un type de graphique à explorer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {chartTypes.map(({ id, name, icon: Icon, color }) => (
            <Button
              key={id}
              onClick={() => onTypeSelect(id)}
              variant={selectedType === id ? "default" : "outline"}
              className={`h-24 flex flex-col items-center justify-center space-y-2 transition-all duration-300 ${
                selectedType === id ? color : 'hover:bg-gray-100'
              }`}
            >
              <Icon size={32} />
              <span className="text-xs text-center font-medium">{name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartTypeSelector;