// gameStorage.ts

import {storage} from '@sudoku/shared-storages';
import {InitGame, SavedGame} from '@sudoku/shared-types';
import {
  STORAGE_KEY_INIT_GAME,
  STORAGE_KEY_SAVED_GAME,
} from '@sudoku/shared-utils';

const saveInitGame = async (game: InitGame) => {
  try {
    await storage.set(STORAGE_KEY_INIT_GAME, JSON.stringify(game));
  } catch (_) {}
};

const getInitGame = async (): Promise<InitGame | null> => {
  try {
    const json = await storage.getString(STORAGE_KEY_INIT_GAME);
    return json ? JSON.parse(json) : null;
  } catch (_) {
    return null;
  }
};

const clearInitGame = async () => {
  try {
    await storage.delete(STORAGE_KEY_INIT_GAME);
  } catch (_) {}
};

const saveSavedGame = async (game: SavedGame) => {
  try {
    await storage.set(STORAGE_KEY_SAVED_GAME, JSON.stringify(game));
  } catch (_) {}
};

const getSavedGame = async (): Promise<SavedGame | null> => {
  try {
    const json = await storage.getString(STORAGE_KEY_SAVED_GAME);
    return json ? JSON.parse(json) : null;
  } catch (_) {
    return null;
  }
};

const clearSavedGameData = async () => {
  try {
    await storage.delete(STORAGE_KEY_SAVED_GAME);
  } catch (_) {}
};

const clearGameData = async () => {
  try {
    await clearInitGame();
    await clearSavedGameData();
  } catch (_) {}
};

export const gameStorage = {
  saveInitGame,
  getInitGame,
  clearInitGame,
  saveSavedGame,
  getSavedGame,
  clearGameData,
  clearSavedGameData,
};
