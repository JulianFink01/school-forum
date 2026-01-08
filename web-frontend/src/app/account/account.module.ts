import {CommonModule} from '@angular/common';
import {FirebaseService} from '../shared/services/firebase.service';
import {AccountService} from '../shared/services/account.service';
import {HttpClient} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularStickyThingsModule} from '@w11k/angular-sticky-things';
import {AccountComponent} from './account.component';
import {AccountRoutingModule} from './account-routing.module';
import {PostModule} from '../forms/post/post.module';
import {EditProfileModule} from "../forms/edit-profile/edit-profile.module";
import {Firestore} from "../shared/utils/firestore";
import {NgModule} from '@angular/core';
import {BookModule} from "../forms/book/book.module";

@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        AngularStickyThingsModule,
        PostModule,
        EditProfileModule,
        BookModule
    ],
  providers: [
    HttpClient,
    FirebaseService,
    AccountService,
    Firestore
  ],
  exports: [
    AccountComponent
  ],
  declarations: [
    AccountComponent,
  ]
})
export class AccountModule {

  constructor() {
  }


}
