import {NgModule} from '@angular/core';
import {UserEditFormComponent} from './user-edit-form/user-edit-form.component';
import {FormsModule} from '@angular/forms';
import {MdButtonModule, MdInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {CreateUserFormComponent} from './create-user-form/create-user-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  imports: [FormsModule, MdInputModule, RouterModule, MdButtonModule],
  declarations: [UserEditFormComponent, CreateUserFormComponent, UserDetailsComponent]
})
export class MemberModule {
}
