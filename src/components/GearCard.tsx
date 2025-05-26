import { useState } from 'react';
import { useGameStore } from '../state/gameStore';
import type { GearCard as GearCardType } from '../types';

interface GearCardProps {
  card: GearCardType;
  draggable?: boolean;
  onClick?: () => void;
  className?: string;
}

export function GearCard({ card, draggable = false, onClick, className = '' }: GearCardProps) {
  const { setDraggedCard, discardGearCard } = useGameStore();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', card.id);
    setDraggedCard(card.id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
    setIsDragging(false);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-50';
      case 'uncommon': return 'border-green-400 bg-green-50';
      case 'rare': return 'border-blue-400 bg-blue-50';
      case 'epic': return 'border-purple-400 bg-purple-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const getGearTypeIcon = (gearType: string) => {
    switch (gearType) {
      case 'equipment': return '⚙️';
      case 'clothing': return '👕';
      case 'food': return '🍎';
      case 'tool': return '🔧';
      default: return '📦';
    }
  };

  return (
    <div
      className={`
        card card-gear-hand w-32 cursor-pointer select-none transition-all duration-200
        ${isDragging ? 'opacity-50 transform rotate-6' : 'hover:shadow-lg hover:-translate-y-1'}
        ${className}
      `}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg">{card.emoji}</div>
          <div className="text-xs">{getGearTypeIcon(card.gearType)}</div>
        </div>

        {/* Name */}
        <h4 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
          {card.name}
        </h4>

        {/* Description */}
        <p className="text-xs text-gray-600 mb-3 flex-1 line-clamp-3">
          {card.description}
        </p>

        {/* Effects */}
        <div className="space-y-1 mb-2">
          {card.effects.map((effect, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs"
            >
              <span className="capitalize text-gray-700">{effect.type}</span>
              <span className="font-medium text-green-600">+{effect.value}</span>
            </div>
          ))}
        </div>

        {/* Durability */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-700">Durability</span>
          <div className="flex space-x-1">
            {Array.from({ length: card.maxDurability }, (_, i) => (
              <div
                key={i}
                className={`
                  w-2 h-2 rounded-full
                  ${i < card.durability ? 'bg-green-500' : 'bg-gray-300'}
                `}
              />
            ))}
          </div>
        </div>

        {/* Context Menu Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            discardGearCard(card.id);
          }}
          className="mt-2 text-xs text-red-600 hover:text-red-700 transition-colors"
        >
          Discard
        </button>
      </div>
    </div>
  );
}