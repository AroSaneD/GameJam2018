import { Card } from './../card';
import { MockSocketService } from './../../services/mockSocket.service';
import { Opponent } from './opponent';
import { AppComponent } from '../../app.component';
import { Observable } from 'rxjs/Observable';
import { OpponentResponse } from './opponentResponse';
import { isPlatformBrowser } from '@angular/common/src/platform_id';

export class TurnModel {

    public static numberOfOpponents = 2;
    public static app: AppComponent;
    public static socketService: MockSocketService;

    private static _instance: TurnModel;

    public static get Instance(): TurnModel {
        if (TurnModel._instance == null) {
            TurnModel._instance = new TurnModel(TurnModel.numberOfOpponents, TurnModel.app, TurnModel.socketService);
        }

        return TurnModel._instance;
    }

    // -------------------------------------------------------

    public opponents: Opponent[] = [];

    public currentOpponent: Opponent;

    private constructor(public numberOfOpponents: number, public app: AppComponent, private socketService: MockSocketService) {
        for (let i = 0; i < numberOfOpponents; i++) {
            this.opponents.push(new Opponent());
        }

        this.currentOpponent = this.opponents[0];
    }


    public sendSequenceToOpponent(cards: Card[]): Observable<OpponentResponse> {
        return this.currentOpponent.nextSequence(cards).map(nextSeq => {
            const matches = this.currentOpponent.matchCards(cards);
            // const nextSeq = this.currentOpponent.nextSequence(cards);

            this.currentOpponent.currentTurn++;

            const nextOpponent = this.opponents[this.opponents.indexOf(this.currentOpponent) % this.opponents.length];
            const isNewOpponent = nextOpponent !== this.currentOpponent;

            this.currentOpponent = nextOpponent;

            return new OpponentResponse(matches, nextSeq, !isNewOpponent); // if the opponent is the same, then it's the players turn
        });
    }

}
