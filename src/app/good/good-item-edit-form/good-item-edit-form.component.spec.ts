import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodItemEditFormComponent } from './good-item-edit-form.component';

describe('GoodItemEditFormComponent', () => {
  let component: GoodItemEditFormComponent;
  let fixture: ComponentFixture<GoodItemEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodItemEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodItemEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
