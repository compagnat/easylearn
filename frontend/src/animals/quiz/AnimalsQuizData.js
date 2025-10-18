// Questions du Quiz Animaux pour Enfants
// Importation des données séparées par catégorie

import { DOMESTIC_ANIMALS_QUESTIONS } from './data/DomesticsAnimals.js';
import { WILD_ANIMALS_QUESTIONS } from './data/WildAnimals.js';
import { MARINE_ANIMALS_QUESTIONS } from './data/MarineAnimals.js';
import { BIRDS_QUESTIONS } from './data/Birds.js';
import { FARM_ANIMALS_QUESTIONS } from './data/FarmAnimals.js';

export const ANIMALS_QUIZ_QUESTIONS = {
  domestiques: DOMESTIC_ANIMALS_QUESTIONS,
  sauvages: WILD_ANIMALS_QUESTIONS,
  marins: MARINE_ANIMALS_QUESTIONS,
  oiseaux: BIRDS_QUESTIONS,
  ferme: FARM_ANIMALS_QUESTIONS,
  mixed: [
    // Cette catégorie mélange toutes les autres catégories
    // Le framework sélectionnera automatiquement dans toutes les catégories
  ]
};