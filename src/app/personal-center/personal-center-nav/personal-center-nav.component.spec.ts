import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCenterNavComponent } from './personal-center-nav.component';

describe('PersonalCenterNavComponent', () => {
  let component: PersonalCenterNavComponent;
  let fixture: ComponentFixture<PersonalCenterNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalCenterNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalCenterNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
