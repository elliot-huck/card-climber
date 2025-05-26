import { useGameStore } from '../state/gameStore';
import { GearCard } from './GearCard';

export function GearHand() {
  const { gearHand, drawGearCards, gearDeck } = useGameStore();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-text/70">
          Gear Hand ({gearHand.length})
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-text/50">
            Deck: {gearDeck.length}
          </span>
          <button
            onClick={() => drawGearCards(1)}
            disabled={gearDeck.length === 0}
            className="px-2 py-1 text-xs rounded bg-primary/10 hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Draw
          </button>
        </div>
      </div>

      <div className="flex space-x-3 overflow-x-auto pb-2">
        {gearHand.length === 0 ? (
          <div className="flex items-center justify-center w-full h-32 text-text/50 border-2 border-dashed border-border rounded-lg">
            <div className="text-center">
              <div className="text-2xl mb-1">🎒</div>
              <p className="text-sm">No gear in hand</p>
            </div>
          </div>
        ) : (
          gearHand.map((card) => (
            <div key={card.id} className="flex-shrink-0">
              <GearCard 
                card={card}
                draggable={true}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}