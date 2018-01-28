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

    getNFirstCards(n: number): Observable<Card[]> {
        const cardsObject = this.getCards().map((items: Card[]) => {
            const toReturn: Card[] = [];
            for (let i = 0; i < n; i++) {
                toReturn.push(Object.assign({}, items[i]));
            }

            return toReturn;
        });

        return cardsObject;
    }

    getUniqueCardsAndSomeMore(cards: Card[]): Observable<Card[]> {
        const cardsObject = this.getCards().map((items: Card[]) => {
            const toReturn: Card[] = [...cards];
            const returnNr = cards.length + 3;
            
            const unusedCards = items.filter(c => toReturn.find(c1 => c.iconUrl == c1.iconUrl) == null);
            
            while (toReturn.length < returnNr) {
                const item = this.getRandomElementFromArray(unusedCards);
                if (item.iconUrl && (toReturn.findIndex(c => c.iconUrl == item.iconUrl) === -1)) {
                    toReturn.push(Object.assign({}, item));
                }
            }

            return toReturn;
        });

        return cardsObject;
    }
}
