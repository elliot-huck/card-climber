import { useGameStore } from '../state/gameStore';
import { TrailCard } from './TrailCard';

export function TrailTable() {
  const { activeTrails, drawTrailCards } = useGameStore();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary">Trail Ahead</h2>
        <button
          onClick={() => drawTrailCards(1)}
          className="px-3 py-1 text-sm rounded bg-accent/20 hover:bg-accent/30 transition-colors"
        >
          Scout Ahead
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        {activeTrails.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-text/50">
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