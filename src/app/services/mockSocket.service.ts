import { Card } from './../model/card';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MockSocketService {
    constructor(private http: Http) {

    }

    getCardNumberForRound(roundNr: number): number {
        return Math.floor((roundNr - 1) / 2);

    }


    getCardsForRound(roundNr: number): Observable<Card[]> {
        const cardsToRetur = this.getCardNumberForRound(roundNr);
        const cardsObject = this.http.get('/assets/cards.json').map(res => {
            return res.json().map(item => {
                return new Card(item.text, item.path ? '/assets/' + item.path : null, null, null);
            });
        }).map((items: Card[]) => {
            const toReturn: Card[] = [];
            while (toReturn.length < cardsToRetur) {
                const item = items[Math.floor(Math.random() * items.length)];
                if (item.iconUrl) {
                    toReturn.push(item);
                }
            }

            return toReturn;
        });

        return cardsObject;
    }

    getCardsForGuessing(cardsRecieved: any[], roundNr: number): any {

    }

}
