import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodCreateFormComponent } from './good-create-form.component';

describe('GoodCreateFormComponent', () => {
  let component: GoodCreateFormComponent;
  let fixture: ComponentFixture<GoodCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
