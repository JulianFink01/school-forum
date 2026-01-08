import {NgModule} from '@angular/core';
import {BookComponent} from './book.component';
import {CommonModule} from '@angular/common';
import {CommentSectionModule} from '../comment-section/comment-section.module';
import {EditModalModule} from '../edit-modal/edit-modal.module';
import {EditBookModule} from '../edit-book/edit-book.module';
import {SwiperModule} from "swiper/angular";

@NgModule({
    imports: [
        CommonModule,
        CommentSectionModule,
        EditModalModule,
        EditBookModule,
        SwiperModule
    ],
  providers: [
  ],
  exports: [
    BookComponent
  ],
  declarations: [
    BookComponent,
  ]
})
export class BookModule {

  constructor() {
  }


}
