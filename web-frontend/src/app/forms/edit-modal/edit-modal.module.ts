import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditModalComponent} from './edit-modal.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
  ],
  exports: [
    EditModalComponent
  ],
  declarations: [
    EditModalComponent,
  ]
})
export class EditModalModule {

  constructor() {
  }
}
