import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PartyDetailComponent} from './party-detail/party-detail.component';
import {MemberModule} from '../member/member.module'
import {RouterModule} from '@angular/router';
import {PartyEditFormComponent} from './party-edit-form/party-edit-form.component';
import {FormsModule} from '@angular/forms';
import {MdInputModule, MdButtonModule} from '@angular/material';
import { PartyCreateFormComponent } from './party-create-form/party-create-form.component';
@NgModule({
  imports: [
    CommonModule,
    MemberModule,
    RouterModule,
    FormsModule,
    MdInputModule,
    MdButtonModule
  ],
  exports: [PartyDetailComponent, PartyEditFormComponent],
  declarations: [PartyDetailComponent, PartyEditFormComponent, PartyCreateFormComponent]
})
export class PartyModule {
}
