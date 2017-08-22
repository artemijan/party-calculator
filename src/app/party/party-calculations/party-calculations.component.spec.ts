import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyCalculationsComponent } from './party-calculations.component';

describe('PartyCalculationsComponent', () => {
  let component: PartyCalculationsComponent;
  let fixture: ComponentFixture<PartyCalculationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyCalculationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
