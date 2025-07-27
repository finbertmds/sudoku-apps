// BoardService.ts

import {gameStorage} from '@sudoku/shared-storages';
import {
  ConstantEnv,
  InitGame,
  SavedGame,
  SavedHintCount,
  SavedMistake,
} from '@sudoku/shared-types';

/**
 * Call init() before using any other methods
 *
 * @param env - ConstantEnv
 */
export const BoardService = {
  maxHints: 0,

  init(env: ConstantEnv) {
    this.maxHints = env.MAX_HINTS ?? 0;
  },

  async save(state: SavedGame | InitGame) {
    try {
      if ('initialBoard' in state) {
        await gameStorage.saveInitGame(state);
      } else if ('savedBoard' in state) {
        const savedGame = await this.loadSaved();
        const updatedSavedGame: SavedGame = {
          ...(savedGame ?? {}),
          ...state,
          lastSaved: new Date(),
        };
        await gameStorage.saveSavedGame(updatedSavedGame);
      }
    } catch (e) {
      console.error('Failed to save game:', e);
    }
  },

  async loadInit(): Promise<InitGame | null> {
    try {
      return await gameStorage.getInitGame();
    } catch (e) {
      console.error('Failed to load game:', e);
      return null;
    }
  },

  async loadSaved(): Promise<SavedGame | null> {
    try {
      return await gameStorage.getSavedGame();
    } catch (e) {
      console.error('Failed to load game:', e);
      return null;
    }
  },

  async loadSavedTimePlayed(): Promise<number> {
    try {
      const savedGame = await this.loadSaved();
      if (savedGame) {
        return savedGame.savedTimePlayed;
      }
      return 0;
    } catch (e) {
      console.error('Failed to load saved time played:', e);
      return 0;
    }
  },

  async loadSavedMistake(): Promise<SavedMistake> {
    try {
      const savedGame = await this.loadSaved();
      if (savedGame) {
        return {
          savedMistake: savedGame.savedMistake,
          savedTotalMistake: savedGame.savedTotalMistake,
        };
      }
      return {
        savedMistake: 0,
        savedTotalMistake: 0,
      };
    } catch (e) {
      console.error('Failed to load saved mistake count:', e);
      return {
        savedMistake: 0,
        savedTotalMistake: 0,
      };
    }
  },

  async loadSavedHintCount(): Promise<SavedHintCount> {
    try {
      const savedGame = await this.loadSaved();
      if (savedGame) {
        return {
          savedHintCount: savedGame.savedHintCount,
          savedTotalHintCountUsed: savedGame.savedTotalHintCountUsed,
        };
      }
      return {
        savedHintCount: this.maxHints,
        savedTotalHintCountUsed: 0,
      };
    } catch (e) {
      console.error('Failed to load saved hint count:', e);
      return {
        savedHintCount: this.maxHints,
        savedTotalHintCountUsed: 0,
      };
    }
  },

  async clear() {
    try {
      await gameStorage.clearGameData();
    } catch (e) {
      console.error('Failed to clear saved game:', e);
    }
  },

  async clearSaved() {
    try {
      await gameStorage.clearSavedGameData();
    } catch (e) {
      console.error('Failed to clear saved game:', e);
    }
  },
};
