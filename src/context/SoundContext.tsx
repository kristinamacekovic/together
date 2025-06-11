import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';

export type SoundType = 'rain' | 'cafe' | 'forest' | 'whitenoise' | 'none';

interface Sound {
  type: SoundType;
  label: string;
  url: string;
}

interface SoundContextType {
  currentSound: SoundType;
  volume: number;
  isPlaying: boolean;
  availableSounds: Sound[];
  playSound: (type: SoundType) => void;
  stopSound: () => void;
  setVolume: (volume: number) => void;
  togglePlay: () => void;
}

const sounds: Sound[] = [
  { type: 'none', label: 'None', url: '' },
  { type: 'rain', label: 'Rainfall', url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c2c5938484.mp3?filename=rain-and-thunder-113218.mp3' },
  { type: 'cafe', label: 'Coffee Shop', url: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_80e8ea9986.mp3?filename=inside-a-restaurant-115679.mp3' },
  { type: 'forest', label: 'Forest', url: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_8a49af9d23.mp3?filename=forest-with-small-river-birds-and-nature-field-recording-6735.mp3' },
  { type: 'whitenoise', label: 'White Noise', url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d1718d7da8.mp3?filename=white-noise-sleep-aid-21956.mp3' },
];

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSound, setCurrentSound] = useState<SoundType>('none');
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  const playSound = (type: SoundType) => {
    // Stop current sound if playing
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current = null;
    }

    if (type === 'none') {
      setCurrentSound('none');
      setIsPlaying(false);
      return;
    }

    // Get sound URL
    const soundToPlay = sounds.find(s => s.type === type);
    if (!soundToPlay) return;

    // Create and play new sound
    const howl = new Howl({
      src: [soundToPlay.url],
      loop: true,
      volume: volume,
      html5: true,
    });

    howl.play();
    soundRef.current = howl;
    setCurrentSound(type);
    setIsPlaying(true);
  };

  const stopSound = () => {
    if (soundRef.current) {
      soundRef.current.stop();
      setIsPlaying(false);
    }
  };

  const adjustVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (soundRef.current) {
      soundRef.current.volume(newVolume);
    }
  };

  const togglePlay = () => {
    if (!soundRef.current || currentSound === 'none') return;
    
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
      }
    };
  }, []);

  return (
    <SoundContext.Provider 
      value={{ 
        currentSound, 
        volume, 
        isPlaying,
        availableSounds: sounds,
        playSound, 
        stopSound, 
        setVolume: adjustVolume,
        togglePlay,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};