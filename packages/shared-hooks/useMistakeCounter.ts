// useMistakeCounter.ts

import {BoardService} from '@sudoku/shared-services';
import {useEffect, useState} from 'react';

interface MistakeOptions {
  maxMistakes?: number;
  onLimitReached?: () => void;
}

export function useMistakeCounter(options?: MistakeOptions) {
  const [totalMistakes, setTotalMistakes] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [limitMistakeReached, setLimitMistakeReached] = useState(false);
  const maxMistakes = options?.maxMistakes;
  const onLimitReached = options?.onLimitReached;

  // Load last mistakes from storage once
  useEffect(() => {
    BoardService.loadSavedMistake().then((value) => {
      setMistakes(value.savedMistake);
      setTotalMistakes(value.savedTotalMistake);
    });
  }, []);

  const incrementMistake = () => {
    setTotalMistakes((prev) => prev + 1);
    setMistakes((prev) => {
      const updated = prev + 1;
      if (maxMistakes && updated >= maxMistakes) {
        setLimitMistakeReached(true);
        if (onLimitReached) {
          onLimitReached();
        }
      }
      return updated;
    });
  };

  const resetMistakes = () => {
    setMistakes(0);
    setLimitMistakeReached(false);
  };

  return {
    totalMistakes,
    mistakes,
    limitMistakeReached,
    incrementMistake,
    resetMistakes,
  };
}
