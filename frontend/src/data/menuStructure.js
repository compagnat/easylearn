// Structure hiérarchique des exemples
export const menuStructure = {
  math: {
    title: "Mathématiques",
    icon: "Calculator",
    examples: {
      charts: {
        title: "Les graphiques", 
        icon: "ChartBar",
        path: "/math/chart",
        component: "ChartLearning",
        subExamples: {
          basic: {
            title: "Graphiques de base",
            path: "/math/chart/basic",
            component: "BasicCharts"
          },
          advanced: {
            title: "Graphiques avancés", 
            path: "/math/chart/advanced",
            component: "AdvancedCharts"
          }
        }
      },
      operations: {
        title: "Pratiquer les opérations",
        icon: "Calculator",
        path: "/math/operations",
        component: "PracticeOperations",
        subExamples: {
          beginner: {
            title: "Niveau débutant",
            path: "/math/operations/beginner",
            component: "BeginnerOperations"
          },
          intermediate: {
            title: "Niveau intermédiaire", 
            path: "/math/operations/intermediate",
            component: "IntermediateOperations"
          },
          advanced: {
            title: "Niveau avancé",
            path: "/math/operations/advanced", 
            component: "AdvancedOperations"
          },
          expert: {
            title: "Niveau expert",
            path: "/math/operations/expert",
            component: "ExpertOperations"
          }
        }
      },
      statistics: {
        title: "Statistiques",
        icon: "TrendingUp",
        path: "/math/statistics", 
        component: "StatisticsLearning",
        subExamples: {
          descriptive: {
            title: "Statistiques descriptives",
            path: "/math/statistics/descriptive",
            component: "DescriptiveStats"
          }
        }
      }
    }
  },
  geo: {
    title: "Geagraphie",
    icon: "Zap",
    examples: {
      mechanics: {
        title: "Quiz",
        icon: "Settings",
        path: "/geo/quiz",
        component: "Geo"
      }
    }
  },
  animals: {
    title: "Animaux",
    icon: "BookOpen", 
    examples: {
      quiz: {
        title: "Quiz des Animaux",
        icon: "BookOpen",
        path: "/animals/quiz",
        component: "AnimalsQuiz",
        subExamples: {
          petits: {
            title: "4-5 ans - Petits Explorateurs",
            path: "/animals/quiz?level=4-5ans",
            component: "AnimalsQuiz"
          },
          jeunes: {
            title: "6-8 ans - Jeunes Aventuriers", 
            path: "/animals/quiz?level=6-8ans",
            component: "AnimalsQuiz"
          },
          experts: {
            title: "9-13 ans - Experts Animaliers",
            path: "/animals/quiz?level=9-13ans",
            component: "AnimalsQuiz"
          }
        }
      }
    }
  }
};


/*
,
  physics: {
    title: "Physique",
    icon: "Zap",
    examples: {
      mechanics: {
        title: "Mécanique",
        icon: "Settings",
        path: "/physics/mechanics",
        component: "MechanicsLearning"
      }
    }
  },
  chemistry: {
    title: "Chimie", 
    icon: "Flask",
    examples: {
      molecules: {
        title: "Molécules",
        icon: "Atom",
        path: "/chemistry/molecules",
        component: "MoleculesLearning"
      }
    }
  }

*/

// Fonction pour obtenir tous les chemins disponibles
export const getAllPaths = () => {
  const paths = [];
  
  Object.entries(menuStructure).forEach(([sectionKey, section]) => {
    Object.entries(section.examples).forEach(([exampleKey, example]) => {
      paths.push({
        path: example.path,
        component: example.component,
        title: example.title,
        section: section.title
      });
      
      if (example.subExamples) {
        Object.entries(example.subExamples).forEach(([subKey, subExample]) => {
          paths.push({
            path: subExample.path,
            component: subExample.component,
            title: subExample.title,
            section: section.title,
            parent: example.title
          });
        });
      }
    });
  });
  
  return paths;
};