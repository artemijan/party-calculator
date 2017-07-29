import {NgModule} from '@angular/core';
import {UserEditFormComponent} from './user-edit-form/user-edit-form.component';
import {FormsModule} from '@angular/forms';
import {MdButtonModule, MdCardModule, MdInputModule, MdTabsModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {CreateUserFormComponent} from './create-user-form/create-user-form.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {MembersListComponent} from './members-list/members-list.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule, FormsModule, MdInputModule, RouterModule, MdButtonModule, MdCardModule, MdTabsModule],
  declarations: [UserEditFormComponent, CreateUserFormComponent, UserDetailsComponent, MembersListComponent]
})
export class MemberModule {
}
