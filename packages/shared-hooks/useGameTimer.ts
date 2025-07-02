// useGameTimer.ts

import {BoardService} from '@sudoku/shared-services';
import {useEffect, useRef} from 'react';
import {useAppPause} from './useAppPause';

interface TimePlayedOptions {
  maxTimePlayed?: number;
  onLimitReached?: () => void;
}

export function useGameTimer(isRunning: boolean, options?: TimePlayedOptions) {
  const maxTimePlayed = options?.maxTimePlayed;
  const onLimitReached = options?.onLimitReached;

  const secondsRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load last played time from storage once
  useEffect(() => {
    BoardService.loadSavedTimePlayed().then((value) => {
      if (value != null) {
        try {
          const saved = parseInt(value.toString(), 10);
          if (!isNaN(saved)) {
            secondsRef.current = saved;
          }
        } catch (error) {
          console.error('Failed to parse saved time played:', error);
        }
      }
    });
  }, []);

  // Start or stop interval when isRunning changes
  useEffect(() => {
    if (isRunning) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  function startTimer() {
    if (intervalRef.current) {
      return;
    }
    intervalRef.current = setInterval(() => {
      secondsRef.current += 1;
      if (maxTimePlayed && secondsRef.current >= maxTimePlayed) {
        stopTimer();
        onLimitReached?.();
      }
    }, 1000);
  }

  function stopTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function resetTimer() {
    stopTimer();
    secondsRef.current = 0;
  }

  useAppPause(
    () => {
      stopTimer();
    },
    () => {},
  );

  return {
    getSeconds: () => secondsRef.current,
    stopTimer,
    resetTimer,
  };
}
