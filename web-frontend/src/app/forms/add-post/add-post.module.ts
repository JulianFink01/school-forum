import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddPostComponent} from './add-post.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
  ],
  exports: [
    AddPostComponent
  ],
  declarations: [
    AddPostComponent,
  ]
})
export class AddPostModule {

  constructor() {
  }


}
