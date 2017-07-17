import {NgModule} from '@angular/core';
import {UserComponent} from './user/user.component';
import {UserEditFormComponent} from './user-edit-form/user-edit-form.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [FormsModule],
  exports: [UserComponent, UserEditFormComponent],
  declarations: [UserComponent, UserEditFormComponent]
})
export class MemberModule {
}
