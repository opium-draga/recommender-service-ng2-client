import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTokenComponent } from './new-token.component';

describe('NewTokenComponent', () => {
  let component: NewTokenComponent;
  let fixture: ComponentFixture<NewTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
