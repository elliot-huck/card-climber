import type { Zone } from '../types';

export const ZONES: Zone[] = [
  {
    id: 'valley',
    name: 'Valley Meadows',
    description: 'Rolling green meadows dotted with wildflowers. The air is fresh and the hiking is gentle.',
    emoji: '🌾',
    order: 1,
    theme: {
      primary: '#2D5F3F',
      secondary: '#4A7C59',
      accent: '#9ACD32',
      background: '#F0F8F0',
      surface: '#FFFFFF',
      text: '#1F2937',
      border: '#D1D5DB',
    },
    lodgeRequirement: 5,
    trailDeckIds: ['valley-easy', 'valley-moderate'],
    birdIds: ['robin', 'sparrow', 'cardinal'],
  },
  {
    id: 'forest',
    name: 'Ancient Forest',
    description: 'Towering pines and ancient oaks create a cathedral of green. The path winds through dappled shadows.',
    emoji: '🌲',
    order: 2,
    theme: {
      primary: '#1B4332',
      secondary: '#2D5016',
      accent: '#8FBC8F',
      background: '#2C5F2D',
      surface: '#F5F5DC',
      text: '#1C2833',
      border: '#A0A0A0',
    },
    lodgeRequirement: 8,
    trailDeckIds: ['forest-easy', 'forest-moderate', 'forest-hard'],
    birdIds: ['owl', 'woodpecker', 'raven'],
  },
  {
    id: 'highlands',
    name: 'Highland Cliffs',
    description: 'Rocky outcrops and windswept plateaus offer stunning vistas. The air grows thin and crisp.',
    emoji: '⛰️',
    order: 3,
    theme: {
      primary: '#4A5568',
      secondary: '#718096',
      accent: '#ED8936',
      background: '#E2E8F0',
      surface: '#FFFFFF',
      text: '#2D3748',
      border: '#CBD5E0',
    },
    lodgeRequirement: 12,
    trailDeckIds: ['highlands-moderate', 'highlands-hard', 'highlands-extreme'],
    birdIds: ['eagle', 'hawk', 'falcon'],
  },
  {
    id: 'peak',
    name: 'Summit Peak',
    description: 'The final ascent to the mountain peak. Snow-capped and challenging, but the view is breathtaking.',
    emoji: '🏔️',
    order: 4,
    theme: {
      primary: '#2B6CB0',
      secondary: '#3182CE',
      accent: '#FED7D7',
      background: '#EBF8FF',
      surface: '#FFFFFF',
      text: '#1A202C',
      border: '#BEE3F8',
    },
    lodgeRequirement: 15,
    trailDeckIds: ['peak-hard', 'peak-extreme', 'peak-legendary'],
    birdIds: ['snow-owl', 'mountain-goat', 'ptarmigan'],
  },
];

export function getZoneById(zoneId: string): Zone | undefined {
  return ZONES.find(zone => zone.id === zoneId);
}

export function getNextZone(currentZoneId: string): Zone | undefined {
  const currentZone = getZoneById(currentZoneId);
  if (!currentZone) return undefined;
  
  return ZONES.find(zone => zone.order === currentZone.order + 1);
}

export function getPreviousZone(currentZoneId: string): Zone | undefined {
  const currentZone = getZoneById(currentZoneId);
  if (!currentZone) return undefined;
  
  return ZONES.find(zone => zone.order === currentZone.order - 1);
}

export function isZoneUnlocked(zoneId: string, completedZones: string[]): boolean {
  const zone = getZoneById(zoneId);
  if (!zone) return false;
  
  // First zone is always unlocked
  if (zone.order === 1) return true;
  
  // Check if previous zone is completed
  const previousZone = ZONES.find(z => z.order === zone.order - 1);
  return previousZone ? completedZones.includes(previousZone.id) : false;
}