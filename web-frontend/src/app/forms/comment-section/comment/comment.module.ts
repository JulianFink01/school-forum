import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentComponent} from './comment.component';
import {EditModalModule} from "../../edit-modal/edit-modal.module";

@NgModule({
    imports: [
        CommonModule,
        EditModalModule,
    ],
  providers: [
  ],
  exports: [
    CommentComponent
  ],
  declarations: [
    CommentComponent,
  ]
})
export class CommentModule {

  constructor() {
  }


}
