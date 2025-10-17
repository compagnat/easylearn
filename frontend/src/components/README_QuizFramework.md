# Quiz Framework - Documentation

## 📋 Vue d'ensemble

Le **Quiz Framework** est un composant React réutilisable qui permet de créer facilement des quiz interactifs avec animations, sons et statistiques. Il est basé sur la section géographie améliorée et inclut toutes les fonctionnalités modernes.

## ✨ Fonctionnalités incluses

- 🎨 **Animations complètes** : Confettis, étoiles, bulles, feux d'artifice pour les succès
- 🔊 **Système de sons** : Sons de succès variés, erreurs et clics
- 📊 **Statistiques détaillées** : Score, précision, temps total, temps par question
- 🎯 **Interface utilisateur moderne** : Animations Framer Motion, design Tailwind
- 📱 **Responsive** : Fonctionne sur tous les écrans
- ⚙️ **Entièrement configurable** : Titre, description, niveaux, catégories, questions

## 🚀 Utilisation rapide

### 1. Import du framework

```javascript
import QuizFramework from './components/QuizFramework';
```

### 2. Structure des données requises

```javascript
const quizConfig = {
  title: "Mon Quiz Personnalisé",
  description: "Description de votre quiz",
  icon: MonIcone, // Composant d'icône Lucide React
  questionCount: 10,
  
  levels: [
    {
      id: 'debutant',
      name: 'Débutant',
      description: 'Niveau facile',
      icon: '🌟'
    }
    // ... autres niveaux
  ],
  
  categories: [
    {
      id: 'categorie1',
      name: 'Catégorie 1',
      icon: IconeComponent
    }
    // ... autres catégories
  ]
};

const questionsData = {
  categorie1: [
    {
      question: "Ma question ?",
      answer: "Bonne réponse",
      options: ["Option 1", "Bonne réponse", "Option 3", "Option 4"],
      level: 'debutant' // Optionnel : filtrer par niveau
    }
    // ... autres questions
  ]
};
```

### 3. Utilisation du composant

```javascript
const MonQuiz = () => {
  return (
    <QuizFramework
      title={quizConfig.title}
      description={quizConfig.description}
      icon={quizConfig.icon}
      levels={quizConfig.levels}
      categories={quizConfig.categories}
      questionsData={questionsData}
      questionCount={quizConfig.questionCount}
    />
  );
};
```

## 📖 Exemples complets

### Exemple 1: Quiz de Géographie
```javascript
import QuizFramework from './components/QuizFramework';
import { geoQuizConfig } from './components/QuizConfig';
import { GEOGRAPHY_QUESTIONS } from './geo/quiz/data';

const GeographyQuiz = () => (
  <QuizFramework
    {...geoQuizConfig}
    questionsData={GEOGRAPHY_QUESTIONS}
  />
);
```

### Exemple 2: Quiz de Mathématiques
```javascript
import QuizFramework from './components/QuizFramework';
import { mathQuizConfig } from './components/QuizConfig';
import { MATH_QUIZ_QUESTIONS } from './math/quiz/MathQuizData';

const MathQuiz = () => (
  <QuizFramework
    {...mathQuizConfig}
    questionsData={MATH_QUIZ_QUESTIONS}
  />
);
```

### Exemple 3: Quiz personnalisé complet
```javascript
import { Book, Calculator, Globe } from 'lucide-react';

const customQuizConfig = {
  title: "Quiz de Culture Générale",
  description: "Testez vos connaissances dans différents domaines !",
  icon: Book,
  questionCount: 15,
  
  levels: [
    {
      id: 'facile',
      name: 'Facile',
      description: 'Questions de base',
      icon: '😊'
    },
    {
      id: 'difficile',
      name: 'Difficile', 
      description: 'Pour les experts',
      icon: '🤓'
    }
  ],
  
  categories: [
    {
      id: 'histoire',
      name: 'Histoire',
      icon: Book
    },
    {
      id: 'sciences',
      name: 'Sciences',
      icon: Calculator
    },
    {
      id: 'geographie',
      name: 'Géographie', 
      icon: Globe
    }
  ]
};

const customQuestionsData = {
  histoire: [
    {
      question: "En quelle année a eu lieu la Révolution française ?",
      answer: "1789",
      options: ["1789", "1792", "1799", "1804"],
      level: 'facile'
    }
  ],
  sciences: [
    {
      question: "Quelle est la formule de l'eau ?",
      answer: "H2O",
      options: ["H2O", "CO2", "NaCl", "O2"],
      level: 'facile'
    }
  ]
};

const CustomQuiz = () => (
  <QuizFramework
    {...customQuizConfig}
    questionsData={customQuestionsData}
  />
);
```

