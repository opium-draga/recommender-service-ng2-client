import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSetsComponent } from './item-sets.component';

describe('ItemSetsComponent', () => {
  let component: ItemSetsComponent;
  let fixture: ComponentFixture<ItemSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
