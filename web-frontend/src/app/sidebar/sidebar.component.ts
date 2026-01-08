import {Component, HostListener, OnInit, Output, EventEmitter} from '@angular/core';
import {SearchValue, SidebarToggle} from '../shared/store/actions/general.actions';
import {Observable} from 'rxjs';
import {General} from '../shared/store/models/general';
import {Account} from '../shared/models/Account';
import {Router} from '@angular/router';
import {FirebaseService} from '../shared/services/firebase.service';
import {select, Store} from '@ngrx/store';
import {GeneralState, selectGeneral} from '../shared/store/reducers/general.reducer';
import {AccountState, selectAccount} from '../shared/store/reducers/account.reducer';
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  title = 'School Forum Website';
  general$: Observable<General>;
  account$: Observable<Account>;
  searchValue = '';
  visible = false;

  @Output() openSettings = new EventEmitter<boolean>();

  constructor(private router: Router, private firebaseService: FirebaseService,
              private generalStateStore: Store<GeneralState>, private accountStateStore: Store<AccountState>) {
    this.general$ = this.generalStateStore.pipe(select(selectGeneral), tap(data => {
      this.visible = data.isShown;
    }));
    this.account$ = this.accountStateStore.pipe(select(selectAccount));
  }

  ngOnInit(): void {
  }

  toggleSideBar(): void {
    console.log('toggling');
    this.visible = !this.visible;
    this.generalStateStore.dispatch(new SidebarToggle({isShown: false, searchValue: ''}));
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
    this.openSettings.emit(true);
  }

  logout(): void {
    this.firebaseService.logout().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
