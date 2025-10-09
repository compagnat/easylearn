import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, BarChart, LineChart } from '@mui/x-charts';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

const ChartDisplay = ({ chartType, data, chartSettings }) => {
  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return (
          <div className="h-96">
            <PieChart
              series={[
                {
                  data: data,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30 },
                }
              ]}
              height={350}
            />
          </div>
        );

      case 'bar':
        return (
          <div className="h-96">
            <BarChart
              xAxis={[{ 
                scaleType: 'band', 
                data: data.map(item => item.month),
                label: chartSettings?.xAxisLabel || 'Période'
              }]}
              yAxis={[{ label: chartSettings?.yAxisLabel || 'Valeurs' }]}
              series={[{ 
                data: data.map(item => item.value),
                label: 'Données',
                color: '#10b981'
              }]}
              height={350}
            />
          </div>
        );

      case 'line':
        return (
          <div className="h-96">
            <LineChart
              xAxis={[{ 
                data: data.map(item => item.x),
                label: chartSettings?.xAxisLabel || 'Axe X'
              }]}
              yAxis={[{ label: chartSettings?.yAxisLabel || 'Axe Y' }]}
              series={[{
                data: data.map(item => item.y),
                label: 'Série de données',
                color: '#8b5cf6'
              }]}
              height={350}
            />
          </div>
        );

      case 'area':
        return (
          <div className="h-96">
            <LineChart
              xAxis={[{ 
                scaleType: 'point',
                data: data.map(item => item.date),
                label: chartSettings?.xAxisLabel || 'Date'
              }]}
              yAxis={[{ label: chartSettings?.yAxisLabel || 'Montant' }]}
              series={[
                {
                  data: data.map(item => item.revenue),
                  label: 'Revenus',
                  area: true,
                  color: '#f97316'
                },
                {
                  data: data.map(item => item.profit),
                  label: 'Profit',
                  area: true,
                  color: '#06b6d4'
                }
              ]}
              height={350}
            />
          </div>
        );

      case 'scatter':
        return (
          <div className="h-96">
            <ScatterChart
              width={600}
              height={350}
              series={[
                {
                  data: data,
                  label: 'Points de données',
                  color: '#ef4444'
                }
              ]}
              xAxis={[{ 
                label: chartSettings?.xAxisLabel || 'Axe X'
              }]}
              yAxis={[{ 
                label: chartSettings?.yAxisLabel || 'Axe Y'
              }]}
            />
          </div>
        );

      default:
        return (
          <div className="h-96 flex items-center justify-center text-gray-500">
            Sélectionnez un type de graphique pour commencer
          </div>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">
          {chartSettings?.title || 'Aperçu en temps réel'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default ChartDisplay;