import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {Firestore} from '../../shared/utils/firestore';
import {EditBookComponent} from './edit-book.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
    Firestore
  ],
  exports: [
    EditBookComponent
  ],
  declarations: [
    EditBookComponent,
  ]
})
export class EditBookModule {

  constructor() {
  }
}
