import { Opponent } from './opponent';
import { Card } from './../card';

export class OpponentResponse {
    constructor(
        public matches: boolean[],
        public nextSequence: Card[], 
        public isPlayerTurn: boolean) {

    }
}