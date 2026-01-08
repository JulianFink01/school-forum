import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirebaseService} from '../shared/services/firebase.service';
import {AccountService} from '../shared/services/account.service';
import {HttpClient} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularStickyThingsModule} from '@w11k/angular-sticky-things';
import {Firestore} from '../shared/utils/firestore';
import {AddBookModule} from '../forms/add-book/add-book.module';
import {BooksComponent} from './books.component';
import {EditBookModule} from '../forms/edit-book/edit-book.module';
import {BookModule} from '../forms/book/book.module';
import {BooksRoutingModule} from './books-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    BooksRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    AngularStickyThingsModule,
    AddBookModule,
    EditBookModule,
    BookModule,
  ],
    providers: [
        HttpClient,
        FirebaseService,
        AccountService,
        Firestore
    ],
    exports: [
        BooksComponent
    ],
    declarations: [
        BooksComponent,
    ]
})
export class BooksModule {

    constructor() {
    }


}
