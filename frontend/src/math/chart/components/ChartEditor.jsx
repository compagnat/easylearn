import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Plus, Trash2, RotateCcw } from 'lucide-react';
import { chartDescriptions } from '../data/mockChartData';

const ChartEditor = ({ chartType, data, onDataChange, onReset, chartSettings, onSettingsChange }) => {
  const [newEntry, setNewEntry] = useState({});
  const chartInfo = chartDescriptions[chartType];

  const addEntry = () => {
    const entry = { ...newEntry };
    
    if (chartType === 'pie') {
      entry.id = data.length;
      if (!entry.label || !entry.value) return;
    } else if (chartType === 'bar') {
      if (!entry.month || !entry.value) return;
    } else if (chartType === 'line') {
      entry.x = data.length;
      if (!entry.y) return;
    } else if (chartType === 'area') {
      if (!entry.date || !entry.revenue || !entry.profit) return;
    } else if (chartType === 'scatter') {
      entry.id = data.length + 1;
      if (!entry.x || !entry.y) return;
    }
    
    onDataChange([...data, entry]);
    setNewEntry({});
  };

  const updateEntry = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onDataChange(newData);
  };

  const removeEntry = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onDataChange(newData);
  };

  const renderDataFields = () => {
    switch (chartType) {
      case 'pie':
        return (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <Input
                    placeholder="Libellé"
                    value={item.label}
                    onChange={(e) => updateEntry(index, 'label', e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Valeur"
                    value={item.value}
                    onChange={(e) => updateEntry(index, 'value', Number(e.target.value))}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeEntry(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <div className="flex items-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg">
              <Input
                placeholder="Nouveau libellé"
                value={newEntry.label || ''}
                onChange={(e) => setNewEntry({...newEntry, label: e.target.value})}
              />
              <Input
                type="number"
                placeholder="Valeur"
                value={newEntry.value || ''}
                onChange={(e) => setNewEntry({...newEntry, value: Number(e.target.value)})}
              />
              <Button onClick={addEntry} className="bg-blue-600 hover:bg-blue-700">
                <Plus size={16} />
              </Button>
            </div>
          </div>
        );
      
      case 'bar':
        return (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <Input
                    placeholder="Période"
                    value={item.month}
                    onChange={(e) => updateEntry(index, 'month', e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Valeur"
                    value={item.value}
                    onChange={(e) => updateEntry(index, 'value', Number(e.target.value))}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeEntry(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <div className="flex items-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg">
              <Input
                placeholder="Nouvelle période"
                value={newEntry.month || ''}
                onChange={(e) => setNewEntry({...newEntry, month: e.target.value})}
              />
              <Input
                type="number"
                placeholder="Valeur"
                value={newEntry.value || ''}
                onChange={(e) => setNewEntry({...newEntry, value: Number(e.target.value)})}
              />
              <Button onClick={addEntry} className="bg-green-600 hover:bg-green-700">
                <Plus size={16} />
              </Button>
            </div>
          </div>
        );

      case 'line':
        return (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <Label>Point {index + 1}</Label>
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Valeur Y"
                    value={item.y}
                    onChange={(e) => updateEntry(index, 'y', Number(e.target.value))}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeEntry(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <div className="flex items-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg">
              <Input
                type="number"
                placeholder="Nouvelle valeur Y"
                value={newEntry.y || ''}
                onChange={(e) => setNewEntry({...newEntry, y: Number(e.target.value)})}
              />
              <Button onClick={addEntry} className="bg-purple-600 hover:bg-purple-700">
                <Plus size={16} />
              </Button>
            </div>
          </div>
        );

      case 'area':
        return (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <Input
                    placeholder="Date"
                    value={item.date}
                    onChange={(e) => updateEntry(index, 'date', e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Revenus"
                    value={item.revenue}
                    onChange={(e) => updateEntry(index, 'revenue', Number(e.target.value))}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Profit"
                    value={item.profit}
                    onChange={(e) => updateEntry(index, 'profit', Number(e.target.value))}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeEntry(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <div className="flex items-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg">
              <Input
                placeholder="Date"
                value={newEntry.date || ''}
                onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
              />
              <Input
                type="number"
                placeholder="Revenus"
                value={newEntry.revenue || ''}
                onChange={(e) => setNewEntry({...newEntry, revenue: Number(e.target.value)})}
              />
              <Input
                type="number"
                placeholder="Profit"
                value={newEntry.profit || ''}
                onChange={(e) => setNewEntry({...newEntry, profit: Number(e.target.value)})}
              />
              <Button onClick={addEntry} className="bg-orange-600 hover:bg-orange-700">
                <Plus size={16} />
              </Button>
            </div>
          </div>
        );

      case 'scatter':
        return (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <Label>Point {item.id}</Label>
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="X"
                    value={item.x}
                    onChange={(e) => updateEntry(index, 'x', Number(e.target.value))}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Y"
                    value={item.y}
                    onChange={(e) => updateEntry(index, 'y', Number(e.target.value))}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeEntry(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <div className="flex items-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg">
              <Input
                type="number"
                placeholder="X"
                value={newEntry.x || ''}
                onChange={(e) => setNewEntry({...newEntry, x: Number(e.target.value)})}
              />
              <Input
                type="number"
                placeholder="Y"
                value={newEntry.y || ''}
                onChange={(e) => setNewEntry({...newEntry, y: Number(e.target.value)})}
              />
              <Button onClick={addEntry} className="bg-red-600 hover:bg-red-700">
                <Plus size={16} />
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{chartInfo?.title}</span>
          <Button variant="outline" onClick={onReset} className="flex items-center space-x-2">
            <RotateCcw size={16} />
            <span>Réinitialiser</span>
          </Button>
        </CardTitle>
        <div className="text-sm text-gray-600">
          <p className="mb-3">{chartInfo?.description}</p>
          <div>
            <Label className="font-semibold">Cas d'usage :</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {chartInfo?.useCases.map((useCase, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {useCase}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Settings Section */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Personnaliser l'apparence :</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="chart-title">Titre du graphique</Label>
                <Input
                  id="chart-title"
                  placeholder="Titre du graphique"
                  value={chartSettings?.title || ''}
                  onChange={(e) => onSettingsChange({...chartSettings, title: e.target.value})}
                />
              </div>
              
              {chartType !== 'pie' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="x-axis-label">Nom de l'axe X</Label>
                    <Input
                      id="x-axis-label"
                      placeholder="Axe X"
                      value={chartSettings?.xAxisLabel || ''}
                      onChange={(e) => onSettingsChange({...chartSettings, xAxisLabel: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="y-axis-label">Nom de l'axe Y</Label>
                    <Input
                      id="y-axis-label"
                      placeholder="Axe Y"
                      value={chartSettings?.yAxisLabel || ''}
                      onChange={(e) => onSettingsChange({...chartSettings, yAxisLabel: e.target.value})}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Data Section */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Modifier les données :</Label>
            {renderDataFields()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartEditor;