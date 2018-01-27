import { Card } from "../card";

export class Opponent {
  currentTurn = 0;

  matchCards(cards: Card[]): boolean[] {
    return cards.map((c, i) => {
      return Math.random() < 1 - 0.05 * i;
    });
  }

  nextSequence(cards: Card[]): Card[]{
    return [...cards, new Card("test", "test", null, null)]; // todo: insert random
  }


}
