import { MockSocketService } from './../../services/mockSocket.service';
import { Card } from './../../model/card';
import { Component, OnInit, Host } from '@angular/core';
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

  validationSubject: Subject<boolean[]>;
  validationResults: boolean[];

  sequenceToValidate: Card[];
  cardsToSelectFrom: Card[];
  selectedCards: Card[];

  canUserSelect: boolean;

  showSequenceIntro = false;
  showSequenceSelection = false;

  constructor(public socketService: MockSocketService) { }


  public validateSequnce(cards: Card[]): Observable<boolean[]> {
    this.validationResults = cards.map(c => true);

    this.validationSubject = new Subject<boolean[]>();


    this.startValidationIntroduction(cards);
    // this.allowUserInput(cards);

    return this.validationSubject;
  }

  public startValidationIntroduction(cards: Card[]) {
    this.showSequenceIntro = true;
    this.showSequenceSelection = false;

    this.sequenceToValidate = [];
    let i = 0;
    const interval = setInterval(() => {
      var audio = new Audio(cards[i].soundUrl);
      audio.play();
      this.sequenceToValidate.push(cards[i++])
      if (i >= cards.length) {
        clearInterval(interval);
        setTimeout(() => {
          this.allowUserInput(cards);
        }, 2000);
      }
    }, 1000);
  }

  public allowUserInput(cardsToValidate: Card[]) {
    this.showSequenceSelection = true;
    this.showSequenceIntro = false;

    this.socketService.getUniqueCardsAndSomeMore(cardsToValidate).subscribe(cardsToSelect => {
      this.cardsToSelectFrom = cardsToSelect;

      this.selectedCards = cardsToValidate.map(c => Card.placeholderCard);
    });
  }

  public selectCard(card: Card, index: number) {
    const indexOfFirstPlaceholder = this.selectedCards.findIndex(c => c.isPlaceHolder);
    this.selectedCards[indexOfFirstPlaceholder] = card;

    var audio = new Audio(card.soundUrl);
    audio.play();

    if (this.sequenceToValidate[indexOfFirstPlaceholder].iconUrl !== this.selectedCards[indexOfFirstPlaceholder].iconUrl) {
      this.validationResults[indexOfFirstPlaceholder] = false;
    }

    if (this.selectedCards.filter(c => c.isPlaceHolder).length < 1) {
      // Todo: play some sort of animation before heading back to the parent
      this.validationSubject.next(this.validationResults);
    }
  }

}
