import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddBookComponent} from './add-book.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from "@angular/material/input";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
    ],
  providers: [
  ],
  exports: [
    AddBookComponent
  ],
  declarations: [
    AddBookComponent,
  ]
})
export class AddBookModule {

  constructor() {
  }


}
