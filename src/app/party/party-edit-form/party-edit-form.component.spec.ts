import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyEditFormComponent } from './party-edit-form.component';

describe('PartyEditFormComponent', () => {
  let component: PartyEditFormComponent;
  let fixture: ComponentFixture<PartyEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
