import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceValidatorComponent } from './sequence-validator.component';

describe('SequenceValidatorComponent', () => {
  let component: SequenceValidatorComponent;
  let fixture: ComponentFixture<SequenceValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
