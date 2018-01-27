import { Opponent } from './opponent';
import { AppComponent } from '../../app.component';
import { Observable } from 'rxjs/Observable';

export class TurnModel {

    public static numberOfOpponents = 2;
    public static app: AppComponent;

    private static _instance: TurnModel;
    public static get Instance(): TurnModel {
        if (TurnModel._instance == null) {
            TurnModel._instance = new TurnModel(TurnModel.numberOfOpponents, TurnModel.app);
        }

        return TurnModel._instance;
    }

    // -------------------------------------------------------

    public opponents: Opponent[] = [];

    // public currentOpponent: Opponent =

    private constructor(public numberOfOpponents: number, public app: AppComponent) {
        for (let i = 0; i < numberOfOpponents; i++) {
            this.opponents.push(new Opponent());
        }
    }

    // public sendSequenceToOpponent(cards: Card[]): boolean[]{

    // }

}
