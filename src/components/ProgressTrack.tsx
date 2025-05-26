import { useGameStore } from '../state/gameStore';

export function ProgressTrack() {
  const { player, currentZone, restAtLodge } = useGameStore();
  
  const progressPercentage = (player.progress / player.progressGoal) * 100;
  const canRestAtLodge = player.progress >= player.progressGoal;

  return (
    <div className="h-full flex flex-col items-center py-4">
      {/* Zone Icon */}
      <div className="text-2xl mb-3">{currentZone.emoji}</div>
      
      {/* Progress Bar (Vertical) */}
      <div className="flex-1 w-6 bg-text/10 rounded-full relative overflow-hidden">
        <div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent to-accent/60 transition-all duration-500 ease-out rounded-full"
          style={{ height: `${Math.min(progressPercentage, 100)}%` }}
        />
        
        {/* Progress Markers */}
        <div className="absolute inset-0 flex flex-col justify-between py-1">
          {Array.from({ length: Math.min(player.progressGoal, 10) }, (_, i) => (
            <div
              key={i}
              className={`
                w-1 h-1 rounded-full mx-auto
                ${i < player.progress ? 'bg-white' : 'bg-text/30'}
              `}
            />
          ))}
        </div>
      </div>

      {/* Progress Text */}
      <div className="mt-3 text-center">
        <div className="text-xs text-text/70">Progress</div>
        <div className="text-sm font-semibold">
          {player.progress}/{player.progressGoal}
        </div>
      </div>

      {/* Lodge Button */}
      {canRestAtLodge && (
        <button
          onClick={restAtLodge}
          className="mt-4 p-2 rounded-lg bg-success text-white hover:bg-success/80 transition-colors animate-pulse"
          title="Rest at Lodge"
        >
          🏠
        </button>
      )}

      {/* Energy Indicator */}
      <div className="mt-4 text-center">
        <div className="text-xs text-text/70">Energy</div>
        <div className="flex flex-col space-y-1">
          {Array.from({ length: player.maxEnergy }, (_, i) => (
            <div
              key={i}
              className={`
                w-3 h-2 rounded-sm
                ${i < player.energy ? 'bg-info' : 'bg-text/20'}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}