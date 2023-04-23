import { Card } from '../Card/Card';
import { TypeCardRank, TypeCardSuit } from '../../types/types';

export class Deck {
  cards: Card[];
  trump: Card;

  constructor() {
    this.cards = [];
    this.fill();
    this.shuffle();
    this.trump = this.cards[this.cards.length - 1];
    for (const card of this.cards) {
      card.setTrump(card.suit === this.getTrumpSuit());
    }
  }

  public getSize(): number {
    return this.cards.length;
  }

  public getTrumpCard() {
    return this.trump;
  }

  getTrumpSuit() {
    return this.trump.suit;
  }

  get size() {
    return this.cards.length;
  }

  add(cards: Card[]) {
    this.cards.push(...cards);
  }

  fill() {
    const ranks: TypeCardRank[] = [
      TypeCardRank.RANK_6,
      TypeCardRank.RANK_7,
      TypeCardRank.RANK_8,
      TypeCardRank.RANK_9,
      TypeCardRank.RANK_10,
      TypeCardRank.RANK_J,
      TypeCardRank.RANK_Q,
      TypeCardRank.RANK_K,
      TypeCardRank.RANK_A,
    ];

    const suits: TypeCardSuit[] = [
      TypeCardSuit.Clubs, // ♣
      TypeCardSuit.Diamonds, // ♠
      TypeCardSuit.Hearts, // ♥
      TypeCardSuit.Spades, // ♦
    ];

    this.cards = [];

    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new Card(rank, suit));
      }
    }
  }

  shuffle() {
    for (let i = this.size - 1; i > 0; i -= 1) {
      const randomCardIdx = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[randomCardIdx]] = [this.cards[randomCardIdx], this.cards[i]];
    }
  }

  getCardsFromDeck(quantity: number) {
    return this.cards.splice(this.size - Math.min(quantity, this.size));
  }

  isEmpty() {
    return this.cards.length === 0;
  }
}
