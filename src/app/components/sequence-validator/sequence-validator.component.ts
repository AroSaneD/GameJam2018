import { Card } from './../../model/card';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-sequence-validator',
  templateUrl: './sequence-validator.component.html',
  styleUrls: ['./sequence-validator.component.css']
})
export class SequenceValidatorComponent{

  validationSubject: Subject<boolean>;
  sequenceToValidate: Card[];

  constructor() { }


  public validateSequnce(cards: Card[]): Observable<boolean>{
    this.validationSubject = new Subject();
    this.validationSubject.next(false);

    this.startValidationIntroduction(cards);

    return this.validationSubject;
  }

  public startValidationIntroduction(cards: Card[]){
    this.sequenceToValidate = cards;
  }

}
