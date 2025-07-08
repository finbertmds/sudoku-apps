// playerProfileStorage.ts

import {storage} from '@sudoku/shared-storages';
import {PlayerProfile} from '@sudoku/shared-types';
import {
  DEFAULT_PLAYER_ID,
  STORAGE_KEY_CURRENT_PLAYER_ID,
  STORAGE_KEY_PLAYERS,
} from '@sudoku/shared-utils';

const getAllPlayers = async (): Promise<PlayerProfile[]> => {
  try {
    const raw = await storage.getString(STORAGE_KEY_PLAYERS);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
};

const savePlayers = async (players: PlayerProfile[]) => {
  try {
    await storage.set(STORAGE_KEY_PLAYERS, JSON.stringify(players));
  } catch (_) {}
};

const clearPlayers = async () => {
  try {
    await storage.delete(STORAGE_KEY_PLAYERS);
  } catch (_) {}
};

const getCurrentPlayerId = async (): Promise<string> => {
  try {
    const id = await storage.getString(STORAGE_KEY_CURRENT_PLAYER_ID);
    return id || DEFAULT_PLAYER_ID;
  } catch (_) {
    return DEFAULT_PLAYER_ID;
  }
};

const setCurrentPlayerId = async (id: string) => {
  try {
    await storage.set(STORAGE_KEY_CURRENT_PLAYER_ID, id);
  } catch (_) {}
};

const clearCurrentPlayerId = async () => {
  try {
    await storage.delete(STORAGE_KEY_CURRENT_PLAYER_ID);
  } catch (_) {}
};

const getCurrentPlayer = async (): Promise<PlayerProfile | null> => {
  try {
    const id = await getCurrentPlayerId();
    const all = await getAllPlayers();
    return all.find((p) => p.id === id) || null;
  } catch (_) {
    return null;
  }
};

const getPlayerById = async (id: string): Promise<PlayerProfile | null> => {
  try {
    const all = await getAllPlayers();
    return all.find((p) => p.id === id) || null;
  } catch (_) {
    return null;
  }
};

const updatePlayer = async (player: PlayerProfile) => {
  try {
    const all = await getAllPlayers();
    const updated = all.map((p) => (p.id === player.id ? player : p));
    savePlayers(updated);
  } catch (_) {}
};

const clearAll = async () => {
  try {
    await clearPlayers();
    await clearCurrentPlayerId();
  } catch (_) {}
};

export const playerProfileStorage = {
  getAllPlayers,
  savePlayers,
  getCurrentPlayerId,
  setCurrentPlayerId,
  getCurrentPlayer,
  clearCurrentPlayerId,
  clearPlayers,
  clearAll,
  getPlayerById,
  updatePlayer,
};
