import { MockSocketService } from './services/mockSocket.service';
import { Card } from './model/card';
import { Component, AfterViewChecked, ViewEncapsulation  } from '@angular/core';
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

  selectedCards: Observable<Card[]>;
  availableCards: Card[];

  constructor(private socketService: MockSocketService) {
    this.selectedCards = this.socketService.getCardsForRound(5);
  }

  buttonClicked(button: any): void {
    console.log(button.text);
  }

  ngAfterViewChecked() {
    
  }

}
