import { Component, OnInit, AfterViewInit, ViewEncapsulation, Host } from '@angular/core';
import * as $ from "jquery";
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AchievementComponent implements OnInit, AfterViewInit {

  constructor( @Host() public parent: AppComponent) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $('#achievement-holder').addClass('animated bounceInLeft');

    setTimeout(() => { $('#achievement-holder').addClass('bounceOutLeft'); }, 5000);

    // initparticles();

    // setTimeout(() => {
    //   this.parent.shouldShowAchievement = false;
    // }, 5000);

  }

}
