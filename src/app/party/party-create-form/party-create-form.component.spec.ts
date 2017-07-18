import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyCreateFormComponent } from './party-create-form.component';

describe('PartyCreateFormComponent', () => {
  let component: PartyCreateFormComponent;
  let fixture: ComponentFixture<PartyCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
