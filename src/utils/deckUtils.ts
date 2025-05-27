import type { BaseCard } from '../types';

/**
 * Shuffles an array using the Fisher-Yates algorithm
 */
export function shuffleDeck<T extends BaseCard>(deck: T[]): T[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Draws a specified number of cards from the top of a deck
 */
export function drawCards<T extends BaseCard>(deck: T[], count: number): T[] {
  return deck.slice(0, Math.min(count, deck.length));
}

/**
 * Removes specific cards from a deck by their IDs
 */
export function removeCardsFromDeck<T extends BaseCard>(deck: T[], cardIds: string[]): T[] {
  return deck.filter(card => !cardIds.includes(card.id));
}

/**
 * Finds a card in a deck by its ID
 */
export function findCardById<T extends BaseCard>(deck: T[], cardId: string): T | undefined {
  return deck.find(card => card.id === cardId);
}

/**
 * Moves cards from one deck to another
 */
export function moveCards<T extends BaseCard>(
  fromDeck: T[], 
  toDeck: T[], 
  cardIds: string[]
): { fromDeck: T[], toDeck: T[] } {
  const cardsToMove = fromDeck.filter(card => cardIds.includes(card.id));
  return {
    fromDeck: fromDeck.filter(card => !cardIds.includes(card.id)),
    toDeck: [...toDeck, ...cardsToMove]
  };
}

/**
 * Checks if a deck is empty
 */
export function isDeckEmpty<T extends BaseCard>(deck: T[]): boolean {
  return deck.length === 0;
}

/**
 * Gets the size of a deck
 */
export function getDeckSize<T extends BaseCard>(deck: T[]): number {
  return deck.length;
}