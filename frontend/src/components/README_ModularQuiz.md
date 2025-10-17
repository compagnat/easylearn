# Architecture Modulaire de Quiz - Documentation

## 🏗️ Vue d'ensemble

L'architecture modulaire sépare clairement la **logique métier** de la **présentation** pour une meilleure réutilisabilité et maintenabilité. Cette approche transforme n'importe quel composant de quiz en composants modulaires réutilisables.

## 📦 Structure de l'architecture

### 🧠 Logique métier - `useQuiz` Hook

**Fichier:** `/hooks/useQuiz.js`

Le hook `useQuiz` centralise toute la logique d'état et les actions du quiz :

```javascript
const { state, actions } = useQuiz(questionsData, questionCount);
```

**État géré :**
- Configuration (niveau, catégorie sélectionnés)
- Progression (question actuelle, numéro, score)
- Timing (temps démarré, temps total, temps par question)
- Animations (type, visibilité)
- États calculés (progression, précision)

**Actions disponibles :**
- Sélection : `selectLevel()`, `selectCategory()`
- Jeu : `startGame()`, `selectAnswer()`, `nextQuestion()`
- Navigation : `skipQuestion()`, `retryQuestion()`, `restart()`
- Contrôle : `backToSelection()`, `reset()`

### 🎨 Composants UI modulaires

#### 1. **SelectionScreen** - Écran de sélection
- Sélection des niveaux et catégories
- Interface responsive avec animations
- Bouton de démarrage conditionnel

#### 2. **GameScreen** - Écran de jeu
- Affichage de questions avec options
- Barre de progression et statistiques
- Gestion des animations de feedback
- Actions de navigation (passer, continuer)

#### 3. **ResultScreen** - Écran de résultats
- Statistiques complètes avec badges de performance
- Options de redémarrage et navigation
- Animations de célébration

### 🎭 Orchestrateur - `QuizContainer`

**Fichier:** `/components/quiz/QuizContainer.jsx`

Le container orchestre les différents écrans selon l'état du quiz :

```javascript
// Rendu conditionnel basé sur l'état
if (state.isComplete) return <ResultScreen />;
if (state.isInGame) return <GameScreen />;
return <SelectionScreen />;
```

## 🚀 Utilisation

### Création d'un quiz en 3 étapes

#### 1. **Configuration du quiz**
```javascript
const monQuizConfig = {
  title: "Mon Quiz",
  description: "Description du quiz",
  icon: MonIcone,
  questionCount: 10,
  levels: [...],
  categories: [...]
};
```

#### 2. **Données des questions**
```javascript
const mesQuestions = {
  categorie1: [
    {
      question: "Ma question ?",
      answer: "Bonne réponse",
      options: ["Option 1", "Bonne réponse", "Option 3", "Option 4"],
      level: 'debutant' // Optionnel
    }
  ]
};
```

#### 3. **Composant final**
```javascript
const MonQuiz = () => (
  <QuizContainer
    title={monQuizConfig.title}
    description={monQuizConfig.description}
    icon={monQuizConfig.icon}
    levels={monQuizConfig.levels}
    categories={monQuizConfig.categories}
    questionsData={mesQuestions}
    questionCount={monQuizConfig.questionCount}
  />
);
```

## 📊 Comparaison des approches

| Aspect | Composant Monolithique | Framework Unique | Architecture Modulaire |
|--------|------------------------|------------------|------------------------|
| **Réutilisabilité** | ❌ Faible | ✅ Bonne | ✅ Excellente |
| **Maintenabilité** | ❌ Difficile | ⚠️ Moyenne | ✅ Facile |
| **Testabilité** | ❌ Complexe | ⚠️ Moyenne | ✅ Simple |
| **Séparation logique/UI** | ❌ Mélangée | ⚠️ Partielle | ✅ Complète |
| **Flexibilité** | ❌ Rigide | ⚠️ Limitée | ✅ Maximale |
| **Performance** | ✅ Optimale | ✅ Bonne | ✅ Bonne |

## 🧩 Exemples d'implémentation

### Exemple 1: Quiz simple
```javascript
// Ultra-simple - juste passer la config
const QuizGeo = () => (
  <QuizContainer {...geoConfig} questionsData={GEO_QUESTIONS} />
);
```

### Exemple 2: Quiz avec logique custom
```javascript
const QuizAvance = () => {
  const { state, actions } = useQuiz(questionsData);
  
  // Logique métier custom
  const handleSpecialAction = () => {
    // Actions personnalisées
    actions.selectLevel('expert');
  };
  
  return (
    <QuizContainer
      {...config}
      questionsData={questionsData}
      onCustomAction={handleSpecialAction}
    />
  );
};
```

### Exemple 3: Écrans personnalisés
```javascript
const QuizPersonnalise = () => {
  const { state, actions } = useQuiz(questionsData);
  
  if (state.isComplete) {
    return <MonEcranResultatsCustom {...state} {...actions} />;
  }
  
  return <QuizContainer {...config} questionsData={questionsData} />;
};
```

## 🔧 Extension et personnalisation

### Ajouter de nouveaux types de questions

```javascript
// Nouveau type : questions à saisie libre
const QuestionSaisie = ({ question, onSubmit }) => {
  const [answer, setAnswer] = useState('');
  
  return (
    <div>
      <h3>{question.question}</h3>
      <input 
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={() => onSubmit(answer)}>
        Valider
      </button>
    </div>
  );
};
```

### Personnaliser le hook useQuiz

```javascript
// Hook étendu pour type spécifique
const useQuizMath = (questionsData) => {
  const quiz = useQuiz(questionsData);
  
  // Logique spécifique aux math
  const calculateComplexity = () => { /* ... */ };
  
  return {
    ...quiz,
    actions: {
      ...quiz.actions,
      calculateComplexity
    }
  };
};
```

## 🎯 Avantages de l'architecture modulaire

### ✅ **Séparation des préoccupations**
- Logique métier dans `useQuiz`
- UI dans les composants modulaires
- Configuration dans les fichiers de config

### ✅ **Réutilisabilité maximale**
- Hook réutilisable pour tout type de quiz
- Composants UI réutilisables
- Configuration externalisée

### ✅ **Testabilité**
- Logique métier testable indépendamment
- Composants UI testables isolément
- Tests d'intégration simples

### ✅ **Maintenabilité**
- Modifications localisées
- Code plus lisible
- Évolutions plus faciles

### ✅ **Flexibilité**
- Différents types de quiz possibles
- Écrans personnalisables
- Extensions faciles

## 🚀 Exemples en production

### Routes disponibles pour test :
- `/geo/modular` - Quiz géo avec architecture modulaire
- `/math/modular` - Quiz math avec architecture modulaire
- `/geo/framework` - Version framework original
- `/math/framework` - Version framework math

### Comparaison de code :

**Avant (Monolithique) :**
```javascript
// 500+ lignes dans un seul fichier
// Logique et UI mélangées
// Difficile à réutiliser
```

**Après (Modulaire) :**
```javascript
// Hook : 100 lignes (logique pure)
// Composants : 50-100 lignes chacun (UI pure)
// Container : 20 lignes (orchestration)
// Quiz final : 10 lignes (configuration)
```

Cette architecture permet de créer des quiz complexes avec une approche simple et maintenable ! 🎉