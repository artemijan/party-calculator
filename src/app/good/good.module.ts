import {NgModule} from '@angular/core';
import {GoodItemComponent} from './good-item/good-item.component';
import {GoodItemEditFormComponent} from './good-item-edit-form/good-item-edit-form.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    FormsModule
  ],
  exports: [GoodItemComponent, GoodItemEditFormComponent],
  declarations: [GoodItemComponent, GoodItemEditFormComponent]
})
export class GoodModule {
}
