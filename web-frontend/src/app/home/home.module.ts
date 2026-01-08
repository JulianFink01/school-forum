import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {FirebaseService} from '../shared/services/firebase.service';
import {HomeRoutingModule} from './home-routing.module';
import {AccountService} from '../shared/services/account.service';
import {HttpClient} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularStickyThingsModule} from '@w11k/angular-sticky-things';
import {PostModule} from '../forms/post/post.module';
import {Firestore} from '../shared/utils/firestore';
import {AddPostModule} from '../forms/add-post/add-post.module';
import {EditPostModule} from '../forms/edit-post/edit-post.module';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        AngularStickyThingsModule,
        PostModule,
        AddPostModule,
        EditPostModule
    ],
  providers: [
    HttpClient,
    FirebaseService,
    AccountService,
    Firestore
  ],
  exports: [
    HomeComponent
  ],
  declarations: [
    HomeComponent,
  ]
})
export class HomeModule {

  constructor() {
  }


}
