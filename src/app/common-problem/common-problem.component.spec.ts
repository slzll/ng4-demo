import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonProblemComponent } from './common-problem.component';

describe('CommonProblemComponent', () => {
  let component: CommonProblemComponent;
  let fixture: ComponentFixture<CommonProblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonProblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
