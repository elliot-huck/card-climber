import { useGameStore } from '../../state/gameStore';
import { deleteSavedGame, exportSaveData, getSaveMetadata } from '../../utils/saveLoad';

export function SettingsTab() {
  const { 
    gameSettings, 
    resetGame, 
    saveGame,
    showNotification 
  } = useGameStore();

  const saveMetadata = getSaveMetadata();

  const handleExportSave = () => {
    const saveData = exportSaveData();
    if (saveData) {
      const blob = new Blob([saveData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `card-climber-save-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showNotification({
        type: 'success',
        title: 'Save Exported',
        message: 'Your save file has been downloaded.',
        duration: 3000,
      });
    }
  };

  const handleDeleteSave = () => {
    if (window.confirm('Are you sure you want to delete your saved game? This cannot be undone.')) {
      deleteSavedGame();
      resetGame();
      showNotification({
        type: 'info',
        title: 'Save Deleted',
        message: 'Your saved game has been deleted and a new game started.',
        duration: 3000,
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-primary">Settings</h3>
        <p className="text-sm text-text/70">Game preferences and save management</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Game Settings */}
        <div>
          <h4 className="text-md font-semibold text-primary mb-3">Game Settings</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Enable Animations</span>
              <span className={gameSettings.enableAnimations ? 'text-success' : 'text-text/50'}>
                {gameSettings.enableAnimations ? '✓ On' : '✗ Off'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Auto-Save</span>
              <span className={gameSettings.autoSave ? 'text-success' : 'text-text/50'}>
                {gameSettings.autoSave ? '✓ On' : '✗ Off'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Difficulty</span>
              <span className="capitalize">{gameSettings.difficulty}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Sound Effects</span>
              <span className={gameSettings.soundEnabled ? 'text-success' : 'text-text/50'}>
                {gameSettings.soundEnabled ? '✓ On' : '✗ Off'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Music</span>
              <span className={gameSettings.musicEnabled ? 'text-success' : 'text-text/50'}>
                {gameSettings.musicEnabled ? '✓ On' : '✗ Off'}
              </span>
            </div>
          </div>
        </div>

        {/* Save Management */}
        <div>
          <h4 className="text-md font-semibold text-primary mb-3">Save Management</h4>
          
          {saveMetadata && (
            <div className="bg-surface/50 rounded-lg p-3 mb-3">
              <div className="text-sm space-y-1">
                <div>
                  <span className="font-medium">Last Saved:</span>
                  <span className="ml-2">
                    {new Date(saveMetadata.timestamp).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Version:</span>
                  <span className="ml-2">{saveMetadata.version}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <button
              onClick={saveGame}
              className="w-full py-2 px-4 rounded bg-primary text-white hover:bg-primary/80 transition-colors"
            >
              💾 Save Game
            </button>
            
            <button
              onClick={handleExportSave}
              className="w-full py-2 px-4 rounded bg-secondary text-white hover:bg-secondary/80 transition-colors"
            >
              📤 Export Save
            </button>
            
            <button
              onClick={handleDeleteSave}
              className="w-full py-2 px-4 rounded bg-error text-white hover:bg-error/80 transition-colors"
            >
              🗑️ Delete Save
            </button>
          </div>
        </div>

        {/* About */}
        <div>
          <h4 className="text-md font-semibold text-primary mb-3">About</h4>
          <div className="text-sm text-text/70 space-y-2">
            <p>Card Climber v1.0.0</p>
            <p>A cozy deck-building mountain adventure game.</p>
            <p>Built with React, TypeScript, and TailwindCSS.</p>
          </div>
        </div>
      </div>
    </div>
  );
}