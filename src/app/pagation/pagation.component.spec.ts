import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagationComponent } from './pagation.component';

describe('PagationComponent', () => {
  let component: PagationComponent;
  let fixture: ComponentFixture<PagationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
