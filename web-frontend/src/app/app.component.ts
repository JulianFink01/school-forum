import {Component, HostListener, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from './shared/services/firebase.service';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectGeneral, GeneralState} from './shared/store/reducers/general.reducer';
import {General} from './shared/store/models/general';
import {SearchValue, SidebarToggle} from './shared/store/actions/general.actions';
import {AccountState, selectAccount} from './shared/store/reducers/account.reducer';
import {AccountLogin} from './shared/store/actions/account.actions';
import {Account} from './shared/models/Account';
import {EditProfileComponent} from './forms/edit-profile/edit-profile.component';
import {AccountService} from './shared/services/account.service';
import {SidebarComponent} from "./sidebar/sidebar.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('accountSettings') settings?: EditProfileComponent;
  @ViewChild('sidebarComponent') sidebar?: SidebarComponent;

  title = 'School Forum Website';
  general$: Observable<General>;
  account$: Observable<Account[]> | undefined;
  searchValue = '';

  constructor(private router: Router, private firebaseService: FirebaseService,
              private generalStateStore: Store<GeneralState>, private accountStateStore: Store<AccountState>,
              private accountService: AccountService) {
    this.general$ = this.generalStateStore.pipe(select(selectGeneral));
    if (localStorage.getItem('accountEmail') != null) {
      const account = this.accountService.getAccountInformation(localStorage.getItem('accountEmail'));
      if (account) {
        this.account$ = account;
      }
      this.account$?.subscribe(data => {
        this.accountStateStore.dispatch(new AccountLogin({account: data[0]}));
      });
    }

  }


  toggleSideBar(): void {
    this.sidebar?.toggleSideBar();
  }

  changeDetection(event: any): void {
    this.searchValue = event.target.value;
  }

  searchForValue(filter: string): void {
    this.generalStateStore.dispatch(new SearchValue({isShown: false, searchValue: filter}));
  }

  showSidebar(): boolean {
    return (this.router.url !== '/login' && this.router.url !== '/register');
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchForValue(this.searchValue);
    }

  }

  toggleSettings(): void {
    this.toggleSideBar();
    this.settings?.toggleModal();
  }

  logout(): void {
    this.firebaseService.logout().then(() => {
      localStorage.removeItem('accountEmail');
      localStorage.clear();
      this.accountStateStore.dispatch(new AccountLogin({account: null}));
      this.generalStateStore.dispatch(new SidebarToggle({isShown: false, searchValue: ''}));
      this.router.navigateByUrl('/login');
    });
  }

}
