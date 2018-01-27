import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  buttons: { text: string }[] = [
    { text: 'button1' },
    { text: 'button2' },
    { text: 'button3' }, 
    { text: 'button4' },
    { text: 'button4' },
    { text: 'button4' },
    { text: 'button4' },
    { text: 'button4' },
    { text: 'button4' }];

  buttonClicked(button: any): void {
    console.log(button.text);
  }

}
