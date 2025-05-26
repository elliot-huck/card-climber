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
    <div className="header-area p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Zone & Time Info */}
        <div className="flex items-center space-x-6">
          <div className="text-left">
            <div className="text-xs text-gray-600 mb-1">Zone & Time of day</div>
            <div className="font-bold text-lg">
              Zone 1 ({currentZone.name})
            </div>
          </div>
        </div>

        {/* Center: Player Stats */}
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-sm text-gray-600">Energy</div>
            <div className="text-lg font-semibold">
              {player.energy}/{player.maxEnergy}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-600">Progress</div>
            <div className="text-lg font-semibold">
              {player.progress}/{player.progressGoal}
            </div>
          </div>
        </div>

        {/* Right: Time & Menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={advanceTime}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors"
            title="Advance Time"
          >
            <span className="text-xl">
              {timeOfDayEmoji[player.timeOfDay]}
            </span>
            <span className="capitalize text-sm font-medium text-gray-800">
              {player.timeOfDay}
            </span>
          </button>

          <button
            onClick={() => toggleBookMenu()}
            className="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition-colors flex items-center space-x-2"
          >
            <span className="text-red-600 bg-white px-2 py-1 rounded text-xs">📚</span>
            <span>Journal</span>
          </button>
        </div>
      </div>
    </div>
  );
}