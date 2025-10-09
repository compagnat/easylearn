// Structure hiérarchique des exemples
export const examplesStructure = {
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
};

// Fonction pour obtenir tous les chemins disponibles
export const getAllPaths = () => {
  const paths = [];
  
  Object.entries(examplesStructure).forEach(([sectionKey, section]) => {
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