import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartyComponent } from './party/party.component';
import { PartyDetailComponent } from './party-detail/party-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PartyComponent, PartyDetailComponent]
})
export class PartyModule { }
