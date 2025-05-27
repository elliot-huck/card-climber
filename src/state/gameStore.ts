import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { GEAR_CARDS } from '../data/gearCards';
import { TRAIL_CARDS } from '../data/trailCards';
import { ZONES } from '../data/zones';
import type {
	BirdCard,
	GameState,
	JournalEntry,
	Notification,
	PlayerState,
	TimeOfDay,
	TrailCard,
	UIState
} from '../types';
import { drawCards, shuffleDeck } from '../utils/deckUtils';
import { loadGameState, saveGameState } from '../utils/saveLoad';

interface GameStore extends GameState {
  // UI State
  ui: UIState;
  
  // Game Actions
  initializeGame: () => void;
  loadGame: () => void;
  saveGame: () => void;
  resetGame: () => void;
  
  // Player Actions
  advanceTime: () => void;
  restAtLodge: () => void;
  moveToZone: (zoneId: string) => void;
  
  // Deck Management
  drawGearCards: (count: number) => void;
  playGearCard: (cardId: string, trailCardId: string) => void;
  discardGearCard: (cardId: string) => void;
  reshuffleGearDeck: () => void;
  
  // Trail Management
  drawTrailCards: (count: number) => void;
  completeTrailCard: (trailCardId: string, usedGearIds: string[]) => void;
  
  // Progress Management
  addProgress: (amount: number) => void;
  checkLodgeProgress: () => void;
  
  // Journal & Field Guide
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => void;
  addBirdToFieldGuide: (bird: BirdCard) => void;
  
  // UI Actions
  setSelectedCard: (cardId: string | null) => void;
  setDraggedCard: (cardId: string | null) => void;
  toggleBookMenu: (tab?: 'journal' | 'fieldGuide' | 'settings') => void;
  showNotification: (notification: Omit<Notification, 'id'>) => void;
  dismissNotification: () => void;
}

const defaultPlayerState: PlayerState = {
  id: 'player-1',
  currentZoneId: 'valley',
  currentLodgeId: 'trailhead',
  timeOfDay: 'morning',
  energy: 10,
  maxEnergy: 10,
  progress: 0,
  progressGoal: 5,
};

const defaultUIState: UIState = {
  selectedCard: null,
  draggedCard: null,
  bookMenuOpen: false,
  bookMenuTab: 'journal',
  notification: null,
};

