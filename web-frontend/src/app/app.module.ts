import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {FirebaseService} from './shared/services/firebase.service';
import {AuthGuard} from './shared/guards/auth.guard';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpErrorInterceptor} from './shared/http-error.interceptor';
import {AuthInterceptor} from './shared/auth.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {StoreModule} from '@ngrx/store';
import {reducers} from './shared/store/reducers';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {EditProfileModule} from './forms/edit-profile/edit-profile.module';
import {NgxImageCompressService} from 'ngx-image-compress';
import {DatePipe} from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import {LoginModule} from './login/login.module';
const config = {
  apiKey: environment.firebaseApiKey,
  authDomain: 'schoolforum-a9eaf.firebaseapp.com',
  projectId: 'schoolforum-a9eaf',
  storageBucket: 'schoolforum-a9eaf.appspot.com'
};


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
  ],
    imports: [
        BrowserModule,
        OverlayModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(config),
        AngularFireStorageModule,
        MatSidenavModule,
        MatFormFieldModule,
        StoreModule.forRoot(reducers),
        FormsModule,
        EditProfileModule,
        ReactiveFormsModule,
        LoginModule
    ],
  providers: [
    FirebaseService,
    MatSnackBar,
    AuthGuard,
    NgxImageCompressService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
