// import { Card } from './../model/card';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MockSocketService {
    constructor(private http: Http) {

    }

    getCardNumberForRound(roundNr: number): number{
        return Math.floor((roundNr - 1) / 2);

    }


    getCardsForRound(roundNr: number): any {
        const cardsToRetur = this.getCardNumberForRound(roundNr);
        const cardsObject = this.http.get('/assets/cards.json');

        return cardsObject;
    }

    getCardsForGuessing(cardsRecieved: any[], roundNr: number): any {

    }

}
