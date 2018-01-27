import { Card } from './../model/card';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MockSocketService {
    constructor(private http: Http) {

    }

    private getRandomElementFromArray(items: any[]): any {
        return items[Math.floor(Math.random() * items.length)];
    }

    getCards(): Observable<Card[]> {
        return this.http.get('/assets/cards.json').map(res => {
            return res.json().map(item => {
                return new Card(item.text, item.path ? '/assets/' + item.path : null, null, null);
            });
        });
    }

    getRandomCard(): Observable<Card> {
        return this.getCards().map(cards => {
            return this.getRandomElementFromArray(cards);
        });
    }


    getCardNumberForRound(roundNr: number): number {
        return 3 + roundNr;
    }

    getCardsForRound(roundNr: number): Observable<Card[]> {
        const cardsToRetur = this.getCardNumberForRound(roundNr);
        const cardsObject = this.getCards().map((items: Card[]) => {
            const toReturn: Card[] = [];
            while (toReturn.length < cardsToRetur) {
                const item = this.getRandomElementFromArray(items);
                if (item.iconUrl) {
                    toReturn.push(Object.assign({}, item));
                }
            }

            return toReturn;
        });

        return cardsObject;
    }
}
