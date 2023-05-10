// import { Texture, Container } from '@pixi/react';

export const enum TypeGameStatus {
  WaitingForPlayers = 'Waiting For Players',
  WaitingForStart = 'Waiting For Start',
  DrawingCards = 'Drawing Cards',
  GameInProgress = 'Game In Progress',
  GameIsOver = 'Game Is Over',
}

export const enum TypePlayerRole {
  Attacker = 'Attacker',
  Defender = 'Defender',
  Waiting = 'Waiting',
  Unknown = 'Unknown',
}

export const enum TypePlayerStatus {
  InGame = 'IN_GAME',
  Offline = 'OFFLINE',
  YouWinner = 'YOU_WINNER',
  YouLoser = 'YOU_LOSER',
}

export type TypeCard = {
  name: string;
  rank: TypeCardRank;
  suit: TypeCardSuit;
  isTrump: boolean;
};

export const enum TypeCardRank {
  'RANK_6' = 6,
  'RANK_7',
  'RANK_8',
  'RANK_9',
  'RANK_10',
  'RANK_J',
  'RANK_Q',
  'RANK_K',
  'RANK_A',
}

export enum TypeCardSuit {
  Clubs = 'Clubs', // ♣
  Spades = 'Spades', // ♠
  Hearts = 'Hearts', // ♥
  Diamonds = 'Diamonds', // ♦
}

export type TypePlayer = {
  socketId: string;
  playerName: string;
  playerAvatar: string;
  playerRole: TypePlayerRole;
  playerStatus: TypePlayerStatus;
  cards: TypeCard[];
};

export type TypeDealtCard = {
  cards: TypeCard[];
  count: number;
};

export type TypePlacedCard = {
  attacker: TypeCard;
  defender: TypeCard | null;
};

export const enum TypeAction {
  AttackerMoveCard = 'AttackerMoveCard',
  AttackerMoveCardFailed = 'AttackerMoveCardFailed',
  DefenderMoveCard = 'DefenderMoveCard',
  DefenderMoveCardFailed = 'DefenderMoveCardFailed',
  AttackerPass = 'AttackerPass',
  DefenderPickUp = 'DefenderPickUp',
  DefenderTakesCards = 'DefenderTakesCards',
  Undefined = 'Undefined',
}

export type TypeGameStore = {
  id: string;

  gameStatus: TypeGameStatus;

  hostId: string;

  activePlayerId?: string;

  players: TypePlayer[] | [];

  trumpCard?: TypeCard;

  dealtCards?: TypeDealtCard[];

  beatingameCards?: TypeCard[];

  deckCards: TypeCard[];

  placedCards: TypePlacedCard[];

  lastAction?: TypeAction;

  lastAttackerCard?: TypeCard | null;

  lastDefenderCard?: TypeCard;

}
