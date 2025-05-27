import { useState } from 'react';
import { useGameStore } from '../state/gameStore';
import type { TrailCard as TrailCardType } from '../types';

interface TrailCardProps {
  card: TrailCardType;
}

export function TrailCard({ card }: TrailCardProps) {
  const { gearHand, playGearCard, completeTrailCard } = useGameStore();
  const [draggedOver, setDraggedOver] = useState(false);
  const [usedGearIds, setUsedGearIds] = useState<string[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = () => {
    setDraggedOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(false);
    
    const gearCardId = e.dataTransfer.getData('text/plain');
    const gearCard = gearHand.find(card => card.id === gearCardId);
    
    if (gearCard && !usedGearIds.includes(gearCardId)) {
      playGearCard(gearCardId, card.id);
      setUsedGearIds(prev => [...prev, gearCardId]);
    }
  };

  const getTotalStats = () => {
    const usedGear = gearHand.filter(gear => usedGearIds.includes(gear.id));
    const totals = {
      strength: 0,
      endurance: 0,
      warmth: 0,
      navigation: 0,
      comfort: 0
    };

    usedGear.forEach(gear => {
      gear.effects.forEach(effect => {
        totals[effect.type] += effect.value;
      });
    });

    return totals;
  };

  const canComplete = () => {
    const totals = getTotalStats();
    return card.requirements.every(req => totals[req.type] >= req.value);
  };

  const handleComplete = () => {
    if (canComplete()) {
      completeTrailCard(card.id, usedGearIds);
      setUsedGearIds([]);
    }
  };

  const totals = getTotalStats();

  return (
    <div
      className={`
        card card-trail w-full transition-all duration-200
        ${draggedOver ? 'ring-2 ring-yellow-400 bg-yellow-400/10' : ''}
        ${canComplete() ? 'ring-2 ring-green-400' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-start space-x-4">
        <div className="text-3xl">{card.emoji}</div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-white">{card.name}</h3>
            <div className="text-sm px-2 py-1 rounded bg-black/20 text-white">
              Difficulty: {card.difficulty}
            </div>
          </div>
          
          <p className="text-sm text-white/90 mb-3">{card.description}</p>
          
          {/* Requirements */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">Requirements:</h4>
            <div className="grid grid-cols-2 gap-2">
              {card.requirements.map((req, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center justify-between px-2 py-1 rounded text-sm
                    ${totals[req.type] >= req.value
                      ? 'bg-green-300/30 text-green-200'
                      : 'bg-black/20 text-white'
                    }
                  `}
                >
                  <span className="capitalize">{req.type}</span>
                  <span>{totals[req.type]}/{req.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Used Gear */}
          {usedGearIds.length > 0 && (
            <div className="mt-3">
              <h4 className="text-sm font-medium text-white/80 mb-1">Applied Gear:</h4>
              <div className="flex flex-wrap gap-1">
                {usedGearIds.map(gearId => {
                  const gear = gearHand.find(g => g.id === gearId);
                  return gear ? (
                    <span
                      key={gearId}
                      className="text-xs px-2 py-1 rounded bg-black/20 text-white"
                    >
                      {gear.emoji} {gear.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Complete Button */}
          {canComplete() && (
            <button
              onClick={handleComplete}
              className="mt-3 w-full py-2 px-4 rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Complete Trail
            </button>
          )}
        </div>
      </div>
    </div>
  );
}