import { CAPITALS } from "./data/capitals";
import { CONTINENTS } from "./data/continents";
import { COUNTRIES } from "./data/countries";
import { LANDMARKS } from "./data/landmarks";
import { OCEANS } from "./data/oceans";

export const CATEGORIES = {
  CONTINENTS: 'continents',
  COUNTRIES: 'pays',
  CAPITALS: 'capitales',
  OCEANS: 'oceans',
  LANDMARKS: 'monuments',
  MIXED: 'melange'
};

// Base de données complète de questions géographiques
export const GEOGRAPHY_QUESTIONS = {
  [CATEGORIES.CONTINENTS]: CONTINENTS,
  [CATEGORIES.OCEANS]: OCEANS,

  [CATEGORIES.COUNTRIES]: COUNTRIES,

  [CATEGORIES.CAPITALS]: CAPITALS,

  [CATEGORIES.LANDMARKS]: LANDMARKS
};
