import type { BirdCard } from '../types';

export const BIRD_CARDS: BirdCard[] = [
  // Valley Birds
  {
    id: 'american-robin',
    name: 'American Robin',
    description: 'A cheerful songbird with an orange breast, often seen hopping on the ground looking for worms.',
    emoji: '🐦',
    type: 'bird',
    rarity: 'common',
    habitat: 'Meadows and grasslands',
    size: 'medium',
    behavior: 'Ground foraging, melodic singing at dawn',
    zoneId: 'valley'
  },
  {
    id: 'house-sparrow',
    name: 'House Sparrow',
    description: 'A small, social bird with brown and gray plumage, commonly found near human settlements.',
    emoji: '🐥',
    type: 'bird',
    rarity: 'common',
    habitat: 'Open grasslands and farm areas',
    size: 'small',
    behavior: 'Flocking, seed eating, chirping communication',
    zoneId: 'valley'
  },
  {
    id: 'northern-cardinal',
    name: 'Northern Cardinal',
    description: 'A brilliant red bird with a distinctive crest, the male is bright red while the female is brown with red accents.',
    emoji: '🔴',
    type: 'bird',
    rarity: 'uncommon',
    habitat: 'Woodland edges and thickets',
    size: 'medium',
    behavior: 'Territorial singing, cracking seeds with strong beak',
    zoneId: 'valley'
  },

  // Forest Birds
  {
    id: 'great-horned-owl',
    name: 'Great Horned Owl',
    description: 'A large, powerful owl with distinctive ear tufts and piercing yellow eyes.',
    emoji: '🦉',
    type: 'bird',
    rarity: 'uncommon',
    habitat: 'Dense forest canopy',
    size: 'large',
    behavior: 'Nocturnal hunting, deep hooting calls',
    zoneId: 'forest'
  },
  {
    id: 'pileated-woodpecker',
    name: 'Pileated Woodpecker',
    description: 'A large woodpecker with a bright red crest, known for its powerful drumming on dead trees.',
    emoji: '🔨',
    type: 'bird',
    rarity: 'rare',
    habitat: 'Old growth forest with dead trees',
    size: 'large',
    behavior: 'Loud drumming, excavating large holes for insects',
    zoneId: 'forest'
  },
  {
    id: 'common-raven',
    name: 'Common Raven',
    description: 'An intelligent, all-black bird larger than a crow, known for its problem-solving abilities.',
    emoji: '🐦‍⬛',
    type: 'bird',
    rarity: 'uncommon',
    habitat: 'Forest clearings and rocky outcrops',
    size: 'large',
    behavior: 'Tool use, complex vocalizations, social play',
    zoneId: 'forest'
  },

  // Highland Birds
  {
    id: 'golden-eagle',
    name: 'Golden Eagle',
    description: 'A majestic raptor with golden-brown plumage on its head and neck, soaring on thermals.',
    emoji: '🦅',
    type: 'bird',
    rarity: 'rare',
    habitat: 'Rocky cliffs and open highlands',
    size: 'large',
    behavior: 'Soaring on thermals, hunting small mammals',
    zoneId: 'highlands'
  },
  {
    id: 'red-tailed-hawk',
    name: 'Red-tailed Hawk',
    description: 'A common hawk with a distinctive rust-colored tail, often seen perched on poles or soaring.',
    emoji: '🪶',
    type: 'bird',
    rarity: 'uncommon',
    habitat: 'Open areas with scattered trees',
    size: 'large',
    behavior: 'Circling flight, sharp-eyed hunting from perches',
    zoneId: 'highlands'
  },
  {
    id: 'peregrine-falcon',
    name: 'Peregrine Falcon',
    description: 'The fastest bird in the world, capable of diving at speeds over 200 mph.',
    emoji: '💨',
    type: 'bird',
    rarity: 'epic',
    habitat: 'Cliff faces and high rocky outcrops',
    size: 'medium',
    behavior: 'High-speed hunting dives, precise aerial maneuvers',
    zoneId: 'highlands'
  },

  // Peak Birds
  {
    id: 'snowy-owl',
    name: 'Snowy Owl',
    description: 'A large, white owl adapted to cold climates, with feathered feet for warmth.',
    emoji: '❄️',
    type: 'bird',
    rarity: 'rare',
    habitat: 'Alpine tundra and snow-covered peaks',
    size: 'large',
    behavior: 'Ground hunting, silent flight, rotating head 270°',
    zoneId: 'peak'
  },
  {
    id: 'white-tailed-ptarmigan',
    name: 'White-tailed Ptarmigan',
    description: 'A small grouse that changes color seasonally, white in winter and mottled brown in summer.',
    emoji: '🤍',
    type: 'bird',
    rarity: 'uncommon',
    habitat: 'Alpine areas above treeline',
    size: 'medium',
    behavior: 'Camouflage, seasonal plumage changes, ground dwelling',
    zoneId: 'peak'
  },
  {
    id: 'mountain-goat-bird',
    name: 'Alpine Chough',
    description: 'A high-altitude crow family member with glossy black plumage and red legs and beak.',
    emoji: '⛰️',
    type: 'bird',
    rarity: 'epic',
    habitat: 'Highest mountain peaks and cliff faces',
    size: 'medium',
    behavior: 'Acrobatic flight, cliff nesting, extreme altitude adaptation',
    zoneId: 'peak'
  }
];

export function getBirdCardsByZone(zoneId: string): BirdCard[] {
  return BIRD_CARDS.filter(bird => bird.zoneId === zoneId);
}

export function getBirdCardById(cardId: string): BirdCard | undefined {
  return BIRD_CARDS.find(bird => bird.id === cardId);
}

export function getRandomBirdCard(zoneId: string): BirdCard | undefined {
  const zoneBirds = getBirdCardsByZone(zoneId);
  if (zoneBirds.length === 0) return undefined;
  
  const randomIndex = Math.floor(Math.random() * zoneBirds.length);
  return zoneBirds[randomIndex];
}