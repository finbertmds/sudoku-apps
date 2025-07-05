// BackgroundService.ts

import {appStorage} from '@sudoku/shared-storages';
import {
  AppEnv,
  DailyBackgrounds,
  UnsplashImageData,
} from '@sudoku/shared-types';
import axios from 'axios';

/**
 * Call init() first.
 *
 * @param env - AppEnv
 */
export const BackgroundService = {
  unsplashAccessKey: '',

  init(env: AppEnv) {
    this.unsplashAccessKey = env.UNSPLASH_ACCESS_KEY;
  },

  async load(): Promise<DailyBackgrounds | null> {
    const cached = appStorage.getBackgrounds();
    return cached;
  },

  async save(data: DailyBackgrounds) {
    try {
      appStorage.setBackgrounds(data);
    } catch (err) {
      console.error('Failed to save background', err);
    }
  },

  async clear(): Promise<void> {
    try {
      appStorage.clearBackgrounds();
    } catch (err) {
      console.error('Failed to clear background', err);
    }
  },

  async fetchUnsplashImage(query: string): Promise<UnsplashImageData | null> {
    try {
      if (!this.unsplashAccessKey) {
        return null;
      }

      const res = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          query,
          orientation: 'landscape',
          content_filter: 'high',
        },
        headers: {
          Authorization: `Client-ID ${this.unsplashAccessKey}`,
        },
      });
      if (!res || !res.data || !res.data.urls) {
        return null;
      }
      // return res.data?.urls?.regular ?? null;
      return {
        url: res.data?.urls?.regular ?? null,
        photographerName: res.data?.user?.name ?? null,
        photographerLink: res.data?.user?.links?.html ?? null,
      };
    } catch (err) {
      console.warn('Unsplash fetch failed:', query, err);
      return null;
    }
  },
};
