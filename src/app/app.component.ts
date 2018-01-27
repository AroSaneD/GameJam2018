import { MockSocketService } from './services/mockSocket.service';
import { Card } from './model/card';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MockSocketService]
})
export class AppComponent {
  title = 'app';

  // selectedCards: Card[];
  // availableCards: Card[];

  constructor(private socketService: MockSocketService) {
    this.socketService.getCardsForRound(5).map(res => {
      return res.json().map(item => {
        return item.text;
      })
    }).subscribe((a) => {
      console.log(a);
    });
  }

  buttonClicked(button: any): void {
    console.log(button.text);
  }



}
