// QuoteService.ts

import {appStorage} from '@sudoku/shared-storages';
import {DailyQuotes} from '@sudoku/shared-types';
import axios from 'axios';

export const QuoteService = {
  async load(): Promise<DailyQuotes | null> {
    const cached = await appStorage.getQuotes();
    return cached;
  },

  async save(data: DailyQuotes) {
    try {
      await appStorage.setQuotes(data);
    } catch (err) {
      console.error('Failed to save quote', err);
    }
  },

  async clear(): Promise<void> {
    try {
      await appStorage.clearQuotes();
    } catch (err) {
      console.error('Failed to clear quote', err);
    }
  },

  async fetchQuote(): Promise<DailyQuotes | null> {
    if (__DEV__) {
      return null;
    }
    try {
      const res = await axios.get('https://zenquotes.io/api/today');
      if (res.data && res.data.length > 0) {
        return res.data[0];
      }
    } catch (err) {
      console.error('Quote fetch failed:', err);
    }
    return null;
  },
};
