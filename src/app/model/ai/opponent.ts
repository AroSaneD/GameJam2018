import { Card } from '../card';
import { TurnModel } from './turnModel';
import { Observable } from 'rxjs/Observable';

export class Opponent {
  currentTurn = 0;

  matchCards(cards: Card[]): boolean[] {
    return cards.map((c, i) => {
      return Math.random() < 1 - 1 * (i + 1);
    });
  }

  nextSequence(cards: Card[]): Observable<Card[]> {
    return TurnModel.socketService.getRandomCard().map(card => [...cards, card]);
  }


}
