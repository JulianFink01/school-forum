import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FirebaseService} from './services/firebase.service';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public firebaseService: FirebaseService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.firebaseService.getToken().pipe(
      mergeMap((token: any) => {
        if (token) {
          // The Code underneath will enable Authentification on API Calls - Enable it when api ready for it
          request = request.clone({setHeaders: {Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*'}});
        }
        return next.handle(request);
      }));
  }
}
