// useDailyQuote.ts

import {DailyQuotes} from '@sudoku/shared-types';
import {getDailyQuote} from '@sudoku/shared-utils';
import {useEffect, useState} from 'react';

export const useDailyQuote = () => {
  const [quote, setQuote] = useState<DailyQuotes | null>(null);

  const loadQuote = async () => {
    try {
      const dailyQuote = await getDailyQuote();
      if (!dailyQuote) {
        return;
      }
      setQuote(dailyQuote);
    } catch (error) {
      console.error('Failed to fetch quote:', error);
    }
  };

  useEffect(() => {
    loadQuote();
  }, []);

  return {quote, loadQuote};
};
