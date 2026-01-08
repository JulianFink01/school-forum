import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentSectionComponent} from './comment-section.component';
import {PostService} from '../../shared/services/post.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommentModule} from "./comment/comment.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommentModule,
  ],
  providers: [
    PostService
  ],
  exports: [
    CommentSectionComponent
  ],
  declarations: [
    CommentSectionComponent
  ]
})
export class CommentSectionModule {

  constructor() {
  }


}
