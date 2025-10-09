// Mock data pour les différents types de graphiques

export const pieChartData = [
  { id: 0, value: 30, label: 'Ventes' },
  { id: 1, value: 25, label: 'Marketing' },
  { id: 2, value: 20, label: 'Support' },
  { id: 3, value: 15, label: 'R&D' },
  { id: 4, value: 10, label: 'Admin' }
];

export const barChartData = [
  { month: 'Jan', value: 400 },
  { month: 'Fév', value: 300 },
  { month: 'Mar', value: 500 },
  { month: 'Avr', value: 280 },
  { month: 'Mai', value: 590 },
  { month: 'Jun', value: 320 }
];

export const lineChartData = [
  { x: 0, y: 100 },
  { x: 1, y: 120 },
  { x: 2, y: 140 },
  { x: 3, y: 110 },
  { x: 4, y: 180 },
  { x: 5, y: 160 },
  { x: 6, y: 200 }
];

export const areaChartData = [
  { date: '2024-01', revenue: 4000, profit: 2400 },
  { date: '2024-02', revenue: 3000, profit: 1398 },
  { date: '2024-03', revenue: 2000, profit: 9800 },
  { date: '2024-04', revenue: 2780, profit: 3908 },
  { date: '2024-05', revenue: 1890, profit: 4800 },
  { date: '2024-06', revenue: 2390, profit: 3800 }
];

export const scatterData = [
  { x: 100, y: 200, id: 1 },
  { x: 120, y: 100, id: 2 },
  { x: 170, y: 300, id: 3 },
  { x: 140, y: 250, id: 4 },
  { x: 150, y: 400, id: 5 },
  { x: 110, y: 280, id: 6 }
];

export const chartDescriptions = {
  pie: {
    title: "Graphique en secteurs (Pie Chart)",
    description: "Idéal pour montrer la répartition d'un tout en pourcentages. Parfait pour représenter des parts de marché, budgets par département, ou répartitions démographiques.",
    useCases: ["Parts de marché", "Répartition budgétaire", "Analyse démographique", "Distribution des ventes"]
  },
  bar: {
    title: "Graphique en barres (Bar Chart)", 
    description: "Excellent pour comparer des valeurs entre différentes catégories. Les barres facilitent la comparaison visuelle des quantités.",
    useCases: ["Comparaison des ventes", "Performance par région", "Évolution mensuelle", "Classements"]
  },
  line: {
    title: "Graphique linéaire (Line Chart)",
    description: "Parfait pour montrer l'évolution d'une variable dans le temps. Idéal pour les tendances et les séries temporelles.",
    useCases: ["Évolution temporelle", "Tendances de croissance", "Suivi de performance", "Analyse des tendances"]
  },
  area: {
    title: "Graphique en aires (Area Chart)",
    description: "Similar au graphique linéaire mais avec l'aire sous la courbe remplie. Utile pour montrer le volume ou l'accumulation dans le temps.",
    useCases: ["Volume cumulé", "Évolution de revenus", "Données empilées", "Comparaison de volumes"]
  },
  scatter: {
    title: "Nuage de points (Scatter Plot)",
    description: "Excellent pour montrer la corrélation entre deux variables. Permet d'identifier des patterns et relations dans les données.",
    useCases: ["Analyse de corrélation", "Distribution de données", "Détection d'anomalies", "Relations entre variables"]
  }
};

// Configuration par défaut des graphiques
export const defaultChartSettings = {
  pie: {
    title: "Aperçu en temps réel",
    xAxisLabel: "",
    yAxisLabel: ""
  },
  bar: {
    title: "Aperçu en temps réel",
    xAxisLabel: "Période",
    yAxisLabel: "Valeurs"
  },
  line: {
    title: "Aperçu en temps réel", 
    xAxisLabel: "Axe X",
    yAxisLabel: "Axe Y"
  },
  area: {
    title: "Aperçu en temps réel",
    xAxisLabel: "Date", 
    yAxisLabel: "Montant"
  },
  scatter: {
    title: "Aperçu en temps réel",
    xAxisLabel: "Axe X",
    yAxisLabel: "Axe Y"
  }
};