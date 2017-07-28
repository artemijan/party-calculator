import {NgModule} from '@angular/core';
import {GoodItemComponent} from './good-item/good-item.component';
import {GoodItemEditFormComponent} from './good-item-edit-form/good-item-edit-form.component';
import {FormsModule} from '@angular/forms';
import { GoodCreateFormComponent } from './good-create-form/good-create-form.component';
import {MdButtonModule, MdInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    MdInputModule,
    MdButtonModule,
    RouterModule
  ],
  declarations: [GoodItemComponent, GoodItemEditFormComponent, GoodCreateFormComponent]
})
export class GoodModule {
}
