import { useGameStore } from '../state/gameStore';

export function ProgressTrack() {
  const { player, currentZone, restAtLodge } = useGameStore();
  
  const progressPercentage = (player.progress / player.progressGoal) * 100;
  const canRestAtLodge = player.progress >= player.progressGoal;

  return (
    <div className="h-full flex flex-col items-center">
      {/* Progress Track - Rectangular segments */}
      <div className="flex flex-col space-y-2 flex-1 justify-center">
        {Array.from({ length: player.progressGoal }, (_, i) => {
          // Reverse the index to show progress from bottom to top
          const segmentIndex = player.progressGoal - 1 - i;
          const isFilled = segmentIndex < player.progress;
          
          return (
            <div
              key={i}
              className={`
                progress-segment w-16 h-8 transition-all duration-300
                ${isFilled ? 'filled' : ''}
              `}
            />
          );
        })}
      </div>

      {/* Lodge Button */}
      {canRestAtLodge && (
        <button
          onClick={restAtLodge}
          className="mt-4 p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors animate-pulse"
          title="Rest at Lodge"
        >
          🏠
        </button>
      )}
    </div>
  );
}