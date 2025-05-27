import type { GameState, SaveData } from '../types';

const SAVE_KEY = 'card-climber-save';
const CURRENT_VERSION = '1.0.0';

/**
 * Saves the current game state to localStorage
 */
export function saveGameState(gameState: GameState): boolean {
  try {
    const saveData: SaveData = {
      version: CURRENT_VERSION,
      timestamp: new Date().toISOString(),
      gameState,
      uiState: {
        bookMenuOpen: false,
        bookMenuTab: 'journal',
        selectedCard: null,
        draggedCard: null,
        notification: null,
      },
    };
    
    const serializedData = JSON.stringify(saveData);
    localStorage.setItem(SAVE_KEY, serializedData);
    
    console.log('Game saved successfully at', saveData.timestamp);
    return true;
  } catch (error) {
    console.error('Failed to save game:', error);
    return false;
  }
}

/**
 * Loads the game state from localStorage
 */
export function loadGameState(): GameState | null {
  try {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (!savedData) {
      console.log('No saved game found');
      return null;
    }
    
    const saveData: SaveData = JSON.parse(savedData);
    
    // Version compatibility check
    if (saveData.version !== CURRENT_VERSION) {
      console.warn(`Save version mismatch: ${saveData.version} vs ${CURRENT_VERSION}`);
      // For now, we'll still try to load it, but in the future we might migrate
    }
    
    console.log('Game loaded successfully from', saveData.timestamp);
    return saveData.gameState;
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
}

/**
 * Checks if a saved game exists
 */
export function hasSavedGame(): boolean {
  return localStorage.getItem(SAVE_KEY) !== null;
}

/**
 * Deletes the saved game from localStorage
 */
export function deleteSavedGame(): boolean {
  try {
    localStorage.removeItem(SAVE_KEY);
    console.log('Saved game deleted');
    return true;
  } catch (error) {
    console.error('Failed to delete saved game:', error);
    return false;
  }
}

/**
 * Gets save data metadata without loading the full game state
 */
export function getSaveMetadata(): { version: string; timestamp: string } | null {
  try {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (!savedData) return null;
    
    const saveData: SaveData = JSON.parse(savedData);
    return {
      version: saveData.version,
      timestamp: saveData.timestamp,
    };
  } catch (error) {
    console.error('Failed to get save metadata:', error);
    return null;
  }
}

/**
 * Exports save data as a JSON string for backup/sharing
 */
export function exportSaveData(): string | null {
  try {
    const savedData = localStorage.getItem(SAVE_KEY);
    return savedData;
  } catch (error) {
    console.error('Failed to export save data:', error);
    return null;
  }
}

/**
 * Imports save data from a JSON string
 */
export function importSaveData(saveDataJson: string): boolean {
  try {
    // Validate the JSON structure
    const saveData: SaveData = JSON.parse(saveDataJson);
    
    if (!saveData.version || !saveData.timestamp || !saveData.gameState) {
      throw new Error('Invalid save data structure');
    }
    
    localStorage.setItem(SAVE_KEY, saveDataJson);
    console.log('Save data imported successfully');
    return true;
  } catch (error) {
    console.error('Failed to import save data:', error);
    return false;
  }
}

/**
 * Creates a backup of the current save before overwriting
 */
export function backupCurrentSave(): string | null {
  const currentSave = localStorage.getItem(SAVE_KEY);
  if (currentSave) {
    const backupKey = `${SAVE_KEY}-backup-${Date.now()}`;
    localStorage.setItem(backupKey, currentSave);
    console.log('Save backed up to', backupKey);
  }
  return currentSave;
}

/**
 * Gets storage usage information
 */
export function getStorageInfo(): { used: number; available: number; percentage: number } {
  try {
    const totalStorage = 5 * 1024 * 1024; // 5MB typical localStorage limit
    let usedStorage = 0;
    
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        usedStorage += localStorage.getItem(key)?.length || 0;
      }
    }
    
    return {
      used: usedStorage,
      available: totalStorage - usedStorage,
      percentage: (usedStorage / totalStorage) * 100,
    };
  } catch (error) {
    console.error('Failed to get storage info:', error);
    return { used: 0, available: 0, percentage: 0 };
  }
}