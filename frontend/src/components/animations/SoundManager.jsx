// Gestionnaire de sons réutilisable pour les exercices
class SoundManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.initialized = false;
  }

  // Initialiser le contexte audio (nécessaire après une interaction utilisateur)
  async initialize() {
    if (this.initialized) return;
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      await this.createSounds();
      this.initialized = true;
    } catch (error) {
      console.warn('Audio context not supported:', error);
      this.initialized = false;
    }
  }

  // Créer les sons synthétiques
  async createSounds() {
    if (!this.audioContext) return;

    // Son de succès - mélodie joyeuse
    this.sounds.success = () => this.playMelody([
      { freq: 523.25, duration: 0.15 }, // C5
      { freq: 659.25, duration: 0.15 }, // E5
      { freq: 783.99, duration: 0.3 }   // G5
    ], 'sine', 0.3);

    // Son d'erreur - ton doux et encourageant
    this.sounds.error = () => this.playMelody([
      { freq: 392.00, duration: 0.2 }, // G4
      { freq: 349.23, duration: 0.3 }  // F4
    ], 'sine', 0.2);

    // Sons alternatifs pour la variété
    this.sounds.successAlt1 = () => this.playMelody([
      { freq: 440.00, duration: 0.1 }, // A4
      { freq: 554.37, duration: 0.1 }, // C#5
      { freq: 659.25, duration: 0.1 }, // E5
      { freq: 880.00, duration: 0.2 }  // A5
    ], 'triangle', 0.25);

    this.sounds.successAlt2 = () => this.playMelody([
      { freq: 587.33, duration: 0.15 }, // D5
      { freq: 698.46, duration: 0.15 }, // F5
      { freq: 830.61, duration: 0.25 }  // G#5
    ], 'square', 0.15);
  }

  // Jouer une mélodie
  async playMelody(notes, waveType = 'sine', baseVolume = 0.3) {
    if (!this.audioContext || this.audioContext.state === 'suspended') {
      await this.audioContext?.resume();
    }

    let startTime = this.audioContext.currentTime;

    notes.forEach((note, index) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(note.freq, startTime);
      oscillator.type = waveType;

      // Envelope pour un son plus doux
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(baseVolume, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + note.duration);

      startTime += note.duration;
    });
  }

  // Jouer un son de succès (choix aléatoire)
  async playSuccess() {
    if (!this.initialized) return;
    
    const successSounds = ['success', 'successAlt1', 'successAlt2'];
    const randomSound = successSounds[Math.floor(Math.random() * successSounds.length)];
    
    try {
      await this.sounds[randomSound]();
    } catch (error) {
      console.warn('Error playing success sound:', error);
    }
  }

  // Jouer un son d'erreur
  async playError() {
    if (!this.initialized) return;
    
    try {
      await this.sounds.error();
    } catch (error) {
      console.warn('Error playing error sound:', error);
    }
  }

  // Jouer un son de clic/interaction
  async playClick() {
    if (!this.initialized) return;
    
    try {
      await this.playMelody([
        { freq: 800, duration: 0.05 }
      ], 'square', 0.1);
    } catch (error) {
      console.warn('Error playing click sound:', error);
    }
  }

  // Jouer un son de notification douce
  async playNotification() {
    if (!this.initialized) return;
    
    try {
      await this.playMelody([
        { freq: 523.25, duration: 0.1 },
        { freq: 659.25, duration: 0.1 }
      ], 'sine', 0.2);
    } catch (error) {
      console.warn('Error playing notification sound:', error);
    }
  }
}

// Instance singleton
const soundManager = new SoundManager();

// Hook React pour utiliser le gestionnaire de sons
import { useEffect, useRef } from 'react';

export const useSoundManager = () => {
  const initialized = useRef(false);

  useEffect(() => {
    // Initialiser les sons au premier clic/touch
    const initializeOnInteraction = async () => {
      if (!initialized.current) {
        await soundManager.initialize();
        initialized.current = true;
        document.removeEventListener('click', initializeOnInteraction);
        document.removeEventListener('touchstart', initializeOnInteraction);
      }
    };

    document.addEventListener('click', initializeOnInteraction);
    document.addEventListener('touchstart', initializeOnInteraction);

    return () => {
      document.removeEventListener('click', initializeOnInteraction);
      document.removeEventListener('touchstart', initializeOnInteraction);
    };
  }, []);

  return {
    playSuccess: soundManager.playSuccess.bind(soundManager),
    playError: soundManager.playError.bind(soundManager),
    playClick: soundManager.playClick.bind(soundManager),
    playNotification: soundManager.playNotification.bind(soundManager)
  };
};

export default soundManager;