import { MockSocketService } from './services/mockSocket.service';
import { Card } from './model/card';
import { Component, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MockSocketService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewChecked {

  title = 'app';

  selectedCards: Card[] = [];
  availableCards: Observable<Card[]>;

  shouldSendCards: Observable<boolean> = Observable.create();

  shouldShowAchievement = false;
  public currentRound = 1;

  startRound(): void {
    this.availableCards = this.socketService.getCardsForRound(16);
    this.availableCards.subscribe(item => {
      this.selectedCards.push(item[1]);
      this.selectedCards.push(item[4]);
      this.selectedCards.push(item[5]);
      this.selectedCards.push(new Card('test', null, null, null, true, null));
    });
  }



  constructor(private socketService: MockSocketService) {
    this.startRound();
  }

  buttonClicked(button: any): void {
    console.log(button.text);
    //
    this.shouldShowAchievement = true;
  }

  ngAfterViewChecked() {

  }

}
