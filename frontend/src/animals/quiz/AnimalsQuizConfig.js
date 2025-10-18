// Configuration du Quiz Animaux pour Enfants
import { 
  Heart, 
  Fish, 
  Bird, 
  TreePine, 
  Home, 
  Shuffle 
} from 'lucide-react';

export const animalsQuizConfig = {
  title: "Quiz des Animaux 🐾",
  description: "Découvre le monde fascinant des animaux ! Teste tes connaissances sur nos amis à quatre pattes, à plumes et à nageoires.",
  icon: Heart,
  questionCount: 10,
  
  levels: [
    {
      id: '4-5ans',
      name: 'Petits Explorateurs',
      description: 'Pour les 4-5 ans - Questions très simples et amusantes !',
      icon: '🐣'
    },
    {
      id: '6-8ans', 
      name: 'Jeunes Aventuriers',
      description: 'Pour les 6-8 ans - Découvre plus sur les animaux !',
      icon: '🦊'
    },
    {
      id: '9-13ans',
      name: 'Experts Animaliers',
      description: 'Pour les 9-13 ans - Deviens un vrai expert des animaux !',
      icon: '🦁'
    }
  ],
  
  categories: [
    {
      id: 'domestiques',
      name: 'Animaux Domestiques',
      icon: Home
    },
    {
      id: 'sauvages',
      name: 'Animaux Sauvages', 
      icon: TreePine
    },
    {
      id: 'marins',
      name: 'Animaux Marins',
      icon: Fish
    },
    {
      id: 'oiseaux',
      name: 'Oiseaux',
      icon: Bird
    },
    {
      id: 'ferme',
      name: 'Animaux de la Ferme',
      icon: Heart
    },
    {
      id: 'mixed',
      name: 'Mélange de Tout !',
      icon: Shuffle
    }
  ]
};