import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TimerConfig {
  focus: number;
  shortBreak: number;
  longBreak: number;
  rounds: number;
}

interface TimerSettingsProps {
  config: TimerConfig;
  onUpdate: (config: Partial<TimerConfig>) => void;
  onClose: () => void;
}

const TimerSettings: React.FC<TimerSettingsProps> = ({
  config,
  onUpdate,
  onClose,
}) => {
  const [formValues, setFormValues] = useState<TimerConfig>(config);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: parseInt(value, 10),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formValues);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Timer Settings</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close settings"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="focus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Focus Duration (minutes)
              </label>
              <input
                type="number"
                id="focus"
                name="focus"
                min="1"
                max="120"
                value={formValues.focus}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label htmlFor="shortBreak" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Short Break (minutes)
              </label>
              <input
                type="number"
                id="shortBreak"
                name="shortBreak"
                min="1"
                max="30"
                value={formValues.shortBreak}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label htmlFor="longBreak" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Long Break (minutes)
              </label>
              <input
                type="number"
                id="longBreak"
                name="longBreak"
                min="1"
                max="60"
                value={formValues.longBreak}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label htmlFor="rounds" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rounds before Long Break
              </label>
              <input
                type="number"
                id="rounds"
                name="rounds"
                min="1"
                max="10"
                value={formValues.rounds}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimerSettings;