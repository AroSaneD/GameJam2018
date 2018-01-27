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
    //okpt("CSS Particle Effects");
    function initparticles() {
      //bubbles();
      confetti();
    }

    /*The measurements are ... whack (so to say), for more general text usage I would generate different sized particles for the size of text; consider this pen a POC*/

    //function bubbles() {
    //  $.each($(".particletext.bubbles"), function () {
    //    var bubblecount = ($(this).width() / 50) * 10;
    //    for (var i = 0; i <= bubblecount; i++) {
    //      var size = ($.rnd(40, 80) / 10);
    //      $(this).append('<span class="particle" style="top:' + $.rnd(20, 80) + '%; left:' + $.rnd(0, 95) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0, 30) / 10) + 's;"></span>');
    //    }
    //  });
    //}


    function confetti() {

      $.each($(".particletext .confetti, .particletext .confetti-r"), function () {
        var confetticount = 15;
        for (var i = 0; i <= confetticount; i++) {
          $(this).append('<span class="particle c' + $.rnd(1, 2) + '" style="top:' + $.rnd(10, 50) + '%; left:' + $.rnd(0, 100) + '%;width:' + $.rnd(6, 8) + 'px; height:' + $.rnd(3, 4) + 'px;animation-delay: ' + ($.rnd(0, 30) / 10) + 's;"></span>');
        }
      });
    }

    $.rnd = function (m, n) {
      m = parseInt(m);
      n = parseInt(n);
      return Math.floor(Math.random() * (n - m + 1)) + m;
    }

    // initparticles();

    // setTimeout(() => {
    //   this.parent.shouldShowAchievement = false;
    // }, 5000);

  }

}
