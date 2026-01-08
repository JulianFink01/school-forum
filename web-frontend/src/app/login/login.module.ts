import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {FirebaseService} from '../shared/services/firebase.service';
import {LoginRoutingModule} from './login-routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpErrorInterceptor} from '../shared/http-error.interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    providers: [
        FirebaseService,
    ],
    exports: [
        LoginComponent
    ],
    declarations: [
        LoginComponent,
    ]
})
export class LoginModule {

  constructor() {
  }


}
