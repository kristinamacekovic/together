import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useSound, SoundType } from '../context/SoundContext';

const SoundPlayer: React.FC = () => {
  const { 
    currentSound, 
    volume, 
    isPlaying, 
    availableSounds,
    playSound, 
    stopSound, 
    setVolume, 
    togglePlay 
  } = useSound();
  
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleSoundChange = (soundType: SoundType) => {
    if (soundType === currentSound) {
      stopSound();
    } else {
      playSound(soundType);
    }
    setIsExpanded(false);
  };

  const getCurrentSoundLabel = () => {
    if (currentSound === 'none') return 'Select Sound';
    const sound = availableSounds.find(s => s.type === currentSound);
    return sound ? sound.label : 'Select Sound';
  };

  return (
    <div className="relative">
      <button
        onClick={toggleExpanded}
        className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        aria-expanded={isExpanded}
        aria-haspopup="true"
      >
        <Music className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {getCurrentSoundLabel()}
        </span>
      </button>

      {isExpanded && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 animate-fade-in">
          <div className="py-1">
            {availableSounds.map(sound => (
              <button
                key={sound.type}
                className={`w-full text-left px-4 py-2 text-sm ${
                  currentSound === sound.type
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleSoundChange(sound.type)}
              >
                {sound.label}
              </button>
            ))}
          </div>

          {currentSound !== 'none' && (
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={togglePlay}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label={isPlaying ? 'Mute sound' : 'Unmute sound'}
                >
                  {isPlaying ? (
                    <Volume2 className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  ) : (
                    <VolumeX className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  )}
                </button>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Volume: {Math.round(volume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SoundPlayer;