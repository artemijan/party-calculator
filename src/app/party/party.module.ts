import {NgModule} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {PartyDetailComponent} from './party-detail/party-detail.component';
import {MemberModule} from '../member/member.module'
import {RouterModule} from '@angular/router';
import {PartyEditFormComponent} from './party-edit-form/party-edit-form.component';
import {FormsModule} from '@angular/forms';
import {MdInputModule, MdButtonModule, MdCardModule, MdTabsModule} from '@angular/material';
import { PartyCreateFormComponent } from './party-create-form/party-create-form.component';
@NgModule({
  imports: [
    CommonModule,
    MemberModule,
    RouterModule,
    FormsModule,
    MdInputModule,
    MdButtonModule,
    MdCardModule,
    MdTabsModule
  ],
  exports: [PartyDetailComponent, PartyEditFormComponent],
  declarations: [PartyDetailComponent, PartyEditFormComponent, PartyCreateFormComponent]
})
export class PartyModule {
}
