import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirebaseService} from '../shared/services/firebase.service';
import {AccountService} from '../shared/services/account.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularStickyThingsModule} from '@w11k/angular-sticky-things';
import {PostModule} from '../forms/post/post.module';
import {Firestore} from '../shared/utils/firestore';
import {ForumComponent} from './forum.component';
import {AddPostModule} from '../forms/add-post/add-post.module';
import {ForumRoutingModule} from './forum-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AngularStickyThingsModule,
    PostModule,
    AddPostModule,
    ForumRoutingModule
  ],
  providers: [
    FirebaseService,
    AccountService,
    Firestore
  ],
  exports: [
    ForumComponent
  ],
  declarations: [
    ForumComponent
  ]
})
export class ForumModule {

  constructor() {
  }


}
