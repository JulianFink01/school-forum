import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private  angularFireAuth: AngularFireAuth,
              private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    return this.angularFireAuth
      .authState
      .pipe(
        map(user => {
          if (!user) {
            sessionStorage.setItem('navigateAfterLogin', state.url);
            this.router.navigateByUrl('/login');
            return false;
          }
          return true;
        }));

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

}
