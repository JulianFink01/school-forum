import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../shared/services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountLogin} from '../shared/store/actions/account.actions';
import {Store} from '@ngrx/store';
import {AccountState} from '../shared/store/reducers/account.reducer';
import {AccountService} from '../shared/services/account.service';
import {AccountDTO} from '../shared/models/DTO/AccountDTO';
import {Account} from '../shared/models/Account';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerData: FormGroup;
  registerFailed = false;
  errorMessage = '';
  subscription: Subscription | null;
  email: string | null;

  constructor(private loginService: FirebaseService, private router: Router, private store: Store<AccountState>,
              private accountService: AccountService, private route: ActivatedRoute) {
    this.subscription = null;
    this.email = this.route.snapshot.paramMap.get('completeProfile');
    this.registerData = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        birthDay: new FormControl('', [Validators.required]),
        email: new FormControl(this.email ? this.email : '', [Validators.required, Validators.email]),
        password: new FormControl(this.email ? this.email : '', [Validators.required]),
        passwordRepeat: new FormControl(this.email ? this.email : '', [Validators.required]),
      }
    );
  }

  ngOnInit(): void {

  }

  getUserObject(): AccountDTO {
    const data = this.registerData.value;
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      birthDay: data.birthDay,
      profilePicture: {
        path: 'https://firebasestorage.googleapis.com/v0/b/schoolforum-a9eaf.appspot.com/o/Images%2F1611785647264?alt=media&token=751eaa9d-ddb8-4c6a-9644-696c266f4b4b',
        description: data.firstName + '\'s Profile Image'
      },
      thumbnail: {
        path: 'https://firebasestorage.googleapis.com/v0/b/schoolforum-a9eaf.appspot.com/o/Images%2F1611785648331?alt=media&token=ec83e981-badc-4db1-972b-60de50d997df',
        description: data.firstName + '\'s Thumbnail Image'
      }
    };
  }

  saveUserToLocalStorage(accountData: Account): void {
    this.store.dispatch(new AccountLogin({account: accountData}));
    localStorage.setItem('accountInformation', JSON.stringify(accountData));
  }


  registerGoogleAndLocale(data: any): void {
    this.loginService.register(data.email, data.password).then(
      () => {
        this.subscription = this.accountService.register(this.getUserObject()).subscribe(
          (accountInfos) => {
            this.saveUserToLocalStorage(accountInfos);
            this.loginService.login(data.email, data.password).then(() => {
              this.subscription?.unsubscribe();
              this.router.navigateByUrl('/home');
            });
          }
        );
      }, (error: string) => {
        this.registerFailed = true;
        this.errorMessage = error;
      }
    );
  }

  registerLocale(): void {
    this.subscription = this.accountService.register(this.getUserObject()).subscribe(
      (accountInfos) => {
        this.saveUserToLocalStorage(accountInfos);
        this.subscription?.unsubscribe();
        this.router.navigateByUrl('/home');
      }
    );
  }

  register(): void {
    const data = this.registerData.value;
    if (this.registerData.valid) {
      if (this.email) {
        this.registerLocale();
      } else {
        if (data.password === data.passwordRepeat) {
          this.registerGoogleAndLocale(data);
        } else {
          this.errorMessage = 'Passwords do not match!';
          this.registerFailed = true;
        }
      }
    } else {
      this.registerFailed = true;
      this.errorMessage = 'You haven`t filled all fields yet!';
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  errorValidation(error: any): void {

    switch (error.code) {
      case 'auth/email-already-in-use': {
        this.errorMessage = 'This email address is already in use.';
        this.registerFailed = true;
        break;
      }
      case 'auth/invalid-email': {
        this.errorMessage = 'This email address is invalid.';
        this.registerFailed = true;
        break;
      }
      case 'auth/weak-password': {
        this.errorMessage = 'Password should be at least 6 characters long.';
        this.registerFailed = true;
        break;
      }
    }
  }

  loginWithGoogle(): void {
    this.loginService.GoogleAuth().then(
      (googleAccountInformation: { user: { email: string } }) => {
        this.router.navigateByUrl('/home');
        this.accountService.getAccountInformation(googleAccountInformation.user.email)?.subscribe(accountData => {
          this.store.dispatch(new AccountLogin(JSON.parse(JSON.stringify(accountData[0]))));
          localStorage.setItem('accountInformation', JSON.stringify(accountData[0]));
        });
      }, (error: string) => {
        this.errorMessage = error;
        this.registerFailed = true;
      }
    );
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
