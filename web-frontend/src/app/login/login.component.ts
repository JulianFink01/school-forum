import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../shared/services/firebase.service';
import {Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {AccountService} from '../shared/services/account.service';
import {AccountState} from "../shared/store/reducers/account.reducer";
import {AccountLogin} from "../shared/store/actions/account.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginData: FormGroup;
  loginFailed = false;
  errorMessage = '';

  constructor(private loginService: FirebaseService, private router: Router, private store: Store<AccountState>,
              private accountService: AccountService) {
    this.loginData = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
      }
    );
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginData.valid) {
      const data = this.loginData.value;
      this.loginService.login(data.email, data.password).then(
        () => {
          this.loginFailed = false;
          this.accountService.getAccountInformation(data.email)?.subscribe(accountData => {
            localStorage.setItem('accountEmail', data.email);
            this.store.dispatch(new AccountLogin({account: accountData[0]}));
            this.router.navigateByUrl('/home');
          });
        }, (error: string) => {
          this.loginFailed = true;
          this.errorMessage = error;
        }
      );
    }
  }

  loginWithGoogle(): void {
    this.loginService.GoogleAuth().then(
      (googleAccountInformation: { user: { email: string } }) => {
        this.accountService.getAccountInformation(googleAccountInformation.user.email)?.subscribe(accountData => {
          if (accountData.length === 0) {
            this.router.navigateByUrl('/register/' + googleAccountInformation.user.email);
          }else{
            localStorage.setItem('accountEmail', googleAccountInformation.user.email);
            this.store.dispatch(new AccountLogin(JSON.parse(JSON.stringify(accountData[0]))));
            this.router.navigateByUrl('/home');
          }
        });
      }, (error: string) => {
        this.errorMessage = error;
        this.loginFailed = true;
      }
    );
  }

  navigateToRegister(): void {
    this.router.navigateByUrl('/register');
  }

}