export const useGameStore = create<GameStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial State
    player: defaultPlayerState,
    gearDeck: [],
    gearHand: [],
    gearDiscard: [],
    trailDeck: [],
    activeTrails: [],
    completedTrails: [],
    fieldGuide: [],
    journalEntries: [],
    currentZone: ZONES[0],
    availableZones: ZONES,
    gameSettings: {
      enableAnimations: true,
      autoSave: true,
      difficulty: 'normal',
      soundEnabled: true,
      musicEnabled: true,
    },
    lastSaved: new Date().toISOString(),
    ui: defaultUIState,

    // Game Actions
    initializeGame: () => {
      const initialGearDeck = shuffleDeck([...GEAR_CARDS]);
      const initialHand = drawCards(initialGearDeck, 5);
      
      set((state) => ({
        ...state,
        gearDeck: initialGearDeck.slice(5),
        gearHand: initialHand,
        gearDiscard: [],
        activeTrails: [],
        completedTrails: [],
        fieldGuide: [],
        journalEntries: [
          {
            id: 'start-' + Date.now(),
            timestamp: new Date().toISOString(),
            type: 'arrival',
            title: 'Journey Begins',
            content: 'You stand at the trailhead, pack ready, eager to begin your mountain adventure.',
            zoneId: 'valley',
          }
        ],
        lastSaved: new Date().toISOString(),
      }));
      
      get().drawTrailCards(3);
      get().saveGame();
    },

    loadGame: () => {
      const savedState = loadGameState();
      if (savedState) {
        set(savedState);
      } else {
        get().initializeGame();
      }
    },

    saveGame: () => {
      const state = get();
      saveGameState(state);
      set({ lastSaved: new Date().toISOString() });
    },

    resetGame: () => {
      set({
        player: { ...defaultPlayerState },
        gearDeck: [],
        gearHand: [],
        gearDiscard: [],
        trailDeck: [],
        activeTrails: [],
        completedTrails: [],
        fieldGuide: [],
        journalEntries: [],
        currentZone: ZONES[0],
        ui: { ...defaultUIState },
        lastSaved: new Date().toISOString(),
      });
      get().initializeGame();
    },

    // Player Actions
    advanceTime: () => {
      const timeSequence: TimeOfDay[] = [
        'dawn', 'morning', 'noon', 'afternoon', 'evening', 'dusk', 'night'
      ];
      
      set((state) => {
        const currentIndex = timeSequence.indexOf(state.player.timeOfDay);
        const nextIndex = (currentIndex + 1) % timeSequence.length;
        const newTime = timeSequence[nextIndex];
        
        // If it becomes night, return to last lodge and reset hand
        if (newTime === 'night') {
          return {
            ...state,
            player: {
              ...state.player,
              timeOfDay: 'dawn',
              progress: 0,
              energy: state.player.maxEnergy,
            },
            gearDiscard: [...state.gearDiscard, ...state.gearHand],
            gearHand: [],
          };
        }
        
        return {
          ...state,
          player: {
            ...state.player,
            timeOfDay: newTime,
          },
        };
      });
      
      // Draw new hand if it's dawn
      if (get().player.timeOfDay === 'dawn') {
        get().drawGearCards(5);
      }
    },

    restAtLodge: () => {
      set((state) => ({
        ...state,
        player: {
          ...state.player,
          energy: state.player.maxEnergy,
          progress: 0,
          timeOfDay: 'morning',
        },
        gearDiscard: [...state.gearDiscard, ...state.gearHand],
        gearHand: [],
        activeTrails: [],
      }));
      
      get().drawGearCards(5);
      get().drawTrailCards(3);
      
      get().addJournalEntry({
        type: 'lodge',
        title: 'Rest at Lodge',
        content: 'You rest at the lodge, recovering your energy and preparing for the next day.',
        zoneId: get().currentZone.id,
      });
    },

    moveToZone: (zoneId: string) => {
      const newZone = get().availableZones.find(z => z.id === zoneId);
      if (!newZone) return;
      
      set((state) => ({
        ...state,
        currentZone: newZone,
        player: {
          ...state.player,
          currentZoneId: zoneId,
          progressGoal: newZone.lodgeRequirement,
          progress: 0,
        },
        activeTrails: [],
      }));
      
      get().drawTrailCards(3);
      get().addJournalEntry({
        type: 'zone',
        title: `Entered ${newZone.name}`,
        content: `You've entered the ${newZone.name}. ${newZone.description}`,
        zoneId: newZone.id,
      });
    },

    // Deck Management
    drawGearCards: (count: number) => {
      set((state) => {
        let { gearDeck, gearHand, gearDiscard } = state;
        
        // If deck is empty, shuffle discard into deck
        if (gearDeck.length === 0 && gearDiscard.length > 0) {
          gearDeck = shuffleDeck([...gearDiscard]);
          gearDiscard = [];
        }
        
        const drawnCards = drawCards(gearDeck, Math.min(count, gearDeck.length));
        
        return {
          ...state,
          gearDeck: gearDeck.slice(drawnCards.length),
          gearHand: [...gearHand, ...drawnCards],
          gearDiscard,
        };
      });
    },

    playGearCard: (cardId: string, trailCardId: string) => {
      // This will be implemented when we handle trail completion
      const gearCard = get().gearHand.find(c => c.id === cardId);
      const trailCard = get().activeTrails.find(c => c.id === trailCardId);
      
      if (!gearCard || !trailCard) return;
      
      // Move gear card to discard
      set((state) => ({
        ...state,
        gearHand: state.gearHand.filter(c => c.id !== cardId),
        gearDiscard: [...state.gearDiscard, gearCard],
      }));
    },

    discardGearCard: (cardId: string) => {
      const card = get().gearHand.find(c => c.id === cardId);
      if (!card) return;
      
      set((state) => ({
        ...state,
        gearHand: state.gearHand.filter(c => c.id !== cardId),
        gearDiscard: [...state.gearDiscard, card],
      }));
    },

    reshuffleGearDeck: () => {
      set((state) => ({
        ...state,
        gearDeck: shuffleDeck([...state.gearDeck, ...state.gearDiscard]),
        gearDiscard: [],
      }));
    },

    // Trail Management
    drawTrailCards: (count: number) => {
      const currentZoneId = get().currentZone.id;
      const zoneTrails = TRAIL_CARDS.filter(trail => trail.zoneId === currentZoneId);
      
      const newTrails: TrailCard[] = [];
      for (let i = 0; i < count; i++) {
        if (zoneTrails.length > 0) {
          const randomIndex = Math.floor(Math.random() * zoneTrails.length);
          const trail = { ...zoneTrails[randomIndex], id: `${zoneTrails[randomIndex].id}-${Date.now()}-${i}` };
          newTrails.push(trail);
        }
      }
      
      set((state) => ({
        ...state,
        activeTrails: [...state.activeTrails, ...newTrails],
      }));
    },

    completeTrailCard: (trailCardId: string, usedGearIds: string[]) => {
      const trailCard = get().activeTrails.find(c => c.id === trailCardId);
      if (!trailCard) return;
      
      set((state) => ({
        ...state,
        activeTrails: state.activeTrails.filter(c => c.id !== trailCardId),
        completedTrails: [...state.completedTrails, trailCard],
      }));
      
      // Process rewards
      trailCard.rewards.forEach(reward => {
        if (reward.type === 'progress' && reward.value) {
          get().addProgress(reward.value);
        }
      });
      
      get().addJournalEntry({
        type: 'trail',
        title: `Completed: ${trailCard.name}`,
        content: trailCard.description,
        zoneId: get().currentZone.id,
      });
    },

    // Progress Management
    addProgress: (amount: number) => {
      set((state) => {
        const newProgress = state.player.progress + amount;
        return {
          ...state,
          player: {
            ...state.player,
            progress: newProgress,
          },
        };
      });
      
      get().checkLodgeProgress();
    },

    checkLodgeProgress: () => {
      const { player } = get();
      if (player.progress >= player.progressGoal) {
        get().showNotification({
          type: 'success',
          title: 'Lodge Reached!',
          message: 'You have enough progress to reach the next lodge.',
          duration: 3000,
        });
      }
    },

    // Journal & Field Guide
    addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => {
      const newEntry: JournalEntry = {
        ...entry,
        id: 'entry-' + Date.now(),
        timestamp: new Date().toISOString(),
      };
      
      set((state) => ({
        ...state,
        journalEntries: [newEntry, ...state.journalEntries],
      }));
    },

    addBirdToFieldGuide: (bird: BirdCard) => {
      set((state) => {
        // Don't add duplicates
        if (state.fieldGuide.some(b => b.id === bird.id)) {
          return state;
        }
        
        return {
          ...state,
          fieldGuide: [...state.fieldGuide, bird],
        };
      });
      
      get().addJournalEntry({
        type: 'bird',
        title: `Spotted: ${bird.name}`,
        content: `You've spotted a ${bird.name}! ${bird.description}`,
        zoneId: get().currentZone.id,
      });
    },

    // UI Actions
    setSelectedCard: (cardId: string | null) => {
      set((state) => ({
        ...state,
        ui: { ...state.ui, selectedCard: cardId },
      }));
    },

    setDraggedCard: (cardId: string | null) => {
      set((state) => ({
        ...state,
        ui: { ...state.ui, draggedCard: cardId },
      }));
    },

    toggleBookMenu: (tab?: 'journal' | 'fieldGuide' | 'settings') => {
      set((state) => ({
        ...state,
        ui: {
          ...state.ui,
          bookMenuOpen: !state.ui.bookMenuOpen,
          bookMenuTab: tab || state.ui.bookMenuTab,
        },
      }));
    },

    showNotification: (notification: Omit<Notification, 'id'>) => {
      const newNotification: Notification = {
        ...notification,
        id: 'notif-' + Date.now(),
      };
      
      set((state) => ({
        ...state,
        ui: { ...state.ui, notification: newNotification },
      }));
      
      // Auto-dismiss after duration
      setTimeout(() => {
        get().dismissNotification();
      }, notification.duration || 3000);
    },

    dismissNotification: () => {
      set((state) => ({
        ...state,
        ui: { ...state.ui, notification: null },
      }));
    },
  }))
);

// Auto-save subscription
useGameStore.subscribe(
  (state) => state.lastSaved,
  () => {
    const state = useGameStore.getState();
    if (state.gameSettings.autoSave) {
      state.saveGame();
    }
  }
);