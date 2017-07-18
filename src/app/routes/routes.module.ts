import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PartyDetailComponent} from '../party/party-detail/party-detail.component';
import {UserEditFormComponent} from '../member/user-edit-form/user-edit-form.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {PartyCreateFormComponent} from '../party/party-create-form/party-create-form.component';
import {CreateUserFormComponent} from '../member/create-user-form/create-user-form.component';
import {PartyEditFormComponent} from '../party/party-edit-form/party-edit-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'party',
        component: PartyCreateFormComponent
      },
      {
        path: 'party/:id',
        component: PartyDetailComponent
      },
      {
        path: 'party/:id/edit',
        component: PartyEditFormComponent
      },
      {
        path: 'party/:id/member',
        component: CreateUserFormComponent
      },
      {
        path: 'party/:partyId/member/:userId',
        component: UserEditFormComponent
      }
    ])
  ],
  declarations: []
})
export class RoutesModule {
}
