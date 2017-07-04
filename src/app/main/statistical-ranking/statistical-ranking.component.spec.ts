import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalRankingComponent } from './statistical-ranking.component';

describe('StatisticalRankingComponent', () => {
  let component: StatisticalRankingComponent;
  let fixture: ComponentFixture<StatisticalRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticalRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
