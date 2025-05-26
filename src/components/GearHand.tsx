import { useGameStore } from '../state/gameStore';
import { GearCard } from './GearCard';

export function GearHand() {
  const { gearHand, drawGearCards, gearDeck } = useGameStore();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">
          Gear Hand ({gearHand.length})
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-white/70">
            Deck: {gearDeck.length}
          </span>
          <button
            onClick={() => drawGearCards(1)}
            disabled={gearDeck.length === 0}
            className="px-3 py-2 text-sm rounded bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
          >
            Draw
          </button>
        </div>
      </div>

      <div className="flex space-x-3 overflow-x-auto pb-2">
        {gearHand.length === 0 ? (
          <div className="flex items-center justify-center w-full h-32 text-white/50 border-2 border-dashed border-white/30 rounded-lg">
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