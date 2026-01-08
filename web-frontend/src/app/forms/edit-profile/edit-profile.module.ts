import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditProfileComponent} from './edit-profile.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {AccountService} from '../../shared/services/account.service';
import {MatSelectModule} from '@angular/material/select';
import {LanguageService} from '../../shared/services/language.service';
import {Firestore} from '../../shared/utils/firestore';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    AccountService,
    LanguageService,
    Firestore
  ],
  exports: [
    EditProfileComponent
  ],
  declarations: [
    EditProfileComponent,
  ]
})
export class EditProfileModule {

  constructor() {
  }
}
