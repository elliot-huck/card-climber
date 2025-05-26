import { useGameStore } from '../state/gameStore';

export function TopBar() {
  const { 
    currentZone, 
    player, 
    toggleBookMenu, 
    advanceTime 
  } = useGameStore();

  const timeOfDayEmoji = {
    dawn: '🌅',
    morning: '🌞',
    noon: '☀️',
    afternoon: '🌤️',
    evening: '🌇',
    dusk: '🌆',
    night: '🌙'
  };

  return (
    <div className="bg-surface/90 backdrop-blur-sm border-b border-border p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Zone Info */}
        <div className="flex items-center space-x-4">
          <div className="text-2xl">{currentZone.emoji}</div>
          <div>
            <h1 className="text-xl font-bold text-primary">
              {currentZone.name}
            </h1>
            <p className="text-sm text-text/70">
              {currentZone.description}
            </p>
          </div>
        </div>

        {/* Center: Player Stats */}
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-sm text-text/70">Energy</div>
            <div className="text-lg font-semibold">
              {player.energy}/{player.maxEnergy}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-text/70">Progress</div>
            <div className="text-lg font-semibold">
              {player.progress}/{player.progressGoal}
            </div>
          </div>
        </div>

        {/* Right: Time & Menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={advanceTime}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
            title="Advance Time"
          >
            <span className="text-xl">
              {timeOfDayEmoji[player.timeOfDay]}
            </span>
            <span className="capitalize text-sm font-medium">
              {player.timeOfDay}
            </span>
          </button>

          <button
            onClick={() => toggleBookMenu()}
            className="px-4 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/80 transition-colors"
          >
            📖 Journal
          </button>
        </div>
      </div>
    </div>
  );
}