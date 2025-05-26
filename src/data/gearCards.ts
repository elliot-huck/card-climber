import type { GearCard } from '../types';

export const GEAR_CARDS: GearCard[] = [
  // Equipment - Basic tools and gear
  {
    id: 'hiking-boots',
    name: 'Hiking Boots',
    description: 'Sturdy boots with good grip for rocky terrain.',
    emoji: '🥾',
    type: 'gear',
    gearType: 'equipment',
    rarity: 'common',
    durability: 3,
    maxDurability: 3,
    effects: [
      { type: 'strength', value: 2 },
      { type: 'endurance', value: 1 }
    ]
  },
  {
    id: 'backpack',
    name: 'Trail Backpack',
    description: 'A reliable pack to carry all your essentials.',
    emoji: '🎒',
    type: 'gear',
    gearType: 'equipment',
    rarity: 'common',
    durability: 4,
    maxDurability: 4,
    effects: [
      { type: 'endurance', value: 2 },
      { type: 'comfort', value: 1 }
    ]
  },
  {
    id: 'trekking-poles',
    name: 'Trekking Poles',
    description: 'Adjustable poles for stability on steep trails.',
    emoji: '🏒',
    type: 'gear',
    gearType: 'equipment',
    rarity: 'common',
    durability: 3,
    maxDurability: 3,
    effects: [
      { type: 'strength', value: 1 },
      { type: 'endurance', value: 2 }
    ]
  },
  {
    id: 'compass',
    name: 'Trail Compass',
    description: 'Never lose your way with this reliable compass.',
    emoji: '🧭',
    type: 'gear',
    gearType: 'tool',
    rarity: 'common',
    durability: 5,
    maxDurability: 5,
    effects: [
      { type: 'navigation', value: 3 }
    ]
  },
  {
    id: 'water-bottle',
    name: 'Water Bottle',
    description: 'Stay hydrated on the trail.',
    emoji: '💧',
    type: 'gear',
    gearType: 'equipment',
    rarity: 'common',
    durability: 2,
    maxDurability: 2,
    effects: [
      { type: 'endurance', value: 2 },
      { type: 'comfort', value: 1 }
    ]
  },

  // Clothing - Weather protection and comfort
  {
    id: 'rain-jacket',
    name: 'Rain Jacket',
    description: 'Waterproof protection from the elements.',
    emoji: '🧥',
    type: 'gear',
    gearType: 'clothing',
    rarity: 'uncommon',
    durability: 3,
    maxDurability: 3,
    effects: [
      { type: 'warmth', value: 2 },
      { type: 'comfort', value: 2 }
    ]
  },
  {
    id: 'warm-hat',
    name: 'Warm Hat',
    description: 'Keep your head warm in cold conditions.',
    emoji: '🧢',
    type: 'gear',
    gearType: 'clothing',
    rarity: 'common',
    durability: 2,
    maxDurability: 2,
    effects: [
      { type: 'warmth', value: 2 }
    ]
  },
  {
    id: 'hiking-gloves',
    name: 'Hiking Gloves',
    description: 'Protect your hands while climbing and scrambling.',
    emoji: '🧤',
    type: 'gear',
    gearType: 'clothing',
    rarity: 'common',
    durability: 2,
    maxDurability: 2,
    effects: [
      { type: 'strength', value: 1 },
      { type: 'warmth', value: 1 }
    ]
  },
  {
    id: 'thermal-layer',
    name: 'Thermal Layer',
    description: 'Insulating base layer for cold weather.',
    emoji: '👕',
    type: 'gear',
    gearType: 'clothing',
    rarity: 'uncommon',
    durability: 3,
    maxDurability: 3,
    effects: [
      { type: 'warmth', value: 3 },
      { type: 'comfort', value: 1 }
    ]
  },

  // Food - Energy and morale
  {
    id: 'energy-bar',
    name: 'Energy Bar',
    description: 'Quick energy boost for the trail.',
    emoji: '🍫',
    type: 'gear',
    gearType: 'food',
    rarity: 'common',
    durability: 1,
    maxDurability: 1,
    effects: [
      { type: 'endurance', value: 3 }
    ]
  },
  {
    id: 'trail-mix',
    name: 'Trail Mix',
    description: 'Nuts and dried fruit for sustained energy.',
    emoji: '🥜',
    type: 'gear',
    gearType: 'food',
    rarity: 'common',
    durability: 2,
    maxDurability: 2,
    effects: [
      { type: 'endurance', value: 2 },
      { type: 'comfort', value: 1 }
    ]
  },
  {
    id: 'hot-cocoa',
    name: 'Hot Cocoa',
    description: 'Warm drink to boost morale in cold weather.',
    emoji: '☕',
    type: 'gear',
    gearType: 'food',
    rarity: 'uncommon',
    durability: 1,
    maxDurability: 1,
    effects: [
      { type: 'warmth', value: 2 },
      { type: 'comfort', value: 2 }
    ]
  },

  // Tools - Special equipment
  {
    id: 'headlamp',
    name: 'LED Headlamp',
    description: 'Illuminate dark trails and early morning starts.',
    emoji: '🔦',
    type: 'gear',
    gearType: 'tool',
    rarity: 'uncommon',
    durability: 4,
    maxDurability: 4,
    effects: [
      { type: 'navigation', value: 2 },
      { type: 'comfort', value: 1 }
    ]
  },
  {
    id: 'first-aid',
    name: 'First Aid Kit',
    description: 'Essential medical supplies for trail emergencies.',
    emoji: '🏥',
    type: 'gear',
    gearType: 'tool',
    rarity: 'uncommon',
    durability: 3,
    maxDurability: 3,
    effects: [
      { type: 'comfort', value: 3 },
      { type: 'endurance', value: 1 }
    ]
  },
  {
    id: 'rope',
    name: 'Climbing Rope',
    description: 'Sturdy rope for technical sections.',
    emoji: '🪢',
    type: 'gear',
    gearType: 'tool',
    rarity: 'rare',
    durability: 5,
    maxDurability: 5,
    effects: [
      { type: 'strength', value: 3 },
      { type: 'navigation', value: 1 }
    ]
  },

  // Rare/Epic Equipment
  {
    id: 'gps-device',
    name: 'GPS Device',
    description: 'High-tech navigation with satellite precision.',
    emoji: '📱',
    type: 'gear',
    gearType: 'tool',
    rarity: 'rare',
    durability: 4,
    maxDurability: 4,
    effects: [
      { type: 'navigation', value: 4 }
    ]
  },
  {
    id: 'mountaineering-axe',
    name: 'Ice Axe',
    description: 'Essential tool for steep, icy terrain.',
    emoji: '⛏️',
    type: 'gear',
    gearType: 'tool',
    rarity: 'rare',
    durability: 6,
    maxDurability: 6,
    effects: [
      { type: 'strength', value: 3 },
      { type: 'navigation', value: 2 }
    ]
  },
  {
    id: 'sleeping-bag',
    name: 'Ultralight Sleeping Bag',
    description: 'Warm, comfortable rest for overnight adventures.',
    emoji: '🛌',
    type: 'gear',
    gearType: 'equipment',
    rarity: 'epic',
    durability: 7,
    maxDurability: 7,
    effects: [
      { type: 'warmth', value: 4 },
      { type: 'comfort', value: 3 }
    ]
  },
  {
    id: 'expedition-pack',
    name: 'Expedition Pack',
    description: 'Professional-grade backpack for serious mountaineers.',
    emoji: '🎒',
    type: 'gear',
    gearType: 'equipment',
    rarity: 'epic',
    durability: 8,
    maxDurability: 8,
    effects: [
      { type: 'endurance', value: 4 },
      { type: 'comfort', value: 2 },
      { type: 'strength', value: 1 }
    ]
  }
];

export function getGearCardById(cardId: string): GearCard | undefined {
  return GEAR_CARDS.find(card => card.id === cardId);
}

export function getGearCardsByType(gearType: string): GearCard[] {
  return GEAR_CARDS.filter(card => card.gearType === gearType);
}

export function getGearCardsByRarity(rarity: string): GearCard[] {
  return GEAR_CARDS.filter(card => card.rarity === rarity);
}

export function createStartingDeck(): GearCard[] {
  // Return a balanced starting deck with mostly common cards
  return [
    ...GEAR_CARDS.filter(card => card.rarity === 'common'),
    ...GEAR_CARDS.filter(card => card.rarity === 'uncommon').slice(0, 3),
  ];
}