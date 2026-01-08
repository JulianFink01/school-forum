import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Account} from '../shared/models/Account';
import {AccountService} from '../shared/services/account.service';
import {select, Store} from '@ngrx/store';
import {GeneralState, selectGeneral} from '../shared/store/reducers/general.reducer';
import {setRoute, sendMail} from '../shared/utils/functions';
import {General} from '../shared/store/models/general';
import {AccountState, selectAccount} from '../shared/store/reducers/account.reducer';
import {PostService} from '../shared/services/post.service';
import {Post} from '../shared/models/Post';
import {tap} from 'rxjs/operators';
import {EditProfileComponent} from '../forms/edit-profile/edit-profile.component';
import {Firestore} from '../shared/utils/firestore';
import {Book} from "../shared/models/Book";
import {BookService} from "../shared/services/book.service";

export enum ActionTypesAccount {
  ACTION_TOGGLE_POST = '[AccountComponent] Toggle Post',
  ACTION_TOGGLE_BOOK = '[AccountComponent] Toggle Books',
  ACTION_TOGGLE_COACHING = '[AccountComponent] Toggle Coaching',
  ACTION_TOGGLE_SETTINGS = '[AccountComponent] Toggle Settings'
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, AfterViewInit {

  @ViewChild('settings') settings?: EditProfileComponent;

  account$: Observable<Account>;
  accountId: string | null;
  general$: Observable<General>;
  userPosts$: Observable<Post[]>;
  userBooks$: Observable<Book[]>;
  showPosts = true;
  showBooks = false;
  actions = ActionTypesAccount;
  selectedAction = this.actions.ACTION_TOGGLE_POST;
  private ownProfile = false;

  constructor(private route: ActivatedRoute, private accountService: AccountService,
              private generalStateStore: Store<GeneralState>, private accountStateStore: Store<AccountState>,
              private postService: PostService, private bookService: BookService, ) {

    this.accountId = this.route.snapshot.paramMap.get('id');
    this.account$ = this.accountService.getAccountInformationById(this.accountId);
    this.general$ = this.generalStateStore.pipe(select(selectGeneral), tap((general) => {
        this.searchForValue(general.searchValue);
      }
    ));
    this.userPosts$ = this.postService.getPostByAccountId(this.accountId);
    this.userBooks$ = this.bookService.getBookByAccountId(this.accountId);
  }

  ngOnInit(): void {
    this.setRoute();
    this.checkIsOwnProfile();
  }

  ngAfterViewInit(): void {
    this.toggleSettings();
  }

  toggleContent(action: ActionTypesAccount): void {
    switch (action) {
      case ActionTypesAccount.ACTION_TOGGLE_BOOK:
        this.selectedAction = action;
        this.showPosts = false;
        this.showBooks = true;
        break;
      case ActionTypesAccount.ACTION_TOGGLE_POST:
        this.selectedAction = action;
        this.showPosts = true;
        this.showBooks = false;
        break;
      case ActionTypesAccount.ACTION_TOGGLE_COACHING:
        this.selectedAction = action;
        this.showPosts = false;
        this.showBooks = false;
        break;
      case ActionTypesAccount.ACTION_TOGGLE_SETTINGS:
        this.toggleSettings();
        break;
    }
  }


  searchForValue(filter: string): void {
    if (filter !== '' && filter !== null && filter)
      this.userPosts$ = this.postService.getPostByAccountIdAndFilter(this.accountId, filter);
  }

  isOwnProfile(): boolean {
    return this.ownProfile;
  }

  sendEmail(email: string, name: string): void {
    sendMail(email, name);
  }

  checkIsOwnProfile(): void {
    this.accountStateStore.pipe(select(selectAccount)).subscribe(account => {
      if (account.id === this.accountId) {
        this.ownProfile = true;
      } else {
        this.ownProfile = false;
      }
    });
  }

  toggleSettings(): void {
    this.settings?.toggleModal();
  }

  setRoute(): void {
    this.account$.subscribe((account) => {
      setRoute(this.generalStateStore, 'Account', 'person', ['Account', account?.firstName + ' ' + account?.lastName]);
    });
  }


}
