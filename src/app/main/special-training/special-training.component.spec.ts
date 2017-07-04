import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialTrainingComponent } from './special-training.component';

describe('SpecialTrainingComponent', () => {
  let component: SpecialTrainingComponent;
  let fixture: ComponentFixture<SpecialTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
