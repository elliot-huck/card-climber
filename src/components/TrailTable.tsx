import { useGameStore } from '../state/gameStore';
import { TrailCard } from './TrailCard';

export function TrailTable() {
  const { activeTrails, drawTrailCards } = useGameStore();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => drawTrailCards(1)}
          className="px-3 py-2 text-sm rounded bg-green-600 hover:bg-green-700 transition-colors text-white"
        >
          Scout Ahead
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        {activeTrails.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-white">
            <div className="text-center">
              <div className="text-4xl mb-2">🏔️</div>
              <p>No trails visible ahead.</p>
              <p className="text-sm">Scout ahead to find your path!</p>
            </div>
          </div>
        ) : (
          activeTrails.map((trail) => (
            <TrailCard 
              key={trail.id} 
              card={trail}
            />
          ))
        )}
      </div>
    </div>
  );
}