## ⚙️ Props du composant

| Prop | Type | Description | Requis |
|------|------|-------------|--------|
| `title` | string | Titre principal du quiz | ✅ |
| `description` | string | Description du quiz | ✅ |
| `icon` | Component | Icône principale (Lucide React) | ✅ |
| `levels` | Array | Liste des niveaux disponibles | ✅ |
| `categories` | Array | Liste des catégories de questions | ✅ |
| `questionsData` | Object | Questions organisées par catégorie | ✅ |
| `questionCount` | number | Nombre de questions par quiz | ❌ (défaut: 10) |

## 📝 Structure des données

### Niveau (Level)
```javascript
{
  id: string,        // Identifiant unique
  name: string,      // Nom affiché
  description: string, // Description du niveau
  icon: string       // Emoji ou icône
}
```

### Catégorie (Category)
```javascript
{
  id: string,           // Identifiant unique (doit correspondre aux clés de questionsData)
  name: string,         // Nom affiché
  icon: Component       // Composant d'icône Lucide React
}
```

### Question
```javascript
{
  question: string,     // Texte de la question
  answer: string,       // Bonne réponse (doit être identique à une des options)
  options: string[],    // 4 options de réponse
  level?: string       // Niveau optionnel pour filtrer les questions
}
```

### Questions Data
```javascript
{
  [categoryId]: Question[] // Tableau de questions pour chaque catégorie
}
```

## 🎨 Fonctionnalités automatiques

### Animations
- **Succès** : Confettis, étoiles, bulles ou feux d'artifice (aléatoire)
- **Erreur** : Animation douce avec options de retry/skip
- **Transitions** : Animations fluides entre les écrans

### Sons
- **Clics** : Son sur tous les boutons et sélections
- **Succès** : Sons mélodieux variés pour les bonnes réponses
- **Erreur** : Son doux et encourageant

### Statistiques
- Score sur total de questions
- Pourcentage de précision
- Temps total écoulé
- Temps moyen par question
- Badges de performance (Score parfait, Excellent, Bien joué)

## 🔧 Personnalisation avancée

### Modifier le nombre de questions
```javascript
<QuizFramework 
  {...config}
  questionCount={20} // Au lieu de 10 par défaut
/>
```

### Ajouter des niveaux de difficulté
Les questions peuvent inclure un champ `level` pour filtrer par niveau :
```javascript
{
  question: "Question difficile",
  answer: "Réponse",
  options: ["..."],
  level: 'avance' // Sera affichée seulement pour le niveau avancé
}
```

### Catégorie "Mixed"
Ajoutez une catégorie avec `id: 'mixed'` pour mélanger toutes les catégories :
```javascript
{
  id: 'mixed',
  name: 'Mélange de tout',
  icon: Target
}
```

## 📁 Structure de fichiers recommandée

```
src/
├── components/
│   ├── QuizFramework.jsx       # Framework principal
│   ├── QuizConfig.js          # Configurations pré-définies
│   └── README_QuizFramework.md # Cette documentation
├── monDomaine/
│   ├── quiz/
│   │   ├── MonQuizData.js     # Données de questions
│   │   └── MonQuiz.js         # Composant utilisant le framework
│   └── ...
└── ...
```

## 🎯 Avantages du framework

- **Réutilisabilité** : Un seul composant pour tous les quiz
- **Consistance** : Interface utilisateur uniforme
- **Maintenabilité** : Logique centralisée
- **Extensibilité** : Facile à étendre avec de nouvelles fonctionnalités
- **Performance** : Animations et sons optimisés
- **Accessibilité** : Interface intuitive et responsive

## 🚀 Pour aller plus loin

### Intégration dans le routeur
```javascript
// App.js
import MonQuiz from './monDomaine/quiz/MonQuiz';

<Route path="/mon-quiz" element={<MonQuiz />} />
```

### Sauvegarde des scores
Le framework peut être étendu pour sauvegarder les scores en ajoutant des callbacks :
```javascript
const handleQuizComplete = (results) => {
  // Sauvegarder les résultats
  console.log('Quiz terminé:', results);
};
```

Voilà ! Le framework est prêt à être utilisé pour créer n'importe quel type de quiz avec toutes les fonctionnalités modernes incluses. 🎉