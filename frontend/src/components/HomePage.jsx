import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Calculator, 
  ChartBar, 
  TrendingUp, 
  Zap, 
  Settings, 
  FlaskConical, 
  Atom,
  ArrowRight 
} from 'lucide-react';
import { menuStructure } from '../data/menuStructure';

const iconMap = {
  Calculator,
  ChartBar, 
  TrendingUp,
  Zap,
  Settings,
  Flask: FlaskConical,
  Atom,
  BookOpen
};

const HomePage = () => {
  const navigate = useNavigate();

  const getFeaturedExamples = () => {
    const featured = [];
    Object.entries(menuStructure).forEach(([sectionKey, section]) => {
      Object.entries(section.examples).forEach(([exampleKey, example]) => {
        featured.push({
          ...example,
          sectionTitle: section.title,
          sectionIcon: section.icon
        });
      });
    });
    return featured.slice(0, 6); // Limit to first 6 examples
  };

  const featuredExamples = getFeaturedExamples();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <BookOpen size={48} className="text-blue-600" />
          <h1 className="text-5xl font-bold text-gray-900">
            Plateforme d'Apprentissage
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Découvrez des concepts complexes à travers des exemples interactifs et des visualisations engageantes. 
          Apprenez les mathématiques, la physique, la chimie et bien plus encore de manière intuitive.
        </p>
        <Button 
          onClick={() => navigate('/math/chart')} 
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
        >
          Commencer avec les Graphiques
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>

      {/* Featured Examples */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Exemples en Vedette
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredExamples.map((example, index) => {
            const SectionIcon = iconMap[example.sectionIcon] || BookOpen;
            const ExampleIcon = iconMap[example.icon] || ChartBar;
            
            return (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(example.path)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      <SectionIcon className="w-3 h-3 mr-1" />
                      {example.sectionTitle}
                    </Badge>
                    <ExampleIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{example.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Explorez et apprenez à travers cet exemple interactif.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Découvrir
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Sections Overview */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Domaines d'Apprentissage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(menuStructure).map(([sectionKey, section]) => {
            const SectionIcon = iconMap[section.icon] || BookOpen;
            const exampleCount = Object.keys(section.examples).length;
            
            return (
              <Card key={sectionKey} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <SectionIcon className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {exampleCount} exemple{exampleCount > 1 ? 's' : ''} disponible{exampleCount > 1 ? 's' : ''}
                  </p>
                  <Badge variant="secondary">
                    En développement
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Getting Started */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-center justify-center">
            <BookOpen className="text-blue-600" />
            <span>Comment commencer ?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Choisissez un domaine</h3>
              <p className="text-sm text-gray-600">
                Sélectionnez le domaine qui vous intéresse : mathématiques, physique, chimie...
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Explorez interactivement</h3>
              <p className="text-sm text-gray-600">
                Manipulez les paramètres, modifiez les données et observez les résultats en temps réel.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Apprenez par la pratique</h3>
              <p className="text-sm text-gray-600">
                Comprenez les concepts grâce aux explications et aux cas d'usage pratiques.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;