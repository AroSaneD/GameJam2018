import { MockSocketService } from './../../services/mockSocket.service';
import { Card } from './../../model/card';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-sequence-validator',
  templateUrl: './sequence-validator.component.html',
  styleUrls: ['./sequence-validator.component.css'],
  providers: [MockSocketService]
})
export class SequenceValidatorComponent {

  validationSubject: Subject<boolean>;


  sequenceToValidate: Card[];
  cardsToSelectFrom: Card[];
  selectedCards: Card[];

  canUserSelect: boolean;

  showSequenceIntro = false;
  showSequenceSelection = false;

  constructor(public socketService: MockSocketService) { }


  public validateSequnce(cards: Card[]): Observable<boolean> {
    this.validationSubject = new Subject();
    this.validationSubject.next(false);

     //this.startValidationIntroduction(cards);
    this.allowUserInput(cards);

    return this.validationSubject;
  }

  public startValidationIntroduction(cards: Card[]) {
    this.showSequenceSelection = false;
    this.showSequenceIntro = true;

    this.sequenceToValidate = [];
    let i = 0;
    var interval = setInterval(() => {
      this.sequenceToValidate.push(cards[i++])
      if (i >= cards.length) {
        clearInterval(interval);
      }
    }, 1000);

    // this.sequenceToValidate = cards;
  }

  public allowUserInput(cardsToValidate: Card[]) {
    this.showSequenceSelection = true;
    this.showSequenceIntro = false;

    this.socketService.getUniqueCardsAndSomeMore(cardsToValidate).subscribe(cardsToSelect => {
      this.cardsToSelectFrom = cardsToSelect;

      this.selectedCards = cardsToValidate.map(c => Card.placeholderCard);
    })
  }

  public selectCard(card: Card, index: number) {

  }

}
