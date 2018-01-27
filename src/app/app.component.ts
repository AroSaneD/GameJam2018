import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SocketService]
})
export class AppComponent {

  constructor(socketService: SocketService) {

  }

  title = 'app';

  buttons: { text: string }[] = [
    { text: 'button1' },
    { text: 'button2' },
    { text: 'button3' }
  ];
}
