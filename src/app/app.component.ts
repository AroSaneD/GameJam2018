import { SequenceValidatorComponent } from './components/sequence-validator/sequence-validator.component';
import { OpponentResponse } from './model/ai/opponentResponse';
import { MockSocketService } from './services/mockSocket.service';
import { Card } from './model/card';
import { Component, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as $ from "jquery";
import { TurnModel } from './model/ai/turnModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MockSocketService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit{

  title = 'app';

  selectedCards: Card[] = [];
  availableCards: Card[] = [];

  shouldSendCards: Observable<boolean> = Observable.create();

  shouldShowAchievement = false;

  showSequenceSelection = false;
  showSequenceValidation = true;

  public currentRound = 1;

  @ViewChild("validator") validatorComponent: SequenceValidatorComponent;

  startRound(previousSequence: Card[]): void {
    if (previousSequence && previousSequence.length > 0) {
      this.selectedCards = [...previousSequence, Card.placeholderCard];
    } else {
      this.selectedCards = [Card.placeholderCard, Card.placeholderCard];
    }

    const obs = this.socketService.getCardsForRound(this.currentRound);
    obs.subscribe(cards => this.availableCards = cards);

    // this.availableCards = this.socketService.getCardsForRound(this.currentRound);
  }

  constructor(private socketService: MockSocketService) {
    // Init turn model
    TurnModel.app = this;
    TurnModel.socketService = this.socketService;

    
  }

  ngAfterViewInit() {
    //this.startRound(null);
    this.socketService.getNFirstCards(3).subscribe(cards => this.startValidation(cards));
  }

  buttonClicked(button: Card, buttonIndex: number): void {
    if (button.isSelected || this.selectedCards.filter(c => c.isPlaceHolder).length < 1) {
      return;
    }

    const indexOfFirstPlaceholder = this.selectedCards.findIndex(c => c.isPlaceHolder);
    this.selectedCards[indexOfFirstPlaceholder] = button;

    this.availableCards = this.availableCards.map((c, i) => {
      if (!c.isSelected) {
        c.isSelected = buttonIndex === i;
      }
      return c;
    });

    if (this.selectedCards.filter(c => c.isPlaceHolder).length < 1) {
      // todo: play card send animation
      this.showSequenceSelection = false;
      let opponentResponse: OpponentResponse = null;
      do {
        opponentResponse = TurnModel.Instance.sendSequenceToOpponent(this.selectedCards);
        // todo: play the animations showing the opponents guesses and "wait" for him to submit another one
      } while (!opponentResponse.isPlayerTurn)

      this.currentRound++;
      this.startRound(opponentResponse.nextSequence);
    }

  }

  startValidation(cards: Card[]): void {
    this.showSequenceSelection = false;
    this.showSequenceValidation = true;

    this.validatorComponent.startValidationIntroduction(cards);
  }

}
