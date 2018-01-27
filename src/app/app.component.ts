import { MockSocketService } from './services/mockSocket.service';
import { Card } from './model/card';
import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MockSocketService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  title = 'app';

  selectedCards: Card[] = [];
  availableCards: Card[] = [];

  shouldSendCards: Observable<boolean> = Observable.create();

  shouldShowAchievement = false;
  public currentRound = 1;

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
    this.startRound(null);
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
      // todo send these cards to the next opponent
    }

  }

}
