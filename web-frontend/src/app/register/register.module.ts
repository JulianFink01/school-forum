import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {FirebaseService} from '../shared/services/firebase.service';
import {RegisterRoutingModule} from './register-routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpErrorInterceptor} from '../shared/http-error.interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    FirebaseService
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule {

  constructor() {
  }


}
