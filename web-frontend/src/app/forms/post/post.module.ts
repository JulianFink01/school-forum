import {NgModule} from '@angular/core';
import {PostComponent} from './post.component';
import {CommonModule} from '@angular/common';
import {CommentSectionModule} from '../comment-section/comment-section.module';
import {EditModalModule} from '../edit-modal/edit-modal.module';
import {EditPostModule} from '../edit-post/edit-post.module';
import {SwiperModule} from "swiper/angular";

@NgModule({
    imports: [
        CommonModule,
        CommentSectionModule,
        EditModalModule,
        EditPostModule,
        SwiperModule
    ],
  providers: [
  ],
  exports: [
    PostComponent
  ],
  declarations: [
    PostComponent,
  ]
})
export class PostModule {

  constructor() {
  }


}
