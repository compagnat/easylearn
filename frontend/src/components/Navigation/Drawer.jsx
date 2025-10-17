import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  ChevronDown, 
  ChevronRight, 
  Calculator, 
  ChartBar, 
  TrendingUp, 
  Zap, 
  Settings, 
  FlaskConical, 
  Atom, 
  BookOpen 
} from 'lucide-react';
import { menuStructure } from '../../data/menuStructure';

// Map d'icônes
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

const Drawer = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({ math: true });
  const [expandedExamples, setExpandedExamples] = useState({ charts: true });
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const toggleExample = (exampleKey) => {
    setExpandedExamples(prev => ({
      ...prev,
      [exampleKey]: !prev[exampleKey]
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Domaines d'Apprentissage</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-2">
          {Object.entries(menuStructure).map(([sectionKey, section]) => {
            const SectionIcon = iconMap[section.icon] || BookOpen;
            const isExpanded = expandedSections[sectionKey];
            
            return (
              <div key={sectionKey} className="space-y-1">
                {/* Section Header */}
                <Button
                  variant="ghost"
                  onClick={() => toggleSection(sectionKey)}
                  className="w-full justify-start p-2 h-auto text-sm font-medium"
                >
                  <div className="flex items-center space-x-2 w-full">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                    <SectionIcon className="w-4 h-4 text-blue-600" />
                    <span className="flex-1 text-left">{section.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {Object.keys(section.examples).length}
                    </Badge>
                  </div>
                </Button>

                {/* Examples */}
                {isExpanded && (
                  <div className="ml-4 space-y-1">
                    {Object.entries(section.examples).map(([exampleKey, example]) => {
                      const ExampleIcon = iconMap[example.icon] || ChartBar;
                      const hasSubExamples = example.subExamples && Object.keys(example.subExamples).length > 0;
                      const isExampleExpanded = expandedExamples[exampleKey];
                      const isActive = isActivePath(example.path);

                      return (
                        <div key={exampleKey} className="space-y-1">
                          {/* Example Header */}
                          <div className="flex items-center">
                            {hasSubExamples && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleExample(exampleKey)}
                                className="p-1 h-6 w-6 mr-1"
                              >
                                {isExampleExpanded ? (
                                  <ChevronDown className="w-3 h-3" />
                                ) : (
                                  <ChevronRight className="w-3 h-3" />
                                )}
                              </Button>
                            )}
                            
                            <Button
                              variant={isActive ? "secondary" : "ghost"}
                              onClick={() => handleNavigation(example.path)}
                              className="flex-1 justify-start p-2 h-auto text-sm"
                            >
                              <ExampleIcon className="w-4 h-4 mr-2 text-green-600" />
                              <span>{example.title}</span>
                              {hasSubExamples && (
                                <Badge variant="outline" className="ml-auto text-xs">
                                  {Object.keys(example.subExamples).length}
                                </Badge>
                              )}
                            </Button>
                          </div>

                          {/* Sub Examples */}
                          {hasSubExamples && isExampleExpanded && (
                            <div className="ml-6 space-y-1">
                              {Object.entries(example.subExamples).map(([subKey, subExample]) => {
                                const isSubActive = isActivePath(subExample.path);
                                
                                return (
                                  <Button
                                    key={subKey}
                                    variant={isSubActive ? "secondary" : "ghost"}
                                    onClick={() => handleNavigation(subExample.path)}
                                    className="w-full justify-start p-2 h-auto text-sm text-gray-600"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-orange-400 mr-2"></div>
                                    <span>{subExample.title}</span>
                                  </Button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;