import { MockSocketService } from './services/mockSocket.service';
import { Card } from './model/card';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MockSocketService]
})
export class AppComponent {
  title = 'app';

  selectedCards: Observable<Card[]>;
  availableCards: Observable<Card[]>;

  shouldSendCards: Observable<boolean> = Observable.create();

  public currentRound = 1;

  startRound(): void {
    this.availableCards = this.socketService.getCardsForRound(5);

  }

  constructor(private socketService: MockSocketService) {
    this.startRound();
  }

  buttonClicked(button: any): void {
    console.log(button.text);
  }

}
