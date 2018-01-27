import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { AchievementComponent } from './components/achievement/achievement.component';
import { SequenceValidatorComponent } from './components/sequence-validator/sequence-validator.component';


@NgModule({
  declarations: [
    AppComponent,
    AchievementComponent,
    SequenceValidatorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
