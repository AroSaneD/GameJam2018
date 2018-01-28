import { SequenceValidatorComponent } from './components/sequence-validator/sequence-validator.component';
import { OpponentResponse } from './model/ai/opponentResponse';
import { MockSocketService } from './services/mockSocket.service';
import { Card } from './model/card';
import { Component, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TurnModel } from './model/ai/turnModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MockSocketService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {

  title = 'app';

  selectedCards: Card[] = [];
  availableCards: Card[] = [];

  shouldSendCards: Observable<boolean> = Observable.create();

  shouldShowAchievement = false;

  showSequenceSelection = true;
  showSequenceValidation = false;

  isPlayerPicking = true;
  isPlayerValidating = false;
  isOpponentPicking = false;
  isOpponentValidating = false;

  public currentRound = 1;

  @ViewChild('validator') validatorComponent: SequenceValidatorComponent;

  setPlayerStatus(player: number, status: number) {
    this.isPlayerPicking = false;
    this.isPlayerValidating = false;
    this.isOpponentPicking = false;
    this.isOpponentValidating = false;

    if (player === 0) {
      if (status === 0) this.isPlayerPicking = true;
      else this.isPlayerValidating = true;
    } else {
      if (status === 0) this.isOpponentPicking = true;
      else this.isOpponentValidating = true;
    }
  }

  startRound(previousSequence: Card[]): void {
    this.showSequenceSelection = true;
    this.showSequenceValidation = false;
    this.setPlayerStatus(0, 0);

    if (previousSequence && previousSequence.length > 0) {
      this.selectedCards = [...previousSequence, Card.placeholderCard];
    } else {
      this.selectedCards = [Card.placeholderCard, Card.placeholderCard];
    }

    const obs = this.socketService.getCardsForRound(this.currentRound++);
    obs.subscribe(cards => this.availableCards = cards);

    // this.availableCards = this.socketService.getCardsForRound(this.currentRound);
  }

  constructor(public socketService: MockSocketService) {
    // Init turn model
    TurnModel.app = this;
    TurnModel.socketService = this.socketService;


  }

  ngAfterViewInit() {
    this.startRound(null);
    // this.socketService.getNFirstCards(3).subscribe(cards => this.startValidation(cards));
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
      this.setPlayerStatus(1, 0);

      // todo: play card send animation
      let opponentResponse: OpponentResponse = null;

      do {
        opponentResponse = TurnModel.Instance.sendSequenceToOpponent(this.selectedCards);
        // todo: play the animations showing the opponents guesses and "wait" for him to submit another one
      } while (!opponentResponse.isPlayerTurn);

      // todo: play opponent validation and selection animations
      this.startValidation(opponentResponse.nextSequence);

      setTimeout(() => {
        this.selectedCards.forEach(c => c.isSelected = false);
      }, 100);
      // this.startRound(opponentResponse.nextSequence);
    }

  }

  startValidation(cards: Card[]): void {
    this.setPlayerStatus(0, 1);

    this.showSequenceSelection = false;
    this.showSequenceValidation = true;

    this.validatorComponent.validateSequnce(cards).subscribe(results => {
      this.setPlayerStatus(0, 0);

      this.showSequenceSelection = true;
      this.showSequenceValidation = false;

      this.startRound(cards);
    });
  }

}
