// Base Card Interface
export interface BaseCard {
  id: string;
  name: string;
  description: string;
  emoji: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic';
}

// Gear Cards - Equipment used to overcome trail challenges
export interface GearCard extends BaseCard {
  type: 'gear';
  gearType: 'equipment' | 'clothing' | 'food' | 'tool';
  durability: number;
  maxDurability: number;
  effects: GearEffect[];
}

export interface GearEffect {
  type: 'strength' | 'endurance' | 'warmth' | 'navigation' | 'comfort';
  value: number;
}

// Trail Cards - Challenges to overcome during hiking
export interface TrailCard extends BaseCard {
  type: 'trail';
  difficulty: number;
  requirements: TrailRequirement[];
  rewards: TrailReward[];
  zoneId: string;
  birdChance?: number; // Probability of triggering birdwatching
}

export interface TrailRequirement {
  type: 'strength' | 'endurance' | 'warmth' | 'navigation' | 'comfort';
  value: number;
}

export interface TrailReward {
  type: 'progress' | 'gear' | 'energy' | 'bird';
  value?: number;
  cardId?: string;
}

// Bird Cards - Collected through birdwatching events
export interface BirdCard extends BaseCard {
  type: 'bird';
  habitat: string;
  size: 'small' | 'medium' | 'large';
  behavior: string;
  zoneId: string;
}

// Game Zones
export interface Zone {
  id: string;
  name: string;
  description: string;
  emoji: string;
  order: number;
  theme: ZoneTheme;
  lodgeRequirement: number; // Progress points needed to complete zone
  trailDeckIds: string[];
  birdIds: string[];
}

export interface ZoneTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  border: string;
}

// Time of Day
export type TimeOfDay = 'dawn' | 'morning' | 'noon' | 'afternoon' | 'evening' | 'dusk' | 'night';

// Player State
export interface PlayerState {
  id: string;
  currentZoneId: string;
  currentLodgeId: string;
  timeOfDay: TimeOfDay;
  energy: number;
  maxEnergy: number;
  progress: number; // Progress toward next lodge
  progressGoal: number; // Progress needed to reach next lodge
}

// Game State
export interface GameState {
  player: PlayerState;
  gearDeck: GearCard[];
  gearHand: GearCard[];
  gearDiscard: GearCard[];
  trailDeck: TrailCard[];
  activeTrails: TrailCard[];
  completedTrails: TrailCard[];
  fieldGuide: BirdCard[];
  journalEntries: JournalEntry[];
  currentZone: Zone;
  availableZones: Zone[];
  gameSettings: GameSettings;
  lastSaved: string;
}

// Journal System
export interface JournalEntry {
  id: string;
  timestamp: string;
  type: 'arrival' | 'trail' | 'bird' | 'lodge' | 'zone';
  title: string;
  content: string;
  zoneId: string;
  metadata?: Record<string, any>;
}

// Game Settings
export interface GameSettings {
  enableAnimations: boolean;
  autoSave: boolean;
  difficulty: 'easy' | 'normal' | 'hard';
  soundEnabled: boolean;
  musicEnabled: boolean;
}

// Deck Management
export interface DeckState {
  cards: BaseCard[];
  drawPile: string[];
  hand: string[];
  discardPile: string[];
}

// UI State
export interface UIState {
  selectedCard: string | null;
  draggedCard: string | null;
  bookMenuOpen: boolean;
  bookMenuTab: 'journal' | 'fieldGuide' | 'settings';
  notification: Notification | null;
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  duration: number;
}

// Game Actions
export interface GameAction {
  type: string;
  payload?: any;
  timestamp: string;
}

// Save/Load
export interface SaveData {
  version: string;
  timestamp: string;
  gameState: GameState;
  uiState: Partial<UIState>;
}

// Component Props Types
export interface CardProps {
  card: BaseCard;
  onClick?: () => void;
  onDragStart?: (card: BaseCard) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
  isSelected?: boolean;
  className?: string;
}

export interface DropZoneProps {
  onDrop: (card: BaseCard) => void;
  canDrop: (card: BaseCard) => boolean;
  children: React.ReactNode;
  className?: string;
}