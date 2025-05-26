import type { TrailCard } from '../types';

export const TRAIL_CARDS: TrailCard[] = [
  // Valley Zone - Easy trails
  {
    id: 'meadow-path',
    name: 'Meadow Path',
    description: 'A gentle trail through wildflower meadows with soft grass underfoot.',
    emoji: '🌸',
    type: 'trail',
    rarity: 'common',
    difficulty: 1,
    requirements: [
      { type: 'endurance', value: 2 }
    ],
    rewards: [
      { type: 'progress', value: 1 }
    ],
    zoneId: 'valley',
    birdChance: 0.3
  },
  {
    id: 'creek-crossing',
    name: 'Creek Crossing',
    description: 'A babbling creek blocks the path. You need to find a way across.',
    emoji: '🌊',
    type: 'trail',
    rarity: 'common',
    difficulty: 2,
    requirements: [
      { type: 'navigation', value: 1 },
      { type: 'strength', value: 1 }
    ],
    rewards: [
      { type: 'progress', value: 1 }
    ],
    zoneId: 'valley',
    birdChance: 0.4
  },
  {
    id: 'sunny-hillside',
    name: 'Sunny Hillside',
    description: 'A moderate climb up a grassy hillside with beautiful valley views.',
    emoji: '☀️',
    type: 'trail',
    rarity: 'common',
    difficulty: 2,
    requirements: [
      { type: 'endurance', value: 3 },
      { type: 'comfort', value: 1 }
    ],
    rewards: [
      { type: 'progress', value: 2 }
    ],
    zoneId: 'valley',
    birdChance: 0.2
  },

  // Forest Zone - Moderate trails
  {
    id: 'dense-undergrowth',
    name: 'Dense Undergrowth',
    description: 'Thick bushes and fallen logs make progress slow and difficult.',
    emoji: '🌿',
    type: 'trail',
    rarity: 'common',
    difficulty: 3,
    requirements: [
      { type: 'strength', value: 2 },
      { type: 'endurance', value: 2 }
    ],
    rewards: [
      { type: 'progress', value: 1 }
    ],
    zoneId: 'forest',
    birdChance: 0.5
  },
  {
    id: 'ancient-grove',
    name: 'Ancient Grove',
    description: 'Towering old trees create a cathedral-like atmosphere. The path winds through massive trunks.',
    emoji: '🌲',
    type: 'trail',
    rarity: 'uncommon',
    difficulty: 3,
    requirements: [
      { type: 'navigation', value: 2 },
      { type: 'comfort', value: 2 }
    ],
    rewards: [
      { type: 'progress', value: 2 }
    ],
    zoneId: 'forest',
    birdChance: 0.6
  },
  {
    id: 'fallen-tree',
    name: 'Fallen Giant',
    description: 'A massive fallen tree blocks the entire trail. You must find a way over or around.',
    emoji: '🪵',
    type: 'trail',
    rarity: 'uncommon',
    difficulty: 4,
    requirements: [
      { type: 'strength', value: 3 },
      { type: 'navigation', value: 1 }
    ],
    rewards: [
      { type: 'progress', value: 2 }
    ],
    zoneId: 'forest',
    birdChance: 0.3
  },

  // Highlands Zone - Hard trails
  {
    id: 'rocky-scramble',
    name: 'Rocky Scramble',
    description: 'Loose rocks and steep terrain require careful footing and strong grip.',
    emoji: '🪨',
    type: 'trail',
    rarity: 'uncommon',
    difficulty: 5,
    requirements: [
      { type: 'strength', value: 4 },
      { type: 'navigation', value: 2 }
    ],
    rewards: [
      { type: 'progress', value: 2 }
    ],
    zoneId: 'highlands',
    birdChance: 0.4
  },
  {
    id: 'windy-ridge',
    name: 'Windy Ridge',
    description: 'Strong winds buffet you as you traverse the exposed ridgeline.',
    emoji: '💨',
    type: 'trail',
    rarity: 'rare',
    difficulty: 6,
    requirements: [
      { type: 'endurance', value: 3 },
      { type: 'warmth', value: 3 },
      { type: 'strength', value: 2 }
    ],
    rewards: [
      { type: 'progress', value: 3 }
    ],
    zoneId: 'highlands',
    birdChance: 0.5
  },
  {
    id: 'cliff-edge',
    name: 'Cliff Edge',
    description: 'A narrow path along a sheer cliff face. One wrong step could be disastrous.',
    emoji: '🏔️',
    type: 'trail',
    rarity: 'rare',
    difficulty: 7,
    requirements: [
      { type: 'navigation', value: 4 },
      { type: 'strength', value: 3 },
      { type: 'comfort', value: 2 }
    ],
    rewards: [
      { type: 'progress', value: 3 }
    ],
    zoneId: 'highlands',
    birdChance: 0.2
  },

  // Peak Zone - Extreme trails
  {
    id: 'ice-field',
    name: 'Glacial Ice Field',
    description: 'Treacherous ice covers the path. Every step must be calculated.',
    emoji: '❄️',
    type: 'trail',
    rarity: 'rare',
    difficulty: 8,
    requirements: [
      { type: 'warmth', value: 5 },
      { type: 'navigation', value: 3 },
      { type: 'strength', value: 3 }
    ],
    rewards: [
      { type: 'progress', value: 3 }
    ],
    zoneId: 'peak',
    birdChance: 0.1
  },
  {
    id: 'summit-approach',
    name: 'Final Summit Approach',
    description: 'The last push to the peak. Thin air and exhaustion test your limits.',
    emoji: '⛰️',
    type: 'trail',
    rarity: 'epic',
    difficulty: 10,
    requirements: [
      { type: 'endurance', value: 5 },
      { type: 'strength', value: 4 },
      { type: 'warmth', value: 4 },
      { type: 'navigation', value: 3 },
      { type: 'comfort', value: 3 }
    ],
    rewards: [
      { type: 'progress', value: 5 }
    ],
    zoneId: 'peak',
    birdChance: 0.05
  }
];

export function getTrailCardsByZone(zoneId: string): TrailCard[] {
  return TRAIL_CARDS.filter(card => card.zoneId === zoneId);
}

export function getTrailCardById(cardId: string): TrailCard | undefined {
  return TRAIL_CARDS.find(card => card.id === cardId);
}

export function getRandomTrailCard(zoneId: string): TrailCard | undefined {
  const zoneCards = getTrailCardsByZone(zoneId);
  if (zoneCards.length === 0) return undefined;
  
  const randomIndex = Math.floor(Math.random() * zoneCards.length);
  return zoneCards[randomIndex];
}