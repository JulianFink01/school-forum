import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import firebase from 'firebase';
import auth = firebase.auth;

@Injectable()
export class FirebaseService {

  constructor(private  angularFireAuth: AngularFireAuth) {
  }

  login(email: string, password: string): any {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): any {
    return this.angularFireAuth.signOut();
  }

  forgotPassword(email: string): any {
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }

  getToken(): Observable<string> {
    // @ts-ignore
    return this.angularFireAuth.idToken;
  }

  getAuth(): any {
    return this.angularFireAuth.authState.pipe(map(auth => auth));
  }

  register(email: string, password: string): any {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  GoogleAuth(): any {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider: any): any {
    return this.angularFireAuth.signInWithPopup(provider);
  }

}
